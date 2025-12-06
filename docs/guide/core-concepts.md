# 核心概念

## 零拷贝（Zero-Copy）

将大量数据（如顶点、像素、矩阵）存储在 `SharedArrayBuffer` 中，通过 `TypedArray` 视图在不同执行环境（主线程、Web Worker、Node Worker、WASM）直接读写，同一底层缓冲区，无需复制。

## SharedMemoryBase 抽象

`SharedMemoryBase` 封装了共享内存的申请与视图创建：`api/core/manager.ts:1`

- 统一管理字节大小与页数
- 提供 `getBuffer()` 取得 `SharedArrayBuffer`
- 提供 `getView(ctor, offset, length)` 快速创建各类视图（如 `Float32Array`）

## MemoryManager 分区布局

`MemoryManager` 支持将单个共享内存划分为多个逻辑分区（如 `vertices/indices/uvs/normals`），并在分区上进行对齐分配：`api/core/memory.ts:1`

- 避免碎片，提升数据局部性
- 可在场景切换时 `reset()` 快速回收复用

## 复合缓冲区

`SharedModelBuffer` 展示了如何在一个 SAB 中组织多段模型数据，并提供类型视图访问：`api/model/index.ts:1`

## 与 WASM 的协作

Rust 侧通过 `wasm_bindgen` 暴露函数，例如向量/矩阵运算，TS 侧通过 `Math3D` 进行调用：`src/math/mod.rs:1`，`api/math/math.ts:1`

这种模式将繁重的数值计算放在 WASM 中执行，同时保持与共享内存的零拷贝交互。
