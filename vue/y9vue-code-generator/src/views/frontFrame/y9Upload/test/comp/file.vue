<template>
  <div class="uploader-file" :status="status">
    <slot
        :file="file"
        :list="list"
        :status="status"
        :paused="paused"
        :error="error"
        :response="response"
        :average-speed="averageSpeed"
        :formated-average-speed="formatedAverageSpeed"
        :current-speed="currentSpeed"
        :is-complete="isComplete"
        :is-uploading="isUploading"
        :size="size"
        :formated-size="formatedSize"
        :uploaded-size="uploadedSize"
        :progress="progress"
        :progress-style="progressStyle"
        :progressing-class="progressingClass"
        :time-remaining="timeRemaining"
        :formated-time-remaining="formatedTimeRemaining"
        :type="type"
        :extension="extension"
        :file-category="fileCategory"
    >
      <div class="uploader-file-progress" :class="progressingClass" :style="progressStyle"></div>
      <div class="uploader-file-info">
        <div class="uploader-file-name">
          <div style="display: flex;align-items: center;margin-left: 10px"><img :src="imageFile" alt="" style="width: 24px;height: 24px"></div>
          <div>{{ file.name }}</div>
        </div>
        <div class="uploader-file-size">{{ formatedSize }}</div>
        <div class="uploader-file-meta"></div>
        <div class="uploader-file-status">
          <span v-show="status !== 'uploading'">{{ statusText }}</span>
          <span v-show="status === 'uploading'">
            <span>{{ progressStyle.progress }}&nbsp;</span>
            <em>{{ formatedAverageSpeed }}&nbsp;</em>
            <i>{{ formatedTimeRemaining }}</i>
          </span>
        </div>
        <div class="uploader-file-actions">
          <span class="uploader-file-pause" @click="pause"></span>
          <span class="uploader-file-resume" @click="resume">️</span>
          <span class="uploader-file-retry" @click="retry"></span>
          <span class="uploader-file-remove" @click="remove"></span>
        </div>
      </div>
    </slot>
  </div>
</template>

<script>
import {computed, ref, toRaw, watch, onMounted, onUnmounted, getCurrentInstance} from 'vue'
import Uploader from '../common/uploader'
import {secondsToStr} from '../common/utils'
import events from '../common/file-events'
import wordPng from './image/Word.png'
import CodePng from './image/Code.png'
import ExcelPng from './image/Excel.png'
import ExePng from './image/ExE.png'
import FolderPng  from './image/Folder.png'
import MiscPng from './image/Misc.png'
import PDFPng from './image/PDF.png'
import PPTPng from './image/PPT.png'
import TEXTPng from './image/Text.png'
import VideoPng from './image/Video.png'
import WEBPng from './image/WEB.png'
import ZipPng from './image/Zip.png'
import otherPng from './image/other.png'
import jpgPng from './image/jpg.png'
import jpegPng from './image/jpeg.png'
import pngPng from './image/png.png'
import jarPng from './image/jar.png'
const COMPONENT_NAME = 'uploader-file'

