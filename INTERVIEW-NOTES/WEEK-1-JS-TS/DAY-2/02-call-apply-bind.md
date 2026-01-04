# CALL, APPLY, BIND

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**call, apply, bind kya hain?**
- Ye teen methods hain jo functions ko explicitly `this` context provide karte hain
- Inka use tab karte hain jab aap chahte hain ki function kisi specific object ke context mein run ho
- `call` aur `apply` immediately function execute karte hain
- `bind` naya function return karta hai with bound context
- Ye explicit binding provide karte hain

**Real-life Analogy:**
- Imagine ek function ek tool hai
- Normally tool apne default jagah par kaam karta hai
- `call`/`apply` = tool ko temporarily different jagah par use karna
- `bind` = tool ko permanently different jagah par fix kar dena
- Context change ho jata hai, par tool same rehta hai

### call() Method

**Syntax:**
```javascript
function.call(thisArg, arg1, arg2, ...)
```

**Kya karta hai:**
- Function ko immediately execute karta hai
- `this` ki value explicitly set karta hai
- Arguments individually pass hote hain (comma-separated)
- Function call ke baad context wapas original ho jata hai

**Example:**
```javascript
function greet(greeting, punctuation) {
  console.log(`${greeting}, ${this.name}${punctuation}`);
}

const person = { name: "John" };
greet.call(person, "Hello", "!"); // "Hello, John!"
```

### apply() Method

**Syntax:**
```javascript
function.apply(thisArg, [arg1, arg2, ...])
```

**Kya karta hai:**
- Function ko immediately execute karta hai
- `this` ki value explicitly set karta hai
- Arguments array mein pass hote hain
- `call` se similar, bas arguments ka format different

**Example:**
```javascript
function greet(greeting, punctuation) {
  console.log(`${greeting}, ${this.name}${punctuation}`);
}

const person = { name: "John" };
greet.apply(person, ["Hello", "!"]); // "Hello, John!"
```

**call vs apply:**
- `call`: Arguments individually (arg1, arg2, ...)
- `apply`: Arguments array mein ([arg1, arg2, ...])
- `apply` useful jab arguments array mein ho

### bind() Method

**Syntax:**
```javascript
function.bind(thisArg, arg1, arg2, ...)
```

**Kya karta hai:**
- Function ko execute nahi karta
- Naya function return karta hai with bound context
- `this` permanently set ho jata hai
- Arguments pre-fill kar sakte hain (partial application)
- Bound function baad mein call kar sakte hain

**Example:**
```javascript
function greet(greeting, punctuation) {
  console.log(`${greeting}, ${this.name}${punctuation}`);
}

const person = { name: "John" };
const boundGreet = greet.bind(person);
boundGreet("Hello", "!"); // "Hello, John!"
```

### When to Use Which

**call():**
- Jab immediately execute karna ho
- Arguments individually hain
- Temporary context change
- Function borrowing

**apply():**
- Jab immediately execute karna ho
- Arguments array mein hain
- Dynamic arguments
- Math.max, Math.min jaisi functions

**bind():**
- Jab context preserve karna ho
- Callbacks mein use
- Event handlers
- Partial application

### Function Borrowing

**Concept:**
- Ek object ka method dusre object par use karna
- `call`/`apply` se context change karke
- Code reuse ke liye useful

**Example:**
```javascript
const person1 = {
  firstName: "John",
  lastName: "Doe"
};

const person2 = {
  firstName: "Jane",
  lastName: "Smith"
};

function getFullName() {
  return `${this.firstName} ${this.lastName}`;
}

console.log(getFullName.call(person1)); // "John Doe"
console.log(getFullName.call(person2)); // "Jane Smith"
```

### Partial Application with bind

**Concept:**
- `bind` se arguments pre-fill kar sakte hain
- Naya function ban jata hai with some arguments fixed
- Currying jaisa pattern

**Example:**
```javascript
function multiply(a, b, c) {
  return a * b * c;
}

const multiplyBy2 = multiply.bind(null, 2);
console.log(multiplyBy2(3, 4)); // 24 (2 * 3 * 4)

const multiplyBy2And3 = multiply.bind(null, 2, 3);
console.log(multiplyBy2And3(4)); // 24 (2 * 3 * 4)
```

