use std::alloc::{Layout, alloc, dealloc};

pub fn alloc_buffer(size: usize) -> *mut u8 {
    unsafe {
        let layout = Layout::from_size_align(size, 8).unwrap();
        let ptr = alloc(layout);
        ptr
    }
}

pub fn free_buffer(ptr: *mut u8, size: usize) {
    unsafe {
        let layout = Layout::from_size_align(size, 8).unwrap();
        dealloc(ptr, layout);
    }
}
