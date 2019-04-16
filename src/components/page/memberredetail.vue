<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 会员消费</el-breadcrumb-item>
                <el-breadcrumb-item>{{memberId}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
<!--        <div class="block">
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
        -->
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="memberId"
                label="会员ID"
                width="130">
            </el-table-column>
            <el-table-column
                prop="memberType"
                label="类型"
                width="130">
            </el-table-column>
            <el-table-column
                prop="memberMeony"
                label="金额"
                width="126">
            </el-table-column>
            <el-table-column
                prop="memberNumber"
                label="次数"
                width="130">
            </el-table-column>
            <el-table-column
                prop="remarks"
                label="备注"
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
                // url: './static/datasource.json',
                // information: {
                //     pagination:{},
                //     data:[]
                // },
                endday: '',
                startday: '',
                searchday: '',
                formatstartday: '',
                formatendday: '',
                totolMoney: 0,
                tableData: [],
                memberId: ''
                // actions: [
                //     {
                //         text: 'Click',
                //         class: 'btn-primary',
                //         event(e, row) {
                //             self.$message('选中的行数： ' + row.row.id);
                //         }
                //     }
                // ],
            }
        },
        mounted: function() {
            let memberId = this.$route.query.memberId; 
            this.memberId = memberId;
            let memberType = this.$route.query.memberType;
            axios.get('/api/membercost/findByMemberIdAndMemberType?memberId=' + memberId + "&memberType=" + memberType).then( (res) => {
                this.tableData = res.data;
                console.log(tableData)
            })
        },
    }
</script>

<style src="../../../static/css/datasource.css"></style>