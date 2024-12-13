<template>
  <y9Uploader
      :options="options"
      :file-status-text="statusText"
      class="uploader-example"
      ref="uploaderRef"
      @file-complete="fileComplete"
      @complete="complete"
  ></y9Uploader>
</template>

<script setup lang="ts">

import qs from 'qs';
import {nextTick, ref, onMounted, inject} from 'vue'
const uploaderRef = ref(null)
import y9_storage from '@/utils/storage';
import settings from "@/settings";
import axios from "axios";
const options = {
  // target: 'http://192.168.3.218:7056/archives',
  // target: import.meta.env.VUE_APP_CONTEXT + 'vue/files/chunk', // '//jsonplaceholder.typicode.com/posts/',
  // target: 'http://192.168.3.171:7056/archives/vue/files/chunk',
  // target: '/api/vue/files?archivesId=1',
  // target: '/boot/uploader/chunk',
  // target: import.meta.env.VUE_APP_CONTEXT + 'vue/files/chunk', // '//jsonplaceholder.typicode.com/posts/',
  testChunks: true,
  headers: {
    //'Content-Type': 'multipart/form-data',
    Authorization: 'Bearer ' + 'AT-4-t70hJMGPPB8vc57tfiYZS2whd5GRb6a-'
  },
  simultaneousUploads: 1,
  chunkSize: 10 * 1024 * 1024,
}
const attrs = {
  accept: 'image/*'
}
const statusText = {
  success: '成功了',
  error: '出错了',
  uploading: '上传中',
  paused: '暂停中',
  waiting: '等待中'
}
const complete = function () {
  console.log('complete')
}
const fileComplete = (file) => {
  console.log('fileComplete')
};

onMounted(() => {
  nextTick(() => {
    // window.uploader = uploaderRef.value.uploader
  })
})
</script>

<style>

</style>
