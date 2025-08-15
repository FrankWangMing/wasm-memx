use js_sys::Float64Array;
use wasm_bindgen::prelude::*;

mod geometry; // 引入 geometry.rs
pub mod math;
mod memory;
pub use math::*;

#[wasm_bindgen]
pub fn create_shared_memory(initial_pages: u32, maximum_pages: u32) -> JsValue {
    // 创建 SharedArrayBuffer-backed memory
    let memory = memory::create_shared_memory(initial_pages, maximum_pages);
    JsValue::from(memory)
}

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);

    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(&format!("Hello, {}!", name));
}

#[wasm_bindgen]
pub fn allocate_space(count: usize) -> *mut f64 {
    let mut v: Vec<f64> = Vec::with_capacity(count);
    let ptr = v.as_mut_ptr();
    std::mem::forget(v); // prevents dropping v when this function exits
    ptr
}

#[wasm_bindgen]
pub fn get_array(ptr: *mut f64, count: usize) -> Float64Array {
    unsafe { Float64Array::view(std::slice::from_raw_parts(ptr, count)) }
}

#[wasm_bindgen]
pub fn sum(ptr: *mut f64, count: usize) -> f64 {
    let data = unsafe { std::slice::from_raw_parts(ptr, count) };
    data.iter().sum()
}

#[wasm_bindgen(start)]
pub fn run() {
}



