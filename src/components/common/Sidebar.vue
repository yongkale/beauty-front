<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                    // {
                    //     icon: 'el-icon-setting',
                    //     index: 'readme',
                    //     title: '自述'
                    // },
                    {
                        icon: 'el-icon-menu',
                        index: '2',
                        title: '散客用户',
                        subs: [
                            {
                                index: 'basetable',
                                title: '添加消费'
                            },
                            // {
                            //     index: 'vuetable',
                            //     title: '散客列表'
                            // }
                        ]
                    },
                    {
                        icon: 'el-icon-date',
                        index: '3',
                        title: '会员用户',
                        subs: [
                            {
                                index: 'baseform',
                                title: '添加会员'
                            },
                            {
                                index: 'memberList',
                                title: '会员列表'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-date',
                        index: '4',
                        title: '员工管理',
                        subs: [
                            {
                                index: 'addemployee',
                                title: '添加员工'
                            },
                            {
                                index: 'empolyeelist',
                                title: '员工列表'
                            },
                        ]
                    },
                    {
                        icon: 'el-icon-date',
                        index: '5',
                        title: '账单',
                        subs: [
                            {
                                index: 'billTotal',
                                title: '账单统计'
                            },
                            {
                                index: 'findBill',
                                title: '散客账单'
                            },
                            {
                                index: 'findMemberBill',
                                title: '会员账单'
                            },
                        ]
                    },
                    // {
                    //     icon: 'el-icon-star-on',
                    //     index: 'basecharts',
                    //     title: '图表'
                    // },
                    // {
                    //     icon: 'el-icon-upload2',
                    //     index: 'drag',
                    //     title: '拖拽'
                    // }
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 70px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
