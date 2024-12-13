<template>
    <y9Table
        ref="jobTableRef"
        :config="jobTableConfig"
        :filterConfig="filterConfig"
        @on-current-change="onCurrentChange"
    >
        <template #addDictionaryData>
            <el-button
                :disabled="jobTableConfig.loading"
                :size="fontSizeObj.buttonSize"
                :style="{ fontSize: fontSizeObj.baseFontSize }"
                class="global-btn-main"
                type="primary"
                @click="onAddDictionaryData"
            >
                <i class="ri-add-line"></i>
                <span>{{ $t('职位') }}</span>
            </el-button>
            <div v-show="currEditId === -1" style="margin-left: 15px">
                <el-button
                    :disabled="jobTableConfig.loading"
                    :size="fontSizeObj.buttonSize"
                    :style="{ fontSize: fontSizeObj.baseFontSize }"
                    class="global-btn-third"
                    type="primary"
                    @click="upJob"
                >
                    <i class="ri-arrow-up-line"></i>
                    <span>{{ $t('上移') }}</span>
                </el-button>
                <el-button
                    :disabled="jobTableConfig.loading"
                    :size="fontSizeObj.buttonSize"
                    :style="{ fontSize: fontSizeObj.baseFontSize }"
                    class="global-btn-third"
                    type="primary"
                    @click="downJob"
                >
                    <i class="ri-arrow-down-line"></i>
                    <span>{{ $t('下移') }}</span>
                </el-button>
                <el-button
                    :disabled="jobTableConfig.loading"
                    :size="fontSizeObj.buttonSize"
                    :style="{ fontSize: fontSizeObj.baseFontSize }"
                    class="global-btn-third"
                    type="primary"
                    @click="saveJobOrder"
                >
                    <i class="ri-save-line"></i>
                    <span>{{ $t('保存') }}</span>
                </el-button>
            </div>
        </template>
        <template #name="{ row, column, index }">
            <el-input v-if="currEditId === index" v-model="editForm.name" :size="fontSizeObj.buttonSize"></el-input>
            <div v-else>{{ row.name }}</div>
        </template>
        <template #code="{ row, column, index }">
            <el-input v-if="currEditId === index" v-model="editForm.code" :size="fontSizeObj.buttonSize"></el-input>
            <div v-else>{{ row.code }}</div>
        </template>
    </y9Table>
</template>

