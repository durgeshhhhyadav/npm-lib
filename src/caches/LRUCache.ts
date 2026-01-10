import { DoublyLinkedList, DoublyNode } from "../linked-lists/DoublyLinkedList";

/**
 * LRUCache
 * ======================================
 * Least Recently Used (LRU) cache implementation.
 *
 * Characteristics:
 * - Fixed capacity
 * - O(1) get / put / delete
 * - Evicts least recently used entry on overflow
 *
 * Internal Design:
 * - Map for fast lookup
 * - DoublyLinkedList for usage ordering
 *
 * Most Recently Used → Head
 * Least Recently Used → Tail
 */

type CacheEntry<K, V> = {
  key: K;
  value: V;
};

export class LRUCache<K, V> {
  private capacity: number;
  private map = new Map<K, DoublyNode<CacheEntry<K, V>>>();
  private list = new DoublyLinkedList<CacheEntry<K, V>>();

  /**
   * Creates a new LRU Cache.
   *
   * @param capacity Maximum number of entries
   */
  constructor(capacity: number) {
    if (capacity <= 0) {
      throw new Error("LRU Cache capacity must be greater than 0");
    }
    this.capacity = capacity;
  }

  /**
   * Returns the number of items currently in the cache.
   */
  size(): number {
    return this.map.size;
  }

  /**
   * Returns true if the cache is empty.
   */
  isEmpty(): boolean {
    return this.map.size === 0;
  }

  /**
   * Retrieves a value from the cache.
   *
   * - Moves the entry to most recently used
   *
   * Time Complexity: O(1)
   */
  get(key: K): V | undefined {
    const node = this.map.get(key);
    if (!node) return undefined;

    this.moveToFront(node);
    return node.value.value;
  }

  /**
   * Inserts or updates a value in the cache.
   *
   * - Moves entry to most recently used
   * - Evicts least recently used if capacity exceeded
   *
   * Time Complexity: O(1)
   */
  put(key: K, value: V): void {
    const existingNode = this.map.get(key);

    if (existingNode) {
      existingNode.value.value = value;
      this.moveToFront(existingNode);
      return;
    }

    const entry: CacheEntry<K, V> = { key, value };
    this.list.prepend(entry);

    const node = this.list.find(
      (v) => v.key === key
    )!;

    this.map.set(key, node);

    if (this.map.size > this.capacity) {
      this.evictLeastRecentlyUsed();
    }
  }

  /**
   * Removes a key from the cache.
   *
   * Time Complexity: O(1)
   */
  delete(key: K): boolean {
    const node = this.map.get(key);
    if (!node) return false;

    this.removeNode(node);
    this.map.delete(key);
    return true;
  }

  /**
   * Clears the cache.
   */
  clear(): void {
    this.map.clear();
    this.list.clear();
  }

  /**
   * Returns all cache entries from most → least recently used.
   */
  entries(): Array<[K, V]> {
    const result: Array<[K, V]> = [];

    for (const node of this.list) {
      result.push([node.value.key, node.value.value]);
    }

    return result;
  }

  /* ---------------------------------- */
  /* Internal Helpers                    */
  /* ---------------------------------- */

  private moveToFront(node: DoublyNode<CacheEntry<K, V>>): void {
    this.removeNode(node);
    this.list.prepend(node.value);
    this.map.set(node.value.key, this.list.find(
      (v) => v.key === node.value.key
    )!);
  }

  private evictLeastRecentlyUsed(): void {
    const removed = this.list.removeTail();
    if (!removed) return;

    this.map.delete(removed.key);
  }

  private removeNode(node: DoublyNode<CacheEntry<K, V>>): void {
    // Remove via index-less logic
    if (node.prev) node.prev.next = node.next;
    if (node.next) node.next.prev = node.prev;

    if (node === (this.list as any).head) {
      (this.list as any).head = node.next;
    }

    if (node === (this.list as any).tail) {
      (this.list as any).tail = node.prev;
    }

    (this.list as any).length--;
  }
}
