 <template>
    <div class='addaccount'>
        <el-card class="box-card">
            <!-- 内容标题 -->
            <div slot="header" class="clearfix">
                <span>添加账号</span>               
            </div>
             <!-- 添加账号 -->
            <el-form :model="addaccountFrom" status-icon :rules="rules" ref="addaccountFrom" label-width="100px" class="demo-ruleForm">
                <!-- 用户名 prop:判断规则 -->
                <el-form-item label="用户名" prop="username">
                    <el-input type="text" v-model="addaccountFrom.username"  autocomplete="off"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item label="密码" prop="pwd">
                    <el-input type="text" v-model="addaccountFrom.pwd" autocomplete="off" show-password></el-input>
                </el-form-item>
                <!-- 确认密码 -->
                <el-form-item label="确认密码" prop="checkpwd">
                    <el-input type="text" v-model="addaccountFrom.checkpwd" autocomplete="off" show-password></el-input>
                </el-form-item>
                <!-- 用户组 -->
                <el-form-item label="用户组" prop="usergroup">
                        <el-select v-model="addaccountFrom.usergroup" placeholder="选择用户组">
                        <el-option label="普通用户" value="普通用户"></el-option>
                        <el-option label="管理员" value="管理员"></el-option>
                        </el-select>
                </el-form-item>
                <!-- 重置及登录按钮 -->
                <el-form-item>
                    <el-button type="primary" @click="submitForm('addaccountFrom')">添加</el-button>
                    <el-button @click="resetForm('addaccountFrom')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
import  qs from 'qs'
export default {
 data() {
        const checkUN = (str)=>{
            var reg =/^[\u4e00-\u9fa5a-zA-Z0-9_-]{2,16}$/;
            if(reg.test(str)){
                return true;
            }else{
                return false;
            }
        }
        
        //判断密码只能输入数字及字母
        const checkSpecifiKey = (str)=>{
            var reg = /^[A-Za-z0-9]{6,16}$/;      
            if(reg.test(str)){
                return true;
            }else{
                return false;
            }

        }

        //用户名
      var checkUname = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        }else if(!checkUN(value)){
         callback(new Error('请输入2-16位（中文，字母，数字，下划线，减号）'));
        }
         callback();        
      };
      //验证密码
      var getPwd = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请输入密码'));
        }else if(!checkSpecifiKey(value)){
            callback(new Error('密码必须由 6-16位字母、数字组成'));
        }else {
            //若确认密码框不为空 触发确认密码函数 
          if (this.addaccountFrom.checkpwd !== '') {
            this.$refs.addaccountFrom.validateField('checkpwd');
          }
          //成功的回调
          callback();
        }
      };
      //确认密码
      var checkPwd = (rule, value, callback) => {
        // rule：验证规则  value：用户输入的值 callback：回调函数
       if (value === '') {
          callback(new Error('请再次输入密码'));
        }else if (value !== this.addaccountFrom.pwd ) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        addaccountFrom: {
          username: '',
          pwd: '',
          checkpwd: '',
          usergroup:''
        },
        rules: {
            //用户
          username: [
              //validator自定义验证函数
            {required:true, validator: checkUname, trigger: 'blur' }
          ],
           //输入密码
          pwd: [
            {required:true, validator: getPwd, trigger: 'blur' },
          ],
           //再次输入密码
          checkpwd: [
            {required:true, validator: checkPwd, trigger: 'blur' },
          ],
          usergroup: [
            { required: true, message: '请选择用户组', trigger: 'change' }
          ]
        }
      };
    },
    methods: {
        // 登录
      submitForm(formName) {
        // 获取整个表单组件  调用验证方法
        this.$refs[formName].validate((valid) => {
          if (valid) {  //如果所有验证通过valid为true
            //将收集的用户名密码 一起发送给后端
            let params = {
              username:this.addaccountFrom.username,
              pwd :this.addaccountFrom.pwd,
              usergroup:this.addaccountFrom.usergroup,
            }
            //发送请求axios   
            this.axios.post('http://127.0.0.1:666/account/addAccount',qs.stringify(params))
            .then(response =>{
              const result = response.data.res_code;
                // console.log(response)
                if(result == 1){
                  this.$message({
                    message: response.data.msg,
                    type: 'success'
                  });
                  this.username= '';
                  this.pwd= '';
                  this.checkpwd= '';
                  this.usergroup= '';
                }else{
                  this.$message.error(response.data.msg);
                }
                
            })
            .catch(err =>{
                console.log(err);
            })

          } else {//失败时valid为false
            alert('前端验证失败');
            return false;
          }
        });
      },
      // 重置
      resetForm(formName) {
          //获取整个表单组件  调用重置方法
        this.$refs[formName].resetFields();
      }
    }
}
</script>
<style lang="less">
    .addaccount{
        .box-card {
            .el-card__body{
                .el-form-item{
                    width:300px
                }
            }
            
        }
    }
</style>