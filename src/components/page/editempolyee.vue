<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 员工管理</el-breadcrumb-item>
                <el-breadcrumb-item>添加员工</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box">
            <el-form  :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
                <el-form-item label="员工ID" prop="employeeId">
                    <el-input v-model="ruleForm.employeeId"></el-input>
                </el-form-item>

                <el-form-item label="姓名" prop="employeeName">
                    <el-input v-model="ruleForm.employeeName"></el-input>
                </el-form-item>

                <el-form-item label="手机号" prop='employeePhone'>
                    <el-input v-model="ruleForm.employeePhone"></el-input>
                </el-form-item>

                <el-form-item label="类型" prop='employeeType'>
                    <el-select v-model="ruleForm.employeeType" placeholder="请选择">
                        <el-option key="bbk" label="美容" value="美容"></el-option>
                        <el-option key="xtc" label="美发" value="美发"></el-option>
                        <el-option key="imoo" label="美甲" value="美甲"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="onSubmit('ruleForm')">提交</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<script>
import axios from 'axios';
    export default {
        data: function(){
            return {
                ruleForm: {
                    employeeId: '',
                    employeeType: '',
                    employeeName: '',
                    employeePhone: '',
                },
            }
        },
        mounted: function() {
            console.log(this.$route.query.id);
            this.ruleForm = this.$route.query.id;
        },
        methods: {
            onSubmit(formName) {
                const self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.post('/api/employee/add', this.ruleForm).then( (res) => {
                            this.user = res.data;
                            if (res.data) {
                                self.$router.push('/empolyeelist');
                                this.$message('添加成功');
                            } else {
                                this.$message('登录失败');
                            }
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>