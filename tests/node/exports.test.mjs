import test from "node:test";
import assert from "node:assert/strict";

test("dist exports expected symbols", async () => {
  const mod = await import("../../dist/index.js");

  assert.equal(typeof mod.SharedMemoryBase, "function");
  assert.equal(typeof mod.MemoryManager, "function");
  assert.equal(typeof mod.SharedBufferManager, "function");
  assert.equal(typeof mod.SharedQueue, "function");
  assert.equal(typeof mod.SharedModelBuffer, "function");
  assert.equal(typeof mod.Math3D, "function");
  assert.equal(typeof mod.WasmSharedMemory, "function");
});

