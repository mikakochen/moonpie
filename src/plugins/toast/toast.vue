<template>
    <transition name="fade">
        <div class="toast" v-show="show">
            {{message}}
        </div>

    </transition>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      message: ""
    };
  }
   //   没有props选项
};
</script>

<style  scoped>
.toast {
  position: fixed;
  top: 40%;
  left: 50%;
  margin-left: -15vw;
  padding: 2vw;
  width: 20vw;
  font-size: 2vw;
  color: #fff;
  text-align: center;
  background-color: rgba(78, 78, 78, 0.8);
  border-radius: 5vw;
  z-index: 999;
}


</style>