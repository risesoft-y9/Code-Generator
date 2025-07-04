/*
 * @Author: your name
 * @Date: 2022-01-10 18:09:52
 * @LastEditTime: 2022-02-14 16:41:26
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /sz- team-frontend-9.6.x/y9vue-home/src/main.js
 */
import router from '@/router/index';
import { setupStore } from '@/store';
import 'animate.css';
import 'normalize.css'; // 样式初始化
import 'remixicon/fonts/remixicon.css';
import { createApp } from 'vue';
//import sso from "@/sso-rebuild"
import sso from 'y9plugin-sso';
import App from './App.vue';
import './theme/global.scss';
import customDirective from '@/utils/directive';

import i18n from './language';
import y9pluginComponents from 'y9plugin-components'; //有生云公共组件库
import y9_zhCn from 'y9plugin-components/src/language/zh-cn'; //默认的y9组件插件中文包
import y9_en from 'y9plugin-components/src/language/en'; //默认的y9组件插件英文包
import { useSettingStore } from '@/store/modules/settingStore';
import 'viewerjs/dist/viewer.css';
import VueViewer from 'v-viewer';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
// 这是预览时引用的
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';

import githubTheme from '@kangc/v-md-editor/lib/theme/github';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import highlight from 'highlight.js';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import 'highlight.js/styles/atom-one-dark.css';
import 'highlight.js/lib/common';
import hljsVuePlugin from '@highlightjs/vue-plugin';

// 传入sso所需的环境变量
const env = {
    sso: {
        VUE_APP_SSO_DOMAINURL: import.meta.env.VUE_APP_SSO_DOMAINURL, // sso接口
        VUE_APP_SSO_CONTEXT: import.meta.env.VUE_APP_SSO_CONTEXT, // sso接口上下文
        VUE_APP_SSO_AUTHORIZE_URL: import.meta.env.VUE_APP_SSO_AUTHORIZE_URL, //sso授权码接口
        VUE_APP_SSO_LOGOUT_URL: import.meta.env.VUE_APP_SSO_LOGOUT_URL, //退出URL
        VUE_APP_SSO_CLIENT_ID: import.meta.env.VUE_APP_SSO_CLIENT_ID, //sso接口的固定字段
        VUE_APP_SSO_SECRET: import.meta.env.VUE_APP_SSO_SECRET, //sso接口的固定字段
        VUE_APP_SSO_GRANT_TYPE: import.meta.env.VUE_APP_SSO_GRANT_TYPE, //sso接口的固定字段
        VUE_APP_SSO_SITETOKEN_KEY: import.meta.env.VUE_APP_SSO_SITETOKEN_KEY //sso-token_key
    },
    logInfo: {
        showLog: true
    }
};

const app: any = createApp(App);
app.use(sso, { env });
setupStore(app);

let opts = ref({}); //y9组件选项配置
watch(
    () => useSettingStore().getWebLanguage, //监听语言变化，配置对应的语言包
    (newLang) => {
        opts.value.locale = newLang === 'en' ? y9_en : y9_zhCn;
    },
    {
        immediate: true
    }
);
app.use(i18n);
app.use(y9pluginComponents, opts.value);

app.use(router);
app.use(customDirective);
app.mount('#app');
app.use(VueViewer);

//预览的主题
VMdPreview.use(githubTheme, {
    Hljs: highlight
});
app.use(VMdPreview);
app.use(highlight);
app.use(hljsVuePlugin);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}
export const $y9_SSO = app.$y9_SSO;
