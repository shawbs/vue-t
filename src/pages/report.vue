<template>
    <page :title="pageTitle">
        <container class="bg">
            <div class="swiper-container" id="swiper">
                <div class="swiper-wrapper">
                    <div class="swiper-slide report start">
                        <div class="img-box">
                            <img src="~@ai/report/1/moon.png" alt="" class="abs moon tada-y">
                            <img src="~@ai/report/1/airship.png" alt="" class="abs airship tada-y1">
                        </div>
                        <div class="content" v-if="userData">
                            Hi，{{userData.userName}}<br/>
                            {{userData.createTime | formatTime('YYYY年MM月DD日 hh时mm分')}}<br/>
                            我们开始见证你与日俱增的实力<br/>
                            第<animate-num class="active" :value="userData.rank" ></animate-num>个一起携手前行的你<br/>
                            和我们一起度过了<br/>
                            充实且闪闪发光的<animate-num class="active" :value="userData.days"/>天<br/>
                        </div>
                    </div>
                    <div class="swiper-slide report" :class="[`report-item${index+1}`, item.type]" v-for="(item, index)  in reports" :key="index">
                        <div class="img-box" v-if="index==0">
                            <img src="~@ai/report/2/moon.png" alt="" class="abs moon tada-y">
                            <img src="~@ai/report/2/airship.png" alt="" class="abs airship">
                        </div>
                        <div class="img-box" v-if="index==1">
                            <img src="~@ai/report/3/moon.png" alt="" class="abs moon tada-y">
                        </div>
                        <div class="img-box" v-if="index==2">
                            <img src="~@ai/report/4/moon.png" alt="" class="abs moon tada-y">
                            <img src="~@ai/report/4/bird.png" alt="" class="abs airship tada-y">
                        </div>

                        <div class="content" v-if="item.type=='login'">
                            2018年，你主动与我们亲密接触<animate-num class="active" :value="item.loginCount"/>次<br/>
                            曾连续签到<animate-num class="active" :value="item.maxContinue"/>天，<span class="active">充满毅力</span>的你<br/>
                            <span class="active">遥遥领先</span>于<animate-num class="active" :value="item.beat">%</animate-num>的人<br/>
                            谢谢，让我们成为你<span class="active">信任的伙伴</span><br/>
                            而我们，也会一如既往相伴左右<br/>
                        </div>
                        <div class="content" v-if="item.type=='exam'">
                            2018年，你驰骋<animate-num class="active" :value="item.passExam"/>次考场<br/>
                            答对了<animate-num class="active" :value="item.rightQuestion"/>道题<br/>
                            交了<animate-num class="active" :value="item.fullScoreExam"/>份满分答卷<br/>
                            <span class="active">智慧满满</span>的你<br/>
                            比<animate-num class="active" :value="item.beat">%</animate-num>的人<span class="active">更机智</span><br/>
                            逢考必过，你在我们心中就是<span class="active">真学霸</span><br/>
                        </div>
                        <div class="content" v-if="item.type=='task'">
                            2018年，你勇敢接受了<animate-num class="active" :value="item.finishTask"/>次任务挑战<br/>
                            任务完成率<animate-num class="active" :value="item.completionRate">%</animate-num>，你的勇往直前<br/>
                            打败了平台上的<animate-num class="active" :value="item.beat">%</animate-num>的人<br/>
                            原来，你就是我们欣赏的任务<span class="active">全能王</span><br/>
                        </div>
                        <div class="content" v-if="item.type=='course'">
                            2018年，你孜孜不倦地学习了<animate-num class="active" :value="item.totalCourse"/>堂课<br/>
                            看了<animate-num class="active" :value="item.pictureCourse"/>篇图文<br/>
                            <animate-num class="active" :value="item.videoCourse"/>段视频，<span class="active">坚持不懈</span>的你<br/>
                            比<animate-num class="active" :value="item.beat">%</animate-num>的人<span class="active">更业精于勤</span><br/>
                            <span class="active">优秀学习者</span>，我们为你实名点赞！<br/>
                        </div>
                        <div class="content" v-if="item.type=='credit'">
                            2018年，你的坚持收获了<animate-num class="active" :value="item.credit"/>积分<br/>
                            经验值达<animate-num class="active" :value="item.experience"/>，<span class="active">持之以恒</span>的你一路向前<br/>
                            走在了<animate-num class="active" :value="item.beat">%</animate-num>的人前面<br/>
                            你是坚定的<span class="active">实力派</span>，自然不容小觑<br/>
                        </div>
                        <div class="content" v-if="item.type=='pay'">
                            2018年，在我们特地为你准备的奖励中<br/>
                            你花了<animate-num class="active" :value="item.changeCredit"/>积分，兑换了喜欢的礼物<br/>
                            <span class="active">慷慨大方</span>的你<br/>
                            比<animate-num class="active" :value="item.beat">%</animate-num>的人<span class="active">更具消费力</span><br/>
                            <span class="active">积分达人</span>的你，值得我们用惊喜讨好<br/>
                        </div>
                        <div class="content" v-if="item.type=='liked'">
                            2018年，你踊跃上传了<animate-num class="active" :value="item.uploadWorks"/>件作品给我们<br/>
                            同伴给你的鼓励包括了<animate-num class="active" :value="item.likeCount"/>赞， <animate-num class="active" :value="item.commentCount"/>条评论<br/>
                            你的<span class="active">积极向上</span>赢得的掌声<br/>
                            <span class="active">胜过</span>了<animate-num class="active" :value="item.beat">%</animate-num>的人<br/>
                            我们想靠近的<span class="active">受欢迎的人，是你</span><br/>
                        </div>
                        <div class="content" v-if="item.type=='sell'">
                            2018年，你华丽出席了<animate-num class="active" :value="item.joinCampaign"/>场活动<br/>
                            创下了销售<animate-num class="active" :value="item.sellCount"/>台电脑<br/>
                            获得<animate-num class="active" :value="item.coin"/>金币的好成绩<br/>
                            <span class="active">能力超群</span>的你<br/>
                            轻而易举<span class="active">超过了</span><animate-num class="active" :value="item.beat">%</animate-num>的人<br/>
                            你是当之无愧<span class="active">销售精英</span><br/>
                        </div>
                        <div class="content" v-if="item.type=='lucky'">
                            2018年，你把握每一次机会<br/>
                            参与了<animate-num class="active" :value="item.drawCount"/>次大奖<br/>
                            抱走了<animate-num class="active" :value="item.winCount"/>次奖品<br/>
                            一向<span class="active">微笑服务</span>的你<br/>
                            比<animate-num class="active" :value="item.beat">%</animate-num>的人还要<span class="active">幸运</span><br/>
                            我们和大家一样，羡慕你——<span class="active">天选锦鲤</span><br/>
                        </div>
                        
                    </div>
                    <div class="swiper-slide report end">
                        <div class="img-box">
                            <img src="~@ai/report/5/moon.png" alt="" class="abs moon tada-y">
                            <img src="~@ai/report/5/stone.png" alt="" class="abs stone">
                            <img src="~@ai/report/5/airship.png" alt="" class="abs airship tada-y">
                            <img src="~@ai/report/5/font.png" alt="" class="abs font">
                        </div>
                    </div>
                </div>
                <!-- 如果需要分页器 -->
                <div class="swiper-pagination"></div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
            </div>

            <div @click="linkShare" class="home-btn">
                <img src="~@ai/report/btn-main.png" alt="" >
            </div>
        </container>
    </page>
