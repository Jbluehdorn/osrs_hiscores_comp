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
                | Ensouled Head Worksheet
</template>

<script>
export default {
    data() {
        return {

        }
    },
    mounted() {
        
    }
}
</script>