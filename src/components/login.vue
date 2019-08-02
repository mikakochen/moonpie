<template>
    <el-row type="flex" class="row-bg form-box" justify="center" align="middle">
        <el-col :span="12" class="form-wrapper">
            <h3 class="title">系统登录</h3>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                    <el-input type="text" name="username" v-model="ruleForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" name="password" v-model="ruleForm.password" show-password></el-input>
                </el-form-item>
                <el-form-item :span="24">
                    <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>

        </el-col>

    </el-row>
    <!-- <div class="container" id="login"> -->
    <!-- </div> -->
</template>

<script>
export default {
    name: 'Login',
    data(){
        return {
            ruleForm: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请填写密码', trigger: 'change' }
                ]

            }
        }
    },
    methods: {
        // 提交表单
        submitForm(formName) {
            // console.log(this.ruleForm)
            // element-ui的表单验证方法，照着写就行了
            this.$refs[formName].validate((valid) => {
            if (valid) {
                // 发送请求到服务器验证该用户是否已注册
                // emulateJSON:true 设置post请求为表单数据，不然报错404
                this.$http.post('http://127.0.0.1:3000/login', this.ruleForm, {emulateJSON:true}).then((res) => {
                    // 返回找到的该用户数据
                    // console.log(res)
                    // 如果已注册，就保存token到本地,并且跳转到路由中的主页路径
                    if(res.body.token !== ''){
                        localStorage.setItem('isLogin', res.body.token);
                        this.$router.push({ path: '/' });
                    }
                }).catch((err) => {
                    console.log(err);
                });
            } else {
                console.log('error submit!!');
                return false;
            }
            });
      },
      // 清空表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>

<style>
.form-box{
    width: 100vw;
    height: 100vh;
}
.form-wrapper{
    box-shadow: 0 0 10px ;
    margin: auto;
}
.title{
    margin: 20px auto;
}
.demo-ruleForm{
    margin: auto;
    padding: 0 20px;
}
</style>




