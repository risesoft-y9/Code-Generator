<template>
    <y9Card
        v-loading.fullscreen.lock="loading"
        :title="`${$t('人员列表')}${currInfo.name ? ' - ' + currInfo.name : ''}`"
    >
        <div class="margin-bottom-20" style="display: flex; justify-content: space-between">
            <div>
                <el-button
                    :size="fontSizeObj.buttonSize"
                    :style="{ fontSize: fontSizeObj.baseFontSize }"
                    class="global-btn-main"
                    type="primary"
                    @click="savePersonOrder"
                >
                    <i class="ri-save-line"></i>
                    <span>{{ $t('保存') }}</span>
                </el-button>
            </div>
            <div>
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
        </div>
        <y9Table
            ref="personTableRef"
            v-model:selectedVal="userSelectedData"
            :config="personListTableConfig"
            @on-current-change="onCurrentChange"
        ></y9Table>
    </y9Card>
</template>

<script lang="ts" setup>
    import { useI18n } from 'vue-i18n';
    import { removePerson, saveOrder } from '@/api/frontFrame/person/index';
    import { getPersonsByParentId } from '@/api/frontFrame/org/index';
    import { inject, reactive } from 'vue';

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

        handAssginNode: Function //手动更新节点信息
    });

    const data = reactive({
        loading: false, // 全局loading
        userSelectedData: '', //选中的人员数据
        personListTableConfig: {
            //人员列表表格配置
            columns: [
                {
                    type: 'radio',
                    width: 80
                },
                {
                    title: computed(() => t('姓名')),
                    key: 'name',
                    width: 200
                },
                {
                    title: computed(() => t('性别')),
                    key: 'sex',
                    width: 120,
                    render: (row) => {
                        let text = row.sex;
                        if (row.sex == 1) {
                            text = '男';
                        } else if (row.sex == 0) {
                            text = '女';
                        }

                        return h('div', computed(() => t(text)).value);
                    }
                },
                {
                    title: computed(() => t('职务')),
                    key: 'duty',
                    width: 300
                },
                {
                    title: computed(() => t('所属部门')),
                    key: 'dn'
                },
                {
                    title: computed(() => t('操作')),
                    width: 100,
                    render: (row) => {
                        return h('i', {
                            class: 'ri-delete-bin-line',
                            onClick: () => {
                                ElMessageBox.confirm(`${t('是否删除')}【${row.name}】?`, t('提示'), {
                                    confirmButtonText: t('确定'),
                                    cancelButtonText: t('取消'),
                                    type: 'info'
                                })
                                    .then(async () => {
                                        loading.value = true;
                                        let result = { success: false, msg: '' };
                                        if (props.currInfo.orgType === 'Organization') {
                                            result = await removePerson([row.id].toString());
                                        }
                                        loading.value = false;
                                        if (result.success) {
                                            personListTableConfig.value.tableData.forEach((item, index) => {
                                                if (item.id == row.id) {
                                                    personListTableConfig.value.tableData.splice(index, 1);
                                                }
                                            });
                                        }
                                        ElNotification({
                                            title: result.success ? t('成功') : t('失败'),
                                            message: result.msg,
                                            type: result.success ? 'success' : 'error',
                                            duration: 2000,
                                            offset: 80
                                        });
                                    })
                                    .catch(() => {
                                        ElMessage({
                                            type: 'info',
                                            message: t('已取消删除'),
                                            offset: 65
                                        });
                                    });
                            }
                        });
                    }
                }
            ],
            tableData: [],
            pageConfig: false //取消分页
        },
        currentRow: '',
        tabIndexs: [],
        personTableRef: ''
    });

    let { personListTableConfig, currentRow, userSelectedData, tabIndexs, loading, personTableRef } = toRefs(data);

    watch(
        () => props.currInfo,
        (newVal) => {
            personTableRef.value?.elTableRef?.setCurrentRow(); //取消选中状态。
            getPersonsList();
        },
        {
            deep: true,
            immediate: true
        }
    );

    defineExpose({
        getPersonsList
    });

    async function getPersonsList() {
        let result;
        if (props.currInfo.orgType === 'Organization') {
            result = await getPersonsByParentId(props.currInfo.id);
        }

        if (result.success) {
            tabIndexs.value = [];
            result.data.forEach((element) => {
                tabIndexs.value.push(element.tabIndex);
            });
            personListTableConfig.value.tableData = result.data;
        }
        return personListTableConfig.value.tableData.length;
    }

    //添加人员
    function addPerson() {
        Object.assign(dialogConfig.value, {
            show: true,
            title: computed(() => t('添加人员')),
            width: '30%'
        });
    }

    function onCurrentChange(data) {
        currentRow.value = data;
        if (data) {
            userSelectedData.value = data.id;
        } else {
            userSelectedData.value = '';
        }
    }

    async function upPerson() {
        if (currentRow.value == '' || currentRow.value == null) {
            ElNotification({ title: t('失败'), message: t('请选择人员'), type: 'error', duration: 2000, offset: 80 });
            return;
        }
        let tableData = personListTableConfig.value.tableData;
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
                personListTableConfig.value.tableData = tableData;
                return;
            }
        });
    }

    async function downPerson() {
        if (currentRow.value == '' || currentRow.value == null) {
            ElNotification({ title: t('失败'), message: t('请选择人员'), type: 'error', duration: 2000, offset: 80 });
            return;
        }
        let tableData = personListTableConfig.value.tableData;
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
                personListTableConfig.value.tableData = tableData;
                break;
            }
        }
    }

    async function savePersonOrder() {
        const ids = [];
        let tableData = personListTableConfig.value.tableData;
        tableData.forEach((element) => {
            ids.push(element.id);
        });
        loading.value = true;

        let result = { success: false, msg: '' };
        if (props.currInfo.orgType === 'Organization') {
            result = await saveOrder(ids.toString(), tabIndexs.value.toString());
            props.handAssginNode({}, props.currInfo.id, props.currInfo.id); //手动更新当前节点的子节点
        }

        loading.value = false;
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
