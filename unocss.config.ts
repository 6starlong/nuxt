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
      'container-lg': 'max-w-320 w-full mx-auto px-4 sm:px-6 lg:px-8',
      'container-fluid': 'max-w-full w-full mx-auto px-4 sm:px-6 lg:px-8',
      // colors
      'bg-base': 'bg-$color-white dark:bg-$color-black',
      'bg-soft': 'bg-$color-gray-100 dark:bg-$color-gray-900',
      'color-text': 'text-$color-gray-500 dark:text-$color-gray-400',
      // components
      'post-card': 'relative transition-transform-350 hover:translate-y--1',
      'post-card-title': 'mb-3 text-2xl fw700 underline decoration-2 transition-350 decoration-transparent group-hover:decoration-current'
    },
    [/^badge$/, () => 'bg-soft rounded px3 py0.8'],
    [/^badge-(.*)$/, ([, c]) => `bg-${c}4:10 text-${c}5 rounded px3 py0.8`],
    [/^flex-between/g, () => 'justify-between'],
    [/^(flex|grid)-center/g, () => 'justify-center items-center'],
    [/^(flex|grid)-x-center/g, () => 'justify-center'],
    [/^(flex|grid)-y-center/g, () => 'items-center']
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
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({ scale: 1.2 }),
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
