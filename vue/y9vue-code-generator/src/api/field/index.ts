/*
 * @Author: yihong yihong@risesoft.net
 * @Date: 2023-07-28 16:59:40
 * @LastEditors: yihong yihong@risesoft.net
 * @LastEditTime: 2024-06-24 17:38:02
 * @FilePath: \y9vue-app\y9-vue\y9vue-code\src\api\field\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Request from '@/api/lib/request';
import Request2 from '@/api/lib/specialRequest';

const systemRequest = Request();
const specialRequest = Request2();

// 新增字段
export const saveFields = async (params) => {
    const data = JSON.stringify(params);
    return await specialRequest({
        url: '/vue/rest/codeField/saveFieldList',
        method: 'POST',
        cType: false,
        data: data
    });
};

// 根据实体Id查字段
export const getFieldsList = async (params) => {
    return await systemRequest({
        url: '/vue/rest/codeField/findByEntityId',
        method: 'GET',
        cType: false,
        params: { entityId: params }
    });
};

//根据实体Id和字段名称查字段
export const getFieldsSearchList = async (params, name) => {
    return await systemRequest({
        url: '/vue/rest/codeField/findByEntityIdAndName',
        method: 'GET',
        cType: false,
        params: { entityId: params, name: name }
    });
};

// 删除字段
export const deleteField = async (params) => {
    return await systemRequest({
        url: '/vue/rest/codeField/deleteById',
        method: 'DELETE',
        cType: false,
        params: { id: params }
    });
};

export const deleteFields = async (params) => {
    return await systemRequest({
        url: '/vue/rest/codeField/deleteByIds',
        method: 'DELETE',
        cType: false,
        params: { ids: params }
    });
};
