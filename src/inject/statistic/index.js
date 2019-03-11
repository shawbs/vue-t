

class Statistic {
    constructor(){
        this.TD = window['TDAPP']; //Talking Data

        if(!this.TD) console.warn('统计未安装完成')
    }

    /**
     * 统计单页面访问数据
     * @param {*} url 访问的地址
     */
    push(url = location.href){
        this.TD && this.TD.onEvent('访问', url)
    }
    
    /**
     * 统计事件跟踪
     * @param {*} something 某些动作
     * @param {*} arg 其它标记
     */
    eventPush(something, arg = []){
        this.TD && this.TD.onEvent(something, arg.join(','))
    }
}

export default new Statistic(); 