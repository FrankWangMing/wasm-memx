import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "wasm-memx",
  description: "Zero-copy data sharing for WebAssembly and Web Workers",
  head: [
    [
      'link',
      { rel: 'icon', href: '/logo.png' }  // 放在 public 目录
    ]
  ],
  themeConfig: {
    logo: '/logo.png',
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'API', link: '/guide/api' },
      { text: 'Benchmark', link: '/benchmark' }
    ],
    sidebar: {
      '/guide/': [
        { text: 'Getting Started', link: '/guide/getting-started' },
        { text: 'Advanced', link: '/guide/advanced' },
        { text: 'API', link: '/guide/api' }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/FrankWangMing/wasm-memx' }
    ]
  }
})