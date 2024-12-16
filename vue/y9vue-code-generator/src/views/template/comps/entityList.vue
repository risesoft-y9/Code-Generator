<template>
    <y9Table
            ref="tableConfig"
            :config="entityTableConfig"
            :filterConfig="filterConfig"
            @on-curr-page-change="onEntityCurrPageChange"
            @on-page-size-change="onEntityPageSizeChange"
            @on-change="handlerGetData"
    >
        <template v-slot:bnts>
            <el-button
                    class="global-btn-main"
                    type="primary"
                    @click="addEntityEntity()"
                    :style="{ fontSize: fontSizeObj.baseFontSize }"
                    :size="fontSizeObj.buttonSize"
            >
                <i class="ri-add-circle-line"></i> {{ $t('新增') }}
            </el-button>
            <el-button
                    class="global-btn-main"
                    type="primary"
                    @click="editEntity()"
                    :style="{ fontSize: fontSizeObj.baseFontSize }"
                    :size="fontSizeObj.buttonSize"
            >
                <i class="ri-edit-line"></i> {{ $t('编辑') }}
            </el-button>
        </template>

        <template v-slot:slotEntitySearch>
            <el-button
                    class="global-btn-main"
                    type="primary"
                    @click="search()"
                    :style="{ fontSize: fontSizeObj.baseFontSize }"
                    :size="fontSizeObj.buttonSize"
            ><i class="ri-search-2-line"></i>{{ $t('查询') }}
            </el-button>
        </template>
    </y9Table>
    <y9Dialog v-model:config="dialogConfig">
        <y9Form
                v-if="dialogConfig.type === 'addEntity' || dialogConfig.type === 'editEntity'"
                ref="ruleRef"
                :config="y9FormConfig"
        ></y9Form>
    </y9Dialog>
    <y9Dialog v-model:config="dialogConfig2">
        <fieldForm ref="formDialogRef" :v-if="isFormDialogOpen" @close="closeFormDialog" :entityId="entityId"/>
    </y9Dialog>
    <y9Dialog v-model:config="dialogConfigIndex">
       <indexForm ref="indexDialogRef" :v-if="isIndexDialogOpen" @close="()=>{isIndexDialogOpen=false}" :entityId="entityId"/>
    </y9Dialog>
    <y9Dialog v-model:config="dialogConfigPreview">
      <el-tabs v-model="Object.keys(previewEntities)[0]">
        <el-tab-pane
            v-for="(value, key) in previewEntities"
            :label="key"
            :name="key"
            :key="key"
        >
          <el-scrollbar height="450px">
            <el-link @click="copyText(value)" style="float: right;margin-right: 15px">
              <template #icon>
                <el-icon><DocumentCopy /></el-icon>
                复制
              </template>
            </el-link>
            <pre><p v-text="value"></p></pre>
          </el-scrollbar>
        </el-tab-pane>
      </el-tabs>
    </y9Dialog>
</template>

<script lang="ts" setup>
import {computed, h, inject, onMounted, reactive, ref, toRefs, watch} from 'vue';
import {useSettingStore} from '@/store/modules/settingStore';
import {useI18n} from 'vue-i18n';
import {ElNotification} from "element-plus";
import {deleteEntity, getEntityInfo, getEntityList, saveEntity,previewEntity} from "@/api/entity";
import {downloadEntity, generateEntity} from "@/api/export";
import FieldForm from '@/components/dialog/fieldForm.vue';
import {entityNameValidator} from '@/utils/validate';
import clipboard from "clipboard";

const {t} = useI18n();
const settingStore = useSettingStore();
const fontSizeObj: any = inject('sizeObjInfo');
const ruleRef = ref();
const isFormDialogOpen = ref(false);
const isIndexDialogOpen = ref(false);
const formDialogRef = ref(null);
const indexDialogRef = ref(null);
const props = defineProps({
    systemId: {
        //当前tree节点信息
        type: String,
        default: '',
    },
    treeNodeName: {
        type: String,
        default: '',
    },
});

