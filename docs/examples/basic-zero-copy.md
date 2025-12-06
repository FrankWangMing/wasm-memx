# 基础零拷贝示例

本示例展示如何在同一个 `SharedArrayBuffer` 上使用不同的 `TypedArray` 视图进行读写，而无需数据复制。

```ts
import { SharedMemoryBase } from 'wasm-memx';

// 申请 4KB 共享缓冲区
const mem = new SharedMemoryBase(4 * 1024);
const buf = mem.getBuffer();

// 创建视图并写入数据
const f32 = new Float32Array(buf, 0, 8);
f32.set([0.1, 0.2, 0.3]);

// 在另一处读取同一底层数据（零拷贝）
const u8 = new Uint8Array(buf);
console.log('First byte:', u8[0]);

// 将缓冲区传递给 Worker 或 WASM
// worker.postMessage(buf);
```

结合 `SharedModelBuffer` 可组织更复杂的布局（位置/法线/UV/索引），详见「内存模型」。
