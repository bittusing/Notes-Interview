# STACKS FUNDAMENTALS

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Stack kya hai?**
- Stack LIFO (Last In First Out) data structure hai
- Last element jo add hua, wahi pehle niklega
- Plate stack jaisa - top plate pehle uthate hain
- Push (add) aur Pop (remove) operations
- Top element access karte hain

**Real-life Analogy:**
- Stack = Plate stack (top se plate uthate hain)
- Push = Plate add karna (top par)
- Pop = Plate nikalna (top se)
- Peek = Top plate dekhna (without removing)

**Stack Operations:**
- **Push:** Top par element add
- **Pop:** Top element remove
- **Peek/Top:** Top element dekhna
- **isEmpty:** Check if empty
- **Size:** Number of elements

**Stack Characteristics:**
- LIFO principle
- Only top access
- O(1) push/pop
- Linear data structure

---

## B) Easy English Theory

### What is Stack?

Stack is LIFO (Last In First Out) data structure. Last element added is first removed. Operations: Push (add to top O(1)), Pop (remove from top O(1)), Peek (view top O(1)), isEmpty, Size. Use for: Function calls, expression evaluation, undo operations, backtracking. Can implement with array or linked list.

---

## C) Why This Concept Exists

### The Problem

**Without Stack:**
- Difficult to manage LIFO order
- Function calls complex
- Expression evaluation hard
- No undo mechanism

### The Solution

**Stack Provides:**
1. **LIFO Order:** Natural last-in-first-out
2. **Function Calls:** Call stack management
3. **Expression Evaluation:** Postfix/infix conversion
4. **Undo Operations:** Reverse operations

---

## D) Practical Example (Code)

