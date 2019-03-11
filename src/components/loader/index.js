import Vue from 'vue';
import main from './main';
import { Dom } from '@/utils';

const MainConstructor = Vue.extend(main);
let instance;
const Loader = {};
Loader.noTag = true;
Loader.names = 'loader';

const defaults = {
    show: false,
    message: '',
    time: 0,
    timer: null,
    callback: null,
    isClickOtherClose: false, //是否点击蒙层关闭Loader
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

Loader.show = function (message = ''){
    init({
        _type: 'loader',
        message
    })
}
Loader.hide = function(){
    instance.show = false;
}



export default Loader;