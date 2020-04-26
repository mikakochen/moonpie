import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource'
import moduleA from './modules/collection';
import moduleB from './modules/userInfo';

// 引入vuex，VueResource
Vue.use(Vuex);
Vue.use(VueResource);

// 需要管理多个状态时，要用到modules
// 创建vuex实例
const store = new Vuex.Store({
    modules: {
        a: moduleA,
        b: moduleB
    }
});

// 导出store
export default store;