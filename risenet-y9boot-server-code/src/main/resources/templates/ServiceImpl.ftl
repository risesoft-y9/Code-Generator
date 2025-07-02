package net.risesoft.${codeEntity.tenanted?string('', 'y9public.')}service.impl;

import java.util.Arrays;

import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

import net.risesoft.id.IdType;
import net.risesoft.id.Y9IdGenerator;
import net.risesoft.pojo.Y9PageQuery;
import net.risesoft.${codeEntity.tenanted?string('', 'y9public.')}entity.${codeEntity.name?cap_first};
import net.risesoft.${codeEntity.tenanted?string('', 'y9public.')}repository.${codeEntity.name?cap_first}Repository;
import net.risesoft.${codeEntity.tenanted?string('', 'y9public.')}service.${codeEntity.name?cap_first}Service;
import net.risesoft.${codeEntity.tenanted?string('', 'y9public.')}repository.specification.${codeEntity.name?cap_first}Specification;
import net.risesoft.y9.util.Y9BeanUtil;

/**
 * @description ${codeEntity.cnName} Service接口实现
 * @author ${codeEntity.isvName}
 * @date ${.now?string('yyyy-MM-dd')}
 */
@Service
@RequiredArgsConstructor
@Transactional(value = "${codeEntity.tenanted?string('rsTenantTransactionManager', 'rsPublicTransactionManager')}", readOnly = true)
public class ${codeEntity.name?cap_first}ServiceImpl implements ${codeEntity.name?cap_first}Service {

    private final ${codeEntity.name?cap_first}Repository ${codeEntity.name?uncap_first}Repository;

    @Override
    public ${codeEntity.name?cap_first} findById(String id) {
        return ${codeEntity.name?uncap_first}Repository.findById(id).orElse(null);
    }

    @Override
    @Transactional(readOnly = false)
    public ${codeEntity.name?cap_first} saveOrUpdate(${codeEntity.name?cap_first} ${codeEntity.name?uncap_first}) {
        String id = ${codeEntity.name?uncap_first}.getId();
        if (StringUtils.isNotBlank(id)) {
            ${codeEntity.name?cap_first} old${codeEntity.name?cap_first} = this.findById(id);
            Y9BeanUtil.copyProperties(${codeEntity.name?uncap_first}, old${codeEntity.name?cap_first});
            return ${codeEntity.name?uncap_first}Repository.save(old${codeEntity.name?cap_first});
        }
        ${codeEntity.name?uncap_first}.setId(Y9IdGenerator.genId(IdType.SNOWFLAKE));
        return ${codeEntity.name?uncap_first}Repository.save(${codeEntity.name?uncap_first});
    }

    @Override
    @Transactional(readOnly = false)
    public void deleteById(String id) {
        ${codeEntity.name?uncap_first}Repository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = false)
    public void deleteByIds(String[] ids) {
        ${codeEntity.name?uncap_first}Repository.deleteAllById(Arrays.asList(ids));
    }

    @Override
    public Page<${codeEntity.name?cap_first}> page(int page, int rows) {
        Pageable pageable = PageRequest.of(page > 0 ? page - 1 : 0, rows, Sort.by(Sort.Direction.DESC, "createTime"));
        return ${codeEntity.name?uncap_first}Repository.findAll(pageable);
    }
    
    @Override
    public Page<${codeEntity.name?cap_first}> pageSearch(Y9PageQuery pageQuery, ${codeEntity.name?cap_first} ${codeEntity.name?uncap_first}) {
        ${codeEntity.name?cap_first}Specification<${codeEntity.name?cap_first}> specification = new ${codeEntity.name?cap_first}Specification<>(${codeEntity.name?uncap_first});
        Pageable pageable = PageRequest.of(pageQuery.getPage4Db(), pageQuery.getSize(), Sort.by(Sort.Direction.DESC, "createTime"));
        return ${codeEntity.name?uncap_first}Repository.findAll(specification, pageable);
    }
}