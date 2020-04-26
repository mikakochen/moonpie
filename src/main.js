// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import App from './App'   前面有./会导致webpack报错
import App from 'App'
import router from './router'
// 引入插件VueResource用来发送http请求,vuex执行状态管理
import VueResource from 'vue-resource'  
import Vuex from 'vuex'
import store from './vuex/index'
// 引入自定义插件
import Toast from './plugins/toast'


Vue.config.productionTip = false

// 调用插件,包括自定义插件
Vue.use(ElementUI);
Vue.use(VueResource);
Vue.use(Vuex);
Vue.use(Toast);

// 注册全局自定义组件
Vue.component('global-component',{
  data: function(){
    return {
      msg: '我是全局注册组件'
    }
  },
  template: '<div>{{ msg }}</div>'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
