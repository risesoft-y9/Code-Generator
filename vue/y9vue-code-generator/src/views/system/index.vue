<!--
 * @Author: mengjuhua
 * @Date: 2023-02-27 17:57:01
 * @LastEditors: qinman
 * @Description: 公司联系人
-->
<template>
    <fixedTreeModule
            ref="fixedTreeRef"
            :treeApiObj="treeApiObj"
            nodeLabel="cnName"
            @onTreeClick="onTreeClick"
            :showNodeDelete="true"
            @onDeleteTree="systemRemove"
            :hiddenSearch="true"
    >
        <template v-slot:treeHeaderRight>
            <el-button
                    :size="fontSizeObj.buttonSize"
                    :style="{ fontSize: fontSizeObj.baseFontSize }"
                    class="global-btn-main"
                    type="primary"
                    @click="addSystem()"
            >
                <i class="ri-add-line"></i>
                <span> {{ $t('系统') }}</span>
            </el-button>

            <el-button
                    class="global-btn-main"
                    :size="fontSizeObj.buttonSize"
                    :style="{ fontSize: fontSizeObj.baseFontSize }"
                    type="primary"
                    @click="addTemplate()"
            >
                <i class="ri-add-line"></i>
                <span>{{ $t('模板') }}</span>
            </el-button>

        </template>

        <template #rightContainer>
            <template v-if="isShow">
                <y9Card :title="`${$t('基本信息')} - ${currTreeNodeInfo.cnName ? currTreeNodeInfo.cnName : ''}`">
                    <template v-slot>
                        <div class="basic-btns">
                                    <span class="btn-top">
                                        <el-button class="global-btn-main" type="primary"
                                                   :size="fontSizeObj.buttonSize"
                                                   :style="{ fontSize: fontSizeObj.baseFontSize }"
                                                   v-if="editBtnFlag" @click="editBtnFlag = false">
                                            <i class="ri-edit-line"></i>
                                            {{ $t('编辑') }}
                                        </el-button>
                                        <span v-else>
                                            <el-button class="global-btn-main" type="primary"
                                                       :size="fontSizeObj.buttonSize"
                                                       :style="{ fontSize: fontSizeObj.baseFontSize }"
                                                       :loading="saveBtnLoading" @click="saveBtnClick = true">
                                                <i class="ri-save-line"></i>
                                                {{ $t('保存') }}
                                            </el-button>
                                            <el-button class="global-btn-second"
                                                       :size="fontSizeObj.buttonSize"
                                                       :style="{ fontSize: fontSizeObj.baseFontSize }"
                                                       @click="editBtnFlag = true">
                                                <i class="ri-close-line"></i>
                                                {{ $t('取消') }}
                                            </el-button>
                                        </span>
                                    </span>
                            <span>

                                        <el-button class="global-btn-second" :size="fontSizeObj.buttonSize"
                                                   :style="{ fontSize: fontSizeObj.baseFontSize }"
                                                   @click="handlerGenerate">
                                            <i class="ri-file-upload-line"/>
                                            {{ $t("生成代码") }}
                                        </el-button>
                                        <el-button class="global-btn-second" v-loading.fullscreen.lock="loading"
                                                   :size="fontSizeObj.buttonSize"
                                                   :style="{ fontSize: fontSizeObj.baseFontSize }"
                                                   @click="handlerExport">
                                            <i class="ri-download-2-line"></i>
                                            {{ $t('下载') }}
                                        </el-button>
                                    </span>
                        </div>

                        <BaseInfo :id="currTreeNodeInfo.id" :editFlag="editBtnFlag" :saveClickFlag="saveBtnClick"
                                  @getInfoData="handlerEditSave"/>
                    </template>
                </y9Card>
                <y9Card :title="`${$t('实体列表')}${currTreeNodeInfo.name ? ' - ' + currTreeNodeInfo.name : ''}`">
                    <div style="display: flex; justify-content: space-between; text-align: right; margin-top: -10px" class="expand-btns">
                    </div>
                    <entityList
                            :systemId="currTreeNodeInfo.id"
                            :treeNodeName="currTreeNodeInfo.name">
                    </entityList>
                </y9Card>
            </template>
            <template v-else>
                <reminder :currTreeNodeInfo="currTreeNodeInfo"></reminder>
            </template>
        </template>
    </fixedTreeModule>
  <!-- 增加系统 -->
    <y9Dialog v-model:config="dialogConfig">
        <y9Form v-if="dialogConfig.type === 'addSystem'" ref="ruleRef" :config="formSystem"></y9Form>
        <y9Table v-if="dialogConfig.type === 'addTemplate'"
                 v-model:selectedVal="selectedVal"
                 :config="y9TableConfig"
                 @on-curr-page-change="onSystemCurrPageChange"
                 @on-page-size-change="onSystemPageSizeChange">
        </y9Table>
    </y9Dialog>

    <y9Dialog v-model:config="dialogConfig2">
        <y9Table
                :config="y9TableExpandConfig"
                @on-curr-page-change="onSystemCurrPageChange"
                @on-page-size-change="onSystemPageSizeChange">
            <template #childContent="props">
                <div>
                    <el-table :data="props.row.y9CodeFields" style="width: 100%">
                        <el-table-column prop="name" label="字段名称" width="180"/>
                        <el-table-column prop="cnName" label="中文名称" width="180"/>
                        <el-table-column prop="fieldType" label="字段类型" width="150"/>
                        <el-table-column prop="fieldLength" label="字段长度" width="130"/>
                        <el-table-column prop="nullable" label="可否为空" width="130"/>
                        <el-table-column prop="defaultValue" label="默认值" width="130"/>
                        <el-table-column prop="isLarge" label="是否长对象" width="130"/>
                    </el-table>
                </div>
            </template>
        </y9Table>
    </y9Dialog>
    <el-button style="display: none" v-loading.fullscreen.lock="loading"></el-button>
