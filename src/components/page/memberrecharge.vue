<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 会员用户</el-breadcrumb-item>
                <el-breadcrumb-item>会员充值</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box">
            <el-form  :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
                <el-form-item label="手机号" prop="phoneNumber">
                    <el-input v-model="ruleForm.phoneNumber" disabled=true ></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="ruleForm.name" disabled=true ></el-input>
                </el-form-item>
                <el-form-item label="ID" prop="memberId">
                    <el-input v-model="ruleForm.memberId" disabled=true ></el-input>
                </el-form-item>

                <el-form-item label="金额" prop='memberMeony'>
                    <el-input v-model="ruleForm.memberMeony"></el-input>
                </el-form-item>

                <el-form-item label="次数" prop='memberNumber'>
                    <el-input v-model="ruleForm.memberNumber"></el-input>
                </el-form-item>

                <el-form-item label="备注" prop='remarks'>
                    <el-input v-model="ruleForm.remarks"></el-input>
                </el-form-item>


                <el-form-item label="类型" prop='memberType'>
                    <el-input v-model="ruleForm.memberType" disabled=true ></el-input>
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
            return {
                person: ''
                ,
                ruleForm: {
                    memberId: '',
                    memberType: '',
                    memberMeony: '',
                    remarks: '',
                    memberNumber: '',
                    phoneNumber: '',
                    name: '',
                    repsoenPerson: '',
                },
                rules: {
                    repsoenPerson: [
                        { required: true, message: '请输入', trigger: 'blur' }
                    ],
                    memberNumber: [
                        { required: true, message: '请输入', trigger: 'blur' }
                    ],
                    memberMeony: [
                        { required: true, message: '请输入', trigger: 'blur' }
                    ]
                }
            }
        },
        mounted: function() {
            let memberId = this.$route.query.memberId; 
            let memberType = this.$route.query.memberType;
            axios.get('/api/member/findMemberUserBytypeAndId?memberId=' + memberId + "&memberType=" + memberType).then( (res) => {
                this.ruleForm = res.data;
                this.ruleForm.repsoenPerson = '';
                this.ruleForm.memberNumber = '';
                this.ruleForm.memberMeony = '';
            })
            axios.get('/api/employee/findAll', this.ruleForm).then( (res) => {
                this.person = res.data;
                console.log(this.person);
             })
        },
        methods: {
            onSubmit(formName) {
                const self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.post('/api/rechage/save', this.ruleForm).then( (res) => {
                            this.user = res.data;
                            if (res.data) {
                                self.$router.push('/memberList');
                                this.$message('添加成功');
                            } else {
                                this.$message('添加失败');
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