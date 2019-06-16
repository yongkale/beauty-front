<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 会员记录</el-breadcrumb-item>
                <el-breadcrumb-item>{{memberId}}</el-breadcrumb-item>
            </el-breadcrumb>
            <el-radio-group v-model="type" @change="changeType" size="small" style="margin-top: 15px;">
                <el-radio-button label="消费"></el-radio-button>
                <el-radio-button label="充值"></el-radio-button>
                <el-radio-button label="修改"></el-radio-button>
            </el-radio-group>
        </div>

        <el-table v-show="'修改' ==type"
            :data="updateTableData"
            style="width: 100%">
            <el-table-column
                prop="memberId"
                label="会员ID"
                width="130">
            </el-table-column>
            <el-table-column
                prop="name"
                label="姓名"
                width="130">
            </el-table-column>
            <el-table-column
                prop="memberMeony"
                label="金额"
                width="70">
            </el-table-column>
            <el-table-column
                prop="remarks"
                label="备注"
                width="250">
            </el-table-column>
            <el-table-column
                prop="createDate"
                label="支付时间"
                width="180">
            </el-table-column>
            <el-table-column
                prop="repsoenPerson"
                label="责任人"
                width="120">
            </el-table-column>
        </el-table>
        
        <el-table v-show="'充值' ==type"
            :data="chagetableData"
            style="width: 100%">
            <el-table-column
                prop="memberId"
                label="会员ID"
                width="148">
            </el-table-column>
            <el-table-column
                prop="phoneNumber"
                label="手机号"
                width="150">
            </el-table-column>
            <el-table-column
                prop="memberMeony"
                label="充值金额"
                width="100">
            </el-table-column>
            <el-table-column
                prop="remarks"
                label="备注"
                width="230">
            </el-table-column>
            <el-table-column
                prop="payDate"
                label="支付时间"
                width="180">
            </el-table-column>
            <el-table-column
                prop="repsoenPerson"
                label="责任人"
                width="130">
            </el-table-column>
        </el-table>

        <el-table v-show="'消费' ==type"
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="memberId"
                label="会员ID"
                width="148">
            </el-table-column>
            <el-table-column
                prop="costMoney"
                label="消费金额"
                width="100">
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
                prop="leaderPerson"
                label="导师"
                width="130">
            </el-table-column>
            <el-table-column
                prop="assginPerson"
                label="助理"
                width="130">
            </el-table-column>
            <el-table-column
                prop="repsoenPerson"
                label="责任人"
                width="130">
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
                type: '消费',
                endday: '',
                startday: '',
                searchday: '',
                formatstartday: '',
                formatendday: '',
                totolMoney: 0,
                tableData: '',
                chagetableData: '',
                updateTableData: '',
                memberId: '',
                idRef: ''
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
            this.memberId = this.$route.query.memberId; 
            this.idRef = this.$route.query.idRef;
            axios.get('/api/membercost/findByMemberIdAndMemberType?memberId=' + this.memberId).then( (res) => {
                this.tableData = res.data;
            })
        },
        methods: {
            changeType() {
                if (!this.chagetableData && "充值" === this.type) {
                    axios.get('/api/bill/findCostMerber?memberId=' + this.memberId).then( (res) => {
                        console.log(res.data)
                        this.chagetableData = res.data
                    })
                }

                if (!this.updateTableData && "修改" === this.type) {
                    axios.get('/api/member/findMemberUserHistoy?idRef=' + this.idRef).then( (res) => {
                        console.log(res.data)
                        this.updateTableData = res.data
                        console.log(this.updateTableData);
                    })
                }
            }
        }
    }
</script>

<style></style>