</template>

<script lang="ts" setup>
import {useI18n} from 'vue-i18n';
import EntityList from './comps/entityList.vue';
import {useSettingStore} from '@/store/modules/settingStore';
import {computed, h, inject, reactive, ref, toRefs, watch} from 'vue';
import {ElNotification} from "element-plus";
import {deleteSystem, getSystemList, saveSystem, saveSystemList} from "@/api/system";
import {download, generateCode} from "@/api/export";
import BaseInfo from "@/views/system/comps/baseInfo.vue";
import Reminder from "@/views/system/comps/reminder.vue";
import {nameValidator, tablePrefixValidator} from "@/utils/validate";
import {getEntityAndField} from "@/api/entity";

const route = useRoute();
const settingStore = useSettingStore();
const {t} = useI18n();
// 注入 字体对象
const fontSizeObj: any = inject('sizeObjInfo');
// 点击保存按钮 的 flag
let saveBtnClick = ref(false);
// 控制 基本信息 编辑按钮 与 保存，取消按钮的显示与隐藏
let editBtnFlag = ref(true);
// 保存 按钮 loading
let saveBtnLoading = ref(false);
// 系统环境 0-有生云，1-本地
const environment = ref('')

const isShow = ref(false)

//数据
const data = reactive({
    fixedTreeRef: '', //tree实例
    loading: false,
    treeApiObj: {
        //tree接口对象
        topLevel: '',
    },
    currTreeNodeInfo: '', //当前tree节点的信息
    //气泡操作列表配置
    actionListConfig: {
        padding: "0px",
        listData: [
            {
                id: "addSystem",
                name: computed(() => t("新增系统"))
            },
            {
                id: "addTemplate",
                name: computed(() => t("选择模板"))
            },
        ],
    },
    y9ListRef: "",
});

//操作列表点击事件
async function addTemplate() {

    let params = {
        template: 1,
        page: y9TableConfig.value.pageConfig.currentPage,
        size: y9TableConfig.value.pageConfig.pageSize
    }
    const res = await getSystemList(params);
    y9TableConfig.value.pageConfig.total = res.total;
    y9TableConfig.value.pageConfig.currentPage = 1;
    y9TableConfig.value.tableData = res.rows;
    selectedVal.value = [];

    Object.assign(dialogConfig.value, {
        show: true,
        title: computed(() => t(`选择模板`)),
        type: 'addTemplate',
        showFooter: true,
        width: '60%',
    })
}

const treeApiObj = ref({
    topLevel: async () => {
        let data = []

        environment.value = route.meta.environment;

        let params = {
            environment: environment.value,
            template: 0
        }
        const res = await getSystemList(params);
        data = res.rows;
        data.forEach(item => {
            if (item.template == '1') {
                item.cnName = item.cnName + '  (模板)'
            }

            item.isLeaf = true;
        })
        if (data.length > 0) {
            isShow.value = true;
        } else {
            isShow.value = false;
        }

        return data
    },
});

