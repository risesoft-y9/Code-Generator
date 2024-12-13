package net.risesoft.y9public.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
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
 * 代码生成系统的类信息
 *
 * @author qinman
 * @date 2023/5/9
 */
@Entity
@Table(name = "Y9_COMMON_CODE_ENTITY")
@org.hibernate.annotations.Table(comment = "代码生成系统的实体信息", appliesTo = "Y9_COMMON_CODE_ENTITY")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Y9CodeEntity extends BaseEntity {

    private static final long serialVersionUID = 8905896381019503361L;

    /** 主键 */
    @Id
    @Column(name = "ID", length = 38, nullable = false)
    @Comment("主键")
    private String id;

    /** 实体名称 */
    @NotBlank
    @Column(name = "NAME", length = 50, nullable = false)
    @Comment("实体名称")
    @Pattern(regexp = "^[A-Z][A-Za-z]*", message = "请使用驼峰命名")
    private String name;

    @NotBlank
    @Column(name = "CODESYSTEMID", length = 50, nullable = false)
    @Comment("系统唯一标示")
    private String codeSystemId;

    /** 实体中文名称 */
    @NotBlank
    @Column(name = "CN_NAME", length = 50, nullable = false)
    @Comment("实体中文名称")
    private String cnName;

    /** 是否多租户 */
    @Type(type = "numeric_boolean")
    @Column(name = "TENANTED", nullable = false)
    @Comment("是否多租户")
    @ColumnDefault("0")
    private Boolean tenanted = Boolean.FALSE;

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

    /** 表名 */
    @Transient
    private String tableName;
}
