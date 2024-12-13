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
    <y9VxeTable :config="basicTableConfig"></y9VxeTable>

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
    <y9VxeTable :config="tableConfig" :filterConfig="filterConfig"></y9VxeTable>

    <div class="y9-title">
        单选表格（双向绑定string或number格式）
        <el-button
            :size="fontSizeObj.buttonSize"
            :style="{ fontSize: fontSizeObj.baseFontSize }"
            class="global-btn-main"
            style="margin-left: 10px"
            type="primary"
            @click="onShowCode('radioTable1')"
            >查看代码
        </el-button>
    </div>
    当前选中值：{{ selectedRadioVal }}
    <y9VxeTable v-model:selectedVal="selectedRadioVal" :config="y9VxeTableRadioConfig"></y9VxeTable>

    <div class="y9-title">
        单选表格(双向绑定一维数组格式)
        <el-button
            :size="fontSizeObj.buttonSize"
            :style="{ fontSize: fontSizeObj.baseFontSize }"
            class="global-btn-main"
            style="margin-left: 10px"
            type="primary"
            @click="onShowCode('radioTable2')"
            >查看代码
        </el-button>
    </div>
    当前选中值：{{ selectedRadioVal1 }}
    <y9VxeTable v-model:selectedVal="selectedRadioVal1" :config="y9VxeTableRadioConfig"></y9VxeTable>

    <div class="y9-title">
        单选表格(双向绑定二维数组格式)
        <el-button
            :size="fontSizeObj.buttonSize"
            :style="{ fontSize: fontSizeObj.baseFontSize }"
            class="global-btn-main"
            style="margin-left: 10px"
            type="primary"
            @click="onShowCode('radioTable3')"
            >查看代码
        </el-button>
    </div>
    当前选中值：{{ selectedRadioVal2 }}
    <y9VxeTable v-model:selectedVal="selectedRadioVal2" :config="y9VxeTableRadioConfig"></y9VxeTable>

    <div class="y9-title">
        多选表格(双向绑定一维数组格式)
        <el-button
            :size="fontSizeObj.buttonSize"
            :style="{ fontSize: fontSizeObj.baseFontSize }"
            class="global-btn-main"
            style="margin-left: 10px"
            type="primary"
            @click="onShowCode('multipleTable1')"
            >查看代码
        </el-button>
    </div>
    当前选中值：{{ selectedCheckboxVal }}
    <y9VxeTable v-model:selectedVal="selectedCheckboxVal" :config="y9VxeTableCheckboxConfig"></y9VxeTable>

    <div class="y9-title">
        多选表格(双向绑定二维数组格式)
        <el-button
            :size="fontSizeObj.buttonSize"
            :style="{ fontSize: fontSizeObj.baseFontSize }"
            class="global-btn-main"
            style="margin-left: 10px"
            type="primary"
            @click="onShowCode('multipleTable2')"
            >查看代码
        </el-button>
    </div>
    当前选中值：{{ selectedCheckboxVal2 }}
    <y9VxeTable v-model:selectedVal="selectedCheckboxVal2" :config="y9VxeTableCheckboxConfig"></y9VxeTable>

    <div class="y9-title">
        分组表头
        <el-button
            :size="fontSizeObj.buttonSize"
            :style="{ fontSize: fontSizeObj.baseFontSize }"
            class="global-btn-main"
            style="margin-left: 10px"
            type="primary"
            @click="onShowCode('colgroupTable')"
            >查看代码
        </el-button>
    </div>
    <y9VxeTable :config="colgroupTableConfig"></y9VxeTable>

    <div class="y9-title">
        编辑表格
        <el-button
            :size="fontSizeObj.buttonSize"
            :style="{ fontSize: fontSizeObj.baseFontSize }"
            class="global-btn-main"
            style="margin-left: 10px"
            type="primary"
            @click="onShowCode('editTable')"
            >查看代码
        </el-button>
    </div>
    <el-tag style="margin-bottom: 20px">建议编辑表格尽量使用element组件进行渲染</el-tag>
    <y9VxeTable ref="editTableRef" :config="editTableConfig">
        <template #paginationExtend>
            <el-button
                :size="fontSizeObj.buttonSize"
                :style="{ fontSize: fontSizeObj.baseFontSize }"
                class="global-btn-second"
                style="margin-left: 10px"
                @click="getEditUpdateData"
                >获取已修改的数据
            </el-button>
        </template>
    </y9VxeTable>

    <div class="y9-title">
        虚拟滚动表格
        <el-button
            :size="fontSizeObj.buttonSize"
            :style="{ fontSize: fontSizeObj.baseFontSize }"
            class="global-btn-main"
            style="margin-left: 10px"
            type="primary"
            @click="onShowCode('virtualTable')"
            >查看代码
        </el-button>
    </div>
    <y9VxeTable v-model:selectedVal="virtualTableRadioVal" :config="virtualTableConfig"></y9VxeTable>

    <div class="y9-title">
        合并列表格
        <el-button
            :size="fontSizeObj.buttonSize"
            :style="{ fontSize: fontSizeObj.baseFontSize }"
            class="global-btn-main"
            style="margin-left: 10px"
            type="primary"
            @click="onShowCode('merge-cells-column')"
            >查看代码
        </el-button>
    </div>
    <y9VxeTable :config="y9VxeTableMergeCellsColumnConfig"></y9VxeTable>

    <div class="y9-title">
        合并行表格
        <el-button
            :size="fontSizeObj.buttonSize"
            :style="{ fontSize: fontSizeObj.baseFontSize }"
            class="global-btn-main"
            style="margin-left: 10px"
            type="primary"
            @click="onShowCode('merge-cells-row')"
            >查看代码
        </el-button>
    </div>
    <y9VxeTable :config="y9VxeTableMergeCellsRowConfig"></y9VxeTable>

    <p style="color: red; margin-top: 40px">
        温馨提示:该组件根据vxeTable组件的基础上进行二次封装,如果看以下文档仍然不理解用法,可以查看vxeTable的官网说明
        <a href="https://vxetable.cn/#/table/api">传送门</a>
    </p>

    <div class="y9-title">y9VxeTable属性说明表</div>
    <y9Table :config="attrTableConfig"></y9Table>

    <div class="y9-title">y9VxeTable事件说明表</div>
    <y9Table :config="eventTableConfig"></y9Table>

    <div class="y9-title">y9VxeTable实例</div>
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
    let basicTableConfig = ref({
        pageConfig: false,
        columns: [
            {
                title: '姓名',
                key: 'name'
            },
            {
                title: '性别',
                key: 'sex'
            }
        ],
        tableData: [
            {
                id: 1,
                name: '小红1',
                sex: '女'
            },
            {
                id: 2,
                name: '小红2',
                sex: '女'
            },
            {
                id: 3,
                name: '小红3',
                sex: '女'
            }
        ]
    });

    //有过滤条件和分页的表格
    let tableConfig = ref({
        headerBackground: true,
        border: false,
        columns: [
            {
                type: 'checkbox',
                width: 60
            },
            {
                title: '姓名',
                key: 'name'
            },
            {
                title: '性别',
                key: 'sex'
            }
        ],
        tableData: [
            {
                id: 1,
                name: '小红1',
                sex: '女'
            },
            {
                id: 2,
                name: '小红2',
                sex: '女'
            },
            {
                id: 3,
                name: '小红3',
                sex: '女'
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

    // 单选表格（双向绑定string或number格式）
    let y9VxeTableRadioConfig = ref({
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
                    return h(
                        'span',
                        {
                            style: {
                                color: 'var(--el-color-primary)'
                            }
                        },
                        '详情'
                    );
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

    let selectedRadioVal = ref(1);

    let selectedRadioVal1 = ref([1]);

    let selectedRadioVal2 = ref([
        {
            id: 1
        }
    ]);

    // 多选表格(双向绑定一维数组格式)
    let y9VxeTableCheckboxConfig = ref({
        headerBackground: true,
        border: false,
        columns: [
            {
                type: 'checkbox',
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
                    return h(
                        'span',
                        {
                            style: {
                                color: 'var(--el-color-primary)'
                            }
                        },
                        '详情'
                    );
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
            },
            {
                name: '小白',
                sex: '男',
                department: '技术部',
                id: 3
            }
        ]
    });

    let selectedCheckboxVal = ref([1, 2]);
    let selectedCheckboxVal2 = ref([
        {
            id: 2
        }
    ]);

    //分组表头
    let colgroupTableConfig = ref({
        headerBackground: true,
        pageConfig: false,
        columns: [
            {
                title: '姓名',
                children: [
                    {
                        title: '中文名',
                        children: [
                            {
                                title: '繁体',
                                key: 'names.ftname'
                            },
                            {
                                title: '简体',
                                key: 'names.jtname'
                            }
                        ]
                    },
                    {
                        title: '英文名',
                        key: 'names.enname'
                    }
                ]
            },
            {
                title: '性别',
                key: 'sex'
            }
        ],
        tableData: [
            {
                id: 1,
                name: '小红1',
                sex: '女',
                names: {
                    jtname: '小红',
                    ftname: '小紅',
                    enname: 'Xiaohong'
                }
            },
            {
                id: 2,
                name: '小红2',
                sex: '女'
            },
            {
                id: 3,
                name: '小红3',
                sex: '女'
            }
        ]
    });

    //编辑表格
    let editTableRef = ref();
    let editTableConfig = ref({
        headerBackground: true,
        editConfig: {
            trigger: 'click',
            enabled: true,
            mode: 'cell'
        },
        keepSource: true,
        columns: [
            {
                title: 'element 输入框',
                key: 'elementName',
                editRender: {
                    name: 'input',
                    useElement: true
                }
            },
            {
                title: 'element 选择框',
                key: 'elementSex',
                editRender: {
                    name: 'select',
                    useElement: true,
                    options: [
                        {
                            value: 'male',
                            label: '男'
                        },
                        {
                            value: 'female',
                            label: '女'
                        }
                    ]
                }
            },
            {
                title: 'element 日期选择器',
                key: 'elementBirthday',
                editRender: {
                    name: 'date',
                    dateType: 'date',
                    useElement: true
                }
            },
            {
                title: 'vxe 输入框',
                key: 'vxeName',
                editRender: {
                    name: 'input'
                }
            },
            {
                title: 'vxe 选择框',
                key: 'vxeSex',
                editRender: {
                    name: 'select',
                    options: [
                        {
                            value: 'male',
                            label: '男'
                        },
                        {
                            value: 'female',
                            label: '女'
                        }
                    ]
                }
            }
        ],
        tableData: [
            {
                id: 1,
                elementName: '小红element1',
                elementSex: '女',
                elementBirthday: '',
                vxeName: '小红vxe1',
                vxeSex: '男'
            },
            {
                id: 2,
                elementName: '小红element2',
                elementSex: '',
                elementBirthday: '2022-06-01',
                vxeName: '小红vxe2',
                vxeSex: ''
            }
        ]
    });

    //虚拟滚动表格
    //虚拟表格 配置
    let virtualTableConfig = ref({
        scrollY: {
            //竖向滚动配置
            enabled: true, //开启虚拟滚动
            gt: 0 //指定大于指定行时自动启动纵向虚拟滚动，如果为 0 则总是启用；
        },
        treeConfig: {
            transform: true //自动将列表转为树结构（支持虚拟滚动）
        },
        defaultExpandAll: false,
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
                key: 'name',
                treeNode: true //树节点
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
        tableData: []
    });
    //虚拟表格 当前单选值
    let virtualTableRadioVal = ref('2');

    //模拟大数据
    let data = [];
    for (let i = 1; i < 1000; i++) {
        data.push({
            name: '一级数据 ' + i,
            sex: i % 2 == 0 ? '男' : '女',
            department: '技术部',
            id: i + '',
            children: [
                {
                    id: i + '-1',
                    name: '子级数据 ' + i + '-1',
                    sex: '男',
                    department: '销售部'
                },
                {
                    id: i + '-2',
                    name: '子级数据 ' + i + '-2',
                    sex: '男',
                    department: '销售部'
                }
            ]
        });
    }

    data.forEach((item) => {
        virtualTableConfig.value.tableData.push({
            id: item.id,
            name: item.name,
            sex: item.sex,
            department: item.department,
            parentId: ''
        });
        item.children.forEach((child) => {
            virtualTableConfig.value.tableData.push(
                Object.assign(child, {
                    parentId: item.id
                })
            );
        });
    });

    //合并列表格
    const y9VxeTableMergeCellsColumnConfig = ref({
        headerBackground: true,
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
                width: 300,
                render: (row) => {
                    return h('span', '详情');
                }
            }
        ],
        tableData: [],
        pageConfig: false,
        mergeCells: [] //合并单元格
    });

    //模拟数据
    for (let i = 1; i <= 100; i++) {
        y9VxeTableMergeCellsColumnConfig.value.tableData.push({
            id: i,
            name: '小白' + i,
            sex: '男',
            department: '技术部'
        });
    }
    //设置合并参数
    let mergeCells = [];
    y9VxeTableMergeCellsColumnConfig.value.tableData.forEach((item, index) => {
        if (index % 2 === 0) {
            mergeCells.push({ row: index, col: 0, rowspan: 2, colspan: 1 });
        }
    });
    y9VxeTableMergeCellsColumnConfig.value.mergeCells = mergeCells;

    //合并行表格
    const y9VxeTableMergeCellsRowConfig = ref({
        headerBackground: true,
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
                width: 300,
                render: (row) => {
                    return h('span', '详情');
                }
            }
        ],
        tableData: [],
        pageConfig: false,
        mergeCells: [] //合并单元格
    });
    //模拟数据
    for (let i = 1; i <= 100; i++) {
        y9VxeTableMergeCellsRowConfig.value.tableData.push({
            id: i,
            name: '小白' + i,
            sex: '男',
            department: '技术部'
        });
    }
    //设置合并参数
    let mergeCells2 = [];
    y9VxeTableMergeCellsRowConfig.value.tableData.forEach((item, index) => {
        mergeCells2.push({ row: index, col: 0, rowspan: 1, colspan: 2 });
    });
    y9VxeTableMergeCellsRowConfig.value.mergeCells = mergeCells2;
    //y9VxeTable属性说明表
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
                explain: '表格配置，具体配置看config属性表',
                type: 'object',
                id: 'config',
                children: [
                    {
                        id: 1,
                        attr: 'dataKey',
                        explain: '数据的唯一标识',
                        type: 'string',
                        optionalValue: '',
                        defaultValue: 'id'
                    },
                    {
                        id: 2,
                        attr: 'headerBackground',
                        explain: '是否显示头部背景色',
                        type: 'bolean',
                        optionalValue: 'true | false',
                        defaultValue: 'false'
                    },
                    {
                        id: 3,
                        attr: 'id',
                        explain: '唯一标识',
                        type: 'string',
                        optionalValue: '',
                        defaultValue: 'y9VxeTable'
                    },
                    {
                        id: 4,
                        attr: '* columns',
                        explain: '各列配置',
                        type: 'array',
                        optionalValue: '',
                        defaultValue: '',
                        children: [
                            {
                                id: '4-1',
                                attr: 'type',
                                explain: '列的类型',
                                type: 'string',
                                optionalValue:
                                    'index(序号)，checkbox，radio，expand（展开行），html（HTML 标签（动态渲染任意 HTML 是非常危险的，很容易导致 XSS 攻击，应该确保内容是可信的））',
                                defaultValue: ''
                            },
                            {
                                id: '4-2',
                                attr: 'key',
                                explain: '列字段名（注：属性层级越深，渲染性能就越差，例如：aa.bb.cc.dd.ee）',
                                type: 'string',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                id: '4-3',
                                attr: 'title',
                                explain: '列标题（支持开启国际化）',
                                type: 'string',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                id: '4-4',
                                attr: 'width',
                                explain:
                                    "列宽度（如果为空则均匀分配剩余宽度，如果全部列固定了，可能会存在宽屏下不会铺满，可以配合 '%' 或者 'min-width' 布局）",
                                type: 'number | string',
                                optionalValue: 'px, %',
                                defaultValue: ''
                            },
                            {
                                id: '4-5',
                                attr: 'minWidth',
                                explain:
                                    "列宽度（如果为空则均匀分配剩余宽度，如果全部列固定了，可能会存在宽屏下不会铺满，可以配合 '%' 或者 'min-width' 布局）",
                                type: 'number | string',
                                optionalValue: 'px, %',
                                defaultValue: ''
                            },
                            {
                                id: '4-6',
                                attr: 'resizable',
                                explain: '列是否允许拖动列宽调整大小',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'false'
                            },
                            {
                                id: '4-7',
                                attr: 'visible',
                                explain: '默认是否显示。',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'true'
                            },
                            {
                                id: '4-8',
                                attr: 'fixed',
                                explain: '将列固定在左侧或者右侧（注意：固定列应该放在左右两侧的位置）',
                                type: 'string',
                                optionalValue: 'left（固定左侧）, right（固定右侧）',
                                defaultValue: ''
                            },
                            {
                                id: '4-9',
                                attr: 'align',
                                explain: '列对齐方式',
                                type: 'string',
                                optionalValue: 'left（左对齐）, center（居中对齐）, right（右对齐）',
                                defaultValue: 'center'
                            },
                            {
                                id: '4-10',
                                attr: 'headerAlign',
                                explain: '表头列的对齐方式',
                                type: 'string',
                                optionalValue: 'left（左对齐）, center（居中对齐）, right（右对齐）',
                                defaultValue: ''
                            },
                            {
                                id: '4-11',
                                attr: 'footerAlign',
                                explain: '表尾列的对齐方式',
                                type: 'string',
                                optionalValue: 'left（左对齐）, center（居中对齐）, right（右对齐）',
                                defaultValue: ''
                            },
                            {
                                id: '4-12',
                                attr: 'showOverflow',
                                explain: '当内容过长时显示为省略号（如果是固定列建议设置该值，提升渲染速度）',
                                type: 'boolean | string',
                                optionalValue:
                                    'ellipsis（只显示省略号）,title（并且显示为原生 title）,tooltip（并且显示为 tooltip 提示）',
                                defaultValue: 'true'
                            },
                            {
                                id: '4-13',
                                attr: 'showHeaderOverflow',
                                explain: '当内容过长时显示为省略号',
                                type: 'boolean | string',
                                optionalValue:
                                    'ellipsis（只显示省略号）,title（并且显示为原生 title）,tooltip（并且显示为 tooltip 提示）',
                                defaultValue: ''
                            },
                            {
                                id: '4-14',
                                attr: 'showFooterOverflow',
                                explain: '当内容过长时显示为省略号',
                                type: 'boolean | string',
                                optionalValue:
                                    'ellipsis（只显示省略号）,title（并且显示为原生 title）,tooltip（并且显示为 tooltip 提示）',
                                defaultValue: ''
                            },
                            {
                                id: '4-15',
                                attr: 'className',
                                explain: '给单元格附加 className',
                                type: 'string | (({row, rowIndex, $rowIndex, column, columnIndex, $columnIndex}) => any)',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                id: '4-16',
                                attr: 'headerClassName',
                                explain: '给表头的单元格附加 className',
                                type: 'string | (({ $rowIndex, column, columnIndex, $columnIndex }) => any)',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                id: '4-17',
                                attr: 'footerClassName',
                                explain: '给表尾的单元格附加 className',
                                type: 'string | (({ $rowIndex, column, columnIndex, $columnIndex }) => any)',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                id: '4-18',
                                attr: 'formatter',
                                explain: '格式化显示内容',
                                type: '(({ cellValue, row, column }) => string) | any[] | string',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                id: '4-19',
                                attr: 'sortable',
                                explain: '是否允许列排序',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'false'
                            },
                            {
                                id: '4-20',
                                attr: 'sortBy',
                                explain:
                                    '只对 sortable 有效，指定排序的字段（当值 formatter 格式化后，可以设置该字段，使用值进行排序）',
                                type: 'string | (({ row, column }) => string | number)',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                id: '4-21',
                                attr: 'sortType',
                                explain: '排序的字段类型，比如字符串转数值等',
                                type: 'string',
                                optionalValue: '',
                                defaultValue: 'auto'
                            },
                            {
                                id: '4-22',
                                attr: 'filters',
                                explain: '配置筛选条件（注：筛选只能用于列表，如果是树结构则过滤根节点）',
                                type: 'any[]',
                                optionalValue: '',
                                defaultValue: '',
                                children: [
                                    {
                                        attr: 'label',
                                        explain: '显示的值',
                                        type: 'string',
                                        optionalValue: '',
                                        defaultValue: ''
                                    },
                                    {
                                        attr: 'value',
                                        explain: '实际的值',
                                        type: 'any',
                                        optionalValue: '',
                                        defaultValue: ''
                                    },
                                    {
                                        attr: 'checked',
                                        explain: '默认是否选中',
                                        type: 'boolean',
                                        optionalValue: '',
                                        defaultValue: 'false'
                                    },
                                    {
                                        attr: 'resetValue',
                                        explain: '重置时的默认值',
                                        type: 'any',
                                        optionalValue: '',
                                        defaultValue: ''
                                    },
                                    {
                                        attr: 'data',
                                        explain: '自定义渲染的数据值（当使用自定义模板时可能会用到）',
                                        type: 'any',
                                        optionalValue: '',
                                        defaultValue: ''
                                    }
                                ]
                            },
                            {
                                id: '4-23',
                                attr: 'filterMultiple',
                                explain: '只对 filters 有效，筛选是否允许多选',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'true'
                            },
                            {
                                id: '4-24',
                                attr: 'filterMethod',
                                explain: '只对 filters 有效，列的筛选方法，该方法的返回值用来决定该行是否显示',
                                type: '({ value, option, cellValue, row, column }) => boolean',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                id: '4-25',
                                attr: 'filterResetMethod',
                                explain: '只对 filters 有效，自定义筛选重置方法',
                                type: '({ options, column }) => void',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                id: '4-26',
                                attr: 'filterRecoverMethod',
                                explain: '只对 filters 有效，自定义筛选复原方法（使用自定义筛选时可能会用到）',
                                type: '({ options, column }) => void',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                id: '4-27',
                                attr: 'filterRender',
                                explain: '筛选渲染器配置项',
                                type: 'any',
                                optionalValue: '',
                                defaultValue: '',
                                children: [
                                    {
                                        attr: 'name',
                                        explain: '渲染器名称',
                                        type: 'String',
                                        optionalValue: 'input, textarea, select, $input, $textarea, $select',
                                        defaultValue: ''
                                    },
                                    {
                                        attr: 'props',
                                        explain: '渲染的参数',
                                        type: 'Object',
                                        optionalValue: '',
                                        defaultValue: ''
                                    },
                                    {
                                        attr: 'events',
                                        explain: '渲染组件的事件',
                                        type: 'Object',
                                        optionalValue: '',
                                        defaultValue:
                                            '{row,rowIndex,$rowIndex,column,columnIndex,$columnIndex}, ...[目标渲染的 arguments]'
                                    },
                                    {
                                        attr: 'content',
                                        explain: '渲染组件的内容（仅用于特殊组件）',
                                        type: 'String',
                                        optionalValue: '',
                                        defaultValue: ''
                                    }
                                ]
                            },
                            {
                                id: '4-28',
                                attr: 'exportMethod',
                                explain: '自定义单元格数据导出方法，返回自定义的值',
                                type: '({ row, column }) => string',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                id: '4-29',
                                attr: 'footerExportMethod',
                                explain: '自定义表尾单元格数据导出方法，返回自定义的值',
                                type: '({ items, _columnIndex }) => string',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                id: '4-30',
                                attr: 'cellType',
                                explain: '只对特定功能有效，单元格值类型（例如：导出数据类型设置）',
                                type: 'string',
                                optionalValue: 'auto（默认自动转换），number（数值）, string（字符串）',
                                defaultValue: 'auto'
                            },
                            {
                                id: '4-31',
                                attr: 'cellRender',
                                explain: '默认的渲染器配置项',
                                type: 'any',
                                optionalValue: '',
                                defaultValue: '',
                                children: [
                                    {
                                        attr: 'name',
                                        explain: '渲染器名称',
                                        type: 'string',
                                        optionalValue: '$button, $buttons, $switch',
                                        defaultValue: ''
                                    },
                                    {
                                        attr: 'props',
                                        explain: '渲染的参数',
                                        type: 'any',
                                        optionalValue: '',
                                        defaultValue: ''
                                    },
                                    {
                                        attr: 'options',
                                        explain: '只对 name=select 有效，下拉选项列表',
                                        type: 'any[]',
                                        optionalValue: '',
                                        defaultValue: ''
                                    },
                                    {
                                        attr: 'optionProps',
                                        explain: '只对 name=select 有效，下拉选项属性参数配置',
                                        type: 'any',
                                        optionalValue: '',
                                        defaultValue: '{ value, label }'
                                    },
                                    {
                                        attr: 'optionGroups',
                                        explain: '只对 name=select 有效，下拉分组选项列表',
                                        type: 'any[]',
                                        optionalValue: '',
                                        defaultValue: ''
                                    },
                                    {
                                        attr: 'optionGroupProps',
                                        explain: '只对 name=select 有效，下拉分组选项属性参数配置',
                                        type: 'any',
                                        optionalValue: '',
                                        defaultValue: '{ value, label }'
                                    },
                                    {
                                        attr: 'events',
                                        explain: '渲染组件的事件（请查看目标渲染的 Events）',
                                        type: 'any',
                                        optionalValue: '',
                                        defaultValue:
                                            '{row,rowIndex,$rowIndex,column,columnIndex,$columnIndex}, ...[目标渲染的 arguments]'
                                    },
                                    {
                                        attr: 'content',
                                        explain: '渲染组件的内容（仅用于特殊组件）',
                                        type: 'String',
                                        optionalValue: '',
                                        defaultValue: ''
                                    }
                                ]
                            },
                            {
                                id: '4-32',
                                attr: 'editRender',
                                explain: '可编辑渲染器配置项',
                                type: 'any',
                                optionalValue: '',
                                defaultValue: '',
                                children: [
                                    {
                                        attr: 'useElement',
                                        explain: '是否使用element渲染器',
                                        type: 'boolean',
                                        optionalValue: '',
                                        defaultValue: ''
                                    },
                                    {
                                        attr: 'name',
                                        explain: '渲染器名称',
                                        type: 'string',
                                        optionalValue:
                                            'vxe渲染器有：input, textarea, select, $input, $select, $switch。element渲染器有：input, select, data',
                                        defaultValue: ''
                                    },
                                    {
                                        attr: 'enabled',
                                        explain: '渲染器名称',
                                        type: 'boolean',
                                        optionalValue: '',
                                        defaultValue: 'true'
                                    },
                                    {
                                        attr: 'props',
                                        explain: '渲染的参数',
                                        type: 'any',
                                        optionalValue: '',
                                        defaultValue: ''
                                    },
                                    {
                                        attr: 'options',
                                        explain: '只对 name=select 有效，下拉选项列表',
                                        type: 'any[]',
                                        optionalValue: '',
                                        defaultValue: ''
                                    },
                                    {
                                        attr: 'optionProps',
                                        explain: '只对 name=select 有效，下拉选项属性参数配置',
                                        type: 'any',
                                        optionalValue: '',
                                        defaultValue: '{ value, label }'
                                    },
                                    {
                                        attr: 'optionGroups',
                                        explain: '只对 name=select 有效，下拉分组选项列表',
                                        type: 'any[]',
                                        optionalValue: '',
                                        defaultValue: ''
                                    },
                                    {
                                        attr: 'optionGroupProps',
                                        explain: '只对 name=select 有效，下拉分组选项属性参数配置',
                                        type: 'any',
                                        optionalValue: '',
                                        defaultValue: '{ value, label }'
                                    },
                                    {
                                        attr: 'events',
                                        explain: '渲染组件的事件（请查看目标渲染的 Events）',
                                        type: 'any',
                                        optionalValue: '',
                                        defaultValue:
                                            '{row,rowIndex,$rowIndex,column,columnIndex,$columnIndex}, ...[目标渲染的 arguments]'
                                    },
                                    {
                                        attr: 'content',
                                        explain: '渲染组件的内容（仅用于特殊组件）',
                                        type: 'String',
                                        optionalValue: '',
                                        defaultValue: ''
                                    },
                                    {
                                        attr: 'autofocus',
                                        explain: '如果是自定义渲染可以指定聚焦的选择器，例如 .my-input',
                                        type: 'String',
                                        optionalValue: '',
                                        defaultValue: ''
                                    },
                                    {
                                        attr: 'autoselect',
                                        explain: '是否在激活编辑之后自动选中输入框内容',
                                        type: 'boolean',
                                        optionalValue: '',
                                        defaultValue: 'false'
                                    },
                                    {
                                        attr: 'defaultValue',
                                        explain: '默认值（插入数据时列的默认值）',
                                        type: 'any | ({ column }) => any',
                                        optionalValue: '',
                                        defaultValue: 'null'
                                    },
                                    {
                                        attr: 'immediate',
                                        explain:
                                            '输入值实时同步更新（默认情况下单元格编辑的值只会在被触发时同步，如果需要实时同步可以设置为 true）',
                                        type: 'boolean',
                                        optionalValue: '',
                                        defaultValue: 'false'
                                    },
                                    {
                                        attr: 'placeholder',
                                        explain: '单元格占位符，但单元格为空值时显示的占位符',
                                        type: 'String',
                                        optionalValue: '',
                                        defaultValue: ''
                                    }
                                ]
                            },
                            {
                                id: '4-33',
                                attr: 'contentRender',
                                explain: '内容渲染配置项',
                                type: 'any',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                id: '4-34',
                                attr: 'treeNode',
                                explain: '只对 tree-config 配置时有效，指定为树节点',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'false'
                            },
                            {
                                id: '4-35',
                                attr: 'params',
                                explain: '额外的参数（可以用来存放一些私有参数）',
                                type: 'any',
                                optionalValue: '',
                                defaultValue: '',
                                children: [
                                    {
                                        attr: 'name',
                                        explain: '是否启用',
                                        type: 'string',
                                        optionalValue: 'input, textarea, select, $input, $select, $switch',
                                        defaultValue: ''
                                    },
                                    {
                                        attr: 'props',
                                        explain: '渲染的参数',
                                        type: 'any',
                                        optionalValue: '',
                                        defaultValue: ''
                                    },
                                    {
                                        attr: 'events',
                                        explain: '渲染组件的事件（请查看目标渲染的 Events）',
                                        type: 'any',
                                        optionalValue: '',
                                        defaultValue:
                                            '{row,rowIndex,$rowIndex,column,columnIndex,$columnIndex}, ...[目标渲染的 arguments]'
                                    }
                                ]
                            },
                            {
                                id: '4-36',
                                attr: 'useElement',
                                explain: '是否使用编辑组件是否使用element组件',
                                type: 'boolean',
                                optionalValue: 'true | false',
                                defaultValue: 'true'
                            }
                        ]
                    },
                    {
                        id: 5,
                        attr: '* tableData',
                        explain: '表格数据',
                        type: 'array',
                        optionalValue: '',
                        defaultValue: '这是一个数据组对象，键值对应columns的key值'
                    },
                    {
                        id: 6,
                        attr: 'border',
                        explain: '是否带有纵向边框',
                        type: 'boolean',
                        optionalValue: 'true | false',
                        defaultValue: 'true'
                    },
                    {
                        id: 7,
                        attr: 'stripe',
                        explain: '是否为斑马纹',
                        type: 'boolean',
                        optionalValue: 'true | false',
                        defaultValue: 'false'
                    },
                    {
                        id: 8,
                        attr: 'height',
                        explain:
                            'Table 的高度， 默认为自动高度。 如果 height 为 number 类型，单位 px；如果 height 为 string 类型，则这个高度会设置为 Table 的 style.height 的值，Table 的高度会受控于外部样式。',
                        type: 'string,number',
                        optionalValue: '',
                        defaultValue: ''
                    },
                    {
                        id: 9,
                        attr: 'openAutoComputedHeight',
                        explain: '开启自动计算高度，优先级比height属性高',
                        type: 'boolean',
                        optionalValue: 'true | false',
                        defaultValue: 'false'
                    },
                    // {
                    // 	id: 9,
                    // 	attr: 'maxHeight',
                    // 	explain: 'Table 的最大高度。 合法的值为数字或者单位为 px 的高度。',
                    // 	type: 'string,number',
                    // 	optionalValue: '',
                    // 	defaultValue: ''
                    // },
                    {
                        id: 10,
                        attr: 'round',
                        explain: '是否为圆角边框',
                        type: 'boolean',
                        optionalValue: 'true | false',
                        defaultValue: 'false'
                    },
                    {
                        id: 11,
                        attr: 'size',
                        explain: '表格的尺寸',
                        type: 'string',
                        optionalValue: 'large | default | small',
                        defaultValue: 'default'
                    },
                    {
                        id: 12,
                        attr: 'loading',
                        explain: '表格的加载状态',
                        type: 'boolean',
                        optionalValue: 'true | false',
                        defaultValue: 'false'
                    },
                    {
                        id: 13,
                        attr: 'align',
                        explain: '所有的列对齐方式',
                        type: 'string',
                        optionalValue: 'left | center | right',
                        defaultValue: 'center'
                    },
                    {
                        id: 14,
                        attr: 'headerAlign',
                        explain: '所有的表头列的对齐方式',
                        type: 'string',
                        optionalValue: 'left | center | right',
                        defaultValue: ''
                    },
                    {
                        id: 15,
                        attr: 'footerAlign',
                        explain: '所有的表尾列的对齐方式',
                        type: 'string',
                        optionalValue: 'left | center | right',
                        defaultValue: ''
                    },
                    {
                        id: 16,
                        attr: 'footerMethod',
                        explain: '表尾的数据获取方法，返回一个二维数组。',
                        type: '({ columns, data }) => any[][]',
                        optionalValue: '',
                        defaultValue: ''
                    },
                    {
                        id: 17,
                        attr: 'showFooter',
                        explain: '是否显示表尾',
                        type: 'boolean',
                        optionalValue: 'true | false',
                        defaultValue: 'true'
                    },
                    {
                        id: 18,
                        attr: 'showHeader',
                        explain: '是否显示表头',
                        type: 'boolean',
                        optionalValue: 'true | false',
                        defaultValue: 'true'
                    },
                    {
                        id: 19,
                        attr: 'autoResize',
                        explain:
                            '自动监听父元素的变化去重新计算表格（对于父元素可能存在动态变化、显示隐藏的容器中、列宽异常等场景中的可能会用到）',
                        type: 'boolean',
                        optionalValue: 'true | false',
                        defaultValue: 'false'
                    },
                    {
                        id: 20,
                        attr: 'syncResize',
                        explain:
                            '自动跟随某个属性的变化去重新计算表格，和手动调用 recalculate 方法是一样的效果（对于通过某个属性来控制显示/隐藏切换时可能会用到。',
                        type: 'boolean | string | number',
                        optionalValue: '',
                        defaultValue: 'false'
                    },
                    {
                        id: 21,
                        attr: 'showHeaderOverflow',
                        explain: '设置表头所有内容过长时显示为省略号',
                        type: 'boolean | string',
                        optionalValue:
                            'ellipsis（只显示省略号）,title（并且显示为原生 title）,tooltip（并且显示为 tooltip 提示）',
                        defaultValue: 'false'
                    },
                    {
                        id: 22,
                        attr: 'showFooterOverflow',
                        explain: '设置表尾所有内容过长时显示为省略号。',
                        type: 'boolean | string',
                        optionalValue:
                            'ellipsis（只显示省略号）,title（并且显示为原生 title）,tooltip（并且显示为 tooltip 提示）',
                        defaultValue: 'false'
                    },
                    {
                        id: 23,
                        attr: 'editRules',
                        explain: '校验规则配置项。。',
                        type: '{ [field: string]: VxeTableDefines.ValidatorRule[] }',
                        optionalValue: '',
                        defaultValue: ''
                    },
                    {
                        id: 24,
                        attr: 'emptyText',
                        explain: '空数据时显示的内容。',
                        type: 'string',
                        optionalValue: '',
                        defaultValue: '暂无数据'
                    },
                    {
                        id: 25,
                        attr: 'emptyRender',
                        explain: '空内容渲染配置项，empty-render 的优先级大于 empty-text。',
                        type: 'return h函数',
                        optionalValue: '',
                        defaultValue: ''
                    },
                    {
                        id: 26,
                        attr: 'keepSource',
                        explain:
                            '保持原始值的状态，被某些功能所依赖，比如编辑状态、还原数据等（开启后影响性能，具体取决于数据量）。',
                        type: 'boolean',
                        optionalValue: '',
                        defaultValue: 'false'
                    },
                    {
                        id: 27,
                        attr: 'columnConfig',
                        explain: '列配置信息',
                        type: 'any',
                        optionalValue: '',
                        defaultValue: '',
                        children: [
                            {
                                id: '27-1',
                                attr: 'useKey',
                                explain: '是否需要为每一列的 VNode 设置 key 属性（非特殊情况下不需要使用）',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'false'
                            },
                            {
                                id: '27-2',
                                attr: 'isCurrent',
                                explain: '当鼠标点击列头时，是否要高亮当前列',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'false'
                            },
                            {
                                id: '27-3',
                                attr: 'isHover',
                                explain: '当鼠标移到列头时，是否要高亮当前头',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'false'
                            },
                            {
                                id: '27-4',
                                attr: 'resizable',
                                explain: '每一列是否启用列宽调整',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'false'
                            },
                            {
                                id: '27-5',
                                attr: 'width',
                                explain: '每一列的宽度',
                                type: 'number, string',
                                optionalValue: 'auto, px, %',
                                defaultValue: ''
                            },
                            {
                                id: '27-6',
                                attr: 'minWidth',
                                explain: '每一列的最小宽度',
                                type: 'number, string',
                                optionalValue: 'auto, px, %',
                                defaultValue: ''
                            }
                        ]
                    },
                    {
                        id: 28,
                        attr: 'rowConfig',
                        explain: '行配置信息',
                        type: 'any',
                        optionalValue: '',
                        defaultValue: '',
                        children: [
                            {
                                id: '28-1',
                                attr: 'useKey',
                                explain: '是否需要为每一行的 VNode 设置 key 属性（非特殊情况下不需要使用）',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'false'
                            },
                            {
                                id: '28-2',
                                attr: 'keyField',
                                explain: '自定义行数据唯一主键的字段名（默认自动生成）',
                                type: 'string',
                                optionalValue: '',
                                defaultValue: '_X_ROW_KEY'
                            },
                            {
                                id: '28-3',
                                attr: 'isCurrent',
                                explain: '当鼠标点击行时，是否要高亮当前行',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'false'
                            },
                            {
                                id: '28-4',
                                attr: 'isHover',
                                explain: '当鼠标移到行时，是否要高亮当前行',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'false'
                            },
                            {
                                id: '28-5',
                                attr: 'height',
                                explain: '只对 show-overflow 有效，每一行的高度',
                                type: 'number',
                                optionalValue: '',
                                defaultValue: ''
                            }
                        ]
                    },
                    {
                        id: 29,
                        attr: 'resizableConfig',
                        explain: '列宽拖动配置项',
                        type: 'Object',
                        optionalValue: '',
                        defaultValue: '',
                        children: [
                            {
                                id: '29-1',
                                attr: 'minWidth',
                                explain: '列宽拖动的最小宽度',
                                type: 'number | string | (({ $table, column, columnIndex, cell }) => number | string)',
                                optionalValue: '',
                                defaultValue: ''
                            }
                        ]
                    },
                    {
                        id: 30,
                        attr: 'seqConfig',
                        explain: '序号配置项',
                        type: 'any',
                        optionalValue: '',
                        defaultValue: '',
                        children: [
                            {
                                id: '30-1',
                                attr: 'seqMethod',
                                explain: '自定义序号的方法，返回处理后的值',
                                type: '({ row, rowIndex, column, columnIndex }) => number',
                                optionalValue: '',
                                defaultValue: ''
                            }
                        ]
                    },
                    {
                        id: 31,
                        attr: 'sortConfig',
                        explain: '排序配置项',
                        type: 'any',
                        optionalValue: '',
                        defaultValue: '',
                        children: [
                            {
                                id: '31-1',
                                attr: 'defaultSort',
                                explain: '默认排序（只会在初始化时被触发一次）',
                                type: 'any | any[]',
                                optionalValue: '',
                                defaultValue: '',
                                children: [
                                    {
                                        id: '31-1-1',
                                        attr: 'field',
                                        explain: '列字段名',
                                        type: 'string',
                                        optionalValue: '',
                                        defaultValue: ''
                                    },
                                    {
                                        id: '31-1-2',
                                        attr: 'order',
                                        explain: '排序方式',
                                        type: 'string',
                                        optionalValue: 'asc（升序）,desc（降序）, null',
                                        defaultValue: ''
                                    }
                                ]
                            },
                            {
                                id: '31-2',
                                attr: 'orders',
                                explain: '自定义轮转顺序',
                                type: 'string[]',
                                optionalValue: 'asc, desc, null',
                                defaultValue: "['asc', 'desc', 'null']"
                            },
                            {
                                id: '31-2',
                                attr: 'sortMethod',
                                explain: '全局排序方法，当触发排序时会调用该函数，返回排序后的列表',
                                type: '({ data, column, property, order }) => any[]',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                id: '31-3',
                                attr: 'multiple',
                                explain: '是否启用多列组合筛选',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'false'
                            },
                            {
                                id: '31-4',
                                attr: 'chronological',
                                explain: '只对 multiple 有效，是否按照先后触发顺序进行排序',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'false'
                            },
                            {
                                id: '31-5',
                                attr: 'remote',
                                explain: '所有列是否使用服务端排序，如果设置为 true 则不会对数据进行处理',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'false'
                            },
                            {
                                id: '31-6',
                                attr: 'trigger',
                                explain: '触发方式（注：当多种功能重叠时，会同时触发）',
                                type: 'string',
                                optionalValue: 'default（点击按钮触发）, cell（点击表头触发）',
                                defaultValue: 'default'
                            },
                            {
                                id: '31-7',
                                attr: 'showIcon',
                                explain: '是否显示列头排序图标',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'true'
                            },
                            {
                                id: '31-8',
                                attr: 'iconAsc',
                                explain: '自定义升序的图标',
                                type: 'string',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                id: '31-9',
                                attr: 'iconDesc',
                                explain: '自定义降序的图标',
                                type: 'string',
                                optionalValue: '',
                                defaultValue: ''
                            }
                        ]
                    },
                    {
                        id: 32,
                        attr: 'filterConfig',
                        explain: '筛选配置项',
                        type: 'any',
                        optionalValue: '',
                        defaultValue: '',
                        children: [
                            {
                                id: '32-1',
                                attr: 'remote',
                                explain: '所有列是否使用服务端筛选，如果设置为 true 则不会对数据进行处理',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                id: '32-2',
                                attr: 'filterMethod',
                                explain: '全局筛选方法，当触发筛选时会调用该函数，返回是否有效',
                                type: '({ options, values, cellValue, row, column }) => boolean',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                id: '32-3',
                                attr: 'showIcon',
                                explain: '是否显示列头筛选图标',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'true'
                            },
                            {
                                id: '32-4',
                                attr: 'iconNone',
                                explain: '自定义无条件时显示的图标',
                                type: 'string',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                id: '32-5',
                                attr: 'iconMatch',
                                explain: '自定义带条件时显示的图标',
                                type: 'string',
                                optionalValue: '',
                                defaultValue: ''
                            }
                        ]
                    },
                    {
                        id: 33,
                        attr: 'exportConfig',
                        explain: '导出配置项',
                        type: 'any',
                        optionalValue: '',
                        defaultValue: '',
                        children: [
                            {
                                id: '33-1',
                                attr: 'filename',
                                explain: '文件名',
                                type: 'string',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                id: '33-2',
                                attr: 'sheetName',
                                explain: '表名（只对支持的文档类型有效）',
                                type: 'string',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                id: '33-3',
                                attr: 'type',
                                explain: '文件类型',
                                type: 'string',
                                optionalValue: 'csv, html, xml, txt',
                                defaultValue: 'csv'
                            },
                            {
                                id: '33-4',
                                attr: 'types',
                                explain: '可选文件类型列表',
                                type: 'string[]',
                                optionalValue: 'csv, html, xml, txt',
                                defaultValue: 'csv, html, xml, txt'
                            },
                            {
                                id: '33-5',
                                attr: 'mode',
                                explain: '输出数据的方式',
                                type: 'string',
                                optionalValue: 'current, selected, all',
                                defaultValue: 'current'
                            },
                            {
                                id: '33-6',
                                attr: 'modes',
                                explain: '输出数据的方式列表',
                                type: 'string[]',
                                optionalValue: 'current, selected, all',
                                defaultValue: 'current, selected'
                            },
                            {
                                id: '33-7',
                                attr: 'original',
                                explain:
                                    '是否为源数据（某些场景下支持 true， 比如虚拟滚动、优化的固定列..，如果需要支持导入，则必须设置为 true）',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'false'
                            },
                            {
                                id: '33-8',
                                attr: 'message',
                                explain: '是否显示内置的消息提示',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'true'
                            },
                            {
                                id: '33-9',
                                attr: 'isHeader',
                                explain: '是否需要表头',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'true'
                            },
                            {
                                id: '33-10',
                                attr: 'isColgroup',
                                explain: '如果存在，则支持带有分组结构的表头',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'true'
                            },
                            {
                                id: '33-11',
                                attr: 'isFooter',
                                explain: '是否需要表尾',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'true'
                            },
                            {
                                id: '33-12',
                                attr: 'isMerge',
                                explain: '如果存在，则支持临时合并的单元格',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'false'
                            },
                            {
                                id: '33-13',
                                attr: 'isAllExpand',
                                explain: '如果存在，则强制展开所有树层级',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'false'
                            },
                            {
                                id: '33-14',
                                attr: 'download',
                                explain: '是否马上下载，如果设置为 false 则通过返回结果为内容的 Promise',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'true'
                            },
                            {
                                id: '33-15',
                                attr: 'data',
                                explain: '指定数据',
                                type: 'any[]',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                id: '33-16',
                                attr: 'columns',
                                explain: '指定列',
                                type: 'Array<{ colId?: number; field:? string; type?: string }>',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                id: '33-17',
                                attr: 'columnFilterMethod',
                                explain: '列过滤方法，该函数的返回值用来决定是否过滤掉列',
                                type: '({ column, $columnIndex }) => boolean',
                                optionalValue: '',
                                defaultValue: '默认过滤掉 type=seq,checkbox,radio 和 field 为空的列'
                            },
                            {
                                id: '33-18',
                                attr: 'dataFilterMethod',
                                explain: '数据过滤方法，该函数的返回值用来决定是否过滤掉数据行',
                                type: '({ row, $rowIndex }) => boolean',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                id: '33-19',
                                attr: 'footerFilterMethod',
                                explain: '表尾过滤方法，该函数的返回值用来决定是否过滤掉表尾行',
                                type: '({ items, $rowIndex }) => boolean',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                id: '33-20',
                                attr: 'remote',
                                explain: '是否服务端导出',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'false'
                            },
                            {
                                id: '33-21',
                                attr: 'style',
                                explain: '只对 type=html 有效，自定义文档的 css 样式信息',
                                type: 'string',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                id: '33-22',
                                attr: 'useStyle',
                                explain: '只对 type=html,xlsx 有效，支持带样式',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'false'
                            },
                            {
                                id: '33-23',
                                attr: 'sheetMethod',
                                explain: '只对 type=xlsx 有效，该函数用于自定义工作簿的单元格',
                                type: '({ options, workbook, worksheet }) => void',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                id: '33-24',
                                attr: 'exportMethod',
                                explain: '只对 remote=true 有效，该函数用于自定义导出或服务端导出，返回 Promise',
                                type: '({ options }) => Promise<any>',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                id: '33-25',
                                attr: 'beforeExportMethod',
                                explain: '该方法会在导出之前触发',
                                type: '({ options }) => void',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                id: '33-26',
                                attr: 'afterExportMethod',
                                explain: '该方法会在导出之后触发',
                                type: '({ options }) => void',
                                optionalValue: '',
                                defaultValue: ''
                            }
                        ]
                    },
                    {
                        id: 34,
                        attr: 'importConfig',
                        explain: '导入配置项',
                        type: 'any',
                        optionalValue: '',
                        defaultValue: '',
                        children: [
                            {
                                id: '34-1',
                                attr: 'mode',
                                explain: '导入数据的方式',
                                type: 'string',
                                optionalValue: 'covering, insert',
                                defaultValue: 'covering'
                            },
                            {
                                id: '34-2',
                                attr: 'message',
                                explain: '是否显示内置的消息提示',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'true'
                            },
                            {
                                id: '34-3',
                                attr: 'types',
                                explain: '导入的文件类型列表',
                                type: 'string[]',
                                optionalValue: 'csv, html, xml, txt',
                                defaultValue: "['csv', 'html', 'xml', 'txt']"
                            },
                            {
                                id: '34-4',
                                attr: 'encoding',
                                explain: '导入的文件的编码类型',
                                type: 'string',
                                optionalValue: '',
                                defaultValue: 'utf-8'
                            },
                            {
                                id: '34-5',
                                attr: 'remote',
                                explain: '是否服务端导入',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'false'
                            },
                            {
                                id: '34-6',
                                attr: 'importMethod',
                                explain: '只对 remote=true 有效，该函数用于自定义导入或服务端导入，返回 Promise',
                                type: '({ file, options }) => Promise<any>',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                id: '34-7',
                                attr: 'beforeImportMethod',
                                explain: '该方法会在导入之前触发',
                                type: '({ options }) => void',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                id: '34-8',
                                attr: 'afterImportMethod',
                                explain: '该方法会在导入之后触发',
                                type: '({ options }) => void',
                                optionalValue: '',
                                defaultValue: ''
                            }
                        ]
                    },
                    {
                        id: 35,
                        attr: 'printConfig',
                        explain: '打印配置项',
                        type: 'any',
                        optionalValue: '',
                        defaultValue: '',
                        children: [
                            {
                                id: '35-1',
                                attr: 'sheetName',
                                explain: '表名（只对支持的文档类型有效）',
                                type: 'string',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                id: '35-2',
                                attr: 'mode',
                                explain: '输出数据的方式',
                                type: 'string',
                                optionalValue: 'current, selected, all',
                                defaultValue: 'current'
                            },
                            {
                                id: '35-3',
                                attr: 'modes',
                                explain: '输出数据的方式列表',
                                type: 'string[]',
                                optionalValue: 'current, selected, all',
                                defaultValue: 'current, selected'
                            },
                            {
                                id: '35-4',
                                attr: 'original',
                                explain:
                                    '是否为源数据（某些场景下支持 true， 比如虚拟滚动、优化的固定列..，如果需要支持导入，则必须设置为 true）',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'false'
                            },
                            {
                                id: '35-5',
                                attr: 'isHeader',
                                explain: '是否需要表头',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'true'
                            },
                            {
                                id: '35-6',
                                attr: 'isColgroup',
                                explain: '如果存在，则支持带有分组结构的表头',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'true'
                            },
                            {
                                id: '35-7',
                                attr: 'isFooter',
                                explain: '是否需要表尾',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'true'
                            },
                            {
                                id: '35-8',
                                attr: 'isMerge',
                                explain: '如果存在，则支持临时合并的单元格',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'false'
                            },
                            {
                                id: '35-9',
                                attr: 'isAllExpand',
                                explain: '如果存在，则强制展开所有树层级',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'false'
                            },
                            {
                                id: '35-10',
                                attr: 'data',
                                explain: '指定数据',
                                type: 'any[]',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                id: '35-11',
                                attr: 'columns',
                                explain: '指定列',
                                type: 'Array<{ colId?: number; field:? string; type?: string }>',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                id: '35-12',
                                attr: 'columnFilterMethod',
                                explain: '列过滤方法，该函数的返回值用来决定是否过滤掉列',
                                type: '({ column, $columnIndex }) => boolean',
                                optionalValue: '',
                                defaultValue: '默认过滤掉 type=seq,checkbox,radio 和 field 为空的列'
                            },
                            {
                                id: '35-13',
                                attr: 'dataFilterMethod',
                                explain: '数据过滤方法，该函数的返回值用来决定是否过滤掉数据行',
                                type: '({ row, $rowIndex }) => boolean',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                id: '35-14',
                                attr: 'footerFilterMethod',
                                explain: '表尾过滤方法，该函数的返回值用来决定是否过滤掉表尾行',
                                type: '({ items, $rowIndex }) => boolean',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                id: '35-15',
                                attr: 'style',
                                explain: '只对 type=html 有效，自定义文档的 css 样式信息',
                                type: 'string',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                id: '35-16',
                                attr: 'useStyle',
                                explain: '只对 type=html,xlsx 有效，支持带样式',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'false'
                            },
                            {
                                id: '35-17',
                                attr: 'content',
                                explain: '自定义打印的内容',
                                type: 'string',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                id: '35-18',
                                attr: 'beforePrintMethod',
                                explain: '该函数会在打印之前触发，可以通过返回自定义打印的内容',
                                type: '({ content, options }) => string',
                                optionalValue: '',
                                defaultValue: ''
                            }
                        ]
                    },
                    {
                        id: 36,
                        attr: 'radioConfig',
                        explain: '单选框配置项',
                        type: 'any',
                        optionalValue: '',
                        defaultValue: '',
                        children: [
                            {
                                attr: 'strict',
                                explain: '严格模式，选中后不能取消',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'true'
                            },
                            {
                                attr: 'reserve',
                                explain:
                                    '是否保留勾选状态，例如：数据被刷新或者分页之后还保留之前选中的状态（需要有 row-config.keyField）',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'false'
                            },
                            {
                                attr: 'labelField',
                                explain: '单选框显示的字段名，可以直接显示在单选框中',
                                type: 'string',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                attr: 'checkRowKey',
                                explain: '默认选中指定行（只会在初始化时被触发一次，需要有 row-config.keyField）',
                                type: 'string',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                attr: 'visibleMethod',
                                explain: '是否允许选中的方法，该方法，的返回值用来决定这一行的 radio 是否可以选中',
                                type: '({ row }) => boolean',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                attr: 'checkMethod',
                                explain: '是否允许勾选的方法，该方法，的返回值用来决定这一行的 radio 是否显示',
                                type: '({ row }) => boolean',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                attr: 'trigger',
                                explain: '触发方式（注：当多种功能重叠时，会同时触发）',
                                type: 'string',
                                optionalValue: 'default（默认）, cell（点击单元格触发）, row（点击行触发）',
                                defaultValue: 'default'
                            },
                            {
                                attr: 'highlight',
                                explain: '高亮选中行',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'false'
                            }
                        ]
                    },
                    {
                        id: 37,
                        attr: 'checkboxConfig',
                        explain: '复选框配置项',
                        type: 'any',
                        optionalValue: '',
                        defaultValue: '',
                        children: [
                            {
                                attr: 'labelField',
                                explain: '复选框显示的字段名，可以直接显示在复选框中',
                                type: 'string',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                attr: 'checkField',
                                explain:
                                    '绑定选中属性，如果设置了该属性渲染速度更快（建议数据量大时使用，行数据中必须存在该字段，否则无效）',
                                type: 'string',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                attr: 'showHeader',
                                explain: '是否显示全选按钮（如果 checkStrictly=true 则默认为 false）',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'true'
                            },
                            {
                                attr: 'checkAll',
                                explain: '默认勾选所有（只会在初始化时被触发一次）',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'false'
                            },
                            {
                                attr: 'checkRowKeys',
                                explain: '是否严格的遵循父子不互相关联的做法',
                                type: 'string[]',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                attr: 'checkStrictly',
                                explain: '默认勾选指定行（只会在初始化时被触发一次，需要有 row-config.keyField）',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'false'
                            },
                            {
                                attr: 'strict',
                                explain: '严格模式，当数据为空或全部禁用时，列头的复选框为禁用状态',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'true'
                            },
                            {
                                attr: 'visibleMethod',
                                explain: '是否允许勾选的方法，该方法，的返回值用来决定这一行的 checkbox 是否显示',
                                type: '({ row }) => boolean',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                attr: 'checkMethod',
                                explain: '是否允许勾选的方法，该方法，的返回值用来决定这一行的 checkbox 是否可以勾选',
                                type: '({ row }) => boolean',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                attr: 'trigger',
                                explain: '触发方式（注：当多种功能重叠时，会同时触发）',
                                type: 'string',
                                optionalValue: 'default（默认）, cell（点击单元格触发）, row（点击行触发）',
                                defaultValue: 'default'
                            },
                            {
                                attr: 'highlight',
                                explain: '高亮勾选行',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'false'
                            },
                            {
                                attr: 'reserve',
                                explain:
                                    '是否保留勾选状态，对于某些场景可能会用到，比如数据被刷新之后还保留之前选中的状态（需要有 row-config.keyField）',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'false'
                            },
                            {
                                attr: 'range',
                                explain: '开启复选框范围选择功能（启用后通过鼠标在复选框的列内滑动选中或取消指定行）',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'false'
                            }
                        ]
                    },
                    {
                        id: 38,
                        attr: 'tooltipConfig',
                        explain: 'tooltip 配置项',
                        type: 'any',
                        optionalValue: '',
                        defaultValue: '',
                        children: [
                            {
                                attr: 'showAll',
                                explain: '所有单元格开启工具提示',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'false'
                            },
                            {
                                attr: 'theme',
                                explain: '主题颜色',
                                type: 'string',
                                optionalValue: 'dark,light',
                                defaultValue: 'dark'
                            },
                            {
                                attr: 'enterable',
                                explain: '鼠标是否可进入到工具提示中',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'false'
                            },
                            {
                                attr: 'enterDelay',
                                explain: '鼠标移入后延时多少才显示工具提示',
                                type: 'number',
                                optionalValue: '',
                                defaultValue: '500'
                            },
                            {
                                attr: 'leaveDelay',
                                explain: '鼠标移出后延时多少才隐藏工具提示',
                                type: 'number',
                                optionalValue: '',
                                defaultValue: '300'
                            },
                            {
                                attr: 'contentMethod',
                                explain:
                                    '该方法可以通过返回值来重写默认的提示内容，可以返回 null 使用默认的提示内容，可以返回空内容去掉指定单元格的提示内容',
                                type: '({ items?, row?, rowIndex?, $rowIndex, column, columnIndex, $columnIndex, type, cell, $event }) => string',
                                optionalValue: '',
                                defaultValue: ''
                            }
                        ]
                    },
                    {
                        id: 39,
                        attr: 'expandConfig',
                        explain: '展开行配置项（不支持虚拟滚动）',
                        type: 'any',
                        optionalValue: '',
                        defaultValue: '',
                        children: [
                            {
                                attr: 'labelField',
                                explain: '展开列显示的字段名，可以直接显示在单元格中',
                                type: 'string',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                attr: 'expandAll',
                                explain: '默认展开所有行（只会在初始化时被触发一次）',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'false'
                            },
                            {
                                attr: 'expandRowKeys',
                                explain: '默认展开指定行（只会在初始化时被触发一次，需要有 row-config.keyField）',
                                type: 'string[]',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                attr: 'accordion',
                                explain: '每次只能展开一行',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'false'
                            },
                            {
                                attr: 'trigger',
                                explain: '触发方式（注：当多种功能重叠时，会同时触发）',
                                type: 'string',
                                optionalValue: 'default（点击按钮触发）, cell（点击单元格触发）, row（点击行触发）',
                                defaultValue: 'default'
                            },
                            {
                                attr: 'lazy',
                                explain: '是否使用懒加载',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'false'
                            },
                            {
                                attr: 'loadMethod',
                                explain: '该方法用于异步加载展开后的内容',
                                type: '({ row, rowIndex?, $rowIndex? }) => Promise<any[]>;',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                attr: 'toggleMethod',
                                explain: '该方法在展开或关闭触发之前调用，可以通过返回值来决定是否允许继续执行',
                                type: '({ expanded, column, columnIndex, row, rowIndex? }) => boolean',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                attr: 'visibleMethod',
                                explain: '该函数的返回值用来决定是否允许显示展开按钮',
                                type: '({ column, columnIndex, row, rowIndex? }) => boolean',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                attr: 'reserve',
                                explain:
                                    '是否保留展开状态，对于某些场景可能会用到，比如数据被刷新之后还保留之前展开的状态（需要有 row-config.keyField）',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'false'
                            },
                            {
                                attr: 'showIcon',
                                explain: '是否显示图标按钮',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'true'
                            },
                            {
                                attr: 'iconOpen',
                                explain: '自定义展开后显示的图标',
                                type: 'string',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                attr: 'iconClose',
                                explain: '自定义收起后显示的图标',
                                type: 'string',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                attr: 'iconLoaded',
                                explain: '自定义懒加载中显示的图标',
                                type: 'string',
                                optionalValue: '',
                                defaultValue: ''
                            }
                        ]
                    },
                    {
                        id: 40,
                        attr: 'treeConfig',
                        explain: '树形结构配置项',
                        type: 'any',
                        optionalValue: '',
                        defaultValue: '',
                        children: [
                            {
                                attr: 'transform',
                                explain: '自动将列表转为树结构（支持虚拟滚动）',
                                type: 'string',
                                optionalValue: '',
                                defaultValue: 'false'
                            },
                            {
                                attr: 'rowField',
                                explain: '树节点的字段名',
                                type: 'string',
                                optionalValue: '',
                                defaultValue: 'id'
                            },
                            {
                                attr: 'parentField',
                                explain: '树父节点的字段名',
                                type: 'string',
                                optionalValue: '',
                                defaultValue: 'parentId'
                            },
                            {
                                attr: 'children',
                                explain: '树子节点的字段名',
                                type: 'string',
                                optionalValue: '',
                                defaultValue: 'children'
                            },
                            {
                                attr: 'indent',
                                explain: '树节点的缩进',
                                type: 'number',
                                optionalValue: '',
                                defaultValue: '20'
                            },
                            {
                                attr: 'line',
                                explain: '树节点的连接线（启用连接线会降低渲染性能）',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'false'
                            },
                            {
                                attr: 'expandAll',
                                explain: '默认展开所有子孙树节点（只会在初始化时被触发一次）',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'false'
                            },
                            {
                                attr: 'expandRowKeys',
                                explain: '默认展开指定树节点（只会在初始化时被触发一次，需要有 row-config.keyField）',
                                type: 'string[]',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                attr: 'accordion',
                                explain: '对于同一级的节点，每次只能展开一个',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'false'
                            },
                            {
                                attr: 'trigger',
                                explain: '触发方式（注：当多种功能重叠时，会同时触发）',
                                type: 'string',
                                optionalValue: 'default（点击按钮触发）, cell（点击单元格触发）, row（点击行触发）',
                                defaultValue: 'default'
                            },
                            {
                                attr: 'lazy',
                                explain: '是否使用懒加载',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'false'
                            },
                            {
                                attr: 'hasChild',
                                explain: '只对 lazy 启用后有效，标识是否存在子节点，从而控制是否允许被点击',
                                type: 'string',
                                optionalValue: '',
                                defaultValue: 'hasChild'
                            },
                            {
                                attr: 'loadMethod',
                                explain: '该方法用于异步加载子节点',
                                type: '({ row }) => Promise<any[]>;',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                attr: 'toggleMethod',
                                explain: '该方法在展开或关闭触发之前调用，可以通过返回值来决定是否允许继续执行',
                                type: '({ expanded, row, column, columnIndex }) => boolean',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                attr: 'reserve',
                                explain:
                                    '是否保留展开状态，对于某些场景可能会用到，比如数据被刷新之后还保留之前展开的状态（需要有 row-config.keyField）',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'false'
                            },
                            {
                                attr: 'showIcon',
                                explain: '是否显示图标按钮',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'true'
                            },
                            {
                                attr: 'iconOpen',
                                explain: '自定义展开后显示的图标',
                                type: 'string',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                attr: 'iconClose',
                                explain: '自定义收起后显示的图标',
                                type: 'string',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                attr: 'iconLoaded',
                                explain: '自定义懒加载中显示的图标',
                                type: 'string',
                                optionalValue: '',
                                defaultValue: ''
                            }
                        ]
                    },
                    {
                        id: 41,
                        attr: 'menuConfig',
                        explain: '快捷菜单配置项',
                        type: 'any',
                        optionalValue: '',
                        defaultValue: '',
                        children: [
                            {
                                attr: 'enabled',
                                explain: '是否启用',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'true'
                            },
                            {
                                attr: 'header',
                                explain: '表头的右键菜单',
                                type: 'any',
                                optionalValue: '',
                                defaultValue: '',
                                children: [
                                    {
                                        attr: 'disabled',
                                        explain: '是否禁用右键',
                                        type: 'boolean',
                                        optionalValue: '',
                                        defaultValue: 'false'
                                    },
                                    {
                                        attr: 'options',
                                        explain: '菜单配置',
                                        type: 'any[][]',
                                        optionalValue: '',
                                        defaultValue: '',
                                        children: [
                                            {
                                                attr: 'code',
                                                explain: '菜单键值',
                                                type: 'string',
                                                optionalValue: '',
                                                defaultValue: ''
                                            },
                                            {
                                                attr: 'name',
                                                explain: '菜单名称（支持开启国际化）',
                                                type: 'string',
                                                optionalValue: '',
                                                defaultValue: ''
                                            },
                                            {
                                                attr: 'prefixIcon',
                                                explain: '前缀图标 className',
                                                type: 'string',
                                                optionalValue: '',
                                                defaultValue: ''
                                            },
                                            {
                                                attr: 'suffixIcon',
                                                explain: '后缀图标 className',
                                                type: 'string',
                                                optionalValue: '',
                                                defaultValue: ''
                                            },
                                            {
                                                attr: 'className',
                                                explain: '菜单项的 className',
                                                type: 'string',
                                                optionalValue: '',
                                                defaultValue: ''
                                            },
                                            {
                                                attr: 'visible',
                                                explain: '是否可视',
                                                type: 'boolean',
                                                optionalValue: '',
                                                defaultValue: 'true'
                                            },
                                            {
                                                attr: 'disabled',
                                                explain: '是否禁用',
                                                type: 'boolean',
                                                optionalValue: '',
                                                defaultValue: 'false'
                                            },
                                            {
                                                attr: 'children',
                                                explain: '二级菜单（最多只允许有二级）',
                                                type: 'any[]',
                                                optionalValue: '',
                                                defaultValue: '',
                                                children: [
                                                    {
                                                        attr: 'code',
                                                        explain: '菜单键值',
                                                        type: 'string',
                                                        optionalValue: '',
                                                        defaultValue: ''
                                                    },
                                                    {
                                                        attr: 'name',
                                                        explain: '菜单名称',
                                                        type: 'string',
                                                        optionalValue: '',
                                                        defaultValue: ''
                                                    },
                                                    {
                                                        attr: 'prefixIcon',
                                                        explain: '前缀图标 className',
                                                        type: 'string',
                                                        optionalValue: '',
                                                        defaultValue: ''
                                                    },
                                                    {
                                                        attr: 'visible',
                                                        explain: '是否可视',
                                                        type: 'boolean',
                                                        optionalValue: '',
                                                        defaultValue: 'true'
                                                    },
                                                    {
                                                        attr: 'disabled',
                                                        explain: '是否禁用',
                                                        type: 'boolean',
                                                        optionalValue: '',
                                                        defaultValue: 'false'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                attr: 'body',
                                explain: '内容的右键菜单',
                                type: 'any',
                                optionalValue: '',
                                defaultValue: '',
                                children: [
                                    {
                                        attr: 'disabled',
                                        explain: '是否禁用右键',
                                        type: 'boolean',
                                        optionalValue: '',
                                        defaultValue: 'false'
                                    },
                                    {
                                        attr: 'options',
                                        explain: '菜单配置',
                                        type: 'any[][]',
                                        optionalValue: '',
                                        defaultValue: '',
                                        children: [
                                            {
                                                attr: 'code',
                                                explain: '菜单键值',
                                                type: 'string',
                                                optionalValue: '',
                                                defaultValue: ''
                                            },
                                            {
                                                attr: 'name',
                                                explain: '菜单名称（支持开启国际化）',
                                                type: 'string',
                                                optionalValue: '',
                                                defaultValue: ''
                                            },
                                            {
                                                attr: 'prefixIcon',
                                                explain: '前缀图标 className',
                                                type: 'string',
                                                optionalValue: '',
                                                defaultValue: ''
                                            },
                                            {
                                                attr: 'suffixIcon',
                                                explain: '后缀图标 className',
                                                type: 'string',
                                                optionalValue: '',
                                                defaultValue: ''
                                            },
                                            {
                                                attr: 'className',
                                                explain: '菜单项的 className',
                                                type: 'string',
                                                optionalValue: '',
                                                defaultValue: ''
                                            },
                                            {
                                                attr: 'visible',
                                                explain: '是否可视',
                                                type: 'boolean',
                                                optionalValue: '',
                                                defaultValue: 'true'
                                            },
                                            {
                                                attr: 'disabled',
                                                explain: '是否禁用',
                                                type: 'boolean',
                                                optionalValue: '',
                                                defaultValue: 'false'
                                            },
                                            {
                                                attr: 'children',
                                                explain: '二级菜单（最多只允许有二级）',
                                                type: 'any[]',
                                                optionalValue: '',
                                                defaultValue: '',
                                                children: [
                                                    {
                                                        attr: 'code',
                                                        explain: '菜单键值',
                                                        type: 'string',
                                                        optionalValue: '',
                                                        defaultValue: ''
                                                    },
                                                    {
                                                        attr: 'name',
                                                        explain: '菜单名称',
                                                        type: 'string',
                                                        optionalValue: '',
                                                        defaultValue: ''
                                                    },
                                                    {
                                                        attr: 'prefixIcon',
                                                        explain: '前缀图标 className',
                                                        type: 'string',
                                                        optionalValue: '',
                                                        defaultValue: ''
                                                    },
                                                    {
                                                        attr: 'visible',
                                                        explain: '是否可视',
                                                        type: 'boolean',
                                                        optionalValue: '',
                                                        defaultValue: 'true'
                                                    },
                                                    {
                                                        attr: 'disabled',
                                                        explain: '是否禁用',
                                                        type: 'boolean',
                                                        optionalValue: '',
                                                        defaultValue: 'false'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                attr: 'footer',
                                explain: '表尾的右键菜单',
                                type: 'any',
                                optionalValue: '',
                                defaultValue: '',
                                children: [
                                    {
                                        attr: 'disabled',
                                        explain: '是否禁用右键',
                                        type: 'boolean',
                                        optionalValue: '',
                                        defaultValue: 'false'
                                    },
                                    {
                                        attr: 'options',
                                        explain: '菜单配置',
                                        type: 'any[][]',
                                        optionalValue: '',
                                        defaultValue: '',
                                        children: [
                                            {
                                                attr: 'code',
                                                explain: '菜单键值',
                                                type: 'string',
                                                optionalValue: '',
                                                defaultValue: ''
                                            },
                                            {
                                                attr: 'name',
                                                explain: '菜单名称（支持开启国际化）',
                                                type: 'string',
                                                optionalValue: '',
                                                defaultValue: ''
                                            },
                                            {
                                                attr: 'prefixIcon',
                                                explain: '前缀图标 className',
                                                type: 'string',
                                                optionalValue: '',
                                                defaultValue: ''
                                            },
                                            {
                                                attr: 'suffixIcon',
                                                explain: '后缀图标 className',
                                                type: 'string',
                                                optionalValue: '',
                                                defaultValue: ''
                                            },
                                            {
                                                attr: 'className',
                                                explain: '菜单项的 className',
                                                type: 'string',
                                                optionalValue: '',
                                                defaultValue: ''
                                            },
                                            {
                                                attr: 'visible',
                                                explain: '是否可视',
                                                type: 'boolean',
                                                optionalValue: '',
                                                defaultValue: 'true'
                                            },
                                            {
                                                attr: 'disabled',
                                                explain: '是否禁用',
                                                type: 'boolean',
                                                optionalValue: '',
                                                defaultValue: 'false'
                                            },
                                            {
                                                attr: 'children',
                                                explain: '二级菜单（最多只允许有二级）',
                                                type: 'any[]',
                                                optionalValue: '',
                                                defaultValue: '',
                                                children: [
                                                    {
                                                        attr: 'code',
                                                        explain: '菜单键值',
                                                        type: 'string',
                                                        optionalValue: '',
                                                        defaultValue: ''
                                                    },
                                                    {
                                                        attr: 'name',
                                                        explain: '菜单名称',
                                                        type: 'string',
                                                        optionalValue: '',
                                                        defaultValue: ''
                                                    },
                                                    {
                                                        attr: 'prefixIcon',
                                                        explain: '前缀图标 className',
                                                        type: 'string',
                                                        optionalValue: '',
                                                        defaultValue: ''
                                                    },
                                                    {
                                                        attr: 'visible',
                                                        explain: '是否可视',
                                                        type: 'boolean',
                                                        optionalValue: '',
                                                        defaultValue: 'true'
                                                    },
                                                    {
                                                        attr: 'disabled',
                                                        explain: '是否禁用',
                                                        type: 'boolean',
                                                        optionalValue: '',
                                                        defaultValue: 'false'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                attr: 'trigger',
                                explain: '触发方式',
                                type: 'string',
                                optionalValue: 'default（默认右键表格触发）, cell（右键单元格触发）',
                                defaultValue: 'default'
                            },
                            {
                                attr: 'visibleMethod',
                                explain:
                                    '该函数的返回值用来决定是否允许显示右键菜单（对于需要对菜单进行权限控制时可能会用到）',
                                type: '({ type, options, columns, row?, rowIndex?, column?, columnIndex? }) => boolean',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                attr: 'className',
                                explain: '菜单面板的 className',
                                type: 'string',
                                optionalValue: '',
                                defaultValue: ''
                            }
                        ]
                    },
                    {
                        id: 42,
                        attr: 'mouseConfig',
                        explain: '鼠标配置项',
                        type: 'any',
                        optionalValue: '',
                        defaultValue: '',
                        children: [
                            {
                                attr: 'selected',
                                explain: '开启单元格选中功能（只对 edit-config.mode=cell 有效）',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'false'
                            }
                            // {
                            // 	attr:"area",
                            // 	explain:"如果功能被支持，则开启鼠标左键单元格区域选取功能，非连续的区域，同时按住 鼠标左键 + Ctrl 键，用鼠标逐一选取",
                            // 	type:"boolean",
                            // 	optionalValue:"",
                            // 	defaultValue:"false",
                            // },
                            // {
                            // 	attr:"extension",
                            // 	explain:"只对 area 启用后有效，是否开启区域扩展选取功能，开启后可以通过鼠标左键按住区域内右下角扩展按钮，将区域横向或纵向扩大（支持扩大区域并复制值）",
                            // 	type:"boolean",
                            // 	optionalValue:"",
                            // 	defaultValue:"true",
                            // },
                        ]
                    },
                    {
                        id: 43,
                        attr: 'editConfig',
                        explain: '可编辑配置项',
                        type: 'any',
                        optionalValue: '',
                        defaultValue: '',
                        children: [
                            {
                                attr: 'trigger',
                                explain: '触发方式',
                                type: 'string',
                                optionalValue:
                                    'manual（手动触发方式，只能用于 mode=row）,click（点击触发编辑）,dblclick（双击触发编辑）',
                                defaultValue: 'click'
                            },
                            {
                                attr: 'enabled',
                                explain: '是否启用',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'true'
                            },
                            {
                                attr: 'mode',
                                explain: '编辑模式',
                                type: 'string',
                                optionalValue: 'cell（单元格编辑模式）,row（行编辑模式）',
                                defaultValue: 'cell'
                            },
                            {
                                attr: 'showIcon',
                                explain: '是否显示列头编辑图标',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'true'
                            },
                            {
                                attr: 'showStatus',
                                explain: '只对 keep-source 开启有效，是否显示单元格新增与修改状态',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'true'
                            },
                            {
                                attr: 'showUpdateStatus',
                                explain: '只对 keep-source 开启有效，是否显示单元格修改状态',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'true'
                            },
                            {
                                attr: 'showInsertStatus',
                                explain: '只对 keep-source 开启有效，是否显示单元格新增状态',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'true'
                            },
                            {
                                attr: 'showAsterisk',
                                explain: '是否显示必填字段的红色星号',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'true'
                            },
                            {
                                attr: 'autoClear',
                                explain: '当点击非编辑列之后，是否自动清除单元格的激活状态',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'true'
                            },
                            {
                                attr: 'beforeEditMethod',
                                explain: '该方法的返回值用来决定该单元格是否允许编辑',
                                type: '({ row, rowIndex, column, columnIndex }) => boolean',
                                optionalValue: '',
                                defaultValue: ''
                            },
                            {
                                attr: 'icon',
                                explain: '自定义可编辑列的状态图标',
                                type: 'string',
                                optionalValue: '',
                                defaultValue: ''
                            }
                        ]
                    },
                    {
                        id: 44,
                        attr: 'validConfig',
                        explain: '校验配置项',
                        type: 'any',
                        optionalValue: '',
                        defaultValue: '',
                        children: [
                            {
                                attr: 'autoPos',
                                explain: '是否自动定位到校验不通过的单元格',
                                type: 'bolean',
                                optionalValue: '',
                                defaultValue: 'true'
                            },
                            {
                                attr: 'showMessage',
                                explain: '是否显示错误显示',
                                type: 'bolean',
                                optionalValue: '',
                                defaultValue: 'true'
                            }
                        ]
                    },
                    {
                        id: 45,
                        attr: 'customConfig',
                        explain: '自定义列配置项',
                        type: 'any',
                        optionalValue: '',
                        defaultValue: '',
                        children: [
                            {
                                attr: 'storage',
                                explain: '是否启用 localStorage 本地保存，会将列操作状态保留在本地（需要有 id）',
                                type: 'any',
                                optionalValue: '',
                                defaultValue: '',
                                children: [
                                    {
                                        attr: 'visible',
                                        explain: '启用显示/隐藏列状态',
                                        type: 'boolean',
                                        optionalValue: '',
                                        defaultValue: ''
                                    },
                                    {
                                        attr: 'resizable',
                                        explain: '启用列宽状态',
                                        type: 'boolean',
                                        optionalValue: '',
                                        defaultValue: ''
                                    }
                                ]
                            },
                            {
                                attr: 'checkMethod',
                                explain:
                                    '自定义列是否允许列选中的方法，该方法的返回值用来决定这一列的 checkbox 是否可以选中',
                                type: '({ column }) => boolean',
                                optionalValue: '',
                                defaultValue: ''
                            }
                        ]
                    },
                    {
                        id: 46,
                        attr: 'scrollX',
                        explain: '横向虚拟滚动配置（不支持展开行）',
                        type: 'any',
                        optionalValue: '',
                        defaultValue: '',
                        children: [
                            {
                                attr: 'enabled',
                                explain: '是否启用',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'true'
                            },
                            {
                                attr: 'gt',
                                explain:
                                    '指定大于指定列时自动启动横向虚拟滚动，如果为 0 则总是启用；如果需要关闭，可以设置 enabled 为 false（注：启用横向虚拟滚动之后将不能支持分组表头）',
                                type: 'number',
                                optionalValue: '',
                                defaultValue: '60'
                            },
                            {
                                attr: 'oSize',
                                explain:
                                    '指定每次渲染的数据偏移量，偏移量越大渲染次数就越少，但每次渲染耗时就越久（对于低性能浏览器可以设置大一点，减低渲染次数）',
                                type: 'number',
                                optionalValue: '',
                                defaultValue: '0'
                            },
                            {
                                attr: 'scrollToLeftOnChange',
                                explain: '当数据源被更改时，自动将横向滚动条滚动到左侧',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'false'
                            }
                        ]
                    },
                    {
                        id: 47,
                        attr: 'scrollY',
                        explain: '纵向虚拟滚动配置（不支持展开行）',
                        type: 'any',
                        optionalValue: '',
                        defaultValue: '',
                        children: [
                            {
                                attr: 'enabled',
                                explain: '是否启用',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'true'
                            },
                            {
                                attr: 'mode',
                                explain: '滚动模式',
                                type: 'string',
                                optionalValue: 'default,wheel',
                                defaultValue: 'default'
                            },
                            {
                                attr: 'gt',
                                explain:
                                    '指定大于指定行时自动启动纵向虚拟滚动，如果为 0 则总是启用；如果需要关闭，可以设置 enabled 为 false（注：启用纵向虚拟滚动之后将不能支持动态行高）',
                                type: 'number',
                                optionalValue: '',
                                defaultValue: '100'
                            },
                            {
                                attr: 'oSize',
                                explain:
                                    '指定每次渲染的数据偏移量，偏移量越大渲染次数就越少，但每次渲染耗时就越久（对于低性能浏览器可以设置大一点，减低渲染次数）',
                                type: 'number',
                                optionalValue: '',
                                defaultValue: '0'
                            },
                            {
                                attr: 'scrollToTopOnChange',
                                explain: '当数据源被更改时，自动将纵向滚动条滚动到顶部',
                                type: 'boolean',
                                optionalValue: '',
                                defaultValue: 'false'
                            }
                        ]
                    },
                    {
                        id: 48,
                        attr: 'params',
                        explain: '自定义参数（可以用来存放一些自定义的数据）',
                        type: 'any',
                        optionalValue: '',
                        defaultValue: ''
                    },
                    {
                        id: 49,
                        attr: 'rowClassName',
                        explain: '给行附加 className',
                        type: 'string | (({ row, rowIndex, $rowIndex }) => any)',
                        optionalValue: '',
                        defaultValue: ''
                    },
                    {
                        id: 50,
                        attr: 'cellClassName',
                        explain: '给单元格附加 className',
                        type: 'string | (({ row, rowIndex, $rowIndex, column, columnIndex, $columnIndex }) => any)',
                        optionalValue: '',
                        defaultValue: ''
                    },
                    {
                        id: 51,
                        attr: 'headerRowClassName',
                        explain: '给表头的行附加 className',
                        type: 'string | (({ $rowIndex }) => any)',
                        optionalValue: '',
                        defaultValue: ''
                    },
                    {
                        id: 52,
                        attr: 'headerCellClassName',
                        explain: '给表头的单元格附加 className',
                        type: 'string | (({ $rowIndex, column, columnIndex, $columnIndex }) => any)',
                        optionalValue: '',
                        defaultValue: ''
                    },
                    {
                        id: 53,
                        attr: 'footerRowClassName',
                        explain: '给表尾的行附加 className',
                        type: 'string | (({ $rowIndex }) => any)',
                        optionalValue: '',
                        defaultValue: ''
                    },
                    {
                        id: 54,
                        attr: 'footerCellClassName',
                        explain: '给表尾的单元格附加 className',
                        type: 'string | (({ $rowIndex, column, columnIndex, $columnIndex }) => any)',
                        optionalValue: '',
                        defaultValue: ''
                    },
                    {
                        id: 55,
                        attr: 'mergeCells',
                        explain: '临时合并指定的单元格 (不能用于展开行，不建议用于固定列、树形结构)',
                        type: 'Array<{ row: number, col: number, rowspan: number, colspan: number }>',
                        optionalValue: '',
                        defaultValue: ''
                    },
                    {
                        id: 56,
                        attr: 'mergeFooterItems',
                        explain: '临时合并表尾 (不能用于展开行，不建议用于固定列、树形结构',
                        type: 'Array<{ row: number, col: number, rowspan: number, colspan: number }>',
                        optionalValue: '',
                        defaultValue: ''
                    },
                    {
                        id: 57,
                        attr: 'pageConfig',
                        explain:
                            '分页配置，false为隐藏分页。分页使用element-plus组件库的分页进行的二次封装，如果看以下说明文档不理解，可进入element-plus官网进行详细了解。',
                        type: 'false | object',
                        optionalValue: '',
                        defaultValue: '',
                        children: [
                            {
                                attr: 'customStyle',
                                explain: '自定义样式',
                                type: 'string',
                                optionalValue: 'circular圆形 | square方形 | default默认（无形状）',
                                defaultValue: ''
                            },
                            {
                                attr: 'background',
                                explain: '是否显示背景色',
                                type: 'boolean',
                                optionalValue: 'true | false',
                                defaultValue: 'true'
                            },
                            {
                                attr: 'layout',
                                explain: '组件布局，子组件名用逗号分隔',
                                type: 'string',
                                optionalValue: 'sizes / prev / pager / next / jumper / -> / total / slot',
                                defaultValue: 'prev, pager, next,sizes'
                            },
                            {
                                attr: 'currentPage',
                                explain: '当前页数',
                                type: 'number',
                                optionalValue: '',
                                defaultValue: '1'
                            },
                            {
                                attr: 'pageSize',
                                explain: '每页显示条目个数',
                                type: 'number',
                                optionalValue: '',
                                defaultValue: '10'
                            },
                            {
                                attr: 'total',
                                explain: '总条目数',
                                type: 'number',
                                optionalValue: '',
                                defaultValue: '10'
                            },
                            {
                                attr: 'pageSizeOpts',
                                explain: '每页显示个数选择器的选项设置',
                                type: 'number[]',
                                optionalValue: '',
                                defaultValue: '[5,10, 20, 30, 40, 1000]'
                            },
                            {
                                attr: 'hideOnSinglePage',
                                explain: '只有一页时是否隐藏分页',
                                type: 'boolean',
                                optionalValue: 'true | false',
                                defaultValue: 'false'
                            }
                        ]
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
                explain:
                    '单选模式和多选模式，双向绑定选中值,传入什么格式，则返回什么格式。如传入数组对象格式，则返回的数据也是数组对象。',
                type: 'array,string'
            }
        ]
    });

    //y9VxeTable事件说明表
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
                explain: '单选或多选模式下，选择值改变时触发',
                callBack: 'selectIds,selectedData'
            },
            {
                name: 'on-curr-page-change',
                explain: '当前页改变时触发',
                callBack: 'currPage'
            },
            {
                name: 'on-page-size-change',
                explain: '每页条数改变时触发',
                callBack: 'pageSize'
            }
        ]
    });

    //给有子级数据都加上id
    function onDiGui(data, topId) {
        data.forEach((item, index) => {
            item.id = topId + '_' + index;
            if (item.children && item.children.length > 0) {
                onDiGui(item.children, item.id);
            }
        });
    }

    onMounted(() => {
        attrTableConfig.value.tableData[0].children.forEach((item) => {
            if (item.children && item.children.length > 0) {
                onDiGui(item.children, item.id); //给有子级数据都加上id
            }
        });
    });

    function getEditUpdateData() {
        console.log('获取已修改的数据', editTableRef.value.vxeTableRef.getRecordset());
    }

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
                attr: 'vxeTableRef',
                explain: 'vxe-table表格实例，具体请查看vxe-table官网',
                type: 'Object'
            },
            {
                attr: 'vxeTableFilterRef',
                explain: '过滤实例，具体请查看y9Filter组件',
                type: 'Object'
            },
            {
                attr: 'vxeTablePaginationRef',
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
	 <y9VxeTable :config="basicTableConfig"></y9VxeTable>
</template>
<script lang="ts" setup>
	let basicTableConfig = ref({
		pageConfig:false,
		columns:[
			  {
				title:"姓名",
				key:"name",
			  },
			  {
				title:"性别",
				key:"sex",
			  },
		],
		tableData:[
			  {
				id:1,
				name:"小红1",
				sex:"女"
			  },
			  {
				id:2,
				name:"小红2",
				sex:"女",
			  },
			  {
				id:3,
				name:"小红3",
				sex:"女"
			  },
		],
		
	})
<\/script>
		`;
        } else if (type == 'haveFiltersAndPage') {
            codeDialogConfig.value.codeText = `
<template>
	<y9VxeTable :config="tableConfig" :filterConfig="filterConfig"></y9VxeTable>
</template>
<script lang="ts" setup>
	let tableConfig = ref({
		headerBackground: true,
		border:false,
		columns:[
			  {
				type:"checkbox",
				width:60,
			  },
			  {
				title:"姓名",
				key:"name",
			  },
			  {
				title:"性别",
				key:"sex",
			  },
		],
		tableData:[
			  {
				id:1,
				name:"小红1",
				sex:"女"
			  },
			  {
				id:2,
				name:"小红2",
				sex:"女",
			  },
			  {
				id:3,
				name:"小红3",
				sex:"女"
			  },
		],
		
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
        } else if (type == 'radioTable1') {
            codeDialogConfig.value.codeText = `
<template>
	当前选中值：{{selectedRadioVal}}
	<y9VxeTable v-model:selectedVal="selectedRadioVal" :config="y9VxeTableRadioConfig">
	</y9VxeTable>
</template>
<script lang="ts" setup>
	let y9VxeTableRadioConfig  = ref({
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
					return h('span',{
						style:{
							color:"var(--el-color-primary)"
						}
					}, '详情')
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
	
	let selectedRadioVal = ref(1);
<\/script>
		`;
        } else if (type == 'radioTable2') {
            codeDialogConfig.value.codeText = `
<template>
	当前选中值：{{selectedRadioVal1}}
	<y9VxeTable v-model:selectedVal="selectedRadioVal1" :config="y9VxeTableRadioConfig">
	</y9VxeTable>
</template>
<script lang="ts" setup>
	let y9VxeTableRadioConfig  = ref({
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
					return h('span',{
						style:{
							color:"var(--el-color-primary)"
						}
					},  '详情')
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
	
	let selectedRadioVal1 = ref([1]);
	
<\/script>
		`;
        } else if (type == 'radioTable3') {
            codeDialogConfig.value.codeText = `
<template>
	当前选中值：{{selectedRadioVal2}}
	<y9VxeTable v-model:selectedVal="selectedRadioVal2" :config="y9VxeTableRadioConfig">
	</y9VxeTable>
</template>
<script lang="ts" setup>
	let y9VxeTableRadioConfig  = ref({
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
					return h('span',{
						style:{
							color:"var(--el-color-primary)"
						}
					},  '详情')
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
	
	let selectedRadioVal2 = ref([{
			  id:1
	}])
<\/script>
		`;
        } else if (type == 'multipleTable1') {
            codeDialogConfig.value.codeText = `
<template>
	当前选中值：{{selectedCheckboxVal}}
	<y9VxeTable v-model:selectedVal="selectedCheckboxVal" :config="y9VxeTableCheckboxConfig">
	</y9VxeTable>
</template>
<script lang="ts" setup>
	  let y9VxeTableCheckboxConfig = ref({
	  	headerBackground: true,
	  	border:false,
	  	columns: [{
	  			type: "checkbox",
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
	  				return h('span', {
						style:{
							color:"var(--el-color-primary)"
						}
					}, '详情')
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
	  		{
	  			name: "小白",
	  			sex: "男",
	  			department: "技术部",
	  			id:3,
	  		},
	  	]
	  })
	  
	  let selectedCheckboxVal = ref([1,2]);
<\/script>
		`;
        } else if (type == 'multipleTable2') {
            codeDialogConfig.value.codeText = `
<template>
	当前选中值：{{selectedCheckboxVal2}}
	<y9VxeTable v-model:selectedVal="selectedCheckboxVal2" :config="y9VxeTableCheckboxConfig">
	</y9VxeTable>
</template>
<script lang="ts" setup>
	 let y9VxeTableCheckboxConfig = ref({
	 	headerBackground: true,
	 	border:false,
	 	columns: [{
	 			type: "checkbox",
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
	 				return h('span', {
						style:{
							color:"var(--el-color-primary)"
						}
					}, '详情')
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
	 		{
	 			name: "小白",
	 			sex: "男",
	 			department: "技术部",
	 			id:3,
	 		},
	 	]
	 })
	 
	 let selectedCheckboxVal2 = ref([{
	 		   id:2
	 }])
<\/script>
		`;
        } else if (type == 'colgroupTable') {
            codeDialogConfig.value.codeText = `
<template>
	 <y9VxeTable :config="colgroupTableConfig"></y9VxeTable>
</template>
<script lang="ts" setup>
	let colgroupTableConfig = ref({
	  headerBackground: true,
	  pageConfig:false,
	  columns:[
				  {
					title:"姓名",
					children:[
						{
							title:"中文名",
							children:[
								{
									title:"繁体",
									key:"names.ftname",
								},
								{
									title:"简体",
									key:"names.jtname",
									
								},
							]
						},
						{
							title:"英文名",
							key:"names.enname",
							
						},
					]
				  },
				  {
					title:"性别",
					key:"sex",
				  },
	  ],
	  tableData:[
				  {
					id:1,
					name:"小红1",
					sex:"女",
					names:{
						jtname:"小红",
						ftname:"小紅",
						enname:"Xiaohong"
					}
				  },
				  {
					id:2,
					name:"小红2",
					sex:"女",
				  },
				  {
					id:3,
					name:"小红3",
					sex:"女"
				  },
	  ],
	})
<\/script>
		`;
        } else if (type == 'editTable') {
            codeDialogConfig.value.codeText = `
<template>
	<y9VxeTable ref="editTableRef" :config="editTableConfig" >
			  <template #paginationExtend>
				    <el-button style="margin-left: 10px;"  class="global-btn-second" @click="getEditUpdateData">获取已修改的数据</el-button>
			  </template>
	</y9VxeTable>
</template>
<script lang="ts" setup>
	  let editTableRef = ref();
	  let editTableConfig = ref({
	  	headerBackground: true,
	  	editConfig:{
	  		  trigger:'click',
	  		  enabled:true,
	  		  mode:"cell",
	  	},
	  	keepSource:true,
	  	columns:[
	  	  {
	  		title:"element 输入框",
	  		key:"elementName",
	  			editRender:{
	  				name:"input",
	  				useElement:true,
	  			},
	  			
	  	  },
	  	  {
	  		title:"element 选择框",
	  		key:"elementSex",
	  			editRender:{
	  				name:"select",
	  				useElement:true,
	  				options:[
	  					{
	  						value:"male",
	  						label:"男"
	  					},
	  					{
	  						value:"female",
	  						label:"女"
	  					}
	  				]
	  			},
	  	  },
	  		  {
	  			title:"element 日期选择器",
	  			key:"elementBirthday",
	  				editRender:{
	  					name:"date",
	  					dateType:"date",
	  					useElement:true,
	  				},			
	  		  },
	  		  {
	  			title:"vxe 输入框",
	  			key:"vxeName",
	  				editRender:{
	  					name:"input",
	  				},
	  		  },
	  		  {
	  			title:"vxe 选择框",
	  			key:"vxeSex",
	  			editRender:{
	  				name:"select",
	  				options:[
	  					{
	  						value:"male",
	  						label:"男"
	  					},
	  					{
	  						value:"female",
	  						label:"女"
	  					}
	  				]
	  			},
	  		  },
	  		
	  	],
	  	tableData:[
	  	  {
	  		id:1,
	  		elementName:"小红element1",
	  		elementSex:"女",
	  			elementBirthday:"",
	  			vxeName:"小红vxe1",
	  			vxeSex:"男"
	  	  },
	  		  {
	  			id:2,
	  			elementName:"小红element2",
	  			elementSex:"",
	  			elementBirthday:"2022-06-01",
	  			vxeName:"小红vxe2",
	  			vxeSex:""
	  		  },
	  	],
	  	
	  })
	  function getEditUpdateData(){
	  
	  	console.log("获取已修改的数据",editTableRef.value.vxeTableRef.getRecordset())
	  }
<\/script>
		`;
        } else if (type == 'virtualTable') {
            codeDialogConfig.value.codeText = `
<template>
	<y9VxeTable v-model:selectedVal="virtualTableRadioVal"  :config="virtualTableConfig">
	</y9VxeTable>
</template>
<script lang="ts" setup>
	  //虚拟表格 配置
	  let virtualTableConfig = ref({
	  	scrollY:{//竖向滚动配置
	  		enabled:true,//开启虚拟滚动
	  		gt: 0,//指定大于指定行时自动启动纵向虚拟滚动，如果为 0 则总是启用；
	  	},
	  	treeConfig: { 
	  		transform: true,//自动将列表转为树结构（支持虚拟滚动）
	  	},
	  	defaultExpandAll:false,
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
	  			treeNode:true,//树节点
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
	  	tableData: []
	  	
	  })
	  //虚拟表格 当前单选值
	  let virtualTableRadioVal = ref("2");
	  
	  //模拟大数据
	  let data  = []
	  for(let i = 1 ; i < 1000; i++){
	  	data.push({
	  		name: "一级数据 "+i,
	  		sex: i%2 == 0 ? "男" : "女",
	  		department: "技术部",
	  		id: i+"",
	  		children:[
	  			{
	  				id: i+ "-1",
	  				name: "子级数据 " + i + "-1",
	  				sex: "男",
	  				department: "销售部",
	  				
	  			},
	  			{
	  				id: i + "-2",
	  				name: "子级数据 " + i + "-2",
	  				sex: "男",
	  				department: "销售部",
	  			},
	  		]
	  	})
	  }
	  
	  data.forEach(item => {
	  	virtualTableConfig.value.tableData.push({
	  		id: item.id,
	  		name: item.name,
	  		sex: item.sex,
	  		department: item.department,
	  		parentId:"",
	  	})
	  	item.children.forEach(child => {
	  		virtualTableConfig.value.tableData.push(Object.assign(child,{
	  			parentId:item.id
	  		}))
	  	})
	  	
	  })
<\/script>
		`;
        } else if (type == 'merge-cells-column') {
            codeDialogConfig.value.codeText = `
<template>
	 <y9VxeTable :config="y9VxeTableMergeCellsColumnConfig"></y9VxeTable>
</template>
<script lang="ts" setup>
	//合并列表格
	const y9VxeTableMergeCellsColumnConfig  = ref({
		headerBackground: true,
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
				width:300,
				render: (row) => {
					return h('span', '详情')
				}
			},
		],
		tableData: [],
		pageConfig:false,
		mergeCells:[]//合并单元格
	})
	
	//模拟数据
	for(let i = 1; i <= 100; i++){
		 y9VxeTableMergeCellsColumnConfig.value.tableData.push({
			 id: i,
			 name: "小白" + i,
			 sex: "男",
			 department: "技术部",
		 })
	}
	//设置合并参数
	let mergeCells = []
	y9VxeTableMergeCellsColumnConfig.value.tableData.forEach((item,index) => {
		if(index % 2 === 0) {
			mergeCells.push({ row: index , col: 0, rowspan: 2, colspan: 1 })
		}
	})
	y9VxeTableMergeCellsColumnConfig.value.mergeCells = mergeCells;
<\/script>
		`;
        } else if (type == 'merge-cells-row') {
            codeDialogConfig.value.codeText = `
<template>
	<y9VxeTable :config="y9VxeTableMergeCellsRowConfig"></y9VxeTable>
</template>
<script lang="ts" setup>
	//合并行表格
	const y9VxeTableMergeCellsRowConfig  = ref({
		headerBackground: true,
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
				width:300,
				render: (row) => {
					return h('span', '详情')
				}
			},
		],
		tableData: [],
		pageConfig:false,
		mergeCells:[]//合并单元格
	})
	//模拟数据
	for(let i = 1; i <= 100; i++){
		 y9VxeTableMergeCellsRowConfig.value.tableData.push({
			 id: i,
			 name: "小白" + i,
			 sex: "男",
			 department: "技术部",
		 })
	}
	//设置合并参数
	let mergeCells = []
	y9VxeTableMergeCellsRowConfig.value.tableData.forEach((item,index) => {
		mergeCells.push({ row: index , col: 0, rowspan: 1, colspan: 2 })
	})
	y9VxeTableMergeCellsRowConfig.value.mergeCells = mergeCells
<\/script>
		`;
        }
    }
</script>

<style lang="scss" scoped></style>
