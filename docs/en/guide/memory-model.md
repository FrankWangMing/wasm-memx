# Memory Model & Layout

## Pages and size

`SharedArrayBuffer` is allocated in 64KB pages. This library converts bytes into pages when creating memory (see `api/core/manager.ts:1`).

## Region design (MemoryManager)

`MemoryManager` tracks region start/offset/size and provides aligned allocation (`api/core/memory.ts:1`):

- `alloc(region, size, align)` allocates a slice and returns the byte offset
- `getBuffer()` returns the whole SAB for passing across threads
- `reset()` sets region offsets back to 0 for reuse

## Composite buffer (SharedModelBuffer)

`SharedModelBuffer` computes byte sizes for positions/normals/uvs/indices and stores offsets (`api/model/index.ts:1`), exposing typed views:

- `getPositions(): Float32Array`
- `getNormals(): Float32Array`
- `getUVs(): Float32Array`
- `getIndices(): Uint32Array`

