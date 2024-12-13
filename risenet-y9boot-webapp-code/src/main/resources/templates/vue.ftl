<#-- 获取第一个字符串类型的属性作为搜索字段 -->
<#assign searchCodeFieldName>
<#list codeFieldList as codeField>
<#if codeField.fieldType == 'String'>
${codeField.name?uncap_first}<#break>
</#if>
</#list>
</#assign>
<#assign searchCodeFieldcnName>
<#list codeFieldList as codeField>
<#if codeField.fieldType == 'String'>
${codeField.cnName}<#break>
</#if>
</#list>
</#assign>
<template>
    <div v-loading.fullscreen.lock="loading">
        <!-- 表格 -->
        <y9Table v-model:selectedVal="selectedRadioVal"  :config="tableConfig" :filterConfig="tableFilterConfig" @on-curr-page-change="onCurrPageChange" @on-page-size-change="onPageSizeChange">
            <template #actions>
                <el-button
                type="primary"
                class="global-btn-main"
                :size="fontSizeObj.buttonSize"
                :style="{ fontSize: fontSizeObj.baseFontSize }"
                @click="onEdit('新增')">
                    <i class="ri-add-line"></i>
                    <span>新增</span>
                </el-button>
                <el-button
                class="global-btn-third"
                :size="fontSizeObj.buttonSize"
                :style="{ fontSize: fontSizeObj.baseFontSize }"
                @click="onEdit('编辑')">
                    <i class="ri-edit-box-line"></i>
                    <span>编辑</span>
                </el-button>
                <el-button
                type="danger"
                plain
                :size="fontSizeObj.buttonSize"
                :style="{ fontSize: fontSizeObj.baseFontSize }"
                @click="onDelete">
                    <i class="ri-delete-bin-line"></i>
                    <span>删除</span>
                </el-button>
            </template>
        </y9Table>
        <!-- 弹窗 -->
        <y9Dialog v-model:config="dialogConfig">
            <template v-slot>
                <y9Form ref="formRef" :config="formConfig"></y9Form>
            </template>
        </y9Dialog>
    </div>
</template>

