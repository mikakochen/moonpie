<template>
  <el-container direction="vertical">
      <my-header ref="myHeader"></my-header>
      <el-container>
        <!-- 左侧菜单 -->
        <el-aside width="200px" class="aside">
          <!-- 鼠标悬浮在el-menu属性上即可看到注释 -->
          <el-menu class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
                   router default-active="1" @open="handleOpen" @close="handleClose" collapse-transition unique-opened>
            <template v-for="(item, index) in asides" v-if="!item.hidden">

              <!-- 有子菜单用submenu,v-if用来判断这级节点是否有子集 -->
              <el-submenu v-if="item.children" :index="item.path" :key="item.path">
                <template slot="title">
                  <i :class="item.icon"></i>
                  <span>{{item.name}}</span>
                </template>
                <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path">
                  <i :class="child.icon"></i>
                  <span>{{child.name}}</span>
                </el-menu-item>
              </el-submenu>

              <!-- 没有子菜单用el-menu-item -->
              <el-menu-item v-else :key="item.path" :index="item.index">
                <i v-bind:class="item.icon"></i>
                <span slot="title">{{item.name}}</span>
              </el-menu-item>
            </template>
          </el-menu>
        </el-aside>

        <el-main>
          <el-header>
            <el-breadcrumb separator-class="el-icon-arrow-right" class="inner-block">
              <el-breadcrumb-item v-for="item in $route.matched" :key="item.index">
                {{item.name}}
              </el-breadcrumb-item>
            </el-breadcrumb>
            <i class="collect" :class="[isCollected ? 'el-icon-star-on' : 'el-icon-star-off']"
               @click="collect($route)"></i>
          </el-header>
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-main>

      </el-container>
    </el-container>
</template>

<script>
import MyHeader from 'MyHeader';
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'Home',
  components: {
    MyHeader
  },
  data () {
    return {
       asides: [],
       isCollected : false
    }
  },
  computed: {
    ...mapState({
      collectUnit: state => state.a.collectUnit,
    })
  },
  // 渲染模板之前，用created钩子函数-获取网页数据
  created() {
    // 第二版决定使用网友们的版本，在路由里写好路径，然后在视图里解析
    this.asides = this.$router.options.routes;
  },
  watch: {
    // 因为收藏状态会因当前路由不同而改变，所以需要监听路由
    $route : 'isCollectedFun'
  },
  methods: {
    // 判断收藏夹里有没有当前路由
    isCollectedFun() {
      this.isCollected = this.$refs.myHeader.collectUnit.some((item) => item.path === this.$route.path);
      return this.isCollected;
    },

    // 点击左侧导航菜单的触发事件
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },

    //收藏当前路由，先发送给vuex,再弹出通知
    collect($route){
      let collectMe = new Promise((resolve, reject) => {
        if(!this.isCollected){
          this.$store.dispatch('addFun', $route);
          resolve('success');
        }else{
          this.deleteThis($route);
        }
        // 切换收藏状态
        this.isCollected = !this.isCollected;
      }).then(result =>{
        this.$notify({
          title: '操作成功',
          message:  '您已放入收藏夹！',
          duration: 3000,
          offset: 100
        });
      }).catch(result =>{
        console.log('failed' + result);
      })
    },

    // 删除一个收藏,父组件调用子组件的方法deleteThis
    deleteThis(item) {
      this.$refs.myHeader.deleteThis(item);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.aside{
  background-color: rgb(84, 92, 100);
}
.collect{
    float: right;
    transform: scale(1.5);
  }
</style>
