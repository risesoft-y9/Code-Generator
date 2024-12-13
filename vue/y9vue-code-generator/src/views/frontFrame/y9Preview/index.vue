<template>
    <div class="y9-title">
        基础预览图片
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
    <div style="display: flex; align-items: center">
        <img
            :src="y9PreviewConfig.url"
            alt=""
            style="width: 200px; height: 200px; object-fit: contain; margin-right: 20px"
        />
        <el-button
            :size="fontSizeObj.buttonSize"
            :style="{ fontSize: fontSizeObj.baseFontSize }"
            class="global-btn-second"
            @click="onPreview"
            >点击预览图片
        </el-button>
    </div>
    <y9Preview v-model:config="y9PreviewConfig"></y9Preview>

    <div class="y9-title">y9Preview属性</div>
    <y9Table :config="attrTableConfig"></y9Table>

    <div class="y9-title">config属性的配置</div>
    <y9Table :config="configTableConfig"></y9Table>

    <div class="y9-title">插槽</div>
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
    import { inject } from 'vue';
    // 注入 字体对象
    const fontSizeObj: any = inject('sizeObjInfo');
    const data = reactive({
        codeDialogConfig: {
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
        },
        y9PreviewConfig: {
            show: false, // 显示状态
            type: 'img', //类型
            url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2Ftp09%2F210F2130512J47-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1659778592&t=69f8a7c5058aded7b81792c81622ae31'
        },
        attrTableConfig: {
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
                    attr: '* config/v-model',
                    explain: '预览配置，建议使用v-model:config进行双向绑定，具体配置看config属性表',
                    type: 'object'
                }
            ]
        },
        configTableConfig: {
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
                    attr: 'show',
                    explain: '是否显示当前组件',
                    type: 'boolean',
                    optionalValue: 'true | false',
                    defaultValue: 'false'
                },
                {
                    attr: '* type',
                    explain: '显示类型',
                    type: 'string',
                    optionalValue: 'img',
                    defaultValue: 'img'
                },
                {
                    attr: 'url',
                    explain: '显示路径',
                    type: 'string',
                    optionalValue: '',
                    defaultValue: ''
                }
            ]
        },
        slotConfig: {
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
                    explain: '预览的内容'
                }
            ]
        }
    });

    let { codeDialogConfig, y9PreviewConfig, attrTableConfig, configTableConfig, slotConfig } = toRefs(data);

    const onPreview = () => {
        Object.assign(y9PreviewConfig.value, {
            show: true
        });
    };

    function onShowCode(type) {
        Object.assign(codeDialogConfig.value, {
            show: true,
            type: type
        });
        if (type == 'base') {
            codeDialogConfig.value.codeText = `
<template>
	<div style="display: flex;align-items: center;">
		  <img style="width: 200px;height: 200px;object-fit: contain;margin-right: 20px;" :src="y9PreviewConfig.url" alt="">
		  <el-button class="global-btn-second" @click="onPreview">点击预览图片</el-button>
	</div>
	<y9Preview v-model:config="y9PreviewConfig"></y9Preview>
</template>
<script lang="ts" setup>
  const data = reactive({
	 y9PreviewConfig:{
	 		  show: false, // 显示状态
	 		  type:"img",//类型
	 		  url:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2Ftp09%2F210F2130512J47-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1659778592&t=69f8a7c5058aded7b81792c81622ae31",
	 },
  })
  
  let {
	  y9PreviewConfig,
  } = toRefs(data)
  
 const onPreview = ()=>{
 	  Object.assign(y9PreviewConfig.value,{
 		  show:true,
 	  })
 }
<\/script>
	`;
        }
    }
</script>

<style lang="scss" scoped></style>
