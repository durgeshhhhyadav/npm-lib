import { BinaryHeap } from "./BinaryHeap";

/**
 * MinHeap
 * -------
 * Smallest element always at top
 */
export class MinHeap<T> extends BinaryHeap<T> {
  constructor(compareFn?: (a: T, b: T) => number) {
    super(
      compareFn ??
        ((a: any, b: any) => (a < b ? -1 : a > b ? 1 : 0))
    );
  }
}
