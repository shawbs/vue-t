import Vue from 'vue';
import {Dom} from '@util';

Vue.directive('page-title', (el, binding, vnode) => {
    // 当绑定元素插入到 DOM 中。
    const { value } = binding;
    // const { context } = vnode;
    // const { _inactive } = context || {};
    // console.log(value,_inactive,!value);
    // if (!value || _inactive) return;
    document.title = value;
})

Vue.directive('transfer-dom', (el, binding) => {
    console.log(el,binding)
    console.log(Dom.App)
    el.parentNode.removeChild(el);
    Dom.App.appendChild(el);
})

