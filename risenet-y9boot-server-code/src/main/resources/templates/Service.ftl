package net.risesoft.${codeEntity.tenanted?string('', 'y9public.')}service;

import org.springframework.data.domain.Page;

import net.risesoft.${codeEntity.tenanted?string('', 'y9public.')}entity.${codeEntity.name?cap_first};
import net.risesoft.pojo.Y9PageQuery;

/**
 * @description ${codeEntity.cnName} Service接口
 * @author ${codeEntity.isvName}
 * @date ${.now?string('yyyy-MM-dd')}
 */
public interface ${codeEntity.name?cap_first}Service {

    /**
     * @description 根据唯一标示查找
     * @param id 唯一标示
     * @return
     */
    ${codeEntity.name?cap_first} findById(String id);

    /**
     * @description 新增或者更新
     * @param ${codeEntity.name?uncap_first}
     * @return
     */
    ${codeEntity.name?cap_first} saveOrUpdate(${codeEntity.name?cap_first} ${codeEntity.name?uncap_first});

    /**
     * @description 根据唯一标示删除
     * @param id 唯一标示
     */
    void deleteById(String id);

    /**
     * @description 批量删除
     * @param ids 唯一标示数组
     */
    void deleteByIds(String[] ids);

    /**
     * @description 分页获取
     *
     * @param page 第几页
     * @param rows 每页多少行
     * @return
     */
    Page<${codeEntity.name?cap_first}> page(int page, int rows);

    /**
     * @description 根据名字分页查询
     *
     * @param pageQuery 分页信息
     * @param ${codeEntity.name?uncap_first}
     * @return
     */
    Page<${codeEntity.name?cap_first}> pageSearch(Y9PageQuery pageQuery, ${codeEntity.name?cap_first} ${codeEntity.name?uncap_first});
}
