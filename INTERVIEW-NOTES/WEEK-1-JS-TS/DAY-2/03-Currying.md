# CURRYING

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Currying kya hai?**
- Currying ek functional programming technique hai
- Ek function ko multiple functions mein break karte hain
- Har function ek argument leta hai
- Jab sab arguments mil jate hain, final result return hota hai
- Partial application jaisa hai, par more structured

**Real-life Analogy:**
- Imagine ek restaurant order
- Pehle aap dish select karte hain (first function)
- Phir quantity batate hain (second function)
- Phir payment karte hain (third function)
- Har step ek separate function hai
- Final step par order complete hota hai

**Simple Definition:**
- `f(a, b, c)` ko `f(a)(b)(c)` mein convert karna
- Har call ek argument leta hai
- Last call final result return karta hai

### How Currying Works

**Normal Function:**
```javascript
function add(a, b, c) {
  return a + b + c;
}
add(1, 2, 3); // 6
```

**Curried Function:**
```javascript
function add(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}
add(1)(2)(3); // 6
```

**Step-by-step:**
1. `add(1)` → returns function that takes `b`
2. `add(1)(2)` → returns function that takes `c`
3. `add(1)(2)(3)` → returns final result `6`

### Benefits of Currying

**1. Reusability**
- Partial functions create kar sakte hain
- Common arguments pre-fill kar sakte hain
- Specialized functions ban sakte hain

**2. Composition**
- Functions ko easily compose kar sakte hain
- Pipeline patterns
- Functional programming

**3. Flexibility**
- Arguments ko step-by-step pass kar sakte hain
- Lazy evaluation possible
- Better code organization

### Currying vs Partial Application

**Currying:**
- Always one argument per function
- Strict pattern: `f(a)(b)(c)`
- All arguments required eventually

**Partial Application:**
- Multiple arguments at once possible
- Flexible: `f(a, b)` or `f(a)(b)`
- Some arguments can be optional

### Manual Currying

**Example:**
```javascript
function multiply(a) {
  return function(b) {
    return function(c) {
      return a * b * c;
    };
  };
}

const step1 = multiply(2);      // Function
const step2 = step1(3);         // Function
const result = step2(4);        // 24

// Or chained:
multiply(2)(3)(4); // 24
```

### Generic Currying Function

**Creating Curried Functions:**
```javascript
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function(...nextArgs) {
        return curried.apply(this, args.concat(nextArgs));
      };
    }
  };
}

function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);
curriedAdd(1)(2)(3);  // 6
curriedAdd(1, 2)(3);  // 6
curriedAdd(1)(2, 3);  // 6
```

### Use Cases

**1. Specialized Functions**
```javascript
const add5 = add(5);
add5(10); // 15
```

**2. Function Composition**
```javascript
const multiplyBy2 = multiply(2);
const multiplyBy2And3 = multiplyBy2(3);
```

**3. API Design**
```javascript
const apiCall = (method) => (url) => (data) => {
  // Make API call
};
```

---

## B) Easy English Theory

### What is Currying?

Currying is a functional programming technique where a function that takes multiple arguments is transformed into a series of functions, each taking a single argument. Instead of `f(a, b, c)`, you have `f(a)(b)(c)`.

### How It Works

A curried function returns a new function for each argument until all arguments are provided, then returns the final result. Each function call takes one argument and returns another function (except the last call which returns the result).

### Benefits

- **Reusability:** Create specialized functions by pre-filling arguments
- **Composition:** Easily combine functions
- **Flexibility:** Pass arguments incrementally
- **Code Organization:** Better structure for complex operations

### Currying vs Partial Application

Currying always takes one argument per function call, while partial application can take multiple arguments at once. Currying is more strict and structured.

---

## C) Why This Concept Exists

### The Problem

**Without Currying:**
- Functions need all arguments at once
- Hard to create specialized versions
- Less flexible function composition
- Difficult to create reusable partial functions

### The Solution

**Currying Provides:**
1. **Incremental Application:** Arguments one at a time
2. **Specialization:** Create specific functions from general ones
3. **Composition:** Easier function chaining
4. **Reusability:** Partial functions for common cases

### Real-World Need

- **API Design:** Flexible function interfaces
- **Functional Programming:** Composition patterns
- **Code Reuse:** Specialized function creation
- **Testing:** Easier to test partial functions

---

## D) Practical Example (Code)

