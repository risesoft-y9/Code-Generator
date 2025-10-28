package net.risesoft.y9public.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import net.risesoft.y9public.entity.Y9CodeField;

@Repository
public interface Y9CodeFieldRepository extends JpaRepository<Y9CodeField, String> {

    List<Y9CodeField> findByCodeEntityIdOrderByCreateTimeAsc(String codeEntityId);

    List<Y9CodeField> findByCodeEntityIdAndNameLikeOrderByCreateTimeAsc(String codeEntityId, String name);

    @Modifying
    @Transactional
    void deleteAllByCodeEntityId(String codeEntityId);

    @Modifying
    @Transactional
    void deleteAllByCodeEntityIdIn(List<String> codeEntityIds);

    Integer countByCodeEntityIdAndAndId(String codeEntityId, String id);
}
