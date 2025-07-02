package net.risesoft.y9public.service.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

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
import net.risesoft.model.user.UserInfo;
import net.risesoft.y9.Y9LoginUserHolder;
import net.risesoft.y9.util.Y9BeanUtil;
import net.risesoft.y9public.entity.Y9CodeEntity;
import net.risesoft.y9public.entity.Y9CodeField;
import net.risesoft.y9public.entity.Y9CodeSystem;
import net.risesoft.y9public.repository.Y9CodeEntityRepository;
import net.risesoft.y9public.repository.Y9CodeFieldRepository;
import net.risesoft.y9public.repository.Y9CodeSystemRepository;
import net.risesoft.y9public.service.Y9CodeSystemService;

@Service
@RequiredArgsConstructor
@Transactional(value = "rsPublicTransactionManager", readOnly = true)
public class Y9CodeSystemServiceImpl implements Y9CodeSystemService {

    private final Y9CodeSystemRepository y9CodeSystemRepository;
    private final Y9CodeEntityRepository y9CodeEntityRepository;
    private final Y9CodeFieldRepository y9CodeFieldRepository;

    @Override
    public Y9CodeSystem findById(String id) {
        return y9CodeSystemRepository.findById(id).orElse(null);
    }

    /**
     * @return
     * @description 获取所有系统
     */
    @Override
    public List<Y9CodeSystem> list() {
        return y9CodeSystemRepository.findAll();
    }

    @Override
    @Transactional(readOnly = false)
    public Y9CodeSystem saveOrUpdate(Y9CodeSystem y9CodeSystem) {
        String id = y9CodeSystem.getId();
        if (StringUtils.isNotBlank(id)) {
            Y9CodeSystem oldCodeSystem = this.findById(id);
            Y9BeanUtil.copyProperties(y9CodeSystem, oldCodeSystem);
            String upperCase = y9CodeSystem.getTablePrefix().toUpperCase();
            y9CodeSystem.setTablePrefix(upperCase);
            return y9CodeSystemRepository.save(y9CodeSystem);
        }
        // 表前缀转为大写
        String upperCase = y9CodeSystem.getTablePrefix().toUpperCase();
        y9CodeSystem.setTablePrefix(upperCase);
        UserInfo userInfo = Y9LoginUserHolder.getUserInfo();
        y9CodeSystem.setId(Y9IdGenerator.genId(IdType.SNOWFLAKE));
        y9CodeSystem.setIsvGuid(userInfo.getPersonId());
        y9CodeSystem.setIsvName(userInfo.getName());
        return y9CodeSystemRepository.save(y9CodeSystem);
    }

    @Override
    @Transactional(readOnly = false)
    public void deleteById(String id) {
        y9CodeSystemRepository.deleteById(id);
        // 删除所有关联数据
        List<Y9CodeEntity> y9CodeEntities = y9CodeEntityRepository.findByCodeSystemId(id);
        List<String> entityIds = y9CodeEntities.stream().map(Y9CodeEntity::getId).collect(Collectors.toList());
        y9CodeEntityRepository.deleteAllById(entityIds);
        y9CodeFieldRepository.deleteAllByCodeEntityIdIn(entityIds);
    }

    @Override
    @Transactional(readOnly = false)
    public void deleteByIds(String[] ids) {
        y9CodeSystemRepository.deleteAllById(Arrays.asList(ids));
    }

    @Override
    public Page<Y9CodeSystem> page(int page, int rows) {
        Pageable pageable = PageRequest.of(page > 0 ? page - 1 : 0, rows, Sort.by(Sort.Direction.DESC, "createTime"));
        return y9CodeSystemRepository.findAll(pageable);
    }

    @Override
    public Page<Y9CodeSystem> page(int page, int rows, Integer environment, Integer template) {
        template = template == null ? 0 : template;
        Pageable pageable = PageRequest.of(page > 0 ? page - 1 : 0, rows, Sort.by(Sort.Direction.DESC, "createTime"));
        // 系统管理员能查出模板系统
        if (Y9LoginUserHolder.getUserInfo().isGlobalManager()
            && template == Y9CodeSystem.SystemType.NOT_TEMPLATE.getValue()) {
            return y9CodeSystemRepository.findByEnvironmentOrTemplateOrderByTemplateDescCreateTimeDesc(pageable,
                environment, Y9CodeSystem.SystemType.IS_TEMPLATE.getValue());
        }
        // 查出所有模板
        if (environment == null) {
            return y9CodeSystemRepository.findByTemplate(pageable, template);
        }
        return y9CodeSystemRepository.findByEnvironmentAndTemplate(pageable, environment, template);
    }

    /**
     * @param y9CodeSystemList 系统
     * @return
     * @description 批量保存系统
     */
    @Override
    @Transactional
    public List<Y9CodeSystem> saveCodeSystemList(List<Y9CodeSystem> y9CodeSystemList) {
        UserInfo userInfo = Y9LoginUserHolder.getUserInfo();
        List<Y9CodeEntity> codeEntities = new ArrayList<>();
        for (Y9CodeSystem y9CodeSystem : y9CodeSystemList) {
            List<Y9CodeEntity> y9CodeEntities = y9CodeEntityRepository.findByCodeSystemId(y9CodeSystem.getId());
            y9CodeSystem.setTemplate(0);
            y9CodeSystem.setId(Y9IdGenerator.genId(IdType.SNOWFLAKE));
            y9CodeSystem.setIsvGuid(userInfo.getPersonId());
            y9CodeSystem.setIsvName(userInfo.getName());

            List<Y9CodeEntity> afterY9CodeEntity = updateY9CodeEntities(y9CodeEntities, y9CodeSystem.getId());
            codeEntities.addAll(afterY9CodeEntity);
        }

        y9CodeEntityRepository.saveAll(codeEntities);

        return y9CodeSystemRepository.saveAll(y9CodeSystemList);
    }

    private List<Y9CodeEntity> updateY9CodeEntities(List<Y9CodeEntity> y9CodeEntities, String y9CodeSystemId) {
        UserInfo userInfo = Y9LoginUserHolder.getUserInfo();
        List<Y9CodeField> y9CodeFieldList = new ArrayList<>();
        for (Y9CodeEntity y9CodeEntity : y9CodeEntities) {
            List<Y9CodeField> y9CodeFields =
                y9CodeFieldRepository.findByCodeEntityIdOrderByCreateTimeAsc(y9CodeEntity.getId());
            y9CodeEntity.setId(Y9IdGenerator.genId(IdType.SNOWFLAKE));
            y9CodeEntity.setIsvGuid(userInfo.getPersonId());
            y9CodeEntity.setIsvName(userInfo.getName());
            y9CodeEntity.setCodeSystemId(y9CodeSystemId);

            List<Y9CodeField> afterCodeFields = updateY9CodeFields(y9CodeFields, y9CodeEntity.getId());
            y9CodeFieldList.addAll(afterCodeFields);
        }
        y9CodeFieldRepository.saveAll(y9CodeFieldList);

        return y9CodeEntities;
    }

    private List<Y9CodeField> updateY9CodeFields(List<Y9CodeField> y9CodeFields, String codeEntityId) {
        for (Y9CodeField y9CodeField : y9CodeFields) {
            y9CodeField.setId(Y9IdGenerator.genId(IdType.SNOWFLAKE));
            y9CodeField.setCodeEntityId(codeEntityId);
        }
        return y9CodeFields;
    }

}
