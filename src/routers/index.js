import vue from 'vue'
import Router from 'vue-router'
import Store from '@store'


vue.use(Router);

const opt = {
    mode: 'history'
}


const routes = [
    {
        path: '/',
        name: 'home',
        meta: {
            title: '我的2018年终报告',
            userType: 'sxb'
        },
        component: () => import('@page/home.vue')
    },
    //主模块页面
    ...[
        {
            path: '/share',
            name: 'share',
            meta: {
                title: '我的专属海报',
            },
            component: () => import('@page/share.vue'),
        },
        {
            path: '/report',
            name: 'report',
            meta: {
                title: '我的2018年终报告',
                userType: 'sxb'
            },
            component: () => import('@page/report.vue'),
        }
    ],
    //用户模块页面
    ...[
        {
            path: '/login',
            name: 'login',
            meta: {
                title: '登录',
            },
            component: () => import('@page/login.vue'),
        },
    ],
    //其它页面
    ...[
        {
            path: '/error/:status',
            name: 'error',
            meta: {
                title: 'error'
            },
            component: () => import('@page/other/error.vue'),
            props: true
        },
        {
            path: '*',
            name: '404',
            meta: {
                title: '404'
            },
            component: () => import('@page/other/404.vue')
        }
    ]
   
]

const routerInstance = new Router({
    // mode: opt.mode,
    routes
})

routerInstance.beforeEach((to,from,next)=>{
    const { userType } = to.meta
    const user_type = Store.state['user'].userType
    if(userType && user_type !== userType ){
        next('/share')
    }else{
        next();
    }
})

routerInstance.afterEach((to,from,next)=>{
    // console.log(to,from)
})

export default routerInstance
