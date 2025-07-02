package net.risesoft.${codeEntity.tenanted?string('', 'y9public.')}repository.specification;

import java.lang.reflect.Field;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

/**
 * @description ${codeEntity.cnName}
 * @author ${codeEntity.isvName}
 * @date ${.now?string('yyyy-MM-dd')}
 */
public class ${codeEntity.name?cap_first}Specification<${codeEntity.name?cap_first}> implements Specification<${codeEntity.name?cap_first}> {

    private static final long serialVersionUID = 1L;

    private ${codeEntity.name?cap_first} ${codeEntity.name?uncap_first};

    public ${codeEntity.name?cap_first}Specification(${codeEntity.name?cap_first} ${codeEntity.name?uncap_first}) {
        super();
        this.${codeEntity.name?uncap_first} = ${codeEntity.name?uncap_first};
    }

    /** 这里只是针对实体中字符串类型的字段生成的搜索,且前端只用第一个字符串做为搜索条件,如果需要比较详细的查找,需要改造前端代码以及此类 */
    @Override
    public Predicate toPredicate(Root<${codeEntity.name?cap_first}> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        Predicate predicate = criteriaBuilder.conjunction();
        List<Expression<Boolean>> expressions = predicate.getExpressions();

        Field[] fields = ${codeEntity.name?uncap_first}.getClass().getDeclaredFields();
        for (Field field : fields) {
            field.setAccessible(true);
            try {
                if (null != field.get(${codeEntity.name?uncap_first})) {
                    if (field.getType().getTypeName().toLowerCase().contains("string")) {
                        expressions.add(criteriaBuilder.like(root.<String>get(field.getName()), "%" + field.get(${codeEntity.name?uncap_first}) + "%"));
                    }
                }
            } catch (IllegalArgumentException e) {
                e.printStackTrace();
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }
        return predicate;
    }
}
