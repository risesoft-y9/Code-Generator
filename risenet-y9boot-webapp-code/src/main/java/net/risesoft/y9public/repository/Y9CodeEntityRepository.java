package net.risesoft.y9public.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import net.risesoft.y9public.entity.Y9CodeEntity;

@Repository
public interface Y9CodeEntityRepository extends JpaRepository<Y9CodeEntity, String> {

    List<Y9CodeEntity> findByCodeSystemIdOrderByCreateTimeAsc(String codeSystemId);

    Page<Y9CodeEntity> findByCodeSystemId(Pageable pageable, String codeSystemId);

    List<Y9CodeEntity> findByCodeSystemId(String codeSystemId);

    Page<Y9CodeEntity> findByCodeSystemIdAndNameContaining(Pageable pageable, String codeSystemId, String name);
}
