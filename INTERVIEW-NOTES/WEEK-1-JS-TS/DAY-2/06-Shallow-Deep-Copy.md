# SHALLOW VS DEEP COPY

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Copy kya hai?**
- Copy object ya array ko duplicate karna
- Original se alag copy
- JavaScript mein reference vs value
- Shallow copy vs Deep copy

**Shallow Copy kya hai?**
- Shallow copy top-level copy karta hai
- Nested objects reference share karte hain
- Object.assign, spread operator shallow copy
- First level copy, nested reference

**Deep Copy kya hai?**
- Deep copy complete copy karta hai
- Nested objects bhi copy hote hain
- JSON.parse(JSON.stringify()) deep copy
- Recursive copying

**Real-life Analogy:**
- Shallow Copy = Photo copy (surface level)
- Deep Copy = Complete duplicate (all levels)
- Reference = Same address
- Value = New address

---

## B) Easy English Theory

### What is Shallow vs Deep Copy?

Shallow Copy: Copies top-level properties, nested objects share references, first level is new, nested levels reference original. Methods: Object.assign, spread operator, Array.slice(). Deep Copy: Complete copy including nested objects, all levels are new, no shared references. Methods: JSON.parse(JSON.stringify()), structuredClone(), custom recursive function. Use shallow for simple objects, deep for nested objects.

---

## C) Why This Concept Exists

### The Problem

**Without Understanding Copy:**
- Unexpected mutations
- Shared references
- Bugs in code
- Data corruption
- Difficult debugging

### The Solution

**Copy Understanding Provides:**
1. **Control:** Choose copy type
2. **Predictability:** Know what gets copied
3. **Safety:** Avoid mutations
4. **Clarity:** Understand references
5. **Correctness:** Proper data handling

---

## D) Practical Example (Code)

```javascript
// ============================================
// SHALLOW COPY
// ============================================

const original = {
  name: 'John',
  age: 30,
  address: {
    city: 'New York',
    country: 'USA'
  }
};

// Method 1: Object.assign
const shallow1 = Object.assign({}, original);
shallow1.name = 'Jane'; // Doesn't affect original
shallow1.address.city = 'London'; // Affects original!

// Method 2: Spread operator
const shallow2 = { ...original };
shallow2.name = 'Jane'; // Doesn't affect original
shallow2.address.city = 'London'; // Affects original!

// Method 3: Array.slice() (for arrays)
const arr = [1, 2, { a: 3 }];
const shallowArr = arr.slice();
shallowArr[0] = 10; // Doesn't affect original
shallowArr[2].a = 30; // Affects original!

// ============================================
// DEEP COPY
// ============================================

// Method 1: JSON.parse(JSON.stringify())
// Limitations: No functions, dates, undefined, symbols
const deep1 = JSON.parse(JSON.stringify(original));
deep1.address.city = 'Paris'; // Doesn't affect original

// Method 2: structuredClone() (Modern browsers)
const deep2 = structuredClone(original);
deep2.address.city = 'Tokyo'; // Doesn't affect original

// Method 3: Custom recursive function
function deepCopy(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }
  
  if (obj instanceof Array) {
    return obj.map(item => deepCopy(item));
  }
  
  if (typeof obj === 'object') {
    const copy = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        copy[key] = deepCopy(obj[key]);
      }
    }
    return copy;
  }
}

const deep3 = deepCopy(original);

// ============================================
// COMPARISON
// ============================================

const original = {
  a: 1,
  b: {
    c: 2,
    d: {
      e: 3
    }
  }
};

// Shallow copy
const shallow = { ...original };
shallow.b.c = 20;
console.log(original.b.c); // 20 (changed!)

// Deep copy
const deep = JSON.parse(JSON.stringify(original));
deep.b.c = 20;
console.log(original.b.c); // 2 (unchanged)

// ============================================
// ARRAY COPYING
// ============================================

const arr = [1, 2, [3, 4]];

// Shallow copy
const shallowArr1 = [...arr];
const shallowArr2 = arr.slice();
const shallowArr3 = Array.from(arr);

shallowArr1[2][0] = 30;
console.log(arr[2][0]); // 30 (changed!)

// Deep copy
const deepArr = JSON.parse(JSON.stringify(arr));
deepArr[2][0] = 30;
console.log(arr[2][0]); // 3 (unchanged)

// ============================================
// LODASH DEEP CLONE
// ============================================

// Using lodash (if available)
const _ = require('lodash');
const deep = _.cloneDeep(original);

// ============================================
// HANDLING SPECIAL CASES
// ============================================

function deepCopyAdvanced(obj, visited = new WeakMap()) {
  // Handle circular references
  if (visited.has(obj)) {
    return visited.get(obj);
  }
  
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  // Handle Date
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }
  
  // Handle RegExp
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }
  
  // Handle Array
  if (Array.isArray(obj)) {
    const copy = [];
    visited.set(obj, copy);
    obj.forEach((item, index) => {
      copy[index] = deepCopyAdvanced(item, visited);
    });
    return copy;
  }
  
  // Handle Object
  if (typeof obj === 'object') {
    const copy = {};
    visited.set(obj, copy);
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        copy[key] = deepCopyAdvanced(obj[key], visited);
      }
    }
    return copy;
  }
  
  return obj;
}
```

