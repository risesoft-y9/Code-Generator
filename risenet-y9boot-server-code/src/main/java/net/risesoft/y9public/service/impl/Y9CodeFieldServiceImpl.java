package net.risesoft.y9public.service.impl;

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
import net.risesoft.y9.util.Y9BeanUtil;
import net.risesoft.y9public.entity.Y9CodeField;
import net.risesoft.y9public.repository.Y9CodeFieldRepository;
import net.risesoft.y9public.service.Y9CodeFieldService;
import net.risesoft.y9public.util.CodeUtil;

@Service
@RequiredArgsConstructor
@Transactional(value = "rsPublicTransactionManager", readOnly = true)
public class Y9CodeFieldServiceImpl implements Y9CodeFieldService {

    private final Y9CodeFieldRepository y9CodeFieldRepository;

    @Override
    public Y9CodeField findById(String id) {
        return y9CodeFieldRepository.findById(id).orElse(null);
    }

    @Override
    public List<Y9CodeField> findByCodeEntityId(String codeEntityId) {
        List<Y9CodeField> codeFieldList = y9CodeFieldRepository.findByCodeEntityIdOrderByCreateTimeAsc(codeEntityId);
        for (Y9CodeField codeField : codeFieldList) {
            codeField.setColumnName(CodeUtil.formatName(codeField.getName()));
        }
        return codeFieldList;
    }

    @Override
    public List<Y9CodeField> findByCodeEntityIdAndNameLike(String codeEntityId, String name) {
        List<Y9CodeField> codeFieldList =
            y9CodeFieldRepository.findByCodeEntityIdAndNameLikeOrderByCreateTimeAsc(codeEntityId, "%" + name + "%");
        for (Y9CodeField codeField : codeFieldList) {
            codeField.setColumnName(CodeUtil.formatName(codeField.getName()));
        }
        return codeFieldList;
    }

    @Override
    @Transactional(readOnly = false)
    public Y9CodeField saveOrUpdate(Y9CodeField y9CodeField) {
        String id = y9CodeField.getId();
        if (StringUtils.isNotBlank(id)) {
            Y9CodeField oldCodeField = this.findById(id);
            Y9BeanUtil.copyProperties(y9CodeField, oldCodeField);
            return y9CodeFieldRepository.save(oldCodeField);
        }
        y9CodeField.setId(Y9IdGenerator.genId(IdType.SNOWFLAKE));
        return y9CodeFieldRepository.save(y9CodeField);
    }

    @Override
    @Transactional(readOnly = false)
    public void deleteById(String id) {
        y9CodeFieldRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = false)
    public void deleteByIds(String[] ids) {
        y9CodeFieldRepository.deleteAllById(Arrays.asList(ids));
    }

    @Override
    public Page<Y9CodeField> page(int page, int rows) {
        Pageable pageable = PageRequest.of(page > 0 ? page - 1 : 0, rows, Sort.by(Sort.Direction.DESC, "createTime"));
        return y9CodeFieldRepository.findAll(pageable);
    }

    @Override
    public List<Y9CodeField> saveFieldList(List<Y9CodeField> y9CodeFields) {
        y9CodeFields = y9CodeFields.stream().map(field -> {
            if (StringUtils.isBlank(field.getId())) {
                field.setId(Y9IdGenerator.genId(IdType.SNOWFLAKE));
            }
            return field;
        }).collect(Collectors.toList());
        return y9CodeFieldRepository.saveAll(y9CodeFields);
    }
}
