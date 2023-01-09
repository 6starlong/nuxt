<script setup lang="ts">
const docus = useDocus()
const socialIcons = ref(null)
</script>

<template>
  <footer>
    <Container :fluid="docus?.layout?.fluid" padded class="footer-container">
      <!-- Left -->
      <div class="left">
        <a v-if="docus?.footer?.credits" :href="docus?.footer?.credits?.href || '#'" rel="noopener" target="_blank">
          <Component :is="docus?.footer?.credits?.icon" v-if="docus?.footer?.credits?.icon" class="left-icon" />
          <p v-if="docus?.footer?.credits?.text">{{ docus.footer.credits.text }}</p>
        </a>
      </div>

      <!-- Right -->
      <div class="right">
        <AppSocialIcons ref="socialIcons" />
      </div>
    </Container>
  </footer>
</template>

<style lang="ts" scoped>
css({
  footer: {
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: '{elements.border.primary.default}',

    '.footer-container': {
      display: 'grid',
      gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
      justifyItems: 'center',
      '@sm': {
        gap: '{space.2}',
        justifyItems: 'legacy',
      },

      ':deep(.icon)': {
        width: '{space.4}',
        height: '{space.4}'
      },

      a: {
        color: '{color.gray.500}',
        '@dark': {
          color: '{color.gray.400}'
        },
        '&:hover': {
          color: '{color.gray.700}',
          '@dark': {
            color: '{color.gray.200}',
          }
        },
      },

      '.left': {
        gridColumn: 'span 12 / span 12',
        display: 'flex',
        py: '{space.4}',
        order: 1,

        '@sm': {
          gridColumn: 'span 3 / span 3',
          order: 0,
        },

        a: {
          display: 'flex',
          alignItems: 'center',
        },

        p: {
          fontSize: '{text.xs.fontSize}',
          lineHeight: '{text.xs.lineHeight}',
          fontWeight: '{fontWeight.medium}'
        },

        '&-icon': {
          flexShrink: 0,
          width: '{space.4}',
          height: '{space.4}',
          fill: 'currentcolor',
          marginRight: '{space.2}',
        },
      },

      '.right': {
        gridColumn: 'span 12 / span 12',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',

        '@sm': {
          gridColumn: 'span 3 / span 3',
          marginRight: 'calc(0px - {space.4})',
        },

        '.icon-link': {
          display: 'flex',
          padding: '{space.4}'
        }
      },
    },
  }
})
</style>
