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
    // use --at-apply https://github.com/unocss/unocss/issues/809
    transformerDirectives({ }),
    transformerVariantGroup()
  ],
  shortcuts: [
    [/^(.*)-var[(](.+)[)]$/, ([, prefix, value]) => `${prefix}-[var(${value})]`],
    ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600']
  ],
  variants: [
    // colorMode sepia:
    (matcher) => {
      if (!matcher.startsWith('sepia:')) { return matcher }
      return {
        // slice `sepia:` prefix and passed to the next variants and rules
        matcher: matcher.slice(6),
        selector: s => `.sepia ${s}`
      }
    }
  ]
})