```javascript
// ============================================
// STACK IMPLEMENTATION (ARRAY-BASED)
// ============================================

class Stack {
  constructor() {
    this.items = [];
    this.top = -1; // Index of top element
  }
  
  // Push element (O(1))
  push(element) {
    this.items[++this.top] = element;
    return this;
  }
  
  // Pop element (O(1))
  pop() {
    if (this.isEmpty()) {
      throw new Error('Stack is empty');
    }
    const element = this.items[this.top];
    this.items[this.top--] = undefined; // Remove reference
    return element;
  }
  
  // Peek top element (O(1))
  peek() {
    if (this.isEmpty()) {
      throw new Error('Stack is empty');
    }
    return this.items[this.top];
  }
  
  // Check if empty (O(1))
  isEmpty() {
    return this.top === -1;
  }
  
  // Get size (O(1))
  size() {
    return this.top + 1;
  }
  
  // Clear stack
  clear() {
    this.items = [];
    this.top = -1;
  }
  
  // Print stack
  print() {
    const result = [];
    for (let i = this.top; i >= 0; i--) {
      result.push(this.items[i]);
    }
    console.log(result.join(' <- '));
  }
}

// ============================================
// STACK IMPLEMENTATION (LINKED LIST-BASED)
// ============================================

class StackNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedListStack {
  constructor() {
    this.top = null;
    this.size = 0;
  }
  
  push(data) {
    const newNode = new StackNode(data);
    newNode.next = this.top;
    this.top = newNode;
    this.size++;
    return this;
  }
  
  pop() {
    if (this.isEmpty()) {
      throw new Error('Stack is empty');
    }
    const data = this.top.data;
    this.top = this.top.next;
    this.size--;
    return data;
  }
  
  peek() {
    if (this.isEmpty()) {
      throw new Error('Stack is empty');
    }
    return this.top.data;
  }
  
  isEmpty() {
    return this.top === null;
  }
  
  getSize() {
    return this.size;
  }
}

// ============================================
// PROBLEM 1: VALID PARENTHESES
// ============================================

function isValidParentheses(s) {
  const stack = [];
  const pairs = {
    ')': '(',
    '}': '{',
    ']': '['
  };
  
  for (let char of s) {
    if (char === '(' || char === '{' || char === '[') {
      stack.push(char);
    } else if (char === ')' || char === '}' || char === ']') {
      if (stack.length === 0 || stack.pop() !== pairs[char]) {
        return false;
      }
    }
  }
  
  return stack.length === 0;
}

// Time: O(n), Space: O(n)
isValidParentheses('()[]{}'); // true
isValidParentheses('([)]'); // false

// ============================================
// PROBLEM 2: NEXT GREATER ELEMENT
// ============================================

function nextGreaterElement(nums) {
  const result = new Array(nums.length).fill(-1);
  const stack = []; // Store indices
  
  for (let i = 0; i < nums.length; i++) {
    while (stack.length > 0 && nums[stack[stack.length - 1]] < nums[i]) {
      const index = stack.pop();
      result[index] = nums[i];
    }
    stack.push(i);
  }
  
  return result;
}

// Time: O(n), Space: O(n)
nextGreaterElement([4, 5, 2, 25]); // [5, 25, 25, -1]

// ============================================
// PROBLEM 3: DAILY TEMPERATURES
// ============================================

function dailyTemperatures(temperatures) {
  const result = new Array(temperatures.length).fill(0);
  const stack = []; // Store indices
  
  for (let i = 0; i < temperatures.length; i++) {
    while (stack.length > 0 && temperatures[stack[stack.length - 1]] < temperatures[i]) {
      const index = stack.pop();
      result[index] = i - index;
    }
    stack.push(i);
  }
  
  return result;
}

// Time: O(n), Space: O(n)
dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]);
// [1, 1, 4, 2, 1, 1, 0, 0]

// ============================================
// PROBLEM 4: LARGEST RECTANGLE IN HISTOGRAM
// ============================================

function largestRectangleArea(heights) {
  const stack = [];
  let maxArea = 0;
  
  for (let i = 0; i <= heights.length; i++) {
    const height = i === heights.length ? 0 : heights[i];
    
    while (stack.length > 0 && heights[stack[stack.length - 1]] > height) {
      const h = heights[stack.pop()];
      const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
      maxArea = Math.max(maxArea, h * width);
    }
    
    stack.push(i);
  }
  
  return maxArea;
}

// Time: O(n), Space: O(n)
largestRectangleArea([2, 1, 5, 6, 2, 3]); // 10

// ============================================
// PROBLEM 5: MIN STACK
// ============================================

class MinStack {
  constructor() {
    this.stack = [];
    this.minStack = []; // Track minimums
  }
  
  push(val) {
    this.stack.push(val);
    
    if (this.minStack.length === 0 || val <= this.minStack[this.minStack.length - 1]) {
      this.minStack.push(val);
    }
  }
  
  pop() {
    const val = this.stack.pop();
    
    if (val === this.minStack[this.minStack.length - 1]) {
      this.minStack.pop();
    }
    
    return val;
  }
  
  top() {
    return this.stack[this.stack.length - 1];
  }
  
  getMin() {
    return this.minStack[this.minStack.length - 1];
  }
}

// All operations O(1)

// ============================================
// PROBLEM 6: EVALUATE POSTFIX EXPRESSION
// ============================================

function evaluatePostfix(expression) {
  const stack = [];
  const operators = ['+', '-', '*', '/'];
  
  for (let token of expression.split(' ')) {
    if (operators.includes(token)) {
      const b = stack.pop();
      const a = stack.pop();
      
      switch (token) {
        case '+':
          stack.push(a + b);
          break;
        case '-':
          stack.push(a - b);
          break;
        case '*':
          stack.push(a * b);
          break;
        case '/':
          stack.push(Math.floor(a / b));
          break;
      }
    } else {
      stack.push(parseInt(token));
    }
  }
  
  return stack.pop();
}

// Time: O(n), Space: O(n)
evaluatePostfix('3 4 + 2 * 7 /'); // 2

// ============================================
// PROBLEM 7: INFIX TO POSTFIX
// ============================================

function infixToPostfix(infix) {
  const stack = [];
  const result = [];
  const precedence = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
    '^': 3
  };
  
  for (let char of infix) {
    if (char.match(/[a-zA-Z0-9]/)) {
      result.push(char);
    } else if (char === '(') {
      stack.push(char);
    } else if (char === ')') {
      while (stack.length > 0 && stack[stack.length - 1] !== '(') {
        result.push(stack.pop());
      }
      stack.pop(); // Remove '('
    } else {
      while (stack.length > 0 && 
             stack[stack.length - 1] !== '(' &&
             precedence[char] <= precedence[stack[stack.length - 1]]) {
        result.push(stack.pop());
      }
      stack.push(char);
    }
  }
  
  while (stack.length > 0) {
    result.push(stack.pop());
  }
  
  return result.join('');
}

// Time: O(n), Space: O(n)
infixToPostfix('A+B*C'); // 'ABC*+'

// ============================================
// PROBLEM 8: DECODE STRING
// ============================================

function decodeString(s) {
  const stack = [];
  
  for (let char of s) {
    if (char !== ']') {
      stack.push(char);
    } else {
      // Build string
      let str = '';
      while (stack[stack.length - 1] !== '[') {
        str = stack.pop() + str;
      }
      stack.pop(); // Remove '['
      
      // Build number
      let num = '';
      while (stack.length > 0 && !isNaN(stack[stack.length - 1])) {
        num = stack.pop() + num;
      }
      
      // Repeat and push back
      const repeated = str.repeat(parseInt(num));
      for (let c of repeated) {
        stack.push(c);
      }
    }
  }
  
  return stack.join('');
}

// Time: O(n), Space: O(n)
decodeString('3[a]2[bc]'); // 'aaabcbc'
```

