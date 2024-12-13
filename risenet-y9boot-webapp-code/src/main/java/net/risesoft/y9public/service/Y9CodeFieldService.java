package net.risesoft.y9public.service;

import java.util.List;

import org.springframework.data.domain.Page;

import net.risesoft.y9public.entity.Y9CodeField;

public interface Y9CodeFieldService {

    /**
     * @description 根据 id 查询
     *
     * @param: id 唯一标识
     * @return:
     */
    Y9CodeField findById(String id);

    /**
     * @description 根据实体 id 查询
     *
     * @param: codeEntityId 实体 id
     * @return:
     */
    List<Y9CodeField> findByCodeEntityId(String codeEntityId);

    /**
     * @description 根据实体 id 和名称模糊查询
     *
     * @param: codeEntityId 实体 id
     * @param: name 名称
     * @return:
     */
    List<Y9CodeField> findByCodeEntityIdAndNameLike(String codeEntityId, String name);

    /**
     * @description 更新或保存
     *
     * @param: y9CodeField 字段
     * @return:
     */
    Y9CodeField saveOrUpdate(Y9CodeField y9CodeField);

    /**
     * @description 根据唯一标识删除
     *
     * @param: id 唯一标识
     * @return:
     */
    void deleteById(String id);

    /**
     * @description 根据唯一标识数组批量删除
     *
     * @param: ids 唯一标识数组
     * @return:
     */
    void deleteByIds(String[] ids);

    /**
     * @description 分页查询
     *
     * @param page 第几页
     * @param rows 每页多少行
     * @return:
     */
    Page<Y9CodeField> page(int page, int rows);

    /**
     * @description 批量保存字段
     *
     * @param: y9CodeFields 字段集合
     * @return:
     */
    List<Y9CodeField> saveFieldList(List<Y9CodeField> y9CodeFields);
}
