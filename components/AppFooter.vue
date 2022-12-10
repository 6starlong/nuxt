<script setup lang="ts">
const docus = useDocus()
const socialIcons = ref(null)
</script>

<template>
  <footer>
    <Container padded class="footer-container">
      <!-- Left -->
      <p v-if="docus.footer?.text" class="left fw500 text-xs op-90">
        {{ docus.footer.text }}
      </p>

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
    height: '{docus.footer.height}',
    display: 'flex',
    alignItems: 'center',
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: '{color.gray.100}',
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
    '@dark': {
      borderTopColor: '{color.gray.900}'
    },
    '.left': {
      display: 'flex',
      alignItems: 'center',
      p: {
        fontSize: '{fontSize.xs}',
        fontWeight: '{fontWeight.bold}'
      },
      '&-icon': {
        width: '{space.4}',
        fill: 'currentcolor',
        marginRight: '{space.2}',
      }
    },
    '.right': {
      display: 'flex',
      alignItems: 'center',
      gap: '{space.4}'
    },
    '.footer-container': {
      display: 'flex',
      alignItems: 'center',
      height: '100%',
      gap: '{space.4}',
      flexDirection: 'row',
      justifyContent: 'space-between',
    }
  }
})
</style>
