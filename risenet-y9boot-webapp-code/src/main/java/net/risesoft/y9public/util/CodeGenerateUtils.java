package net.risesoft.y9public.util;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import lombok.extern.slf4j.Slf4j;

import net.risesoft.y9public.entity.Y9CodeEntity;
import net.risesoft.y9public.entity.Y9CodeField;
import net.risesoft.y9public.entity.Y9CodeSystem;

import freemarker.template.Template;
import net.risesoft.y9public.entity.vo.Y9CodeIndex;

/**
 * 代码生成工具
 *
 * @author qinman
 * @date 2023/05/12
 */
@Slf4j
public class CodeGenerateUtils {

    public static void generateSystem(Y9CodeSystem codeSystem, String projectPath) {
        final String pathApplicationJava = projectPath + "/src/main/java/net/risesoft";
        createFileIfNotExits(pathApplicationJava);
        final String pathWebMvcConfig = projectPath + "/src/main/java/net/risesoft/config";
        createFileIfNotExits(pathWebMvcConfig);
        final String pathLogback = projectPath + "/src/main/resources";
        createFileIfNotExits(pathLogback);
        final String pathPom = projectPath;
        final String pathApplicationYml = projectPath + "/src/main/resources";
        final String pathServletInitializer = projectPath + "/src/main/java/net/risesoft";

        final String classNameApplicationJava = toUpperCaseFirstOne(codeSystem.getName()) + "Application.java";
        final String classNameCheckUserLoginFilter = "CheckUserLoginFilter.java";
        final String classNameLogback = "logback.xml";
        final String classNamePom = "pom.xml";
        final String classNameApplicationYml = "application.yml";
        final String classNameServletInitializer =
            toUpperCaseFirstOne(codeSystem.getName()) + "ServletInitializer.java";

        final String templateNameApplicationJava = "Application.ftl";
        final String templateNameLogback = "Logback.ftl";
        final String templateNamePom = "Pom.ftl";
        final String templateNameServletInitializer = "ServletInitializer.ftl";
        final String templateNameApplicationYml = "Properties.ftl";

        File mapperFileApplicationJava = new File(pathApplicationJava + "/" + classNameApplicationJava);
        File mapperFileLogback = new File(pathLogback + "/" + classNameLogback);
        File mapperFilePom = new File(pathPom + "/" + classNamePom);
        File mapperFileApplicationYml = new File(pathApplicationYml + "/" + classNameApplicationYml);
        File mapperFileServletInitializer = new File(pathServletInitializer + "/" + classNameServletInitializer);

        Map<String, Object> map = new HashMap<>();
        map.put("codeSystem", codeSystem);
        generateFileByTemplate(templateNameApplicationJava, mapperFileApplicationJava, map);
        generateFileByTemplate(templateNameLogback, mapperFileLogback, map);
        generateFileByTemplate(templateNamePom, mapperFilePom, map);
        generateFileByTemplate(templateNameApplicationYml, mapperFileApplicationYml, map);
        if (codeSystem.getWar()) {
            generateFileByTemplate(templateNameServletInitializer, mapperFileServletInitializer, map);
        }
    }

    private static void createFileIfNotExits(String pathApplicationJava) {
        File f = new File(pathApplicationJava);
        if (!f.exists()) {
            f.mkdirs();
        }
    }

    public static void generateSystemVue(Y9CodeSystem codeSystem, List<Y9CodeEntity> codeEntityList,
        String y9VueProjectPath) {
        final String classNameDevelopment = ".env.development";
        final String classNameProduction = ".env.production";
        final String classNameIndexRouter = "index.ts";
        final String templateNameProduction = "production.ftl";
        final String templateNameIndexRouter = "indexRouter.ftl";
        final String templateNameDevelopment = "development.ftl";

        File mapperFileDevelopment = new File(y9VueProjectPath + "/" + classNameDevelopment);
        File mapperFileProduction = new File(y9VueProjectPath + "/" + classNameProduction);
        File mapperFileIndexRouter = new File(y9VueProjectPath + "/src/router/" + classNameIndexRouter);

        Map<String, Object> map = new HashMap<>();
        map.put("codeSystem", codeSystem);
        map.put("codeEntityList", codeEntityList);
        generateFileByTemplate(templateNameDevelopment, mapperFileDevelopment, map);
        generateFileByTemplate(templateNameProduction, mapperFileProduction, map);
        generateFileByTemplate(templateNameIndexRouter, mapperFileIndexRouter, map);
    }

