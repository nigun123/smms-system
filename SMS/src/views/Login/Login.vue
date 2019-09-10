<template>
    <div id="login">
       <div id="login-wrapper">
            <div id="loginTitle">
                <i class="el-icon-menu"> </i>
                <span> 管理系统 </span>
            </div>

            <!-- 登录表单 -->
            <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm">
                <!-- 用户名 -->
                <el-form-item label="用户名" prop="username">
                    <el-input type="text" v-model="loginForm.username"  autocomplete="off"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item label="密码" prop="pwd">
                    <el-input type="text" v-model="loginForm.pwd" autocomplete="off" show-password></el-input>
                </el-form-item>
                <!-- 确认密码 -->
                <el-form-item label="确认密码" prop="checkpwd">
                    <el-input type="text" v-model="loginForm.checkpwd" autocomplete="off" show-password></el-input>
                </el-form-item>
                <!-- 重置及登录按钮 -->
                <el-form-item>
                    <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
                    <el-b
                    <el-button @click="resetForm('loginForm')">重置</el-button>
                </el-form-item>
            </el-form>
       </div>
    </div>
</template>
<script>
export default {
    data() {
        const checkUN = (str)=>{
            var reg =/^[a-zA-Z0-9_-]{4,16}$/;
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
         callback(new Error('请输入4-16位（字母，数字，下划线，减号）'));
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
          if (this.loginForm.checkpwd !== '') {
            this.$refs.loginForm.validateField('checkpwd');
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
        }else if (value !== this.loginForm.pwd ) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        loginForm: {
          username: '',
          pwd: '',
          checkpwd: ''
        },
        rules: {
            //用户
          username: [
              //自定义验证函数
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
              username:this.loginForm.username,
              pwd :this.loginForm.pwd,
            }

            //发送请求axios   判断用户是否存在及密码正确性


            alert('登录成功!');
            //使用路由router跳转至后端主页面
            this.$router.push('/index')

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
    #login{
        height:100%; 
        width:100%;
        #login-wrapper{
          width:500px;
          height:400px;
          border-radius:8px;
          background-color:rgba(0,0,0,0.2); //透明
          color:#fff;
          //垂直水平居中
          position:fixed;
          top:0;
          right:0;
          bottom:0;
          left:0;
          margin:auto;   
          #loginTitle{
              font-size:30px;
              padding:40px;
          } 
          .el-form{
              .el-form-item{
                  padding:5px 80px 0px 0px;
                  label{
                      color:#fff;
                  }
              }
          }                  
      }            
    } 
</style>