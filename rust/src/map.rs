use std::cell::RefCell;
use std::collections::HashMap;
use wasm_bindgen::prelude::*;

thread_local! {
    static MAP_STORE: RefCell<HashMap<String, i32>> = RefCell::new(HashMap::new());
}

#[wasm_bindgen]
pub fn new_map(_capacity: usize) -> i32 {
    1
}

#[wasm_bindgen]
pub fn map_set(_ptr: i32, key: String, value: i32) {
    MAP_STORE.with(|map| map.borrow_mut().insert(key, value));
}

#[wasm_bindgen]
pub fn map_get(_ptr: i32, key: String) -> i32 {
    MAP_STORE.with(|map| map.borrow().get(&key).cloned().unwrap_or(-1))
}

#[wasm_bindgen]
pub fn map_delete(_ptr: i32, key: String) -> i32 {
    let removed = MAP_STORE.with(|map| map.borrow_mut().remove(&key));
    if removed.is_some() {
        1
    } else {
        0
    }
}

#[wasm_bindgen]
pub fn map_has(_ptr: i32, key: String) -> i32 {
    MAP_STORE.with(|map| map.borrow().contains_key(&key) as i32)
}

#[wasm_bindgen]
pub fn map_clear(_ptr: i32) {
    MAP_STORE.with(|map| map.borrow_mut().clear());
}

#[wasm_bindgen]
pub fn free_map(_ptr: i32) {}
