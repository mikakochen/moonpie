<template>
  <div id="app">

    <transition name="fade"
		            mode="out-in">
			<router-view></router-view>
		</transition>
    
    
  </div>
</template>

<script>


export default {
  name: 'App',
  components: {
  },
  data() {
    return {
    }
  }
}

//定义一个空的Vue实例
    // var Event=new Vue();
    
</script>

<style>
@import url(../static/css/common.scss);
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  height: 100vh;
}
#app > section{
  height: 100vh;
}
.header{
  height: 15%;
  border-bottom: 1px solid #ccc;
}
.left-box, .left-box img, .right-box{
  height: 100%;
}
.left-box{
  float: left;
}
.right-box{
  float: right;
}
.icon-box{
  display: inline-block;
}


</style>
