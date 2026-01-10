/**
 * Circular Doubly Linked List
 * ===========================
 *
 * A circular doubly linked list is a doubly linked list
 * where:
 * - The last node points to the first node
 * - The first node points back to the last node
 *
 * Characteristics:
 * - Bidirectional traversal
 * - No null pointers in non-empty list
 * - Efficient insert/remove when node reference is known
 *
 * @typeParam T - Type of stored data
 */

export class CircularDoublyNode<T> {
  /** Stored value */
  value: T;

  /** Next node in the list */
  next!: CircularDoublyNode<T>;

  /** Previous node in the list */
  prev!: CircularDoublyNode<T>;

  constructor(value: T) {
    this.value = value;
  }
}

export class CircularDoublyLinkedList<T>
  implements Iterable<CircularDoublyNode<T>>
{
  /**
   * Head of the list.
   * head.prev always points to tail.
   */
  private head: CircularDoublyNode<T> | null = null;

  /** Total number of nodes */
  private length = 0;

  /**
   * Returns list size.
   *
   * @returns Number of elements
   * @complexity O(1)
   */
  size(): number {
    return this.length;
  }

  /**
   * Checks if list is empty.
   *
   * @returns true if empty
   * @complexity O(1)
   */
  isEmpty(): boolean {
    return this.length === 0;
  }

  /**
   * Appends a value at the end of the list.
   *
   * @param value - Value to append
   * @complexity O(1)
   */
  append(value: T): void {
    const node = new CircularDoublyNode(value);

    if (!this.head) {
      node.next = node.prev = node;
      this.head = node;
    } else {
      const tail = this.head.prev!;
      node.prev = tail;
      node.next = this.head;
      tail.next = node;
      this.head.prev = node;
    }

    this.length++;
  }

  /**
   * Inserts a value at a given index.
   *
   * @param index - Position to insert at
   * @param value - Value to insert
   * @throws RangeError if index invalid
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

    const node = new CircularDoublyNode(value);

    if (!this.head) {
      node.next = node.prev = node;
      this.head = node;
    } else {
      let current = this.head;

      for (let i = 0; i < index; i++) {
        current = current.next;
      }

      node.prev = current.prev;
      node.next = current;
      current.prev.next = node;
      current.prev = node;

      if (index === 0) {
        this.head = node;
      }
    }

    this.length++;
  }

  /**
   * Removes and returns value at index.
   *
   * @param index - Index to remove
   * @returns Removed value
   * @throws RangeError if index invalid
   * @complexity O(n)
   */
  removeAt(index: number): T {
    if (!this.head || index < 0 || index >= this.length) {
      throw new RangeError("Index out of bounds");
    }

    let current = this.head;

    for (let i = 0; i < index; i++) {
      current = current.next;
    }

    if (this.length === 1) {
      this.head = null;
    } else {
      current.prev.next = current.next;
      current.next.prev = current.prev;

      if (current === this.head) {
        this.head = current.next;
      }
    }

    this.length--;
    return current.value;
  }

  /**
   * Removes a node directly by reference.
   *
   * @param node - Node to remove
   * @complexity O(1)
   */
  remove(node: CircularDoublyNode<T>): void {
    if (!this.head) return;

    if (this.length === 1) {
      this.head = null;
    } else {
      node.prev.next = node.next;
      node.next.prev = node.prev;

      if (node === this.head) {
        this.head = node.next;
      }
    }

    this.length--;
  }

  /**
   * Iterates through the list exactly once.
   *
   * @returns Iterator yielding nodes
   * @complexity O(n)
   */
  *[Symbol.iterator](): IterableIterator<CircularDoublyNode<T>> {
    if (!this.head) return;

    let current = this.head;
    for (let i = 0; i < this.length; i++) {
      yield current;
      current = current.next;
    }
  }
}
