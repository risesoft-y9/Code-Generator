package net.risesoft.y9public.controller;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import net.risesoft.model.user.UserInfo;
import net.risesoft.pojo.Y9Result;
import net.risesoft.y9.Y9Context;
import net.risesoft.y9.Y9LoginUserHolder;
import net.risesoft.y9public.entity.Y9CodeEntity;
import net.risesoft.y9public.entity.Y9CodeField;
import net.risesoft.y9public.entity.Y9CodeSystem;
import net.risesoft.y9public.entity.Y9FileStore;
import net.risesoft.y9public.entity.vo.Y9CodeIndex;
import net.risesoft.y9public.service.Y9CodeEntityService;
import net.risesoft.y9public.service.Y9CodeFieldService;
import net.risesoft.y9public.service.Y9CodeIndexService;
import net.risesoft.y9public.service.Y9CodeSystemService;
import net.risesoft.y9public.service.Y9FileStoreService;
import net.risesoft.y9public.util.CodeGenerateUtils;
import net.risesoft.y9public.util.CodeUtil;
import net.risesoft.y9public.util.CopyFilesUtil;
import net.risesoft.y9public.util.DeleteFileUtil;
import net.risesoft.y9public.util.ZipFilesUtil;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/vue/code")
public class CodeController {

    private final Y9CodeSystemService y9CodeSystemService;
    private final Y9CodeEntityService y9CodeEntityService;
    private final Y9CodeFieldService y9CodeFieldService;
    private final Y9FileStoreService y9FileStoreService;
    private final DeleteFileUtil deleteFileUtil;
    private final Y9CodeIndexService y9CodeIndexService;

    /** 文件不存在时创建该文件 */
    private static void createFileIfNotExists(String path) {
        File f = new File(path);
        if (!f.exists()) {
            f.mkdirs();
        }
    }