```javascript
// ============================================
// MANUAL CURRYING
// ============================================

function add(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}

console.log(add(1)(2)(3)); // 6

// Step by step
const step1 = add(1);      // Function(b)
const step2 = step1(2);    // Function(c)
const result = step2(3);   // 6

// ============================================
// ARROW FUNCTION CURRYING
// ============================================

const addArrow = a => b => c => a + b + c;
console.log(addArrow(1)(2)(3)); // 6

// More readable version
const addArrowReadable = (a) => (b) => (c) => {
  return a + b + c;
};

// ============================================
// GENERIC CURRY FUNCTION
// ============================================

function curry(fn) {
  return function curried(...args) {
    // If enough arguments, call original function
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      // Otherwise, return function that takes more arguments
      return function(...nextArgs) {
        return curried.apply(this, args.concat(nextArgs));
      };
    }
  };
}

function multiply(a, b, c) {
  return a * b * c;
}

const curriedMultiply = curry(multiply);

// All these work:
console.log(curriedMultiply(2)(3)(4));    // 24
console.log(curriedMultiply(2, 3)(4));   // 24
console.log(curriedMultiply(2)(3, 4));   // 24
console.log(curriedMultiply(2, 3, 4));   // 24

// ============================================
// SPECIALIZED FUNCTIONS
// ============================================

function createURL(protocol, domain, path) {
  return `${protocol}://${domain}/${path}`;
}

const curriedCreateURL = curry(createURL);

// Create specialized functions
const createHTTPS = curriedCreateURL("https");
const createHTTP = curriedCreateURL("http");

const createHTTPSExample = createHTTPS("example.com");
console.log(createHTTPSExample("api/users")); 
// "https://example.com/api/users"

console.log(createHTTP("localhost")("test")); 
// "http://localhost/test"

// ============================================
// REUSABLE PARTIAL FUNCTIONS
// ============================================

function calculate(operation, a, b) {
  switch(operation) {
    case 'add': return a + b;
    case 'multiply': return a * b;
    case 'subtract': return a - b;
    default: return 0;
  }
}

const curriedCalculate = curry(calculate);

// Create specialized calculators
const add = curriedCalculate('add');
const multiply = curriedCalculate('multiply');
const subtract = curriedCalculate('subtract');

console.log(add(5)(10));        // 15
console.log(multiply(3)(4));    // 12
console.log(subtract(10)(3));   // 7

// ============================================
// FUNCTION COMPOSITION WITH CURRYING
// ============================================

const pipe = (...fns) => (value) => fns.reduce((acc, fn) => fn(acc), value);

const add1 = x => x + 1;
const multiply2 = x => x * 2;
const square = x => x * x;

// Compose functions
const transform = pipe(add1, multiply2, square);
console.log(transform(3)); // ((3 + 1) * 2) ^ 2 = 64

// With currying
const curriedPipe = curry((...fns) => (value) => 
  fns.reduce((acc, fn) => fn(acc), value)
);

// ============================================
// API CALL PATTERN
// ============================================

const apiCall = (method) => (url) => (data) => {
  return fetch(url, {
    method: method,
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  });
};

// Create specialized API functions
const get = apiCall('GET');
const post = apiCall('POST');
const put = apiCall('PUT');

// Use them
const getUsers = get('/api/users');
const createUser = post('/api/users');

// ============================================
// VALIDATION WITH CURRYING
// ============================================

function validate(type, value, rule) {
  switch(type) {
    case 'email':
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && rule(value);
    case 'length':
      return value.length >= rule.min && value.length <= rule.max;
    default:
      return false;
  }
}

const curriedValidate = curry(validate);

// Create validators
const validateEmail = curriedValidate('email');
const validateLength = curriedValidate('length');

const isValidEmail = validateEmail('test@example.com');
const isValidLength = validateLength('hello', { min: 3, max: 10 });

// ============================================
// LOGGING WITH CURRYING
// ============================================

const log = (level) => (message) => (data) => {
  console.log(`[${level}] ${message}`, data);
};

const logError = log('ERROR');
const logInfo = log('INFO');
const logWarning = log('WARNING');

logError('Failed to fetch')('Network error');
logInfo('User logged in')({ userId: 123 });
logWarning('Rate limit approaching')({ remaining: 5 });

// ============================================
// MATH OPERATIONS WITH CURRYING
// ============================================

function mathOp(operation, a, b) {
  const ops = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => a / b
  };
  return ops[operation](a, b);
}

const curriedMathOp = curry(mathOp);

// Create operations
const add = curriedMathOp('add');
const subtract = curriedMathOp('subtract');

