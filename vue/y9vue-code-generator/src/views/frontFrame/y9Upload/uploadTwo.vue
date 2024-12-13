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
    <y9Uploads
        :accept="accept"
        :isClear="isClear"
        :isMultiple="isMultiple"
        :maxCount="maxCount"
        :size="size"
        @getFileData="getFileData"
    >
    </y9Uploads>
    <div class="y9-title">y9Upload属性说明表</div>
    <y9Table :config="attrTableConfig"></y9Table>
    <div class="y9-title">y9Upload方法说明表</div>
    <y9Table :config="funTableConfig"></y9Table>
    <y9Dialog v-model:config="codeDialogConfig">
        <pre class="y9-code">
			<code id="code">
				{{ codeDialogConfig.codeText }}
			</code>
		</pre>
    </y9Dialog>
</template>

<script lang="ts" setup>
    import { inject, reactive, ref } from 'vue';
    import { ElMessage } from 'element-plus';
    // 注入 字体对象
    const fontSizeObj: any = inject('sizeObjInfo');
    let state = reactive({
        accept: 'file', //image为图片，file为所有文件
        isMultiple: true, //是否可以多选
        isClear: false, //每次上传是否需要清空已选择的文件
        fileData: [],
        size: 10, //文件最大大小,默认5M
        maxCount: 10, //做大上传数量
        getFileData(val) {
            //开始上传回调
            if (val.length > 0) {
                ElMessage({
                    type: 'success',
                    message: '上传成功'
                });
            }
            console.log(val);
            state.fileData = val;
        }
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
                attr: 'size',
                explain: '支持单文件上传的大小（单位M）',
                type: 'number',
                optionalValue: '',
                defaultValue: '10(M)'
            },
            {
                attr: 'maxCount',
                explain: '最多上传文件数量',
                type: 'number',
                optionalValue: '',
                defaultValue: '10'
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
                explain: '获取点击上传后文件',
                type: 'Array'
            }
        ]
    });
    let { maxCount, size, accept, fileType, isMultiple, isClear, fileData, getFileData } = toRefs(state);

    const onShowCode = (type) => {
        Object.assign(codeDialogConfig.value, {
            show: true,
            type: type
        });
        if (type == 'base') {
            codeDialogConfig.value.codeText = `
<template>
  <div>
    <!-- 上传文件的表单，但是需要隐藏起来，利用其它按钮触发他 -->
    <input
    v-show="false"
    id="fileBox"
    :accept="accept == 'image' ? 'image/*' : ''"
    :multiple="isMultiple"
    type="file"
    @change="getFile"
    />
    <div>
    <el-button :size="fontSizeObj.buttonSize" :style="{ fontSize: fontSizeObj.baseFontSize }" class="global-btn-main"
    style="margin-right: 10px;"
    type="primary" @click="openFile">选择文件
    </el-button>
    <span >
    当前选中{{ fileData.length }}个文件
    </span>
    <el-button :size="fontSizeObj.buttonSize" :style="{ fontSize: fontSizeObj.baseFontSize }" class="global-btn-main"
    :disabled="allowUpload"
    style="margin-left: 10px;"
    type="primary" @click="startUpload">开始上传
    </el-button>
    <el-button
    :size="fontSizeObj.buttonSize"
    :style="{ fontSize: fontSizeObj.baseFontSize }"
    class="global-btn-second" @click="deleteAll">删除全部
    </el-button>
    </div>
    <div class="showFile">
    <div
    v-for="(item, index) in fileData"
    :key="index"
    :title="item.name"
    class="item"
    >
        <!-- 放图片的盒子 -->
    <div class="imageBox">
    <img
    v-if="getFileType(item)"
    :src="getAssetsFile(item)"
    alt=""
    />
    <img v-else alt="" src="../../../assets/fjIcons/tongyong.png"/>
    </div>
        <!-- 文字 -->
    <div class="text">
    {{ item.name }}
    </div>
        <!-- 删除按钮 -->
    <div class="icon" @click="deleteData(index)">
    <el-button :icon="Delete" circle></el-button>
    </div>
    </div>

        <!-- 下面四个item用于解决flex布局的位置错乱的问题 -->
    <div class="item clear"></div>
    <div class="item clear"></div>
    <div class="item clear"></div>
    <div class="item clear"></div>
    <div class="item clear"></div>
    <div class="item clear"></div>
    <div class="item clear"></div>
    </div>
    </div>
    </template>

    <script lang="ts" setup>
    import {computed, inject, onMounted, reactive, ref} from 'vue';
    // import Upload from '@/components/y9Upload/component/index.vue'
    import {Delete,} from '@element-plus/icons-vue'
    import {ElMessage, ElMessageBox} from 'element-plus'
// import settings from "../../../../../../y9vue-flowableUI/src/settings";
    import y9_storage from '@/utils/storage';
    import axios from 'axios';
    const props = defineProps({
    accept: { //文件类型
    type: String,
    default: "image",
    },
    maxCount:{ //最多上传数量
    type: Number,
    default: 10,
    },
    size: { //文件大小
    type: Number,
    default: 10,
    },
    isMultiple: { //是否多选
    type: Boolean,
    default: false,
    },
    isClear: {
    type: Boolean,
    default: false,
    },
    });
    const emits = defineEmits(['getFileData']);
// 注入 字体对象
    const fontSizeObj: any = inject('sizeObjInfo');
    let state = reactive({
    fileData: [],//处理后的文件
    file:[],//整个文件
    })
    onMounted(()=>{
    state.fileData=[]
    clearInput()
    })
    const getAssetsFile = (item) => {
    return new URL(\`../../../assets/fjIcons/test.png\`, import.meta.url).href;
};
//开始上传
const startUpload=()=>{
  if(state.file.length==0) return
  emits('getFileData',state.file)
}
const allowUpload = computed(() => {
  if (state.fileData.length == 0) return true;
  // const hasSelectedAndNot = state.fileData.some(item => {
  //   return item.isChecked && item.status != 200 && item.status != 201;
  // });
  return false
  // return !hasSelectedAndNot
})
//触发选择文件筐
const openFile = () => {
  //获取文件框file
  let fileBox:any = document.querySelector("#fileBox");
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
  if(state.fileData.length>=props.maxCount){
    ElMessage({
      type: "warning",
      message:  "超过最大上传数量"+props.maxCount
    });
    clearInput()
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
      return
    }
    if (props.accept == "image" && item.type.indexOf("image/") == -1) {
      ElMessage({
        type: "warning",
        message: item.name + "为非图片文件，请重新上传",
      });
    } else {
      //将循环出来的文件用数组接收，利于之后的数据处理
      state.fileData.push({
        name: item.name,
        type: item.type,
        size: item.size,
      });
      state.file.push(item)
    }
  });
  //循环fileData，获取文件的后缀
  state.fileData.forEach((item) => {
    item.type = item.name.slice(item.name.lastIndexOf(".") + 1);
  });
}
//删除该文件
const deleteData = (index) => {
  ElMessageBox.confirm("此操作将删除该文件, 是否继续?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
      .then(() => {
        state.fileData.splice(index, 1);
        clearInput()
      })
      .catch(() => {
        ElMessage({
          type: "info",
          message: "已取消删除",
        });
      });
}
//删除全部
const deleteAll=()=>{
  if(state.file.length==0) return
  ElMessageBox.confirm("此操作将删除该文件, 是否继续?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
      .then(() => {
        state.fileData.length=0
        // 清空 input 元素的文件列表
        clearInput()
      })
      .catch(() => {
        ElMessage({
          type: "info",
          message: "已取消删除",
        });
      });
}
const clearInput = () => {
  // 清空 input 元素的文件列表
  let inputElement = document.getElementById('fileBox');
  inputElement.value = '';
  inputElement.files = null;
}
let {fileData,} = toRefs(state)
//根据类型展示不同文件
const getFileType = (item) => {
  if (item.type == 'xls' ||
      item.type == 'xlsx' ||
      item.type == 'doc' ||
      item.type == 'docx' ||
      item.type == 'ppt' ||
      item.type == 'pdf' ||
      item.type == 'txt' ||
      item.type == 'zip' ||
      item.type == '7z' ||
      item.type == 'rar' ||
      item.type == 'jpg' ||
      item.type == 'png' ||
      item.type == 'psd' ||
      item.type == 'ai' ||
      item.type == 'gif' ||
      item.type == 'bmp' ||
      item.type == 'svg' ||
      item.type == 'flv' ||
      item.type == 'mp4' ||
      item.type == 'fla' ||
      item.type == 'mov' ||
      item.type == 'mkv' ||
      item.type == 'wmv' ||
      item.type == 'wav') {
    return true;
  }
  return false;
}
<\/script>
`;
        }
    };
</script>

<style lang="scss" scoped></style>
