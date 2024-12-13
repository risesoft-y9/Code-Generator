import Request from '@/api/lib/request';
//获取模拟的树数据
import { useGlobalStore } from '@/store/modules/globalStore';

const platformRequest = Request();

const globalStore = useGlobalStore();
const treeData = globalStore.getOrgTreeData; //获取模拟的树数据

// 树组件 - 一级接口数据
export const treeInterface = async (params) => {
    //模拟返回假数据
    return new Promise((resolve) => {
        const data = JSON.parse(JSON.stringify(treeData)).map((item) => {
            delete item.children;
            return item;
        });
        const res = {
            code: 0,
            data: data,
            msg: '获取组织架构列表成功！',
            success: true
        };

        resolve(res);
    });
    // return await platformRequest({
    //   url: '/api/rest/org/list',
    //   method: 'get',
    //   cType: false,
    //   params: {}
    // });
};
// 树组件 - 二（三）级接口数据
export const getTreeItemById = async (params) => {
    //模拟返回假数据
    return new Promise((resolve) => {
        let data = [];

        treeData.forEach((item) => {
            if (item.id === params.parentId) {
                data = item.children;
            }
        });
        const res = {
            code: 0,
            data: data,
            msg: '获取组织架构列表成功！',
            success: true
        };

        setTimeout(() => {
            resolve(res);
        }, 500);
    });

    // return await platformRequest({
    //   url: "/api/rest/org/getTree",
    //   method: 'get',
    //   cType: false,
    //   params: {
    //     id:params.parentId,
    //     treeType:params.treeType,
    //     disabled:params.disabled
    //  }
    // });
};

// 树组件 - 搜索接口
export const searchByName = async (params) => {
    //模拟返回假数据
    return new Promise((resolve) => {
        let data = [];

        const findNode = (treeData, targetId) => {
            let node = null;

            const fn = (treeData2, targetId) => {
                for (let i = 0; i < treeData2.length; i++) {
                    const item = treeData2[i];
                    if (item.id == targetId) {
                        node = JSON.parse(JSON.stringify(item));
                        break;
                    } else if (item.children && item.children.length > 0) {
                        fn(item.children, targetId);
                    }
                }
            };
            fn(treeData, targetId);

            return node;
        };
        const diguiSearch = (treeData2) => {
            for (let i = 0; i < treeData2.length; i++) {
                const item = treeData2[i];
                if (item.name.indexOf(params.key) > -1) {
                    const node = JSON.parse(JSON.stringify(item));
                    if (item.parentId) {
                        const parentNode = findNode(treeData, item.parentId);
                        if (parentNode) {
                            data.push(parentNode);
                        }
                    }

                    data.push(node);
                }
                if (item.children && item.children.length > 0) {
                    diguiSearch(item.children);
                }
            }
        };

        diguiSearch(treeData);

        const res = {
            code: 0,
            data: data,
            msg: '获取组织架构列表成功！',
            success: true
        };

        setTimeout(() => {
            resolve(res);
        }, 500);
    });

    // return await platformRequest({
    //   url: "/api/rest/org/treeSearch",
    //   method: 'GET',
    //   cType: false,
    //   params: { 'name': params.key, 'treeType': params.treeType },
    // });
};

/**
 * 保存组织机构信息
 * @param {*} params
 * @returns
 */
export const orgSaveOrUpdate = async (params) => {
    return new Promise((resolve) => {
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
                params.orgType = 'Organization';
                state.orgTreeData.push(params);
            });
        }

        const res = {
            code: 0,
            data: params,
            msg: '保存组织架构成功！',
            success: true
        };

        setTimeout(() => {
            resolve(res);
        }, 500);
    });
};

/**
 * 删除机构
 * @param {String} orgId
 * @returns
 */
export const removeOrg = async (orgId) => {
    return new Promise((resolve) => {
        const res = {
            code: 0,
            data: '',
            msg: '删除组织架构成功！',
            success: true
        };

        setTimeout(() => {
            resolve(res);
        }, 500);
    });

    // return await platformRequest({
    //   url: "/api/rest/org/remove",
    //   method: 'POST',
    //   cType: false,
    //   params: { "orgId": orgId },
    // });
};

/**
 * 设置扩展属性
 */
export const saveOrgExtendProperties = async (id, properties) => {
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
 * 数据同步
 */
export const sync = async (id, properties) => {
    return new Promise((resolve) => {
        const res = {
            code: 0,
            data: '',
            msg: '数据同步成功！',
            success: true
        };

        setTimeout(() => {
            resolve(res);
        }, 500);
    });
};

/**
 * 组织机构排序
 */
export const saveOrder = async () => {
    return new Promise((resolve) => {
        const res = {
            code: 0,
            data: '',
            msg: '组织机构排序成功！',
            success: true
        };

        setTimeout(() => {
            resolve(res);
        }, 500);
    });
};

/**
 * 获取人员列表
 */
export const getPersonsByParentId = async (id) => {
    return new Promise((resolve) => {
        let data = [];
        treeData.forEach((item) => {
            if (item.id === id) {
                data = item.children?.filter((item) => item.orgType === 'Person');
            }
        });

        const res = {
            code: 0,
            data: data,
            msg: '获取人员列表成功！',
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
export const savePersons = async (id, properties) => {
    return new Promise((resolve) => {
        const res = {
            code: 0,
            data: '',
            msg: '保存人员成功！',
            success: true
        };

        setTimeout(() => {
            resolve(res);
        }, 500);
    });
};
