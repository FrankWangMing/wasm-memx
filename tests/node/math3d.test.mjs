import test from "node:test";
import assert from "node:assert/strict";

test("Math3D exports are callable (vec3Scale, mat4Identity)", async () => {
  const { Math3D } = await import("../../dist/index.js");

  const v = new Float32Array([1, 2, 3]);
  const scaled = Math3D.vec3Scale(v, 2);
  assert.ok(scaled instanceof Float32Array);
  assert.deepEqual(Array.from(scaled), [2, 4, 6]);

  const m = Math3D.mat4Identity();
  assert.ok(m instanceof Float32Array);
  assert.equal(m.length, 16);
  assert.equal(m[0], 1);
  assert.equal(m[5], 1);
  assert.equal(m[10], 1);
  assert.equal(m[15], 1);
});

