# Core Ops – High-Performance Data Structures for TypeScript

**Core Ops** is a fast, predictable, and fully typed data structures library written in TypeScript.  
It is designed for real-world frontend and backend usage.

All data structures in this library are fully implemented, **working perfectly**, with documented time complexity and iterable support.

**Development is ongoing**, and I will continue to expand the library with more data structures and utilities in future releases.

If you encounter any issues, have suggestions, or ideas for improvement, please feel free to report them at [durgeshhhhyadav@gmail.com](mailto:durgeshhhhyadav@gmail.com).



## Installation

```bash
npm install @core-ops/core
```

## Arrays

### Dynamic Array

A dynamic array with automatic resizing (no fixed capacity).

## Dynamic Array

### Operations, Time & Space Complexity

| Operation   | Time Complexity | Space Complexity | Notes                                   |
|------------|-----------------|------------------|-----------------------------------------|
| push       | O(1)*            | O(n)             | Amortized, resize may occur             |
| pop        | O(1)             | O(n)             | Shrinks when size ≤ capacity / 4        |
| insertAt  | O(n)             | O(n)             | Shift elements                          |
| removeAt  | O(n)             | O(n)             | Shift elements                          |
| get        | O(1)             | O(1)             | Direct index access                     |
| set        | O(1)             | O(1)             | Direct index update                     |
| size       | O(1)             | O(1)             | Stored internally                       |
| isEmpty    | O(1)             | O(1)             | Size check                              |
| iteration  | O(n)             | O(1)             | Generator-based, no extra storage       |



#### Example

```ts
  import { DynamicArray } from '@core-ops/core';

  const arr = new DynamicArray<number>();

  arr.push(10);          // [10]
  arr.push(20);          // [10, 20]
  arr.push(30);          // [10, 20, 30]

  arr.insertAt(1, 15);   // [10, 15, 20, 30]
  arr.removeAt(2);       // [10, 15, 30]
  arr.set(1, 99);        // [10, 99, 30]

  console.log(arr.get(1));     // 99
  console.log(arr.size);     // 3
  console.log(arr.isEmpty);  // false

  for (const value of arr) {
    console.log(value);        // 10, then 99, then 30
  }
```

---

---

## Linked Lists

### Singly Linked List

A linear data structure where each element (node) points to the next node in the sequence.

#### Operations, Time & Space Complexity

| Operation    | Time Complexity | Space Complexity | Notes                          |
|-------------|-----------------|------------------|--------------------------------|
| prepend     | O(1)             | O(1)             | Insert at head                 |
| append      | O(1)             | O(1)             | Tail pointer maintained        |
| insertAt    | O(n)             | O(1)             | Traversal required             |
| removeAt    | O(n)             | O(1)             | Traversal required             |
| removeHead  | O(1)             | O(1)             | Update head reference          |
| removeTail  | O(n)             | O(1)             | Traverse to previous node      |
| iteration   | O(n)             | O(1)             | No extra memory                |

**Overall Space Complexity:** `O(n)` where `n` is the number of nodes


#### Example

```ts
import { SinglyLinkedList } from '@core-ops/core';

const list = new SinglyLinkedList<number>();

list.prepend(1);        // [1]
list.append(2);         // [1 → 2]
list.append(3);         // [1 → 2 → 3]

list.insertAt(1, 10);   // [1 → 10 → 2 → 3]
list.removeAt(2);       // [1 → 10 → 3]

list.removeHead();      // [10 → 3]
list.append(5);         // [10 → 3 → 5]

for (const node of list) {
  console.log(node.value); // 10, then 3, then 5
}

```

---

### Doubly Linked List

A linear data structure where each node maintains references to both the **previous** and **next** nodes, allowing bidirectional traversal.

#### Operations, Time & Space Complexity

| Operation    | Time Complexity | Space Complexity | Notes                                |
|-------------|-----------------|------------------|--------------------------------------|
| prepend     | O(1)             | O(1)             | Insert at head                       |
| append      | O(1)             | O(1)             | Insert at tail                       |
| insertAt    | O(n)             | O(1)             | Traverse to index                    |
| removeAt    | O(n)             | O(1)             | Traverse to index                    |
| removeHead  | O(1)             | O(1)             | Update head & backward link          |
| removeTail  | O(1)             | O(1)             | Update tail & forward link           |
| iteration   | O(n)             | O(1)             | Forward or backward traversal        |

