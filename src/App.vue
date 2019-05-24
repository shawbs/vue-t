<template>
    <!-- App -->
    <div id="app" class="app">
      <div class="pages">
        <transition
          :name="transitionName"
          >
          <router-view/>
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
    };
  },
  mixins: [AppMixin]
};
</script>
<style scoped>
</style>


