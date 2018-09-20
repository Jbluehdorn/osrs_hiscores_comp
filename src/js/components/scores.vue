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
                    ).btn.btn-success
                        | Search

            .card-body
                .text-sm-center(v-show="loading")
                    i.fa.fa-lg.fa-spinner.fa-spin
                div(v-show="!loading" v-if="user")
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
            loading: true
        }
    },
    mounted() {
        this.user_type = this.types[0]
    },
    methods: {
        async search() {
            this.loading = true

            this.loading = false
        }
    }
}
</script>