// 引入Vue组件
import Vue from 'vue'
// 引入ElementUI组件和样式
import ElementUI from 'element-ui';            // 组件文件（js）
import 'element-ui/lib/theme-chalk/index.css'; // 样式文件
// 引入顶级组件 
import App from './App.vue'
// 引入路由文件
import router from './router'
// 引入axios组件
import axios from 'axios'

//引入公用样式
import '@/styles/common.less';

//引入解构组件Message
import {Message} from 'element-ui';

// 注册elementui
Vue.use(ElementUI);

//把axios挂在vue的原型上
Vue.prototype.axios = axios;
//console.log(axios)

//全局路由守卫beforeEach
router.beforeEach((to, from, next) => {
  const token = window.localStorage.getItem('token');//获取token
  if(token){//存在 直接放行
    next();
  }else{//不存在 判断是否是登录页
    if (to.path == '/login') {
      next();
    } else {
      Message.error('请先登录');
      return next({"path":"/login"});//跳转至登录页
    }
  }
})

// 阻止生产提示
Vue.config.productionTip = false
// 创建vue实例对象  挂载dom  把路由和app顶级组件传入 渲染进入dom容器中
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
