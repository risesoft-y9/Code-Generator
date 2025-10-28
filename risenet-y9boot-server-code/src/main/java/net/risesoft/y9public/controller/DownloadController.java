package net.risesoft.y9public.controller;

import java.io.OutputStream;

import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import net.risesoft.y9public.entity.Y9CodeEntity;
import net.risesoft.y9public.entity.Y9CodeSystem;
import net.risesoft.y9public.service.Y9CodeEntityService;
import net.risesoft.y9public.service.Y9CodeSystemService;
import net.risesoft.y9public.service.Y9FileStoreService;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/vue/download")
public class DownloadController {

    private final Y9CodeSystemService y9CodeSystemService;
    private final Y9CodeEntityService y9CodeEntityService;
    private final Y9FileStoreService y9FileStoreService;

    @GetMapping("system")
    public void downloadSystem(@RequestParam String codeSystemId, HttpServletResponse response) {
        Y9CodeSystem codeSystem = y9CodeSystemService.findById(codeSystemId);
        String fileStoreId = codeSystem.getFileStoreId();

        downloadAndResponse(response, fileStoreId);
    }

    @GetMapping("entity")
    public void downloadEntity(@RequestParam String codeEntityId, HttpServletResponse response) {
        Y9CodeEntity codeEntity = y9CodeEntityService.findById(codeEntityId);
        String fileStoreId = codeEntity.getFileStoreId();

        downloadAndResponse(response, fileStoreId);
    }

    /** 下载文件并响应 */
    private void downloadAndResponse(HttpServletResponse response, String fileStoreId) {
        try (OutputStream out = response.getOutputStream()) {
            y9FileStoreService.downloadFileToOutputStream(fileStoreId, out);
            out.flush();
        } catch (Exception e) {
            LOGGER.error("文件下载异常,fileStoreId:{}", fileStoreId, e);
        }
    }
}
