import { Storage } from '@util';
import API_MAIN from '@api/main';

export default {
    namespaced: true,
    modules: {},
    state: {
      theme: 'default-theme'
    },
    mutations: {
    },
    actions: {
      getList(){
        API_MAIN.getList()
      }
    },
};