---

## E) Internal Working

**Stack Operations:**
- Push: Add to top, increment pointer
- Pop: Remove from top, decrement pointer
- Peek: Access top without removing

**Memory:**
- Array-based: Contiguous memory
- Linked list-based: Scattered nodes
- Both O(1) for push/pop

---

## F) Interview Questions & Answers

### Q1: What is Stack and what are its operations?

**Answer:**
Stack is LIFO (Last In First Out) data structure. Operations: Push (add to top O(1)), Pop (remove from top O(1)), Peek (view top O(1)), isEmpty, Size. Can implement with array or linked list. Use for: Function calls, expression evaluation, undo operations, backtracking, parentheses matching.

### Q2: What are time complexities of Stack operations?

**Answer:**
Time complexities: Push O(1) - add to top, Pop O(1) - remove from top, Peek O(1) - access top, isEmpty O(1), Size O(1). Space: O(n) for n elements. All main operations are O(1) making stack very efficient.

### Q3: How do you use Stack for expression evaluation?

**Answer:**
Expression evaluation: Convert infix to postfix using stack (handle operator precedence), evaluate postfix using stack (push operands, pop two operands when operator, compute, push result). Stack naturally handles operator precedence and evaluation order. Use for: Calculator, expression parsers, compilers.

---

## G) Common Mistakes

### Mistake 1: Pop from Empty Stack

```javascript
// ❌ WRONG - No check
const element = stack.pop();

// ✅ CORRECT - Check first
if (!stack.isEmpty()) {
  const element = stack.pop();
}
```

**Why it breaks:** Crashes when stack is empty.

---

## H) When to Use & When NOT to Use

Use Stack for LIFO operations, function calls, expression evaluation, undo operations, backtracking. Don't use when need random access or FIFO order.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain Stack."

**You:**
"Stack is LIFO data structure - last element added is first removed. Operations: Push O(1) add to top, Pop O(1) remove from top, Peek O(1) view top. Can implement with array or linked list.

Use for: Function calls (call stack), expression evaluation (postfix), undo operations, parentheses matching, backtracking. All main operations O(1) making it very efficient."

---

## J) Mini Practice Task

Implement: Stack operations, valid parentheses, next greater element, min stack, expression evaluation, decode string.

---

**END OF TOPIC: STACKS FUNDAMENTALS**