export default {
  name: COMPONENT_NAME,
  props: {
    file: {
      type: Object,
      default() {
        return {}
      }
    },
    list: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const instance = getCurrentInstance()
    let handlers = {}
    let tid = 0
    const response = ref(null)
    const paused = ref(false)
    const error = ref(false)
    const averageSpeed = ref(0)
    const currentSpeed = ref(0)
    const isComplete = ref(false)
    const isUploading = ref(false)
    const size = ref(0)
    const formatedSize = ref('')
    const uploadedSize = ref(0)
    const progress = ref(0)
    const timeRemaining = ref(0)
    const type = ref('')
    const extension = ref('')
    const progressingClass = ref('')
    const fileCategory = computed(() => {
      const isFolder = props.file.isFolder
      let type = isFolder ? 'folder' : 'unknown'
      const categoryMap = props.file.uploader.opts.categoryMap
      const typeMap = categoryMap || {
        image: ['gif', 'jpg', 'jpeg', 'png', 'bmp', 'webp'],
        video: ['mp4', 'm3u8', 'rmvb', 'avi', 'swf', '3gp', 'mkv', 'flv'],
        audio: ['mp3', 'wav', 'wma', 'ogg', 'aac', 'flac'],
        document: ['doc', 'txt', 'docx', 'pages', 'epub', 'pdf', 'numbers', 'csv', 'xls', 'xlsx', 'keynote', 'ppt', 'pptx']
      }
      Object.keys(typeMap).forEach((_type) => {
        const extensions = typeMap[_type]
        if (extensions.indexOf(extension.value) > -1) {
          type = _type
        }
      })
      return type
    })
    const progressStyle = computed(() => {
      const progressValue = Math.floor(progress.value * 100)
      const style = `translateX(${Math.floor(progressValue - 100)}%)`
      return {
        progress: `${progressValue}%`,
        webkitTransform: style,
        mozTransform: style,
        msTransform: style,
        transform: style
      }
    })
    const formatedAverageSpeed = computed(() => {
      return `${Uploader.utils.formatSize(averageSpeed.value)} / s`
    })
    const imageFile = computed(() => {
      console.log(props,'props')
      const fileName = props.file?.name;
      console.log(fileName,'fileName')
      const fileExtension = fileName?.split('.').pop().toLowerCase();
      const isFolder = props.file.isFolder
      if(isFolder){
        return FolderPng
      }
      switch (fileExtension) {
        case 'pdf':
          return PDFPng;
        case 'jpg':
          return jpgPng;
        case 'png':
          return pngPng;
        case 'jpeg':
          return jpegPng;
        case 'jar':
          return jarPng;
        case 'doc':
        case 'docx':
          return wordPng;
        case 'xls':
        case 'xlsx':
          return ExcelPng;
        case 'ppt':
        case 'pptx':
          return PPTPng;
        case 'txt':
          return TEXTPng;
        case 'zip':
          return ZipPng;
        case 'exe':
          return ExePng;
        case 'mp4':
        case 'avi':
        case 'mov':
          return VideoPng;
        case 'html':
        case 'css':
        case 'js':
          return CodePng;
        case 'webp':
          return WEBPng;
        case 'folder':
          return FolderPng; // 假设文件夹图标
        default:
          return otherPng; // 默认图标
      }
    })
    const status = computed(() => {
      let isError = error
      if (isComplete.value) {
        return 'success'
      } else if (isError.value) {
        return 'error'
      } else if (isUploading.value) {
        return 'uploading'
      } else if (paused.value) {
        return 'paused'
      } else {
        return 'waiting'
      }
    })
    const statusText = computed(() => {
      const fileStatusText = props.file.uploader.fileStatusText
      let txt = status.value
      if (typeof fileStatusText === 'function') {
        txt = fileStatusText(status.value, response.value)
      } else {
        txt = fileStatusText[status.value]
      }
      return txt || status
    })
    const formatedTimeRemaining = computed(() => {
      const file = props.file
      if (timeRemaining.value === Number.POSITIVE_INFINITY || timeRemaining.value === 0) {
        return ''
      }
      let parsedTimeRemaining = secondsToStr(timeRemaining.value)
      const parseTimeRemaining = file.uploader.opts.parseTimeRemaining
      if (parseTimeRemaining) {
        parsedTimeRemaining = parseTimeRemaining(timeRemaining.value, parsedTimeRemaining)
      }
      return parsedTimeRemaining
    })
    const actionCheck = () => {
      paused.value = props.file.paused
      error.value = props.file.error
      isUploading.value = props.file.isUploading()
    }
    const pause = () => {
      props.file.pause()
      actionCheck()
      fileProgress()
    }
    const resume = () => {
      props.file.resume()
      actionCheck()
    }
    const remove = () => {
      props.file.cancel()
    }
    const retry = () => {
      props.file.retry()
      actionCheck()
    }
    const processResponse = (message) => {
      let res = message
      try {
        res = JSON.parse(message)
      } catch (e) {
      }
      response.value = res
    }
    const fileEventsHandler = (event, args) => {
      const rootFile = args[0]
      const file = args[1]
      const target = props.list ? rootFile : file
      if (toRaw(props.file) === toRaw(target)) {
        if (props.list && event === 'fileSuccess') {
          processResponse(args[2])
          return
        }
        instance.setupState[event](...args)
      }
    }
    const fileProgress = () => {
      progress.value = props.file.progress()
      averageSpeed.value = props.file.averageSpeed
      currentSpeed.value = props.file.currentSpeed
      timeRemaining.value = props.file.timeRemaining()
      uploadedSize.value = props.file.sizeUploaded()
      actionCheck()
    }
    const fileSuccess = (rootFile, file, message) => {
      if (rootFile) {
        processResponse(message)
      }
      fileProgress()
      error.value = false
      isComplete.value = true
      isUploading.value = false
    }
    const fileComplete = () => {
      fileSuccess()
    }
    const fileError = (rootFile, file, message) => {
      fileProgress()
      processResponse(message)
      error.value = true
      isComplete.value = false
      isUploading.value = false
    }
    watch(status, (newStatus, oldStatus) => {
      if (oldStatus && newStatus === 'uploading' && oldStatus !== 'uploading') {
        tid = setTimeout(() => {
          progressingClass.value = 'uploader-file-progressing'
        }, 200)
      } else {
        clearTimeout(tid)
        progressingClass.value = ''
      }
    })
    onMounted(() => {
      paused.value = props.file['paused']
      error.value = props.file['error']
      averageSpeed.value = props.file['averageSpeed']
      currentSpeed.value = props.file['currentSpeed']
      isComplete.value = props.file.isComplete()
      isUploading.value = props.file.isUploading()
      size.value = props.file.getSize()
      formatedSize.value = props.file.getFormatSize()
      uploadedSize.value = props.file.sizeUploaded()
      progress.value = props.file.progress()
      timeRemaining.value = props.file.timeRemaining()
      type.value = props.file.getType()
      extension.value = props.file.getExtension()
      const eventHandler = (event) => {
        handlers[event] = (...args) => {
          fileEventsHandler(event, args)
        }
        return handlers[event]
      }
      events.forEach((event) => {
        props.file.uploader.on(event, eventHandler(event))
      })
    })
    onUnmounted(() => {
      events.forEach((event) => {
        props.file.uploader.off(event, handlers[event])
      })
      handlers = null
    })
    return {
      response,
      paused,
      error,
      averageSpeed,
      currentSpeed,
      isComplete,
      isUploading,
      size,
      formatedSize,
      uploadedSize,
      progress,
      timeRemaining,
      type,
      extension,
      progressingClass,
      fileCategory,
      progressStyle,
      formatedAverageSpeed,
      status,
      statusText,
      formatedTimeRemaining,
      actionCheck,
      pause,
      resume,
      remove,
      retry,
      processResponse,
      fileEventsHandler,
      fileProgress,
      fileSuccess,
      fileComplete,
      fileError,
      imageFile
    }
  }
}
</script>

