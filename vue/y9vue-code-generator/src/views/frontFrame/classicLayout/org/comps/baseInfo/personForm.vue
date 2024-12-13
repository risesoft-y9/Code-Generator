<template>
    <y9Form v-show="step === 1" ref="y9FormRef" :config="y9FormConfig"></y9Form>
    <div v-show="step === 2" class="step2-div">
        <div class="table-item">
            <div class="text">{{ $t('选择已有岗位') }}</div>
            <y9Table v-model:selectedVal="y9FormConfig.model.positionIds" :config="positionListTableConfig"></y9Table>
        </div>
        <div class="table-item">
            <div class="text">{{ $t('通过选择职位新增岗位') }}</div>
            <y9Table v-model:selectedVal="y9FormConfig.model.jobIds" :config="jobListTableConfig"></y9Table>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { inject } from 'vue';
    import { $keyNameAssign } from '@/utils/object';
    import { useI18n } from 'vue-i18n';
    import { useSettingStore } from '@/store/modules/settingStore';

    const { t } = useI18n();
    // 注入 字体对象
    const fontSizeObj: any = inject('sizeObjInfo');
    const settingStore = useSettingStore();
    const props = defineProps({
        isEditState: {
            //是否为编辑状态
            type: Boolean
        },

        isAdd: {
            //是否为添加状态
            type: Boolean,
            default: false
        },

        currInfo: {
            //当前信息
            type: Object,
            default: () => {
                return {};
            }
        },

        step: {
            //步骤
            type: Number,
            default: 1
        }
    });

    //表单配置
    const y9FormConfig = ref({
        descriptionsFormConfig: {
            //描述表单配置
            column: 2, //两列模式
            labelAlign: 'center',
            labelWidth: '150px',
            contentWidth: '200px'
        },
        model: {
            //表单属性
            name: '',
            loginName: '',
            sex: 0, //性别
            disabled: false, //禁用状态
            positionIds: [],
            jobIds: []
        },
        rules: {}, //表单验证规则
        itemList: [
            //表单显示列表
            {
                type: 'text',
                type1: 'input', //自定义字段-编辑时显示的类型
                type2: 'text', //自定义字段-非编辑状态显示文本类型
                prop: 'name',
                label: computed(() => t('人员名称')),
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
                prop: 'loginName',
                label: computed(() => t('登录名称')),
                props: {
                    render: () => {
                        //text类型渲染的内容
                        return h('span', props.currInfo?.loginName);
                    }
                }
            },
            {
                type: 'text',
                type1: 'text', //自定义字段-编辑时显示的类型
                type2: 'text', //自定义字段-非编辑状态显示文本类型
                prop: 'id',
                label: computed(() => t('唯一标识')),
                props: {
                    render: () => {
                        //text类型渲染的内容
                        return h('span', props.currInfo?.id);
                    }
                }
            },
            {
                type: 'text',
                type1: 'text', //自定义字段-编辑时显示的类型
                type2: 'text', //自定义字段-非编辑状态显示文本类型
                prop: 'customId',
                label: computed(() => t('自定义ID')),
                props: {
                    render: () => {
                        //text类型渲染的内容
                        return h('span', props.currInfo?.customId);
                    }
                }
            },
            {
                type: 'text',
                type1: 'radio', //自定义字段-编辑时显示的类型
                type2: 'text', //自定义字段-非编辑状态显示文本类型
                prop: 'sex',
                label: computed(() => t('性别')),
                props: {
                    options: [
                        {
                            label: computed(() => t('男')),
                            value: 1
                        },
                        {
                            label: computed(() => t('女')),
                            value: 0
                        }
                    ],
                    render: () => {
                        //text类型渲染的内容
                        console.log('props.currInfo?.sex', props.currInfo?.sex);
                        return h('span', props.currInfo?.sex === 1 ? t('男') : t('女'));
                    }
                }
            },
            {
                type: 'text',
                type1: 'radio', //自定义字段-编辑时显示的类型
                type2: 'text', //自定义字段-非编辑状态显示文本类型
                prop: 'disabled',
                label: computed(() => t('是否禁用')),
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
                        return h('span', props.currInfo?.disabled ? t('是') : t('否'));
                    }
                }
            }
        ]
    });

    //如果是添加模式
    if (props.isAdd) {
        //过滤掉某些字段不显示
        y9FormConfig.value.itemList = y9FormConfig.value.itemList.filter(
            (item) => item.prop !== 'id' && item.prop !== 'customId'
        );
    }

    //改变y9Form显示类型
    const changeY9FormType = (isEdit) => {
        if (isEdit) {
            //编辑状态设置表单校验规则
            y9FormConfig.value.rules = {
                name: [{ required: true, message: computed(() => t('请输入人员名称')), trigger: 'blur' }]
            };
        } else {
            y9FormConfig.value.rules = {};
        }

        //编辑模式显示type1类型 非编辑模式显示type2类型
        y9FormConfig.value.itemList.forEach((item) => {
            item.type = isEdit ? item.type1 : item.type2;
        });
    };

    watch(
        () => props.isEditState,
        (isEdit) => {
            if (isEdit && !props.isAdd) {
                //编辑状态给表单赋值
                $keyNameAssign(y9FormConfig.value.model, props.currInfo); //编辑状态给表单赋值
            }
            changeY9FormType(isEdit);
        },
        {
            immediate: true
        }
    );

    //职位列表的表格配置
    let jobListTableConfig = ref({
        columns: [
            {
                type: 'selection',
                width: 100,
                selectable: () => {
                    return true;
                }
            },
            {
                title: computed(() => t('职位')),
                key: 'name',
                width: 200
            }
        ],
        tableData: [],
        pageConfig: false //取消分页
    });

    //岗位列表的表格配置
    let positionListTableConfig = ref({
        columns: [
            {
                type: 'selection',
                width: 100,
                selectable: (row, index) => {
                    if (row.headCount < row.capacity) {
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            {
                title: computed(() => t('岗位')),
                key: 'name',
                width: 200
            },
            {
                title: computed(() => t('占用岗位')),
                key: 'headCount',
                width: 100
            },
            {
                title: computed(() => t('岗位容量')),
                key: 'capacity',
                width: 100
            }
        ],
        tableData: [],
        pageConfig: false //取消分页
    });

    onMounted(() => {
        jobListTableConfig.value.tableData = [
            {
                id: 1,
                name: '职位1'
            },
            {
                id: 2,
                name: '职位2'
            }
        ];

        positionListTableConfig.value.tableData = [
            {
                id: 1,
                name: '测试岗位',
                headCount: 2,
                capacity: 10
            },
            {
                id: 2,
                name: '开发岗位',
                headCount: 5,
                capacity: 10
            }
        ];
    });

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

    .step2-div {
        display: flex;
        justify-content: space-around;
        padding: 20px 50px;

        .table-item {
            // background-color: #eef0f7;
            border: solid 1px #eee;
            border-radius: 4px;
            margin: 0 20px;
            padding: 20px 40px;
            box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.06);

            .text {
                color: #666;
                margin-bottom: 10px;
            }
        }
    }
</style>
