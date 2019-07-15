<template>
    <div class="header-container">
        <!-- 隐藏 / 展开 侧边栏 -->
        <hamburger class="hamburger-container"></hamburger>
        <!-- 面包屑 -->
        <breadcrumb class="breadcrumb-container"></breadcrumb>
        <!-- 右侧内容 -->
        <div class="header-right">

        </div>

    </div>
</template>

<script>

    import Hamburger from '@/components/Hamburger'
    import Breadcrumb from '@/components/Breadcrumb'
    export default {
        name: "layout-header",
        components: {
            Hamburger,
            Breadcrumb
        },
        methods: {
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "../layout";
    .header-container {
        height: $headerHeight;
        line-height: $headerHeight;
        padding: 0 20px;
        background: #fff;
        box-shadow: 0 1px 3px 0 rgba(0,0,0,.12), 0 0 3px 0 rgba(0,0,0,.04);

        .hamburger-container{
            float: left;
            width: 22px;
            height: 100%;
            font-size: 22px;
            cursor: pointer;
        }
        .hamburger-container.is-active {
            transform: rotate(180deg);
        }

        .breadcrumb-container {
            float: left;
            height: 100%;
            line-height: $headerHeight;
            margin-left: 20px;
        }
    }
</style>


<style rel="stylesheet/scss" lang="scss">
    .breadcrumb-container {
        .el-breadcrumb__inner {
            font-weight: 400 !important;
            a {
                font-weight: 400 !important;
            }
        }
    }
</style>
