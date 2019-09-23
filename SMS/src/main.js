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
import '@/styles/common.less'

// 注册elementui
Vue.use(ElementUI);

//把axios挂在vue的原型上
Vue.prototype.axios = axios;
//console.log(axios)

// 阻止生产提示
Vue.config.productionTip = false
// 创建vue实例对象  挂载dom  把路由和app顶级组件传入 渲染进入dom容器中
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