**Overall Space Complexity:** `O(n)` where `n` is the number of nodes


#### Example

```ts
import { DoublyLinkedList } from '@core-ops/core';

const list = new DoublyLinkedList<number>();

list.append(10);        // [10]
list.append(20);        // [10 ↔ 20]

list.prepend(5);        // [5 ↔ 10 ↔ 20]
list.insertAt(1, 7);    // [5 ↔ 7 ↔ 10 ↔ 20]

list.removeTail();      // [5 ↔ 7 ↔ 10]
list.removeHead();      // [7 ↔ 10]

for (const node of list) {
  console.log(node.value); // 7, then 10
}

```

---

### Circular Singly Linked List

A variant of the singly linked list where the **last node points back to the head**, forming a circular structure.  
There is **no null reference** at the end of the list.

#### Operations, Time & Space Complexity

| Operation    | Time Complexity | Space Complexity | Notes                                      |
|-------------|-----------------|------------------|--------------------------------------------|
| prepend     | O(1)             | O(1)             | Update head & tail link                    |
| append      | O(1)             | O(1)             | Tail points back to head                   |
| insertAt    | O(n)             | O(1)             | Requires traversal                         |
| removeAt    | O(n)             | O(1)             | Requires traversal                         |
| removeHead  | O(1)             | O(1)             | Move head and update tail link             |
| removeTail  | O(n)             | O(1)             | No backward pointer                        |
| iteration   | O(n)             | O(1)             | Stop after full cycle                      |

**Overall Space Complexity:** `O(n)` where `n` is the number of nodes


#### Example

```ts
import { CircularSinglyLinkedList } from '@core-ops/core';

const list = new CircularSinglyLinkedList<number>();

list.append(1);          // [1] → (back to 1)
list.append(2);          // [1 → 2] → (back to 1)
list.append(3);          // [1 → 2 → 3] → (back to 1)

list.insertAt(1, 10);    // [1 → 10 → 2 → 3] → (back to 1)
list.removeAt(2);        // [1 → 10 → 3] → (back to 1)

for (const node of list) {
  console.log(node.value); // 1, then 10, then 3
}

```

---

### Circular Doubly Linked List

A doubly linked list where **both ends are connected**:
- `head.prev → tail`
- `tail.next → head`

This creates a **bidirectional circular structure** with no `null` pointers.

#### Operations, Time & Space Complexity

| Operation    | Time Complexity | Space Complexity | Notes                                        |
|-------------|-----------------|------------------|----------------------------------------------|
| prepend     | O(1)             | O(1)             | Update head and circular links               |
| append      | O(1)             | O(1)             | Update tail and circular links               |
| insertAt    | O(n)             | O(1)             | Traversal required                           |
| removeAt    | O(n)             | O(1)             | Traversal required                           |
| removeHead  | O(1)             | O(1)             | Direct access via head                       |
| removeTail  | O(1)             | O(1)             | Direct access via tail                       |
| iteration   | O(n)             | O(1)             | Stop after full cycle                        |

**Overall Space Complexity:** `O(n)` where `n` is the number of nodes


#### Example

```ts
import { CircularDoublyLinkedList } from '@core-ops/core';

const list = new CircularDoublyLinkedList<number>();

list.append(100);        // [100] ↔ (back to 100)
list.append(200);        // [100 ↔ 200] ↔ (back to 100)
list.prepend(50);        // [50 ↔ 100 ↔ 200] ↔ (back to 50)

list.insertAt(1, 75);    // [50 ↔ 75 ↔ 100 ↔ 200] ↔ (back to 50)
list.removeAt(2);        // [50 ↔ 75 ↔ 200] ↔ (back to 50)

for (const node of list) {
  console.log(node.value); // 50, then 75, then 200
}

```

---

## Queues

### Queue (FIFO)

A **First-In-First-Out (FIFO)** data structure where elements are processed
in the same order they are added.

This implementation is optimized for:
- O(1) enqueue
- O(1) dequeue
- Iterable support (`for...of`)

#### Operations, Time & Space Complexity

| Operation  | Time Complexity | Space Complexity | Notes                              |
|-----------|-----------------|------------------|------------------------------------|
| enqueue   | O(1)             | O(1)             | Add element to the rear            |
| dequeue   | O(1)             | O(1)             | Remove element from the front      |
| peek      | O(1)             | O(1)             | View front element without removal|
| size      | O(1)             | O(1)             | Stored size counter                |
| iteration | O(n)             | O(1)             | Sequential traversal               |

