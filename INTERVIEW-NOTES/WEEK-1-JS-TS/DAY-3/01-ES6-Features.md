# ES6+ FEATURES

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**ES6 kya hai?**
- ES6 = ECMAScript 2015
- JavaScript ka major update
- Modern JavaScript features
- Arrow functions, classes, modules
- let/const, destructuring, spread

**Key ES6 Features:**
- **let/const:** Block-scoped variables
- **Arrow Functions:** Shorter syntax
- **Template Literals:** String interpolation
- **Destructuring:** Extract values
- **Spread/Rest:** Expand/collect
- **Classes:** OOP syntax
- **Modules:** import/export
- **Promises:** Async handling

**ES6+ Features:**
- **ES7:** Array.includes, Exponentiation
- **ES8:** async/await, Object.entries
- **ES9:** Rest/Spread for objects
- **ES10:** Array.flat, Object.fromEntries
- **ES11:** Optional chaining, Nullish coalescing

---

## B) Easy English Theory

### What are ES6+ Features?

ES6+ (ECMAScript 2015+) introduced modern JavaScript features. ES6: let/const (block scope), Arrow functions, Template literals, Destructuring, Spread/Rest, Classes, Modules, Promises. ES7+: Array.includes, async/await, Object methods, Optional chaining, Nullish coalescing. Benefits: Modern syntax, better features, improved readability, async handling. Use for: Modern JavaScript development, better code quality.

---

## C) Why This Concept Exists

### The Problem

**Before ES6:**
- var hoisting issues
- Verbose function syntax
- No modules
- Difficult async handling
- Limited features

### The Solution

**ES6+ Provides:**
1. **Modern Syntax:** Cleaner code
2. **Better Features:** More capabilities
3. **Modules:** Code organization
4. **Async:** Better async handling
5. **Type Safety:** Optional features

---

## D) Practical Example (Code)

```javascript
// ============================================
// LET AND CONST
// ============================================

// let - Block scoped, can be reassigned
let x = 1;
x = 2; // OK

if (true) {
  let y = 10; // Block scoped
}
// console.log(y); // Error: y is not defined

// const - Block scoped, cannot be reassigned
const PI = 3.14;
// PI = 3.14159; // Error: Assignment to constant

const obj = { name: 'John' };
obj.name = 'Jane'; // OK (object property)
// obj = {}; // Error (reassignment)

// ============================================
// ARROW FUNCTIONS
// ============================================

// Traditional function
function add(a, b) {
  return a + b;
}

// Arrow function
const addArrow = (a, b) => a + b;

// Multiple parameters
const multiply = (a, b) => {
  return a * b;
};

// Single parameter (no parentheses needed)
const square = x => x * x;

// No parameters
const greet = () => 'Hello';

// this binding (lexical)
const obj = {
  name: 'John',
  traditional: function() {
    console.log(this.name); // 'John'
  },
  arrow: () => {
    console.log(this.name); // undefined (lexical this)
  }
};

// ============================================
// TEMPLATE LITERALS
// ============================================

const name = 'John';
const age = 30;

// Old way
const message = 'Hello, ' + name + ', you are ' + age + ' years old';

// Template literal
const messageNew = `Hello, ${name}, you are ${age} years old`;

// Multi-line strings
const multiLine = `
  Line 1
  Line 2
  Line 3
`;

// Expressions
const calculation = `2 + 2 = ${2 + 2}`;

// ============================================
// DESTRUCTURING
// ============================================

// Array destructuring
const arr = [1, 2, 3];
const [a, b, c] = arr;
// a = 1, b = 2, c = 3

const [first, ...rest] = arr;
// first = 1, rest = [2, 3]

// Skip elements
const [, second, third] = arr;
// second = 2, third = 3

// Default values
const [x = 10, y = 20] = [1];
// x = 1, y = 20

// Object destructuring
const person = { name: 'John', age: 30, city: 'NYC' };
const { name, age } = person;
// name = 'John', age = 30

// Rename
const { name: personName, age: personAge } = person;

// Default values
const { name, age, country = 'USA' } = person;

// Nested destructuring
const user = {
  name: 'John',
  address: {
    city: 'NYC',
    zip: '10001'
  }
};
const { address: { city } } = user;
// city = 'NYC'

// ============================================
// SPREAD OPERATOR
// ============================================

// Array spread
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];
// [1, 2, 3, 4, 5, 6]

// Copy array
const copy = [...arr1];

// Object spread
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const merged = { ...obj1, ...obj2 };
// { a: 1, b: 2, c: 3, d: 4 }

// Override properties
const updated = { ...obj1, b: 20 };
// { a: 1, b: 20 }

// ============================================
// REST PARAMETERS
// ============================================

function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

sum(1, 2, 3, 4); // 10

// Rest in destructuring
const [first, ...rest] = [1, 2, 3, 4];
// first = 1, rest = [2, 3, 4]

// ============================================
// CLASSES
// ============================================

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  greet() {
    return `Hello, I'm ${this.name}`;
  }
  
  static createAdult(name) {
    return new Person(name, 18);
  }
}

