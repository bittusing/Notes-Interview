# PRIORITY QUEUE

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Priority Queue kya hai?**
- Priority Queue elements ko priority ke basis par serve karta hai
- Highest priority element pehle niklega
- Heap se implement hota hai
- FIFO nahi, priority-based
- Real-world applications bahut hain

**Real-life Analogy:**
- Priority Queue = Hospital emergency
- Priority = Urgency
- High priority = Critical patient (pehle)
- Low priority = Normal patient (baad mein)
- Not FIFO = Not first-come-first-served

**Priority Queue Operations:**
- **Enqueue:** Add with priority
- **Dequeue:** Remove highest priority
- **Peek:** View highest priority
- **Update Priority:** Change priority

**Implementation:**
- **Heap-based:** Most common (efficient)
- **Array-based:** Simple but slow
- **Balanced BST:** Also possible

---

## B) Easy English Theory

### What is Priority Queue?

Priority Queue serves elements based on priority, not insertion order. Highest priority element removed first. Operations: Enqueue O(log n), Dequeue O(log n), Peek O(1). Usually implemented with heap (min heap for min priority, max heap for max priority). Use for: Task scheduling, Dijkstra's algorithm, event simulation, resource allocation.

---

## C) Why This Concept Exists

### The Problem

**Without Priority Queue:**
- No priority-based processing
- FIFO only
- Inefficient task scheduling
- No urgency handling

### The Solution

**Priority Queue Provides:**
1. **Priority Processing:** Urgent first
2. **Efficiency:** O(log n) operations
3. **Flexibility:** Dynamic priorities
4. **Applications:** Real-world use

---

## D) Practical Example (Code)

```javascript
// ============================================
// PRIORITY QUEUE IMPLEMENTATION (HEAP-BASED)
// ============================================

class PriorityQueue {
  constructor(compareFn = (a, b) => a - b) {
    this.heap = [];
    this.compare = compareFn; // Min heap by default
  }
  
  getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }
  
  getLeftChildIndex(index) {
    return 2 * index + 1;
  }
  
  getRightChildIndex(index) {
    return 2 * index + 2;
  }
  
  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }
  
  // Enqueue (add with priority)
  enqueue(element, priority) {
    const item = { element, priority };
    this.heap.push(item);
    this.heapifyUp(this.heap.length - 1);
    return this;
  }
  
  heapifyUp(index) {
    while (index > 0) {
      const parentIndex = this.getParentIndex(index);
      
      if (this.compare(this.heap[parentIndex].priority, this.heap[index].priority) <= 0) {
        break;
      }
      
      this.swap(parentIndex, index);
      index = parentIndex;
    }
  }
  
  // Dequeue (remove highest priority)
  dequeue() {
    if (this.isEmpty()) {
      throw new Error('Priority queue is empty');
    }
    
    if (this.heap.length === 1) {
      return this.heap.pop().element;
    }
    
    const top = this.heap[0].element;
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);
    
    return top;
  }
  
  heapifyDown(index) {
    while (true) {
      let smallest = index;
      const left = this.getLeftChildIndex(index);
      const right = this.getRightChildIndex(index);
      
      if (left < this.heap.length && 
          this.compare(this.heap[left].priority, this.heap[smallest].priority) < 0) {
        smallest = left;
      }
      
      if (right < this.heap.length && 
          this.compare(this.heap[right].priority, this.heap[smallest].priority) < 0) {
        smallest = right;
      }
      
      if (smallest === index) {
        break;
      }
      
      this.swap(index, smallest);
      index = smallest;
    }
  }
  
  // Peek (view highest priority)
  peek() {
    if (this.isEmpty()) {
      throw new Error('Priority queue is empty');
    }
    return this.heap[0].element;
  }
  
  isEmpty() {
    return this.heap.length === 0;
  }
  
  size() {
    return this.heap.length;
  }
}

// ============================================
// USAGE EXAMPLES
// ============================================

// Min priority queue (lowest priority first)
const minPQ = new PriorityQueue((a, b) => a - b);
minPQ.enqueue('task1', 3);
minPQ.enqueue('task2', 1);
minPQ.enqueue('task3', 2);
minPQ.dequeue(); // 'task2' (priority 1)

// Max priority queue (highest priority first)
const maxPQ = new PriorityQueue((a, b) => b - a);
maxPQ.enqueue('task1', 3);
maxPQ.enqueue('task2', 1);
maxPQ.enqueue('task3', 2);
maxPQ.dequeue(); // 'task1' (priority 3)

// ============================================
// DIJKSTRA'S WITH PRIORITY QUEUE
// ============================================

function dijkstra(graph, start) {
  const distances = {};
  const pq = new PriorityQueue((a, b) => a.distance - b.distance);
  const visited = new Set();
  
  // Initialize
  for (let vertex in graph) {
    distances[vertex] = Infinity;
  }
  distances[start] = 0;
  pq.enqueue(start, 0);
  
  while (!pq.isEmpty()) {
    const current = pq.dequeue();
    
    if (visited.has(current)) continue;
    visited.add(current);
    
    for (let neighbor of graph[current] || []) {
      const { node, weight } = neighbor;
      const distance = distances[current] + weight;
      
      if (distance < distances[node]) {
        distances[node] = distance;
        pq.enqueue(node, distance);
      }
    }
  }
  
  return distances;
}

// ============================================
// MERGE K SORTED LISTS
// ============================================

function mergeKLists(lists) {
  const pq = new PriorityQueue((a, b) => a.val - b.val);
  
  // Insert first element of each list
  for (let list of lists) {
    if (list) {
      pq.enqueue({ val: list.val, list }, list.val);
    }
  }
  
  const dummy = { next: null };
  let current = dummy;
  
  while (!pq.isEmpty()) {
    const { val, list } = pq.dequeue();
    current.next = { val, next: null };
    current = current.next;
    
    if (list.next) {
      pq.enqueue({ val: list.next.val, list: list.next }, list.next.val);
    }
  }
  
  return dummy.next;
}

// ============================================
// TASK SCHEDULER
// ============================================

class TaskScheduler {
  constructor() {
    this.pq = new PriorityQueue((a, b) => a.priority - b.priority);
  }
  
  addTask(task, priority) {
    this.pq.enqueue(task, priority);
  }
  
  executeNext() {
    if (this.pq.isEmpty()) {
      return null;
    }
    return this.pq.dequeue();
  }
  
  peekNext() {
    return this.pq.peek();
  }
}
```

