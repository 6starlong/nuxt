<template>
  <main>
    <ContentDoc>
      <template #default>
        <Post />
      </template>
      <template #not-found>
        <NotFound />
      </template>
    </ContentDoc>
  </main>
</template>