</template>

<script>
    
    import { Comm } from '@util'
    import Report from '@api/report'
    import {PageMixin} from '@mixin'
    import {Base} from '@store'
    import { mapMutations } from 'vuex';
    export default {
        mixins: [PageMixin],
        data(){
            return {
                mySwiper: null,
                index: 0, //当前slide的索引
                reports: [],
                reports_data: [],
            }
        },
        watch: {
            index(a, b){
                this.setNum(a-1)
            },
            reports_data(a){
                if(Array.isArray(a)){
                    let arr = []
                    a.forEach((item, index)=>{
                        arr[index] = {...item};
                        for(let i in arr[index]){
                            if(i != 'id' && typeof item[i] == 'number'){
                                arr[index][i] = 0
                            }
                        }
                    })
                    this.reports = [...arr]
                    this.initSwiper();
                }
            },
        },
        methods: {
            ...mapMutations('base', ['setReports']),
            initSwiper(){
                this.$nextTick(()=>{
                    setTimeout(() => {
                        console.log('初始化swiper')
                        let self = this;
                        this.mySwiper = new Swiper ('#swiper', {
                            initialSlide: this.index,
                            pagination: '.swiper-pagination',
                            nextButton: '.swiper-button-next',
                            prevButton: '.swiper-button-prev',
                            onSlideChangeEnd: function(s){
                                self.index = s.activeIndex
                            }
                        })
                    }, 1000);
                })
            },
            setNum(index){
                if(this.reports_data.length === this.reports.length && index > -1 && index < this.reports_data.length){
                    this.$set(this.reports, index, this.reports_data[index])
                }
            },
            getOfficials(){
                Report.getOfficials().then(res=>{
                    const {data} = res
                    this.setUserData(data.userInfo);
                    this.reports_data = [...data.weiData];
                    this.setReports(this.reports_data)
                })
            },
            linkShare(){
                this.$statistic.eventPush('从我的报告跳转专属海报')
                this.$router.push('/share')
            }
        },
        mounted(){
            this.getOfficials();
        },
        destroyed(){
            this.mySwiper = null;
        }
    }
