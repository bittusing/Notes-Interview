# DENTIRA INTERVIEW PREPARATION - PART 10
## Data Structures & Algorithms

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Data Structures kya hain?**
- Data ko organize karne ka tarika
- Efficient data storage
- Fast access patterns
- Different use cases ke liye different structures

**Algorithms kya hain?**
- Problems solve karne ka step-by-step process
- Efficient solutions
- Time and space complexity
- Optimization techniques

**Why Important for Backend?**
- **Performance:** Fast algorithms = fast APIs
- **Scalability:** Efficient code = handle more load
- **Problem Solving:** Complex problems solve karna
- **System Design:** Right data structures choose karna

---

## B) Essential Data Structures

### 1. Arrays

**Characteristics:**
- Ordered collection
- Index-based access
- O(1) access by index
- O(n) search

**Use Cases:**
- Storing lists
- Iteration
- Simple data storage

**Operations:**
```typescript
const arr = [1, 2, 3, 4, 5];

// Access: O(1)
arr[0]; // 1

// Search: O(n)
arr.indexOf(3); // 2

// Insert: O(n) (if not at end)
arr.splice(2, 0, 10); // Insert at index 2

// Delete: O(n)
arr.splice(2, 1); // Delete at index 2
```

### 2. Hash Tables / Objects / Maps

**Characteristics:**
- Key-value pairs
- O(1) average access
- Fast lookups
- No ordering

**Use Cases:**
- Caching
- Fast lookups
- Counting frequencies
- Storing user data

**Operations:**
```typescript
const map = new Map();

// Insert: O(1)
map.set('key', 'value');

// Access: O(1)
map.get('key'); // 'value'

// Delete: O(1)
map.delete('key');

// Check: O(1)
map.has('key'); // false
```

**Example - Frequency Counter:**
```typescript
function countFrequencies(arr: number[]): Map<number, number> {
  const freq = new Map();
  for (const num of arr) {
    freq.set(num, (freq.get(num) || 0) + 1);
  }
  return freq;
}
```

### 3. Stacks

**Characteristics:**
- LIFO (Last In First Out)
- O(1) push/pop
- Top element access

**Use Cases:**
- Function call stack
- Undo operations
- Expression evaluation
- Backtracking

**Implementation:**
```typescript
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}
```

**Example - Balanced Parentheses:**
```typescript
function isBalanced(str: string): boolean {
  const stack = new Stack<string>();
  const pairs: Record<string, string> = {
    ')': '(',
    '}': '{',
    ']': '['
  };

  for (const char of str) {
    if (char === '(' || char === '{' || char === '[') {
      stack.push(char);
    } else if (char === ')' || char === '}' || char === ']') {
      if (stack.isEmpty() || stack.pop() !== pairs[char]) {
        return false;
      }
    }
  }

  return stack.isEmpty();
}
```

### 4. Queues

**Characteristics:**
- FIFO (First In First Out)
- O(1) enqueue/dequeue
- Front element access

**Use Cases:**
- Task scheduling
- Message queues
- BFS (Breadth-First Search)
- Request handling

**Implementation:**
```typescript
class Queue<T> {
  private items: T[] = [];

  enqueue(item: T): void {
    this.items.push(item);
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }

  front(): T | undefined {
    return this.items[0];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}
```

### 5. Linked Lists

**Characteristics:**
- Dynamic size
- O(1) insert/delete at head
- O(n) search
- No random access

**Use Cases:**
- When size is unknown
- Frequent insertions/deletions
- Implementing stacks/queues

**Implementation:**
```typescript
class ListNode<T> {
  constructor(
    public value: T,
    public next: ListNode<T> | null = null
  ) {}
}

class LinkedList<T> {
  private head: ListNode<T> | null = null;

  insertAtHead(value: T): void {
    this.head = new ListNode(value, this.head);
  }

  find(value: T): ListNode<T> | null {
    let current = this.head;
    while (current) {
      if (current.value === value) return current;
      current = current.next;
    }
    return null;
  }

  delete(value: T): boolean {
    if (!this.head) return false;
    if (this.head.value === value) {
      this.head = this.head.next;
      return true;
    }

    let current = this.head;
    while (current.next) {
      if (current.next.value === value) {
        current.next = current.next.next;
        return true;
      }
      current = current.next;
    }
    return false;
  }
}
```

### 6. Trees

