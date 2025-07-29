export class SharedBufferManager {
    private buffer: SharedArrayBuffer;

    constructor(size: number) {
        this.buffer = new SharedArrayBuffer(size);
    }

    getBuffer() {
        return this.buffer;
    }

    resize(newSize: number) {
        const oldBytes = new Uint8Array(this.buffer);
        const newBuffer = new SharedArrayBuffer(newSize);
        const newBytes = new Uint8Array(newBuffer);
        newBytes.set(oldBytes.slice(0, Math.min(oldBytes.length, newBytes.length)));
        this.buffer = newBuffer;
    }
}
