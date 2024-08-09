<script setup lang="ts">
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
</script>
<template>
  <div class="bg-white pt-[100px]">
    <ClientOnly >
      <QuillEditor  />
    </ClientOnly>
  </div>
</template>
