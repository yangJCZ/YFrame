<template>

    <!-- 隐藏 / 展开 侧边栏 -->
    <div :class="{'is-active': isActive}" @click="clickHamburger">
        <base-icon icon="el-icon-s-fold" ></base-icon>
    </div>

</template>

<script>
    export default {
        name: "Hamburger",
        data() {
            return {
                isActive: true
            }
        },
        computed: {
        },
        methods: {
            clickHamburger() {
                this.isActive = !this.isActive
                this.$store.commit('app/SET_NAV_COLLAPSE')
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
