import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'

//注册路由（使用路由）
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login', //路径
      name: 'login',//名字
      component: () => import('./views/Login/Login.vue') //引入登录组件
    }, 
    {
      path:'/index',
      name:'index',
      component: () => import('./views/Index/Index.vue') ,//引入登录组件
      children:[
            {
              path:'/index',
              name:'home',
              component : () => import('./views/Home/home.vue')
            },
            {
              path:'/accountmanager',
              name:'accountmanager',
              component : () => import('./views/AccountManager/accountmanager.vue')
            },
            {
              path:'/addaccount',
              name:'addaccount',
              component : () => import('./views/AddAccount/addaccount.vue')
            },
            {
              path:'/addgoods',
              name:'addgoods',
              component : () => import('./views/AddGoods/addgoods.vue')
            },
            {
              path:'/goodsmanager',
              name:'goodsmanager',
              component : () => import('./views/GoodsManager/goodsmanager.vue')
            },
            {
              path:'/pwdmodify',
              name:'pwdmodify',
              component : () => import('./views/PwdModify/pwdmodify.vue')
            },
            {
              path:'/rightsmanager',
              name:'rightsmanager',
              component : () => import('./views/RightsManager/rightsmanager.vue')
            },
            {
              path:'/salesstatistics',
              name:'salesstatistics',
              component : () => import('./views/SalesStatistics/salesstatistics.vue')
            },
            {
              path:'/stockstatistics',
              name:'stockstatistics',
              component : () => import('./views/StockStatistics/stockstatistics.vue')
            },
            {
              path:'/systemconfiguration',
              name:'systemconfiguration',
              component : () => import('./views/SystemConfiguration/systemconfiguration.vue')
            },

      ]      
    }   
  ]
})
