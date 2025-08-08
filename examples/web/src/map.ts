import { SharedMap } from "wasm-memx";

const map = new SharedMap();

map.set("foo", 123);
console.log(map.get("foo")); // 123

map.delete("foo");