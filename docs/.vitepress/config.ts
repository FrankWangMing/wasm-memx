
export default {
  locales: {
    root: {
      label: "简体中文",
      lang: "zh-CN",
      title: "wasm-memx",
      description: "基于 SharedArrayBuffer 的高性能共享内存管理与 WASM/Worker 集成",
      themeConfig: {
        nav: [
          { text: "指南", link: "/guide/getting-started" },
          { text: "API", link: "/api/" },
          { text: "示例", link: "/examples/basic-zero-copy" },
          { text: "FAQ", link: "/faq/common-question" },
          {
            text: "GitHub",
            link: "https://github.com/FrankWangMing/wasm-memx",
          },
        ],
        sidebar: {
          "/guide/": [
            {
              text: "指南",
              items: [
                { text: "快速开始", link: "/guide/getting-started" },
                { text: "安装与环境要求", link: "/guide/installation" },
                { text: "核心概念", link: "/guide/core-concepts" },
                { text: "内存模型与布局", link: "/guide/memory-model" },
                { text: "WASM 集成", link: "/guide/wasm-integration" },
                { text: "Workers 并发通信", link: "/guide/workers" },
                { text: "进阶", link: "/guide/advanced" },
                { text: "API 使用示例", link: "/guide/api-examples" },
              ],
            },
          ],
          "/api/": [
            {
              text: "API",
              items: [{ text: "API 概览", link: "/api/" }],
            },
          ],
          "/examples/": [
            {
              text: "示例",
              items: [
                { text: "基础零拷贝示例", link: "/examples/basic-zero-copy" },
              ],
            },
          ],
          "/faq/": [
            {
              text: "FAQ",
              items: [{ text: "常见问题", link: "/faq/common-question" }],
            },
          ],
        },
        editLink: {
          pattern:
            "https://github.com/FrankWangMing/wasm-memx/edit/main/docs/:path",
          text: "在 GitHub 上编辑此页",
        },
        footer: {
          message: "MIT Licensed",
          copyright: "Copyright © wasm-memx",
        },
      },
    },
    en: {
      label: "English",
      lang: "en-US",
      title: "wasm-memx",
      description:
        "High-performance shared memory utilities for SharedArrayBuffer + WASM/Workers",
      link: "/en/",
      themeConfig: {
        nav: [
          { text: "Guide", link: "/en/guide/getting-started" },
          { text: "API", link: "/en/api/" },
          { text: "Examples", link: "/en/examples/basic-zero-copy" },
          { text: "FAQ", link: "/en/faq/common-question" },
          {
            text: "GitHub",
            link: "https://github.com/FrankWangMing/wasm-memx",
          },
        ],
        sidebar: {
          "/en/guide/": [
            {
              text: "Guide",
              items: [
                { text: "Getting Started", link: "/en/guide/getting-started" },
                { text: "Installation", link: "/en/guide/installation" },
                { text: "Core Concepts", link: "/en/guide/core-concepts" },
                { text: "Memory Model", link: "/en/guide/memory-model" },
                { text: "WASM Integration", link: "/en/guide/wasm-integration" },
                { text: "Workers", link: "/en/guide/workers" },
                { text: "Advanced", link: "/en/guide/advanced" },
                { text: "API Examples", link: "/en/guide/api-examples" },
              ],
            },
          ],
          "/en/api/": [
            {
              text: "API",
              items: [{ text: "API Overview", link: "/en/api/" }],
            },
          ],
          "/en/examples/": [
            {
              text: "Examples",
              items: [
                { text: "Basic Zero-Copy", link: "/en/examples/basic-zero-copy" },
              ],
            },
          ],
          "/en/faq/": [
            {
              text: "FAQ",
              items: [{ text: "Common Questions", link: "/en/faq/common-question" }],
            },
          ],
        },
        editLink: {
          pattern:
            "https://github.com/FrankWangMing/wasm-memx/edit/main/docs/:path",
          text: "Edit this page on GitHub",
        },
        footer: {
          message: "MIT Licensed",
          copyright: "Copyright © wasm-memx",
        },
      },
    },
  },

  themeConfig: {
    logo: "/logo.png",
    localeLinks: {
      text: "Language",
    },

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/FrankWangMing/wasm-memx",
      },
    ],
  },
};

