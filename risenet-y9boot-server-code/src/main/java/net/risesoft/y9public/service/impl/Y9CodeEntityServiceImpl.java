package net.risesoft.y9public.service.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
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
import net.risesoft.y9public.entity.vo.Y9CodeEntityVo;
import net.risesoft.y9public.repository.Y9CodeEntityRepository;
import net.risesoft.y9public.repository.Y9CodeFieldRepository;
import net.risesoft.y9public.service.Y9CodeEntityService;
import net.risesoft.y9public.util.CodeUtil;

@Service
@RequiredArgsConstructor
@Transactional(value = "rsPublicTransactionManager", readOnly = true)
public class Y9CodeEntityServiceImpl implements Y9CodeEntityService {

    private final Y9CodeEntityRepository y9CodeEntityRepository;
    private final Y9CodeFieldRepository y9CodeFieldRepository;

    @Override
    public Y9CodeEntity findById(String id) {
        Y9CodeEntity codeEntity = y9CodeEntityRepository.findById(id).orElse(null);
        if (null != codeEntity) {
            codeEntity.setTableName(CodeUtil.formatName(codeEntity.getName()));
        }
        return codeEntity;
    }

    @Override
    public List<Y9CodeEntity> findByCodeSystemId(String codeSystemId) {
        List<Y9CodeEntity> codeEntityList = y9CodeEntityRepository.findByCodeSystemIdOrderByCreateTimeAsc(codeSystemId);
        for (Y9CodeEntity codeEntity : codeEntityList) {
            codeEntity.setTableName(CodeUtil.formatName(codeEntity.getName()));
        }
        return codeEntityList;
    }

    @Override
    @Transactional(readOnly = false)
    public Y9CodeEntity saveOrUpdate(Y9CodeEntity y9CodeEntity) {
        String id = y9CodeEntity.getId();
        if (StringUtils.isNotBlank(id)) {
            Y9CodeEntity oldCodeEntity = this.findById(id);
            Y9BeanUtil.copyProperties(y9CodeEntity, oldCodeEntity);

            return y9CodeEntityRepository.save(oldCodeEntity);
        }
        UserInfo userInfo = Y9LoginUserHolder.getUserInfo();
        y9CodeEntity.setId(Y9IdGenerator.genId(IdType.SNOWFLAKE));
        y9CodeEntity.setIsvGuid(userInfo.getPersonId());
        y9CodeEntity.setIsvName(userInfo.getName());
        return y9CodeEntityRepository.save(y9CodeEntity);
    }

    @Override
    @Transactional(readOnly = false)
    public void deleteById(String id) {
        y9CodeEntityRepository.deleteById(id);
        y9CodeFieldRepository.deleteAllByCodeEntityId(id);
    }

    @Override
    @Transactional(readOnly = false)
    public void deleteByIds(String[] ids) {
        y9CodeEntityRepository.deleteAllById(Arrays.asList(ids));
    }

    @Override
    public Page<Y9CodeEntity> page(int page, int rows) {
        Pageable pageable = PageRequest.of(page > 0 ? page - 1 : 0, rows, Sort.by(Sort.Direction.DESC, "createTime"));

        return y9CodeEntityRepository.findAll(pageable);
    }

    @Override
    public Page<Y9CodeEntity> pageByCodeSystemId(String systemId, int page, int rows) {
        Pageable pageable = PageRequest.of(page > 0 ? page - 1 : 0, rows, Sort.by(Sort.Direction.DESC, "createTime"));

        return y9CodeEntityRepository.findByCodeSystemId(pageable, systemId);
    }

    @Override
    public Page<Y9CodeEntity> findByCodeSystemIdAndNameContaining(String codeSystemId, String name, int page,
        int rows) {
        Pageable pageable = PageRequest.of(page > 0 ? page - 1 : 0, rows, Sort.by(Sort.Direction.DESC, "createTime"));
        return y9CodeEntityRepository.findByCodeSystemIdAndNameContaining(pageable, codeSystemId, name);
    }

    @Override
    public List<Y9CodeEntityVo> getEntityAndField(String systemId) {
        List<Y9CodeEntityVo> y9CodeEntityVos = new ArrayList<>();
        List<Y9CodeEntity> y9CodeEntities = y9CodeEntityRepository.findByCodeSystemId(systemId);
        y9CodeEntities.forEach(y9CodeEntity -> {
            Y9CodeEntityVo y9CodeEntityVo = new Y9CodeEntityVo();
            BeanUtils.copyProperties(y9CodeEntity, y9CodeEntityVo);
            List<Y9CodeField> y9CodeFields =
                y9CodeFieldRepository.findByCodeEntityIdOrderByCreateTimeAsc(y9CodeEntityVo.getId());
            y9CodeEntityVo.setY9CodeFields(y9CodeFields);
            y9CodeEntityVos.add(y9CodeEntityVo);
        });
        return y9CodeEntityVos;
    }

}
