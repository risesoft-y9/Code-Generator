<template>
    <div class="item">
        <el-link type="primary" @click="handJump('org')">组织架构</el-link>
        <p>
            1.需要进入此项目，复制src/components/pageModule文件夹，粘贴到自己项目的src/components目录下。（此操作是因为页面依赖此组件）</p
        >
        <p>2.需要进入此项目，复制views/classicLayout/org文件夹，org文件夹就是这个页面的代码</p>
    </div>

    <div class="item">
        <el-link type="primary" @click="handJump('system')">应用系统管理</el-link>
        <p>
            1.需要进入此项目，复制src/components/pageModule文件夹，粘贴到自己项目的src/components目录下。（此操作是因为页面依赖此组件）</p
        >
        <p>2.需要进入此项目，复制views/classicLayout/system文件夹，system文件夹就是这个页面的代码</p>
    </div>

    <div class="item">
        <el-link type="primary" @click="handJump('job')">职位管理</el-link>
        <p>1.需要进入此项目，复制views/classicLayout/job文件夹，job文件夹就是这个页面的代码</p>
    </div>

    <div class="item">
        <el-link type="primary" @click="handJump('loginLog')">登录日志</el-link>
        <p>1.需要进入此项目，复制views/classicLayout/loginLog文件夹，loginLog文件夹就是这个页面的代码</p>
    </div>
</template>

<script lang="ts" setup>
    import router from '@/router/index';
    import { inject } from 'vue';
    // 注入 字体对象
    const fontSizeObj: any = inject('sizeObjInfo');

    //手动跳转路由
    function handJump(type) {
        router.push('/' + type);
    }
</script>

<style lang="scss" scoped>
    .item {
        margin-bottom: 60px;
        font-size: v-bind('fontSizeObj.largeFontSize');

        p {
            font-size: v-bind('fontSizeObj.baseFontSize');
        }

        :deep(.el-link__inner) {
            font-size: v-bind('fontSizeObj.largeFontSize');
        }
    }
</style>
