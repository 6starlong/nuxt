<script setup>
useHead({ title: 'Blog' })
</script>

<template>
  <main>
    <Container class="py-10 space-y-10">
      <ContentList v-slot="{ list }" :query="{ path: '/posts', where: { _extension: 'md' }, sort: { date: -1 } }">
        <NuxtLink v-for="post in list" :key="post._path" :to="post._path" class="mx-auto block max-w-900px">
          <div class="group post-card h-60 shadow">
            <div class="cover" bg="cover center" :style="{ backgroundImage: post.image && `url(${post.image})` }" />
            <div class="cover" :class="post.image ? 'bg-black/25' : 'bg-soft'" />
            <div
              class="relative z-1 grid mx-auto h-full place-content-center p-8 text-center color-[#ebebeb] transition-transform-350 sm:max-w-1/2 group-hover:translate-y--1"
            >
              <h2 class="post-card-title color-[#fafafa]">
                {{ post.title }}
              </h2>
              <p class="mb-1 line-clamp-2">
                {{ post.description }}
              </p>
              <p v-if="post.date" class="text-sm">
                {{ useDateFormat(post.date, 'YYYY-MM-DD').value }}
                <span v-if="post.duration"> · {{ post.duration }}</span>
                <span v-if="post.lastUpdated" class="ml-2 lt-sm:hidden">
                  Updated on {{ useTimeAgo(post.lastUpdated).value }}
                </span>
              </p>
            </div>
          </div>
        </NuxtLink>
      </ContentList>
    </Container>
  </main>
</template>

<style scoped>
.post-card .cover {
  --at-apply: absolute inset-0 rounded-lg overflow-hidden transition-350;
}

.post-card:hover .cover {
  --at-apply: scale-105 shadow-lg;
}
</style>
