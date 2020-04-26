<template>
    <card class="product-content">
        <div class="bg"></div>
        <header>{{ transferData.title }}</header>
        <span>价格： {{ transferData.price }}软妹币</span>
        <span>库存： {{ transferData.total }}</span>
    </card>
</template>

<script>
    export default {
        name: 'Product',
        props: {
            transferData: {
                type: Object,
                default: {}
            }
        },
        mounted() {
            this.$emit('childEvent');
        }

    }
</script>

<style scoped>
.product-content{
    border-radius: 4px;
    min-height: 40px;
}

</style>