---

## E) Internal Working

**Copy Mechanisms:**
- **Shallow:** Copy references for nested
- **Deep:** Recursive copying
- **Reference:** Shared memory
- **Value:** New memory

---

## F) Interview Questions & Answers

### Q1: What is the difference between Shallow and Deep Copy?

**Answer:**
Shallow Copy: Copies top-level properties, nested objects share references, first level is new, nested levels reference original. Methods: Object.assign, spread operator. Deep Copy: Complete copy including nested, all levels are new, no shared references. Methods: JSON.parse(JSON.stringify()), structuredClone(), custom recursive. Use shallow for simple objects, deep for nested objects. Key difference: Shallow shares nested references, deep creates new nested objects.

### Q2: How do you create a Deep Copy in JavaScript?

**Answer:**
Deep copy methods: JSON.parse(JSON.stringify()) - simple but loses functions/dates, structuredClone() - modern browsers, handles more types, custom recursive function - full control, handles all cases including circular references. Choose based on: Data types (functions, dates), browser support, circular references. Best: Custom function for complete control, structuredClone for modern browsers.

### Q3: When would you use Shallow Copy vs Deep Copy?

**Answer:**
Use Shallow Copy when: Simple objects (no nesting), performance important, nested objects shouldn't change, first level copy sufficient. Use Deep Copy when: Nested objects need independent copy, complex objects, need complete isolation, nested mutations shouldn't affect original. Rule: Shallow for simple/flat objects, Deep for nested/complex objects.

---

## G) Common Mistakes

### Mistake 1: Assuming Spread is Deep Copy

```javascript
// ❌ WRONG - Spread is shallow
const original = { a: { b: 1 } };
const copy = { ...original };
copy.a.b = 2;
console.log(original.a.b); // 2 (changed!)

// ✅ CORRECT - Use deep copy
const copy = JSON.parse(JSON.stringify(original));
// Or structuredClone(original)
```

**Why it breaks:** Spread only copies first level, nested objects share references.

---

## H) When to Use & When NOT to Use

Use Shallow Copy for: Simple objects, performance, first level copy sufficient. Use Deep Copy for: Nested objects, complete isolation needed, complex structures. Don't use JSON method for: Functions, dates, undefined, symbols, circular references.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain Shallow vs Deep Copy."

**You:"
"Shallow Copy: Copies top-level, nested objects share references. Methods: Object.assign, spread operator. Deep Copy: Complete copy including nested, all levels new. Methods: JSON.parse(JSON.stringify()), structuredClone(), custom recursive.

Difference: Shallow shares nested references, deep creates new nested objects. Use shallow for simple objects, deep for nested/complex objects. Key: Shallow = first level copy, Deep = all levels copy."

---

## J) Mini Practice Task

Practice: Create shallow and deep copies, understand reference vs value, handle nested objects, use different copy methods, understand when to use which.

---

**END OF TOPIC: SHALLOW VS DEEP COPY**

