import { SharedQueue } from "wasm-memx";

const queue = new SharedQueue(100); // capacity 100

queue.enqueue(1);
queue.enqueue(2);

console.log(queue.dequeue()); // 1
console.log(queue.dequeue()); // 2
