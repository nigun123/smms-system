<template>
    <div class="top">
        <el-row>
            <el-col :span="12">
                <div class='title'>管理系统</div>    
            </el-col>
            <el-col :span="12">
                <el-col :span="18">
                   
                    <span> 欢迎你！<span  class="username"> {{ username }}</span> </span>
                </el-col>
                <el-col :span="6">
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
           username:"管理员" ,
           imgUrl:"http://127.0.0.1:8082/avatar.jpg"
        }
    },
}
</script>
<style lang="less">
    .top{
        width:100%;
        color:#2d3a4b;
        .title{
            float:left;
            font-weight:800;
        }
        span{
            float:right;
            font-weight:500;  
             .username{
                 color:blue
            }         
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
</style>