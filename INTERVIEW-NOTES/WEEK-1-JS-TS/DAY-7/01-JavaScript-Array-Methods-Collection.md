# JAVASCRIPT ARRAY METHODS COLLECTION

--------------------------------

## Complete Reference Guide

यह page सभी JavaScript Array methods का complete collection है। हर method के साथ syntax, example, और use case दिया गया है।

---

## 📚 TABLE OF CONTENTS

1. [Iteration Methods](#iteration-methods)
2. [Transformation Methods](#transformation-methods)
3. [Search Methods](#search-methods)
4. [Modification Methods](#modification-methods)
5. [Reduction Methods](#reduction-methods)
6. [Sorting Methods](#sorting-methods)
7. [Utility Methods](#utility-methods)

---

## ITERATION METHODS

### 1. forEach()

**Syntax:** `array.forEach(callback(currentValue, index, array), thisArg)`

**Description:** Har element par function execute karta hai. Return value nahi deta.

```javascript
const arr = [1, 2, 3];
arr.forEach((item, index) => {
  console.log(item, index);
});
// Output: 1 0, 2 1, 3 2

// Use case: Side effects (logging, DOM updates)
const users = [{ name: 'John' }, { name: 'Jane' }];
users.forEach(user => {
  console.log(user.name);
});
```

**Key Points:**
- Original array modify nahi hota
- Return value undefined
- Break/continue nahi kar sakte
- Side effects ke liye use karo

---

### 2. map()

**Syntax:** `array.map(callback(currentValue, index, array), thisArg)`

**Description:** Har element par function execute karke naya array return karta hai.

```javascript
const numbers = [1, 2, 3];
const doubled = numbers.map(num => num * 2);
// [2, 4, 6]

// Use case: Transform data
const users = [{ name: 'John', age: 30 }, { name: 'Jane', age: 25 }];
const names = users.map(user => user.name);
// ['John', 'Jane']

// Complex transformation
const formatted = users.map(user => ({
  ...user,
  displayName: `${user.name} (${user.age})`
}));
```

**Key Points:**
- Naya array return karta hai
- Original array same rehta hai
- Same length ka array
- Transform data ke liye use karo

---

### 3. filter()

**Syntax:** `array.filter(callback(currentValue, index, array), thisArg)`

**Description:** Condition match karne wale elements ka naya array return karta hai.

```javascript
const numbers = [1, 2, 3, 4, 5];
const evens = numbers.filter(num => num % 2 === 0);
// [2, 4]

// Use case: Filter data
const users = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 },
  { name: 'Bob', age: 35 }
];
const adults = users.filter(user => user.age >= 30);
// [{ name: 'John', age: 30 }, { name: 'Bob', age: 35 }]

// Multiple conditions
const filtered = users.filter(user => 
  user.age >= 30 && user.name.startsWith('J')
);
```

**Key Points:**
- Condition true wale elements return
- Naya array return karta hai
- Length same ya kam ho sakti hai
- Data filtering ke liye use karo

---

### 4. find()

**Syntax:** `array.find(callback(currentValue, index, array), thisArg)`

**Description:** Condition match karne wala pehla element return karta hai.

```javascript
const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 3, name: 'Bob' }
];
const user = users.find(u => u.id === 2);
// { id: 2, name: 'Jane' }

// Not found
const notFound = users.find(u => u.id === 10);
// undefined

// Use case: Find by ID
function getUserById(users, id) {
  return users.find(user => user.id === id);
}
```

**Key Points:**
- Pehla match return karta hai
- Not found par undefined
- Element return karta hai, array nahi
- Single item find karne ke liye

---

### 5. findIndex()

**Syntax:** `array.findIndex(callback(currentValue, index, array), thisArg)`

**Description:** Condition match karne wale element ka index return karta hai.(pahla)

```javascript
const numbers = [10, 20, 30, 40];
const index = numbers.findIndex(num => num > 25);
// 2

// Not found
const notFound = numbers.findIndex(num => num > 100);
// -1

// Use case: Find and update
const users = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];
const index = users.findIndex(u => u.id === 2);
if (index !== -1) {
  users[index].name = 'Jane Updated';
}
```

**Key Points:**
- Index return karta hai
- Not found par -1
- Pehla match ka index
- Element ka position find karne ke liye

---

### 6. some()

**Syntax:** `array.some(callback(currentValue, index, array), thisArg)`

**Description:** Koi bhi element condition match kare to true return karta hai.

```javascript
const numbers = [1, 2, 3, 4, 5];
const hasEven = numbers.some(num => num % 2 === 0);
// true

const allNegative = numbers.some(num => num < 0);
// false

// Use case: Validation
const users = [
  { name: 'John', active: true },
  { name: 'Jane', active: false }
];
const hasActive = users.some(user => user.active);
// true
```

**Key Points:**
- Boolean return karta hai
- Koi bhi match = true
- Koi match nahi = false
- Existence check ke liye

---

### 7. every()

**Syntax:** `array.every(callback(currentValue, index, array), thisArg)`

**Description:** Sab elements condition match kare to true return karta hai.

```javascript
const numbers = [2, 4, 6, 8];
const allEven = numbers.every(num => num % 2 === 0);
// true

const allPositive = numbers.every(num => num > 0);
// true

// Use case: Validation
const users = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 }
];
const allAdults = users.every(user => user.age >= 18);
// true
```

**Key Points:**
- Boolean return karta hai
- Sab match = true
- Koi bhi fail = false
- All check ke liye

---

## TRANSFORMATION METHODS

### 8. reduce()

**Syntax:** `array.reduce(callback(accumulator, currentValue, index, array), initialValue)`

**Description:** Array ko single value mein reduce karta hai.

```javascript
const numbers = [1, 2, 3, 4];
const sum = numbers.reduce((acc, num) => acc + num, 0);
// 10

// Without initial value
const sum2 = numbers.reduce((acc, num) => acc + num);
// 10

// Use case: Group by
const users = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 },
  { name: 'Bob', age: 30 }
];
const grouped = users.reduce((acc, user) => {
  const age = user.age;
  if (!acc[age]) {
    acc[age] = [];
  }
  acc[age].push(user);
  return acc;
}, {});
// { 30: [{...}, {...}], 25: [{...}] }

// Flatten array
const nested = [[1, 2], [3, 4], [5, 6]];
const flat = nested.reduce((acc, arr) => [...acc, ...arr], []);
// [1, 2, 3, 4, 5, 6]
```

**Key Points:**
- Single value return karta hai
- Accumulator maintain karta hai
- Initial value optional
- Complex transformations ke liye

---

### 9. reduceRight()

**Syntax:** `array.reduceRight(callback(accumulator, currentValue, index, array), initialValue)`

**Description:** reduce() jaisa, par right se left process karta hai.

```javascript
const numbers = [1, 2, 3, 4];
const result = numbers.reduceRight((acc, num) => acc - num, 0);
// 0 - 4 - 3 - 2 - 1 = -10

// Use case: Right-to-left operations
const arr = ['a', 'b', 'c'];
const reversed = arr.reduceRight((acc, item) => [...acc, item], []);
// ['c', 'b', 'a']
```

**Key Points:**
- Right to left process
- reduce() ka reverse
- Specific use cases ke liye

---

### 10. flat()

**Syntax:** `array.flat(depth)`

**Description:** Nested arrays ko flatten karta hai.

```javascript
const nested = [1, [2, 3], [4, [5, 6]]];
const flat1 = nested.flat();
// [1, 2, 3, 4, [5, 6]]

const flat2 = nested.flat(2);
// [1, 2, 3, 4, 5, 6]

const flatAll = nested.flat(Infinity);
// [1, 2, 3, 4, 5, 6]

// Use case: Flatten nested data
const data = [[1, 2], [3, 4], [5, 6]];
const flattened = data.flat();
// [1, 2, 3, 4, 5, 6]
```

**Key Points:**
- Depth specify kar sakte hain
- Infinity = all levels
- Nested arrays ke liye

---

### 11. flatMap()

**Syntax:** `array.flatMap(callback(currentValue, index, array), thisArg)`

**Description:** map() + flat(1) combination.

```javascript
const numbers = [1, 2, 3];
const doubled = numbers.flatMap(num => [num, num * 2]);
// [1, 2, 2, 4, 3, 6]

// Use case: Map and flatten
const sentences = ['Hello world', 'How are you'];
const words = sentences.flatMap(sentence => sentence.split(' '));
// ['Hello', 'world', 'How', 'are', 'you']
```

**Key Points:**
- map() + flat(1)
- Efficient combination
- Map and flatten ke liye

---

## SEARCH METHODS

### 12. indexOf()

**Syntax:** `array.indexOf(searchElement, fromIndex)`

**Description:** Element ka pehla index return karta hai.

```javascript
const arr = [1, 2, 3, 2, 4];
const index = arr.indexOf(2);
// 1

const index2 = arr.indexOf(2, 2);
// 3

const notFound = arr.indexOf(10);
// -1

// Use case: Check existence
if (arr.indexOf(3) !== -1) {
  console.log('Found');
}
```

**Key Points:**
- Pehla match ka index
- Not found = -1
- fromIndex se start
- Simple search ke liye

---

### 13. lastIndexOf()

**Syntax:** `array.lastIndexOf(searchElement, fromIndex)`

**Description:** Element ka last index return karta hai.

```javascript
const arr = [1, 2, 3, 2, 4];
const index = arr.lastIndexOf(2);
// 3

const index2 = arr.lastIndexOf(2, 2);
// 1

// Use case: Find last occurrence
const lastIndex = arr.lastIndexOf(2);
```

**Key Points:**
- Last match ka index
- Right to left search
- Not found = -1

---

### 14. includes()

**Syntax:** `array.includes(searchElement, fromIndex)`

**Description:** Element array mein hai ya nahi check karta hai.

```javascript
const arr = [1, 2, 3, 4];
const has = arr.includes(2);
// true

const hasNot = arr.includes(10);
// false

// Use case: Simple existence check
if (arr.includes(3)) {
  console.log('Found');
}
```

**Key Points:**
- Boolean return
- Simple check
- NaN handle karta hai
- Modern alternative to indexOf

---

## MODIFICATION METHODS

### 15. push()

**Syntax:** `array.push(element1, element2, ..., elementN)`

**Description:** End mein elements add karta hai.

```javascript
const arr = [1, 2, 3];
arr.push(4);
// [1, 2, 3, 4]

arr.push(5, 6);
// [1, 2, 3, 4, 5, 6]

// Returns new length
const length = arr.push(7);
// 7
```

**Key Points:**
- End mein add
- Original modify
- New length return
- Multiple elements add

---

### 16. pop()

**Syntax:** `array.pop()`

**Description:** Last element remove karta hai.

```javascript
const arr = [1, 2, 3];
const last = arr.pop();
// last = 3, arr = [1, 2]

// Empty array
const empty = [];
const result = empty.pop();
// undefined
```

**Key Points:**
- Last element remove
- Removed element return
- Empty = undefined
- Stack operations ke liye

---

### 17. shift()

**Syntax:** `array.shift()`

**Description:** First element remove karta hai.

```javascript
const arr = [1, 2, 3];
const first = arr.shift();
// first = 1, arr = [2, 3]

// Use case: Queue operations
const queue = [1, 2, 3];
queue.shift(); // Remove first
```

**Key Points:**
- First element remove
- Removed element return
- Slow operation (reindexing)
- Queue ke liye

---

### 18. unshift()

**Syntax:** `array.unshift(element1, element2, ..., elementN)`

**Description:** Start mein elements add karta hai.

```javascript
const arr = [2, 3];
arr.unshift(1);
// [1, 2, 3]

arr.unshift(0, -1);
// [-1, 0, 1, 2, 3]

// Returns new length
const length = arr.unshift(-2);
```

**Key Points:**
- Start mein add
- Original modify
- Slow operation
- New length return

---

### 19. splice()

**Syntax:** `array.splice(start, deleteCount, item1, item2, ..., itemN)`

**Description:** Elements add/remove karta hai.

```javascript
const arr = [1, 2, 3, 4, 5];

// Remove elements
arr.splice(1, 2);
// arr = [1, 4, 5] (removed 2, 3)

// Add elements
arr.splice(1, 0, 2, 3);
// arr = [1, 2, 3, 4, 5]

// Replace elements
arr.splice(1, 2, 20, 30);
// arr = [1, 20, 30, 4, 5]

// Returns removed elements
const removed = arr.splice(0, 2);
// removed = [1, 20]
```

**Key Points:**
- Add/remove/replace
- Original modify
- Removed elements return
- Flexible operation

---

### 20. slice()

**Syntax:** `array.slice(start, end)`

**Description:** Array ka portion return karta hai (copy).

```javascript
const arr = [1, 2, 3, 4, 5];

const portion = arr.slice(1, 3);
// [2, 3] (original unchanged)

const fromStart = arr.slice(2);
// [3, 4, 5]

const copy = arr.slice();
// [1, 2, 3, 4, 5] (full copy)

// Negative indices
const lastTwo = arr.slice(-2);
// [4, 5]
```

**Key Points:**
- Copy return karta hai
- Original unchanged
- Start/end indices
- Array copy ke liye

---

### 21. concat()

**Syntax:** `array.concat(value1, value2, ..., valueN)`

**Description:** Arrays ko combine karta hai.

```javascript
const arr1 = [1, 2];
const arr2 = [3, 4];
const combined = arr1.concat(arr2);
// [1, 2, 3, 4]

// Multiple arrays
const arr3 = [5, 6];
const all = arr1.concat(arr2, arr3);
// [1, 2, 3, 4, 5, 6]

// With spread operator (modern)
const modern = [...arr1, ...arr2];
// [1, 2, 3, 4]
```

**Key Points:**
- Naya array return
- Original unchanged
- Multiple arrays combine
- Spread operator alternative

---

## SORTING METHODS

### 22. sort()

**Syntax:** `array.sort(compareFunction)`

**Description:** Array ko sort karta hai (in-place).

```javascript
const numbers = [3, 1, 4, 1, 5];
numbers.sort();
// [1, 1, 3, 4, 5] (string sort by default!)

// Numeric sort
numbers.sort((a, b) => a - b);
// [1, 1, 3, 4, 5]

// Descending
numbers.sort((a, b) => b - a);
// [5, 4, 3, 1, 1]

// Object sort
const users = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 }
];
users.sort((a, b) => a.age - b.age);
// Sorted by age
```

**Key Points:**
- In-place sort
- Original modify
- Compare function important
- Default string sort

---

### 23. reverse()

**Syntax:** `array.reverse()`

**Description:** Array ko reverse karta hai (in-place).

```javascript
const arr = [1, 2, 3, 4];
arr.reverse();
// [4, 3, 2, 1]

// Original modified
console.log(arr);
// [4, 3, 2, 1]
```

**Key Points:**
- In-place reverse
- Original modify
- Simple operation

---

## UTILITY METHODS

### 24. join()

**Syntax:** `array.join(separator)`

**Description:** Array ko string mein convert karta hai.

```javascript
const arr = [1, 2, 3];
const str = arr.join(',');
// '1,2,3'

const str2 = arr.join('-');
// '1-2-3'

const str3 = arr.join('');
// '123'

// Default separator is comma
const defaultStr = arr.join();
// '1,2,3'
```

**Key Points:**
- String return
- Separator specify
- Default = comma
- Array to string conversion

---

### 25. toString()

**Syntax:** `array.toString()`

**Description:** Array ko string mein convert karta hai (comma-separated).

```javascript
const arr = [1, 2, 3];
const str = arr.toString();
// '1,2,3'

// Same as join(',')
const same = arr.join(',');
// '1,2,3'
```

**Key Points:**
- String return
- Comma-separated
- join(',') jaisa

---

### 26. toLocaleString()

**Syntax:** `array.toLocaleString(locales, options)`

**Description:** Locale-specific string representation.

```javascript
const numbers = [1234.56, 5678.90];
const str = numbers.toLocaleString('en-US');
// '1,234.56,5,678.9'

const date = [new Date()];
const dateStr = date.toLocaleString('en-US');
// Locale-specific date format
```

**Key Points:**
- Locale-specific
- Formatting options
- Internationalization

---

### 27. fill()

**Syntax:** `array.fill(value, start, end)`

**Description:** Array ko value se fill karta hai.

```javascript
const arr = new Array(5);
arr.fill(0);
// [0, 0, 0, 0, 0]

const arr2 = [1, 2, 3, 4, 5];
arr2.fill(0, 2, 4);
// [1, 2, 0, 0, 5]

// Use case: Initialize array
const zeros = new Array(10).fill(0);
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
```

**Key Points:**
- In-place fill
- Start/end indices
- Array initialization

---

### 28. copyWithin()

**Syntax:** `array.copyWithin(target, start, end)`

**Description:** Array ke elements ko copy karta hai (in-place).

```javascript
const arr = [1, 2, 3, 4, 5];
arr.copyWithin(0, 3);
// [4, 5, 3, 4, 5]

const arr2 = [1, 2, 3, 4, 5];
arr2.copyWithin(0, 3, 4);
// [4, 2, 3, 4, 5]
```

**Key Points:**
- In-place copy
- Complex operation
- Specific use cases

---

### 29. keys()

**Syntax:** `array.keys()`

**Description:** Array indices ka iterator return karta hai.

```javascript
const arr = ['a', 'b', 'c'];
const keys = arr.keys();

for (const key of keys) {
  console.log(key);
}
// 0, 1, 2

// Convert to array
const keysArray = [...arr.keys()];
// [0, 1, 2]
```

**Key Points:**
- Iterator return
- Indices return
- Iteration ke liye

---

### 30. values()

**Syntax:** `array.values()`

**Description:** Array values ka iterator return karta hai.

```javascript
const arr = ['a', 'b', 'c'];
const values = arr.values();

for (const value of values) {
  console.log(value);
}
// 'a', 'b', 'c'

// Convert to array
const valuesArray = [...arr.values()];
// ['a', 'b', 'c']
```

**Key Points:**
- Iterator return
- Values return
- Iteration ke liye

---

### 31. entries()

**Syntax:** `array.entries()`

**Description:** [index, value] pairs ka iterator return karta hai.

```javascript
const arr = ['a', 'b', 'c'];
const entries = arr.entries();

for (const [index, value] of entries) {
  console.log(index, value);
}
// 0 'a', 1 'b', 2 'c'

// Convert to array
const entriesArray = [...arr.entries()];
// [[0, 'a'], [1, 'b'], [2, 'c']]
```

**Key Points:**
- Iterator return
- [index, value] pairs
- Destructuring ke liye

---

### 32. Array.from()

**Syntax:** `Array.from(arrayLike, mapFn, thisArg)`

**Description:** Array-like object se array banata hai.

```javascript
// From string
const str = 'hello';
const arr = Array.from(str);
// ['h', 'e', 'l', 'l', 'o']

// From Set
const set = new Set([1, 2, 3]);
const arr2 = Array.from(set);
// [1, 2, 3]

// With map function
const arr3 = Array.from([1, 2, 3], x => x * 2);
// [2, 4, 6]

// From arguments
function example() {
  return Array.from(arguments);
}
example(1, 2, 3);
// [1, 2, 3]
```

**Key Points:**
- Array-like to array
- Map function optional
- Useful conversion

---

### 33. Array.isArray()

**Syntax:** `Array.isArray(value)`

**Description:** Check karta hai ki value array hai ya nahi.

```javascript
Array.isArray([1, 2, 3]);
// true

Array.isArray('not array');
// false

Array.isArray({});
// false

// Use case: Type checking
function process(data) {
  if (Array.isArray(data)) {
    return data.map(item => item * 2);
  }
  return data;
}
```

**Key Points:**
- Boolean return
- Type checking
- Reliable method

---

## 📊 QUICK REFERENCE TABLE

| Method | Returns | Modifies Original | Use Case |
|--------|---------|------------------|----------|
| forEach | undefined | No | Side effects |
| map | New array | No | Transform |
| filter | New array | No | Filter |
| find | Element/undefined | No | Find one |
| findIndex | Index/-1 | No | Find index |
| some | Boolean | No | Any match |
| every | Boolean | No | All match |
| reduce | Single value | No | Accumulate |
| flat | New array | No | Flatten |
| push | Length | Yes | Add end |
| pop | Element | Yes | Remove end |
| shift | Element | Yes | Remove start |
| unshift | Length | Yes | Add start |
| splice | Removed array | Yes | Add/remove |
| slice | New array | No | Copy portion |
| sort | Array | Yes | Sort |
| reverse | Array | Yes | Reverse |
| join | String | No | Array to string |

---

## 🎯 COMMON PATTERNS

### Pattern 1: Chaining Methods

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const result = numbers
  .filter(num => num % 2 === 0)  // [2, 4, 6, 8, 10]
  .map(num => num * 2)            // [4, 8, 12, 16, 20]
  .reduce((sum, num) => sum + num, 0); // 60
```

### Pattern 2: Find and Update

```javascript
const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' }
];

const user = users.find(u => u.id === 2);
if (user) {
  user.name = 'Jane Updated';
}
```

### Pattern 3: Remove Duplicates

```javascript
const arr = [1, 2, 2, 3, 3, 3];
const unique = [...new Set(arr)];
// [1, 2, 3]

// Or with filter
const unique2 = arr.filter((item, index) => arr.indexOf(item) === index);
```

### Pattern 4: Group By

```javascript
const users = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 },
  { name: 'Bob', age: 30 }
];

const grouped = users.reduce((acc, user) => {
  const age = user.age;
  if (!acc[age]) acc[age] = [];
  acc[age].push(user);
  return acc;
}, {});
```

---

## ⚠️ COMMON MISTAKES

### Mistake 1: Using forEach when map needed

```javascript
// ❌ WRONG
const doubled = [];
numbers.forEach(num => {
  doubled.push(num * 2);
});

// ✅ CORRECT
const doubled = numbers.map(num => num * 2);
```

### Mistake 2: Modifying array during iteration

```javascript
// ❌ WRONG - Can cause issues
arr.forEach((item, index) => {
  if (item < 0) {
    arr.splice(index, 1);
  }
});

// ✅ CORRECT - Filter instead
const filtered = arr.filter(item => item >= 0);
```

### Mistake 3: Not handling empty arrays

```javascript
// ❌ WRONG
const max = numbers.reduce((a, b) => Math.max(a, b));

// ✅ CORRECT
const max = numbers.length > 0 
  ? numbers.reduce((a, b) => Math.max(a, b))
  : undefined;
```

---

## 🚀 BEST PRACTICES

1. **Use map() for transformations** - Don't use forEach with push
2. **Use filter() for filtering** - Don't use forEach with if
3. **Use find() for single item** - Don't use filter()[0]
4. **Use some()/every() for boolean checks** - Don't use forEach
5. **Chain methods** - Readable and efficient
6. **Avoid mutations** - Prefer methods that return new arrays
7. **Handle edge cases** - Empty arrays, undefined values
8. **Use appropriate method** - Right tool for right job

---

**END OF COLLECTION: JAVASCRIPT ARRAY METHODS**

