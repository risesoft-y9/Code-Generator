package net.risesoft.${codeEntity.tenanted?string('', 'y9public.')}repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import net.risesoft.${codeEntity.tenanted?string('', 'y9public.')}entity.${codeEntity.name?cap_first};

/**
 * @description ${codeEntity.cnName} repository接口
 * @author ${codeEntity.isvName}
 * @date ${.now?string('yyyy-MM-dd')}
 */
@Repository
public interface ${codeEntity.name?cap_first}Repository extends JpaRepository<${codeEntity.name?cap_first},String>,JpaSpecificationExecutor<${codeEntity.name?cap_first}>{
}