// Create number-specific operations
const add5 = add(5);
const subtract3 = subtract(3);

console.log(add5(10));    // 15
console.log(subtract3(10)); // 7

// ============================================
// ADVANCED: CURRYING WITH PLACEHOLDERS
// ============================================

function curryWithPlaceholder(fn) {
  const placeholder = Symbol('placeholder');
  
  return function curried(...args) {
    const hasPlaceholder = args.some(arg => arg === placeholder);
    
    if (!hasPlaceholder && args.length >= fn.length) {
      return fn.apply(this, args);
    }
    
    return function(...nextArgs) {
      const mergedArgs = args.map(arg => 
        arg === placeholder && nextArgs.length > 0 
          ? nextArgs.shift() 
          : arg
      );
      return curried.apply(this, [...mergedArgs, ...nextArgs]);
    };
  };
}

const _ = Symbol('placeholder');

function divide(a, b, c) {
  return a / b / c;
}

const curriedDivide = curryWithPlaceholder(divide);

// Can skip middle argument
console.log(curriedDivide(100, _, 2)(10)); // 100 / 10 / 2 = 5
```

---

## E) Internal Working

### Step-by-Step Internal Flow

**1. Currying Transformation**
```
Original function: f(a, b, c)
    ↓
Curry wrapper applied
    ↓
Returns function that takes 'a'
    ↓
Returns function that takes 'b'
    ↓
Returns function that takes 'c'
    ↓
Returns final result
```

**2. Argument Accumulation**
```
First call: curried(a)
    ↓
Store 'a' in closure
    ↓
Return function expecting 'b'
    ↓
Second call: curried(a)(b)
    ↓
Store 'b' in closure
    ↓
Return function expecting 'c'
    ↓
Third call: curried(a)(b)(c)
    ↓
All arguments collected
    ↓
Call original function with all args
    ↓
Return result
```

**3. Closure Mechanism**
```
Each curried function creates closure:
  - Stores accumulated arguments
  - Stores reference to original function
  - Returns new function or result
```

### Memory Structure

**Curried Function:**
```
Curried Function {
  [[OriginalFunction]]: original function,
  [[AccumulatedArgs]]: [a, b, ...],
  [[RemainingArity]]: remaining arguments needed,
  [[Call]]: internal method
}
```

### Performance Considerations

**Pros:**
- Enables function specialization
- Better code reuse
- Flexible argument passing

**Cons:**
- Creates multiple function objects
- Memory overhead from closures
- Slight performance overhead
- Can be over-engineered for simple cases

---

## F) Interview Questions & Answers

### Q1: What is Currying in JavaScript?

**Answer:**
Currying is a functional programming technique where a function that takes multiple arguments is transformed into a series of functions, each taking a single argument. Instead of calling `f(a, b, c)`, you call `f(a)(b)(c)`. Each function call returns another function until all arguments are provided, then returns the final result.

### Q2: How does Currying differ from Partial Application?

**Answer:**
Currying always takes exactly one argument per function call and follows a strict pattern. Partial application can take multiple arguments at once and is more flexible. Currying is a specific form of partial application where arguments are applied one at a time.

### Q3: What are the benefits of Currying?

**Answer:**
Currying enables creating specialized functions by pre-filling arguments, improves function composition and reusability, allows incremental argument passing, and provides better code organization. It's useful for creating reusable partial functions and building flexible APIs.

### Q4: How would you implement a generic curry function?

**Answer:**
A generic curry function checks if enough arguments are provided. If yes, it calls the original function. If no, it returns a new function that accumulates arguments. It uses closure to store accumulated arguments and compares argument count with function's arity to determine when to execute.

### Q5: When would you use Currying?

**Answer:**
Use currying when you need to create specialized functions from general ones, when building flexible APIs that accept arguments incrementally, for function composition patterns, or when you want to create reusable partial functions. It's common in functional programming and library design.

### Q6: What are the drawbacks of Currying?

**Answer:**
Currying creates multiple function objects and closures, which has memory overhead. There's also slight performance overhead from multiple function calls. It can be over-engineered for simple cases and may reduce code readability if overused.

### Q7: Can you curry functions with different arities?

**Answer:**
Yes, a generic curry function can handle functions with any number of arguments. It compares the number of provided arguments with the function's arity (length property) to determine when all arguments are collected and the function should be executed.

---

## G) Common Mistakes

### Mistake 1: Over-Currying Simple Functions

```javascript
// ❌ WRONG - Unnecessary currying
const add = a => b => a + b;
const result = add(1)(2); // Could just be add(1, 2)

