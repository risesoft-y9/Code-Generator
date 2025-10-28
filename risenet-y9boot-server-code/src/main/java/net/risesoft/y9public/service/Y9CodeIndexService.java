package net.risesoft.y9public.service;

import java.util.List;

import net.risesoft.y9public.entity.vo.Y9CodeIndex;

public interface Y9CodeIndexService {
    List<Y9CodeIndex> findByEntityId(String entityId);

    Y9CodeIndex saveOrUpdate(Y9CodeIndex y9CodeIndex);

    List<Y9CodeIndex> saveIndexList(List<Y9CodeIndex> y9CodeIndexList);

    Boolean indexHasExists(String indexName, String codeEntityId);

    Boolean deleteById(String id);
}