    public static void generateEntity(Y9CodeSystem codeSystem, Y9CodeEntity codeEntity,  List<Y9CodeField> codeFieldList,List<Y9CodeIndex> codeIndexList,
                                      String projectPath) {
        final String pathEntity =
            projectPath + "/src/main/java/net/risesoft" + (codeEntity.getTenanted() ? "" : "/y9public") + "/entity/";
        createFileIfNotExits(pathEntity);
        final String pathRepository = projectPath + "/src/main/java/net/risesoft"
            + (codeEntity.getTenanted() ? "" : "/y9public") + "/repository/";
        createFileIfNotExits(pathRepository);
        final String pathSpecification = projectPath + "/src/main/java/net/risesoft"
            + (codeEntity.getTenanted() ? "" : "/y9public") + "/repository/specification/";
        createFileIfNotExits(pathSpecification);
        final String pathService =
            projectPath + "/src/main/java/net/risesoft" + (codeEntity.getTenanted() ? "" : "/y9public") + "/service/";
        createFileIfNotExits(pathService);
        final String pathServiceImpl = projectPath + "/src/main/java/net/risesoft"
            + (codeEntity.getTenanted() ? "" : "/y9public") + "/service/impl/";
        createFileIfNotExits(pathServiceImpl);
        final String pathController = projectPath + "/src/main/java/net/risesoft"
            + (codeEntity.getTenanted() ? "" : "/y9public") + "/controller/";
        createFileIfNotExits(pathController);
        String name = toUpperCaseFirstOne(codeEntity.getName());
        final String classNameEntity = name + ".java";
        final String classNameRepository = name + "Repository.java";
        final String classNameSpecification = name + "Specification.java";
        final String classNameService = name + "Service.java";
        final String classNameServiceImpl = name + "ServiceImpl.java";
        final String classNameController = name + "Controller.java";

        final String ftlNameEntity = "Entity.ftl";
        final String ftlNameRepository = "Repository.ftl";
        final String ftlNameSpecification = "Specification.ftl";
        final String ftlNameService = "Service.ftl";
        final String ftlNameServiceImpl = "ServiceImpl.ftl";
        final String ftlNameController = "Controller.ftl";

        File mapperFileEntity = new File(pathEntity + classNameEntity);
        File mapperFileRepository = new File(pathRepository + classNameRepository);
        File mapperFileSpecification = new File(pathSpecification + classNameSpecification);
        File mapperFileService = new File(pathService + classNameService);
        File mapperFileServiceImpl = new File(pathServiceImpl + classNameServiceImpl);
        File mapperFileController = new File(pathController + classNameController);
        Map<String, Object> map = new HashMap<>();
        map.put("codeSystem", codeSystem);
        map.put("codeEntity", codeEntity);
        map.put("codeFieldList", codeFieldList);
        map.put("codeIndexList",codeIndexList);
        generateFileByTemplate(ftlNameEntity, mapperFileEntity, map);
        generateFileByTemplate(ftlNameRepository, mapperFileRepository, map);
        generateFileByTemplate(ftlNameSpecification, mapperFileSpecification, map);
        generateFileByTemplate(ftlNameService, mapperFileService, map);
        generateFileByTemplate(ftlNameServiceImpl, mapperFileServiceImpl, map);
        generateFileByTemplate(ftlNameController, mapperFileController, map);
    }

