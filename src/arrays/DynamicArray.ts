/**
 * DynamicArray
 * -------------
 * A resizable array implementation
 *
 * Features:
 * - Automatic resizing (grow & shrink)
 * - O(1) amortized push/pop
 * - O(1) random access
 * - Iterable (for...of support)
 */

export class DynamicArray<T> implements Iterable<T> {
  private data: (T | undefined)[];
  private _size: number;
  private capacity: number;

  constructor(initialCapacity: number = 4) {
    if (initialCapacity <= 0) {
      throw new Error("Initial capacity must be greater than 0");
    }

    this.capacity = initialCapacity;
    this.data = new Array(this.capacity);
    this._size = 0;
  }

  /* ------------------ Core Properties ------------------ */

  get size(): number {
    return this._size;
  }

  get isEmpty(): boolean {
    return this._size === 0;
  }

  /* ------------------ Private Helpers ------------------ */

  private resize(newCapacity: number): void {
    const newData = new Array<T | undefined>(newCapacity);

    for (let i = 0; i < this._size; i++) {
      newData[i] = this.data[i];
    }

    this.data = newData;
    this.capacity = newCapacity;
  }

  /* ------------------ Access ------------------ */

  get(index: number): T {
    this.rangeCheck(index);
    return this.data[index]!;
  }

  set(index: number, value: T): void {
    this.rangeCheck(index);
    this.data[index] = value;
  }

  /* ------------------ Insert ------------------ */

  push(value: T): void {
    if (this._size === this.capacity) {
      this.resize(this.capacity * 2);
    }

    this.data[this._size++] = value;
  }

  insertAt(index: number, value: T): void {
    if (index < 0 || index > this._size) {
      throw new RangeError("Index out of bounds");
    }

    if (this._size === this.capacity) {
      this.resize(this.capacity * 2);
    }

    for (let i = this._size; i > index; i--) {
      this.data[i] = this.data[i - 1];
    }

    this.data[index] = value;
    this._size++;
  }

  /* ------------------ Remove ------------------ */

  pop(): T {
    if (this.isEmpty) {
      throw new Error("Array is empty");
    }

    const value = this.data[--this._size]!;
    this.data[this._size] = undefined;

    if (this._size > 0 && this._size <= this.capacity / 4) {
      this.resize(Math.floor(this.capacity / 2));
    }

    return value;
  }

  removeAt(index: number): T {
    this.rangeCheck(index);

    const removed = this.data[index]!;

    for (let i = index; i < this._size - 1; i++) {
      this.data[i] = this.data[i + 1];
    }

    this.data[--this._size] = undefined;

    if (this._size > 0 && this._size <= this.capacity / 4) {
      this.resize(Math.floor(this.capacity / 2));
    }

    return removed;
  }

  /* ------------------ Utility ------------------ */

  clear(): void {
    this.data = new Array(this.capacity);
    this._size = 0;
  }

  toArray(): T[] {
    return this.data.slice(0, this._size) as T[];
  }

  private rangeCheck(index: number): void {
    if (index < 0 || index >= this._size) {
      throw new RangeError("Index out of bounds");
    }
  }

  /* ------------------ Iterable ------------------ */

  *[Symbol.iterator](): Iterator<T> {
    for (let i = 0; i < this._size; i++) {
      yield this.data[i]!;
    }
  }
}
