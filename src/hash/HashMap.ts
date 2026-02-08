/* ============================================================
 * HashMap Implementation (Separate Chaining)
 * ------------------------------------------------------------
 * - Generic Key-Value store
 * - Collision handling via buckets
 * - Dynamic resizing with load factor
 * - Optional custom hash function
 * ============================================================ */

export type HashFunction<K> = (key: K) => number;

interface HashNode<K, V> {
  key: K;
  value: V;
  next?: HashNode<K, V>;
}

export class HashMap<K, V> implements Iterable<[K, V]> {
  private buckets: Array<HashNode<K, V> | undefined>;
  private capacity: number;
  private count = 0;
  private readonly loadFactor = 0.75;

  constructor(
    initialCapacity = 16,
    private readonly hashFn?: HashFunction<K>
  ) {
    if (initialCapacity <= 0) {
      throw new Error('Initial capacity must be greater than 0');
    }
    this.capacity = initialCapacity;
    this.buckets = new Array(this.capacity);
  }

  /* ============================================================
   * Public API
   * ============================================================ */

  set(key: K, value: V): void {
    const index = this.getIndex(key);
    let node = this.buckets[index];

    // Update existing key
    while (node) {
      if (this.isEqual(node.key, key)) {
        node.value = value;
        return;
      }
      node = node.next;
    }

    // Insert new node
    const newNode: HashNode<K, V> = {
      key,
      value,
      next: this.buckets[index],
    };

    this.buckets[index] = newNode;
    this.count++;

    // Resize if load factor exceeded
    if (this.count / this.capacity > this.loadFactor) {
      this.resize(this.capacity * 2);
    }
  }

  get(key: K): V | undefined {
    const index = this.getIndex(key);
    let node = this.buckets[index];

    while (node) {
      if (this.isEqual(node.key, key)) {
        return node.value;
      }
      node = node.next;
    }
    return undefined;
  }

  has(key: K): boolean {
    return this.get(key) !== undefined;
  }

  delete(key: K): boolean {
    const index = this.getIndex(key);
    let node = this.buckets[index];
    let prev: HashNode<K, V> | undefined;

    while (node) {
      if (this.isEqual(node.key, key)) {
        if (prev) {
          prev.next = node.next;
        } else {
          this.buckets[index] = node.next;
        }
        this.count--;
        return true;
      }
      prev = node;
      node = node.next;
    }
    return false;
  }

  clear(): void {
    this.buckets = new Array(this.capacity);
    this.count = 0;
  }

  size(): number {
    return this.count;
  }

  isEmpty(): boolean {
    return this.count === 0;
  }

  keys(): K[] {
    const result: K[] = [];
    for (const [key] of this) {
      result.push(key);
    }
    return result;
  }

  values(): V[] {
    const result: V[] = [];
    for (const [, value] of this) {
      result.push(value);
    }
    return result;
  }

  entries(): Array<[K, V]> {
    return [...this];
  }

  /* ============================================================
   * Iterator Support
   * ============================================================ */

  *[Symbol.iterator](): Iterator<[K, V]> {
    for (const bucket of this.buckets) {
      let node = bucket;
      while (node) {
        yield [node.key, node.value];
        node = node.next;
      }
    }
  }

  /* ============================================================
   * Internal Helpers
   * ============================================================ */

  private getIndex(key: K): number {
    const hash = this.hashFn
      ? this.hashFn(key)
      : this.defaultHash(key);

    return Math.abs(hash) % this.capacity;
  }

  private defaultHash(key: K): number {
    if (typeof key === 'number') return key;
    if (typeof key === 'string') return this.hashString(key);

    // Object fallback
    return this.hashString(JSON.stringify(key));
  }

  private hashString(value: string): number {
    let hash = 0;
    for (let i = 0; i < value.length; i++) {
      hash = (hash * 31 + value.charCodeAt(i)) | 0;
    }
    return hash;
  }

  private isEqual(a: K, b: K): boolean {
    return Object.is(a, b);
  }

  private resize(newCapacity: number): void {
    const oldBuckets = this.buckets;

    this.capacity = newCapacity;
    this.buckets = new Array(this.capacity);
    this.count = 0;

    for (const bucket of oldBuckets) {
      let node = bucket;
      while (node) {
        this.set(node.key, node.value);
        node = node.next;
      }
    }
  }
}
