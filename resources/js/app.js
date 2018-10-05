import 'bootstrap'

import Vue from 'vue'
import VueResource from 'vue-resource'

import router from './router'

Vue.use(VueResource)

Vue.filter('number', val => {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
})

Vue.filter('capitalize', val => {
    return val.charAt(0).toUpperCase() + val.slice(1)
})

const vm = new Vue({
    router,
    render: h => h(require('./App.vue'))
}).$mount('#app')