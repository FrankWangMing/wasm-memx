# 内存模型与布局

## 页与大小

`SharedArrayBuffer` 底层以页为单位分配（64KB），本库按字节大小换算为页数进行申请：`api/core/manager.ts:1`。

## 分区设计（MemoryManager）

通过 `MemoryManager` 将一个 SAB 划分为多个分区并记录起点、偏移、大小：`api/core/memory.ts:1`

- `alloc(region, size, align)` 在指定分区按对齐规则分配一段空间并返回偏移
- `getBuffer()` 返回整个共享缓冲区用于跨线程传递
- `reset()` 将所有分区偏移恢复为 0，便于重用

示例分区：`vertices / indices / uvs / normals`

## 复合缓冲区（SharedModelBuffer）

`SharedModelBuffer` 在构造时根据顶点/索引数量计算每段字节大小，并设置各段的起点偏移：`api/model/index.ts:1`

- `getPositions()` 返回 `Float32Array`
- `getNormals()` 返回 `Float32Array`
- `getUVs()` 返回 `Float32Array`
- `getIndices()` 返回 `Uint32Array`

这样在渲染或几何处理流程中可以直接对共享内存进行读写，而无需复制到新的数组。
