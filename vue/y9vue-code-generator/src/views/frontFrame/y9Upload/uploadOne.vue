<template>
    <div class="y9-title">
        上传示例
        <el-button
            :size="fontSizeObj.buttonSize"
            :style="{ fontSize: fontSizeObj.baseFontSize }"
            class="global-btn-main"
            style="margin-left: 10px"
            type="primary"
            @click="onShowCode('base')"
            >查看代码
        </el-button>
    </div>
    <y9Upload
        :accept="accept"
        :checkedBoxSelect="checkedBoxSelect"
        :formData="formData"
        :isClear="isClear"
        :isMultiple="isMultiple"
        :maxCount="maxCount"
        :showSize="showSize"
        :size="size"
        :trueProgressBar="trueProgressBar"
        :url="url"
        @getFileData="getFileData"
    ></y9Upload>
    <div class="y9-title">y9Upload属性说明表</div>
    <y9Table :config="attrTableConfig"></y9Table>
    <div class="y9-title">y9Upload方法说明表</div>
    <y9Table :config="funTableConfig"></y9Table>
    <y9Dialog v-model:config="codeDialogConfig">
        <pre class="y9-code">
			<code id='code'>
				{{ codeDialogConfig.codeText }}
			</code>
		</pre>
    </y9Dialog>
</template>

