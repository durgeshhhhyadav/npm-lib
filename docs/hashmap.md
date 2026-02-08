# HashMap Documentation

This document provides **clear, commented coding examples** for the `HashMap`
implementation in `@core-ops/core`.

All examples include **Expected Output** so behavior can be easily verified.

---

## 1. Basic Set & Get

```ts
import { HashMap } from '@core-ops/core';

const map = new HashMap<string, number>();

map.set('a', 1);
map.set('b', 2);

console.log(map.get('a')); 
// Expected output: 1

console.log(map.get('b')); 
// Expected output: 2
```

---

## 2. Update Existing Key

```ts
map.set('a', 10);

console.log(map.get('a')); 
// Expected output: 10
```

---

## 3. has() Method

```ts
console.log(map.has('a')); 
// Expected output: true

console.log(map.has('z')); 
// Expected output: false
```

---

## 4. delete() Method

```ts
map.delete('b');

console.log(map.has('b')); 
// Expected output: false

console.log(map.size()); 
// Expected output: 1
```

---

## 5. Handling Undefined Safely

```ts
const value = map.get('missing');

if (value === undefined) {
  console.log('Key not found');
}
// Expected output: Key not found
```

---

## 6. keys(), values(), entries()

```ts
map.set('x', 100);
map.set('y', 200);

console.log(map.keys());   
// Expected output: ['a', 'x', 'y']

console.log(map.values()); 
// Expected output: [10, 100, 200]

console.log(map.entries()); 
// Expected output:
// [
//   ['a', 10],
//   ['x', 100],
//   ['y', 200]
// ]
```

---

## 7. Iteration (for...of)

```ts
for (const [key, value] of map) {
  console.log(key, value);
}
// Expected output:
// a 10
// x 100
// y 200
```

---

## 8. Object Keys (Reference-Based)

```ts
const objMap = new HashMap<object, string>();

const user1 = { id: 1 };
const user2 = { id: 1 };

objMap.set(user1, 'Admin');

console.log(objMap.get(user1)); 
// Expected output: 'Admin'

console.log(objMap.get(user2)); 
// Expected output: undefined
// Note: Different object references
```

---

## 9. Custom Hash Function (Advanced)

```ts
type User = { id: number };

const hashById = (user: User) => user.id;

const userMap = new HashMap<User, string>(16, hashById);

userMap.set({ id: 1 }, 'Alice');
userMap.set({ id: 2 }, 'Bob');

console.log(userMap.get({ id: 1 }));
// Expected output: 'Alice'
// Note: Hash function allows logical equality
```

---

## 10. Collision Handling (Separate Chaining)

```ts
const collisionMap = new HashMap<number, string>(2);

collisionMap.set(1, 'one');
collisionMap.set(3, 'three'); // Likely collision

console.log(collisionMap.get(1)); 
// Expected output: 'one'

console.log(collisionMap.get(3)); 
// Expected output: 'three'
```

---

## 11. clear() Method

```ts
map.clear();

console.log(map.size()); 
// Expected output: 0

console.log(map.isEmpty()); 
// Expected output: true
```

---

## 12. Performance / Stress Test

```ts
const bigMap = new HashMap<number, number>();

for (let i = 0; i < 100_000; i++) {
  bigMap.set(i, i * 2);
}

console.log(bigMap.get(99999)); 
// Expected output: 199998

console.log(bigMap.size()); 
// Expected output: 100000
```

---

## Summary

✔ Generic & type-safe  
✔ Collision-safe (Separate Chaining)  
✔ Iteration support  
✔ Custom hashing  
✔ Production-ready behavior  

