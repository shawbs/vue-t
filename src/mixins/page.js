import { createNamespacedHelpers } from 'vuex';
const {
    mapState: mapStateBase,
    mapGetters: mapGettersBase,
    mapActions: mapActionsBase,
    mapMutations: mapMutationsBase,
} = createNamespacedHelpers('base');
const {
    mapState: mapStateUser,
    mapGetters: mapGettersUser,
    mapActions: mapActionsUser,
    mapMutations: mapMutationsUser,
} = createNamespacedHelpers('user');

import User from '@api/user'
export default {
    data(){
        return {
            shareData: this.$config.defaultShareData,
            shareResolve: null
        }
    },
    computed: {
        ...mapStateBase(['pageTitle']),
        ...mapStateUser(['userData','openid', 'userType']),
        ...mapGettersUser(['invite_id','user_id','isLogin']),
    },
    watch: {
        shareData: {
            handler(val) {
                this.$nextTick(() => {
                    const data = this.$wx.setShare(val, true);
                    if (this.shareResolve) {
                        this.shareResolve(data);
                        this.shareResolve = null;
                    }
                });
            },
            deep: true,
        }
    },
    methods: {
        ...mapMutationsBase(['setPageTitle']),
        ...mapMutationsUser(['setUserData', 'setInviteId']),
        setShareData(data) {
            return new Promise(resolve => {
                this.shareData = {
                    ...this.shareData,
                    ...data,
                };
                this.shareResolve = resolve;
            });
        },
        getUserData(force){
            if(force || !this.isLogin){
                User.getUserInfo().then(res=>{
                    console.log(res)
                    this.setUserData(res.data)
                })
            }
        }
    },
    activated() {
        this.setShareData()
        // this.getUserData()
    },
}