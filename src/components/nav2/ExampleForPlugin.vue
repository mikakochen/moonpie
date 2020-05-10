<template>
    <div v-loading="loading">
        <h4 class="sub-title">点击按钮看效果</h4>
        <div class="button-box">
            <el-button type="primary" @click="openPartScreen">部分Loading</el-button>
            <el-button type="primary" @click="openFullScreen">全局Loading</el-button>
            <el-button type="primary" @click.stop="doToast">自定义Toast插件</el-button>
        </div>
        <h4>自定义指令</h4>
        <div v-red>指令生效，字体变红</div>
        <div>dev分支代表2。0版本，假装有新功能</div>
    </div>
</template>

<script>
    export default {
        name: 'Product',
        components: {
            
        },
        data() {
            return {
                loading: false
            }
        },
        directives: {     // 局部自定义指令，只在当前组件有效
            red: {
                bind: function() {
                    console.log('bind')
                },
                inserted: function(e){
                    console.log('inserted')
                    e.style.color = 'red';
                }
            }
        },
        methods: {
            doToast: function(){
                this.$toast('成功调用Toast')
            },
            openPartScreen(){
                this.loading = true;
                setTimeout( () => {
                    this.loading = false;
                }, 2000)
            },
            openFullScreen(){
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.6)'
                })
                setTimeout( () => {
                    loading.close();
                }, 2000)
            }
        }

    }
</script>

<style scoped>
.button-box{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.button-box button{
    display: inline-block;
}
.sub-title{
    font-weight: normal;
    color: #666;
    margin-left: 1rem;
    margin-bottom: 2rem;
}
</style>
