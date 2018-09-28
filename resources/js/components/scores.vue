<template lang="pug">
    .container-fluid
        .card.mb-1
            .card-header(data-toggle="collapse" data-target="#info").clickable
                | What is this?
                span.pull-right
                    i.fa.fa-chevron-down
            .collapse#info
                .card-body
                    p.mb-0
                        | This tool is intended to show you a comparison of your skill ranks and your overall rank. Differential shows how much higher or lower your skill rank is than your overall rank.
        
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
                    table.table.table-sm.table-striped
                        thead
                            tr
                                th Skill
                                th.text-sm-right Level
                                th.text-sm-right Exp
                                th.text-sm-right Rank
                                th.text-sm-right Difference
                        tbody(v-show="!loading")
                            tr
                                td 
                                    .container-fluid.px-0
                                        .row
                                            .col-sm-1
                                                img(:src="`api/images/${user_type}.png`")
                                            .col-sm-11
                                                | Overall
                                td.text-sm-right
                                    | {{overall.level != 0 ? overall.level : 'Not Ranked'}}
                                td.text-sm-right
                                    span(v-show="overall.level == 0") Not Ranked
                                    span(v-show="overall.level != 0") {{overall.experience | number}}
                                td.text-sm-right
                                    span(v-show="overall.level == 0") Not Ranked
                                    span(v-show="overall.level != 0") {{overall.rank | number}}
                                td.text-sm-right
                                    | -
                                
                            tr(v-for="(skill, name) in user" :key="name" v-if="skill.img")
                                td
                                    .container-fluid.px-0
                                        .row
                                            .col-sm-1
                                                img(:src="`api/images/${skill.img}`")
                                            .col-sm-11 {{name | capitalize}}
                                td.text-sm-right
                                    span(v-show="skill.rank == -1") Not Ranked
                                    span(v-show="skill.rank != -1") {{skill.level}}
                                td.text-sm-right
                                    span(v-show="skill.rank == -1") Not Ranked
                                    span(v-show="skill.rank != -1") {{skill.experience | number}}
                                td.text-sm-right
                                    span(v-show="skill.rank == -1") Not Ranked
                                    span(v-show="skill.rank != -1") {{skill.rank | number}}
                                td(
                                    :class="{'text-success': checkRankDiff(skill) >= 0 && skill.rank != -1, 'text-danger': checkRankDiff(skill) < 0 && skill.rank != -1}"
                                ).text-sm-right
                                    span(v-show="skill.rank == -1") -
                                    span(v-show="skill.rank != -1")
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

.table-striped tbody tr:nth-of-type(odd) {
    background-color: #333;
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

            let resp = await this.$http.get(`/api/user/${this.user_type}/${this.username}`)
            this.user = await resp.json()
            this.overall = this.user.overall

            this.loading = false
        },
        checkRankDiff(skill) {
            if(this.overall.rank == '-1')
                return skill.rank > 0 ? parseInt(skill.rank) : 0

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
    },
    watch: {
        'user_type': function(val) {
            if(this.username)
                this.search()
        }
    }
}
</script>