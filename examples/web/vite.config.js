import { viteStaticCopy } from "vite-plugin-static-copy";
/** @type {import('vite').UserConfig} */
export default {
  // config options

  server: {
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
  },

  plugins: [
    // viteStaticCopy({
    //   targets: [
    //     {
    //       src: "../../dist/rust_bg.wasm",
    //       dest: ".",
    //     },
    //   ],
    // }),
  ],
};

