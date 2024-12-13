<template>
    <y9Card :title="$t('应用管理') + `${currInfo.cnName ? ' - ' + currInfo.cnName : ''}`">
        <y9Table
            :config="appListTableConfig"
            :filterConfig="filterConfig"
            @on-curr-page-change="onCurrPageChange"
            @on-page-size-change="onPageSizeChange"
        >
            <template #btns>
                <div style="display: flex; justify-content: flex-end; width: 100%">
                    <el-button
                        :size="fontSizeObj.buttonSize"
                        :style="{ fontSize: fontSizeObj.baseFontSize }"
                        class="global-btn-second"
                    >
                        <i class="ri-arrow-up-down-line"></i>
                        <span> {{ $t('排序') }}</span>
                    </el-button>
                    <el-button
                        :size="fontSizeObj.buttonSize"
                        :style="{ fontSize: fontSizeObj.baseFontSize }"
                        class="global-btn-second"
                    >
                        <i class="ri-add-line"></i>
                        {{ $t('新增') }}
                    </el-button>
                    <el-button
                        :size="fontSizeObj.buttonSize"
                        :style="{ fontSize: fontSizeObj.baseFontSize }"
                        class="global-btn-second"
                    >
                        <i class="ri-close-line" />
                        {{ $t('删除') }}
                    </el-button>
                    <el-button
                        :size="fontSizeObj.buttonSize"
                        :style="{ fontSize: fontSizeObj.baseFontSize }"
                        class="global-btn-second"
                    >
                        <i class="ri-user-follow-line"></i>
                        {{ $t('启用') }}
                    </el-button>
                    <el-button
                        :size="fontSizeObj.buttonSize"
                        :style="{ fontSize: fontSizeObj.baseFontSize }"
                        class="global-btn-second"
                    >
                        <i class="ri-user-unfollow-line"></i>
                        {{ $t('禁用') }}
                    </el-button>
                </div>
            </template>
        </y9Table>
    </y9Card>
</template>

<script lang="ts" setup>
    import { applicationList } from '@/api/frontFrame/system/index';
    import { inject } from 'vue';
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
        }
    });

    const appListTableConfig = ref({
        loading: false,
        tableData: [],
        pageConfig: {
            background: false, //是否显示背景色
            layout: 'prev, pager, next,sizes', //布局
            currentPage: 1, //当前页数，支持 v-model 双向绑定
            pageSize: 5, //每页显示条目个数，支持 v-model 双向绑定
            total: 0, //总条目数
            pageSizeOpts: [5, 10, 20, 30, 40, 1000] //每页显示个数选择器的选项设置
        },
        columns: [
            { title: '', type: 'selection', fixed: 'left', width: 70 },
            { title: computed(() => t('应用名称')), key: 'name', minWidth: 120 },
            { title: computed(() => t('链接地址')), key: 'url', minWidth: 200 },
            {
                title: computed(() => t('显示数字')),
                render: (row) => {
                    return row.showNumber ? t('是') : t('否');
                }
            },
            { title: computed(() => t('获取数字地址')), key: 'numberUrl', minWidth: 120 },
            {
                title: computed(() => t('所属类别')),
                render: (row) => {
                    switch (row.type) {
                        case 1:
                            return t('业务协同');
                        case 2:
                            return t('事项办理');
                        default:
                            return t('数据服务');
                    }
                }
            },
            {
                title: computed(() => t('是否可用')),
                render: (row) => {
                    return row.enabled ? t('是') : t('否');
                }
            },
            {
                title: computed(() => t('审核状态')),
                key: 'checked',
                render: (row) => {
                    return row.checked ? t('已审核') : t('未审核');
                }
            },
            { title: computed(() => t('创建日期')), key: 'createTime', width: 165 },
            { title: computed(() => t('更新日期')), key: 'updateTime', width: 165 },
            {
                title: computed(() => t('操作')),
                fixed: 'right',
                width: 100,
                showOverflowTooltip: false,
                render: (row) => {
                    return h('div', [
                        h(
                            'span',
                            {
                                onClick: async () => {
                                    //编辑被点击后，在这写入逻辑代码。。。
                                }
                            },
                            t('编辑')
                        )
                    ]);
                }
            }
        ]
    });

    const filterConfig = ref({
        showBorder: true,
        itemList: [
            {
                label: computed(() => t('应用名称')),
                type: 'input',
                key: 'name',
                span: 6
            },
            {
                type: 'actions',
                span: 6,
                props: {
                    hiddenReset: true,
                    queryText: computed(() => t('搜索')),
                    queryCallback: (filters) => {
                        console.log('过滤条件', filters);
                    }
                }
            },
            {
                type: 'slot',
                span: 12,
                slotName: 'btns'
            }
        ],
        filtersValueCallBack: (filters) => {
            console.log('过滤值', filters);
        }
    });

    watch(
        () => props.currInfo.id,
        async (newId) => {
            getApplicationList(newId);
        },
        {
            immediate: true
        }
    );

    async function getApplicationList(systemId) {
        appListTableConfig.value.loading = true;
        let sendData = {
            page: appListTableConfig.value.pageConfig.currentPage,
            size: appListTableConfig.value.pageConfig.pageSize,
            systemId: systemId
        };
        const res = await applicationList(sendData);
        console.log('res', res);
        if (res.code == 0 && res.success) {
            appListTableConfig.value.tableData = res.rows;
            appListTableConfig.value.pageConfig.total = res.total;
            appListTableConfig.value.pageConfig.currentPage = res.currPage;
        }
        appListTableConfig.value.loading = false;
    }

    //当前页改变时触发
    function onCurrPageChange(currPage) {
        appListTableConfig.value.pageConfig.currentPage = currPage;
        getApplicationList(props.currInfo.id);
    }

    //每页条数改变时触发
    function onPageSizeChange(pageSize) {
        appListTableConfig.value.pageConfig.pageSize = pageSize;
        getApplicationList(props.currInfo.id);
    }
</script>

<style lang="scss" scoped></style>
