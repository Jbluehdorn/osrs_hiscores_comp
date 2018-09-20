import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
    linkExactActiveClass: 'active',
    routes: [{
        path: '/',
        component: require('./components/scores.vue')
    }]
})