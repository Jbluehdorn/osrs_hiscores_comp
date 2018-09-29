<template lang="pug">
    #app
        .container-fluid
            navbar
            router-view.pt-1
</template>

<script>
import navbar from './components/Nav'

export default {
    components: {navbar}
}
</script>