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

#### Operations & Time Complexity

| Operation   | Complexity | Notes                          |
|------------|------------|--------------------------------|
| push       | O(1)*       | Amortized                      |
| pop        | O(1)        |                                |
| insertAt  | O(n)        | Shift required                 |
| removeAt  | O(n)        | Shift required                 |
| get        | O(1)        | Index access                   |
| set        | O(1)        | Index update                   |
| size       | O(1)        |                                |
| isEmpty    | O(1)        |                                |
| iteration  | O(n)        | for...of                       |

#### Example

```ts
const arr = new DynamicArray<number>();

arr.push(10);
arr.push(20);
arr.push(30);
arr.insertAt(1, 15);
arr.removeAt(2);
arr.set(1, 99);

console.log(arr.get(1));
console.log(arr.size());
console.log(arr.isEmpty());

for (const value of arr) {
  console.log(value);
}
```

---

## Caches

### LRU Cache

Least Recently Used cache using HashMap + Doubly Linked List.

#### Operations & Time Complexity

| Operation | Complexity |
|----------|------------|
| get      | O(1)        |
| put      | O(1)        |
| has      | O(1)        |
| size     | O(1)        |
| clear    | O(1)        |

#### Example

```ts
const cache = new LRUCache<string, number>(2);

cache.put('a', 1);
cache.put('b', 2);

cache.get('a');
cache.put('c', 3);

console.log(cache.has('b'));
console.log(cache.size());
```

---

## Linked Lists

### Singly Linked List

#### Operations & Time Complexity

| Operation    | Complexity |
|-------------|------------|
| prepend     | O(1)        |
| append      | O(1)        |
| insertAt    | O(n)        |
| removeAt    | O(n)        |
| removeHead  | O(1)        |
| removeTail  | O(n)        |
| iteration   | O(n)        |

#### Example

```ts
const list = new SinglyLinkedList<number>();

list.prepend(1);
list.append(2);
list.append(3);
list.insertAt(1, 10);
list.removeAt(2);
list.removeHead();
list.append(5);

for (const node of list) {
  console.log(node.value);
}
```

---

### Doubly Linked List

#### Operations & Time Complexity

| Operation    | Complexity |
|-------------|------------|
| prepend     | O(1)        |
| append      | O(1)        |
| insertAt    | O(n)        |
| removeAt    | O(n)        |
| removeHead  | O(1)        |
| removeTail  | O(1)        |
| iteration   | O(n)        |

#### Example

```ts
const list = new DoublyLinkedList<number>();

list.append(10);
list.append(20);
list.prepend(5);
list.insertAt(1, 7);
list.removeTail();
list.removeHead();

for (const node of list) {
  console.log(node.value);
}
```

---

### Circular Singly Linked List

#### Operations & Time Complexity

| Operation    | Complexity |
|-------------|------------|
| prepend     | O(1)        |
| append      | O(1)        |
| insertAt    | O(n)        |
| removeAt    | O(n)        |
| removeHead  | O(1)        |
| removeTail  | O(n)        |
| iteration   | O(n)        |

#### Example

```ts
const list = new CircularSinglyLinkedList<number>();

list.append(1);
list.append(2);
list.append(3);
list.insertAt(1, 10);
list.removeAt(2);

for (const node of list) {
  console.log(node.value);
}
```

---

### Circular Doubly Linked List

#### Operations & Time Complexity

| Operation    | Complexity |
|-------------|------------|
| prepend     | O(1)        |
| append      | O(1)        |
| insertAt    | O(n)        |
| removeAt    | O(n)        |
| removeHead  | O(1)        |
| removeTail  | O(1)        |
| iteration   | O(n)        |

#### Example

```ts
const list = new CircularDoublyLinkedList<number>();

list.append(100);
list.append(200);
list.prepend(50);
list.insertAt(1, 75);
list.removeAt(2);

for (const node of list) {
  console.log(node.value);
}
```

---

## Queues

### Queue (FIFO)

#### Operations & Time Complexity

| Operation | Complexity |
|----------|------------|
| enqueue  | O(1)        |
| dequeue  | O(1)        |
| peek     | O(1)        |
| size     | O(1)        |
| iteration| O(n)        |

#### Example

```ts
const queue = new Queue<number>();

queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.dequeue();

console.log(queue.peek());

for (const value of queue) {
  console.log(value);
}
```

---

### Deque

#### Operations & Time Complexity

| Operation     | Complexity |
|--------------|------------|
| addFront     | O(1)        |
| addRear      | O(1)        |
| removeFront  | O(1)        |
| removeRear   | O(1)        |
| iteration    | O(n)        |

#### Example

```ts
const deque = new Deque<number>();

deque.addFront(1);
deque.addRear(2);
deque.addFront(0);
deque.removeRear();

for (const value of deque) {
  console.log(value);
}
```

---

### Priority Queue

#### Operations & Time Complexity

| Operation | Complexity |
|----------|------------|
| enqueue  | O(log n)    |
| dequeue  | O(log n)    |
| peek     | O(1)        |
| size     | O(1)        |

#### Example

```ts
const pq = new PriorityQueue<number>((a, b) => a - b);

pq.enqueue(20);
pq.enqueue(5);
pq.enqueue(10);

console.log(pq.peek());
console.log(pq.dequeue());

for (const value of pq) {
  console.log(value);
}
```

---

## Stack

### Stack (LIFO)

#### Operations & Time Complexity

| Operation | Complexity |
|----------|------------|
| push     | O(1)        |
| pop      | O(1)        |
| peek     | O(1)        |
| iteration| O(n)        |

#### Example

```ts
const stack = new Stack<number>();

stack.push(1);
stack.push(2);
stack.push(3);
stack.pop();

console.log(stack.peek());

for (const value of stack) {
  console.log(value);
}
```
---

## Heaps

### Binary Heap

A Binary Heap is a complete binary tree stored as an array.
It is the foundation for Priority Queue, scheduling systems, and graph algorithms.

#### Operations & Time Complexity

| Operation | Complexity |
| --------- | ---------- |
| insert    | O(log n)   |
| extract   | O(log n)   |
| peek      | O(1)       |
| size      | O(1)       |

---

### Min Heap

In a Min Heap, the smallest element always stays at the root.

#### Example

```ts
const minHeap = new MinHeap<number>();

minHeap.insert(10);
minHeap.insert(5);
minHeap.insert(20);

console.log(minHeap.peek());
console.log(minHeap.extract());

for (const value of minHeap) {
  console.log(value);
}

```

---

### Max Heap

In a Max Heap, the largest element always stays at the root.

#### Example

```ts
const maxHeap = new MaxHeap<number>();

maxHeap.insert(10);
maxHeap.insert(5);
maxHeap.insert(20);

console.log(maxHeap.peek());
console.log(maxHeap.extract());

```

---

## Utilities

### Comparator

#### Operations & Complexity

| Operation     | Complexity |
|--------------|------------|
| compare       | O(1)        |
| equal        | O(1)        |
| lessThan     | O(1)        |
| greaterThan  | O(1)        |

#### Example

```ts
const comparator = new Comparator<number>((a, b) => a - b);

console.log(comparator.lessThan(1, 2));
console.log(comparator.greaterThan(5, 3));
console.log(comparator.equal(10, 10));
```


