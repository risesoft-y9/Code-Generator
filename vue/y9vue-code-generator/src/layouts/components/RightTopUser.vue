<template>
    <div class="item">
        <i class="ri-map-pin-line"></i>
        <span>{{ deptName }}</span>
    </div>

    <div v-if="!userInfo" class="name" @click="(e) => e.preventDefault()">
        <!-- show & if 的vue指令 仅用于适配移动端 -->
        <div v-show="settingStore.getWindowWidth > 425">
            <span>访客</span>
        </div>
        <el-avatar
            v-if="settingStore.device === 'mobile'"
            :src="userInfo.avator ? userInfo.avator : ''"
            :style="{
                'font-size': fontSizeObj.baseFontSize,
                'background-color': 'var(--el-color-primary)',
                'margin-top': '8px'
            }"
        >
            {{ userInfo.loginName }}
        </el-avatar>
    </div>

    <div class="item" v-else>
        <i class="ri-user-line"></i>
        <!-- show & if 的vue指令 仅用于适配移动端 -->
        <div v-show="settingStore.getWindowWidth > 425">
            <template v-if="userInfo">
                <span>{{ userInfo.name }}</span>
            </template>
            <template v-else><span>访客</span></template>
        </div>
        <el-avatar
            v-if="settingStore.device === 'mobile'"
            :src="userInfo.avator ? userInfo.avator : ''"
            :style="{
                'font-size': fontSizeObj.baseFontSize,
                'background-color': 'var(--el-color-primary)',
                'margin-top': '8px'
            }"
        >
            {{ userInfo.loginName }}
        </el-avatar>
    </div>

    <div style="display: none">
        <el-dropdown :hide-on-click="true" class="user-el-dropdown" @command="onMenuClick">
            <div class="name" @click="(e) => e.preventDefault()">
                <!-- show & if 的vue指令 仅用于适配移动端 -->
                <div v-show="settingStore.getWindowWidth > 425">
                    <template v-if="userInfo">
                        <span>{{ $t(`${userInfo.name}`) }}</span>
                    </template>
                    <template v-else><span>访客</span></template>
                </div>

                <el-avatar
                    v-if="settingStore.device === 'mobile'"
                    :src="userInfo.avator ? userInfo.avator : ''"
                    :style="{
                        'font-size': fontSizeObj.baseFontSize,
                        'background-color': 'var(--el-color-primary)',
                        'margin-top': '8px'
                    }"
                >
                    {{ userInfo.loginName }}
                </el-avatar>
            </div>
            <template #dropdown>
                <el-dropdown-menu>
                    <!-- <el-dropdown-item command="personalCenter">
                        <div
                            :style="{ 'font-size': fontSizeObj.baseFontSize, 'line-height': fontSizeObj.lineHeight }"
                            class="el-dropdown-item"
                        >
                            <i class="ri-user-line"></i>{{ $t('个人中心') }}
                        </div>
                    </el-dropdown-item> -->

                    <el-divider style="padding-bottom: 5px; margin: 0px"></el-divider>
                    <el-dropdown-item command="logout">
                        <div
                            :style="{ 'font-size': fontSizeObj.baseFontSize, 'line-height': fontSizeObj.lineHeight }"
                            class="el-dropdown-item"
                        >
                            <i class="ri-logout-box-r-line"></i>{{ $t('退出') }}
                        </div>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>
<script lang="ts" setup>
    import { ref, watch, inject, defineComponent, onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import { useSettingStore } from '@/store/modules/settingStore';
    import y9_storage from '@/utils/storage';
    import { $y9_SSO } from '@/main';

    const settingStore = useSettingStore();
    // 注入 字体变量
    const fontSizeObj: any = inject('sizeObjInfo');
    const router = useRouter();
    // const personInfo = ref();
    // 获取当前登录用户信息
    const userInfo = y9_storage.getObjectItem('ssoUserInfo');
    // 点击菜单
    const onMenuClick = async (command: string) => {
        switch (command) {
            case 'personalCenter':
                router.push({ name: 'personInfo' });
                break;
            case 'signIn':
                break;
            case 'signOut':
                break;
            case 'changeDept':
                break;
            case 'logout':
                try {
                    // const loginOut = await this.$store.dispatch("user/logout");
                    const params = {
                        to: { path: window.location.pathname },
                        logoutUrl: import.meta.env.VUE_APP_SSO_LOGOUT_URL + import.meta.env.VUE_APP_NAME + '/',
                        __y9delete__: () => {
                            // 删除前执行的函数
                            console.log('删除前执行的函数');
                        }
                    };
                    $y9_SSO.ssoLogout(params);
                } catch (error) {
                    ElNotification({
                        title: '失败',
                        message: error.message || 'Has Error',
                        type: 'error',
                        duration: 2000,
                        offset: 80
                    });
                }
                break;

            default:
                break;
        }
    };

    const dn = userInfo?.dn;
    let deptName = ref('');

    onMounted(() => {
        if (dn.indexOf(',ou=') != -1) {
            deptName.value = dn.substring(dn.indexOf(',ou=') + 4);
            deptName.value = deptName.value.substring(0, deptName.value.indexOf(','));
        } else {
            deptName.value = dn.substring(dn.indexOf(',o=') + 3, dn.length);
        }
    });
</script>
<style lang="scss" scoped>
    @import '@/theme/global-vars.scss';
    .item {
        overflow: hidden;
        padding: 0 11px;
        min-width: 5px;
        color: var(--el-menu-text-color);
        cursor: pointer;
        display: flex;
        align-content: center;

        i {
            position: relative;
            font-size: v-bind('fontSizeObj.extraLargeFont');
            // top: 4px;
        }

        span {
            font-size: v-bind('fontSizeObj.baseFontSize');
            margin-left: 5px;
        }

        &:hover {
            border-bottom: 2px solid var(--el-border-color-light);
            color: var(--el-color-primary);
        }

        &:hover {
            cursor: pointer;
            border-bottom: none; // 鼠标划过或点击时不显示下划线
        }

        .name {
            color: var(--el-text-color-primary);
            display: flex;
            justify-content: center;
            align-items: center;

            & > div {
                display: flex;
                justify-content: end;

                span {
                    line-height: 20px;
                    text-align: end;
                }
            }

            i {
                line-height: 20px;
                top: 0px;
            }

            .badge {
                margin-left: 5px;
            }
        }

        /**当前岗位 */
        &.notify {
            .badge {
                z-index: 1;

                & > .el-badge__content--danger {
                    background-color: var(--el-color-danger);
                }
            }
        }
    }

    .user-el-dropdown {
        z-index: 9999;
        height: $headerHeight;

        :deep(.el-dropdown--default) {
            display: flex;
            align-items: center;
        }
    }

    .name {
        color: var(--el-text-color-primary);
        font-size: v-bind('fontSizeObj.baseFontSize');
        display: flex;

        & > div {
            display: flex;
            flex-direction: column;
            justify-content: center;

            span {
                line-height: 20px;
                text-align: end;
            }
        }

        i {
            color: var(--el-color-primary);
            font-size: 48px;
            margin-left: 8px;
        }
    }

    .el-dropdown-item {
        width: 100%;
        display: flex;
    }

    :focus-visible {
        outline: none; /* 为可见的焦点添加自定义样式 */
    }
</style>
