/**
 * Quick Sort
 * ==========================
 * Comparison-based sorting algorithm using divide & conquer.
 *
 * Time Complexity:
 * - Best:    O(n log n)
 * - Average: O(n log n)
 * - Worst:   O(n²)  (rare with good pivot selection)
 *
 * Space Complexity:
 * - O(log n) (recursion stack)
 *
 * Features:
 * - Very fast in practice
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
 * Quick Sort
 *
 * @param array Input array
 * @param comparator Optional comparator
 * @returns Sorted array
 */
export function quickSort<T>(
  array: readonly T[],
  comparator: Comparator<T> = defaultComparator
): T[] {
  const result = [...array];
  quickSortRecursive(result, 0, result.length - 1, comparator);
  return result;
}

/* ---------------------------------- */
/* Internal Helpers                    */
/* ---------------------------------- */

function quickSortRecursive<T>(
  arr: T[],
  low: number,
  high: number,
  comparator: Comparator<T>
): void {
  if (low < high) {
    const pivotIndex = partition(arr, low, high, comparator);
    quickSortRecursive(arr, low, pivotIndex - 1, comparator);
    quickSortRecursive(arr, pivotIndex + 1, high, comparator);
  }
}

function partition<T>(
  arr: T[],
  low: number,
  high: number,
  comparator: Comparator<T>
): number {
  const pivot = arr[high];
  let i = low;

  for (let j = low; j < high; j++) {
    if (comparator(arr[j], pivot) <= 0) {
      swap(arr, i, j);
      i++;
    }
  }

  swap(arr, i, high);
  return i;
}

function swap<T>(arr: T[], i: number, j: number): void {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}
