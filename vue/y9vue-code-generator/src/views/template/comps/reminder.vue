<template>
    <y9Card :title="`${currInfo.name ? currInfo.name : ''}`">
        <div style="height: 213px">
            <el-alert
                :style="{ fontSize: fontSizeObj.baseFontSize }"
                :title="$t('请选择左侧树，选择系统再进行操作。')"
                type="warning"
            />
        </div>
    </y9Card>
</template>

<script lang="ts" setup>
    import { $deepAssignObject } from '@/utils/object';
    import { inject, ref, watch } from 'vue';
    // 注入 字体对象
    const fontSizeObj: any = inject('sizeObjInfo');
    const props = defineProps({
        currTreeNodeInfo: {
            //当前tree节点信息
            type: Object,
            default: () => {
                return {};
            }
        }
    });

    let currInfo = ref(props.currTreeNodeInfo);

    watch(
        () => props.currTreeNodeInfo,
        (newVal) => {
            currInfo.value = $deepAssignObject(currInfo.value, newVal);
        }
    );
</script>

<style lang="scss" scoped></style>
