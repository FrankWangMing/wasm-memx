use js_sys::Float64Array;
use js_sys::{Object, WebAssembly};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn create_shared_memory() -> JsValue {
    // 创建 SharedArrayBuffer-backed memory
    let mem_desc = Object::new();
    js_sys::Reflect::set(&mem_desc, &"initial".into(), &JsValue::from(2)).unwrap(); // 页数（64KB 一页）
    js_sys::Reflect::set(&mem_desc, &"maximum".into(), &JsValue::from(2)).unwrap();
    js_sys::Reflect::set(&mem_desc, &"shared".into(), &JsValue::TRUE).unwrap();

    let memory = WebAssembly::Memory::new(&mem_desc).unwrap();
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
    demo();
}

fn demo() {
    let name = "World";
    log(&format!("Hello, {}!", name));

    // This is supposed to be an improvement, but it is worse!
    use web_sys::console;
    console::log_1(&"Hello, ".into());
}
