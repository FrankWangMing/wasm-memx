# Advanced

## Architecture patterns

- Region layout: use `MemoryManager` to partition a SAB into `vertices/indices/uvs/normals` and allocate with alignment (`api/core/memory.ts:1`).
- Composite buffers: `SharedModelBuffer` computes segment sizes and exposes typed views (`api/model/index.ts:1`).
- WASM math: offload numeric computation to Rust/WASM, keep data in typed views (`api/math/math.ts:1`, `src/math/mod.rs:1`).

## Concurrency & sync

- Atomics primitives: `Atomics.store/load/add/sub/compareExchange/wait/notify` with `Int32Array`.
- Ring buffer idea: two atomic indices `head/tail`, prefer power-of-two capacity for fast modulo.
- Backpressure: block in Workers (or drop strategy) to avoid unbounded growth.

> Avoid blocking `Atomics.wait` on the browser main thread. Use it in Workers/Node, or prefer non-blocking designs.

