# ADVANCED JAVASCRIPT CONCEPTS

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Advanced Concepts kya hain?**
- Advanced JavaScript concepts complex scenarios handle karte hain
- Event Loop, Microtasks, Macrotasks
- Generators, Iterators
- Proxy, Reflect
- WeakMap, WeakSet
- Symbols
- Iterators and Iterables

**Key Advanced Concepts:**
- **Event Loop:** Async execution mechanism
- **Generators:** Pausable functions
- **Proxy:** Object interception
- **Symbols:** Unique identifiers
- **WeakMap/WeakSet:** Weak references
- **Iterators:** Iteration protocol

---

## B) Easy English Theory

### What are Advanced JavaScript Concepts?

Advanced JavaScript concepts handle complex scenarios. Event Loop: Async execution mechanism, handles callbacks, microtasks, macrotasks. Generators: Pausable functions, yield values, iterable. Proxy: Object interception, custom behavior. Symbols: Unique identifiers, private properties. WeakMap/WeakSet: Weak references, garbage collectable. Iterators: Iteration protocol, custom iteration. Use for: Advanced patterns, optimization, custom behavior.

---

## C) Why This Concept Exists

### The Problem

**Without Advanced Concepts:**
- Limited control
- No custom behavior
- Difficult patterns
- Performance issues
- Limited capabilities

### The Solution

**Advanced Concepts Provide:**
1. **Control:** Fine-grained control
2. **Customization:** Custom behavior
3. **Performance:** Optimization
4. **Patterns:** Advanced patterns
5. **Capabilities:** Extended features

---

## D) Practical Example (Code)

```javascript
// ============================================
// EVENT LOOP
// ============================================

console.log('1');

setTimeout(() => {
  console.log('2');
}, 0);

Promise.resolve().then(() => {
  console.log('3');
});

console.log('4');

// Output: 1, 4, 3, 2
// Call stack → Microtasks → Macrotasks

// ============================================
// GENERATORS
// ============================================

function* numberGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = numberGenerator();
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }

// Infinite generator
function* infiniteNumbers() {
  let i = 0;
  while (true) {
    yield i++;
  }
}

// ============================================
// PROXY
// ============================================

const target = {
  name: 'John',
  age: 30
};

const handler = {
  get(target, prop) {
    if (prop === 'age') {
      return target[prop] + ' years';
    }
    return target[prop];
  },
  set(target, prop, value) {
    if (prop === 'age' && value < 0) {
      throw new Error('Age cannot be negative');
    }
    target[prop] = value;
    return true;
  }
};

const proxy = new Proxy(target, handler);
console.log(proxy.age); // '30 years'
proxy.age = 25; // OK
// proxy.age = -5; // Error

// ============================================
// SYMBOLS
// ============================================

const sym1 = Symbol('description');
const sym2 = Symbol('description');
console.log(sym1 === sym2); // false (unique)

const obj = {
  [sym1]: 'value1',
  [sym2]: 'value2'
};

// Well-known symbols
const iterable = {
  [Symbol.iterator]() {
    let step = 0;
    return {
      next() {
        step++;
        if (step === 1) {
          return { value: 'hello', done: false };
        } else if (step === 2) {
          return { value: 'world', done: false };
        }
        return { done: true };
      }
    };
  }
};

// ============================================
// WEAKMAP AND WEAKSET
// ============================================

// WeakMap - keys must be objects
const weakMap = new WeakMap();
const obj = {};
weakMap.set(obj, 'value');
console.log(weakMap.get(obj)); // 'value'

// WeakSet - values must be objects
const weakSet = new WeakSet();
weakSet.add(obj);
console.log(weakSet.has(obj)); // true

// Garbage collectable (no references = removed)

// ============================================
// ITERATORS
// ============================================

const iterable = {
  items: [1, 2, 3],
  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => {
        if (index < this.items.length) {
          return {
            value: this.items[index++],
            done: false
          };
        }
        return { done: true };
      }
    };
  }
};

for (const item of iterable) {
  console.log(item); // 1, 2, 3
}

// ============================================
// REFLECT
// ============================================

const obj = { name: 'John' };

// Reflect.get
console.log(Reflect.get(obj, 'name')); // 'John'

// Reflect.set
Reflect.set(obj, 'age', 30);
console.log(obj.age); // 30

// Reflect.has
console.log(Reflect.has(obj, 'name')); // true

// Reflect.ownKeys
console.log(Reflect.ownKeys(obj)); // ['name', 'age']
```

---

## E) Internal Working

**Event Loop:**
- Call Stack: Synchronous code
- Microtask Queue: Promises, queueMicrotask
- Macrotask Queue: setTimeout, setInterval
- Execution: Stack → Microtasks → Macrotasks

**Generators:**
- Pausable functions
- yield pauses execution
- next() resumes
- State preserved

---

## F) Interview Questions & Answers

### Q1: Explain the Event Loop in JavaScript.

**Answer:**
Event Loop handles async execution. Components: Call Stack (synchronous code), Microtask Queue (Promises, queueMicrotask), Macrotask Queue (setTimeout, setInterval). Execution order: Call stack → Microtasks → Macrotasks. Process: Execute call stack, when empty process microtasks, then macrotasks, repeat. Key: Microtasks have priority over macrotasks. This enables async behavior in single-threaded JavaScript.

### Q2: What are Generators and when to use them?

**Answer:**
Generators: Pausable functions using yield, return iterator, can be iterated. Use for: Lazy evaluation, infinite sequences, custom iteration, async patterns. Syntax: function* generator(), yield pauses, next() resumes. Benefits: Memory efficient (lazy), can pause/resume, custom iteration. Example: Infinite sequences, data processing, async patterns.

### Q3: What is Proxy and what are its use cases?

**Answer:**
Proxy: Intercepts object operations, custom behavior for get/set/delete. Use cases: Validation (validate on set), Logging (log operations), Virtual properties (computed properties), Default values, Revocable references. Syntax: new Proxy(target, handler). Handler: get, set, has, deleteProperty, etc. Benefits: Transparent interception, custom behavior, powerful patterns.

---

## G) Common Mistakes

### Mistake 1: Not Understanding Event Loop Order

```javascript
// Understanding execution order
console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');
// Output: 1, 4, 3, 2 (not 1, 4, 2, 3)
```

**Why it matters:** Microtasks execute before macrotasks, affects async behavior.

---

## H) When to Use & When NOT to Use

Use Advanced Concepts for: Complex patterns, optimization, custom behavior, advanced requirements. Don't overuse: Simple solutions first, understand before using, performance considerations.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain Event Loop."

**You:"
"Event Loop handles async execution in JavaScript. Components: Call Stack (synchronous), Microtask Queue (Promises), Macrotask Queue (setTimeout). Execution: Call stack → Microtasks → Macrotasks. Process: Execute stack, when empty process microtasks, then macrotasks, repeat. Key: Microtasks have priority. This enables async in single-threaded JavaScript."

---

## J) Mini Practice Task

Practice: Understand Event Loop, create generators, use Proxy, work with Symbols, use WeakMap/WeakSet, implement iterators, understand execution order.

---

**END OF TOPIC: ADVANCED JAVASCRIPT CONCEPTS**

