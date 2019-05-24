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
        ...mapStateUser(['userData']),
        ...mapGettersUser(['user_id','isLogin']),
    },
    methods: {
        ...mapMutationsUser(['setUserData', 'setInviteId']),
    },
    activated() {
    },
}
