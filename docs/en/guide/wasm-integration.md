# WASM Integration

## Rust exports

Rust uses `wasm_bindgen` to export functions (e.g. vector/matrix math): `src/math/mod.rs:1`.

```rust
#[wasm_bindgen]
pub fn vec3_add(a: &[f32], b: &[f32]) -> Vec<f32> { /* ... */ }
```

## TypeScript wrapper

TypeScript calls the generated bindings; `Math3D` provides a convenient API: `api/math/math.ts:1`.

```ts
import { Math3D } from "wasm-memx";

const a = new Float32Array([1, 2, 3]);
const b = new Float32Array([4, 5, 6]);
console.log(Math3D.vec3Add(a, b));
```

## Using shared memory with WASM

To make it safe and correct:

- Keep view types consistent (e.g. `Float32Array` vs `Uint32Array`)
- Keep alignment (4/8 bytes)
- Enable COOP/COEP in browsers

## Optional: manual WASM instantiation

If you need to instantiate WASM manually and pass shared memory, see `api/core/wasm-loader.ts:1`.

