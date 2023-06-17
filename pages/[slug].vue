<script setup>
// import { NotionRenderer } from 'vue3-notion'

const route = useRoute()
const pageId = route.params.slug

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { data: blockMap } = await useAsyncData('loadPageChunk', async () => {
  const { recordMap } = await $fetch('/v3/loadCachedPageChunk', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: {
      page: {
        id: pageId
      },
      limit: 30,
      cursor: {
        stack: []
      },
      chunkNumber: 0,
      verticalColumns: false
    }
  })

  return recordMap.block
})
</script>

<template>
  <main class="pb-30 container-md">
    <!-- <NotionRenderer :block-map="blockMap" /> -->
  </main>
</template>

<style>
@import "vue3-notion/dist/style.css";
</style>
