<template>
    <div class="y9-title">
        竖着的流程图
        <el-button
            :size="fontSizeObj.buttonSize"
            :style="{ fontSize: fontSizeObj.baseFontSize }"
            class="global-btn-main"
            style="margin-left: 10px"
            type="primary"
            @click="onShowCode('vertical')"
            >查看代码
        </el-button>
    </div>
    <div style="background-color: #fff; padding: 20px">
        <y9ProcessStatus :list="processList" />
    </div>

    <div class="y9-title">
        横着的流程图
        <el-button
            :size="fontSizeObj.buttonSize"
            :style="{ fontSize: fontSizeObj.baseFontSize }"
            class="global-btn-main"
            style="margin-left: 10px"
            type="primary"
            @click="onShowCode('row')"
            >查看代码
        </el-button>
    </div>
    <div style="background-color: #fff; padding: 20px">
        <y9ProcessStatus :list="rowProcessList" lineDirection="row" />
    </div>

    <div class="y9-title">y9ProcessStatus属性说明表</div>
    <y9Table :config="attrTableConfig"></y9Table>

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
    // 注入 字体对象
    const fontSizeObj: any = inject('sizeObjInfo');
    // 竖着的 流程图
    let processList = ref([
        {
            timestamp: ['2018-04-03 20:46', '2022-09-11 14:22'],
            placement: 'left',
            type: 'solid',
            name: '人员1',
            content: '吃饭'
        },
        {
            timestamp: ['2018-04-03 20:46', '2022-09-11 14:22'],
            placement: 'right',
            type: 'solid',
            name: '人员2',
            content: '订单'
        },
        {
            timestamp: '2018-04-03 20:46',
            placement: 'left',
            type: 'current',
            name: ['人员3', '人员公测能使'],
            content: '官方无人'
        },
        {
            placement: 'right',
            type: 'current',
            name: '人员人员人员4',
            timestamp: '2018-04-03 20:46',
            content: '违法金额'
        },
        {
            placement: 'left',
            type: 'hollow',
            name: '人员5',
            timestamp: '2018-04-03 20:46',
            content: '并行处理'
        }
    ]);

    // 横着的流程图
    let rowProcessList = ref([
        {
            timestamp: ['2018-04-03 20:46', '2022-09-11 14:22'],
            placement: 'left',
            type: 'current',
            name: '人员1',
            content: '吃饭'
        },
        {
            timestamp: ['2018-04-03 20:46', '2022-09-11 14:22'],
            placement: 'right',
            type: 'solid',
            name: '人员2',
            content: '订单'
        },
        {
            timestamp: '2018-04-03 20:46',
            placement: 'left',
            type: 'current',
            name: '人员3',
            content: '官方无人'
        },
        {
            placement: 'right',
            type: 'current',
            name: ['人员3', '人员公测能使'],
            timestamp: '2018-04-03 20:46',
            content: '违法金额'
        },
        {
            placement: 'left',
            type: 'hollow',
            name: '人员5',
            timestamp: '2018-04-03 20:46',
            content: '并行处理'
        }
    ]);

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
                attr: '* list',
                explain:
                    "数组数据列表，例如：[{timestamp: '2022-1-3 11:33', placement: 'left', type: 'solid', name: '某某管理员', content: '审批某某事件' }]",
                type: 'array',
                id: 'list',
                defaultValue: '具体展开查看下列属性',
                children: [
                    {
                        attr: 'timestamp',
                        explain: '时间戳, 时间段用数组，单个时间用string',
                        type: 'array | string',
                        optionalValue: '',
                        defaultValue: ''
                    },
                    {
                        attr: 'placement',
                        explain: '时间戳位置',
                        type: 'string',
                        optionalValue: 'left | right',
                        defaultValue: ''
                    },
                    {
                        attr: 'type',
                        explain: '节点类型',
                        type: 'string',
                        optionalValue: 'solid实心 | hollow空心 | current 当前选择状态',
                        defaultValue: ''
                    },
                    {
                        attr: 'name',
                        explain:
                            '流程节点名，可以是数组类型或字符串类型，如果有职位和姓名就需要传入数组样式，若只有姓名就直接传string即可',
                        type: 'array | string',
                        optionalValue: '',
                        defaultValue: ''
                    },
                    {
                        attr: 'content',
                        explain: '流程节点的说明',
                        type: 'string',
                        optionalValue: '',
                        defaultValue: ''
                    }
                ]
            },
            {
                attr: 'lineDirection',
                explain: '流程图的方向，横或者竖',
                type: 'string',
                optionalValue: 'vertical竖 | row横',
                defaultValue: 'vertical'
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
        if (type == 'vertical') {
            // 竖着
            codeDialogConfig.value.codeText = `
  <template>
    <div style="background-color: #fff;padding: 20px;">
		<y9ProcessStatus :list="processList" />
	</div>
  </template>
  <script lang="ts" setup>
   let processList =  ref([
        {
            timestamp: ['2018-04-03 20:46', '2022-09-11 14:22'], 
            placement: 'left', 
            type: 'solid', 
            name: '人员1', 
            content: '吃饭',
        },
        {
            timestamp: ['2018-04-03 20:46', '2022-09-11 14:22'], 
            placement: 'right',
            type: 'solid', 
            name: '人员2', 
            content: '订单', 
        },
        {
            timestamp: '2018-04-03 20:46',
            placement: 'left',
            type: 'current', 
            name: ['人员3', '人员公测能使'], 
            content: '官方无人', 
        },
        {
            placement: 'right',
            type: 'current', 
            name: '人员人员人员4', 
            timestamp: '2018-04-03 20:46',
            content: '违法金额', 
        },
        {
            placement: 'left',
            type: 'hollow', 
            name: '人员5', 
            timestamp: '2018-04-03 20:46',
            content: '并行处理', 
        },
    ]);
  <\/script>
  		`;
        } else if (type == 'row') {
            // 横着
            codeDialogConfig.value.codeText = `
<template>
	<div style="background-color: #fff;padding: 20px;">
		<y9ProcessStatus lineDirection="row" :list="rowProcessList" />
	</div>
</template>
<script lang="ts" setup>
    let rowProcessList =  ref([
        {
            timestamp: ['2018-04-03 20:46', '2022-09-11 14:22'],
            placement: 'left',
            type: 'current', 
            name: '人员1', 
            content: '吃饭', 
        },
        {
            timestamp: ['2018-04-03 20:46', '2022-09-11 14:22'],
            placement: 'right',
            type: 'solid', 
            name: '人员2', 
            content: '订单', 
        },
        {
            timestamp: '2018-04-03 20:46',
            placement: 'left',
            type: 'current', 
            name: '人员3', 
            content: '官方无人', 
        },
        {
            placement: 'right',
            type: 'current', 
            name: ['人员3', '人员公测能使'],
            timestamp: '2018-04-03 20:46',
            content: '违法金额', 
        },
        {
            placement: 'left',
            type: 'hollow', 
            name: '人员5', 
            timestamp: '2018-04-03 20:46',
            content: '并行处理', 
        },
    ]);
<\/script>
		`;
        }
    }
</script>

<style lang="scss" scoped></style>
