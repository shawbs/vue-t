import Vue from 'vue'
import FastClick from 'fastclick'
import Navigation from 'vue-navigation';

import '@as/app.scss'; //导入全局样式
import '@script'; //导入全局库
import inject from '@/inject';
import component from '@com';
import App from './App';
import router from '@router';
import store from '@store';


Vue.use(Navigation, {router});
Vue.use(inject);
Vue.use(component);

FastClick.attach(document.body);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  components: { App },
  template: '<App/>'
}).$mount('#app');


