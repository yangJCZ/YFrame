import store from '@/store'
const MIN_WIDTH = 992

export default {

    // 渲染DOM节点之前，监控窗体的resize事件
    beforeMount() {
        window.addEventListener('resize', this.$_ResizeHandler)
    },

    methods: {
        $_isMobile(){
          const rect = document.body.getBoundingClientRect()
          return rect.width <= MIN_WIDTH
        },
        $_ResizeHandler() {
            setTimeout(()=>{
                let isMobile = this.$_isMobile()
                store.commit('app/SET_DEVICE', isMobile ? "mobile" : "desktop")

                if(isMobile){
                    store.commit('app/CLOSE_NAV')
                }
            }, 20000)

        }
    }

}
