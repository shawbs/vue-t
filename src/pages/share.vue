<template>
    <page :title="pageTitle">
        <container class="bg">
            <div id="shareCard" class="share-card" v-show="isReady">
                <!-- <div class="_title" :class="[textAligin]">{{username}}的年度关键字</div> -->
                <div class="_body trim">
                    <!-- <img ref="shareImg" :src="shareImg" alt="" @load="imgLoaded" crossOrigin="Anonymous"> -->
                    <img ref="shareImg" :src="shareImg" alt="" @load="imgLoaded">
                </div>
                <!-- <div class="_footer">
                    <div class="qrcode-box">
                        <img ref="qrcode" class="qrcode-logo fn-left" src="~@ai/share/qrcode.png" alt="">
                        <img ref="qrcode" crossOrigin="Anonymous" :src="`${$config.baseUrl}/api/asus/events/yearstat/qrcode/`" alt="" class="qrcode fn-left">
                    </div>
                    <div class="info">
                        <div>长按识别二维码</div>
                        <div>生成你的专属海报</div>         
                    </div>   
                </div> -->
            </div>
            <div class="btn-group" v-show="isReady">
                <img v-if="userType=='sxb'" src="~@ai/share/btn-back.png" alt="" class="btn-back" @click="back">
                <img v-else src="~@ai/share/btn-store.png" alt="" class="btn-back" @click="goStore">
                <img src="~@ai/share/btn-save.png" alt="" class="btn-save" @click="createCanvas">
            </div>
            <mask-img :img="shareImg" v-model="showMask"></mask-img>
        </container>
    </page>
</template>

<script>
    import {PageMixin} from '@mixin'
    import MaskImg from './components/mask-img'
    import Report from '@api/report'
    import { mapState } from 'vuex'
    import html2canvas from 'html2canvas'
    import CanvasCreater from '@script/canvasCreater'
    export default {
        name: 'share',
        mixins: [PageMixin],
        data(){
            return {
                textAligin: 'center',
                qrcode: '',
                shareImg: '',

                showMask: false,
                tartgetImg: '',
                username: '未命名',
                isReady: false
            }
        },
        components: {MaskImg},
        computed:{
            ...mapState('base',['reports']),
            type (){
                return this.reports[0] ? this.reports[0].type : ''
            },
        },
        methods: {
            
            createCanvas(){
                this.showMask = true
                this.$statistic.eventPush('生成海报')
                this.getChange()
            },
            getChange(){
                Report.getChange()
            },
            back(){
                this.$router.back();
            },
            goStore(){
                location.href = 'http://asusshop.jobsdo.com/index.html?openid=oXDus0x65iZjfqfACuQ63z3lbkL0&cl_page=2bedb0da1ca645f5959442f816363deb&cl_lfid=oXDus03PDqtFuyEojM7SJ5AO5mwQ&cl_sr=&cl_ctnm='
            },
            imgLoaded(){
                console.log('img loaded')
                setTimeout(() => {
                    this.isReady = true
                    this.$loader.hide()
                }, 1000);
            },
            getReport(){
                this.$loader.show('加载中')
                Report.getReport({
                    type: this.type,
                    userType: this.userType
                }).then(({ data }) => {
                    this.shareImg = data.data
                }).catch(()=>{
                    this.$loader.hide()
                })
            }
        },
        mounted(){
            this.getReport();
        }
    }
</script>

<style lang="scss" scoped>
    $qrcodeW: 125px;
    $qrcodeLogoW: 46px;
    .share-card{
        width: 650px;
        margin: 46px auto 25px;
        position: relative;
        font-size: 30px;
        ._title{
            position: absolute;
            top: 40px;
            left: 50px;
            right: 0;
            color: #fff;
            &.center{
                text-align: center;
                left: 0;
                top: 30px;
            }
        }
        ._body{
            img{
                width: 100%;
                // min-height: (782px/2);
            }
        }
        ._footer{
            background: #fff;
            padding: 18px 43px;
            // display: flex;
            // align-items: center;
            // line-height: 2;
            .qrcode-box{
                position: relative;
                display: inline-block;
                margin-right: 43px;
                float: left;
                // .qrcode-logo{
                //     position: absolute;
                //     width: $qrcodeLogoW;
                //     height: $qrcodeLogoW;
                //     top: 50%;
                //     left: 50%;
                //     margin-top: -$qrcodeLogoW/2;
                //     margin-left: -$qrcodeLogoW/2;
                // }
                .qrcode{
                    height: $qrcodeW;
                    width: $qrcodeW;
                }
            }
            .info{
                display: inline-block;
                height: $qrcodeW;
                line-height: 2;
            }
        }
    }
    .btn-group{
        display: flex;
        justify-content: center;
        margin-bottom: 25px;
        .btn-back,.btn-save{
            height: 120px;
            margin: 0 -15px;
        }
    }
</style>