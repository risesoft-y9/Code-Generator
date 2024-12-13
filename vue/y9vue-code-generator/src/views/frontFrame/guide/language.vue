<template>
    <p>y9组件默认使用简体中文，如果你希望使用其他语言，你可以参考下面的方案。</p>
    <y9Card style="margin-top: 30px" title="方案一: 全局配置 (在main.ts文件配置)">
        <pre>
			import { createApp } from 'vue'
			import { setupStore } from '@/store'
			import y9pluginComponents from "y9plugin-components"
			import y9_zhCn  from "y9plugin-components/src/language/zh-cn";//默认的y9组件插件中文包
			import y9_en from "y9plugin-components/src/language/en";//默认的y9组件插件英文包
			import { useSettingStore } from "@/store/modules/settingStore";
			const app:any = createApp(App)
			setupStore(app)
			let opts = ref({}) //y9组件选项配置
			watch( 
				() => useSettingStore().getWebLanguage, //监听语言变化，配置对应的语言包
				(newLang) => { 
					opts.value.locale = newLang === 'en' ? y9_en : y9_zhCn 
				}, 
				{ 
					immediate:true
				} 
			)
			app.use(y9pluginComponents,opts.value)
			app.mount('#app')
		</pre
        >
    </y9Card>

    <y9Card style="margin-top: 50px" title="方案二: ConfigProvider (在App.vue文件配置)">
        <pre>
			&lt;script lang="ts" setup&gt;	
				//y9组件语言包
				import y9_zhCn from "y9plugin-components/src/language/zh-cn";
				import y9_en from "y9plugin-components/src/language/en";
				//框架的store
				import { useSettingStore } from "@/store/modules/settingStore";
				const settingStore = useSettingStore()
				
				//监听语言配置的变化，传入对应的语言包
				let y9_locale = ref({})
				watch(
					() => useSettingStore().getWebLanguage,//监听语言变化，传入对应的语言包
					(newLang) => {
						y9_locale.value = newLang === 'en' ? y9_en : y9_zhCn
					},
					{
						immediate:true
					}
				)
			&lt;/script&gt;
		
			&lt;template&gt;
				&lt;y9-config-provider :locale="y9_locale"&gt;
					&lt;router-view&gt;&lt;/router-view&gt;
				&lt;/y9-config-provider&gt;
			&lt;template&gt;
			
		</pre
        >
    </y9Card>
</template>

<script></script>

<style lang="scss" scoped>
    :deep(.y9-card-content) {
        color: var(--el-color-primary);

        & > pre {
            font-family: inherit;
            line-height: 30px;
        }
    }
</style>
