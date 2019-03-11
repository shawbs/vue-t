<template>
    <div class="tab-item" :data-url="url" @click="clickHandle($refs.tabItem)" ref="tabItem">
        <div class="bage" v-if="bage">{{bage}}</div>
        <div class="tab-icon" v-if="icon">{{item.icon}}</div>
        <div class="tab-label"><slot /></div>
    </div>
</template>

<script>
    export default {
        name: 'tabbar-item',
        props:{
            icon: {
                type: String,
                default: ''
            },
            bage: {
                type: Number,
                default: 0
            },
            url: {
                type: String,
                default: ''
            }
        },
        methods: {
            clickHandle(target){
                let {url} = target.dataset;
                url && this.$router.push(url);
                this.$emit('on-click', this);
            }
        }
    }
</script>

<style scoped lang="scss">
@import '@as/_index.scss';
.tab-item{
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    >.bage{
        position: absolute;
        font-size: 1.4rem;
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        background: $color-price;
        color: white;
        border-radius: 25px;
    }
}
</style>