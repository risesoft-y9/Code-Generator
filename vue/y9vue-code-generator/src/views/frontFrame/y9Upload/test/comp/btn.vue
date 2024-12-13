<template>
  <div ref="btn" class="uploader-btn" v-show="support">
    <el-button :size="fontSizeObj.buttonSize"
               :style="{ fontSize: fontSizeObj.baseFontSize }" type="primary">
      <slot></slot>
    </el-button>
  </div>
</template>

<script>
import {inject, nextTick, ref, onMounted} from 'vue'


const COMPONENT_NAME = 'uploader-btn'

export default {
  name: COMPONENT_NAME,
  props: {
    directory: {
      type: Boolean,
      default: false
    },
    single: {
      type: Boolean,
      default: false
    },
    attrs: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  setup(props) {
    const btn = ref(null)
    const uploader = inject('uploader').proxy.uploader
    const support = uploader?.support || true
    const fontSizeObj = inject("sizeObjInfo") || {};
    onMounted(() => {
      nextTick(() => {
        uploader.assignBrowse(btn.value, props.directory, props.single, props.attrs)
      })
    })
    return {
      btn,
      support,
      fontSizeObj
    }
  }
}
</script>

<style>
.uploader-btn {
  display: flex;
  margin-right: 10px;
}

.uploader-btn:hover {
  background-color: rgba(0, 0, 0, .08);
}
</style>
