<template>
        <transition name="show" appear>
            <div class="container">
                    <slot />    
            </div>
        </transition>
</template>

<script>
    export default {
        name: 'container',
    }
</script>

<style lang="scss" scoped>


</style>