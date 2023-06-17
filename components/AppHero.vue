<script setup>
defineProps({
  scrollY: { type: Number, default: 0 }
})

const { avatar, title } = useAppConfig()
const { database, page, getBlockTitle, getBlockCover, getBlockIcon, getPageTags } = useNotion()

const route = useRoute()
const home = computed(() => route.path === '/')

const coverImage = computed(
  () => getBlockCover(home.value ? database.value : page.value) || '/images/hero.png'
)
const pageTitle = computed(() => (home.value ? title : getBlockTitle(page.value)))
const tags = computed(() => getPageTags(page.value))
</script>

<template>
  <div class="relative z-2 h-36vh w-100%" flex="~ col center">
    <img
      :src="coverImage"
      class="block h-36vh w-100% object-cover object-[center_40%]"
      :style="{ transform: `translateY(${~~((scrollY / 99) * 33) || 0}px)` }"
    >
  </div>

  <div class="relative z-3 bg-base">
    <div :class="home ? 'container' : 'container-md'">
      <div class="mx-auto mt--62px h-124px w-124px flex flex-center overflow-hidden">
        <div v-if="home" class="rounded-50% shadow-icon">
          <img :src="avatar" class="h-100% w-100% rounded-50%" alt="avatar">
        </div>
        <div v-else class="inline-block text-20">
          {{ getBlockIcon(page) }}
        </div>
      </div>

      <div class="my-5 w-100% text-center text-10 fw700 lh-[1.2]">
        {{ pageTitle }}
      </div>

      <template v-if="!home && page">
        <div v-if="tags.length" class="min-h-6 flex flex-center gap-1.5">
          <div v-for="tag in tags" :key="tag.id" :class="`badge badge-${tag.color}`">
            {{ tag.name }}
          </div>
        </div>

        <div class="mt-1 min-h-6 flex flex-center text-sm">
          <!-- {{ useDateFormat(page.created_time, 'YYYY-MM-DD').value }} -->
        </div>

        <ProseHr />
      </template>
    </div>
  </div>
</template>