**Overall Space Complexity:** `O(n)` where `n` is the number of elements

#### Example

```ts
import { Queue } from '@core-ops/core';

const queue = new Queue<number>();

queue.enqueue(1);   // Queue: [1]
queue.enqueue(2);   // Queue: [1, 2]
queue.enqueue(3);   // Queue: [1, 2, 3]

queue.dequeue();    // Removes 1 → Queue: [2, 3]

console.log(queue.peek()); // 2

for (const value of queue) {
  console.log(value);      // 2, then 3
}

```

---

### Deque

A **Double-Ended Queue (Deque)** allows insertion and removal
from **both the front and rear** of the structure.

This implementation provides:
- O(1) operations at both ends
- Iterable support (`for...of`)
- Predictable performance

#### Operations, Time & Space Complexity

| Operation     | Time Complexity | Space Complexity | Notes                              |
|--------------|-----------------|------------------|------------------------------------|
| addFront     | O(1)             | O(1)             | Insert element at front            |
| addRear      | O(1)             | O(1)             | Insert element at rear             |
| removeFront  | O(1)             | O(1)             | Remove element from front          |
| removeRear   | O(1)             | O(1)             | Remove element from rear           |
| iteration    | O(n)             | O(1)             | Sequential traversal               |

**Overall Space Complexity:** `O(n)` where `n` is the number of elements


#### Example

```ts
import { Deque } from '@core-ops/core';

const deque = new Deque<number>();

deque.addFront(1);   // Deque: [1]
deque.addRear(2);    // Deque: [1, 2]
deque.addFront(0);   // Deque: [0, 1, 2]
deque.removeRear();  // Removes 2 → Deque: [0, 1]

for (const value of deque) {
  console.log(value);
}
// Output:
// 0
// 1

```

---

### Priority Queue (Heap-Based)

A **Priority Queue** is a specialized queue where each element is associated
with a priority.  
Elements with **higher priority are dequeued before lower priority ones**.

This implementation is built using a **Binary Heap**, ensuring predictable
and efficient performance.

Supports:
- Min-Heap (default)
- Max-Heap (via custom comparator)
- Custom priority logic

#### Operations, Time & Space Complexity

| Operation | Time Complexity | Space Complexity | Notes                                 |
|----------|-----------------|------------------|---------------------------------------|
| enqueue  | O(log n)        | O(1)             | Heapify-up on insert                  |
| dequeue  | O(log n)        | O(1)             | Heapify-down on removal               |
| peek     | O(1)            | O(1)             | Access top priority element           |
| size     | O(1)            | O(1)             | Tracked internally                    |
| iteration| O(n)            | O(1)             | Heap order (not sorted order)         |

**Overall Space Complexity:** `O(n)`

#### Example

```ts
import { PriorityQueue } from '@core-ops/core';

const pq = new PriorityQueue<number>((a, b) => a - b); // Min-Heap

pq.enqueue(20); // Heap: [20]
pq.enqueue(5);  // Heap: [5, 20]
pq.enqueue(10); // Heap: [5, 20, 10]

console.log(pq.peek()); 
// Output: 5  (smallest element has highest priority)

console.log(pq.dequeue()); 
// Output: 5  (removed highest priority element)

for (const value of pq) {
  console.log(value);
}
// Output (heap order, not sorted):
// 10
// 20

```

---

## Stack

### Stack (LIFO)

A **Stack** is a linear data structure that follows the
**Last-In, First-Out (LIFO)** principle.

Elements are always added and removed from the **top** of the stack.

This implementation provides:
- Constant time push/pop
- Iterable support (`for...of`)
- Predictable memory usage

#### Operations, Time & Space Complexity

| Operation | Time Complexity | Space Complexity | Notes                         |
|----------|-----------------|------------------|-------------------------------|
| push     | O(1)             | O(1)             | Insert at top                 |
| pop      | O(1)             | O(1)             | Remove from top               |
| peek     | O(1)             | O(1)             | Read top element              |
| iteration| O(n)             | O(1)             | Top → bottom traversal        |

**Overall Space Complexity:** `O(n)`

#### Example

