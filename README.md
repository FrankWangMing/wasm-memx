# wasm-memx

> 基于 SharedArrayBuffer 的高性能共享内存管理与队列实现

---

## 介绍

`wasm-memx` 提供了简单易用的 SharedArrayBuffer 封装工具，包含：

- `SharedBufferManager`：内存管理器，支持创建和调整共享内存大小
- `SharedQueue`：基于 SAB + Atomics 实现的多线程安全 FIFO 队列

支持 Node.js Worker 线程与浏览器 Web Worker 场景，方便进行高性能跨线程数据通信，适合 WebAssembly、音视频处理、实时协作等应用。

---

## 安装

```bash
pnpm add wasm-memx
# 或
npm install wasm-memx

yarn add wasm-memx
