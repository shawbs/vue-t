<template>
    <span>&nbsp;{{num}}<slot/>&nbsp;</span>
</template>

<script>
    export default {
        name: 'animateNum',
        props: {
            value: {
                type: Number,
                default: 0
            }
        },
        data () {
            return {
                tweenedNumber: 0
            }
        },
        computed: {
            num(){
                TweenLite.to(this.$data, 1.5, { tweenedNumber: this.value });
                // TweenLite.fromTo(this.$data, , { tweenedNumber: 0}, { tweenedNumber: this.value})
                return this.tweenedNumber.toFixed(0)
            }
        }
    }
</script>

<style scoped>

</style>