<template>
    <y9Form ref="y9FormRef" :config="y9FormConfig"></y9Form>
</template>

<script lang="ts" setup>
    import { inject } from 'vue';
    import { useSettingStore } from '@/store/modules/settingStore';
    import { useI18n } from 'vue-i18n';

    const settingStore = useSettingStore();

    const { t } = useI18n();

    // 注入 字体对象
    const fontSizeObj: any = inject('sizeObjInfo');
    const props = defineProps({
        isAdd: {
            //是否为添加模式，添加模式有些字段不需要显示
            type: Boolean,
            default: false
        },
        isEditState: {
            //是否为编辑状态
            type: Boolean
        },
        currInfo: {
            //当前信息
            type: Object,
            default: () => {
                return {};
            }
        }
    });

    //表单配置
    const y9FormConfig = ref({
        descriptionsFormConfig: {
            //描述表单配置
            column: 2,
            labelAlign: 'center',
            labelWidth: '200px'
        },
        model: {
            //表单属性
            enabled: true
        },
        rules: {}, //表单验证规则
        itemList: [
            //表单显示列表
            {
                type: 'text',
                type1: 'input', //自定义字段-编辑时显示的类型
                type2: 'text', //自定义字段-非编辑状态显示文本类型
                prop: 'name',
                label: computed(() => t('系统名称')),
                props: {
                    render: () => {
                        //text类型渲染的内容
                        return h('span', props.currInfo?.name);
                    }
                }
            },
            {
                type: 'text',
                type1: 'input', //自定义字段-编辑时显示的类型
                type2: 'text', //自定义字段-非编辑状态显示文本类型
                prop: 'cnName',
                label: computed(() => t('系统中文名称')),
                props: {
                    render: () => {
                        //text类型渲染的内容
                        return h('span', props.currInfo?.cnName);
                    }
                }
            },
            {
                type: 'text',
                type1: 'radio', //自定义字段-编辑时显示的类型
                type2: 'text', //自定义字段-非编辑状态显示文本类型
                prop: 'enabled',
                label: computed(() => t('是否启用')),
                props: {
                    options: [
                        {
                            label: computed(() => t('是')),
                            value: true
                        },
                        {
                            label: computed(() => t('否')),
                            value: false
                        }
                    ],
                    render: () => {
                        //text类型渲染的内容
                        return h('span', props.currInfo?.enabled ? t('是') : t('否'));
                    }
                }
            },
            {
                type: 'text',
                type1: 'text', //自定义字段-编辑时显示的类型
                type2: 'text', //自定义字段-非编辑状态显示文本类型
                prop: 'singleDatasource',
                label: computed(() => t('独立数据源')),
                props: {
                    render: () => {
                        //text类型渲染的内容
                        return h('span', props.currInfo?.singleDatasource ? t('是') : t('否'));
                    }
                }
            },
            {
                type: 'text',
                type1: 'input', //自定义字段-编辑时显示的类型
                type2: 'text', //自定义字段-非编辑状态显示文本类型
                prop: 'contextPath',
                label: computed(() => t('应用上下文')),
                props: {
                    render: () => {
                        //text类型渲染的内容
                        return h('span', props.currInfo?.contextPath);
                    }
                }
            },
            {
                type: 'text',
                type1: 'input', //自定义字段-编辑时显示的类型
                type2: 'text', //自定义字段-非编辑状态显示文本类型
                prop: 'tabIndex',
                label: computed(() => t('排列序号')),
                props: {
                    type: 'number',
                    render: () => {
                        //text类型渲染的内容
                        return h('span', props.currInfo?.tabIndex);
                    }
                }
            },
            {
                type: 'text',
                type1: 'textarea', //自定义字段-编辑时显示的类型
                type2: 'text', //自定义字段-非编辑状态显示文本类型
                prop: 'description',
                label: computed(() => t('系统概述')),
                props: {
                    render: () => {
                        //text类型渲染的内容
                        return h('span', props.currInfo?.description);
                    }
                }
            }
        ]
    });

    //如果是添加模式
    if (props.isAdd) {
        //设置表单为1列模式,标签为200px
        y9FormConfig.value.descriptionsFormConfig.column = 1;
        y9FormConfig.value.descriptionsFormConfig.labelWidth = '200px';

        //过滤掉某些字段不显示
        y9FormConfig.value.itemList = y9FormConfig.value.itemList.filter((item) => item.prop !== 'singleDatasource');
    }

    //改变y9Form显示类型
    function changeY9FormType(isEdit) {
        if (isEdit) {
            //编辑状态设置表单校验规则
            y9FormConfig.value.rules = {
                name: [{ required: true, message: computed(() => t('请输入系统名称')), trigger: 'blur' }],
                cnName: [{ required: true, message: computed(() => t('请输入系统中文名称')), trigger: 'blur' }]
            };
        } else {
            y9FormConfig.value.rules = {};
        }

        //编辑模式显示type1类型 非编辑模式显示type2类型
        y9FormConfig.value.itemList.forEach((item) => {
            item.type = isEdit ? item.type1 : item.type2;
        });
    }

    //监听是否为编辑状态
    watch(
        () => props.isEditState,
        (isEdit) => {
            if (isEdit) {
                //编辑状态

                Object.assign(y9FormConfig.value.model, props.currInfo); //编辑状态给表单赋值
            }
            changeY9FormType(isEdit);
        },
        {
            immediate: true
        }
    );

    //表单实例
    const y9FormRef = ref();

    defineExpose({
        y9FormRef
    });
</script>

<style lang="scss" scoped>
    :deep(.el-descriptions__label) {
        text-align: center !important;
    }
</style>
