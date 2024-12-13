<template>
    <div class="y9-title">
        描述类型的表单
        <el-button
            :size="fontSizeObj.buttonSize"
            :style="{ fontSize: fontSizeObj.baseFontSize }"
            class="global-btn-main"
            style="margin-left: 10px"
            type="primary"
            @click="onShowCode('describeForm')"
            >查看代码
        </el-button>
    </div>
    <div style="background-color: #fff; padding: 20px">
        <y9Form ref="y9FormDescribeRef" :config="describeFormConfig">
            <template #submit>
                <el-button
                    :size="fontSizeObj.buttonSize"
                    :style="{ fontSize: fontSizeObj.baseFontSize }"
                    class="global-btn-main"
                    type="primary"
                    @click="onDescribeFormSubmit"
                    >提交表单
                </el-button>
            </template>
        </y9Form>
    </div>

    <div class="y9-title">
        描述类型的表单 编辑-展示切换的简单示例
        <el-button
            :size="fontSizeObj.buttonSize"
            :style="{ fontSize: fontSizeObj.baseFontSize }"
            class="global-btn-main"
            style="margin-left: 10px"
            type="primary"
            @click="onShowCode('change-describeForm')"
            >查看代码
        </el-button>
    </div>
    <div style="background-color: #fff; padding: 20px">
        <div style="margin-bottom: 20px">
            <template v-if="isEditState">
                <el-button class="global-btn-main" type="primary" @click="onSave">保存</el-button>
                <el-button class="global-btn-second" @click="onCancel">取消</el-button>
            </template>
            <el-button v-else class="global-btn-main" type="primary" @click="onEdit">编辑</el-button>
        </div>
        <y9Form ref="y9FormChangeDescribeRef" :config="describeChangeFormConfig"></y9Form>
    </div>

    <div class="y9-title">
        典型表单
        <el-button
            :size="fontSizeObj.buttonSize"
            :style="{ fontSize: fontSizeObj.baseFontSize }"
            class="global-btn-main"
            style="margin-left: 10px"
            type="primary"
            @click="onShowCode('typical')"
            >查看代码
        </el-button>
    </div>
    <div style="background-color: #fff; padding: 20px">
        <y9Form ref="y9FormRef" :config="formConfig">
            <template #submit>
                <el-button
                    :size="fontSizeObj.buttonSize"
                    :style="{ fontSize: fontSizeObj.baseFontSize }"
                    class="global-btn-main"
                    type="primary"
                    @click="onSubmit"
                    >提交表单
                </el-button>
            </template>
        </y9Form>
    </div>

    <div class="y9-title">
        有验证的表单
        <el-button
            :size="fontSizeObj.buttonSize"
            :style="{ fontSize: fontSizeObj.baseFontSize }"
            class="global-btn-main"
            style="margin-left: 10px"
            type="primary"
            @click="onShowCode('haveRule')"
            >查看代码
        </el-button>
    </div>
    <div style="background-color: #fff; padding: 20px">
        <y9Form ref="y9FormRuleRef" :config="rulesFormConfig">
            <template #submit>
                <el-button
                    :size="fontSizeObj.buttonSize"
                    :style="{ fontSize: fontSizeObj.baseFontSize }"
                    class="global-btn-main"
                    type="primary"
                    @click="onRuleSubmit"
                    >提交表单
                </el-button>
            </template>
        </y9Form>
    </div>

    <div class="y9-title">
        行内表单
        <el-button
            :size="fontSizeObj.buttonSize"
            :style="{ fontSize: fontSizeObj.baseFontSize }"
            class="global-btn-main"
            style="margin-left: 10px"
            type="primary"
            @click="onShowCode('inlineForm')"
            >查看代码
        </el-button>
    </div>
    <div style="background-color: #fff; padding: 20px">
        <y9Form :config="inlineFormConfig"></y9Form>
    </div>

    <p style="color: red; margin-top: 40px">
        温馨提示:该组件根据elment-plus的Form组件的基础上进行二次封装,如果看以下文档仍然不理解用法,可以查看elment-plus的官网说明
        <a href="https://element-plus.gitee.io/en-US/component/form.html#form">传送门</a>
    </p>

    <div class="y9-title">y9Form属性说明表</div>
    <y9Table :config="attrTableConfig"></y9Table>

    <div class="y9-title">itemList属性下的props属性配置</div>
    <el-tabs v-model="propsActiveName" class="demo-tabs" type="border-card">
        <el-tab-pane v-for="(item, index) in propsTabsArr" :key="index" :label="item" :name="item">
            <y9Table v-if="item == 'select'" :config="selectTableConfig"></y9Table>
            <y9Table v-if="item == 'input'" :config="inputTableConfig"></y9Table>
            <y9Table v-if="item == 'textarea'" :config="textareaTableConfig"></y9Table>
            <y9Table v-if="item == 'date'" :config="dateTableConfig"></y9Table>
            <y9Table v-if="item == 'time'" :config="timeTableConfig"></y9Table>
            <y9Table v-if="item == 'timeSelect'" :config="timeSelectTableConfig"></y9Table>
            <y9Table v-if="item == 'radio'" :config="radioTableConfig"></y9Table>
            <y9Table v-if="item == 'checkbox'" :config="checkboxTableConfig"></y9Table>
            <y9Table v-if="item == 'switch'" :config="switchTableConfig"></y9Table>
            <y9Table v-if="item == 'upload'" :config="uploadTableConfig"></y9Table>
            <y9Table v-if="item == 'table'" :config="tableTableConfig"></y9Table>
            <y9Table v-if="item == 'text'" :config="textTableConfig"></y9Table>
            <y9Table v-if="item == 'slot'" :config="slotTableConfig"></y9Table>
        </el-tab-pane>
    </el-tabs>

    <div class="y9-title">y9Form实例方法说明表</div>
    <y9Table :config="instanceTableConfig"></y9Table>

    <y9Dialog v-model:config="codeDialogConfig">
        <pre class="y9-code">
			<code id="code">
				{{ codeDialogConfig.codeText }}
			</code>
		</pre>
    </y9Dialog>
</template>

