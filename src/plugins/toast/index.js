import Toast from './toast.vue';

const ToastPlugin = {};

ToastPlugin.install = function (Vue, options) {
    // 生成一个vue的子类，相当于一个组件
    const ToastComponent = Vue.extend(Toast);
    // 再创建一个这个子类的实例
    const toast = new ToastComponent();
    // 新建一个空的div,把实例挂载到div上
    toast.$mount(document.createElement('div'));
    // 再把div插入到body中
    document.body.appendChild(toast.$el);



    // 1. 添加全局方法或属性
    // Vue.myGlobalMethod = function () {
    //   // 逻辑...

    // }
  
    // 2. 添加全局资源
    // Vue.directive('toast', {
    //   bind (el, binding, vnode, oldVnode) {
    //     // 逻辑...
    //   }
      
    // })
  
    // 3. 注入组件选项
    Vue.mixin({
      created: function () {
        // 逻辑...
      }
    })
  
    // 4. 添加实例方法
    Vue.prototype.$toast =  (message, duration=2000) => {
      // 调用$toast方法时，把message传入给toast插件
      toast.message = message;
      toast.show = true;
      setTimeout( () => {
          toast.show = false;
      },duration)

    }
  }

  export default ToastPlugin;