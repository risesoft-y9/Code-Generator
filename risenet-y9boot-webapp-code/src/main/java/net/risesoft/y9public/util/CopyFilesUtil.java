package net.risesoft.y9public.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import lombok.extern.slf4j.Slf4j;

/**
 * 把一个文件夹里的所有文件包括文件夹 一并原样拷贝到另一个目录中
 */
@Slf4j
public class CopyFilesUtil {

    private static File dirFrom;
    private static File dirTo;

    /**
     * 封装好的文件拷贝方法
     */
    private static void copy(String from, String to) {
        try {
            InputStream in = new FileInputStream(from);
            OutputStream out = new FileOutputStream(to);

            byte[] buff = new byte[1024];
            int len = 0;
            while ((len = in.read(buff)) != -1) {
                out.write(buff, 0, len);
            }
            in.close();
            out.close();
        } catch (IOException e) {
            LOGGER.error(e.getMessage());
        }
    }

    public static void copyFile(String from, String to) throws Exception {
        File fromfile = new File(from);// 源文件夹
        File tofile = new File(to);// 目标

        // 设置来源去向
        dirFrom = fromfile;
        dirTo = tofile;
        listFileInDir(fromfile);
    }

    // 目标路径创建文件夹
    private static void listFileInDir(File file) {
        File[] files = file.listFiles();
        for (File f : files) {
            String tempfrom = f.getAbsolutePath();
            String tempto = tempfrom.replace(dirFrom.getAbsolutePath(), dirTo.getAbsolutePath()); // 后面的路径 替换前面的路径名
            if (f.isDirectory()) {
                File tempFile = new File(tempto);
                tempFile.mkdirs();
                listFileInDir(f);
            } else {
                int endindex = tempto.replaceAll("\\\\", "/").lastIndexOf("/");// 找到"/"所在的位置
                String mkdirPath = tempto.substring(0, endindex);
                File tempFile = new File(mkdirPath);
                tempFile.mkdirs();// 创建立文件夹
                copy(tempfrom, tempto);
            }
        }
    }
}
