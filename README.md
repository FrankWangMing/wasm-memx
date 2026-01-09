# wasm-memx

> 基于 SharedArrayBuffer 的高性能共享内存管理与数据结构实现

[![npm version](https://img.shields.io/npm/v/wasm-memx)](https://www.npmjs.com/package/wasm-memx)
[![license](https://img.shields.io/npm/l/wasm-memx)](LICENSE)

---

## 介绍

`wasm-memx` 提供了简单易用的 SharedArrayBuffer 封装工具，提供零拷贝（Zero-Copy）数据共享能力，围绕浏览器与 Node.js 的 `SharedArrayBuffer`、`TypedArray` 与 `Atomics` 构建易用的内存抽象。

### 核心功能

- **`SharedMemoryBase`**：统一的共享内存封装与视图创建
- **`MemoryManager`**：分区化内存布局与按需分配
- **`SharedModelBuffer`**：为 3D 模型数据设计的复合缓冲区
- **`Math3D`**：调用 Rust/WASM 的数学函数加速（向量、矩阵、四元数运算）

支持 Node.js Worker 线程与浏览器 Web Worker 场景，方便进行高性能跨线程数据通信，适合 WebAssembly、音视频处理、实时协作、3D 图形等应用。

---

## 安装

```bash
pnpm add wasm-memx
# 或
npm install wasm-memx
# 或
yarn add wasm-memx
```

> **注意**：浏览器中使用 SharedArrayBuffer 需要启用跨源隔离（COOP/COEP）。详见[安装指南](docs/guide/installation.md)。

---

## 快速开始

### 基础用法：创建共享内存

```typescript
import { SharedMemoryBase } from "wasm-memx";

// 申请 64KB 共享内存
const mem = new SharedMemoryBase(64 * 1024);
const buffer = mem.getBuffer(); // SharedArrayBuffer

// 使用 TypedArray 进行零拷贝读写
const view = new Float32Array(buffer, 0, 4);
view[0] = 1.0;
view[1] = 2.0;
console.log(view[0], view[1]); // 1.0, 2.0
```

### 3D 模型缓冲区

```typescript
import { SharedModelBuffer } from "wasm-memx";

const model = new SharedModelBuffer(1000 /* 顶点数 */, 3000 /* 索引数 */);
const positions = model.getPositions(); // Float32Array
const indices = model.getIndices(); // Uint32Array

// 直接写入共享缓冲区（零拷贝）
positions.set([0, 0, 0, 1, 0, 0, 0, 1, 0]);
indices.set([0, 1, 2]);
```

### WASM 数学加速

```typescript
import { Math3D } from "wasm-memx";

const a = new Float32Array([1, 2, 3]);
const b = new Float32Array([4, 5, 6]);

const sum = Math3D.vec3Add(a, b); // 调用 WASM 函数
console.log(sum); // Float32Array [5, 7, 9]
```

### 多线程（Node.js Worker）

```typescript
import { Worker } from "node:worker_threads";
import { SharedMemoryBase } from "wasm-memx";

const mem = new SharedMemoryBase(1024);
const worker = new Worker("./worker.js", {
  workerData: mem.getBuffer()
});
```

---

## 功能特性

1. **高性能数据存储**：将数据直接放入线性内存，避免 JS 层频繁 GC 和对象拆装。

2. **计算下沉到 Rust/WASM**：排序、矩阵运算、数据扫描等重度计算直接在 Rust 内完成。

3. **多线程并行**：通过 SharedArrayBuffer 和 Worker，多线程读写同一块内存。

4. **跨平台（Node + 浏览器）**：支持在服务端和前端运行。

5. **TypeScript 支持**：完整的类型定义，提供良好的开发体验。

---

## 文档

- [快速开始](docs/guide/getting-started.md)
- [核心概念](docs/guide/core-concepts.md)
- [API 文档](docs/api/index.md)
- [安装指南](docs/guide/installation.md)
- [WASM 集成](docs/guide/wasm-integration.md)
- [Workers 使用](docs/guide/workers.md)

---

## MVP Scope（第一版）

- ✅ 核心内存管理（`SharedMemoryBase`、`MemoryManager`）
- ✅ 3D 模型缓冲区（`SharedModelBuffer`）
- ✅ WASM 数学库（`Math3D`）
- ✅ TypeScript 类型导出
- ✅ 浏览器 Demo（Vite）
- ✅ Node.js 测试
- 🚧 Queue（基于环形缓冲区）- 计划中
- 🚧 Stack（基础 push/pop）- 计划中
- 🚧 基础 Map（简单 KV 存储）- 计划中

---

## 示例

查看 [examples](./examples) 目录获取更多示例：

- [基础队列示例](./examples/basic-queue.js)
- [Web 示例](./examples/web)
- [Node.js 示例](./examples/node)
- [Worker 示例](./examples/worker)

---

## 许可证

[MIT](LICENSE)

---

## 贡献

欢迎提交 Issue 和 Pull Request！

---

## 相关链接

- [GitHub Repository](https://github.com/FrankWangMing/wasm-memx)
- [文档站点](https://github.com/FrankWangMing/wasm-memx/tree/main/docs)