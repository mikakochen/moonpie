<template>
    <div class="product-content">
        <test-slot>
            <template v-slot:left="sonToDad">
                新的左左左
            <p>用插槽传递的数据：{{sonToDad.data}}</p>
            <!-- sonToDad.data中的data对应slot标签中的v-bind:data -->
            </template>
        </test-slot>

        <test-slot>
            <template v-slot:right>新的右右右</template>
        </test-slot>
    </div>
</template>

<script>
    import TestSlot from './TestSlot';
    export default {
        name: 'SlotExample',
        components: {
            TestSlot
        },
        mounted() {
            // console.log(sonToDad);
        }
    }
</script>

<style scoped>
.product-content{
    margin-top: 10px;
    border-radius: 4px;
    min-height: 40px;
}
</style>
