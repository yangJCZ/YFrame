/* 常规路由 */
import Login from '@/views/login'
import Layout from '@/views/layout'
import Home from '@/views/home'
import NotFound from '@/views/404'


/* 系统管理 */
const System = () => import('@/views/system')
const Role = () => import('@/views/system/role')
const Log = () => import('@/views/system/log')


export const ConstRoutes = [
    {
        path: '/login',
        name: 'Login',
        component: Login
    }
]

export const MRoutes = [
    {
        path: '/',
        name: 'MainContent',
        component: Layout,
        redirect: 'home',
        meta: { name: "首页", icon: 'el-icon-setting'},
        children: [
            {
                path: 'home',
                name: 'home',
                component: Home,
                meta: { name: "首页", icon: 'el-icon-setting'}
            }
        ]
    },
    {
        path: '*',
        name: "notFound",
        component: NotFound,
    }
]

// 主内容区的路由
export const DynamicRoutes = [

    // 系统管理
    {
        path: '/system',
        name: 'system',
        component: System,
        meta: {icon: 'el-icon-setting', name: '系统管理' },
        children:[
            {
                path: 'role',
                name: 'role',
                component: Role,
                meta: {icon: 'el-icon-setting', name: '角色管理' }
            },
            {
                path: 'log',
                name: 'log',
                component: Log,
                meta: {icon: 'el-icon-setting', name: '日志管理' }
            }
        ]
    }

]




