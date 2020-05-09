<template>
    <div class="product-content">
        <header>子组件公共内容</header>
        <!-- 在页面里留占位符，父组件向占位符传什么，子组件就显示什么 -->
        <!-- slot标签有name属性是具名插槽，v-bind:data属于作用域插槽，作用域插槽用来子组件向父组件传递数据 -->
        <slot name="left" v-bind:data="slotData"></slot>
        <slot name="right"></slot>
    </div>
</template>

<script>
    export default {
        name: 'TestSlot',
        data(){
            return {

                slotData:'我是左插槽要传递的数据'
            }
        },
        props: {
            
        },
        mounted() {
        }

    }
</script>

<style scoped>
.product-content{
    min-height: 40px;
}

</style>
