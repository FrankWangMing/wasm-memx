# Advanced

## 架构模式

- 分区化布局：使用 `MemoryManager` 将一个 SAB 按功能划分为 `vertices/indices/uvs/normals` 等分区（`api/core/memory.ts:1`），通过 `alloc(region, size, align)` 实现对齐分配与复用。
- 复合缓冲：`SharedModelBuffer` 在构造时计算各段字节大小并统一管理偏移，提供类型视图访问（`api/model/index.ts:1`），适合渲染与几何处理。
- WASM 协作：数值计算通过 Rust/wasm 执行，JS 侧以 `TypedArray` 视图零拷贝传递（`api/math/math.ts:1` 与 `src/math/mod.rs:1`）。

## 并发与同步

- Atomics 原语：使用 `Int32Array` 配合 `Atomics.store/load/add/sub/compareExchange/wait/notify` 管理生产者-消费者同步。
- 环形缓冲设计：以固定容量数组作为队列，使用两个原子索引 `head/tail` 维护入队与出队，容量使用 2 的幂以便位运算取模。
- 回压与速率控制：在消费者处理速度不足时，生产者通过 `Atomics.wait` 阻塞或丢弃策略避免无限增长。

示例（信号位）：

```ts
const buf = new SharedArrayBuffer(1024);
const signals = new Int32Array(buf, 0, 4);
const data = new Float32Array(buf, 16);

function producer() {
  data[0] = 3.14;
  Atomics.store(signals, 0, 1);
  Atomics.notify(signals, 0, 1);
}

function consumer() {
  while (Atomics.load(signals, 0) === 0) Atomics.wait(signals, 0, 0);
  const v = data[0];
  Atomics.store(signals, 0, 0);
  return v;
}
```

## 零拷贝数据流（WASM + Worker）

组合使用共享内存、Worker 与 WASM：

```ts
import { Worker } from 'node:worker_threads';
import { SharedMemoryBase } from 'wasm-memx';
import { Math3D } from 'wasm-memx';

const mem = new SharedMemoryBase(64 * 1024);
const buf = mem.getBuffer();
const a = new Float32Array(buf, 0, 3);
const b = new Float32Array(buf, 12, 3);
const out = Math3D.vec3Add(a, b);

const worker = new Worker('./worker.js', { workerData: buf });
```

## 性能优化要点

- 视图重用：避免频繁创建 `TypedArray`，重用长寿命视图，减少 GC 压力。
- 对齐与类型：按 4/8 字节对齐；确保数值类型与 WASM 侧一致（`f32/u32` 等）。
- 批处理：合并小型操作为批次，减少 `postMessage` 次数与调度开销。
- COOP/COEP：浏览器中启用跨源隔离以确保 `SharedArrayBuffer` 可用（见安装章节，`examples/web/vite.config.js:1`）。

## 调试与验证

- 共享验证：`view.buffer === otherView.buffer` 用于确认两个视图引用同一 SAB。
- 越界检测：为分区分配实现边界检查与断言，避免未定义行为（参考 `alloc` 内逻辑，`api/core/memory.ts:1`）。
- 数据探针：在关键路径加入轻量级日志或可视化（如统计 `Atomics.wait` 次数），定位瓶颈。

## 可选：手动实例化 WASM 与共享内存

如需显式传入共享内存给 WASM，可参考加载器示例（`api/core/wasm-loader.ts:1`）。
