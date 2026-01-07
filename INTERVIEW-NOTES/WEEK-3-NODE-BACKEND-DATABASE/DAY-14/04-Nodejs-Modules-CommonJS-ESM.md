# NODE.JS MODULES (COMMONJS & ES MODULES)

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Modules kya hain?**
- Modules code ko organize karne ka tarika hai
- Code reuse ke liye
- Encapsulation provide karta hai
- Dependency management
- Two types: CommonJS and ES Modules

**CommonJS:**
- Node.js ka default module system
- require() se import
- module.exports se export
- Synchronous loading
- Runtime resolution

**ES Modules (ESM):**
- JavaScript ka standard module system
- import/export syntax , // import axios  from 'axios';
- Static analysis
- Tree shaking support
- Modern approach

**Real-life Analogy:**
- Modules = Library books
- Export = Book publish
- Import = Book borrow
- CommonJS = Old library system
- ESM = Modern library system

---

## B) Easy English Theory

### What are Node.js Modules?

Modules organize code into reusable units. Two types: CommonJS (Node.js default, require/module.exports, synchronous, runtime resolution) and ES Modules (JavaScript standard, import/export, static analysis, tree shaking). CommonJS: require() imports, module.exports exports, synchronous loading. ESM: import/export syntax, static analysis, better optimization. Use CommonJS for: Node.js default, compatibility. Use ESM for: Modern JavaScript, tree shaking, static analysis.

---

## C) Why This Concept Exists

### The Problem

**Without Modules:**
- Global namespace pollution
- Code organization issues
- No code reuse
- Difficult dependency management
- No encapsulation

### The Solution

**Modules Provide:**
1. **Organization:** Code structure
2. **Reusability:** Share code
3. **Encapsulation:** Private scope
4. **Dependency Management:** Clear imports
5. **Maintainability:** Easier to maintain

---

## D) Practical Example (Code)

```javascript
// ============================================
// COMMONJS MODULES
// ============================================

// math.js - Export module
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

// Single export
module.exports = add;

// Multiple exports
module.exports = {
  add,
  subtract
};

// Or
exports.add = add;
exports.subtract = subtract;

// app.js - Import module
const math = require('./math');
console.log(math.add(2, 3)); // 5

// Destructure
const { add, subtract } = require('./math');
console.log(add(2, 3)); // 5

// ============================================
// ES MODULES (ESM)
// ============================================

// math.mjs - Export module
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

// Default export
export default function multiply(a, b) {
  return a * b;
}

// Or
function add(a, b) {
  return a + b;
}

export { add };

// app.mjs - Import module
import { add, subtract } from './math.mjs';
console.log(add(2, 3)); // 5

// Default import
import multiply from './math.mjs';
console.log(multiply(2, 3)); // 6

// All imports
import * as math from './math.mjs';
console.log(math.add(2, 3)); // 5

// ============================================
// PACKAGE.JSON CONFIGURATION
// ============================================

// For ES Modules
{
  "name": "my-app",
  "type": "module",
  "main": "index.js"
}

// For CommonJS (default)
{
  "name": "my-app",
  "main": "index.js"
}

// ============================================
// MIXED USAGE
// ============================================

// CommonJS file importing ESM
// commonjs.js
(async () => {
  const { add } = await import('./math.mjs');
  console.log(add(2, 3));
})();

// ESM importing CommonJS
// esm.mjs
import math from './math.js'; // CommonJS module
console.log(math.add(2, 3));

// ============================================
// MODULE PATTERNS
// ============================================

// Pattern 1: Single function export
// utils.js
module.exports = function helper() {
  return 'helper';
};

// Pattern 2: Object export
// config.js
module.exports = {
  port: 3000,
  db: 'mongodb://localhost:27017/mydb'
};

// Pattern 3: Class export
// User.js
class User {
  constructor(name) {
    this.name = name;
  }
}

module.exports = User;

// Pattern 4: Multiple exports
// operations.js
exports.add = (a, b) => a + b;
exports.subtract = (a, b) => a - b;
exports.multiply = (a, b) => a * b;

// ============================================
// ES MODULES PATTERNS
// ============================================

// Pattern 1: Named exports
// utils.mjs
export function helper() {
  return 'helper';
}

export const CONSTANT = 'value';

// Pattern 2: Default export
// User.mjs
export default class User {
  constructor(name) {
    this.name = name;
  }
}

// Pattern 3: Mixed exports
// operations.mjs
export function add(a, b) {
  return a + b;
}

export default {
  add,
  subtract: (a, b) => a - b
};

// ============================================
// MODULE RESOLUTION
// ============================================

// Relative path
const math = require('./math');
const utils = require('../utils');

// Absolute path
const config = require('/absolute/path/config');

// Node modules
const express = require('express');
const fs = require('fs'); // Built-in module

// ============================================
// DYNAMIC IMPORTS
// ============================================

// CommonJS - Always synchronous
const math = require('./math');

// ESM - Dynamic import (async)
const math = await import('./math.mjs');

// Conditional import
if (condition) {
  const module = await import('./module.mjs');
}

// ============================================
// MODULE CACHING
// ============================================

// math.js
let count = 0;
module.exports = {
  increment: () => ++count,
  getCount: () => count
};

// app.js
const math1 = require('./math');
const math2 = require('./math');

math1.increment();
console.log(math2.getCount()); // 1 (shared instance)

// Modules are cached after first require
```

