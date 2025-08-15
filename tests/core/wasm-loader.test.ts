import { WasmSharedMemory } from "../../api/core/wasm-loader";

describe("WasmSharedMemory", () => {
  let wasmMemory: WasmSharedMemory;

  beforeEach(() => {
    wasmMemory = new WasmSharedMemory("test.wasm", 1, 10);
  });

  it("should initialize with the correct parameters", () => {
    expect(wasmMemory).toBeDefined();
  });

  it("should load and initialize WASM", async () => {
    await wasmMemory.init();
    expect(wasmMemory.getBuffer()).toBeDefined();
  });

  it("should write and read data", async () => {
    await wasmMemory.init();
    await wasmMemory.write(0, 42);
    const value = await wasmMemory.read(0);
    expect(value).toBe(42);
  });

  it("should check if shared memory is supported", () => {
    expect(wasmMemory.isSupported()).toBeDefined();
  });
});