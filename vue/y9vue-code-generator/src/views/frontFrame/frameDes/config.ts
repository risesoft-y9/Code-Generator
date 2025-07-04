export default () => {
    /**
     * @name: treeList
     * @description: 左侧列表数据 id和右侧的id需要一致才能滚动定位 name 版本号
     * @date: 2023--06--07
     */
    let treeList = [
        { id: '1', name: '框架功能介绍' },
        { id: '2', name: '框架目录结构' },
        { id: '3', name: '首次运行说明' },
        { id: '4', name: '框架单点登录（图解说明）' },
        { id: '5', name: '框架配置文件说明' },
        { id: '6', name: '框架渲染过程（图解说明）' },
        { id: '7', name: '框架路由配置说明' },
        { id: '8', name: '框架路由过程（图解说明）' }
    ];
    /**
     * @name: description
     * @description: 右侧内容，id和左侧id对应 version版本号
     * @description: name 组件名称 date 日期 info就是进度条里的内容
     * @date: 2023--06--07
     */
    let description = [
        {
            id: '1',
            version: '',
            name: '框架功能介绍',
            date: '2023-6-7-10:51',
            info: [
                {
                    title: '框架中已经封装好的功能有',
                    value: [
                        { content: '1、单点登录' },
                        { content: '2、路由即菜单' },
                        { content: '3、菜单收缩功能' },
                        { content: '4、锁屏功能' },
                        { content: '5、刷新页面组件功能' },
                        { content: '6、显示器全屏功能' },
                        { content: '7、国际化语言' },
                        { content: '8、网站设置功能' },
                        { content: '7-1、切换布局' },
                        { content: '7-2、切换语言' },
                        { content: '7-3、切换字号' },
                        { content: '7-4、切换主题' },
                        { content: '7-5、切换菜单目录的背景' },
                        { content: '7-6、是否固定header' },
                        { content: '7-7、是否显示进度条' },
                        { content: '7-8、是否显示刷新功能' },
                        { content: '7-9、是否显示搜索栏' },
                        { content: '7-10、是否显示右上角的通知功能' },
                        { content: '7-11、是否显示全屏功能' },
                        { content: '7-12、是否显示锁屏功能' },
                        { content: '7-13、设置锁屏密码' },
                        { content: '7-14、设置栏自己的显示宽度设置' },
                        { content: '7-15、设置栏自己的移入效果设置' }
                    ]
                }
            ]
        },
        {
            id: '2',
            version: '',
            name: '框架目录结构',
            date: '2023-6-7-10:51',
            info: [
                {
                    title: '框架目录结构简要说明',
                    value: [
                        { content: 'src\\api:                接口目录' },
                        { content: 'src\\assets:             需打包编译的静态资源' },
                        { content: 'src\\components:         页面组件模块' },
                        { content: 'src\\language:           语言包' },
                        { content: 'src\\layouts:            前端框架多布局的核心代码' },
                        { content: 'src\\router:             前端页面组件路由' },
                        { content: 'src\\store:              工程的公共仓库' },
                        { content: 'src\\theme:              element-plus主题包' },
                        { content: 'src\\utils:              辅助函数' },
                        { content: 'src\\views:              页面组件及其子组件' },
                        { content: 'App.vue:                根组件' },
                        { content: 'main.ts:                项目程序入口文件' },
                        { content: 'settings:               项目部分设置文件' },
                        { content: '.env.development:       开发环境配置文件' },
                        { content: '.env.production:        生产环境配置文件' },
                        { content: '.eslintignore:          语法规范忽略文件' },
                        { content: '.eslintrc.js:           语法规范文件' },
                        { content: '.prettierignore:        代码风格配置忽略文件' },
                        { content: 'prettier.config.js:     代码风格配置文件' },
                        { content: 'README.md:              说明文档' },
                        { content: 'tsconfig.json:          ts配置文件' },
                        { content: 'vite.config.js:         vite脚手架各种环境编译配置文件' }
                    ]
                },
                {
                    title: '下载地址',
                    value: [
                        {
                            content:
                                '框架模版（空的框架模版）gitee仓库地址：https://e.gitee.com/youshengyun/repos/youshengyun/y9-core/tree/master/vue/common/y9vue-empty'
                        },
                        {
                            content:
                                '数字底座标准版（这里当作框架模版的使用demo）gitee仓库地址：https://e.gitee.com/youshengyun/repos/youshengyun/y9-core/tree/master/vue/y9vue-kernel-standard'
                        }
                    ]
                }
            ]
        },
        {
            id: '3',
            version: '',
            name: '首次运行说明',
            date: '2023-6-7-10:51',
            info: [
                {
                    title: '首次运行简要说明',
                    value: [
                        {
                            content:
                                '框架模版主要依赖了后端的单点登录，您下载后，应该是可以直接运行的，因为它已经配置好了互联网上的我司的单点登录'
                        }
                    ]
                },
                {
                    title: '下载地址',
                    value: [
                        {
                            content:
                                '框架模版（空的框架模版）gitee仓库地址：https://e.gitee.com/youshengyun/repos/youshengyun/y9-core/tree/master/vue/common/y9vue-empty'
                        },
                        {
                            content:
                                '数字底座标准版（这里当作框架模版的使用demo）gitee仓库地址：https://e.gitee.com/youshengyun/repos/youshengyun/y9-core/tree/master/vue/y9vue-kernel-standard'
                        }
                    ]
                }
            ]
        },
        {
            id: '4',
            version: '',
            name: '框架单点登录（图解说明）',
            date: '2023-6-7-10:51',
            info: [
                {
                    title: '时序图',
                    value: [
                        {
                            imgSrc: 'https://vue.youshengyun.com/files/img/前端/单点登录原理时序图.png'
                        }
                    ]
                },
                {
                    title: '查看高清单点登录原理时序图 PDF文档 ',
                    value: [
                        {
                            pdfSrc: 'https://vue.youshengyun.com/files/img/前端/单点登录原理时序图.pdf'
                        }
                    ]
                }
            ]
        },
        {
            id: '5',
            version: '',
            name: '框架配置文件说明',
            date: '2023-6-7-10:51',
            info: [
                {
                    title: '配置文件简要说明',
                    value: [
                        {
                            content:
                                '框架模版只包含两份配置文件，分别是开发环境配置文件和生产环境配置文件，在前端工程目录下的.env.development和.env.production。'
                        }
                    ]
                },
                {
                    title: '配置文件中的环境变量详细说明（以.env.development文件为例，打包生产环境时，需通过以下说明修改您的.env.production文件）',
                    value: [
                        { content: '#运行环境' },
                        { content: "NODE_ENV = 'development'" },
                        { content: '# 工程名' },
                        { content: "VUE_APP_NAME = 'y9vue-code'" },
                        { content: '# 公共资源路径' },
                        { content: "VUE_APP_PUBLIC_PATH = '/y9vue-code/'" },
                        { content: '# markdown 文件路径' },
                        { content: "VUE_APP_MD_PATH = '/y9vue-code/public/'" },
                        { content: '# 后端api接口域名' },
                        { content: "VUE_APP_CONTEXT = 'http://localhost:8080/server-code'" },
                        { content: '# index页面，配一个首页' },
                        { content: "VUE_APP_HOST_INDEX = 'http://localhost:8081/y9vue-code/'" },
                        { content: '# sso接口主域名' },
                        { content: "VUE_APP_SSO_DOMAINURL = 'https://test.youshengyun.com/'" },
                        { content: '# sso接口上下文' },
                        { content: "VUE_APP_SSO_CONTEXT = 'sso'" },
                        { content: '# sso授权码接口' },
                        {
                            content: "VUE_APP_SSO_AUTHORIZE_URL = 'https://test.youshengyun.com/sso/oauth2.0/authorize'"
                        },
                        { content: '# 退出URL，service参数，需注意您是开发环境运行还是生产环境运行' },
                        {
                            content:
                                "VUE_APP_SSO_LOGOUT_URL = 'https://test.youshengyun.com/sso/logout?service=http://localhost:8081/'"
                        },
                        { content: '# sso接口的固定字段，由后端提供此参数' },
                        { content: "VUE_APP_SSO_CLIENT_ID = 'clientid'" },
                        { content: '# sso接口的固定字段，由后端提供此参数' },
                        { content: "VUE_APP_SSO_SECRET = 'secret'" },
                        { content: '# sso接口的固定字段，由后端提供此参数' },
                        { content: "VUE_APP_SSO_GRANT_TYPE = 'authorization_code'" },
                        { content: '# 前端存储token的key' },
                        { content: "VUE_APP_SSO_SITETOKEN_KEY = 'y9AT'" }
                    ]
                }
            ]
        },
        {
            id: '6',
            version: '',
            name: '框架渲染过程（图解说明）',
            date: '2023-6-7-10:51',
            info: [
                {
                    title: '图解',
                    value: [
                        {
                            imgSrc: 'https://vue.youshengyun.com/files/img/前端/框架渲染过程.png'
                        }
                    ]
                }
            ]
        },
        {
            id: '7',
            version: '',
            name: '框架路由配置说明',
            date: '2023-6-7-10:51',
            info: [
                {
                    title: '设计原则',
                    value: [
                        { content: '一个主路由（即任意一个一级菜单）独立一个路由文件' },
                        { content: '一个页面级路由对应一个页面级组件' }
                    ]
                },
                {
                    title: '开发规范',
                    value: [
                        { content: '主路由文件下添加各级子路有（即对应这个一级菜单的任意二、三、四级菜单）' },
                        { content: '一个页面级组件在views目录中独立一个文件夹，文件夹下再添加此页面中的私有组件' }
                    ]
                }
            ]
        },
        {
            id: '8',
            version: '',
            name: '框架路由过程（图解说明）',
            date: '2023-6-7-10:51',
            info: [
                {
                    title: '框架路由过程（图解说明）',
                    value: [{ imgSrc: 'https://vue.youshengyun.com/files/img/前端/路由程序流程图.png' }]
                }
            ]
        }
    ];
    return { treeList, description };
};
