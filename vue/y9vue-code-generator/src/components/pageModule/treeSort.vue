<template>
    <div class="margin-bottom-20">
        <el-button
            :size="fontSizeObj.buttonSize"
            :style="{ fontSize: fontSizeObj.baseFontSize }"
            class="global-btn-second"
            @click="upPerson"
        >
            <i class="ri-arrow-up-line"></i>
            <span>{{ $t('上移') }}</span>
        </el-button>
        <el-button
            :size="fontSizeObj.buttonSize"
            :style="{ fontSize: fontSizeObj.baseFontSize }"
            class="global-btn-second"
            @click="downPerson"
        >
            <i class="ri-arrow-down-line"></i>
            <span>{{ $t('下移') }}</span>
        </el-button>
    </div>
    <y9Table v-model:selectedVal="selecedtVal" :config="tableConfig" @on-current-change="onCurrentChange"></y9Table>
</template>

<script lang="ts" setup>
    import { inject, nextTick, reactive, toRefs, watch } from 'vue';
    import { useI18n } from 'vue-i18n';

    const { t } = useI18n();
    // 注入 字体对象
    const fontSizeObj: any = inject('sizeObjInfo');

    const props = defineProps({
        currInfo: {
            //当前tree节点信息
            type: Object,
            default: () => {
                return {};
            }
        },
        apiRequest: {
            type: Function
        },
        apiParams: {
            type: [Number, Object, String]
        },
        columns: {
            type: Array
        },
        type: {
            type: String
        }
    });

    const data = reactive({
        //当前节点信息
        tableConfig: {
            //人员列表表格配置
            columns: [],
            tableData: [],
            pageConfig: false //取消分页
        },
        currentRow: '',
        selecedtVal: ''
    });

    let { tableConfig, currentRow, selecedtVal } = toRefs(data);

    let defaultColumn = [
        {
            type: 'radio',
            title: computed(() => t('请选择')),
            width: 200
        },
        {
            title: computed(() => t('名称')),
            key: 'name'
        }
    ];
    watch(
        () => props.columns,
        (newVal) => {
            if (!newVal) {
                tableConfig.value.columns = defaultColumn;
            } else {
                tableConfig.value.columns = newVal;
            }
        },
        {
            immediate: true
        }
    );

    watch(
        () => props.currInfo,
        (newVal) => {
            getTableList();
        },
        {
            immediate: true
        }
    );

    defineExpose({
        tableConfig
    });

    async function getTableList() {
        tableConfig.value.tableData = [];
        let result = props.apiParams ? await props.apiRequest(props.apiParams) : await props.apiRequest();
        if (result.success) {
            let data = result.data;
            switch (props.type) {
                case 'Person':
                    data = await data.filter((item) => item.orgType !== 'Position');
                    break;
                case 'Position':
                    data = await data.filter((item) => item.orgType !== 'Person' && item.orgType !== 'Group');
                    break;
                default:
                    break;
            }
            data.forEach((item) => {
                if (item.orgType == 'Organization') {
                    item.orgType = '组织机构';
                }
                if (item.orgType == 'Person') {
                    item.orgType = '人员';
                } else if (item.orgType == 'Department') {
                    item.orgType = '部门';
                } else if (item.orgType == 'Position') {
                    item.orgType = '岗位';
                } else if (item.orgType == 'Group') {
                    item.orgType = '用户组';
                }
                tableConfig.value.tableData.push(item);
            });
        }
    }

    function onCurrentChange(data) {
        currentRow.value = data;

        selecedtVal.value = data?.id;
    }

    async function upPerson() {
        if (currentRow.value == '' || currentRow.value == null) {
            ElNotification({
                title: t('失败'),
                message: t('请选择一行数据'),
                type: 'error',
                duration: 2000,
                offset: 80
            });
            return;
        }
        let tableData = tableConfig.value.tableData;
        tableData.forEach(function (element, index) {
            if (index == 0 && element.id == currentRow.value.id) {
                ElNotification({
                    title: t('失败'),
                    message: t('处于顶端，不能继续上移'),
                    type: 'error',
                    duration: 2000,
                    offset: 80
                });
                return;
            }
            if (element.id == currentRow.value.id) {
                let obj = tableData[index - 1];
                tableData[index - 1] = currentRow.value;
                tableData[index] = obj;
                tableConfig.value.tableData = tableData;
                return;
            }
        });
    }

    async function downPerson() {
        if (currentRow.value == '' || currentRow.value == null) {
            ElNotification({
                title: t('失败'),
                message: t('请选择一行数据'),
                type: 'error',
                duration: 2000,
                offset: 80
            });
            return;
        }
        let tableData = tableConfig.value.tableData;
        for (let i = 0; i < tableData.length; i++) {
            if (tableData.length - 1 == i && tableData[i].id == currentRow.value.id) {
                ElNotification({
                    title: t('失败'),
                    message: t('处于末端，不能继续下移'),
                    type: 'error',
                    duration: 2000,
                    offset: 80
                });
                return;
            }
            if (tableData[i].id == currentRow.value.id) {
                let obj = tableData[i + 1];
                tableData[i] = obj;
                tableData[i + 1] = currentRow.value;
                tableConfig.value.tableData = tableData;
                break;
            }
        }
    }
</script>

<style lang="scss" scoped></style>
