<template>
    <el-submenu v-if="menu.children && menu.children.length > 0" :index="menu.name" >
        <template slot="title">
            <base-icon :icon="menu.meta.icon"></base-icon>
            <span>{{menu.meta.name}}</span>
        </template>
        <navbar-tree v-for="menuChildren in menu.children" :key="menuChildren.id" :menu="menuChildren"></navbar-tree>
    </el-submenu>

    <el-menu-item v-else :index="menu.name" @click="handleRouter(menu)">
        <base-icon :icon="menu.meta.icon"></base-icon>
        <span>{{menu.meta.name}}</span>
    </el-menu-item>
</template>

<script>
    export default {
        name: "navbar-tree",
        props:{
            menu: Object
        },
        methods: {
            handleRouter(menu) {
                let name = menu.name
                this.$router.push({name});
                if (this.$store.state.app.device === 'mobile'){
                    this.$store.commit('app/CLOSE_NAV')
                }
            }
        },
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "../layout";
    .el-submenu .el-menu-item {
        background-color: $subNavBg !important;

        &:hover {
            background-color: $subNavHover !important;
        }
    }
    .el-menu-item{
        &:hover{
            color: yellow !important;
        }
    }
</style>

<style rel="stylesheet/scss" lang="scss">
    .el-submenu .el-submenu__title:hover{
        color: yellow !important;
    }

</style>
