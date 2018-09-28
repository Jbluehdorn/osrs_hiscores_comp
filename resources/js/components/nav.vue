<template lang="pug">
    nav.navbar.navbar-expand-lg.navbar-light.bg-light.py-2
        router-link(to="/").navbar-brand.py-0
            img(src="api/images/logo.png" height="50")
        button(type="button" data-toggle="collapse" data-target="#mainNav").navbar-toggler
            span.navbar-toggler-icon

        .collapse.navbar-collapse#mainNav
            ul.navbar-nav.mr-auto
                li.nav-item
                    router-link(to="/").nav-link
                        | Scores
</template>
