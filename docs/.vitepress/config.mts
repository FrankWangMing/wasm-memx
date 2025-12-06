import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'wasm-memx',
  description: 'Zero-copy data sharing for WebAssembly and Web Workers',
  lang: 'zh-CN',

  head: [
    ['link', { rel: 'icon', href: '/logo.png' }],
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['meta', { property: 'og:title', content: 'wasm-memx' }],
    ['meta', { property: 'og:description', content: 'Zero-copy data sharing for WebAssembly and Web Workers' }],
    ['meta', { property: 'og:image', content: '/logo.png' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }]
  ],

  themeConfig: {
    logo: '/logo.png',

    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'API', link: '/api/index' },
      { text: 'Examples', link: '/examples/basic-zero-copy' },
      { text: 'FAQ', link: '/faq/common-question' }
    ],

    sidebar: {
      '/guide/': [
        { text: 'Getting Started', link: '/guide/getting-started' },
        { text: 'Installation', link: '/guide/installation' },
        { text: 'Core Concepts', link: '/guide/core-concepts' },
        { text: 'Memory Model', link: '/guide/memory-model' },
        { text: 'WASM Integration', link: '/guide/wasm-integration' },
        { text: 'Workers', link: '/guide/workers' },
        { text: 'Advanced', link: '/guide/advanced' }
      ],

      '/api/': [
        { text: 'API Overview', link: '/api/index' }
      ],

      '/examples/': [
        { text: 'Basic Zero-Copy', link: '/examples/basic-zero-copy' },
      ],

      '/faq/': [
        { text: 'Common Questions', link: '/faq/common-question' }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/FrankWangMing/wasm-memx' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: '© 2025-PRESENT wasm-memx'
    },

    search: { provider: 'local' },
    outline: [2, 6]
  }
})
