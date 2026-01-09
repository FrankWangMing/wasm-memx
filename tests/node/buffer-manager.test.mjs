import test from "node:test";
import assert from "node:assert/strict";

test("SharedBufferManager allocView returns typed arrays backed by same SAB", async () => {
  const { SharedBufferManager } = await import("../../dist/index.js");

  const mgr = new SharedBufferManager(64);
  const a = mgr.allocView(Int32Array, 4);
  const b = mgr.allocView(Float32Array, 4);

  assert.ok(a.view instanceof Int32Array);
  assert.ok(b.view instanceof Float32Array);
  assert.ok(a.view.buffer === mgr.getBuffer());
  assert.ok(b.view.buffer === mgr.getBuffer());

  a.view[0] = 42;
  const a2 = new Int32Array(mgr.getBuffer(), a.offset, 4);
  assert.equal(a2[0], 42);
});

test("SharedBufferManager.from(buffer) reuses existing SAB", async () => {
  const { SharedBufferManager } = await import("../../dist/index.js");

  const mgr1 = new SharedBufferManager(32);
  const sab = mgr1.getBuffer();
  const mgr2 = SharedBufferManager.from(sab);

  assert.ok(mgr2.getBuffer() === sab);
});

