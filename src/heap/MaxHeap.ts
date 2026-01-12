import { BinaryHeap } from "./BinaryHeap";

/**
 * MaxHeap
 * -------
 * Largest element always at top
 */
export class MaxHeap<T> extends BinaryHeap<T> {
  constructor(compareFn?: (a: T, b: T) => number) {
    super(
      compareFn ??
        ((a: any, b: any) => (a > b ? -1 : a < b ? 1 : 0))
    );
  }
}
