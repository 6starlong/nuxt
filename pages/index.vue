<script setup>
const heroUrl = '/images/hero.png'
const { isLoading } = useImage({ src: heroUrl })
const { y: scrollY } = useWindowScroll()
</script>

<template>
  <main>
    <section class="relative h-60vh flex flex-center mt--nav">
      <div v-if="isLoading" i-line-md:loading-loop text-3xl />
      <img
        v-else
        class="w-full h-full object-cover"
        :src="heroUrl"
        :style="{ transform: `translateY(${(~~(scrollY / 99 * 33) || 0)}px)` }"
      >
    </section>

    <section class="relative py-10 md:py-20 bg-base">
      <ContentList v-slot="{ list }" :query="{ path: '/posts', sort: { lastChanged: -1 } }">
        <div class="container-lg grid gap-8 animate" grid-cols="1 sm:2 lg:3">
          <NuxtLink v-for="post in list" :key="post._path" :to="post._path">
            <div class="post-card group">
              <div class="relative mb-6 pb-60% rounded-lg overflow-hidden shadow bg-code">
                <time
                  class="absolute z-1 top-4 left-4 inline-block bg-base py-1 px-2 text-sm fw500 rounded pointer-events-none"
                >
                  {{ useDateFormat(post.date, 'YYYY-MM-DD').value }}
                </time>
                <img v-if="post.image" :src="post.image" class="absolute w-full h-full object-cover">
              </div>
              <h2 class="post-card-title">
                {{ post.title }}
              </h2>
              <p class="color-text line-clamp-2">
                {{ post.description }}
              </p>
            </div>
          </nuxtlink>
        </div>
      </ContentList>
    </section>
  </main>
</template>
