<template lang="pug">
    #app
        .container-fluid
            navbar
            router-view.pt-1
</template>

<script>
import navbar from './components/nav'

export default {
    components: {navbar}
}
</script>