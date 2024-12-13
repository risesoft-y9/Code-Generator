<template>
  <div class="uploader-drop" :class="dropClass" ref="drop" v-show="support">
    <div class="tips" :style="{fontSize:fontSizeObj.baseFontSize}">将文件放入此处以上传</div>
  </div>
</template>

<script>
import {inject, nextTick, ref, onMounted, onBeforeUnmount} from 'vue'

const COMPONENT_NAME = 'uploader-drop'

export default {
  name: COMPONENT_NAME,
  setup() {
    const uploader = inject('uploader').proxy.uploader
    console.log(uploader, 'uploader')
    let drop = ref(null)
    let dropClass = ref('')
    const support = uploader.support
    console.log(support, 'support')
    const onDragEnter = () => {
      dropClass = 'uploader-dragover'
    }
    const onDragLeave = () => {
      dropClass = ''
    }
    const onDrop = () => {
      dropClass = 'uploader-droped'
    }
    const fontSizeObj = inject("sizeObjInfo") || {};
    onMounted(() => {
      nextTick(() => {
        const dropEle = drop.value
        uploader.assignDrop(dropEle)
        uploader.on('dragenter', onDragEnter)
        uploader.on('dragleave', onDragLeave)
        uploader.on('drop', onDrop)
      })
    })
    onBeforeUnmount(() => {
      const dropEle = drop.value
      uploader.off('dragenter', onDragEnter)
      uploader.off('dragleave', onDragLeave)
      uploader.off('drop', onDrop)
      uploader.unAssignDrop(dropEle)
    })
    return {
      drop,
      dropClass,
      support,
      onDragEnter,
      onDragLeave,
      onDrop,
      fontSizeObj
    }
  }
}
</script>

<style>
.uploader-drop {
  position: relative;
  padding: 30px 20px;
  overflow: hidden;
  border: 1px dashed #ccc;
  background-color: #f5f5f5;
  text-align: center;

  .tips {
    font-weight: bold;
    opacity: 0.2;
  }
}

.uploader-dragover {
  border-color: #999;
  background-color: #f7f7f7;
}
</style>
