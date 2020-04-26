<template>
  <el-header>
    <el-row>
      <el-col :span="12" class="left-box">
        <h3>公用组件展示系统</h3>
      </el-col>
      <el-col :span="12" class="right-box clearfix">
        
        <!-- 用户头像的下拉菜单 -->
        <el-dropdown @command="handleCommand" :span="3">
          <span class="el-dropdown-link"><i class="icon-user"></i></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">设置</el-dropdown-item>
            <el-dropdown-item command="c" divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <!-- 收藏夹的下拉菜单 -->
        <el-dropdown @command="collectHandleCommand" :span="3">
          <el-badge :value="collectUnit.length || 0" class="item" type="primary" :span="3" :offset="2">
            <el-button size="small">收藏夹</el-button>
          </el-badge>
          <el-dropdown-menu slot="dropdown">
            <p v-show="collectUnit.length < 1">您还未收藏任何内容</p>
            <el-dropdown-item v-for="(item, index) in collectUnit" :key="index" command="">
              {{index + 1}} / {{item.name}}
              <i class="el-icon-error" @click="deleteThis(item)"></i>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>

    </el-row>
  </el-header>
</template>

<script>
  // 引入mapState 
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'MyHeader',
  data() {
    return {
      isCollected : false
    }
  },
  computed: {
    ...mapState({
      collectUnit: state => state.a.collectUnit
    })
  },
  methods: {
    //点击头像下的下拉菜单
    handleCommand(command) {
      this.$message('click on item ' + command);
    },

    // 点击收藏夹的内容，切换路由
    collectHandleCommand(command) {
      
    },

    // 删除一个收藏
    deleteThis(item) {
      this.$store.dispatch('deleteFun', item);
      this.$notify({
        title: '操作成功',
        message:  '您已删除该收藏！',
        duration: 3000,
        offset: 100
      });
      this.isCollected = false;
    }
  }

}
</script>

<style scoped>
.el-header{
  line-height: 60px;
  border-bottom: 1px solid #ccc;
}
.left-box, .right-box{
  height: 100%;
}

.right-box>*{
  float: right;
}
.el-badge{
  line-height: 30px;
}

  
  .icon-user{
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #ccc;
    margin-left: 20px;
    line-height: normal;
    vertical-align: middle;
  }

</style>

