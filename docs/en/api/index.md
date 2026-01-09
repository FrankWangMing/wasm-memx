# API Overview

This page summarizes the core classes and utilities.

## SharedMemoryBase

Shared memory wrapper + typed view helpers (`api/core/manager.ts:1`).

```ts
import { SharedMemoryBase } from "wasm-memx";
const mem = new SharedMemoryBase(64 * 1024);
const f32 = mem.getView(Float32Array, 0, 16);
```

## MemoryManager

Region-based layout + aligned allocation (`api/core/memory.ts:1`).

```ts
import { MemoryManager } from "wasm-memx";

const mm = new MemoryManager(256 * 1024, {
  vertices: 128 * 1024,
  indices: 64 * 1024,
  uvs: 32 * 1024,
  normals: 32 * 1024,
});
mm.alloc("vertices", 4 * 1024, 4);
```

## SharedModelBuffer

Composite buffer for 3D model data (`api/model/index.ts:1`).

```ts
import { SharedModelBuffer } from "wasm-memx";
const buf = new SharedModelBuffer(1000, 3000);
buf.getPositions().set([0, 0, 0]);
```

## Math3D

WASM-accelerated math (`api/math/math.ts:1`, `src/math/mod.rs:1`).

```ts
import { Math3D } from "wasm-memx";
Math3D.mat4Identity();
```

## WasmSharedMemory (optional)

Manual WASM instantiation with shared memory (`api/core/wasm-loader.ts:1`).

