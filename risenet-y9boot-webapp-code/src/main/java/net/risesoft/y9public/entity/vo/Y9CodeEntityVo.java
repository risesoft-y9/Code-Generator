package net.risesoft.y9public.entity.vo;

import java.util.List;

import lombok.Data;

import net.risesoft.y9public.entity.Y9CodeEntity;
import net.risesoft.y9public.entity.Y9CodeField;

/**
 * @Description
 * @Author lzw
 * @Date 2023-06-26 15:32
 */
@Data
public class Y9CodeEntityVo extends Y9CodeEntity {
    private static final long serialVersionUID = -2941175781224490806L;
    private List<Y9CodeField> y9CodeFields;
}
