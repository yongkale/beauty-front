<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 考核</el-breadcrumb-item>
                <el-breadcrumb-item>员工考核：</el-breadcrumb-item>
            </el-breadcrumb>
            <el-radio-group v-model="type" @change="changeType()" size="small" style="margin-top: 15px;">
                <el-radio-button label="全部"></el-radio-button>
                <el-radio-button label="会员"></el-radio-button>
                <el-radio-button label="普通"></el-radio-button>
            </el-radio-group>
        </div>


        <div class="block" style="float: left;">
            <span class="demonstration">请选择时间: </span>
            <el-date-picker
                v-model="startday"
                type="date"
                @change="changeType()"
                placeholder="选择开始日期">
            </el-date-picker>

            <el-date-picker
                v-model="endday"
                type="date"
                @change="changeType()"
                placeholder="选择结束日期">
            </el-date-picker>
        </div>

        <div class="form-box" v-show="'全部' != type" style="float: left; width: 400px;">
            <el-form ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="请选择员工" prop="peploeName">
                    <el-select v-model="peploeName" placeholder="请选择" @change="changeType()">
                        <el-option v-for="(item, index) in person" :key="index" :label="item.employeeName" :value="item.employeeName"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </div>

        <el-table
            :data="commonTableData" v-show="'普通' === type"
            style="width: 100%">
            <el-table-column
                prop="costType"
                label="类型"
                width="130">
            </el-table-column>
            <el-table-column
                prop="payMoney"
                label="金额"
                width="130">
            </el-table-column>
            <el-table-column
                prop="payDate"
                label="支付时间"
                width="180">
            </el-table-column>
            <el-table-column
                prop="repsoenPerson"
                label="责任人"
                width="190">
            </el-table-column>
            <el-table-column
                prop="leaderPerson"
                label="导师"
                width="190">
            </el-table-column>
            <el-table-column
                prop="assginPerson"
                label="助理"
                width="190">
            </el-table-column>
        </el-table>

        <el-table
            :data="tableData"  v-show="'会员' === type"
            style="width: 100%">
            <el-table-column
                prop="memberId"
                label="会员ID"
                width="134">
            </el-table-column>
            <el-table-column
                prop="memberType"
                label="类型"
                width="100">
            </el-table-column>
            <el-table-column
                prop="costMoney"
                label="消费金额"
                width="100">
            </el-table-column>
            <el-table-column
                prop="remarks"
                label="备注"
                width="142">
            </el-table-column>
            <el-table-column
                prop="payDate"
                label="支付时间"
                width="181">
            </el-table-column>
            <el-table-column
                prop="leaderPerson"
                label="导师"
                width="180">
            </el-table-column>
            <el-table-column
                prop="assginPerson"
                label="助理"
                width="180">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import axios from 'axios';
    import Datasource from 'vue-datasource';
    export default {
        data: function(){
            const self = this;
            return {
                endday: new Date(),
                startday: new Date(),
                formatstartday: '',
                formatendday: '',
                peploeName: '',
                person: [],
                tableData: [],
                rules: [],
                type: "全部",
                commonTableData: []
            }
        },
        mounted: function() {
            axios.get('/api/employee/findAll', this.ruleForm).then( (res) => {
                this.person = res.data;
            })
        },
        methods: {
            findbillBypeploeName() {
                axios.get('/api/membercost/peploeName?peploeName=' + this.peploeName).then( (res) => {
                    this.tableData = res.data
                    // console.log(res.data);
                });
            },
            changeType() {

                let isSearch = false;

                if (this.peploeName) {
                    isSearch = true;
                }

                if (this.startday) {
                    isSearch = true;
                    var d = new Date(this.startday);  
                    this.formatstartday = '' + d.getFullYear() + ((d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)) + ((d.getDate() + 1) < 10 ? '0' + (d.getDate()) : (d.getDate()));  
                }

                if (this.endday) {
                    isSearch = true;
                    d = new Date(this.endday);  
                    this.formatendday = '' + d.getFullYear() + ((d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)) + ((d.getDate() + 1) < 10 ? '0' + (d.getDate()) : (d.getDate()));  
                }

                if (isSearch) {

                    if ("会员" === this.type) {
                        axios.get('/api/membercost/peploeName?peploeName=' + this.peploeName + '&startday=' + this.formatstartday + '&endday=' + this.formatendday).then( (res) => {
                            this.tableData = res.data
                            // console.log(res.data);
                        });
                    }

                    if ('普通' === this.type) {
                        axios.get('/api/commmonuser/peploeName?peploeName=' + this.peploeName + '&startday=' + this.formatstartday + '&endday=' + this.formatendday).then( (res) => {
                            this.commonTableData = res.data
                            // console.log(res.data);
                        });
                    }
                }

                console.log(this.type);
            }
        }
    }
</script>

<style src="../../../static/css/datasource.css"></style>