 <template>
    <div class='accountmanager'>
       <el-card class="box-card">
            <!-- 内容标题 -->
            <div slot="header" class="clearfix">
                <span>账号管理</span>               
            </div>
            <!-- 批量删除 -->
            <div style="margin-top: 20px;text-align:left">
              <el-button @click="batchDelete()">批量删除</el-button>
              <el-button @click="unSelect()">取消选择</el-button>
            </div>
            <!-- 表格内容 -->
            <el-table
                ref="multipleTable"
                stripe
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column
                    type="selection"
                    width="55px">
                </el-table-column>
                
                <el-table-column
                    prop="username"
                    label="用户名">
                    </el-table-column>
                <el-table-column
                    prop="usergroup"
                    label="用户组">
                </el-table-column>

                <el-table-column
                    label="日期">
                    <!-- 日期处理 momentJs -->
                    <template slot-scope="scope">{{ scope.row.ctime | filterCtime}}</template>
                </el-table-column>
                <!-- 操作 -->
                <el-table-column   label="操作">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.row.id)">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="open(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <div style="texe-align:left">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[1, 3, 5, 10, 20]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
              </el-pagination>
            </div>

            <!-- 编辑弹出框 -->
            <el-dialog title="用户信息编辑" :visible.sync="flag" width="400px">
              <el-form :model="editForm" label-width="60px">
                <!-- 用户名 -->
                <el-form-item label="用户名"  >
                    <el-input type="text" v-model="editForm.username" style="width:217px"  autocomplete="off"></el-input>
                </el-form-item>
                  <!-- 用户组 -->
                <el-form-item label="用户组" >
                        <el-select v-model="editForm.usergroup" placeholder="选择用户组">
                        <el-option label="普通用户" value="普通用户"></el-option>
                        <el-option label="管理员" value="管理员"></el-option>
                        </el-select>
                </el-form-item>
              </el-form>
                <!-- 编辑提示弹出框 -->
              <div slot="footer" class="dialog-footer">
                <el-button @click="flag = false">取 消</el-button>
                <el-button type="primary" @click="EditUser()">确 定</el-button>
              </div>
              </el-dialog>
        </el-card>
    </div>
</template>
<script>
//引入时间处理模块
import moment from 'moment';
//引入JSON处理模块
import qs from 'qs'
export default {     
    data() {//数据 
      return {
        tableData: [],
        multipleSelection: [],
        flag:false,
        editForm:{
          username:"",
          usergroup:""
        },
        editUserId:"",
        currentPage:1,//当前显示第几页
        pageSize:5,//每页显示条数
        total:10,//总共数据条数  从后端获取
      }
    },
    created() {//生命周期的钩子函数  自动触发 组件实例创建完成 dom还没有绑定
        // this.getAllAccount();
       this.getAccountByPage();
    },
    methods: {//方法
     //请求所有账户的方法
      getAllAccount(){
          //请求用户列表
          this.axios.get('http://127.0.0.1:666/account/getAccount')
          .then(response=>{
            this.tableData = response.data;
          })
          .catch(err=>{
              console.log(err)
          })
      },
      handleSizeChange(val) { // 设置每页显示数据条数时触发
        this.pageSize = val;
        console.log(`每页 ${this.pageSize} 条`);
        this.getAccountByPage();
      },
      handleCurrentChange(val) {// 设置显示第几页时触发
        this.currentPage = val;
        console.log(`当前页: ${this.currentPage}`);
        this.getAccountByPage();
      },
      //根据页码及每页显示条数获取当前页码的数据进行加载
      getAccountByPage(){
        //获取pageSize currentPage
        let pageSize = this.pageSize;
        let currentPage = this.currentPage;        
        if(currentPage)
        //发送请求获取数据
        this.axios.get('http://127.0.0.1:666/account/getAccountByPage',{
          params:{
            pageSize,
            currentPage
          }
        })
        .then(response=>{ 
          //判断当前也是否为第一页 或者 当前页是否无数据(显示前一页数据) 
          if(response.data.length == 0 &&  this.currentPage != 1){
             this.currentPage -= 1;
             this. getAccountByPage();
          }
          this.total = response.data.total;
          this.tableData = response.data.data;
        })
        .catch(err=>{
          console.log(err);
        })
        
        

      },
      handleSelectionChange(val) { //当单选框选中状态发生变化 触发此函数 
        this.multipleSelection = val; //val是选中的数据   是一个数组
      },
      //取消选择
      unSelect(rows){
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },    
      //批量删除
      batchDelete(rows){
        //判断有没有选中，
        if(!this.multipleSelection.length){
          console.log("没有选择数据");
          return;
        }        
        //获取所有id
         let selectUid = this.multipleSelection.map(obj =>obj.id);
        console.log(selectUid);
        //给后端发axios请求 id作为参数
        this.axios.get(`http://127.0.0.1:666/account/batchDelete`,{
          params:{
            selectUid
          }
        })
        .then(response=>{
          let {res_code,msg} = response.data;
          if(res_code == 1){
            this.$message({
                message: msg,
                type: 'success'
            });            
            this.getAccountByPage(); //重新获取
          }else{
              this.$message.error(msg);
          }
        })
        .catch(err=>{
          console.log(err);
        })
      },      
      handleEdit(id) {//修改用户方法
        this.editUserId = id;
        this.flag = true; //打开弹出框
        //发送axios 获取对应用户的数据资料 getSignAccount 并填入弹出框
        this.axios.get(`http://127.0.0.1:666/account/getSignAccount?uid=${this.editUserId}`)
        .then(response=>{;
            this.editForm.username = response.data[0].username;
            this.editForm.usergroup = response.data[0].usergroup;
        })
        .catch(err=>{
          console.log(err);
        })
      },
      EditUser(){//修改用户编辑框 
        this.flag = false;
        let params = {
          username : this.editForm.username,
          usergroup: this.editForm.usergroup,
          uid: this.editUserId,
        }
        //发送axios 修改对应用户的数据资料 editAccount 
        this.axios.post('http://127.0.0.1:666/account/editAccount',qs.stringify(params))
        .then(response => {
          let {res_code,msg} = response.data;
          if(res_code == 1){
            this.$message({
                message: msg,
                type: 'success'
            });
            this.getAllAccount();
          }else{
              this.$message.error(msg);
          }
        }).catch(err => {
           console.log(err);
        });

      },
      open(id) { //删除用户提示框
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.handleDelete(id);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      handleDelete(id) {  //删除用户方法
        //axios 发送id给后台
        console.log(id);
        //删除用户post方式
        let params = { id:id,}
        //发送请求axios   判断用户是否存在及密码正确性
        this.axios.post('http://127.0.0.1:666/account/delAccount',qs.stringify(params))
        .then(response =>{
          let {res_code,msg} = response.data;
          if(res_code == 1){
            this.$message({
                message: msg,
                type: 'success'
            });
            this.getAllAccount();
          }else{
              this.$message.error(msg);
          }
        })
        .catch(err=>{
          console.log("出错了",err)
          })
        // //删除用户get方式
        // this.axios.get(`http://127.0.0.1:666/account/delAccount?id=${id}`)
        // .then(response=>{
        //   let {res_code,msg} = response.data;
        //       if(res_code == 1){
        //         this.$message({
        //             message: msg,
        //             type: 'success'
        //         });
        //         this.getAllAccount();
        //       }else{
        //           this.$message.error(msg);
        //       }
        // })
        // .catch(err=>{
        //     console.log("出错了",err)
        // })
      }
    },
    filters:{//过滤器
        filterCtime(ctime){
            return moment(ctime).format('YYYY-MM-DD HH:mm:ss');
        }
    }
}
</script>
<style lang="less">
    .accountmanager{
        
    }
</style>