**Characteristics:**
- Hierarchical structure
- Parent-child relationships
- O(log n) operations (balanced)
- O(n) worst case

**Use Cases:**
- File systems
- Database indexes (B-trees)
- Decision trees
- Hierarchical data

**Binary Search Tree:**
```typescript
class TreeNode {
  constructor(
    public value: number,
    public left: TreeNode | null = null,
    public right: TreeNode | null = null
  ) {}
}

class BST {
  private root: TreeNode | null = null;

  insert(value: number): void {
    this.root = this.insertNode(this.root, value);
  }

  private insertNode(node: TreeNode | null, value: number): TreeNode {
    if (!node) return new TreeNode(value);
    
    if (value < node.value) {
      node.left = this.insertNode(node.left, value);
    } else {
      node.right = this.insertNode(node.right, value);
    }
    return node;
  }

  search(value: number): boolean {
    return this.searchNode(this.root, value);
  }

  private searchNode(node: TreeNode | null, value: number): boolean {
    if (!node) return false;
    if (value === node.value) return true;
    if (value < node.value) return this.searchNode(node.left, value);
    return this.searchNode(node.right, value);
  }
}
```

---

## C) Essential Algorithms

### 1. Sorting

**Quick Sort:**
```typescript
function quickSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;

  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const middle = arr.filter(x => x === pivot);
  const right = arr.filter(x => x > pivot);

  return [...quickSort(left), ...middle, ...quickSort(right)];
}

// Time: O(n log n) average, O(n²) worst
// Space: O(log n)
```

**Merge Sort:**
```typescript
function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left: number[], right: number[]): number[] {
  const result: number[] = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  return [...result, ...left.slice(i), ...right.slice(j)];
}

// Time: O(n log n)
// Space: O(n)
```

### 2. Searching

**Binary Search:**
```typescript
function binarySearch(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  return -1;
}

// Time: O(log n)
// Space: O(1)
```

### 3. Two Pointers

**Example - Two Sum (sorted array):**
```typescript
function twoSum(arr: number[], target: number): [number, number] | null {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    const sum = arr[left] + arr[right];
    if (sum === target) return [left, right];
    if (sum < target) left++;
    else right--;
  }

  return null;
}

// Time: O(n)
// Space: O(1)
```

### 4. Sliding Window

**Example - Maximum Sum Subarray:**
```typescript
function maxSumSubarray(arr: number[], k: number): number {
  let maxSum = 0;
  let windowSum = 0;

  // Calculate first window
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }
  maxSum = windowSum;

  // Slide window
  for (let i = k; i < arr.length; i++) {
    windowSum = windowSum - arr[i - k] + arr[i];
    maxSum = Math.max(maxSum, windowSum);
  }

  return maxSum;
}

// Time: O(n)
// Space: O(1)
```

### 5. Hash Map Patterns

**Example - Group Anagrams:**
```typescript
function groupAnagrams(strs: string[]): string[][] {
  const map = new Map<string, string[]>();

  for (const str of strs) {
    const key = str.split('').sort().join('');
    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key)!.push(str);
  }

  return Array.from(map.values());
}

// Time: O(n * k log k) where k is string length
// Space: O(n)
```

---

## D) Time & Space Complexity

### Big O Notation

**Common Complexities:**
- **O(1):** Constant time (array access, hash map)
- **O(log n):** Logarithmic (binary search)
- **O(n):** Linear (array iteration)
- **O(n log n):** Linearithmic (sorting)
- **O(n²):** Quadratic (nested loops)
- **O(2ⁿ):** Exponential (recursive Fibonacci)

**Examples:**
```typescript
// O(1)
function getFirst(arr: number[]): number {
  return arr[0];
}

// O(n)
function findMax(arr: number[]): number {
  let max = arr[0];
  for (const num of arr) {
    if (num > max) max = num;
  }
  return max;
}

// O(n²)
function bubbleSort(arr: number[]): number[] {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}
```

---

## E) Backend-Specific Algorithms

### 1. Rate Limiting (Sliding Window)

```typescript
class RateLimiter {
  private requests: Map<string, number[]> = new Map();

  isAllowed(userId: string, limit: number, windowMs: number): boolean {
    const now = Date.now();
    const userRequests = this.requests.get(userId) || [];

    // Remove old requests
    const validRequests = userRequests.filter(time => now - time < windowMs);

    if (validRequests.length >= limit) {
      return false;
    }

    validRequests.push(now);
    this.requests.set(userId, validRequests);
    return true;
  }
}
```

