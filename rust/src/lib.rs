#![no_std]
#![no_main]

// 导入核心库（基础类型支持）
extern crate core;

// 声明共享内存（由 JavaScript 提供）
#[link(wasm_import_module = "env")]
extern "C" {
    static memory: u8; // 仅作为内存起始地址标记
}

// 写入 u32 到共享内存（offset 为 u32 索引，非字节偏移）
#[no_mangle]
pub extern "C" fn write_u32(offset: usize, value: u32) {
    // 转换为 u32 指针
    let base_ptr = unsafe { &memory as *const u8 as *mut u32 };
    
    // 简单边界检查（假设最大 1024 个 u32）
    if offset >= 1024 {
        return;
    }
    
    // 写入值
    unsafe {
        *base_ptr.add(offset) = value;
    }
}

// 从共享内存读取 u32
#[no_mangle]
pub extern "C" fn read_u32(offset: usize) -> u32 {
    // 转换为 u32 指针
    let base_ptr = unsafe { &memory as *const u8 as *const u32 };
    
    // 简单边界检查
    if offset >= 1024 {
        return 0;
    }
    
    // 读取值
    unsafe {
        *base_ptr.add(offset)
    }
}

// 处理 panic（避免编译错误）
#[panic_handler]
fn panic(_info: &core::panic::PanicInfo) -> ! {
    loop {}
}
    