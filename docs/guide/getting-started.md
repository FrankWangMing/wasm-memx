
````markdown
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
````

---

## 快速开始

### 1. 创建共享内存管理器

```ts
import { SharedBufferManager } from "wasm-memx";

const manager = new SharedBufferManager(1024);
console.log("Buffer size:", manager.getBuffer().byteLength);
```

### 2. 使用共享队列

```ts
import { SharedQueue } from "wasm-memx";

const queue = new SharedQueue(4);
queue.enqueue(10);
queue.enqueue(20);

console.log(queue.dequeue()); // 输出 10
console.log(queue.dequeue()); // 输出 20
```

---

## 多线程示例（Node.js Worker）

主线程：

```ts
import { Worker } from "node:worker_threads";
import { SharedQueue } from "wasm-memx";

const queue = new SharedQueue(8);
const buffer = queue.getBuffer();

const worker = new Worker("./worker.js", { workerData: buffer });
worker.on("message", msg => console.log("Worker message:", msg));

queue.enqueue(1);
queue.enqueue(2);
```

Worker 线程：

```ts
import { parentPort, workerData } from "node:worker_threads";
import { SharedQueue } from "wasm-memx";

const queue = new SharedQueue(8);
(queue as any).buffer = workerData;

const val1 = queue.dequeue();
const val2 = queue.dequeue();

parentPort?.postMessage({ val1, val2 });
```

---

## 开发

* 使用 TypeScript 开发，打包采用 Rollup
* 运行 `pnpm build` 构建项目
* 示例代码位于 `examples/`，可以直接运行
* 欢迎提交 PR 和 Issue，参与改进

---

## 许可证

MIT License © 2025 WANG MING

---

## 联系方式

如有问题，请在 GitHub Issue 反馈，或者联系邮箱：[jasonming1998@gmail.com](mailto:jasonming1998@gmail.com)

```

---

我帮你写了完整开源包的核心和示例流程，后续如果需要可以继续加锁、Channel、Map 等高级功能。
你觉得怎么样？要不要我帮你自动生成 GitHub 仓库 README 文件内容？
```
