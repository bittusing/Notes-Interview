# QUEUES FUNDAMENTALS

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Queue kya hai?**
- Queue FIFO (First In First Out) data structure hai
- First element jo add hua, wahi pehle niklega
- Ticket counter line jaisa - pehle aaya, pehle service
- Enqueue (add) aur Dequeue (remove) operations
- Front aur Rear ends hote hain

**Real-life Analogy:**
- Queue = Ticket counter line
- Enqueue = Line mein lag jana (rear se)
- Dequeue = Ticket lena (front se)
- Front = Service counter
- Rear = Line ka end

**Queue Operations:**
- **Enqueue:** Rear se element add
- **Dequeue:** Front se element remove
- **Front/Peek:** Front element dekhna
- **isEmpty:** Check if empty
- **Size:** Number of elements

**Queue Characteristics:**
- FIFO principle
- Front and rear ends
- O(1) enqueue/dequeue
- Linear data structure

---

## B) Easy English Theory

### What is Queue?

Queue is FIFO (First In First Out) data structure. First element added is first removed. Operations: Enqueue (add to rear O(1)), Dequeue (remove from front O(1)), Front (view front O(1)), isEmpty, Size. Use for: Task scheduling, BFS, request handling, printer queue. Can implement with array or linked list.

---

## C) Why This Concept Exists

### The Problem

**Without Queue:**
- Difficult to manage FIFO order
- Task scheduling complex
- Request handling hard
- No fair processing

### The Solution

**Queue Provides:**
1. **FIFO Order:** Natural first-in-first-out
2. **Task Scheduling:** Fair processing
3. **BFS:** Level-order traversal
4. **Request Handling:** Order processing

---

## D) Practical Example (Code)

