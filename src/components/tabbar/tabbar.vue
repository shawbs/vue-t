<template>
    <div :class="['tabbar']" :style="`order: ${order}` ">
        <slot/>
    </div>
</template>

<script>
    export default {
        name: 'tabbar',
        props:{
            position: {
                type: String,
                default: 'bottom'
            }
        },
        computed: {
            order(){
                return this.position == 'top' ? 0 : 99
            }
        }
    }
</script>

<style scoped lang="scss">
@import '@as/_index.scss';
.tabbar{
    order: 99;
    flex: 0 0 auto;
    height: $tabHeight;
    width: 100%;
    display: flex;
    align-items: stretch;
    background: $gray3;
}
</style>