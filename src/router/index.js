import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import login from '@/components/login'

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  routes: [
    {
      path: '/one',
      name: '导航一',
      icon: 'el-icon-menu',
      meta: { requiresAuth: false },   // 表示需要路由守卫，登录之后才能访问
      component: (resolve) => require(['../components/Home.vue'], resolve),
      children: [
        { path: '/one/tab',  name: 'Tab', icon: 'el-icon-location', component: (resolve) => require(['../components/nav1/Tab.vue'], resolve)},
        { path: '/one/form',  name: 'Form',icon: 'el-icon-document',component: (resolve) => require(['../components/nav1/Form.vue'], resolve)},
        { path: '/one/table',  name: 'Table',icon: 'el-icon-share',component: (resolve) => require(['../components/nav1/Table.vue'], resolve)},
      ]
    },{
      path: '/two',
      name: '导航二',
      icon: 'el-icon-edit',
      isLeaf: true,
      meta: { requiresAuth: false },   // 表示需要路由守卫，登录之后才能访问
      component: (resolve) => require(['../components/Home.vue'], resolve),
      children: [
        { path: '/two/productList',  name: '列表示例', icon: 'el-icon-location', component: (resolve) => require(['../components/nav2/ProductList.vue'], resolve)},
        { path: '/two/toast',  name: '自定义插件和组件', icon: 'el-icon-s-operation', component: (resolve) => require(['../components/nav2/ExampleForPlugin.vue'], resolve)},
        { path: '/two/slot',  name: '插槽', icon: 'el-icon-s-operation', component: (resolve) => require(['../components/nav2/SlotExample.vue'], resolve)},
        { path: '/two/list',  name: '递归组件', icon: 'el-icon-s-operation', component: (resolve) => require(['../components/nav2/RecursMenu.vue'], resolve)},
      ]
    },{
      path: '/login',
      name: 'Login',
      component: (resolve) => require(['../components/Login.vue'], resolve),
      hidden: true
    },{
      path: '/404',
      name: 'Error',
      redirect: { path: '/404' },
      component: (resolve) => require(['../components/404.vue'], resolve),
      hidden: true
    },{
        path: '*',
        hidden: true,
        redirect: { path: '/one' }
    }
  ]
})

//全局路由导航守卫
router.beforeEach((to, from, next) => {
  // 判断是否已登录，to.matched指向routes里匹配的数组，some是数组的一个方法，record:router
  if(to.matched.some(record => record.meta.requiresAuth)){
    if(to.name == 'login'){
      next();
    }else{
      // 判断浏览器里该用户有没有token,有值的话就表示已授权，没有的话就重回登录
      if(localStorage.getItem('isLogin') && localStorage.getItem('isLogin') !== ''){
        next();
      }else{
        next('/login');
      }
    }
  }else{
    console.log('请先登录');
    next();

  }

  // 如果本地存在token，则不允许直接跳转到 登录页面
  if (to.fullPath === "/login") {
    if (localStorage.getItem('isLogin')) {
      next({
        path: from.fullPath
      });
    } else {
      next();
    }
  }
})
// 把静态的路由表导出去
export default router


