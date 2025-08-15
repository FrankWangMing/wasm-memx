import { defineConfig } from "rollup";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import wasm from "@rollup/plugin-wasm";
import replace from "@rollup/plugin-replace";
import { babel } from "@rollup/plugin-babel";
import copy from "rollup-plugin-copy"; // 作为保底方案，确保 Wasm 被复制
import rust from "@wasm-tool/rollup-plugin-rust";
import serve from "rollup-plugin-serve";
// 明确 Wasm 源文件路径（根据你的实际路径修改）
const WASM_SOURCE = "rust/target/wasm32-unknown-unknown/release/rust.wasm"; // 假设源文件在这里
const WASM_OUTPUT_DIR = "dist";

export default defineConfig({
  input: "api/index.ts",
  output: {
    dir: "dist",
    format: "es",
  },
  plugins: [
    rust({
      inlineWasm: true,
      extraArgs: {
        cargo: [],

        wasmBindgen: [],

        // TODO figure out better optimization options ?
        wasmOpt: [ ],
      },
    }),
    // 2. Wasm 插件：处理代码中的导入
    wasm({
      publicPath: "/", // 代码中引用的路径（对应 dist/wasm）
      maxFileSize: 0, // 强制不内联，始终生成单独文件
      fileName: "[name].wasm", // 保持原文件名，方便匹配
    }),

    // 3. 确保代码能解析到 Wasm 模块
    resolve({
      browser: true,
      extensions: [".ts", ".js", ".wasm"], // 必须包含 .wasm
    }),

    // 4. 其他基础插件
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.json",
      declarationDir: "dist/types",
    }),
    babel({
      babelHelpers: "bundled",
      presets: ["@babel/preset-env"],
    }),
    // serve('dist')
  ],
});
