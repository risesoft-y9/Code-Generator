package net.risesoft.y9public.controller;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

import net.risesoft.log.OperationTypeEnum;
import net.risesoft.log.annotation.RiseLog;
import net.risesoft.pojo.Y9Page;
import net.risesoft.pojo.Y9PageQuery;
import net.risesoft.pojo.Y9Result;
import net.risesoft.y9public.entity.Y9CodeEntity;
import net.risesoft.y9public.entity.Y9CodeField;
import net.risesoft.y9public.entity.Y9CodeSystem;
import net.risesoft.y9public.service.Y9CodeEntityService;
import net.risesoft.y9public.service.Y9CodeFieldService;
import net.risesoft.y9public.service.Y9CodeSystemService;
import net.risesoft.y9public.service.Y9FileStoreService;

@Validated
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/vue/rest/codeField", produces = "application/json")
public class Y9CodeFieldController {

    private final Y9CodeFieldService y9CodeFieldService;
    private final Y9FileStoreService y9FileStoreService;
    private final Y9CodeSystemService y9CodeSystemService;
    private final Y9CodeEntityService y9CodeEntityService;

    /**
     * @description 新增或者更新字段
     * @param y9CodeField
     * @return
     */
    @RiseLog(operationName = "新增或者更新字段")
    @PostMapping(value = "/saveOrUpdate")
    public Y9Result<Y9CodeField> saveOrUpdate(@Validated Y9CodeField y9CodeField) {
        Y9CodeField newCodeField = y9CodeFieldService.saveOrUpdate(y9CodeField);
        return Y9Result.success(newCodeField, "保存成功！");
    }

    /**
     * @description 新增多个字段
     * @param y9CodeFields
     * @return
     */
    @RiseLog(operationName = "新增或修改多个字段")
    @PostMapping(value = "/saveFieldList")
    public Y9Result<List<Y9CodeField>> saveFieldList(@Validated @RequestBody List<Y9CodeField> y9CodeFields) {
        List<Y9CodeField> newCodeField = y9CodeFieldService.saveFieldList(y9CodeFields);
        // 删除旧生成的代码
        if (!newCodeField.isEmpty()) {
            String codeEntityId = newCodeField.get(0).getCodeEntityId();
            Y9CodeEntity codeEntity = y9CodeEntityService.findById(codeEntityId);
            Y9CodeSystem codeSystem = y9CodeSystemService.findById(codeEntity.getCodeSystemId());
            if (StringUtils.isNotBlank(codeEntity.getFileStoreId())) {
                y9FileStoreService.deleteFile(codeEntity.getFileStoreId());
            }
            if (StringUtils.isNotBlank(codeSystem.getFileStoreId())) {
                y9FileStoreService.deleteFile(codeSystem.getFileStoreId());
            }
        }
        return Y9Result.success(newCodeField, "保存成功！");
    }

    /**
     * @description 根据唯一标示获取字段信息
     * @param id 字段唯一标示
     * @return
     */
    @RiseLog(operationName = "根据唯一标示获取字段信息")
    @GetMapping("/findById")
    public Y9Result<Y9CodeField> findById(@RequestParam String id) {
        Y9CodeField y9CodeField = y9CodeFieldService.findById(id);
        return Y9Result.success(y9CodeField, "获取成功！");
    }

    /**
     * @description 根据实体ID获取字段信息
     * @param entityId 实体唯一标示
     * @return
     */
    @RiseLog(operationName = "根据唯一标示获取字段信息")
    @GetMapping("/findByEntityId")
    public Y9Result<List<Y9CodeField>> findByEntityId(@RequestParam String entityId) {
        List<Y9CodeField> y9CodeFields = y9CodeFieldService.findByCodeEntityId(entityId);
        return Y9Result.success(y9CodeFields, "获取成功！");
    }

    /**
     * @description 根据实体ID和字段名称获取字段信息
     * @param entityId 实体唯一标示
     * @param name 字段名称
     * @return
     */
    @RiseLog(operationName = "根据唯一标示和字段名称获取字段信息")
    @GetMapping("/findByEntityIdAndName")
    public Y9Result<List<Y9CodeField>> findByEntityIdAndName(@RequestParam String entityId,
        @RequestParam(required = false) String name) {
        List<Y9CodeField> y9CodeFields = y9CodeFieldService.findByCodeEntityIdAndNameLike(entityId, name);
        return Y9Result.success(y9CodeFields, "获取成功！");
    }

    /**
     * @description 删除字段信息
     * @param id 字段唯一标示
     * @return
     */
    @RiseLog(operationType = OperationTypeEnum.DELETE, operationName = "删除字段信息")
    @DeleteMapping(value = "/deleteById")
    public Y9Result<String> deleteById(@RequestParam String id) {
        y9CodeFieldService.deleteById(id);
        return Y9Result.successMsg("删除成功！");
    }

    /**
     * @description 批量删除字段信息
     * @param ids 字段唯一标示集合
     * @return
     */
    @RiseLog(operationType = OperationTypeEnum.DELETE, operationName = "批量删除字段信息")
    @DeleteMapping(value = "/deleteByIds")
    public Y9Result<String> deleteByIds(@RequestParam String[] ids) {
        y9CodeFieldService.deleteByIds(ids);
        return Y9Result.successMsg("删除成功！");
    }

    /**
     * @description 分页获取字段信息
     * @param pageQuery 分页信息
     * @return
     */
    @RiseLog(operationName = "分页获取字段信息")
    @GetMapping("/page")
    public Y9Page<Y9CodeField> page(Y9PageQuery pageQuery) {
        Page<Y9CodeField> pageList = y9CodeFieldService.page(pageQuery.getPage(), pageQuery.getSize());
        return Y9Page.success(pageQuery.getPage(), pageList.getTotalPages(), pageList.getTotalElements(),
            pageList.getContent(), "获取成功！");
    }
}