// form 组件的config 值
const y9FormConfig = ref({
    model: {
        id: '',
        name: '',
        mobile: '',
        codeSystemId: '',
        cnName: '',
        tenanted: false,
    },
    rules: {
        name: [{required: true, validator: entityNameValidator, trigger: 'blur'}],
        cnName: [{required: true, message: '请输入中文名', trigger: 'blur'}],
        tenanted: [{required: true, message: '请选择', trigger: 'blur'}],
    },
    labelWidth: '120px',
    itemList: [
        {
            type: 'input',
            props: {
                type: 'text',
                placeholder: '请以大写字母开头,只能包含英文字母'
            },
            label: t('名称'),
            prop: 'name',
            required: true,
        },
        {
            type: 'input',
            props: {
                type: 'text',
                placeholder: '请输入中文名称'
            },
            label: t('中文名称'),
            prop: 'cnName',
            required: true,
        },
        {
            type: 'radio',
            props: {
                radioType: 'radio',
                options: [
                    {label: t('是'), value: true},
                    {label: t('否'), value: false},
                ],
            },
            label: t('是否多租户'),
            prop: 'tenanted',
            required: true,
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
            const ruleFormRef = ruleRef.value.elFormRef;
            if (!ruleFormRef) return;
            await ruleFormRef.validate((valid, fields) => {
                if (valid) {
                    // 通过验证
                    // 请求 新增实体 接口
                    if (dialogConfig.value.type == 'addEntity' || dialogConfig.value.type == 'editEntity') {
                        ruleRef.value.model.codeSystemId = props.systemId;
                        saveEntity(ruleRef.value.model).then(async (res) => {
                            ElNotification({
                                title: res.success ? t('成功') : t('失败'),
                                message: res.success ? t('保存成功') : t('保存失败'),
                                type: res.success ? 'success' : 'error',
                                duration: 2000,
                                offset: 80,
                            });
                            // 清空表单 数据
                            clearFormData();
                            // 重新刷新树 数据
                            loadEntityList();
                            resolve();
                        });
                    }
                } else {
                    reject();
                }
            });

        });
    },
    onCancel: (newConfig) => {
        clearFormData();
        dialogConfig.value.show = false;
    }
});
const entityId = ref('');
//字段弹窗
let dialogConfigPreview = ref({
    show: false,
    title: '预览',
    type: '',
    width: '60%',
    onOkLoading: true,
    margin: '50px auto',
});

let dialogConfig2 = ref({
  show: false,
  title: '',
  type: '',
  width: '70%',
  onOkLoading: true,
  onOk: (newConfig) => {
    return new Promise(async (resolve, reject) => {
      // 调用子组件的方法获取保存字段
      try {
        let res = await formDialogRef.value.saveFieldList(entityId.value);
        // 重新刷新树 数据
        if (res) {
          loadEntityList();
          resolve();
        } else {
          reject();
        }
      } catch (error) {
        ElNotification({
          title: '失败',
          message: error.message,
          type: 'error',
          duration: 2000,
          offset: 80,
        });
      }
    });
  },
});

let dialogConfigIndex = ref({
  show: false,
  title: '',
  type: '',
  width: '70%',
  onOkLoading: true,
  onOk: (newConfig) => {
    return new Promise(async (resolve, reject) => {
      // 调用子组件的方法获取保存字段
      try {
        let res = await indexDialogRef.value.saveIndexListMethod(entityId.value);
        // 重新刷新树 数据
        if (res) {
          loadEntityList();
          resolve();
        } else {
          reject();
        }
      } catch (error) {
        ElNotification({
          title: '失败',
          message: error.message,
          type: 'error',
          duration: 2000,
          offset: 80,
        });
      }
    });
  },
});


watch(
    () => props.systemId,
    (newVal, oldVal) => {
        if (newVal != '') {
            currentId.value = '';
            loadEntityList();
        }
    },
    {
        deep: true,
    }
);

const tableHeight = ref(document.documentElement.clientHeight - 60 - 80 - 35 - 62 - 54 - 32 - 54 - 330);
onMounted(() => {
    if (props.systemId != '') {
        loadEntityList();
    }
});
window.onresize = () => {
    return (() => {
        tableHeight.value = useSettingStore().getWindowHeight - 60 - 80 - 35 - 62 - 54 - 32 - 54 - 330;
    })();
};

const clipboardSuccess = () => {
  ElNotification({
    title: '成功',
    type: 'success',
    message: '复制成功'
  })
}

let previewEntities = ref({});

