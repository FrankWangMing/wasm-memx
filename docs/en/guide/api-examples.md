---
outline: deep
---

# API Examples

This page shows practical snippets for `wasm-memx` APIs.

## 1) `SharedMemoryBase` + view reuse

```ts
import { SharedMemoryBase } from "wasm-memx";

const mem = new SharedMemoryBase(64 * 1024);
const buf = mem.getBuffer();

const signals = new Int32Array(buf, 0, 4);
const data = new Float32Array(buf, 16, 1024);

signals[0] = 0;
data[0] = 3.14;
```

## 2) `MemoryManager` region allocation

```ts
import { MemoryManager } from "wasm-memx";

const mm = new MemoryManager(256 * 1024, {
  vertices: 128 * 1024,
  indices: 64 * 1024,
  uvs: 32 * 1024,
  normals: 32 * 1024,
});

const sab = mm.getBuffer();
const offset = mm.alloc("vertices", 4 * 1024, 4);
const vertices = new Float32Array(sab, offset, (4 * 1024) / 4);
```

## 3) `SharedModelBuffer`

```ts
import { SharedModelBuffer } from "wasm-memx";

const buf = new SharedModelBuffer(1000, 3000);
buf.getPositions().set([0, 0, 0, 1, 0, 0, 0, 1, 0]);
buf.getIndices().set([0, 1, 2]);
```

## 4) `Math3D`

```ts
import { Math3D } from "wasm-memx";

const a = new Float32Array([1, 2, 3]);
const b = new Float32Array([4, 5, 6]);
console.log(Math3D.vec3Add(a, b));
```

## 5) Passing SAB to Node.js Worker

```ts
import { Worker } from "node:worker_threads";
import { SharedMemoryBase } from "wasm-memx";

const mem = new SharedMemoryBase(1024);
new Worker("./worker.js", { workerData: mem.getBuffer() });
```

