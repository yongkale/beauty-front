<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 账单</el-breadcrumb-item>
                <el-breadcrumb-item>散客列表</el-breadcrumb-item>
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
        <div>
            总收入：{{totolMoney? totolMoney : 0}}
        </div>
        <el-table
            :data="tableData"
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
                searchday: '',
                formatstartday: '',
                formatendday: '',
                totolMoney: 0,
                tableData: [],
            }
        },
        mounted: function() {
            this.findbill();
        },
        methods: {
            findbill() {
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
                    axios.get('/api/bill/findbill?startday=' + this.formatstartday + '&endday=' + this.formatendday).then( (res) => {
                        this.totolMoney = res.data
                    });

                    axios.get('/api/commmonuser/findAll?startday=' + this.formatstartday + '&endday=' + this.formatendday).then( (res) => {
                        console.log(res.data)
                        this.tableData = res.data
                    })
                } 
            }
        },
    }
</script>

<style src="../../../static/css/datasource.css"></style>