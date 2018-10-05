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
                        | This tool is a worksheet to help determine the amount of runes needed for Reanimating Ensouled Heads and how much experience will be accrued. 

        .card
            .card-header
                img(src="/api/images/pray.png").mr-1
                span.mr-1 Ensouled Head Worksheet
            
            .card-body
                .table-responsive
                    table.table.table-striped.table-sm
                        thead
                        tbody
                            tr(v-for="item in ensouled_heads" :key="item.name")
                                td {{item.name}}
                                td.text-sm-right {{item.exp | number}}
                                td.text-sm-right {{item.souls}}
                                td.text-sm-right {{item.bodies}}
                                td.text-sm-right {{item.nats}}
                                td.text-sm-right {{item.bloods}}
</template>

<script>
export default {
    data() {
        return {
            loading: false,
            ensouled_heads: null
        }
    },
    mounted() {
        this.load()
    },
    methods: {
        async load() {
            this.loading = true

            let resp = await this.$http.get('/api/ensouled_heads')
            this.ensouled_heads = await resp.json()

            this.loading = false
        }
    }
}
</script>