### 2. LRU Cache

```typescript
class LRUCache<K, V> {
  private capacity: number;
  private cache: Map<K, V> = new Map();

  constructor(capacity: number) {
    this.capacity = capacity;
  }

  get(key: K): V | undefined {
    if (!this.cache.has(key)) return undefined;

    const value = this.cache.get(key)!;
    // Move to end (most recently used)
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  put(key: K, value: V): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      // Remove least recently used (first item)
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }
}
```

### 3. Consistent Hashing

```typescript
class ConsistentHash {
  private nodes: string[] = [];
  private hashRing: Map<number, string> = new Map();

  addNode(node: string): void {
    this.nodes.push(node);
    // Add multiple virtual nodes for better distribution
    for (let i = 0; i < 100; i++) {
      const hash = this.hash(`${node}:${i}`);
      this.hashRing.set(hash, node);
    }
  }

  getNode(key: string): string {
    const hash = this.hash(key);
    const sortedHashes = Array.from(this.hashRing.keys()).sort((a, b) => a - b);
    
    for (const nodeHash of sortedHashes) {
      if (hash <= nodeHash) {
        return this.hashRing.get(nodeHash)!;
      }
    }
    
    // Wrap around
    return this.hashRing.get(sortedHashes[0])!;
  }

  private hash(str: string): number {
    // Simple hash function
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash = hash & hash;
    }
    return hash;
  }
}
```

---

## F) Interview Questions - Part 10

**Q1: "Explain time complexity of common operations"**

✅ **Answer:**
"Common time complexities:

**O(1) - Constant:**
- Array access by index
- Hash map get/set
- Stack push/pop

**O(log n) - Logarithmic:**
- Binary search
- Balanced tree operations

**O(n) - Linear:**
- Array iteration
- Linked list traversal
- Linear search

**O(n log n) - Linearithmic:**
- Efficient sorting (merge sort, quick sort)
- Heap operations

**O(n²) - Quadratic:**
- Nested loops
- Bubble sort
- Matrix operations

**O(2ⁿ) - Exponential:**
- Recursive Fibonacci
- Subset generation

For backend, I focus on O(1) and O(log n) operations for frequently called code paths."

**Q2: "How would you implement rate limiting?"**

✅ **Answer:**
"I'd use a sliding window algorithm:

**Approach:**
1. Track requests per user with timestamps
2. Remove requests outside time window
3. Check if count exceeds limit
4. Use in-memory store (Redis for distributed)

**Implementation:**
```typescript
class RateLimiter {
  private requests: Map<string, number[]>;
  
  isAllowed(userId: string, limit: number, windowMs: number): boolean {
    const now = Date.now();
    const userRequests = this.getRequests(userId);
    
    // Remove old requests
    const valid = userRequests.filter(t => now - t < windowMs);
    
    if (valid.length >= limit) return false;
    
    valid.push(now);
    this.setRequests(userId, valid);
    return true;
  }
}
```

**For distributed systems:**
- Use Redis with sorted sets
- Atomic operations
- TTL for cleanup"

**Q3: "Explain LRU Cache and when to use it"**

✅ **Answer:**
"LRU (Least Recently Used) Cache:
- Evicts least recently used items when full
- O(1) get and put operations
- Maintains access order

**Use Cases:**
- API response caching
- Database query caching
- Session storage
- Frequently accessed data

**Implementation:**
- Use Map (maintains insertion order in modern JS)
- Move accessed items to end
- Remove from front when capacity exceeded

**Benefits:**
- Fast access to hot data
- Memory efficient
- Automatic eviction

I use it for caching user sessions, API responses, and database query results."

---

## G) Key Takeaways

### Must Know:
1. ✅ Common data structures (arrays, maps, stacks, queues)
2. ✅ Time and space complexity
3. ✅ Sorting and searching algorithms
4. ✅ Two pointers and sliding window
5. ✅ Backend-specific algorithms (rate limiting, caching)
6. ✅ When to use which data structure

### Next Steps:
- Read dentira11.md for MERN Stack, Docker, Kubernetes
- Practice coding problems
- Understand algorithm trade-offs

---

**End of Part 10 - Continue to dentira11.md**

