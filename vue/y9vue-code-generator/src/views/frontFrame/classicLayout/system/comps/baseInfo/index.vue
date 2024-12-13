<template>
    <y9Card v-loading.fullscreen.lock="loading">
        <template #header>
            <span>{{ $t('基本信息') }}{{ currInfo.cnName ? ' - ' + currInfo.cnName : '' }}</span>
        </template>

        <div class="oth-btns">
            <div v-if="isEditState">
                <el-button
                    :size="fontSizeObj.buttonSize"
                    :style="{ fontSize: fontSizeObj.baseFontSize }"
                    class="global-btn-main"
                    type="primary"
                    @click="onActions('save')"
                >
                    <i class="ri-save-line"></i>
                    <span>{{ $t('保存') }}</span>
                </el-button>

                <el-button
                    :size="fontSizeObj.buttonSize"
                    :style="{ fontSize: fontSizeObj.baseFontSize }"
                    class="global-btn-second"
                    @click="isEditState = false"
                >
                    <i class="ri-close-line"></i>
                    <span> {{ $t('取消') }}</span>
                </el-button>
            </div>

            <div v-else style="display: flex; justify-content: space-between; text-align: right">
                <el-button
                    :size="fontSizeObj.buttonSize"
                    :style="{ fontSize: fontSizeObj.baseFontSize }"
                    class="global-btn-main"
                    type="primary"
                    @click="onActions('edit')"
                >
                    <i class="ri-edit-line"></i>
                    <span>{{ $t('编辑') }}</span>
                </el-button>

                <div style="margin-left: 10px; display: flex">
                    <el-upload
                        :http-request="onActions('import')"
                        :show-file-list="false"
                        accept=".json"
                        style="display: block; margin: 0 15px"
                    >
                        <el-button
                            :size="fontSizeObj.buttonSize"
                            :style="{ fontSize: fontSizeObj.baseFontSize }"
                            class="global-btn-second"
                        >
                            <i class="ri-file-download-line"></i>
                            {{ $t('导入') }}
                        </el-button>
                    </el-upload>
                    <el-button
                        :size="fontSizeObj.buttonSize"
                        :style="{ fontSize: fontSizeObj.baseFontSize }"
                        class="global-btn-second"
                        @click="onActions('export')"
                    >
                        <i class="ri-file-upload-line" />
                        {{ $t('导出') }}
                    </el-button>
                    <el-button
                        v-loading.fullscreen.lock="loading"
                        :size="fontSizeObj.buttonSize"
                        :style="{ fontSize: fontSizeObj.baseFontSize }"
                        class="global-btn-second"
                        @click="
                            onActions(
                                'disabled',
                                currInfo.enabled
                                    ? $t('禁用') + '-' + currInfo.cnName
                                    : $t('启用') + '-' + currInfo.cnName
                            )
                        "
                    >
                        <i class="ri-user-unfollow-line"></i>
                        {{ currInfo.enabled ? $t('禁用') : $t('启用') }}
                    </el-button>
                </div>
            </div>
        </div>

        <systemInfo ref="systemInfoRef" :currInfo="currInfo" :isEditState="isEditState"></systemInfo>
    </y9Card>
</template>

<script lang="ts" setup>
    import { changeDisabled, systemSaveOrUpdate } from '@/api/frontFrame/system/index';
    import systemInfo from './systemInfo.vue';
    import { useI18n } from 'vue-i18n';
    import { inject } from 'vue';

    const { t } = useI18n();
    // 注入 字体对象
    const fontSizeObj: any = inject('sizeObjInfo');

    const props = defineProps({
        currInfo: {
            //当前tree节点信息
            type: Object,
            default: () => {
                return {};
            }
        },

        handAssginNode: Function //手动更新节点信息
    });

    //是否编辑
    const isEditState = ref(false);

    //监听节点信息
    watch(
        () => props.currInfo,
        (newVal) => {
            isEditState.value = false; //取消编辑状态
        },
        {
            deep: true,
            immediate: true
        }
    );

    //全局加载状态
    const loading = ref(false);
    //组织机构表单实例
    const systemInfoRef = ref();

    //操作按钮
    async function onActions(type, title?) {
        if (type == 'edit') {
            //编辑
            isEditState.value = true;
        } else if (type == 'save') {
            //保存

            loading.value = true; //启动全局加载

            let valid = await systemInfoRef.value?.y9FormRef?.elFormRef?.validate((valid) => valid); //获取表单验证结果
            if (valid) {
                const result = await systemSaveOrUpdate(systemInfoRef.value?.y9FormRef?.model);
                console.log('result', result);
                ElNotification({
                    title: result.success ? t('成功') : t('失败'),
                    message: result.msg,
                    type: result.success ? 'success' : 'error',
                    duration: 2000,
                    offset: 80
                });
                if (result.success) {
                    //修改后的数据更新到对应的树数据当中
                    await props.handAssginNode(result.data, props.currInfo.id); //手动更新节点到tree
                    console.log('props.currInfo', props.currInfo);
                    //取消编辑状态
                    isEditState.value = false;
                }
            }

            loading.value = false; //关闭全局加载
        } else if (type == 'disabled') {
            //禁用 | 取消禁用
            ElMessageBox.confirm(`${t('确定要')}${title}`, t('提示'), {
                confirmButtonText: t('确定'),
                cancelButtonText: t('取消'),
                type: 'info'
            })
                .then(async () => {
                    loading.value = true; //启动全局加载
                    let res = { success: false, msg: '' };
                    res = await changeDisabled(props.currInfo.id);
                    if (res.success) {
                        //修改后的数据更新到对应的树数据当中
                        await props.handAssginNode(
                            {
                                disabled: !props.currInfo.disabled
                            },
                            props.currInfo.id
                        ); //手动更新节点到tree
                    }
                    loading.value = false; //关闭全局加载
                    ElNotification({
                        title: res.success ? t('成功') : t('失败'),
                        message: res.msg,
                        type: res.success ? 'success' : 'error',
                        duration: 2000,
                        offset: 80
                    });
                })
                .catch(() => {
                    ElMessage({
                        type: 'info',
                        message: t('已取消') + title,
                        offset: 65
                    });
                });
        } else if (type == 'export') {
            //导出

            //在此接入接口
            console.log('导出按钮被点击了');
        } else if (type == 'import') {
            //导入
            //在此接入接口
            console.log('导入按钮被点击了');
        }
    }
</script>

<style lang="scss" scoped>
    .oth-btns {
        margin-bottom: 10px;

        :deep(.el-button) {
            margin-bottom: 10px;
        }
    }
</style>
