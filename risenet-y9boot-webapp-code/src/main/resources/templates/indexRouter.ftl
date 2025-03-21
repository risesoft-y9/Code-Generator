import { routerBeforeEach } from "@/router/checkRouter";
import NProgress from "nprogress";
import { createRouter, createWebHistory } from "vue-router";
import homeRouter from "./modules/homeRouter";

<#list codeEntityList as codeEntity>
import ${codeEntity.name?uncap_first}Router from "./modules/${codeEntity.name?uncap_first}Router";
</#list>
//constantRoutes为不需要动态判断权限的路由，如登录、404、500等
export const constantRoutes: Array<any> = [
	{
		path: "/",
		name: "index",
		hidden: true,
		redirect: "/home"
	},
	{
		path: "/401",
		hidden: true,
		meta: {
			title: "Not Permission"
		},
		component: () => import("@/views/401/index.vue")
	},
	{
		path: "/404",
		hidden: true,
		meta: {
			title: "Not Found"
		},
		component: () => import("@/views/404/index.vue")
	}
];

//asyncRoutes需求动态判断权限并动态添加的页面  这里的路由模块顺序也是菜单显示的顺序（位置：src->router->modules）
export const asyncRoutes = [
	homeRouter,
	<#list codeEntityList as codeEntity>
	${codeEntity.name?uncap_first}Router,
	</#list>
];
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