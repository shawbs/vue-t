<template>
    <page :title="pageTitle">
        <m-header>header</m-header>
        <container>
            <h1 class="text-center">未登录</h1>
            <p class="text-center">The page is need auth login.</p>
            <linker url="/tab/mine">to tab/mine</linker>
            <linker url="/error/200">to error</linker>
        </container>
        <m-footer>footer</m-footer>
    </page>
</template>

<script>
    import {PageMixin} from '@mixin'
    export default {
        name: 'login',
        mixins: [PageMixin],
    }
</script>

<style scoped>

</style>