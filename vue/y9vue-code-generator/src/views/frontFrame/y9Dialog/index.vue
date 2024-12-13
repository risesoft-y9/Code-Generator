<template>
    <div class="y9-title">
        弹窗示例
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
    <el-button
        :size="fontSizeObj.buttonSize"
        :style="{ fontSize: fontSizeObj.baseFontSize }"
        class="global-btn-second"
        @click="onShowDialog"
        >显示弹窗
    </el-button>
    <y9Dialog v-model:config="dialogConfig"> 我是内容</y9Dialog>

    <div class="y9-title">y9Dialog属性说明表</div>
    <y9Table :config="attrTableConfig"></y9Table>

    <div class="y9-title">y9Dialog插槽说明表</div>
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
    // 注入 字体对象
    const fontSizeObj: any = inject('sizeObjInfo');
    let dialogConfig = ref({
        show: false,
        width: '50%',
        title: '我是标题',
        resetText: '重置',
        onOk: (config) => {
            //可选形式一：返回promise的形式：
            return new Promise((resolve, reject) => {
                //模拟请求接口
                setTimeout(() => {
                    resolve(); //返回resolve()则关闭加载状态，关闭弹窗，一般用于校验通过且接口请求成功
                }, 2000);

                // reject()//返回reject()则只关闭加载状态，不关闭弹窗，一般用于校验不通过
            });

            //可选形式二：操作参数的形式：
            // config.value.show = false;
        },
        onReset: (config) => {
            console.log('重置按钮被点击了', config);
        },
        visibleChange: (visible) => {
            console.log('弹窗的显示关闭状态为', visible);
        }
    });

    const onShowDialog = () => {
        Object.assign(dialogConfig.value, {
            show: true
        });
    };

    //y9Dialog属性说明表
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
                attr: '* config/v-model',
                explain: '弹窗配置，建议使用v-model:config进行双向绑定，具体请展开查看下列配置',
                type: 'object',
                id: 'config',
                children: [
                    {
                        attr: 'show',
                        explain: '是否显示当前组件',
                        type: 'boolean',
                        optionalValue: 'true | false',
                        defaultValue: 'false'
                    },
                    {
                        attr: 'title',
                        explain: '标题',
                        type: 'string',
                        optionalValue: '',
                        defaultValue: ''
                    },
                    {
                        attr: 'width',
                        explain: '宽',
                        type: 'string',
                        optionalValue: '',
                        defaultValue: '60%'
                    },
                    {
                        attr: 'showHeaderClose',
                        explain: '是否显示头部的关闭图标',
                        type: 'boolean',
                        optionalValue: 'true | false',
                        defaultValue: 'true'
                    },
                    {
                        attr: 'showHeaderFullscreen',
                        explain: '是否显示头部的全屏图标',
                        type: 'boolean',
                        optionalValue: 'true | false',
                        defaultValue: 'true'
                    },
                    {
                        attr: 'closeOnClickModal',
                        explain: '是否可以通过点击 modal 关闭 Dialog',
                        type: 'boolean',
                        optionalValue: 'true | false',
                        defaultValue: 'false'
                    },
                    {
                        attr: 'fullscreen',
                        explain: '是否为全屏',
                        type: 'boolean',
                        optionalValue: 'true | false',
                        defaultValue: 'false'
                    },
                    {
                        attr: 'margin',
                        explain: '弹窗距离',
                        type: 'String',
                        optionalValue: '',
                        defaultValue: '15vh auto'
                    },
                    {
                        attr: 'appendToBody',
                        explain: 'Dialog自身是否插入至 body 元素上',
                        type: 'boolean',
                        optionalValue: 'true | false',
                        defaultValue: 'false'
                    },
                    {
                        attr: 'loading',
                        explain: '弹窗加载状态',
                        type: 'boolean',
                        optionalValue: 'true | false',
                        defaultValue: 'false'
                    },
                    {
                        attr: 'showFooter',
                        explain: '是否显示底部',
                        type: 'boolean',
                        optionalValue: 'true | false',
                        defaultValue: 'true'
                    },
                    {
                        attr: 'okText',
                        explain: '保存按钮名称,传空或者false不显示按钮',
                        type: 'string,boolean',
                        optionalValue: 'string | false',
                        defaultValue: '保存'
                    },
                    {
                        attr: 'okDisabled',
                        explain: '保存按钮禁用状态',
                        type: 'boolean',
                        optionalValue: 'true | false',
                        defaultValue: 'false'
                    },
                    {
                        attr: 'cancelText',
                        explain: '取消按钮名称，传空或者false不显示按钮',
                        type: 'string,boolean',
                        optionalValue: 'string | false',
                        defaultValue: '取消'
                    },
                    {
                        attr: 'cancelDisabled',
                        explain: '取消按钮禁用状态',
                        type: 'boolean',
                        optionalValue: 'true | false',
                        defaultValue: 'false'
                    },
                    {
                        attr: 'resetText',
                        explain: '重置按钮名称，传空或者false不显示按钮',
                        type: 'string,boolean',
                        optionalValue: 'string | false',
                        defaultValue: 'false'
                    },
                    {
                        attr: 'resetDisabled',
                        explain: '重置按钮禁用状态',
                        type: 'boolean',
                        optionalValue: 'true | false',
                        defaultValue: 'false'
                    },
                    {
                        attr: 'onOkLoading',
                        explain: '是否开启保存按钮的加载状态',
                        type: 'boolean',
                        optionalValue: 'true | false',
                        defaultValue: 'true'
                    },
                    {
                        attr: 'onOk',
                        explain:
                            '保存按钮回调,支持Promise，返回resolve()关闭对话框同时关闭保存按钮加载状态，返回reject()只关闭保存按钮加载状态',
                        type: 'function',
                        optionalValue: '(config) =>{}',
                        defaultValue: ''
                    },
                    {
                        attr: 'onCancel',
                        explain: '关闭按钮回调',
                        type: 'function',
                        optionalValue: '(config) =>{}',
                        defaultValue: ''
                    },
                    {
                        attr: 'onReset',
                        explain: '重置按钮回调',
                        type: 'function',
                        optionalValue: '(config) =>{}',
                        defaultValue: ''
                    },
                    {
                        attr: 'visibleChange',
                        explain: '显示回调，弹窗显示状态发生变化时触发',
                        type: 'function',
                        optionalValue: '(visible) =>{}',
                        defaultValue: ''
                    }
                ]
            }
        ]
    });

    //y9Dialog插槽说明表
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
                explain: 'y9Dialog内容'
            },
            {
                slotName: 'header',
                explain: 'y9Dialog头部的内容'
            },
            {
                slotName: 'footer',
                explain: 'y9Dialog底部的内容'
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
        if (type == 'base') {
            codeDialogConfig.value.codeText = `
<template>
	<el-button class="global-btn-second" @click="onShowDialog">显示弹窗</el-button>
	<y9Dialog v-model:config="dialogConfig">
			我是内容
	</y9Dialog>
</template>
<script lang="ts" setup>
	let dialogConfig = ref({
		show: false,
		width:"50%",
		title: "我是标题",
		resetText:"重置",
		onOk: (config) => {
			
			//可选形式一：返回promise的形式：
			return new Promise((resolve, reject) => {
				
				//模拟请求接口
				setTimeout(()=>{
					resolve()//返回resolve()则关闭加载状态，关闭弹窗，一般用于校验通过且接口请求成功
				},2000)
		
				// reject()//返回reject()则只关闭加载状态，不关闭弹窗，一般用于校验不通过
				
			})
		
			//可选形式二：操作参数的形式：
			// config.value.show = false;
			
			
		},
		onReset: (config) => {
		
			console.log("重置按钮被点击了",config)
			
		},
		visibleChange:(visible) => {
			console.log("弹窗的显示关闭状态为",visible)
		}
	})
	
	const onShowDialog = () => {
		Object.assign(dialogConfig.value,{
			show:true,
		})
	}
<\/script>
		`;
        }
    }
</script>

<style lang="scss" scoped></style>
