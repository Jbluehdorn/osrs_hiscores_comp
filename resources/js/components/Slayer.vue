<template lang="pug">
    .container-fluid
        .card.mb-1
            .card-header(data-toggle="collapse" data-target="#info").clickable
                | What is this?
                span.pull-right
                    i.fa.fa-chevron-down
            .collapse#info
                .card-body
                    p
                        | This tool will allow you to calculate how many tasks you need from your respective slayer master to reach a certain amount of Slayer Points. Simply enter your current slayer task streak, current slayer points, target point amount, and slayer master and the calculator will let you know how far you have to go.

                    p.mb-0
                        strong If you are doing tasks 1-9 at Turael
                        | , check the box "Turael Grind".

        .text-center(v-show="loading")
            i.fa.fa-spin.fa-spinner.fa-lg

        .card(v-show="!loading" v-if="masters.length")
            .card-header
                .form-inline
                    img(src="/api/images/slay.png").mr-1
                    span.mr-1 Slayer Calculator

                    

            .card-body
                .row
                    .form-group.col
                        label Current Streak
                        input(
                            type="number"
                            v-model="cur_streak"
                        ).form-control
                    .form-group.col
                        label Current Points
                        input(
                            type="number"
                            v-model="cur_pts"
                        ).form-control
                    .form-group.col
                        label Target Points
                        input(
                            type="number"
                            v-model="tar_pts"
                        ).form-control
                    .form-group.col
                        label Slayer Master
                        select(v-model="master").form-control
                            option(:value="null" disabled selected)
                                | Select a Slayer Master...
                            option(
                                v-for="master in masters"
                                :key="master.name"
                                :label="master.name"
                                :value="master"
                            )
                    .form-check.col
                        label(style="display: block;") Turael Grind
                        label.switch
                            input(type="checkbox" v-model="tur_grind")
                            span.slider

                hr

                h2.subtitle
                    | You have 
                    span(v-html="tasksRemaining")
                    | &nbsp; tasks remaining.
</template>

<script>
export default {
    data() {
        return {
            loading: false,
            masters: [],
            cur_streak: null,
            cur_pts: null,
            tar_pts: null,
            master: null,
            tur_grind: null
        }
    },
    mounted() {
        this.load()
    },
    methods: {
        async load() {
            this.loading = true

            let resp = await this.$http.get('/api/slayer_masters')
            this.masters = await resp.json()

            this.master = this.masters[0]

            this.loading = false
        }
    },
    computed: {
        tasksRemaining() {
            if(this.master.name == 'Turael')
                return '&infin;'

            let pts = parseInt(this.cur_pts)
            let streak = parseInt(this.cur_streak)

            while(pts < this.tar_pts) {
                streak++

                if(streak % 10 == 0) {
                    if(streak % 1000 == 0) {
                        pts += this.master.per1000
                    } else if(streak % 250 == 0) {
                        pts += this.master.per250
                    } else if(streak % 100 == 0) {
                        pts += this.master.per100
                    } else if(streak % 50 == 0) {
                        pts += this.master.per50
                    } else {
                        pts += this.master.per10
                    }
                } else {
                    if(!this.tur_grind)
                        pts += this.master.perTask
                }
            }

            return streak - this.cur_streak
        }
    }
}
</script>