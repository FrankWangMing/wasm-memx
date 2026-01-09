# Workers

## Node.js Worker example

```ts
// main.ts
import { Worker } from "node:worker_threads";
import { SharedMemoryBase } from "wasm-memx";

const mem = new SharedMemoryBase(1024);
const worker = new Worker("./worker.js", { workerData: mem.getBuffer() });

worker.on("message", (msg) => console.log(msg));
```

```ts
// worker.ts
import { workerData, parentPort } from "node:worker_threads";

const buf = workerData as SharedArrayBuffer;
const view = new Uint32Array(buf);
view[0] = 42;
parentPort?.postMessage(view[0]);
```

## Browser Web Worker example

Browsers require cross-origin isolation, otherwise `SharedArrayBuffer` is unavailable.

```ts
// main.ts
const worker = new Worker(new URL("./worker.js", import.meta.url), {
  type: "module",
});
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

## Atomics & synchronization

Use `Atomics` with atomic-capable views (`Int32Array`/`BigInt64Array`) for coordination (signals, ring buffers, etc.).

