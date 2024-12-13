<template>
    <fixedTreeModule
        ref="fixedTreeRef"
        :hiddenSearch="true"
        :treeApiObj="treeApiObj"
        :treeLoading="treeLoading"
        nodeLabel="cnName"
        @onDeleteTree="onRemoveNode"
        @onTreeClick="onClickTree"
    >
        <template v-slot:treeHeaderRight>
            <el-button
                :size="fontSizeObj.buttonSize"
                :style="{ fontSize: fontSizeObj.baseFontSize }"
                class="global-btn-second"
                @click="onSort"
            >
                <i class="ri-arrow-up-down-line"></i>
                <span>{{ $t('排序') }}</span>
            </el-button>
            <el-button
                :size="fontSizeObj.buttonSize"
                :style="{ fontSize: fontSizeObj.baseFontSize }"
                class="global-btn-main"
                type="primary"
                @click="onAddSystem"
            >
                <i class="ri-add-line"></i>
                <span>{{ $t('系统') }}</span>
            </el-button>
        </template>
        <template #rightContainer>
            <div v-if="currTreeNodeInfo.id">
                <baseInfo :currInfo="currTreeNodeInfo" :handAssginNode="handAssginNode" :postNode="postNode"></baseInfo>

                <appManage :currInfo="currTreeNodeInfo"></appManage>
            </div>
        </template>
    </fixedTreeModule>
    <y9Dialog v-model:config="dialogConfig">
        <systemInfo
            v-if="dialogConfig.type == 'addSystem'"
            ref="addSystemInfoRef"
            :currInfo="currInfo"
            :isEditState="true"
            isAdd
        ></systemInfo>
        <treeSort
            v-if="dialogConfig.type == 'sort'"
            ref="sortRef"
            :apiRequest="systemList"
            :columns="dialogConfig.columns"
            :currInfo="currInfo"
        ></treeSort>
    </y9Dialog>
</template>

<script lang="ts" setup>
    import baseInfo from './comps/baseInfo/index.vue';
    import systemInfo from './comps/baseInfo/systemInfo.vue';
    import appManage from './comps/appManage.vue';
    import { removeSystem, systemList, systemSaveOrder, systemSaveOrUpdate } from '@/api/frontFrame/system/index';
    import { useI18n } from 'vue-i18n';
    import { inject, ref } from 'vue';

    const { t } = useI18n();
    // 注入 字体对象
    const fontSizeObj: any = inject('sizeObjInfo');
    const treeApiObj = ref({
        //tree接口对象
        topLevel: async () => {
            //一级接口
            const res = await systemList(); //请求一级接口
            const data = res.data;
            data.forEach((item) => {
                item.isLeaf = true; //设置为叶子节点（即没有子节点）
                item.title_icon = 'ri-settings-line'; //icon
            });
            return data; //返回数据
        }
    });

    //树加载状态
    const treeLoading = ref(false);
    //左侧树实例
    const fixedTreeRef = ref();

    //删除树节点
    function onRemoveNode(node) {
        ElMessageBox.confirm(`${t('是否删除')}【${node.cnName}】?`, t('提示'), {
            confirmButtonText: t('确定'),
            cancelButtonText: t('取消'),
            type: 'info'
        })
            .then(async () => {
                treeLoading.value = true; //开启加载状态
                currTreeNodeInfo.value = {};
                let result = { success: false, msg: '' };
                result = await removeSystem(node.id);

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

    //点击-排序-按钮
    function onSort() {
        Object.assign(dialogConfig.value, {
            show: true,
            title: computed(() => t('排序')),
            type: 'sort',
            width: '40%',
            columns: [
                {
                    type: 'radio',
                    title: computed(() => t('请选择')),
                    width: 200
                },
                {
                    title: computed(() => t('名称')),
                    key: 'cnName'
                }
            ]
        });
    }

    //点击-新增系统-按钮
    function onAddSystem() {
        Object.assign(dialogConfig.value, {
            show: true,
            title: computed(() => t('新增系统')),
            type: 'addSystem',
            width: '40%'
        });
    }

    const addSystemInfoRef = ref();
    const sortRef = ref();
    const dialogConfig = ref({
        show: false,
        title: '',
        type: '',
        onOk: (newConfig) => {
            return new Promise(async (resolve, reject) => {
                let result = { success: false, msg: '' };
                if (newConfig.value.type == 'addSystem') {
                    let valid = await addSystemInfoRef.value?.y9FormRef?.elFormRef?.validate((valid) => valid); //获取表单验证结果
                    if (!valid) {
                        reject();
                        return;
                    }
                    result = await systemSaveOrUpdate(addSystemInfoRef.value?.y9FormRef?.model);
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
                } else if (newConfig.value.type == 'sort') {
                    let tableData = sortRef.value.tableConfig.tableData;
                    const ids = [];
                    tableData.forEach((element) => {
                        ids.push(element.id);
                    });
                    result = await systemSaveOrder(ids.toString());
                    // 重新刷新树 数据
                    fixedTreeRef.value.onRefreshTree();
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
