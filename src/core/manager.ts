import { WasmSharedMemory } from "./wasm-loader";

export class SharedBufferManager {
  private ptr: number | null = null;
  private size = 0;

  constructor(size: number) {
    this.size = size;
  }
  async test() {
    // 使用示例
    async function demo() {
      // 检查浏览器支持
      if (typeof SharedArrayBuffer === "undefined") {
        console.error("当前环境不支持 SharedArrayBuffer");
        return;
      }

      // 创建实例
      const wasm = new WasmSharedMemory(
        "/wasm/rust.wasm"
      );
      console.log(wasm)
      try {
        // 写入数据
        await wasm.write(0, 12345);

        // 读取数据
        const value = await wasm.read(0);
        console.log(`从 WASM 读取的值: ${value}`);

        // 直接通过 JS 访问共享内存
        const arr = new Uint32Array(wasm.getBuffer());
        console.log(`JS 直接读取的值: ${arr[0]}`);
      } catch (error) {
        console.error("操作失败:", error);
      }
    }
    demo();
  }
}
