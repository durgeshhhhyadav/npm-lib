/**
 * IndexedHeapSort
 * ================
 *
 * A **stable, heap-based sorting algorithm** implemented using the
 * **index-decoration technique**.
 *
 */

export function indexedHeapSort<T>(
  array: T[],
  compare: (a: T, b: T) => number
): T[] {
  if (array.length <= 1) return [...array];

  /**
   * Step 1: Decorate elements with original index
   * ---------------------------------------------
   * This is the key step that enables stability.
   */
  const heap: Array<{ value: T; index: number }> = array.map(
    (value, index) => ({ value, index })
  );

  /**
   * - Compare values first
   * - If equal, compare original indices
   */
  const stableCompare = (
    a: { value: T; index: number },
    b: { value: T; index: number }
  ): number => {
    const result = compare(a.value, b.value);
    return result !== 0 ? result : a.index - b.index;
  };

  /**
   * Step 3: Build Max Heap
   */
  buildMaxHeap(heap, stableCompare);

  /**
   * Step 4: Heap Sort process
   */
  for (let end = heap.length - 1; end > 0; end--) {
    swap(heap, 0, end);
    heapify(heap, 0, end, stableCompare);
  }

  /**
   * ---------------------------
   * Return only sorted values
   */
  return heap.map(item => item.value);
}

/* ============================================================
 * Heap Utilities
 * ============================================================
 */

/**
 * Builds a max heap from an array
 */
function buildMaxHeap<T>(
  heap: T[],
  compare: (a: T, b: T) => number
): void {
  const startIndex = Math.floor(heap.length / 2) - 1;
  for (let i = startIndex; i >= 0; i--) {
    heapify(heap, i, heap.length, compare);
  }
}

/**
 * Maintains heap property for a subtree
 */
function heapify<T>(
  heap: T[],
  index: number,
  heapSize: number,
  compare: (a: T, b: T) => number
): void {
  let largest = index;
  const left = 2 * index + 1;
  const right = 2 * index + 2;

  if (left < heapSize && compare(heap[left], heap[largest]) > 0) {
    largest = left;
  }

  if (right < heapSize && compare(heap[right], heap[largest]) > 0) {
    largest = right;
  }

  if (largest !== index) {
    swap(heap, index, largest);
    heapify(heap, largest, heapSize, compare);
  }
}

/**
 * Swaps two elements in an array
 */
function swap<T>(arr: T[], i: number, j: number): void {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}