<script lang="ts" setup>
    import { ref, h } from 'vue';
    import { pageList, saveOrUpdate, deleteById, pageSearch, findById } from '@/api/${codeEntity.name?uncap_first}/index';
    // 注入 字体对象
    const fontSizeObj: any = inject('sizeObjInfo');
    //页面加载icon
    const loading = ref(false);
    //表格单选，当前选中值
    const selectedRadioVal = ref('')
    //表格当前的过滤数据
    const tableFilters = ref({})
    //表格配置
    const tableConfig = ref({
        loading: false,
        headerBackground: true,
        pageConfig:{//分页配置
            currentPage: 1,//当前页数
            pageSize: 10,//每页显示条目个数
        },
        columns: [
            {
                type: "radio",//单选
                title: "请选择",
                width: 100,
                fixed: 'left',//固定在左侧
                key: "id",
            },
            <#list codeFieldList as codeField>
            {
                title: "${codeField.cnName}",
                key: "${codeField.name?uncap_first}",
            },
            </#list>
            {
                title: "操作",
                fixed: 'right',//固定在右侧
                width: 200,
                render: (row) => {
                    return h('span',{
                        onClick: async () => {
                            Object.assign(dialogConfig.value,{
                                show: true,
                                title: "详情",
                                okText: false,
                                cancelText: false,
                                loading: true
                            })
                            const res = await findById(row.id);

                            if(res.success){
                                row = res.data;
                                formConfig.value.rules = {};
                                formConfig.value.itemList.forEach(item => {
                                    item.type = item.type1;
                                    item.props = {
                                        render: () => { //text类型渲染的内容
                                            return h('span', row[item.prop])
                                        }
                                    }
                                })
                            }
                            dialogConfig.value.loading = false;

                        }
                    },'详情')
                }
            },
        ],
        tableData: [],
    })

    //表格过滤配置
    const tableFilterConfig = ref({
        itemList: [
            {
                type: 'slot',//插槽类型
                span: 18,
                slotName: 'actions',
            },
            {
                type: "input",//输入框类型
                key: "${searchCodeFieldName}",
                span: 6,
                props: {
                    placeholder:"请输入${searchCodeFieldcnName}",
                }
            },
        ],
        filtersValueCallBack: async (filters) => {
            //1- 存储过滤数据对象
            tableFilters.value = filters;
            //2 -如果有过滤名称,请求接口
            getListData(tableFilters.value.${searchCodeFieldName} ? true : false);
        }
    })
    //获取列表数据
    async function getListData(isSearch = false) {
        if(!loading.value) {
            tableConfig.value.loading = true;
        }
        //发送请求参数
        let sendData = {
            page:tableConfig.value.pageConfig.currentPage,
            rows:tableConfig.value.pageConfig.pageSize,

        }
        //请求列表api
        let res = {};
        if(isSearch){
            res = await pageSearch(Object.assign(sendData,{ //搜索接口
                name: tableFilters.value.${searchCodeFieldName},
            }));
        }else {
            res = await pageList(sendData);//列表接口
        }
        if(res.success) {
            tableConfig.value.tableData = res.rows || [];//获取分页数据
            tableConfig.value.pageConfig.total = res.total;
            //默认选中第一个
            if(tableConfig.value.tableData.length){
                selectedRadioVal.value = tableConfig.value.tableData[0].id;
            }
        }
        tableConfig.value.loading = false;
    }
    getListData();//获取列表数据
    //当前页改变时触发
    function onCurrPageChange(currPage){
        tableConfig.value.pageConfig.currentPage = currPage;
        getListData(tableFilters.value.${searchCodeFieldName} ? true : false);//获取列表数据
    }
    //每页条数改变时触发
    function onPageSizeChange(pageSize){
        tableConfig.value.pageConfig.pageSize = pageSize;
        getListData(tableFilters.value.${searchCodeFieldName} ? true : false);//获取列表数据
    }
    //删除列表的某条数据
    async function onDelete(){
        if(!selectedRadioVal.value){
            ElNotification({
                title: "提示",
                message: "请选择需要删除的数据！",
                type: 'warning',
                duration: 2000,
                offset: 80,
            });
            return
        }
        const selectedInfo = tableConfig.value.tableData.find(item => item.id === selectedRadioVal.value);
        ElMessageBox.confirm(`是否删除${r' ${selectedInfo'} ? '【' + selectedInfo.name + '】' : '选中的数据'} ?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'info',
        }).then(async () => {
            loading.value = true;
            const res = await deleteById(selectedRadioVal.value);
            if(res.success){
                await getListData();//获取列表数据
            }
            ElNotification({
                title: res.success ? "成功" : "失败",
                message: res.success ? "操作成功" :"操作失败",
                type: res.success ? 'success' : 'error',
                duration: 2000,
                offset: 80,
            });

            loading.value = false;

        }) .catch(() => {
            ElMessage({
                type: 'info',
                message: '已取消删除',
                offset: 65,
            });
        });
    }
    //弹窗配置
    const dialogConfig = ref({
        show: false,
        title: "",
        width: '40%',
        onOkLoading: true,
        onOk: (newConfig) => {
            return new Promise(async (resolve, reject) => {
                const formRefInstance = formRef.value?.elFormRef;
                formRefInstance.validate(async (valid) => {
                    if(valid){//表单规则校验通过
                        let sendParams = {
                            <#list codeFieldList as codeField>
                            ${codeField.name?uncap_first}: formRef.value?.model?.${codeField.name?uncap_first},
                            </#list>
                        }
                        if(newConfig.value.title == "编辑"){
                            sendParams.id = selectedRadioVal.value;
                        }
                        const res = await saveOrUpdate(sendParams);
                        resolve();
                        if(res.success){
                            await getListData();//获取列表数据
                        }
                        ElNotification({
                            title: res.success ? "成功" : "失败",
                            message: res.success ? "操作成功" :"操作失败",
                            type: res.success ? 'success' : 'error',
                            duration: 2000,
                            offset: 80,
                        });
                    }else {
                        reject();
                    }
                })
            });
        },
    })
    //表单实例
    const formRef = ref("");
    //弹窗里的表单配置
    const formConfig = ref({
        descriptionsFormConfig:{//描述表单配置
            labelAlign:"center",
            labelWidth:"200px",
            contentWidth:"200px",
        },
        model: {}, //表单数据
        rules: {},//校验规则
        itemList: [ //表单内容
            <#list codeFieldList as codeField>
            <#if codeField.fieldType != 'Boolean' && codeField.fieldType != 'Date'>
            {
                type: "input",
                type1: "text",
                type2: "input",
                prop: "${codeField.name?uncap_first}",
                label: "${codeField.cnName}",
            },
            </#if>
            <#if codeField.fieldType == 'Boolean'>
            {
                type: "radio",
                type1: "text",
                type2: "radio",
                prop: "${codeField.name?uncap_first}",
                label: "${codeField.cnName}",
                props: {
                    radioType: "radio",
                    options: [
                        {label: "是", value: true},
                        {label: "否", value: false},
                    ],
                },
            },
            </#if>
            <#if codeField.fieldType == 'Date'>
            {
                type: "date",
                type1: "text",
                type2: "date",
                prop: "${codeField.name?uncap_first}",
                label: "${codeField.cnName}",
                props: {
                    format: "YYYY-MM-DD",
                },
            },
            </#if>
            </#list>
        ],
    })
    //新增/编辑事件
    async function onEdit(title){
        //1- 点击编辑按钮时,校验是否有选中
        if(title == '编辑' && !selectedRadioVal.value){
            ElNotification({
                title: "提示",
                message: "请选择需要编辑的数据！",
                type: 'warning',
                duration: 2000,
                offset: 80,
            });
            return
        }

        //2- 设置弹窗中的表单参数
        //设置表单数据
        formConfig.value.model = {};
        //设置表单为input类型
        formConfig.value.itemList.forEach(item => {
            item.type = item.type2;
            if(item.type == "radio"){
                item.props = {radioType: "radio",options:[{label: '是',value: true},{label: '否',value: false}]}
            }
        })
        //设置表单为input类型的校验规则
        formConfig.value.rules = {
            <#list codeFieldList as codeField>
            <#if codeField.nullable == false>
            ${codeField.name?uncap_first}: [
                   { required: true, message: '请输入${codeField.cnName}', trigger: 'blur' }
               ],
            </#if>
            </#list>
        }

        //3- 打开弹窗
        Object.assign(dialogConfig.value,{
            show: true,
            title: title,
            okText: '保存',
            cancelText: '取消',
            loading: true,
        })

        if(title == '编辑'){// 如果是 编辑 按钮则请求接口,获取具体信息
            const res = await findById(selectedRadioVal.value);
            if(res.success && res.data){
                formConfig.value.model = res.data;
            }
        }
        dialogConfig.value.loading = false;
    }
</script>
<style lang="scss" scoped>
</style>
