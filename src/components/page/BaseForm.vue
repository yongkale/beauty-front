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
                <el-form-item label="ID" prop="memberId">
                    <el-input v-model="ruleForm.memberId" v-numberInt="ruleForm.memberId"></el-input>
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

                <el-form-item label="类型" prop='memberType'>
                    <el-select v-model="ruleForm.costType" placeholder="请选择">
                        <el-option  v-for="(item, index) in costTypes" :key="item.id" :label="item.name" :value="item.name"></el-option>
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
                    costTypes: [],
                },
                rules: {
                    repsoenPerson: [
                        { required: true, message: '请输入', trigger: 'blur' }
                    ],
                    memberId: [
                        { required: true, message: '请输入', trigger: 'blur' }
                    ],
                    phoneNumber: [
                        { required: true, message: '请输入', trigger: 'blur' }
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
             
             this.getType();
        },
        methods: {        
            getType() {
                axios.get('./static/data.json').then( (res) => {
                    this.costTypes = res.data.type;
                })
            },
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