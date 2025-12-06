# API 概览

本页概述核心类与工具，并提供简要示例与路径引用。

## SharedMemoryBase

统一的共享内存封装与视图创建（`api/core/manager.ts:1`）。

```ts
import { SharedMemoryBase } from 'wasm-memx';
const mem = new SharedMemoryBase(64 * 1024);
const f32 = mem.getView(Float32Array, 0, 16);
```

关键方法：

- `getBuffer(): SharedArrayBuffer`
- `getView(ctor, offset?, length?)`
- `getSize(): number`

## MemoryManager

分区化内存布局与按需分配（`api/core/memory.ts:1`）。

```ts
import { MemoryManager } from 'wasm-memx';
const mm = new MemoryManager(256 * 1024, {
  vertices: 128 * 1024,
  indices: 64 * 1024,
  uvs: 32 * 1024,
  normals: 32 * 1024,
});
const offset = mm.alloc('vertices', 4 * 1024, 4);
```

## SharedModelBuffer

为 3D 模型数据组织的复合缓冲区（`api/model/index.ts:1`）。

```ts
import { SharedModelBuffer } from 'wasm-memx';
const buf = new SharedModelBuffer(1000, 3000);
buf.getPositions().set([0,0,0]);
buf.getIndices().set([0,1,2]);
```

## Math3D（WASM 加速）

TypeScript 侧包装 WASM 导出（`api/math/math.ts:1`），Rust 侧实现（`src/math/mod.rs:1`）。

```ts
import { Math3D } from 'wasm-memx';
const a = new Float32Array([1,2,3]);
const b = new Float32Array([4,5,6]);
Math3D.vec3Add(a, b);
```

## WasmSharedMemory（可选）

用于手动实例化 WASM 并传入共享内存（`api/core/wasm-loader.ts:1`）。
