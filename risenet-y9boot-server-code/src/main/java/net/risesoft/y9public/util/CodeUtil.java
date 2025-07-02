package net.risesoft.y9public.util;

/**
 *
 * @author qinman
 * @date 2023/05/11
 */
public class CodeUtil {

    /**
     * 把驼峰规则的类名称或者属性名称转为下划线的表命名或列名
     *
     * @param name
     * @return
     */
    public static String formatName(String name) {
        StringBuilder newStr = new StringBuilder();
        char[] charArray = name.toCharArray();
        for (int i = 0; i < charArray.length; i++) {
            if (i == 0) {
                newStr.append(charArray[i]);
            } else {
                if (Character.isUpperCase(charArray[i])) {
                    newStr.append("_").append(charArray[i]);
                } else {
                    newStr.append(charArray[i]);
                }
            }
        }
        return newStr.toString().toUpperCase();
    }

}
