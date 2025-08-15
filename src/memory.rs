use js_sys::{Object, WebAssembly};
use wasm_bindgen::prelude::*;

pub fn create_shared_memory(initial_pages: u32, maximum_pages: u32) -> WebAssembly::Memory {
    let mem_desc = Object::new();
    js_sys::Reflect::set(&mem_desc, &"initial".into(), &JsValue::from(initial_pages)).unwrap(); // 页数（64KB 一页）
    js_sys::Reflect::set(&mem_desc, &"maximum".into(), &JsValue::from(maximum_pages)).unwrap();
    js_sys::Reflect::set(&mem_desc, &"shared".into(), &JsValue::TRUE).unwrap();
    let memory = WebAssembly::Memory::new(&mem_desc).unwrap();
    memory
}
