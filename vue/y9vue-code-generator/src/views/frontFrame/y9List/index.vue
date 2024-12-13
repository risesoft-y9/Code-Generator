<template>
    <div class="y9-title">
        基础列表，使用config配置传入
        <el-button
            :size="fontSizeObj.buttonSize"
            :style="{ fontSize: fontSizeObj.baseFontSize }"
            class="global-btn-second"
            style="margin-left: 10px"
            @click="y9ListRef.removeHighlight()"
            >去除高亮
        </el-button>
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
    <y9List ref="y9ListRef" :config="y9ListConfig"></y9List>

    <div class="y9-title">
        使用listData属性传入
        <el-button
            :size="fontSizeObj.buttonSize"
            :style="{ fontSize: fontSizeObj.baseFontSize }"
            class="global-btn-main"
            style="margin-left: 10px"
            type="primary"
            @click="onShowCode('base_listData')"
            >查看代码
        </el-button>
    </div>
    <y9List :listData="listData"></y9List>

    <div class="y9-title">
        自定义列表内容
        <el-button
            :size="fontSizeObj.buttonSize"
            :style="{ fontSize: fontSizeObj.baseFontSize }"
            class="global-btn-main"
            style="margin-left: 10px"
            type="primary"
            @click="onShowCode('haveIcon')"
            >查看代码
        </el-button>
    </div>
    <y9List :config="y9ListConfig">
        <template #default="{ item }">
            <i class="ri-user-line" style="margin-right: 10px"></i>
            <span>{{ item.name }}</span>
        </template>
    </y9List>

    <div class="y9-title">
        有过滤条件和分页的单选列表
        <el-button
            :size="fontSizeObj.buttonSize"
            :style="{ fontSize: fontSizeObj.baseFontSize }"
            class="global-btn-main"
            style="margin-left: 10px"
            type="primary"
            @click="onShowCode('haveFilterAndPage')"
            >查看代码
        </el-button>
    </div>
    选中的值：{{ singleVal }}
    <y9List
        v-model:selectedVal="singleVal"
        :config="filterAndPageListConfig"
        :filterConfig="filterConfig"
        selectType="radio"
    ></y9List>

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
    <y9List ref="y9ListRef" :config="filterAndPageListConfig" :cuPageMemory="true" uniqueIdent="memory"></y9List>

    <div class="y9-title">
        多选列表
        <el-button
            :size="fontSizeObj.buttonSize"
            :style="{ fontSize: fontSizeObj.baseFontSize }"
            class="global-btn-main"
            style="margin-left: 10px"
            type="primary"
            @click="onShowCode('multipleValList')"
            >查看代码
        </el-button>
    </div>
    选中的值：{{ multipleVal }}
    <y9List
        v-model:selectedVal="multipleVal"
        :config="filterAndPageListConfig"
        :filterConfig="filterConfig"
        haveAllSelected
        selectType="checkbox"
    ></y9List>

    <div class="y9-title">
        虚拟滚动列表
        <el-button
            :size="fontSizeObj.buttonSize"
            :style="{ fontSize: fontSizeObj.baseFontSize }"
            class="global-btn-main"
            style="margin-left: 10px"
            type="primary"
            @click="onShowCode('virtualScroll')"
            >查看代码
        </el-button>
    </div>
    <y9List :config="virtualScrollListConfig"></y9List>

    <div class="y9-title">y9List属性说明表</div>
    <y9Table :config="attrTableConfig"></y9Table>

    <div class="y9-title">y9List事件说明表</div>
    <y9Table :config="eventTableConfig"></y9Table>

    <div class="y9-title">y9List实例方法说明表</div>
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

    //基础列表，使用config配置传入
    let y9ListRef = ref();
    let y9ListConfig = ref({
        listData: [
            {
                id: '1',
                name: '小白'
            },
            {
                id: '2',
                name: '小红'
            }
        ]
    });

    //使用listData属性传入
    let listData = ref([
        {
            id: '1',
            name: '小白'
        },
        {
            id: '2',
            name: '小红'
        }
    ]);

    //有过滤条件和分页的列表
    let filterAndPageListConfig = ref({
        height: '200px',
        listData: [
            {
                id: '1',
                name: '小白1'
            },
            {
                id: '2',
                name: '小白2'
            },
            {
                id: '3',
                name: '小白3'
            },
            {
                id: '4',
                name: '小白4'
            },
            {
                id: '5',
                name: '小白5'
            },
            {
                id: '6',
                name: '小白6'
            },
            {
                id: '7',
                name: '小白7'
            },
            {
                id: '8',
                name: '小白8'
            }
        ],
        pageConfig: {
            // 分页配置，false隐藏分页
            customStyle: 'circular', //自定义样式，可选值有circular圆形,square方形,default默认（无形状）
            background: true, //是否显示背景色
            layout: 'prev, pager, next,sizes', //布局
            currentPage: 1, //当前页数，
            pageSize: 5, //每页显示条目个数，
            total: 8, //总条目数
            pageSizeOpts: [5, 10, 20, 30, 40, 1000] //每页显示个数选择器的选项设置
        }
    });

    let filterConfig = ref({
        //过滤配置
        showBorder: true,
        itemList: [
            {
                type: 'search',
                key: 'search',
                value: ''
            },
            {
                type: 'select',
                key: 'select',
                props: {
                    options: [
                        {
                            label: '111',
                            value: '111'
                        },
                        {
                            label: '222',
                            value: '222'
                        }
                    ]
                }
            },
            {
                type: 'actions',
                props: {
                    queryCallback: (filters) => {
                        console.log('需要查询的过滤条件', filters);
                    }
                }
            }
        ]
    });

    let singleVal = ref('2'); //单选，选中值
    let multipleVal = ref(['1', '2', '3', '4', '5', '6', '7', '8']); //多选，选中值

    //虚拟滚动列表
    let virtualScrollListConfig = ref({
        listData: [],
        virtualScrollConfig: {
            rowHeight: 43,
            rowNum: 5
        }
    });

    //y9List属性说明表
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
                explain: '列表组件配置',
                type: 'object',
                optionalValue: '',
                defaultValue: '具体配置请展开查看',
                id: 'config',
                children: [
                    {
                        attr: '* listData',
                        explain: '列表数据',
                        type: 'array',
                        optionalValue: '',
                        defaultValue: `
						举例：[{
							id:"1",
							name:"小红",
						}]
					`
                    },
                    {
                        attr: '* idKey',
                        explain: '唯一标识键名',
                        type: 'string',
                        optionalValue: '',
                        defaultValue: `id`
                    },
                    {
                        attr: 'loading',
                        explain: '组件加载状态',
                        type: 'Boolean',
                        optionalValue: 'true | false',
                        defaultValue: `false`
                    },
                    {
                        attr: 'titleKeyName',
                        explain: '标题键名',
                        type: 'string',
                        optionalValue: '',
                        defaultValue: `name`
                    },
                    {
                        attr: 'split',
                        explain: '分割线样式',
                        type: 'string',
                        optionalValue: '',
                        defaultValue: `solid 1px #eee`
                    },
                    {
                        attr: 'highlight',
                        explain: '点击是否高亮',
                        type: 'boolean',
                        optionalValue: 'true | false',
                        defaultValue: `true`
                    },
                    {
                        attr: 'noDataText',
                        explain: '无列表数据时的文本',
                        type: 'string',
                        optionalValue: '',
                        defaultValue: `暂无数据`
                    },
                    {
                        attr: 'noDataRender',
                        explain: '无列表数据时，使用渲染函数渲染',
                        type: 'function',
                        optionalValue: "举例：() => { return h('span','暂无数据')}",
                        defaultValue: ``
                    },
                    {
                        attr: 'noDataSlot',
                        explain: '插槽名称，无列表数据时，使用插槽渲染',
                        type: 'string',
                        optionalValue: '',
                        defaultValue: ``
                    },
                    {
                        attr: 'backgroundColor',
                        explain: '背景颜色',
                        type: 'string',
                        optionalValue: '',
                        defaultValue: `#fff`
                    },
                    {
                        attr: 'activeBackgroundColor',
                        explain: '选中时的背景颜色',
                        type: 'string',
                        optionalValue: '',
                        defaultValue: `var(--el-color-primary-light-4)`
                    },
                    {
                        attr: 'hoverBackgroundColor',
                        explain: '鼠标经过时的背景颜色',
                        type: 'string',
                        optionalValue: '',
                        defaultValue: `rgb(231, 236, 237)`
                    },
                    {
                        attr: 'padding',
                        explain: '内边距',
                        type: 'string',
                        optionalValue: '',
                        defaultValue: `20px`
                    },
                    {
                        attr: 'minHeight',
                        explain: '列表最小高度',
                        type: 'string',
                        optionalValue: '',
                        defaultValue: `auto`
                    },
                    {
                        attr: 'height',
                        explain: '列表高度，内容超出列表高度时，出现滚动条',
                        type: 'string',
                        optionalValue: '',
                        defaultValue: `auto`
                    },
                    {
                        attr: 'pageConfig',
                        explain: '分页配置，具体配置查看y9Pagination分页组件,隐藏分页设置false',
                        type: 'object,false',
                        optionalValue: 'object | false',
                        defaultValue: ``
                    },
                    {
                        id: 'virtualScrollConfig',
                        attr: 'virtualScrollConfig',
                        explain:
                            '虚拟滚动配置，object类型则开启虚拟滚动,开启虚拟滚动rowHeight属性必填，false则关闭虚拟滚动',
                        type: 'object，false',
                        optionalValue: 'object | false',
                        defaultValue: `false`,
                        children: [
                            {
                                id: 'virtualScrollConfig-1',
                                attr: '* rowHeight',
                                explain: '行高 必填',
                                type: 'number',
                                optionalValue: '',
                                defaultValue: ``
                            },
                            {
                                id: 'virtualScrollConfig-2',
                                attr: 'rowNum',
                                explain: '显示行数',
                                type: 'number',
                                optionalValue: '',
                                defaultValue: `10`
                            }
                        ]
                    }
                ]
            },
            {
                attr: '* listData',
                explain: '列表数据',
                type: 'array',
                optionalValue: '',
                defaultValue: 'config 和 listData 属性二选一使用'
            },
            {
                attr: 'filterConfig',
                explain: '过滤配置，具体配置查看y9Filter组件配置说明',
                type: 'object',
                optionalValue: '',
                defaultValue: ''
            },
            {
                attr: 'selectedVal/v-model',
                explain: '选中值，建议使用v-model双向绑定',
                type: 'string,number,array',
                optionalValue: '',
                defaultValue: ''
            },
            {
                attr: 'selectType',
                explain: "选择模式:'checkbox'多选,'radio'单选,显示单选框,",
                type: 'string',
                optionalValue: '',
                defaultValue: ''
            },
            {
                attr: 'haveAllSelected',
                explain: "selectType='checkbox'时，是否有全选功能",
                type: 'boolean',
                optionalValue: '',
                defaultValue: ''
            }
        ]
    });

    //y9List事件说明表
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
                name: 'on-change',
                explain: '单选或者多选模式时，选择改变时触发',
                callBack: 'id,data'
            },
            {
                name: 'check-change',
                explain: '多选模式时，选中状态发生变化时触发',
                callBack: 'id,item,checked'
            },
            {
                name: 'on-click-row',
                explain: '点击行触发',
                callBack: 'row,index'
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
                name: 'on-mouse-right-event',
                explain: '鼠标右击行触发',
                callBack: 'row,index,$event'
            }
        ]
    });

    //y9List实例方法说明表
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
                attr: 'removeHighlight',
                explain: '去除高亮',
                type: 'function'
            },
            {
                attr: 'setHighlight',
                explain: '设置高亮',
                type: 'function'
            },
            {
                attr: 'currRowValue',
                explain: '当前选中值',
                type: 'object'
            },
            {
                attr: 'setChecked',
                explain: '设置某行选中状态',
                type: 'function'
            }
        ]
    });

    onMounted(() => {
        let arr = [];

        for (let i = 0; i < 1000; i++) {
            arr.push({
                id: i + 1,
                name: '小红' + (i + 1)
            });
        }

        virtualScrollListConfig.value.listData = arr;
    });

    //查看代码
    function onShowCode(type) {
        Object.assign(codeDialogConfig.value, {
            show: true,
            type: type
        });

        if (type == 'base') {
            codeDialogConfig.value.codeText = `
<template>
	<el-button style="margin-bottom: 10px;"  class="global-btn-second"  @click="y9ListRef.removeHighlight()">去除高亮</el-button>
	<y9List ref="y9ListRef" :config="y9ListConfig"></y9List>
</template>

<script lang="ts" setup>
	let y9ListRef = ref()
	let y9ListConfig = ref({
		listData: [
			{
				id: "1",
				name: "小白"
			},
			{
				id: "2",
				name: "小红"
			},
		],
	})
<\/script>
		`;
        } else if (type == 'memory') {
            codeDialogConfig.value.codeText = `
<template>
	<div class="y9-title">
		分页具有记忆性
		<el-button style="margin-left: 10px;" type="primary"  class="global-btn-main" :size="fontSizeObj.buttonSize"
		:style="{ fontSize: fontSizeObj.baseFontSize }"
		 @click="onShowCode('memory')">查看代码</el-button>
	</div>
	<y9List ref="y9ListRef" :config="filterAndPageListConfig" uniqueIdent="memory"
                :cuPageMemory="true"></y9List>
	
</template>

<script lang="ts" setup>
	let y9ListRef = ref()
	let y9ListConfig = ref({
		listData: [
			{
				id: "1",
				name: "小白"
			},
			{
				id: "2",
				name: "小红"
			},
		],
	})
<\/script>
		`;
        } else if (type === 'base_listData') {
            codeDialogConfig.value.codeText = `
<template>
	<y9List :listData="listData"></y9List>
</template>

<script lang="ts" setup>
	let listData = ref([
		{
			id: "1",
			name: "小白"
		},
		{
			id: "2",
			name: "小红"
		},
	])
<\/script>
		`;
        } else if (type === 'haveIcon') {
            codeDialogConfig.value.codeText = `
<template>
	<y9List :config="y9ListConfig">
		<template #default="{item}">
			<i class="ri-user-line" style="margin-right: 10px;"></i>
			<span>{{item.name}}</span>
		</template>
	</y9List>
</template>

<script lang="ts" setup>
	  let y9ListConfig = ref({
	  	listData: [
	  		{
	  			id: "1",
	  			name: "小白"
	  		},
	  		{
	  			id: "2",
	  			name: "小红"
	  		},
	  	],
	  })
<\/script>
		`;
        } else if (type === 'haveFilterAndPage') {
            codeDialogConfig.value.codeText = `
<template>
	选中的值：{{singleVal}}
	<y9List v-model:selectedVal="singleVal" :config="filterAndPageListConfig" :filterConfig="filterConfig" selectType="radio"></y9List>
</template>

<script lang="ts" setup>
	 let filterAndPageListConfig = ref({
	 	height:"200px",
	 	listData:[
	 		{
	 			id: "1",
	 			name: "小白1"
	 		},
	 		{
	 			id: "2",
	 			name: "小白2"
	 		},
	 		{
	 			id: "3",
	 			name: "小白3"
	 		},
	 		{
	 			id: "4",
	 			name: "小白4"
	 		},
	 		{
	 			id: "5",
	 			name: "小白5"
	 		},
	 		{
	 			id: "6",
	 			name: "小白6"
	 		},
	 		{
	 			id: "7",
	 			name: "小白7"
	 		},
	 		{
	 			id: "8",
	 			name: "小白8"
	 		},
	 	],
	 	pageConfig: { // 分页配置，false隐藏分页
	 		customStyle:"circular",//自定义样式，可选值有circular圆形,square方形,default默认（无形状）
	 		background:true,//是否显示背景色
	 		layout:"prev, pager, next,sizes",//布局
	 		currentPage: 1,//当前页数，
	 		pageSize: 5,//每页显示条目个数，
	 		total: 8,//总条目数
	 		pageSizeOpts: [5, 10, 20, 30, 40, 1000],//每页显示个数选择器的选项设置
	 	},
	 })
	 
	 let filterConfig = ref({//过滤配置
	 	showBorder:true,
	 	itemList:[
	 		{
	 			type:"search",
	 			key:"search",
	 			value:"",
	 		},
	 		{
	 			type:"select",
	 			key:"select",
	 			props:{
	 				options:[
	 					{
	 						label:"111",
	 						value:"111"
	 					},
	 					{
	 						label:"222",
	 						value:"222"
	 					},
	 				]
	 			}
	 		},
	 		{
	 			type:"actions",
	 			props:{
	 				queryCallback:(filters) => {
	 					console.log("需要查询的过滤条件",filters)
	 				}
	 			}
	 			
	 		}
	 	],
	 })
	 
	 let singleVal = ref("2")//单选，选中值
<\/script>
		`;
        } else if (type === 'multipleValList') {
            codeDialogConfig.value.codeText = `
<template>
	选中的值：{{multipleVal}}
	<y9List v-model:selectedVal="multipleVal" :config="filterAndPageListConfig" :filterConfig="filterConfig" selectType="checkbox" haveAllSelected></y9List>
</template>

<script lang="ts" setup>
	 let filterAndPageListConfig = ref({
	 	height:"200px",
	 	listData:[
	 		{
	 			id: "1",
	 			name: "小白1"
	 		},
	 		{
	 			id: "2",
	 			name: "小白2"
	 		},
	 		{
	 			id: "3",
	 			name: "小白3"
	 		},
	 		{
	 			id: "4",
	 			name: "小白4"
	 		},
	 		{
	 			id: "5",
	 			name: "小白5"
	 		},
	 		{
	 			id: "6",
	 			name: "小白6"
	 		},
	 		{
	 			id: "7",
	 			name: "小白7"
	 		},
	 		{
	 			id: "8",
	 			name: "小白8"
	 		},
	 	],
	 	pageConfig: { // 分页配置，false隐藏分页
	 		customStyle:"circular",//自定义样式，可选值有circular圆形,square方形,default默认（无形状）
	 		background:true,//是否显示背景色
	 		layout:"prev, pager, next,sizes",//布局
	 		currentPage: 1,//当前页数，
	 		pageSize: 5,//每页显示条目个数，
	 		total: 8,//总条目数
	 		pageSizeOpts: [5, 10, 20, 30, 40, 1000],//每页显示个数选择器的选项设置
	 	},
	 })
	 
	 let filterConfig = ref({//过滤配置
	 	showBorder:true,
	 	itemList:[
	 		{
	 			type:"search",
	 			key:"search",
	 			value:"",
	 		},
	 		{
	 			type:"select",
	 			key:"select",
	 			props:{
	 				options:[
	 					{
	 						label:"111",
	 						value:"111"
	 					},
	 					{
	 						label:"222",
	 						value:"222"
	 					},
	 				]
	 			}
	 		},
	 		{
	 			type:"actions",
	 			props:{
	 				queryCallback:(filters) => {
	 					console.log("需要查询的过滤条件",filters)
	 				}
	 			}
	 			
	 		}
	 	],
	 })
	 
	 let multipleVal = ref(["1","2","3","4","5","6","7","8"])//多选，选中值
<\/script>
		`;
        } else if (type === 'virtualScroll') {
            codeDialogConfig.value.codeText = `
<template>
	<y9List :config="virtualScrollListConfig"></y9List>
</template>

<script lang="ts" setup>
	  let virtualScrollListConfig = ref({
	  	listData:[],
	  	virtualScrollConfig:{
	  		rowHeight:43,
	  		rowNum:5,
	  	},
	  })
	  
	  onMounted(()=>{
	  	let arr = []
	  	
	  	for(let i =0; i<10000;i++){
	  		arr.push({
	  			id:i+1,
	  			name:'小红'+(i+1)
	  		})
	  	}
	  	
	  	virtualScrollListConfig.value.listData = arr;
	  })
<\/script>
		`;
        }
    }
</script>

<style lang="scss" scoped></style>
