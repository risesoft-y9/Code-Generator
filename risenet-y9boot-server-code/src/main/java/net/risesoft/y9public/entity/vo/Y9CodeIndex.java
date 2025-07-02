package net.risesoft.y9public.entity.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.risesoft.base.BaseEntity;
import org.hibernate.annotations.Comment;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.util.List;

@Entity
@Table(name = "Y9_COMMON_CODE_INDEX")
@org.hibernate.annotations.Table(comment = "代码生成系统的索引信息", appliesTo = "Y9_COMMON_CODE_INDEX")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Y9CodeIndex extends BaseEntity {

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
    @Column(name = "INDEXNAME", length = 50, nullable = false,unique = true)
    @Comment("索引名称")
    @Pattern(regexp = "^(?=.{1,255}$)[a-z][A-Za-z\\d]*$", message = "请使用驼峰命名")
    private String indexName;

    /** 字段名称 */
    @NotBlank
    @Column(name = "INDEXFIELDS", length = 500, nullable = false)
    @Comment("索引字段")
    private String indexFields;

    @Transient
    private String indexFieldList;

}