```ts
import { Stack } from '@core-ops/core';

const stack = new Stack<number>();

stack.push(1); // Stack: [1]
stack.push(2); // Stack: [1, 2]
stack.push(3); // Stack: [1, 2, 3]
stack.pop();   // Removes 3 → Stack: [1, 2]

console.log(stack.peek());
// Output: 2  (top element of the stack)

for (const value of stack) {
  console.log(value);
}
// Output (top to bottom or insertion order based on implementation):
// 1
// 2

```
---

## Heaps

### Binary Heap

A **Binary Heap** is a **complete binary tree** stored efficiently in an array.
It maintains the **heap property**:

- **Min Heap** → parent ≤ children
- **Max Heap** → parent ≥ children

Binary Heaps are the **foundation** for:
- Priority Queues
- Scheduling systems
- Heap-based algorithms

This implementation supports:
- Min Heap
- Max Heap
- Custom comparator logic

---

#### Operations, Time & Space Complexity

| Operation | Time Complexity | Space Complexity | Notes                                  |
|----------|-----------------|------------------|----------------------------------------|
| insert   | O(log n)        | O(1)             | Heapify-up                             |
| extract  | O(log n)        | O(1)             | Heapify-down                           |
| peek     | O(1)            | O(1)             | Access root element                    |
| size     | O(1)            | O(1)             | Tracked internally                     |
| iteration| O(n)            | O(1)             | Heap order (not sorted)                |

**Overall Space Complexity:** `O(n)`


#### Example (Min Heap)

```ts
import { BinaryHeap } from '@core-ops/core';

const heap = new BinaryHeap<number>((a, b) => a - b);

heap.insert(20); // Heap contains: [20]
heap.insert(5);  // Heap reorganizes → [5, 20]
heap.insert(10); // Heap reorganizes → [5, 20, 10]

console.log(heap.peek());    
// Output: 5  (minimum element in the heap)

console.log(heap.extract()); 
// Output: 5  (removes and returns the minimum element)

for (const value of heap) {
  console.log(value);
}
// Output: Remaining elements in heap order (not sorted):
// 10
// 20

```

---

### Min Heap

A **Min Heap** is a Binary Heap where the **smallest element always stays at the root**.
Each parent node is **less than or equal to** its children.

Min Heaps are optimized for **fast access to the minimum element**.

---

#### Operations & Time Complexity

| Operation | Time Complexity |
|----------|-----------------|
| insert   | O(log n)        |
| extract  | O(log n)        |
| peek     | O(1)            |
| size     | O(1)            |

---

#### Example

```ts

import { MinHeap } from '@core-ops/core';

const minHeap = new MinHeap<number>();

minHeap.insert(10);
minHeap.insert(5);
minHeap.insert(20);

console.log(minHeap.peek());    // 5
console.log(minHeap.extract()); // 5

minHeap.insert(3);
minHeap.insert(15);

console.log(minHeap.contains(10)); // true
console.log(minHeap.size());       // 3

for (const v of minHeap) {
  console.log(v);
}

minHeap.clear();
console.log(minHeap.isEmpty()); // true


```

---
### Max Heap

In a **Max Heap**, the **largest element always stays at the root**.
Each parent node is **greater than or equal to** its children.

Max Heaps are optimized for **fast access to the maximum element**.

---

#### Operations & Time Complexity

| Operation | Complexity |
|----------|------------|
| insert   | O(log n)   |
| extract  | O(log n)   |
| peek     | O(1)       |
| size    | O(1)       |

---

#### Example

```ts

import { MaxHeap } from '@core-ops/core';

const heap = new MaxHeap<number>();

heap.insert(10);
heap.insert(30);
heap.insert(20);

console.log(heap.peek());     // 30
console.log(heap.extract());  // 30

heap.insert(25);
console.log(heap.contains(10)); // true

console.log(heap.size());    // 3

for (const v of heap) {
  console.log(v);
}

heap.clear();
console.log(heap.isEmpty()); // true


```

---
## Utilities

### Comparator

A **Comparator** provides a unified way to compare two values.
It enables **custom ordering logic** for algorithms and data structures
such as **sorting, heaps, trees, and priority queues**.

---

#### Operations & Complexity

