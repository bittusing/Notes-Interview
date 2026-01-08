# EXECUTION CONTEXT

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Execution Context kya hai?**
- Execution Context ek JavaScript concept hai jo define karta hai ki code kaise execute hota hai
- Ye ek "environment" hai jahan JavaScript code run hota hai
- Har function call par ek naya execution context banta hai
- Global level par bhi ek execution context hota hai

**Real-life Analogy:**
- Imagine ek classroom
- Har student (function) ko apni workspace (execution context) milti hai
- Workspace mein blackboard (variables), books (functions), aur teacher (this binding) hota hai
- Jab function call hota hai, usko nayi workspace milti hai
- Function complete hone par workspace destroy ho jati hai

### Types of Execution Context

**1. Global Execution Context (GEC)**
- Script run hone par create hota hai
- Ek hi baar create hota hai
- Sabse bottom level par hota hai
- `this` = `window` (browser) ya `global` (Node.js)

**2. Function Execution Context (FEC)**
- Har function call par create hota hai
- Function execute hone ke baad destroy ho jata hai
- Function ke andar ke variables, parameters, aur `this` binding define karta hai

**3. Eval Execution Context (EEC)**
- `eval()` function use hone par create hota hai
- Rarely used, avoid karo

### Execution Context ka Structure

**1. Variable Environment**
- `var` declarations store hoti hain
- Function declarations store hoti hain
- Arguments (function parameters) store hote hain

**2. Lexical Environment**
- `let` aur `const` declarations store hoti hain
- Scope chain maintain karta hai
- Outer environment reference rakhta hai

**3. this Binding**
- `this` ki value decide hoti hai
- Function call ke tarike se decide hota hai

### Phases of Execution Context

**1. Creation Phase (Memory Allocation)**
- Variables aur functions ko memory mein allocate kiya jata hai
- `var` = `undefined` (hoisting)
- `let`/`const` = uninitialized (Temporal Dead Zone)
- Function declarations = fully available
- `this` binding set hota hai
- Outer environment reference set hota hai

**2. Execution Phase (Code Execution)**
- Code line-by-line execute hota hai
- Variables ko values assign hoti hain
- Functions call hote hain
- Expressions evaluate hote hain

### Visual Example

```javascript
console.log(a); // undefined (not error!)
var a = 10;

function greet(name) {
  console.log("Hello", name);
}

greet("John");
```

**Execution Flow:**

```
STEP 1: Global Execution Context Creation Phase
┌─────────────────────────────────────┐
│ Variable Environment:               │
│   a = undefined                     │
│   greet = function() {...}          │
│                                     │
│ Lexical Environment:                │
│   (empty in this case)              │
│                                     │
│ this = window (browser)             │
│ Outer Environment = null            │
└─────────────────────────────────────┘

STEP 2: Global Execution Context Execution Phase
┌─────────────────────────────────────┐
│ console.log(a); → undefined        │
│ a = 10; → a now has value          │
│ greet("John"); → Function call     │
└─────────────────────────────────────┘

STEP 3: Function Execution Context Creation (for greet)
┌─────────────────────────────────────┐
│ Variable Environment:               │
│   name = "John" (parameter)         │
│                                     │
│ Lexical Environment:                │
│   (empty in this case)              │
│                                     │
│ this = window (default binding)     │
│ Outer Environment = Global EC       │
└─────────────────────────────────────┘

STEP 4: Function Execution Context Execution (for greet)
┌─────────────────────────────────────┐
│ console.log("Hello", name);        │
│ → "Hello John"                     │
│                                     │
│ Function completes, context destroy │
└─────────────────────────────────────┘
```

### Scope Chain

**What is Scope Chain?**
- Execution contexts ek chain banate hain
- Current context se start karke global tak
- Variables ko find karne ke liye scope chain traverse hoti hai
- Inner scope se outer scope ki taraf search hota hai

**Example:**
```javascript
var globalVar = "I'm global";

function outer() {
  var outerVar = "I'm outer";
  
  function inner() {
    var innerVar = "I'm inner";
    console.log(innerVar);   // Inner scope - found immediately
    console.log(outerVar);   // Outer scope - found in parent
    console.log(globalVar);  // Global scope - found in grandparent
  }
  
  inner();
}

outer();
```

**Scope Chain Visual:**
```
inner() Execution Context
    ↓ (outer environment reference)
outer() Execution Context
    ↓ (outer environment reference)
Global Execution Context
    ↓ (null - no parent)
```

---

## B) Easy English Theory

### What is Execution Context?

Execution Context is the environment where JavaScript code is executed. It determines the scope, variables, and function availability at any point during execution.

### Types of Execution Context

1. **Global Execution Context (GEC):** Created when script starts, exists throughout execution
2. **Function Execution Context (FEC):** Created for each function call, destroyed after execution
3. **Eval Execution Context:** Created when `eval()` is called (rarely used)

