# 常见问题（FAQ）

## SharedArrayBuffer 在浏览器不可用？

- 需启用跨源隔离（COOP/COEP）。开发环境在本地服务添加响应头：

```js
// examples/web/vite.config.js
export default {
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
}
```

- 生产环境通过反向代理或应用服务器配置相同响应头。详见 `docs/guide/installation.md`。

## Node.js 是否需要跨源隔离？

- 不需要。Node.js 原生支持 `SharedArrayBuffer` 与 `Worker`，推荐 Node ≥ 18。

## 在主线程可以使用 Atomics.wait 吗？

- 不建议在浏览器主线程使用阻塞等待，应该在 Worker 内使用 `Atomics.wait/notify`。
- 使用原子视图类型（如 `Int32Array`），并设计非阻塞方案或回压策略。

## 选择哪种 TypedArray 类型？

- 与数据语义及 WASM 侧类型一致：
  - 浮点：`Float32Array`（Rust `f32`）
  - 无符号索引：`Uint32Array`（Rust `u32`）
  - 原子同步：`Int32Array`（Atomics 支持）

## 如何在不复制数据的情况下与 WASM 协作？

- 使用共享内存承载数据，并通过 TS 包装调用 WASM 函数：
  - TS 侧：`api/math/math.ts:1` 暴露 `Math3D` 方法
  - Rust 侧：`src/math/mod.rs:1` 暴露 `#[wasm_bindgen]` 函数
- 确保字节对齐与视图类型一致，避免未对齐访问。

## 共享内存能否动态扩容？

- `SharedArrayBuffer` 大小固定，无法扩容。建议：
  - 评估峰值，按页（64KB）计算总大小一次性分配。
  - 使用分区管理与复用，参考 `api/core/memory.ts:1`。

## 如何验证两个视图是否共享同一缓冲区？

```ts
const same = viewA.buffer === viewB.buffer
```

- 若返回 `true`，说明零拷贝共享；否则发生了复制或重新分配。

## 如何将 SAB 传递给 Worker？

- Node Worker：通过 `workerData` 传入：

```ts
import { Worker } from 'node:worker_threads'
const sab = new SharedArrayBuffer(1024)
new Worker('./worker.js', { workerData: sab })
```

- Web Worker：在跨源隔离下可直接 `postMessage(sab)`。

## 为什么要使用分区化内存管理？

- 提升局部性与复用效率，避免碎片：
  - 使用 `MemoryManager` 将 SAB 划分为功能分区并按对齐分配（`api/core/memory.ts:1`）。

## 与渲染/几何结合的推荐方式？

- 使用 `SharedModelBuffer` 组织 `positions/normals/uvs/indices`（`api/model/index.ts:1`），在渲染管线中直接读写视图。

## 常见性能问题与解决建议？

- 频繁创建视图导致 GC 压力：重用长寿命视图。
- 小粒度消息过多：批处理并减少 `postMessage` 次数。
- 类型不一致：统一以 `Float32Array/Uint32Array` 与 WASM 对齐。
- 浏览器不隔离：开启 COOP/COEP，否则 SAB 不可用。
