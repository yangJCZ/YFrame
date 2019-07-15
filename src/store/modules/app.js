
import Cookies from 'js-cookie'

const state = {
    device: 'desktop',
    navCollapse: Cookies.get('navCollapse') ? !!+Cookies.get('navCollapse') : false,
    breadcrumbList: []
}

const mutations = {
    SET_NAV_COLLAPSE: (state) => {
        state.navCollapse = !state.navCollapse
        if (state.navCollapse){
            Cookies.set('navCollapse', 1)
        }else {
            Cookies.set('navCollapse', 0)
        }
    },

    SET_BREADCRUMB_LIST: (state, list) => {
        state.breadcrumbList = list.filter(item => item.name != 'home')
    },

    SET_DEVICE: (state, device) => {
        state.device = device
    },

    CLOSE_NAV: (state) => {
        state.navCollapse = true
        if (state.navCollapse) {
            Cookies.set('navCollapse', 1)
        } else {
            Cookies.set('navCollapse', 0)
        }
    }
}

const actions = {

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
