# Core Concepts

## Zero-copy

Store large data (vertices, pixels, matrices) in a `SharedArrayBuffer`, then access it through `TypedArray` views across environments (main thread / Web Worker / Node Worker / WASM) without copying.

## SharedMemoryBase

`SharedMemoryBase` wraps shared memory creation and typed view helpers (`api/core/manager.ts:1`):

- `getBuffer()` returns `SharedArrayBuffer`
- `getView(ctor, offset?, length?)` creates typed views quickly

## MemoryManager (region-based layout)

`MemoryManager` splits one SAB into logical regions (e.g. `vertices/indices/uvs/normals`) and allocates with alignment (`api/core/memory.ts:1`).

## Composite buffers

`SharedModelBuffer` shows how to organize multi-segment model data in a single SAB, and expose typed views (`api/model/index.ts:1`).

## WASM cooperation

Rust exports math functions via `wasm_bindgen` (e.g. `src/math/mod.rs:1`), and TS wraps them in `Math3D` (`api/math/math.ts:1`).

