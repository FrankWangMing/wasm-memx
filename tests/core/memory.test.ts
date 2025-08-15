import { MemoryManager } from "../../api/core/memory";

describe("MemoryManager", () => {
  let manager: MemoryManager;

  beforeEach(() => {
    manager = new MemoryManager(1, 10);
  });

  it("should initialize with the correct parameters", () => {
    expect(manager).toBeDefined();
  });

  it("should return the correct memory", () => {
    const memory = manager.getMemory();
    expect(memory).toBeDefined();
  });
});