<template lang="pug">
    .container-fluid
        .card
            .card-header
                .form-inline
                    .form-group
                        input(
                            type="text" 
                            v-model="username" 
                            placeholder="Username"
                            @keyup.enter="search"
                        ).form-control
                        
                    .btn-group.mx-1
                        button(
                            type="button"
                            v-for="type in types"
                            :key="type"
                            :class="user_type == type ? 'btn-info' : 'btn-primary'"
                            @click="user_type = type"
                        ).btn
                            img(:src="`api/images/${type}.png`")

                    button(
                        type="button"
                        @click="search"
                        :disabled="loading"
                    ).btn.btn-success
                        span(v-show="!loading") Search
                        i.fa.fa-spin.fa-spinner(v-show="loading")

            .card-body
                .table-responsive(v-if="user")
                    table.table.table-sm
                        thead
                            tr
                                th Skill
                                th.text-sm-right Level
                                th.text-sm-right Exp
                                th.text-sm-right Rank
                                th.text-sm-right Difference
                        tbody
                            tr
                                td 
                                    .container-fluid.px-0
                                        .row
                                            .col-sm-1
                                                img(src="api/images/norm.png")
                                            .col-sm-11
                                                | Overall
                                td.text-sm-right
                                    | {{overall.level}}
                                td.text-sm-right
                                    | {{overall.experience | number}}
                                td.text-sm-right
                                    | {{overall.rank | number}}
                                td.text-sm-right
                                    | -
                                
                            tr(v-for="(skill, name) in user" :key="skill.img" v-if="skill.img")
                                td
                                    .container-fluid.px-0
                                        .row
                                            .col-sm-1
                                                img(:src="`api/images/${skill.img}`")
                                            .col-sm-11 {{name | capitalize}}
                                td.text-sm-right
                                    | {{skill.level}}
                                td.text-sm-right
                                    | {{skill.experience | number}}
                                td.text-sm-right
                                    | {{skill.rank | number}}
                                td(:class="checkRankDiff(skill) >= 0 ? 'text-success' : 'text-danger'").text-sm-right
                                    i(:class="checkRankDiff(skill) >= 0 ? 'fa-chevron-up' : 'fa-chevron-down'").fa
                                    | &nbsp;{{checkRankDiff(skill) | number}}

</template>

<style lang="scss" scoped>
.btn-group {
    .btn:focus {
        outline: none;
        box-shadow: none;
    }
}
</style>

<script>
import {constants, hiscores} from 'osrs-api'

export default {
    data() {
        return {
            username: null,
            user_type: null,
            types: [
                'norm',
                'im',
                'hcim',
                'uim'
            ],
            user: null,
            loading: false,
            overall: null
        }
    },
    mounted() {
        this.user_type = this.types[0]
    },
    methods: {
        async search() {
            this.loading = true

            let resp = await this.$http.get(`/api/user/normal/${this.username}`)
            this.user = await resp.json()
            this.overall = this.user.overall

            this.loading = false
        },
        checkRankDiff(skill) {
            return parseInt(this.overall.rank) - parseInt(skill.rank)
        }
    },
    filters: {
        capitalize(val) {
            return val.charAt(0).toUpperCase() + val.slice(1)
        },
        number(val) {
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    }
}
</script>