---

## E) Internal Working

**Module Loading:**
1. **Resolution:** Find module file
2. **Loading:** Load module code
3. **Wrapping:** Wrap in function
4. **Evaluation:** Execute module
5. **Caching:** Cache module
6. **Return:** Return exports

**CommonJS vs ESM:**
- CommonJS: Synchronous, runtime, cached
- ESM: Asynchronous, static, tree-shakeable

---

## F) Interview Questions & Answers

### Q1: What is the difference between CommonJS and ES Modules?

**Answer:**
CommonJS: Node.js default, require()/module.exports, synchronous loading, runtime resolution, cached after first require. ES Modules: JavaScript standard, import/export syntax, static analysis, tree shaking support, asynchronous loading. Key differences: CommonJS synchronous, ESM asynchronous; CommonJS runtime resolution, ESM static analysis; CommonJS no tree shaking, ESM supports tree shaking. Use CommonJS for Node.js default, ESM for modern JavaScript.

### Q2: How does module caching work in Node.js?

**Answer:**
Module caching: First require() loads and caches module, subsequent require() return cached version, modules are singletons (shared instance), cache stored in require.cache, clearing cache removes module. Benefits: Performance (load once), consistency (same instance), memory efficiency. Example: require('./math') loads once, all subsequent requires get same instance. Key: Modules cached after first load, shared across application.

### Q3: How do you use ES Modules in Node.js?

**Answer:**
Use ES Modules: Set "type": "module" in package.json, use .mjs extension, or use "type": "module" in package.json. Syntax: import/export instead of require/module.exports, static imports at top level, dynamic imports with await import(). Benefits: Tree shaking, static analysis, modern syntax. Note: Some packages may not support ESM, can mix with CommonJS using dynamic imports.

---

## G) Common Mistakes

### Mistake 1: Mixing require and import

```javascript
// ❌ WRONG - Can't use require in ESM
// app.mjs
const express = require('express'); // Error

// ✅ CORRECT - Use import
import express from 'express';

// Or dynamic import
const express = await import('express');
```

**Why it breaks:** ESM files can't use require(), must use import.

---

## H) When to Use & When NOT to Use

**Use CommonJS for:**
- Node.js default projects
- Compatibility with older code
- Synchronous module loading needed
- Simple projects

**Use ESM for:**
- Modern JavaScript projects
- Need tree shaking
- Static analysis benefits
- Frontend/backend code sharing

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain Node.js modules."

**You:"
"Node.js has two module systems: CommonJS (default) and ES Modules. CommonJS: require() imports, module.exports exports, synchronous loading, runtime resolution. ES Modules: import/export syntax, static analysis, tree shaking, asynchronous.

Key differences: CommonJS synchronous, ESM asynchronous; CommonJS runtime, ESM static. Use CommonJS for Node.js default, ESM for modern JavaScript. Modules are cached after first load, shared instances."

---

## J) Mini Practice Task

Practice: Create CommonJS modules, use require/module.exports, create ES Modules, use import/export, understand module caching, mix CommonJS and ESM, use dynamic imports.

---

**END OF TOPIC: NODE.JS MODULES**

