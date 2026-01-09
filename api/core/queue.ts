type WaitAsyncResult = { async: boolean; value: Promise<"ok" | "not-equal" | "timed-out"> };

function atomicsWaitAsync(
  view: Int32Array,
  index: number,
  expected: number
): WaitAsyncResult | null {
  const anyAtomics = Atomics as unknown as {
    waitAsync?: (v: Int32Array, idx: number, val: number) => WaitAsyncResult;
  };
  return typeof anyAtomics.waitAsync === "function"
    ? anyAtomics.waitAsync(view, index, expected)
    : null;
}

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

/**
 * 简单 SPSC（单生产者/单消费者）共享队列：Int32 元素环形缓冲区
 *
 * - tryEnqueue/tryDequeue：无等待热路径
 * - enqueue/dequeue：满/空时等待（优先 Atomics.waitAsync，否则退化为轮询）
 */
export class SharedQueue {
  // Header indices (Int32)
  private static readonly I_MAGIC = 0;
  private static readonly I_VERSION = 1;
  private static readonly I_CAPACITY = 2;
  private static readonly I_HEAD = 3; // consumer index
  private static readonly I_TAIL = 4; // producer index
  private static readonly HEADER_I32_LEN = 8; // keep aligned / reserved

  private static readonly MAGIC = 0x51554555; // "QUEU"
  private static readonly VERSION = 1;

  private readonly buffer: SharedArrayBuffer;
  private readonly header: Int32Array;
  private readonly data: Int32Array;
  private readonly capacity: number;

  constructor(capacity: number, options?: { buffer?: SharedArrayBuffer }) {
    if (!Number.isInteger(capacity) || capacity <= 0) {
      throw new Error("capacity must be a positive integer");
    }

    if (options?.buffer) {
      this.buffer = options.buffer;
      this.header = new Int32Array(this.buffer, 0, SharedQueue.HEADER_I32_LEN);
      const cap = Atomics.load(this.header, SharedQueue.I_CAPACITY);
      if (Atomics.load(this.header, SharedQueue.I_MAGIC) !== SharedQueue.MAGIC) {
        throw new Error("Invalid SharedQueue buffer (bad magic)");
      }
      if (Atomics.load(this.header, SharedQueue.I_VERSION) !== SharedQueue.VERSION) {
        throw new Error("Invalid SharedQueue buffer (unsupported version)");
      }
      if (cap <= 0) throw new Error("Invalid SharedQueue buffer (bad capacity)");
      this.capacity = cap;
    } else {
      const byteLength =
        SharedQueue.HEADER_I32_LEN * 4 + // header
        capacity * 4; // data
      this.buffer = new SharedArrayBuffer(byteLength);
      this.header = new Int32Array(this.buffer, 0, SharedQueue.HEADER_I32_LEN);
      Atomics.store(this.header, SharedQueue.I_MAGIC, SharedQueue.MAGIC);
      Atomics.store(this.header, SharedQueue.I_VERSION, SharedQueue.VERSION);
      Atomics.store(this.header, SharedQueue.I_CAPACITY, capacity);
      Atomics.store(this.header, SharedQueue.I_HEAD, 0);
      Atomics.store(this.header, SharedQueue.I_TAIL, 0);
      this.capacity = capacity;
    }

    this.data = new Int32Array(
      this.buffer,
      SharedQueue.HEADER_I32_LEN * 4,
      this.capacity
    );
  }

  static from(buffer: SharedArrayBuffer): SharedQueue {
    // capacity is read from header; ctor's `capacity` argument is ignored in this path
    return new SharedQueue(1, { buffer });
  }

  getBuffer(): SharedArrayBuffer {
    return this.buffer;
  }

  /**
   * 当前元素数量（近似值；SPSC 下足够准确）
   */
  sizeApprox(): number {
    const head = Atomics.load(this.header, SharedQueue.I_HEAD);
    const tail = Atomics.load(this.header, SharedQueue.I_TAIL);
    const cap = this.capacity;
    return tail >= head ? tail - head : cap - (head - tail);
  }

  tryEnqueue(value: number): boolean {
    // For simplicity/stability, store as Int32
    const v = value | 0;
    const cap = this.capacity;
    const head = Atomics.load(this.header, SharedQueue.I_HEAD);
    const tail = Atomics.load(this.header, SharedQueue.I_TAIL);
    const nextTail = tail + 1 === cap ? 0 : tail + 1;
    if (nextTail === head) return false; // full

    this.data[tail] = v;
    // publish
    Atomics.store(this.header, SharedQueue.I_TAIL, nextTail);
    Atomics.notify(this.header, SharedQueue.I_TAIL, 1);
    return true;
  }

  tryDequeue(): number | undefined {
    const cap = this.capacity;
    const head = Atomics.load(this.header, SharedQueue.I_HEAD);
    const tail = Atomics.load(this.header, SharedQueue.I_TAIL);
    if (head === tail) return undefined; // empty

    const v = this.data[head];
    const nextHead = head + 1 === cap ? 0 : head + 1;
    Atomics.store(this.header, SharedQueue.I_HEAD, nextHead);
    Atomics.notify(this.header, SharedQueue.I_HEAD, 1);
    return v;
  }

  async enqueue(value: number): Promise<void> {
    // spin with waiting
    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (this.tryEnqueue(value)) return;
      const expected = Atomics.load(this.header, SharedQueue.I_HEAD);
      const res = atomicsWaitAsync(this.header, SharedQueue.I_HEAD, expected);
      if (res) {
        await res.value;
      } else {
        await delay(0);
      }
    }
  }

  async dequeue(): Promise<number> {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const v = this.tryDequeue();
      if (v !== undefined) return v;
      const expected = Atomics.load(this.header, SharedQueue.I_TAIL);
      const res = atomicsWaitAsync(this.header, SharedQueue.I_TAIL, expected);
      if (res) {
        await res.value;
      } else {
        await delay(0);
      }
    }
  }
}