async function handlerGenerate() {
    const res = await generateCode(currTreeNodeInfo.value.id);
    ElNotification({
        title: res.success ? t('成功') : t('失败'),
        message: res.success ? t('生成成功') : t('生成失败'),
        type: res.success ? 'success' : 'error',
        duration: 2000,
        offset: 80,
    });
}

let y9TableConfig = ref({
    headerBackground: true,
    height: "450px",
    pageConfig: {
        background: false, //是否显示背景色
        layout: "prev, pager, next,sizes", //布局
        currentPage: 1, //当前页数，支持 v-model 双向绑定
        pageSize: 5, //每页显示条目个数，支持 v-model 双向绑定
        pageSizeOpts: [5, 10, 20, 30, 40], //每页显示个数选择器的选项设置
    },
    columns: [{
        type: "selection",
        width: 60,
    },

        {
            type: "index",
            title: "序号",
            width: 60,
        },
        {
            title: "系统名称",
            key: "name",
            width: 130,
        },
        {
            title: "系统中文名称",
            key: "cnName",
            width: 130,
        },
        {
            title: "打包方式",
            key: "war",
            width: 100,
            render: (row) => {//text类型渲染的内容
                return h('a', row?.war == true ? 'war' : 'jar')
            }
        },
        {
            title: "系统概述",
            key: "description",
            width: 420,
        },
        {
            title: "操作",
            render: (row, params) => {
                let openDetail = [
                    h(
                        'span',
                        {
                            style: {
                                marginLeft: '10px',
                                display: 'inline-flex',
                                alignItems: 'center',
                            },
                            onClick: async () => {
                                debugger
                                let data = await getEntityAndField({systemId: row.id});
                                y9TableExpandConfig.value.tableData = data.data;
                                Object.assign(dialogConfig2.value, {
                                    show: true,
                                    title: computed(() => t(`${row.cnName}`)),
                                    type: row.id,
                                    showFooter: true,
                                    width: '60%',
                                })
                            },
                        },
                        [
                            h('i', {
                                class: 'ri-menu-line',
                                style: {
                                    marginRight: '2px',
                                },
                            }),
                            //删除
                            h('span', t('')),
                        ]
                    ),

                ];

                return h('span', openDetail);
            },
        },
    ],
    tableData: []
})
// 模板列表表格
let y9TableExpandConfig = ref({
    border: false,
    headerBackground: true,
    height: "500px",

    columns: [
        {
            type: "expand",
            slot: "childContent",
            width: 60,
        },
        {title: computed(() => t('实体名称')), key: 'name'},
        {title: computed(() => t('实体中文名称')), key: 'cnName'},
        {
            title: computed(() => t('是否多租户')), key: 'tenanted',
            render: (row) => {//text类型渲染的内容
                return h('a', row?.tenanted == true ? '是' : '否')
            }
        },
    ],
    tableData: [],
    pageConfig: false,//不分页
})

let selectedVal = ref([1]);

async function handlerExport() {

    const file = await download(currTreeNodeInfo.value.id);
    if (file.size > 0) {
        const blob = new Blob([file], {type: 'application/zip'});
        const url = URL.createObjectURL(blob);
        // 创建下载链接并模拟点击下载
        const link = document.createElement('a');
        link.href = url;
        link.download = currTreeNodeInfo.value.name + '.zip';
        link.click();

        // 释放URL对象
        window.URL.revokeObjectURL(url);
    } else {
        ElNotification({
            type: "warning",
            title: "下载失败",
            message: "未生成最新代码",
            duration: 2000,
            offset: 80,
        })
    }


}

async function handlerEditSave(data) {
    saveBtnLoading.value = true;
    saveSystem(data).then((res) => {
        //1.更新当前节点的信息
        const treeData = fixedTreeRef.value.getTreeData();//获取tree数据
        //2.手动设置点击当前节点
        const currNode = fixedTreeRef.value.findNode(treeData, res.data.id); //找到树节点对应的节点信息
        fixedTreeRef.value.handClickNode(currNode);
        Object.assign(currNode, data)//合并节点信息

        ElNotification({
            title: res.success ? t('成功') : t('失败'),
            message: res.success ? t('保存成功') : t('保存失败'),
            type: res.success ? 'success' : 'error',
            duration: 2000,
            offset: 80,
        });
        // loading为false 编辑 按钮出现 保存按钮未点击状态
        saveBtnLoading.value = false;
        editBtnFlag.value = true;
        saveBtnClick.value = false;
        // 清空表单 数据
        formSystem.value.model = {name: ''};
        // 重新刷新树 数据
        fixedTreeRef.value.onRefreshTree();
    });
}

