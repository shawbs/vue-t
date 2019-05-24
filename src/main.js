import Vue from 'vue'
import FastClick from 'fastclick'

import '@script';
import inject from '@/inject';
import component from '@com';
import App from './App';
import router from '@router';
import store from '@store';
import '@style/app.scss';

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