---

## B) Easy English Theory

### What are call, apply, and bind?

These are three methods that allow you to explicitly set the `this` context for a function. `call` and `apply` execute the function immediately with the new context, while `bind` returns a new function with the context permanently bound.

### call() Method

Executes function immediately with explicit `this` and individual arguments passed as comma-separated values.

### apply() Method

Executes function immediately with explicit `this` and arguments passed as an array. Useful when you have dynamic number of arguments.

### bind() Method

Returns a new function with `this` permanently bound. Doesn't execute immediately. Useful for callbacks and partial application.

### Key Differences

- `call`: Immediate execution, individual arguments
- `apply`: Immediate execution, array of arguments
- `bind`: Returns function, permanent binding, can pre-fill arguments

---

## C) Why This Concept Exists

### The Problem

**Without call/apply/bind:**
- Can't change function context
- Can't reuse methods on different objects
- Can't preserve context in callbacks
- Limited function flexibility
- Hard to implement function borrowing

### The Solution

**These Methods Provide:**
1. **Explicit Context:** Control `this` value
2. **Function Borrowing:** Reuse methods across objects
3. **Context Preservation:** Maintain context in callbacks
4. **Partial Application:** Pre-fill arguments
5. **Flexibility:** Dynamic function behavior

### Real-World Need

- **Method Reuse:** Use same method on different objects
- **Callbacks:** Preserve context in async operations
- **Event Handlers:** Maintain object context
- **Utility Functions:** Work with any object
- **Functional Programming:** Partial application patterns

---

## D) Practical Example (Code)

```javascript
// ============================================
// CALL METHOD
// ============================================

function introduce(greeting, punctuation) {
  return `${greeting}, I'm ${this.name}${punctuation}`;
}

const person1 = { name: "John" };
const person2 = { name: "Alice" };

// Call with person1 context
console.log(introduce.call(person1, "Hello", "!")); 
// "Hello, I'm John!"

// Call with person2 context
console.log(introduce.call(person2, "Hi", ".")); 
// "Hi, I'm Alice."

// ============================================
// APPLY METHOD
// ============================================

function sum() {
  return Array.from(arguments).reduce((a, b) => a + b, 0);
}

const numbers = [1, 2, 3, 4, 5];

// apply with array of arguments
console.log(sum.apply(null, numbers)); // 15

// Using call would require: sum.call(null, 1, 2, 3, 4, 5)
// apply is more convenient with arrays

// ============================================
// BIND METHOD
// ============================================

const person = {
  name: "John",
  greet: function(greeting) {
    return `${greeting}, ${this.name}!`;
  }
};

// Bind to person
const boundGreet = person.greet.bind(person);
console.log(boundGreet("Hello")); // "Hello, John!"

// Extract method (loses context)
const extractedGreet = person.greet;
console.log(extractedGreet("Hello")); // "Hello, undefined!"

// ============================================
// FUNCTION BORROWING
// ============================================

const car = {
  brand: "Toyota",
  model: "Camry"
};

const bike = {
  brand: "Yamaha",
  model: "R1"
};

function getDescription() {
  return `${this.brand} ${this.model}`;
}

// Borrow function for car
console.log(getDescription.call(car)); // "Toyota Camry"

// Borrow function for bike
console.log(getDescription.call(bike)); // "Yamaha R1"

// ============================================
// PARTIAL APPLICATION WITH BIND
// ============================================

function multiply(a, b, c) {
  return a * b * c;
}

// Bind first argument
const multiplyBy2 = multiply.bind(null, 2);
console.log(multiplyBy2(3, 4)); // 24 (2 * 3 * 4)

// Bind first two arguments
const multiplyBy2And3 = multiply.bind(null, 2, 3);
console.log(multiplyBy2And3(4)); // 24 (2 * 3 * 4)

// Bind all arguments
const multiplyAll = multiply.bind(null, 2, 3, 4);
console.log(multiplyAll()); // 24

// ============================================
// USING APPLY WITH MATH FUNCTIONS
// ============================================

const numbers = [5, 6, 2, 3, 7];

