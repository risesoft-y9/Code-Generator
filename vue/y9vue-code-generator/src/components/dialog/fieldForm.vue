<!--
 * @Author: qinman
 * @Date: 2023-05-18 14:26:00
 * @LastEditors: qinman
 * @LastEditTime: 2023-05-18 16:42:15
 * @Description: 
 * @FilePath: \vue-frontend-9.6.x\y9vue-code\src\components\dialog\fieldForm.vue
-->
<template>
    <div>
        <el-form :model="form" :rules="form.rules" ref="formRef">
            <el-table :data="form.tableData" style="width: 100%" ref="table">
                <el-table-column label="字段名" width="120px">
                    <template #header="{ column }">
                        <span>{{ column.label }}<span style="color: red">*</span></span>
                    </template>
                    <template v-slot="scope">
                        <el-form-item :prop="'tableData.' + scope.$index + '.name'" :rules="form.rules.name">
                            <el-input v-model="scope.row.name"></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column label="中文名" width="120px">
                    <template #header="{ column }">
                        <span>{{ column.label }}<span style="color: red">*</span></span>
                    </template>
                    <template v-slot="scope">
                        <el-form-item :prop="'tableData.' + scope.$index + '.cnName'" :rules="form.rules.cnName">
                            <el-input v-model="scope.row.cnName"></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column label="字段类型">
                    <template v-slot="scope">
                        <el-form-item :prop="'tableData.' + scope.$index + '.fieldType'" :rules="form.rules.fieldType">
                            <el-select v-model="scope.row.fieldType" @change="scope.row.defaultValue = null">
                                <el-option label="String" value="String"></el-option>
                                <el-option label="Integer" value="Integer"></el-option>
                                <el-option label="Long" value="Long"></el-option>
                                <el-option label="Float" value="Float"></el-option>
                                <el-option label="Double" value="Double"></el-option>
                                <el-option label="Byte" value="Byte"></el-option>
                                <el-option label="Byte[]" value="Byte[]"></el-option>
                                <el-option label="Boolean" value="Boolean"></el-option>
                                <el-option label="Date" value="Date"></el-option>
                            </el-select>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column label="长度">
                    <template #header="{ column }">
                        <span>{{ column.label }}<span style="color: red">*</span></span>
                    </template>
                    <template v-slot="scope">
                        <el-form-item :prop="'tableData.' + scope.$index + '.fieldLength'" :rules="form.rules.fieldLength">
                            <el-input-number v-model="scope.row.fieldLength" :controls="false"
                                             style="width: 60%"></el-input-number>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column label="默认值">
                    <template v-slot="scope">
                        <el-form-item :prop="'tableData.' + scope.$index + '.defaultValue'" >

                            <el-input v-model="scope.row.defaultValue" v-if="scope.row.fieldType === 'String'"
                                      :controls="false" :disabled="scope.row.isLarge"
                            ></el-input>
                            <el-input-number v-if="isNumberType(scope.row.fieldType)" v-model="scope.row.defaultValue"
                                             :controls="false"
                            ></el-input-number>
                            <el-input v-if="isDisplayType(scope.row.fieldType)" :controls="false"
                                      :disabled="true"></el-input>
                            <el-select v-if="scope.row.fieldType == 'Boolean'" v-model="scope.row.defaultValue">
                                <el-option :value="true">true</el-option>
                                <el-option :value="false">false</el-option>
                            </el-select>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column label="可以为空">
                    <template v-slot="scope">
                        <el-form-item :prop="'tableData.' + scope.$index + '.nullable'">
                            <el-radio-group v-model="scope.row.nullable">
                                <el-radio :label="true">是</el-radio>
                                <el-radio :label="false">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column label="是否长字段">
                    <template v-slot="scope">
                        <el-form-item :prop="'tableData.' + scope.$index + '.isLarge'">
                            <el-radio-group v-model="scope.row.isLarge" :disabled="enableLargeField(scope.row)" @change="isLargeChange(scope.row)">
                                <el-radio :label="true">是</el-radio>
                                <el-radio :label="false">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </template>
                </el-table-column>
              <el-table-column label="是否唯一">
                <template v-slot="scope">
                  <el-form-item :prop="'tableData.' + scope.$index + '.isUnique'">
                    <el-radio-group v-model="scope.row.isUnique">
                      <el-radio :label="true">是</el-radio>
                      <el-radio :label="false">否</el-radio>
                    </el-radio-group>
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
        <el-button type="primary" @click="addRow">+ 字段</el-button>


    </div>
</template>

<script setup>
import {ref} from 'vue';
import {deleteField, getFieldsList, saveFields} from "@/api/field";
import {nameValidator} from "@/utils/validate";
import {ElNotification} from "element-plus";

const entityId = ref('');
const props = defineProps({
    entityId: String
});

entityId.value = props.entityId

const form = ref({
    tableData: [
        {
            name: '',
            cnName: '',
            fieldType: 'String',
            fieldLength: '50',
            defaultValue: undefined,
            isLarge: false,
            nullable: true,
            isUnique: false
        } // Initial field
    ],
    rules : {
        name: [{required: true, validator: nameValidator, trigger: 'blur'}],
        cnName: [{required: true, message: '请输入中文名', trigger: 'blur'}],
        fieldLength: [{required: true, message: '长度不能为空', trigger: 'blur'}]
    }

});
const formRef = ref();

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
    deleteField(row.id).then(res => {
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
onMounted(async () => {
    // 回调显示当前实体字段
    if (props.entityId.length > 0) {
        const res = await getFieldsList(entityId.value);

        if (res.success) {
            if (res.data.length > 0) {
                form.value.tableData = res.data;
            }
        }
    }
});

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

const saveFieldList = async (entityId) => {

    try {
        const valid = await formRef.value.validate();
        if (valid) {
            const visitedNames = new Set();
            let duplicateValid = true;
            // 校验通过
            for (let i = 0; i < form.value.tableData.length; i++) {
                // validate 所有手动进行其他校验
                await formRef.value.validateField('tableData' + i + 'cnName');
                await formRef.value.validateField('tableData' + i + 'fieldLength');
                const currentName = form.value.tableData[i].name;
                // 字段名重复
                if (visitedNames.has(currentName)) {
                    console.error(`Name "${currentName}" is duplicated!`);

                    duplicateValid = false;
                } else {
                    // 将当前 name 添加到已访问的集合中
                    visitedNames.add(currentName);
                }
                form.value.tableData[i].codeEntityId = entityId;
            }
            if (duplicateValid) {
                const res = await saveFields(form.value.tableData);
                ElNotification({
                    title: res.success ? '成功' : '失败',
                    message: res.success ? '保存成功' : '保存失败',
                    type: res.success ? 'success' : 'error',
                    duration: 2000,
                    offset: 80,
                });
                return res;
            } else {
                throw new Error("字段名不能重复")
            }

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

function enableLargeField(row) {

    if (row.fieldType != 'String' && row.fieldType != 'Byte[]') {
        row.isLarge = false;
        return true;
    }
    return false;
}

function isLargeChange(row){
    row.defaultValue = '';
}
defineExpose({
    getFormData,
    saveFieldList
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