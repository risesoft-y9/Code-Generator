import Request from "@/api/lib/request";
import Request2 from "@/api/lib/specialRequest";

const systemRequest = Request();
const specialRequest = Request2();


//保存索引列表
export const saveIndexList = async (params) => {
    const data = JSON.stringify(params);
    return await specialRequest({
        url: '/vue/rest/codeIndex/saveIndexList',
        method: 'POST',
        cType: false,
        data: data
    });
};

// 根据实体Id查字段
export const getIndexList = async (params) => {
    return await systemRequest({
        url: '/vue/rest/codeIndex/findByEntityId',
        method: 'GET',
        cType: false,
        params: {'codeEntityId': params}
    });
};
// 验证索引名称是否重复
export const verifyIndexName = async (indexName,codeEntityId) => {
    return await systemRequest({
        url: '/vue/rest/codeIndex/indexHasExists',
        method: 'GET',
        cType: false,
        params: {
            'codeEntityId': codeEntityId,
            'indexName': indexName
        }
    });
};
export const deleteIndex = async (id) => {
    return await systemRequest({
        url: '/vue/rest/codeIndex/deleteById',
        method: 'GET',
        cType: false,
        params: {
            'id': id,
        }
    });
};