### Execution Context Components

1. **Variable Environment:** Stores `var` declarations, function declarations, and function arguments
2. **Lexical Environment:** Stores `let` and `const` declarations, maintains scope chain
3. **this Binding:** Determines the value of `this` keyword

### Two Phases

1. **Creation Phase:** Memory allocation, hoisting, `this` binding, outer reference setup
2. **Execution Phase:** Code execution, value assignments, function calls

### Scope Chain

The scope chain is a linked list of execution contexts used to resolve variable references. JavaScript searches from current context to global context until the variable is found.

---

## C) Why This Concept Exists

### The Problem

**Without Execution Context:**
- Variables ka scope determine karna mushkil
- Hoisting behavior samajhna mushkil
- `this` binding unpredictable ho jati
- Closure mechanism kaam nahi karti
- Scope chain resolve nahi hoti

### The Solution

**Execution Context Provides:**
1. **Scope Management:** Variables ka scope clearly define karta hai
2. **Memory Organization:** Variables aur functions ko organize karta hai
3. **Execution Control:** Code execution ka flow control karta hai
4. **this Binding:** `this` ki value properly determine karta hai
5. **Closure Support:** Outer scope access enable karta hai

---

## D) Practical Example (Code)

```javascript
// ============================================
// GLOBAL EXECUTION CONTEXT EXAMPLE
// ============================================

console.log("=== GLOBAL EXECUTION CONTEXT ===");

// Creation Phase:
// var globalVar = undefined (hoisted)
// var anotherVar = undefined (hoisted)
// function myFunction() {...} (hoisted)

var globalVar = "I'm global";
var anotherVar = 20;

function myFunction(param1, param2) {
  // Function Execution Context created here
  
  // Creation Phase (Function Context):
  // param1 = first argument value
  // param2 = second argument value
  // var localVar = undefined (hoisted)
  // this = window (default)
  
  var localVar = "I'm local";
  console.log("Global var:", globalVar);      // Access global
  console.log("Local var:", localVar);        // Access local
  console.log("Param1:", param1);             // Access parameter
  console.log("this:", this);                 // this binding
  
  return localVar + " " + param1;
}

// Execution Phase (Global):
var result = myFunction("Hello", "World");
console.log("Result:", result);

// Output:
// Global var: I'm global
// Local var: I'm local
// Param1: Hello
// this: Window {...}
// Result: I'm local Hello

// ============================================
// NESTED EXECUTION CONTEXTS
// ============================================

var outerVar = "outer";

function outerFunction() {
  var middleVar = "middle";
  
  function innerFunction() {
    var innerVar = "inner";
    
    // Scope chain: inner → outer → global
    console.log(innerVar);    // Found in inner context
    console.log(middleVar);   // Found in outer context
    console.log(outerVar);    // Found in global context
    console.log(globalVar);   // Found in global context
  }
  
  innerFunction();
}

outerFunction();

// Output:
// inner
// middle
// outer
// I'm global

// ============================================
// HOISTING IN EXECUTION CONTEXT
// ============================================

console.log("=== HOISTING BEHAVIOR ===");

// Creation Phase:
// var hoistedVar = undefined
// function hoistedFunc() {...} = function
// let hoistedLet = uninitialized (TDZ)
// const hoistedConst = uninitialized (TDZ)

console.log(hoistedVar);    // undefined (not error!)
// console.log(hoistedLet); // ReferenceError (TDZ)

var hoistedVar = "I'm hoisted";
let hoistedLet = "I'm not hoisted";
const hoistedConst = "Me too";

console.log(hoistedVar);   // "I'm hoisted"
console.log(hoistedLet);   // "I'm not hoisted"

// Function hoisting
hoistedFunc(); // Works! Function declaration hoisted

function hoistedFunc() {
  console.log("I'm hoisted function");
}

// Function expression - NOT hoisted
// funcExpr(); // TypeError: funcExpr is not a function

var funcExpr = function() {
  console.log("I'm not hoisted");
};

funcExpr(); // Works here

// ============================================
// THIS BINDING IN EXECUTION CONTEXT
// ============================================

console.log("=== THIS BINDING ===");

// Global context: this = window (browser)
console.log(this === window); // true (in browser)

function regularFunction() {
  // Default binding: this = window (in strict mode: undefined)
  console.log("Regular function this:", this);
}

regularFunction(); // this = window

const obj = {
  name: "MyObject",
  method: function() {
    // Implicit binding: this = obj
    console.log("Method this:", this);
    console.log("this.name:", this.name);
  },
  arrow: () => {
    // Arrow function: this = lexical this (window here)
    console.log("Arrow this:", this);
  }
};

obj.method(); // this = obj
obj.arrow();  // this = window (lexical)

// Explicit binding
function explicitFunction(param) {
  console.log("Explicit this:", this);
  console.log("Param:", param);
}

explicitFunction.call(obj, "Hello");  // this = obj
explicitFunction.apply(obj, ["World"]); // this = obj

const boundFunc = explicitFunction.bind(obj);
boundFunc("Bound"); // this = obj (permanently bound)

// ============================================
// CLOSURE AND EXECUTION CONTEXT
// ============================================

console.log("=== CLOSURE EXAMPLE ===");

function createCounter() {
  // Outer function's execution context
  let count = 0; // Stored in Variable Environment
  
  // Inner function creates closure
  return function() {
    // Inner function's execution context
    // Has reference to outer function's context
    count++; // Accessing outer scope variable
    return count;
  };
}

const counter = createCounter();
// createCounter execution context should be destroyed
// But inner function still has reference to it (closure)

console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3

// Closure preserves the execution context of outer function

// ============================================
// EXECUTION CONTEXT WITH LET/CONST
// ============================================

console.log("=== LET AND CONST IN EXECUTION CONTEXT ===");

function letConstExample() {
  // Creation Phase:
  // var oldVar = undefined (available)
  // let newLet = uninitialized (TDZ - cannot access)
  // const newConst = uninitialized (TDZ - cannot access)
  
  console.log(oldVar); // undefined
  // console.log(newLet); // ReferenceError: Cannot access before initialization
  
  var oldVar = "I'm var";
  let newLet = "I'm let";
  const newConst = "I'm const";
  
  // Block scope for let/const
  if (true) {
    let blockVar = "I'm in block";
    const blockConst = "Me too";
    var functionVar = "I'm in function scope"; // var doesn't have block scope
    
    console.log(blockVar);   // Works
    console.log(blockConst); // Works
  }
  
  // console.log(blockVar);   // ReferenceError: blockVar is not defined
  // console.log(blockConst); // ReferenceError: blockConst is not defined
  console.log(functionVar); // Works (function scope)
}

letConstExample();

// ============================================
// EXECUTION CONTEXT STACK VISUALIZATION
// ============================================

console.log("=== EXECUTION CONTEXT STACK ===");

function level1() {
  console.log("Level 1 executing");
  var var1 = "Level 1 variable";
  
  function level2() {
    console.log("Level 2 executing");
    var var2 = "Level 2 variable";
    console.log("Accessing level1 var:", var1); // Scope chain
    
    function level3() {
      console.log("Level 3 executing");
      var var3 = "Level 3 variable";
      console.log("Accessing level2 var:", var2); // Scope chain
      console.log("Accessing level1 var:", var1); // Scope chain
    }
    
    level3();
    console.log("Level 2 returning");
  }
  
  level2();
  console.log("Level 1 returning");
}

level1();

/*
Execution Context Stack Flow:

Step 1: Global EC
┌──────────────┐
│   Global EC  │
└──────────────┘

Step 2: level1() called
┌──────────────┐
│  level1() EC │
├──────────────┤
│   Global EC  │
└──────────────┘

Step 3: level2() called
┌──────────────┐
│  level2() EC │
├──────────────┤
│  level1() EC │
├──────────────┤
│   Global EC  │
└──────────────┘

Step 4: level3() called
┌──────────────┐
│  level3() EC │
├──────────────┤
│  level2() EC │
├──────────────┤
│  level1() EC │
├──────────────┤
│   Global EC  │
└──────────────┘

Step 5: level3() completes, pops
Step 6: level2() completes, pops
Step 7: level1() completes, pops
Step 8: Global EC remains
*/
```

