<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 会员用户</el-breadcrumb-item>
                <el-breadcrumb-item>添加会员</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box">
            <el-form  :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
                <el-form-item label="手机号" prop="phoneNumber">
                    <el-input v-model="ruleForm.phoneNumber"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="金额" prop='memberMeony'>
                    <el-input v-model="ruleForm.memberMeony" v-numberInt="ruleForm.memberMeony"></el-input>
                </el-form-item>

                <el-form-item label="备注" prop='remarks'>
                    <el-input v-model="ruleForm.remarks"></el-input>
                </el-form-item>

                <el-form-item label="责任人" prop="repsoenPerson">
                    <el-select v-model="ruleForm.repsoenPerson" placeholder="请选择">
                        <el-option v-for="(item, index) in person" :key="index" :label="item.employeeName" :value="item.employeeName"></el-option>
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
            var checkPhone = (rule, value, callback) => {
                if (!value) {
                return callback(new Error('手机号不能为空'));
                } else {
                const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
                console.log(reg.test(value));
                if (reg.test(value)) {
                    callback();
                } else {
                    return callback(new Error('请输入正确的手机号'));
                }
                }
            };
            return {
                person: ''
                ,
                ruleForm: {
                    memberId: '',
                    memberType: '',
                    memberMeony: '',
                    remarks: '',
                    phoneNumber: '',
                    name: '',
                    repsoenPerson: '',
                },
                rules: {
                    repsoenPerson: [
                        { required: true, message: '请输入', trigger: 'blur' }
                    ],
                    phoneNumber: [
                        {validator: checkPhone, trigger: 'blur'}
                    ],
                    name: [
                        { required: true, message: '请输入', trigger: 'blur' }
                    ],
                    remarks: [
                        { required: true, message: '请输入', trigger: 'blur' }
                    ],
                    memberMeony: [
                        { required: true, message: '请输入', trigger: 'blur' }
                    ]
                }
            }
        },
        mounted: function() {
             axios.get('/api/employee/findAll', this.ruleForm).then( (res) => {
                this.person = res.data;
             })
        },
        methods: {        
            onSubmit(formName) {
                const self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.post('/api/member/save', this.ruleForm).then( (res) => {
                            this.user = res.data;
                            if (res.data) {
                                self.$router.push('/memberList');
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