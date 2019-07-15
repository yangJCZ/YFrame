<template>
    <div class="app-wrapper" :class="appCls">
        <app-navbar/>
        <div class="main-wrapper">
            <app-header />
            <app-main />
        </div>
        <div v-if="device==='mobile'&&!navCollapse" class="drawer-bg" @click="handleClickOutside"/>
    </div>
</template>

<script>

    import AppHeader from "./components/layout-header"
    import AppNavbar from "./components/layout-navbar"
    import AppMain from "./components/layout-main"
    import { mapState } from 'vuex'

    export default {
        name: "index",
        data() {
          return {
              timer: null
          }
        },

        components: {
            AppHeader,
            AppNavbar,
            AppMain
        },

        computed: {
            ...mapState('app', {
                navCollapse: 'navCollapse',
                device: 'device'
            }),

            appCls() {
                return {
                    'hideNavbar': this.navCollapse,
                    'mobile': this.device === 'mobile'
                }
            }
        },

        // 渲染DOM节点之前，监控窗体的resize事件
        beforeMount() {
            this.mobileSet()
            window.addEventListener('resize', this.resizeHandler)
        },

        methods: {
            handleClickOutside() {
                this.$store.commit('app/SET_NAV_COLLAPSE')
            },

            isMobile(){
                const rect = document.body.getBoundingClientRect()
                return rect.width <= 992
            },
            mobileSet() {
                let isMobile = this.isMobile()
                this.$store.commit('app/SET_DEVICE', isMobile ? "mobile" : "desktop")
                if (isMobile){
                    this.$store.commit('app/CLOSE_NAV')
                }
            },
            resizeHandler() {
                if (this.timer) {
                    clearTimeout(this.timer);
                }
                this.timer = setTimeout(()=> {
                    this.mobileSet()
                }, 300)
            }
        }
    }
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
    @import "layout";
    .app-wrapper {
        position: relative;
        width: 100%;
        height: 100%;

    }
    .main-wrapper {
        position: relative;
        z-index: 999;
        min-height: 100%;
        transition: margin-left .5s;
        margin-left: $navWidth;
        background-color: #f2f2f2;
    }
    .hideNavbar.mobile {
        .main-wrapper {
            margin-left: 0 !important;
        }

        .navbar-container{
            pointer-events: none;
            width: $navWidth !important;
            transform: translate3d(-$navWidth, 0, 0);
            transition: transform .5s;

        }
    }
    .mobile{
        .main-wrapper {
            margin-left: 0 !important;
        }
        .navbar-container{
            transform: translate3d(0, 0, 0);
            transition: transform .5s;
        }
    }
    .drawer-bg{
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0, 0.4);
        position: absolute;
        z-index: 1000;
        top: 0;
    }


</style>

<style rel="stylesheet/scss" lang="scss" >
    @import "layout";
    .hideNavbar {
        .navbar-container{
            width: $navWidthHide !important;
        }
        .main-wrapper {
            margin-left: $navWidthHide !important;
        }

    }

</style>
