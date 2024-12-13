<template>
    <p
        >图片预览插件v-viewer
        <a
            href="https://mirari.cc/2021/05/31/Vue3%E5%9B%BE%E7%89%87%E6%B5%8F%E8%A7%88%E7%BB%84%E4%BB%B6v-viewer%EF%BC%8C%E6%94%AF%E6%8C%81%E6%97%8B%E8%BD%AC%E3%80%81%E7%BC%A9%E6%94%BE%E3%80%81%E7%BF%BB%E8%BD%AC%E7%AD%89%E6%93%8D%E4%BD%9C/"
            >传送门</a
        >
    </p>

    <div class="y9-title">
        使用指令的方式预览
        <el-button
            :size="fontSizeObj.buttonSize"
            :style="{ fontSize: fontSizeObj.baseFontSize }"
            class="global-btn-main"
            style="margin-left: 10px"
            type="primary"
            @click="onShowCode('directive')"
            >查看代码
        </el-button>
    </div>
    <img v-viewer :src="url" style="width: 200px; height: 200px; object-fit: contain" />

    <div class="y9-title">
        使用组件的方式预览
        <el-button
            :size="fontSizeObj.buttonSize"
            :style="{ fontSize: fontSizeObj.baseFontSize }"
            class="global-btn-main"
            style="margin-left: 10px"
            type="primary"
            @click="onShowCode('compontent')"
            >查看代码
        </el-button>
    </div>
    <viewer :images="images">
        <img v-for="src in images" :key="src" :src="src" />
    </viewer>

    <div class="y9-title">
        使用api的方式预览
        <el-button
            :size="fontSizeObj.buttonSize"
            :style="{ fontSize: fontSizeObj.baseFontSize }"
            class="global-btn-main"
            style="margin-left: 10px"
            type="primary"
            @click="onShowCode('api')"
            >查看代码
        </el-button>
    </div>
    <div style="display: flex; align-items: center">
        <img :src="url" alt="" style="width: 200px; height: 200px; object-fit: contain; margin-right: 20px" />
        <el-button
            :size="fontSizeObj.buttonSize"
            :style="{ fontSize: fontSizeObj.baseFontSize }"
            class="global-btn-second"
            @click="onPreview"
            >点击预览图片
        </el-button>
    </div>

    <y9Dialog v-model:config="codeDialogConfig">
        <pre class="y9-code">
			<code id="code">
				{{ codeDialogConfig.codeText }}
			</code>
		</pre>
    </y9Dialog>
</template>

<script lang="ts" setup>
    import { api as viewerApi } from 'v-viewer';
    import { inject } from 'vue';
    // 注入 字体对象
    const fontSizeObj: any = inject('sizeObjInfo');
    let url = ref('https://picsum.photos/200/200');

    let images = ref([
        'https://picsum.photos/200/200',
        'https://picsum.photos/300/200',
        'https://picsum.photos/250/200'
    ]);

    function onPreview() {
        viewerApi({
            images: [url.value]
        });
    }

    let codeDialogConfig = ref({
        show: false,
        okText: '复制',
        onOk: (config) => {
            return new Promise((resolve, reject) => {
                const code = document.getElementById('code');
                window.getSelection().selectAllChildren(code);
                document.execCommand('copy');
                reject();
            });
        }
    });

    function onShowCode(type) {
        Object.assign(codeDialogConfig.value, {
            show: true,
            type: type
        });
        if (type == 'directive') {
            codeDialogConfig.value.codeText = `
<template>
	<img :src="url" v-viewer style="width: 200px;height: 200px;object-fit: contain;">
</template>
<script lang="ts" setup>
	 const url = ref('https://picsum.photos/200/200')
<\/script>
		`;
        } else if (type == 'compontent') {
            codeDialogConfig.value.codeText = `
<template>
	<viewer :images="images">
	    <img v-for="src in images" :key="src" :src="src">
	</viewer>
</template>
<script lang="ts" setup>
	 const images = ref([
	       "https://picsum.photos/200/200",
	       "https://picsum.photos/300/200",
	       "https://picsum.photos/250/200"
	 ])
<\/script>
		`;
        } else if (type == 'api') {
            codeDialogConfig.value.codeText = `
<template>
	<div style="display: flex;align-items: center;">
		  <img style="width: 200px;height: 200px;object-fit: contain;margin-right: 20px;" :src="url" alt="">
		  <el-button class="global-btn-second" @click="onPreview">点击预览图片</el-button>
	</div>
</template>
<script lang="ts" setup>
	import { api as viewerApi } from "v-viewer"
	const url = ref('https://picsum.photos/200/200')
	function onPreview(){
		viewerApi({
			 images: [url.value],
		})
	}
<\/script>
		`;
        }
    }
</script>

<style lang="scss" scoped></style>
