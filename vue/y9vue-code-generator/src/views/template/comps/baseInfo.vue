<!--
 * @Author: lizhiwen
 * @Date: 2022-05-17 17:43:02
 * @LastEditors: yihong yihong@risesoft.net
 * @LastEditTime: 2024-06-24 15:14:43
 * @Description:
-->
<template>
    <y9Form ref="y9FormRef" :config="y9FormConfig"></y9Form>
</template>

<script lang="ts" setup>
    import { computed, h, onMounted, ref, watch } from 'vue';
    import { useI18n } from 'vue-i18n';
    import { getSystemInfo } from '@/api/system';
    import { useSettingStore } from '@/store/modules/settingStore';
    import { nameValidator, tablePrefixValidator } from '@/utils/validate';

    const settingStore = useSettingStore();
    const { t } = useI18n();

    // 传过来的 系统 id
    const props = defineProps({
        id: String, // 系统id
        editFlag: Boolean, // 编辑 与 查看 的对应显示变量
        saveClickFlag: Boolean // 是否点击保存 的变量
    });
    const emits = defineEmits(['getInfoData']);

    // 基本信息
    let systemInfo = ref({
        name: '',
        cnName: '',
        war: '',
        tablePrefix: '',
        updateTime: '',
        description: '',
        environment: ''
    });

    // 请求详情 函数
    async function getInfo() {
        if (props.id != null) {
            const responseInfo = await getSystemInfo(props.id);
            systemInfo.value = responseInfo.data;
        }
    }

    onMounted(() => {
        getInfo();
    });

    // 监听系统id 当发生改变时重新请求数据 并赋值
    watch(
        () => props.id,
        (new_, old_) => {
            if (new_ && new_ !== old_) {
                getInfo();
            }
        }
    );

    watch(
        () => props.editFlag,
        (new_, old_) => {
            y9FormConfig.value.model = systemInfo.value;
            changeY9FormType(!new_);
        }
    );

    let y9FormRef = ref();

    //表单配置
    let y9FormConfig = ref({
        descriptionsFormConfig: {
            //描述表单配置
            column: settingStore.device === 'mobile' ? 1 : 2,
            labelAlign: 'center',
            labelWidth: '150px',
            contentWidth: '200px'
        },
        model: {},
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
                        return h('span', systemInfo.value?.name);
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
                        return h('span', systemInfo.value?.cnName);
                    }
                }
            },
            {
                type: 'text',
                type1: 'radio', //自定义字段-编辑时显示的类型
                type2: 'text', //自定义字段-非编辑状态显示文本类型
                prop: 'war',
                label: computed(() => t('包种类')),
                props: {
                    options: [
                        { label: computed(() => t('war')), value: true },
                        { label: computed(() => t('jar')), value: false }
                    ],
                    render: () => {
                        //text类型渲染的内容
                        return h('span', systemInfo.value?.war ? t('war') : t('jar'));
                    }
                }
            },
            {
                type: 'text',
                type1: 'input', //自定义字段-编辑时显示的类型
                type2: 'text', //自定义字段-非编辑状态显示文本类型
                prop: 'tablePrefix',
                label: computed(() => t('表前缀')),
                props: {
                    render: () => {
                        //text类型渲染的内容
                        return h('span', systemInfo.value?.tablePrefix);
                    }
                }
            },
            {
                type: 'text',
                type1: 'select', //自定义字段-编辑时显示的类型
                type2: 'text', //自定义字段-非编辑状态显示文本类型
                prop: 'environment',
                label: computed(() => t('系统环境')),
                props: {
                    options: [],
                    render: () => {
                        //text类型渲染的内容
                        return h('span',  t('本地化'));
                    }
                }
            },
            {
                type: 'text',
                type1: 'text', //自定义字段-编辑时显示的类型
                type2: 'text', //自定义字段-非编辑状态显示文本类型
                prop: 'updateTime',
                label: computed(() => t('更新时间')),
                props: {
                    render: () => {
                        //text类型渲染的内容
                        return h('span', systemInfo.value?.updateTime);
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
                        return h('span', systemInfo.value?.description);
                    },
                    resize: 'none',
                    autosize: {
                        minRows: 3
                    }
                }
            }
        ]
    });

    //改变y9Form显示类型
    function changeY9FormType(isEdit) {
        if (isEdit) {
            //编辑状态设置表单校验规则
            y9FormConfig.value.rules = {
                name: [{ required: true, validator: nameValidator, trigger: 'blur' }],
                cnName: [{ required: true, message: '请输入中文名', trigger: 'blur' }],
                tablePrefix: [{ required: true, validator: tablePrefixValidator, trigger: 'blur' }]
            };
        } else {
            y9FormConfig.value.rules = {};
        }
        //编辑模式显示type1类型 非编辑模式显示type2类型
        y9FormConfig.value.itemList.forEach((item) => {
            item.type = isEdit ? item.type1 : item.type2;

            //根据environment值改变选项
            if (isEdit && item.prop == 'environment') {
                item.props.options = [];
                item.props.options.push({ label: '本地化', value: 1 });
            }
        });
    }

    // 监听 saveClicFlag 当为true 时 将对象传给 index
    watch(
        async () => props.saveClickFlag,
        async (new_, old_) => {
            if (new_) {
                let valid = await y9FormRef?.value.elFormRef?.validate((valid) => valid); //获取表单验证结果;
                if (props.saveClickFlag) {
                    systemInfo.value = y9FormRef.value?.model;
                    emits('getInfoData', systemInfo.value);
                    return;
                }
            }
        }
    );
</script>
<style scoped lang="scss"></style>
