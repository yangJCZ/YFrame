<template>
    <el-scrollbar class="navbar-container" wrap-class="scrollbar-wrapper">

<!--        <div class="logo">-->
<!--            <img src="@/assets/logo.png" >-->
<!--        </div>-->

        <el-menu :default-active="activePath"
                 :background-color="variables.navBg"
                 :text-color="variables.navText"
                 :active-text-color="variables.navTextActive"
                 :collapse-transition ='false'
                 :collapse="navCollapse">
            <navbar-tree v-for="item in userMenu" :key="item.name" :menu="item"></navbar-tree>
        </el-menu>
    </el-scrollbar>

</template>
<style>

</style>
<script>
    import variables from "../layout.scss"
    import NavbarTree from "./navbar-tree"
    import { mapState } from 'vuex'


    export default {
        name: "layout-navbar",
        components: {
            NavbarTree
        },
        computed: {
            activePath() {
              return this.$router.currentRoute.name
            },
            variables() {
                return variables
            },
            ...mapState('user', {
                userMenu: 'userMenu',
            }),
            ...mapState('app', {
                navCollapse: 'navCollapse',
            })
        },
        methods: {}
    }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "../layout";
    .navbar-container {
        background: $navBg;
        transition: width .5s;
        width: $navWidth;
        height: 100%;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 1001;
        overflow: hidden;
        font-size: 0; // 防止间隙
    }
</style>

<style rel="stylesheet/scss" lang="scss">
    .navbar-container {
        .scrollbar-wrapper {
            overflow-x: hidden !important;
        }
        .el-scrollbar__view {
            height: 100%;
        }

        .el-menu {
            height: 100%;
            border: none;
        }
        .logo {
            height: 50px;
            line-height: 50px;
            text-align: center;
            background: #fff;
            display: flex;
            align-items: center;
        }
    }
</style>
