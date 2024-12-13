package net.risesoft.y9public.service;

import java.util.List;

import org.springframework.data.domain.Page;

import net.risesoft.y9public.entity.Y9CodeEntity;
import net.risesoft.y9public.entity.vo.Y9CodeEntityVo;

public interface Y9CodeEntityService {

    /**
     * @description 根据唯一标识查询实体
     *
     * @param: id 唯一标识
     * @return:
     */
    Y9CodeEntity findById(String id);

    /**
     * @description 根据系统唯一标识查询实体
     *
     * @param: codeSystemId 系统唯一标识
     * @return:
     */
    List<Y9CodeEntity> findByCodeSystemId(String codeSystemId);

    /**
     * @description 保存实体
     *
     * @param: y9CodeEntity 实体对象
     * @return:
     */
    Y9CodeEntity saveOrUpdate(Y9CodeEntity y9CodeEntity);

    /**
     * @description 根据唯一标识删除实体
     *
     * @param: id 唯一标识
     * @return:
     */
    void deleteById(String id);

    /**
     * @description 根据唯一标识数组批量删除实体
     *
     * @param: ids 唯一标识数组
     * @return:
     */
    void deleteByIds(String[] ids);

    /**
     * @description 分页查询
     *
     * @param: page 第几页
     * @param: rows 每页多少行
     * @return:
     */
    Page<Y9CodeEntity> page(int page, int rows);

    /**
     * @description 根据系统唯一标识分页查询
     *
     * @param: systemId
     * @param: page
     * @param: rows
     * @return:
     */
    Page<Y9CodeEntity> pageByCodeSystemId(String systemId, int page, int rows);

    /**
     * @description 根据系统唯一标识和实体名称模糊查询
     *
     * @param: codeSystemId
     * @param: name
     * @param: page
     * @param: rows
     * @return:
     */
    Page<Y9CodeEntity> findByCodeSystemIdAndNameContaining(String codeSystemId, String name, int page, int rows);

    /**
     * @description 根据系统唯一标识获取其所有实体及实体的所有字段
     *
     * @param: systemId
     * @return:
     */
    List<Y9CodeEntityVo> getEntityAndField(String systemId);

}
