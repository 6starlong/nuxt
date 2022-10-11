<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const { toc } = useContent()

const content = ref<HTMLDivElement | null>(null)

onMounted(() => {
  const anchors = [].slice.call(
    content.value!.querySelectorAll('h2 > a, h3 > a')
  ) as HTMLAnchorElement[]

  const links = [].slice.call(
    content.value!.querySelectorAll('ul > li > a')
  ) as HTMLAnchorElement[]

  const getAnchorTop = (anchor: HTMLAnchorElement): number => {
    return anchor.parentElement!.offsetTop
  }

  const { y } = useScroll(document, {
    onScroll () {
      for (let i = 0; i < anchors.length; i++) {
        const scrollTop = y.value
        const anchor = anchors[i] as HTMLAnchorElement
        const nextAnchor = anchors[i + 1] as HTMLAnchorElement

        if (
          (i === 0 && scrollTop < getAnchorTop(anchor)) ||
          (i === anchors.length - 1 && scrollTop > getAnchorTop(anchor)) ||
          (scrollTop > getAnchorTop(anchor) && scrollTop < getAnchorTop(nextAnchor))
        ) {
          const index = links.findIndex(el => el.hash === anchors[i].hash)
          links[index - 1]?.classList.remove('active')
          links[index + 1]?.classList.remove('active')
          links[index].classList.add('active')
        }
      }
    }
  })

  const navigate = () => {
    const el = document.querySelector(decodeURIComponent(location.hash)) as HTMLDivElement
    const offsetTop = el.getBoundingClientRect().top + window.pageYOffset - 90
    window.scrollTo({ top: offsetTop, behavior: 'smooth' })
  }

  const handleAnchors = (
    event: MouseEvent & { target: HTMLElement }
  ) => {
    const link = event.target.closest('a')

    if (
      !event.defaultPrevented &&
      link &&
      event.button === 0 &&
      link.target !== '_blank' &&
      link.rel !== 'external' &&
      !link.download &&
      !event.metaKey &&
      !event.ctrlKey &&
      !event.shiftKey &&
      !event.altKey
    ) {
      const url = new URL(link.href)
      if (url.origin !== window.location.origin) {
        return
      }

      event.preventDefault()
      const { pathname, hash } = url
      if (hash && (!pathname || pathname === location.pathname)) {
        window.history.replaceState({}, '', hash)
        navigate()
      } else {
        router.push({ path: pathname, hash })
      }
    }
  }

  useEventListener(window, 'hashchange', navigate)
  useEventListener(content.value!, 'click', handleAnchors, { passive: false })

  if (location.hash) {
    setTimeout(navigate, 300)
  }
})
</script>

<template>
  <div>
    <ContentDoc>
      <template #default="{ doc }">
        <div v-if="doc.image?.src">
          <img :src="doc.image.src" class="w-1/1 h-75 object-cover rounded-lg">
        </div>

        <div ref="content" class="relative w-full grid grid-cols-12">
          <div class="col-span-12 lg:col-span-8 flex lg:justify-end">
            <article class="prose flex-1 pt-8">
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
          </div>

          <div class="col-span-4 hidden lg:block">
            <div v-if="toc.links.length" class="sticky top-var(--nav-height) inset-x-0 grid justify-center">
              <div class="pt-8 max-w-50 space-y-2">
                <div class="text-sm font-500">
                  Table of Contents
                </div>
                <ul v-if="toc && toc.links">
                  <li v-for="(link, idx) in toc.links" :key="link.text">
                    <a :href="`#${link.id}`" class="outline-link" :class="idx === 0 && 'active'">
                      {{ link.text }}
                    </a>
                    <ul v-if="link.children">
                      <li v-for="child in link.children" :key="child.text" class="pl-2">
                        <a :href="`#${child.id}`" class="outline-link">
                          {{ child.text }}
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
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

<style scoped>
.outline-link {
  --at-apply: op-50 hover:op-100 transition-400 text-3.25 inline-block w-full truncate;
}

.outline-link.active {
  opacity: 1;
  color: var(--c-primary);
}
</style>
