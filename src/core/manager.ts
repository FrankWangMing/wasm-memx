import * as wasm from "../../Cargo.toml";

export class SharedBufferManager {
  private ptr: number | null = null;
  private size = 0;

  constructor(size: number) {
    this.size = size;
  }
  async test() {
    console.log("wasm");
    // init() 是由插件自动生成的 wasm 初始化方法
    console.log("wasm", wasm);

    // await init();
    // // 导入wasm-bindgen生成的绑定
    // const memory = create_shared_memory();
    // const buffer = memory.buffer; // SharedArrayBuffer
    // const view = new Uint8Array(buffer);
    // console.log(buffer == view.buffer);
    // console.log(view[0]); // JS 读
    // view[0] = 42; // JS 写
    // console.log(view[0]); // JS 读
  }
}
