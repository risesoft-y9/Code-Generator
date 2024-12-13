/*
 * @Author: lizhiwen
 * @Date: 2022-05-17 18:01:58
 * @LastEditors: lizhiwen
 * @LastEditTime: 2022-05-17 18:04:42
 * @Description: 首页路由
 */

const systemRouter = {
    path: '/system',
    component: () => import('@/layouts/index.vue'),
    redirect: '/system',
    name: 'systemIndex',
    meta: {
        title: '应用生成(云服务)',
        environment: 0
    },
    children: [
        {
            path: '/system',
            component: () => import('@/views/system/index.vue'),
            name: 'systemIndex1',
            meta: {
                title: '应用生成(云服务)',
                icon: 'ri-apps-line',
                environment: 0
            }
        }
    ]
};
export default systemRouter;
