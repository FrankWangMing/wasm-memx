# Workers 并发通信

## Node.js Worker 示例

```ts
// main.ts
import { Worker } from 'node:worker_threads';
import { SharedMemoryBase } from 'wasm-memx';

const mem = new SharedMemoryBase(1024);
const worker = new Worker('./worker.js', { workerData: mem.getBuffer() });

worker.on('message', msg => console.log(msg));
```

```ts
// worker.ts
import { workerData, parentPort } from 'node:worker_threads';

const buf = workerData as SharedArrayBuffer;
const view = new Uint32Array(buf);
view[0] = 42;
parentPort?.postMessage(view[0]);
```

## 浏览器 Web Worker 示例

浏览器中需启用跨源隔离，否则 `SharedArrayBuffer` 不可用：参考 `examples/web/vite.config.js:1`。

```ts
// main.ts
const worker = new Worker(new URL('./worker.js', import.meta.url), { type: 'module' });
const sab = new SharedArrayBuffer(1024);
worker.postMessage(sab);
```

```ts
// worker.ts
self.onmessage = (e) => {
  const view = new Float32Array(e.data as SharedArrayBuffer);
  view[0] = 3.14;
};
```

## 原子操作与同步

在多线程场景可使用 `Atomics` 实现基本同步（如环形队列、标志位）。确保始终使用 `Int32Array/BigInt64Array` 等支持原子的视图类型。