// Math.max doesn't accept array directly
// console.log(Math.max(numbers)); // NaN

// Use apply to pass array as arguments
console.log(Math.max.apply(null, numbers)); // 7
console.log(Math.min.apply(null, numbers)); // 2

// ES6 alternative: spread operator
console.log(Math.max(...numbers)); // 7

// ============================================
// BIND IN EVENT HANDLERS
// ============================================

class Button {
  constructor(text) {
    this.text = text;
  }
  
  handleClick() {
    console.log(`Button "${this.text}" clicked`);
  }
  
  setup() {
    // ❌ Lost context
    // document.addEventListener('click', this.handleClick);
    
    // ✅ Preserve context with bind
    document.addEventListener('click', this.handleClick.bind(this));
  }
}

const button = new Button("Submit");
button.setup();

// ============================================
// BIND IN CALLBACKS
// ============================================

const user = {
  name: "John",
  data: [1, 2, 3],
  processData: function() {
    return this.data.map(function(item) {
      // ❌ this is lost here
      return item * 2;
    });
  },
  processDataWithBind: function() {
    return this.data.map(function(item) {
      return `${this.name}: ${item * 2}`;
    }.bind(this)); // ✅ Bind preserves this
  },
  processDataWithArrow: function() {
    return this.data.map(item => {
      return `${this.name}: ${item * 2}`; // ✅ Arrow inherits this
    });
  }
};

console.log(user.processData()); // [2, 4, 6]
console.log(user.processDataWithBind()); // ["John: 2", "John: 4", "John: 6"]
console.log(user.processDataWithArrow()); // ["John: 2", "John: 4", "John: 6"]

// ============================================
// CHAINING WITH CALL
// ============================================

function Calculator() {
  this.value = 0;
}

Calculator.prototype.add = function(num) {
  this.value += num;
  return this; // Return this for chaining
};

Calculator.prototype.multiply = function(num) {
  this.value *= num;
  return this;
};

Calculator.prototype.subtract = function(num) {
  this.value -= num;
  return this;
};

const calc = new Calculator();
calc.add(10).multiply(2).subtract(5);
console.log(calc.value); // 15

// ============================================
// CUSTOM BIND IMPLEMENTATION
// ============================================

// Understanding how bind works internally
Function.prototype.myBind = function(context, ...args) {
  const fn = this;
  return function(...newArgs) {
    return fn.apply(context, [...args, ...newArgs]);
  };
};

function greet(greeting, name) {
  return `${greeting}, ${name}!`;
}

const boundGreet = greet.myBind(null, "Hello");
console.log(boundGreet("John")); // "Hello, John!"

// ============================================
// CALL VS APPLY PERFORMANCE
// ============================================

// For small number of arguments, call is slightly faster
function testCall() {
  return Math.max.call(null, 1, 2, 3, 4, 5);
}

function testApply() {
  return Math.max.apply(null, [1, 2, 3, 4, 5]);
}

// call is generally faster for fixed arguments
// apply is necessary for dynamic arguments

// ============================================
// BIND WITH ARGUMENTS (CURRYING)
// ============================================

function createURL(protocol, domain, path) {
  return `${protocol}://${domain}/${path}`;
}

// Create specialized functions
const createHTTPS = createURL.bind(null, "https");
const createHTTP = createURL.bind(null, "http");

console.log(createHTTPS("example.com", "api/users")); 
// "https://example.com/api/users"

console.log(createHTTP("localhost", "test")); 
// "http://localhost/test"

// ============================================
// PRESERVING CONTEXT IN ASYNC OPERATIONS
// ============================================

class DataFetcher {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }
  
  fetch(endpoint) {
    // Simulate async operation
    setTimeout(function() {
      // ❌ this is lost
      console.log(`Fetching from ${this.apiUrl}/${endpoint}`);
    }, 100);
  }
  
  fetchWithBind(endpoint) {
    setTimeout(function() {
      // ✅ this preserved
      console.log(`Fetching from ${this.apiUrl}/${endpoint}`);
    }.bind(this), 100);
  }
}

