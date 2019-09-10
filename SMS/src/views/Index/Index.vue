<template>
    <div class='index'> 
        <!-- 内容区域 -->       
        <el-container>
            <!-- 左侧内容区域 --> 
            <el-aside width="200px">
            <!-- 
                动态选择当前路由组件：:default-active="this.$route.path" 
                unique-opened:是否只保持一个子菜单的展开
                active-text-color:当前激活菜单的文字颜色
                router：使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转
            --> 
                <el-menu                     
                    background-color ="#2d3a4b"
                    unique-opened
                    active-text-color="rgb(64,158,255)"  
                    :default-active="this.$route.path"                  
                    router>
                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-setting"></i>系统管理</template>                        
                            <el-menu-item index="/index">系统信息</el-menu-item>
                            <el-menu-item index="/systemconfiguration">系统配置</el-menu-item>                        
                            <el-menu-item index="/rightsmanager">权限管理</el-menu-item>  
                     </el-submenu>
                     <el-submenu index="2">
                        <template slot="title"><i class="el-icon-s-custom"></i>账号管理</template>                        
                            <el-menu-item index="/accountmanager">账号管理</el-menu-item>
                            <el-menu-item index="/addaccount">添加账号</el-menu-item>                        
                            <el-menu-item index="/pwdmodify">密码修改</el-menu-item>  
                     </el-submenu>
                     <el-submenu index="3">
                        <template slot="title"><i class="el-icon-goods"></i>商品管理</template>                        
                            <el-menu-item index="/goodsmanager">商品管理</el-menu-item>
                            <el-menu-item index="/addgoods">添加商品</el-menu-item>    
                     </el-submenu>
                     <el-submenu index="4">
                        <template slot="title"><i class="el-icon-date"></i>统计管理</template>                        
                            <el-menu-item index="/salesstatistics">销售统计</el-menu-item>
                            <el-menu-item index="/stockstatistics">进货统计</el-menu-item>    
                     </el-submenu>
                </el-menu>

            </el-aside>
            <!-- 右侧内容区域 --> 
            <el-container>
                <!-- 上 --> 
                <el-header>Header</el-header>
                <!-- 中 --> 
                <el-main>
                    <!-- 路由出口 --> 
                    <router-view></router-view>
                </el-main>
                <!-- 下 --> 
                <el-footer>Footer</el-footer>
            </el-container>
        </el-container>
    </div>
</template>
<script>
export default {
   
}
</script>
<style lang="less">
    .index{
        height:100%;
        .el-container {
             height:100%;
        }
         //右侧上下
        .el-header, .el-footer {
            background-color: #B3C0D1;
            color: #333;
            text-align: center;
            line-height: 60px;
        }
        //左侧内容
        .el-aside {
            background-color:#2d3a4b;
            color: #333;
            text-align: center;
            .el-menu{
                border:none;
                .el-submenu__title{
                    color:#ffffff
                }
                .el-menu-item{
                    color:#ffffff
                }
            }
        }
        //右侧中
        .el-main {
            background-color: #E9EEF3;
            color: #333;
            text-align: center;
        }        
    }
</style>