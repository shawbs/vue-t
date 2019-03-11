import Vue from 'vue';
import main from './main';
import { Dom } from '@/utils';

const MainConstructor = Vue.extend(main);
let instance;
const defaults = {
    show: false,
    showCancelBtn: false,
    cancelBtnText: '取消',
    showConfirmBtn: true,
    confirmBtnText: '确认',
    showCloseBtn: false,

    errorText: '',

    showInput: false,
    inputType: 'text',
    inputValue: '',
    placeholder: '请输入',
    
    delayConfirm: 0, //确定按钮倒计时
    delayConfirmTimer: 0,

    isClickOtherClose: true,
    validCallback: null,

    action: '',
    showCloseBtn: false,

};
defaults.callback = function(action,e) {
    console.log('callback', action, e);
};

function initInstance() {
    return instance || new MainConstructor();
}

function show(options) {
    options = {...defaults,...options};
    instance = initInstance();
    console.log(!!instance.$el)
    if(instance.$el){
        Dom.getPopupWrap().appendChild(instance.$el)
    }else{
        instance.$mount(Dom.createPopupWrap())
    }
    for(let i in options){
        instance[i] = options[i]
    }
    instance.show = true;
    return Promise.resolve(instance)
}
const MessageBox = {};
MessageBox.noTag = true;
MessageBox.names = 'message';

MessageBox.alert = (message, title = '温馨提示', options) => {
    if (typeof title === 'object') {
        options = title;
        title = '';
    }
    return show({
        title,
        message,
        $type: 'alert',
        ...options,
    });
};
MessageBox.confirm = (message, title = '温馨提示', options) => {
    if (typeof title === 'object') {
        options = title;
        title = '';
    }
    return show({
        title,
        message,
        $type: 'confirm',
        showCancelBtn: true,
        ...options,
    });
};
MessageBox.prompt = (message, title = '', options) => {
    if (typeof title === 'object') {
        options = title;
        title = '';
    }
    return show({
        title,
        message,
        $type: 'prompt',
        showCancelBtn: true,
        showInput: true,
        ...options,
    });
};


export default MessageBox;
export { MessageBox };
