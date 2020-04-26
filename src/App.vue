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

.icon-box{
  display: inline-block;
}
.inner-block{
  display: inline-block;

}


</style>
