<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 会员用户</el-breadcrumb-item>
                <el-breadcrumb-item>会员消费</el-breadcrumb-item>
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

                <el-form-item label="消费金额" prop='costMoney'>
                    <el-input v-model="ruleForm.costMoney"></el-input>
                </el-form-item>

                <el-form-item label="备注" prop='remarks'>
                    <el-input v-model="ruleForm.remarks"></el-input>
                </el-form-item>


                <el-form-item label="类型" prop='memberType'>
                    <el-input v-model="ruleForm.memberType" disabled=true ></el-input>
                </el-form-item>

                
                <el-form-item label="导师" prop="leaderPerson">
                    <el-select v-model="ruleForm.leaderPerson" placeholder="请选择">
                        <el-option v-for="(item, index) in person" :key="index" :label="item.employeeName" :value="item.employeeName"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="助理" prop="assginPerson">
                    <el-select v-model="ruleForm.assginPerson" placeholder="请选择">
                        <el-option v-for="(item, index) in person" :key="index" :label="item.employeeName" :value="item.employeeName"></el-option>
                    </el-select>
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
                    remarks: '',
                    costMoney: '',
                    phoneNumber: '',
                    name: '',
                    repsoenPerson: '',
                    leaderPerson: '',
                    assginPerson: '',
                },
                rules: {
                    repsoenPerson: [
                        { required: true, message: '请输入', trigger: 'blur' }
                    ],
                    costMoney: [
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
                this.ruleForm.costMoney = '';
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
                        axios.post('/api/membercost/save', this.ruleForm).then( (res) => {
                            let result = res.data;
                            if (result.status === 1) {
                                this.$message(result.msg);
                            }
                            
                            if (result.status === 0) {
                                this.user = result.data;
                                self.$router.push('/memberList');
                                this.$message('消费成功');
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