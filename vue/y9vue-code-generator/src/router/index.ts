/*
 * @Author: your name
 * @Date: 2021-05-14 09:26:23
 * @LastEditTime: 2025-01-15 14:36:06
 * @LastEditors: chensiwen cikl777@163.com
 * @Description: In User Settings Edit
 * @FilePath: \y9vue-code\src\router\index.ts
 */

import { routerBeforeEach } from '@/router/checkRouter';
import NProgress from 'nprogress';
import { createRouter, createWebHistory } from 'vue-router';
import systemRouter from '@/router/modules/systemRouter';
import localSystemRouter from '@/router/modules/localSystemRouter';
import frontFrameRouter from '@/router/modules/frontFrameRouter';
//constantRoutes为不需要动态判断权限的路由，如登录、404、500等
export const constantRoutes: Array<any> = [
    {
        path: '/',
        name: 'index',
        hidden: true,
        redirect: '/localSystem'
    },
    {
        path: '/401',
        hidden: true,
        meta: {
            title: 'Not Permission'
        },
        component: () => import('@/views/401/index.vue')
    },
    {
        path: '/404',
        hidden: true,
        meta: {
            title: 'Not Found'
        },
        component: () => import('@/views/404/index.vue')
    }
];

//asyncRoutes需求动态判断权限并动态添加的页面  这里的路由模块顺序也是菜单显示的顺序（位置：src->router->modules）
export const asyncRoutes = [frontFrameRouter, localSystemRouter, systemRouter];
// 引入其他模块路由

//创建路由模式，采用history模式没有“#”
const router = createRouter({
    history: createWebHistory(import.meta.env.VUE_APP_PUBLIC_PATH),
    routes: constantRoutes
});

//在用户点击前，进入routerBeforeEach去判断用户是否有权限
//全部判断逻辑请查看checkRouter.js
router.beforeEach(routerBeforeEach);
router.afterEach(() => {
    NProgress.done();
});
export default router;
