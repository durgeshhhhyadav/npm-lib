/**
 * PriorityQueue
 * ======================================
 * A generic, heap-based Priority Queue implementation.
 *
 * Features:
 * - Min-Heap by default
 * - Custom comparator support
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

export class PriorityQueue<T> {
  /** Internal binary heap storage */
  private heap: T[] = [];

  /** Comparison function to determine priority */
  private comparator: Comparator<T>;

  /**
   * Creates a new PriorityQueue.
   *
   * @param comparator Optional comparison function.
   * If not provided, a default min-heap comparator is used.
   *
   * @example
   * ```ts
   * const pq = new PriorityQueue<number>();
   * ```
   *
   * @example Max-Heap
   * ```ts
   * const pq = new PriorityQueue<number>((a, b) => b - a);
   * ```
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
    this.heapifyUp();
  }

  /**
   * Removes and returns the element with the highest priority.
   *
   * Time Complexity: O(log n)
   *
   * @returns The highest priority element or undefined if empty
   */
  dequeue(): T | undefined {
    if (this.isEmpty()) return undefined;

    const root = this.heap[0];
    const last = this.heap.pop()!;

    if (!this.isEmpty()) {
      this.heap[0] = last;
      this.heapifyDown();
    }

    return root;
  }

  /**
   * Removes all elements from the queue.
   */
  clear(): void {
    this.heap.length = 0;
  }

  /**
   * Returns a shallow copy of the underlying heap array.
   *
   * Note:
   * This does NOT guarantee sorted order.
   * Use dequeue() repeatedly for ordered retrieval.
   */
  toArray(): T[] {
    return [...this.heap];
  }

  /* ---------------------------------- */
  /* Internal Heap Operations            */
  /* ---------------------------------- */

  /**
   * Restores heap property after insertion.
   */
  private heapifyUp(): void {
    let index = this.heap.length - 1;

    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);

      if (this.comparator(this.heap[index], this.heap[parentIndex]) >= 0) {
        break;
      }

      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }

  /**
   * Restores heap property after removal.
   */
  private heapifyDown(): void {
    let index = 0;

    while (true) {
      const left = index * 2 + 1;
      const right = index * 2 + 2;
      let smallest = index;

      if (
        left < this.heap.length &&
        this.comparator(this.heap[left], this.heap[smallest]) < 0
      ) {
        smallest = left;
      }

      if (
        right < this.heap.length &&
        this.comparator(this.heap[right], this.heap[smallest]) < 0
      ) {
        smallest = right;
      }

      if (smallest === index) break;

      this.swap(index, smallest);
      index = smallest;
    }
  }

  /**
   * Swaps two elements in the heap.
   */
  private swap(i: number, j: number): void {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }
}
