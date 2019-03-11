<template>
    <!-- App -->
    <div id="app">
      <div class="pages">
        <img @click="playAudio" :class="isPlay?'rotate':''"  class="audio " src="~@ai/media/m1.png" alt="">
        <audio loop autoplay ref="audioRef">
          <source src='~@/assets/lib/m2.mp3' type="audio/mpeg">
        </audio>
        <transition 
          :name="transitionName"
          >
          <navigation>
            <router-view/>
          </navigation>
        </transition>
      </div>
    </div>
</template> 

<script>
import {AppMixin} from '@mixin'
export default {
  data() {
    return {
      transitionName: "",
      isPlay:true
    };
  },
  mixins: [AppMixin],
  watch: {
    "$route.meta": {
      handler(val, oldval) {
        // console.log(val)
        if (val == oldval) return;
        this.setPageTitle(val.title);
        this.$statistic.push()
      }
    }

  },

  methods: {
    initNavigationEvent() {
      this.$navigation.on("forward", (to, from) => {
        if (to.route.meta.no_transition) {
          this.transitionName = "";
        } else {
          this.transitionName = "left";
        }
      });
      this.$navigation.on("replace", () => {
        this.transitionName = "";
      });

      this.$navigation.on("back", (to,from) => {
        if (from.route.meta.no_transition) {
          this.transitionName = "";
        }else{
          this.transitionName = "right";
        }
      });
    },
    playAudio(){
      if(this.isPlay){
        this.$refs.audioRef.pause() 
      }else{
        this.$refs.audioRef.play() 
      }
      this.isPlay=!this.isPlay
    }
  },
  created() {
    this.initNavigationEvent();
  },
  mounted() {
        // this.$refs.audioRef.play() 
        var voice = this.$refs.audioRef;
        //调用 <audio> 元素提供的方法 play()
        voice.play();
        //判斷 WeixinJSBridge 是否存在
        if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
            voice.play();
        } else {
            //監聽客户端抛出事件"WeixinJSBridgeReady"
            if (document.addEventListener) {
                document.addEventListener("WeixinJSBridgeReady", function() {
                    voice.play();
                }, false);
            } else if (document.attachEvent) {
                document.attachEvent("WeixinJSBridgeReady", function() {
                    voice.play();
                });
                document.attachEvent("onWeixinJSBridgeReady", function() {
                    voice.play();
                });
            }
        }
 
  }
};
</script>
<style scoped>
.audio{
  width: 65px;
  height: 65px;
  position: absolute;
  top:30px;left: 30px;
  z-index: 555;
}
</style>


