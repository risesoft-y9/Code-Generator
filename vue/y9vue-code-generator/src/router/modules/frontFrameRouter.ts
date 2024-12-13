/*
 * @Author: lizhiwen
 * @Date: 2022-05-17 18:01:58
 * @LastEditors: lizhiwen
 * @LastEditTime: 2022-05-17 18:04:42
 * @Description: 首页路由
 */

const frontFrameRouter = {
    path: '/frontFrame',
    component: () => import('@/layouts/index.vue'),
    redirect: '/frontFrame/guide',
    name: 'frontFrameIndex',
    meta: {
        title: '前端框架',
        icon: 'ri-node-tree',
        environment: 1
    },
    children: [
        {
            path: '/frontFrame/frameDes',
            component: () => import('@/views/frontFrame/frameDes/index.vue'),
            name: 'frameDes',
            meta: {
                title: '前端框架模版',
                icon: 'ri-file-cloud-line',
                environment: 2
            }
        },
        {
            path: '/frontFrame/routerDes',
            component: () => import('@/views/frontFrame/routerDes/index.vue'),
            name: 'routerDes',
            meta: {
                title: '框架路由说明',
                icon: 'ri-article-line',
                environment: 2
            }
        },
        {
            path: '/frontFrame/classicLayout',
            redirect: '/frontFrame/classicLayout/org',
            name: 'classicLayout',
            meta: {
                title: '数字底座经典布局',
                icon: 'ri-layout-2-line',
                environment: 2
            },
            children: [
                {
                    path: '/frontFrame/classicLayout/org',
                    component: () => import('@/views/frontFrame/classicLayout/org/index.vue'),
                    name: 'org',
                    meta: {
                        title: '组织架构',
                        icon: 'ri-node-tree',
                        environment: 3
                    }
                },
                {
                    path: '/frontFrame/classicLayout/system',
                    component: () => import('@/views/frontFrame/classicLayout/system/index.vue'),
                    name: 'system',
                    meta: {
                        title: '应用系统管理',
                        icon: 'ri-apps-line',
                        environment: 3
                    }
                },
                {
                    path: '/frontFrame/classicLayout/job',
                    component: () => import('@/views/frontFrame/classicLayout/job/index.vue'),
                    name: 'job',
                    meta: {
                        title: '职位管理',
                        icon: 'ri-folder-user-line',
                        environment: 3
                    }
                },
                {
                    path: '/frontFrame/classicLayout/loginLog',
                    component: () => import('@/views/frontFrame/classicLayout/loginLog/index.vue'),
                    name: 'loginLog',
                    meta: {
                        title: '登录日志',
                        icon: 'ri-file-lock-line',
                        environment: 3
                    }
                },
                {
                    path: '/frontFrame/classicLayout/explain',
                    component: () => import('@/views/frontFrame/classicLayout/explain/index.vue'),
                    name: 'explain',
                    meta: {
                        title: '使用说明',
                        icon: 'ri-eye-line'
                    }
                }
            ]
        },
        {
            path: '/frontFrame/updateDes',
            component: () => import('@/views/frontFrame/updateDes/index.vue'),
            name: 'updateDes',
            meta: {
                title: '组件更新说明',
                icon: 'ri-file-list-line',
                environment: 2
            }
        },
        {
            path: '/frontFrame/guide',
            redirect: '/frontFrame/guide/install',
            name: 'guide',
            meta: {
                title: '组件使用指南',
                icon: 'ri-compass-line',
                environment: 2
            },
            children: [
                {
                    path: '/frontFrame/guide/install',
                    component: () => import('@/views/frontFrame/guide/install.vue'),
                    name: 'install',
                    meta: {
                        title: '安装说明',
                        icon: 'ri-file-text-line',
                        environment: 3
                    }
                },
                {
                    path: '/frontFrame/guide/language',
                    component: () => import('@/views/frontFrame/guide/language.vue'),
                    name: 'language',
                    meta: {
                        title: '国际化',
                        icon: 'ri-global-line',
                        environment: 3
                    }
                }
            ]
        },
        {
            path: '/frontFrame/y9Card',
            component: () => import('@/views/frontFrame/y9Card/index.vue'),
            name: 'y9Card',
            meta: {
                title: 'Card 卡片',
                icon: 'ri-hard-drive-2-line',
                environment: 2
            }
        },
        {
            path: '/frontFrame/y9Dialog',
            component: () => import('@/views/frontFrame/y9Dialog/index.vue'),
            name: 'y9Dialog',
            meta: {
                title: 'Dialog 弹窗',
                icon: 'ri-window-line',
                environment: 2
            }
        },
        {
            path: '/frontFrame/y9Form',
            component: () => import('@/views/frontFrame/y9Form/index.vue'),
            name: 'y9Form',
            meta: {
                title: 'Form 表单',
                icon: 'ri-profile-line',
                environment: 2
            }
        },
        {
            path: '/frontFrame/y9Filter',
            component: () => import('@/views/frontFrame/y9Filter/index.vue'),
            name: 'y9Filter',
            meta: {
                title: 'Filter 过滤',
                icon: 'ri-filter-line',
                environment: 2
            }
        },
        {
            path: '/frontFrame/y9Pagination',
            component: () => import('@/views/frontFrame/y9Pagination/index.vue'),
            name: 'y9Pagination',
            meta: {
                title: 'Pagination 分页',
                icon: 'ri-page-separator',
                environment: 2
            }
        },
        {
            path: '/frontFrame/y9Table',
            redirect: '/frontFrame/y9Table/install',
            name: 'y9Table',
            meta: {
                title: '表格',
                icon: 'ri-table-2',
                environment: 2
            },
            children: [
                {
                    path: '/frontFrame/y9Table/y9Table',
                    component: () => import('@/views/frontFrame/y9Table/eltable.vue'),
                    name: 'y9Table1',
                    meta: {
                        title: 'y9Table 表格',
                        icon: 'ri-table-2'
                    }
                },
                {
                    path: '/frontFrame/y9Table/y9VxeTable',
                    component: () => import('@/views/frontFrame/y9Table/vxetable.vue'),
                    name: 'y9VxeTable',
                    meta: {
                        title: 'y9VxeTable 表格',
                        icon: 'ri-table-2'
                    }
                }
            ]
        },

        {
            path: '/frontFrame/y9List',
            component: () => import('@/views/frontFrame/y9List/index.vue'),
            name: 'y9List',
            meta: {
                title: 'List 列表',
                icon: 'ri-list-unordered',
                environment: 2
            }
        },
        {
            path: '/frontFrame/y9Tree',
            component: () => import('@/views/frontFrame/y9Tree/index.vue'),
            name: 'y9Tree',
            meta: {
                title: 'y9Tree 树',
                icon: 'ri-node-tree',
                environment: 2
            }
        },
        {
            path: '/frontFrame/viewer',
            component: () => import('@/views/frontFrame/v-viewer/index.vue'),
            name: 'viewer',
            meta: {
                title: 'v-viewer 图片预览插件',
                icon: 'ri-image-line',
                environment: 2
            }
        },
        {
            path: '/frontFrame/y9Upload',
            redirect: '/frontFrame/y9Upload/install',
            meta: {
                title: 'y9Upload 上传',
                icon: 'ri-folder-upload-line'
            },
            children: [
                {
                    path: '/frontFrame/y9UploadOne',
                    component: () => import('@/views/frontFrame/y9Upload/uploadOne.vue'),
                    name: 'y9UploadOne',
                    meta: {
                        title: 'y9Upload 上传样式一',
                        icon: 'ri-node-tree'
                    }
                },
                {
                    path: '/frontFrame/y9UploadTwo',
                    component: () => import('@/views/frontFrame/y9Upload/uploadTwo.vue'),
                    name: 'y9UploadTwo',
                    meta: {
                        title: 'y9Upload 上传样式二',
                        icon: 'ri-node-tree'
                    }
                },
                {
                    path: '/frontFrame/y9Uploader',
                    component: () => import('@/views/frontFrame/y9Upload/uploadThree.vue'),
                    name: 'uploadThree',
                    meta: {
                        title: 'y9Upload 上传样式三',
                        icon: 'ri-node-tree'
                    }
                }
            ]
        }
    ]
};
export default frontFrameRouter;