    public static void generateEntityOnly(Y9CodeSystem codeSystem, Y9CodeEntity codeEntity,
        List<Y9CodeField> codeFieldList,List<Y9CodeIndex> codeIndexList, String uploadPath) {
        String name = toUpperCaseFirstOne(codeEntity.getName());
        final String classNameEntity = name + ".java";
        final String classNameRepository = name + "Repository.java";
        final String classNameSpecification = name + "Specification.java";
        final String classNameService = name + "Service.java";
        final String classNameServiceImpl = name + "ServiceImpl.java";
        final String classNameController = name + "Controller.java";
        final String classNameApi = "index.ts";
        final String classNameVue = "index.vue";

        final String ftlNameEntity = "Entity.ftl";
        final String ftlNameRepository = "Repository.ftl";
        final String ftlNameSpecification = "Specification.ftl";
        final String ftlNameService = "Service.ftl";
        final String ftlNameServiceImpl = "ServiceImpl.ftl";
        final String ftlNameController = "Controller.ftl";
        final String ftlNameApi = "ts.ftl";
        final String ftlNameVue = "vue.ftl";

        File mapperFileEntity = new File(uploadPath + "/" + classNameEntity);
        File mapperFileRepository = new File(uploadPath + "/" + classNameRepository);
        File mapperFileSpecification = new File(uploadPath + "/" + classNameSpecification);
        File mapperFileService = new File(uploadPath + "/" + classNameService);
        File mapperFileServiceImpl = new File(uploadPath + "/" + classNameServiceImpl);
        File mapperFileController = new File(uploadPath + "/" + classNameController);
        File mapperFileapi = new File(uploadPath + "/" + classNameApi);
        File mapperFileVue = new File(uploadPath + "/" + classNameVue);

        Map<String, Object> map = new HashMap<>();
        map.put("codeSystem", codeSystem);
        map.put("codeEntity", codeEntity);
        map.put("codeFieldList", codeFieldList);
        map.put("codeIndexList",codeIndexList);

        generateFileByTemplate(ftlNameEntity, mapperFileEntity, map);
        generateFileByTemplate(ftlNameRepository, mapperFileRepository, map);
        generateFileByTemplate(ftlNameSpecification, mapperFileSpecification, map);
        generateFileByTemplate(ftlNameService, mapperFileService, map);
        generateFileByTemplate(ftlNameServiceImpl, mapperFileServiceImpl, map);
        generateFileByTemplate(ftlNameController, mapperFileController, map);
        generateFileByTemplate(ftlNameApi, mapperFileapi, map);
        generateFileByTemplate(ftlNameVue, mapperFileVue, map);
    }

    public static Map<String,String> generateEntityOnlyString(Y9CodeSystem codeSystem, Y9CodeEntity codeEntity,
                                          List<Y9CodeField> codeFieldList,List<Y9CodeIndex> codeIndexList) {
        String name = toUpperCaseFirstOne(codeEntity.getName());
        final String classNameEntity = name + ".java";
        final String classNameRepository = name + "Repository.java";
        final String classNameSpecification = name + "Specification.java";
        final String classNameService = name + "Service.java";
        final String classNameServiceImpl = name + "ServiceImpl.java";
        final String classNameController = name + "Controller.java";
        final String classNameApi = "index.ts";
        final String classNameVue = "index.vue";

        final String ftlNameEntity = "Entity.ftl";
        final String ftlNameRepository = "Repository.ftl";
        final String ftlNameSpecification = "Specification.ftl";
        final String ftlNameService = "Service.ftl";
        final String ftlNameServiceImpl = "ServiceImpl.ftl";
        final String ftlNameController = "Controller.ftl";
        final String ftlNameApi = "ts.ftl";
        final String ftlNameVue = "vue.ftl";

        Map<String, Object> map = new HashMap<>();
        map.put("codeSystem", codeSystem);
        map.put("codeEntity", codeEntity);
        map.put("codeFieldList", codeFieldList);
        map.put("codeIndexList",codeIndexList);

        HashMap<String, String> resultMap = new LinkedHashMap<>();
        resultMap.put(classNameEntity,generateStringByTemplate(ftlNameEntity, map));
        resultMap.put(classNameRepository,generateStringByTemplate(ftlNameRepository, map));
        resultMap.put(classNameSpecification, generateStringByTemplate(ftlNameSpecification, map));
        resultMap.put(classNameService, generateStringByTemplate(ftlNameService, map));
        resultMap.put(classNameServiceImpl, generateStringByTemplate(ftlNameServiceImpl, map));
        resultMap.put(classNameController, generateStringByTemplate(ftlNameController, map));
        resultMap.put(classNameApi, generateStringByTemplate(ftlNameApi, map));
        resultMap.put(classNameVue, generateStringByTemplate(ftlNameVue, map));
        return resultMap;
    }