<style>
.uploader-file {
  position: relative;
  height: 49px;
  line-height: 49px;
  overflow: hidden;
  border-bottom: 1px solid #cdcdcd;
}

.uploader-file[status="waiting"] .uploader-file-pause,
.uploader-file[status="uploading"] .uploader-file-pause {
  display: block;
}

.uploader-file[status="paused"] .uploader-file-resume {
  display: block;
}

.uploader-file[status="error"] .uploader-file-retry {
  display: block;
}

.uploader-file[status="success"] .uploader-file-remove {
  display: none;
}

.uploader-file[status="error"] .uploader-file-progress {
  background: red;
  opacity: 0.2;
}

.uploader-file-progress {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #e2eeff;
  transform: translateX(-100%);
}

.uploader-file-progressing {
  transition: all .4s linear;
}

.uploader-file-info {
  position: relative;
  z-index: 1;
  height: 100%;
  overflow: hidden;
}

.uploader-file-info:hover {
  background-color: rgba(240, 240, 240, 0.2);
}

.uploader-file-info i,
.uploader-file-info em {
  font-style: normal;
}

.uploader-file-name,
.uploader-file-size,
.uploader-file-meta,
.uploader-file-status,
.uploader-file-actions {
  float: left;
  position: relative;
  height: 100%;
}

.uploader-file-name {
  display: flex;
  align-items: center;
  width: 45%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-indent: 14px;
}

.uploader-file-icon {
  width: 24px;
  height: 24px;
  display: inline-block;
  vertical-align: top;
  margin-top: 13px;
  margin-right: 8px;
}

.uploader-file-icon::before {
  content: "📃";
  display: block;
  height: 100%;
  font-size: 24px;
  line-height: 1;
  text-indent: 0;
}

.uploader-file-icon[icon="folder"]::before {
  content: "📂";
}

.uploader-file-icon[icon="image"]::before {
  content: "📊";
}

.uploader-file-icon[icon="video"]::before {
  content: "📹";
}

.uploader-file-icon[icon="audio"]::before {
  content: "🎵";
}

.uploader-file-icon[icon="document"]::before {
  content: "📋";
}

.uploader-file-size {
  width: 13%;
  text-indent: 10px;
}

.uploader-file-meta {
  width: 8%;
}

.uploader-file-status {
  width: 24%;
  text-indent: 20px;
}

.uploader-file-actions {
  width: 10%;
}

