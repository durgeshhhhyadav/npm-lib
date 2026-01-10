/**
 * Stack (LIFO – Last In First Out)
 *
 * Time Complexity:
 * push    → O(1)
 * pop     → O(1)
 * peek    → O(1)
 * size    → O(1)
 * isEmpty → O(1)
 * clear   → O(1)
 *
 * Space Complexity:
 * O(n)
 */
export class Stack<T> implements Iterable<T> {
  private items: T[] = [];

  /**
   * Adds an element to the top of the stack.
   */
  push(value: T): void {
    this.items.push(value);
  }

  /**
   * Removes and returns the top element of the stack.
   * Returns undefined if the stack is empty.
   */
  pop(): T | undefined {
    return this.items.pop();
  }

  /**
   * Returns the top element without removing it.
   * Returns undefined if the stack is empty.
   */
  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  /**
   * Returns the number of elements in the stack.
   */
  size(): number {
    return this.items.length;
  }

  /**
   * Checks whether the stack is empty.
   */
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  /**
   * Removes all elements from the stack.
   */
  clear(): void {
    this.items.length = 0;
  }

  /**
   * Allows iteration from top to bottom using for...of.
   */
  *[Symbol.iterator](): IterableIterator<T> {
    for (let i = this.items.length - 1; i >= 0; i--) {
      yield this.items[i];
    }
  }
}
