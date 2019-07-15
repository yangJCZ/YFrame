<template>
    <el-breadcrumb separator="/">
        <transition-group name="breadcrumb">
            <el-breadcrumb-item
                    v-for="(item, index) in breadcrumbList"
                    :key="item.path"
                    :to="{name: item.name}"
                    :class="{'is-last-link': index==breadcrumbList.length-1}">
                {{item.meta.name}}
            </el-breadcrumb-item>
        </transition-group>
    </el-breadcrumb>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: "Breadcrumb",

        computed: {
            ...mapState('app', {
                breadcrumbList: 'breadcrumbList',
            }),
        },

        methods: {
            getB() {
                ('c', this.$store)
            }
        },
        mounted() {
            this.getB()
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

    /* breadcrumb transition */
    .breadcrumb-enter-active,
    .breadcrumb-leave-active {
        transition: all .9s;
    }

    .breadcrumb-enter,
    .breadcrumb-leave-active {
        opacity: 0;
        transform: translateX(30px);
    }

    .breadcrumb-move {
        transition: all .9s;
    }

    .breadcrumb-leave-active {
        position: absolute;
    }
</style>

<style rel="stylesheet/scss" lang="scss" >
    #app .is-last-link .el-breadcrumb__inner {
        color: #97a8be;
        cursor: text;
    }
</style>


