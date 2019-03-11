import Vue from 'vue';
import main from './main';
import { Dom } from '@/utils';

const MainConstructor = Vue.extend(main);
let instance;
const Toast = {};
Toast.noTag = true;
Toast.names = 'toast';

const defaults = {
    show: false,
    message: '',
    time: 0,
    timer: null,
    callback: null,
    isClickOtherClose: false, //是否点击蒙层关闭toast
    action: '',
}
function initInstance() {
    const instance = new MainConstructor({});
    return instance;
}

function init(opt){
    opt = {...defaults, ...opt};
    if(!instance){
        instance = initInstance();
    }
    if(instance.$el){
        Dom.getPopupWrap().appendChild(instance.$el)
    }else{
        instance.$mount(Dom.createPopupWrap())
    }
    for(let i  in opt){
        instance[i] = opt[i];
    }
    instance.show = true;
    return instance;
}

Toast.toast = function (message = 'toast', opt){
    init({
        _type: 'toast',
        time: 3000,
        message,
        ...opt
    })
}

export default Toast;