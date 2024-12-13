<template>
    <div class="y9-title">
        基础表格
        <el-button
            :size="fontSizeObj.buttonSize"
            :style="{ fontSize: fontSizeObj.baseFontSize }"
            class="global-btn-main"
            style="margin-left: 10px"
            type="primary"
            @click="onShowCode('base')"
            >查看代码
        </el-button>
    </div>
    <y9Table :config="y9TableConfig"></y9Table>

    <div class="y9-title">
        有过滤条件和分页的表格
        <el-button
            :size="fontSizeObj.buttonSize"
            :style="{ fontSize: fontSizeObj.baseFontSize }"
            class="global-btn-main"
            style="margin-left: 10px"
            type="primary"
            @click="onShowCode('haveFiltersAndPage')"
            >查看代码
        </el-button>
    </div>
    <y9Table :config="y9TableConfig2" :filterConfig="filterConfig"></y9Table>

    <div class="y9-title">
        分页具有记忆性
        <el-button
            :size="fontSizeObj.buttonSize"
            :style="{ fontSize: fontSizeObj.baseFontSize }"
            class="global-btn-main"
            style="margin-left: 10px"
            type="primary"
            @click="onShowCode('memory')"
            >查看代码
        </el-button>
    </div>
    <y9Table :config="y9TableConfigUnique" :cuPageMemory="true" uniqueIdent="memory"></y9Table>

    <div class="y9-title">
        单选表格
        <el-button
            :size="fontSizeObj.buttonSize"
            :style="{ fontSize: fontSizeObj.baseFontSize }"
            class="global-btn-main"
            style="margin-left: 10px"
            type="primary"
            @click="onShowCode('radioTable')"
            >查看代码
        </el-button>
    </div>
    当前选中值：{{ selectedRadioVal }}
    <y9Table v-model:selectedVal="selectedRadioVal" :config="y9TableRadioConfig"></y9Table>

    <div class="y9-title">
        多选表格
        <el-button
            :size="fontSizeObj.buttonSize"
            :style="{ fontSize: fontSizeObj.baseFontSize }"
            class="global-btn-main"
            style="margin-left: 10px"
            type="primary"
            @click="onShowCode('multipleTable')"
            >查看代码
        </el-button>
    </div>
    当前选中值：{{ selectedCheckboxVal }}
    <y9Table v-model:selectedVal="selectedCheckboxVal" :config="y9TableCheckboxConfig"></y9Table>

    <div class="y9-title">
        展开行表格 自定义展开行内容
        <el-button
            :size="fontSizeObj.buttonSize"
            :style="{ fontSize: fontSizeObj.baseFontSize }"
            class="global-btn-main"
            style="margin-left: 10px"
            type="primary"
            @click="onShowCode('expandTable')"
            >查看代码
        </el-button>
    </div>
    <y9Table :config="y9TableExpandConfig">
        <template #childContent="props">
            <div style="padding: 20px">
                <ul style="list-style: none; line-height: 36px">
                    <li>姓名： {{ props.row.name }}</li>
                    <li>性别： {{ props.row.sex }}</li>
                    <li>所在部门： {{ props.row.department }}</li>
                </ul>
            </div>
        </template>
    </y9Table>

    <div class="y9-title">
        tree懒加载表格
        <el-button
            :size="fontSizeObj.buttonSize"
            :style="{ fontSize: fontSizeObj.baseFontSize }"
            class="global-btn-main"
            style="margin-left: 10px"
            type="primary"
            @click="onShowCode('lazyTable')"
            >查看代码
        </el-button>
    </div>
    当前选中值：{{ lazy_selectedRadioVal }}
    <y9Table v-model:selectedVal="lazy_selectedRadioVal" :config="y9TableLazyConfig"></y9Table>

    <div class="y9-title">
        合并列表格
        <el-button
            :size="fontSizeObj.buttonSize"
            :style="{ fontSize: fontSizeObj.baseFontSize }"
            class="global-btn-main"
            style="margin-left: 10px"
            type="primary"
            @click="onShowCode('span-method-column')"
            >查看代码
        </el-button>
    </div>
    <y9Table :config="y9TableSpanMethodColumnConfig"></y9Table>

    <div class="y9-title">
        合并行表格
        <el-button
            :size="fontSizeObj.buttonSize"
            :style="{ fontSize: fontSizeObj.baseFontSize }"
            class="global-btn-main"
            style="margin-left: 10px"
            type="primary"
            @click="onShowCode('span-method-row')"
            >查看代码
        </el-button>
    </div>
    <y9Table :config="y9TableSpanMethodRowConfig"></y9Table>

    <p style="color: red; margin-top: 40px">
        温馨提示:该组件根据elment-plus的table组件的基础上进行二次封装,如果看以下文档仍然不理解用法,可以查看elment-plus的官网说明
        <a href="https://element-plus.gitee.io/en-US/component/table.html#table">传送门</a>
    </p>

    <div class="y9-title">y9Table属性说明表</div>
    <y9Table :config="attrTableConfig"></y9Table>

    <div class="y9-title">y9Table事件说明表</div>
    <y9Table :config="eventTableConfig"></y9Table>

    <div class="y9-title">y9Table实例</div>
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
    import { inject } from 'vue';
    import { getStorageCurrPage, getStoragePageSize } from '@/utils/index';
    // 注入 字体对象
    const fontSizeObj: any = inject('sizeObjInfo');
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
    //基础表格
    let y9TableConfig = ref({
        columns: [
            {
                type: 'index',
                title: '序号',
                width: 60
            },
            {
                title: '姓名',
                key: 'name'
            },
            {
                title: '性别',
                key: 'sex'
            },
            {
                title: '所在部门',
                key: 'department'
            },
            {
                title: '操作',
                render: (row) => {
                    return h('span', '详情');
                }
            }
        ],
        tableData: [
            {
                id: '1',
                name: '小红',
                sex: '女',
                department: '运营部'
            },
            {
                id: '2',
                name: '小白小白小白小白小白小白小白小白小白小白小白小白小白小白小白小白小白小白小白小白小白小白小白小白小白小白小白小白小白',
                sex: '男',
                department: '技术部'
            }
        ],
        pageConfig: false
    });

    //有过滤条件和分页的表格
    let y9TableConfig2 = ref({
        headerBackground: true,
        pageConfig: {
            background: false, //是否显示背景色
            layout: 'prev, pager, next,sizes', //布局
            currentPage: 1, //当前页数，支持 v-model 双向绑定
            pageSize: 5, //每页显示条目个数，支持 v-model 双向绑定
            total: 2, //总条目数
            pageSizeOpts: [5, 10, 20, 30, 40, 1000] //每页显示个数选择器的选项设置
        },
        columns: [
            {
                type: 'index',
                title: '序号',
                width: 60
            },
            {
                title: '姓名',
                key: 'name'
            },
            {
                title: '性别',
                key: 'sex'
            },
            {
                title: '所在部门',
                key: 'department'
            },
            {
                title: '操作',
                render: (row) => {
                    return h('span', '详情');
                }
            }
        ],
        tableData: [
            {
                id: '1',
                name: '小红',
                sex: '女',
                department: '运营部'
            },
            {
                id: '2',
                name: '小白',
                sex: '男',
                department: '技术部'
            }
        ]
    });

    //有过滤条件和分页的表格
    let y9TableConfigUnique = ref({
        headerBackground: true,
        pageConfig: {
            background: false, //是否显示背景色
            layout: 'prev, pager, next,sizes', //布局
            currentPage: getStorageCurrPage('memory', 1), //当前页数，支持 v-model 双向绑定
            pageSize: getStoragePageSize('memory', 5), //每页显示条目个数，支持 v-model 双向绑定
            total: 2, //总条目数
            pageSizeOpts: [5, 10, 20, 30, 40, 1000] //每页显示个数选择器的选项设置
        },
        columns: [
            {
                type: 'index',
                title: '序号',
                width: 60
            },
            {
                title: '姓名',
                key: 'name'
            },
            {
                title: '性别',
                key: 'sex'
            },
            {
                title: '所在部门',
                key: 'department'
            },
            {
                title: '操作',
                render: (row) => {
                    return h('span', '详情');
                }
            }
        ],
        tableData: [
            {
                id: '1',
                name: '小红',
                sex: '女',
                department: '运营部'
            },
            {
                id: '2',
                name: '小白',
                sex: '男',
                department: '技术部'
            }
        ]
    });

    let filterConfig = ref({
        itemList: [
            {
                type: 'input',
                key: 'name',
                span: 6
            }
        ],
        filtersValueCallBack: (filters) => {
            console.log('过滤值', filters);
        }
    });

    //单选表格
    let y9TableRadioConfig = ref({
        headerBackground: true,
        columns: [
            {
                type: 'radio',
                width: 60
            },

            {
                type: 'index',
                title: '序号',
                width: 60
            },
            {
                title: '姓名',
                key: 'name'
            },
            {
                title: '性别',
                key: 'sex'
            },
            {
                title: '所在部门',
                key: 'department'
            },
            {
                title: '操作',
                render: (row) => {
                    return h('span', '详情');
                }
            }
        ],
        tableData: [
            {
                name: '小红',
                sex: '女',
                department: '运营部',
                id: 1
            },
            {
                name: '小白',
                sex: '男',
                department: '技术部',
                id: 2
            }
        ]
    });
    let selectedRadioVal = ref(2);
    //多选表格
    let y9TableCheckboxConfig = ref({
        headerBackground: true,
        columns: [
            {
                type: 'selection',
                width: 60
            },

            {
                type: 'index',
                title: '序号',
                width: 60
            },
            {
                title: '姓名',
                key: 'name'
            },
            {
                title: '性别',
                key: 'sex'
            },
            {
                title: '所在部门',
                key: 'department'
            },
            {
                title: '操作',
                render: (row) => {
                    return h('span', '详情');
                }
            }
        ],
        tableData: [
            {
                name: '小红',
                sex: '女',
                department: '运营部',
                id: 1
            },
            {
                name: '小白',
                sex: '男',
                department: '技术部',
                id: 2
            }
        ]
    });
    let selectedCheckboxVal = ref([1, 2]);

    //展开行表格 自定义展开行内容
    let y9TableExpandConfig = ref({
        border: false,
        headerBackground: true,
        columns: [
            {
                type: 'expand',
                slot: 'childContent',
                width: 60
            },
            {
                title: '姓名',
                key: 'name'
            },
            {
                title: '性别',
                key: 'sex'
            },
            {
                title: '所在部门',
                key: 'department'
            },
            {
                title: '操作',
                render: (row) => {
                    return h('span', '详情');
                }
            }
        ],
        tableData: [
            {
                name: '小红',
                sex: '女',
                department: '运营部',
                id: 1
            },
            {
                name: '小白',
                sex: '男',
                department: '技术部',
                id: 2
            }
        ],
        pageConfig: false //不分页
    });

    //tree懒加载表格
    const load = (row, treeNode, resolve) => {
        setTimeout(() => {
            const data = [
                {
                    id: row.id + '-1',
                    name: '子级数据 ' + row.id + '-1',
                    sex: '男',
                    department: '销售部'
                },
                {
                    id: row.id + '-2',
                    name: '子级数据 ' + row.id + '-2',
                    sex: '男',
                    department: '销售部'
                }
            ];
            resolve(data);
        }, 1000);
    };
    let y9TableLazyConfig = ref({
        rowKey: 'id', //懒加载必须设置rowKey
        load: load, //懒加载回调函数
        lazy: true, //懒加载
        pageConfig: false, //不分页
        border: false,
        headerBackground: true,
        columns: [
            {
                type: 'radio',
                width: 70,
                fixed: 'left'
            },
            {
                title: '姓名',
                key: 'name'
            },
            {
                title: '性别',
                key: 'sex'
            },
            {
                title: '所在部门',
                key: 'department'
            },
            {
                title: '操作',
                fixed: 'right',
                width: 200,
                render: (row) => {
                    return h('span', '详情');
                }
            }
        ],
        tableData: [
            {
                name: '一级数据 1',
                sex: '女',
                department: '运营部',
                id: '1',
                hasChildren: true
            },
            {
                name: '一级数据 1',
                sex: '男',
                department: '技术部',
                id: '2',
                hasChildren: true
            }
        ]
    });
    let lazy_selectedRadioVal = ref('2');

    //合并列表格
    const y9TableSpanMethodColumnConfig = ref({
        headerBackground: true,
        border: true,
        columns: [
            {
                title: '姓名',
                key: 'name',
                width: 300
            },
            {
                title: '性别',
                key: 'sex',
                width: 300
            },
            {
                title: '所在部门',
                key: 'department'
            },
            {
                title: '操作',
                width: 200,
                render: (row) => {
                    return h('span', '详情');
                }
            }
        ],
        tableData: [],
        pageConfig: false,
        spanMethod: ({ row, column, rowIndex, columnIndex }) => {
            //该函数可以返回一个包含两个元素的数组，第一个元素代表 rowspan，第二个元素代表 colspan。 也可以返回一个键名为 rowspan 和 colspan 的对象。
            if (columnIndex === 0) {
                if (rowIndex % 2 === 0) {
                    //1. 可以返回对象
                    return {
                        rowspan: 2,
                        colspan: 1
                    };
                    //2. 可以返回数组
                    // return [2,1]
                } else {
                    //1. 可以返回对象
                    return {
                        rowspan: 0,
                        colspan: 0
                    };
                    //2. 可以返回数组
                    // return [0, 0]
                }
            }
        }
    });
    //模拟数据
    for (let i = 1; i <= 100; i++) {
        y9TableSpanMethodColumnConfig.value.tableData.push({
            id: i,
            name: '小白' + i,
            sex: '男',
            department: '技术部'
        });
    }

    //合并行表格
    const y9TableSpanMethodRowConfig = ref({
        headerBackground: true,
        border: true,
        columns: [
            {
                title: '姓名',
                key: 'name',
                width: 300
            },
            {
                title: '性别',
                key: 'sex',
                width: 300
            },
            {
                title: '所在部门',
                key: 'department'
            },
            {
                title: '操作',
                width: 200,
                render: (row) => {
                    return h('span', '详情');
                }
            }
        ],
        tableData: [],
        pageConfig: false,
        spanMethod: ({ row, column, rowIndex, columnIndex }) => {
            //该函数可以返回一个包含两个元素的数组，第一个元素代表 rowspan，第二个元素代表 colspan。 也可以返回一个键名为 rowspan 和 colspan 的对象。
            if (columnIndex === 0) {
                //1. 可以返回对象
                return {
                    rowspan: 1,
                    colspan: 2
                };
                //2. 可以返回数组
                // return [1, 2]
            } else if (columnIndex === 1) {
                //1. 可以返回对象
                return {
                    rowspan: 0,
                    colspan: 0
                };
                //2. 可以返回数组
                // return [0, 0]
            }
        }
    });
    //模拟数据
    for (let i = 1; i <= 100; i++) {
        y9TableSpanMethodRowConfig.value.tableData.push({
            id: i,
            name: '小白' + i,
            sex: '男',
            department: '技术部'
        });
    }

    //y9Table属性说明表
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
                explain: '表格配置，具体请展开查看以下配置',
                type: 'object',
                id: 'config',
                children: [
                    // {
                    // 	attr:"key",
                    // 	explain:"唯一标识",
                    // 	type:"string",
                    // 	optionalValue:"",
                    // 	defaultValue:"id",
                    // },
                    {
                        attr: 'loading',
                        explain: '表格的加载状态',
                        type: 'boolean',
                        optionalValue: 'true | false',
                        defaultValue: 'false'
                    },
                    {
                        attr: 'columnsMinWidth',
                        explain: '各列统一最小宽度',
                        type: 'number,string',
                        optionalValue: '',
                        defaultValue: '100'
                    },
                    {
                        attr: 'columnsWidth',
                        explain: '各列统一宽度',
                        type: 'number,string',
                        optionalValue: '',
                        defaultValue: 'auto'
                    },
                    {
                        attr: '* columns',
                        explain: '各列配置',
                        type: 'array',
                        optionalValue: '',
                        defaultValue: '具体请展开查看以下配置',
                        id: 'columns',
                        children: [
                            {
                                id: 1,
                                attr: '* title',
                                explain: '列标题',
                                type: 'string',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                id: 2,
                                attr: '* key',
                                explain: '映射tableData对应的字段名，列的唯一标识',
                                type: 'string',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                id: 3,
                                attr: 'type',
                                explain: '类型',
                                type: 'string',
                                optionalValue: 'radio | index | selection | expand',
                                defaultValue: ''
                            },
                            {
                                id: 4,
                                attr: 'width',
                                explain: '对应列的宽度',
                                type: 'string,number',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                id: 5,
                                attr: 'minWidth',
                                explain: '对应列的最小宽度',
                                type: 'string,number',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                id: 6,
                                attr: 'fixed',
                                explain: '列是否固定在左侧或者右侧，true表示固定在左侧',
                                type: 'string,boolean',
                                optionalValue: 'true | left | right',
                                defaultValue: ''
                            },
                            {
                                id: 7,
                                attr: 'align',
                                explain: '对齐方式',
                                type: 'string',
                                optionalValue: 'left | center | right',
                                defaultValue: 'center'
                            },
                            {
                                id: 8,
                                attr: 'headerAlign',
                                explain: '表头对齐方式，若不设置该项，则使用表格列的对齐方式',
                                type: 'string',
                                optionalValue: 'left | center | right',
                                defaultValue: 'center'
                            },
                            {
                                id: 9,
                                attr: 'showOverflowTooltip',
                                explain: '当内容过长是否隐藏，用省略号显示',
                                type: 'boolean',
                                optionalValue: 'true | false',
                                defaultValue: 'true'
                            },
                            {
                                id: 10,
                                attr: 'index',
                                explain: '如果设置了 type=index，可以通过传递 index 属性来自定义索引',
                                type: 'number | (index) => {}',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                id: 11,
                                attr: 'columnKey',
                                explain:
                                    'column 的 key， column 的 key， 如果需要使用 filter-change 事件，则需要此属性标识是哪个 column 的筛选条件',
                                type: 'string',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                id: 12,
                                attr: 'renderHeader',
                                explain: '列标题 Label 区域渲染使用的 Function',
                                type: '({ column, $index }) => {}',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                id: 13,
                                attr: 'sortable',
                                explain:
                                    "对应列是否可以排序， 如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change",
                                type: 'boolean | string',
                                optionalValue: "true | false | 'custom'",
                                defaultValue: 'false'
                            },
                            {
                                id: 14,
                                attr: 'sortMethod',
                                explain:
                                    '指定数据按照哪个属性进行排序，仅当sortable设置为true的时候有效。 应该如同 Array.sort 那样返回一个 Number',
                                type: '(a, b) => {}',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                id: 15,
                                attr: 'sortBy',
                                explain:
                                    '指定数据按照哪个属性进行排序，仅当 sortable 设置为 true 且没有设置 sort-method 的时候有效。如果 sort-by 为数组，则先按照第 1 个属性排序，如果第 1 个相等，再按照第 2 个排序，以此类推',
                                type: 'array | string | (row, index) => {} ',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                id: 16,
                                attr: 'sortOrders',
                                explain:
                                    '数据在排序时所使用排序策略的轮转顺序，仅当 sortable 为 true 时有效。 需传入一个数组，随着用户点击表头，该列依次按照数组中元素的顺序进行排序。',
                                type: 'array',
                                optionalValue:
                                    '数组中的元素需为以下三者之一：ascending 表示升序，descending 表示降序，null 表示还原为原始顺序',
                                defaultValue: "['ascending', 'descending', null]"
                            },
                            {
                                id: 17,
                                attr: 'resizable',
                                explain: '对应列是否可以通过拖动改变宽度（需要在 el-table 上设置 border 属性为真',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'true'
                            },
                            {
                                id: 18,
                                attr: 'formatter',
                                explain: '用来格式化内容',
                                type: '(row, column, cellValue, index) => {}',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                id: 19,
                                attr: 'className',
                                explain: '列的 className',
                                type: 'string',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                id: 20,
                                attr: 'labelClassName',
                                explain: '当前列标题的自定义类名',
                                type: 'string',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                id: 21,
                                attr: 'selectable',
                                explain:
                                    '仅对 type=selection 的列有效，类型为 Function，Function 的返回值用来决定这一行的 CheckBox 是否可以勾选',
                                type: '(row, index) => {}',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                id: 22,
                                attr: 'reserveSelection',
                                explain: '仅对  type=selection 的列有效， 请注意， 需指定 row-key 来让这个功能生效',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'false'
                            },
                            {
                                id: 23,
                                attr: 'filters',
                                explain:
                                    '数据过滤的选项， 数组格式，数组中的元素需要有 text 和 value 属性。 数组中的每个元素都需要有 text 和 value 属性',
                                type: 'array[{ text, value }]',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                id: 24,
                                attr: 'filterPlacement',
                                explain: '过滤弹出框的定位',
                                type: 'string',
                                optionalValue: '与 Tooltip 的 placement 属性相同',
                                defaultValue: ''
                            },
                            {
                                id: 25,
                                attr: 'filterMultiple',
                                explain: '数据过滤的选项是否多选',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'true'
                            },
                            {
                                id: 26,
                                attr: 'filterMethod',
                                explain:
                                    '数据过滤使用的方法， 如果是多选的筛选项，对每一条数据会执行多次，任意一次返回 true 就会显示',
                                type: '(value, row, column)=>{}',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                id: 27,
                                attr: 'filteredValue',
                                explain: '选中的数据过滤项，如果需要自定义表头过滤的渲染方式，可能会需要此属性',
                                type: 'array',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                id: 28,
                                attr: 'render',
                                explain: '使用render函数渲染列标题',
                                type: 'render',
                                optionalValue: '(row,data)=>{}',
                                defaultValue: ''
                            },
                            {
                                id: 29,
                                attr: 'slot',
                                explain: '插槽名称，使用插槽渲染列标题',
                                type: 'slot',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                id: 30,
                                attr: 'imgConfig',
                                explain: '图片配置',
                                type: 'object',
                                optionalValue: '',
                                defaultValue: '',
                                children: [
                                    {
                                        id: '30_1',
                                        attr: 'type',
                                        explain: '文件类型',
                                        type: 'string',
                                        optionalValue: 'base64 | path',
                                        defaultValue: ''
                                    },
                                    {
                                        id: '30_2',
                                        attr: 'popWidth',
                                        explain: '预览气泡框大小',
                                        type: 'number',
                                        optionalValue: '',
                                        defaultValue: '200'
                                    },
                                    {
                                        id: '30_3',
                                        attr: 'borderRadius',
                                        explain: '表格显示图片的边框圆角样式',
                                        type: 'string',
                                        optionalValue: '',
                                        defaultValue: '4px'
                                    },
                                    {
                                        id: '30_4',
                                        attr: 'width',
                                        explain: '表格显示图片的宽度',
                                        type: 'string',
                                        optionalValue: '',
                                        defaultValue: '20px'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        attr: '* tableData',
                        explain: '表格数据',
                        type: 'array',
                        optionalValue: '',
                        defaultValue: '这是一个数据组对象，键值对应columns的key值'
                    },
                    {
                        attr: 'stripe',
                        explain: '是否为斑马纹',
                        type: 'boolean',
                        optionalValue: 'true | false',
                        defaultValue: 'false'
                    },
                    {
                        attr: 'border',
                        explain: '是否带有纵向边框',
                        type: 'boolean',
                        optionalValue: 'true | false',
                        defaultValue: 'true'
                    },
                    {
                        attr: 'maxHeight',
                        explain: 'Table 的最大高度。 合法的值为数字或者单位为 px 的高度。',
                        type: 'string,number',
                        optionalValue: '',
                        defaultValue: ''
                    },
                    {
                        attr: 'height',
                        explain:
                            'Table 的高度， 默认为自动高度。 如果 height 为 number 类型，单位 px；如果 height 为 string 类型，则这个高度会设置为 Table 的 style.height 的值，Table 的高度会受控于外部样式。',
                        type: 'string,number',
                        optionalValue: '',
                        defaultValue: ''
                    },
                    {
                        attr: 'openAutoComputedHeight',
                        explain: '开启自动计算高度，优先级比height属性高',
                        type: 'boolean',
                        optionalValue: 'true | false',
                        defaultValue: 'false'
                    },
                    {
                        attr: 'size',
                        explain: '表格的尺寸',
                        type: 'string',
                        optionalValue: 'large | default | small',
                        defaultValue: 'default'
                    },
                    {
                        attr: 'fit',
                        explain: '列的宽度是否自撑开',
                        type: 'bolean',
                        optionalValue: 'true | false',
                        defaultValue: 'true'
                    },
                    {
                        attr: 'showHeader',
                        explain: '是否显示表头',
                        type: 'bolean',
                        optionalValue: 'true | false',
                        defaultValue: 'true'
                    },
                    {
                        attr: 'headerBackground',
                        explain: '是否显示头部背景色',
                        type: 'bolean',
                        optionalValue: 'true | false',
                        defaultValue: 'false'
                    },
                    {
                        attr: 'showOverflowTooltip',
                        explain: '当内容过长是否隐藏，用省略号显示',
                        type: 'bolean',
                        optionalValue: 'true | false',
                        defaultValue: 'true'
                    },
                    {
                        attr: 'highlightCurrentRow',
                        explain: '是否要高亮当前行',
                        type: 'bolean',
                        optionalValue: 'true | false',
                        defaultValue: 'true'
                    },
                    {
                        attr: 'defaultExpandAll',
                        explain: '是否默认展开所有行，当 Table 包含展开行存在或者为树形表格时有效',
                        type: 'bolean',
                        optionalValue: 'true | false',
                        defaultValue: 'false'
                    },
                    {
                        attr: 'tableLayout',
                        explain: '设置表格单元、行和列的布局方式',
                        type: 'string',
                        optionalValue: 'fixed | auto',
                        defaultValue: 'fixed'
                    },
                    {
                        attr: 'treeProps',
                        explain: '渲染嵌套数据的配置选项',
                        type: 'object',
                        optionalValue: '',
                        defaultValue: "{ hasChildren: 'hasChildren', children: 'children' }"
                    },
                    {
                        attr: 'rowKey',
                        explain:
                            '行数据的 Key，用来优化 Table 的渲染； 在使用reserve-selection功能与显示树形数据时，该属性是必填的。类型为 String 时，支持多层访问：user.info.id，但不支持 user.info[0].id，此种情况请使用 Function',
                        type: 'string,function(row),',
                        optionalValue: '',
                        defaultValue: 'id'
                    },
                    {
                        attr: 'lazy',
                        explain: '是否懒加载子节点数据',
                        type: 'boolean',
                        optionalValue: 'true | false',
                        defaultValue: 'false'
                    },
                    {
                        attr: 'load',
                        explain: '加载子节点数据的函数，lazy 为 true 时生效，函数第二个参数包含了节点的层级信息',
                        type: 'function(row, treeNode, resolve)',
                        optionalValue: '',
                        defaultValue: ''
                    },
                    {
                        attr: 'currentRowkey',
                        explain: '当前行的 key，只写属性',
                        type: 'string,number',
                        optionalValue: '',
                        defaultValue: ''
                    },
                    {
                        attr: 'emptytext',
                        explain: '空数据时显示的文本内容， 也可以通过 #empty 设置',
                        type: 'string',
                        optionalValue: '',
                        defaultValue: '暂无数据'
                    },
                    {
                        attr: 'expandRowKeys',
                        explain:
                            '可以通过该属性设置 Table 目前的展开行，需要设置 row-key 属性才能使用，该属性为展开行的 keys 数组',
                        type: 'array',
                        optionalValue: '',
                        defaultValue: '[]'
                    },
                    {
                        attr: 'tooltipEffect',
                        explain: 'tooltip effect 属性',
                        type: 'string',
                        optionalValue: 'dark | light',
                        defaultValue: 'dark'
                    },
                    {
                        attr: 'showSummary',
                        explain: '是否在表尾显示合计行',
                        type: 'boolean',
                        optionalValue: '',
                        defaultValue: 'false'
                    },
                    {
                        attr: 'sumText',
                        explain: '合计行第一列的文本',
                        type: 'string',
                        optionalValue: '',
                        defaultValue: '合计'
                    },
                    {
                        attr: 'summaryMethod',
                        explain: '自定义的合计计算方法',
                        type: '({ columns, data }) => {}',
                        optionalValue: '',
                        defaultValue: ''
                    },
                    {
                        attr: 'spanMethod',
                        explain: '合并行或列的计算方法',
                        type: '({ row, column, rowIndex, columnIndex })	=> {}',
                        optionalValue: '',
                        defaultValue: ''
                    },
                    {
                        attr: 'scrollbarAlwaysOn',
                        explain: '总是显示滚动条',
                        type: 'boolean',
                        optionalValue: '',
                        defaultValue: 'false'
                    },
                    {
                        attr: 'headerRowClassName',
                        explain: '表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className',
                        type: 'string | ({ row, rowIndex }) =>{}',
                        optionalValue: '',
                        defaultValue: ''
                    },
                    {
                        attr: 'headerRowStyle',
                        explain: '表头行的 style 的回调方法，也可以使用一个固定的 Object 为所有表头行设置一样的 Style',
                        type: 'object | ({ row, rowIndex }) => {}',
                        optionalValue: '',
                        defaultValue: ''
                    },
                    {
                        attr: 'headerCellClassName',
                        explain:
                            '表头单元格的 className 的回调方法，也可以使用字符串为所有表头单元格设置一个固定的 className',
                        type: 'string | ({ row, column, rowIndex, columnIndex }) => {}',
                        optionalValue: '',
                        defaultValue: ''
                    },
                    {
                        attr: 'headerCellStyle',
                        explain:
                            '表头单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有表头单元格设置一样的 Style',
                        type: 'object | ({ row, column, rowIndex, columnIndex }) => {}',
                        optionalValue: '',
                        defaultValue: ''
                    },
                    {
                        attr: 'rowStyle',
                        explain: '行的 style 的回调方法，也可以使用一个固定的 Object 为所有行设置一样的 Style',
                        type: 'object | ({ row, rowIndex }) => {}',
                        optionalValue: '',
                        defaultValue: ''
                    },
                    {
                        attr: 'rowClassName',
                        explain: '行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className',
                        type: 'string | ({ row, rowIndex })',
                        optionalValue: '',
                        defaultValue: ''
                    },
                    {
                        attr: 'cellClassName',
                        explain: '单元格的 className 的回调方法，也可以使用字符串为所有单元格设置一个固定的 className',
                        type: 'string | ({ row, column, rowIndex, columnIndex }) => {}',
                        optionalValue: '',
                        defaultValue: ''
                    },
                    {
                        attr: 'cellStyle',
                        explain: '单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有单元格设置一样的 Style',
                        type: 'object | ({ row, column, rowIndex, columnIndex }) =>{}',
                        optionalValue: '',
                        defaultValue: ''
                    },
                    {
                        attr: 'pageConfig',
                        explain: '分页配置，具体配置查看y9Pagination分页组件，隐藏分页设置为false',
                        type: 'object | false',
                        optionalValue: '',
                        defaultValue: ''
                    }
                ]
            },
            {
                attr: 'filterConfig',
                explain: '过滤配置，具体配置查看y9Filter组件的配置说明',
                type: 'object'
            },
            {
                attr: 'selectedVal/v-model',
                explain: '单选模式和多选模式，双向绑定选中值',
                type: 'array,string'
            }
        ]
    });

    //y9Table事件说明表
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
                name: 'window-height-change',
                explain: '窗口高度改变时触发,内部已经做了节流处理',
                callBack:
                    'tableHeight,{rightTopHeight,headerMenusHeight,breadcrumbsHeight,filterHeight,paginationHeight,y9tabledivPadding,tableHeight}'
            },
            {
                name: 'on-change',
                explain: '选择模式为radio模式或selection模式时，当选择项发生变化时会触发该事件',
                callBack: 'id,data'
            },
            {
                name: 'on-current-change',
                explain:
                    '当表格的当前行发生变化的时候会触发该事件，如果要高亮当前行，请打开表格的 highlight-current-row 属性',
                callBack: 'currentRow'
            },
            {
                name: 'on-curr-page-change',
                explain: '有分页时，当前页改变时触发',
                callBack: 'currPage'
            },
            {
                name: 'on-page-size-change',
                explain: '有分页时，每页条数改变时触发',
                callBack: 'pageSize'
            },
            {
                name: 'select',
                explain: '当用户手动勾选数据行的 Checkbox 时触发的事件',
                callBack: 'selection, row'
            },
            {
                name: 'select-all',
                explain: '当用户手动勾选全选 Checkbox 时触发的事件',
                callBack: 'selection'
            },
            {
                name: 'cell-mouse-enter',
                explain: '当单元格 hover 进入时会触发该事件',
                callBack: 'row, column, cell, event'
            },
            {
                name: 'cell-mouse-leave',
                explain: '当单元格 hover 退出时会触发该事件',
                callBack: 'row, column, cell, event'
            },
            {
                name: 'cell-click',
                explain: '当某个单元格被点击时会触发该事件',
                callBack: 'row, column, cell, event'
            },
            {
                name: 'cell-dblclick',
                explain: '当某个单元格被双击击时会触发该事件',
                callBack: 'row, column, cell, event'
            },
            {
                name: 'cell-contextmenu',
                explain: '当某个单元格被鼠标右键点击时会触发该事件',
                callBack: 'row, column, cell, event'
            },
            {
                name: 'row-click',
                explain: '当某一行被点击时会触发该事件',
                callBack: 'row, column, event'
            },
            {
                name: 'row-contextmenu',
                explain: '当某一行被鼠标右键点击时会触发该事件',
                callBack: 'row, column, event'
            },
            {
                name: 'row-dblclick',
                explain: '当某一行被双击时会触发该事件',
                callBack: 'row, column, event'
            },
            {
                name: 'header-click',
                explain: '当某一列的表头被点击时会触发该事件',
                callBack: 'column, event'
            },
            {
                name: 'header-contextmenu',
                explain: '当某一列的表头被鼠标右键点击时触发该事件',
                callBack: 'column, event'
            },
            {
                name: 'sort-change',
                explain: '当表格的排序条件发生变化的时候会触发该事件',
                callBack: '{ column, prop, order }'
            },
            {
                name: 'filter-change',
                explain: 'column 的 key， 如果需要使用 filter-change 事件，则需要此属性标识是哪个 column 的筛选条件',
                callBack: 'filters'
            },
            {
                name: 'header-dragend',
                explain: '当拖动表头改变了列的宽度的时候会触发该事件',
                callBack: 'newWidth, oldWidth, column, event'
            },
            {
                name: 'expand-change',
                explain:
                    '当用户对某一行展开或者关闭的时候会触发该事件（展开行时，回调的第二个参数为 expandedRows；树形表格时第二参数为 expanded）',
                callBack: 'row,expanded'
            }
        ]
    });

    //y9Table实例说明表
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
                attr: 'elTableRef',
                explain: 'el-table表格实例，具体请查看element-plus官网【2.2.19】版本',
                type: 'Object'
            },
            {
                attr: 'elTableFilterRef',
                explain: '过滤实例，具体请查看y9Filter组件',
                type: 'Object'
            },
            {
                attr: 'elTablePaginationRef',
                explain: '分页实例，具体请查看y9Pagination组件',
                type: 'Object'
            }
        ]
    });

    function onShowCode(type) {
        Object.assign(codeDialogConfig.value, {
            show: true,
            type: type
        });
        if (type == 'base') {
            codeDialogConfig.value.codeText = `
<template>
	<y9Table :config="y9TableConfig"></y9Table>
</template>
<script lang="ts" setup>
	 let y9TableConfig = ref({
	 	columns: [{
	 			type: "index",
	 			title: "序号",
	 			width: 60,
	 		},
	 		{
	 			title: "姓名",
	 			key: "name",
	 		},
	 		{
	 			title: "性别",
	 			key: "sex",
	 		},
	 		{
	 			title: "所在部门",
	 			key: "department",
	 		},
	 		{
	 			title: "操作",
	 			render: (row) => {
	 				return h('span', '详情')
	 			}
	 		},
	 	],
	 	tableData: [
			{
				id: "1",
	 			name: "小红",
	 			sex: "女",
	 			department: "运营部",
	 		},
	 		{
				id: "2",
	 			name: "小白小白小白小白小白小白小白小白小白小白小白小白小白小白小白小白小白小白小白小白小白小白小白小白小白小白小白小白小白",
	 			sex: "男",
	 			department: "技术部",
	 		},
	 	],
	 	pageConfig:false,
	 })
<\/script>
		`;
        } else if (type === 'memory') {
            codeDialogConfig.value.codeText = `
<template>
    <y9Table :config="y9TableConfig2" uniqueIdent="memory" :cuPageMemory="true"></y9Table>
</template>
<script lang="ts" setup>
import { getStorageCurrPage, getStoragePageSize } from '@/utils/index';
//有过滤条件和分页的表格
let y9TableConfigUnique = ref({
        headerBackground: true,
        pageConfig: {
            background: false, //是否显示背景色
            layout: 'prev, pager, next,sizes', //布局
            currentPage: getStorageCurrPage('memory', 1), //当前页数，支持 v-model 双向绑定
            pageSize: getStoragePageSize('memory', 5), //每页显示条目个数，支持 v-model 双向绑定
            total: 2, //总条目数
            pageSizeOpts: [5, 10, 20, 30, 40, 1000] //每页显示个数选择器的选项设置
        },
        columns: [
            {
                type: 'index',
                title: '序号',
                width: 60
            },
            {
                title: '姓名',
                key: 'name'
            },
            {
                title: '性别',
                key: 'sex'
            },
            {
                title: '所在部门',
                key: 'department'
            },
            {
                title: '操作',
                render: (row) => {
                    return h('span', '详情');
                }
            }
        ],
        tableData: [
            {
                id: '1',
                name: '小红',
                sex: '女',
                department: '运营部'
            },
            {
                id: '2',
                name: '小白',
                sex: '男',
                department: '技术部'
            }
        ]
    });
<\/script>
		`;
        } else if (type === 'haveFiltersAndPage') {
            codeDialogConfig.value.codeText = `
<template>
	<y9Table :config="y9TableConfig" :filterConfig="filterConfig"></y9Table>
</template>
<script lang="ts" setup>
	let y9TableConfig2 = ref({
		headerBackground: true,
		pageConfig: {
			background: false, //是否显示背景色
			layout: "prev, pager, next,sizes", //布局
			currentPage: 1, //当前页数，支持 v-model 双向绑定
			pageSize: 5, //每页显示条目个数，支持 v-model 双向绑定
			total: 2, //总条目数
			pageSizeOpts: [5, 10, 20, 30, 40, 1000], //每页显示个数选择器的选项设置
		},
		columns: [{
				type: "index",
				title: "序号",
				width: 60,
			},
			{
				title: "姓名",
				key: "name",
			},
			{
				title: "性别",
				key: "sex",
			},
			{
				title: "所在部门",
				key: "department",
			},
			{
				title: "操作",
				render: (row) => {
					return h('span', '详情')
				}
			},
		],
		tableData: [
			{
				id: "1",
				name: "小红",
				sex: "女",
				department: "运营部",
			},
			{
				id: "2",
				name: "小白",
				sex: "男",
				department: "技术部",
			},
		]
		
	})
	
	let filterConfig = ref({
		itemList: [{
				type: "input",
				key: "name",
				span: 6,
			},
		
		],
		filtersValueCallBack:(filters) => {
			console.log("过滤值",filters)
		}
	})
<\/script>
		`;
        } else if (type === 'radioTable') {
            codeDialogConfig.value.codeText = `
<template>
	当前选中值：{{selectedRadioVal}}
	<y9Table v-model:selectedVal="selectedRadioVal" :config="y9TableRadioConfig">
	</y9Table>
</template>
<script lang="ts" setup>
	let y9TableRadioConfig = ref({
		headerBackground: true,
		columns: [{
				type: "radio",
				width: 60,
			},
	
			{
				type: "index",
				title: "序号",
				width: 60,
			},
			{
				title: "姓名",
				key: "name",
			},
			{
				title: "性别",
				key: "sex",
			},
			{
				title: "所在部门",
				key: "department",
			},
			{
				title: "操作",
				render: (row) => {
					return h('span', '详情')
				}
			},
		],
		tableData: [{
				name: "小红",
				sex: "女",
				department: "运营部",
				id:1,
			},
			{
				name: "小白",
				sex: "男",
				department: "技术部",
				id:2,
			},
		]
		
	})
	let selectedRadioVal = ref(2);
<\/script>
		`;
        } else if (type === 'multipleTable') {
            codeDialogConfig.value.codeText = `
<template>
	当前选中值：{{selectedCheckboxVal}}
	<y9Table v-model:selectedVal="selectedCheckboxVal" :config="y9TableCheckboxConfig">
	</y9Table>
</template>
<script lang="ts" setup>
	let y9TableCheckboxConfig = ref({
		headerBackground: true,
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
				title: "姓名",
				key: "name",
			},
			{
				title: "性别",
				key: "sex",
			},
			{
				title: "所在部门",
				key: "department",
			},
			{
				title: "操作",
				render: (row) => {
					return h('span', '详情')
				}
			},
		],
		tableData: [{
				name: "小红",
				sex: "女",
				department: "运营部",
				id:1,
			},
			{
				name: "小白",
				sex: "男",
				department: "技术部",
				id:2,
			},
		]
		
	})
	let selectedCheckboxVal = ref([1,2]);
<\/script>
		`;
        } else if (type === 'expandTable') {
            codeDialogConfig.value.codeText = `
<template>
	<y9Table :config="y9TableExpandConfig">
		<template #childContent="props">
			<div style="padding: 20px">
				<ul style="list-style: none;line-height: 36px;">
					<li>姓名： {{props.row.name}}</li>
					<li>性别： {{props.row.sex}}</li>
					<li>所在部门： {{props.row.department}}</li>
				</ul>
			</div>
		</template>
	</y9Table>
</template>
<script lang="ts" setup>
	let y9TableExpandConfig = ref({
		border:false,
		headerBackground: true,
		columns: [
			{
				type:"expand",
				slot:"childContent",
				width: 60,
			},
			{
				title: "姓名",
				key: "name",
			},
			{
				title: "性别",
				key: "sex",
			},
			{
				title: "所在部门",
				key: "department",
			},
			{
				title: "操作",
				render: (row) => {
					return h('span', '详情')
				}
			},
		],
		tableData: [{
				name: "小红",
				sex: "女",
				department: "运营部",
				id:1,
			},
			{
				name: "小白",
				sex: "男",
				department: "技术部",
				id:2,
			},
		],
		pageConfig:false,//不分页
	})
<\/script>
		`;
        } else if (type === 'lazyTable') {
            codeDialogConfig.value.codeText = `
<template>
	当前选中值：{{lazy_selectedRadioVal}}
	<y9Table v-model:selectedVal="lazy_selectedRadioVal" :config="y9TableLazyConfig">
	</y9Table>
</template>
<script lang="ts" setup>
	//懒加载回调函数
	const load = (row, treeNode, resolve) => {
		setTimeout(() => {
			const data = [
				{
					id: row.id + "-1",
					name: "子级数据 " + row.id + "-1",
					sex: "男",
					department: "销售部",
					
				},
				{
					id: row.id + "-2",
					name: "子级数据 " + row.id + "-2",
					sex: "男",
					department: "销售部",
				},
				
			]
			resolve(data);
		}, 1000);
	};
	let y9TableLazyConfig = ref({
		rowKey: 'id',//懒加载必须设置rowKey
		load: load,//懒加载回调函数
		lazy: true,//懒加载
		pageConfig:false,//不分页
		border: false,
		headerBackground: true,
		columns: [{
				type: "radio",
				width: 70,
				fixed:"left"
			},
			{
				title: "姓名",
				key: "name",
			},
			{
				title: "性别",
				key: "sex",
			},
			{
				title: "所在部门",
				key: "department",
			},
			{
				title: "操作",
				fixed:"right",
				width: 200,
				render: (row) => {
					return h('span', '详情')
				}
			},
		],
		tableData: [{
				name: "一级数据 1",
				sex: "女",
				department: "运营部",
				id: "1" ,
				hasChildren: true,
			},
			{
				name: "一级数据 1",
				sex: "男",
				department: "技术部",
				id: "2",
				hasChildren: true,
			},
		]
		
	})
	let lazy_selectedRadioVal = ref("2");
<\/script>
		`;
        } else if (type === 'span-method-column') {
            codeDialogConfig.value.codeText = `
<template>
	<y9Table :config="y9TableSpanMethodColumnConfig"></y9Table>
</template>
<script lang="ts" setup>
	//合并列表格
	const y9TableSpanMethodColumnConfig = ref({
		 headerBackground:true,
		 border:true,
		 columns: [
			{
				title: "姓名",
				key: "name",
				width:300,
				
			},
			{
				title: "性别",
				key: "sex",
				width:300,
			},
			{
				title: "所在部门",
				key: "department",
			},
			{
				title: "操作",
				width:200,
				render: (row) => {
					return h('span', '详情')
				}
			},
		],
		tableData: [],
		pageConfig:false,
		spanMethod:({ row, column, rowIndex, columnIndex }) => { //该函数可以返回一个包含两个元素的数组，第一个元素代表 rowspan，第二个元素代表 colspan。 也可以返回一个键名为 rowspan 和 colspan 的对象。
			if (columnIndex === 0) {
				if (rowIndex % 2 === 0) {
					//1. 可以返回对象
					return {
						rowspan: 2,
						colspan: 1,
					}
				    //2. 可以返回数组
				    // return [2,1]
				} else {
					//1. 可以返回对象
				    return {
						rowspan: 0,
						colspan: 0,
				    }
					//2. 可以返回数组
				    // return [0, 0]
				}
		  }
		}
		
	})
	//模拟数据
	for(let i = 1; i <= 100; i++){
		 y9TableSpanMethodColumnConfig.value.tableData.push({
			 id: i,
			 name: "小白" + i,
			 sex: "男",
			 department: "技术部",
		 })
	}
<\/script>
		`;
        } else if (type === 'span-method-row') {
            codeDialogConfig.value.codeText = `
<template>
	<y9Table :config="y9TableSpanMethodRowConfig"></y9Table>
</template>
<script lang="ts" setup>
	//合并行表格
	const y9TableSpanMethodRowConfig = ref({
		 headerBackground:true,
		 border:true,
		 columns: [
			{
				title: "姓名",
				key: "name",
				width:300,
				
			},
			{
				title: "性别",
				key: "sex",
				width:300,
			},
			{
				title: "所在部门",
				key: "department",
			},
			{
				title: "操作",
				width:200,
				render: (row) => {
					return h('span', '详情')
				}
			},
		],
		tableData: [],
		pageConfig:false,
		spanMethod:({ row, column, rowIndex, columnIndex }) => { //该函数可以返回一个包含两个元素的数组，第一个元素代表 rowspan，第二个元素代表 colspan。 也可以返回一个键名为 rowspan 和 colspan 的对象。
			if (columnIndex === 0) {
				//1. 可以返回对象
				return {
					rowspan: 1,
					colspan: 2,
			    }
				//2. 可以返回数组
				// return [1, 2]
			} else if (columnIndex === 1) {
				//1. 可以返回对象
				return {
					rowspan: 0,
					colspan: 0,
				}
				//2. 可以返回数组
			    // return [0, 0]
			}
		}
	
	})
	//模拟数据
	for(let i = 1; i <= 100; i++){
		 y9TableSpanMethodRowConfig.value.tableData.push({
			 id: i,
			 name: "小白" + i,
			 sex: "男",
			 department: "技术部",
		 })
	}
<\/script>
		`;
        }
    }
</script>

<style lang="scss" scoped></style>
