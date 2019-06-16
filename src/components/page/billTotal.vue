<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 账单</el-breadcrumb-item>
                <el-breadcrumb-item>账单统计</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="block">
            <span class="demonstration">请选择时间: </span>
            <el-date-picker
                v-model="startday"
                type="date"
                @change="findbill()"
                placeholder="选择开始日期">
            </el-date-picker>

            <el-date-picker
                v-model="endday"
                type="date"
                @change="findbill()"
                placeholder="选择结束日期">
            </el-date-picker>
        </div>
        <div class="income">
            <span>总收入：<span class="income-conut">{{membertotolMoney + totolMoney}}</span></span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span>会员总收入：<span class="income-conut">{{membertotolMoney}}</span></span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span>散客总收入：<span class="income-conut">{{totolMoney}}</span></span>
        </div>
        <div style="clear: both;"></div>
        <div>
            <div id="myChart" :style="{width: '400px', height: '400px'}"></div>
            <!-- <div id="myChart4" :style="{width: '300px', height: '300px'}"></div>-->
            <div style="clear: both;"></div>
            <div id="myChart1" :style="{width: '300px', height: '300px'}"></div>
            <!--<div id="myChart2" :style="{width: '300px', height: '300px'}"></div>-->
        </div>
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
                searchday: '',
                formatstartday: '',
                totolMoney: 0,
                tableData: [],
                membertotolMoney: 0,
                memberBar: 0,
                memberSkin: 0,
                memberNail: 0,
                bar: 0,
                skin: 0,
                nail: 0,
                other: 0,
                memberother: 0,
                costTypes: [],
                costTypesName: [],
            }
        },
        mounted: function() {
             this.findbill();
             
             this.getType();
        },
        methods: {
            getType() {
                axios.get('./static/data.json').then( (res) => {
                    this.costTypes = res.data.type;
                    this.costTypes.forEach((value) => {
                        this.costTypesName.push(value.name)
                    });
                })
            },
            drawLine(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('myChart'))
                // 绘制图表
                myChart.setOption( {
                    title : {
                        text: '总收入',
                        subtext: '',
                        x:'center',
                        y: 50,
                        textStyle: {
                            color:'rgb(248, 128, 80)',
                            padding: [500, 10],
                            fontStyle :'oblique',
                            fontWeight :'400',
                            fontFamily :'sans-serif',
                            fontSize :'24',
                        },
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    series : [
                        {
                            name: '收入',
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            data:[
                                {value: this.membertotolMoney, name: '会员'},
                                {value: this.totolMoney, name: '散客'},
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                });
            },
            findbill() {
                let isSearch = false;
                let startday = '';
                let endday = '';
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
                    let common = axios.get('/api/bill/findbill?startday=' + this.formatstartday + '&endday=' + this.formatendday).then( (res) => {
                       return this.totolMoney = res.data
                    });

                    let member = axios.get('/api/bill/findmemberbill?startday=' + this.formatstartday + '&endday=' + this.formatendday).then( (res) => {
                       return this.membertotolMoney = res.data
                    });

                    Promise.all([common, member]).then( () => {
                        if (!this.totolMoney) {
                            this.totolMoney = 0;
                        }

                        if (!this.membertotolMoney) {
                            this.membertotolMoney = 0;
                        }

                        this.drawLine();
                    });

                    let com = axios.get('/api/commmonuser/findMoneyByType?startday=' + this.formatstartday + '&endday=' + this.formatendday).then( (res) => {
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

                            if (data['cost_type'] === '其它') {
                                this.other = data['count']
                            }
                        });
                        this.drawLineType();
                    });

                    // let mem = axios.get('/api/rechage/findMoneyByType?startday=' + this.formatstartday + '&endday=' + this.formatendday).then( (res) => {
                    //     res.data.forEach((data) => {
                    //         if (data['member_type'] === '美发') {
                    //             this.memberBar = data['count']
                    //         }

                    //         if (data['member_type'] === '美容') {
                    //             this.memberSkin = data['count']
                    //         }

                    //         if (data['member_type'] === '美甲') {
                    //             this.memberNail = data['count']
                    //         }

                    //         if (data['member_type'] === '其它') {
                    //             this.memberother = data['count']
                    //         }
                    //     }) 

                    //         this.drawLineMemrber();
                    // });

                    
                    // Promise.all([mem, com]).then( () => {
                    //     this.drawLineTotal();
                    // });
                    
                } 
            },
            drawLineType(){
            let myChart1 = this.$echarts.init(document.getElementById('myChart1'))
                // 绘制图表
                myChart1.setOption({
                    title: { text: '普通收入' },
                    tooltip: {},
                    xAxis: {
                        type: 'category',
                        data: this.costTypesName
                    },
                    yAxis: {type: 'value',},
                    series: [{
                        name: '金额',
                        type: 'bar',
                        data: [this.bar, this.skin, this.nail, this.other]
                    }]
                    
                });
            },
            // drawLineMemrber(){
            //     // 基于准备好的dom，初始化echarts实例
            //     let myChart2 = this.$echarts.init(document.getElementById('myChart2'))
            //     // 绘制图表
            //     myChart2.setOption({
            //         title: { text: '会员收入' },
            //         tooltip: {},
            //         xAxis: {
            //             type: 'category',
            //             data: this.costTypesName
            //         },
            //         yAxis: {type: 'value'},
            //         series: [{
            //             name: '金额',
            //             type: 'bar',
            //             data: [this.memberBar, this.memberSkin, this.memberNail, this.memberother]
            //         }]
            //     });
            // },
            // drawLineTotal(){
            //     // 基于准备好的dom，初始化echarts实例
            //     let myChart4 = this.$echarts.init(document.getElementById('myChart4'))
            //     // 绘制图表
            //     myChart4.setOption({
            //         title: { text: '总收入' },
            //         tooltip: {},
            //         xAxis: {
            //             type: 'category',
            //             data: this.costTypesName
            //         },
            //         yAxis: {type: 'value'},
            //         series: [{
            //             name: '金额',
            //             type: 'bar',
            //             data: [this.memberBar + this.bar, this.memberSkin + this.skin, this.memberNail + this.nail, this.other + this.memberother]
            //         }]
            //     });
            // },
        },
    }
</script>

<style scoped>
    .income {
        margin-top: 10px;
        color: #97a8be;
    }

    .income-conut {
        color: red;
    }
    #myChart {
        margin-top: 20px;
        float: left;
    }
    #myChart1 {
        margin-top: 20px;
        float: left;
        margin-left: 50px;
    }

    #myChart2 {
        margin-top: 20px;
        float: left;
        margin-left: 250px;
    }

    #myChart4 {
        margin-top: 80px;
        float: right;
        margin-right: 150px;
    }
</style>