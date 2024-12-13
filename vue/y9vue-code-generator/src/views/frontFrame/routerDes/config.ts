export default () => {
    /**
     * @name: treeList
     * @description: 左侧列表数据 id和右侧的id需要一致才能滚动定位 name 版本号
     * @date: 2023--06--07
     */
    let treeList = [
        { id: '1', name: '静态路由' },
        { id: '2', name: '动态路由' },
        { id: '3', name: '异步路由' }
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
            name: '静态路由',
            date: '2023-6-7-10:51',
            info: [
                {
                    title: '静态路由说明',
                    value: [
                        {
                            content:
                                '直接在前端工程里按照vue-router的规范写死的路由，在渲染过程中不加以程序代码动态控制和过滤的，怎么写就怎么渲染，写多少个路由就渲染多少个路由，这类使用方式可称之为静态路由。'
                        }
                    ]
                },
                {
                    title: '静态路由参考代码',
                    value: [
                        { content: '前端框架的路有设计中，已经包含对这三种路由的支持，且是可以混用开发项目的' },
                        { content: '白名单中的路由方式，就是静态路由的写法，直接参考即可' }
                    ]
                }
            ]
        },
        {
            id: '2',
            version: '',
            name: '动态路由',
            date: '2023-6-7-10:51',
            info: [
                {
                    title: '动态路由说明',
                    value: [
                        {
                            content:
                                '直接在前端工程里按照vue-router的规范提前准备好的路由，在渲染过程中使用路有钩子函数router.addRoute(route)，加以程序代码动态控制和过滤的，根据权限或条件控制渲染个数，渲染哪几个，这类使用方式可称之为动态路由。'
                        }
                    ]
                },
                {
                    title: '动态路由代码示例',
                    value: [
                        { content: '前端框架的路有设计中，已经包含对这三种路由的支持，且是可以混用开发项目的' },
                        {
                            content:
                                '前端框架中，在router/index.ts文件中的数组【asyncRoutes】以后在router/checkRole.js文件中对它的处理，就是动态路由的示例，直接参考即可'
                        }
                    ]
                }
            ]
        },
        {
            id: '3',
            version: '',
            name: '异步路由',
            date: '2023-6-7-10:51',
            info: [
                {
                    title: '异步路由说明',
                    value: [
                        {
                            content:
                                '只要是从接口过来的（即异步方式过来的）路由，获取到数据（路由封装前的原始数据）后，按照vue-router的规范生成前端所需的路由，这类使用方式可称之为异步路由。此类路由一般无须在前端控制和过滤，一般来说，后端已经做好权限管理，除非业务特别复杂。'
                        }
                    ]
                },
                {
                    title: '异步路由需要关注的文件',
                    value: [{ content: '只需看懂router/checkRole.js中的逻辑，改造它即可' }]
                },
                {
                    title: '【checkRole.js】代码示例（可直接复制）',
                    value: [
                        {
                            code: `
                       import router, { asyncRoutes } from "@/router";
                       import { useRouterStore } from "@/store/modules/routerStore";
                       import { getDynamicMenu } from './getInitData';
                       /**
                        * 根据 meta.role 判断当前用户是否有权限
                        * @param roles 用户的权限
                        * @param route 路由
                        */
                       function hasPermission(roles, route) {
                           if (route.meta && route.meta.roles) {
                               return roles.some(role => route.meta.roles.includes(role));
                           } else {
                               return true;
                           }
                       }
                       
                       /**
                        * 根据权限 - 递归过滤异步路由 - 深度优先遍历 - 留下有权限的路由
                        * @param routes asyncRoutes
                        * @param roles
                        */
                       function filterAsyncRoutes(routes, roles) {
                           const res = [];
                       
                           routes.forEach(route => {
                               const tmp = {...route };
                               if (hasPermission(roles, tmp)) {
                                   if (tmp.children) {
                                       tmp.children = filterAsyncRoutes(tmp.children, roles);
                                   }
                                   res.push(tmp);
                               }
                           });
                           return res;
                       }
                       
                       
                       /**
                        * 获取对应权限路由
                        * @param routes asyncRoutes
                        * @param roles
                        */
                        export async function getPermissionRoutes(rolesArr = ['systemAdmin']) {
                       
                           // 获取接口路由
                           const apiRouters = await getDynamicMenu() || [];
                       
                           const routerStore = useRouterStore()
                           const roles = rolesArr;
                           const permissionRoutes = filterAsyncRoutes(asyncRoutes, roles);
                           // 项目存储中心 pinia - routerStore模块 存储有权限的所有路由源数据，permissionRoutes即包含项目所有可跳转的路由
                           routerStore.$patch({
                               PermissionRoutes: [...permissionRoutes, ...apiRouters]
                           })
                           return [...apiRouters, ...permissionRoutes];
                       }
                       
                       
                       
                       // 查询路由权限
                       export async function checkRole(rolesArr = ['systemAdmin']) {
                           
                           console.log(rolesArr);
                           // 获取权限路由
                           const permissionRoutes = await getPermissionRoutes(rolesArr);
                           
                           if (permissionRoutes.length !== 0) {
                               permissionRoutes.map((route) => {
                                   router.addRoute(route);
                               });
                               console.log(await router.getRoutes());
                               return permissionRoutes;
                       
                           } else {
                               // console.log("没有权限");
                               return false;
                           }
                       }
                        `
                        }
                    ]
                },
                {
                    title: '【getInitData.js】代码示例（权限控制逻辑不一定适用你的工程）',
                    value: [
                        {
                            code: `
                        /**
                         * 最终要格式化为规范的路由格式
                        */
                        function formatRoutesFunc(res) {
                            let formatRoutes = [];
                            // 路由模版
                            let routeTemplate = {
                                path: "",
                                component: "@/layouts/index.vue",
                                redirect: "",
                                name: "",
                                meta: {
                                    title: "主菜单",
                                    icon: "ri-home-8-line"
                                },
                                children: []
                            }
                            
                            if (res.data && !res.data.length) {
                                console.log("未获取到接口数据");
                                return false;
                            }
                            /**
                             * 遍历一级菜单（路由）
                            */
                            for (let i = 0; i < res.data.length; i++) {
                                const item = res.data[i];
                                // 如果有子级路由（菜单）直接把它当作父级路由处理
                                if (item.children.length) {
                                    // 字符串转对象
                                    typeof item.meta === "Object" ? '': item.meta = JSON.parse(item.meta);
                                    // 修改有子级路由（菜单）的layouts
                                    item.component = "@/layouts/index.vue";
                                    // 修改有redirect属性
                                    item.redirect = item.path;
                                    // 修改菜单名称
                                    item.meta.title = item.name;
                                    // 直接归总到一个数组里
                                    formatRoutes.push(item);
                                    continue;
                                }
                                // 以下代码只针对一级路由（菜单）处理
                                // 克隆一个路由模版 目的是加一个layout外观
                                let thisRoute = cloneDeep(routeTemplate);
                                // 字符串转对象
                                typeof item.meta === "Object" ? '': item.meta = JSON.parse(item.meta);
                                
                                // 这个一级菜单是否是外部链接
                                if (isExternal(item.path) && !item.target) {
                                    // 是外链 【在当前页面的 iframe 打开】
                                    thisRoute.path = thisRoute.redirect = "/iframe";
                                    // 格式化一级路由（菜单）的name属性，取接口数据的name属性值
                                    thisRoute.name = item.meta.title = item.name;
                                    // 修改接口的component属性值，写死iframe的值
                                    item.component = iframeComp;
                                    item.meta.url = item.path;
                                    item.path = "/iframe";
                                }else if(isExternal(item.path) && item.target){
                                    // 是外链 【在浏览器的 新页签 打开】
                                    thisRoute.path = "/"+item.path;
                                    // 格式化菜单的name属性，取接口数据的name属性值
                                    item.meta.title = item.name;
                                }else{
                                    // 如果不是外链
                                    thisRoute.path = thisRoute.redirect = item.path;
                                    // 格式化一级路由（菜单）的name属性
                                    thisRoute.name = item.path.replaceAll("/",'');
                                    item.meta.title = item.name;
                                    item.meta.url = false;
                                }
                                // 将接口数据的buttons位置移入到每个route.meta里
                                if (item.buttons.length) {
                                    item.meta.buttons = item.buttons;
                                     // 移入后，删除原位置的buttons
                                    delete item.buttons;
                                }else{
                                    delete item.buttons;
                                }
                                // 标记被处理过的一级路由
                                thisRoute.meta.level = 1;
                                // title属性统一使用接口数据里的name属性(菜单名称)
                                thisRoute.meta.title = item.name;
                                // 每个一级菜单，加一个layout
                                thisRoute.children.push(item);
                                // 归总到一个数组里
                                formatRoutes.push(thisRoute);
                            }
                        
                            /**
                             * 修改子级路由的格式
                            */
                            function formatSubRoutes(subItem, parentItem) {
                                // 字符串转对象
                                typeof subItem.meta ==="object"? '': subItem.meta = JSON.parse(subItem.meta);
                                // 将接口数据的buttons位置移入到每个route.meta里
                                if ( subItem.buttons) {
                                    subItem.meta.buttons = subItem.buttons;
                                    delete subItem.buttons;
                                }
                                // 这个子级菜单是否是外部链接
                                if (isExternal(subItem.path) && !subItem.target) {
                                    // 是外链 【在 iframe 打开】
                                    subItem.meta.url = subItem.path;
                                    // 拼接外链的父级路由
                                    subItem.path = parentItem.path + "/iframe";
                                    // 写死iframe渲染组件
                                    subItem.component = iframeComp;
                                }else if(isExternal(subItem.path) && subItem.target){
                                    /**
                                     * 是外链【在 新标签 打开】
                                     * 这个条件必须，但不做任何更改，不做更改就是它需要做的事
                                     * 
                                    */
                                    // subItem.path = "/"+subItem.path;
                                }else{
                                    // 如果不是外链
                                    subItem.meta.url = false;
                                    // 拼接非外链的父级路由
                                    subItem.path = parentItem.path + subItem.path;
                                }
                                // 有子路由的父级路由，重定向属性全部设置为空
                                parentItem.redirect = "";
                                // title属性统一使用接口数据里的name属性(菜单名称)
                                subItem.meta.title = subItem.name
                            }
                            /**
                             * 统一处理子路由及其所在的父路由
                            */
                            function deepIterator_subChild(array) {
                                for (let i = 0; i < array.length; i++) {
                                    const item = array[i];
                                    if (item.meta.level) {
                                        continue ;
                                    }
                                    if (item.children && item.children.length) {
                                        item.children.map(subItem => {
                                            formatSubRoutes(subItem, item);
                                        })
                                        deepIterator_subChild(item.children);
                                    }
                                }
                            }
                        
                            deepIterator_subChild(formatRoutes);
                        
                            /**
                             * 统一函数处理component属性
                             * @param {*} array 
                             * @returns 
                             */
                            
                            function deepIterator_comp(array) {
                                array.map(item => {
                                    let compPath = null;
                                    if (item.component) {
                                        compPath = item.component.replace("@","/src");
                                    } else {
                                        compPath = "/src/views/test/test.vue"
                                    }
                                    
                                    // console.log(compPath, modules);
                                    item.component =  modules[compPath];
                                    
                                    if (item.children && $dataType(item.children)==="array" && item.children.length) {
                                        deepIterator_comp(item.children);
                                    }
                                })
                                return array;
                            }
                        
                            console.log(cloneDeep(formatRoutes));
                            console.log('-----',formatRoutes);
                            return deepIterator_comp(formatRoutes);
                        }
                        
                        /**
                         * 获取异步菜单接口
                        */
                        export async function getDynamicMenu() {
                            let sessionObj = JSON.parse(sessionStorage.getItem(import.meta.env.VUE_APP_SSO_SITETOKEN_KEY));
                            // return await fetch(import.meta.env.VUE_APP_CONTEXT + 'api/menu/list', {
                            return await fetch(import.meta.env.VUE_APP_CONTEXT + 'api/menu/list', {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                                    Authorization: 'Bearer ' + sessionObj.access_token,
                                },
                            })
                                .then((res) => {
                                    return res.json();
                                })
                                .then((res) => {
                                    // res.data[1].target = 1;
                                    // res.data[4].children[1].target = 1;
                                    let formatRoutes = formatRoutesFunc(res)
                                    // 最后，返回格式化后的路由数组
                                    return formatRoutes;
                                })
                                .catch((e) => {
                                    console.log(e);
                                });
                        }
                        `
                        }
                    ]
                }
            ]
        }
    ];
    return { treeList, description };
};
