<template>
    <div class="y9-title">
        默认分页
        <el-button
            :size="fontSizeObj.buttonSize"
            :style="{ fontSize: fontSizeObj.baseFontSize }"
            class="global-btn-main"
            style="margin-left: 10px"
            type="primary"
            @click="onShowCode('default')"
            >查看代码
        </el-button>
    </div>
    <div style="background-color: #fff; padding: 20px">
        <y9Pagination :config="y9PaginationConfig"></y9Pagination>
    </div>

    <div class="y9-title">
        每页显示条目个数据有记忆性
        <el-button
            :size="fontSizeObj.buttonSize"
            :style="{ fontSize: fontSizeObj.baseFontSize }"
            class="global-btn-main"
            style="margin-left: 10px"
            type="primary"
            @click="onShowCode('uniqueId')"
            >查看代码
        </el-button>
    </div>
    <div style="background-color: #fff; padding: 20px">
        <y9Pagination :config="y9PaginationConfigTwo" uniqueIdent="two"></y9Pagination>
    </div>

    <div class="y9-title">
        每页显示条目个数，当前分页据有记忆性
        <el-button
            :size="fontSizeObj.buttonSize"
            :style="{ fontSize: fontSizeObj.baseFontSize }"
            class="global-btn-main"
            style="margin-left: 10px"
            type="primary"
            @click="onShowCode('pageMemory')"
            >查看代码
        </el-button>
    </div>
    <div style="background-color: #fff; padding: 20px">
        <y9Pagination :config="y9PaginationConfigThree" :cuPageMemory="true" uniqueIdent="three"></y9Pagination>
    </div>

    <div>
        <div style="margin: 40px 0 20px; font-size: 18px">分页组件当前分页和每页条目个数具有记忆性的使用步骤</div>
        <div style="min-height: 800px">
            <el-steps direction="vertical">
                <el-step title="更新插件的版本（v2.7.1）">
                    <template #description>
                        <p>npm install y9plugin-components</p>
                    </template>
                </el-step>
                <el-step title="在utils/index.ts文件中添加赋值方法">
                    <template #description>
                        <div>
                            <h4 style="color: var(--el-text-color-primary)">①.仅每页条目个数具有记忆性</h4>
                            <pre>
    import y9_storage from '@/utils/storage'; 
    //分页组件，设置记忆性的时候，设置的分页对象的值与存储的值对应 
    export function getStoragePageSize(uniqueId, defaultNum) { 
        let uniquePageSize = y9_storage.getObjectItem('uniquePageSize', uniqueId); 
        if (uniquePageSize) { 
            return uniquePageSize; 
        } else { 
            return defaultNum; 
        } 
    }
                        </pre
                            >
                        </div>
                        <div>
                            <h4 style="color: var(--el-text-color-primary)">②.当前页数与每页条目个数都具有记忆性</h4>
                            <pre>
    import y9_storage from '@/utils/storage'; 
    //分页组件，设置记忆性的时候，设置的分页对象的值与存储的值对应 
    export function getStoragePageSize(uniqueId, defaultNum) { 
        let uniquePageSize = y9_storage.getObjectItem('uniquePageSize', uniqueId); 
        if (uniquePageSize) { 
            return uniquePageSize; 
        } else { 
            return defaultNum; 
        } 
    } 
    //分页组件，设置记忆性的时候，设置的分页对象的值与存储的值对应 
    export function getStorageCurrPage(uniqueId, defaultNum) { 
        let uniqueCurrPage = y9_storage.getObjectItem('uniqueCurrPage', uniqueId); 
        if (uniqueCurrPage) { 
            return uniqueCurrPage; 
        } else { 
            return defaultNum; 
        } 
    }
                        </pre
                            >
                        </div>
                    </template>
                </el-step>
                <el-step title="给组件内部传值">
                    <template #description>
                        <div>
                            <h4 style="color: var(--el-text-color-primary)"
                                >1.html部分代码(三个组件涉及到的分页情况如下)</h4
                            >
                            <div>
                                <h5 style="color: var(--el-text-color-primary)">①.仅每页条目个数具有记忆性</h5>
                                <pre> 
    {{
                                        `
                                    <y9Pagination ... :uniqueIdent="唯一的id值"></y9Pagination>` }}
    {{
                                        `
                                    <y9Table ... :uniqueIdent="唯一的id值"></y9Table>` }}
    {{
                                        `
                                    <y9List ... :uniqueIdent="唯一的id值"></y9List>` }}
                                </pre>
                            </div>
                            <div>
                                <h5 style="color: var(--el-text-color-primary)"
                                    >②.当前页数与每页条目个数都具有记忆性</h5
                                >
                                <pre> 
    {{
                                        `
                                    <y9Pagination ... :cuPageMemory="true" :uniqueIdent="唯一的id值"></y9Pagination>` }}
    {{
                                        `
                                    <y9Table ... :cuPageMemory="true" :uniqueIdent="唯一的id值"></y9Table>` }}
    {{
                                        `
                                    <y9List ... :cuPageMemory="true" :uniqueIdent="唯一的id值"></y9List>` }}
                                </pre>
                            </div>
                        </div>

                        <div>
                            <h4 style="color: var(--el-text-color-primary)"
                                >2.js部分代码(三个组件中修改对应的分页参数即可)</h4
                            >
                            <div>
                                <h5 style="color: var(--el-text-color-primary)">①.仅每页条目个数具有记忆性</h5>
                                <pre>
    import { getStoragePageSize } from '@/utils/index';
    let y9PaginationConfig = ref({
        ···
        currentPage: 1, //当前页数，支持 v-model 双向绑定
        pageSize: getStoragePageSize('唯一的id值(uniqueIdent)', 10), //每页显示条目个数，支持 v-model 双向绑定
        ···
    });
                                </pre>
                            </div>
                            <div>
                                <h5 style="color: var(--el-text-color-primary)"
                                    >②.当前页数与每页条目个数都具有记忆性</h5
                                >
                                <pre>
    import { getStorageCurrPage, getStoragePageSize } from '@/utils/index';
    let y9PaginationConfig = ref({
        ···
        currentPage: getStorageCurrPage('唯一的id值(uniqueIdent)', 1), //当前页数，支持 v-model 双向绑定
        pageSize: getStoragePageSize('唯一的id值(uniqueIdent)', 10), //每页显示条目个数，支持 v-model 双向绑定
        ···
    });
                                </pre>
                            </div>
                        </div>
                    </template>
                </el-step>
                <el-step title="※注意点">
                    <template #description>
                        <div>
                            <h4 style="color: var(--el-text-color-primary)"
                                >当前页数具有记忆性时，需额外添加一段代码</h4
                            >
                        </div>
                        <p>在用户点击退出的方法内添加如下代码：</p>
                        <pre>
    import y9_storage from '@/utils/storage'; // 如文件内有引用则不需要复制这行
    y9_storage.setObjectItem( 'uniqueCurrPage',{} )
                        </pre>
                    </template>
                </el-step>
                <el-step title="运行项目">
                    <template #description>
                        <p>npm run serve</p>
                        <p style="color: var(--el-text-color-primary)"
                            >运行成功后，可以测试是否功能实现。如有问题，请找相关技术人员</p
                        >
                    </template>
                </el-step>
            </el-steps>
        </div>
    </div>

    <div class="y9-title">
        <p>有操作按钮的分页</p>
        <el-tag>设置插槽 extend</el-tag>
        <el-button
            :size="fontSizeObj.buttonSize"
            :style="{ fontSize: fontSizeObj.baseFontSize }"
            class="global-btn-main"
            style="margin-left: 10px"
            type="primary"
            @click="onShowCode('havaActionBtn')"
            >查看代码
        </el-button>
    </div>
    <div style="background-color: #fff; padding: 20px">
        <y9Pagination :config="y9PaginationConfig">
            <template #extend>
                <el-button
                    :size="fontSizeObj.buttonSize"
                    :style="{ fontSize: fontSizeObj.baseFontSize }"
                    class="global-btn-second"
                    style="margin-left: 10px"
                    >操作按钮1
                </el-button>
                <el-button
                    :size="fontSizeObj.buttonSize"
                    :style="{ fontSize: fontSizeObj.baseFontSize }"
                    class="global-btn-second"
                    >操作按钮2
                </el-button>
                <el-button
                    :size="fontSizeObj.buttonSize"
                    :style="{ fontSize: fontSizeObj.baseFontSize }"
                    class="global-btn-second"
                    >操作按钮3
                </el-button>
            </template>
        </y9Pagination>
    </div>

    <div class="y9-title">
        <p>圆形分页</p>
        <el-tag>设置属性 customStyle:'circular'</el-tag>
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
    <div style="background-color: #fff; padding: 20px">
        <y9Pagination :config="y9PaginationCircularConfig"></y9Pagination>
    </div>

    <div class="y9-title">
        <p>有背景色的圆形分页</p>
        <el-tag>设置属性 customStyle:'circular',background:true</el-tag>
        <el-button
            :size="fontSizeObj.buttonSize"
            :style="{ fontSize: fontSizeObj.baseFontSize }"
            class="global-btn-main"
            style="margin-left: 10px"
            type="primary"
            @click="onShowCode('circularHaveBg')"
            >查看代码
        </el-button>
    </div>
    <div style="background-color: #fff; padding: 20px">
        <y9Pagination :config="y9PaginationCircularBgConfig"></y9Pagination>
    </div>

    <div class="y9-title">
        <p>块状分页</p>
        <el-tag>设置属性 customStyle:'square'</el-tag>
        <el-button
            :size="fontSizeObj.buttonSize"
            :style="{ fontSize: fontSizeObj.baseFontSize }"
            class="global-btn-main"
            style="margin-left: 10px"
            type="primary"
            @click="onShowCode('square')"
            >查看代码
        </el-button>
    </div>
    <div style="background-color: #fff; padding: 20px">
        <y9Pagination :config="y9PaginationSquareConfig"></y9Pagination>
    </div>

    <div class="y9-title">
        <p>有背景色的块状分页</p>
        <el-tag>设置属性 customStyle:'square',background:true</el-tag>
        <el-button
            :size="fontSizeObj.buttonSize"
            :style="{ fontSize: fontSizeObj.baseFontSize }"
            class="global-btn-main"
            style="margin-left: 10px"
            type="primary"
            @click="onShowCode('squareHaveBg')"
            >查看代码
        </el-button>
    </div>
    <div style="background-color: #fff; padding: 20px">
        <y9Pagination :config="y9PaginationSquareBgConfig"></y9Pagination>
    </div>

    <p style="color: red; margin-top: 40px">
        温馨提示:该组件根据elment-plus的Pagination组件的基础上进行二次封装,如果看以下文档仍然不理解用法,可以查看elment-plus的官网说明
        <a
            href="https://element-plus.gitee.io/en-US/component/pagination.html#hide-pagination-when-there-is-only-one-page"
            >传送门</a
        >
    </p>

    <div class="y9-title">y9Pagination属性说明表</div>
    <y9Table :config="attrTableConfig"></y9Table>

    <div class="y9-title">y9Pagination事件说明表</div>
    <y9Table :config="eventTableConfig"></y9Table>

    <div class="y9-title">插槽</div>
    <y9Table :config="slotConfig"></y9Table>

    <div class="y9-title">y9Pagination实例方法</div>
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
    //默认分页
    let y9PaginationConfig = ref({
        customStyle: 'default',
        hideOnSinglePage: false, //只有一页时是否隐藏
        background: false, //是否显示背景色
        layout: 'prev, pager, next,sizes', //布局
        currentPage: 1, //当前页数，支持 v-model 双向绑定
        pageSize: 10, //每页显示条目个数，支持 v-model 双向绑定
        total: 100, //总条目数
        pageSizeOpts: [5, 10, 20, 30, 40, 1000] //每页显示个数选择器的选项设置
    });
    //默认分页
    let y9PaginationConfigTwo = ref({
        customStyle: 'default',
        hideOnSinglePage: false, //只有一页时是否隐藏
        background: false, //是否显示背景色
        layout: 'prev, pager, next,sizes', //布局
        currentPage: 1, //当前页数，支持 v-model 双向绑定
        pageSize: getStoragePageSize('three', 10), //每页显示条目个数，支持 v-model 双向绑定
        total: 100, //总条目数
        pageSizeOpts: [5, 10, 20, 30, 40, 1000] //每页显示个数选择器的选项设置
    });

    //默认分页
    let y9PaginationConfigThree = ref({
        customStyle: 'default',
        hideOnSinglePage: false, //只有一页时是否隐藏
        background: false, //是否显示背景色
        layout: 'prev, pager, next,sizes', //布局
        currentPage: getStorageCurrPage('three', 1), //当前页数，支持 v-model 双向绑定
        pageSize: getStoragePageSize('three', 10), //每页显示条目个数，支持 v-model 双向绑定
        total: 100, //总条目数
        pageSizeOpts: [5, 10, 20, 30, 40, 1000] //每页显示个数选择器的选项设置
    });

    //圆形分页
    let y9PaginationCircularConfig = ref({
        customStyle: 'circular',
        background: false, //是否显示背景色
        hideOnSinglePage: false, //只有一页时是否隐藏
        layout: 'prev, pager, next,sizes', //布局
        currentPage: 1, //当前页数，支持 v-model 双向绑定
        pageSize: 10, //每页显示条目个数，支持 v-model 双向绑定
        total: 100, //总条目数
        pageSizeOpts: [5, 10, 20, 30, 40, 1000] //每页显示个数选择器的选项设置
    });

    //有背景色的圆形分页
    let y9PaginationCircularBgConfig = ref({
        customStyle: 'circular',
        background: true, //是否显示背景色
        hideOnSinglePage: false, //只有一页时是否隐藏
        layout: 'prev, pager, next,sizes', //布局
        currentPage: 1, //当前页数，支持 v-model 双向绑定
        pageSize: 10, //每页显示条目个数，支持 v-model 双向绑定
        total: 100, //总条目数
        pageSizeOpts: [5, 10, 20, 30, 40, 1000] //每页显示个数选择器的选项设置
    });

    //块状分页
    let y9PaginationSquareConfig = ref({
        customStyle: 'square',
        background: false, //是否显示背景色
        hideOnSinglePage: false, //只有一页时是否隐藏
        layout: 'prev, pager, next,sizes', //布局
        currentPage: 1, //当前页数，支持 v-model 双向绑定
        pageSize: 10, //每页显示条目个数，支持 v-model 双向绑定
        total: 100, //总条目数
        pageSizeOpts: [5, 10, 20, 30, 40, 1000] //每页显示个数选择器的选项设置
    });

    //有背景色的块状分页
    let y9PaginationSquareBgConfig = ref({
        customStyle: 'square',
        background: true, //是否显示背景色
        hideOnSinglePage: false, //只有一页时是否隐藏
        layout: 'prev, pager, next,sizes', //布局
        currentPage: 1, //当前页数，支持 v-model 双向绑定
        pageSize: 10, //每页显示条目个数，支持 v-model 双向绑定
        total: 100, //总条目数
        pageSizeOpts: [5, 10, 20, 30, 40, 1000] //每页显示个数选择器的选项设置
    });

    //y9Pagination属性说明表
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
                attr: 'config',
                explain: '分页配置，具体配置看config属性说明',
                type: 'object',
                id: 'config',
                children: [
                    {
                        attr: 'customStyle',
                        explain: '自定义样式',
                        type: 'string',
                        optionalValue: 'circular | square | default',
                        defaultValue: 'circular'
                    },
                    {
                        attr: 'background',
                        explain: '是否显示背景色',
                        type: 'boolean',
                        optionalValue: 'true | false',
                        defaultValue: 'true'
                    },
                    {
                        attr: 'hideOnSinglePage',
                        explain: '只有一页时是否隐藏分页',
                        type: 'boolean',
                        optionalValue: 'true | false',
                        defaultValue: 'false'
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
                    }
                ]
            },
            {
                attr: 'uniqueIdent',
                explain: '唯一标识，用于设置每页条目个数pageSize修改后是否具备记忆性的关键依据',
                type: 'string',
                id: 'uniqueIdent'
            },
            {
                attr: 'cuPageMemory',
                explain:
                    '用于设置当前页currPage修改后是否具备记忆性的依据,当这个值为true时，uniqueIndent必须传，否则无效',
                type: 'boolean',
                id: 'cuPageMemory',
                optionalValue: 'true/false',
                defaultValue: 'false'
            }
        ]
    });

    //y9Pagination事件说明表
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
                name: 'current-change',
                explain: '当前页改变时触发',
                callBack: 'currPage'
            },
            {
                name: 'size-change',
                explain: '每页条数改变时触发',
                callBack: 'pageSize'
            }
        ]
    });

    //y9Pagination插槽说明表
    let slotConfig = ref({
        showOverflowTooltip: false,
        headerBackground: true, //头部背景颜色
        pageConfig: false, //无分页
        border: false, //无边框
        columns: [
            {
                title: '插槽名',
                key: 'slotName'
            },
            {
                title: '说明',
                key: 'explain'
            }
        ],
        tableData: [
            {
                slotName: 'left',
                explain: '左侧内容'
            },
            {
                slotName: 'extend',
                explain: '左侧内容的扩展'
            }
        ]
    });

    //y9Pagination实例说明表
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
                attr: 'y9PaginationRef',
                explain: '分页组件实例',
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

    //点击查看代码按钮触发
    function onShowCode(type) {
        Object.assign(codeDialogConfig.value, {
            show: true,
            type: type
        });
        if (type == 'default') {
            codeDialogConfig.value.codeText = `
<template>
	<div style="background-color: #fff;padding: 20px;">
		<y9Pagination :config="y9PaginationConfig"></y9Pagination>
	</div>
</template>
<script lang="ts" setup>
  let y9PaginationConfig = ref({
  	customStyle:'default',
  	hideOnSinglePage:false, //只有一页时是否隐藏
  	background:false,//是否显示背景色
  	layout:"prev, pager, next,sizes",//布局
  	currentPage: 1,//当前页数，支持 v-model 双向绑定
  	pageSize: 10,//每页显示条目个数，支持 v-model 双向绑定
  	total: 100,//总条目数
  	pageSizeOpts: [5,10, 20, 30, 40, 1000],//每页显示个数选择器的选项设置
  })
<\/script>
  		`;
        } else if (type == 'uniqueId') {
            codeDialogConfig.value.codeText = `
<template>
	<div style="background-color: #fff; padding: 20px">
        <y9Pagination :config="y9PaginationConfigTwo" uniqueIdent="two"></y9Pagination>
    </div>
</template>
<script lang="ts" setup>
import { getStoragePageSize } from '@/utils/index';
let y9PaginationConfigTwo = ref({
        customStyle: 'default',
        hideOnSinglePage: false, //只有一页时是否隐藏
        background: false, //是否显示背景色
        layout: 'prev, pager, next,sizes', //布局
        currentPage: 1, //当前页数，支持 v-model 双向绑定
        pageSize: getStoragePageSize('three', 10), //每页显示条目个数，支持 v-model 双向绑定
        total: 100, //总条目数
        pageSizeOpts: [5, 10, 20, 30, 40, 1000] //每页显示个数选择器的选项设置
    });
<\/script>
  		`;
        } else if (type == 'pageMemory') {
            codeDialogConfig.value.codeText = `
<template>
	<div style="background-color: #fff; padding: 20px">
        <y9Pagination :config="y9PaginationConfigThree" uniqueIdent="three" :cuPageMemory="true"></y9Pagination>
    </div>
</template>
<script lang="ts" setup>
import { getStorageCurrPage, getStoragePageSize } from '@/utils/index';
let y9PaginationConfigThree = ref({
    customStyle: 'default',
    hideOnSinglePage: false, //只有一页时是否隐藏
    background: false, //是否显示背景色
    layout: 'prev, pager, next,sizes', //布局
    currentPage: getStorageCurrPage('three', 1), //当前页数，支持 v-model 双向绑定
    pageSize: getStoragePageSize('three', 10), //每页显示条目个数，支持 v-model 双向绑定
    total: 100, //总条目数
    pageSizeOpts: [5, 10, 20, 30, 40, 1000] //每页显示个数选择器的选项设置
});
<\/script>
  		`;
        } else if (type == 'havaActionBtn') {
            codeDialogConfig.value.codeText = `
<template>
	<div style="background-color: #fff;padding: 20px;">
		<y9Pagination :config="y9PaginationConfig">
			<template #extend>
				<el-button class="global-btn-second" style="margin-left: 10px;">操作按钮1</el-button>
				<el-button class="global-btn-second">操作按钮2</el-button>
				<el-button class="global-btn-second">操作按钮3</el-button>
			</template>
		</y9Pagination>
	</div>
</template>
<script lang="ts" setup>
  let y9PaginationConfig = ref({
  	customStyle:'default',
  	hideOnSinglePage:false, //只有一页时是否隐藏
  	background:false,//是否显示背景色
  	layout:"prev, pager, next,sizes",//布局
  	currentPage: 1,//当前页数，支持 v-model 双向绑定
  	pageSize: 10,//每页显示条目个数，支持 v-model 双向绑定
  	total: 100,//总条目数
  	pageSizeOpts: [5,10, 20, 30, 40, 1000],//每页显示个数选择器的选项设置
  })
<\/script>
  		`;
        } else if (type == 'circular') {
            codeDialogConfig.value.codeText = `
<template>
	<div style="background-color: #fff;padding: 20px;">
		<y9Pagination :config="y9PaginationCircularConfig"></y9Pagination>
	</div>
</template>
<script lang="ts" setup>
  let y9PaginationCircularConfig = ref({
  	customStyle:'circular',
  	background:false,//是否显示背景色
  	hideOnSinglePage:false, //只有一页时是否隐藏
  	layout:"prev, pager, next,sizes",//布局
  	currentPage: 1,//当前页数，支持 v-model 双向绑定
  	pageSize: 10,//每页显示条目个数，支持 v-model 双向绑定
  	total: 100,//总条目数
  	pageSizeOpts: [5,10, 20, 30, 40, 1000],//每页显示个数选择器的选项设置
  })
<\/script>
	`;
        } else if (type == 'circularHaveBg') {
            codeDialogConfig.value.codeText = `
<template>
	<div style="background-color: #fff;padding: 20px;">
		<y9Pagination :config="y9PaginationCircularBgConfig"></y9Pagination>
	</div>
</template>
<script lang="ts" setup>
	let y9PaginationCircularBgConfig = ref({
		customStyle:'circular',
		background:true,//是否显示背景色
		hideOnSinglePage:false, //只有一页时是否隐藏
		layout:"prev, pager, next,sizes",//布局
		currentPage: 1,//当前页数，支持 v-model 双向绑定
		pageSize: 10,//每页显示条目个数，支持 v-model 双向绑定
		total: 100,//总条目数
		pageSizeOpts: [5,10, 20, 30, 40, 1000],//每页显示个数选择器的选项设置
	})
<\/script>
	`;
        } else if (type == 'square') {
            codeDialogConfig.value.codeText = `
<template>
	<div style="background-color: #fff;padding: 20px;">
		<y9Pagination :config="y9PaginationSquareConfig"></y9Pagination>
	</div>
</template>
<script lang="ts" setup>
  let y9PaginationSquareConfig = ref({
  	customStyle:'square',
  	background:false,//是否显示背景色
  	hideOnSinglePage:false, //只有一页时是否隐藏
  	layout:"prev, pager, next,sizes",//布局
  	currentPage: 1,//当前页数，支持 v-model 双向绑定
  	pageSize: 10,//每页显示条目个数，支持 v-model 双向绑定
  	total: 100,//总条目数
  	pageSizeOpts: [5,10, 20, 30, 40, 1000],//每页显示个数选择器的选项设置
  })
<\/script>
	`;
        } else if (type == 'squareHaveBg') {
            codeDialogConfig.value.codeText = `
<template>
	<div style="background-color: #fff;padding: 20px;">
		<y9Pagination :config="y9PaginationSquareBgConfig"></y9Pagination>
	</div>
</template>
<script lang="ts" setup>
  let y9PaginationSquareBgConfig = ref({
  	customStyle:'square',
  	background:true,//是否显示背景色
  	hideOnSinglePage:false, //只有一页时是否隐藏
  	layout:"prev, pager, next,sizes",//布局
  	currentPage: 1,//当前页数，支持 v-model 双向绑定
  	pageSize: 10,//每页显示条目个数，支持 v-model 双向绑定
  	total: 100,//总条目数
  	pageSizeOpts: [5,10, 20, 30, 40, 1000],//每页显示个数选择器的选项设置
  })
<\/script>
	`;
        }
    }
</script>

<style lang="scss" scoped>
    :deep(.el-step) {
        .el-step__head,
        .el-step__icon,
        .el-step__title {
            color: var(--el-text-color-primary);
            border-color: var(--el-text-color-primary);
            font-weight: normal;
        }

        .el-step__description {
            color: var(--el-color-primary);
            font-size: 16px;
        }
    }
</style>
