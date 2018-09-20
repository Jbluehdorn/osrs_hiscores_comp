import Vue from 'vue'
import router from './router'

console.log('anything')

const vm = new Vue({
    router,
    render: h => h(require('./App.vue'))
}).$mount('#app')