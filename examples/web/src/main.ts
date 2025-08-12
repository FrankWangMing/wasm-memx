import { SharedBufferManager } from "../../../";

console.log(SharedBufferManager)
// // // 创建一个共享缓冲区管理器
const manager = new SharedBufferManager(1024); // 1024 bytes

console.log(await manager.test());


console.log("hello")
