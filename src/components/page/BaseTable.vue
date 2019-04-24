<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 普通用户</el-breadcrumb-item>
                <el-breadcrumb-item>添加消费</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box">
            <el-form  :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">


                <el-form-item label="金额" prop='payMoney'>
                    <el-input v-model="ruleForm.payMoney"></el-input>
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

                <el-form-item label="类型" prop='costType'>
                    <el-select v-model="ruleForm.costType" placeholder="请选择">
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
                    // commonId: '',
                    costType: '',
                    payMoney: '',
                    assginPerson: '',
                    leaderPerson: '',
                    repsoenPerson: '',
                },
                person: '',
                rules: {
                    
                    repsoenPerson: [
                        { required: true, message: '请输入', trigger: 'blur' }
                    ],
                    leaderPerson: [
                        { required: true, message: '请输入', trigger: 'blur' }
                    ],
                    assginPerson: [
                        { required: true, message: '请输入', trigger: 'blur' }
                    ],
                    // commonId: [
                    //     { required: true, message: '请输入', trigger: 'blur' }
                    // ],
                    payMoney: [
                        { required: true, message: '请输入', trigger: 'blur' }
                    ]
                }
            }
        },
        mounted: function() {
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
                        axios.post('/api/commmonuser/save?type=create', this.ruleForm).then( (res) => {
                            this.user = res.data;
                            if (res.data) {
                                this.ruleForm = {
                                    costType: '',
                                    payMoney: '',
                                    assginPerson: '',
                                    leaderPerson: '',
                                    repsoenPerson: '',
                                };
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