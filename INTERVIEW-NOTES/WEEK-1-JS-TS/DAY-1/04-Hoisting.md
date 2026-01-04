# HOISTING

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Hoisting kya hai?**
- Hoisting ek JavaScript behavior hai jahan variables aur function declarations ko code execute hone se pehle memory mein allocate kar diya jata hai
- Matlab, aap variables ko declare karne se pehle use kar sakte hain
- Ye JavaScript engine ki Creation Phase ka part hai
- Par dhyan rahe: sirf declaration hoisted hoti hai, initialization nahi

**Real-life Analogy:**
- Imagine ek warehouse jahan pehle se items ki list banai jati hai
- Items abhi warehouse mein nahi hain, par list ready hai
- Jab actual items aayenge, tab warehouse mein rakhe jayenge
- Hoisting wahi list banane jaisa hai - pehle se space reserve ho jata hai

### Types of Hoisting

**1. Variable Hoisting (var)**
- `var` declarations hoisted hote hain
- Value `undefined` se initialize hoti hai
- Declaration se pehle access kar sakte hain (undefined milega)

**2. Function Declaration Hoisting**
- Function declarations completely hoisted hote hain
- Declaration se pehle call kar sakte hain
- Complete function definition available hoti hai

**3. let/const Hoisting (Temporal Dead Zone)**
- `let` aur `const` bhi hoisted hote hain
- Par unhe access karne par error aata hai
- Ye Temporal Dead Zone (TDZ) kehlata hai
- Declaration line tak TDZ rehta hai

### var Hoisting Example

```javascript
console.log(myVar); // undefined (not error!)
var myVar = 10;
console.log(myVar); // 10
```

**Kya hua internally:**
1. Creation Phase: `var myVar` hoisted, value = `undefined`
2. Execution Phase: 
   - Line 1: `myVar` already exists, prints `undefined`
   - Line 2: `myVar = 10` assign hota hai
   - Line 3: `myVar` prints `10`

### Function Declaration Hoisting

```javascript
greet(); // "Hello!" - Works perfectly!

function greet() {
  console.log("Hello!");
}
```

**Kya hua internally:**
1. Creation Phase: `greet` function completely hoisted
2. Execution Phase: Function already available, call ho sakta hai

### let/const Hoisting (TDZ)

```javascript
console.log(myLet); // ReferenceError: Cannot access before initialization
let myLet = 10;
```

**Kya hua internally:**
1. Creation Phase: `let myLet` hoisted but in TDZ
2. Execution Phase: 
   - Line 1: TDZ mein hai, access = Error
   - Line 2: Declaration line, TDZ se bahar aata hai
   - Ab access possible hai

**Temporal Dead Zone:**
- Block start se declaration line tak
- Variable hoisted hai but inaccessible
- Access attempt = ReferenceError
- Declaration line ke baad accessible

### Function Expression vs Declaration

**Function Declaration (Hoisted):**
```javascript
sayHello(); // Works!

function sayHello() {
  console.log("Hello");
}
```

**Function Expression (Not Fully Hoisted):**
```javascript
sayHello(); // TypeError: sayHello is not a function

var sayHello = function() {
  console.log("Hello");
};
```

**Kya hua:**
- `var sayHello` hoisted as `undefined`
- Function assignment execution phase mein hota hai
- Isliye pehle `undefined` hai, function nahi

### Class Hoisting

```javascript
// ❌ Classes are NOT hoisted
const obj = new MyClass(); // ReferenceError

class MyClass {
  constructor() {
    this.name = "Test";
  }
}
```

**Important:** Classes hoisted nahi hote, par TDZ mein hote hain (let/const jaisa)

### Hoisting Order

**Priority Order:**
1. Function declarations (highest priority)
2. Variable declarations (var)
3. let/const (in TDZ)

**Example:**
```javascript
console.log(typeof myFunc); // "function" (not "undefined")
console.log(typeof myVar);  // "undefined"

function myFunc() {}
var myVar = 10;
```

### Multiple Declarations

**var - Allowed:**
```javascript
var x = 1;
var x = 2; // Allowed, overwrites
console.log(x); // 2
```

