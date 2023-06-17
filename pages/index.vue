<script setup>
// const chunk = await $fetch('/api/chunk')

// const { rootId } = useAppConfig()
const rootId = 'a8542f6f-39af-4b1e-b174-4c268db31da9'
const { data: collection } = await useAsyncData('loadPageChunk', async () => {
  const { recordMap } = await $fetch('/v3/loadCachedPageChunk', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: {
      page: {
        id: rootId
      },
      limit: 30,
      cursor: {
        stack: []
      },
      chunkNumber: 0,
      verticalColumns: false
    }
  })

  const collectionViewPage = recordMap.block[rootId].value
  const collection = recordMap.collection[collectionViewPage.collection_id].value
  collection.viewIds = collectionViewPage.view_ids

  return collection
})

const { data: posts } = await useAsyncData('queryCollection', async () => {
  const { id: collectionId, space_id: spaceId, viewIds } = collection.value

  const { recordMap } = await $fetch('/v3/queryCollection?src=reset', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: {
      source: {
        type: 'collection',
        id: collectionId,
        spaceId
      },
      collectionView: {
        id: viewIds[0],
        spaceId
      },
      loader: {
        type: 'reducer',
        reducers: {
          collection_group_results: {
            type: 'results',
            limit: 50,
            loadContentCover: false
          }
        },
        sort: [],
        searchQuery: '',
        userTimeZone: 'Asia/Shanghai'
      }
    }
  })

  return Object.values(recordMap.block)
    .filter(item => item.value.type === 'page')
    .map(item => item.value)
})

const tagProperty = collection.value.format.collection_page_properties.find(i => i.visible).property
const tagOptions = collection.value.schema[tagProperty].options

const getPageCover = (block) => {
  if (block.format.page_cover?.startsWith('http')) {
    return 'https://starlong.notion.site/image/' + encodeURIComponent(block.format.page_cover)
  }
  return 'https://starlong.notion.site' + block.format.page_cover
}

const getPageIcon = (block) => {
  if (block.format.page_icon?.startsWith('/icons')) {
    return 'https://starlong.notion.site' + block.format.page_icon
  }
  return block.format.page_icon
}

const getPageTitle = (block) => {
  return block.properties?.title?.[0][0]
}

const getPageTags = (block) => {
  return tagOptions.filter(t => block.properties?.[tagProperty]?.[0][0].includes(t.value))
}
</script>

<template>
  <main class="pb-20 container">
    <div class="mb-10 mt-5 space-y-4">
      <p>Hello World 👋</p>
      <p>I'm Starlong, an entrepreneur & software developer who loves open source.</p>
      <p>You can find me on Twitter and GitHub — check out my bio for more info.</p>
    </div>

    <div class="border-b animate">
      <div class="h-12 text-6 fw600 lh-12">
        Blog Posts
      </div>
    </div>

    <div class="relative grid grid-cols-card min-h-25vh gap-8 pb-2 pt-6">
      <NuxtLink
        v-for="item in posts"
        :key="item.id"
        :to="item.id"
        class="flex flex-col overflow-hidden rounded bg-soft animate"
      >
        <div class="h-50 w-100% overflow-hidden">
          <img
            :src="getPageCover(item)"
            class="h-50 w-100% object-cover transition duration-350 ease-out hover:scale-120"
          >
        </div>

        <div class="flex-1 hover:bg-mute p-2.5 transition duration-350">
          <div
            class="relative flex py-2 decoration-transparent transition duration-350 hover:(underline decoration-current)"
          >
            <div class="float-left mr-1 h-6 w-6">
              <img v-if="getPageIcon(item).startsWith('http')" :src="getPageIcon(item)">
              <span v-else>{{ getPageIcon(item) }}</span>
            </div>
            <div class="max-w-100% min-h-6 break-words fw-500 lh-[1.5] line-clamp-3">
              {{ getPageTitle(item) }}
            </div>
          </div>

          <div class="p-1 text-xs">
            {{ useDateFormat(item.create_time, 'YYYY-MM-DD').value }}
          </div>

          <div class="flex gap-1.5 py-1">
            <div v-for="tag in getPageTags(item)" :key="tag.id" :class="`!text-xs badge badge-${tag.color}`">
              {{ tag.value }}
            </div>
          </div>
        </div>
      </NuxtLink>
    </div>
  </main>
</template>
