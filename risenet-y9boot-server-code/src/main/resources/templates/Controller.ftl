package net.risesoft.${codeEntity.tenanted?string('', 'y9public.')}controller;

import org.springframework.data.domain.Page;
import org.springframework.validation.annotation.Validated;
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
import net.risesoft.${codeEntity.tenanted?string('', 'y9public.')}entity.${codeEntity.name?cap_first};
import net.risesoft.${codeEntity.tenanted?string('', 'y9public.')}service.${codeEntity.name?cap_first}Service;

/**
 * @description ${codeEntity.cnName} Controller
 * @author ${codeEntity.isvName}
 * @date ${.now?string('yyyy-MM-dd')}
 */
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/vue/rest/${codeEntity.name?uncap_first}", produces = "application/json")
public class ${codeEntity.name?cap_first}Controller {

    private final ${codeEntity.name?cap_first}Service ${codeEntity.name?uncap_first}Service;

    /**
     * @description 新增或者修改${codeEntity.cnName}
     * @param ${codeEntity.name?uncap_first} ${codeEntity.cnName}
     * @return
     */
    @RiseLog(operationName = "新增或者修改${codeEntity.cnName}")
    @PostMapping(value = "/saveOrUpdate")
    public Y9Result<${codeEntity.name?cap_first}> saveOrUpdate(@Validated ${codeEntity.name?cap_first} ${codeEntity.name?uncap_first}) {
        ${codeEntity.name?cap_first} new${codeEntity.name?cap_first} = ${codeEntity.name?uncap_first}Service.saveOrUpdate(${codeEntity.name?uncap_first});
        return Y9Result.success(new${codeEntity.name?cap_first}, "新增成功！");
    }

    /**
     * @description 根据唯一标示获取${codeEntity.cnName}
     * @param id 唯一标示
     * @return
     */
    @RiseLog(operationName = "根据唯一标示获取${codeEntity.cnName}")
    @RequestMapping("/findById")
    public Y9Result<${codeEntity.name?cap_first}> findById(@RequestParam String id) {
        ${codeEntity.name?cap_first} ${codeEntity.name?uncap_first} = ${codeEntity.name?uncap_first}Service.findById(id);
        return Y9Result.success(${codeEntity.name?uncap_first}, "获取成功！");
    }

    /**
     * @description 删除${codeEntity.cnName}
     * @param id 唯一标示
     * @return
     */
    @RiseLog(operationType = OperationTypeEnum.DELETE, operationName = "删除${codeEntity.cnName}")
    @PostMapping(value = "/deleteById")
    public Y9Result<String> deleteById(@RequestParam(required = true) String id) {
        ${codeEntity.name?uncap_first}Service.deleteById(id);
        return Y9Result.successMsg("删除成功！");
    }

    /**
     * @description 批量删除${codeEntity.cnName}
     * @param ids 唯一标示集合
     * @return
     */
    @RiseLog(operationType = OperationTypeEnum.DELETE, operationName = "批量删除${codeEntity.cnName}")
    @PostMapping(value = "/deleteByIds")
    public Y9Result<String> deleteByIds(@RequestParam(required = true) String[] ids) {
        ${codeEntity.name?uncap_first}Service.deleteByIds(ids);
        return Y9Result.successMsg("删除成功！");
    }

    /**
     * @description 分页获取${codeEntity.cnName}
     * @param pageQuery 分页信息
     * @return
     */
    @RiseLog(operationName = "分页获取${codeEntity.cnName}")
    @RequestMapping("/page")
    public Y9Page<${codeEntity.name?cap_first}> page(Y9PageQuery pageQuery) {
        Page<${codeEntity.name?cap_first}> pageList = ${codeEntity.name?uncap_first}Service.page(pageQuery.getPage(), pageQuery.getSize());
        return Y9Page.success(pageQuery.getPage(), pageList.getTotalPages(), pageList.getTotalElements(), pageList.getContent(), "获取成功！");
    }

    /**
     * @description 按名字模糊查询
     *
     * @param pageQuery 分页信息
     * @param ${codeEntity.name?uncap_first} ${codeEntity.cnName}
     * @return
     */
    @RiseLog(operationType = OperationTypeEnum.BROWSE, operationName = "根据名称搜索${codeEntity.cnName}")
    @RequestMapping("/pageSearch")
    public Y9Page<${codeEntity.name?cap_first}> pageSearch(Y9PageQuery pageQuery, ${codeEntity.name?cap_first} ${codeEntity.name?uncap_first}) {
        Page<${codeEntity.name?cap_first}> pageList = ${codeEntity.name?uncap_first}Service.pageSearch(pageQuery, ${codeEntity.name?uncap_first});
        return Y9Page.success(pageQuery.getPage(), pageList.getTotalPages(), pageList.getTotalElements(), pageList.getContent(), "获取成功");
    }
}
