package net.risesoft.y9public.repository;

import net.risesoft.y9public.entity.vo.Y9CodeIndex;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Y9CodeIndexRepository extends JpaRepository<Y9CodeIndex, String> {
    List<Y9CodeIndex> getAllByCodeEntityIdOrderByUpdateTimeDesc(String entityId);

    @Query("select count(1) from Y9CodeIndex codeIndex where codeIndex.codeEntityId = :codeEntityId and codeIndex.indexName = :indexName")
    int indexExistsNumber(String indexName,String codeEntityId);
}
