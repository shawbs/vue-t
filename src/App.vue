<template>
    <!-- App -->
    <div id="app">
      <div class="pages">
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
        console.log(val)
        if (val == oldval) return;
        this.setPageTitle(val.title);
        this.$statistic.push()
      }
    }

  },

  methods: {
    initNavigationEvent() {
      this.$navigation.on("forward", (to, from) => {
        //如果路由的meta属性no_transition为真，则不使用过滤效果
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
  },
  created() {
    this.initNavigationEvent();
  },
  mounted() {
  }
};
</script>
<style scoped>
</style>


