package net.risesoft.${codeEntity.tenanted?string('', 'y9public.')}entity;

import java.util.Date;
import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Lob;
import javax.persistence.Index;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Comment;

import org.springframework.format.annotation.DateTimeFormat;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;
import lombok.NoArgsConstructor;

import net.risesoft.base.BaseEntity;

/**
 * @description ${codeEntity.cnName}
 * @author ${codeEntity.isvName}
 * @date ${.now?string('yyyy-MM-dd')}
 */
@Entity
@Data
@NoArgsConstructor
<#if codeIndexList?size == 0>
@Table(name="${codeSystem.tablePrefix}${codeEntity.tableName}")
<#else>
@Table(name="${codeSystem.tablePrefix}${codeEntity.tableName}",
    indexes = {
<#list codeIndexList as codeIndex>
    <#if codeIndex_has_next == false>
        @Index(name = "${codeSystem.tablePrefix}${codeEntity.tableName}_${codeIndex.indexName}", columnList = "${codeIndex.indexFieldList}")
    <#else>
        @Index(name = "${codeSystem.tablePrefix}${codeEntity.tableName}_${codeIndex.indexName}", columnList = "${codeIndex.indexFieldList}"),
    </#if>
</#list>
})
</#if>
@org.hibernate.annotations.Table(comment = "${codeEntity.cnName}", appliesTo = "${codeSystem.tablePrefix}${codeEntity.tableName}")
public class ${codeEntity.name?cap_first} extends BaseEntity implements Serializable {

    private static final long serialVersionUID = ${.now?string('yyyyMMddHHmmss')}L;

    /** 主键 */
    @Id
    @Column(name = "ID", length = 38, nullable = false)
    @Comment("主键")
    private String id;

    <#list codeFieldList as codeField>
    /**
     * ${codeField.cnName}
     */
    <#if codeField.isLarge>
    @Lob
    </#if>
    <#if codeField.fieldType == "Date">
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    </#if>
    <#if codeField.fieldLength == 0>
    @Column(name = "${codeField.columnName}", nullable = ${codeField.nullable?string('true', 'false')},unique = ${codeField.isUnique?string('true','false')})
    <#else>
    @Column(name = "${codeField.columnName}", nullable = ${codeField.nullable?string('true', 'false')},unique = ${codeField.isUnique?string('true','false')}, length = ${codeField.fieldLength})
    </#if>
    @Comment("${codeField.cnName}")
    <#if (codeField.defaultValue)??>
    @ColumnDefault("'${codeField.defaultValue}'")
    </#if>
    private ${codeField.fieldType} ${codeField.name?uncap_first};

    </#list>
}
