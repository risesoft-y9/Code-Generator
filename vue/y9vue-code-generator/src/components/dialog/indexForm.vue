<template>
    <div>
        <el-form :model="form" :rules="form.rules" ref="formRef" v-loading="loading">
            <el-table :data="form.tableData" style="width: 100%" ref="table">
                <el-table-column label="索引名" width="300px" prop="indexName">
                    <template #header="{ column }">
                        <span>{{ column.label }}<span style="color: red">*</span></span>
                    </template>
                    <template v-slot="scope">
                        <el-form-item :prop="'tableData.' + scope.$index + '.indexName'" :rules="form.rules.indexName">
                            <el-input v-model="scope.row.indexName"></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column label="索引字段" width="500px" prop="indexFields">
                  <template #header="{ column }">
                    <span>{{ column.label }}<span style="color: red">*</span></span>
                  </template>
                  <template v-slot="scope">
                    <el-form-item :prop="'tableData.' + scope.$index + '.indexFields'" :rules="form.rules.indexFields">
                      <el-select
                          v-model="scope.row.indexFields"
                          multiple
                          placeholder="选择索引字段"
                          style="width: 100%"
                      >
                        <el-option
                            v-for="item in entityFields"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        />
                      </el-select>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template v-slot="scope">
                        <el-button @click="removeRow(scope.row)" style="border: 0;box-shadow: none;  display: flex;">
                            <el-icon class="ri-delete-bin-line"></el-icon>
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form>
        <el-button type="primary" @click="addRow">+ 索引</el-button>
    </div>
</template>

<script setup>
import {ref} from 'vue';
import {getFieldsList} from "@/api/field";
import {getIndexList, saveIndexList, deleteIndex} from "@/api/index";
import {ElNotification} from "element-plus";

const entityId = ref('');
const props = defineProps({
    entityId: String
});

let loading = ref(true);

entityId.value = props.entityId;

const indexNameValidator = async (rule, value, callback) => {

  const nameRegex = /^[a-z]([A-Za-z\d]*[a-z\d])?$/;

  if (value === "" || value === null || value === undefined){
    callback(new Error('请输入索引名称'));
  }else if (!nameRegex.test(value)) {
    callback(new Error('请使用驼峰命名'));
  } else {
    let set = new Set(form.value.tableData.map(obj => obj.indexName));
    if (set.size < form.value.tableData.length){
      callback(new Error('索引名不能重复'));
    }else {
      callback();
    }
  }
}
const indexFieldsValidator = async (rule, value, callback) => {

  if (value === null || value.length <= 0){
    callback(new Error('请选择索引'));
  } else {
    callback();
  }
}

const form = ref({
    tableData: [
        {
            id: '',
            indexName: '',
            indexFields: [],
            codeEntityId: ''
        }
    ],
    rules : {
        indexName: [{required: true, validator: indexNameValidator, trigger: 'blur'}],
        indexFields: [{required: true,validator: indexFieldsValidator, trigger: 'blur'}]
    }

});

onMounted(async () => {
  // 回调显示当前实体字段
  if (props.entityId.length > 0) {
    const fieldRes = await getFieldsList(entityId.value);

    if (fieldRes.success) {
      if (fieldRes.data.length > 0) {
        entityFields = fieldRes.data;
      }
    }

    const indexRes = await getIndexList(entityId.value);

    if (indexRes.success){
      if (indexRes.data.length > 0){
        for (let i = 0; i < indexRes.data.length; i++) {
          indexRes.data[i]['indexFields'] = indexRes.data[i].indexFields.split(",");
        }
        form.value.tableData = indexRes.data;
      }
      loading.value = false;
    }
  }
});

const formRef = ref();

let entityFields = ref([]);

// 获取表单数据的方法
const getFormData = () => {
    return form.value.tableData;
}

const addRow = () => {
    form.value.tableData.push({
        name: '',
        cnName: '',
        fieldType: 'String',
        fieldLength: '50',
        defaultValue: undefined,
        isLarge: false,
        nullable: true,
        isUnique: false
    });
};

const removeRow = (row) => {
    const index = form.value.tableData.indexOf(row);
    if (index !== -1) {
        form.value.tableData.splice(index, 1);
    }
    if (row.id == null) {
        return;
    }
    deleteIndex(row.id).then(res => {
        if (res.success) {
            ElNotification({
                type: 'success',
                title: '成功',
                message: res.msg,
                duration: 2000,
                offset: 80,
            })
        }
    })
};

const saveIndexListMethod = async (entityId) => {

  try {
    let valid = await formRef.value.validate();

    if (valid) {
      for (let i = 0; i < form.value.tableData.length; i++) {
          form.value.tableData[i].indexFields = form.value.tableData[i].indexFields.toString();
          form.value.tableData[i].codeEntityId = entityId;
      }
        const res = await saveIndexList(form.value.tableData);
        ElNotification({
          title: res.success ? '成功' : '失败',
          message: res.success ? '保存成功' : '保存失败',
          type: res.success ? 'success' : 'error',
          duration: 2000,
          offset: 80,
        });
        return res;

    } else {
      // 校验失败
      return false;
    }
  } catch (error) {

    ElNotification({
      title: '失败',
      message: error.message != null ? error.message : "表单校验失败",
      type: 'error',
      duration: 2000,
      offset: 80,
    });
    return false;
  }
}


/**
 * 判断是否是数字类型
 * @param type
 */
function isNumberType(type) {
    return type === 'Integer' || type === 'Double' || type === 'Long';
}

function isDisplayType(type) {

    return !isNumberType(type) && type != 'String' && type != 'Boolean';
}



defineExpose({
    getFormData,
    saveIndexListMethod
})
</script>
<style>

.el-divider--horizontal {
    margin: 15px 0;
}

.el-input-number .el-input__inner {
    text-align: left;
}

.custom-radio-group .el-radio {
    margin-right: 10px;
}

.required {
    color: red;
}

.el-table .el-form-item__error {
    padding-top: 1px;
}

.el-table .el-form-item__content {
    margin-bottom: 13px !important;
    margin-top: 13px !important;
}

</style>