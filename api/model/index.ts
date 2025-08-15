import { SharedMemoryBase } from "../core/manager";

export class SharedModelBuffer extends SharedMemoryBase {
  private offsets = {
    positions: 0,
    normals: 0,
    uvs: 0,
    indices: 0,
  };

  constructor(vertexCount: number, indexCount: number) {
    const positionsSize = vertexCount * 3 * 4;
    const normalsSize = vertexCount * 3 * 4;
    const uvsSize = vertexCount * 2 * 4;
    const indicesSize = indexCount * 4;

    let totalSize = positionsSize + normalsSize + uvsSize + indicesSize;

    // 调用基类构造器
    super(totalSize);

    // 计算 offsets
    let offset = 0;
    this.offsets.positions = offset;
    offset += positionsSize;
    this.offsets.normals = offset;
    offset += normalsSize;
    this.offsets.uvs = offset;
    offset += uvsSize;
    this.offsets.indices = offset;
  }

  getPositions(): Float32Array {
    return this.getView(
      Float32Array,
      this.offsets.positions,
      (this.offsets.normals - this.offsets.positions) / 4
    );
  }

  getNormals(): Float32Array {
    return this.getView(
      Float32Array,
      this.offsets.normals,
      (this.offsets.uvs - this.offsets.normals) / 4
    );
  }

  getUVs(): Float32Array {
    return this.getView(
      Float32Array,
      this.offsets.uvs,
      (this.offsets.indices - this.offsets.uvs) / 4
    );
  }

  getIndices(): Uint32Array {
    return this.getView(
      Uint32Array,
      this.offsets.indices,
      (this.getSize() - this.offsets.indices) / 4
    );
  }
}
