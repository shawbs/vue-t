<template>
    <transition name="bounce">
        <div 
            :class="['popup toast-box']"
            v-if="show"
            @click.self="onPopup('cancel')"
        >
            <div class="toast">
                <div>{{message}}</div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'toast',
    data() {
        return {
            show: false,
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
        onPopup(action) {
            if (!this.isClickOtherClose) return;
            this.handleAction(action);
        },
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
.popup-wrap {
    > .popup {
        &.toast-box {
            background: transparent;
            z-index: $z-index-8;
        }
    }
}

.popup.toast-box {
    color: #333;
    font-size: 1.4rem;
    .toast{
        background: rgba(0, 0, 0, .8);
        padding: 10px 15px;
        color: #ffffff;
        border-radius: .4rem;
        @extend %flexcenter;
    }
}
</style>