```javascript
// ============================================
// QUEUE IMPLEMENTATION (ARRAY-BASED)
// ============================================

class Queue {
  constructor() {
    this.items = [];
    this.front = 0; // Front index
    this.rear = -1; // Rear index
  }
  
  // Enqueue element (O(1))
  enqueue(element) {
    this.items[++this.rear] = element;
    return this;
  }
  
  // Dequeue element (O(1))
  dequeue() {
    if (this.isEmpty()) {
      throw new Error('Queue is empty');
    }
    const element = this.items[this.front];
    this.items[this.front++] = undefined;
    return element;
  }
  
  // Front element (O(1))
  front() {
    if (this.isEmpty()) {
      throw new Error('Queue is empty');
    }
    return this.items[this.front];
  }
  
  // Check if empty (O(1))
  isEmpty() {
    return this.front > this.rear;
  }
  
  // Get size (O(1))
  size() {
    return this.rear - this.front + 1;
  }
  
  // Clear queue
  clear() {
    this.items = [];
    this.front = 0;
    this.rear = -1;
  }
  
  // Print queue
  print() {
    const result = [];
    for (let i = this.front; i <= this.rear; i++) {
      result.push(this.items[i]);
    }
    console.log(result.join(' <- '));
  }
}

// ============================================
// CIRCULAR QUEUE
// ============================================

class CircularQueue {
  constructor(capacity) {
    this.items = new Array(capacity);
    this.capacity = capacity;
    this.front = 0;
    this.rear = -1;
    this.size = 0;
  }
  
  enqueue(element) {
    if (this.isFull()) {
      throw new Error('Queue is full');
    }
    
    this.rear = (this.rear + 1) % this.capacity;
    this.items[this.rear] = element;
    this.size++;
    return this;
  }
  
  dequeue() {
    if (this.isEmpty()) {
      throw new Error('Queue is empty');
    }
    
    const element = this.items[this.front];
    this.items[this.front] = undefined;
    this.front = (this.front + 1) % this.capacity;
    this.size--;
    return element;
  }
  
  front() {
    if (this.isEmpty()) {
      throw new Error('Queue is empty');
    }
    return this.items[this.front];
  }
  
  isEmpty() {
    return this.size === 0;
  }
  
  isFull() {
    return this.size === this.capacity;
  }
}

// ============================================
// QUEUE IMPLEMENTATION (LINKED LIST-BASED)
// ============================================

class QueueNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedListQueue {
  constructor() {
    this.front = null;
    this.rear = null;
    this.size = 0;
  }
  
  enqueue(data) {
    const newNode = new QueueNode(data);
    
    if (this.isEmpty()) {
      this.front = newNode;
      this.rear = newNode;
    } else {
      this.rear.next = newNode;
      this.rear = newNode;
    }
    
    this.size++;
    return this;
  }
  
  dequeue() {
    if (this.isEmpty()) {
      throw new Error('Queue is empty');
    }
    
    const data = this.front.data;
    this.front = this.front.next;
    
    if (this.front === null) {
      this.rear = null; // Queue is empty
    }
    
    this.size--;
    return data;
  }
  
  front() {
    if (this.isEmpty()) {
      throw new Error('Queue is empty');
    }
    return this.front.data;
  }
  
  isEmpty() {
    return this.front === null;
  }
  
  getSize() {
    return this.size;
  }
}

// ============================================
// DEQUE (DOUBLE-ENDED QUEUE)
// ============================================

class Deque {
  constructor() {
    this.items = [];
    this.front = 0;
    this.rear = -1;
  }
  
  // Add to front
  addFront(element) {
    if (this.front > 0) {
      this.items[--this.front] = element;
    } else {
      this.items.unshift(element);
      this.rear++;
    }
    return this;
  }
  
  // Add to rear
  addRear(element) {
    this.items[++this.rear] = element;
    return this;
  }
  
  // Remove from front
  removeFront() {
    if (this.isEmpty()) {
      throw new Error('Deque is empty');
    }
    const element = this.items[this.front];
    this.items[this.front++] = undefined;
    return element;
  }
  
  // Remove from rear
  removeRear() {
    if (this.isEmpty()) {
      throw new Error('Deque is empty');
    }
    const element = this.items[this.rear];
    this.items[this.rear--] = undefined;
    return element;
  }
  
  isEmpty() {
    return this.front > this.rear;
  }
  
  size() {
    return this.rear - this.front + 1;
  }
}

// ============================================
// PROBLEM 1: BFS (BREADTH-FIRST SEARCH)
// ============================================

function bfs(graph, start) {
  const queue = [start];
  const visited = new Set([start]);
  const result = [];
  
  while (queue.length > 0) {
    const node = queue.shift(); // Dequeue
    result.push(node);
    
    for (let neighbor of graph[node] || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor); // Enqueue
      }
    }
  }
  
  return result;
}

// Time: O(V + E), Space: O(V)
const graph = {
  1: [2, 3],
  2: [4, 5],
  3: [6],
  4: [],
  5: [],
  6: []
};
bfs(graph, 1); // [1, 2, 3, 4, 5, 6]

// ============================================
// PROBLEM 2: LEVEL ORDER TRAVERSAL (BINARY TREE)
// ============================================

function levelOrder(root) {
  if (!root) return [];
  
  const result = [];
  const queue = [root];
  
  while (queue.length > 0) {
    const levelSize = queue.length;
    const level = [];
    
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      level.push(node.val);
      
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    
    result.push(level);
  }
  
  return result;
}

// ============================================
// PROBLEM 3: SLIDING WINDOW MAXIMUM
// ============================================

function maxSlidingWindow(nums, k) {
  const result = [];
  const deque = []; // Store indices
  
  for (let i = 0; i < nums.length; i++) {
    // Remove indices outside window
    while (deque.length > 0 && deque[0] <= i - k) {
      deque.shift();
    }
    
    // Remove smaller elements from rear
    while (deque.length > 0 && nums[deque[deque.length - 1]] < nums[i]) {
      deque.pop();
    }
    
    deque.push(i);
    
    // Add to result when window is complete
    if (i >= k - 1) {
      result.push(nums[deque[0]]);
    }
  }
  
  return result;
}

// Time: O(n), Space: O(k)
maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3);
// [3, 3, 5, 5, 6, 7]

// ============================================
// PROBLEM 4: DESIGN CIRCULAR QUEUE
// ============================================

class MyCircularQueue {
  constructor(k) {
    this.items = new Array(k);
    this.capacity = k;
    this.front = 0;
    this.rear = -1;
    this.size = 0;
  }
  
  enQueue(value) {
    if (this.isFull()) return false;
    
    this.rear = (this.rear + 1) % this.capacity;
    this.items[this.rear] = value;
    this.size++;
    return true;
  }
  
  deQueue() {
    if (this.isEmpty()) return false;
    
    this.items[this.front] = undefined;
    this.front = (this.front + 1) % this.capacity;
    this.size--;
    return true;
  }
  
  Front() {
    return this.isEmpty() ? -1 : this.items[this.front];
  }
  
  Rear() {
    return this.isEmpty() ? -1 : this.items[this.rear];
  }
  
  isEmpty() {
    return this.size === 0;
  }
  
  isFull() {
    return this.size === this.capacity;
  }
}

// ============================================
// PROBLEM 5: IMPLEMENT STACK USING QUEUES
// ============================================

class StackUsingQueues {
  constructor() {
    this.queue1 = [];
    this.queue2 = [];
  }
  
  push(x) {
    this.queue2.push(x);
    
    while (this.queue1.length > 0) {
      this.queue2.push(this.queue1.shift());
    }
    
    [this.queue1, this.queue2] = [this.queue2, this.queue1];
  }
  
  pop() {
    return this.queue1.shift();
  }
  
  top() {
    return this.queue1[0];
  }
  
  empty() {
    return this.queue1.length === 0;
  }
}

// ============================================
// PROBLEM 6: IMPLEMENT QUEUE USING STACKS
// ============================================

class QueueUsingStacks {
  constructor() {
    this.stack1 = [];
    this.stack2 = [];
  }
  
  enqueue(x) {
    this.stack1.push(x);
  }
  
  dequeue() {
    if (this.stack2.length === 0) {
      while (this.stack1.length > 0) {
        this.stack2.push(this.stack1.pop());
      }
    }
    return this.stack2.pop();
  }
  
  front() {
    if (this.stack2.length === 0) {
      while (this.stack1.length > 0) {
        this.stack2.push(this.stack1.pop());
      }
    }
    return this.stack2[this.stack2.length - 1];
  }
  
  empty() {
    return this.stack1.length === 0 && this.stack2.length === 0;
  }
}
```