**let/const - Not Allowed:**
```javascript
let x = 1;
let x = 2; // SyntaxError: Identifier 'x' has already been declared
```

---

## B) Easy English Theory

### What is Hoisting?

Hoisting is JavaScript behavior where variable and function declarations are moved to the top of their scope during the Creation Phase, before code execution. This means you can use variables and functions before they are declared in code.

### Key Points

**1. Only Declarations Hoisted**
- Variable declarations are hoisted, not initializations
- Function declarations are fully hoisted
- Assignments happen during execution phase

**2. Different Behavior for Different Types**
- `var`: Hoisted, initialized as `undefined`
- `let/const`: Hoisted but in Temporal Dead Zone
- Function declarations: Fully hoisted and callable
- Function expressions: Variable hoisted, function not

**3. Scope Matters**
- Hoisting happens within scope (function/block)
- Global hoisting vs function hoisting
- Block scope affects `let/const` hoisting

### Temporal Dead Zone (TDZ)

For `let` and `const`, variables are hoisted but cannot be accessed until the declaration line is reached. This period between scope start and declaration is called Temporal Dead Zone. Accessing variable in TDZ throws ReferenceError.

---

## C) Why This Concept Exists

### The Problem

**Without Hoisting:**
- Must declare variables before use
- Functions must be defined before calling
- Code organization constraints
- Can't use mutual recursion easily

### The Solution

**Hoisting Provides:**
1. **Flexibility:** Call functions before definition
2. **Mutual Recursion:** Functions can call each other
3. **Code Organization:** Define functions at bottom, call at top
4. **Backward Compatibility:** Legacy code support

### Historical Context

- JavaScript was designed quickly
- Function declarations needed to work anywhere
- `var` hoisting was a side effect
- `let/const` added later with TDZ to fix issues

### Real-World Need

- **Function Organization:** Define helpers at bottom
- **Mutual Dependencies:** Functions calling each other
- **Legacy Code:** Old JavaScript patterns
- **Understanding Errors:** Why `undefined` or errors occur

---

## D) Practical Example (Code)

