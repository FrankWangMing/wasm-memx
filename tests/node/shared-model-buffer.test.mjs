import test from "node:test";
import assert from "node:assert/strict";

test("SharedModelBuffer exposes typed views sharing the same underlying SAB", async () => {
  const { SharedModelBuffer } = await import("../../dist/index.js");

  const buf = new SharedModelBuffer(3, 3);
  const positions = buf.getPositions();
  const indices = buf.getIndices();

  assert.ok(positions instanceof Float32Array);
  assert.ok(indices instanceof Uint32Array);

  // Both should reference the same underlying shared buffer
  assert.ok(positions.buffer === indices.buffer);
});

