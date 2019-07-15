// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import api from './api'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import 'normalize.css/normalize.css'
import '@/styles/index.scss'
import BaeIcon from '@/components/BaseIcon'

Vue.use(ElementUI)
Vue.use(api)
Vue.component('base-icon', BaeIcon)
Vue.config.productionTip = false

require('./mock')


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {App},
    template: '<App/>'
})
