import Request from "@/api/lib/request";

const systemRequest = Request();

export const getEntityList = async (params) => {
    return await systemRequest({
        url: '/vue/rest/codeEntity/codeSystemPage',
        method: 'GET',
        cType: false,
        params: params
    });
};
export const getEntityAndField = async (params) => {
    return await systemRequest({
        url: '/vue/rest/codeEntity/getEntityAndField',
        method: 'GET',
        cType: false,
        params: params
    });
};


export const getEntityInfo = async (params) => {
    return await systemRequest({
        url: '/vue/rest/codeEntity/findById',
        method: 'GET',
        cType: false,
        params: {'id': params}
    });
};

// 新增实体
export const saveEntity = async (params) => {
  return await systemRequest({
    url: '/vue/rest/codeEntity/saveOrUpdate',
    method: 'POST',
    cType: false,
    params: params
  })
}
// 删除实体
export const deleteEntity = async (params) => {
    return await systemRequest({
        url: '/vue/rest/codeEntity/deleteById',
        method: 'DELETE',
        cType: false,
        params: {id: params}
    });
};
//预览
export const previewEntity = async(params) =>{
    return await systemRequest({
        url: '/vue/code/entityPreview',
        method: 'POST',
        cType: false,
        params: {'codeEntityId': params}
    });
}









