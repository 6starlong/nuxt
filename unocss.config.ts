import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'

export default defineConfig({
  shortcuts: [
    {
      // container
      'container-lg': 'max-w-1200px w-full mx-auto px-4 sm:px-6 lg:px-8',
      'container-fluid': 'max-w-full w-full mx-auto px-4 sm:px-6 lg:px-8',
      // colors
      'bg-base': 'bg-[#fff] dark:bg-[#121518] cafe:bg-[#f1e7d0]',
      'bg-code': 'bg-[#123] dark:bg-[#1f2428] cafe:bg-[#222]',
      'bg-overlay': 'bg-[#fff]/80 dark:bg-[#121518]/80 cafe:bg-[#f1e7d0]/80',
      'border-base': 'border-[#f5f5f5] dark:border-[#181818] cafe:border-[#e5d5c5]',
      'bg-scrollbar': 'bg-[#ccc] dark:bg-[#222] cafe:bg-[#ccbca9]',
      'bg-scrollbar-hover': 'bg-[#bbb] dark:bg-[#333] cafe:bg-[#ded0bf]',
      'color-base': 'text-[#181818] dark:text-[#f0f0f0] cafe:text-[#433422]',
      'color-text': 'text-[#3c3c3c] dark:text-[#bbb] cafe:text-[#5f503d]',
      'color-primary': 'text-[#00835c] dark:text-[#10b981]',
      // components
      'post-card': 'relative transition-transform-350 hover:translate-y--1',
      'post-card-title': 'mb-3 text-2xl fw700 underline decoration-2 transition-350 decoration-transparent group-hover:decoration-current'
    },

    [/^flex-between/g, () => 'justify-between'],
    [/^(flex|grid)-center/g, () => 'justify-center items-center'],
    [/^(flex|grid)-x-center/g, () => 'justify-center'],
    [/^(flex|grid)-y-center/g, () => 'items-center'],

    [/^(.*)-nav$/, ([, prefix]) => `${prefix}-90px`]
  ],
  rules: [
    [/^line-clamp-(\d+)$/, ([, value]) => ({
      overflow: 'hidden',
      display: '-webkit-box',
      'word-break': 'break-all',
      '-webkit-box-orient': 'vertical',
      '-webkit-line-clamp': `${value}`
    })]
  ],
  variants: [
    // colorMode cafe:
    (matcher) => {
      if (!matcher.startsWith('cafe:')) { return matcher }
      return {
        // slice `cafe:` prefix and passed to the next variants and rules
        matcher: matcher.slice(5),
        selector: s => `.cafe ${s}`
      }
    }
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2
    }),
    presetTypography(),
    presetWebFonts({
      provider: 'bunny',
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono'
      }
    })
  ],
  transformers: [
    // Vue's css compiler does not understand the @apply syntax.
    // https://github.com/unocss/unocss/issues/809#issuecomment-1118632177
    transformerDirectives(),
    transformerVariantGroup()
  ]
})
