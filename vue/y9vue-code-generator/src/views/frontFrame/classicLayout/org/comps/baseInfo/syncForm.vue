<!--
 * @Descripttion: 
 * @version: 
 * @Author: zhangchongjie
 * @Date: 2022-06-20 09:35:38
 * @LastEditors: zhangchongjie
 * @LastEditTime: 2022-06-21 16:34:46
 * @FilePath: \workspace-y9boot-9.5-vuee:\workspace-y9boot-9.6-vue\y9vue-kernel-dcat-style\src\views\org\comps\dialogContent\sync.vue
-->
<template>
    <y9Form ref="y9FormRef" :config="y9FormConfig"></y9Form>
</template>

<script lang="ts" setup>
    import { inject, ref } from 'vue';
    import { useI18n } from 'vue-i18n';
    import { useSettingStore } from '@/store/modules/settingStore';

    const { t } = useI18n();

    const settingStore = useSettingStore();
    // 注入 字体对象
    const fontSizeObj: any = inject('sizeObjInfo');

    //表单配置
    const y9FormConfig = ref({
        descriptionsFormConfig: {
            //描述表单配置
            column: 1, //1列模式
            labelAlign: 'center',
            labelWidth: '150px'
        },
        model: {
            //表单属性
            needRecursion: 0,
            targetSysName: ''
        },
        rules: {
            //表单验证规则
            targetSysName: { required: true, message: computed(() => t('请选择目标系统标识')), trigger: 'change' }
        },
        itemList: [
            //表单显示列表
            {
                type: 'select',
                prop: 'targetSysName',
                label: computed(() => t('目标系统标识')),
                props: {
                    options: [
                        {
                            label: t('ALL'),
                            value: 'ALL'
                        },
                        {
                            label: t('sync-all-persons'),
                            value: 'sync-all-persons'
                        },
                        {
                            label: t('sync-all-departments'),
                            value: 'sync-all-departments'
                        }
                    ]
                }
            },
            {
                type: 'radio',
                prop: 'needRecursion',
                label: computed(() => t('是否递归')),
                props: {
                    options: [
                        {
                            label: computed(() => t('是')),
                            value: 1
                        },
                        {
                            label: computed(() => t('否')),
                            value: 0
                        }
                    ]
                }
            }
        ]
    });

    //表单实例
    const y9FormRef = ref();

    defineExpose({
        y9FormRef
    });
</script>

<style></style>
