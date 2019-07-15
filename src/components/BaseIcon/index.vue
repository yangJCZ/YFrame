<template>
    <i :class="icon"></i>
</template>

<script>
    export default {
        name: "Icon",
        props: {
            icon: String
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .icon-container {
        display: inline-block;
        font-size: 20px;
    }
</style>
