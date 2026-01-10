/**
 * Circular Singly Linked List
 * ===========================
 *
 * A circular singly linked list is a variation of a singly linked list
 * where the last node points back to the first node instead of `null`.
 *
 * Characteristics:
 * - No natural "end" of the list
 * - Traversal must always be bounded
 * - Efficient append operations using a tail pointer
 *
 * Common use cases:
 * - Round-robin scheduling
 * - Repeating sequences
 * - Buffer-like data structures
 *
 * @typeParam T - Type of data stored in the list
 */

export class CircularSinglyNode<T> {
  /** Value stored in the node */
  value: T;

  /** Reference to the next node (never null in a non-empty list) */
  next!: CircularSinglyNode<T>;

  constructor(value: T) {
    this.value = value;
  }
}

export class CircularSinglyLinkedList<T>
  implements Iterable<CircularSinglyNode<T>>
{
  /**
   * Tail pointer.
   * tail.next always points to the head.
   */
  private tail: CircularSinglyNode<T> | null = null;

  /** Number of nodes in the list */
  private length = 0;

  /**
   * Returns number of elements in the list.
   *
   * @returns Total node count
   * @complexity O(1)
   */
  size(): number {
    return this.length;
  }

  /**
   * Checks whether the list is empty.
   *
   * @returns true if list has no elements
   * @complexity O(1)
   */
  isEmpty(): boolean {
    return this.length === 0;
  }

  /**
   * Appends a value at the end of the list.
   *
   * If the list is empty:
   * - The new node points to itself
   * - Tail points to the new node
   *
   * @param value - Value to append
   * @complexity O(1)
   */
  append(value: T): void {
    const node = new CircularSinglyNode(value);

    if (!this.tail) {
      node.next = node;
      this.tail = node;
    } else {
      node.next = this.tail.next;
      this.tail.next = node;
      this.tail = node;
    }

    this.length++;
  }

  /**
   * Inserts a value at a specific index.
   *
   * Index rules:
   * - 0 inserts at head
   * - size() inserts at tail
   *
   * @param index - Position to insert at
   * @param value - Value to insert
   * @throws RangeError if index is invalid
   * @complexity O(n)
   */
  insertAt(index: number, value: T): void {
    if (index < 0 || index > this.length) {
      throw new RangeError("Index out of bounds");
    }

    if (index === this.length) {
      this.append(value);
      return;
    }

    const node = new CircularSinglyNode(value);

    if (!this.tail) {
      node.next = node;
      this.tail = node;
    } else {
      let prev = this.tail;
      let current = this.tail.next;

      for (let i = 0; i < index; i++) {
        prev = current;
        current = current.next;
      }

      prev.next = node;
      node.next = current;
    }

    this.length++;
  }

  /**
   * Removes and returns the value at a specific index.
   *
   * @param index - Index of node to remove
   * @returns Removed value
   * @throws RangeError if index is invalid
   * @complexity O(n)
   */
  removeAt(index: number): T {
    if (!this.tail || index < 0 || index >= this.length) {
      throw new RangeError("Index out of bounds");
    }

    let prev = this.tail;
    let current = this.tail.next;

    for (let i = 0; i < index; i++) {
      prev = current;
      current = current.next;
    }

    if (this.length === 1) {
      this.tail = null;
    } else {
      prev.next = current.next;
      if (current === this.tail) {
        this.tail = prev;
      }
    }

    this.length--;
    return current.value;
  }

  /**
   * Iterates through the list exactly once.
   *
   * This prevents infinite loops by bounding
   * traversal to the list size.
   *
   * @returns Iterator yielding nodes
   * @complexity O(n)
   */
  *[Symbol.iterator](): IterableIterator<CircularSinglyNode<T>> {
    if (!this.tail) return;

    let current = this.tail.next;
    for (let i = 0; i < this.length; i++) {
      yield current;
      current = current.next;
    }
  }
}
