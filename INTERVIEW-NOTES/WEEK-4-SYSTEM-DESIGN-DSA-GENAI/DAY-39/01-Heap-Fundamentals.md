# HEAP FUNDAMENTALS

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Heap kya hai?**
- Heap complete binary tree hai
- Parent-child relationship maintain karta hai
- Min Heap: Parent <= Children
- Max Heap: Parent >= Children
- Array mein store hota hai

**Real-life Analogy:**
- Heap = Priority queue (hospital emergency)
- Min Heap = Most urgent first (smallest)
- Max Heap = Highest priority first (largest)
- Root = Top priority

**Heap Properties:**
- **Complete Binary Tree:** All levels filled (left to right)
- **Heap Property:** Parent-child relationship
- **Array Representation:** Efficient storage
- **Root Access:** O(1) for min/max

**Heap Types:**
- **Min Heap:** Root is minimum
- **Max Heap:** Root is maximum
- **Binary Heap:** Most common

---

## B) Easy English Theory

### What is Heap?

Heap is complete binary tree maintaining heap property. Min Heap: Parent <= children (root is minimum). Max Heap: Parent >= children (root is maximum). Stored in array. Operations: Insert O(log n), Extract min/max O(log n), Peek O(1). Use for: Priority queue, heap sort, finding k largest/smallest.

---

## C) Why This Concept Exists

### The Problem

**Without Heap:**
- No efficient priority access
- Slow min/max operations
- No priority queue
- Inefficient sorting

### The Solution

**Heap Provides:**
1. **Priority Access:** O(1) min/max
2. **Efficiency:** O(log n) insert/extract
3. **Priority Queue:** Natural implementation
4. **Sorting:** Heap sort

---

## D) Practical Example (Code)

```javascript
// ============================================
// MIN HEAP IMPLEMENTATION
// ============================================

class MinHeap {
  constructor() {
    this.heap = [];
  }
  
  // Get parent index
  getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }
  
  // Get left child index
  getLeftChildIndex(index) {
    return 2 * index + 1;
  }
  
  // Get right child index
  getRightChildIndex(index) {
    return 2 * index + 2;
  }
  
  // Swap elements
  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }
  
  // Insert element
  insert(value) {
    this.heap.push(value);
    this.heapifyUp(this.heap.length - 1);
    return this;
  }
  
  // Heapify up (after insert)
  heapifyUp(index) {
    while (index > 0) {
      const parentIndex = this.getParentIndex(index);
      
      if (this.heap[parentIndex] <= this.heap[index]) {
        break; // Heap property satisfied
      }
      
      this.swap(parentIndex, index);
      index = parentIndex;
    }
  }
  
  // Extract minimum
  extractMin() {
    if (this.heap.length === 0) {
      throw new Error('Heap is empty');
    }
    
    if (this.heap.length === 1) {
      return this.heap.pop();
    }
    
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);
    
    return min;
  }
  
  // Heapify down (after extract)
  heapifyDown(index) {
    while (true) {
      let smallest = index;
      const left = this.getLeftChildIndex(index);
      const right = this.getRightChildIndex(index);
      
      if (left < this.heap.length && this.heap[left] < this.heap[smallest]) {
        smallest = left;
      }
      
      if (right < this.heap.length && this.heap[right] < this.heap[smallest]) {
        smallest = right;
      }
      
      if (smallest === index) {
        break; // Heap property satisfied
      }
      
      this.swap(index, smallest);
      index = smallest;
    }
  }
  
  // Peek minimum
  peek() {
    return this.heap[0];
  }
  
  // Get size
  size() {
    return this.heap.length;
  }
  
  // Check if empty
  isEmpty() {
    return this.heap.length === 0;
  }
  
  // Build heap from array
  buildHeap(arr) {
    this.heap = [...arr];
    
    // Start from last non-leaf node
    for (let i = Math.floor(this.heap.length / 2) - 1; i >= 0; i--) {
      this.heapifyDown(i);
    }
    
    return this;
  }
}

// ============================================
// MAX HEAP IMPLEMENTATION
// ============================================

class MaxHeap {
  constructor() {
    this.heap = [];
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
  
  insert(value) {
    this.heap.push(value);
    this.heapifyUp(this.heap.length - 1);
    return this;
  }
  
  heapifyUp(index) {
    while (index > 0) {
      const parentIndex = this.getParentIndex(index);
      
      if (this.heap[parentIndex] >= this.heap[index]) {
        break;
      }
      
      this.swap(parentIndex, index);
      index = parentIndex;
    }
  }
  
  extractMax() {
    if (this.heap.length === 0) {
      throw new Error('Heap is empty');
    }
    
    if (this.heap.length === 1) {
      return this.heap.pop();
    }
    
    const max = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);
    
    return max;
  }
  
  heapifyDown(index) {
    while (true) {
      let largest = index;
      const left = this.getLeftChildIndex(index);
      const right = this.getRightChildIndex(index);
      
      if (left < this.heap.length && this.heap[left] > this.heap[largest]) {
        largest = left;
      }
      
      if (right < this.heap.length && this.heap[right] > this.heap[largest]) {
        largest = right;
      }
      
      if (largest === index) {
        break;
      }
      
      this.swap(index, largest);
      index = largest;
    }
  }
  
  peek() {
    return this.heap[0];
  }
}

// ============================================
// HEAP SORT
// ============================================

function heapSort(arr) {
  const heap = new MaxHeap();
  heap.buildHeap(arr);
  
  const sorted = [];
  while (!heap.isEmpty()) {
    sorted.unshift(heap.extractMax()); // Extract and add to front
  }
  
  return sorted;
}

// In-place heap sort
function heapSortInPlace(arr) {
  const n = arr.length;
  
  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  
  // Extract elements
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  
  return arr;
}

function heapify(arr, n, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }
  
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }
  
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}

// ============================================
// COMMON PROBLEMS
// ============================================

// 1. Kth Largest Element
function findKthLargest(nums, k) {
  const heap = new MinHeap();
  
  for (let num of nums) {
    heap.insert(num);
    
    // Keep only k largest
    if (heap.size() > k) {
      heap.extractMin();
    }
  }
  
  return heap.peek();
}

// 2. Top K Frequent Elements
function topKFrequent(nums, k) {
  const freq = {};
  
  // Count frequencies
  for (let num of nums) {
    freq[num] = (freq[num] || 0) + 1;
  }
  
  // Min heap of size k
  const heap = new MinHeap();
  
  for (let [num, count] of Object.entries(freq)) {
    heap.insert([count, num]);
    
    if (heap.size() > k) {
      heap.extractMin();
    }
  }
  
  return heap.heap.map(([count, num]) => num);
}

// 3. Merge K Sorted Lists
function mergeKLists(lists) {
  const heap = new MinHeap();
  
  // Insert first element of each list
  for (let list of lists) {
    if (list) {
      heap.insert({ val: list.val, list });
    }
  }
  
  const dummy = { next: null };
  let current = dummy;
  
  while (!heap.isEmpty()) {
    const { val, list } = heap.extractMin();
    current.next = { val, next: null };
    current = current.next;
    
    if (list.next) {
      heap.insert({ val: list.next.val, list: list.next });
    }
  }
  
  return dummy.next;
}

// 4. Find Median from Data Stream
class MedianFinder {
  constructor() {
    this.maxHeap = new MaxHeap(); // Lower half
    this.minHeap = new MinHeap(); // Upper half
  }
  
  addNum(num) {
    // Add to appropriate heap
    if (this.maxHeap.isEmpty() || num <= this.maxHeap.peek()) {
      this.maxHeap.insert(num);
    } else {
      this.minHeap.insert(num);
    }
    
    // Balance heaps (difference <= 1)
    if (this.maxHeap.size() > this.minHeap.size() + 1) {
      this.minHeap.insert(this.maxHeap.extractMax());
    } else if (this.minHeap.size() > this.maxHeap.size() + 1) {
      this.maxHeap.insert(this.minHeap.extractMin());
    }
  }
  
  findMedian() {
    if (this.maxHeap.size() === this.minHeap.size()) {
      return (this.maxHeap.peek() + this.minHeap.peek()) / 2;
    } else {
      return this.maxHeap.size() > this.minHeap.size() 
        ? this.maxHeap.peek() 
        : this.minHeap.peek();
    }
  }
}
```

