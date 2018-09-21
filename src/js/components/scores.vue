<template lang="pug">
    .container-fluid
        .card
            .card-header
                form.form-inline
                    .form-group
                        input(type="text" v-model="username" placeholder="Username").form-control
                        
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
                .table-responsive
                    table.table.table-sm
                        thead
                            tr
                                th
                                th Skill
                                th Exp
                                th Rank
                                th Difference
                        tbody
                            tr(v-for="(skill, name) in user" :key="skill.img")
                                td
                                    img(:src="`api/images/${skill.img}`")
                                    span &nbsp;{{name}}
                                td
                                td
                                td
                                td

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
            user: {},
            loading: false
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

            this.loading = false
        }
    }
}
</script>