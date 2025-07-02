package net.risesoft.y9public.controller;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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
import net.risesoft.y9public.entity.Y9CodeSystem;
import net.risesoft.y9public.entity.vo.Y9CodeEntityVo;
import net.risesoft.y9public.service.Y9CodeEntityService;
import net.risesoft.y9public.service.Y9CodeSystemService;
import net.risesoft.y9public.service.Y9FileStoreService;

@Validated
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/vue/rest/codeEntity", produces = "application/json")
public class Y9CodeEntityController {

    private final Y9CodeEntityService y9CodeEntityService;
    private final Y9FileStoreService y9FileStoreService;
    private final Y9CodeSystemService y9CodeSystemService;

    /**
     * @description 新增或者更新实体
     * @param y9CodeEntity
     * @return
     */
    @RiseLog(operationName = "新增或者更新实体")
    @PostMapping(value = "/saveOrUpdate")
    public Y9Result<Y9CodeEntity> saveOrUpdate(@Validated Y9CodeEntity y9CodeEntity) {
        Y9CodeEntity newCodeEntity = y9CodeEntityService.saveOrUpdate(y9CodeEntity);
        Y9CodeSystem codeSystem = y9CodeSystemService.findById(newCodeEntity.getCodeSystemId());
        // 删除旧生成的代码
        if (StringUtils.isNotBlank(newCodeEntity.getFileStoreId())) {
            y9FileStoreService.deleteFile(newCodeEntity.getFileStoreId());
        }
        if (StringUtils.isNotBlank(codeSystem.getFileStoreId())) {
            y9FileStoreService.deleteFile(codeSystem.getFileStoreId());
        }
        return Y9Result.success(newCodeEntity, "保存成功！");
    }

    /**
     * @description 根据唯一标示获取实体信息
     * @param id 实体唯一标示
     * @return
     */
    @RiseLog(operationName = "根据唯一标示获取实体信息")
    @GetMapping("/findById")
    public Y9Result<Y9CodeEntity> findById(@RequestParam String id) {
        Y9CodeEntity y9CodeEntity = y9CodeEntityService.findById(id);
        return Y9Result.success(y9CodeEntity, "获取成功！");
    }

    /**
     * @description 删除实体信息
     * @param id 实体唯一标示
     * @return
     */
    @RiseLog(operationType = OperationTypeEnum.DELETE, operationName = "删除实体信息")
    @DeleteMapping(value = "/deleteById")
    public Y9Result<String> deleteById(@RequestParam String id) {
        y9CodeEntityService.deleteById(id);
        return Y9Result.successMsg("删除成功！");
    }

    /**
     * @description 批量删除实体信息
     * @param ids 实体唯一标示集合
     * @return
     */
    @RiseLog(operationType = OperationTypeEnum.DELETE, operationName = "批量删除实体信息")
    @DeleteMapping(value = "/deleteByIds")
    public Y9Result<String> deleteByIds(@RequestParam String[] ids) {
        y9CodeEntityService.deleteByIds(ids);
        return Y9Result.successMsg("批量删除成功！");
    }

    /**
     * @description 分页获取实体信息
     * @param pageQuery 分页信息
     * @return
     */
    @RiseLog(operationName = "分页获取实体信息")
    @GetMapping("/page")
    public Y9Page<Y9CodeEntity> page(Y9PageQuery pageQuery) {
        Page<Y9CodeEntity> pageList = y9CodeEntityService.page(pageQuery.getPage(), pageQuery.getSize());
        return Y9Page.success(pageQuery.getPage(), pageList.getTotalPages(), pageList.getTotalElements(),
            pageList.getContent(), "获取成功！");
    }

    /**
     * @description 分页获取当前系统下的实体信息
     * @param pageQuery 分页信息
     * @return
     */
    @RiseLog(operationName = "分页获取实体信息")
    @GetMapping("/codeSystemPage")
    public Y9Page<Y9CodeEntity> codeEntityPage(Y9PageQuery pageQuery, @RequestParam String systemId,
        @RequestParam(required = false) String name) {
        Page<Y9CodeEntity> pageList;
        if (StringUtils.isEmpty(name)) {
            pageList = y9CodeEntityService.pageByCodeSystemId(systemId, pageQuery.getPage(), pageQuery.getSize());
        } else {
            pageList = y9CodeEntityService.findByCodeSystemIdAndNameContaining(systemId, name, pageQuery.getPage(),
                pageQuery.getSize());
        }
        return Y9Page.success(pageQuery.getPage(), pageList.getTotalPages(), pageList.getTotalElements(),
            pageList.getContent(), "获取成功！");
    }

    /**
     * @description 获取实体及其字段信息
     * @param systemId 系统Id
     * @return
     */
    @RiseLog(operationName = "获取实体及其字段信息")
    @GetMapping("/getEntityAndField")
    public Y9Result<List<Y9CodeEntityVo>> getEntityAndField(@RequestParam String systemId) {
        List<Y9CodeEntityVo> y9CodeEntityVos = y9CodeEntityService.getEntityAndField(systemId);
        return Y9Result.success(y9CodeEntityVos);
    }
}
