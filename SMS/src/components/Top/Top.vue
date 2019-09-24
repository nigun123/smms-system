<template>
    <div class="top">
        <el-row>
            <el-col :span="12">
                <div class='title'>管理系统</div>    
            </el-col>
            <el-col :span="12">
                <el-col :span="12">
                   欢迎你！
                   <el-dropdown placement="top" @command="handcommand">
                        <span class="el-dropdown-link username">
                             {{ username }}<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="personInfo">个人中心</el-dropdown-item>
                            <el-dropdown-item command="logout">退出登录</el-dropdown-item>                            
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
                <el-col :span="12">
                <div class="avatar">
                    <img width="100%"  height="100%" :src="imgUrl" />
                </div>
                </el-col>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    data() {
        return {
           username: '',
           imgUrl:"http://127.0.0.1:8082/avatar.jpg"
        }
    },
    methods: {
        handcommand(command){
            if(command ==="logout"){
                window.localStorage.removeItem('token');
                 this.$message({
                    message: "退出成功",
                    type: 'success'
                  });
                this.$router.push('/login');
            }
        }
    },
    created() {//生命周期，组件创建时会触发
        this.username  = window.localStorage.getItem('username');
    },
}
</script>
<style lang="less">
    .top{
        width:100%;
        color:#2d3a4b;
        .el-row{
            .el-col{
                height:60px;
                .title{
                    float:left;
                    font-weight:800;
                }
                .el-col{
                    .el-dropdown-link {
                        cursor: pointer;
                        color: #409EFF;
                    }
                    .el-icon-arrow-down {
                        font-size: 12px;
                    }
                    font-weight:500; 
                    .username { 
                        font-weight:600;                                           
                        color:blue ;
                        font-size: 16px;        
                    }                         
                    .avatar{
                        float:left;
                        width:50px;
                        height:50px;
                        margin-top:3px;
                        margin-left:5px;
                        img{ 
                            border:2px solid lightgray;
                            border-radius:50%;
                        }
                    }
                }
                
            }
        }
        
    }
</style>