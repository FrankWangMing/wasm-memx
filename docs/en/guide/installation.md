# Installation & Requirements

## Install

```bash
pnpm add wasm-memx
# or
npm install wasm-memx
# or
yarn add wasm-memx
```

## Browser: Cross-Origin Isolation (COOP/COEP)

`SharedArrayBuffer` requires cross-origin isolation in browsers. In development, you can add headers on your dev server:

```js
// vite.config.js (dev)
export default {
  server: {
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
  },
};
```

See example: `examples/web/vite.config.js:1`.

## Node.js

No COOP/COEP is needed in Node.js. Recommended Node version: >= 18.

## Check support

```ts
const supported = typeof SharedArrayBuffer !== "undefined";
console.log("SharedArrayBuffer supported:", supported);
```

