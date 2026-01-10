/**
 * DoublyLinkedList
 * ======================================
 * A generic doubly linked list implementation.
 *
 * Characteristics:
 * - Bidirectional traversal
 * - Efficient insert/remove at both ends
 * - Maintains head and tail references
 *
 * Iterable:
 * - Supports for...of iteration
 * - Iterates over nodes (not values)
 *
 * Use Cases:
 * - LRU cache
 * - Deques
 * - Undo/Redo systems
 * - Navigation history
 *
 *  Index-based operations are O(n)
 */

export class DoublyNode<T> {
  value: T;
  next: DoublyNode<T> | null = null;
  prev: DoublyNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

export class DoublyLinkedList<T>
  implements Iterable<DoublyNode<T>>
{
  private head: DoublyNode<T> | null = null;
  private tail: DoublyNode<T> | null = null;
  private length = 0;

  /**
   * Returns the number of elements in the list.
   */
  size(): number {
    return this.length;
  }

  /**
   * Returns true if the list is empty.
   */
  isEmpty(): boolean {
    return this.length === 0;
  }

  /**
   * Removes all elements from the list.
   */
  clear(): void {
    this.head = this.tail = null;
    this.length = 0;
  }

  /**
   * Adds a value at the beginning of the list.
   *
   * Time Complexity: O(1)
   */
  prepend(value: T): void {
    const node = new DoublyNode(value);

    if (!this.head) {
      this.head = this.tail = node;
    } else {
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
    }

    this.length++;
  }

  /**
   * Adds a value at the end of the list.
   *
   * Time Complexity: O(1)
   */
  append(value: T): void {
    const node = new DoublyNode(value);

    if (!this.tail) {
      this.head = this.tail = node;
    } else {
      node.prev = this.tail;
      this.tail.next = node;
      this.tail = node;
    }

    this.length++;
  }

  /**
   * Inserts a value at a specific index.
   *
   *  Time Complexity: O(n)
   *
   * @param index Position starting from 0
   * @param value Value to insert
   */
  insertAt(index: number, value: T): void {
    if (index < 0 || index > this.length) {
      throw new RangeError("Index out of bounds");
    }

    if (index === 0) {
      this.prepend(value);
      return;
    }

    if (index === this.length) {
      this.append(value);
      return;
    }

    let current: DoublyNode<T>;

    // Optimize traversal direction
    if (index < this.length / 2) {
      current = this.head!;
      for (let i = 0; i < index; i++) {
        current = current.next!;
      }
    } else {
      current = this.tail!;
      for (let i = this.length - 1; i > index; i--) {
        current = current.prev!;
      }
    }

    const node = new DoublyNode(value);
    node.prev = current.prev;
    node.next = current;

    current.prev!.next = node;
    current.prev = node;

    this.length++;
  }

  /**
   * Removes and returns the value at a specific index.
   *
   *  Time Complexity: O(n)
   *
   * @param index Position starting from 0
   */
  removeAt(index: number): T | undefined {
    if (index < 0 || index >= this.length) {
      return undefined;
    }

    if (index === 0) {
      return this.removeHead();
    }

    if (index === this.length - 1) {
      return this.removeTail();
    }

    let current: DoublyNode<T>;

    if (index < this.length / 2) {
      current = this.head!;
      for (let i = 0; i < index; i++) {
        current = current.next!;
      }
    } else {
      current = this.tail!;
      for (let i = this.length - 1; i > index; i--) {
        current = current.prev!;
      }
    }

    current.prev!.next = current.next;
    current.next!.prev = current.prev;

    this.length--;
    return current.value;
  }

  /**
   * Removes and returns the first element.
   *
   * Time Complexity: O(1)
   */
  removeHead(): T | undefined {
    if (!this.head) return undefined;

    const value = this.head.value;
    this.head = this.head.next;

    if (this.head) {
      this.head.prev = null;
    } else {
      this.tail = null;
    }

    this.length--;
    return value;
  }

  /**
   * Removes and returns the last element.
   *
   * Time Complexity: O(1)
   */
  removeTail(): T | undefined {
    if (!this.tail) return undefined;

    const value = this.tail.value;
    this.tail = this.tail.prev;

    if (this.tail) {
      this.tail.next = null;
    } else {
      this.head = null;
    }

    this.length--;
    return value;
  }

  /**
   * Finds the first node that satisfies the given predicate.
   *
   * Time Complexity: O(n)
   */
  find(
    predicate: (value: T, index: number) => boolean
  ): DoublyNode<T> | undefined {
    let current = this.head;
    let index = 0;

    while (current) {
      if (predicate(current.value, index)) {
        return current;
      }
      current = current.next;
      index++;
    }

    return undefined;
  }

  /**
   * Returns all values as an array.
   */
  toArray(): T[] {
    const result: T[] = [];
    let current = this.head;

    while (current) {
      result.push(current.value);
      current = current.next;
    }

    return result;
  }

  /**
   * Makes the list iterable using for...of.
   *
   * Iterates over nodes (not values).
   */
  *[Symbol.iterator](): IterableIterator<DoublyNode<T>> {
    let current = this.head;

    while (current) {
      yield current;
      current = current.next;
    }
  }
}