.uploader-file-actions > span {
  display: none;
  float: left;
  width: 16px;
  height: 16px;
  margin-top: 16px;
  margin-right: 10px;
  cursor: pointer;
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAABkCAYAAAD0ZHJ6AAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAJcEhZcwAACxMAAAsTAQCanBgAAARkSURBVGje7ZnfS1NRHMAH4ptPkvQSuAdBkCxD8FUQJMEULUgzy1KyyPVQ4JMiiP4Bvg6EwUQQfMmwhwRDshwaKUjDVCgoSdDNHkzTJZ6+Z37Purve8+PeTb2TM/ggu+ew89l33x8H9BBCPG7GowXTJej3+wnDvEm0JuLC04+EYWftVAUv+fiCvDUdQR1BHUEdQR3BTIygvixoQS14XgTtthLVdpNWwXRLqvQ724LplFRtyrYF0yVpFLQrKRVMh6RZ0I6kkmCqklaCqpKZH0FX56Crq9jVfdDVk0RfFrSgFsxkQVmLcdKCVrKySCrryhPEyYShhzOcrFtG0EoilfHHk1CRU5rF6ZjNZhlVOW6RnMSVyyilKies4pO41diVy8wIujoHXV3FGdMHXTtJKLFYTLhZtq4vC1rwXApCZTIqgR6g1PBMCO9DL3bMMSqBHqDU8EyISDAHiGKvWwcCQG2KgjlAFCDAOhAAap0K5gKLphk8mqJgLrCIgoxRJ4J5wKpJ7gAoMkn5EBXBPGDVJHcAFJmkfIhQcAql1oBpTvTol9gG9pm4RHAKpdaAaU706JfYBvaZuJVgPQrt4sFlnOh5MC/p3lmJYD0K7eLBZZzoeTAv6d5ZnuAYHjpgEOnk5F0ufhG6v1ggOIaHDhhEOjl5l4tfhO4vthLcwAMrFNvLJO5vEwhu4IEViu1lEve3WQmyoihQFBzG/V0CQVYUBYqCw7i/SxTBcpsRbFeIYLnNCLZbCY5b5KAnxRwct8hBj9McZFVMW0ihRNBuFdMWUigRlFaxuQ9WWYjRMTiIe5z0wSoLMToGB3GPsA9aTZIJoB+nRgBnM1tzOkkmgH6cGgGczWzNpzqLx3n/aULJJgezeNw07oxQySbVywKjBOgFRnDs+VEsx8FlgVEC9AIjOPb8KJYjvSzoG7UW1IJaUAtqQS14toLNM5fN5APdwBJA8G83Pk/aK/rgzVvXzeQD3cASQPBvNz5P2ssTzAaGUIrHEO6zI5gNDKEUjyHcxxWkh4Ylcowwk1QQpIeGJXKMMJO0EgwqyjGCioJBJvDrxRMSuVOTJEXfbz1/bHwWtBL0yoQehK6RucgE+bGzanzulQh6E3IgQV+xpc8kcrfuSO7eTfJ3ZYmQw0Oy9azVKOk1C/bJ5D5F38YPeLfx0rjWJxHsS0SqsSYuxySjj5qO5Oj7xQWy2VBtFOwzCy6ryH3YfE3uh64Y1xckgstJPydEjkkeHv07Iy4Xaao15+KCWTBx6M/db+T9xivSErqaJDdzXI6yLRE8Vgg0coex/SPJvT0SbWu0KpZtbgSpCH3NRt7I5OxHkObc6heU+/M/J5vrpBFM5GBLqCQux14COXs5CNXK5OjPGm1tSMrJSOMNYQ4mVTGV/L6zTL7+DovkbFUxbSW0Wo05l8hJWsU+cRWfSh+Mt5Lb1ck/J1TvVsdDaR/MiEni+llsdZuZp62EViu+96bpNjNPWwmtVnzvFd5m9IVVC54x/wA7gNvqFG9vXQAAAABJRU5ErkJggg==") no-repeat 0 0;
}

.uploader-file-actions > span:hover {
  background-position-x: -21px;
}

.uploader-file-actions .uploader-file-pause {
  background-position-y: 0;
}

.uploader-file-actions .uploader-file-resume {
  background-position-y: -17px;
}

.uploader-file-actions .uploader-file-retry {
  background-position-y: -53px;
}

.uploader-file-actions .uploader-file-remove {
  display: block;
  background-position-y: -34px;
}

.uploader-file-info {
  color: var(--el-text-color-primary) !important;
}
</style>
