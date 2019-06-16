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
                prop="employeeId"
                label="员工ID"
                width="180">
            </el-table-column>
            <el-table-column
                prop="employeeName"
                label="员工姓名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="employeePhone"
                label="员工电话">
            </el-table-column>
            <el-table-column
                prop="employeeType"
                label="员工类型">
            </el-table-column>
            <el-table-column
            fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button @click="eidt(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button @click="leave(scope.row)" type="text" size="small">离职</el-button>
                </template>
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
                url: './static/datasource.json',
                information: {
                    pagination:{},
                    data:[]
                },
                tableData: [],
            }
        },
        mounted: function() {
             axios.get('/api/employee/findAll', this.ruleForm).then( (res) => {
                this.tableData = res.data;
             })
        },
        methods: {
            leave(row) {
                axios.get('/api/employee/delete?id=' + row.id).then( (res) => {
                    this.tableData = res.data;
                });
            },
            detail(row) {
                console.log(row);
            },
            eidt(row) {
                this.$router.push({ path: '/editempolyee', query: {id: row}})
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

<style></style>