<template>
    <y9Card v-loading.fullscreen.lock="loading" :headerPadding="false">
        <template #header>
            <div :style="{ 'padding-bottom': '16px' }" class="slot-header">
                <span>{{ $t('基本信息') }}{{ currInfo.name ? ' - ' + currInfo.name : '' }}</span>
                <div class="expand-btns-div">
                    <div v-show="isExpandBtns" class="expand-btns">
                        <el-button
                            :size="fontSizeObj.buttonSize"
                            :style="{ fontSize: fontSizeObj.baseFontSize }"
                            class="global-btn-second"
                            @click="onActions('extendAttr', '扩展属性')"
                        >
                            <i class="ri-external-link-line"></i>
                            <span>{{ $t('扩展') }}</span>
                        </el-button>

                        <el-button
                            :size="fontSizeObj.buttonSize"
                            :style="{ fontSize: fontSizeObj.baseFontSize }"
                            class="global-btn-second"
                            @click="onActions('sync', '数据同步')"
                        >
                            <i class="ri-repeat-line"></i>
                            <span>{{ $t('同步') }}</span>
                        </el-button>

                        <el-button
                            v-show="currInfo.orgType === 'Person'"
                            :size="fontSizeObj.buttonSize"
                            :style="{ fontSize: fontSizeObj.baseFontSize }"
                            class="global-btn-second"
                            @click="onActions('move', '移动')"
                        >
                            <i class="ri-route-line"></i>
                            <span>{{ $t('移动') }}</span>
                        </el-button>

                        <el-button
                            v-show="currInfo.orgType === 'Organization'"
                            :size="fontSizeObj.buttonSize"
                            :style="{ fontSize: fontSizeObj.baseFontSize }"
                            class="global-btn-second"
                            @click="onActions('sort', '综合排序')"
                        >
                            <i class="ri-arrow-up-down-line"></i>
                            <span> {{ $t('排序') }}</span>
                        </el-button>
                        <el-button
                            v-show="currInfo.orgType === 'Person'"
                            :size="fontSizeObj.buttonSize"
                            :style="{ fontSize: fontSizeObj.baseFontSize }"
                            class="global-btn-second"
                            @click="
                                onActions(
                                    'disabled',
                                    currInfo.disabled ? '取消禁用人员' + currInfo.name : '禁用人员' + currInfo.name
                                )
                            "
                        >
                            <i class="ri-user-unfollow-line"></i>
                            <span>{{ currInfo.disabled ? $t('取消禁用') : $t('禁用') }}</span>
                        </el-button>
                        <el-button
                            v-show="currInfo.orgType === 'Person'"
                            :size="fontSizeObj.buttonSize"
                            :style="{ fontSize: fontSizeObj.baseFontSize }"
                            class="global-btn-second"
                            @click="onActions('resetPassword', '重置当前人员密码为默认密码')"
                        >
                            <i class="ri-refresh-line"></i>
                            <span>{{ $t('重置密码') }}</span>
                        </el-button>
                    </div>

                    <i
                        :class="isExpandBtns ? 'ri-checkbox-indeterminate-line' : 'ri-add-box-line'"
                        @click="isExpandBtnsFunc('click')"
                    ></i>
                </div>
            </div>
        </template>

        <div class="oth-btns">
            <div v-if="isEditState">
                <el-button
                    :size="fontSizeObj.buttonSize"
                    :style="{ fontSize: fontSizeObj.baseFontSize }"
                    class="global-btn-main"
                    type="primary"
                    @click="onActions('save')"
                >
                    <i class="ri-save-line"></i>
                    <span>{{ $t('保存') }}</span>
                </el-button>

                <el-button
                    :size="fontSizeObj.buttonSize"
                    :style="{ fontSize: fontSizeObj.baseFontSize }"
                    class="global-btn-second"
                    @click="isEditState = false"
                >
                    <i class="ri-close-line"></i>
                    <span> {{ $t('取消') }}</span>
                </el-button>
            </div>

            <div v-else style="display: flex; justify-content: space-between; text-align: right">
                <el-button
                    :size="fontSizeObj.buttonSize"
                    :style="{ fontSize: fontSizeObj.baseFontSize }"
                    class="global-btn-main"
                    type="primary"
                    @click="onActions('edit')"
                >
                    <i class="ri-edit-line"></i>
                    <span>{{ $t('编辑') }}</span>
                </el-button>

                <div
                    v-show="currInfo.orgType == 'Organization' || currInfo.orgType == 'Department'"
                    style="margin-left: 10px"
                >
                    <el-button
                        :size="fontSizeObj.buttonSize"
                        :style="{ fontSize: fontSizeObj.baseFontSize }"
                        class="global-btn-main"
                        type="primary"
                        @click="onActions('addPerson', '新增人员')"
                    >
                        <i class="ri-add-line"></i>
                        <span>{{ $t('人员') }}</span>
                    </el-button>
                    <el-button
                        :size="fontSizeObj.buttonSize"
                        :style="{ fontSize: fontSizeObj.baseFontSize }"
                        class="global-btn-main"
                        type="primary"
                        @click="onActions('selectPerson', '选择已有人员')"
                    >
                        <i class="ri-add-line"></i>
                        <span>{{ $t('选择已有人员') }}</span>
                    </el-button>
                </div>
            </div>
        </div>

        <div>
            <orgForm
                v-if="currInfo.orgType == 'Organization'"
                ref="orgFormRef"
                :currInfo="currInfo"
                :isEditState="isEditState"
            ></orgForm>
            <personForm
                v-if="currInfo.orgType == 'Person'"
                ref="personFormRef"
                :currInfo="currInfo"
                :isEditState="isEditState"
                :step="addPersonStep"
            ></personForm>
        </div>
    </y9Card>

    <y9Dialog v-model:config="dialogConfig">
        <personForm
            v-if="dialogConfig.type == 'addPerson'"
            ref="addPersonFormRef"
            :currInfo="currInfo"
            :step="addPersonStep"
            isAdd
            isEditState
        ></personForm>
        <selectTree
            v-if="dialogConfig.type == 'selectPerson'"
            ref="selectPersonTreeRef"
            :selectField="[
                { fieldName: 'orgType', value: ['Person'] },
                { fieldName: 'disabled', value: false }
            ]"
            :treeApiObj="treeApiObj"
            checkStrictly
        ></selectTree>
        <selectTree
            v-if="dialogConfig.type == 'move'"
            ref="moveSelectTreeRef"
            :selectField="[
                { fieldName: 'orgType', value: ['Organization'] },
                { fieldName: 'disabled', value: false }
            ]"
            :treeApiObj="treeApiObj"
            checkStrictly
            @onCheckChange="onCheckChange"
        ></selectTree>
        <extendAttr
            v-if="dialogConfig.type == 'extendAttr'"
            :currInfo="currInfo"
            :handAssginNode="handAssginNode"
        ></extendAttr>
        <syncForm v-if="dialogConfig.type == 'sync'" ref="syncRef"></syncForm>
        <treeSort
            v-if="dialogConfig.type == 'sort'"
            ref="sortRef"
            :apiParams="currInfo.id"
            :apiRequest="treeInterface"
            :columns="dialogConfig.columns"
            :currInfo="currInfo"
            type="Person"
        ></treeSort>
    </y9Dialog>