---

## E) Internal Working

**Queue Operations:**
- Enqueue: Add to rear, increment rear
- Dequeue: Remove from front, increment front
- Circular: Wrap around using modulo

**Memory:**
- Array-based: Contiguous memory
- Linked list-based: Scattered nodes
- Both O(1) for enqueue/dequeue

---

## F) Interview Questions & Answers

### Q1: What is Queue and what are its operations?

**Answer:**
Queue is FIFO (First In First Out) data structure. Operations: Enqueue (add to rear O(1)), Dequeue (remove from front O(1)), Front (view front O(1)), isEmpty, Size. Can implement with array or linked list. Use for: Task scheduling, BFS, request handling, printer queue, level-order traversal.

### Q2: What is Circular Queue?

**Answer:**
Circular Queue is queue with fixed size that wraps around. When rear reaches end, it wraps to beginning. Benefits: Efficient memory usage (reuses space), fixed size. Implementation: Use modulo operation for wrapping. Use when need fixed-size queue with efficient space usage.

### Q3: How do you implement Queue using Stacks?

**Answer:**
Use two stacks: stack1 for enqueue, stack2 for dequeue. Enqueue: Push to stack1. Dequeue: If stack2 empty, pop all from stack1 to stack2, then pop from stack2. This reverses order making FIFO. Time: Enqueue O(1), Dequeue amortized O(1). Space: O(n).

---

## G) Common Mistakes

### Mistake 1: Dequeue from Empty Queue

```javascript
// ❌ WRONG - No check
const element = queue.dequeue();

// ✅ CORRECT - Check first
if (!queue.isEmpty()) {
  const element = queue.dequeue();
}
```

**Why it breaks:** Crashes when queue is empty.

---

## H) When to Use & When NOT to Use

Use Queue for FIFO operations, BFS, task scheduling, level-order traversal. Don't use when need LIFO order or random access.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain Queue."

**You:**
"Queue is FIFO data structure - first element added is first removed. Operations: Enqueue O(1) add to rear, Dequeue O(1) remove from front, Front O(1) view front. Can implement with array or linked list.

Use for: BFS, task scheduling, request handling, level-order traversal. Circular queue wraps around for efficient space usage. All main operations O(1) making it very efficient."

---

## J) Mini Practice Task

Implement: Queue operations, circular queue, BFS, level-order traversal, sliding window maximum, stack using queues, queue using stacks.

---

**END OF TOPIC: QUEUES FUNDAMENTALS**

