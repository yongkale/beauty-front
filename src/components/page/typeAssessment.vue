<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 考核</el-breadcrumb-item>
                <el-breadcrumb-item>类型考核：</el-breadcrumb-item>
            </el-breadcrumb>
            <el-radio-group v-model="type" @change="changeType" size="small" style="margin-top: 15px;">
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
               <!-- <el-form-item label="请选择类型" prop="peploeName">
                    <el-select v-model="peploeName" placeholder="请选择" @change="findbillBypeploeName()">
                        <el-option v-for="(item, index) in type" :key="index" :label="item.employeeName" :value="item.employeeName"></el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item label="请选择类型" prop='memberType'>
                    <el-select v-model="memberType" placeholder="请选择" @change="changeType()">
                        <el-option key="bbk" label="美容" value="美容"></el-option>
                        <el-option key="xtc" label="美发" value="美发"></el-option>
                        <el-option key="imoo" label="美甲" value="美甲"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </div>
        <div style="clear: both;"></div>
        <div v-show="'全部' === type">
            <div id="myChart" :style="{width: '300px', height: '300px'}"></div>
            <div id="myChart1" :style="{width: '300px', height: '300px'}"></div>
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

        <el-table v-show="'会员' === type"
            :data="tableData"
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
    export default {
        data: function(){
            const self = this;
            return {
                endday: new Date(),
                startday: new Date(),
                searchday: new Date(),
                formatstartday: '',
                formatendday: '',
                memberType: '',
                person: [],
                tableData: [],
                commonTableData: [],
                rules: [],
                type: "全部",
                memberBar: 0,
                memberSkin: 0,
                memberNail: 0,
                bar: 0,
                skin: 0,
                nail: 0,
            }
        },
        mounted: function() {
            this.changeType();
        },
        methods: {
            drawLineMemrber(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('myChart'))
                // 绘制图表
                myChart.setOption({
                    title: { text: '会员消费' },
                    tooltip: {},
                    xAxis: {
                        type: 'category',
                        data: ["美容","美发","美甲"]
                    },
                    yAxis: {type: 'value'},
                    series: [{
                        name: '人数',
                        type: 'bar',
                        data: [this.memberBar, this.memberSkin, this.memberNail]
                    }]
                });
            },
            drawLine(){
            let myChart1 = this.$echarts.init(document.getElementById('myChart1'))
                // 绘制图表
                myChart1.setOption({
                    title: { text: '普通消费' },
                    tooltip: {},
                    xAxis: {
                        type: 'category',
                        data: ["美容","美发","美甲"]
                    },
                    yAxis: {type: 'value'},
                    series: [{
                        name: '人数',
                        type: 'bar',
                        data: [this.bar, this.skin, this.nail]
                    }]
                    
                });
            },
            count() {
                let isSearch = false;

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

                    if ('全部' === this.type) {
                        axios.get('/api/membercost/findCountByType?startday=' + this.formatstartday + '&endday=' + this.formatendday).then( (res) => {
                            res.data.forEach((data) => {
                                if (data['member_type'] === '美发') {
                                    this.memberBar = data['count']
                                }

                                if (data['member_type'] === '美容') {
                                    this.memberSkin = data['count']
                                }

                                if (data['member_type'] === '美甲') {
                                    this.memberNail = data['count']
                                }

                            }) 

                             this.drawLineMemrber();
                        });

                        axios.get('/api/commmonuser/findCountByType?startday=' + this.formatstartday + '&endday=' + this.formatendday).then( (res) => {
                            res.data.forEach((data) =>{
                                if (data['cost_type'] === '美发') {
                                    this.bar = data['count']
                                }

                                if (data['cost_type'] === '美容') {
                                    this.skin = data['count']
                                }

                                if (data['cost_type'] === '美甲') {
                                    this.nail = data['count']
                                }

                            });
                            this.drawLine();
                        });
                    }
                }
            },
            changeType() {
                if ('全部' === this.type) {
                    this.count();
                    return;
                }

                let isSearch = false;

                if (this.memberType) {
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

                    if ('会员' === this.type) {
                        axios.get('/api/membercost/findMemberType?memberType=' + this.memberType + '&startday=' + this.formatstartday + '&endday=' + this.formatendday).then( (res) => {
                            this.tableData = res.data
                        });
                    }

                    if ('普通' == this.type) {
                        axios.get('/api/commmonuser/findByType?type=' + this.memberType + '&startday=' + this.formatstartday + '&endday=' + this.formatendday).then( (res) => {
                            this.commonTableData = res.data
                        });
                    }

                }
            }
        }
    }
</script>

<style>
  #myChart {
        margin-top: 20px;
        float: left;
    }

    #myChart1 {
        margin-top: 20px;
        float: left;
        margin-left: 50px;
    }
</style>