<script lang="ts" setup>
    import { inject, ref } from 'vue';
    import { ElMessage } from 'element-plus';
    // 注入 字体对象
    const fontSizeObj: any = inject('sizeObjInfo');
    const state = reactive({
        accept: 'file', //允许文件类型后缀名,'.jpg,.png,.pdf',逗号分隔，String类型file,为全部类型
        maxCount: 10, //最多上传数量
        size: 10, //最大文件大小10M
        checkedBoxSelect: true, //是否需要全选单选按钮
        isMultiple: true, //是否支持多选
        showSize: true, //是否显示体积大小
        isClear: false, //每次选择是否清除上一次文件
        trueProgressBar: false, //是否需要根据文件大小展示进度条,如果是true需要在axios添加onUploadProgress属性
        url: 'https://vue.youshengyun.com/flowableUI/vue/attachment/upload?access_token=AT-703-HRPyygHA0Wb3cqiA7qp4uG2-jJ4sgF-c', //上传url
        formData: {
            processSerialNumber: 1532425927554764800,
            processInstanceId: '',
            taskId: '',
            fileSource: ''
        } //参数key value形式
    });

    const getFileData = (status) => {
        // console.log(status, 111);
    };
    let attrTableConfig = ref({
        showOverflowTooltip: false,
        headerBackground: true, //头部背景颜色
        pageConfig: false, //无分页
        border: false, //无边框
        columns: [
            {
                title: '属性',
                key: 'attr',
                align: 'left'
            },
            {
                title: '说明',
                key: 'explain'
            },
            {
                title: '类型',
                key: 'type'
            },
            {
                title: '可选值',
                key: 'optionalValue'
            },
            {
                title: '默认值',
                key: 'defaultValue'
            }
        ],
        tableData: [
            {
                attr: 'accept',
                explain: '上传文件类型',
                type: 'string',
                optionalValue: 'file,.jpg,.jpeg,.png...',
                defaultValue: 'file'
            },
            {
                attr: 'isMultiple',
                explain: '是否可多选',
                type: 'boolean',
                optionalValue: 'true|false',
                defaultValue: 'true'
            },
            {
                attr: 'isClear',
                explain: '每次上传是否都清除上一次选择的文件',
                type: 'boolean',
                optionalValue: 'true|false',
                defaultValue: 'false'
            },
            {
                attr: 'checkedBoxSelect',
                explain: '是否需要全选和单选按钮',
                type: 'boolean',
                optionalValue: 'true|false',
                defaultValue: 'true'
            },
            {
                attr: 'size',
                explain: '支持单文件上传的大小（单位M）',
                type: 'number',
                optionalValue: '',
                defaultValue: '10(M)'
            },
            {
                attr: 'trueProgressBar',
                explain: '是否根据上传真实进度显示进度条',
                type: 'boolean',
                optionalValue: 'true|false',
                defaultValue: 'false'
            },
            {
                attr: 'showSize',
                explain: '是否显示体积大小',
                type: 'boolean',
                optionalValue: 'true|false',
                defaultValue: 'true'
            },
            {
                attr: 'maxCount',
                explain: '最多上传文件数量',
                type: 'number',
                optionalValue: '',
                defaultValue: '10'
            },
            {
                attr: 'url',
                explain: '上传文件的地址',
                type: 'string',
                optionalValue: '',
                defaultValue: ''
            },
            {
                attr: 'formData',
                explain: `上传文件需要参数，{key:'value',{key2:'vualue2',}}`,
                type: 'object',
                optionalValue: '',
                defaultValue: ''
            }
        ]
    });
    let funTableConfig = ref({
        showOverflowTooltip: false,
        headerBackground: true, //头部背景颜色
        pageConfig: false, //无分页
        border: false, //无边框
        columns: [
            {
                title: '方法名',
                key: 'attr',
                align: 'left'
            },
            {
                title: '说明',
                key: 'explain'
            },
            {
                title: '返回值',
                key: 'type'
            }
        ],
        tableData: [
            {
                attr: 'getFileData',
                explain: '获取点击上传后文件,返回true则上传完成，false则失败',
                type: 'Array'
            },
            {
                attr: 'trueProgressBar',
                explain: '如果为true，需要在axios请求时添加onUploadProgress方法，最后返回上传的进度和状态即可',
                type: 'Array'
            },
            {
                attr: 'status',
                explain: '进度条的状态 200 成功  201 上传中 400异常  500失败',
                type: ''
            }
        ]
    });
    let codeDialogConfig = ref({
        show: false,
        okText: '复制',
        onOk: (config) => {
            return new Promise((resolve, reject) => {
                const code = document.getElementById('code');
                window.getSelection().selectAllChildren(code);
                document.execCommand('copy');
                ElMessage({
                    message: '复制成功',
                    type: 'success'
                });
                reject();
            });
        }
    });
    let {
        formData,
        url,
        checkedBoxSelect,
        result,
        accept,
        showSize,
        maxCount,
        size,
        isMultiple,
        isClear,
        trueProgressBar
    } = toRefs(state);
    const onShowCode = (type) => {
        Object.assign(codeDialogConfig.value, {
            show: true,
            type: type
        });
        if (type == 'base') {
            codeDialogConfig.value.codeText = `
<template>
  <div class="main">
      <input v-show="false" id="fileBox" :accept="accept" :multiple="isMultiple" class="input-file"
             name="file" type="file" @change="getFile">
      <div>
        <el-button :size="fontSizeObj.buttonSize" :style="{ fontSize: fontSizeObj.baseFontSize }"
                   class="global-btn-main"
                   style="margin-right: 10px;"
                   type="primary" @click="openFile">选择文件
        </el-button>
        <span class="number">
      当前选中{{ state.fileData.length }}个文件
    </span>
        <el-button :disabled="allowUpload" :size="fontSizeObj.buttonSize"
                   :style="{ fontSize: fontSizeObj.baseFontSize }"
                   class="global-btn-main"
                   style="margin-left: 10px;"
                   type="primary" @click="startUpload">开始上传
        </el-button>
        <el-checkbox v-model="checkedBox" label="全选" size="large" style="margin: 0 10px;height: 32px;" @change="checkChange"/>
        <el-button
            :size="fontSizeObj.buttonSize"
            :style="{ fontSize: fontSizeObj.baseFontSize }"
            class="global-btn-second" @click="deleteAll">删除全部
        </el-button>
      </div>

    <div v-for="(item,index) in state.fileData" class="file-list-item">
      <div class="preview">
        <div v-if="item.image"><img :src="item.image" alt="" class="preview-img"></div>
        <div v-else class="preview-div"></div>
      </div>
      <div class="btn-file">
        <div class="btn btn-file-del" @click="deleteBtn(item)">
          <span class="btn-file-del-text">X</span>
        </div>
        <div :class="item.isChecked?'checked':'unchecked'" class="btn btn-file-checkbox checkbox"
             @click.prevent="changeChecked(item)">✓
        </div>
      </div>
      <div class="fileinfo">
        <p class="fileinfo-text">
       <span class="fileinfo-text-name">
         <i v-if="showSize" class="fileinfo-text-size normalbg">{{ bytesToSize(item.file.size) }} </i>
         {{ item.file.name }}
       </span>
          <span :class="statusNum[item.status]" class="fileinfo-text-status">
          {{ statusText[item.status] }}
        </span>
        </p>
        <div>
          <el-progress v-if="item.status==200" :duration="item.duration"
                       :percentage="item.percentage" :stroke-width="5"
                       status="success"
                       striped/>
          <el-progress v-else-if="item.status==400" :duration="item.duration"
                       :percentage="item.percentage" :stroke-width="5"
                       status="warning"
                       striped/>
          <el-progress v-else-if="item.status==500" :duration="item.duration"
                       :percentage="item.percentage" :stroke-width="5" status="exception"
                       striped/>
          <el-progress v-else :duration="item.duration"
                       :percentage="item.percentage"
                       :stroke-width="5"
                       striped/>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
// 注入 字体对象
import {computed, inject, onMounted, reactive, ref} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";

const fontSizeObj: any = inject('sizeObjInfo');
const props = defineProps({
  accept: { //文件类型
    type: String,
    default: "file",
  },
  maxCount: { //最多上传数量
    type: Number,
    default: 10,
  },
  size: { //文件大小单位M
    type: Number,
    default: 10,
  },
  isMultiple: { //是否多选
    type: Boolean,
    default: false,
  },
  showSize: { //是否多选
    type: Boolean,
    default: true,
  },
  isClear: {
    type: Boolean,
    default: false,
  },
  trueProgressBar: {//根据文件上传显示真实进度
    type: Boolean,
    default: false,
  }
});
const emits = defineEmits(['getFileData']);
let state = reactive({
  fileData: [],//文件数据
})
onMounted(()=>{
  state.fileData=[]
  clearInput()
})
const statusText = {
  0: '允许上传',
  201: '上传中',
  200: '上传成功',
  500: '上传失败',
  400: '上传异常',
}
const statusNum = {
  0: '',
  201: 'progressColor',
  200: 'successColor',
  500: 'failedColor',
  400: 'warningColor',
}
onMounted(() => {
  // setTimeout(()=>{
  //   state.fileData.forEach((item)=>{
  //     item.indeterminate=false
  //   })
  // },1000)
})
// const percentage=((item)=>{
//
// })
const openFile = () => {
  //获取文件框file
  let fileBox: any = document.querySelector("#fileBox");
  //触发该事件
  fileBox.click();
}
const getFile = () => {
  //获取文件对象
  let fileObj = document.querySelector("#fileBox").files;
  if (props.isClear) {
    //清空用于接收文件的数组
    state.fileData.length = 0;
  }
  if (state.fileData.length + fileObj.length > props.maxCount) {
    ElMessage({
      type: "warning",
      message: "超过最大上传数量" + props.maxCount
    });
    f
    return
  }

  //如果设置选项为image，判断一下多选的文件中是否包含非图片的文件
  //下面这段代码是对上传的文件进行过滤判断，如文件大小等其他过滤内容请自行设置，文件名称为item.name,文件大小为item.size,文件类型为item.type
  Array.from(fileObj)?.forEach((item) => {
    if (item.size > props.size * 1024 * 1024) {
      ElMessage({
        type: "warning",
        message: item.name + "文件超过" + props.size + 'M请重新上传'
      });
      clearInput()
      return
    }
    if (props.accept == "image" && item.type.indexOf("image/") == -1) {
      ElMessage({
        type: "warning",
        message: item.name + "为非图片文件，请重新上传",
      });
    } else {
      let obj: any = {}

      if (/image\\//.test(item.type)) {
        const reader = new FileReader()
        reader.readAsDataURL(item)
        reader.onload = () => {
          obj.image = reader.result
          obj.file = item
          obj.isChecked = true;
          obj.indeterminate = true;
          obj.percentage = 0;
          obj.status = 0;
          state.fileData.push(obj);
        }
      } else {
        obj.file = item
        obj.isChecked = true;
        obj.indeterminate = true;
        obj.percentage = 0;
        obj.status = 0;
        state.fileData.push(obj);
      }
    }
  });
  clearInput()
}
const readImg = (file, cb) => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
}
const checkedBox = computed(() => {
  if (state.fileData.length == 0) return false;
  return state.fileData.every(item => item.isChecked)
})
const allowUpload = computed(() => {
  if (state.fileData.length == 0) return true;
  const hasSelectedAndNot = state.fileData.some(item => {
    return item.isChecked && item.status != 200 && item.status != 201;
  });
  return !hasSelectedAndNot
})

const checkChange = (e) => {
  if (e && state.fileData.length == 0) {
    ElMessage({
      type: "info",
      message: "请先选择文件",
    });
    return
  }

  e ? state.fileData.forEach((item) => {
    item.isChecked = true
  }) : state.fileData.forEach((item) => {
    item.isChecked = false
  })

}
const clearInput = () => {
  // 清空 input 元素的文件列表
  let inputElement = document.getElementById('fileBox');
  inputElement.value = '';
  inputElement.files = null;
}
//删除单个文件
const deleteBtn = (item, index) => {
  ElMessageBox.confirm("此操作将删除该文件, 是否继续?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
      .then(() => {
        state.fileData.forEach((ret, i) => {
          if (item.file.lastModified == ret.file.lastModified) {
            state.fileData.splice(i, 1)
          }
        })
        clearInput()
      })
      .catch(() => {
        ElMessage({
          type: "info",
          message: "已取消删除",
        });
      });

}
const handlePercentage = () => {
  state.fileData.forEach((item) => {
    if (item.isChecked && item.status != 200) {
      item.duration = item.file.size / 1024 * 5
      item.status = 201
      let time = setInterval(() => {
        let size = item.file.size
        let newSize = 1024 * 1024
        if (size > newSize) {
          item.percentage += 5
        } else {
          item.percentage += 15
        }
        item.percentage >= 100 ? item.percentage = 100 : ''
        if (item.percentage >= 100) {
          clearInterval(time)
        }
      }, 10)
    }
  })
}


const startUpload = () => {
  let file = []
  state.fileData.forEach((item) => {
    if (item.isChecked && item.status != 200) {
      file.push(item)
    }
  })

  emits('getFileData', file)
  if (!props.trueProgressBar) {
    handlePercentage()
  } else {
    state.fileData.forEach((item) => {
      if (item.isChecked && item.status != 200) {
        item.status = 201
      }
    })
  }

  clearInput()
}

//改变勾选
const changeChecked = (item => {
  item.isChecked = !item.isChecked
})
const bytesToSize = (bytes) => {
  if (bytes === 0) return '0 B';
  let k = 1024,
      sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(bytes) / Math.log(k));
  return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}
const deleteAll = () => {
  if (state.fileData.length == 0) return
  ElMessageBox.confirm("此操作将删除该文件, 是否继续?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
      .then(() => {
        state.fileData = []
        clearInput()
      })
      .catch(() => {
        ElMessage({
          type: "info",
          message: "已取消删除",
        });
      });
}
<\/script>
`;
        }
    };
</script>

<style lang="scss" scoped></style>
