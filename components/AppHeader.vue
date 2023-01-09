<script setup lang="ts">
const route = useRoute()
const docus = useDocus()

const { navigation } = useContent()
const { hasDocSearch } = useDocSearch()

const { y } = useWindowScroll()
const hasOverlay = computed(() => route.path === '/' && y.value === 0)
const hasTop = computed(() => y.value === 0)

const logo = computed(() => docus.value.header?.logo || docus.value.image)
const title = computed(() => docus.value.header?.title || docus.value.title)

const hasNavigation = computed(() => !!docus.value.aside?.level)

const hasDialog = computed(() => navigation.value?.length > 1)

const isActive = (link: any) => (link.exact ? route.fullPath === link._path : route.fullPath.startsWith(link._path))
</script>

<template>
  <header
    :class="{
      'has-overlay': hasOverlay,
      'has-top': hasTop,
      'has-dialog': hasDialog,
      'has-doc-search': hasDocSearch }"
  >
    <Container fluid>
      <div class="section left">
        <NuxtLink class="navbar-logo" to="/" :aria-label="title">
          <img v-if="logo" :src="logo">
          <span>{{ title }}</span>
        </NuxtLink>
      </div>

      <div class="section right">
        <nav v-if="hasNavigation">
          <ul>
            <li
              v-for="link in navigation"
              :key="link._path"
            >
              <NuxtLink
                class="link"
                :to="link.redirect? link.redirect : link._path"
                :class="{ active: isActive(link) }"
              >
                <Icon v-if="link.icon" :name="link.icon" />
                {{ link.title === 'Posts' ? 'Blog' : link.title }}
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <AppSearch v-if="hasDocSearch" />
        <ThemeSelect />
        <div class="social-icons">
          <AppSocialIcons />
        </div>

        <AppHeaderDialog />
      </div>
    </Container>
  </header>
</template>

<style scoped lang="ts">
css({
  ':deep(.icon)': {
    width: '{space.4}',
    height: '{space.4}'
  },

  ':deep(a), :deep(button)': {
    padding: '{space.2}'
  },

  '.navbar-logo': {
    display: 'flex',
    alignItems: 'center',
    flex: 'none',
    transition: 'opacity 200ms ease',

    'img': {
      marginRight: '8px',
      width: '24px',
      borderRadius: '50%',
    },
    'span':{
      fontSize: '{fontSize.sm}',
      fontWeight: '{fontWeight.medium}',
    },
    '&:hover': {
      opacity: '0.7'
    }
  },

  nav: {
    display: 'none',
    '@lg': {
      display: 'block'
    },
    ul: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: '1',
      maxWidth: '100%',
      truncate: true,

      '& > * + *': {
        marginLeft: '{space.2}'
      },

      li: {
        display: 'inline-flex',
        gap: '{space.1}',
      },

      '.link': {
        display: 'flex',
        alignItems: 'center',
        gap: '{space.1}',
        padding: '{space.1} {space.2}',
        fontSize: '{fontSize.sm}',
        borderRadius: '{radii.md}',
        outline: 'none',
        transition: 'background 200ms ease',

        svg: {
          display: 'inline-block',
          transform: 'translateY(-1px)'
        },

        '&:active,&.active,&:hover': {
          backgroundColor: '{color.gray.100}',
          '@dark': {
            backgroundColor: '{color.gray.900}',
          },
        },

        '&.active': {
          boxShadow: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
          fontWeight: '{fontWeight.semibold}'
        }
      }
    }
  },

  header: {
    backdropFilter: '{elements.backdrop.filter}',
    position: 'sticky',
    top: 0,
    zIndex: 10,
    width: '100%',
    borderBottom: '1px solid {elements.border.primary.default}',
    backgroundColor: '{elements.backdrop.background}',
    height: '{docus.header.height}',

    '&.has-overlay': {
      color: '{color.gray.200}',
      backgroundColor: 'transparent',
      backdropFilter: 'none',
      '& nav .link:hover': {
          backgroundColor: '{color.gray.900}',
        },
      '& :deep(.icon)': {
        color: '{color.gray.50}',
        opacity: 0.7,
        '&:hover': {
          opacity: 1
        }
      },
    },

    '&.has-top': {
      borderBottom: '1px solid transparent !important',
      backdropFilter: 'none'
    },

    '.container': {
      display: 'grid',
      height: '100%',
      gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
      gap: '{space.2}',
      maxWidth: '100%'
    },

    '.section': {
      display: 'flex',
      alignItems: 'center',
      flex: 'none',
      '&.left': {
        gridColumn: 'span 6 / span 6'
      },
      '&.right': {
        display: 'flex',
        gridColumn: 'span 6 / span 6',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 'none',
        gap: '{space.1}',
        '.social-icons': {
          display: 'none',
          '@md': {
            display: 'flex',
            alignItems: 'center',
          }
        }
      }
    }
  }
})
</style>

<style>
.dialog > div {
  position: absolute;
  right: 0;
}

.dialog .icons button,
.dialog .icons a {
  padding: 0 !important;
}
</style>
