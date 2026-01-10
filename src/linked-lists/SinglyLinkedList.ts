/**
 * SinglyLinkedList
 * ======================================
 * A generic singly linked list implementation.
 *
 * Characteristics:
 * - One-directional traversal
 * - Efficient insertion/removal at head
 * - Tail pointer maintained for O(1) append
 *
 * Iterable:
 * - Supports for...of iteration
 * - Iterates over nodes (not raw values)
 *
 * Use Cases:
 * - Core data structure
 * - Queues, stacks
 * - Algorithm implementations
 *
 *  Index-based operations are O(n)
 */

export class SinglyNode<T> {
  value: T;
  next: SinglyNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

export class SinglyLinkedList<T>
  implements Iterable<SinglyNode<T>>
{
  private head: SinglyNode<T> | null = null;
  private tail: SinglyNode<T> | null = null;
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
    const node = new SinglyNode(value);

    node.next = this.head;
    this.head = node;

    if (!this.tail) {
      this.tail = node;
    }

    this.length++;
  }

  /**
   * Adds a value at the end of the list.
   *
   * Time Complexity: O(1)
   */
  append(value: T): void {
    const node = new SinglyNode(value);

    if (!this.tail) {
      this.head = this.tail = node;
    } else {
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

    let current = this.head!;
    for (let i = 0; i < index - 1; i++) {
      current = current.next!;
    }

    const node = new SinglyNode(value);
    node.next = current.next;
    current.next = node;

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
    if (index < 0 || index >= this.length || !this.head) {
      return undefined;
    }

    if (index === 0) {
      return this.removeHead();
    }

    let current = this.head;
    for (let i = 0; i < index - 1; i++) {
      current = current.next!;
    }

    const removed = current.next!;
    current.next = removed.next;

    if (removed === this.tail) {
      this.tail = current;
    }

    this.length--;
    return removed.value;
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

    if (!this.head) {
      this.tail = null;
    }

    this.length--;
    return value;
  }

  /**
   * Removes and returns the last element.
   *
   *  Time Complexity: O(n)
   */
  removeTail(): T | undefined {
    if (!this.head) return undefined;

    if (this.length === 1) {
      const value = this.head.value;
      this.clear();
      return value;
    }

    let current = this.head;
    while (current.next !== this.tail) {
      current = current.next!;
    }

    const value = this.tail!.value;
    current.next = null;
    this.tail = current;

    this.length--;
    return value;
  }

  /**
   * Finds the first node that satisfies the given predicate.
   *
   * Time Complexity: O(n)
   *
   * @param predicate Function to test each value
   * @returns The matching node or undefined
   */
  find(
    predicate: (value: T, index: number) => boolean
  ): SinglyNode<T> | undefined {
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
   *
   * @example
   * for (const node of list) {
   *   console.log(node.value);
   * }
   */
  *[Symbol.iterator](): IterableIterator<SinglyNode<T>> {
    let current = this.head;

    while (current) {
      yield current;
      current = current.next;
    }
  }
}
