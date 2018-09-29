import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
    linkExactActiveClass: 'active',
    routes: [{
        path: '/hiscores',
        component: require('./components/Scores.vue')
    }, {
        path: '/slayer',
        component: require('./components/Slayer.vue')
    }, {
        path: '/ensouled_heads',
        component: require('./components/EnsouledHeads.vue')
    }, {
        path: '*',
        redirect: '/hiscores'
    }]
})