<script lang="ts" setup>
    import { jobList, removeJob, saveOrder, saveUpdate, search } from '@/api/frontFrame/job/index';
    import { useI18n } from 'vue-i18n';
    import { inject, ref } from 'vue';

    const { t } = useI18n();
    // 注入 字体对象
    const fontSizeObj: any = inject('sizeObjInfo');

    //正在编辑的行id
    const currEditId = ref(-1); //-1代表没有正在编辑的行，大于-1代表有正在编辑的行

    const editForm = ref({
        id: '', //id不存在代表是新增的行，存在代表是编辑已经存在的行
        name: '',
        code: ''
    });

    const jobTableRef = ref();

    //新增职位数据
    function onAddDictionaryData() {
        if (currEditId.value == 0) {
            ElMessage({
                type: 'error',
                message: t('请保存编辑数据后再操作'),
                offset: 65
            });
            return;
        }

        editForm.value = {
            //初始化表单
            id: '',
            name: '',
            code: ''
        };
        //表格上方插入空行
        jobTableConfig.value.tableData.unshift(editForm.value);

        currEditId.value = 0; //第一行为编辑状态
    }

    //表格列表配置
    const jobTableConfig = ref({
        loading: false,
        border: false,
        headerBackground: true,
        columns: [
            {
                type: 'radio',
                title: computed(() => t('请选择')),
                width: 200
            },
            {
                title: computed(() => t('职位名称')),
                key: 'name',
                slot: 'name',
                showOverflowTooltip: false
            },
            {
                title: computed(() => t('数据代码')),
                key: 'code',
                slot: 'code',
                showOverflowTooltip: false
            },
            {
                title: computed(() => t('操作')),
                width: 200,
                fixed: 'right',
                render: (row, params) => {
                    const btnsGroup1 = [
                        h(
                            'div',
                            {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center'
                                },
                                onClick: () => {
                                    //编辑按钮被点击后
                                    if (currEditId.value > -1) {
                                        ElMessage({
                                            type: 'error',
                                            message: t('请保存编辑数据后再操作'),
                                            offset: 65
                                        });
                                        return;
                                    }
                                    currEditId.value = params.$index;
                                    editForm.value.id = row.id;
                                    editForm.value.name = row.name;
                                    editForm.value.code = row.code;
                                }
                            },
                            [
                                h('i', {
                                    class: 'ri-pencil-line',
                                    style: {
                                        marginRight: '2px',
                                        fontSize: fontSizeObj.baseFontSize
                                    }
                                }),
                                h('span', t('编辑'))
                            ]
                        ),
                        h(
                            'div',
                            {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginLeft: '10px'
                                },
                                onClick: () => {
                                    //删除按钮被点击后

                                    if (currEditId.value > -1) {
                                        ElMessage({
                                            type: 'error',
                                            message: t('请保存编辑数据后再操作'),
                                            offset: 65
                                        });
                                        return;
                                    }

                                    ElMessageBox.confirm(`${t('是否删除')}【${row.name}】 职位?`, t('提示'), {
                                        confirmButtonText: t('确定'),
                                        cancelButtonText: t('取消'),
                                        type: 'info'
                                    })
                                        .then(async () => {
                                            jobTableConfig.value.loading = true;
                                            const res = await removeJob(row.id);

                                            if (res.code == 0 && res.success) {
                                                await getJobList();
                                            }

                                            ElNotification({
                                                title: res.success ? t('删除成功') : t('删除失败'),
                                                message: res.msg,
                                                type: res.success ? 'success' : 'error',
                                                duration: 2000,
                                                offset: 80
                                            });
                                            jobTableConfig.value.loading = false;
                                        })
                                        .catch(() => {
                                            ElMessage({
                                                type: 'info',
                                                message: t('已取消删除'),
                                                offset: 65
                                            });
                                        });
                                }
                            },
                            [
                                h('i', {
                                    class: 'ri-delete-bin-line',
                                    style: {
                                        marginRight: '2px',
                                        fontSize: fontSizeObj.baseFontSize
                                    }
                                }),
                                h('span', t('删除'))
                            ]
                        )
                    ];

                    const btnsGroup2 = [
                        h(
                            'div',
                            {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center'
                                },
                                onClick: async () => {
                                    //保存按钮被点击后
                                    if (!editForm.value.name) {
                                        ElMessage({
                                            type: 'error',
                                            message: t('请输入职位名称'),
                                            offset: 65
                                        });
                                    } else if (!editForm.value.code) {
                                        ElMessage({
                                            type: 'error',
                                            message: t('请输入数据代码'),
                                            offset: 65
                                        });
                                    } else {
                                        jobTableConfig.value.loading = true;
                                        const res = await saveUpdate(JSON.parse(JSON.stringify(editForm.value)));
                                        if (res.code == 0 && res.success) {
                                            if (!editForm.value.id) {
                                                //如果是新增就手动删除
                                                jobTableConfig.value.tableData.splice(params.$index, 1);
                                            }
                                            currEditId.value = -1;
                                            editForm.value = {};
                                            await getJobList();
                                        }

                                        ElNotification({
                                            title: res.success ? t('保存成功') : t('保存失败'),
                                            message: res.msg,
                                            type: res.success ? 'success' : 'error',
                                            duration: 2000,
                                            offset: 80
                                        });
                                        jobTableConfig.value.loading = false;
                                    }
                                }
                            },
                            [
                                h('i', {
                                    class: 'ri-pencil-line',
                                    style: {
                                        marginRight: '2px',
                                        fontSize: fontSizeObj.baseFontSize
                                    }
                                }),
                                h('span', t('保存'))
                            ]
                        ),
                        h(
                            'div',
                            {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginLeft: '10px'
                                },
                                onClick: () => {
                                    //删除按钮被点击后

                                    if (!editForm.value.id) {
                                        //id不存在，代表是新增数据，手动删除
                                        jobTableConfig.value.tableData.splice(params.$index, 1);
                                    }
                                    currEditId.value = -1;
                                    editForm.value = {};
                                }
                            },
                            [
                                h('i', {
                                    class: 'ri-delete-bin-line',
                                    style: {
                                        marginRight: '2px',
                                        fontSize: fontSizeObj.baseFontSize
                                    }
                                }),
                                h('span', t('取消'))
                            ]
                        )
                    ];
                    return h(
                        'div',
                        {
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }
                        },
                        currEditId.value === params.$index ? btnsGroup2 : btnsGroup1
                    );
                }
            }
        ],
        tableData: [],
        pageConfig: false
    });

    const filterConfig = ref({
        showBorder: true,
        filtersValueCallBack: async (filter) => {
            //过滤回调
            //搜索逻辑处理
            if (filter.name) {
                jobTableConfig.value.loading = true;
                const res = await search(filter.name);
                jobTableConfig.value.tableData = res.data;
                jobTableConfig.value.loading = false;
            } else {
                await getJobList();
            }
        },
        itemList: [
            {
                type: 'slot',
                span: 18,
                slotName: 'addDictionaryData'
            },
            {
                type: 'input',
                value: '',
                key: 'name',
                span: 6
            }
        ]
    });

    onMounted(async () => {
        await getJobList();
    });

    async function getJobList() {
        jobTableConfig.value.loading = true;
        const res = await jobList();
        if (res.code == 0 && res.success) {
            jobTableConfig.value.tableData = res.data;
        }
        jobTableConfig.value.loading = false;
    }

    const currentRow = ref(''); //当前选中行
    function onCurrentChange(data) {
        currentRow.value = data;
    }

    const tabIndexs = ref([]);

    //上移
    async function upJob() {
        if (currentRow.value == '' || currentRow.value == null) {
            ElNotification({ title: t('失败'), message: t('请选择职位'), type: 'error', duration: 2000, offset: 80 });
            return;
        }
        let tableData = jobTableConfig.value.tableData;
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
                jobTableConfig.value.tableData = tableData;
                return;
            }
        });
    }

    //下移
    async function downJob() {
        if (currentRow.value == '' || currentRow.value == null) {
            ElNotification({ title: t('失败'), message: t('请选择职位'), type: 'error', duration: 2000, offset: 80 });
            return;
        }
        let tableData = jobTableConfig.value.tableData;
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
                jobTableConfig.value.tableData = tableData;
                break;
            }
        }
    }

    //保存职位排序
    async function saveJobOrder() {
        if (currentRow.value == '' || currentRow.value == null) {
            ElNotification({ title: t('失败'), message: t('请选择排序'), type: 'error', duration: 2000, offset: 80 });
            return;
        }
        const ids = [];
        let tableData = jobTableConfig.value.tableData;
        tableData.forEach((element) => {
            ids.push(element.id);
        });
        jobTableConfig.value.loading = true;
        let result = await saveOrder(ids.toString(), tabIndexs.value.toString());
        jobTableConfig.value.loading = false;
        currentRow.value = '';

        ElNotification({
            title: result.success ? t('成功') : t('失败'),
            message: result.msg,
            type: result.success ? 'success' : 'error',
            duration: 2000,
            offset: 80
        });
    }
</script>

<style lang="scss" scoped></style>
