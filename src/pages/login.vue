<template>
    <page :title="pageTitle">
        <container>
            <h1 class="text-center">未登录</h1>
            <p class="text-center">The page is need auth login.</p>
        </container>
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