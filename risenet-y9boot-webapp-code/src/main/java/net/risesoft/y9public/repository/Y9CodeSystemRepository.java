package net.risesoft.y9public.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import net.risesoft.y9public.entity.Y9CodeSystem;

@Repository
public interface Y9CodeSystemRepository extends JpaRepository<Y9CodeSystem, String> {

    Page<Y9CodeSystem> findByEnvironmentAndTemplate(Pageable pageable, Integer environment, Integer template);

    Page<Y9CodeSystem> findByTemplate(Pageable pageable, Integer template);

    Page<Y9CodeSystem> findByEnvironmentOrTemplateOrderByTemplateDescCreateTimeDesc(Pageable pageable,
        Integer environment, Integer template);
}
