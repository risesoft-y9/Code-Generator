<template>
    <div class="container">
        <div class="sidebar">
            <h2>组件更新版本</h2>
            <y9Tree :data="treeList" defaultExpandAll node-key="id" @node-click="handleNodeClick"></y9Tree>
        </div>
        <div class="contain">
            <h2>组件更新说明</h2>
            <div v-for="item in description" :id="item.id" :key="item.id" class="main">
                <el-steps direction="vertical">
                    <div style="display: flex; margin-bottom: 20px; font-size: 18px">
                        <div> 更新组件名：{{ item.name }}</div>
                        <div style="margin-left: 30px"> 更新版本：{{ item.version }}</div>
                        <div style="margin-left: 30px">更新时间：{{ item.date }}</div>
                        <div style="margin-left: 30px">更新者：{{ item.author }}</div>
                    </div>
                    <el-step v-for="(ret, index) in item.info" :key="index" :title="ret.title">
                        <template #description>
                            <p v-for="(res, i) in ret.value" :key="i">
                                {{ res.content }}
                            </p>
                        </template>
                    </el-step>
                </el-steps>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { onMounted } from 'vue';
    import 'viewerjs/dist/viewer.css';
    import config from './config';

    let { treeList, description } = config();
    const getFileData = (status) => {
        console.log(status, 111);
    };
    onMounted(async () => {});
    const state = reactive({
        accept: 'file', //允许文件类型后缀名,'.jpg,.png,.pdf',逗号分隔，String类型file,为全部类型
        maxCount: 10, //最多上传数量
        size: 10, //最大文件大小10M
        checkedBoxSelect: true, //是否需要全选单选按钮
        isMultiple: true, //是否支持多选
        showSize: true, //是否显示体积大小
        isClear: false, //每次选择是否清除上一次文件
        trueProgressBar: true, //是否需要根据文件大小展示进度条,如果是true需要在axios添加onUploadProgress属性
        url: 'https://vue.youshengyun.com/flowableUI/vue/attachment/upload?access_token=AT-1110-2uW6pCHF6Z3BDYr-CQhYTeT9nc-JBn7H', //上传url
        formData: {
            processSerialNumber: 1532425927554764800,
            processInstanceId: '',
            taskId: '',
            fileSource: ''
        } //参数key value形式
    });
    let {
        formData,
        url,
        checkedBoxSelect,
        result,
        accept,
        showSize,
        maxCount,
        size,
        isMultiple,
        isClear,
        trueProgressBar
    } = toRefs(state);

    // 点击目录跳转
    function handleNodeClick(data) {
        const targetId = data.id;
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    }
</script>
<style lang="scss" scoped>
    .container {
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
            }
        }

        display: flex;
        flex-direction: row;
        min-width: 800px;
        min-height: calc(100vh - 200px);

        .sidebar {
            min-width: 100px;
            flex: 0 0 17%;
            background-color: white;
            padding-top: 10px;
            padding-left: 20px;
            position: sticky;
            top: 0;
            max-height: calc(100vh - 150px);
            overflow-y: auto;
        }

        .contain {
            flex: 1;
            padding: 10px;
            background-color: white;

            .main {
                margin-bottom: 20px;
                padding: 20px;
                max-height: calc(100vh - 190px);
                overflow-y: auto;
                border: 1px solid #ccc;
            }
        }
    }
</style>
