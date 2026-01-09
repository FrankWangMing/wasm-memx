---
layout: home

title: wasm-memx
titleTemplate: 面向 WebAssembly 与 Workers 的零拷贝共享内存工具

hero:
  name: wasm-memx
  text: 一个面向 WebAssembly 与 Worker 的零拷贝共享内存计算库
  tagline: 基于 SharedArrayBuffer 构建统一的内存抽象，提供 TypeScript 友好的 API，并通过 WASM 实现高性能数值计算加速。
  image:
    src: logo.png
    alt: WASM MemX Logo
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/getting-started
    - theme: alt
      text: GitHub
      link: https://github.com/FrankWangMing/wasm-memx

features:
  - title: 零拷贝通信
    details: 在 WASM、Workers 与主线程之间共享同一块内存，避免大数据复制与额外 GC 压力。
  - title: 共享内存模型
    details: 基于 SharedArrayBuffer + TypedArray + Atomics 构建可复用的数据布局与并发通信基础设施。
  - title: TypeScript 友好
    details: 提供清晰的 TS API 与示例，便于在工程中安全地进行低层内存操作与集成。
---
