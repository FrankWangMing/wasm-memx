import * as wasm from "../../Cargo.toml";
export class MemoryManager {
  private memory: WebAssembly.Memory;
  private pageSize = 64 * 1024;

  // 每个区的起点与当前 offset
  private regions = {
    vertices: { start: 0, offset: 0, size: 0 },
    indices: { start: 0, offset: 0, size: 0 },
    uvs: { start: 0, offset: 0, size: 0 },
    normals: { start: 0, offset: 0, size: 0 },
  };

  constructor(
    totalSize: number,
    layout: { vertices: number; indices: number; uvs: number; normals: number }
  ) {
    const pages = Math.ceil(totalSize / this.pageSize);
    this.memory = wasm.create_shared_memory(pages, pages);

    // 分区分配（单位字节）
    let current = 0;
    for (const key in layout) {
      const size = layout[key as keyof typeof layout];
      this.regions[key as keyof typeof layout] = {
        start: current,
        offset: 0,
        size,
      };
      current += size;
    }
  }

  /** 分配一段内存（返回偏移） */
  alloc(region: keyof typeof this.regions, size: number, align = 4): number {
    const r = this.regions[region];
    let alignedOffset = Math.ceil(r.offset / align) * align;
    if (alignedOffset + size > r.size)
      throw new Error(`Out of ${region} memory`);
    r.offset = alignedOffset + size;
    return r.start + alignedOffset;
  }

  getBuffer(): SharedArrayBuffer {
    return this.memory.buffer as SharedArrayBuffer;
  }

  /** 重置所有分区（场景切换时调用） */
  reset() {
    for (const key in this.regions) {
      this.regions[key as keyof typeof this.regions].offset = 0;
    }
  }
}
