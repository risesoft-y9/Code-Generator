<template>
    <y9Card title="安装使用步骤">
        <div style="height: 800px">
            <el-steps direction="vertical">
                <el-step title="安装组件插件的依赖">
                    <template #description>
                        <p
                            >npm i element-plus@2.2.21 remixicon@2.5.0 v-viewer@3.0.10 vue@3.2.41 vxe-table@4.3.5
                            xe-utils@3.5.7</p
                        >
                        <p>npm i sass --save-dev</p>
                    </template>
                </el-step>
                <el-step title="安装组件插件">
                    <template #description>
                        <p>npm i y9plugin-components</p>
                    </template>
                </el-step>
                <!-- <el-step title="安装组件插件" description="npm --registry https://svn.youshengyun.com:9900/nexus/repository/y9npm-hosted install y9plugin-components" /> -->

                <el-step title="在main.ts文件注册插件">
                    <template #description>
                        <div>
                            <h4 style="color: var(--el-text-color-primary)">
                                不需要应用国际化语言,默认是中文，请复制以下代码</h4
                            >
                            <p>import y9pluginComponents from "y9plugin-components"</p>
                            <p>const app:any = createApp(App)</p>
                            <p>app.use(y9pluginComponents)</p>
                            <p>app.mount('#app')</p>
                        </div>

                        <div>
                            <h4 style="color: var(--el-text-color-primary)">需要应用国际化语言，请复制以下代码</h4>
                            <p>import { createApp } from 'vue'</p>
                            <p>import { setupStore } from '@/store'</p>
                            <p>import y9pluginComponents from "y9plugin-components"</p>
                            <p>import y9_zhCn from "y9plugin-components/src/language/zh-cn";//默认的y9组件插件中文包</p>
                            <p>import y9_en from "y9plugin-components/src/language/en";//默认的y9组件插件英文包</p>
                            <p>import { useSettingStore } from "@/store/modules/settingStore";</p>
                            <p>const app:any = createApp(App)</p>
                            <p>setupStore(app)</p>
                            <p>
                                let opts = ref({}) watch( () => useSettingStore().getWebLanguage, (newLang) => {
                                opts.value.locale = newLang === 'en' ? y9_en : y9_zhCn }, { immediate:true } )
                            </p>
                            <p>app.use(y9pluginComponents,opts.value)</p>
                            <p>app.mount('#app')</p>
                        </div>
                    </template>
                </el-step>
                <el-step title="运行项目">
                    <template #description>
                        <p>npm run serve</p>
                        <p style="color: var(--el-text-color-primary)">运行成功后，根据组件说明文档使用组件即可</p>
                    </template>
                </el-step>
            </el-steps>
        </div>
    </y9Card>
</template>
<script lang="ts" setup>
    //查看代码弹窗
    let codeDialogConfig = ref({
        show: false,
        okText: '复制',
        onOk: (config) => {
            return new Promise((resolve, reject) => {
                const code = document.getElementById('code');
                window.getSelection().selectAllChildren(code);
                document.execCommand('copy');
                ElMessage({
                    message: '复制成功',
                    type: 'success'
                });
                reject();
            });
        }
    });

    //点击查看代码按钮
    function onShowCode() {
        Object.assign(codeDialogConfig.value, {
            show: true,
            codeText: `
			import { createI18n } from 'vue-i18n';
			import y9zhCn from 'y9plugin-components/src/language/zh-cn';
			import y9en from 'y9plugin-components/src/language/en';
			const messages = {
			    zh: { //中文
			        ...y9zhCn.el
			    },
			    en: { //英文
			        ...y9en.el,
			    }
			}
			const i18n = createI18n({
			    locale: 'zh',//当前语言，默认中文
			    legacy: false, // 使用 Composition API 模式，则需要将其设置为false
			    globalInjection: true,// 全局注入 $t 函数
			    messages,
			})
			
			export default i18n
		`
        });
    }
</script>
<style lang="scss" scoped>
    :deep(.el-step) {
        .el-step__head,
        .el-step__icon,
        .el-step__title {
            color: var(--el-text-color-primary);
            border-color: var(--el-text-color-primary);
            font-weight: normal;
        }

        .el-step__description {
            color: var(--el-color-primary);
        }
    }
</style>
