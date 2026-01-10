/**
 * Queue (FIFO – First In First Out)
 *
 * Implementation: Circular Buffer
 *
 * Time Complexity:
 * enqueue → O(1)
 * dequeue → O(1)
 * peek    → O(1)
 * size    → O(1)
 * isEmpty → O(1)
 * clear   → O(1)
 *
 * Space Complexity:
 * O(n)
 */
export class Queue<T> implements Iterable<T> {
  private buffer: (T | undefined)[];
  private head = 0;
  private tail = 0;
  private length = 0;

  constructor(private readonly capacity: number = 16) {
    if (capacity <= 0) {
      throw new Error('Queue capacity must be greater than 0');
    }
    this.buffer = new Array(capacity);
  }

  /**
   * Adds an element to the end of the queue.
   * Throws error if queue is full.
   */
  enqueue(value: T): void {
    if (this.length === this.capacity) {
      throw new Error('Queue overflow');
    }

    this.buffer[this.tail] = value;
    this.tail = (this.tail + 1) % this.capacity;
    this.length++;
  }

  /**
   * Removes and returns the front element of the queue.
   * Returns undefined if the queue is empty.
   */
  dequeue(): T | undefined {
    if (this.length === 0) return undefined;

    const value = this.buffer[this.head];
    this.buffer[this.head] = undefined;
    this.head = (this.head + 1) % this.capacity;
    this.length--;

    return value;
  }

  /**
   * Returns the front element without removing it.
   */
  peek(): T | undefined {
    return this.length === 0 ? undefined : this.buffer[this.head];
  }

  /**
   * Returns the number of elements in the queue.
   */
  size(): number {
    return this.length;
  }

  /**
   * Checks whether the queue is empty.
   */
  isEmpty(): boolean {
    return this.length === 0;
  }

  /**
   * Clears the queue.
   */
  clear(): void {
    this.buffer = new Array(this.capacity);
    this.head = 0;
    this.tail = 0;
    this.length = 0;
  }

  /**
   * Allows iteration from front to back using for...of.
   */
  *[Symbol.iterator](): IterableIterator<T> {
    for (let i = 0; i < this.length; i++) {
      yield this.buffer[(this.head + i) % this.capacity] as T;
    }
  }
}
