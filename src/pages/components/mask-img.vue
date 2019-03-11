<template>
    <transition name="bounce">
        <div 
            :class="['mask-box']"
            v-show="value"
            @click.self="action('cancel')"
        >
            <div class="box" v-if="img">
                <div class="img">
                    <img :src="img" alt="">
                    <i class="i i-close btn-close" @click="action('close')"></i>
                </div>
                <p class="text-center pt-40">请长按保存图片</p>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'MaskImg',
        props: {
            img: {
                type: String,
                default: ''
            },
            value: {
                type: Boolean,
                default: false
            }
        },
        data(){
            return {
                isClickOtherClose: true, //是否点击蒙层关闭
            }
        },
        methods: {
            action(action){
                switch(action){
                    case 'cancel':
                        if(!this.isClickOtherClose) return
                    case 'close':
                        this.$emit('input', false)
                        this.$emit('action', action, this)
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '~@as/_index.scss';
.mask-box{
    @extend %flexcenter;
    @extend %mask;
}
.btn-close{
    position: absolute;
    top: -50px;
    right: 0;
    font-size: 50px;
    line-height: 0;
    color: #fff;
}
.box{
    position: relative;
    text-align: center;
    color: #fff;
    .img{
        display: inline-block;
        position: relative;
        img{
            width: 600px;
        }
    }
}
</style>