    @PostMapping(value = "/system")
    public Y9Result<Object> system(@RequestParam String codeSystemId, HttpServletRequest request) {
        String uploadPath = "", zipPath = "";
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
            String dateStr = sdf.format(new Date());
            UserInfo userInfo = Y9LoginUserHolder.getUserInfo();
            Y9CodeSystem codeSystem = y9CodeSystemService.findById(codeSystemId);
            /** 生成前后端工程存放的路径 */
            uploadPath = request.getSession().getServletContext().getRealPath("/") + "static/upload/"
                + userInfo.getLoginName() + "/" + codeSystem.getName() + "/" + dateStr;
            createFileIfNotExists(uploadPath);

            /** 拷贝前端工程 */
            String sourceVuePath = request.getSession().getServletContext().getRealPath("/") + "y9vue-templ";
            String targetVuePath = uploadPath + "/y9vue-" + codeSystem.getName();
            createFileIfNotExists(targetVuePath);
            CopyFilesUtil.copyFile(sourceVuePath, targetVuePath);
            /** 生成前后端工程 */
            String projectPath = uploadPath + "/risenet-y9boot-webapp-" + codeSystem.getName();
            createFileIfNotExists(projectPath);
            generateCode(codeSystem, projectPath, targetVuePath);

            /** 打包zip */
            File from = new File(uploadPath);
            zipPath = request.getSession().getServletContext().getRealPath("/") + "static/zip/"
                + userInfo.getLoginName() + "/" + codeSystem.getName() + "/" + dateStr;
            createFileIfNotExists(zipPath);
            String toPath = zipPath + "/" + codeSystem.getName() + ".zip";
            File to = new File(toPath);
            ZipFilesUtil.saveZipFile(from, to);

            String fullPath =
                Y9FileStore.buildPath(Y9Context.getSystemName(), userInfo.getLoginName(), codeSystem.getName());
            uploadZipFile(to, fullPath, codeSystem, null);

        } catch (Exception e) {
            LOGGER.error("生成失败！", e);
            return Y9Result.failure("生成失败!");
        } finally {
            deleteFileUtil.delete(uploadPath);
            deleteFileUtil.delete(zipPath);
        }
        return Y9Result.successMsg("生成成功！");
    }

    @PostMapping(value = "/entity")
    public Y9Result<Object> entity(@RequestParam String codeEntityId, HttpServletRequest request) {
        String uploadPath = "", zipPath = "";
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
            String dateStr = sdf.format(new Date());
            UserInfo userInfo = Y9LoginUserHolder.getUserInfo();
            Y9CodeEntity codeEntity = y9CodeEntityService.findById(codeEntityId);
            Y9CodeSystem codeSystem = y9CodeSystemService.findById(codeEntity.getCodeSystemId());

            /** 生成前后端工程存放的路径 */
            uploadPath = request.getSession().getServletContext().getRealPath("/") + "static/upload/"
                + userInfo.getLoginName() + "/" + codeSystem.getName() + "/" + dateStr + "/"
                + CodeGenerateUtils.toLowerCaseFirstOne(codeEntity.getName());
            createFileIfNotExists(uploadPath);
            /** 生成前端和后端代码 */
            List<Y9CodeField> codeFieldList = y9CodeFieldService.findByCodeEntityId(codeEntity.getId());

            List<Y9CodeIndex> codeIndexList = y9CodeIndexService.findByEntityId(codeEntity.getId());

            codeIndexList = codeIndexList.stream().peek(item -> {
                String indexFieldsStr = item.getIndexFields();
                item.setIndexName(item.getIndexName().toUpperCase());
                List<String> indexFieldList = new ArrayList<>();
                for (String fieldId : indexFieldsStr.split(",")) {
                    Y9CodeField codeField = y9CodeFieldService.findById(fieldId);
                    indexFieldList.add(CodeUtil.formatName(codeField.getName()));
                }
                item.setIndexFieldList(String.join(",", indexFieldList));
            }).collect(Collectors.toList());

            CodeGenerateUtils.generateEntityOnly(codeSystem, codeEntity, codeFieldList, codeIndexList, uploadPath);
            /** 打包zip */
            File from = new File(uploadPath);
            zipPath = request.getSession().getServletContext().getRealPath("/") + "static/zip/"
                + userInfo.getLoginName() + "/" + codeSystem.getName() + "/" + dateStr;
            createFileIfNotExists(zipPath);

            String toPath = zipPath + "/" + CodeGenerateUtils.toLowerCaseFirstOne(codeEntity.getName()) + ".zip";
            File to = new File(toPath);
            ZipFilesUtil.saveZipFile(from, to);

            String fullPath =
                Y9FileStore.buildPath(Y9Context.getSystemName(), userInfo.getLoginName(), codeEntity.getName());
            uploadZipFile(to, fullPath, codeSystem, codeEntity);

        } catch (Exception e) {
            LOGGER.error("生成失败！", e);
            return Y9Result.failure("生成失败!");
        } finally {
            deleteFileUtil.delete(uploadPath);
            deleteFileUtil.delete(zipPath);
        }
        return Y9Result.successMsg("生成成功！");
    }

    @PostMapping(value = "/entityPreview")
    public Y9Result<Map<String, String>> entityPreview(@RequestParam String codeEntityId) {
        try {
            Y9CodeEntity codeEntity = y9CodeEntityService.findById(codeEntityId);
            Y9CodeSystem codeSystem = y9CodeSystemService.findById(codeEntity.getCodeSystemId());
            List<Y9CodeField> codeFieldList = y9CodeFieldService.findByCodeEntityId(codeEntity.getId());
            List<Y9CodeIndex> codeIndexList = y9CodeIndexService.findByEntityId(codeEntity.getId());

            codeIndexList = codeIndexList.stream().peek(item -> {
                String indexFieldsStr = item.getIndexFields();
                item.setIndexName(item.getIndexName().toUpperCase());
                List<String> indexFieldList = new ArrayList<>();
                for (String fieldId : indexFieldsStr.split(",")) {
                    Y9CodeField codeField = y9CodeFieldService.findById(fieldId);
                    indexFieldList.add(CodeUtil.formatName(codeField.getName()));
                }
                item.setIndexFieldList(String.join(",", indexFieldList));
            }).collect(Collectors.toList());

            Map<String, String> resultMap =
                CodeGenerateUtils.generateEntityOnlyString(codeSystem, codeEntity, codeFieldList, codeIndexList);
            List<String> titleList = Arrays.asList("Entity", "Repository", "Specification", "Service", "ServiceImpl",
                "Controller", "Index.ts", "Index.vue");
            List<String> resultValueList = new ArrayList<>(resultMap.values());

            Map<String, String> map = new LinkedHashMap<>();
            for (int i = 0; i < resultValueList.size(); i++) {
                map.put(titleList.get(i), resultValueList.get(i));
            }
            return Y9Result.success(map);
        } catch (Exception e) {
            LOGGER.error("生成失败！", e);
            return Y9Result.failure("生成失败!");
        }
    }

    /** 将zip包上传服务器 */
    private void uploadZipFile(File to, String fullPath, Y9CodeSystem codeSystem, Y9CodeEntity codeEntity)
        throws Exception {

        String fileName = codeEntity != null ? codeEntity.getName() : codeSystem.getName();

        String fileStoreId;
        if (StringUtils.isBlank(codeSystem.getFileStoreId())) {
            Y9FileStore y9FileStore = y9FileStoreService.uploadFile(to, fullPath, fileName + ".zip");
            fileStoreId = y9FileStore.getId();
        } else {
            Y9FileStore y9FileStore = y9FileStoreService.getById(codeSystem.getFileStoreId());
            y9FileStore = y9FileStore == null ? y9FileStoreService.uploadFile(to, fullPath, fileName + ".zip")
                : y9FileStoreService.uploadFileReplace(to, codeSystem.getFileStoreId());
            fileStoreId = y9FileStore.getId();
        }

        if (codeEntity != null) {
            codeEntity.setFileStoreId(fileStoreId);
            y9CodeEntityService.saveOrUpdate(codeEntity);
        } else {
            codeSystem.setFileStoreId(fileStoreId);
            y9CodeSystemService.saveOrUpdate(codeSystem);
        }
    }

    /** 生成前后端代码 */
    private void generateCode(Y9CodeSystem codeSystem, String projectPath, String targetVuePath) throws Exception {

        CodeGenerateUtils.generateSystem(codeSystem, projectPath);
        List<Y9CodeEntity> codeEntityList = y9CodeEntityService.findByCodeSystemId(codeSystem.getId());
        CodeGenerateUtils.generateSystemVue(codeSystem, codeEntityList, targetVuePath);
        for (Y9CodeEntity codeEntity : codeEntityList) {
            List<Y9CodeField> codeFieldList = y9CodeFieldService.findByCodeEntityId(codeEntity.getId());
            List<Y9CodeIndex> codeIndexList = y9CodeIndexService.findByEntityId(codeEntity.getId());

            codeIndexList = codeIndexList.stream().peek(item -> {
                String indexFieldsStr = item.getIndexFields();
                List<String> indexFieldList = new ArrayList<>();
                for (String fieldId : indexFieldsStr.split(",")) {
                    Y9CodeField codeField = y9CodeFieldService.findById(fieldId);
                    indexFieldList.add(CodeUtil.formatName(codeField.getName()));
                }
                item.setIndexFieldList(String.join(",", indexFieldList));
            }).collect(Collectors.toList());
            CodeGenerateUtils.generateEntity(codeSystem, codeEntity, codeFieldList, codeIndexList, projectPath);
            CodeGenerateUtils.generateEntityVue(codeEntity, codeFieldList, targetVuePath);
        }
    }
}
