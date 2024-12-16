const localTemplateRouter = {
    path: '/localTemplate',
    component: () => import('@/layouts/index.vue'),
    redirect: '/localTemplate',
    name: 'localTemplateIndex',
    meta: {
        title: '模板管理',
        environment: 1
    },
    children: [
        {
            path: '/localTemplate',
            component: () => import('@/views/template/index.vue'),
            name: 'localTemplate',
            meta: {
                title: '模板管理',
                icon: 'ri-align-item-left-line',
                environment: 1
            }
        }
    ],
};
export default localTemplateRouter;
