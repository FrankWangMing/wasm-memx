import { SharedBufferManager, SharedQueue } from "../dist/bundle.esm.js";

// 创建共享内存管理器
const manager = new SharedBufferManager(1024);
console.log("Buffer size:", manager.getBuffer().byteLength);

// 创建队列
const queue = new SharedQueue(4);
queue.enqueue(10);
queue.enqueue(20);

console.log("Dequeued:", queue.dequeue()); // 10
console.log("Dequeued:", queue.dequeue()); // 20
