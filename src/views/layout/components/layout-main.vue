<template>
    <div class="main-container">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "layout-main"
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .main-container {
        min-height: calc(100vh - 50px - 40px);
        padding:20px 20px;
        position: relative;
        overflow: hidden;
    }
</style>
