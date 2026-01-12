export type Comparator<T> = (a: T, b: T) => number;

/**
 * BinaryHeap
 * -----------
 * Internal base class for MinHeap / MaxHeap
 *
 * Time Complexity:
 * - insert: O(log n)
 * - extract: O(log n)
 * - peek: O(1)
 */
export class BinaryHeap<T> implements Iterable<T> {
  protected heap: T[] = [];

  constructor(protected comparator: Comparator<T>) {}

  size(): number {
    return this.heap.length;
  }

  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  peek(): T | undefined {
    return this.heap[0];
  }

  clear(): void {
    this.heap = [];
  }

  insert(value: T): void {
    this.heap.push(value);
    this.bubbleUp(this.heap.length - 1);
  }

  extract(): T | undefined {
    if (this.isEmpty()) return undefined;
    if (this.heap.length === 1) return this.heap.pop();

    const root = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.bubbleDown(0);
    return root;
  }

  protected bubbleUp(index: number): void {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (this.comparator(this.heap[index], this.heap[parent]) >= 0) break;
      this.swap(index, parent);
      index = parent;
    }
  }

  protected bubbleDown(index: number): void {
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

  protected swap(i: number, j: number): void {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  *[Symbol.iterator](): IterableIterator<T> {
    for (const item of this.heap) yield item;
  }
}
