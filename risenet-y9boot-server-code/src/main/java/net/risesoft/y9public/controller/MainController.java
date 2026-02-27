package net.risesoft.y9public.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import net.risesoft.api.platform.org.OrgUnitApi;
import net.risesoft.log.annotation.RiseLog;
import net.risesoft.model.user.UserInfo;
import net.risesoft.pojo.Y9Result;
import net.risesoft.y9.Y9LoginUserHolder;

@RequiredArgsConstructor
@Controller
@Slf4j
@RequestMapping("/vue/rest/main")
public class MainController {

    private final OrgUnitApi orgUnitApi;

    /**
     * 获取登录信息
     *
     * @return
     */
    @RiseLog(operationName = "获取登录信息")
    @GetMapping(value = "/getLoginInfo")
    public Y9Result<Map<String, Object>> getLoginInfo() {
        UserInfo userInfo = Y9LoginUserHolder.getUserInfo();
        String tenantId = Y9LoginUserHolder.getTenantId();
        Map<String, Object> map = new HashMap<>();
        map.put("person", userInfo);
        map.put("bureau", orgUnitApi.getOrgUnitBureau(tenantId, userInfo.getPersonId()));
        return Y9Result.success(map);
    }
}