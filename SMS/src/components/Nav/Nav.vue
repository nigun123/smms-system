<template>
  <div class="nav">
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
        <!--  : 表示动态获取 -->
        <el-submenu :index="(index + 1) + ''"  v-for="(item, index) in userNavMenu" :key="index">
            <template slot="title"><i :class="item.icon"></i>{{ item.navTile }}</template>                        
                <el-menu-item  
                    v-if="item.childern  && item.childern.length"
                    v-for="(child, index) in item.childern"
                    :key="index"
                    :index="child.path">
                        {{child.subTitle}}
                </el-menu-item>
        </el-submenu>

    </el-menu>    
  </div class="nav">
</template>
<script>
export default {
    data() {
        return {
            navMenu:[               
                {
                    navTile:'系统管理',
                    icon:'el-icon-setting',
                    roles:['admin','editor'],
                    childern:[
                        {
                            subTitle:'系统信息',
                            path:'/index'
                        },
                    ]
                },
                {
                    navTile:'个人信息',
                    icon:'el-icon-user-solid',
                    roles:['admin','editor'],
                    childern:[
                        {
                            subTitle:'个人信息',
                            path:'/personInfo'
                        },
                    ]
                },
                {
                    navTile:'账号管理',
                    icon:'el-icon-s-custom',
                    roles:['admin'],
                    childern:[
                        {
                            subTitle:'账号管理',
                            path:'/accountmanager'
                        },
                        {
                            subTitle:'添加账号',
                            path:'/addaccount'
                        },
                        {
                            subTitle:'密码修改',
                            path:'/pwdmodify'
                        },
                    ]
                },
                {
                    navTile:'商品管理',
                    icon:'el-icon-goods',
                    roles:['admin','editor'],
                    childern:[
                        {
                            subTitle:'商品管理',
                            path:'/goodsmanager'
                        },
                        {
                            subTitle:'添加商品',
                            path:'/addgoods'
                        },
                    ]
                },
                {
                    navTile:'统计管理',
                    icon:'el-icon-date',
                    roles:['admin'],
                    childern:[
                        {
                            subTitle:'销售统计',
                            path:'/salesstatistics'
                        },
                        {
                            subTitle:'进货统计',
                            path:'/stockstatistics'
                        },
                    ]
                },
            ],
            userNavMenu:[]
        }
    },
    //生命周期created
    created() {
        /** 过滤导航菜单  */
        this.filterNav()
    },
    methods: {
        filterNav(){
            //从本地获取roles
            let roles = window.localStorage.getItem('roles');
            console.log(roles);
            //临时数组
            let tempMenu = [];
            //循环NavMenu
            this.navMenu.forEach( navItem =>{
                //判断navItem.roles 是否含有roles
               if(navItem.roles.includes(roles)){
                   tempMenu.push(navItem)
               }
            })
            //赋值
            this.userNavMenu = tempMenu;
        }
    },
}
</script>
<style lang="less">
    .el-menu{
        border:none;
        .el-submenu__title{
            color:#ffffff
        }
        .el-menu-item{
            color:#ffffff
        }
    }
</style>