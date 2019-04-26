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

        <div style="clear: both;"></div>
        <div v-show="'全部' === type" class="all">
            <p class="title">会员考核</p>
            <div id="myChart" :style="{width: '1000px', height: '300px'}"></div>
            <div style="clear: both;"></div>
            <p class="title">普通考核</p>
            <div id="myChart1" :style="{width: '1000px', height: '300px'}"></div>
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
                commonTableData: [],
                employeeNames: [],
                commonArray: [],
                memberArray: [],
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
                    legend: {},
                    tooltip: {},
                    dataset: {
                        dimensions: ['product', '美发', '美甲', '美容'],
                        source: this.memberArray
                    },
                    xAxis: {type: 'category'},
                    yAxis: {},
                    // Declare several bar series, each will be mapped
                    // to a column of dataset.source by default.
                    series: [
                        {type: 'bar'},
                        {type: 'bar'},
                        {type: 'bar'}
                    ]
                });
            },
            drawLine(){
            let myChart1 = this.$echarts.init(document.getElementById('myChart1'))
                // 绘制图表
                myChart1.setOption({
                    legend: {},
                    tooltip: {},
                    dataset: {
                        dimensions: ['product', '美发', '美甲', '美容'],
                        source: this.commonArray
                    },
                    xAxis: {type: 'category'},
                    yAxis: {},
                    // Declare several bar series, each will be mapped
                    // to a column of dataset.source by default.
                    series: [
                        {type: 'bar'},
                        {type: 'bar'},
                        {type: 'bar'}
                    ]
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
                    let comm = axios.get('/api/performance/countWork?startday=' + this.formatstartday + '&endday=' + this.formatendday).then( (res) => {
                        this.commonArray = res.data;
                        this.drawLine();
                    });

                    let mem = axios.get('/api/performance/membercountWork?startday=' + this.formatstartday + '&endday=' + this.formatendday).then( (res) => {
                        this.memberArray = res.data;
                         this.drawLineMemrber();
                    });
                }
            },
            findbillBypeploeName() {
                axios.get('/api/membercost/peploeName?peploeName=' + this.peploeName).then( (res) => {
                    this.tableData = res.data
                });
            },
            changeType() {
                if ('全部' === this.type) {
                    this.count();
                    return;
                }

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
            }
        }
    }
</script>

<style scoped>
    .all {
        margin-top:20px;
    }
    .title {
        text-align: center;
    }
    #myChart{
        margin-top:5px;
    }
    #myChart1{
        margin-top:5px;
        margin-left: 0;
    }
</style>