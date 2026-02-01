/**
 * Merge Sort
 * ==========================
 * Stable, comparison-based sorting algorithm.
 *
 * Time Complexity:
 * - Best:    O(n log n)
 * - Average: O(n log n)
 * - Worst:   O(n log n)
 *
 * Space Complexity:
 * - O(n)
 *
 * Features:
 * - Stable sort
 * - Works with any data type
 * - Supports custom comparator
 * - Does NOT mutate original array
 */

export type Comparator<T> = (a: T, b: T) => number;

/**
 * Default comparator
 * Works for number, string, boolean
 */
function defaultComparator<T>(a: T, b: T): number {
  if (a === b) return 0;
  return a > b ? 1 : -1;
}

/**
 * Merge Sort implementation
 *
 * @param array Input array (any type)
 * @param comparator Optional comparison function
 * @returns New sorted array
 *
 * @example
 * mergeSort([3, 1, 2])
 *
 * @example
 * mergeSort(users, (a, b) => a.age - b.age)
 */
export function mergeSort<T>(
  array: readonly T[],
  comparator: Comparator<T> = defaultComparator
): T[] {
  if (array.length <= 1) {
    return [...array];
  }

  const mid = Math.floor(array.length / 2);

  const left = mergeSort(array.slice(0, mid), comparator);
  const right = mergeSort(array.slice(mid), comparator);

  return merge(left, right, comparator);
}

/* ---------------------------------- */
/* Internal Helper                     */
/* ---------------------------------- */

function merge<T>(
  left: T[],
  right: T[],
  comparator: Comparator<T>
): T[] {
  const result: T[] = [];

  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (comparator(left[i], right[j]) <= 0) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  // Remaining elements
  while (i < left.length) result.push(left[i++]);
  while (j < right.length) result.push(right[j++]);

  return result;
}
