import Request from '@/api/lib/request';
//获取模拟的树数据
import { useGlobalStore } from '@/store/modules/globalStore';

const platformRequest = Request();

const globalStore = useGlobalStore();
const jobListData = globalStore.getJobList; //获取职位数据列表

//获取职位数据列表
export const jobList = async (params) => {
    //模拟返回假数据
    return new Promise((resolve) => {
        const res = {
            code: 0,
            data: jobListData,
            msg: '获取职位数据列表成功！',
            success: true
        };

        setTimeout(() => {
            resolve(res);
        }, 500);
    });
};

//排序
export const saveOrder = async (params) => {
    //模拟返回假数据
    return new Promise((resolve) => {
        const res = {
            code: 0,
            data: jobListData,
            msg: '排序成功！',
            success: true
        };

        setTimeout(() => {
            resolve(res);
        }, 500);
    });
};

//搜索
export const search = async (key) => {
    let data = jobListData.filter((item) => item.name.includes(key));

    //模拟返回假数据
    return new Promise((resolve) => {
        const res = {
            code: 0,
            data: data,
            msg: '获取数据成功！',
            success: true
        };

        setTimeout(() => {
            resolve(res);
        }, 500);
    });
};

//删除
export const removeJob = async (id) => {
    jobListData.forEach((item, index) => {
        if (item.id === id) {
            globalStore.$patch((state) => {
                state.jobList.splice(index, 1);
            });
        }
    });

    //模拟返回假数据
    return new Promise((resolve) => {
        const res = {
            code: 0,
            data: id,
            msg: '删除成功！',
            success: true
        };

        setTimeout(() => {
            resolve(res);
        }, 500);
    });
};

//添加/修改数据
export const saveUpdate = async (params) => {
    if (params.id) {
        for (let i = 0; i < jobListData.length; i++) {
            const item = jobListData[i];
            if (item.id === params.id) {
                Object.assign(item, params);
                break;
            }
        }
    } else {
        globalStore.$patch((state) => {
            params.id = jobListData[jobListData.length - 1].id + '1';
            state.jobList.push(params);
        });
    }

    //模拟返回假数据
    return new Promise((resolve) => {
        const res = {
            code: 0,
            data: params,
            msg: '保存成功！',
            success: true
        };

        setTimeout(() => {
            resolve(res);
        }, 500);
    });
};
