# 安装与环境要求

## 安装包

```bash
pnpm add wasm-memx
# 或
npm install wasm-memx
yarn add wasm-memx
```

## 浏览器跨源隔离（COOP/COEP）

`SharedArrayBuffer` 在浏览器中需要启用跨源隔离，否则将不可用。开发环境可在本地服务器添加响应头：

```js
// vite.config.js（开发环境）
export default {
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
}
```

参考示例：`examples/web/vite.config.js:1`。

生产环境需通过反向代理或应用服务器配置相同响应头。

## Node.js 环境

在 Node.js 中无需跨源隔离，`SharedArrayBuffer` 与 `Worker` 可直接使用。建议 Node 版本 ≥ 18。

## 验证支持情况

```ts
const supported = typeof SharedArrayBuffer !== 'undefined';
console.log('SharedArrayBuffer supported:', supported);
```

## 类型支持

项目内置 TypeScript 声明，打包类型位于 `dist/types`。如需在应用中直接消费 TS 类型，确保构建工具正确解析 `types` 字段。
