import { createNamespacedHelpers } from 'vuex';
const {
    mapState: mapStateBase,
    mapGetters: mapGettersBase,
    mapActions: mapActionsBase,
    mapMutations: mapMutationsBase,
} = createNamespacedHelpers('base');

export default {
    computed: {
        ...mapStateBase(['pageTitle'])
    },
    methods: {
        ...mapMutationsBase(['setPageTitle']),
    },
}