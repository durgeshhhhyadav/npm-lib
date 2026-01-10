/**
 * Deque (Double-Ended Queue)
 * ---------------------------------------
 * - O(1) push/pop from both ends
 * - Circular buffer based implementation
 * - Optional fixed capacity
 * - TypeScript-first, JS-compatible
 */

export interface DequeOptions {
  capacity?: number; // optional max size
}

export class Deque<T> implements Iterable<T> {
  private buffer: (T | undefined)[];
  private head = 0;
  private tail = 0;
  private length = 0;
  private readonly capacity?: number;

  constructor(options: DequeOptions = {}) {
    this.capacity = options.capacity;
    const initialSize = this.capacity ?? 16;
    this.buffer = new Array(initialSize);
  }

  /* ---------------------------------- */
  /* Core properties                     */
  /* ---------------------------------- */

  size(): number {
    return this.length;
  }

  isEmpty(): boolean {
    return this.length === 0;
  }

  isFull(): boolean {
    return this.capacity !== undefined && this.length === this.capacity;
  }

  /* ---------------------------------- */
  /* Push operations                     */
  /* ---------------------------------- */

  pushBack(value: T): void {
    if (this.isFull()) {
      throw new Error("Deque is full");
    }

    this.ensureCapacity();
    this.buffer[this.tail] = value;
    this.tail = (this.tail + 1) % this.buffer.length;
    this.length++;
  }

  pushFront(value: T): void {
    if (this.isFull()) {
      throw new Error("Deque is full");
    }

    this.ensureCapacity();
    this.head = (this.head - 1 + this.buffer.length) % this.buffer.length;
    this.buffer[this.head] = value;
    this.length++;
  }

  /* ---------------------------------- */
  /* Pop operations                      */
  /* ---------------------------------- */

  popFront(): T | undefined {
    if (this.isEmpty()) return undefined;

    const value = this.buffer[this.head];
    this.buffer[this.head] = undefined;
    this.head = (this.head + 1) % this.buffer.length;
    this.length--;
    return value;
  }

  popBack(): T | undefined {
    if (this.isEmpty()) return undefined;

    this.tail = (this.tail - 1 + this.buffer.length) % this.buffer.length;
    const value = this.buffer[this.tail];
    this.buffer[this.tail] = undefined;
    this.length--;
    return value;
  }

  /* ---------------------------------- */
  /* Peek operations                     */
  /* ---------------------------------- */

  peekFront(): T | undefined {
    return this.isEmpty() ? undefined : this.buffer[this.head];
  }

  peekBack(): T | undefined {
    if (this.isEmpty()) return undefined;
    const index = (this.tail - 1 + this.buffer.length) % this.buffer.length;
    return this.buffer[index];
  }

  /* ---------------------------------- */
  /* Utilities                           */
  /* ---------------------------------- */

  clear(): void {
    this.buffer = new Array(this.capacity ?? 16);
    this.head = 0;
    this.tail = 0;
    this.length = 0;
  }

  toArray(): T[] {
    const result: T[] = [];
    for (const item of this) result.push(item);
    return result;
  }

  /* ---------------------------------- */
  /* Iterator support                    */
  /* ---------------------------------- */

  *[Symbol.iterator](): IterableIterator<T> {
    for (let i = 0; i < this.length; i++) {
      const index = (this.head + i) % this.buffer.length;
      yield this.buffer[index]!;
    }
  }

  /* ---------------------------------- */
  /* Internal helpers                    */
  /* ---------------------------------- */

  private ensureCapacity(): void {
    if (this.capacity !== undefined) return;

    if (this.length < this.buffer.length) return;

    const newBuffer = new Array(this.buffer.length * 2);
    for (let i = 0; i < this.length; i++) {
      newBuffer[i] = this.buffer[(this.head + i) % this.buffer.length];
    }

    this.buffer = newBuffer;
    this.head = 0;
    this.tail = this.length;
  }
}
