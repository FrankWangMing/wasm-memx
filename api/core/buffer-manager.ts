export type TypedArrayCtor<T extends ArrayBufferView> = {
  new(buffer: ArrayBufferLike, byteOffset?: number, length?: number): T;
  readonly BYTES_PER_ELEMENT: number;
};

/**
 * 纯 TS 的 SharedArrayBuffer 管理器（不依赖 WASM 创建内存）。
 *
 * 设计目标：
 * - Node / Browser / Worker 都可同步创建与使用
 * - 支持从已存在的 SharedArrayBuffer 复原（Worker 场景）
 * - 提供一个最小可用的 bump allocator（用于初始化布局）
 */
export class SharedBufferManager {
  private readonly buffer: SharedArrayBuffer;
  private offset = 0;

  constructor(byteLength: number);
  constructor(buffer: SharedArrayBuffer);
  constructor(arg: number | SharedArrayBuffer) {
    this.buffer = typeof arg === "number" ? new SharedArrayBuffer(arg) : arg;
  }

  static from(buffer: SharedArrayBuffer): SharedBufferManager {
    return new SharedBufferManager(buffer);
  }

  getBuffer(): SharedArrayBuffer {
    return this.buffer;
  }

  getView<T extends ArrayBufferView>(
    ctor: { new(buffer: ArrayBufferLike, byteOffset?: number, length?: number): T },
    byteOffset = 0,
    length?: number
  ): T {
    return new ctor(this.buffer, byteOffset, length);
  }

  /**
   * 分配一段字节空间，返回 byteOffset。
   * 仅用于“初始化期布局/创建视图”，不是通用 free-list 分配器。
   */
  allocBytes(byteLength: number, align = 4): number {
    const aligned = Math.ceil(this.offset / align) * align;
    const next = aligned + byteLength;
    if (next > this.buffer.byteLength) {
      throw new Error("Out of shared buffer memory");
    }
    this.offset = next;
    return aligned;
  }

  /**
   * 在共享缓冲区里分配一个 TypedArray，并返回视图与其 offset。
   */
  allocView<T extends ArrayBufferView>(
    ctor: TypedArrayCtor<T>,
    length: number,
    align = ctor.BYTES_PER_ELEMENT
  ): { offset: number; view: T } {
    const byteLength = length * ctor.BYTES_PER_ELEMENT;
    const offset = this.allocBytes(byteLength, align);
    const view = new ctor(this.buffer, offset, length);
    return { offset, view };
  }

  reset(): void {
    this.offset = 0;
  }
}

