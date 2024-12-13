import Request from '@/api/lib/request';
//获取模拟的树数据
import { useGlobalStore } from '@/store/modules/globalStore';

const platformRequest = Request();

const globalStore = useGlobalStore();
const treeData = globalStore.getSystemTreeData; //获取模拟的树数据

// 树组件 - 一级接口数据
export const systemList = async (params) => {
    //模拟返回假数据
    return new Promise((resolve) => {
        const res = {
            code: 0,
            data: treeData,
            msg: '获取系统列表成功！',
            success: true
        };

        resolve(res);
    });
};

/**
 * 删除系统
 * @param {String} systemId
 * @returns
 */
export const removeSystem = async (systemId) => {
    return new Promise((resolve) => {
        const res = {
            code: 0,
            data: '',
            msg: '删除系统成功！',
            success: true
        };

        setTimeout(() => {
            resolve(res);
        }, 500);
    });
};

/**
 * 修改系统/新增系统
 * @param {} params
 * @returns
 */
export const systemSaveOrUpdate = async (params) => {
    if (params.id) {
        for (let i = 0; i < treeData.length; i++) {
            const item = treeData[i];
            if (item.id === params.id) {
                Object.assign(item, params);
                break;
            }
        }
    } else {
        globalStore.$patch((state) => {
            params.id = treeData[treeData.length - 1].id + '1';
            state.systemTreeData.push(params);
        });
    }

    return new Promise((resolve) => {
        const res = {
            code: 0,
            data: params,
            msg: '保存系统成功！',
            success: true
        };

        setTimeout(() => {
            resolve(res);
        }, 500);
    });
};

/**
 * 系统排序
 * @param {String} ids
 * @returns
 */
export const systemSaveOrder = async (ids) => {
    return new Promise((resolve) => {
        const res = {
            code: 0,
            data: '',
            msg: '系统排序成功！',
            success: true
        };

        setTimeout(() => {
            resolve(res);
        }, 500);
    });
};

/**
 * 设置禁用启用
 */
export const changeDisabled = async (id) => {
    return new Promise((resolve) => {
        const res = {
            code: 0,
            data: '',
            msg: '设置成功！',
            success: true
        };

        setTimeout(() => {
            resolve(res);
        }, 500);
    });
};

/**
 * 应用列表
 */
export const applicationList = async (params) => {
    let data = [];

    if (params.page == 1) {
        treeData.forEach((item) => {
            if (item.id === params.systemId) {
                data = item.appList || [];
            }
        });
    }

    return new Promise((resolve) => {
        const res = {
            code: 0,
            currPage: 1,
            msg: '操作成功',
            rows: data,
            success: true,
            total: data.length,
            totalPages: 1
        };

        setTimeout(() => {
            resolve(res);
        }, 500);
    });
};
