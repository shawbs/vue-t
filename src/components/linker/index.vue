<template>
    <router-link class="linker" 
        v-if="!isA"
        :to="url"
        :tag="tag"
        >
        <slot />
    </router-link>
    <a class="linker" 
        v-else
        :href="url" 
        :target="target">
        <slot />
    </a>
</template>

<script>
    export default {
        name: 'linker',
        props: {
            //是否原生跳转，默认是router跳转
            isA: {
                type: Boolean,
                default: false,
            },
            url: {
                type: String | Object,
                default: ''
            },
            tag:{
                type: String,
                default: 'a'
            },
            target: {
                type: String,
                default: '_self'
            }
        }
    }
</script>

<style scoped lang="scss">
    @import '@as/_index.scss';

</style>