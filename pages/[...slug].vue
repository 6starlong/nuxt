<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <article class="prose mx-auto text-left">
    <ContentDoc>
      <template #default="{ doc }">
        <h1>{{ doc.title }}</h1>
        <ContentRenderer :value="doc" />
        <button class="font-mono opacity-50 hover:opacity-75" @click="router.back()">
          ..cd
        </button>
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
  </article>
</template>
