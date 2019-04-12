<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 普通用户</el-breadcrumb-item>
                <el-breadcrumb-item>添加用户</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box">
            <el-form  :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
                <el-form-item label="手机号">
                    <el-input v-model="ruleForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="卡号" prop="commonId">
                    <el-input v-model="ruleForm.commonId"></el-input>
                </el-form-item>

                <el-form-item label="金额" prop='payMoney'>
                    <el-input v-model="ruleForm.payMoney"></el-input>
                </el-form-item>

                <el-form-item label="类型" prop='costType'>
                    <el-select v-model="ruleForm.costType" placeholder="请选择">
                        <el-option key="bbk" label="美容" value="美容"></el-option>
                        <el-option key="xtc" label="美发" value="美发"></el-option>
                        <el-option key="imoo" label="美甲" value="美甲"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="onSubmit('ruleForm')">提交</el-button>
                    <el-button>取消</el-button>
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
                    commonId: '',
                    costType: '',
                    payMoney: '',
                },
                rules: {
                    commonId: [
                        { required: true, message: '请输入', trigger: 'blur' }
                    ],
                    payMoney: [
                        { required: true, message: '请输入', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            onSubmit(formName) {
                const self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.post('/api/commmonuser/save', this.ruleForm).then( (res) => {
                            this.user = res.data;
                            if (res.data) {
                                localStorage.setItem('ms_username', this.user.userName);
                                self.$router.push('/readme');
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