const fetcher = new DataFetcher("https://api.example.com");
fetcher.fetch("users"); // undefined/users
fetcher.fetchWithBind("users"); // https://api.example.com/users
```

---

## E) Internal Working

### Step-by-Step Internal Flow

**1. call() Execution**
```
function.call(thisArg, ...args) called
    ↓
Create new execution context
    ↓
Set this = thisArg
    ↓
Pass arguments to function
    ↓
Execute function with new context
    ↓
Return function result
    ↓
Restore original context
```

**2. apply() Execution**
```
function.apply(thisArg, [args]) called
    ↓
Create new execution context
    ↓
Set this = thisArg
    ↓
Convert array to argument list
    ↓
Pass arguments to function
    ↓
Execute function with new context
    ↓
Return function result
```

**3. bind() Execution**
```
function.bind(thisArg, ...args) called
    ↓
Create closure with:
  - Original function
  - Bound thisArg
  - Pre-filled arguments
    ↓
Return new function
    ↓
New function stores bound context
    ↓
When called, uses stored context
```

### Memory Representation

**Bound Function:**
```
Bound Function {
  [[BoundTargetFunction]]: original function,
  [[BoundThis]]: thisArg,
  [[BoundArguments]]: [pre-filled args],
  [[Call]]: internal method
}
```

### Performance Considerations

**call vs apply:**
- `call` slightly faster for fixed arguments
- `apply` has overhead of array handling
- Use `call` when arguments are known
- Use `apply` when arguments are dynamic

**bind:**
- Creates new function object
- Has memory overhead
- Use when context needs preservation
- Avoid excessive binding

---

## F) Interview Questions & Answers

### Q1: What is the difference between call, apply, and bind?

**Answer:**
`call` and `apply` execute the function immediately with explicit `this` context. `call` takes arguments individually, while `apply` takes arguments as an array. `bind` doesn't execute immediately - it returns a new function with `this` permanently bound. `bind` is useful for preserving context in callbacks, while `call`/`apply` are for immediate execution with different context.

### Q2: When would you use apply instead of call?

**Answer:**
Use `apply` when you have arguments in an array or when the number of arguments is dynamic. For example, when using `Math.max` with an array of numbers, or when passing arguments from another function. `call` requires listing arguments individually, which is inconvenient with arrays.

### Q3: How does bind work internally?

**Answer:**
`bind` creates a closure that stores the original function, the bound `this` context, and any pre-filled arguments. When the bound function is called, it uses the stored context and combines pre-filled arguments with new arguments, then calls the original function with `apply` using the bound context.

### Q4: What is function borrowing?

**Answer:**
Function borrowing is using a method from one object on another object using `call` or `apply`. Instead of duplicating code, you borrow the method and change its context. For example, array methods can be borrowed for array-like objects using `Array.prototype.slice.call(arguments)`.

### Q5: Can you change the context after binding?

**Answer:**
No, once a function is bound with `bind`, the context is permanently set and cannot be changed. The bound function will always use the `this` value that was provided during binding. If you need different contexts, you need to create new bound functions.

### Q6: What is partial application with bind?

**Answer:**
Partial application is pre-filling some arguments of a function using `bind`. You provide `this` (can be `null` if not needed) and some arguments, and `bind` returns a new function that only needs the remaining arguments. This creates specialized versions of functions.

### Q7: How do call, apply, and bind relate to arrow functions?

**Answer:**
Arrow functions don't have their own `this` binding, so `call`, `apply`, and `bind` cannot change their `this` value. Arrow functions always use the `this` from their lexical (outer) scope. If you need to change context, use regular functions with these methods.

---

## G) Common Mistakes

### Mistake 1: Using bind When call/apply Would Work

```javascript
// ❌ WRONG - Unnecessary binding
const result = someFunction.bind(obj, arg1, arg2)();

// ✅ CORRECT - Direct call
const result = someFunction.call(obj, arg1, arg2);
```

**Why it breaks:** `bind` creates unnecessary function when immediate execution is needed.

### Mistake 2: Forgetting bind Returns Function

```javascript
// ❌ WRONG - bind doesn't execute
const bound = func.bind(obj);
// Function not called!

