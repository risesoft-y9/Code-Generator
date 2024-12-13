<template>
    <div class="y9-title">
        <p>所有过滤展示：点击查询按钮获取过滤回调</p>
        <el-tag>设置属性: borderRadio="4px"</el-tag>
        <el-button
            :size="fontSizeObj.buttonSize"
            :style="{ fontSize: fontSizeObj.baseFontSize }"
            class="global-btn-main"
            style="margin-left: 10px"
            type="primary"
            @click="onShowCode('rightAngle')"
            >查看代码
        </el-button>
    </div>
    <y9Filter :itemList="baseItemList" borderRadio="4px"></y9Filter>

    <div class="y9-title">
        <p>圆角样式：只要值改变就能触发过滤回调</p>
        <el-tag>设置属性: borderRadio="30px"</el-tag>
        <el-button
            :size="fontSizeObj.buttonSize"
            :style="{ fontSize: fontSizeObj.baseFontSize }"
            class="global-btn-main"
            style="margin-left: 10px"
            type="primary"
            @click="onShowCode('circular')"
            >查看代码
        </el-button>
    </div>
    <y9Filter :filtersValueCallBack="filterCallback" :itemList="itemList" borderRadio="30px"></y9Filter>

    <div class="y9-title border-style">
        <p>有边框样式：只要值改变就能触发过滤回调</p>
        <el-tag>设置属性: showBorder="true"</el-tag>
        <el-button
            :size="fontSizeObj.buttonSize"
            :style="{ fontSize: fontSizeObj.baseFontSize }"
            class="global-btn-main"
            style="margin-left: 10px"
            type="primary"
            @click="onShowCode('haveBorder')"
            >查看代码
        </el-button>
    </div>
    <div style="background-color: #fff; padding: 20px">
        <y9Filter :itemList="itemList" borderRadio="4px" showBorder></y9Filter>
    </div>

    <div class="y9-title">y9Filter属性说明表</div>
    <y9Table :config="attrTableConfig"></y9Table>

    <div class="y9-title">y9Filter事件说明表</div>
    <y9Table :config="eventTableConfig"></y9Table>

    <div class="y9-title">itemList属性下的props属性配置</div>
    <el-tabs v-model="propsActiveName" class="demo-tabs" type="border-card">
        <el-tab-pane v-for="(item, index) in propsTabsArr" :key="index" :label="item" :name="item">
            <y9Table v-if="item == 'select'" :config="selectTableConfig"></y9Table>
            <y9Table v-if="item == 'input' || item == 'search'" :config="inputTableConfig"></y9Table>
            <template v-if="item == 'date'">
                <y9Table :config="dateTableConfig"></y9Table>
                <p>formatValueType属性的可选值说明：</p>
                <p>false：不格式化值</p>
                <p>year：年 (2022)</p>
                <p>shortDate： (2022-06-08)</p>
                <p>longDateTime： 年月日时分 (2022-06-14 00:00)</p>
                <p>longDateTimeSec： 年月日时分秒 (2022-06-15 00:00:00)</p>
                <p>textShortDate： 文本短日期 (2022年 06月 07日)</p>
                <p>timestampTens： 时间戳精确到秒</p>
                <p>timestampThirteen： 时间戳精确到毫秒</p>
            </template>
            <y9Table v-if="item == 'time'" :config="timeTableConfig"></y9Table>
            <y9Table v-if="item == 'timeSelect'" :config="timeSelectTableConfig"></y9Table>
            <y9Table v-if="item == 'switch'" :config="switchTableConfig"></y9Table>
            <y9Table v-if="item == 'radio'" :config="radioTableConfig"></y9Table>
            <y9Table v-if="item == 'checkbox'" :config="checkboxTableConfig"></y9Table>
            <y9Table v-if="item == 'actions'" :config="actionsTableConfig"></y9Table>
        </el-tab-pane>
    </el-tabs>

    <div class="y9-title">y9Filter实例说明表</div>
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
    import { inject } from 'vue'; // 注入 字体对象
    // 注入 字体对象
    const fontSizeObj: any = inject('sizeObjInfo');

    //所有过滤展示
    let baseItemList = ref([
        {
            type: 'select', //下拉框
            value: 'opt1', //值
            key: 'singleSelect',
            label: '单选下拉框', //label
            labelWidth: '80px', //label宽度，不设置默认自动随内容大小撑开
            labelAlign: 'right', //label对齐方式，left、right、center、justify（两边撑开）
            span: 6,
            props: {
                options: [
                    //选项列表
                    {
                        label: '选项1',
                        value: 'opt1'
                    },
                    {
                        label: '选项2',
                        value: 'opt2'
                    }
                ],
                multiple: false //是否可多选，多选时，value为array类型，单选时，数组为string类型
            }
        },
        {
            type: 'select', //下拉框
            value: ['opt1'], //值
            key: 'multipleSelect',
            label: '多选下拉框', //label
            labelWidth: '80px', //label宽度，不设置默认自动随内容大小撑开
            labelAlign: 'right', //label对齐方式，left、right、center、justify（两边撑开）
            span: 6,
            props: {
                options: [
                    //选项列表
                    {
                        label: '选项1',
                        value: 'opt1'
                    },
                    {
                        label: '选项2',
                        value: 'opt2'
                    }
                ],
                multiple: true //是否可多选，多选时，value为array类型，单选时，数组为string类型
            }
        },
        {
            type: 'input', //输入框
            value: '默认', //值，真正的值
            key: 'input',
            label: '输入框', //label
            labelWidth: '80px', //label宽度，不设置默认自动随内容大小撑开
            labelAlign: 'right', //label对齐方式，left、right、center、justify（两边撑开）
            span: 6
        },
        {
            type: 'search', //搜索框
            value: '', //值，真正的值
            key: 'search',
            label: '搜索框', //label
            labelWidth: '80px', //label宽度，不设置默认自动随内容大小撑开
            labelAlign: 'right', //label对齐方式，left、right、center、justify（两边撑开）
            span: 6
        },
        {
            type: 'date', //日期选择器
            value: '', //值
            key: 'date',
            label: '日期选择器', //label
            labelWidth: '80px', //label宽度，不设置默认自动随内容大小撑开
            labelAlign: 'right', //label对齐方式，left、right、center、justify（两边撑开）
            span: 6,
            props: {
                dateType: 'date', //日期类型year、month、date、dates、datetime、week、datetimerange、daterange、monthrange
                format: 'YYYY-MM-DD',
                formatValueType: 'timestampTens' //可选值为：false不格式化值，字符串：year年(2022)，shortDate(2022-06-08)，longDateTime年月日时分(2022-06-14 00:00)，longDateTimeSec年月日时分秒(2022-06-15 00:00:00)，textShortDate文本短日期(2022年 06月 07日)，timestampTens时间戳精确到秒，timestampThirteen时间戳精确到毫秒。
            }
        },
        {
            type: 'time', //时间选择器
            value: '18:00:00', //值
            key: 'time',
            label: '时间选择器', //label
            labelWidth: '80px', //label宽度，不设置默认自动随内容大小撑开
            labelAlign: 'right', //label对齐方式，left、right、center、justify（两边撑开）
            span: 6,
            props: {
                valueFormat: 'HH:mm:ss'
            }
        },
        {
            type: 'timeSelect', //时间选择
            value: '10:30', //值
            key: 'timeSelect',
            label: '时间选择', //label
            labelWidth: '80px', //label宽度，不设置默认自动随内容大小撑开
            labelAlign: 'right', //label对齐方式，left、right、center、justify（两边撑开）
            span: 6,
            props: {
                start: '08:30',
                step: '00:15',
                end: '18:30'
            }
        },
        {
            type: 'switch', //switch开关
            value: true, //值
            key: 'switch',
            label: 'switch开关', //label
            labelWidth: '80px', //label宽度，不设置默认自动随内容大小撑开
            labelAlign: 'right', //label对齐方式，left、right、center、justify（两边撑开）
            span: 6
        },
        {
            type: 'radio', //单选框
            value: 'opt2', //值
            key: 'radio',
            label: '单选框', //label
            labelWidth: '80px', //label宽度，不设置默认自动随内容大小撑开
            labelAlign: 'right', //label对齐方式，left、right、center、justify（两边撑开）
            span: 6,
            props: {
                options: [
                    //选项列表
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
                ],
                radioType: 'radio' //单选框展示类型：radio、button
            }
        },

        {
            type: 'radio', //单选框
            value: 'opt2', //值
            key: 'radioBorder',
            label: '单选框边框', //label
            labelWidth: '80px', //label宽度，不设置默认自动随内容大小撑开
            labelAlign: 'right', //label对齐方式，left、right、center、justify（两边撑开）
            span: 6,
            props: {
                options: [
                    //选项列表
                    {
                        label: '选项1',
                        value: 'opt1',
                        border: true
                    },
                    {
                        label: '选项2',
                        value: 'opt2',
                        border: true
                    }
                ],
                radioType: 'radio' //单选框展示类型：radio、button
            }
        },

        {
            type: 'radio', //单选框
            value: 'opt2', //值
            key: 'radioBtn',
            label: '单选框按钮', //label
            labelWidth: '80px', //label宽度，不设置默认自动随内容大小撑开
            labelAlign: 'right', //label对齐方式，left、right、center、justify（两边撑开）
            span: 6,
            props: {
                options: [
                    //选项列表
                    {
                        label: '选项1',
                        value: 'opt1'
                    },
                    {
                        label: '选项2',
                        value: 'opt2'
                    }
                ],
                radioType: 'button' //单选框展示类型：radio、button
            }
        },
        {
            type: 'checkbox', //多选框
            value: [], //值
            key: 'checkbox',
            label: '多选框', //label
            labelWidth: '80px', //label宽度，不设置默认自动随内容大小撑开
            labelAlign: 'right', //label对齐方式，left、right、center、justify（两边撑开）
            span: 6,
            props: {
                options: [
                    //选项列表
                    {
                        label: '选项1',
                        value: 'opt1'
                    },
                    {
                        label: '选项2',
                        value: 'opt2'
                    }
                ],
                checkboxType: 'checkbox', //多选框展示类型：checkbox、button
                showCheckedAll: true, //是否显示全选功能
                isCheckedAll: true //是否全选
            }
        },
        {
            type: 'checkbox', //多选框
            value: ['opt1'], //值
            key: 'checkboxBorder',
            label: '多选框边框', //label
            labelWidth: '80px', //label宽度，不设置默认自动随内容大小撑开
            labelAlign: 'right', //label对齐方式，left、right、center、justify（两边撑开）
            span: 6,
            props: {
                options: [
                    //选项列表
                    {
                        label: '选项1',
                        value: 'opt1',
                        border: true
                    },
                    {
                        label: '选项2',
                        value: 'opt2',
                        border: true
                    }
                ],
                checkboxType: 'checkbox', //多选框展示类型：checkbox、button
                showCheckedAll: true, //是否显示全选功能
                isCheckedAll: false //是否全选
            }
        },
        {
            type: 'checkbox', //多选框
            value: [], //值
            key: 'checkboxBtn',
            label: '多选框按钮', //label
            labelWidth: '80px', //label宽度，不设置默认自动随内容大小撑开
            labelAlign: 'right', //label对齐方式，left、right、center、justify（两边撑开）
            span: 6,
            props: {
                options: [
                    //选项列表
                    {
                        label: '选项1',
                        value: 'opt1',
                        disabled: true //是否禁用该选项，没有disabled字段默认为false
                    },
                    {
                        label: '选项2',
                        value: 'opt2'
                    }
                ],
                checkboxType: 'button', //多选框展示类型：checkbox、button
                showCheckedAll: true, //是否显示全选功能
                isCheckedAll: false //是否全选
            }
        },
        {
            labelWidth: '80px',
            type: 'actions',
            span: 6,
            props: {
                queryCallback: (filters) => {
                    console.log('过滤条件', filters);
                }
            }
        }
    ]);

    let itemList = ref([
        {
            type: 'select', //下拉框
            value: 'opt1', //值
            key: 'singleSelect',
            label: '单选下拉框', //label
            labelWidth: '80px', //label宽度，不设置默认自动随内容大小撑开
            labelAlign: 'right', //label对齐方式，left、right、center、justify（两边撑开）
            span: 6,
            props: {
                options: [
                    //选项列表
                    {
                        label: '选项1',
                        value: 'opt1'
                    },
                    {
                        label: '选项2',
                        value: 'opt2'
                    }
                ],
                multiple: false //是否可多选，多选时，value为array类型，单选时，数组为string类型
            }
        },
        {
            type: 'input', //输入框
            value: '默认', //值，真正的值
            key: 'input',
            label: '输入框', //label
            labelWidth: '80px', //label宽度，不设置默认自动随内容大小撑开
            labelAlign: 'right', //label对齐方式，left、right、center、justify（两边撑开）
            span: 6
        },
        {
            type: 'search', //搜索框
            value: '', //值，真正的值
            key: 'search',
            label: '搜索框', //label
            labelWidth: '80px', //label宽度，不设置默认自动随内容大小撑开
            labelAlign: 'right', //label对齐方式，left、right、center、justify（两边撑开）
            span: 6
        }
    ]);

    let filterCallback = (filters) => {
        console.log('过滤回调：', filters);
    };

    //y9Filter属性说明表
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
                attr: '* itemList',
                explain: '过滤列表，具体配置查看itemList属性的配置表',
                type: 'array',
                defaultValue: '所有的过滤',
                id: 'itemList',
                children: [
                    {
                        attr: '* type',
                        explain:
                            '过滤类型 目前的类型有：select | input | search | date | timeSelect | time | switch | radio | checkbox | slot | actions',
                        type: 'string',
                        defaultValue: ''
                    },
                    {
                        attr: 'value',
                        explain: '过滤值',
                        type: 'string，array',
                        optionalValue: '',
                        defaultValue: ''
                    },
                    {
                        attr: '* key',
                        explain: '唯一键值，作为需要返回的过滤字段',
                        type: 'string',
                        optionalValue: '',
                        defaultValue: ''
                    },
                    {
                        attr: 'span',
                        explain: '栅格占据的列数',
                        type: 'number',
                        optionalValue: '',
                        defaultValue: '6'
                    },
                    {
                        attr: 'label',
                        explain: '有值，就出现该值，为空则不出现',
                        type: 'string',
                        optionalValue: '',
                        defaultValue: ''
                    },
                    {
                        attr: 'labelWidth',
                        explain: 'label宽度，不设置默认自动随内容大小撑开',
                        type: 'string',
                        optionalValue: '',
                        defaultValue: 'auto'
                    },
                    {
                        attr: 'labelAlign',
                        explain: 'label对齐方式',
                        type: 'string',
                        optionalValue: 'left| right | center | justify（两边撑开）',
                        defaultValue: 'left'
                    },
                    {
                        attr: 'labelSlot',
                        explain: 'label插槽的名称，label可以通过插槽的方式定义',
                        type: 'string',
                        optionalValue: '',
                        defaultValue: ''
                    },
                    {
                        attr: 'labelRender',
                        explain: 'label可以通过render函数定义',
                        type: 'render',
                        optionalValue: '',
                        defaultValue: "举例：()=>{ return h('span','xxx')}"
                    },
                    {
                        attr: 'slotName',
                        explain: 'type:slot时生效，自定义插槽名称',
                        type: 'string',
                        optionalValue: '',
                        defaultValue: ''
                    },
                    {
                        attr: 'props',
                        explain:
                            '过滤条件的属性配置，每个type拥有的属性不相同，具体查看props属性配置表。type为slot，则没有这个属性',
                        type: 'object',
                        optionalValue: '',
                        defaultValue: ''
                    }
                ]
            },
            {
                attr: 'gutter',
                explain: '栅格间隔',
                type: 'string',
                defaultValue: '20'
            },
            {
                attr: 'itemMarginBottom',
                explain: '每个过滤条件的下边距',
                type: 'string',
                defaultValue: '20px'
            },
            {
                attr: 'filtersValueCallBack',
                explain: '当前过滤值回调',
                type: '(filters) =>{}',
                defaultValue: ''
            },
            {
                attr: 'borderRadio',
                explain: '圆角，建议值：30px或者4px',
                type: 'string',
                defaultValue: '30px'
            },
            {
                attr: 'showBorder',
                explain: '是否有边框',
                type: 'boolean',
                defaultValue: 'false'
            },
            {
                attr: 'fangDouTime',
                explain: '防抖时间，fangDouTime配置为0，即可立即返回过滤数据',
                type: 'Number',
                defaultValue: '500'
            }
        ]
    });

    //y9Filter事件说明表
    let eventTableConfig = ref({
        showOverflowTooltip: false,
        headerBackground: true, //头部背景颜色
        pageConfig: false, //无分页
        border: false, //无边框
        columns: [
            {
                title: '事件名',
                key: 'name',
                align: 'left'
            },
            {
                title: '说明',
                key: 'explain'
            },
            {
                title: '回调参数',
                key: 'callBack'
            }
        ],
        tableData: [
            {
                name: 'change',
                explain: '过滤值改变时触发',
                callBack: 'filters'
            }
        ]
    });

    //itemList属性下的props属性配置
    let propsActiveName = ref('select');
    let propsTabsArr = ref([
        'select',
        'input',
        'search',
        'date',
        'timeSelect',
        'time',
        'switch',
        'radio',
        'checkbox',
        'actions'
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
                attr: 'formatValueType',
                explain: '格式化value值',
                type: 'string | false',
                optionalValue:
                    'false | year | shortDate | longDateTime | longDateTimeSec | textShortDate | timestampTens | timestampThirteen',
                defaultValue: `timestampTens`
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
    let actionsTableConfig = ref({
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
                attr: 'queryText',
                explain: '查询按钮名称',
                type: 'String',
                optionalValue: '',
                defaultValue: `查询`
            },
            {
                attr: 'resetText',
                explain: '重置按钮名称',
                type: 'String',
                optionalValue: '',
                defaultValue: `重置`
            },
            {
                attr: 'hiddenQuery',
                explain: '是否隐藏查询按钮',
                type: 'boolean',
                optionalValue: 'true | false',
                defaultValue: `false`
            },
            {
                attr: 'hiddenReset',
                explain: '是否隐藏重置按钮',
                type: 'boolean',
                optionalValue: 'true | false',
                defaultValue: `false`
            },
            {
                attr: 'queryCallback',
                explain: '查询回调，即过滤回调',
                type: '(filters) => {}',
                optionalValue: '',
                defaultValue: ``
            }
        ]
    });

    //y9Filter实例说明表
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
                attr: 'y9FilterRef',
                explain: '过滤组件实例',
                type: 'Object'
            },
            {
                attr: 'onReset',
                explain: '重置过滤',
                type: 'Function'
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

    function onShowCode(type) {
        Object.assign(codeDialogConfig.value, {
            show: true,
            type: type
        });
        if (type == 'rightAngle') {
            codeDialogConfig.value.codeText = `
<template>
	<y9Filter :itemList="baseItemList" borderRadio="4px">
	</y9Filter>
</template>
<script lang="ts" setup>
	  let baseItemList = ref([
	  	{
	  		type: 'select', //下拉框
	  		value: "opt1", //值
	  		key: "singleSelect",
	  		label: "单选下拉框", //label
	  		labelWidth: "80px", //label宽度，不设置默认自动随内容大小撑开
	  		labelAlign: "right", //label对齐方式，left、right、center、justify（两边撑开）
	  		span: 6,
	  		props: {
	  			options: [ //选项列表
	  				{
	  					label: "选项1",
	  					value: "opt1"
	  				},
	  				{
	  					label: "选项2",
	  					value: "opt2"
	  				},
	  			],
	  			multiple: false, //是否可多选，多选时，value为array类型，单选时，数组为string类型
	  		},
	  	},
	  	{
	  		type: 'select', //下拉框
	  		value: ['opt1'], //值
	  		key: "multipleSelect",
	  		label: "多选下拉框", //label
	  		labelWidth: "80px", //label宽度，不设置默认自动随内容大小撑开
	  		labelAlign: "right", //label对齐方式，left、right、center、justify（两边撑开）
	  		span: 6,
	  		props: {
	  			options: [ //选项列表
	  				{
	  					label: "选项1",
	  					value: "opt1"
	  				},
	  				{
	  					label: "选项2",
	  					value: "opt2"
	  				},
	  			],
	  			multiple: true, //是否可多选，多选时，value为array类型，单选时，数组为string类型
	  
	  		},
	  	},
	  	{
	  		type: 'input', //输入框
	  		value: "默认", //值，真正的值
	  		key: "input",
	  		label: "输入框", //label
	  		labelWidth: "80px", //label宽度，不设置默认自动随内容大小撑开
	  		labelAlign: "right", //label对齐方式，left、right、center、justify（两边撑开）
	  		span: 6,
	  	},
	  	{
	  		type: 'search', //搜索框
	  		value: "", //值，真正的值
	  		key: "search",
	  		label: "搜索框", //label
	  		labelWidth: "80px", //label宽度，不设置默认自动随内容大小撑开
	  		labelAlign: "right", //label对齐方式，left、right、center、justify（两边撑开）
	  		span: 6,
	  	},
	  	{
	  		type: 'date', //日期选择器
	  		value: "", //值
	  		key: "date",
	  		label: "日期选择器", //label
	  		labelWidth: "80px", //label宽度，不设置默认自动随内容大小撑开
	  		labelAlign: "right", //label对齐方式，left、right、center、justify（两边撑开）
	  		span: 6,
	  		props: {
	  			dateType: "date", //日期类型year、month、date、dates、datetime、week、datetimerange、daterange、monthrange
	  			format: "YYYY-MM-DD",
	  			formatValueType: "timestampTens", //可选值为：false不格式化值，字符串：year年(2022)，shortDate(2022-06-08)，longDateTime年月日时分(2022-06-14 00:00)，longDateTimeSec年月日时分秒(2022-06-15 00:00:00)，textShortDate文本短日期(2022年 06月 07日)，timestampTens时间戳精确到秒，timestampThirteen时间戳精确到毫秒。
	  		},
	  	},
		{
			type: 'time', //时间选择器
			value: "18:00:00", //值
			key: "time",
			label: "时间选择器", //label
			labelWidth: "80px", //label宽度，不设置默认自动随内容大小撑开
			labelAlign: "right", //label对齐方式，left、right、center、justify（两边撑开）
			span: 6,
			props: {
				valueFormat:'HH:mm:ss'
			},
		},
		{
			type: 'timeSelect', //时间选择
			value: "10:30", //值
			key: "timeSelect",
			label: "时间选择", //label
			labelWidth: "80px", //label宽度，不设置默认自动随内容大小撑开
			labelAlign: "right", //label对齐方式，left、right、center、justify（两边撑开）
			span: 6,
			props: {
				start:"08:30",
				step:"00:15",
				end:"18:30",
			},
		},
		{
			type: 'switch', //switch开关
			value: true, //值
			key: "switch",
			label: "switch开关", //label
			labelWidth: "80px", //label宽度，不设置默认自动随内容大小撑开
			labelAlign: "right", //label对齐方式，left、right、center、justify（两边撑开）
			span: 6,
		},
	  	{
	  		type: 'radio', //单选框
	  		value: "opt2", //值
	  		key: "radio",
	  		label: "单选框", //label
	  		labelWidth: "80px", //label宽度，不设置默认自动随内容大小撑开
	  		labelAlign: "right", //label对齐方式，left、right、center、justify（两边撑开）
	  		span: 6,
	  		props: {
	  			options: [ //选项列表
	  				{
	  					label: "选项1",
	  					value: "opt1",
	  				},
	  				{
	  					label: "选项2",
	  					value: "opt2",
	  				},
	  				{
	  					label: "选项3",
	  					value: "opt3",
	  				},
	  			],
	  			radioType: 'radio', //单选框展示类型：radio、button
	  		},
	  	},
	  
	  	{
	  		type: 'radio', //单选框
	  		value: "opt2", //值
	  		key: "radioBorder",
	  		label: "单选框边框", //label
	  		labelWidth: "80px", //label宽度，不设置默认自动随内容大小撑开
	  		labelAlign: "right", //label对齐方式，left、right、center、justify（两边撑开）
	  		span: 6,
	  		props: {
	  			options: [ //选项列表
	  				{
	  					label: "选项1",
	  					value: "opt1",
	  					border:true,
	  				},
	  				{
	  					label: "选项2",
	  					value: "opt2",
	  					border:true,
	  				},
	  			],
	  			radioType: 'radio', //单选框展示类型：radio、button
	  		},
	  	},
	  
	  	{
	  		type: 'radio', //单选框
	  		value: "opt2", //值
	  		key: "radioBtn",
	  		label: "单选框按钮", //label
	  		labelWidth: "80px", //label宽度，不设置默认自动随内容大小撑开
	  		labelAlign: "right", //label对齐方式，left、right、center、justify（两边撑开）
	  		span: 6,
	  		props: {
	  			options: [ //选项列表
	  				{
	  					label: "选项1",
	  					value: "opt1",
	  				},
	  				{
	  					label: "选项2",
	  					value: "opt2",
	  				},
	  			],
	  			radioType: 'button', //单选框展示类型：radio、button
	  		},
	  
	  	},
	  	{
	  		type: 'checkbox', //多选框
	  		value: [], //值
	  		key: "checkbox",
	  		label: "多选框", //label
	  		labelWidth: "80px", //label宽度，不设置默认自动随内容大小撑开
	  		labelAlign: "right", //label对齐方式，left、right、center、justify（两边撑开）
	  		span: 6,
	  		props: {
	  			options: [ //选项列表
	  				{
	  					label: "选项1",
	  					value: "opt1",
	  				},
	  				{
	  					label: "选项2",
	  					value: "opt2",
	  				},
	  			],
	  			checkboxType: 'checkbox', //多选框展示类型：checkbox、button
	  			showCheckedAll: true, //是否显示全选功能
	  			isCheckedAll: true, //是否全选
	  		},
	  
	  	},
	  	{
	  		type: 'checkbox', //多选框
	  		value: ['opt1'], //值
	  		key: "checkboxBorder",
	  		label: "多选框边框", //label
	  		labelWidth: "80px", //label宽度，不设置默认自动随内容大小撑开
	  		labelAlign: "right", //label对齐方式，left、right、center、justify（两边撑开）
	  		span: 6,
	  		props: {
	  			options: [ //选项列表
	  				{
	  					label: "选项1",
	  					value: "opt1",
	  					border:true,
	  				},
	  				{
	  					label: "选项2",
	  					value: "opt2",
	  					border:true,
	  				},
	  			],
	  			checkboxType: 'checkbox', //多选框展示类型：checkbox、button
	  			showCheckedAll: true, //是否显示全选功能
	  			isCheckedAll: false, //是否全选
	  		},
	  
	  	},
	  	{
	  		type: 'checkbox', //多选框
	  		value: [], //值
	  		key: "checkboxBtn",
	  		label: "多选框按钮", //label
	  		labelWidth: "80px", //label宽度，不设置默认自动随内容大小撑开
	  		labelAlign: "right", //label对齐方式，left、right、center、justify（两边撑开）
	  		span: 6,
	  		props: {
	  			options: [ //选项列表
	  				{
	  					label: "选项1",
	  					value: "opt1",
	  					disabled: true, //是否禁用该选项，没有disabled字段默认为false
	  				},
	  				{
	  					label: "选项2",
	  					value: "opt2",
	  				},
	  			],
	  			checkboxType: 'button', //多选框展示类型：checkbox、button
	  			showCheckedAll: true, //是否显示全选功能
	  			isCheckedAll: false, //是否全选 
	  		},
	  
	  	},
	  	{
	  		labelWidth:"80px",
	  		type:"actions",
	  		span:6,
	  		props:{
	  			queryCallback:(filters)=>{
	  				console.log("过滤条件",filters)
	  			}
	  		}
	  	}
	  ])
<\/script>
		`;
        } else if (type == 'circular') {
            codeDialogConfig.value.codeText = `
<template>
	<y9Filter :itemList="itemList" :filtersValueCallBack="filterCallback" borderRadio="30px">
	</y9Filter>
</template>
<script lang="ts" setup>
	let itemList = ref([
		{
			type: 'select', //下拉框
			value: "opt1", //值
			key: "singleSelect",
			label: "单选下拉框", //label
			labelWidth: "80px", //label宽度，不设置默认自动随内容大小撑开
			labelAlign: "right", //label对齐方式，left、right、center、justify（两边撑开）
			span: 6,
			props: {
				options: [ //选项列表
					{
						label: "选项1",
						value: "opt1"
					},
					{
						label: "选项2",
						value: "opt2"
					},
				],
				multiple: false, //是否可多选，多选时，value为array类型，单选时，数组为string类型
			},
		},
		{
			type: 'input', //输入框
			value: "默认", //值，真正的值
			key: "input",
			label: "输入框", //label
			labelWidth: "80px", //label宽度，不设置默认自动随内容大小撑开
			labelAlign: "right", //label对齐方式，left、right、center、justify（两边撑开）
			span: 6,
		},
		{
			type: 'search', //搜索框
			value: "", //值，真正的值
			key: "search",
			label: "搜索框", //label
			labelWidth: "80px", //label宽度，不设置默认自动随内容大小撑开
			labelAlign: "right", //label对齐方式，left、right、center、justify（两边撑开）
			span: 6,
		},
	])
	let filterCallback = (filters) => {
		console.log("过滤回调：",filters)
	}
<\/script>
		`;
        } else if (type == 'haveBorder') {
            codeDialogConfig.value.codeText = `
<template>
	<div style="background-color: #fff;padding: 20px;">
		<y9Filter
		:itemList="itemList"
		:filtersValueCallBack="filterCallback"
		borderRadio="4px"
		showBorder>
		</y9Filter>
	</div>
</template>
<script lang="ts" setup>
	let itemList = ref([
		{
			type: 'select', //下拉框
			value: "opt1", //值
			key: "singleSelect",
			label: "单选下拉框", //label
			labelWidth: "80px", //label宽度，不设置默认自动随内容大小撑开
			labelAlign: "right", //label对齐方式，left、right、center、justify（两边撑开）
			span: 6,
			props: {
				options: [ //选项列表
					{
						label: "选项1",
						value: "opt1"
					},
					{
						label: "选项2",
						value: "opt2"
					},
				],
				multiple: false, //是否可多选，多选时，value为array类型，单选时，数组为string类型
			},
		},
		{
			type: 'input', //输入框
			value: "默认", //值，真正的值
			key: "input",
			label: "输入框", //label
			labelWidth: "80px", //label宽度，不设置默认自动随内容大小撑开
			labelAlign: "right", //label对齐方式，left、right、center、justify（两边撑开）
			span: 6,
		},
		{
			type: 'search', //搜索框
			value: "", //值，真正的值
			key: "search",
			label: "搜索框", //label
			labelWidth: "80px", //label宽度，不设置默认自动随内容大小撑开
			labelAlign: "right", //label对齐方式，left、right、center、justify（两边撑开）
			span: 6,
		},
	])
	let filterCallback = (filters) => {
		console.log("过滤回调：",filters)
	}
<\/script>
		`;
        }
    }
</script>

<style lang="scss" scoped>
    .border-style {
        :deep(.y9-filter-item) {
            .el-input__wrapper {
                .el-input__inner {
                    border-radius: 0px;
                    box-shadow: none;
                    border: none;
                }
            }
        }
    }
</style>
