---
outline: deep
---

# API 使用示例

本页提供一些更贴近实际工程的 `wasm-memx` 使用片段，帮助你把共享内存、WASM 与 Worker 串成可复用的“数据通道”。

## 示例 1：`SharedMemoryBase` + 视图复用（避免频繁创建 TypedArray）

```ts
import { SharedMemoryBase } from "wasm-memx";

const mem = new SharedMemoryBase(64 * 1024);
const buf = mem.getBuffer();

// 视图尽量长期复用（减少 GC）
const signals = new Int32Array(buf, 0, 4);
const data = new Float32Array(buf, 16, 1024);

signals[0] = 0;
data[0] = 3.14;
```

## 示例 2：`MemoryManager` 分区分配（适合几何/渲染管线）

```ts
import { MemoryManager } from "wasm-memx";

// 先估算峰值大小，按字节划分各分区
const total = 256 * 1024;
const mm = new MemoryManager(total, {
  vertices: 128 * 1024,
  indices: 64 * 1024,
  uvs: 32 * 1024,
  normals: 32 * 1024,
});

const sab = mm.getBuffer();

// 分配一段 vertices 空间（返回在 sab 内的字节偏移）
const verticesOffset = mm.alloc("vertices", 4 * 1024, 4);
const vertices = new Float32Array(sab, verticesOffset, (4 * 1024) / 4);

vertices[0] = 1;
vertices[1] = 2;
```

## 示例 3：`SharedModelBuffer` 组织 positions/normals/uvs/indices

```ts
import { SharedModelBuffer } from "wasm-memx";

const buf = new SharedModelBuffer(1000 /* vertexCount */, 3000 /* indexCount */);

// 这些视图共享同一块 SharedArrayBuffer
const positions = buf.getPositions();
const normals = buf.getNormals();
const uvs = buf.getUVs();
const indices = buf.getIndices();

positions.set([0, 0, 0, 1, 0, 0, 0, 1, 0]);
normals.set([0, 0, 1, 0, 0, 1, 0, 0, 1]);
uvs.set([0, 0, 1, 0, 0, 1]);
indices.set([0, 1, 2]);
```

## 示例 4：`Math3D`（WASM 数学加速）

```ts
import { Math3D } from "wasm-memx";

const a = new Float32Array([1, 2, 3]);
const b = new Float32Array([4, 5, 6]);

const c = Math3D.vec3Add(a, b);
const dot = Math3D.vec3Dot(a, b);

console.log(c, dot);
```

## 示例 5：Node.js Worker 传递 SharedArrayBuffer

> Node.js 中无需 COOP/COEP；浏览器 Web Worker 需要跨源隔离，详见「安装」与「Workers」章节。

```ts
// main.ts
import { Worker } from "node:worker_threads";
import { SharedMemoryBase } from "wasm-memx";

const mem = new SharedMemoryBase(1024);
const worker = new Worker("./worker.js", { workerData: mem.getBuffer() });

worker.on("message", (msg) => console.log("from worker:", msg));
```

```ts
// worker.ts
import { workerData, parentPort } from "node:worker_threads";

const sab = workerData as SharedArrayBuffer;
const view = new Uint32Array(sab);
view[0] = 42;
parentPort?.postMessage(view[0]);
```

## 示例 6：Atomics 信号位同步（仅限 Worker/Node）

> 不建议在浏览器主线程使用阻塞式 `Atomics.wait`；应在 Worker 内使用，或设计非阻塞回压策略。

```ts
const sab = new SharedArrayBuffer(1024);
const signals = new Int32Array(sab, 0, 4);
const data = new Float32Array(sab, 16, 16);

// producer（任意线程）
function producer() {
  data[0] = 3.14;
  Atomics.store(signals, 0, 1);
  Atomics.notify(signals, 0, 1);
}

// consumer（Worker/Node 中）
function consumer() {
  while (Atomics.load(signals, 0) === 0) Atomics.wait(signals, 0, 0);
  const v = data[0];
  Atomics.store(signals, 0, 0);
  return v;
}
```
