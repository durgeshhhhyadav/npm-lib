/**
 * Comparator
 * ==========
 *
 * A reusable comparison utility for ordering values.
 * Used by:
 * - PriorityQueue
 * - Heap (future)
 * - Trees (future)
 * - Sorting utilities
 *
 * @typeParam T - Type being compared
 */

export type CompareFn<T> = (a: T, b: T) => number;

export class Comparator<T> {
  private readonly compare: CompareFn<T>;

  /**
   * Creates a comparator.
   *
   * @param compareFn - Custom comparison function
   * Default behavior:
   * - a < b => -1
   * - a > b => 1
   * - a === b => 0
   */
  constructor(compareFn?: CompareFn<T>) {
    this.compare = compareFn ?? Comparator.defaultCompare;
  }

  /**
   * Default comparison for primitive values.
   */
  private static defaultCompare(a: any, b: any): number {
    if (a === b) return 0;
    return a < b ? -1 : 1;
  }

  /**
   * Returns true if a is less than b.
   */
  lessThan(a: T, b: T): boolean {
    return this.compare(a, b) < 0;
  }

  /**
   * Returns true if a is greater than b.
   */
  greaterThan(a: T, b: T): boolean {
    return this.compare(a, b) > 0;
  }

  /**
   * Returns true if values are equal.
   */
  equal(a: T, b: T): boolean {
    return this.compare(a, b) === 0;
  }
}
