

import Vue from 'vue';
import wx from 'jweixin';
import { HttpInstance } from '@/api/base';
import config from '@/config';

class Weixin {
    constructor() {
        this._ready = false;
        this.oldShareData = {};
        this.paySign = {
            used: true,
        };
        this.shareFnMap = {
            timeline: 'onMenuShareTimeline', // 分享到朋友圈
            appMessage: 'onMenuShareAppMessage', // 分享给朋友
            qq: 'onMenuShareQQ', // 分享到QQ
            weibo: 'onMenuShareWeibo', // 分享到腾讯微博
            qzone: 'onMenuShareQZone', // 分享到QQ空间
            // newTimeline: 'updateTimelineShareData',
            // newAppMessage: 'updateAppMessageShareData',
        };
        this.shareArr = [
            // 'updateTimelineShareData',
            // 'updateAppMessageShareData',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone',
        ];
        this.wxConfig = {
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: '', // 必填，企业号的唯一标识，此处填写企业号corpid
            timestamp: 0, // 必填，生成签名的时间戳
            nonceStr: '', // 必填，生成签名的随机串
            signature: '', // 必填，签名，见附录1
            jsApiList: [
                // 'updateTimelineShareData',
                // 'updateAppMessageShareData',
                'openEnterpriseChat',
                'openEnterpriseContact',
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'onMenuShareQZone',
                'startRecord',
                'stopRecord',
                'onVoiceRecordEnd',
                'playVoice',
                'pauseVoice',
                'stopVoice',
                'onVoicePlayEnd',
                'uploadVoice',
                'downloadVoice',
                'chooseImage',
                'previewImage',
                'uploadImage',
                'downloadImage',
                'translateVoice',
                'getNetworkType',
                'openLocation',
                'getLocation',
                'hideOptionMenu',
                'showOptionMenu',
                'hideMenuItems',
                'showMenuItems',
                'hideAllNonBaseMenuItem',
                'showAllNonBaseMenuItem',
                'closeWindow',
                'scanQRCode',
            ], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        };
        this.getSign();
        this.initEvent();
    }

    /**
     * 获取签名
     */
    getSign() {
        let { wxConfig } = this;

        const $wxData = window ? window['$wxData'] : null
        if($wxData){
            console.log('use global wx config')
            wxConfig = {
                ...wxConfig,
                appId: $wxData.appId,
                nonceStr: $wxData.nonceStr,
                signature: $wxData.signature,
                timestamp: $wxData.timestamp,
            };
            wx.config(wxConfig);
        }else{

            // HttpInstance.get('/api/index/getWxinConfig', {
            //         url: encodeURIComponent(window.location.href.split('#')[0]),
            //     },{  _isHandleError: true })
            //     .then(json => {
            //         const result = json.data;
            //         wxConfig = {
            //             ...wxConfig,
            //             appId: result.data.appId,
            //             nonceStr: result.data.nonceStr,
            //             signature: result.data.signature,
            //             timestamp: result.data.timestamp,
            //         };
            //         wx.config(wxConfig);
            //     })
        }

    }

    initEvent() {
        wx.error(this.error);
        wx.ready(this.ready);
    }

    error(err) {
        console.warn(err)
    }

    ready() {
        this._ready = true;
    }

    isReady() {
        return new Promise((resolve /*, reject*/) => {
            if (this._ready) {
                resolve();
            } else {
                wx.ready(() => {
                    resolve();
                });
            }
        });
    }

    /**
     * 设置分享内容
     * @param data
     * @param force 是否强制设置分享内容
     */
    setShare(data, force) {
        // console.log(data)
        if (this.oldShareData === data && !force) return;
        this.oldShareData = data;
        this.isReady().then(() => {
            const { shareFnMap } = this;
            for (const key in shareFnMap) {
                if (shareFnMap.hasOwnProperty(key)) {
                    // console.log(key, shareFnMap[key])
                    wx[shareFnMap[key]]({
                        ...config.defaultShareData,
                        ...data,
                        ...data[key],
                        success() {
                            data.success && data.success(key);
                        },
                    });
                }
            }
        });
    }

    /**
     * 微信扫描二维码
     * @param param
     * @returns {Promise<any>}
     */
    scanQRCode(param = {}) {
        return new Promise((resolve, reject) => {
            this.isReady().then(() => {
                wx.scanQRCode({
                    needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                    scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
                    ...param,
                    success(res) {
                        // const result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                        param.success && param.success(res);
                        resolve(res);
                    },
                    error(errors) {
                        param.error && param.error(errors);
                        reject(errors);
                    },
                });
            });
        });
    }

    /**
     * 微信支付
     */
    chooseWXPay(paySign) {

        paySign.timestamp = paySign.timestamp || paySign.timeStamp;
        return new Promise((resolve, reject) => {
            this.isReady().then(() => {
                wx.chooseWXPay({
                    ...paySign,
                    success(res) {
                        resolve(res);
                    },
                    cancel(_err) {
                        reject(_err);
                    },
                });
            });
        });
    }

    previewImage(current, urls) {
        wx.previewImage({
            current: current, // 当前显示图片的http链接
            urls: urls, // 需要预览的图片http链接列表
        });
    }

    hideAllNonBaseMenuItem() {
        this.isReady().then(() => {
            wx.hideAllNonBaseMenuItem();
        });
    }

    showAllNonBaseMenuItem() {
        this.isReady().then(() => {
            wx.showAllNonBaseMenuItem();
        });
    }

    disenbledShare(){
        this.isReady().then(()=>{
            wx.hideMenuItems({
                menuList: this.shareArr
            })
        })
    }

    enbledShare(){
        this.isReady().then(()=>{
            wx.showMenuItems({
                menuList: this.shareArr
            })
        })
    }
}

const $wx = new Weixin();
export default $wx;
