<template>
    <page :title="pageTitle">

        <router-view class="tabbar-container"></router-view>
        <tabbar>
            <tabbar-item url="/tab/home" :selected="currentRouteName === 'tab/home'">组件</tabbar-item>
            <tabbar-item url="/tab/mine" :selected="currentRouteName === 'tab/mine'">mine</tabbar-item>
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
        computed: {
          currentRouteName(){
            return this.$route.name
          }
        },
        methods: {

        },
    }
</script>

<style lang="scss" scoped>
@import "~@as/variables/index";

.tabbar-container{
    position: static;
    flex: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
}
</style>
