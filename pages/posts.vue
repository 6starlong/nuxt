<template>
  <main class="container-fluid pb10">
    <div class="space-y-10 my-5">
      <ContentList v-slot="{ list }" :query="{ path: '/posts', sort: { date: -1 } }">
        <NuxtLink v-for="post in list" :key="post._path" :to="post._path" class="block max-w-900px mx-auto">
          <div class="post-card h-60 shadow group">
            <div class="cover" bg="cover center" :style="{ backgroundImage: post.image && `url(${post.image})` }" />
            <div class="cover " :class="post.image ? 'bg-#121518/25' : 'bg-code'" />
            <div
              class="relative z-1 p-8 h-full sm:max-w-1/2 mx-auto text-center grid place-content-center transition-transform-350 group-hover:translate-y--1"
            >
              <h2 class="post-card-title color-[#fafafa]">
                {{ post.title }}
              </h2>
              <p class="line-clamp-2 mb-1 color-[#a1a1a1]">
                {{ post.description }}
              </p>
              <p v-if="post.date" class="text-sm color-[#a1a1a1]">
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
    </div>
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
