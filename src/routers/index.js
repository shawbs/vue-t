import vue from 'vue'
import Router from 'vue-router'
// import Store from '@store'


vue.use(Router);

const opt = {
    mode: 'history'
}


const routes = [
    // tab
    {
        path: '/tab',
        meta: {
            title: ''
        },
        component: () => import('@page/tab/index.vue'),
        children: [
            {
                path: 'home',
                meta: {
                    title: 'home',
                    no_transition: true
                },
                component: ()=> import('@page/tab/home.vue')
            },
            {
                path: 'mine',
                meta: {
                    title: 'mine',
                    no_transition: true
                },
                component: ()=> import('@page/tab/mine.vue')
            }
        ]
    },
    //主模块页面
    ...[
        
    ],
    //用户模块页面
    ...[
        {
            path: '/user/login',
            name: 'login',
            meta: {
                title: '登录',
            },
            component: () => import('@page/user/login.vue'),
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
            component: () => import('@page/error/error.vue'),
            props: true
        },
        {
            path: '*',
            name: '404',
            meta: {
                title: '404'
            },
            component: () => import('@page/error/404.vue')
        }
    ]
   
]

const routerInstance = new Router({
    // mode: opt.mode,
    routes
})

routerInstance.beforeEach((to,from,next)=>{
    next();
})

routerInstance.afterEach((to,from,next)=>{
    // console.log(to,from)
})

export default routerInstance
