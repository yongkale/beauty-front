<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 账单</el-breadcrumb-item>
                <el-breadcrumb-item>会员列表</el-breadcrumb-item>
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
                prop="name"
                label="姓名"
                width="150">
            </el-table-column>
            <el-table-column
                prop="phoneNumber"
                label="手机号"
                width="130">
            </el-table-column>
            <el-table-column
                prop="memberMeony"
                label="金额"
                width="126">
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
                prop="remarks"
                label="备注"
                width="240">
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
                endday: new Date(),
                startday: new Date(),
                searchday: '',
                formatstartday: '',
                formatendday: '',
                totolMoney: 0,
                tableData: [],
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
            this.findbill()
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
                    axios.get('/api/bill/findmemberbill?startday=' + this.formatstartday + '&endday=' + this.formatendday).then( (res) => {
                        this.totolMoney = res.data
                    });

                    axios.get('/api/rechage/findAll?startday=' + this.formatstartday + '&endday=' + this.formatendday).then( (res) => {
                        console.log(res.data)
                        this.tableData = res.data
                    })
                } 
            }
            // detail(row) {
            //     console.log(row);
            // },
            // eidt(row) {
            //     this.$router.push({ path: '/editusertable', query: {id: row}})
            // },
            // changePage(values) {
            //     this.information.pagination.per_page = values.perpage;
            //     this.information.data = this.information.data;
            // },
            // onSearch(searchQuery) {
            //     this.query = searchQuery;
            // }
        },
        computed:{
          
        },
        beforeMount(){
            // if(process.env.NODE_ENV === 'development'){
            //     this.url = '/ms/table/source';
            // };
            // axios.get(this.url).then( (res) => {
            //     this.information = res.data;
            // })
        }
    }
</script>

<style></style>