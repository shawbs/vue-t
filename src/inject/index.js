/**
 * 注入 vue 原型
 */

import $wx from './weixin';
import './filter.js';
import './directive.js';
import { HttpInstance } from '@/api/base';
import Nprogress from 'nprogress';
import config from '@/config';
import Statistic from './statistic';

Nprogress.configure({
    minimum: 0.5, // 通过 minimum 来修改最小百分比。
    // template: '...', // 你可以通过 template 修改标记结构。为了保证进度条正常工作，需要一个包含 role='bar' 属性的元素。
    ease: 'ease', // 通过 ease(一个 CSS 中的 easing 值) 调整动画设置和速度 speed （毫秒ms）。
    speed: 500,
    trickle: true, // 想关闭进度条步进？设置 trickle 为 false。
    trickleRate: 0.2, // 你可以调整 trickleRate (每次步进增长多少) 和 trickleSpeed (步进间隔，单位毫秒ms).
    trickleSpeed: 800,
    showSpinner: true, // 想禁用进度环？设置 showSpinner 为 false。
});

export default {
    install(Vue /*, options*/) {
        Vue.prototype.$http = HttpInstance;
        Vue.prototype.$nprogress = Nprogress;
        Vue.prototype.$wx = $wx;
        Vue.prototype.$config = config;
        Vue.prototype.$statistic = Statistic;
    },
};
