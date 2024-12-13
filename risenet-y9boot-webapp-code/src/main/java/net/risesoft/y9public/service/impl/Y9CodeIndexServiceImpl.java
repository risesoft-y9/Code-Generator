package net.risesoft.y9public.service.impl;

import lombok.RequiredArgsConstructor;
import net.risesoft.id.IdType;
import net.risesoft.id.Y9IdGenerator;
import net.risesoft.pojo.Y9Result;
import net.risesoft.y9.exception.Y9BusinessException;
import net.risesoft.y9.util.Y9BeanUtil;
import net.risesoft.y9public.entity.vo.Y9CodeIndex;
import net.risesoft.y9public.repository.Y9CodeFieldRepository;
import net.risesoft.y9public.repository.Y9CodeIndexRepository;
import net.risesoft.y9public.service.Y9CodeIndexService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
@Transactional(value = "rsPublicTransactionManager", readOnly = true)
public class Y9CodeIndexServiceImpl implements Y9CodeIndexService {

    private final Y9CodeIndexRepository codeIndexRepository;

    private final Y9CodeFieldRepository codeFieldRepository;

    @Override
    @Transactional(readOnly = true)
    public List<Y9CodeIndex> findByEntityId(String entityId) {
        return codeIndexRepository.getAllByCodeEntityIdOrderByUpdateTimeDesc(entityId);
    }

    @Override
    @Transactional(propagation = Propagation.SUPPORTS,readOnly = false,rollbackFor = Exception.class)
    public Y9CodeIndex saveOrUpdate(Y9CodeIndex y9CodeIndex) {

        boolean success = validateFieldIds(y9CodeIndex.getCodeEntityId(), y9CodeIndex.getIndexFields());
        if (!success) {
            throw new Y9BusinessException(500,"字段信息有误");
        }

        String id = y9CodeIndex.getId();
        if (StringUtils.isNotBlank(id)) {
            Optional<Y9CodeIndex> y9CodeOpt = codeIndexRepository.findById(id);
            if (y9CodeOpt.isPresent()) {
                Y9CodeIndex oldCodeIndex = y9CodeOpt.get();
                Y9BeanUtil.copyProperties(y9CodeIndex, oldCodeIndex);
                return codeIndexRepository.save(oldCodeIndex);
            }
        }
        y9CodeIndex.setId(Y9IdGenerator.genId(IdType.SNOWFLAKE));
        return codeIndexRepository.save(y9CodeIndex);
    }

    @Override
    @Transactional(propagation = Propagation.SUPPORTS,readOnly = false,rollbackFor = Exception.class)
    public List<Y9CodeIndex> saveIndexList(List<Y9CodeIndex> y9CodeIndexList) {
        y9CodeIndexList = y9CodeIndexList.stream().peek(item -> {
            if (StringUtils.isBlank(item.getId())) {
                item.setId(Y9IdGenerator.genId());
            }
        }).collect(Collectors.toList());
        return codeIndexRepository.saveAll(y9CodeIndexList);
    }

    @Override
    @Transactional(readOnly = true)
    public Boolean indexHasExists(String indexName, String codeEntityId) {
        return codeIndexRepository.indexExistsNumber(indexName, codeEntityId) > 0;
    }

    @Override
    @Transactional(propagation = Propagation.SUPPORTS,readOnly = false,rollbackFor = Exception.class)
    public Boolean deleteById(String id) {
        codeIndexRepository.deleteById(id);
        return true;
    }

    public boolean validateFieldIds(String codeEntityId,String indexFields){
        String[] fieldIds = indexFields.split(",");
        for (String fieldId : fieldIds) {
            Integer isExist = codeFieldRepository.countByCodeEntityIdAndAndId(codeEntityId, fieldId);
            if (isExist < 1){
                //error
                return false;
            }
        }
        //success
        return true;
    }
}
