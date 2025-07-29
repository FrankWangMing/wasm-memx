import { parentPort, workerData } from "node:worker_threads";
import { SharedQueue } from "../../dist/bundle.esm.js";

const queue = new SharedQueue(8);
queue.buffer = workerData;

const val1 = queue.dequeue();
const val2 = queue.dequeue();

parentPort?.postMessage({ val1, val2 });