// ✅ CORRECT - Use currying when it adds value
function complexOperation(a, b, c, d) {
  // Complex logic
}
// Currying makes sense here for specialization
```

**Why it breaks:** Currying adds complexity without benefit for simple functions.

### Mistake 2: Not Handling Variable Arguments

```javascript
// ❌ WRONG - Doesn't handle variable args
function curry(fn) {
  return a => b => fn(a, b);
}

// ✅ CORRECT - Generic curry handles any arity
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function(...next) {
      return curried.apply(this, args.concat(next));
    };
  };
}
```

**Why it breaks:** Fixed-arity curry only works for specific function signatures.

### Mistake 3: Forgetting to Return Functions

```javascript
// ❌ WRONG
function add(a) {
  function(b) {  // Missing return!
    return a + b;
  }
}

// ✅ CORRECT
function add(a) {
  return function(b) {
    return a + b;
  };
}
```

**Why it breaks:** Must return the inner function for currying to work.

### Mistake 4: Losing Context

```javascript
// ❌ WRONG - Loses 'this'
const obj = {
  value: 10,
  add: function(a) {
    return function(b) {
      return this.value + a + b; // this is lost!
    };
  }
};

// ✅ CORRECT - Preserve context
const obj = {
  value: 10,
  add: function(a) {
    const self = this;
    return function(b) {
      return self.value + a + b;
    };
  }
};
```

**Why it breaks:** Inner functions lose `this` context.

### Mistake 5: Not Using Arrow Functions for Simplicity

```javascript
// ❌ WRONG - Verbose
function add(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}

// ✅ CORRECT - Cleaner with arrows
const add = a => b => c => a + b + c;
```

**Why it breaks:** Arrow functions make currying more concise.

---

## H) When to Use & When NOT to Use

### When Currying is Beneficial

**1. Function Specialization**
- Creating specific functions from general ones
- Pre-filling common arguments
- Reusable partial functions

**2. API Design**
- Flexible function interfaces
- Incremental argument passing
- Library development

**3. Functional Programming**
- Function composition
- Pipeline patterns
- Higher-order functions

**4. Code Reusability**
- DRY principle
- Common patterns
- Utility functions

### When NOT to Use Currying

**1. Simple Functions**
- Two-argument functions
- No need for specialization
- Over-engineering

**2. Performance Critical**
- Multiple function calls overhead
- Memory from closures
- When speed matters

**3. Readability Concerns**
- When it reduces clarity
- Team unfamiliar with pattern
- Complex debugging

**4. Variable Arguments**
- Functions with rest parameters
- Dynamic argument count
- When arity is unknown

### Backend Perspective

**Node.js:**
- Middleware composition
- Request handlers
- Service layer
- Utility functions

**When it matters:**
- Express middleware chains
- Service method composition
- Utility function libraries
- API design

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain Currying in JavaScript."

**You:**
"Currying is a functional programming technique where a function taking multiple arguments is transformed into a series of functions, each taking one argument. Instead of `f(a, b, c)`, you have `f(a)(b)(c)`.

Each function call takes one argument and returns another function, except the last call which returns the result. This allows creating specialized functions by pre-filling some arguments. For example, from a general `add(a, b)` function, you can create `add5(b)` by currying and calling `add(5)`.

Currying enables function composition, code reuse, and flexible APIs. You can implement it manually with nested functions or use a generic curry function that works with any function arity.

The key benefit is creating reusable partial functions. However, it adds complexity and memory overhead, so it should be used when it provides real value, not just for the sake of using a pattern."

---

## J) Mini Practice Task

### Task: Build a Currying Utility Library

Create a comprehensive currying utility:

**Requirements:**
1. Create `CurryUtils` with:
   - `curry(fn)`: Generic curry function
   - `uncurry(fn)`: Convert curried to normal
   - `curryN(n, fn)`: Curry with specific arity
   - `partial(fn, ...args)`: Partial application

2. Create example functions:
   - Math operations
   - String manipulation
   - Data transformation

3. Demonstrate:
   - Basic currying
   - Specialized functions
   - Function composition
   - Real-world use cases

**Expected Output:**
```
Curried function works
Specialized functions created
Composition successful
Real-world examples work
```

**Solution Template:**
```javascript
const CurryUtils = {
  curry(fn) {
    // Your implementation
  },
  // ... other methods
};
```

---

**END OF TOPIC: CURRYING**

