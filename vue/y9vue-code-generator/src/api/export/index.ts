import Request from '@/api/lib/request';

const systemRequest = Request();

// 生成代码
export const generateCode = async (params) => {
    return await systemRequest({
        url: '/vue/code/system',
        method: 'POST',
        cType: false,
        params: { codeSystemId: params }
    });
};

// 生成代码
export const generateEntity = async (params) => {
    return await systemRequest({
        url: '/vue/code/entity',
        method: 'POST',
        cType: false,
        params: { codeEntityId: params }
    });
};

// 代码生成导出
export const download = async (params) => {
    return await systemRequest({
        url: '/vue/download/system',
        responseType: 'blob',
        method: 'GET',
        cType: false,
        params: { codeSystemId: params }
    });
};
// 代码生成导出
export const downloadEntity = async (params) => {
    return await systemRequest({
        url: '/vue/download/entity',
        responseType: 'blob',
        method: 'GET',
        cType: false,
        params: { codeEntityId: params }
    });
};
