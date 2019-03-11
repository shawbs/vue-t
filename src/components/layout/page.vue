<template>
    <div class="page" v-page-title="title">
        <slot />
    </div>
</template>

<script>
    export default {
        name: 'page',
        props:{
            title: {
                type: String,
                default: ''
            }            
        }
    }
</script>

<style scoped>

</style>