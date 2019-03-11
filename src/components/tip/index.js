import Vue from 'vue';
import main from './main';
import { Dom } from '@/utils';

const MainConstructor = Vue.extend(main);
let instance;
const Tip = {};
Tip.noTag = true;
Tip.names = 'tip';

const defaults = {
    show: false,
    status: 'success',
    message: '',
    time: 0,
    timer: null,
    callback: null,
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


Tip.tip = function (message = 'tip', opt){
    init({
        time: 3000,
        message,
        ...opt
    })
}

export default Tip;