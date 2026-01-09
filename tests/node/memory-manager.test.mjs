import test from "node:test";
import assert from "node:assert/strict";

test("MemoryManager alloc returns increasing offsets within region", async () => {
  const { MemoryManager } = await import("../../dist/index.js");

  const total = 64 * 1024;
  const layout = {
    vertices: 16 * 1024,
    indices: 16 * 1024,
    uvs: 16 * 1024,
    normals: 16 * 1024,
  };
  const mm = new MemoryManager(total, layout);

  const a = mm.alloc("vertices", 4, 4);
  const b = mm.alloc("vertices", 4, 4);
  assert.ok(b > a);

  const sab = mm.getBuffer();
  assert.ok(sab);
  assert.ok(typeof sab.byteLength === "number");
});

