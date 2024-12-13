package net.risesoft.y9public.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import lombok.extern.slf4j.Slf4j;

/**
 * 实现文件压缩，文件夹压缩，以及文件和文件夹的混合压缩
 *
 */
@Slf4j
public class ZipFilesUtil {

    private static File targetFile;

    /**
     * 压缩文件夹里的文件 起初不知道是文件还是文件夹--- 统一调用该方法
     *
     * @param file
     * @param out
     * @param basedir
     */
    private static void compress(File file, ZipOutputStream out, String basedir) {
        /* 判断是目录还是文件 */
        if (file.isDirectory()) {
            zipDirectory(file, out, basedir);
        } else {
            zipFile(file, out, basedir);
        }
    }

    public static void saveZipFile(File fromPath, File toPath) {
        targetFile = toPath;
        if (targetFile.exists()) {
            targetFile.delete();
        }
        zipFiles(fromPath);
    }

    /**
     * 压缩文件夹
     *
     * @param dir
     * @param out
     * @param basedir
     */
    private static void zipDirectory(File dir, ZipOutputStream out, String basedir) {
        if (!dir.exists()) {
            return;
        }
        File[] files = dir.listFiles();
        for (File file : files) {
            /* 递归 */
            compress(file, out, basedir + dir.getName() + "/");
        }
    }

    /**
     * 压缩单个文件
     *
     * @param srcfile
     */
    private static void zipFile(File srcfile, ZipOutputStream out, String basedir) {
        if (!srcfile.exists()) {
            return;
        }
        byte[] buf = new byte[1024];
        FileInputStream in = null;

        try {
            int len;
            in = new FileInputStream(srcfile);
            out.putNextEntry(new ZipEntry(basedir + srcfile.getName()));

            while ((len = in.read(buf)) > 0) {
                out.write(buf, 0, len);
            }
        } catch (Exception e) {
            LOGGER.error(e.getMessage());
        } finally {
            try {
                if (out != null) {
                    out.closeEntry();
                }
                if (in != null) {
                    in.close();
                }
            } catch (IOException e) {
                LOGGER.error(e.getMessage());
            }
        }
    }

    /**
     * 压缩文件
     *
     * @param srcfile
     */
    private static void zipFiles(File srcfile) {

        ZipOutputStream out = null;
        try {
            out = new ZipOutputStream(new FileOutputStream(targetFile));

            if (srcfile.isFile()) {
                zipFile(srcfile, out, "");
            } else {
                File[] list = srcfile.listFiles();
                for (File file : list) {
                    compress(file, out, "");
                }
            }

        } catch (Exception e) {
            LOGGER.error(e.getMessage());
        } finally {
            try {
                if (out != null) {
                    out.close();
                }
            } catch (IOException e) {
                LOGGER.error(e.getMessage());
            }
        }
    }

}