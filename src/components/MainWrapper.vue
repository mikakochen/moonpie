<template>
    <el-main>
          <!-- <router-view/> -->
        <el-tabs v-model="editableTabsValue2" type="card" @tab-remove="removeTab">
        <el-tab-pane label="欢迎页面" closable>
            欢迎欢迎，热烈欢迎
        </el-tab-pane>
        <el-tab-pane
            closable
            v-for="(item, index) in editableTabs2"
            :key="item.name"
            :label="item.title"
            :name="item.name"
        >
            {{item.content}}
        </el-tab-pane>
        </el-tabs>
    </el-main>
</template>

<script>
// import Vue from 'vue'
export default {
    name: 'MainWrapper',
    data: function() {
        return {
            editableTabsValue2: '2',
            editableTabs2: [{
                title: 'Tab 1',
                name: '1',
                content: 'Tab 1 content'
            }, {
                title: 'Tab 2',
                name: '2',
                content: 'Tab 2 content'
            }],
            tabIndex: 2
        }
    },
    mounted() {
        // Event.$on('target-name', targetName => {
        //     alert(targetName);
        // })
    },
    methods: {
        removeTab(targetName) {
            let tabs = this.editableTabs2;
            let activeName = this.editableTabsValue2;
            if (activeName === targetName) {
                tabs.forEach((tab, index) => {
                if (tab.name === targetName) {
                    let nextTab = tabs[index + 1] || tabs[index - 1];
                    if (nextTab) {
                    activeName = nextTab.name;
                    }
                }
                });
            }
            this.editableTabsValue2 = activeName;
            this.editableTabs2 = tabs.filter(tab => tab.name !== targetName);
        }
    }
}
</script>

<style>

</style>


