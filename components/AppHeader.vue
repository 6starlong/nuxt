<script setup lang="ts">
const route = useRoute()
const docus = useDocus()

const { navigation } = useContent()
const { hasDocSearch } = useDocSearch()

const { y } = useWindowScroll()
const hasOverlay = computed(() => route.path === '/' && y.value === 0)

const logo = computed(() => docus.value.image)
const title = computed(() => docus.value.title)

const hasNavigation = computed(() => !!docus.value.aside?.level)

const isActive = (link: any) => (link.exact ? route.fullPath === link._path : route.fullPath.startsWith(link._path))
</script>

<template>
  <header :class="{ 'header--overlay': hasOverlay, 'header--top': y === 0, 'has-doc-search': hasDocSearch }">
    <Container class="!container-fluid">
      <section class="left">
        <NuxtLink class="navbar-logo" to="/" :aria-label="docus?.title">
          <img v-if="logo" :src="logo">
          <span>{{ title }}</span>
        </NuxtLink>
      </section>

      <section class="right">
        <AppSearch v-if="hasDocSearch" />

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

        <div class="icons">
          <ThemeSelect />
          <AppSocialIcons />
        </div>

        <AppHeaderDialog />
      </section>
    </Container>
  </header>
</template>

<style scoped lang="ts">
css({
  ':deep(.icon)': {
    width: '{space.4}',
    height: '{space.4}'
  },

  '.icons': {
    display: 'none',
    gap: '{space.4}',
    '@sm': {
      display: 'flex'
    }
  },

  '.navbar-logo': {
    display: 'flex',
    alignItems: 'center',
    transition: 'opacity 200ms ease',

    'img': {
      marginRight: '8px',
      width: '24px',
      borderRadius: '50%',
    },
    'span':{
      fontSize: '{fontSize.sm}',
      fontWeight: '{fontWeight.medium}',
      flexShrink: '0'
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
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',

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
    backdropFilter: '{backdrop.filter}',
    position: 'sticky',
    top: 0,
    zIndex: 10,
    width: '100%',
    borderBottom: '1px solid {color.gray.100}',
    backgroundColor: '{backdrop.background}',
    height: '{docus.header.height}',

    '@dark': {
      borderBottom: '1px solid {color.gray.900}',
    },

    '&.header--overlay': {
      color: '{color.gray.200}',
      backgroundColor: 'transparent',
      backdropFilter: 'none',
      '& nav ul .link:hover': {
          backgroundColor: '{color.gray.900}',
        },
      '& .icons :deep(a), & button': {
        color: '{color.gray.50} !important',
        opacity: 0.7,
        '&:hover': {
          opacity: 1
        }
      },
    },

    '&.header--top': {
      borderBottom: '1px solid transparent !important',
      backdropFilter: 'none'
    },

    '.container': {
      display: 'grid',
      height: '100%',
      gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
      gap: '2rem'
    },

    section: {
      display: 'flex',
      alignItems: 'center',
      flex: 'none',
      '&.left': {
        gridColumn: 'span 4 / span 4',
      },
      '&.right': {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: '1',
        gridColumn: 'span 8 / span 8',
        gap: '{space.4}'
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
</style>
