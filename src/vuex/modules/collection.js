

// moduleA负责存储收藏夹内的内容个数 
const moduleA = {
    state: { 
        collectUnit: []
    },
    // 像是事件注册，或是订阅，只能同步
    mutations:{
        // payload是额外参数，用来应付复杂一点的逻辑，相应地actions应该写store.commit('addCount',count: 1)
        addCount(state, payload) { 
            state.collectUnit.push(payload);
        },
        updateCount(state, newUnit) {
            state.collectUnit = newUnit;
        }
    },
    // 官方建议通过actions(类似于vue-methods)去修改state,而不是直接触发mutation
    actions:{
        // 参数context是具有与store实例具有相同属性的对象,具有addFun({ state, commit, rootState })三个属性/方法
        // 改变state前，先验证是否收藏夹内已收藏
        addFun({state, commit}, item){   
            if(state.collectUnit.length > 0){
                const targetItem = state.collectUnit.find(x => x.path === item.path);
                console.log(targetItem);
                if(!targetItem){
                    commit('addCount', item);
                }
            }else{
                commit('addCount',item);
            }
        },
        deleteFun({state, commit}, item) {
            const newUnit = state.collectUnit.filter(x => x.path !== item.path);
            commit('updateCount', newUnit);
        },
        // 用户退出，把收藏夹内的内容发送给后台
        sendCollection(){
            return new Promise((resolve, reject) => {

            })
        }
    },
    //监听state的状态，相当于vue的mounted
    getters:{   
        getCollects : function(state, getters, rootState){  //这个参数state，就是this.state
            return state.collectUnit;
        }
    }
}

export default moduleA;