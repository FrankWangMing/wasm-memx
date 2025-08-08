import { SharedQueue, SharedBufferManager } from "wasm-memx";

const manager = new SharedBufferManager(1024);
await manager.alloc();
console.log("Buffer size:", manager.getBuffer().byteLength);

const queue = new SharedQueue(4);
await queue.enqueue(10);
await queue.enqueue(20);

console.log(await queue.dequeue()); // 10
console.log(await queue.dequeue()); // 20

manager.free();
