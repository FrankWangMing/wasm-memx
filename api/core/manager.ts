import * as wasm from "../../Cargo.toml";

// 更通用的基类
export class SharedMemoryBase {
  protected ptr: number | null = null;
  protected size: number; // 字节大小
  protected memory: WebAssembly.Memory;

  constructor(size: number) {
    this.size = size;
    const pageSize = 64 * 1024;
    const pages = Math.ceil(size / pageSize);

    // wasm.create_shared_memory 需要你自己实现或替换
    this.memory = wasm.create_shared_memory(pages, pages);
  }

  getBuffer(): SharedArrayBuffer {
    return this.memory.buffer as SharedArrayBuffer;
  }

  getView<T extends ArrayBufferView = Uint8Array>(
    ctor: { new (buf: ArrayBuffer, ...args: any[]): T },
    offset = 0,
    length?: number
  ): T {
    return new ctor(this.getBuffer(), offset, length);
  }

  setPointer(ptr: number) {
    this.ptr = ptr;
  }

  getPointer(): number | null {
    return this.ptr;
  }

  getSize(): number {
    return this.size;
  }
}

// async test() {
//   console.log("wasm");
//   // init() 是由插件自动生成的 wasm 初始化方法
//   console.log("wasm", wasm);

//   // 导入wasm-bindgen生成的绑定
//   const memory = wasm.create_shared_memory(this.size, this.size);
//   const buffer = memory.buffer; // SharedArrayBuffer
//   const view = new Uint8Array(buffer);
//   console.log(buffer == view.buffer);
//   console.log(view[0]); // JS 读
//   view[0] = 42; // JS 写
//   console.log(view[0]); // JS 读
// }
