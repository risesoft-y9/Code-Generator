package net.risesoft.y9public.controller;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.apache.commons.lang3.StringUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

import net.risesoft.log.annotation.RiseLog;
import net.risesoft.pojo.Y9Result;
import net.risesoft.y9.exception.Y9BusinessException;
import net.risesoft.y9public.entity.Y9CodeEntity;
import net.risesoft.y9public.entity.Y9CodeSystem;
import net.risesoft.y9public.entity.vo.Y9CodeIndex;
import net.risesoft.y9public.service.Y9CodeEntityService;
import net.risesoft.y9public.service.Y9CodeIndexService;
import net.risesoft.y9public.service.Y9CodeSystemService;
import net.risesoft.y9public.service.Y9FileStoreService;

@Validated
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/vue/rest/codeIndex", produces = "application/json")
public class Y9CodeIndexController {

    private final Y9CodeIndexService codeIndexService;

    private final Y9CodeEntityService codeEntityService;

    private final Y9CodeSystemService codeSystemService;

    private final Y9FileStoreService fileStoreService;

    @GetMapping("/findByEntityId")
    public Y9Result<List<Y9CodeIndex>> findByEntityId(@RequestParam String codeEntityId) {
        return Y9Result.success(codeIndexService.findByEntityId(codeEntityId));
    }

    @PostMapping("/saveOrUpdateIndex")
    public Y9Result<Y9CodeIndex> saveOrUpdateIndex(@Validated @RequestBody Y9CodeIndex y9CodeIndex) {
        Y9CodeIndex y9CodeIndexRes = codeIndexService.saveOrUpdate(y9CodeIndex);
        return Y9Result.success(y9CodeIndexRes);
    }

    @RiseLog(operationName = "新增或修改多个索引")
    @PostMapping(value = "/saveIndexList")
    public Y9Result<List<Y9CodeIndex>> saveFieldList(@Validated @RequestBody List<Y9CodeIndex> y9CodeIndexList) {

        Set<String> indexNameSet = y9CodeIndexList.stream().map(Y9CodeIndex::getIndexName).collect(Collectors.toSet());

        if (y9CodeIndexList.size() > indexNameSet.size()) {
            throw new Y9BusinessException(500, "索引名称重复");
        }

        List<Y9CodeIndex> newCodeIndex = codeIndexService.saveIndexList(y9CodeIndexList);

        // 删除旧生成的代码
        if (!newCodeIndex.isEmpty()) {
            String codeEntityId = newCodeIndex.get(0).getCodeEntityId();
            Y9CodeEntity codeEntity = codeEntityService.findById(codeEntityId);
            Y9CodeSystem codeSystem = codeSystemService.findById(codeEntity.getCodeSystemId());
            if (StringUtils.isNotBlank(codeEntity.getFileStoreId())) {
                fileStoreService.deleteFile(codeEntity.getFileStoreId());
            }
            if (StringUtils.isNotBlank(codeSystem.getFileStoreId())) {
                fileStoreService.deleteFile(codeSystem.getFileStoreId());
            }
        }
        return Y9Result.success(newCodeIndex, "保存成功！");
    }

    @GetMapping("/indexHasExists")
    public Y9Result<Boolean> indexHasExists(@RequestParam("indexName") String indexName,
        @RequestParam("codeEntityId") String codeEntityId) {
        return Y9Result.success(codeIndexService.indexHasExists(indexName, codeEntityId));
    }

    @GetMapping("/deleteById")
    public Y9Result<Boolean> deleteById(@RequestParam String id) {
        return Y9Result.success(codeIndexService.deleteById(id));
    }
}