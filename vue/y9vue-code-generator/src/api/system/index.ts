import Request from '@/api/lib/request';
import SpecialRequest from '@/api/lib/specialRequest';

const systemRequest = Request();

const specialRequest = SpecialRequest();
// 系统列表
export const getSystemList = async (params) => {
    return await systemRequest({
        url: '/vue/rest/codeSystem/systemPage',
        method: 'GET',
        cType: false,
        params: params
    });
};

// 系统详情
export const getSystemInfo = async (params) => {
    return await systemRequest({
        url: '/vue/rest/codeSystem/findById',
        method: 'GET',
        cType: false,
        params: { id: params }
    });
};

// 新增系统
export const saveSystemList = async (params) => {
    return await specialRequest({
        url: '/vue/rest/codeSystem/saveCodeSystemList',
        method: 'POST',
        cType: false,
        data: params
    });
};

// 批量新增系统
export const saveSystem = async (params) => {
    return await systemRequest({
        url: '/vue/rest/codeSystem/saveOrUpdate',
        method: 'POST',
        cType: false,
        params: params
    });
};
// 删除系统
export const deleteSystem = async (params) => {
    return await systemRequest({
        url: '/vue/rest/codeSystem/deleteById',
        method: 'DELETE',
        cType: false,
        params: { id: params }
    });
};
