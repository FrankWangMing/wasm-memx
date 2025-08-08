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


```

---

##  功能预览

1.  高性能数据存储：将数据直接放入线性内存，避免 JS 层频繁 GC 和对象拆装。

2.  计算下沉到 Rust/Wasm：排序、矩阵运算、数据扫描等重度计算直接在 Rust 内完成。

3.  多线程并行：通过 SharedArrayBuffer 和 Worker，多线程读写同一块内存。

4.  跨平台（Node + 浏览器）：支持在服务端和前端运行。




#   MVP Scope (第一版)
    核心内存管理（SharedBufferManager）

    Queue（基于环形缓冲区）

    Stack（基础 push/pop）

    基础 Map（简单 KV 存储）

    TypeScript 类型导出

    浏览器 Demo（Vite）

    Node.js 测试