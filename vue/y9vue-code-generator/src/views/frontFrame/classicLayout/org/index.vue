<template>
    <fixedTreeModule
        ref="fixedTreeRef"
        :treeApiObj="treeApiObj"
        :treeLoading="treeLoading"
        @onDeleteTree="onRemoveNode"
        @onTreeClick="onClickTree"
    >
        <template v-slot:treeHeaderRight>
            <el-button
                :size="fontSizeObj.buttonSize"
                :style="{ fontSize: fontSizeObj.baseFontSize }"
                class="global-btn-main"
                type="primary"
                @click="onAddOrg"
            >
                <i class="ri-add-line"></i>
                <span>组织机构</span>
            </el-button>
        </template>
        <template #rightContainer>
            <div v-if="currTreeNodeInfo.id">
                <baseInfo :currInfo="currTreeNodeInfo" :handAssginNode="handAssginNode" :postNode="postNode"></baseInfo>

                <personList
                    v-if="currTreeNodeInfo.orgType == 'Organization'"
                    :currInfo="currTreeNodeInfo"
                    :handAssginNode="handAssginNode"
                ></personList>
            </div>
        </template>
    </fixedTreeModule>
    <y9Dialog v-model:config="dialogConfig">
        <orgForm
            v-if="dialogConfig.type == 'addOrg'"
            ref="addOrgFormRef"
            :currInfo="currInfo"
            :isEditState="true"
            isAdd
        ></orgForm>
    </y9Dialog>
</template>

<script lang="ts" setup>
    import baseInfo from '../org/comps/baseInfo/index.vue';
    import orgForm from '../org/comps/baseInfo/orgForm.vue';
    import personList from '../org/comps/personList.vue';
    import {
        getTreeItemById,
        orgSaveOrUpdate,
        removeOrg,
        searchByName,
        treeInterface
    } from '@/api/frontFrame/org/index';
    import { removePerson } from '@/api/frontFrame/person/index';
    import { useI18n } from 'vue-i18n';
    import { inject } from 'vue';

    const { t } = useI18n();
    // 注入 字体对象
    const fontSizeObj: any = inject('sizeObjInfo');

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

    //树加载状态
    const treeLoading = ref(false);
    //左侧树实例
    const fixedTreeRef = ref();

    //删除树节点
    function onRemoveNode(node) {
        ElMessageBox.confirm(`${t('是否删除')}【${node.name}】?`, t('提示'), {
            confirmButtonText: t('确定'),
            cancelButtonText: t('取消'),
            type: 'info'
        })
            .then(async () => {
                treeLoading.value = true; //开启加载状态

                let result = { success: false, msg: '' };
                if (node.orgType == 'Organization') {
                    //删除组织机构
                    result = await removeOrg(node.id);
                } else if (node.orgType == 'Person') {
                    //删除人员
                    result = await removePerson(node.id);
                }
                if (result.success) {
                    /**
                     * 对树进行操作
                     */
                    //1.需要手动点击的节点信息，如果有父节点则默认点击父节点，没有则点击tree数据的第一个节点
                    const treeData = fixedTreeRef.value.getTreeData(); //获取tree数据
                    let clickNode = null;
                    if (node.parentId) {
                        clickNode = fixedTreeRef.value.findNode(treeData, node.parentId); //找到父节点的信息
                        fixedTreeRef.value?.y9TreeRef?.remove(node); //删除此节点
                    } else if (treeData.length > 0) {
                        fixedTreeRef.value?.y9TreeRef?.remove(node); //删除此节点
                        clickNode = treeData[0];
                    }
                    if (clickNode) {
                        fixedTreeRef.value?.handClickNode(clickNode); //手动设置点击当前节点
                    } else {
                        currTreeNodeInfo.value = {};
                    }
                }

                treeLoading.value = false; //关闭加载状态
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

    //当前选中节点的信息
    const currTreeNodeInfo = ref({});

    //点击树节点
    function onClickTree(node) {
        currTreeNodeInfo.value = node;
    }

    //点击-新增组织机构-按钮
    function onAddOrg() {
        Object.assign(dialogConfig.value, {
            show: true,
            title: '新增组织机构',
            type: 'addOrg'
        });
    }

    const addOrgFormRef = ref();
    const dialogConfig = ref({
        show: false,
        title: '',
        type: '',
        onOk: (newConfig) => {
            return new Promise(async (resolve, reject) => {
                let result = { success: false, msg: '' };
                if (newConfig.value.type == 'addOrg') {
                    let valid = await addOrgFormRef.value?.y9FormRef?.elFormRef?.validate((valid) => valid); //获取表单验证结果
                    if (!valid) {
                        reject();
                        return;
                    }
                    result = await orgSaveOrUpdate(addOrgFormRef.value?.y9FormRef?.model);
                    if (result.success && result.data) {
                        /**
                         * 对树进行操作
                         */
                        //1.更新一级节点数据
                        const treeData = await postNode({ $level: 0 }); //重新请求一级节点
                        await fixedTreeRef.value.setTreeData(treeData);

                        //2.手动设置点击当前节点
                        const currNode = fixedTreeRef.value.findNode(treeData, result.data.id); //找到树节点对应的节点信息
                        fixedTreeRef.value?.handClickNode(currNode); //手动设置点击当前节点
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
        }
    });

    //请求某个节点，返回格式化好的数据,如果是请求一级节点,传入的node必须有字段:$level = 0,非一级可以没有这个字段
    function postNode(node) {
        return new Promise((resolve, reject) => {
            fixedTreeRef.value.onTreeLazyLoad(node, (data) => {
                resolve(data);
            });
        });
    }

    /**手动更新节点信息
     * @param {Object} obj 需要合并的字段
     * @param {String} targetId 需要更新的节点id
     * @param {String} postChildId 请求的子节点id，如果存在该字段就请求子节点
     */
    async function handAssginNode(obj, targetId, postChildId) {
        if (postChildId) {
            const childData = await postNode({ id: postChildId }); //重新请求当前节点的子节点，获取格式化后的子节点信息
            obj.children = childData;
        }

        //1.更新当前节点的信息
        const currNode = fixedTreeRef.value?.findNode(fixedTreeRef.value?.getTreeData(), targetId); //找到树节点对应的节点信息
        if (currNode) {
            Object.assign(currNode, obj); //合并节点信息

            //2.手动设置点击当前节点
            fixedTreeRef.value?.handClickNode(currNode); //手动设置点击当前节点
        } else {
            fixedTreeRef.value?.refreshTree();
        }
    }
</script>

<style lang="scss" scoped></style>