```javascript
// ============================================
// VAR HOISTING EXAMPLE
// ============================================

console.log(a); // undefined (not error!)
var a = 5;
console.log(a); // 5

// Internally, this is interpreted as:
// var a;           // Hoisted to top
// console.log(a);  // undefined
// a = 5;           // Assignment
// console.log(a);  // 5

// ============================================
// FUNCTION DECLARATION HOISTING
// ============================================

// Function can be called before declaration
greet("Alice"); // "Hello, Alice!" ✅ Works!

function greet(name) {
  console.log(`Hello, ${name}!`);
}

// This works because function is fully hoisted:
// function greet(name) { ... }  // Hoisted
// greet("Alice");               // Call works

// ============================================
// LET/CONST HOISTING (TDZ)
// ============================================

// ❌ ReferenceError: Cannot access 'x' before initialization
// console.log(x);
let x = 10;

// ✅ Works after declaration
let y = 20;
console.log(y); // 20

// TDZ Example:
function testTDZ() {
  console.log(typeof x); // ReferenceError (not "undefined"!)
  let x = 5;
}

// ============================================
// FUNCTION EXPRESSION HOISTING
// ============================================

// ❌ TypeError: sayHi is not a function
sayHi(); 

var sayHi = function() {
  console.log("Hi");
};

// Why? Because:
// var sayHi;                    // Hoisted as undefined
// sayHi();                      // Trying to call undefined
// sayHi = function() { ... };   // Assignment happens later

// ✅ Works if called after assignment
var sayHello = function() {
  console.log("Hello");
};
sayHello(); // "Hello"

// ============================================
// HOISTING ORDER AND PRIORITY
// ============================================

console.log(typeof func);  // "function" (not "undefined")
console.log(typeof var1);  // "undefined"

function func() {
  return "I'm a function";
}

var var1 = "I'm a variable";

// Priority: Functions > Variables

// ============================================
// MULTIPLE DECLARATIONS
// ============================================

// var - Allowed, last one wins
var name = "First";
var name = "Second";
console.log(name); // "Second"

// let/const - Not allowed
// let age = 20;
// let age = 30; // SyntaxError

// ============================================
// HOISTING IN DIFFERENT SCOPES
// ============================================

var globalVar = "Global";

function testScope() {
  console.log(globalVar); // "Global" (from outer scope)
  console.log(localVar); // undefined (hoisted in function scope)
  
  var localVar = "Local";
  console.log(localVar); // "Local"
}

testScope();

// ============================================
// BLOCK SCOPE HOISTING
// ============================================

function blockHoisting() {
  console.log(blockVar); // undefined (var is function-scoped)
  
  if (true) {
    var blockVar = "Inside block";
    let blockLet = "Let variable";
  }
  
  console.log(blockVar); // "Inside block" (accessible)
  // console.log(blockLet); // ReferenceError (let is block-scoped)
}

blockHoisting();

// ============================================
// HOISTING WITH ARROW FUNCTIONS
// ============================================

// Arrow functions are NOT hoisted (they're expressions)
// ❌ ReferenceError
// sayArrow();

const sayArrow = () => {
  console.log("Arrow function");
};

sayArrow(); // ✅ Works after declaration

// ============================================
// PRACTICAL: MUTUAL RECURSION (BENEFIT OF HOISTING)
// ============================================

// Functions can call each other because of hoisting
function isEven(n) {
  if (n === 0) return true;
  return isOdd(n - 1); // Calls isOdd before it's "defined"
}

function isOdd(n) {
  if (n === 0) return false;
  return isEven(n - 1); // Calls isEven
}

console.log(isEven(4)); // true
console.log(isOdd(5));  // true

// This works because both functions are hoisted

// ============================================
// COMMON HOISTING PITFALL
// ============================================

var items = ["apple", "banana", "orange"];

for (var i = 0; i < items.length; i++) {
  setTimeout(function() {
    console.log(items[i]); // Prints "undefined" 3 times!
  }, 100);
}

// Why? Because 'i' is hoisted to function scope
// All callbacks share same 'i' which is 3 after loop

// ✅ Fix 1: Use let (block scope)
for (let j = 0; j < items.length; j++) {
  setTimeout(function() {
    console.log(items[j]); // Works correctly
  }, 100);
}

// ✅ Fix 2: IIFE
for (var k = 0; k < items.length; k++) {
  (function(index) {
    setTimeout(function() {
      console.log(items[index]);
    }, 100);
  })(k);
}
```

---

## E) Internal Working

### Step-by-Step Internal Flow

**1. Code Parsing Phase**
```
JavaScript engine receives code
    ↓
Parses code into AST (Abstract Syntax Tree)
    ↓
Identifies all declarations
    ↓
Prepares for hoisting
```

**2. Creation Phase - Hoisting**
```
For each scope (global/function):
    ↓
a) Scan for function declarations
   - Store complete function in memory
   - Highest priority
    ↓
b) Scan for var declarations
   - Allocate memory
   - Initialize as undefined
    ↓
c) Scan for let/const declarations
   - Allocate memory
   - Mark as TDZ (Temporal Dead Zone)
    ↓
d) Create scope chain
```

**3. Execution Phase**
```
Execute code line by line:
    ↓
When variable accessed:
  - If var: Returns undefined (if not assigned yet)
  - If let/const in TDZ: Throws ReferenceError
  - If let/const after declaration: Returns value
    ↓
When function called:
  - If function declaration: Already in memory, executes
  - If function expression: Variable must be assigned first
    ↓
When assignment encountered:
  - Updates variable value
  - Removes from TDZ (for let/const)
```

### Memory Allocation

**Function Declarations:**
```
Creation Phase:
┌─────────────────────┐
│ Function Name       │ → Points to function object
│ Function Code       │ → Stored in memory
│ Scope Reference     │ → Links to outer scope
└─────────────────────┘
```

**var Declarations:**
```
Creation Phase:
┌─────────────────────┐
│ Variable Name       │ → Allocated in memory
│ Value: undefined    │ → Initialized
└─────────────────────┘

Execution Phase:
┌─────────────────────┐
│ Variable Name       │ → Same memory location
│ Value: actual value │ → Updated
└─────────────────────┘
```

