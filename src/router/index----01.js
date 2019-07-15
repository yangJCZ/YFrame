import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/login'
import Layout from '@/views/layout'
import Home from '@/views/home'

Vue.use(Router)

import {navTree} from "../../static/data";

const router = new Router({
    routes: [
        {
            path: '/login',
            component: Login
        }
    ]
})

const DynamicRoutes = [
    {
        path: '',
        component: Layout,
        children: [
            {
                path: 'home',
                name: 'home',
                component: Home,
                meta: { title: "首页", icon: 'el-icon-setting'}
            }
        ]
    }
]

/**
 * 路由守卫
 */
router.beforeEach((to, from, next) => {

    if (router.options.routes[0].children.length == 1){
        loadDynamicMenuAndRoutes('userName', to, from)
    }
    next()
})

/**
 * 加载动态菜单和路由
 * @param userName
 * @param to
 * @param from
 */
function loadDynamicMenuAndRoutes(userName, to, from) {

    let dynamicRoutes = addDynamicRoutes(navTree)
    router.options.routes[0].children = router.options.routes[0].children.concat(dynamicRoutes)
    router.addRoutes(router.options.routes)
}


/**
 * 添加动态(菜单)路由
 * @param {*} menuList 菜单列表
 * @param {*} routes 递归创建的动态(菜单)路由
 */
function addDynamicRoutes(menuList = [], routes = []) {
    let temp= []
    for (let i = 0, len = menuList.length; i < len; i++) {
        let menu = menuList[i];
        if (menu.children && menu.children.length > 0){
            temp = temp.concat(menu.children)
        }else if (menu.url && /\S/.test(menu.url)){
            menu.url = menu.url.replace(/^\//, '')

            // 创建路由
            let route = {
                name: menu.name,
                path: menu.url,
                component: null,
                meta: {
                    icon: menu.icon,
                    index: menu.id
                }
            }
            let componentPath = getComponentPath(menu.url)
            route['component'] = resolve => require([`@/views/${componentPath}`], resolve)
            routes.push(route)
        }
    }

    if (temp.length > 0){
        addDynamicRoutes(temp, routes)
    }

    return routes
}

/**
 * 获取组件的路径
 * @param menuUrl
 * @returns {string}
 */
function getComponentPath(menuUrl) {
    let componentPath = ''
    let array = menuUrl.split('/')
    for (let j = 0; j < array.length; j++) {
        componentPath += array[j].substring(0, 1).toUpperCase() + array[j].substring(1) + '/'
    }
    componentPath = componentPath.substring(0, componentPath.length -1)
    return componentPath
}

export default router