| Operation     | Time | Space | Notes                          |
|--------------|------|-------|--------------------------------|
| compare       | O(1) | O(1)  | User-defined comparison logic  |
| equal        | O(1) | O(1)  | Uses compare internally        |
| lessThan     | O(1) | O(1)  | compare(a, b) < 0              |
| greaterThan  | O(1) | O(1)  | compare(a, b) > 0              |

---
#### Example

```ts
const comparator = new Comparator<number>((a, b) => a - b);

console.log(comparator.lessThan(1, 2));
console.log(comparator.greaterThan(5, 3));
console.log(comparator.equal(10, 10));
```
---
## Caches

### LRU Cache

A **Least Recently Used (LRU) Cache** evicts the least recently accessed item
when the cache reaches its capacity.

This implementation uses a **HashMap + Doubly Linked List** to guarantee
constant-time access, updates, and eviction.

---

#### Why HashMap + Doubly Linked List?

- **HashMap** → O(1) key lookup
- **Doubly Linked List** → O(1) insertion, deletion, and reordering
- Ensures **true LRU behavior** without traversal

---

#### Operations, Time & Space Complexity

| Operation | Time Complexity | Space Complexity |
|----------|-----------------|------------------|
| get      | O(1)             | O(1)             |
| put      | O(1)             | O(1)             |
| has      | O(1)             | O(1)             |
| size     | O(1)             | O(1)             |
| clear    | O(1)             | O(1)             |

**Overall Space Complexity:**  
`O(n)` where `n` is the cache capacity.

---

#### Example

```ts
import { LRUCache } from '@core-ops/core';

const cache = new LRUCache<string, number>(2);

cache.put('a', 1);
cache.put('b', 2);

// Cache state (MRU → LRU): a, b

// Access 'a' → makes it most recently used
cache.get('a');

// Cache state (MRU → LRU): a, b

// Insert 'c' → capacity exceeded, evicts 'b' (least recently used)
cache.put('c', 3);

// 'b' was evicted
console.log(cache.has('b')); // false

// Cache contains only 2 items
console.log(cache.size());   // 2

```
---

## Algorithms Layer

The **Algorithms layer** in Core Ops is designed to provide **production-ready, reusable, and predictable algorithms** that work seamlessly with real-world data such as numbers, strings, and objects.

All algorithms are:
- Generic
- Comparator-based
- Fully documented
- Designed for frontend & backend usage

---

## Sorting Algorithms  
**Stable → Object order is preserved**  
**Unstable → Equal elements may change their relative order**

---

### Merge Sort (Stable)

A classic **stable divide-and-conquer** sorting algorithm that guarantees
consistent performance and preserves the order of equal elements.

---

#### Time & Space Complexity

| Case     | Time Complexity | Space Complexity |
|----------|-----------------|------------------|
| Best     | O(n log n)      | O(n)             |
| Average  | O(n log n)      | O(n)             |
| Worst    | O(n log n)      | O(n)             |

---

#### Characteristics

- **Stable** — preserves relative order of equal elements
- **Predictable performance** — same complexity in all cases
- **Extra memory required** — not in-place
- **Generic support** — works with numbers, strings, and objects
- Comparator-based sorting

---
#### Example

```ts
import { mergeSort } from '@core-ops/core';

// Numbers
const numbers = [5, 3, 5, 2];
const sortedNumbers = mergeSort(numbers);
console.log(sortedNumbers);
// Output: [2, 3, 5, 5]

// Objects (stable)
const users = [
  { id: 1, role: 'admin' },
  { id: 2, role: 'user' },
  { id: 3, role: 'admin' },
];

const sortedUsers = mergeSort(users, (a, b) =>
  a.role.localeCompare(b.role)
);

console.log(sortedUsers);
// Output:
// [
//   { id: 1, role: 'admin' },
//   { id: 3, role: 'admin' },
//   { id: 2, role: 'user' }
// ]
// Note: Merge Sort is STABLE, so objects with the same role ("admin")
// keep their original relative order (id: 1 before id: 3)

```
---

### Quick Sort (Unstable)

A fast **in-place divide-and-conquer** sorting algorithm based on partitioning.
It is one of the most commonly used sorting algorithms in real-world systems
due to its excellent average-case performance.

---

#### Time & Space Complexity

| Case     | Time Complexity | Space Complexity |
|----------|-----------------|------------------|
| Best     | O(n log n)      | O(log n)         |
| Average  | O(n log n)      | O(log n)         |
| Worst    | O(n²)           | O(n)             |

