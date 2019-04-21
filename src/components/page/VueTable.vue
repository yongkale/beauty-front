<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 普通用户</el-breadcrumb-item>
                <el-breadcrumb-item>用户列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="costType"
                label="类型"
               width="180">
            </el-table-column>
            <el-table-column
                prop="payMoney"
                label="金额"
                width="117">
            </el-table-column>
            <el-table-column
                prop="payDate"
                label="支付时间"
                width="180">
            </el-table-column>
            <el-table-column
                prop="repsoenPerson"
                label="责任人"
               width="180">
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
             axios.get('/api/commmonuser/findAll', this.ruleForm).then( (res) => {
                this.tableData = res.data
                console.log(this.tableData);
             })
        },
        methods: {
            detail(row) {
                console.log(row);
            },
            eidt(row) {
                this.$router.push({ path: '/editusertable', query: {memberId: row.memberId, memberType: row.memberType}})
            },
            changePage(values) {
                this.information.pagination.per_page = values.perpage;
                this.information.data = this.information.data;
            },
            onSearch(searchQuery) {
                this.query = searchQuery;
            }
        },
        computed:{
            getData(){
                const self = this;
                return self.information.data.filter(function (d) {
                    if(d.name.indexOf(self.query) > -1){
                        return d;
                    }
                })
            }
        }
    }
</script>

<style src="../../../static/css/datasource.css"></style>