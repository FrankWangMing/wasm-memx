/**
 * 与 wasm32-unknown-unknown 目标交互的共享内存工具
 */
export class WasmSharedMemory {
    private instance: WebAssembly.Instance | null = null;
    private memory: WebAssembly.Memory;
    private readonly wasmUrl: string;

    // 定义 WASM 导出函数类型
    private exports: {
        write_u32: (offset: number, value: number) => void;
        read_u32: (offset: number) => number;
    } | null = null;

    constructor(wasmUrl: string, initialPages = 1, maxPages = 10) {
        // 创建共享内存
        this.memory = new WebAssembly.Memory({
            initial: initialPages,
            maximum: maxPages,
            shared: true
        });
        this.wasmUrl = wasmUrl;
    }

    /**
     * 确保在用户交互后执行（浏览器安全要求）
     */
    private async ensureUserGesture(): Promise<void> {
        if (typeof window === 'undefined') return;
        
        if (!window.navigator.userActivation?.hasBeenActive) {
            await new Promise(resolve => {
                const handler = () => {
                    document.removeEventListener('click', handler);
                    document.removeEventListener('keydown', handler);
                    resolve(null);
                };
                document.addEventListener('click', handler, { once: true });
                document.addEventListener('keydown', handler, { once: true });
            });
        }
    }

    /**
     * 加载并实例化 WASM 模块
     */
    async init(): Promise<void> {
        if (this.instance) return;

        try {
            // 确保用户已交互
            await this.ensureUserGesture();

            // 加载 WASM 二进制
            const response = await fetch(this.wasmUrl);
            if (!response.ok) {
                throw new Error(`加载 WASM 失败: ${response.statusText}`);
            }
            const bytes = await response.arrayBuffer();

            // 实例化 WASM，传入共享内存
            const result = await WebAssembly.instantiate(bytes, {
                env: {
                    memory: this.memory
                }
            });

            this.instance = result.instance;
            this.exports = this.instance.exports as typeof this.exports;

            if (!this.exports!.write_u32 || !this.exports!.read_u32) {
                throw new Error("WASM 模块缺少必要的导出函数");
            }

            console.log("WASM 初始化成功，共享内存就绪");
        } catch (error) {
            console.error("WASM 初始化失败:", error);
            throw error;
        }
    }

    /**
     * 写入 u32 数据到共享内存
     */
    async write(offset: number, value: number): Promise<void> {
        if (!this.exports) {
            await this.init();
        }
        if (!this.exports) {
            throw new Error("WASM 未初始化");
        }
        this.exports.write_u32(offset, value);
    }

    /**
     * 从共享内存读取 u32 数据
     */
    async read(offset: number): Promise<number> {
        if (!this.exports) {
            await this.init();
        }
        if (!this.exports) {
            throw new Error("WASM 未初始化");
        }
        return this.exports.read_u32(offset);
    }

    /**
     * 获取共享内存缓冲区（用于 Worker 等场景）
     */
    getBuffer(): ArrayBuffer {
        return this.memory.buffer;
    }

    /**
     * 检查共享内存是否可用
     */
    isSupported(): boolean {
        return typeof SharedArrayBuffer !== 'undefined';
    }
}
