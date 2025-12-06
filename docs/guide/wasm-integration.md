# WASM 集成

## Rust 侧导出

Rust 使用 `wasm_bindgen` 暴露函数，例如向量与矩阵运算：`src/math/mod.rs:1`

```rust
#[wasm_bindgen]
pub fn vec3_add(a: &[f32], b: &[f32]) -> Vec<f32> { /* ... */ }

#[wasm_bindgen]
pub fn look_at_rh(eye: &[f32], target: &[f32], up: &[f32]) -> Vec<f32> { /* ... */ }
```

其它文件：投影矩阵 `src/math/projection.rs:1`、视图矩阵 `src/math/view.rs:1`。

## TypeScript 侧包装

在 TS 中通过自动生成的绑定调用 WASM 导出，`Math3D` 提供便捷 API：`api/math/math.ts:1`

```ts
import { Math3D } from 'wasm-memx';

const a = new Float32Array([1,2,3]);
const b = new Float32Array([4,5,6]);
const c = Math3D.vec3Add(a, b);

const eye = new Float32Array([0,0,5]);
const target = new Float32Array([0,0,0]);
const up = new Float32Array([0,1,0]);
const view = Math3D.mat4LookAt(eye, target, up);
```

## 与共享内存的结合

WASM 可直接读取由 JS 写入的 `SharedArrayBuffer` 视图。为确保安全与正确：

- 统一数据布局与类型（如 `Float32Array` vs `Uint32Array`）
- 保持字节对齐（4/8 字节），避免未对齐访问
- 在浏览器启用跨源隔离（见安装章节）

## 加载 WASM 与共享内存（可选）

如需手动实例化并传入共享内存，可参考：`api/core/wasm-loader.ts:1`。
