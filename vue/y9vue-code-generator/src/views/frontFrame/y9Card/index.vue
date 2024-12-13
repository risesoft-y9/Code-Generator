<template>
    <div class="y9-title">
        基本卡片
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
    <y9Card title="我是标题"> 我是内容</y9Card>

    <div class="y9-title">
        有底部按钮的卡片
        <el-button
            :size="fontSizeObj.buttonSize"
            :style="{ fontSize: fontSizeObj.baseFontSize }"
            class="global-btn-main"
            style="margin-left: 10px"
            type="primary"
            @click="show = true"
            >点击显示卡片
        </el-button>
        <el-button
            :size="fontSizeObj.buttonSize"
            :style="{ fontSize: fontSizeObj.baseFontSize }"
            class="global-btn-main"
            style="margin-left: 10px"
            type="primary"
            @click="onShowCode('showFooter')"
            >查看代码
        </el-button>
    </div>
    <y9Card v-model:show="show" showFooter title="我是标题"> 我是内容</y9Card>

    <div class="y9-title">y9Card属性说明表</div>
    <y9Table :config="attrTableConfig"></y9Table>

    <div class="y9-title">y9Card插槽说明表</div>
    <y9Table :config="slotConfig"></y9Table>

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

    let show = ref(true);
    // 注入 字体对象
    const fontSizeObj: any = inject('sizeObjInfo');

    //y9Card属性说明表格配置
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
                attr: 'show/v-model',
                explain: '是否显示当前组件',
                type: 'boolean',
                optionalValue: 'true | false',
                defaultValue: 'true'
            },
            {
                attr: 'title',
                explain: '头部标题',
                type: 'string',
                optionalValue: '',
                defaultValue: ''
            },
            {
                attr: 'showHeader',
                explain: '是否显示头部',
                type: 'boolean',
                optionalValue: 'true | false',
                defaultValue: 'true'
            },
            {
                attr: 'showClose',
                explain: '是否显头部右上角的关闭按钮',
                type: 'boolean',
                optionalValue: 'true | false',
                defaultValue: 'false'
            },
            {
                attr: 'showHeaderSplit',
                explain: '是否显示头部分割线',
                type: 'boolean',
                optionalValue: 'true | false',
                defaultValue: 'true'
            },
            {
                attr: 'headerPadding',
                explain: '是否显示头部padding值',
                type: 'boolean',
                optionalValue: 'true | false',
                defaultValue: 'true'
            },
            {
                attr: 'showBoxShadow',
                explain: '是否显示阴影',
                type: 'boolean',
                optionalValue: 'true | false',
                defaultValue: 'true'
            },
            {
                attr: 'showBorder',
                explain: '是否显示边框',
                type: 'boolean',
                optionalValue: 'true | false',
                defaultValue: 'true'
            },
            {
                attr: 'showFooter',
                explain: '是否显示底部',
                type: 'boolean',
                optionalValue: 'true | false',
                defaultValue: 'false'
            },
            {
                attr: 'footerBtnConfig',
                explain: '底部按钮配置',
                type: 'object',
                optionalValue: '',
                defaultValue: `{具体请展开查看下列配置}`,
                id: 'footerBtnConfig',
                children: [
                    {
                        attr: 'okLoading',
                        explain: '确定按钮加载状态',
                        type: 'boolean',
                        optionalValue: 'true | false',
                        defaultValue: 'false'
                    },
                    {
                        attr: 'okText',
                        explain: '确定按钮名称，false则不显示，传入string字符串则为按钮名称',
                        type: 'string | boolean',
                        optionalValue: '',
                        defaultValue: '确定'
                    },
                    {
                        attr: 'okDisabled',
                        explain: '确定按钮禁用状态',
                        type: 'boolean',
                        optionalValue: 'true | false',
                        defaultValue: 'false'
                    },
                    {
                        attr: 'closeText',
                        explain: '关闭按钮名称，false则不显示，传入string字符串则为按钮名称',
                        type: 'string | boolean',
                        optionalValue: '',
                        defaultValue: '关闭'
                    },
                    {
                        attr: 'closeDisabled',
                        explain: '关闭按钮禁用状态',
                        type: 'boolean',
                        optionalValue: 'true | false',
                        defaultValue: 'false'
                    },
                    {
                        attr: 'resetText',
                        explain: '重置按钮名称，false则不显示，传入string字符串则为按钮名称',
                        type: 'string | boolean',
                        optionalValue: '',
                        defaultValue: '重置'
                    },
                    {
                        attr: 'resetDisabled',
                        explain: '重置按钮禁用状态',
                        type: 'boolean',
                        optionalValue: 'true | false',
                        defaultValue: 'false'
                    },
                    {
                        attr: 'onOk',
                        explain: '确定按钮回调',
                        type: 'function',
                        optionalValue: '(config,show) =>{}',
                        defaultValue: ''
                    },
                    {
                        attr: 'onClose',
                        explain: '关闭按钮回调',
                        type: 'function',
                        optionalValue: '(config,show) =>{}',
                        defaultValue: ''
                    },
                    {
                        attr: 'onReset',
                        explain: '重置按钮回调',
                        type: 'function',
                        optionalValue: '(config,show) =>{}',
                        defaultValue: ''
                    }
                ]
            }
        ]
    });

    //y9Card插槽说明表格配置
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
                slotName: '——',
                explain: 'y9Card内容'
            },
            {
                slotName: 'header',
                explain: 'y9Card头部的内容'
            },
            {
                slotName: 'title',
                explain: 'y9Card头部标题的内容'
            },
            {
                slotName: 'footer',
                explain: 'y9Card底部的内容'
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

    //点击查看代码按钮
    function onShowCode(type) {
        Object.assign(codeDialogConfig.value, {
            show: true,
            type: type
        });
        if (type === 'base') {
            codeDialogConfig.value.codeText = `
<template>
	<y9Card title="我是标题">
		我是内容
	</y9Card>
</template>
		`;
        } else if (type === 'showFooter') {
            codeDialogConfig.value.codeText = `
<template>
	<el-button style="margin-bottom: 10px;" type="primary"  class="global-btn-main"  @click="show=true">点击显示卡片</el-button>
	<y9Card v-model:show="show" title="我是标题" showFooter>
		我是内容
	</y9Card>
</template>

<script lang="ts" setup>
	let show = ref(true);
<\/script>
				`;
        }
    }
</script>

<style lang="scss" scoped></style>
