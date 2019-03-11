<template>
    <transition name="up" >
        <div :class="['tip', status]" v-if="show">
            <div>{{message}}</div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'tip',
    data() {
        return {
            show: false,
            status: 'success',
            message: '',
            time: 0,
            timer: null,
            callback: null,
            isClickOtherClose: false, //是否点击蒙层关闭toast
            action: '',
        };
    },
    watch: {
        show(val) {
            if(this.time > 0) {
                this.timer = setTimeout(()=>{
                    this.doClose();
                    clearTimeout(this.timer);
                }, this.time)
            }
        },
    },
    methods: {
        handleAction(action) {
            this.action = action;
            this.doClose();
        },
        doClose() {
            this.show = false;
            this.callback && this.callback(this.action, this);
        },
    },
};
</script>

<style lang="scss" scoped>
@import '@as/_index.scss';

.tip{
    position: fixed;
    top: 10px;
    left: 10px;
    right: 10px;
    border-radius: $btn-radius;
    background: rgba(0, 0, 0, .8);
    padding: 20px;
    color: #ffffff;
    @extend %flexcenter;
    z-index: $z-index-8;
    &.success{
        background: rgba(0, 0, 255, .8)
    }
    &.warn{
        background: rgba(202, 113, 10, 0.8)
    }
    &.error{
        background: rgba(240, 3, 3, 0.8)
    }
}

</style>
