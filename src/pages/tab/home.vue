<template>
    <div>
        <m-header>header</m-header>
        <container>
            <h1 class="text-center">组件</h1>
            <linker url="/user/login">表单组件</linker>

            <h2>picker</h2>
            <address-picker v-model="address"></address-picker>
            <android-address-picker v-model="address2"></android-address-picker>

            <h2>消息盒</h2>
            <button class="btn btn-main" @click="action('alert')">alert</button>
            <button class="btn btn-main" @click="action('confirm')">confirm</button>
            <button class="btn btn-main" @click="action('prompt')">prompt</button>
            <button class="btn btn-main" @click="action('toast')">toast</button>
            <button class="btn btn-main" @click="action('loader')">loader</button>

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
              address: [],
              address2: []
            }
        },
        methods: {
          action(action){
            switch(action){
              case 'toast': this.$toast.toast(); break;
              case 'loader': this.$loader.show(); break;
              default: this.$messageBox[action](action)
            }
          },

        },
        mounted(){

        }
    }
</script>

<style lang="scss" scoped>
@import "~@as/variables/index";


</style>