    public static void generateEntityVue(Y9CodeEntity codeEntity, List<Y9CodeField> codeFieldList,
        String y9VueProjectPath) {
        final String pathApi = y9VueProjectPath + "/src/api/" + toLowerCaseFirstOne(codeEntity.getName()) + "/";
        createFileIfNotExits(pathApi);
        final String pathVue = y9VueProjectPath + "/src/views/" + toLowerCaseFirstOne(codeEntity.getName()) + "/";
        createFileIfNotExits(pathVue);
        final String pathRouter = y9VueProjectPath + "/src/router/modules/";
        createFileIfNotExits(pathRouter);
        final String classNameApi = "index.ts";
        final String classNameVue = "index.vue";
        final String classNameRouter = toLowerCaseFirstOne(codeEntity.getName()) + "Router.ts";

        final String ftlNameApi = "ts.ftl";
        final String ftlNameVue = "vue.ftl";
        final String ftlNameRouter = "router.ftl";

        File mapperFileapi = new File(pathApi + classNameApi);
        File mapperFileVue = new File(pathVue + classNameVue);
        File mapperFileRouter = new File(pathRouter + classNameRouter);

        Map<String, Object> map = new HashMap<>();
        map.put("codeEntity", codeEntity);
        map.put("codeFieldList", codeFieldList);
        generateFileByTemplate(ftlNameApi, mapperFileapi, map);
        generateFileByTemplate(ftlNameVue, mapperFileVue, map);
        generateFileByTemplate(ftlNameRouter, mapperFileRouter, map);
    }

    private static void generateFileByTemplate(final String templateName, File file, Map<String, Object> map) {
        try (FileOutputStream fos = new FileOutputStream(file)) {
            Template template = FreeMarkerTemplateUtils.getTemplate(templateName);
            Writer out = new BufferedWriter(new OutputStreamWriter(fos, StandardCharsets.UTF_8), 1020);
            template.process(map, out);
        } catch (Exception e) {
            LOGGER.error("生成模板:{}失败！错误信息: {}", templateName, e.getMessage());
        }
    }
    private static String generateStringByTemplate(final String templateName, Map<String, Object> map) {
        try(StringWriter stringWriter = new StringWriter()) {
            Template template = FreeMarkerTemplateUtils.getTemplate(templateName);
            template.process(map, stringWriter);
            return stringWriter.toString();
        } catch (Exception e) {
            LOGGER.error("生成模板:{}失败！错误信息: {}", templateName, e.getMessage());
        }
        return null;
    }

    // 首字母转小写
    public static String toLowerCaseFirstOne(String s) {
        if (Character.isLowerCase(s.charAt(0))) {
            return s;
        } else {
            return (new StringBuilder()).append(Character.toLowerCase(s.charAt(0))).append(s.substring(1)).toString();
        }
    }

    // 首字母转大写
    public static String toUpperCaseFirstOne(String s) {
        if (Character.isUpperCase(s.charAt(0))) {
            return s;
        } else {
            return (new StringBuilder()).append(Character.toUpperCase(s.charAt(0))).append(s.substring(1)).toString();
        }
    }
}
