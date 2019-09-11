<template>
    <div class='index'> 
        <!-- 内容区域 -->       
        <el-container>
            <!-- 左侧内容区域 --> 
            <el-aside width="200px">
                <!-- 自定义组件 -->
                <Nav></Nav>
            </el-aside>
            <!-- 右侧内容区域 --> 
            <el-container>
                <!-- 上 --> 
                <el-header>
                    <!-- 自定义组件 -->
                    <Top></Top>
                </el-header>
                <!-- 中 --> 
                <el-main>
                    <!-- 路由出口 --> 
                    <router-view></router-view>
                </el-main>
                <!-- 下 --> 
                <el-footer>
                    <!-- 自定义组件 -->
                    <Bottom></Bottom>
                </el-footer>
            </el-container>
        </el-container>
    </div>
</template>
<script>
//引入组件
import Nav from '@/components/Nav/Nav.vue';
import Top from '@/components/Top/Top.vue';
import Bottom from '@/components/Bottom/Bottom.vue';
export default {
   //注册组件
   components:{
       Nav,
       Top,
       Bottom
   }
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
            
        }
        //右侧中
        .el-main {
            background-color: #E9EEF3;
            color: #333;
            text-align: center;
        }        
    }
</style>