let entityTableConfig = ref({
    columns: [
        {title: '', type: 'radio', fixed: 'left', width: 70},
        {title: computed(() => t('序号')), showOverflowTooltip: false, key: 'index', width: 80},
        {title: computed(() => t('实体名称')), key: 'name'},
        {title: computed(() => t('实体中文名称')), key: 'cnName'},
        {
            title: computed(() => t('是否多租户')), key: 'tenanted',
            render: (row) => {//text类型渲染的内容
                return h('a', row?.tenanted == true ? t('是') : t('否'))
            }
        },
        {
            title: computed(() => t("操作")),
            width: '200',
            fixed: 'right',

            render: (row, params) => {
                let editActions = [
                  h(
                      'span',
                      {
                        style: {
                          marginLeft: '10px',
                          display: 'inline-flex',
                          alignItems: 'center',
                        },
                        onClick: async () => {
                          const res = await previewEntity(row.id);
                          if (res.success) {
                            // let i = 0;
                            // for (const item in res.data) {
                            //   previewEntities.value[tabsTitle[i]] = res.data[item];
                            //   i++;
                            // }
                            // i = 0;
                            // console.log("previewentities:{}",previewEntities.value)
                            previewEntities.value = res.data;
                            dialogConfigPreview.value.show = true;
                          } else {
                            ElNotification({
                              title: '失败',
                              type: 'error',
                              message: '预览失败'
                            })
                          }
                        },
                      },
                      [
                        h('i', {
                          class: 'ri-eye-line',
                          style: {
                            marginRight: '2px',
                          },
                        }),
                        //删除
                        h('span', t('')),
                      ]
                  ),
                    h(
                        'span',
                        {
                            style: {
                                marginLeft: '10px',
                                display: 'inline-flex',
                                alignItems: 'center',
                            },
                            onClick: async () => {
                                const res = await deleteEntity(row.id);
                                if (res.success) {
                                    ElNotification({
                                        title: '成功',
                                        type: 'success',
                                        message: '删除成功'
                                    })
                                } else {
                                    ElNotification({
                                        title: '失败',
                                        type: 'error',
                                        message: '删除失败'
                                    })
                                }
                                loadEntityList();
                            },
                        },
                        [
                            h('i', {
                                class: 'ri-delete-bin-line',
                                style: {
                                    marginRight: '2px',
                                },
                            }),
                            //删除
                            h('span', t('')),
                        ]
                    ),

                    h(
                        'span',
                        {
                            style: {
                                marginLeft: '12px',
                                display: 'inline-flex',
                                alignItems: 'center',
                            },
                            onClick: async () => {

                                const res = await generateEntity(row.id);
                                if (res.success) {
                                    ElNotification({
                                        title: '成功',
                                        type: 'success',
                                        message: res.msg
                                    })
                                } else {
                                    ElNotification({
                                        title: '失败',
                                        type: 'error',
                                        message: res.msg
                                    })
                                }
                            },
                        },
                        [
                            h('i', {
                                class: 'ri-file-upload-line',
                                style: {
                                    marginRight: '2px',
                                },
                            }),
                            // 生成代码
                            h('span', t('')),
                        ]
                    ),
                    h(
                        'span',
                        {
                            style: {
                                marginLeft: '12px',
                                display: 'inline-flex',
                                alignItems: 'center',
                            },
                            onClick: async () => {
                                // 实体下载
                                try {
                                    const file = await downloadEntity(row.id);
                                    const blob = new Blob([file], {type: 'application/zip'});
                                    const url = URL.createObjectURL(blob);
                                    // 创建下载链接并模拟点击下载
                                    const link = document.createElement('a');
                                    link.href = url;
                                    link.download = row.name + '.zip';
                                    link.click();

                                    // 释放URL对象
                                    window.URL.revokeObjectURL(url);
                                } catch (e) {
                                    console.log(e)
                                }
                            },
                        },
                        [
                            h('i', {
                                class: 'ri-download-2-line',
                                style: {
                                    marginRight: '2px',
                                },
                            }),
                            //查看属性
                            h('span', t('')),
                        ]
                    ),

                    h(
                        'span',
                        {
                            style: {
                                marginLeft: '12px',
                                display: 'inline-flex',
                                alignItems: 'center',
                            },
                            onClick: async () => {

                                entityId.value = row.id;
                                dialogConfig2.value.type = "editEntity";
                                dialogConfig2.value.show = true;
                                // const res = await getEntity(row.id);
                                // y9FormConfig.value.model = res.data;
                            },
                        },
                        [
                            h('i', {
                                class: 'ri-menu-line',
                                style: {
                                    marginRight: '2px',
                                },
                            }),
                            h('span', t('')),
                        ]
                    ),
                  h(
                      'span',
                      {
                        style: {
                          marginLeft: '12px',
                          display: 'inline-flex',
                          alignItems: 'center',
                        },
                        onClick: async () => {
                          entityId.value = row.id;
                          // dialogConfigIndex.value.type = "editEntity";
                          dialogConfigIndex.value.show = true;
                        },
                      },
                      [
                        h('i', {
                          class: 'ri-git-merge-line',
                          style: {
                            marginRight: '2px',
                          },
                        }),
                        h('span', t('')),
                      ]
                  ),
                ];

                return h('span', editActions);
            },
        },
    ],
    tableData: [],
    pageConfig: {
        currentPage: 1, //当前页数，支持 v-model 双向绑定
        pageSize: 20, //每页显示条目个数，支持 v-model 双向绑定
        total: 0, //总条目数
    },
    selectedVal: '',
    loading: false,
});

