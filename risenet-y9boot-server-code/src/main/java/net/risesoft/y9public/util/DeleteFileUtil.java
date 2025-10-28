package net.risesoft.y9public.util;

import java.io.File;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class DeleteFileUtil {

    /**
     * 删除目录及目录下的文件
     *
     */
    public static boolean deleteDirectory(String filePath) {
        // 如果dir不以文件分隔符结尾，自动添加文件分隔符
        if (!filePath.endsWith(File.separator)) {
            filePath = filePath + File.separator;
        }
        File dirFile = new File(filePath);
        // 如果dir对应的文件不存在，或者不是一个目录，则退出
        if ((!dirFile.exists()) || (!dirFile.isDirectory())) {
            LOGGER.info("删除目录失败：{}不存在！", filePath);
            return false;
        }
        boolean flag = true;
        // 删除文件夹中的所有文件包括子目录
        File[] files = dirFile.listFiles();
        for (File file : files) {
            // 删除子文件
            if (file.isFile()) {
                flag = deleteFile(file.getAbsolutePath());
                if (!flag) {
                    break;
                }
            }
            // 删除子目录
            else if (file.isDirectory()) {
                flag = deleteDirectory(file.getAbsolutePath());
                if (!flag) {
                    break;
                }
            }
        }
        if (!flag) {
            LOGGER.info("删除目录失败！");
            return false;
        }
        // 删除当前目录
        if (dirFile.delete()) {
            LOGGER.info("删除目录{}成功！", filePath);
            return true;
        } else {
            return false;
        }
    }

    /**
     * 删除单个文件
     *
     */
    public static boolean deleteFile(String filePath) {
        File file = new File(filePath);
        // 如果文件路径所对应的文件存在，并且是一个文件，则直接删除
        if (file.exists() && file.isFile()) {
            if (file.delete()) {
                return true;
            } else {
                LOGGER.info("删除单个文件{}失败！", filePath);
                return false;
            }
        } else {
            LOGGER.info("删除单个文件失败：{}不存在！", filePath);
            return false;
        }
    }

    /**
     * 删除文件，可以是文件或文件夹
     *
     */
    @Async
    public void delete(String filePath) {
        try {
            Thread.sleep(3600000);
        } catch (InterruptedException e) {
            LOGGER.error(e.getMessage());
        }
        File file = new File(filePath);
        if (!file.exists()) {
            LOGGER.info("删除文件失败:{}不存在！", filePath);
        } else {
            if (file.isFile()) {
                deleteFile(filePath);
            } else {
                deleteDirectory(filePath);
            }
        }
    }

}
