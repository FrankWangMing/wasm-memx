import { SharedBufferManager } from "../../api/core/manager";

describe("SharedBufferManager", () => {
  let manager: SharedBufferManager;

  beforeEach(() => {
    manager = new SharedBufferManager(1024);
  });

  it("should initialize with the correct size", () => {
    expect(manager).toBeDefined();
  });

  it("should allocate memory", async () => {
    await manager.alloc();
    expect(manager.getBuffer()).toBeDefined();
  });

  it("should free memory", async () => {
    await manager.alloc();
    manager.free();
    expect(manager.getBuffer()).toBeNull();
  });
});