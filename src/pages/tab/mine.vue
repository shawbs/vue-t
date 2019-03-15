<template>
    <div>
        <m-header>header</m-header>
        <container>
            <h1 class="text-center">mine</h1>
            <p v-for="item in 50">{{item}}</p>
        </container>
        <m-footer>footer</m-footer>
    </div>
</template>

<script>
    import {PageMixin} from '@mixin'
    export default {
        name: 'Mine',
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