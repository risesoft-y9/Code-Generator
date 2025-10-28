package net.risesoft.y9public.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import net.risesoft.y9public.entity.vo.Y9CodeIndex;

@Repository
public interface Y9CodeIndexRepository extends JpaRepository<Y9CodeIndex, String> {
    List<Y9CodeIndex> getAllByCodeEntityIdOrderByUpdateTimeDesc(String entityId);

    @Query("select count(1) from Y9CodeIndex codeIndex where codeIndex.codeEntityId = :codeEntityId and codeIndex.indexName = :indexName")
    int indexExistsNumber(String indexName, String codeEntityId);
}
