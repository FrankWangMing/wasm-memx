
# 快速开始

> 基于 SharedArrayBuffer 的高性能共享内存与 WASM/Worker 集成

## 介绍

`wasm-memx` 提供零拷贝（Zero-Copy）数据共享能力，围绕浏览器与 Node.js 的 `SharedArrayBuffer`、`TypedArray` 与 `Atomics` 构建易用的内存抽象：

- `SharedMemoryBase`：统一的共享内存封装与视图创建（`api/core/manager.ts:1`）
- `MemoryManager`：分区化内存布局与按需分配（`api/core/memory.ts:1`）
- `SharedModelBuffer`：为 3D 模型数据设计的复合缓冲区（`api/model/index.ts:1`）
- `Math3D`：调用 Rust/wasm 的数学函数加速（`api/math/math.ts:1`，`src/math/mod.rs:1`）

支持 WebAssembly、Web Worker 与 Node Worker 的高吞吐场景（图形、音视频、数值计算等）。

## 安装

```bash
pnpm add wasm-memx
# 或
npm install wasm-memx
yarn add wasm-memx
```

浏览器中使用 SharedArrayBuffer 需要跨源隔离（COOP/COEP），详见「安装」章节。

## 创建共享内存并读写视图

```ts
import { SharedMemoryBase } from "wasm-memx";

// 申请 64KB 共享内存
const mem = new SharedMemoryBase(64 * 1024);
const buffer = mem.getBuffer(); // SharedArrayBuffer

// 使用 TypedArray 进行零拷贝读写
const view = new Float32Array(buffer, 0, 4);
view[0] = 1.0;
view[1] = 2.0;
console.log(view[0], view[1]);
```

## 复合缓冲区（模型数据）

```ts
import { SharedModelBuffer } from "wasm-memx";

const model = new SharedModelBuffer(1000 /* 顶点数 */, 3000 /* 索引数 */);
const positions = model.getPositions(); // Float32Array
const indices = model.getIndices(); // Uint32Array

// 直接写入共享缓冲区（零拷贝）
positions.set([0,0,0, 1,0,0, 0,1,0]);
indices.set([0,1,2]);
```

## 与 WASM 的协作（Math3D）

```ts
import { Math3D } from "wasm-memx";

const a = new Float32Array([1,2,3]);
const b = new Float32Array([4,5,6]);

const sum = Math3D.vec3Add(a, b); // 调用 WASM 函数
console.log(sum); // Float32Array [5,7,9]
```

## 多线程（Node.js Worker）

```ts
import { Worker } from "node:worker_threads";
import { SharedMemoryBase } from "wasm-memx";

const mem = new SharedMemoryBase(1024);
const worker = new Worker("./worker.js", { workerData: mem.getBuffer() });
```

> 浏览器 Web Worker 亦可使用，但需启用跨源隔离；详见「Workers」章节。

## 进一步阅读

- 安装与跨源隔离配置
- 核心概念与内存模型
- WASM 集成与数学加速
- Workers 并发通信
