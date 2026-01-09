# Basic Zero-Copy Example

This example shows how multiple `TypedArray` views can read/write the same underlying `SharedArrayBuffer` without copying.

```ts
import { SharedMemoryBase } from "wasm-memx";

const mem = new SharedMemoryBase(4 * 1024);
const buf = mem.getBuffer();

const f32 = new Float32Array(buf, 0, 8);
f32.set([0.1, 0.2, 0.3]);

const u8 = new Uint8Array(buf);
console.log("First byte:", u8[0]);
```

