import test from "node:test";
import assert from "node:assert/strict";

test("SharedQueue enqueue/dequeue works in order", async () => {
  const { SharedQueue } = await import("../../dist/index.js");

  const q = new SharedQueue(4);
  await q.enqueue(10);
  await q.enqueue(20);

  assert.equal(await q.dequeue(), 10);
  assert.equal(await q.dequeue(), 20);
});

test("SharedQueue from(buffer) shares state", async () => {
  const { SharedQueue } = await import("../../dist/index.js");

  const q1 = new SharedQueue(4);
  const sab = q1.getBuffer();
  const q2 = SharedQueue.from(sab);

  assert.equal(q1.tryEnqueue(123), true);
  assert.equal(q2.tryDequeue(), 123);
});

test("SharedQueue reports full/empty via try APIs", async () => {
  const { SharedQueue } = await import("../../dist/index.js");

  const q = new SharedQueue(2); // effective capacity is 1 in ring-buffer style
  assert.equal(q.tryDequeue(), undefined);
  assert.equal(q.tryEnqueue(1), true);
  assert.equal(q.tryEnqueue(2), false); // full
  assert.equal(q.tryDequeue(), 1);
  assert.equal(q.tryDequeue(), undefined);
});

