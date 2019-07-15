<template><div>
    <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
        <el-radio-button :label="false">展开</el-radio-button>
        <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group>
    <el-menu  class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
             :collapse="isCollapse">
        <navbar-tree></navbar-tree>
    </el-menu>
</div>
</template>
<style>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
</style>

<script>
    import NavbarTree from "@/views/layout/components/navbar-tree"
    export default {
        data() {
            return {
                isCollapse: true
            };
        },
        components: {
            NavbarTree
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .bg {
        height: 100%;
        width: 100%;
        background: #1f2d3d;
        color: yellow;
        text-align: center;
        padding: 250px 0 0 0;
        font-weight: bold;
        font-size: 140px;
        letter-spacing: 30px;
    }
</style>
