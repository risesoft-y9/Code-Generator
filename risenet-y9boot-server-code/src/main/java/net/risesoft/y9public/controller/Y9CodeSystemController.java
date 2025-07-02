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
import net.risesoft.model.user.UserInfo;
import net.risesoft.pojo.Y9Page;
import net.risesoft.pojo.Y9PageQuery;
import net.risesoft.pojo.Y9Result;
import net.risesoft.y9.Y9LoginUserHolder;
import net.risesoft.y9public.entity.Y9CodeSystem;
import net.risesoft.y9public.service.Y9CodeSystemService;
import net.risesoft.y9public.service.Y9FileStoreService;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/vue/rest/codeSystem", produces = "application/json")
public class Y9CodeSystemController {

    private final Y9CodeSystemService y9CodeSystemService;
    private final Y9FileStoreService y9FileStoreService;

    /**
     * @description 新增或者更新
     * @param y9CodeSystem 系统实体
     * @return
     */
    @RiseLog(operationName = "新增或者更新系统")
    @PostMapping(value = "/saveOrUpdate")
    public Y9Result<Y9CodeSystem> saveOrUpdate(@Validated Y9CodeSystem y9CodeSystem) {
        UserInfo userInfo = Y9LoginUserHolder.getUserInfo();
        if (userInfo.isGlobalManager()) {
            y9CodeSystem.setTemplate(1);
        }
        Y9CodeSystem newCodeSystem = y9CodeSystemService.saveOrUpdate(y9CodeSystem);
        if (StringUtils.isNotBlank(y9CodeSystem.getFileStoreId())) {
            y9FileStoreService.deleteFile(y9CodeSystem.getFileStoreId());
        }
        return Y9Result.success(newCodeSystem, "保存成功！");
    }

    /**
     * @description 根据唯一标示获取系统信息
     * @param id 系统唯一标示
     * @return
     */
    @RiseLog(operationName = "根据唯一标示获取系统信息")
    @GetMapping("/findById")
    public Y9Result<Y9CodeSystem> findById(@RequestParam String id) {
        Y9CodeSystem y9CodeSystem = y9CodeSystemService.findById(id);
        return Y9Result.success(y9CodeSystem, "获取成功！");
    }

    /**
     * @description 删除系统信息
     * @param id 系统唯一标示
     * @return
     */
    @RiseLog(operationType = OperationTypeEnum.DELETE, operationName = "删除系统信息")
    @DeleteMapping(value = "/deleteById")
    public Y9Result<String> deleteById(@RequestParam String id) {
        y9CodeSystemService.deleteById(id);
        return Y9Result.successMsg("删除成功！");
    }

    /**
     * @description 批量删除系统信息
     * @param ids 系统唯一标示集合
     * @return
     */
    @RiseLog(operationType = OperationTypeEnum.DELETE, operationName = "批量删除系统信息")
    @DeleteMapping(value = "/deleteByIds")
    public Y9Result<String> deleteByIds(@RequestParam String[] ids) {
        y9CodeSystemService.deleteByIds(ids);
        return Y9Result.successMsg("删除成功！");
    }

    /**
     * @description 分页获取系统信息
     * @param pageQuery 分页信息
     * @return
     */
    @RiseLog(operationName = "分页获取系统信息")
    @GetMapping("/page")
    public Y9Page<Y9CodeSystem> page(Y9PageQuery pageQuery) {
        Page<Y9CodeSystem> pageList = y9CodeSystemService.page(pageQuery.getPage(), pageQuery.getSize());
        return Y9Page.success(pageQuery.getPage(), pageList.getTotalPages(), pageList.getTotalElements(),
            pageList.getContent(), "获取成功！");
    }

    /**
     * @description 分页获取系统信息
     * @param pageQuery 分页信息
     * @return
     */
    @RiseLog(operationName = "分页获取系统信息")
    @GetMapping("/systemPage")
    public Y9Page<Y9CodeSystem> systemPage(Y9PageQuery pageQuery, @RequestParam(required = false) Integer environment,
        @RequestParam(required = false) Integer template) {
        Page<Y9CodeSystem> pageList =
            y9CodeSystemService.page(pageQuery.getPage(), pageQuery.getSize(), environment, template);
        return Y9Page.success(pageQuery.getPage(), pageList.getTotalPages(), pageList.getTotalElements(),
            pageList.getContent(), "获取成功！");
    }

    @RiseLog(operationName = "获取系统列表")
    @GetMapping
    public Y9Result<List<Y9CodeSystem>> list() {
        return Y9Result.success(y9CodeSystemService.list());
    }

    /**
     * @description 批量保存系统
     * @param: y9CodeSystemList
     * @return:
     */
    @RiseLog(operationName = "批量保存系统")
    @PostMapping("saveCodeSystemList")
    public Y9Result<List<Y9CodeSystem>> saveCodeSystemList(@RequestBody List<Y9CodeSystem> y9CodeSystemList) {
        List<Y9CodeSystem> y9CodeSystems = y9CodeSystemService.saveCodeSystemList(y9CodeSystemList);
        return Y9Result.success(y9CodeSystems);
    }
}
