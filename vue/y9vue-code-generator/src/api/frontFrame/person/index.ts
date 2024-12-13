import Request from '@/api/lib/request';
//获取模拟的树数据
import { useGlobalStore } from '@/store/modules/globalStore';

const platformRequest = Request();

const globalStore = useGlobalStore();
const treeData = globalStore.getOrgTreeData; //获取模拟的树数据

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
 * 保存人员信息
 * @param {*} params
 * @returns
 */
export const personSaveOrUpdate = async (params) => {
    return new Promise((resolve) => {
        const res = {
            code: 0,
            data: params,
            msg: '保存人员信息成功！',
            success: true
        };

        setTimeout(() => {
            resolve(res);
        }, 500);
    });
};

/**
 * 删除人员
 * @param {String} personId
 * @returns
 */
export const removePerson = async (personId) => {
    return new Promise((resolve) => {
        const res = {
            code: 0,
            data: '',
            msg: '删除人员成功！',
            success: true
        };

        setTimeout(() => {
            resolve(res);
        }, 500);
    });
};

/**
 * 设置扩展属性
 */
export const savePersonExtendProperties = async (id, properties) => {
    return new Promise((resolve) => {
        const res = {
            code: 0,
            data: '',
            msg: '设置扩展属性成功！',
            success: true
        };

        setTimeout(() => {
            resolve(res);
        }, 500);
    });
};

/**
 * 设置扩展属性
 */
export const resetPassword = async (id) => {
    return new Promise((resolve) => {
        const res = {
            code: 0,
            data: '',
            msg: '重置密码成功！',
            success: true
        };

        setTimeout(() => {
            resolve(res);
        }, 500);
    });
};

/**
 * 保存人员
 */
export const savePersons = async (id) => {
    return new Promise((resolve) => {
        const res = {
            code: 0,
            data: '',
            msg: '保存成功！',
            success: true
        };

        setTimeout(() => {
            resolve(res);
        }, 500);
    });
};

/**
 * 排序
 */
export const saveOrder = async (id) => {
    return new Promise((resolve) => {
        const res = {
            code: 0,
            data: '',
            msg: '排序成功！',
            success: true
        };

        setTimeout(() => {
            resolve(res);
        }, 500);
    });
};

/**
 * 移动
 */
export const movingPerson = async (id) => {
    return new Promise((resolve) => {
        const res = {
            code: 0,
            data: '',
            msg: '移动成功！',
            success: true
        };

        setTimeout(() => {
            resolve(res);
        }, 500);
    });
};
