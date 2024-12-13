/**
 * @description ${codeEntity.cnName}
 * @author ${codeEntity.isvName}
 * @date ${.now?string('yyyy-MM-dd')}
 */
import Request from "@/api/lib/request";
import qs from 'qs';
const ${codeEntity.name?uncap_first}Request = Request();

/**
 * 分页获取列表
 */
export const pageList = async ({ page, rows }) => {
    return await ${codeEntity.name?uncap_first}Request({
        url: "/vue/rest/${codeEntity.name?uncap_first}/page",
        method: 'GET',
        cType: false,
        params: { 'page': page, 'size': rows }
    });
}
/**
 * 按照名称搜索
 */
export const pageSearch = async ({ name, page, rows }) => {
    const params = {
        <#list codeFieldList as codeField>
        <#if codeField.fieldType == 'String'>
        '${codeField.name?uncap_first}':name,
        <#break>
        </#if>
        </#list>
        'page': page,
        'size': rows
    };
    return await ${codeEntity.name?uncap_first}Request({
url: "/vue/rest/${codeEntity.name?uncap_first}/pageSearch",
        method: 'GET',
        cType: false,
        params: params,
    });
};

/**
 * 保存新增/编辑
 * @param {*} params
 * @returns
 */
export const saveOrUpdate = async (params) => {
    const data = qs.stringify(params);
    return await ${codeEntity.name?uncap_first}Request({
        url: "/vue/rest/${codeEntity.name?uncap_first}/saveOrUpdate",
        method: 'POST',
        cType: false,
        data: data
    });
};

/**
 * @description 根据id删除对象
* @param {*} id
* @returns
 */
export const deleteById = async (id) => {
    const params = {
        id: id,
    };
    const data = qs.stringify(params);
    return await ${codeEntity.name?uncap_first}Request({
        url: "/vue/rest/${codeEntity.name?uncap_first}/deleteById",
        method: 'POST',
        cType: false,
        data: data,
    });
};

/**
 * @description 根据id数组删除对象
 * @param {*} ids
 * @returns
 */
export const deleteByIds = async (ids) => {
    const params = {
        ids: ids,
    };
    return await ${codeEntity.name?uncap_first}Request({
        url: '/vue/rest/${codeEntity.name?uncap_first}/deleteByIds',
        method: 'GET',
        cType: false,
        params: params
    });
};

/**
 *  @description 根据id获取对象
* @param {*} id
* @returns
 */
export const findById = async (id) => {
    return await ${codeEntity.name?uncap_first}Request({
        url: "/vue/rest/${codeEntity.name?uncap_first}/findById",
        method: 'GET',
        cType: false,
        params: { 'id': id },
    });
};