// ✅ CORRECT
const bound = func.bind(obj);
bound(); // Now it's called
```

**Why it breaks:** `bind` returns a function, doesn't execute it.

### Mistake 3: Using apply with Individual Arguments

```javascript
// ❌ WRONG - apply expects array
func.apply(obj, arg1, arg2); // Error

// ✅ CORRECT
func.apply(obj, [arg1, arg2]);
// OR use call
func.call(obj, arg1, arg2);
```

**Why it breaks:** `apply` second argument must be array-like.

### Mistake 4: Binding Arrow Functions

```javascript
// ❌ WRONG - bind doesn't work on arrow functions
const arrow = () => console.log(this);
const bound = arrow.bind({ name: "John" });
bound(); // Still uses outer this, not bound object

// ✅ CORRECT - Use regular function
const regular = function() { console.log(this); };
const bound = regular.bind({ name: "John" });
bound(); // Uses bound object
```

**Why it breaks:** Arrow functions ignore `bind` because they don't have `this`.

### Mistake 5: Not Preserving Context in Callbacks

```javascript
// ❌ WRONG
class Handler {
  handle() {
    setTimeout(this.process, 100); // Lost context
  }
  process() {
    console.log(this.data); // undefined
  }
}

// ✅ CORRECT
class Handler {
  handle() {
    setTimeout(this.process.bind(this), 100);
    // OR
    setTimeout(() => this.process(), 100);
  }
}
```

**Why it breaks:** Callbacks lose method context without binding.

---

## H) When to Use & When NOT to Use

### When These Methods are Essential

**1. Context Management**
- Preserving `this` in callbacks
- Event handlers
- Async operations
- Method extraction

**2. Function Reusability**
- Function borrowing
- Utility functions
- Code reuse
- DRY principle

**3. Functional Programming**
- Partial application
- Currying
- Function composition
- Higher-order functions

**4. Framework Development**
- Library APIs
- Plugin systems
- Method delegation
- Context passing

### When NOT to Use

**1. Arrow Functions**
- Arrow functions don't need binding
- They inherit `this` lexically
- `call`/`apply`/`bind` don't work on them

**2. Simple Cases**
- When context is already correct
- When arrow functions suffice
- When not needed
- Over-engineering

**3. Performance Critical**
- `bind` creates new function (overhead)
- `call`/`apply` have slight overhead
- Use only when necessary

### Backend Perspective

**Node.js:**
- Express middleware
- Request handlers
- Service methods
- Context preservation

**When it matters:**
- Middleware context
- Request/response handling
- Service method calls
- Callback preservation

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain call, apply, and bind."

**You:**
"`call`, `apply`, and `bind` are methods that allow you to explicitly set the `this` context for a function.

`call` executes the function immediately with a new `this` context, passing arguments individually. `apply` does the same but takes arguments as an array, which is useful when you have dynamic arguments or an array of values.

`bind` is different - it doesn't execute the function. Instead, it returns a new function with `this` permanently bound. This is useful for preserving context in callbacks or event handlers. You can also use `bind` for partial application by pre-filling some arguments.

The key difference: `call` and `apply` are for immediate execution with different context, while `bind` is for creating a new function with preserved context. `call` is slightly faster than `apply` for fixed arguments, but `apply` is necessary when arguments are in an array.

These methods enable function borrowing - using a method from one object on another object, which promotes code reuse."

---

## J) Mini Practice Task

### Task: Implement Function Utilities

Create utility functions for common call/apply/bind patterns:

**Requirements:**
1. Create `FunctionUtils` object with:
   - `borrowMethod(obj, methodName, targetObj)`: Borrow method to another object
   - `createBoundMethod(obj, methodName)`: Create bound method
   - `partialApply(fn, ...args)`: Partial application helper
   - `defer(fn, context, ...args)`: Defer function execution

2. Test with various scenarios:
   - Method borrowing
   - Context preservation
   - Partial application
   - Deferred execution

**Expected Output:**
```
Borrowed method works on target
Bound method preserves context
Partial function works correctly
Deferred execution successful
```

**Solution Template:**
```javascript
const FunctionUtils = {
  borrowMethod(obj, methodName, targetObj) {
    // Your implementation
  },
  // ... other methods
};
```

---

**END OF TOPIC: CALL, APPLY, BIND**