</template>

<script lang="ts" setup>
    import {
        getTreeItemById,
        orgSaveOrUpdate,
        saveOrder,
        searchByName,
        sync,
        treeInterface
    } from '@/api/frontFrame/org/index';
    import {
        changeDisabled,
        movingPerson,
        personSaveOrUpdate,
        resetPassword,
        savePersons
    } from '@/api/frontFrame/person/index';
    import orgForm from './orgForm.vue';
    import personForm from './personForm.vue';
    import extendAttr from './extendAttr.vue';
    import syncForm from './syncForm.vue';
    import { useI18n } from 'vue-i18n';
    import { inject, ref } from 'vue';

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

    //是否编辑
    const isEditState = ref(false);

    //是否展开所有按钮
    const isExpandBtns = ref(true);

    //添加人员的步骤
    const addPersonStep = ref(1);

    //监听节点信息
    watch(
        () => props.currInfo,
        (newVal) => {
            isEditState.value = false; //取消编辑状态
            isExpandBtns.value = true; //按钮展开
            addPersonStep.value = 1;
        },
        {
            deep: true,
            immediate: true
        }
    );

    //全局加载状态
    const loading = ref(false);
    //组织机构表单实例
    const orgFormRef = ref();
    //人员表单实例
    const personFormRef = ref();
    //添加人员表单实例
    const addPersonFormRef = ref();
    //选择人员树实例
    const selectPersonTreeRef = ref();
    //移动树实例
    const moveSelectTreeRef = ref();
    //树接口请求
    const treeApiObj = ref({
        //tree接口对象
        topLevel: treeInterface, //一级接口
        childLevel: {
            api: getTreeItemById, //二级接口
            params: { treeType: 'tree_type_org_person', disabled: true } //二级接口参数，parentId不需要传，组件内部已经设置好
        },
        search: {
            api: searchByName, //搜索接口
            params: {
                treeType: 'tree_type_org_person' //搜索接口的key字段不需要传，组件内部已经设置好
            }
        }
    });
    //数据同步表单实例
    const syncRef = ref();
    //排序表格实例
    const sortRef = ref();

    //移动tree点击选择框时触发
    const onCheckChange = (node, isChecked) => {
        //已经选择的节点
        const alreadyCheckedNode = moveSelectTreeRef.value?.y9TreeRef?.getCheckedNodes();
        //如果是选中并且存在已经选择的节点超过1个，则取消其他选择，做成单选效果
        if (isChecked && alreadyCheckedNode.length > 1) {
            alreadyCheckedNode.forEach((item) => {
                if (item.id !== node.id) {
                    moveSelectTreeRef.value?.y9TreeRef?.setChecked(item, false, false);
                }
            });
        }
    };

    //公共弹窗
    const dialogConfig = ref({
        show: false,
        title: '',
        onOkLoading: true,
        onOk: (newConfig) => {
            return new Promise(async (resolve, reject) => {
                let result = { success: false, msg: '' };
                if (newConfig.value.type == 'addPerson') {
                    let formData = addPersonFormRef.value?.y9FormRef?.model;
                    if (formData.jobIds.length === 0 && formData.positionIds.length === 0) {
                        ElNotification({
                            title: t('失败'),
                            message: t('岗位和职位请必选一个'),
                            type: 'error',
                            duration: 2000,
                            offset: 80
                        });
                        reject();
                        return;
                    } else {
                        //请求接口
                        result = await personSaveOrUpdate(formData, props.currInfo.id);
                        if (result.success) {
                            //请求成功后,需要做什么操作就在这里写入...
                        }
                    }
                } else if (newConfig.value.type == 'selectPerson') {
                    let selectIds = selectPersonTreeRef.value?.y9TreeRef?.getCheckedKeys(true);
                    if (selectIds.length == 0) {
                        ElNotification({
                            title: t('失败'),
                            message: t('请选择人员'),
                            type: 'error',
                            duration: 2000,
                            offset: 80
                        });
                        reject();
                        return;
                    }
                    result = await savePersons(props.currInfo.id, selectIds.toString());
                    if (result.success) {
                        console.log('已选择的人员id,selectIds', selectIds);
                        //请求成功后,需要做什么操作就在这里写入...
                    }
                } else if (newConfig.value.type == 'move') {
                    const selectIds = moveSelectTreeRef.value?.y9TreeRef?.getCheckedKeys();
                    if (selectIds.length == 0) {
                        ElNotification({
                            title: t('失败'),
                            message: t('请选择'),
                            type: 'error',
                            duration: 2000,
                            offset: 80
                        });
                        reject();
                        return;
                    }
                    const targetId = selectIds[0];

                    result = await movingPerson(props.currInfo.id, targetId);

                    if (result.success) {
                        console.log('已选择的人员id,selectIds', selectIds);
                        //请求成功后,需要做什么操作就在这里写入...
                    }
                } else if (newConfig.value.type == 'sync') {
                    let valid = await syncRef.value?.y9FormRef?.elFormRef?.validate((valid) => valid); //获取表单验证结果
                    if (!valid) {
                        reject();
                        return;
                    }

                    let formData = syncRef.value?.y9FormRef?.model;
                    const params = {
                        syncId: props.currInfo.id,
                        orgType: props.currInfo.orgType,
                        targetSysName: formData.targetSysName,
                        needRecursion: formData.needRecursion
                    };
                    result = await sync(params);

                    if (result.success) {
                        //请求成功后,需要做什么操作就在这里写入...
                    }
                } else if (newConfig.value.type == 'sort') {
                    let tableData = sortRef.value.tableConfig.tableData;
                    const ids = [];
                    tableData.forEach((element) => {
                        ids.push(element.id);
                    });
                    result = await saveOrder(props.currInfo.id, ids.toString());
                    if (result.success) {
                        //请求成功后,需要做什么操作就在这里写入...
                    }
                }

                ElNotification({
                    title: result.success ? t('成功') : t('失败'),
                    message: result.msg,
                    type: result.success ? 'success' : 'error',
                    duration: 2000,
                    offset: 80
                });

                resolve();
            });
        },
        onReset: async (newConfig) => {
            if (newConfig.value.type == 'sync') {
                syncRef.value.y9FormRef.model.targetSysName = '';
            } else if (newConfig.value.type == 'addPerson') {
                if (addPersonStep.value === 1) {
                    let valid = await addPersonFormRef.value?.y9FormRef?.elFormRef?.validate((valid) => valid); //获取表单验证结果
                    if (valid) {
                        addPersonStep.value = 2;
                        newConfig.value.resetText = computed(() => t('上一步'));
                        newConfig.value.okText = computed(() => t('保存'));
                    }
                } else if (addPersonStep.value === 2) {
                    addPersonStep.value = 1;
                    newConfig.value.resetText = computed(() => t('下一步'));
                    newConfig.value.okText = false;
                }
            }
        }
    });

    //操作按钮
    async function onActions(type, title) {
        if (type == 'edit') {
            //编辑
            isEditState.value = true;
        } else if (type == 'save') {
            //保存

            loading.value = true; //启动全局加载
            if (props.currInfo.orgType == 'Organization') {
                //组织
                let valid = await orgFormRef.value?.y9FormRef?.elFormRef?.validate((valid) => valid); //获取表单验证结果
                if (valid) {
                    const result = await orgSaveOrUpdate(orgFormRef.value?.y9FormRef?.model);
                    ElNotification({
                        title: result.success ? t('成功') : t('失败'),
                        message: result.msg,
                        type: result.success ? 'success' : 'error',
                        duration: 2000,
                        offset: 80
                    });
                    if (result.success) {
                        //修改后的数据更新到对应的树数据当中
                        await props.handAssginNode(result.data, props.currInfo.id); //手动更新节点到tree
                        //取消编辑状态
                        isEditState.value = false;
                    }
                }
            } else if (props.currInfo.orgType == 'Person') {
                //人员
                let valid = await personFormRef.value?.y9FormRef?.elFormRef?.validate((valid) => valid); //获取表单验证结果
                if (valid) {
                    const result = await personSaveOrUpdate(personFormRef.value?.y9FormRef?.model);
                    ElNotification({
                        title: result.success ? t('成功') : t('失败'),
                        message: result.msg,
                        type: result.success ? 'success' : 'error',
                        duration: 2000,
                        offset: 80
                    });
                    if (result.success) {
                        //修改后的数据更新到对应的树数据当中
                        await props.handAssginNode(result.data, props.currInfo.id); //手动更新节点到tree
                        //取消编辑状态
                        isEditState.value = false;
                    }
                }
            }

            loading.value = false; //关闭全局加载
        } else if (
            type == 'addPerson' ||
            type == 'selectPerson' ||
            type == 'move' ||
            type == 'sync' ||
            type == 'extendAttr' ||
            type == 'sort'
        ) {
            //点击按钮显示弹窗
            addPersonStep.value = 1;
            Object.assign(dialogConfig.value, {
                show: true,
                title: computed(() => t(title)),
                okText:
                    type == 'extendAttr' || (type == 'addPerson' && addPersonStep.value === 1)
                        ? false
                        : computed(() => t('保存')),
                resetText:
                    type == 'sync'
                        ? computed(() => t('重置'))
                        : type == 'addPerson' && addPersonStep.value === 1
                        ? computed(() => t('下一步'))
                        : false,
                cancelText: type == 'sync' || type == 'extendAttr' ? false : computed(() => t('关闭')),
                width: type == 'selectPerson' || type == 'move' || type == 'sync' ? '30%' : '60%',
                type: type,
                showFooter: true,
                columns:
                    type == 'sort'
                        ? [
                              {
                                  type: 'radio',
                                  title: computed(() => t('请选择')),
                                  width: 200
                              },
                              {
                                  title: computed(() => t('名称')),
                                  key: 'name'
                              },
                              {
                                  title: computed(() => t('类别')),
                                  key: 'orgType'
                              }
                          ]
                        : []
            });
        } else if (type == 'disabled' || type == 'resetPassword') {
            ElMessageBox.confirm(`${t('确定要')}${title}`, t('提示'), {
                confirmButtonText: t('确定'),
                cancelButtonText: t('取消'),
                type: 'info'
            })
                .then(async () => {
                    loading.value = true; //启动全局加载
                    let res = { success: false, msg: '' };
                    if (type == 'resetPassword') {
                        //重置密码
                        res = await resetPassword(props.currInfo.id);
                    } else if (type == 'disabled') {
                        //禁用 | 取消禁用
                        res = await changeDisabled(props.currInfo.id);
                        if (res.success) {
                            //修改后的数据更新到对应的树数据当中
                            await props.handAssginNode(
                                {
                                    disabled: !props.currInfo.disabled
                                },
                                props.currInfo.id
                            ); //手动更新节点到tree
                        }
                    }
                    loading.value = false; //关闭全局加载
                    ElNotification({
                        title: res.success ? t('成功') : t('失败'),
                        message: res.msg,
                        type: res.success ? 'success' : 'error',
                        duration: 2000,
                        offset: 80
                    });
                })
                .catch(() => {
                    ElMessage({
                        type: 'info',
                        message: t('已取消') + title,
                        offset: 65
                    });
                });
        }
    }

    //展开类的按钮动画名称
    const expandAddBtnsAnimation = ref('');
    //展开类的按钮，是否为点击操作
    const isClickAction = ref(false);

    //展开类的按钮
    function isExpandBtnsFunc(type) {
        switch (type) {
            case 'click':
                isClickAction.value = true;
                if (isExpandBtns.value) {
                    expandAddBtnsAnimation.value = 'fadeOutRightBig';
                    setTimeout(() => {
                        isExpandBtns.value = false;
                    }, 1000);
                }
                if (!isExpandBtns.value) {
                    isExpandBtns.value = true;
                    expandAddBtnsAnimation.value = 'fadeInRightBig';
                }
                break;
            case 'mouseleave':
                if (isExpandBtns.value || isClickAction.value) {
                    expandAddBtnsAnimation.value = 'fadeOutRightBig';
                    setTimeout(() => {
                        isExpandBtns.value = false;
                        isClickAction.value = false;
                    }, 1000);
                }
                break;
            default:
                break;
        }
    }
</script>

<style lang="scss" scoped>
    .slot-header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 16px 16px 0;

        .expand-btns-div {
            display: flex;
            flex-wrap: wrap;
            max-width: 70%;

            .ri-add-box-line,
            .ri-checkbox-indeterminate-line {
                margin-left: 10px;
                color: var(--el-color-primary);
                font-size: v-bind('fontSizeObj.baseFontSize');
                cursor: pointer;
                line-height: v-bind('fontSizeObj.lineHeight');
            }

            & > .expand-btns {
                animation: v-bind(expandAddBtnsAnimation) 1.5s;
                animation-fill-mode: forwards;
                flex: 1;
                text-align: right;

                :deep(.el-button) {
                    margin-bottom: 10px;
                }
            }

            .ri-checkbox-indeterminate-line,
            .ri-add-box-line {
                margin-bottom: 16px;
            }
        }
    }

    .oth-btns {
        margin-bottom: 10px;

        :deep(.el-button) {
            margin-bottom: 10px;
        }
    }
</style>
