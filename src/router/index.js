import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'js-cookie'
import store from '@/store'
import { ConstRoutes } from "@/router/routes";

Vue.use(Router)

const router = new Router({
    routes: ConstRoutes
})


/**
 * 路由守卫 - 添加动态路由
 */
router.beforeEach((to, from, next) => {
    let token = Cookies.get('token')
    if (to.path === '/login'){
        if (token){
            next({path: "/"})
        } else {
            next()
        }
    }else {
        if (token){
            if (store.state.user.userMenu.length == 0){
                store.dispatch('user/loadUserRoutes')
                    .then(()=> {
                        next({path: to.path})
                    }).catch((e)=>{
                      console.log('user/loadUserRoutes', e.message)
                })
            } else {
                if (to.path !== '/login'){
                    next()
                } else {
                    next(from.fullPath)
                }
            }
        }else {
            next({path: "/login"})
        }
    }
})

/**
 *
 */
router.afterEach((to, from, next) => {
    let routerList = to.matched
    store.commit('app/SET_BREADCRUMB_LIST', routerList)
})

export default router
