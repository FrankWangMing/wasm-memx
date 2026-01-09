# Getting Started

> Zero-copy shared memory with SharedArrayBuffer + WASM/Workers

## What is wasm-memx?

`wasm-memx` provides a set of primitives built around `SharedArrayBuffer`, `TypedArray` and `Atomics`:

- `SharedMemoryBase`: create shared memory and typed views
- `MemoryManager`: region-based layout + aligned allocation
- `SharedModelBuffer`: a composite buffer for 3D model data (positions/normals/uvs/indices)
- `Math3D`: WASM-accelerated math (vec/mat/quat)

## Install

```bash
pnpm add wasm-memx
# or
npm install wasm-memx
# or
yarn add wasm-memx
```

> Browsers require cross-origin isolation (COOP/COEP) to enable `SharedArrayBuffer`. See `Installation`.

## Create shared memory + typed views

```ts
import { SharedMemoryBase } from "wasm-memx";

const mem = new SharedMemoryBase(64 * 1024);
const buffer = mem.getBuffer(); // SharedArrayBuffer

const view = new Float32Array(buffer, 0, 4);
view[0] = 1.0;
view[1] = 2.0;
console.log(view[0], view[1]);
```

## Composite buffer (model data)

```ts
import { SharedModelBuffer } from "wasm-memx";

const model = new SharedModelBuffer(1000 /* vertices */, 3000 /* indices */);
model.getPositions().set([0, 0, 0, 1, 0, 0, 0, 1, 0]);
model.getIndices().set([0, 1, 2]);
```

## WASM math acceleration

```ts
import { Math3D } from "wasm-memx";

const a = new Float32Array([1, 2, 3]);
const b = new Float32Array([4, 5, 6]);
console.log(Math3D.vec3Add(a, b));
```

## Workers (Node.js)

```ts
import { Worker } from "node:worker_threads";
import { SharedMemoryBase } from "wasm-memx";

const mem = new SharedMemoryBase(1024);
new Worker("./worker.js", { workerData: mem.getBuffer() });
```