const {fixedTreeRef, currTreeNodeInfo, loading, y9ListRef, actionListConfig} = toRefs(data);

// form 组件的config 值
const formSystem = ref({
    model: {
        name: '',
        cnName: '',
        tablePrefix: '',
        description: '',
        war: true,
        environment: '',
    },
    rules: {
        name: [{required: true, validator: nameValidator, trigger: 'blur'}],
        cnName: [{required: true, message: '请输入中文名', trigger: 'blur'}],
        tablePrefix: [{required: true, validator: tablePrefixValidator, trigger: 'blur'}],
        war: [{required: true, message: '请选择包类型', trigger: 'blur'}],
    },
    labelWidth: '120px',
    itemList: [
        {
            type: 'input',
            props: {
                type: 'text',
                placeholder: '请遵循驼峰命名原则'
            },
            label: t('系统名称'),
            prop: 'name',
            required: true,
        },
        {
            type: 'input',
            props: {
                type: 'text',
                placeholder: '请输入中文名'
            },
            label: t('系统中文名称'),
            prop: 'cnName',
            required: true,
        },
        {
            type: 'input',
            props: {
                type: 'text',
                placeholder: '请以字母开头,下划线结尾'
            },
            label: t('表前缀'),
            prop: 'tablePrefix',
            required: true,
        },
        {
            type: 'radio',
            props: {
                radioType: 'radio',
                options: [
                    {label: t('war'), value: true},
                    {label: t('jar'), value: false},
                ],
            },
            label: t('包种类'),
            prop: 'war',
            required: true,
        },
        {
            type: 'input',
            props: {
                type: 'text',
            },
            label: t('系统概述'),
            prop: 'description',
            required: false,
        },
    ],
    descriptionsFormConfig: {
        labelWidth: '200px',
        labelAlign: 'center',
    },
});

let dialogConfig = ref({
    show: false,
    title: '',
    type: '',
    width: '40%',
    onOkLoading: true,
    onOk: (newConfig) => {
        return new Promise(async (resolve, reject) => {
            if (newConfig.value.type == 'addSystem') {
                const ruleFormRef = ruleRef.value.elFormRef;
                if (!ruleFormRef) return;
                await ruleFormRef.validate((valid, fields) => {
                    if (valid) {
                        // 通过验证
                        ruleRef.value.model.environment = environment.value;
                        // 请求 新增系统 接口
                        saveSystem(ruleRef.value.model).then(async (res) => {
                            /**
                             * 对树进行操作
                             */
                                //1.更新一级节点数据
                            const treeData = await postNode({$level: 0}); //重新请求一级节点
                            await fixedTreeRef.value.setTreeData(treeData);

                            //2.手动设置点击当前节点
                            const currNode = fixedTreeRef.value.findNode(treeData, res.data.id); //找到树节点对应的节点信息
                            fixedTreeRef.value.handClickNode(currNode);

                            ElNotification({
                                title: res.success ? t('成功') : t('失败'),
                                message: res.success ? t('保存成功') : t('保存失败'),
                                type: res.success ? 'success' : 'error',
                                duration: 2000,
                                offset: 80,
                            });
                            // 清空表单 数据
                            formSystem.value.model = {name: ''};
                            // 重新刷新树 数据
                            fixedTreeRef.value.onRefreshTree();
                            resolve();
                        });
                    } else {
                        reject();
                    }
                });
            }
            if (newConfig.value.type == 'addTemplate') {

                selectedVal.value.forEach((item) => {
                    item.environment = environment.value;
                })

                saveSystemList(selectedVal.value).then(async (res) => {

                    //1.更新一级节点数据
                    const treeData = await postNode({$level: 0}); //重新请求一级节点
                    await fixedTreeRef.value.setTreeData(treeData);

                    //2.手动设置点击当前节点
                    const currNode = fixedTreeRef.value.findNode(treeData, res.data.id); //找到树节点对应的节点信息
                    fixedTreeRef.value.handClickNode(currNode);

                    ElNotification({
                        title: res.success ? t('成功') : t('失败'),
                        message: res.success ? t('保存成功') : t('保存失败'),
                        type: res.success ? 'success' : 'error',
                        duration: 2000,
                        offset: 80,
                    });
                    // 清空表单 数据
                    formSystem.value.model = {name: ''};
                    // 重新刷新树 数据
                    fixedTreeRef.value.onRefreshTree();
                    resolve();
                });
            }
        });
    },
});

