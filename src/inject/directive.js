import Vue from 'vue';
import {Dom} from '@util';

Vue.directive('page-title', (el, binding, vnode) => {
    // 当绑定元素插入到 DOM 中。
    const { value } = binding;
    document.title = value;
})

Vue.directive('transfer-dom', (el, binding) => {
    el.parentNode.removeChild(el);
    Dom.App.appendChild(el);
})

