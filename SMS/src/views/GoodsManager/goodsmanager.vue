<template>
    <div class='goodsmanager'>
       <el-card class="box-card">
            <!-- 内容标题 -->
            <div slot="header" class="clearfix">
                <span> 商品管理</span>               
            </div>
            <!-- 模糊查询 -->
            <div style="margin-top: 20px;text-align:left">
                <!-- 搜索框 -->
                    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
                        <el-form-item label="所属分类">
                            <el-select v-model="searchForm.cateName" placeholder="所属分类">
                                <el-option label="全部" value="全部"></el-option>
                                <el-option label="酒水类" value="酒水类"></el-option>
                                <el-option label="水果类" value="水果类"></el-option>
                                <el-option label="电子类" value="电子类"></el-option>
                                <el-option label="食品类" value="食品类"></el-option>
                                <el-option label="生活用品" value="生活用品"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="关键字">
                            <el-input v-model="searchForm.keyWord" placeholder="商品名称或条形码"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="search">查询</el-button>
                        </el-form-item>
                    </el-form>
            </div>

            <!-- 表格内容 -->
            <el-table
                ref="goodsTable"
                stripe
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection"  width="55px"> </el-table-column>
                
                <!-- 条形码 -->
                <el-table-column prop="barCode" label="条形码">
                </el-table-column>

                <!-- 商品名称 -->
                <el-table-column prop="goodsName" label="商品名称">
                </el-table-column>

                <!-- 所属分类 -->
                <el-table-column prop="cateName" label="所属分类">
                </el-table-column>

                <!-- 售价 -->
                <el-table-column prop="salePrice" label="售价">
                </el-table-column>

                <!-- 是否存销 -->
                <el-table-column prop="discount" label="是否存销">
                </el-table-column>

                <el-table-column label="日期">
                    <!-- 日期处理 momentJs -->
                    <template slot-scope="scope">{{ scope.row.ctime | filterCtime}}</template>
                </el-table-column>

                <!-- 操作 -->
                <el-table-column   label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini"  type="primary"  @click="handleEdit(scope.row.id)">
                            <i class="el-icon-edit"></i>编辑
                        </el-button>
                        <el-button size="mini" type="danger" @click="delSignGoods(scope.row.id)">
                            <i class="el-icon-delete"></i>删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 批量删除 -->
            <div style="margin-top: 20px;text-align:left">
              <el-button @click="batchDelete()">批量删除</el-button>
              <el-button @click="unSelect()">取消选择</el-button>
            </div>
            <!-- 分页 -->
            <div style="margin-top: 20px; texe-align:left">
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
            <el-dialog title="商品信息编辑" :visible.sync="flag" width="500px">
              <el-form :model="goodsForm" label-width="100px">                
              <!-- 商品名称 -->
                <el-form-item label="商品名称">
                    <el-input type="text"  v-model="goodsForm.goodsName" style="width:217px"  autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="售价"  >
                    <el-input type="text" v-model="goodsForm.salePrice" style="width:217px"  autocomplete="off"></el-input>
                </el-form-item>               
                 <el-form-item label="会员优惠">
                    <el-radio-group v-model="goodsForm.discount">
                        <el-radio label="享受"></el-radio>
                        <el-radio label="不享受"></el-radio>
                    </el-radio-group>
                </el-form-item>
                  <!-- 用户组 -->
                <el-form-item label="所属分类">
                    <el-select v-model="goodsForm.cateName" placeholder="所属分类">
                        <el-option label="全部" value="全部"></el-option>
                        <el-option label="酒水类" value="酒水类"></el-option>
                        <el-option label="水果类" value="水果类"></el-option>
                        <el-option label="电子类" value="电子类"></el-option>
                        <el-option label="食品类" value="食品类"></el-option>
                        <el-option label="生活用品" value="生活用品"></el-option>
                    </el-select>
                </el-form-item>
              </el-form>
                <!-- 编辑提示弹出框 -->
              <div slot="footer" class="dialog-footer">
                <el-button @click="flag = false">取 消</el-button>
                <el-button type="primary" @click="EditGoods()">确 定</el-button>
              </div>
              </el-dialog>
        </el-card>
    </div>