</script>

<style lang="scss" scoped>
@import "~@as/variables/index";
.swiper-container{
    width: 100vw;
    height: 100vh;
    .swiper-pagination{
        bottom: 190px;
    }
    .swiper-slide{
        overflow: hidden;
    }
    .swiper-button-next,.swiper-button-prev{
        width: 80px;
        height: 80px;
        background: url('~@ai/arrow.png')no-repeat center;
        background-size: 80px;
    }
    .swiper-button-prev{
        transform: rotate(180deg);
    }
    
}
.tada-y1{
    animation: tada-y1 2s linear infinite;
    // animation-fill-mode: both;
}
@keyframes tada-y1{
    0%{
        transform: translateY(-2%) rotate3d(0, 0, 1, 0);
    }
    50%{
        transform: translateY(2%) rotate3d(0, 1, 0, 1deg);
    }
    100%{
        transform: translateY(-2%) rotate3d(0, 0, 0, 0);
    }
}
.report{
    position: relative;
    // z-index: 1;
    .content{
        position: absolute;
        padding-top: 65px;
        padding-left: 81px;
        width: 100vw;
        font-size: 30px;
        line-height: 2.2;
        font-weight: bold;
        color: #fff;
        z-index: 2;
        .active{
            color:$color-second;
            font-size: 1.7em;
            line-height: 0;
            // font-weight: normal;
        }
    }
    
    &.start{
        .airship{
            width: 626px;
            height: 475px;
            bottom: 475px;
            left: 98px;
        }
        .moon{
            width: 100vw;
            bottom: -85px;
            left: 0;
        }
    }
    &.end{
        .airship{
            width: 600px;
            // height: 771px;
            top: 157px;
            left: 0;
        }
        .moon{
            width: 556px;
            top: -150px;
            right: 0;
        }
        .stone{
            width: 750px;
            height: 696px;
            top: 100px;
            left: 0;
        }
        .content{
            top: 250px;
        }
        .font{
            top: 318px;
            left: 100px;
            width: 510px;
        }
    }
    &.report-item1{
        
        .airship{
            width: 100vw;
            top: 172px;
            left: 0;
        }
        .moon{
            width: 705px;
            top: 482px;
            right: 0;
        }
    }

    &.report-item2{
        .moon{
            width: 100vw;
            top: 173px;
            left: 0;
        }
        .content{
            padding-left: 0;
            text-align: center;
        }
    }
    &.report-item3{
        .airship{
            width: 185px;
            top: 40px;
            right: 40px;
        }
        .moon{
            width:686px;
            top: 456px;
            left: 0;
        }
    }
    
}
</style>