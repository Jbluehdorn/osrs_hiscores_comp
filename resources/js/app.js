import 'bootstrap'

import Vue from 'vue'
import VueResource from 'vue-resource'

import router from './router'

Vue.use(VueResource)

const vm = new Vue({
    router,
    render: h => h(require('./App.vue'))
}).$mount('#app')