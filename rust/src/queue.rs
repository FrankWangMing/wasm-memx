pub struct Queue {
    data: Vec<i32>,
    head: usize,
    tail: usize,
    size: usize,
    capacity: usize,
}

impl Queue {
    pub fn new(capacity: usize) -> Self {
        Self {
            data: vec![0; capacity],
            head: 0,
            tail: 0,
            size: 0,
            capacity,
        }
    }

    pub fn enqueue(&mut self, value: i32) -> bool {
        if self.size == self.capacity {
            return false;
        }
        self.data[self.tail] = value;
        self.tail = (self.tail + 1) % self.capacity;
        self.size += 1;
        true
    }

    pub fn dequeue(&mut self) -> Option<i32> {
        if self.size == 0 {
            return None;
        }
        let value = self.data[self.head];
        self.head = (self.head + 1) % self.capacity;
        self.size -= 1;
        Some(value)
    }
}