const copyText = (val) =>{
  clipboard.copy(val);
  clipboardSuccess();
}

const data = reactive({
    loading: false, // 全局loading
    params: {
        name: '',
    },
    editId: -1,
    filterConfig: {
        filtersValueCallBack: (filter) => {
            params.value.name = filter;
        },
        itemList: [
            {
              type: 'slot',
              slotName: 'bnts',
              span: 13,
            },
            {
                type: 'input',
                value: '',
                key: 'name',
                label: t('实体名称'),
                labelWith: '82px',
                ref: 'entityName',
                props: {
                    placeholder: '请输入实体名称',
                },
                span: 7,
            },

            {
                type: 'slot',
                slotName: 'slotEntitySearch',
                span: 4,
            },
        ],
        showBorder: true,
    },
});
var FormData = ref({});
let {loading, filterConfig, params} = toRefs(data);

function clearFormData(){
    y9FormConfig.value.model = {
        id: '',
        name: '',
        mobile: '',
        codeSystemId: '',
        cnName: '',
        tenanted: false,
    };
}

//当前页改变时触发
function onEntityCurrPageChange(currPage) {
    entityTableConfig.value.pageConfig.currentPage = currPage;
    loadEntityList();
}

//每页条数改变时触发
function onEntityPageSizeChange(pageSize) {
    entityTableConfig.value.pageConfig.pageSize = pageSize;
    loadEntityList();
}

function loadEntityList() {
    entityTableConfig.value.loading = true;
    let page = entityTableConfig.value.pageConfig.currentPage;
    let rows = entityTableConfig.value.pageConfig.pageSize;
    let query = {systemId: props.systemId, name: params.value.name.name, page: page, size: rows};
    getEntityList(query).then((res) => {
        if (res.success) {
            let tableData = res.rows;
            tableData.forEach((row, index) => {
                row.index = (page - 1) * rows + index + 1;
            });
            entityTableConfig.value.tableData = tableData;
            entityTableConfig.value.pageConfig.total = res.total;
            entityTableConfig.value.loading = false;
        }
    });
}

async function search() {
    entityTableConfig.value.pageConfig.currentPage = 1;
    loadEntityList();
}

const currentId = ref('');

// 表格 选择框 选择后获取数据
function handlerGetData(id, data) {
    currentId.value = id;
    console.log(currentId.value)
}

function addEntityEntity() {
    dialogConfig.value.type = 'addEntity';
    clearFormData();
    dialogConfig.value.show = true;
}

async function editEntity() {
    if (currentId.value == '') {
        ElNotification({
            title: "未选中",
            type: "warning",
            message: "请选择实体",
        })
        return;
    }
    dialogConfig.value.type = 'editEntity';
    dialogConfig.value.show = true;
    let res = await getEntityInfo(currentId.value);
    y9FormConfig.value.model = res.data;
}

const closeFormDialog = () => {
    isFormDialogOpen.value = false;
};


</script>
<style>
.list-tabs > .el-tabs__content {
    padding: 10px;
    color: #6b778c;
}

</style>
<style lang="scss" scoped>
:deep(.is-plain) {
  border: 1px solid var(--el-color-primary);
  margin-right: 10px;
  border-radius: 5px;

  i {
    margin-right: 5px;
  }
}
</style>
