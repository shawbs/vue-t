import { Storage } from '@util';

export default {
    namespaced: true,
    modules: {},
    state: {
        userData: Storage.get('userData') || null,
        userType: window['$userType'],
        openid: window['$openid'] || 0,
    },
    getters: {
        invite_id(){
            return Storage.get('invite_id') || 0
        },
        user_id(state,getters){
            const {userData} = state;
            return userData ? userData.user_id : 0
        },
        isLogin(state, getters){
            return !!state.openid
        }
    },
    mutations: {
        setUserData(state, data) {
            state.userData = data;
            Storage.set('userData', data)
        },
        setInviteId(state, invite_id){
            Storage.set('invite_id', invite_id);
        }
    },
};