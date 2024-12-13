/*
 * @Author: lizhiwen
 * @Date: 2022-05-19 14:01:58
 * @LastEditors: lizhiwen
 * @LastEditTime: 2022-05-19 14:04:42
 * @Description: 首页路由
 */

const systemRouter = {
    path: '/localSystem',
    component: () => import('@/layouts/index.vue'),
    redirect: '/localSystem',
    name: 'localSystemIndex',
    meta: {
        title: '应用生成',
        environment: 1
    },
    children: [
        {
            path: '/localSystem',
            component: () => import('@/views/system/index.vue'),
            name: 'localSystemIndex1',
            meta: {
                title: '应用生成',
                icon: 'ri-function-line',
                environment: 1
            }
        }
    ]
};
export default systemRouter;
