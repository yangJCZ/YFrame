import { DynamicRoutes, MRoutes } from "@/router/routes";
import router from '@/router'

const state = {
    token: null,
    userName: '',
    userId: '',
    userMenu: [],
    allRoutes: []
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },

    SET_USER_NAME: (state, userName) => {
        state.userName = userName
    },

    SET_USER_ID: (state, userId) => {
        state.userId = userId
    },

    SET_USER_MENU: (state, userMenu) => {
        state.userMenu = userMenu
    },
    SET_ALL_ROUTES: (state, allRoutes) => {
        state.allRoutes = allRoutes
    }
}

const actions = {
    async loadUserRoutes({commit, state}) {
        let res = await this._vm.$api.user.getUserRoutes({id: state.userId})

        /* 1. 筛选所需要的路由 */
        let routes = recursionRouter(res.data, DynamicRoutes)
        let MainContainer = MRoutes.find(v => v.path === '/')
        let children = MainContainer.children
        children.push(...routes)

        /* 添加动态路由*/
        commit('SET_USER_MENU', children)
        setDefaultRoute([MainContainer])
        console.log('================================')
        router.addRoutes(MRoutes)

        // 整合所有路由
        let initialRoutes = router.options.routes
        commit('SET_ALL_ROUTES', [...initialRoutes, ...MRoutes])

    }
}

/**
 *
 * @param  {Array} userRouter 后台返回的用户权限json
 * @param  {Array} allRouter  前端配置好的所有动态路由的集合
 * @return {Array} realRoutes 过滤后的路由
 */
function recursionRouter(userRouter = [], allRouter = []) {
    var realRoutes = []
    allRouter.forEach((v, i) => {
        userRouter.forEach((item, index) => {
            if (item.name === v.meta.name) {
                if (item.children && item.children.length > 0) {
                    v.children = recursionRouter(item.children, v.children)
                }
                realRoutes.push(v)
            }
        })
    })
    return realRoutes
}

function setDefaultRoute(routes) {
    routes.forEach((v, i) => {
        if (v.children && v.children.length > 0) {
            v.redirect = { name: v.children[0].name }
            setDefaultRoute(v.children)
        }
    })
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