**let/const Declarations:**
```
Creation Phase:
┌─────────────────────┐
│ Variable Name       │ → Allocated in memory
│ Status: TDZ         │ → Cannot access
└─────────────────────┘

After Declaration Line:
┌─────────────────────┐
│ Variable Name       │ → Same memory location
│ Status: Accessible  │ → Can access now
│ Value: assigned     │ → Value set
└─────────────────────┘
```

### TDZ Mechanism

**Temporal Dead Zone:**
- Starts: Beginning of scope (block/function)
- Ends: Declaration line execution
- Behavior: Access throws ReferenceError
- Purpose: Prevent using uninitialized variables

**Why TDZ Exists:**
- Prevents bugs from using undefined variables
- Forces proper initialization
- Makes `let/const` safer than `var`

---

## F) Interview Questions & Answers

### Q1: What is Hoisting in JavaScript?

**Answer:**
Hoisting is JavaScript behavior where variable and function declarations are moved to the top of their scope during the Creation Phase, before code execution. This allows using variables and functions before they are declared in the code. However, only declarations are hoisted, not initializations.

### Q2: What gets hoisted and what doesn't?

**Answer:**
Function declarations are fully hoisted and can be called before definition. `var` declarations are hoisted and initialized as `undefined`. `let` and `const` are hoisted but remain in Temporal Dead Zone until declaration line. Function expressions are not hoisted - only the variable is hoisted as `undefined`. Class declarations are not hoisted.

### Q3: What is Temporal Dead Zone?

**Answer:**
Temporal Dead Zone is the period between the start of a scope and the variable declaration line for `let` and `const`. During TDZ, variables are hoisted but cannot be accessed. Attempting to access them throws ReferenceError. TDZ ends when the declaration line is executed.

### Q4: Why does `var` return `undefined` but `let` throws error?

**Answer:**
`var` is hoisted and initialized as `undefined`, so accessing it before assignment returns `undefined`. `let` and `const` are hoisted but remain in Temporal Dead Zone, so accessing them before declaration throws ReferenceError. This makes `let/const` safer by preventing use of uninitialized variables.

### Q5: Are arrow functions hoisted?

**Answer:**
Arrow functions are not hoisted because they are function expressions, not declarations. If assigned to a `var`, the variable is hoisted as `undefined`. If assigned to `let/const`, they remain in TDZ. Arrow functions must be declared before use.

### Q6: What is the hoisting order/priority?

**Answer:**
Function declarations have highest priority and are hoisted first. Then `var` declarations are hoisted and initialized as `undefined`. `let` and `const` are hoisted but remain in TDZ. If a variable and function have same name, function declaration takes precedence.

### Q7: How does hoisting work in different scopes?

**Answer:**
Hoisting happens within each scope. Global declarations are hoisted to global scope. Function declarations are hoisted within their function scope. `var` is function-scoped, so it's hoisted to function top. `let/const` are block-scoped, so they're hoisted to block top but remain in TDZ until declaration.

---

## G) Common Mistakes

### Mistake 1: Assuming Variables are Not Hoisted

```javascript
// ❌ WRONG - Thinking this will error
console.log(x); // Actually prints undefined!
var x = 5;

// ✅ CORRECT - Understand hoisting
var x;           // Hoisted
console.log(x);  // undefined
x = 5;           // Assignment
```

**Why it breaks:** Developers expect error but get `undefined` due to hoisting.

### Mistake 2: Confusing Function Declaration vs Expression

```javascript
// ❌ WRONG - Thinking this works
myFunc(); // TypeError: myFunc is not a function

var myFunc = function() {
  console.log("Hello");
};

// ✅ CORRECT - Understand difference
function myFunc() {  // Declaration - hoisted
  console.log("Hello");
}
myFunc(); // Works
```

**Why it breaks:** Function expressions aren't hoisted, only the variable is.

### Mistake 3: Using let/const Before Declaration

```javascript
// ❌ WRONG - TDZ error
console.log(value); // ReferenceError
let value = 10;

// ✅ CORRECT - Declare first
let value = 10;
console.log(value); // 10
```

**Why it breaks:** `let/const` are in TDZ until declaration line.

### Mistake 4: Loop Variable Hoisting Issue

```javascript
// ❌ WRONG - All callbacks see same 'i'
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Prints: 3, 3, 3

// ✅ CORRECT - Use let (block scope)
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Prints: 0, 1, 2
```

