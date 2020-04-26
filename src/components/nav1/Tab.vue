<template>
    <el-container>
        <el-row style="width:100%">
            <el-col :span="24">
                <el-tabs v-model="editableTabsValue" type="card" editable @edit="handleTabsEdit">
                     <el-tab-pane label="欢迎页面" closable>
                        欢迎欢迎，热烈欢迎
                    </el-tab-pane>
                    <el-tab-pane v-for="(item, index) in editableTabs" :key="item.name" :label="item.title" :name="item.name">
                        {{item.content}}
                    </el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>
    </el-container>
</template>

<script>
// import Vue from 'vue'
export default {
    name: 'Tab',
    data: function() {
        return {
            editableTabsValue: '2',
            editableTabs: [{
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
        handleTabsEdit(targetName, action) {
            if (action === 'add') {
            let newTabName = ++this.tabIndex + '';
            this.editableTabs.push({
                title: 'New Tab',
                name: newTabName,
                content: 'New Tab content'
            });
            this.editableTabsValue = newTabName;
            }
            if (action === 'remove') {
            let tabs = this.editableTabs;
            let activeName = this.editableTabsValue;
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
            this.editableTabsValue = activeName;
            this.editableTabs = tabs.filter(tab => tab.name !== targetName);
            }
        }
    }
}
</script>

<style>
.add-btn{
    margin-bottom: 20px;
}
</style>


