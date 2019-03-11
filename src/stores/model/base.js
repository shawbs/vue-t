import { Storage } from '@util'
export default {
    namespaced: true,
    modules: {},
    state: {
        pageTitle: '',
        reports: Storage.get('reports') || [],
    },
    mutations: {
        setPageTitle(state, pageTitle) {
            state.pageTitle = pageTitle
        },
        setReports(state, reports) {
            state.reports = [...reports]
            Storage.set('reports', [...reports])
        }
    },
    actions: {
    },
};
