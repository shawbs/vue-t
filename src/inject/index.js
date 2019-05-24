/**
 * 注入 vue 原型
 */
import './filter.js';
import './directive.js';
import { HttpInstance } from '@/api/base';
import config from '@/config';
import Statistic from './statistic';

export default {
    install(Vue /*, options*/) {
        Vue.prototype.$http = HttpInstance;
        Vue.prototype.$config = config;
        Vue.prototype.$statistic = Statistic;
    },
};