class Student extends Person {
  constructor(name, age, school) {
    super(name, age);
    this.school = school;
  }
  
  study() {
    return `${this.name} is studying`;
  }
}

// ============================================
// MODULES (EXPORT/IMPORT)
// ============================================

// math.js
export const PI = 3.14159;
export function add(a, b) {
  return a + b;
}
export default function multiply(a, b) {
  return a * b;
}

// app.js
import multiply, { PI, add } from './math.js';
import * as math from './math.js';

// ============================================
// PROMISES
// ============================================

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Success!');
  }, 1000);
});

promise
  .then(result => console.log(result))
  .catch(error => console.error(error));

// ============================================
// ASYNC/AWAIT (ES8)
// ============================================

async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// ============================================
// OPTIONAL CHAINING (ES11)
// ============================================

const user = {
  name: 'John',
  address: {
    city: 'NYC'
  }
};

// Old way
const city = user && user.address && user.address.city;

// Optional chaining
const cityNew = user?.address?.city;

// Method calls
user?.getName?.();

// ============================================
// NULLISH COALESCING (ES11)
// ============================================

const value = null ?? 'default';
// 'default'

const value2 = undefined ?? 'default';
// 'default'

const value3 = 0 ?? 'default';
// 0 (not 'default' because 0 is not null/undefined)

// ============================================
// ARRAY METHODS (ES6+)
// ============================================

// Array.includes (ES7)
[1, 2, 3].includes(2); // true

// Array.flat (ES10)
[1, [2, 3]].flat(); // [1, 2, 3]

// Array.flatMap (ES10)
[1, 2, 3].flatMap(x => [x, x * 2]); // [1, 2, 2, 4, 3, 6]
```

---

## E) Internal Working

**ES6+ Features:**
- **Transpilation:** Babel converts to ES5
- **Polyfills:** Add missing features
- **Module System:** Bundlers handle
- **Async:** Event loop handles

---

## F) Interview Questions & Answers

### Q1: What are the key ES6 features?

**Answer:**
Key ES6 features: let/const (block-scoped variables), Arrow functions (shorter syntax, lexical this), Template literals (string interpolation), Destructuring (extract values), Spread/Rest operators, Classes (OOP syntax), Modules (import/export), Promises (async handling). Benefits: Modern syntax, better features, improved readability. ES6+ added: async/await, Optional chaining, Nullish coalescing, Array methods.

### Q2: What is the difference between let, const, and var?

**Answer:**
var: Function-scoped, hoisted, can be redeclared, no block scope. let: Block-scoped, hoisted but in TDZ, cannot be redeclared, can be reassigned. const: Block-scoped, hoisted but in TDZ, cannot be redeclared, cannot be reassigned (but object properties can change). Use: const by default, let when need reassignment, avoid var. Key: let/const have block scope, var has function scope.

### Q3: What are Arrow Functions and when to use them?

**Answer:**
Arrow functions: Shorter syntax, lexical this binding, no arguments object, cannot be used as constructors. Use for: Callbacks, short functions, when need lexical this. Don't use for: Methods (need dynamic this), constructors, when need arguments object. Syntax: `(params) => expression` or `(params) => { statements }`. Benefit: Cleaner code, predictable this.

---

## G) Common Mistakes

### Mistake 1: Using Arrow Functions for Methods

```javascript
// ❌ WRONG - Arrow function loses this
const obj = {
  name: 'John',
  greet: () => {
    console.log(this.name); // undefined
  }
};

// ✅ CORRECT - Regular function
const obj = {
  name: 'John',
  greet: function() {
    console.log(this.name); // 'John'
  }
};
```

**Why it breaks:** Arrow functions have lexical this, methods need dynamic this.

---

## H) When to Use & When NOT to Use

Use ES6+ for: Modern JavaScript, better syntax, improved features. Use let/const: Always (avoid var). Use Arrow functions: Callbacks, short functions. Use Classes: OOP patterns. Use Modules: Code organization. Don't use arrow functions: Methods, constructors.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain ES6 features."

**You:"
"ES6 (ECMAScript 2015) introduced modern JavaScript. Key features: let/const (block scope), Arrow functions (shorter syntax, lexical this), Template literals (string interpolation), Destructuring (extract values), Spread/Rest, Classes, Modules, Promises.

ES6+ added: async/await, Optional chaining, Nullish coalescing. Benefits: Modern syntax, better features, improved readability. Use for modern JavaScript development."

---

## J) Mini Practice Task

Practice: Use let/const, write arrow functions, use template literals, destructure objects/arrays, use spread/rest, create classes, use modules, work with promises/async-await.

---

**END OF TOPIC: ES6+ FEATURES**