> Worst case occurs when the pivot selection is poor (e.g., already sorted data).

---

#### Characteristics

- **Unstable** — equal elements may change relative order
- **Very fast in practice**
- **In-place sorting** — no extra array required
- **Low memory overhead**
- Comparator-based implementation

---

#### Example

```ts
import { quickSort } from '@core-ops/core';

// Numbers
const numbers = [10, 7, 8, 9, 1, 5];
quickSort(numbers);
console.log(numbers);
// Output: [1, 5, 7, 8, 9, 10]

// Objects (order not guaranteed for equal keys)
const items = [
  { id: 1, score: 90 },
  { id: 2, score: 90 },
  { id: 3, score: 70 },
];

quickSort(items, (a, b) => a.score - b.score);
console.log(items);
// Output (one possible result):
// [
//   { id: 3, score: 70 },
//   { id: 2, score: 90 },
//   { id: 1, score: 90 }
// ]
// Note: Quick Sort is NOT stable, so elements with equal scores (90)
// may change their relative order


```
---

### Heap Sort (Unstable)

A **comparison-based in-place sorting algorithm** that uses a **Binary Heap**
(typically a Max Heap) to sort elements.

Unlike Quick Sort, Heap Sort guarantees **O(n log n)** time complexity
in all cases.

---

#### Time & Space Complexity

| Case     | Time Complexity | Space Complexity |
|----------|-----------------|------------------|
| Best     | O(n log n)      | O(1)             |
| Average  | O(n log n)      | O(1)             |
| Worst    | O(n log n)      | O(1)             |

> Space complexity is **O(1)** because Heap Sort sorts in-place.

---

#### Characteristics

- **Unstable** — equal elements may change relative order
- **In-place sorting**
- **Guaranteed O(n log n)** performance
- No recursion stack required (iterative heapify)
- Comparator-based implementation

#### Example

```ts
import { heapSort } from '@core-ops/core';

// Numbers
const numbers = [12, 11, 13, 5, 6, 7];
heapSort(numbers);
console.log(numbers);
// Output: [5, 6, 7, 11, 12, 13]

// Objects (order of equal elements not preserved)
const users = [
  { id: 1, age: 30 },
  { id: 2, age: 30 },
  { id: 3, age: 25 },
];

heapSort(users, (a, b) => a.age - b.age);
console.log(users);
// Output (one possible result):
// [
//   { id: 3, age: 25 },
//   { id: 2, age: 30 },
//   { id: 1, age: 30 }
// ]
// Note: Heap Sort is NOT stable, so users with the same age (30)
// may change their relative order

```
---

### Indexed Heap Sort (Stable Heap Sort)

A **stable heap-based sorting algorithm** implemented using the
**index-decoration technique**.

This algorithm preserves the original order of equal elements while still
providing **guaranteed O(n log n)** performance.

---

#### Why Indexed Heap Sort?

Standard Heap Sort is **not stable** because equal elements may swap positions.

Indexed Heap Sort guarantees stability by:
- Decorating each element with its **original index**
- Using the index as a **tie-breaker** during heap comparison
- Removing index metadata after sorting

---

#### Time & Space Complexity

| Case     | Time Complexity | Space Complexity |
|----------|-----------------|------------------|
| Best     | O(n log n)      | O(n)             |
| Average  | O(n log n)      | O(n)             |
| Worst    | O(n log n)      | O(n)             |

> Extra space is used to store indices and decorated nodes.

---

#### Characteristics

- **Stable**
- Heap-based
- Deterministic performance
- Comparator-driven
- Consistent behavior across all inputs

#### Example

```ts
import { indexedHeapSort } from '@core-ops/core';

// Numbers (stable behavior)
const values = [5, 3, 5, 2, 3];
indexedHeapSort(values);
console.log(values);
// Output: [2, 3, 3, 5, 5]
// Note: The two `3`s and two `5`s keep their original relative order (stable)

// Objects (stable object sorting)
const users = [
  { id: 1, age: 30 },
  { id: 2, age: 30 },
  { id: 3, age: 25 },
];

indexedHeapSort(users, (a, b) => a.age - b.age);
console.log(users);
// Output:
// [
//   { id: 3, age: 25 },
//   { id: 1, age: 30 },
//   { id: 2, age: 30 }
// ]
// Note: Users with the same age (30) preserve their original order (id: 1 before id: 2)

```

