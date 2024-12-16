package net.risesoft.y9public.service;

import java.util.List;

import org.springframework.data.domain.Page;

import net.risesoft.y9public.entity.Y9CodeSystem;

/**
 *
 * @author qinman
 * @date 2023/05/11
 */
public interface Y9CodeSystemService {

    /**
     * @description 根据唯一标示查找
     * @param id 唯一标示
     * @return
     */
    Y9CodeSystem findById(String id);

    /**
     * @description 获取所有系统
     * @return
     */
    List<Y9CodeSystem> list();

    /**
     * @description 新增或者更新
     * @param y9CodeSystem
     * @return
     */
    Y9CodeSystem saveOrUpdate(Y9CodeSystem y9CodeSystem);

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
    Page<Y9CodeSystem> page(int page, int rows);


    /**
     * @description 分页获取
     *
     * @param page 第几页
     * @param rows 每页多少行
     * @param environment 系统环境
     * @param template 是否模板
     * @return
     */
    Page<Y9CodeSystem> page(int page, int rows, Integer environment, Integer template);

    /**
     * @description 批量保存系统
     *
     * @param y9CodeSystemList 系统
     * @return
     */
    List<Y9CodeSystem> saveCodeSystemList(List<Y9CodeSystem> y9CodeSystemList);

}