---

## E) Internal Working

### Execution Context Lifecycle

**1. Creation Phase (Memory Creation Phase)**
- Variable declarations scanned (`var` = `undefined`)
- Function declarations scanned (fully hoisted)
- `let`/`const` declarations scanned (uninitialized, TDZ)
- `this` binding determined
- Outer environment reference created (for scope chain)
- Lexical environment created

**2. Execution Phase (Code Execution Phase)**
- Code line-by-line execute hota hai
- Variables ko values assign hoti hain
- Expressions evaluate hote hain
- Functions call hote hain (new EC created)
- Return values handle hote hain

**3. Destruction Phase**
- Function execution complete hone par
- Local variables destroy ho jate hain
- Context stack se pop hota hai
- Except: Closure ke case mein outer context preserve rehta hai

### Scope Chain Resolution

1. Variable reference mile
2. Current execution context mein search karo
3. Agar nahi mila, outer environment reference follow karo
4. Global context tak search karo
5. Agar kahi nahi mila, `ReferenceError`

### this Binding Rules

1. **Default Binding:** Regular function call → `this = window` (or `undefined` in strict mode)
2. **Implicit Binding:** Method call → `this = object` calling the method
3. **Explicit Binding:** `call()/apply()/bind()` → `this = specified object`
4. **new Binding:** Constructor call → `this = new object`
5. **Arrow Functions:** `this = lexical this` (parent's `this`)

---

## F) Interview Questions & Answers

### Q1: What is Execution Context?

**Answer:**
Execution Context is the environment where JavaScript code executes. It consists of Variable Environment (for `var` and functions), Lexical Environment (for `let`/`const` and scope chain), and `this` binding. It has two phases: Creation Phase (memory allocation, hoisting) and Execution Phase (code execution).

### Q2: Explain the difference between Variable Environment and Lexical Environment.

**Answer:**
Variable Environment stores `var` declarations, function declarations, and function arguments. Lexical Environment stores `let` and `const` declarations and maintains the scope chain through outer environment references. In ES6+, both exist but handle different types of declarations.

### Q3: What happens during the Creation Phase?

**Answer:**
During Creation Phase: (1) All variable declarations are scanned and `var` variables are initialized to `undefined`, (2) All function declarations are scanned and made fully available, (3) `let`/`const` are marked as uninitialized (Temporal Dead Zone), (4) `this` binding is determined, (5) Outer environment reference is created for scope chain.

### Q4: What is Scope Chain?

**Answer:**
Scope Chain is a linked list of execution contexts used to resolve variable references. When a variable is referenced, JavaScript searches from current context upward through outer environment references until it finds the variable or reaches global context. This enables inner functions to access outer scope variables.

### Q5: How does Closure relate to Execution Context?

**Answer:**
Closure is created when an inner function maintains a reference to its outer function's execution context even after the outer function has returned. This prevents the outer context from being garbage collected, preserving access to outer scope variables. Closure enables data privacy, function factories, and module patterns.

---

## G) Common Mistakes

### Mistake 1: Expecting `let`/`const` to be Hoisted

```javascript
// ❌ WRONG - Expecting undefined
console.log(letVar); // ReferenceError: Cannot access before initialization

let letVar = "value";

// ✅ CORRECT - Understanding TDZ
// let/const are hoisted but in Temporal Dead Zone
// Must declare before using
```

**Why it breaks:** `let`/`const` are hoisted but uninitialized. Accessing before initialization causes `ReferenceError`, not `undefined`.

### Mistake 2: Confusing `this` in Arrow Functions

```javascript
const obj = {
  name: "Object",
  regular: function() {
    console.log(this.name); // ✅ "Object"
  },
  arrow: () => {
    console.log(this.name); // ❌ undefined (this = window)
  }
};

obj.regular(); // "Object"
obj.arrow();   // undefined
```

**Why it breaks:** Arrow functions use lexical `this` (from parent scope), not binding-based `this`. Regular functions use call-site binding.

### Mistake 3: Assuming `var` has Block Scope

```javascript
if (true) {
  var x = 10;
  let y = 20;
}

console.log(x); // ✅ 10 (function scope)
console.log(y); // ❌ ReferenceError (block scope)
```

**Why it breaks:** `var` has function scope, not block scope. `let`/`const` have block scope.

### Mistake 4: Closure with Loop Variable

```javascript
// ❌ WRONG - All closures reference same variable
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i); // Prints: 3, 3, 3 (all closures see same i)
  }, 100);
}

// ✅ CORRECT - Each closure has own variable
for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i); // Prints: 0, 1, 2
  }, 100);
}
```

**Why it breaks:** `var` creates single variable shared by all closures. `let` creates new variable per iteration.

---

## H) When to Use & When NOT to Use

**Always Understand:**
- How execution context affects variable scope
- How hoisting works for different declarations
- How scope chain resolves variables
- How `this` binding works in different scenarios

**Avoid:**
- Assuming all variables are hoisted the same way
- Mixing `var` and `let`/`const` without understanding differences
- Using arrow functions when you need dynamic `this`
- Creating closures unintentionally (memory leaks)

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain Execution Context."

**You:**
"Execution Context is the environment where JavaScript code executes. It has three components: Variable Environment (for `var` and functions), Lexical Environment (for `let`/`const` and scope chain), and `this` binding. It has two phases: Creation Phase where memory is allocated and variables are hoisted, and Execution Phase where code actually runs. Global Execution Context is created when script starts, Function Execution Context is created for each function call. Scope chain links contexts enabling inner functions to access outer scope. Closure preserves outer execution context when inner function references it."

---

## J) Mini Practice Task

1. Write code demonstrating hoisting difference between `var`, `let`, and `const`
2. Create nested functions and explain their execution context stack
3. Implement closure that maintains state across multiple calls
4. Demonstrate `this` binding in different scenarios (regular, arrow, method, explicit)
5. Show scope chain resolution with variable access at different levels

---

**END OF TOPIC: EXECUTION CONTEXT**
