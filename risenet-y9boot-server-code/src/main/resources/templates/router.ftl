/**
 * @description ${codeEntity.cnName}
 * @author ${codeEntity.isvName}
 * @date ${.now?string('yyyy-MM-dd')}
 */
const ${codeEntity.name?uncap_first}Router = {
    path: "/${codeEntity.name?uncap_first}",
    component: () => import("@/layouts/index.vue"),
    redirect: "/${codeEntity.name?uncap_first}",
    name:"${codeEntity.name?uncap_first}Index",
    meta: {
        title: "${codeEntity.cnName}"
    },
    children: [
        {
            path: "/${codeEntity.name?uncap_first}",
            component: () => import("@/views/${codeEntity.name?uncap_first}/index.vue"),
            name: "${codeEntity.name?uncap_first}",
            meta: { title: "${codeEntity.cnName}", icon: "ri-folder-user-line" },
        },
        
    ]
};

export default ${codeEntity.name?uncap_first}Router;