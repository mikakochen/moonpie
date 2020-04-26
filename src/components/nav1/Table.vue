<template>
    <el-container>
        <!-- 表格 v-loading stripe -->
        <el-table :data="tableData" stripe v-loading="loading" style="width: 100%">
            <el-table-column prop="date" label="日期" width="180"></el-table-column>
            <el-table-column prop="name" label="姓名" width="180"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
            <el-table-column width="150" label="操作">
                <template slot-scope="scope">
                    <el-button @click="editRow(scope.row)" type="primary" size="small">编辑</el-button>
                    <el-button @click="deleteRow(scope.row)" type="danger" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 弹窗 = status-icon--输入框内验证效果的图标 = =  =format显示的日期格式= =value-format传入的日期格式= -->
        <el-dialog title="编辑" :visible.sync="dialogTableVisible">
            <el-form :model="editForm" status-icon :rules="editFormRules" ref="editForm" :label-width="formLabelWidth" class="edit-form">
                <el-form-item label="姓名" prop="name">
                    <el-input type="text" name="name" v-model="editForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="日期" prop="date">
                    <el-date-picker v-model="editForm.date" type="date" placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
                <el-form-item label="地址" prop="address">
                    <el-input  type="text" name="address" v-model="editForm.address" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogTableVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitEditForm('editForm')">确 定</el-button>
            </div>
        </el-dialog>
    </el-container>
</template>

<script>
// import Vue from 'vue'
export default {
    name: 'Table',
    data: function() {
        return {
            tableData: [],
            loading: true,
            dialogTableVisible: false,
            editForm: {
                name: '',
                date: '',
                address: ''
            },
            formLabelWidth: '80px',
            editFormRules: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'change' },
                    { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'change' }
                ],
                date: [
                    { required: true, message: '请选择日期', trigger: 'change' }
                ],
                address: [
                    { required: true, message: '请选择地址', trigger: 'change' }
                ]
            }
        }
    },
    created(){
        this.$http.get("http://127.0.0.1:3000/table").then((res) => {
            // console.log(res)
            if(res.body != '' && res.body.length > 0) {
                this.tableData = res.body;
            }
        });
    },
    mounted() {
       this.loading = false;
    },
    methods: {
        // 编辑这条数据
        editRow(row) {
            this.editForm = row;
            this.dialogTableVisible = true;
        },

        // 删除一条数据
        deleteRow(row) {
            this.$confirm('是否删除此条数据?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 发请求

                this.$message({type: 'success',message: '删除成功!'});
            }).catch(() => {
            });
        },

        // 提交编辑后的表单
        submitEditForm(formName) {
            this.$refs[formName].validate((validate) => {
                if(validate) {
                    // 发请求

                    this.dialogTableVisible = false;
                    this.$message({type: 'success',message: '编辑成功!'});
                } else {
                    return false;
                }
            })
        }
    }
}
</script>

<style scoped>




</style>