</template>
<script>
//引入时间处理模块
import moment from 'moment';
export default {
    data(){
        return{
            flag:false,
            goodsTable:[], /** 表格选择的数据集合  */
            tableData:[],/** 表格绑定数据源 */
            currentPage:1,
            pageSize:1,
            total:1,
            currentGoodsId:'',
            goodsForm:{
                goodsName:'',
                salePrice:'',
                cateName:'',
                discount:''
            },
            searchForm:{
                cateName:'',
                keyWord:'',

            }
        }
    },
    created() {//生命周期的钩子函数  自动触发 组件实例创建完成 dom还没有绑定
       this.getGoodsByPage();
    },
    methods: {
        //单选框状态发生改变触发
        handleSelectionChange(val){
            this.goodsTable = val; //val是选中的数据   是一个数组
        },
        //切换每页显示条数触发
        handleSizeChange(val){
            this.pageSize = val;
            this.getGoodsByPage();
        },
        //切换页码触发
        handleCurrentChange(val){
            this.currentPage = val;
            this.getGoodsByPage();
        },
        //弹出编辑框并回调数据
        handleEdit(id){
            this.currentGoodsId = id;
            this.flag = true;
            //发送axios 获取对应用户的数据资料 getSignGoods 并填入弹出框goodsForm字段salePrice, cateName,  discount
            this.request.get('/goods/getSignGoods', { Gid: this.currentGoodsId})
            .then(response=>{
                console.log(response[0]);
                this.goodsForm.salePrice = response[0].salePrice;
                this.goodsForm.cateName = response[0].cateName;
                this.goodsForm.discount = response[0].discount;
                this.goodsForm.goodsName = response[0].goodsName;
            })
            .catch(err=>{
                console.log(err)
            })
        },
        //编辑商品
        EditGoods(){
            //获取对应用户的数据资料  弹出框goodsForm的字段salePrice, cateName,  discount 及商品id
            let params = {
                Gid: this.currentGoodsId,
                goodsName : this.goodsForm.goodsName,
                salePrice :this.goodsForm.salePrice,
                cateName : this.goodsForm.cateName,
                discount : this.goodsForm.discount
            }
            //发送axios  更新goods表 updateGoods
            this.request.get('/goods/updateGoods', params)
            .then(response=>{
                let {res_code,msg} = response;
                if(res_code == 1){
                    this.flag = false;
                    this.$message({
                        message: msg,
                        type: 'success'
                    });
                    this.getGoodsByPage();
                }else{
                    this.$message.error(msg);
                }
            })
            .catch(err=>{
                this.flag = false;
                console.log(err)
            })
        },
        //删除单个商品
        delSignGoods(id){
            this.currentGoodsId = id;
            //发送axios
            this.request.get('/goods/delSignGoods', { Gid: this.currentGoodsId})
            .then(response=>{
                let {res_code,msg} = response;
                if(res_code == 1){
                    this.$message({
                        message: msg,
                        type: 'success'
                    });
                    this.getGoodsByPage();
                }else{
                    this.$message.error(msg);
                }
            })
            .catch(err=>{
                console.log(err)
            })
        },
        //批量删除
        batchDelete(){
            //判断有没有选中，
            if(!this.goodsTable.length){
            console.log("没有选择数据");
            return;
            }        
            //获取所有id
            let selectUid = this.goodsTable.map(obj =>obj.id);
            //发送axios
            this.request.get('/goods/batchDelete',selectUid)
            .then(response=>{
                let {res_code,msg} = response;
                if(res_code == 1){
                    this.$message({
                        message: msg,
                        type: 'success'
                    });
                    this.getGoodsByPage();
                }else{
                    this.$message.error(msg);
                }
            })
            .catch(err=>{
                console.log(err)
            })
        },
        //取消选择
        unSelect(){
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        //模糊查询 调用getGoodsByPage
        search(){
            this.getGoodsByPage();
            

        },
        //根据页码和显示条数获取商品列表
        getGoodsByPage(){
            let pageSize = this.pageSize;
            let currentPage = this.currentPage;
            let cateName = this.searchForm.cateName;
            let keyWord = this.searchForm.keyWord;

            let params = {
                pageSize,currentPage,cateName,keyWord
            }
            this.request.post('/goods/getGoodsByPage',params)
            .then(response =>{
                let {total,data} = response;
                //判断当前页是否有数据 且不是为第一页
                if( data.length == 0 &&  this.currentPage != 1){
                    console.log(pageSize,currentPage)
                    this.currentPage -= 1; //显示前一页数据
                    this.getGoodsByPage();
                }else{
                    this.total = total;
                    this.tableData = data;
                }
                
            })
            .catch(err=>{
                console.log(err);
            })
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
    .goodsmanager{

    }
</style>