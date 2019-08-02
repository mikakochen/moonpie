<template>
  <el-container>
      <el-header :span="24" class="header clearfix">
        <div class="left-box">
          <img src="../assets/mac-logo.png">
          <span>管理系统</span>
        </div>
        <!-- <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect"
                  background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
          
        </el-menu> -->
        <div class="right-box">
          <span>欢迎您，姓名！</span>
          <div class="icon-box">
            <!-- <i class="el-icon-question"></i>
            <i class="el-icon-setting"></i>
            <i class="el-icon-bell"></i> -->
            <!-- <router-link to="/login"><i>登录</i></router-link>
            <router-link to="/404"><i>错误</i></router-link> -->
          </div>
        </div>
      </el-header>
      <el-container>
        <!-- 左侧菜单 -->
        <el-aside width="200px" class="aside">
          <!-- 鼠标悬浮在el-menu属性上即可看到注释 -->
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            collapse-transition
            router
            unique-opened
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <template v-for="(item, index) in asides" v-if="!item.hidden">
              <!-- 有子菜单用submenu,v-if用来判断这级节点是否是叶子节点 -->
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
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
            </el-breadcrumb>
          </el-header>
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-main>

      </el-container>
    </el-container>
</template>

<script>
// Vue.prototype.$http = axios;
export default {
  name: 'Home',
  components: {
  },
  data () {
    return {
       asides: []
    }
  },
  // 渲染模板之前，用created钩子函数-获取网页数据
  created() {
    // alert('created')
    // 第一版是根据后台返回的数据生成导航
    // this.$http.get("http://127.0.0.1:3000/aside")
    //     .then((res) => {
    //         // console.log(res)
    //         if(res.body != '' && res.body.length > 0) {
    //           this.asides = res.body;
    //           this.childAsides = this.asides.filter(item => item.parentID !== '0');
    //           this.asides = this.asides.filter(item => item.parentID === '0');
    //           console.log(this.childAsides);
    //         }
    //     });

    // 第二版决定使用网友们的版本，在路由里写好路径，然后在视图里解析
    this.asides = this.$router.options.routes;
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
   
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.aside{
  background-color: rgb(84, 92, 100);
}
</style>