<script lang="ts" setup>
    import { inject, ref } from 'vue';
    import { $keyNameAssign } from '@/utils/object'; // 注入 字体对象
    // 注入 字体对象
    const fontSizeObj: any = inject('sizeObjInfo');

    //描述类型的表单
    const describeFormConfig = ref({
        descriptionsFormConfig: {
            //描述表单配置
            labelAlign: 'center',
            labelWidth: '200px',
            contentWidth: '200px'
        },
        model: {},
        rules: {
            name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
            sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
            zhiwu: [{ required: true, message: '请选择职务', trigger: 'change' }]
        },
        itemList: [
            {
                type: 'input',
                prop: 'name',
                label: '姓名'
            },
            {
                type: 'radio',
                prop: 'sex',
                label: '性别',
                props: {
                    options: [
                        {
                            value: 1,
                            label: '男'
                        },
                        {
                            value: 0,
                            label: '女'
                        }
                    ]
                }
            },
            {
                type: 'select',
                prop: 'zhiwu',
                label: '职务',
                props: {
                    options: [
                        {
                            label: '选项1',
                            value: 'opt1'
                        },
                        {
                            label: '选项2',
                            value: 'opt2'
                        }
                    ]
                }
            },
            {
                type: 'slot',
                props: {
                    slotName: 'submit' //插槽名称
                }
            }
        ]
    });

    let y9FormDescribeRef = ref();

    function onDescribeFormSubmit() {
        y9FormDescribeRef.value.elFormRef.validate((valid) => {
            if (valid) {
                console.log('校验通过，表单数据为：', y9FormDescribeRef.value.model);
            } else {
                console.log('校验不通过');
            }
        });
    }

    //描述类型的表单 编辑-展示切换的简单示例
    const describeChangeFormConfig = ref({
        descriptionsFormConfig: {
            //描述表单配置
            labelAlign: 'center',
            labelWidth: '200px',
            contentWidth: '200px'
        },
        model: {
            //表单对象
            name: '',
            sex: '',
            zhiwu: ''
        },
        rules: {}, //表单校验规则
        itemList: [
            {
                type: 'text',
                type1: 'input', //自定义字段-编辑时显示的类型
                type2: 'text', //自定义字段-非编辑状态显示文本类型
                prop: 'name',
                label: '姓名',
                props: {
                    render: () => {
                        //text类型渲染的内容
                        return h('span', showInfo.value?.name);
                    }
                }
            },
            {
                type: 'text',
                type1: 'radio',
                type2: 'text',
                prop: 'sex',
                label: '性别',
                props: {
                    options: [
                        {
                            value: 1,
                            label: '男'
                        },
                        {
                            value: 0,
                            label: '女'
                        }
                    ],
                    render: () => {
                        //text类型渲染的内容
                        return h('span', showInfo.value?.sex === 0 ? '女' : '男');
                    }
                }
            },
            {
                type: 'text',
                type1: 'select',
                type2: 'text',
                prop: 'zhiwu',
                label: '职务',
                required: true,
                props: {
                    options: [
                        {
                            label: '队长',
                            value: 'duizhang'
                        },
                        {
                            label: '旗长',
                            value: 'qizhang'
                        }
                    ],
                    render: () => {
                        //text类型渲染的内容
                        return h('span', showInfo.value?.zhiwu === 'duizhang' ? '队长' : '旗长');
                    }
                }
            }
        ]
    });

    //非编辑状态的展示信息
    const showInfo = ref({
        name: 'y9组件',
        sex: 0,
        zhiwu: 'duizhang'
    });
    const isEditState = ref(false); //是否为编辑状态
    const y9FormChangeDescribeRef = ref(); //表单实例
    //改变y9Form显示类型
    function changeY9FormType(isEdit) {
        if (isEdit) {
            //编辑状态设置表单校验规则
            describeChangeFormConfig.value.rules = {
                name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
                sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
                zhiwu: [{ required: true, message: '请选择职务', trigger: 'change' }]
            };
        } else {
            //非编辑状态取消表单校验
            describeChangeFormConfig.value.rules = {};
        }
        //编辑模式显示type1类型 非编辑模式显示type2类型
        describeChangeFormConfig.value.itemList.forEach((item) => {
            item.type = isEdit ? item.type1 : item.type2;
        });
    }

    //监听是否编辑状态
    watch(
        () => isEditState.value,
        (isEdit) => {
            if (isEdit) {
                //编辑状态
                $keyNameAssign(describeChangeFormConfig.value.model, showInfo.value); //编辑状态给表单赋值
            }
            changeY9FormType(isEdit);
        }
    );

    //编辑按钮事件
    function onEdit() {
        isEditState.value = true;
    }

    //取消按钮事件
    function onCancel() {
        isEditState.value = false;
    }

    //保存按钮事件
    function onSave() {
        y9FormChangeDescribeRef.value.elFormRef.validate((valid) => {
            if (valid) {
                console.log('校验通过，表单数据为：', y9FormChangeDescribeRef.value.model);
                showInfo.value = y9FormChangeDescribeRef.value.model;
                isEditState.value = false;
            } else {
                console.log('校验不通过');
            }
        });
    }

    //典型表单
    let formConfig = ref({
        model: {
            input1: '我是默认值',
            radio2: 'opt2'
        },
        itemList: [
            {
                type: 'input',
                prop: 'input1',
                label: '输入框'
            },
            {
                type: 'input',
                prop: 'input2',
                label: '有前置后置内容的输入框',
                props: {
                    prependText: 'https://',
                    appendText: '.com'
                }
            },
            {
                type: 'select',
                prop: 'select1',
                label: '单选下拉框',
                props: {
                    options: [
                        {
                            label: '选项1',
                            value: 'opt1'
                        },
                        {
                            label: '选项2',
                            value: 'opt2'
                        }
                    ]
                }
            },
            {
                type: 'select',
                prop: 'select2',
                label: '多选下拉框',
                props: {
                    multiple: true,
                    options: [
                        {
                            label: '选项1',
                            value: 'opt1'
                        },
                        {
                            label: '选项2',
                            value: 'opt2'
                        }
                    ]
                }
            },
            {
                type: 'date',
                label: '日期选择器',
                prop: 'date'
            },
            {
                type: 'time',
                label: '时间选择器',
                prop: 'time',
                props: {
                    valueFormat: 'HH:mm:ss'
                }
            },
            {
                type: 'timeSelect',
                label: '时间选择',
                prop: 'timeSelect',
                props: {
                    start: '08:30',
                    step: '00:15',
                    end: '18:30'
                }
            },
            {
                type: 'radio', //单选框类型
                prop: 'radio1',
                label: '单选框1', //标签文本。类型：string
                props: {
                    //单选框类型的属性
                    radioType: 'radio', //单选框展示类型：radio、button
                    options: [
                        {
                            label: '选项1',
                            value: 'opt1'
                            // disabled:true,//是否禁用该选项，没有disabled字段默认为false
                            // border:true,//是否显示边框，当radioType='radio'时才有这个配置
                        },
                        {
                            label: '选项2',
                            value: 'opt2'
                            // disabled:true,//是否禁用该选项，没有disabled字段默认为false
                            // border:true,//是否显示边框，当radioType='radio'时才有这个配置
                        }
                    ]
                }
            },
            {
                type: 'radio', //单选框类型
                prop: 'radio2',
                label: '单选框2', //标签文本。类型：string
                props: {
                    //单选框类型的属性
                    radioType: 'radio', //单选框展示类型：radio、button
                    options: [
                        {
                            label: '选项1',
                            value: 'opt1',
                            border: true //是否显示边框，当radioType='radio'时才有这个配置
                        },
                        {
                            label: '选项2',
                            value: 'opt2',
                            border: true //是否显示边框，当radioType='radio'时才有这个配置
                        }
                    ]
                }
            },
            {
                type: 'radio', //单选框类型
                prop: 'radio3',
                label: '单选框3', //标签文本。类型：string
                props: {
                    //单选框类型的属性
                    radioType: 'button', //单选框展示类型：radio、button
                    options: [
                        {
                            label: '选项1',
                            value: 'opt1'
                        },
                        {
                            label: '选项2',
                            value: 'opt2'
                        }
                    ]
                }
            },
            {
                type: 'checkbox', //多选框类型
                prop: 'checkbox1',
                label: '多选框1', //标签文本。类型：string
                props: {
                    //多选框类型的属性
                    checkboxType: 'checkbox', //多选框展示类型：checkbox、button
                    showCheckedAll: true, //是否显示全选功能
                    isCheckedAll: false, //是否全选
                    options: [
                        {
                            label: '选项1',
                            value: 'opt1'
                            // border:true,//是否显示边框，当checkboxType='checkbox'时才有这个配置
                            // disabled:true,//是否禁用该选项，没有disabled字段默认为false
                        },
                        {
                            label: '选项2',
                            value: 'opt2'
                            // border:true,//是否显示边框，当checkboxType='checkbox'时才有这个配置
                            // disabled:true,//是否禁用该选项，没有disabled字段默认为false
                        },
                        {
                            label: '选项3',
                            value: 'opt3'
                            // border:true,//是否显示边框，当checkboxType='checkbox'时才有这个配置
                            // disabled:true,//是否禁用该选项，没有disabled字段默认为false
                        }
                    ]
                }
            },
            {
                type: 'checkbox', //多选框类型
                prop: 'checkbox2',
                label: '多选框2', //标签文本。类型：string
                props: {
                    //多选框类型的属性
                    checkboxType: 'checkbox', //多选框展示类型：checkbox、button
                    showCheckedAll: true, //是否显示全选功能
                    isCheckedAll: false, //是否全选
                    options: [
                        {
                            label: '选项1',
                            value: 'opt1',
                            border: true //是否显示边框，当checkboxType='checkbox'时才有这个配置
                        },
                        {
                            label: '选项2',
                            value: 'opt2',
                            border: true //是否显示边框，当checkboxType='checkbox'时才有这个配置
                        },
                        {
                            label: '选项3',
                            value: 'opt3',
                            border: true //是否显示边框，当checkboxType='checkbox'时才有这个配置
                        }
                    ]
                }
            },
            {
                type: 'checkbox', //多选框类型
                prop: 'checkbox3',
                label: '多选框3', //标签文本。类型：string
                props: {
                    //多选框类型的属性
                    checkboxType: 'button', //多选框展示类型：checkbox、button
                    showCheckedAll: true, //是否显示全选功能
                    isCheckedAll: true, //是否全选
                    options: [
                        {
                            label: '选项1',
                            value: 'opt1'
                        },
                        {
                            label: '选项2',
                            value: 'opt2'
                        },
                        {
                            label: '选项3',
                            value: 'opt3'
                        }
                    ]
                }
            },
            {
                type: 'switch', //switch开关类型
                label: 'switch开关', //标签文本。类型：string
                prop: 'switch'
            },
            {
                type: 'upload',
                prop: 'upload',
                label: '上传图片', //标签文本。类型：string
                props: {
                    defaultCustomClass: 'custom-picture',
                    listType: 'picture-card', //"text" | "picture" | "picture-card"
                    limit: 1,
                    drag: true,
                    accept: 'image/jpeg,image/jpg,image/png'
                }
            },
            {
                type: 'table', //表格类型
                label: '表格',
                prop: 'table',
                props: {
                    width: '100%',
                    config: {
                        //表格配置,具体配置查看y9Table组件
                        headerBackground: true,
                        border: false,
                        columns: [
                            {
                                type: 'selection'
                            },
                            {
                                title: '名称',
                                key: 'name'
                            },
                            {
                                title: '描述',
                                key: 'describe'
                            }
                        ],
                        tableData: [
                            {
                                id: '1',
                                name: '小鸥鸟1',
                                describe: '1111111'
                            },
                            {
                                id: '2',
                                name: '小鸥鸟2',
                                describe: '2222222'
                            }
                        ]
                    }
                }
            },
            {
                type: 'textarea',
                label: '文本域',
                prop: 'textarea'
                // props:{
                // 	slotName:"submit",//插槽名称
                // },
            },
            {
                type: 'text', //文本类型类型
                label: '文本1', //标签文本。类型：string
                props: {
                    content: '我是文本' //文本内容
                }
            },
            {
                type: 'slot',
                label: '自定义插槽按钮',
                props: {
                    slotName: 'submit' //插槽名称
                }
            }
        ]
    });
    let y9FormRef = ref();

    function onSubmit() {
        console.log('表单数据：', y9FormRef.value.model);
    }

    //有验证的表单
    let rulesFormConfig = ref({
        model: {},
        rules: {
            name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
            sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
            zhiwu: [{ required: true, message: '请选择职务', trigger: 'change' }]
        },
        itemList: [
            {
                type: 'input',
                prop: 'name',
                label: '姓名',
                required: true
            },
            {
                type: 'radio',
                prop: 'sex',
                label: '性别',
                required: true,
                props: {
                    options: [
                        {
                            value: 'male',
                            label: '男'
                        },
                        {
                            value: 'famale',
                            label: '女'
                        }
                    ]
                }
            },
            {
                type: 'select',
                prop: 'zhiwu',
                label: '职务',
                required: true,
                props: {
                    options: [
                        {
                            label: '选项1',
                            value: 'opt1'
                        },
                        {
                            label: '选项2',
                            value: 'opt2'
                        }
                    ]
                }
            },
            {
                type: 'slot',
                props: {
                    slotName: 'submit' //插槽名称
                }
            }
        ]
    });

    let y9FormRuleRef = ref();

    function onRuleSubmit() {
        y9FormRuleRef.value.elFormRef.validate((valid) => {
            if (valid) {
                console.log('校验通过，表单数据为：', y9FormRuleRef.value.model);
            } else {
                console.log('校验不通过');
            }
        });
    }

    //行内表单
    let inlineFormConfig = ref({
        model: {},
        inline: true,
        itemList: [
            {
                type: 'input',
                prop: 'name',
                label: '姓名'
            },
            {
                type: 'radio',
                prop: 'sex',
                label: '性别',
                props: {
                    options: [
                        {
                            value: 'male',
                            label: '男'
                        },
                        {
                            value: 'famale',
                            label: '女'
                        }
                    ]
                }
            },
            {
                type: 'select',
                prop: 'zhiwu',
                label: '职务',
                props: {
                    options: [
                        {
                            label: '选项1',
                            value: 'opt1'
                        },
                        {
                            label: '选项2',
                            value: 'opt2'
                        }
                    ]
                }
            }
        ]
    });

    //y9Form属性说明表
    let attrTableConfig = ref({
        showOverflowTooltip: false,
        headerBackground: true, //头部背景颜色
        pageConfig: false, //无分页
        border: false, //无边框
        columns: [
            {
                title: '属性',
                key: 'attr',
                align: 'left'
            },
            {
                title: '说明',
                key: 'explain'
            },

            {
                title: '类型',
                key: 'type'
            },
            {
                title: '可选值',
                key: 'optionalValue'
            },
            {
                title: '默认值',
                key: 'defaultValue'
            }
        ],
        tableData: [
            {
                attr: '* config',
                explain: '表单配置，具体展开查看下列属性',
                type: 'object',
                id: 'config',
                children: [
                    {
                        attr: 'model',
                        explain: '初始化表单数据，并非双向绑定，可以通过表单实例获取最新的表单数据',
                        type: 'object',
                        optionalValue: '',
                        defaultValue: ''
                    },

                    {
                        attr: 'itemList',
                        explain: "表单配置列表,例如：[{type:'input',prop:'name',span:6}]",
                        type: 'array',
                        optionalValue: '',
                        defaultValue: '具体展开查看下列属性',
                        id: 'itemList',
                        children: [
                            {
                                attr: '* type',
                                explain:
                                    '表单类型，可选值有：input | textarea | select | date | timeSelect | time | radio | checkbox | switch | upload | table  | text | slot',
                                type: 'string',
                                optionalValue:
                                    'input | textarea | select | date | timeSelect | time | radio | checkbox | switch | upload | table  | text | slot',
                                defaultValue: ''
                            },
                            {
                                attr: '* prop',
                                explain: "model 的键名。 它可以是一个路径数组(例如 ['a', 'b', 0])。",
                                type: 'string | string[]',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                attr: 'props',
                                explain: '属性配置，每个类型的属性配置都不一样，具体查看props说明表',
                                type: 'object',
                                optionalValue: ''
                            },
                            {
                                attr: 'label',
                                explain: '标签文本',
                                type: 'string',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                attr: 'labelWidth',
                                explain: "标签文本的宽度，例如 '50px' 可以使用 auto。",
                                type: 'string | number',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                attr: 'required',
                                explain: '是否为必填项，如不设置，则会根据校验规则确认',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                attr: 'rules',
                                explain: '表单验证规则',
                                type: 'FormItemRule | FormItemRule[]',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                attr: 'error',
                                explain:
                                    '表单域验证错误时的提示信息。设置该值会导致表单验证状态变为 error，并显示该错误信息',
                                type: 'string',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                attr: 'showMessage',
                                explain: '是否显示校验错误信息',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'true'
                            },
                            {
                                attr: 'inlineMessage',
                                explain: '是否在行内显示校验信息',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'false'
                            },
                            {
                                attr: 'size',
                                explain: "用于控制该表单域下组件的默认尺寸，可选值：'large' | 'default' | 'small'",
                                type: 'string',
                                optionalValue: "'large' | 'default' | 'small'",
                                defaultValue: 'default'
                            },
                            {
                                attr: 'span',
                                explain: '列的数量，(仅在描述类型的表单生效)',
                                type: 'number',
                                optionalValue: '',
                                defaultValue: '1'
                            },
                            {
                                attr: 'labelAlign',
                                explain:
                                    '列的标签对齐方式，若不设置该项，则使用descriptionsFormConfig配置的labelAlign对齐方式，(仅在描述类型的表单生效)',
                                type: 'string',
                                optionalValue: 'left / center / right',
                                defaultValue: 'left'
                            },
                            {
                                attr: 'className',
                                explain: '列的内容自定义类名，(仅在描述类型的表单生效)',
                                type: 'string',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                attr: 'labelClassName',
                                explain: '列的标签自定义类名，(仅在描述类型的表单生效)',
                                type: 'string',
                                optionalValue: '',
                                defaultValue: ''
                            }
                        ]
                    },
                    {
                        attr: 'rules',
                        explain: '表单验证规则',
                        type: 'FormRules',
                        optionalValue: '',
                        defaultValue: ''
                    },
                    {
                        attr: 'descriptionsFormConfig',
                        explain: '描述类型的表单，如果需要此种类型的表单，就配置此字段',
                        type: 'boolean|object ',
                        optionalValue: '',
                        defaultValue: 'false',
                        id: 'descriptionsFormConfig',
                        children: [
                            {
                                attr: 'labelAlign',
                                explain: '标签文本对齐方式。',
                                type: 'string',
                                optionalValue: 'left / center / right',
                                defaultValue: 'left'
                            },
                            {
                                attr: 'labelWidth',
                                explain: '标签文本宽度',
                                type: 'string',
                                optionalValue: '',
                                defaultValue: 'auto'
                            },
                            {
                                attr: 'contentWidth',
                                explain: '内容宽度',
                                type: 'string',
                                optionalValue: '',
                                defaultValue: 'auto'
                            },
                            {
                                attr: 'border',
                                explain: '是否带有边框',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'true'
                            },
                            {
                                attr: 'column',
                                explain: '一行的数量',
                                type: 'number',
                                optionalValue: '',
                                defaultValue: '1'
                            },
                            {
                                attr: 'direction',
                                explain: '排列的方向',
                                type: 'string',
                                optionalValue: 'vertical / horizontal',
                                defaultValue: 'horizontal'
                            },
                            {
                                attr: 'title',
                                explain: '表单标题文本，显示在左上方',
                                type: 'string',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                attr: 'titleSlot',
                                explain: '表单标题插槽名称',
                                type: 'string',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                attr: 'extra',
                                explain: '表单操作区文本，显示在右上方',
                                type: 'string',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                attr: 'extraSlot',
                                explain: '表单操作区插槽名称',
                                type: 'string',
                                optionalValue: '',
                                defaultValue: ''
                            }
                        ]
                    },
                    {
                        attr: 'inline',
                        explain: '行内表单模式',
                        type: 'boolean',
                        optionalValue: '',
                        defaultValue: 'false'
                    },
                    {
                        attr: 'labelPosition',
                        explain: '表单域标签的位置， 当设置为 left 或 right 时，则也需要设置 label-width 属性',
                        type: 'boolean',
                        optionalValue: "'left' | 'right' | 'top'",
                        defaultValue: 'right'
                    },
                    {
                        attr: 'labelWidth',
                        explain:
                            "标签的长度，例如 '50px'。作为 Form 直接子元素的 form-item 会继承该值。 可以使用 auto。",
                        type: 'string | number',
                        optionalValue: '',
                        defaultValue: 'auto'
                    },
                    {
                        attr: 'labelSuffix',
                        explain: '表单域标签的后缀',
                        type: 'string',
                        optionalValue: '',
                        defaultValue: ''
                    },
                    {
                        attr: 'hideRequiredAsterisk',
                        explain: '是否隐藏必填字段的标签旁边的红色星号',
                        type: 'boolean',
                        optionalValue: 'true | false',
                        defaultValue: 'false'
                    },
                    {
                        attr: 'showMessage',
                        explain: '是否显示校验错误信息',
                        type: 'boolean',
                        optionalValue: 'true | false',
                        defaultValue: 'true'
                    },
                    {
                        attr: 'inlineMessage',
                        explain: '是否以行内形式展示校验信息',
                        type: 'boolean',
                        optionalValue: 'true | false',
                        defaultValue: 'false'
                    },
                    {
                        attr: 'statusIcon',
                        explain: '是否在输入框中显示校验结果反馈图标',
                        type: 'boolean',
                        optionalValue: 'true | false',
                        defaultValue: 'false'
                    },
                    {
                        attr: 'validateOnRuleChange',
                        explain: '是否在 rules 属性改变后立即触发一次验证',
                        type: 'boolean',
                        optionalValue: 'true | false',
                        defaultValue: 'false'
                    },
                    {
                        attr: 'disabled',
                        explain: '是否禁用该表单内的所有组件，如果设置为 true, 它将覆盖内部组件的 disabled 属性',
                        type: 'boolean',
                        optionalValue: 'true | false',
                        defaultValue: 'false'
                    },
                    {
                        attr: 'size',
                        explain: '用于控制该表单内组件的尺寸',
                        type: 'string',
                        optionalValue: "'large' | 'default' | 'small'",
                        defaultValue: 'default'
                    }
                ]
            }
        ]
    });

    //itemList属性下的props属性配置
    let propsActiveName = ref('select');
    let propsTabsArr = ref([
        'select',
        'input',
        'textarea',
        'date',
        'time',
        'timeSelect',
        'radio',
        'checkbox',
        'switch',
        'upload',
        'table',
        'text',
        'slot'
    ]);
    let selectTableConfig = ref({
        showOverflowTooltip: false,
        headerBackground: true, //头部背景颜色
        pageConfig: false, //无分页
        border: false, //无边框
        columns: [
            {
                title: '属性',
                key: 'attr'
            },
            {
                title: '说明',
                key: 'explain'
            },
            {
                title: '类型',
                key: 'type'
            },
            {
                title: '可选值',
                key: 'optionalValue'
            },
            {
                title: '默认值',
                key: 'defaultValue'
            }
        ],
        tableData: [
            {
                attr: '* options',
                explain: '选项列表',
                type: 'array',
                optionalValue: '指定label，value字段',
                defaultValue: `举例：[{
						label:"选项1",
						value:"opt1"
					}]`
            },
            {
                attr: 'multiple',
                explain: '是否可多选，多选时，value为array类型，单选时，数组为string类型',
                type: 'array',
                optionalValue: 'true | false',
                defaultValue: `false`
            },
            {
                attr: 'placeholder',
                explain: '占位符',
                type: 'string',
                optionalValue: '',
                defaultValue: `请选择`
            },
            {
                attr: 'clearable',
                explain: '是否可清空',
                type: 'string',
                optionalValue: 'true | false',
                defaultValue: `true`
            },
            {
                attr: 'width',
                explain: '选择框宽度',
                type: 'string',
                optionalValue: '',
                defaultValue: `100%`
            },
            {
                attr: 'disabled',
                explain: '是否禁用',
                type: 'boolean',
                optionalValue: '',
                defaultValue: `false`
            },
            {
                attr: 'valueKey',
                explain: '作为 value 唯一标识的键名，绑定值为对象类型时必填',
                type: 'string',
                optionalValue: '',
                defaultValue: `value`
            },
            {
                attr: 'collapseTags',
                explain: '多选时是否将选中值按文字的形式展示',
                type: 'boolean',
                optionalValue: '',
                defaultValue: `false`
            },
            {
                attr: 'collapseTagsTooltip',
                explain:
                    '当鼠标悬停于折叠标签的文本时，是否显示所有选中的标签。 要使用此属性，collapse-tags属性必须设定为 true',
                type: 'boolean',
                optionalValue: '',
                defaultValue: `false`
            },
            {
                attr: 'multipleLimit',
                explain: 'multiple 属性设置为 true 时，代表多选场景下用户最多可以选择的项目数， 为 0 则不限制',
                type: 'number',
                optionalValue: '',
                defaultValue: `0`
            },
            {
                attr: 'name',
                explain: 'Select 输入框的原生 name 属性',
                type: 'string',
                optionalValue: '',
                defaultValue: ``
            },
            {
                attr: 'effect',
                explain: 'Tooltip 主题，内置了 dark / light 两种',
                type: 'string',
                optionalValue: 'dark / ligh',
                defaultValue: `light`
            },
            {
                attr: 'autocomplete',
                explain: 'Select 输入框的原生 autocomplete 属性',
                type: 'string',
                optionalValue: '',
                defaultValue: `off`
            },
            {
                attr: 'filterable',
                explain: 'Select 组件是否可筛选',
                type: 'boolean',
                optionalValue: '',
                defaultValue: `false`
            },
            {
                attr: 'allowCreate',
                explain: '是否允许用户创建新条目， 只有当 filterable 设置为 true 时才会生效',
                type: 'boolean',
                optionalValue: '',
                defaultValue: `false`
            },
            {
                attr: 'filterMethod',
                explain: '自定义筛选方法',
                type: 'function',
                optionalValue: '',
                defaultValue: ``
            },
            {
                attr: 'remote',
                explain: '其中的选项是否从服务器远程加载',
                type: 'boolean',
                optionalValue: '',
                defaultValue: `false`
            },
            {
                attr: 'remoteMethod',
                explain: '自定义远程搜索方法',
                type: 'function',
                optionalValue: '',
                defaultValue: ``
            },
            {
                attr: 'remoteShowSuffix',
                explain: '远程搜索方法显示后缀图标',
                type: 'boolean',
                optionalValue: '',
                defaultValue: `false`
            },
            {
                attr: 'loading',
                explain: '是否正在从远程获取数据',
                type: 'boolean',
                optionalValue: '',
                defaultValue: `false`
            },
            {
                attr: 'loadingText',
                explain: '从服务器加载内容时显示的文本',
                type: 'string',
                optionalValue: '',
                defaultValue: `Loading`
            },
            {
                attr: 'noMatchText',
                explain: '搜索条件无匹配时显示的文字，也可以使用 empty 插槽设置',
                type: 'string',
                optionalValue: '',
                defaultValue: `No matching data`
            },
            {
                attr: 'noDataText',
                explain: '无选项时显示的文字，也可以使用 empty 插槽设置自定义内容',
                type: 'string',
                optionalValue: '',
                defaultValue: `No data`
            },
            {
                attr: 'popperClass',
                explain: '选择器下拉菜单的自定义类名',
                type: 'string',
                optionalValue: '',
                defaultValue: ``
            },
            {
                attr: 'reserveKeyword',
                explain: '当 multiple 和 filter被设置为 true 时，是否在选中一个选项后保留当前的搜索关键词',
                type: 'boolean',
                optionalValue: '',
                defaultValue: `true`
            },
            {
                attr: 'defaultFirstOption',
                explain: '是否在输入框按下回车时，选择第一个匹配项。 需配合 filterable 或 remote 使用',
                type: 'boolean',
                optionalValue: '',
                defaultValue: `false`
            },
            {
                attr: 'teleported',
                explain: '该下拉菜单是否使用teleport插入body元素',
                type: 'boolean',
                optionalValue: '',
                defaultValue: `true`
            },
            {
                attr: 'persistent',
                explain: '当下拉选择器未被激活并且persistent设置为false，选择器会被删除',
                type: 'boolean',
                optionalValue: '',
                defaultValue: `true`
            },
            {
                attr: 'automaticDropdown',
                explain: '对于不可过滤的 Select 组件，此属性决定是否在输入框获得焦点后自动弹出选项菜单',
                type: 'boolean',
                optionalValue: '',
                defaultValue: `false`
            },
            {
                attr: 'clearIcon',
                explain: '自定义清除图标',
                type: 'string | Component',
                optionalValue: '',
                defaultValue: `CircleClose`
            },
            {
                attr: 'fitInputWidth',
                explain: '下拉框的宽度是否与输入框相同',
                type: 'boolean',
                optionalValue: '',
                defaultValue: `false`
            },
            {
                attr: 'suffixIcon',
                explain: '自定义后缀图标组件',
                type: 'string | Component',
                optionalValue: '',
                defaultValue: `ArrowDown`
            },
            {
                attr: 'suffixTransition',
                explain: '下拉菜单显示/消失时后缀图标的动画',
                type: 'boolean',
                optionalValue: '',
                defaultValue: `true`
            },
            {
                attr: 'tagType',
                explain: '标签类型',
                type: 'string',
                optionalValue: 'success/info/warning/danger',
                defaultValue: `info`
            },
            {
                attr: 'validateEvent',
                explain: '是否触发表单验证',
                type: 'boolean',
                optionalValue: '',
                defaultValue: `true`
            },
            {
                attr: 'placement',
                explain: '下拉框出现的位置',
                type: 'string',
                optionalValue:
                    'top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end',
                defaultValue: `bottom-start`
            },
            {
                attr: 'events',
                explain: '事件配置',
                type: 'object',
                optionalValue: '',
                defaultValue: ``,
                id: 'events',
                children: [
                    {
                        attr: 'change',
                        explain: '选中值发生变化时触发。回调参数：val，目前的选中值',
                        type: 'function',
                        optionalValue: '',
                        defaultValue: ``
                    },
                    {
                        attr: 'blur',
                        explain: '当 input 失去焦点时触发。回调参数：(event: FocusEvent)。',
                        type: 'function',
                        optionalValue: '',
                        defaultValue: ``
                    },
                    {
                        attr: 'focus',
                        explain: '当 input 获得焦点时触发。回调参数：(event: FocusEvent)。',
                        type: 'function',
                        optionalValue: '',
                        defaultValue: ``
                    },
                    {
                        attr: 'removeTag',
                        explain: '多选模式下移除tag时触发。回调参数：val，移除的tag值',
                        type: 'function',
                        optionalValue: '',
                        defaultValue: ``
                    },
                    {
                        attr: 'visibleChange',
                        explain: '下拉框出现/隐藏时触发。回调参数：val，出现则为 true，隐藏则为 false',
                        type: 'function',
                        optionalValue: '',
                        defaultValue: ``
                    },
                    {
                        attr: 'clear',
                        explain: '可清空的单选模式下用户点击清空按钮时触发。',
                        type: 'function',
                        optionalValue: '',
                        defaultValue: ``
                    }
                ]
            }
        ]
    });
    let inputTableConfig = ref({
        showOverflowTooltip: false,
        headerBackground: true, //头部背景颜色
        pageConfig: false, //无分页
        border: false, //无边框
        columns: [
            {
                title: '属性',
                key: 'attr'
            },
            {
                title: '说明',
                key: 'explain'
            },
            {
                title: '类型',
                key: 'type'
            },
            {
                title: '可选值',
                key: 'optionalValue'
            },
            {
                title: '默认值',
                key: 'defaultValue'
            }
        ],
        tableData: [
            {
                attr: 'type',
                explain: 'ext，textarea，和其他原生input的type值',
                type: '',
                optionalValue: '',
                defaultValue: `text`
            },
            {
                attr: 'disabled',
                explain: '是否禁用',
                type: 'boolean',
                optionalValue: '',
                defaultValue: `false`
            },
            {
                attr: 'width',
                explain: '输入框宽度',
                type: 'string',
                optionalValue: '',
                defaultValue: `100%`
            },
            {
                attr: 'placeholder',
                explain: '占位符',
                type: 'string',
                optionalValue: '',
                defaultValue: `请输入`
            },
            {
                attr: 'clearable',
                explain: '是否可清空',
                type: 'string',
                optionalValue: 'true | false',
                defaultValue: `true`
            },
            {
                attr: 'type',
                explain: 'text，textarea，和其他原生input的type值',
                type: 'string',
                optionalValue: '',
                defaultValue: `text`
            },
            {
                attr: 'formatter',
                explain: '指定输入值的格式。(只有当 type 是text时才能工作)。',
                type: 'function(value: string / number): string',
                optionalValue: '',
                defaultValue: ``
            },
            {
                attr: 'parser',
                explain: '指定从格式化器输入中提取的值。(仅当 type 是text时才起作用)',
                type: '类型：function(string): string',
                optionalValue: '',
                defaultValue: ``
            },
            {
                attr: 'rows',
                explain: "输入框行数,仅 type 为 'textarea' 时有效",
                type: 'number',
                optionalValue: '',
                defaultValue: ``
            },
            {
                attr: 'showPassword',
                explain: '是否显示切换密码图标',
                type: 'boolean',
                optionalValue: '',
                defaultValue: `false`
            },
            {
                attr: 'showWordLimit',
                explain: '是否显示输入字数统计',
                type: 'boolean',
                optionalValue: '',
                defaultValue: `true`
            },
            {
                attr: 'prefixIcon',
                explain: '自定义前缀图标',
                type: 'string / Component',
                optionalValue: '',
                defaultValue: ``
            },
            {
                attr: 'suffixIcon',
                explain: '自定义后缀图标',
                type: 'string / Component',
                optionalValue: '',
                defaultValue: ``
            },
            {
                attr: 'autosize',
                explain:
                    "textarea 高度是否自适应，仅 type 为 'textarea' 时生效。 可以接受一个对象，比如: { minRows: 2, maxRows: 6 }",
                type: 'boolean / object',
                optionalValue: '',
                defaultValue: `false`
            },
            {
                attr: 'maxlength',
                explain: '最大输入长度',
                type: 'string / number',
                optionalValue: '',
                defaultValue: ``
            },
            {
                attr: 'minlength',
                explain: '最小输入长度',
                type: 'number',
                optionalValue: '',
                defaultValue: ``
            },
            {
                attr: 'autocomplete',
                explain: '原生 autocomplete 属性',
                type: 'string',
                optionalValue: '',
                defaultValue: `off`
            },
            {
                attr: 'readonly',
                explain: '原生  readonly 属性，是否只读',
                type: 'boolean',
                optionalValue: '',
                defaultValue: `false`
            },
            {
                attr: 'max',
                explain: '原生 max 属性，设置最大值',
                type: '',
                optionalValue: '',
                defaultValue: ``
            },
            {
                attr: 'min',
                explain: '原生属性，设置最小值',
                type: '',
                optionalValue: '',
                defaultValue: ``
            },
            {
                attr: 'step',
                explain: '原生属性，设置输入字段的合法数字间隔',
                type: '',
                optionalValue: '',
                defaultValue: ``
            },
            {
                attr: 'resize',
                explain: '控制是否能被用户缩放',
                type: 'string',
                optionalValue: 'none / both / horizontal / vertical',
                defaultValue: ``
            },
            {
                attr: 'autofocus',
                explain: '原生属性，自动获取焦点',
                type: 'boolean',
                optionalValue: '',
                defaultValue: `false`
            },
            {
                attr: 'validateEvent',
                explain: '输入时是否触发表单的校验',
                type: 'boolean',
                optionalValue: '',
                defaultValue: `true`
            },
            {
                attr: 'events',
                explain: '事件配置',
                type: 'object',
                optionalValue: '',
                defaultValue: ``,
                id: 'events',
                children: [
                    {
                        attr: 'change',
                        explain: '仅当 modelValue 改变时，当输入框失去焦点或用户按Enter时触发。',
                        type: 'function',
                        optionalValue: '',
                        defaultValue: ``
                    },
                    {
                        attr: 'blur',
                        explain: '当选择器的输入框失去焦点时触发。',
                        type: 'function',
                        optionalValue: '',
                        defaultValue: ``
                    },
                    {
                        attr: 'focus',
                        explain: '当选择器的输入框获得焦点时触发。',
                        type: 'function',
                        optionalValue: '',
                        defaultValue: ``
                    },
                    {
                        attr: 'input',
                        explain: '在 Input 值改变时触发',
                        type: 'function',
                        optionalValue: '',
                        defaultValue: ``
                    },
                    {
                        attr: 'clear',
                        explain: '在点击由 clearable 属性生成的清空按钮时触发',
                        type: 'function',
                        optionalValue: '',
                        defaultValue: ``
                    }
                ]
            }
        ]
    });

    let textareaTableConfig = ref({
        showOverflowTooltip: false,
        headerBackground: true, //头部背景颜色
        pageConfig: false, //无分页
        border: false, //无边框
        columns: [
            {
                title: '属性',
                key: 'attr'
            },
            {
                title: '说明',
                key: 'explain'
            },
            {
                title: '类型',
                key: 'type'
            },
            {
                title: '可选值',
                key: 'optionalValue'
            },
            {
                title: '默认值',
                key: 'defaultValue'
            }
        ],
        tableData: [
            {
                attr: 'placeholder',
                explain: '占位符',
                type: 'string',
                optionalValue: '',
                defaultValue: `请输入`
            },
            {
                attr: 'clearable',
                explain: '是否可清空',
                type: 'string',
                optionalValue: 'true | false',
                defaultValue: `true`
            },
            {
                attr: 'disabled',
                explain: '是否禁用',
                type: 'boolean',
                optionalValue: '',
                defaultValue: `false`
            },
            {
                attr: 'width',
                explain: '输入框宽度',
                type: 'string',
                optionalValue: '',
                defaultValue: `100%`
            },
            {
                attr: 'rows',
                explain: '输入框行数',
                type: 'number',
                optionalValue: '',
                defaultValue: ``
            },
            {
                attr: 'showWordLimit',
                explain: '是否显示输入字数统计',
                type: 'boolean',
                optionalValue: '',
                defaultValue: `true`
            },
            {
                attr: 'maxlength',
                explain: '最大输入长度',
                type: 'string / number',
                optionalValue: '',
                defaultValue: ``
            },
            {
                attr: 'minlength',
                explain: '最小输入长度',
                type: 'number',
                optionalValue: '',
                defaultValue: ``
            },
            {
                attr: 'autocomplete',
                explain: '原生 autocomplete 属性',
                type: 'string',
                optionalValue: '',
                defaultValue: `off`
            },
            {
                attr: 'readonly',
                explain: '原生  readonly 属性，是否只读',
                type: 'boolean',
                optionalValue: '',
                defaultValue: `false`
            },
            {
                attr: 'events',
                explain: '事件配置',
                type: 'object',
                optionalValue: '',
                defaultValue: ``,
                id: 'events',
                children: [
                    {
                        attr: 'change',
                        explain: '仅当 modelValue 改变时，当输入框失去焦点或用户按Enter时触发。',
                        type: 'function',
                        optionalValue: '',
                        defaultValue: ``
                    },
                    {
                        attr: 'blur',
                        explain: '当选择器的输入框失去焦点时触发。',
                        type: 'function',
                        optionalValue: '',
                        defaultValue: ``
                    },
                    {
                        attr: 'focus',
                        explain: '当选择器的输入框获得焦点时触发。',
                        type: 'function',
                        optionalValue: '',
                        defaultValue: ``
                    },
                    {
                        attr: 'input',
                        explain: '在 Input 值改变时触发',
                        type: 'function',
                        optionalValue: '',
                        defaultValue: ``
                    },
                    {
                        attr: 'clear',
                        explain: '在点击由 clearable 属性生成的清空按钮时触发',
                        type: 'function',
                        optionalValue: '',
                        defaultValue: ``
                    }
                ]
            }
        ]
    });
    let dateTableConfig = ref({
        showOverflowTooltip: false,
        headerBackground: true, //头部背景颜色
        pageConfig: false, //无分页
        border: false, //无边框
        columns: [
            {
                title: '属性',
                key: 'attr'
            },
            {
                title: '说明',
                key: 'explain'
            },
            {
                title: '类型',
                key: 'type'
            },
            {
                title: '可选值',
                key: 'optionalValue'
            },
            {
                title: '默认值',
                key: 'defaultValue'
            }
        ],
        tableData: [
            {
                attr: 'placeholder',
                explain: '占位符',
                type: 'string',
                optionalValue: '',
                defaultValue: `请输入`
            },
            {
                attr: 'clearable',
                explain: '是否可清空',
                type: 'string',
                optionalValue: 'true | false',
                defaultValue: `true`
            },
            {
                attr: 'dateType',
                explain: '日期类型',
                type: 'string',
                optionalValue: 'year | month | date | dates | datetime | week | datetimerange | daterange | monthrange',
                defaultValue: `date`
            },
            {
                attr: 'format',
                explain: '显示在输入框中的格式',
                type: 'string',
                optionalValue: '',
                defaultValue: `YYYY-MM-DD`
            },
            {
                attr: 'disabledDate',
                explain: '一个用来判断该日期是否被禁用的函数，接受一个 Date 对象作为参数。 应该返回一个 Boolean 值。',
                type: 'function',
                optionalValue: '',
                defaultValue: ``
            },
            {
                attr: 'disabled',
                explain: '禁用',
                type: 'function',
                optionalValue: '',
                defaultValue: `false`
            },
            {
                attr: 'size',
                explain: '输入框尺寸',
                type: 'string',
                optionalValue: '',
                defaultValue: `default`
            },
            {
                attr: 'editable',
                explain: '文本框可输入',
                type: 'boolean',
                optionalValue: '',
                defaultValue: `true`
            },
            {
                attr: 'readonly',
                explain: '只读',
                type: 'boolean',
                optionalValue: '',
                defaultValue: `false`
            },
            {
                attr: 'startPlaceholder',
                explain: '范围选择时开始日期的占位内容',
                type: 'string',
                optionalValue: '',
                defaultValue: ``
            },
            {
                attr: 'endPlaceholder',
                explain: '范围选择时结束日期的占位内容',
                type: 'string',
                optionalValue: '',
                defaultValue: ``
            },
            {
                attr: 'popperClass',
                explain: 'DatePicker 下拉框的类名',
                type: 'string',
                optionalValue: '',
                defaultValue: ``
            },
            {
                attr: 'rangeSeparator',
                explain: '选择范围时的分隔符',
                type: 'string',
                optionalValue: '',
                defaultValue: `-`
            },
            {
                attr: 'defaultValue',
                explain: '可选，选择器打开时默认显示的时间',
                type: 'Date / [Date, Date]',
                optionalValue: '',
                defaultValue: ``
            },
            {
                attr: 'defaultTime',
                explain: '范围选择时选中日期所使用的当日内具体时刻',
                type: 'Date / [Date, Date]',
                optionalValue: '',
                defaultValue: ``
            },
            {
                attr: 'valueFormat',
                explain: '可选，绑定值的格式，不指定则绑定值为 Date 对象',
                type: 'string',
                optionalValue: '',
                defaultValue: ``
            },
            {
                attr: 'unlinkPanels',
                explain: '在范围选择器里取消两个日期面板之间的联动',
                type: 'boolean',
                optionalValue: '',
                defaultValue: `false`
            },
            {
                attr: 'prefixIcon',
                explain: '自定义前缀图标',
                type: 'string | Component',
                optionalValue: '',
                defaultValue: `Date`
            },
            {
                attr: 'clearIcon',
                explain: '自定义清除图标',
                type: 'string | Component',
                optionalValue: '',
                defaultValue: `CircleClose`
            },
            {
                attr: 'validateEvent',
                explain: '输入时是否触发表单的校验',
                type: 'boolean',
                optionalValue: '',
                defaultValue: `true`
            },
            {
                attr: 'teleported',
                explain: '是否将 date-picker 的下拉列表插入至 body 元素',
                type: 'boolean',
                optionalValue: '',
                defaultValue: `true`
            },
            {
                attr: 'cellClassName',
                explain: '设置自定义类名',
                type: 'Function(Date)',
                optionalValue: '',
                defaultValue: ``
            },
            {
                attr: 'width',
                explain: '选择框宽度',
                type: 'string',
                optionalValue: '',
                defaultValue: `100%`
            },
            {
                attr: 'events',
                explain: '事件配置',
                type: 'object',
                optionalValue: '',
                defaultValue: ``,
                id: 'events',
                children: [
                    {
                        attr: 'change',
                        explain: '用户确认选定的值时触发。回调参数：(val: typeof v-model)',
                        type: 'function',
                        optionalValue: '',
                        defaultValue: ``
                    },
                    {
                        attr: 'blur',
                        explain: '在组件 Input 失去焦点时触发。回调参数：(e: FocusEvent)',
                        type: 'function',
                        optionalValue: '',
                        defaultValue: ``
                    },
                    {
                        attr: 'focus',
                        explain: '在组件 Input 获得焦点时触发。回调参数：(e: FocusEvent)',
                        type: 'function',
                        optionalValue: '',
                        defaultValue: ``
                    },
                    {
                        attr: 'calendarChange',
                        explain:
                            '如果用户没有选择日期，那默认展示当前日的月份。 你可以使用 default-value 来设置成其他的日期。回调参数：(val: [Date, Date])',
                        type: 'function',
                        optionalValue: '',
                        defaultValue: ``
                    },
                    {
                        attr: 'visibleChange',
                        explain: '当 TimePicker 的下拉列表出现/消失时触发。回调参数：(visibility: boolean)',
                        type: 'function',
                        optionalValue: '',
                        defaultValue: ``
                    },
                    {
                        attr: 'panelChange',
                        explain: '当日期面板改变时触发。回调参数：(date, mode, view)',
                        type: 'function',
                        optionalValue: '',
                        defaultValue: ``
                    }
                ]
            }
        ]
    });
    let timeTableConfig = ref({
        showOverflowTooltip: false,
        headerBackground: true, //头部背景颜色
        pageConfig: false, //无分页
        border: false, //无边框
        columns: [
            {
                title: '属性',
                key: 'attr'
            },
            {
                title: '说明',
                key: 'explain'
            },
            {
                title: '类型',
                key: 'type'
            },
            {
                title: '可选值',
                key: 'optionalValue'
            },
            {
                title: '默认值',
                key: 'defaultValue'
            }
        ],
        tableData: [
            {
                attr: 'readonly',
                explain: '只读',
                type: 'boolean',
                optionalValue: '',
                defaultValue: `false`
            },
            {
                attr: 'disabled',
                explain: '禁用',
                type: 'function',
                optionalValue: '',
                defaultValue: `false`
            },
            {
                attr: 'editable',
                explain: '文本框可输入',
                type: 'boolean',
                optionalValue: '',
                defaultValue: `true`
            },
            {
                attr: 'clearable',
                explain: '是否可清空',
                type: 'string',
                optionalValue: 'true | false',
                defaultValue: `true`
            },
            {
                attr: 'size',
                explain: '输入框尺寸',
                type: 'string',
                optionalValue: '',
                defaultValue: `default`
            },
            {
                attr: 'placeholder',
                explain: '占位符',
                type: 'string',
                optionalValue: '',
                defaultValue: `请输入`
            },
            {
                attr: 'startPlaceholder',
                explain: '范围选择时开始日期的占位内容',
                type: 'string',
                optionalValue: '',
                defaultValue: ``
            },
            {
                attr: 'endPlaceholder',
                explain: '范围选择时结束日期的占位内容',
                type: 'string',
                optionalValue: '',
                defaultValue: ``
            },

            {
                attr: 'format',
                explain: '显示在输入框中的格式',
                type: 'string',
                optionalValue: '',
                defaultValue: `YYYY-MM-DD`
            },
            {
                attr: 'disabledDate',
                explain: '一个用来判断该日期是否被禁用的函数，接受一个 Date 对象作为参数。 应该返回一个 Boolean 值。',
                type: 'function',
                optionalValue: '',
                defaultValue: ``
            },
            {
                attr: 'isRange',
                explain: '是否为时间范围选择',
                type: 'boolean',
                optionalValue: '',
                defaultValue: `false`
            },
            {
                attr: 'arrowControl',
                explain: '是否使用箭头进行时间选择',
                type: 'boolean',
                optionalValue: '',
                defaultValue: `false`
            },
            {
                attr: 'popperClass',
                explain: 'TimePicker 下拉框的类名',
                type: 'string',
                optionalValue: '',
                defaultValue: ``
            },
            {
                attr: 'rangeSeparator',
                explain: '选择范围时的分隔符',
                type: 'string',
                optionalValue: '',
                defaultValue: `-`
            },
            {
                attr: 'format',
                explain: '显示在输入框中的格式',
                type: 'string',
                optionalValue: '',
                defaultValue: `HH:mm:ss`
            },
            {
                attr: 'valueFormat',
                explain: '可选，绑定值的格式。 不指定则绑定值为 Date 对象',
                type: 'string',
                optionalValue: '',
                defaultValue: ``
            },
            {
                attr: 'defaultValue',
                explain: '可选，选择器打开时默认显示的时间',
                type: 'Date / [Date, Date]',
                optionalValue: '',
                defaultValue: ``
            },
            {
                attr: 'id',
                explain: '等价于原生 input id 属性',
                type: 'string / [string, string]',
                optionalValue: '',
                defaultValue: ``
            },
            {
                attr: 'name',
                explain: '等价于原生 input name 属性',
                type: 'string',
                optionalValue: '',
                defaultValue: ``
            },
            {
                attr: 'prefixIcon',
                explain: '自定义前缀图标',
                type: 'string | Component',
                optionalValue: '',
                defaultValue: `Date`
            },
            {
                attr: 'clearIcon',
                explain: '自定义清除图标',
                type: 'string | Component',
                optionalValue: '',
                defaultValue: `CircleClose`
            },
            {
                attr: 'disabledHours',
                explain: '禁止选择部分小时选项',
                type: 'Function',
                optionalValue: '',
                defaultValue: ``
            },
            {
                attr: 'disabledMinutes',
                explain: '禁止选择部分分钟选项',
                type: 'Function(selectedHour)',
                optionalValue: '',
                defaultValue: ``
            },
            {
                attr: 'disabledSeconds',
                explain: '禁止选择部分秒选项',
                type: 'Function(selectedHour, selectedMinute)',
                optionalValue: '',
                defaultValue: ``
            },
            {
                attr: 'teleported',
                explain: '是否将 date-picker 的下拉列表插入至 body 元素',
                type: 'boolean',
                optionalValue: '',
                defaultValue: `true`
            },
            {
                attr: 'events',
                explain: '事件配置',
                type: 'object',
                optionalValue: '',
                defaultValue: ``,
                id: 'events',
                children: [
                    {
                        attr: 'change',
                        explain: '用户确认选定的值时触发，回调参数：(val: typeof v-model)',
                        type: 'function',
                        optionalValue: '',
                        defaultValue: ``
                    },
                    {
                        attr: 'blur',
                        explain: '在组件 Input 失去焦点时触发。回调参数：(e: FocusEvent)',
                        type: 'function',
                        optionalValue: '',
                        defaultValue: ``
                    },
                    {
                        attr: 'focus',
                        explain: '在组件 Input 获得焦点时触发。回调参数：(e: FocusEvent)',
                        type: 'function',
                        optionalValue: '',
                        defaultValue: ``
                    },
                    {
                        attr: 'visibleChange',
                        explain: '当 TimePicker 的下拉列表出现/消失时触发。回调参数：(visibility: boolean)',
                        type: 'function',
                        optionalValue: '',
                        defaultValue: ``
                    }
                ]
            }
        ]
    });
    let timeSelectTableConfig = ref({
        showOverflowTooltip: false,
        headerBackground: true, //头部背景颜色
        pageConfig: false, //无分页
        border: false, //无边框
        columns: [
            {
                title: '属性',
                key: 'attr'
            },
            {
                title: '说明',
                key: 'explain'
            },
            {
                title: '类型',
                key: 'type'
            },
            {
                title: '可选值',
                key: 'optionalValue'
            },
            {
                title: '默认值',
                key: 'defaultValue'
            }
        ],
        tableData: [
            {
                attr: 'disabled',
                explain: '禁用',
                type: 'function',
                optionalValue: '',
                defaultValue: `false`
            },
            {
                attr: 'editable',
                explain: '文本框可输入',
                type: 'boolean',
                optionalValue: '',
                defaultValue: `true`
            },
            {
                attr: 'clearable',
                explain: '是否可清空',
                type: 'string',
                optionalValue: 'true | false',
                defaultValue: `true`
            },
            {
                attr: 'size',
                explain: '输入框尺寸',
                type: 'string',
                optionalValue: '',
                defaultValue: `default`
            },
            {
                attr: 'placeholder',
                explain: '占位符',
                type: 'string',
                optionalValue: '',
                defaultValue: `请输入`
            },
            {
                attr: 'name',
                explain: '等价于原生 input name 属性',
                type: 'string',
                optionalValue: '',
                defaultValue: ``
            },
            {
                attr: 'prefixIcon',
                explain: '自定义前缀图标',
                type: 'string | Component',
                optionalValue: '',
                defaultValue: `Date`
            },
            {
                attr: 'clearIcon',
                explain: '自定义清除图标',
                type: 'string | Component',
                optionalValue: '',
                defaultValue: `CircleClose`
            },
            {
                attr: 'effect',
                explain: 'Tooltip 主题，内置了 dark / light 两种主题',
                type: 'string',
                optionalValue: '',
                defaultValue: `light`
            },
            {
                attr: 'start',
                explain: '开始时间',
                type: 'string',
                optionalValue: '',
                defaultValue: `09:00`
            },
            {
                attr: 'end',
                explain: '结束时间',
                type: 'string',
                optionalValue: '',
                defaultValue: `18:00`
            },
            {
                attr: 'step',
                explain: '间隔时间',
                type: 'string',
                optionalValue: '',
                defaultValue: `00:30`
            },
            {
                attr: 'minTime',
                explain: '最早时间点，早于该时间的时间段将被禁用',
                type: 'string',
                optionalValue: '',
                defaultValue: `00:00`
            },
            {
                attr: 'maxTime',
                explain: '最晚时间点，晚于该时间的时间段将被禁用',
                type: 'string',
                optionalValue: '',
                defaultValue: ``
            },
            {
                attr: 'events',
                explain: '事件配置',
                type: 'object',
                optionalValue: '',
                defaultValue: ``,
                id: 'events',
                children: [
                    {
                        attr: 'change',
                        explain: '用户确认选定的值时触发。回调参数：(val: typeof v-model)',
                        type: 'function',
                        optionalValue: '',
                        defaultValue: ``
                    },
                    {
                        attr: 'blur',
                        explain: '在组件 Input 失去焦点时触发。回调参数：(e: FocusEvent)',
                        type: 'function',
                        optionalValue: '',
                        defaultValue: ``
                    },
                    {
                        attr: 'focus',
                        explain: '在组件 Input 获得焦点时触发。回调参数：(e: FocusEvent)',
                        type: 'function',
                        optionalValue: '',
                        defaultValue: ``
                    }
                ]
            }
        ]
    });
    let radioTableConfig = ref({
        showOverflowTooltip: false,
        headerBackground: true, //头部背景颜色
        pageConfig: false, //无分页
        border: false, //无边框
        columns: [
            {
                title: '属性',
                key: 'attr'
            },
            {
                title: '说明',
                key: 'explain'
            },
            {
                title: '类型',
                key: 'type'
            },
            {
                title: '可选值',
                key: 'optionalValue'
            },
            {
                title: '默认值',
                key: 'defaultValue'
            }
        ],
        tableData: [
            {
                attr: '* radioType',
                explain: '单选框展示类型',
                type: 'string',
                optionalValue: 'radio | button',
                defaultValue: `radio`
            },
            {
                attr: '* options',
                explain: '选项列表',
                type: 'array',
                id: 'options',
                optionalValue: '必须指定label，value字段',
                defaultValue: `举例：[{
						label:"选项1",
						value:"opt1",
					}]`,
                children: [
                    {
                        attr: '* label',
                        explain: '指定label字段',
                        type: 'string',
                        optionalValue: '',
                        defaultValue: ``
                    },
                    {
                        attr: '* value',
                        explain: '指定value字段',
                        type: 'string',
                        optionalValue: '',
                        defaultValue: ``
                    },
                    {
                        attr: 'disabled',
                        explain: '是否禁用',
                        type: 'boolean',
                        optionalValue: '',
                        defaultValue: `false`
                    },
                    {
                        attr: 'border',
                        explain: "是否设置边框，当radioType='radio'时生效",
                        type: 'boolean',
                        optionalValue: '',
                        defaultValue: `true`
                    },
                    {
                        attr: 'size',
                        explain: "单选框尺寸大小，当radioType='radio'时生效",
                        type: 'string',
                        optionalValue: 'large / default / small',
                        defaultValue: `default`
                    }
                ]
            },

            {
                attr: 'textColor',
                explain: "radioType='button'按钮形式的 Radio 激活时的文本颜色",
                type: 'string',
                optionalValue: '',
                defaultValue: `#ffffff`
            },
            {
                attr: 'fill',
                explain: "radioType='button'按钮形式的 Radio 激活时的填充色和边框色",
                type: 'string',
                optionalValue: '',
                defaultValue: `#409EFF`
            },
            {
                attr: 'validateEvent',
                explain: '输入时是否触发表单的校验',
                type: 'boolean',
                optionalValue: '',
                defaultValue: `true`
            },
            {
                attr: 'size',
                explain: '单选框组尺寸',
                type: 'string',
                optionalValue: 'large / default / small',
                defaultValue: `default`
            },
            {
                attr: 'disabled',
                explain: '是否禁用',
                type: 'boolean',
                optionalValue: '',
                defaultValue: `false`
            },
            {
                attr: 'events',
                explain: '事件配置',
                type: 'object',
                optionalValue: '',
                defaultValue: ``,
                id: 'events',
                children: [
                    {
                        attr: 'change',
                        explain: '绑定值变化时触发的事件。回调参数：选中的 Radio label 值',
                        type: 'function',
                        optionalValue: '',
                        defaultValue: ``
                    }
                ]
            }
        ]
    });
    let checkboxTableConfig = ref({
        showOverflowTooltip: false,
        headerBackground: true, //头部背景颜色
        pageConfig: false, //无分页
        border: false, //无边框
        columns: [
            {
                title: '属性',
                key: 'attr'
            },
            {
                title: '说明',
                key: 'explain'
            },
            {
                title: '类型',
                key: 'type'
            },
            {
                title: '可选值',
                key: 'optionalValue'
            },
            {
                title: '默认值',
                key: 'defaultValue'
            }
        ],
        tableData: [
            {
                attr: '* checkboxType',
                explain: '多选框展示类型',
                type: 'string',
                optionalValue: 'checkbox | button',
                defaultValue: `checkbox`
            },
            {
                attr: '* options',
                explain: '选项列表',
                type: 'array',
                optionalValue: '必须指定label，value字段',
                defaultValue: `举例：[{
						label:"选项1",
						value:"opt1",
					}]`,
                id: 'options',
                children: [
                    {
                        attr: '* label',
                        explain: '指定label字段',
                        type: 'string',
                        optionalValue: '',
                        defaultValue: ``
                    },
                    {
                        attr: '* value',
                        explain: '指定value字段',
                        type: 'string',
                        optionalValue: '',
                        defaultValue: ``
                    },
                    {
                        attr: 'disabled',
                        explain: '是否禁用',
                        type: 'boolean',
                        optionalValue: '',
                        defaultValue: `false`
                    },
                    {
                        attr: 'border',
                        explain: "是否设置边框，当checkboxType='checkbox'时生效",
                        type: 'boolean',
                        optionalValue: '',
                        defaultValue: `true`
                    },
                    {
                        attr: 'size',
                        explain: "单选框尺寸大小，当checkboxType='checkbox'时生效",
                        type: 'string',
                        optionalValue: 'large / default / small',
                        defaultValue: `default`
                    },
                    {
                        attr: 'trueLabel',
                        explain: '选中时的值',
                        type: 'string/ number',
                        optionalValue: '',
                        defaultValue: ``
                    },
                    {
                        attr: 'falseLabel',
                        explain: '没有选中时的值',
                        type: 'string/ number',
                        optionalValue: '',
                        defaultValue: ``
                    },
                    {
                        attr: 'checked',
                        explain: '当前是否勾选',
                        type: 'boolean',
                        optionalValue: '',
                        defaultValue: `false`
                    },
                    {
                        attr: 'indeterminate',
                        explain: "设置不确定状态，仅负责样式控制 当checkboxType='checkbox'时生效",
                        type: 'boolean',
                        optionalValue: '',
                        defaultValue: `false`
                    },
                    {
                        attr: 'validateEvent',
                        explain: "输入时是否触发表单的校验 当checkboxType='checkbox'时生效",
                        type: 'boolean',
                        optionalValue: '',
                        defaultValue: `true`
                    },
                    {
                        attr: 'tabindex',
                        explain: "输入框的 tabindex 当checkboxType='checkbox'时生效",
                        type: 'string/ number',
                        optionalValue: '',
                        defaultValue: ``
                    },
                    {
                        attr: 'name',
                        explain: '原生 name 属性',
                        type: 'string',
                        optionalValue: '',
                        defaultValue: ``
                    },
                    {
                        attr: 'id',
                        explain: "input id 当checkboxType='checkbox'时生效",
                        type: 'string',
                        optionalValue: '',
                        defaultValue: ``
                    }
                ]
            },
            {
                attr: 'showCheckedAll',
                explain: '是否显示全选功能',
                type: 'boolean',
                optionalValue: 'true | false',
                defaultValue: `true`
            },
            {
                attr: 'isCheckedAll',
                explain: '默认是否全选',
                type: 'boolean',
                optionalValue: 'true | false',
                defaultValue: `false`
            },
            {
                attr: 'textColor',
                explain: "checkboxType='button'按钮形式 激活时的文本颜色",
                type: 'string',
                optionalValue: '',
                defaultValue: `#ffffff`
            },
            {
                attr: 'fill',
                explain: "checkboxType='button'按钮形式 激活时的填充色和边框色",
                type: 'string',
                optionalValue: '',
                defaultValue: `#409EFF`
            },
            {
                attr: 'validateEvent',
                explain: '输入时是否触发表单的校验',
                type: 'boolean',
                optionalValue: '',
                defaultValue: `true`
            },
            {
                attr: 'size',
                explain: '多选框组尺寸',
                type: 'string',
                optionalValue: 'large / default / small',
                defaultValue: `default`
            },
            {
                attr: 'disabled',
                explain: '是否禁用',
                type: 'boolean',
                optionalValue: '',
                defaultValue: `false`
            },
            {
                attr: 'min',
                explain: '可被勾选的 checkbox 的最小数量',
                type: 'number',
                optionalValue: '',
                defaultValue: ``
            },
            {
                attr: 'max',
                explain: '可被勾选的 checkbox 的最大数量',
                type: 'number',
                optionalValue: '',
                defaultValue: ``
            },
            {
                attr: 'label',
                explain: '为屏幕阅读器准备的标签',
                type: 'string',
                optionalValue: '',
                defaultValue: ``
            },
            {
                attr: 'tag',
                explain: '复选框组元素标签',
                type: 'string',
                optionalValue: '',
                defaultValue: `div`
            }
        ]
    });
    let switchTableConfig = ref({
        showOverflowTooltip: false,
        headerBackground: true, //头部背景颜色
        pageConfig: false, //无分页
        border: false, //无边框
        columns: [
            {
                title: '属性',
                key: 'attr'
            },
            {
                title: '说明',
                key: 'explain'
            },
            {
                title: '类型',
                key: 'type'
            },
            {
                title: '可选值',
                key: 'optionalValue'
            },
            {
                title: '默认值',
                key: 'defaultValue'
            }
        ],
        tableData: [
            {
                attr: 'disabled',
                explain: '是否禁用该选项',
                type: 'boolean',
                optionalValue: '',
                defaultValue: `false`
            },
            {
                attr: 'loading',
                explain: '是否显示加载中',
                type: 'boolean',
                optionalValue: '',
                defaultValue: `false`
            },
            {
                attr: 'width',
                explain: 'switch 的宽度',
                type: 'number / string',
                optionalValue: '',
                defaultValue: `auto`
            },
            {
                attr: 'inlinePrompt',
                explain: '无论图标或文本是否显示在点内，只会呈现文本的第一个字符',
                type: 'boolean',
                optionalValue: '',
                defaultValue: `false`
            },
            {
                attr: 'activeIcon',
                explain: 'switch 状态为 on 时所显示图标，设置此项会忽略 active-text',
                type: 'string / Component',
                optionalValue: '',
                defaultValue: ``
            },
            {
                attr: 'inactiveIcon',
                explain: 'switch 状态为 off 时所显示图标，设置此项会忽略 inactive-text',
                type: 'string / Component',
                optionalValue: '',
                defaultValue: ``
            },
            {
                attr: 'activeText',
                explain: 'switch 打开时的文字描述',
                type: 'string',
                optionalValue: '',
                defaultValue: ``
            },
            {
                attr: 'inactiveText',
                explain: 'switch 的状态为 off 时的文字描述',
                type: 'string',
                optionalValue: '',
                defaultValue: ``
            },
            {
                attr: 'activeValue',
                explain: 'switch 状态为 on 时的值',
                type: 'boolean / string / number',
                optionalValue: '',
                defaultValue: `true`
            },
            {
                attr: 'inactiveValue',
                explain: 'switch的状态为 off 时的值',
                type: 'boolean / string / number',
                optionalValue: '',
                defaultValue: `false`
            },
            {
                attr: 'validateEvent',
                explain: '改变 switch 状态时是否触发表单的校验',
                type: 'boolean',
                optionalValue: '',
                defaultValue: `true`
            },
            {
                attr: 'beforeChange',
                explain: 'switch 状态改变前的钩子， 返回 false 或者返回 Promise 且被 reject 则停止切换',
                type: '() => Promise<boolean> | boolean',
                optionalValue: '',
                defaultValue: ``
            },
            {
                attr: 'events',
                explain: '事件配置',
                type: 'object',
                optionalValue: '',
                defaultValue: ``,
                id: 'events',
                children: [
                    {
                        attr: 'change',
                        explain: 'switch 状态发生变化时的回调函数。回调参数：val，新状态的值',
                        type: 'function',
                        optionalValue: '',
                        defaultValue: ``
                    }
                ]
            }
        ]
    });

    let uploadTableConfig = ref({
        showOverflowTooltip: false,
        headerBackground: true, //头部背景颜色
        pageConfig: false, //无分页
        border: false, //无边框
        columns: [
            {
                title: '属性',
                key: 'attr'
            },
            {
                title: '说明',
                key: 'explain'
            },
            {
                title: '类型',
                key: 'type'
            },
            {
                title: '可选值',
                key: 'optionalValue'
            },
            {
                title: '默认值',
                key: 'defaultValue'
            }
        ],
        tableData: [
            {
                attr: 'defaultCustomClass',
                explain: '选择文件自定义样式',
                type: 'string',
                optionalValue: 'custom-picture-card，custom-picture，custom-button,custom-text',
                defaultValue: `custom-picture-card`
            },
            {
                attr: 'action',
                explain: '请求URL',
                type: 'string',
                optionalValue: '',
                defaultValue: ``
            },
            {
                attr: 'headers',
                explain: '设置上传的请求头部',
                type: 'Headers | Record<string, any>',
                optionalValue: '',
                defaultValue: ``
            },
            {
                attr: 'method',
                explain: '设置上传请求方法',
                type: 'string',
                optionalValue: '',
                defaultValue: `post`
            },
            {
                attr: 'multiple',
                explain: '是否支持多选文件',
                type: 'boolean',
                optionalValue: '',
                defaultValue: `false`
            },
            {
                attr: 'data',
                explain: '上传时附带的额外参数',
                type: 'Record<string, any>',
                optionalValue: '',
                defaultValue: ``
            },
            {
                attr: 'name',
                explain: '上传的文件字段名',
                type: 'string',
                optionalValue: '',
                defaultValue: `file`
            },
            {
                attr: 'withCredentials',
                explain: '支持发送 cookie 凭证信息',
                type: 'boolean',
                optionalValue: '',
                defaultValue: `false`
            },
            {
                attr: 'showFileList',
                explain: '是否显示已上传文件列表',
                type: 'boolean',
                optionalValue: '',
                defaultValue: `true`
            },
            {
                attr: 'drag',
                explain: '是否启用拖拽上传',
                type: 'boolean',
                optionalValue: '',
                defaultValue: `true`
            },
            {
                attr: 'accept',
                explain: '接受上传的文件类型（thumbnail-mode 模式下此参数无效）',
                type: 'string',
                optionalValue: '',
                defaultValue: ``
            },
            {
                attr: 'onPreview',
                explain: '点击文件列表中已上传的文件时的钩子',
                type: '(uploadFile: UploadFile) => void',
                optionalValue: '',
                defaultValue: ``
            },
            {
                attr: 'onRemove',
                explain: '文件列表移除文件时的钩子',
                type: '(uploadFile: UploadFile, uploadFiles: UploadFiles) => void',
                optionalValue: '',
                defaultValue: ``
            },
            {
                attr: 'onSuccess',
                explain: '文件上传成功时的钩子',
                type: '(response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => void',
                optionalValue: '',
                defaultValue: ``
            },
            {
                attr: 'onError',
                explain: '文件上传失败时的钩子',
                type: '(error: Error, uploadFile: UploadFile, uploadFiles: UploadFiles) => void',
                optionalValue: '',
                defaultValue: ``
            },
            {
                attr: 'onProgress',
                explain: '文件上传时的钩子',
                type: '(evt: UploadProgressEvent, uploadFile: UploadFile, uploadFiles: UploadFiles) => void',
                optionalValue: '',
                defaultValue: ``
            },
            {
                attr: 'onChange',
                explain: '文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用',
                type: '(uploadFile: UploadFile, uploadFiles: UploadFiles) => void',
                optionalValue: '',
                defaultValue: ``
            },
            {
                attr: 'onExceed',
                explain: '当超出限制时，执行的钩子函数',
                type: '(files: File[], uploadFiles: UploadUserFile[]) => void',
                optionalValue: '',
                defaultValue: ``
            },
            {
                attr: 'beforeUpload',
                explain: '上传文件之前的钩子，参数为上传的文件， 若返回false或者返回 Promise 且被 reject，则停止上传。',
                type: '(rawFile: UploadRawFile) => Awaitable<void | undefined | null | boolean | File | Blob>',
                optionalValue: '',
                defaultValue: ``
            },
            {
                attr: 'beforeRemove',
                explain:
                    '删除文件之前的钩子，参数为上传的文件和文件列表， 若返回 false 或者返回 Promise 且被 reject，则停止删除。',
                type: '(uploadFile: UploadFile, uploadFiles: UploadFiles) => Awaitable<boolean>',
                optionalValue: '',
                defaultValue: ``
            },
            {
                attr: 'fileList',
                explain: '默认上传文件',
                type: 'UploadUserFile[]',
                optionalValue: '',
                defaultValue: `[]`
            },
            {
                attr: 'listType',
                explain: '文件列表的类型',
                type: 'string',
                optionalValue: "'text' | 'picture' | 'picture-card'",
                defaultValue: `text`
            },
            {
                attr: 'autoUpload',
                explain: '是否自动上传文件',
                type: 'boolean',
                optionalValue: '',
                defaultValue: `true`
            },
            {
                attr: 'httpRequest',
                explain: '覆盖默认的 Xhr 行为，允许自行实现上传文件的请求',
                type: '(options: UploadRequestOptions) => XMLHttpRequest | Promise<unknown>',
                optionalValue: '',
                defaultValue: ``
            },
            {
                attr: 'disabled',
                explain: '是否禁用上传',
                type: 'boolean',
                optionalValue: '',
                defaultValue: `false`
            },
            {
                attr: 'limit',
                explain: '允许上传文件的最大数量',
                type: 'number',
                optionalValue: '',
                defaultValue: ``
            },
            {
                attr: 'enlargeIcon',
                explain: "图片的放大功能,accept='image/jpeg,image/jpg,image/png'图片格式时生效",
                type: 'boolean',
                optionalValue: '',
                defaultValue: `true`
            },
            {
                attr: 'downIcon',
                explain: "图片的下载功能，accept='image/jpeg,image/jpg,image/png'图片格式时生效",
                type: 'boolean',
                optionalValue: '',
                defaultValue: `true`
            },
            {
                attr: 'removeIcon',
                explain: "图片的移除功能，accept='image/jpeg,image/jpg,image/png'图片格式时生效",
                type: 'boolean',
                optionalValue: '',
                defaultValue: `true`
            }
        ]
    });
    let tableTableConfig = ref({
        showOverflowTooltip: false,
        headerBackground: true, //头部背景颜色
        pageConfig: false, //无分页
        border: false, //无边框
        columns: [
            {
                title: '属性',
                key: 'attr'
            },
            {
                title: '说明',
                key: 'explain'
            },
            {
                title: '类型',
                key: 'type'
            },
            {
                title: '可选值',
                key: 'optionalValue'
            },
            {
                title: '默认值',
                key: 'defaultValue'
            }
        ],
        tableData: [
            {
                attr: 'width',
                explain: 'y9Table表格宽度',
                type: 'string',
                optionalValue: '',
                defaultValue: `100%`
            },
            {
                attr: 'config',
                explain: 'y9Table表格的config属性配置，具体详情请参考y9Table的config属性说明',
                type: 'object',
                optionalValue: '',
                defaultValue: ``
            },
            {
                attr: 'events',
                explain: '事件配置',
                type: 'object',
                optionalValue: '',
                defaultValue: ``,
                id: 'events',
                children: [
                    {
                        attr: 'onChange',
                        explain:
                            '选择模式为radio模式或selection模式时，当选择项发生变化时会触发该事件。回调参数：id,data',
                        type: 'function',
                        optionalValue: '',
                        defaultValue: ``
                    },
                    {
                        attr: 'onCurrentChange',
                        explain:
                            '当表格的当前行发生变化的时候会触发该事件，如果要高亮当前行，请打开表格的 highlight-current-row 属性。回调参数：currentRow',
                        type: 'function',
                        optionalValue: '',
                        defaultValue: ``
                    },
                    {
                        attr: 'onCurrPageChange',
                        explain: '有分页时，当前页改变时触发。回调参数：currPage',
                        type: 'function',
                        optionalValue: '',
                        defaultValue: ``
                    },
                    {
                        attr: 'onPageSizeChange',
                        explain: '有分页时，每页条数改变时触发。回调参数：pageSize',
                        type: 'function',
                        optionalValue: '',
                        defaultValue: ``
                    },
                    {
                        attr: 'select',
                        explain: '当用户手动勾选数据行的 Checkbox 时触发的事件。回调参数：selection, row',
                        type: 'function',
                        optionalValue: '',
                        defaultValue: ``
                    },
                    {
                        attr: 'selectAll',
                        explain: '当用户手动勾选全选 Checkbox 时触发的事件。回调参数：selection',
                        type: 'function',
                        optionalValue: '',
                        defaultValue: ``
                    },
                    {
                        attr: 'cellMouseEnter',
                        explain: '当单元格 hover 进入时会触发该事件。回调参数：row, column, cell, event',
                        type: 'function',
                        optionalValue: '',
                        defaultValue: ``
                    },
                    {
                        attr: 'cellMouseLeave',
                        explain: '当单元格 hover 退出时会触发该事件。回调参数：row, column, cell, event',
                        type: 'function',
                        optionalValue: '',
                        defaultValue: ``
                    },
                    {
                        attr: 'cellClick',
                        explain: '当某个单元格被点击时会触发该事件。回调参数：row, column, cell, event',
                        type: 'function',
                        optionalValue: '',
                        defaultValue: ``
                    },
                    {
                        attr: 'cellDblclick',
                        explain: '当某个单元格被双击击时会触发该事件。回调参数：row, column, cell, event',
                        type: 'function',
                        optionalValue: '',
                        defaultValue: ``
                    },
                    {
                        attr: 'cellContextmenu',
                        explain: '当某个单元格被鼠标右键点击时会触发该事件。回调参数：row, column, cell, event',
                        type: 'function',
                        optionalValue: '',
                        defaultValue: ``
                    },
                    {
                        attr: 'rowClick',
                        explain: '当某一行被点击时会触发该事件。回调参数：row, column, event',
                        type: 'function',
                        optionalValue: '',
                        defaultValue: ``
                    },
                    {
                        attr: 'rowContextmenu',
                        explain: '当某一行被鼠标右键点击时会触发该事件。回调参数：row, column, event',
                        type: 'function',
                        optionalValue: '',
                        defaultValue: ``
                    },
                    {
                        attr: 'rowDblclick',
                        explain: '当某一行被双击时会触发该事件。回调参数：row, column, event',
                        type: 'function',
                        optionalValue: '',
                        defaultValue: ``
                    },
                    {
                        attr: 'headerClick',
                        explain: '当某一列的表头被点击时会触发该事件。回调参数：column, event',
                        type: 'function',
                        optionalValue: '',
                        defaultValue: ``
                    },
                    {
                        attr: 'headerContextmenu',
                        explain: '当某一列的表头被鼠标右键点击时触发该事件。回调参数：column, event',
                        type: 'function',
                        optionalValue: '',
                        defaultValue: ``
                    },
                    {
                        attr: 'sortChange',
                        explain: '当表格的排序条件发生变化的时候会触发该事件。回调参数：{ column, prop, order }',
                        type: 'function',
                        optionalValue: '',
                        defaultValue: ``
                    },
                    {
                        attr: 'filterChange',
                        explain:
                            'column 的 key， 如果需要使用 filter-change 事件，则需要此属性标识是哪个 column 的筛选条件。回调参数：filters',
                        type: 'function',
                        optionalValue: '',
                        defaultValue: ``
                    },
                    {
                        attr: 'headerDragend',
                        explain:
                            '当拖动表头改变了列的宽度的时候会触发该事件。回调参数：newWidth, oldWidth, column, event',
                        type: 'function',
                        optionalValue: '',
                        defaultValue: ``
                    },
                    {
                        attr: 'expandChange',
                        explain:
                            '当用户对某一行展开或者关闭的时候会触发该事件（展开行时，回调的第二个参数为 expandedRows；树形表格时第二参数为 expanded）。回调参数：row,expanded',
                        type: 'function',
                        optionalValue: '',
                        defaultValue: ``
                    }
                ]
            }
        ]
    });
    let textTableConfig = ref({
        showOverflowTooltip: false,
        headerBackground: true, //头部背景颜色
        pageConfig: false, //无分页
        border: false, //无边框
        columns: [
            {
                title: '属性',
                key: 'attr'
            },
            {
                title: '说明',
                key: 'explain'
            },
            {
                title: '类型',
                key: 'type'
            },
            {
                title: '可选值',
                key: 'optionalValue'
            },
            {
                title: '默认值',
                key: 'defaultValue'
            }
        ],
        tableData: [
            {
                attr: 'render',
                explain: '渲染函数',
                type: 'Function',
                optionalValue: '',
                defaultValue: ``
            },
            {
                attr: 'content',
                explain: '文本内容',
                type: 'string',
                optionalValue: '',
                defaultValue: ``
            }
        ]
    });
    let slotTableConfig = ref({
        showOverflowTooltip: false,
        headerBackground: true, //头部背景颜色
        pageConfig: false, //无分页
        border: false, //无边框
        columns: [
            {
                title: '属性',
                key: 'attr'
            },
            {
                title: '说明',
                key: 'explain'
            },
            {
                title: '类型',
                key: 'type'
            },
            {
                title: '可选值',
                key: 'optionalValue'
            },
            {
                title: '默认值',
                key: 'defaultValue'
            }
        ],
        tableData: [
            {
                attr: 'slotName',
                explain: '插槽名称',
                type: 'string',
                optionalValue: '',
                defaultValue: ``
            }
        ]
    });
    //y9Form实例方法说明表
    let instanceTableConfig = ref({
        showOverflowTooltip: false,
        headerBackground: true, //头部背景颜色
        pageConfig: false, //无分页
        border: false, //无边框
        columns: [
            {
                title: '属性',
                key: 'attr'
            },
            {
                title: '说明',
                key: 'explain'
            },
            {
                title: '类型',
                key: 'type'
            }
        ],
        tableData: [
            {
                attr: 'elFormRef',
                explain: 'el-form表单实例，具体请查看element-plus官网【2.2.19】版本',
                type: 'Object'
            },
            {
                attr: 'elUploadRef',
                explain: 'el-upload上传组件实例，具体请查看element-plus官网【2.2.19】版本',
                type: 'Object'
            },
            {
                attr: 'model',
                explain: '表单数据对象',
                type: 'Object'
            }
        ]
    });
    //查看代码弹窗
    let codeDialogConfig = ref({
        show: false,
        okText: '复制',
        onOk: (config) => {
            return new Promise((resolve, reject) => {
                const code = document.getElementById('code');
                window.getSelection().selectAllChildren(code);
                document.execCommand('copy');
                ElMessage({
                    message: '复制成功',
                    type: 'success'
                });
                reject();
            });
        }
    });

    //点击查看代码按钮时触发
    function onShowCode(type) {
        Object.assign(codeDialogConfig.value, {
            show: true,
            type: type
        });
        if (type == 'describeForm') {
            codeDialogConfig.value.codeText = `
<template>
	<div style="background-color: #fff;padding: 20px;">
		 <y9Form ref="y9FormDescribeRef" :config="describeFormConfig">
		 			 <template #submit>
		 				 <el-button class="global-btn-main" type="primary" 
		 				 @click="onDescribeFormSubmit">提交表单</el-button>
		 			 </template>
		 </y9Form>
	</div>
</template>
<script lang="ts" setup>
	  //描述类型的表单
	  const describeFormConfig = ref({
	  	descriptionsFormConfig:{//描述表单配置
	  		labelAlign:"center",
	  		labelWidth:"200px",
			contentWidth:"200px",
	  	},
	  	model:{},
	  	rules:{
	  		name:[
	  			{ required: true, message: '请输入姓名', trigger: 'blur' }
	  		],
	  		sex:[
	  			{ required: true, message: '请选择性别', trigger: 'change' }
	  		],
	  		zhiwu:[
	  			{ required: true, message: '请选择职务', trigger: 'change' }
	  		],
	  	},
	  	itemList:[
	  			{
	  				type:"input",
	  				prop:"name",
	  				label:"姓名",
	  			},
	  			{
	  				type:"radio",
	  				prop:"sex",
	  				label:"性别",
	  				props:{
	  					options:[
	  						{
	  							value: 1,
	  							label:"男"
	  						},
	  						{
	  							value: 0,
	  							label:"女"
	  						},
	  					]
	  				}
	  			},
	  			{
	  				type:"select",
	  				prop:"zhiwu",
	  				label:"职务",
	  				props:{
	  					options:[
	  						{
	  							label:"选项1",
	  							value:"opt1",
	  						},
	  						{
	  							label:"选项2",
	  							value:"opt2",
	  						},
	  					],
	  				}
	  			},
	  			{
	  				type:"slot",
	  				props:{
	  					slotName:"submit",//插槽名称
	  				},
	  			}
	  	  ]
	  })
	  
	  let y9FormDescribeRef = ref()
	  
	  function onDescribeFormSubmit(){
	  	y9FormDescribeRef.value.elFormRef.validate(valid => {
	  		if(valid){
	  			console.log("校验通过，表单数据为：",y9FormDescribeRef.value.model)
	  		}else {
	  			console.log("校验不通过")
	  		}
	  	})
	  }
<\/script>
		`;
        } else if (type == 'change-describeForm') {
            codeDialogConfig.value.codeText = `
<template>
	<div style="background-color: #fff;padding: 20px;">
		<div style="margin-bottom: 20px;">
			<template v-if="isEditState">
				<el-button type="primary"  class="global-btn-main" @click="onSave">保存</el-button>
				 <el-button class="global-btn-second" @click="onCancel">取消</el-button>
			</template>
			<el-button v-else type="primary"  class="global-btn-main" @click="onEdit">编辑</el-button>
		</div>
		 <y9Form ref="y9FormChangeDescribeRef" :config="describeChangeFormConfig">
		 </y9Form>
	</div>
</template>
<script lang="ts" setup>
	import { $keyNameAssign } from '@/utils/object';
	const describeChangeFormConfig = ref({
		descriptionsFormConfig:{//描述表单配置
			labelAlign:"center",
			labelWidth:"200px",
			contentWidth:"200px",
		},
		model:{//表单对象
			name:"",
			sex:"",
			zhiwu:"",
		},
		rules:{},//表单校验规则
		itemList:[
				{
					type:"text",
					type1:"input",//自定义字段-编辑时显示的类型
					type2:"text",//自定义字段-非编辑状态显示文本类型
					prop:"name",
					label:"姓名",
					props: {
						render: () => { //text类型渲染的内容
							return h('span',showInfo.value?.name)
						}
					}
				},
				{
					type:"text",
					type1:"radio",
					type2:"text",
					prop:"sex",
					label:"性别",
					props:{
						options:[
							{
								value: 1,
								label:"男"
							},
							{
								value: 0,
								label:"女"
							},
						],
						render: () => { //text类型渲染的内容
							return h('span',showInfo.value?.sex === 0 ? '女' : '男')
						}
					}
				},
				{
					type:"text",
					type1:"select",
					type2:"text",
					prop:"zhiwu",
					label:"职务",
					required:true,
					props:{
						options:[
							{
								label:"队长",
								value:"duizhang",
							},
							{
								label:"旗长",
								value:"qizhang",
							},
						],
						render: () => { //text类型渲染的内容
							return h('span',showInfo.value?.zhiwu === 'duizhang' ? '队长' : '旗长')
						}
					}
				},
		  ]
	})
	
	//非编辑状态的展示信息
	const showInfo = ref({
		name: 'y9组件',
		sex: 0,
		zhiwu:"duizhang",
	})
	const isEditState = ref(false);//是否为编辑状态
	const y9FormChangeDescribeRef = ref();//表单实例
	//改变y9Form显示类型
	function changeY9FormType(isEdit) {
		if(isEdit){ //编辑状态设置表单校验规则
			describeChangeFormConfig.value.rules = {
				name:[
					{ required: true, message: '请输入姓名', trigger: 'blur' }
				],
				sex:[
					{ required: true, message: '请选择性别', trigger: 'change' }
				],
				zhiwu:[
					{ required: true, message: '请选择职务', trigger: 'change' }
				],
			}
		}else { //非编辑状态取消表单校验
			describeChangeFormConfig.value.rules = {}
		}
		//编辑模式显示type1类型 非编辑模式显示type2类型
		describeChangeFormConfig.value.itemList.forEach(item => {
			item.type = isEdit ? item.type1 : item.type2
		})
	}
	//监听是否编辑状态
	watch(
		() => isEditState.value,
		(isEdit) => {
			if (isEdit) {//编辑状态
				$keyNameAssign(describeChangeFormConfig.value.model,showInfo.value);//编辑状态给表单赋值
			}
			changeY9FormType(isEdit);
		}
	)
	//编辑按钮事件
	function onEdit(){
		isEditState.value = true;
	}
	//取消按钮事件
	function onCancel(){
		isEditState.value = false;
	}
	//保存按钮事件
	function onSave(){
		y9FormChangeDescribeRef.value.elFormRef.validate(valid => {
			if(valid){
				console.log("校验通过，表单数据为：",y9FormChangeDescribeRef.value.model)
				showInfo.value = y9FormChangeDescribeRef.value.model;
				isEditState.value = false;
			}else {
				console.log("校验不通过")
			}
		})
	}
<\/script>
		`;
        } else if (type == 'typical') {
            codeDialogConfig.value.codeText = `
  <template>
  	<div style="background-color: #fff;padding: 20px;">
  		 <y9Form ref="y9FormRef" :config="formConfig">
  			 <template #submit>
  				 <el-button class="global-btn-main" type="primary" @click="onSubmit">提交表单</el-button>
  			 </template>
  		 </y9Form>
  	</div>
  </template>
  <script lang="ts" setup>
  	 let formConfig = ref({
  	 		model:{
  	 			input1:"我是默认值",
  	 			radio2:"opt2",
  	 		},
  	 		itemList:[
  	 			{
  	 				type:"input",
  	 				prop:"input1",
  	 				label:"输入框",
  	 			},
  	 			{
  	 				type:"input",
  	 				prop:"input2",
  	 				label:"有前置后置内容的输入框",
  	 				props:{
  	 					prependText:"https://",
  	 					appendText:".com"
  	 				}
  	 			},
  	 			{
  	 				type:"select",
  	 				prop:"select1",
  	 				label:"单选下拉框",
  	 				props:{
  	 					options:[
  	 						{
  	 							label:"选项1",
  	 							value:"opt1",
  	 						},
  	 						{
  	 							label:"选项2",
  	 							value:"opt2",
  	 						},
  	 					],
  	 				}
  	 			},
  	 			{
  	 				type:"select",
  	 				prop:"select2",
  	 				label:"多选下拉框",
  	 				props:{
  	 					multiple:true,
  	 					options:[
  	 						{
  	 							label:"选项1",
  	 							value:"opt1",
  	 						},
  	 						{
  	 							label:"选项2",
  	 							value:"opt2",
  	 						},
  	 					],
  	 				}
  	 			},
  	 			{
  	 				type:"date",
  	 				label:"日期选择器",
  	 				prop:'date',
  	 			},
				{
					type:"time",
					label:"时间选择器",
					prop:'time',
					props:{
						valueFormat:'HH:mm:ss'
					}
				},
				{
					type:"timeSelect",
					label:"时间选择",
					prop:'timeSelect',
					props:{
						start:"08:30",
						step:"00:15",
						end:"18:30",
					}
				},
  	 			{
  	 				type:"radio",//单选框类型
  	 				prop:"radio1",
  	 				label:"单选框1",//标签文本。类型：string
  	 				props:{//单选框类型的属性
  	 					radioType:"radio",//单选框展示类型：radio、button
  	 					options:[
  	 						{
  	 							label:"选项1",
  	 							value:"opt1",
  	 							// disabled:true,//是否禁用该选项，没有disabled字段默认为false
  	 							// border:true,//是否显示边框，当radioType='radio'时才有这个配置
  	 						},
  	 						{
  	 							label:"选项2",
  	 							value:"opt2",
  	 							// disabled:true,//是否禁用该选项，没有disabled字段默认为false
  	 							// border:true,//是否显示边框，当radioType='radio'时才有这个配置
  	 						},
  	 					],
  	 				},
  	 				
  	 			},
  	 			{
  	 				type:"radio",//单选框类型
  	 				prop:"radio2",
  	 				label:"单选框2",//标签文本。类型：string
  	 				props:{//单选框类型的属性
  	 					radioType:"radio",//单选框展示类型：radio、button
  	 					options:[
  	 						{
  	 							label:"选项1",
  	 							value:"opt1",
  	 							border:true,//是否显示边框，当radioType='radio'时才有这个配置
  	 						},
  	 						{
  	 							label:"选项2",
  	 							value:"opt2",
  	 							border:true,//是否显示边框，当radioType='radio'时才有这个配置
  	 						},
  	 					],
  	 				},
  	 				
  	 			},
  	 			{
  	 				type:"radio",//单选框类型
  	 				prop:"radio3",
  	 				label:"单选框3",//标签文本。类型：string
  	 				props:{//单选框类型的属性
  	 					radioType:"button",//单选框展示类型：radio、button
  	 					options:[
  	 						{
  	 							label:"选项1",
  	 							value:"opt1",
  	 						},
  	 						{
  	 							label:"选项2",
  	 							value:"opt2",
  	 						},
  	 					],
  	 				},
  	 				
  	 			},
  	 			{
  	 				type:"checkbox",//多选框类型
  	 				prop:"checkbox1",
  	 				label:"多选框1",//标签文本。类型：string
  	 				props:{//多选框类型的属性
  	 					checkboxType:"checkbox",//多选框展示类型：checkbox、button
  	 					showCheckedAll:true,//是否显示全选功能
  	 					isCheckedAll:false,//是否全选
  	 					options:[
  	 						{
  	 							label:"选项1",
  	 							value:"opt1",
  	 							// border:true,//是否显示边框，当checkboxType='checkbox'时才有这个配置
  	 							// disabled:true,//是否禁用该选项，没有disabled字段默认为false
  	 						},
  	 						{
  	 							label:"选项2",
  	 							value:"opt2",
  	 							// border:true,//是否显示边框，当checkboxType='checkbox'时才有这个配置
  	 							// disabled:true,//是否禁用该选项，没有disabled字段默认为false
  	 						},
  	 						{
  	 							label:"选项3",
  	 							value:"opt3",
  	 							// border:true,//是否显示边框，当checkboxType='checkbox'时才有这个配置
  	 							// disabled:true,//是否禁用该选项，没有disabled字段默认为false
  	 						},
  	 					],
  	 				},
  	 			},
  	 			{
  	 				type:"checkbox",//多选框类型
  	 				prop:"checkbox2",
  	 				label:"多选框2",//标签文本。类型：string
  	 				props:{//多选框类型的属性
  	 					checkboxType:"checkbox",//多选框展示类型：checkbox、button
  	 					showCheckedAll:true,//是否显示全选功能
  	 					isCheckedAll:false,//是否全选
  	 					options:[
  	 						{
  	 							label:"选项1",
  	 							value:"opt1",
  	 							border:true,//是否显示边框，当checkboxType='checkbox'时才有这个配置
  	 						},
  	 						{
  	 							label:"选项2",
  	 							value:"opt2",
  	 							border:true,//是否显示边框，当checkboxType='checkbox'时才有这个配置
  	 						},
  	 						{
  	 							label:"选项3",
  	 							value:"opt3",
  	 							border:true,//是否显示边框，当checkboxType='checkbox'时才有这个配置
  	 						},
  	 					],
  	 				},
  	 			},
  	 			{
  	 				type:"checkbox",//多选框类型
  	 				prop:"checkbox3",
  	 				label:"多选框3",//标签文本。类型：string
  	 				props:{//多选框类型的属性
  	 					checkboxType:"button",//多选框展示类型：checkbox、button
  	 					showCheckedAll:true,//是否显示全选功能
  	 					isCheckedAll:true,//是否全选
  	 					options:[
  	 						{
  	 							label:"选项1",
  	 							value:"opt1",
  	 						},
  	 						{
  	 							label:"选项2",
  	 							value:"opt2",
  	 						},
  	 						{
  	 							label:"选项3",
  	 							value:"opt3",
  	 						},
  	 					],
  	 				},
  	 			},
  	 			{
  	 				type:"switch",//switch开关类型
  	 				label:"switch开关",//标签文本。类型：string
  	 				prop:"switch",
  	 				
  	 			},
  	 			{
  	 				type:"upload",
  	 				prop:"upload",
  	 				label:"上传文件",//标签文本。类型：string
  	 				props:{
  	 					defaultCustomClass:'custom-picture-card',
  	 					listType:"picture-card",//"text" | "picture" | "picture-card"
  	 					limit:1,
  	 					drag:true,
						accept:'image/jpeg,image/jpg,image/png',
  	 					
  	 				}
  	 				
  	 			},
  	 			{
  	 				type:"table",//表格类型
  	 				label:"表格",
  	 				prop:'table',
  	 				props:{
  	 					width:"100%",
  	 					config:{//表格配置,具体配置查看y9Table组件
  	 						headerBackground:true,
  	 						border:false,
  	 						columns:[
  	 							{
  	 								type:"selection"
  	 							},
  	 							{
  	 								title:"名称",
  	 								key:"name"
  	 							},
  	 							{
  	 								title:"描述",
  	 								key:"describe"
  	 							}
  	 						],
  	 						tableData:[
  	 							{
  	 								id:"1",
  	 								name:"小鸥鸟1",
  	 								describe:"1111111",
  	 							},
  	 							{
  	 								id:"2",
  	 								name:"小鸥鸟2",
  	 								describe:"2222222",
  	 							},
  	 						]
  	 					},
  	 				},
  	 			},
  	 			{
  	 				type:"textarea",
  	 				label:"文本域",
  	 				prop:"textarea"
  	 				// props:{
  	 				// 	slotName:"submit",//插槽名称
  	 				// },
  	 			},
  	 			{
  	 				type:"text",//文本类型类型
  	 				label:"文本1",//标签文本。类型：string
  	 				props:{
  	 					content:"我是文本",//文本内容
  	 				},
  	 			},
  	 			{
  	 				type:"slot",
  	 				label:"自定义插槽按钮",
  	 				props:{
  	 					slotName:"submit",//插槽名称
  	 				},
  	 			}
  	 		]
  	 })
  	 let y9FormRef = ref();
  	 function onSubmit(){
  	   console.log('表单数据：',y9FormRef.value.model)
  	 }
  <\/script>
  		`;
        } else if (type == 'haveRule') {
            codeDialogConfig.value.codeText = `
<template>
	<div style="background-color: #fff;padding: 20px;">
		 <y9Form ref="y9FormRuleRef" :config="rulesFormConfig">
			 <template #submit>
				 <el-button class="global-btn-main" type="primary" @click="onRuleSubmit">提交表单</el-button>
			 </template>
		 </y9Form>
	</div>
</template>
<script lang="ts" setup>
	  let rulesFormConfig = ref({
	  	model:{},
	  	rules:{
	  		name:[
	  			{ required: true, message: '请输入姓名', trigger: 'blur' }
	  		],
	  		sex:[
	  			{ required: true, message: '请选择性别', trigger: 'change' }
	  		],
	  		zhiwu:[
	  			{ required: true, message: '请选择职务', trigger: 'change' }
	  		],
	  	  },
	  	itemList:[
	  			{
	  				type:"input",
	  				prop:"name",
	  				label:"姓名",
	  				required:true
	  			},
	  			{
	  				type:"radio",
	  				prop:"sex",
	  				label:"性别",
	  				required:true,
	  				props:{
	  					options:[
	  						{
	  							value:"male",
	  							label:"男"
	  						},
	  						{
	  							value:"famale",
	  							label:"女"
	  						},
	  					]
	  				}
	  			},
	  			{
	  				type:"select",
	  				prop:"zhiwu",
	  				label:"职务",
	  				required:true,
	  				props:{
	  					options:[
	  						{
	  							label:"选项1",
	  							value:"opt1",
	  						},
	  						{
	  							label:"选项2",
	  							value:"opt2",
	  						},
	  					],
	  				}
	  			},
	  			{
	  				type:"slot",
	  				props:{
	  					slotName:"submit",//插槽名称
	  				},
	  			}
	  	  ]
	  })
	  
	  let y9FormRuleRef = ref()
	  
	  function onRuleSubmit(){
	  	  y9FormRuleRef.value.elFormRef.validate(valid => {
	  	  	if(valid){
	  	  		console.log("校验通过，表单数据为：",y9FormRuleRef.value.model)
	  	  	}else {
	  	  		console.log("校验不通过")
	  	  	}
	  	  })
	  }
<\/script>
		`;
        } else if (type == 'inlineForm') {
            codeDialogConfig.value.codeText = `
<template>
	<div style="background-color: #fff;padding: 20px;">
		 <y9Form :config="inlineFormConfig"></y9Form>
	</div>
</template>
<script lang="ts" setup>
	let inlineFormConfig = ref({
		  model:{},
		  inline:true,
		  itemList:[
				{
					type:"input",
					prop:"name",
					label:"姓名",
				},
				{
					type:"radio",
					prop:"sex",
					label:"性别",
					props:{
						options:[
							{
								value:"male",
								label:"男"
							},
							{
								value:"famale",
								label:"女"
							},
						]
					}
				},
				{
					type:"select",
					prop:"zhiwu",
					label:"职务",
					props:{
						options:[
							{
								label:"选项1",
								value:"opt1",
							},
							{
								label:"选项2",
								value:"opt2",
							},
						],
					}
				},
		  ]
	})
	  
<\/script>
		`;
        }
    }
</script>

<style lang="scss" scoped></style>
