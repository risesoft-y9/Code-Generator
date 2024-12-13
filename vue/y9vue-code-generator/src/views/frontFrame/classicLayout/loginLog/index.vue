<template>
    <div class="userLog">
        <div class="content">
            <y9Card :showHeader="false">
                <y9Table
                    ref="loginLogsTableRef"
                    :config="loginLogsTable"
                    :filterConfig="filterLogsConfig"
                    border
                    @on-curr-page-change="handlerPageChange"
                    @on-page-size-change="handlerSizeChange"
                    @window-height-change="windowHeightChange"
                >
                    <template v-slot:slotSearch>
                        <el-divider content-position="center">
                            <el-button
                                :size="fontSizeObj.buttonSize"
                                :style="{ fontSize: fontSizeObj.baseFontSize }"
                                class="global-btn-main"
                                type="primary"
                                @click="search"
                                >{{ $t('查询') }}
                            </el-button>
                            <el-button
                                :size="fontSizeObj.buttonSize"
                                :style="{ fontSize: fontSizeObj.baseFontSize }"
                                class="global-btn-second"
                                @click="reset"
                                >{{ $t('重置') }}
                            </el-button>
                        </el-divider>
                    </template>
                </y9Table>
            </y9Card>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { loginLogList } from '@/api/frontFrame/loginLog/index';
    import { useI18n } from 'vue-i18n';
    import { useSettingStore } from '@/store/modules/settingStore';
    import { $formatTime } from '@/utils/object';
    import { inject, ref } from 'vue';

    const { t } = useI18n();

    const settingStore = useSettingStore();
    // 注入 字体对象
    const fontSizeObj: any = inject('sizeObjInfo');

    const loginLogsTableRef = ref(); //表格实例

    // 表格 配置
    let loginLogsTable = ref({
        columns: [
            { title: computed(() => t('序号')), showOverflowTooltip: false, type: 'index', width: 80 },
            { title: computed(() => t('用户名称')), key: 'userName', width: 130 },
            { title: computed(() => t('登录名称')), key: 'userLoginName', width: 150 },
            { title: computed(() => t('客户端IP')), key: 'userHostIp', width: 150 },
            { title: computed(() => t('服务器IP')), key: 'serverIp', width: 150 },
            { title: computed(() => t('操作系统')), key: 'osName', width: 130 },
            { title: computed(() => t('分辨率')), key: 'screenResolution', width: 120 },
            {
                title: computed(() => t('操作状态')),
                key: 'success',
                width: 90,
                render: (row) => {
                    return h('div', row.success == 'true' ? t('成功') : t('失败'));
                }
            },
            { title: computed(() => t('浏览器名称')), key: 'browserName', width: 120 },
            { title: computed(() => t('浏览器版本')), key: 'browserVersion', width: 150 },
            {
                title: computed(() => t('登录时间')),
                key: 'loginTime',
                width: 200,
                formatter: (row) => {
                    return $formatTime(row.loginTime).longDateTimeSec;
                }
            },
            { title: computed(() => t('错误信息')), key: 'throwable' }
        ],
        tableData: [],
        pageConfig: {
            currentPage: 1, //当前页数，支持 v-model 双向绑定
            pageSize: 20, //每页显示条目个数，支持 v-model 双向绑定
            total: 0 //总条目数
        },
        loading: false
    });

    const filterObj = ref({}); //过滤数据

    const filterLogsConfig = ref({
        filtersValueCallBack: (filter) => {
            const newFilter = Object.assign({}, filter);
            //格式化登录时间，拿到想要的数据。
            if (filter.loginTime && filter.loginTime.length > 0) {
                newFilter.startTime = filter.loginTime[0];
                newFilter.endTime = filter.loginTime[1];
                delete newFilter.loginTime;
            }
            filterObj.value = newFilter;
        },
        itemList: [
            {
                type: 'input',
                value: '',
                key: 'userName',
                label: computed(() => t('用户名称')),
                labelWidth: '82px',
                span: settingStore.device === 'mobile' ? 24 : 6
            },
            {
                type: 'input',
                value: '',
                key: 'userHostIp',
                labelWidth: '82px',
                label: computed(() => t('客户端IP')),
                span: settingStore.device === 'mobile' ? 24 : 6
            },
            {
                type: 'input',
                value: '',
                key: 'oSName',
                label: computed(() => t('操作系统')),
                labelWidth: '82px',
                span: settingStore.device === 'mobile' ? 24 : 6
            },
            {
                type: 'input',
                value: '',
                key: 'screenResolution',
                label: computed(() => t('分辨率')),
                labelWidth: '82px',
                span: settingStore.device === 'mobile' ? 24 : 6
            },
            {
                type: 'select',
                value: '',
                key: 'success',
                label: computed(() => t('操作状态')),
                labelWidth: '82px',
                props: {
                    options: [
                        //选项列表
                        {
                            label: computed(() => t('全部')),
                            value: ''
                        },
                        {
                            label: computed(() => t('成功')),
                            value: 'true'
                        },
                        {
                            label: computed(() => t('出错')),
                            value: 'false'
                        }
                    ]
                },
                span: settingStore.device === 'mobile' ? 24 : 6
            },
            {
                type: 'input',
                value: '',
                key: 'browserName',
                label: computed(() => t('浏览器名称')),
                labelWidth: '90px',
                span: settingStore.device === 'mobile' ? 24 : 6
            },
            {
                type: 'input',
                value: '',
                key: 'browserVersion',
                label: computed(() => t('浏览器版本')),
                labelWidth: '90px',
                span: settingStore.device === 'mobile' ? 24 : 6
            },
            {
                type: 'date',
                span: settingStore.device === 'mobile' ? 24 : 6,
                label: computed(() => t('登录时间')),
                labelWidth: '90px',
                key: 'loginTime',
                value: [],
                props: {
                    dateType: 'datetimerange',
                    formatValueType: 'timestampThirteen'
                }
            },
            {
                type: 'slot',
                slotName: 'slotSearch',
                span: 24
            }
        ],
        showBorder: true
    });

    onMounted(async () => {
        await getLoginLogList();
    });

    function windowHeightChange(tableHeight) {
        loginLogsTable.value.maxHeight = tableHeight - 70;
    }

    async function getLoginLogList() {
        loginLogsTable.value.loading = true;
        const res = await loginLogList();
        if (res.code == 0 && res.success) {
            loginLogsTable.value.tableData = res.rows;
            loginLogsTable.value.pageConfig.total = res.total;
        }
        loginLogsTable.value.loading = false;
    }

    //当前页改变时触发
    function handlerPageChange(currPage) {
        loginLogsTable.value.pageConfig.currentPage = currPage;
        getLoginLogList();
    }

    //每页条数改变时触发
    function handlerSizeChange(pageSize) {
        loginLogsTable.value.pageConfig.pageSize = pageSize;
        getLoginLogList();
    }

    //过滤查询
    const search = () => {
        //在这里做查询处理。。。
        console.log('过滤数据：filterObj.value ', filterObj.value);
    };

    //重置
    const reset = () => {
        loginLogsTableRef.value.elTableFilterRef.onReset(); //过滤重置
    };
</script>

<style lang="scss" scoped>
    .userLog .content {
        width: auto;
        margin: 0 auto;

        .pagination-style {
            display: flex;
            justify-content: v-bind("settingStore.device === 'mobile'?'flex-start':'flex-end'");
            margin-top: 20px;
            overflow: auto;
            scrollbar-width: none;
        }

        :deep(.y9-card-content) {
            padding: 35px 20px;

            .el-divider--horizontal {
                margin: 10px 0 30px 0;
            }
        }
    }

    :deep(.el-divider__text) {
        display: flex;
    }

    :deep(.el-form-item__label) {
        width: 90px;
        display: flex;
        justify-content: flex-start;
    }

    :deep(.el-date-range-picker__time-header) {
        display: none;
    }

    :deep(.el-form-item__content) {
        align-items: stretch;
    }
</style>
