# FAQ

## `SharedArrayBuffer` is not available in the browser

You must enable cross-origin isolation (COOP/COEP). In dev, add headers on your server (see `examples/web/vite.config.js:1`).

## Does Node.js need COOP/COEP?

No. Node.js supports `SharedArrayBuffer` and `Worker` natively. Recommended Node >= 18.

## Can I use `Atomics.wait` on the browser main thread?

Not recommended. Prefer using it in Workers, or use non-blocking designs.

## Can `SharedArrayBuffer` grow dynamically?

No. Allocate enough pages up front and reuse memory via layouts (e.g. `MemoryManager`).

