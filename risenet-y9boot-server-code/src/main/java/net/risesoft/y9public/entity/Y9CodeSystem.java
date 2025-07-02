package net.risesoft.y9public.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Comment;
import org.hibernate.annotations.Type;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import net.risesoft.base.BaseEntity;

/**
 * 代码生成系统信息表
 *
 * @author qinman
 * @date 2023/5/9
 */
@Entity
@Table(name = "Y9_COMMON_CODE_SYSTEM")
@org.hibernate.annotations.Table(comment = "代码生成系统信息表", appliesTo = "Y9_COMMON_CODE_SYSTEM")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Y9CodeSystem extends BaseEntity {

    private static final long serialVersionUID = 8905896381019503361L;

    /** 主键 */
    @Id
    @Column(name = "ID", length = 38, nullable = false)
    @Comment("主键")
    private String id;

    /** 系统名称 */
    @NotBlank
    @Column(name = "NAME", length = 50, nullable = false)
    @Comment("系统名称")
    @Pattern(regexp = "^[a-z]([A-Za-z\\d]*[a-z\\d])?$", message = "请使用驼峰命名")
    private String name;

    /** 系统中文名称 */
    @NotBlank
    @Column(name = "CN_NAME", length = 50, nullable = false)
    @Comment("系统中文名称")
    private String cnName;

    /** 系统表前缀 */
    @NotBlank
    @Column(name = "TABLE_PREFIX", length = 50, nullable = false)
    @Comment("系统表前缀")
    @Pattern(regexp = "^[A-Za-z][A-Za-z0-9_]*_$", message = "请以字母开头,下划线结尾，只能包含字母数字和_")
    private String tablePrefix;

    /** 描述 */
    @Column(name = "DESCRIPTION", length = 255)
    @Comment("描述")
    private String description;

    /** 是否war */
    @Type(type = "numeric_boolean")
    @Column(name = "war", nullable = false)
    @Comment("是否war")
    @ColumnDefault("0")
    private Boolean war = Boolean.TRUE;

    /** 开发商GUID */
    @Column(name = "ISV_GUID", length = 38, nullable = false)
    @Comment("开发商GUID")
    private String isvGuid;

    /** 开发商名称 */
    @Column(name = "ISV_NAME", length = 38, nullable = false)
    @Comment("开发商名称")
    private String isvName;

    /** 系统代码存放文件仓库唯一标示 */
    @Column(name = "FILESTOREID", length = 50)
    @Comment("系统代码存放文件仓库唯一标示")
    private String fileStoreId;

    /** 系统环境标识 0-有生云,1-本地 */
    @Column(name = "ENVIRONMENT", length = 10)
    @Comment("系统环境标识 0-有生云,1-本地")
    private Integer environment;

    /** 是否模板 0-不是,1-是 */
    @Column(name = "TEMPLATE", length = 10)
    @Comment("是否模板 0-不是,1-是")
    @ColumnDefault("0")
    private Integer template = 0;

    public enum SystemType {
        /** 0-不是模板 */
        NOT_TEMPLATE(0),
        /** 1-是模板 */
        IS_TEMPLATE(1);

        private final int value;

        SystemType(int value) {
            this.value = value;
        }

        public int getValue() {
            return value;
        }
    }
}
