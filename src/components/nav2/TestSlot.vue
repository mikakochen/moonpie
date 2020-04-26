<template>
    <div class="product-content">
        <header>子组件公共内容</header>
        <!-- 在页面里留占位符，父组件向占位符传什么，子组件就显示什么 -->
        <slot name="left"></slot>
        <slot name="right"></slot>
    </div>
</template>

<script>
    export default {
        name: 'TestSlot',
        props: {
            transferData: {
                type: Object,
                default: {}
            }
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