---

## E) Internal Working

**Priority Queue:**
- Heap-based implementation
- Enqueue: Add, heapify up
- Dequeue: Remove root, heapify down
- Peek: Root element

**Time Complexity:**
- Enqueue: O(log n)
- Dequeue: O(log n)
- Peek: O(1)

---

## F) Interview Questions & Answers

### Q1: What is Priority Queue and how is it implemented?

**Answer:**
Priority Queue serves elements by priority, not insertion order. Highest priority removed first. Usually implemented with heap (min heap for min priority, max heap for max priority). Operations: Enqueue O(log n) - add and heapify up, Dequeue O(log n) - remove root and heapify down, Peek O(1) - view root. Use for task scheduling, Dijkstra's algorithm, event simulation.

### Q2: What's the difference between Priority Queue and regular Queue?

**Answer:**
Regular Queue: FIFO (first in first out), insertion order matters, simple implementation. Priority Queue: Priority-based (highest priority first), insertion order doesn't matter, heap-based implementation. Regular queue for order preservation, priority queue for urgency/priority handling.

### Q3: How is Priority Queue used in Dijkstra's algorithm?

**Answer:**
Dijkstra's uses priority queue to always process closest unvisited vertex. Enqueue vertices with distance as priority, dequeue minimum distance vertex, update neighbors' distances, enqueue updated neighbors. Priority queue ensures always process closest vertex next, enabling O(E log V) time complexity.

---

## G) Common Mistakes

### Mistake 1: Wrong Priority Order

```javascript
// ❌ WRONG - Max priority but min heap
const pq = new PriorityQueue((a, b) => a - b);
pq.enqueue('urgent', 10); // High number = high priority
pq.dequeue(); // Gets lowest number, not highest

// ✅ CORRECT - Match heap type to priority
const pq = new PriorityQueue((a, b) => b - a); // Max heap
```

**Why it breaks:** Wrong priority order, incorrect results.

---

## H) When to Use & When NOT to Use

Use Priority Queue for task scheduling, Dijkstra's, event simulation, when need priority-based processing. Don't use when need FIFO order (use regular queue).

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain Priority Queue."

**You:**
"Priority Queue serves elements by priority, not insertion order. Highest priority removed first. Implemented with heap (min/max heap). Operations: Enqueue O(log n), Dequeue O(log n), Peek O(1).

Use for task scheduling, Dijkstra's algorithm (process closest vertex), event simulation. Different from regular queue (FIFO) - priority-based processing. Heap ensures efficient priority operations."

---

## J) Mini Practice Task

Implement: Priority Queue with heap, Dijkstra's algorithm, task scheduler, merge k sorted lists using priority queue.

---

**END OF TOPIC: PRIORITY QUEUE**

