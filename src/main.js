// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//初始化数据
import Mock from './mock'
Mock.bootstrap();
Vue.config.productionTip = false
Vue.use(ElementUI);

import 'font-awesome/css/font-awesome.min.css'
/* eslint-disable no-new */
router.beforeEach((to,from,next)=>{
	if (to.path=='/login') {
		sessionStorage.removeItem('user');
	}
	//假如跳转的不是登录页面,则需要验证是否已经有登录信息,
	//如果没有则需要重新重定向到login页面
	let user = JSON.parse(sessionStorage.getItem('user'));
	if (!user && to.path != '/login') {
		next({path: '/login'});
	}else{
		next();
	}
})
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
