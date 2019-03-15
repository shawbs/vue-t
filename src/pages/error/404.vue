<template>
    <page :title="pageTitle">
        <container>
            <h1 class="text-center">404</h1>
            <p class="text-center">The page is not found.</p>
        </container>
    </page>
</template>

<script>
    import {PageMixin} from '@mixin'
    export default {
        name: 'notfound',
        mixins: [PageMixin],
        data(){
            return {

            }
        },
        mounted(){
            console.log(this)
        }
    }
</script>

<style scoped>

</style>