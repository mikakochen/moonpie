<template>
    <div>
        <div class="menu" v-for="(item, index) in list" :key="index">
            <span>{{item.name}}</span>
            <div v-if="item.children" class="menu-row">
                <menu-item :list="item.children"></menu-item>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'MenuItem',
        props: {
            list: Array
        },
        mounted() {
        }
    }
</script>

<style scoped>
.menu{
    margin-left: 20px;
}
.menu-row{
    min-height: 30px;
}

</style>
