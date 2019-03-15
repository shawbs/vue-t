<template>
    <div>
        <m-header>header</m-header>
        <container>
            <h1 class="text-center">home</h1>
            <linker url="/user/login">to login</linker>
        </container>
        <m-footer>footer</m-footer>
    </div>
</template>

<script>
    import {PageMixin} from '@mixin'
    export default {
        name: 'Home',
        mixins: [PageMixin],
        data(){
            return {
            }
        },
        methods: {
            
        },
        mounted(){
            
        }
    }
</script>

<style lang="scss" scoped>
@import "~@as/variables/index";


</style>