let dialogConfig2 = ref({
    show: false,
    title: '',
    type: '',
    width: '40%',
    onOkLoading: true,
    okText: false,
    cancelText: '关闭'
});

//点击tree的回调
async function onTreeClick(currTreeNode) {
    currTreeNodeInfo.value = currTreeNode;
}

// 删除系统
function systemRemove(data) {
    ElMessageBox.confirm(`${t('是否删除')}【${data.cnName}】?`, t('提示'), {
        confirmButtonText: t('确定'),
        cancelButtonText: t('取消'),
        type: 'info',
    })
        .then(async () => {
            loading.value = true;
            // 删除系统
            const result = await deleteSystem(data.id);
            loading.value = false;

            if (result.success) {

                /**
                 * 对树进行操作
                 */
                    //1.需要手动点击的节点信息，如果有父节点则默认点击父节点，没有则点击tree数据的第一个节点
                const treeData = fixedTreeRef.value.getTreeData();//获取tree数据
                let clickNode = null;
                if (data.parentId) {
                    clickNode = fixedTreeRef.value.findNode(treeData, data.parentId);//找到父节点的信息
                    fixedTreeRef.value?.y9TreeRef?.remove(data);//删除此节点
                } else if (treeData.length > 0) {
                    fixedTreeRef.value?.y9TreeRef?.remove(data);//删除此节点
                    clickNode = treeData[0]
                }
                if (clickNode) {
                    fixedTreeRef.value?.handClickNode(clickNode)//手动设置点击当前节点
                }

                ElNotification({
                    title: t('成功'),
                    message: t('删除成功'),
                    type: 'success',
                    duration: 2000,
                    offset: 80,
                });
            }
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: t('已取消删除'),
                offset: 65,
            });
        });
}

function postNode(node) {
    return new Promise((resolve, reject) => {
        fixedTreeRef.value.onTreeLazyLoad(node, data => {
            resolve(data)
        })
    })
}

const ruleRef = ref();

function addSystem() {
    formSystem.value.model = {
        name: '',
        cnName: '',
        tablePrefix: '',
        description: '',
        war: true,
        environment: '',
    }
    Object.assign(dialogConfig.value, {
        show: true,
        title: computed(() => t(`新增系统`)),
        type: 'addSystem',
        showFooter: true,
        width: '60%',
    })
}

//当前页改变时触发
async function onSystemCurrPageChange(currPage) {
    y9TableConfig.value.pageConfig.currentPage = currPage;
    let params = {
        template: 1,
        page: y9TableConfig.value.pageConfig.currentPage,
        size: y9TableConfig.value.pageConfig.pageSize
    }
    const res = await getSystemList(params);
    y9TableConfig.value.tableData = res.rows;
    y9TableConfig.value.pageConfig.total = res.total;

    selectedVal.value = [];
}

//每页条数改变时触发
async function onSystemPageSizeChange(pageSize) {
    y9TableConfig.value.pageConfig.pageSize = pageSize;
    let params = {
        template: 1,
        page: y9TableConfig.value.pageConfig.currentPage,
        size: y9TableConfig.value.pageConfig.pageSize
    }
    const res = await getSystemList(params);
    y9TableConfig.value.tableData = res.rows;
    y9TableConfig.value.pageConfig.total = res.total;

    selectedVal.value = [];
}

watch(route, async (to, from) => {
    if (to.meta != null) {
        environment.value = to.meta.environment;
    }
    console.log("watch:" + environment.value);
    if (to.path == '/system' || to.path == '/localSystem') {

        //1.更新一级节点数据
        const treeData = await postNode({$level: 0}); //重新请求一级节点
        await fixedTreeRef.value.setTreeData(treeData);
        if (treeData.length > 0) {
            isShow.value = true;
            fixedTreeRef.value.onRefreshTree();
        } else {
            isShow.value = false;
        }
    }
});

</script>

<style lang="scss" scoped>
.basic-btns {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 20px;

  .btn-top {
    margin-bottom: 10px;
  }
}
</style>