**Why it breaks:** `var` is hoisted to function scope, all iterations share same variable.

### Mistake 5: Assuming Class is Hoisted

```javascript
// ❌ WRONG - Classes not hoisted
const obj = new MyClass(); // ReferenceError

class MyClass {
  constructor() {}
}

// ✅ CORRECT - Declare first
class MyClass {
  constructor() {}
}
const obj = new MyClass(); // Works
```

**Why it breaks:** Classes behave like `let/const` - hoisted but in TDZ.

---

## H) When to Use & When NOT to Use

### When Hoisting Knowledge is Critical

**1. Debugging**
- Understanding `undefined` values
- Fixing ReferenceError issues
- Understanding TDZ errors
- Reading stack traces

**2. Code Organization**
- Organizing function declarations
- Understanding execution order
- Avoiding hoisting pitfalls
- Writing maintainable code

**3. Legacy Code**
- Working with old JavaScript
- Understanding `var` behavior
- Migrating to `let/const`
- Fixing hoisting-related bugs

**4. Advanced Patterns**
- Mutual recursion
- Function organization
- Module patterns
- Understanding scope

### When NOT to Worry About It

**1. Modern Code with let/const**
- Using `let/const` everywhere
- Declaring before use (best practice)
- No hoisting surprises
- TDZ prevents issues

**2. TypeScript**
- TypeScript catches many issues
- Compile-time checks
- Better error messages
- Less hoisting confusion

**3. Framework Usage**
- React, Vue handle it
- Following framework patterns
- Standard practices
- No custom hoisting needed

### Backend Perspective

**Node.js:**
- Module-level hoisting
- `require()` hoisting behavior
- Understanding module scope
- CommonJS vs ES6 modules

**When it matters:**
- Module organization
- Understanding require behavior
- Circular dependencies
- Export/import order

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain Hoisting in JavaScript."

**You:**
"Hoisting is JavaScript behavior where variable and function declarations are moved to the top of their scope during the Creation Phase, before code execution. This means you can use variables and functions before they appear in code.

However, only declarations are hoisted, not initializations. For `var`, the declaration is hoisted and initialized as `undefined`, so accessing it before assignment returns `undefined`. Function declarations are fully hoisted, so you can call them before definition.

For `let` and `const`, they are also hoisted but remain in Temporal Dead Zone - a period between scope start and declaration line where accessing them throws ReferenceError. This makes them safer than `var`.

Function expressions and arrow functions are not hoisted - only the variable is hoisted as `undefined` if using `var`, or remains in TDZ if using `let/const`.

Understanding hoisting is crucial for debugging - when you see `undefined` instead of an error, or ReferenceError for `let/const`, it's due to hoisting behavior. The key is to always declare variables before use, which is best practice and avoids hoisting surprises."

---

## J) Mini Practice Task

### Task: Hoisting Behavior Analyzer

Create a tool that demonstrates and explains hoisting behavior:

**Requirements:**
1. Create function `analyzeHoisting(code)` that:
   - Takes JavaScript code as string
   - Simulates hoisting behavior
   - Shows what gets hoisted and in what order
   - Identifies potential issues

2. Test cases to handle:
   - `var` declarations
   - `let/const` declarations
   - Function declarations
   - Function expressions
   - Arrow functions
   - Mixed scenarios

3. Output should show:
   - Hoisted declarations
   - Execution order
   - TDZ warnings
   - Potential errors

**Expected Output:**
```
Input Code:
console.log(x);
var x = 5;

Hoisting Analysis:
1. var x (hoisted, initialized as undefined)
2. console.log(x) → prints undefined
3. x = 5 (assignment)

TDZ Detection:
let y;
console.log(y); // ✅ Safe
console.log(z); // ⚠️ TDZ Error
let z = 10;
```

**Solution Template:**
```javascript
function analyzeHoisting(code) {
  // Parse and identify declarations
  // Show hoisting order
  // Detect TDZ issues
  // Return analysis
}

// Test cases
analyzeHoisting(`
  console.log(a);
  var a = 10;
  function test() {}
  let b = 20;
`);
```

---

**END OF TOPIC: HOISTING**


