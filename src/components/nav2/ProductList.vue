<template>
    <el-row :gutter="20">
        <global-component :span="24"></global-component>
        <el-col :span="8">
            <product-item :transferData="transferData" @childEvent="fatherEvent()"></product-item>
        </el-col>
        <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
</template>

<script>

// import { provide } from "@vue/composition-api";
import ProductItem from 'ProductItem';
// 父组件为控制组件，处于高位拥有控制权，子组件为视图组件。
// 父组件传递数据给子组件使用，遇到业务逻辑操作时子组件触发父组件的自定义事件。
// 1 父 =》子 通过 props 传递数据
// 2 父 =》子 通过 $on 传递方法 ，不推荐 this.$parent
// 3 子 =》父 通过 $emit 传递数据, 不推荐 $refs
    export default {
        name: 'ProductList',
        components: {
            ProductItem
        },
        data() {
            return {
                transferData: {
                    title: '淘宝爆款',
                    price: 100,
                    total: 20

                }
            }
        },
        methods: {
            fatherEvent() {
                setInterval( ()=> {
                    this.transferData.total = 0;
                },3000)
            }
        }

    }
</script>

<style scoped>
/* 通过父组件影响子组件的css写法 .a /deep/ .b { ... } */
</style>
