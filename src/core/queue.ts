export class SharedQueue {
    private buffer: SharedArrayBuffer;
    private view: Int32Array;

    constructor(size: number) {
        this.buffer = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT * (size + 2));
        this.view = new Int32Array(this.buffer);
    }

    enqueue(value: number) {
        const head = Atomics.load(this.view, 0);
        const tail = Atomics.load(this.view, 1);

        if ((tail + 1) % this.capacity() === head) {
            throw new Error("Queue is full");
        }

        this.view[2 + tail] = value;
        Atomics.store(this.view, 1, (tail + 1) % this.capacity());
    }

    dequeue(): number | null {
        const head = Atomics.load(this.view, 0);
        const tail = Atomics.load(this.view, 1);

        if (head === tail) return null;

        const value = this.view[2 + head];
        Atomics.store(this.view, 0, (head + 1) % this.capacity());
        return value;
    }

    capacity() {
        return this.view.length - 2;
    }

    getBuffer() {
        return this.buffer;
    }
}
