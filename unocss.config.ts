/* eslint-disable quote-props */
import {
  defineConfig,
  presetAttributify,
  presetTypography,
  presetUno,
  // presetWebFonts,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'

import presetRemToPx from '@unocss/preset-rem-to-px'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetTypography(),
    // presetWebFonts({
    //   provider: 'bunny',
    //   fonts: {
    //     sans: 'DM Sans',
    //     serif: 'DM Serif Display',
    //     mono: 'DM Mono'
    //   }
    // }),
    presetRemToPx()
  ],
  shortcuts: [
    {
      // colors
      'text-base': 'text-[rgba(255,255,255,.81)]',
      'bg-base': 'bg-[rgba(25,25,25,1)]',
      'bg-soft': 'bg-[rgba(255,255,255,.055)]',
      'bg-mute': 'bg-[rgba(255,255,255,.03)]',
      // container
      'container': 'max-w-320 w-100% m-[0_auto] px-4 sm:px-6 lg:px-8',
      'container-md': 'max-w-225 w-100% m-[0_auto] px-4 sm:px-6 lg:px-8',
      'grid-cols-card': 'grid-cols-[repeat(auto-fill,minmax(320px,1fr))]',
      // colors
      // 'bg-base': 'bg-$color-white dark:bg-$color-black',
      // 'bg-soft': 'bg-$color-gray-100 dark:bg-$color-gray-900',
      // 'color-text': 'text-$color-gray-500 dark:text-$color-gray-400',
      // components
      'button-active': 'flex flex-center shrink-0 px-6px h-24px rounded cursor-pointer transition-bg-ease text-base hover:bg-soft active:bg-mute'
      // 'post-card': 'relative transition-transform-350 hover:translate-y--1',
      // 'post-card-title': 'mb-3 text-2xl fw700 underline decoration-2 transition-350 decoration-transparent group-hover:decoration-current'
    },
    [/^badge$/, () => 'flex flex-center min-w-0 shrink-1 h-4.5 px-1.5 text-sm lh-120% rounded'],
    [/^badge-(.*)$/, ([, c]) => `bg-${c}`],
    [/^flex-between/g, () => 'justify-between'],
    [/^(flex|grid)-center/g, () => 'justify-center items-center'],
    [/^(flex|grid)-x-center/g, () => 'justify-center'],
    [/^(flex|grid)-y-center/g, () => 'items-center']
  ],
  rules: [
    ['animate', {
      'animation': 'animateElement cubic-bezier(0.3, 0.45, 0.45, 0.95) 0.75s',
      'animation-duration': '0.5s',
      'animation-iteration-count': '1',
      'transition': 'transform 0.15s'
    }],
    ['transition-bg-ease', { 'transition': 'background 20ms ease-in 0s' }],
    ['shadow-icon', { 'box-shadow': '4px 4px 24px 0 rgba(0, 0, 0, .21)' }],
    [/^line-clamp-(\d+)$/, ([, value]) => ({
      'overflow': 'hidden',
      'display': '-webkit-box',
      'word-break': 'break-all',
      '-webkit-box-orient': 'vertical',
      '-webkit-line-clamp': `${value}`
    })]
  ],
  theme: {
    colors: {
      orange: {
        DEFAULT: '#854c1d'
      },
      green: {
        DEFAULT: '#2b593f'
      },
      blue: {
        DEFAULT: '#28456c'
      },
      purple: {
        DEFAULT: '#492f64'
      }
    }
  },
  safelist: [...['orange', 'green', 'blue', 'purple'].map(i => `badge-${i}`)],
  transformers: [
    // Vue's css compiler does not understand the @apply syntax.
    // https://github.com/unocss/unocss/issues/809#issuecomment-1118632177
    transformerDirectives(),
    transformerVariantGroup()
  ]
})
