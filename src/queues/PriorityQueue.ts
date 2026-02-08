/**
 * PriorityQueue
 * ======================================
 * A generic, heap-based Priority Queue implementation.
 *
 * Features:
 * - Min-Heap by default
 * - Custom comparator support
 * - Iterable (for...of)
 * - Bulk heap construction (O(n))
 * - O(log n) insertion and removal
 * - O(1) peek
 *
 * Common Use Cases:
 * - Task scheduling
 * - Job queues
 * - Graph algorithms (Dijkstra, A*)
 * - Event handling systems
 *
 * Comparator Contract:
 * - comparator(a, b) < 0 → `a` has higher priority
 * - comparator(a, b) > 0 → `b` has higher priority
 * - comparator(a, b) === 0 → equal priority
 */

export type Comparator<T> = (a: T, b: T) => number;

export class PriorityQueue<T> implements Iterable<T> {
  /** Internal binary heap storage */
  private heap: T[] = [];

  /** Comparison function to determine priority */
  private comparator: Comparator<T>;

  /**
   * Creates a new PriorityQueue.
   *
   * @param comparator Optional comparison function.
   * If not provided, a default min-heap comparator is used.
   */
  constructor(comparator?: Comparator<T>) {
    this.comparator =
      comparator ??
      ((a: any, b: any) => (a < b ? -1 : a > b ? 1 : 0));
  }

  /**
   * Returns the number of elements in the queue.
   */
  size(): number {
    return this.heap.length;
  }

  /**
   * Returns true if the queue is empty.
   */
  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  /**
   * Returns the element with the highest priority
   * without removing it from the queue.
   */
  peek(): T | undefined {
    return this.heap[0];
  }

  /**
   * Inserts a new element into the priority queue.
   *
   * Time Complexity: O(log n)
   *
   * @param value Element to insert
   */
  enqueue(value: T): void {
    this.heap.push(value);
    this.heapifyUp(this.heap.length - 1);
  }

  /**
   * Removes and returns the element with the highest priority.
   * Time Complexity: O(log n)
   */
  dequeue(): T | undefined {
    if (this.isEmpty()) return undefined;

    const root = this.heap[0];
    const last = this.heap.pop()!;

    if (!this.isEmpty()) {
      this.heap[0] = last;
      this.heapifyDown(0);
    }

    return root;
  }

  /**
   * Removes all elements from the queue.
   */
  clear(): void {
    this.heap.length = 0;
  }

  /* =====================================================
   * Advanced Utilities
   * ===================================================== */

  /**
   * Bulk inserts elements and builds heap in O(n) time.
   */
  buildHeap(values: T[]): void {
    this.heap = values.slice();
    for (let i = Math.floor(this.heap.length / 2) - 1; i >= 0; i--) {
      this.heapifyDown(i);
    }
  }

  /**
   * Replaces the root element and restores heap property.
   * Time Complexity: O(log n)
   */
  replaceTop(value: T): T | undefined {
    if (this.isEmpty()) {
      this.heap[0] = value;
      return undefined;
    }

    const root = this.heap[0];
    this.heap[0] = value;
    this.heapifyDown(0);
    return root;
  }

  /**
   * Checks if an element exists (O(n)).
   */
  contains(value: T): boolean {
    return this.heap.includes(value);
  }

  /**
   * Removes the first element matching the predicate.
   * Time Complexity: O(n + log n)
   */
  remove(predicate: (value: T) => boolean): boolean {
    const index = this.heap.findIndex(predicate);
    if (index === -1) return false;

    const last = this.heap.pop()!;
    if (index < this.heap.length) {
      this.heap[index] = last;
      this.heapifyDown(index);
      this.heapifyUp(index);
    }
    return true;
  }

  /**
   * Executes a callback for each element (heap order).
   */
  forEach(callback: (value: T, index: number) => void): void {
    this.heap.forEach(callback);
  }

  /**
   * Returns a shallow copy of the heap array.
   * NOTE: Order is NOT sorted.
   */
  toArray(): T[] {
    return [...this.heap];
  }

  /* =====================================================
   * Iterable Support
   * ===================================================== */

  *[Symbol.iterator](): IterableIterator<T> {
    for (const item of this.heap) {
      yield item;
    }
  }

  /* =====================================================
   * Internal Heap Mechanics
   * ===================================================== */

  private heapifyUp(index: number): void {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (this.comparator(this.heap[index], this.heap[parent]) >= 0) break;
      this.swap(index, parent);
      index = parent;
    }
  }

  private heapifyDown(index: number): void {
    const length = this.heap.length;

    while (true) {
      let smallest = index;
      const left = index * 2 + 1;
      const right = index * 2 + 2;

      if (
        left < length &&
        this.comparator(this.heap[left], this.heap[smallest]) < 0
      ) {
        smallest = left;
      }

      if (
        right < length &&
        this.comparator(this.heap[right], this.heap[smallest]) < 0
      ) {
        smallest = right;
      }

      if (smallest === index) break;
      this.swap(index, smallest);
      index = smallest;
    }
  }

  private swap(i: number, j: number): void {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }
}
