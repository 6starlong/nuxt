<script setup lang="ts">
const route = useRoute()
const router = useRouter()

console.log(useContent())
</script>

<template>
  <div>
    <ContentDoc>
      <template #default="{ doc }">
        <div v-if="doc.image" class="px-4 sm:px-6 lg:px-8">
          <img :src="doc.image" class="w-1/1 h-75 object-cover rounded-lg">
        </div>

        <article class="prose mx-auto pt-5 px-4 sm:px-6 lg:px-8">
          <div v-if="doc.tags" mb-5>
            <span v-for="tag in doc.tags" :key="tag" class="c-#618770 bg-#618770/15 py-1 px-2 mr-2 rounded">
              {{ tag }}
            </span>
          </div>

          <div v-if="doc.title" class="mb-8">
            <h1>{{ doc.title }}</h1>

            <p v-if="doc.date" class="opacity-50 !-mt-5">
              {{ useDateFormat(doc.date, 'YYYY-MM-DD').value }}
              <span v-if="doc.duration"> · {{ doc.duration }}</span>
              <span v-if="doc.lastUpdated" ml-2> Updated on {{ useTimeAgo(doc.lastUpdated).value }}</span>
            </p>
          </div>

          <ContentRenderer :value="doc" />

          <div class="my-8">
            <NuxtLink
              :to="route.path.split('/').slice(0, -1).join('/') || '/'"
              class="font-mono opacity-50 hover:opacity-75"
            >
              ..cd
            </NuxtLink>
          </div>
        </article>
      </template>

      <template #not-found>
        <div>
          <h1>404</h1>
          <p>page not found</p>
          <div btn @click="router.back()">
            返回
          </div>
        </div>
      </template>
    </ContentDoc>
  </div>
</template>
