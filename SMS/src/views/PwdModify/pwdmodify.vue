<template>
    <div class='pwdmodify'>      
       <el-card class="box-card">
            <!-- 内容标题 -->
            <div slot="header" class="clearfix">
                <span> 密码修改</span>               
            </div>
            <!-- 密码修改 -->
             <!-- 添加账号 -->
            <el-form :model="pwdmodifyFrom" status-icon :rules="rules" ref="pwdmodifyFrom" label-width="100px" class="demo-ruleForm">
                 <!-- 密码 -->
                <el-form-item label="旧密码" prop="oldpwd">
                    <el-input type="text" v-model="pwdmodifyFrom.oldpwd" autocomplete="off" show-password></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item label="新密码" prop="newpwd">
                    <el-input type="text" v-model="pwdmodifyFrom.newpwd" autocomplete="off" show-password></el-input>
                </el-form-item>
                <!-- 确认密码 -->
                <el-form-item label="确认新密码" prop="checknewpwd">
                    <el-input type="text" v-model="pwdmodifyFrom.checknewpwd" autocomplete="off" show-password></el-input>
                </el-form-item>               
                <!-- 重置及登录按钮 -->
                <el-form-item>
                    <el-button type="primary" @click="submitForm('pwdmodifyFrom')">修改</el-button>
                    <el-button @click="resetForm('pwdmodifyFrom')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
export default {
    data() {
        const regPwd = (str)=>{ //密码正则验证
            var reg = /^[A-Za-z0-9]{6,16}$/;      
            if(reg.test(str)){
                return true;
            }else{
                return false;
            }
        };
        //检查旧密码
        var checkOldpwd = (rule, value, callback)=>{// rule：验证规则  value：用户输入的值 callback：回调函数
            if (value === '') {
            callback(new Error('请输入旧密码'));
            }else{
                let params ={
                    oldpwd:value,
                    username:window.localStorage.getItem('username')
                }
                //向后台发送axios请求判断密码是否正确
                this.axios.get('http://127.0.0.1:666/account/checkOldpwd',{params})
                .then(response=>{
                    // res.send({"res_code":0,"msg":"旧密码不正确"})
                    let {res_code,msg} = response.data;
                    if(res_code == 1){
                       callback();//成功的回调
                    }else{
                        callback(new Error(msg))
                    }
                })
                .catch(err=>{
                    console.log(err)
                })                
            }            
        };
        //检查新密码
        var NewPwd  = (rule , value , callback)=>{// rule：验证规则  value：用户输入的值 callback：回调函数
            if (value === '') {
                callback(new Error('请输入新密码'));
            }else if(!regPwd(value)){
                callback(new Error('密码必须由 6-16位字母、数字组成'));
            }else {
                //若确认密码框不为空 触发确认密码函数 
                if (this.pwdmodifyFrom.newpwd !== '') {
                    this.$refs.pwdmodifyFrom.validateField('checknewpwd');
                }
                 callback();//成功的回调
            }
        };
        //确认新密码
      var CheckNewPwd = (rule, value, callback) =>{// rule：验证规则  value：用户输入的值 callback：回调函数 
       if (value === '') {
          callback(new Error('请再次输入新密码'));
        }else if (value !== this.pwdmodifyFrom.newpwd ) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };

        return {
            pwdmodifyFrom:{
                oldpwd:'',
                newpwd:'',
                checknewpwd:'',
            },
            rules:{
                oldpwd:[
                    {required:true, validator: checkOldpwd, trigger: 'blur' }
                ],
                newpwd:[
                    {required:true, validator: NewPwd, trigger: 'blur' }
                ],
                checknewpwd:[
                    {required:true, validator: CheckNewPwd, trigger: 'blur' }
                ],
            }
        }
    },
    methods: {
        submitForm(formName){
           this.$refs[formName].validate(valid =>{// 获取整个表单组件  调用验证方法
                if(valid){//验证通过
                    let params = {//收集用户名、旧密码、新密码 发送axios给后台
                        oldpwd:this.pwdmodifyFrom.oldpwd,
                        username:window.localStorage.getItem('username'),
                        newpwd:this.pwdmodifyFrom.oldpwd
                    }   
                    this.axios.get('http://127.0.0.1:666/account/pwdModify',{params})
                    .then(response=>{
                        let {res_code,msg} = response.data;
                        if(res_code == 1){
                          this.$message({
                                message: response.data.msg,
                                type: 'success'
                            });                            
                            setTimeout(()=>{//清除浏览器token和username 跳转至登录界面
                                window.localStorage.removeItem('token');
                                window.localStorage.removeItem('username');
                                this.$router.push('/login')
                            },1000)
                        }else{
                            callback(new Error(msg))
                        }
                    })
                    .catch(err=>{
                        console.log(err);
                    })
                }
           })  
        },
        resetForm(formName){
            this.$refs[formName].resetFields();//获取整个表单组件  调用重置方法
        }
    },
}
</script>
<style lang="less">
    .pwdmodify{
       .el-form-item {           
            width:300px;
       }
    }
</style>