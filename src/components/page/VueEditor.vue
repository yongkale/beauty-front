<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 普通用户</el-breadcrumb-item>
                <el-breadcrumb-item>会员列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div>搜索：<el-input style="width: 50%" @change="search()" v-model="searchKey" placeholder="请输入搜索"></el-input></div>
        <br />
        <el-table
            :data="tableData"
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
                prop="phoneNumber"
                label="手机号"
                width="130">
            </el-table-column>
            <el-table-column
                prop="memberMeony"
                label="金额"
                width="70">
            </el-table-column>
            <el-table-column
                prop="createDate"
                label="支付时间"
                width="180">
            </el-table-column>
            <el-table-column
                prop="repsoenPerson"
                label="责任人"
                width="80">
            </el-table-column>

            <el-table-column
            fixed="right"
                label="操作"
                width="180">
                <template slot-scope="scope">
                    <el-button @click="detail(scope.row)" type="text" size="small">记录</el-button>
                    <el-button @click="eidt(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button @click="recharge(scope.row)" type="text" size="small">充值</el-button>
                    <el-button @click="cost(scope.row)" type="text" size="small">消费</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block pagination-list">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 20, 50]"
            :page-size= "pageSzie"
            layout="total, sizes, prev, pager, next, jumper"
            :total= "total">
            </el-pagination>
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
                pageSzie: 5,
                total: 0,
                currentPage: 1,
                searchKey: '',
                url: './static/datasource.json',
                information: {
                    pagination:{},
                    data:[]
                },
                tableData: [],
                actions: [
                    {
                        text: 'Click',
                        class: 'btn-primary',
                        event(e, row) {
                            self.$message('选中的行数： ' + row.row.id);
                        }
                    }
                ],
            }
        },
        mounted: function() {
            //  axios.get('/api/member/findAll', this.ruleForm).then( (res) => {
            //     this.tableData = res.data;
            //  })
            this.search();
        },
        methods: {
            handleSizeChange(pageSzie) {
                this.pageSzie = pageSzie;
                this.search();
            },
            handleCurrentChange(currentPage) {
                this.currentPage = currentPage;
                this.search();
            },
            search() {
                this.searchKey = this.searchKey.replace('\\','');
                axios.get('/api/member/search?searchKey=' + this.searchKey + "&pageSzie=" + this.pageSzie + "&pageNo=" + this.currentPage).then( (res) => {
                    this.tableData = res.data.records
                    this.total = res.data.totalRecord;
                });
            },
            detail(row) {
                this.$router.push({ path: '/memberredetail', query: {memberId: row.memberId, idRef: row.id}})
            },
            recharge(row) {
                this.$router.push({ path: '/memberrecharge', query: {memberId: row.memberId}})
            },
            cost(row){
                this.$router.push({ path: '/memberrecost', query: {memberId: row.memberId}})
            },
            eidt(row) {
                this.$router.push({ path: '/editusertable', query: {id: row.id}})
            },
            changePage(values) {
                this.information.pagination.per_page = values.perpage;
                this.information.data = this.information.data;
            },
            onSearch(searchQuery) {
                this.query = searchQuery;
            }
        },
    }
</script>

<style>
    .pagination-list {
        margin-top: 20px;
    }
</style>