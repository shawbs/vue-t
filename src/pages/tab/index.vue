<template>
    <page :title="pageTitle">

        <router-view class="tabbar-container"></router-view>
        <tabbar>
            <tabbar-item url="/tab/home">home</tabbar-item>
            <tabbar-item url="/tab/mine">mine</tabbar-item>
        </tabbar>
    </page>
</template>

<script>
    import {PageMixin} from '@mixin'
    export default {
        name: '',
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

.tabbar-container{
    position: static;
    flex: 1;
}
</style>