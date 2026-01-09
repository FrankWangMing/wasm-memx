---
layout: home

title: wasm-memx
titleTemplate: Zero-copy shared memory utilities for WASM & Workers

hero:
  name: wasm-memx
  text: Zero-copy data sharing for WebAssembly and Workers
  tagline: A SharedArrayBuffer-first toolkit for high-throughput memory layouts and WASM math acceleration
  image:
    src: logo.png
    alt: WASM MemX Logo
  actions:
    - theme: brand
      text: Get Started
      link: /en/guide/getting-started
    - theme: alt
      text: GitHub
      link: https://github.com/FrankWangMing/wasm-memx

features:
  - title: Zero-copy communication
    details: Share the same memory between main thread, Workers and WASM to avoid large buffer copies.
  - title: Shared memory model
    details: Build reusable memory layouts with SharedArrayBuffer + TypedArray + Atomics.
  - title: TypeScript-first
    details: Clear TS APIs and examples for safer low-level memory operations.
---

