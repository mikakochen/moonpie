<template>
    <div>
        <header>示例：酒店列表（4级）</header>
    
        <!-- 渲染三级以上的菜单，用到递归组件 -->
        <div class="menu-list">
            <menu-item :list="list"></menu-item>
        </div>
    </div>
</template>

<script>
    import MenuItem from './RecursMenuItem';
    export default {
        name: 'RecursMenu',
        components: {
            MenuItem
        },
        data() {
            return {
                list:[{
                    name: "经济",
                    children: [{
                        name: "如家",
                        children: [{
                            name: "长江路-如家",
                            children: [{
                                name: "长江路-如家一店"
                            }]
                        }, {
                            name: "望江路-如家"     
                        }]
                    }, {
                        name: "7天",
                        children: [{
                            name: "长江路-7天"
                        }, {
                            name: "望江路-7天"     
                        }]
                    }]
                },{
                    name: "商务"
                }]
             }
        },
        mounted() {
        }
    }
</script>

<style scoped>
.menu-list{
    margin-top: 20px;
    margin-left: 10px;
    font-weight: 400;
    color: #606266;
    cursor: text;
    font-size: 14px;
}

</style>
