<template>
    <page :title="pageTitle">
        <container class="bg">
            <img src="~@ai/home/logo.png" alt="" class="abs logo">
            <div class="box">
                <div class="warp scale">
                    <!-- <img src="~@ai/home/airship.png" alt="" class="abs airship">
                    <img src="~@ai/home/earth.png" alt="" class="abs earth">
                    <img src="~@ai/home/bill.png" alt="" class="abs bill">
                    <img src="~@ai/home/bird.png" alt="" class="abs bird">
                    <img src="~@ai/home/phone.png" alt="" class="abs phone">
                    <img src="~@ai/home/font.png" alt="" class="abs font">
                    <img class="abs men" src="~@ai/home/men.png" alt=""> -->
                    <img class="img-main" src="~@ai/home/main.png" alt="">
                </div>
                <div class="home-btn" @click="linkReport">
                    <img src="~@ai/home/home-btn.png" alt="" class="">
                </div>
            </div>
        </container>
    </page>
</template>

<script>
    import {PageMixin} from '@mixin'
    export default {
        name: 'Home',
        mixins: [PageMixin],
        data(){
            return {
                value: 0
            }
        },
        methods: {
            change(){
                this.value = 100 * Math.random()
            },
            loader(){
                this.$loader.show()
                setTimeout(() => {
                    this.$loader.hide()
                }, 3000);
            },
            toast(){
                this.$toast.toast()
            },
            tip(){
                this.$tip.tip('asd')
            },
            linkReport(){
                this.$statistic.eventPush('开启报告')
                this.$router.push('/report')
            }
        },
        mounted(){
            
        }
    }
</script>

<style lang="scss" scoped>
@import "~@as/variables/index";
.home-btn{
    position: static;
    height: 128px;
}
.logo{
    width: 170px;
    height: 65px;
    top: 28px;
    right: 28px;
}
.box{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .img-main{
        width: 100%;
    }
    
    .men{
        width: 297px;
        height: 571px;
        top: 160px;
        right: 160px;
        // z-index: 1;
    }
    .airship{
        width: 490px;
        height: 731px;
        top: 79px;
        left: 0;
    }
    .bill{
        width: 416px;
        height: 419px;
        top: 137px;
        right: -60px;
    }
    .bird{
        width: 86px;
        height: 98px;
        top: 224px;
        left: 90px;
    }
    .earth{
        width: 750px;
        height: 650px;
        top: 140px;
        left: 70px;
        // z-index: 1;
    }
    .font{
        width: 554px;
        height: 588px;
        top: 310px;
        left: 99px;
        // z-index: 2;
    }
    .phone{
        width: 540px;
        height: 189px;
        top: 496px;
        left: 75px;
        // z-index: 1;
    }
}

</style>