---

## E) Internal Working

**Heap Structure:**
- Complete binary tree
- Array representation
- Parent at index i, children at 2i+1, 2i+2
- Heap property maintained

**Operations:**
- Insert: Add to end, heapify up
- Extract: Remove root, replace with last, heapify down

---

## F) Interview Questions & Answers

### Q1: What is Heap and how does it work?

**Answer:**
Heap is complete binary tree maintaining heap property. Min Heap: Parent <= children (root is minimum). Max Heap: Parent >= children (root is maximum). Stored in array: parent at i, children at 2i+1 and 2i+2. Operations: Insert O(log n) - add to end, heapify up, Extract min/max O(log n) - remove root, replace with last, heapify down, Peek O(1). Use for priority queue, heap sort.

### Q2: What is the difference between Heap and BST?

**Answer:**
Heap: Complete binary tree, heap property (parent-child relationship), O(1) min/max access, O(log n) insert/extract, partial ordering, array representation. BST: Binary search property (left < root < right), O(log n) search, O(log n) insert/delete, total ordering, pointer-based. Heap for priority queue, BST for search.

### Q3: How does Heap Sort work?

**Answer:**
Heap Sort: Build max heap from array (heapify from last non-leaf), repeatedly extract max (swap root with last, heapify down), array becomes sorted. Time O(n log n) - build heap O(n), n extractions O(n log n). Space O(1) in-place. Unstable sort. Guaranteed O(n log n) unlike Quick Sort.

---

## G) Common Mistakes

### Mistake 1: Wrong Heap Property

```javascript
// ❌ WRONG - Max heap but wrong comparison
if (this.heap[left] < this.heap[largest]) {
  largest = left;
}

// ✅ CORRECT - Max heap
if (this.heap[left] > this.heap[largest]) {
  largest = left;
}
```

**Why it breaks:** Wrong heap property, incorrect results.

---

## H) When to Use & When NOT to Use

Use Heap for priority queue, k largest/smallest, median finding, heap sort. Don't use when need search or total ordering (use BST).

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain Heap."

**You:**
"Heap is complete binary tree with heap property. Min Heap: Parent <= children (root is minimum). Max Heap: Parent >= children (root is maximum). Stored in array: parent at i, children at 2i+1, 2i+2.

Operations: Insert O(log n) - heapify up, Extract O(log n) - heapify down, Peek O(1). Use for priority queue, k largest/smallest, heap sort. Time O(n log n) for heap sort, guaranteed performance."

---

## J) Mini Practice Task

Implement: Min Heap, Max Heap, heap operations, heap sort, kth largest, top k frequent, merge k sorted lists, median finder.

---

**END OF TOPIC: HEAP FUNDAMENTALS**

