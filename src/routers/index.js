import vue from 'vue'
import Router from 'vue-router'

import Layout from '@page/home';
//route models
import UserRoutes from './models/user';

import Intercept from './intercept';

vue.use(Router);

const routes = [
    //主模块页面
    ...[
      {
        path: '/',
        redirect: '/index',
        component: Layout,
        children: [
          {
            path: 'index',
            name: 'homeIndex',
            meta: {
              title: 'welcome'
            },
            component: () => import('@page/home/welcome.vue'),
          }
        ]
      }
    ],
    ...UserRoutes,
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
        path: '/404',
        name: '404',
        meta: {
            title: '404'
        },
        component: () => import('@page/error/404.vue'),
    },
    {
      path: '*',
      redirect: '/404',
    }
]

const routerInstance = new Router({
    routes
})

Intercept(routerInstance)

export default routerInstance
