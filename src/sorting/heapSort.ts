/**
 * Heap Sort
 * ==========================
 * Comparison-based sorting algorithm using Binary Heap.
 *
 * Time Complexity:
 * - Best:    O(n log n)
 * - Average: O(n log n)
 * - Worst:   O(n log n)
 *
 * Space Complexity:
 * - O(1) auxiliary
 *
 * Features:
 * - In-place sorting
 * - Predictable performance
 * - Generic & comparator-based
 * - Does NOT mutate original array
 */

export type Comparator<T> = (a: T, b: T) => number;

/**
 * Default comparator
 */
function defaultComparator<T>(a: T, b: T): number {
  if (a === b) return 0;
  return a > b ? 1 : -1;
}

/**
 * Heap Sort
 *
 * @param array Input array
 * @param comparator Optional comparator
 * @returns Sorted array
 */
export function heapSort<T>(
  array: readonly T[],
  comparator: Comparator<T> = defaultComparator
): T[] {
  const result = [...array];
  const n = result.length;

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(result, n, i, comparator);
  }

  // Extract elements from heap
  for (let i = n - 1; i > 0; i--) {
    swap(result, 0, i);
    heapify(result, i, 0, comparator);
  }

  return result;
}

/* ---------------------------------- */
/* Internal Helpers                    */
/* ---------------------------------- */

function heapify<T>(
  arr: T[],
  heapSize: number,
  rootIndex: number,
  comparator: Comparator<T>
): void {
  let largest = rootIndex;
  const left = 2 * rootIndex + 1;
  const right = 2 * rootIndex + 2;

  if (
    left < heapSize &&
    comparator(arr[left], arr[largest]) > 0
  ) {
    largest = left;
  }

  if (
    right < heapSize &&
    comparator(arr[right], arr[largest]) > 0
  ) {
    largest = right;
  }

  if (largest !== rootIndex) {
    swap(arr, rootIndex, largest);
    heapify(arr, heapSize, largest, comparator);
  }
}

function swap<T>(arr: T[], i: number, j: number): void {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}
