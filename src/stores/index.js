import Vue from 'vue';
import Vuex from 'vuex';

import base from './model/base';
import user from './model/user';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        base,
        user,
    },
    state: {},
    mutations: {},
    actions: {},
});
