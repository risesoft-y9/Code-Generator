package net.risesoft.y9public.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
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
@Table(name = "Y9_COMMON_CODE_FIELD")
@org.hibernate.annotations.Table(comment = "代码生成系统的类信息", appliesTo = "Y9_COMMON_CODE_FIELD")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Y9CodeField extends BaseEntity {

    private static final long serialVersionUID = 8905896381019503361L;

    /** 主键 */
    @Id
    @Column(name = "ID", length = 38, nullable = false)
    @Comment("主键")
    private String id;

    @NotBlank
    @Column(name = "CODEENTITYID", length = 50, nullable = false)
    @Comment("实体唯一标示")
    private String codeEntityId;

    /** 字段名称 */
    @NotBlank
    @Column(name = "NAME", length = 50, nullable = false)
    @Comment("字段名称")
    @Pattern(regexp = "^(?=.{1,255}$)[a-z][A-Za-z\\d]*$", message = "请使用驼峰命名")
    private String name;

    /** 列名 */
    @Transient
    private String columnName;

    /** 系统中文名称 */
    @NotBlank
    @Column(name = "CN_NAME", length = 50, nullable = false)
    @Comment("系统中文名称")
    private String cnName;

    /** 可以为空 */
    @Type(type = "numeric_boolean")
    @Column(name = "NULLABLE", nullable = false)
    @Comment("可以为null")
    @ColumnDefault("1")
    private Boolean nullable = Boolean.TRUE;

    /** 类型 */
    @NotBlank
    @Column(name = "FIELDTYPE", length = 20, nullable = false)
    @Comment("类型")
    private String fieldType;

    /** 长度 */
    @NotNull
    @Column(name = "FIELDLENGTH", length = 10, nullable = false)
    @Comment("长度")
    private Integer fieldLength;

    /** 默认值 */
    @Column(name = "DEFAULTVALUE", length = 20)
    @Comment("默认值")
    private String defaultValue;

    /** 是否长对象 */
    @NotNull
    @Column(name = "ISLARGE", length = 10, nullable = false)
    @Comment("是否长对象")
    @ColumnDefault("0")
    private Boolean isLarge = Boolean.FALSE;

    @Column(name = "ISUNIQUE", length = 10, nullable = false)
    @Comment("是否唯一")
    @ColumnDefault("0")
    private Boolean isUnique = Boolean.FALSE;

}
