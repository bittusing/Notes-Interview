# LINKED LIST FUNDAMENTALS

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Linked List kya hai?**
- Linked List nodes ka collection hai
- Har node data aur next node ka reference store karta hai
- Nodes memory mein scattered hote hain (non-contiguous)
- Array se different - contiguous memory nahi chahiye
- Dynamic size - runtime par grow/shrink kar sakte hain

**Real-life Analogy:**
- Linked List = Treasure hunt (clues ka chain)
- Node = Clue (data + next clue ka location)
- Head = First clue
- Tail = Last clue (null point karta hai)
- Array = Apartment building (rooms sequence mein)
- Linked List = Scattered houses (address se connect)

**Linked List Structure:**
```
Node {
  data: value
  next: pointer to next node
}
```

**Types of Linked Lists:**
- **Singly Linked List:** Ek direction (forward only)
- **Doubly Linked List:** Dono directions (forward + backward)
- **Circular Linked List:** Last node first ko point karta hai

### Why Linked List?

**Array Problems:**
- Fixed size (static arrays)
- Insert/delete middle mein expensive (O(n))
- Memory waste (unused space)

**Linked List Benefits:**
- Dynamic size
- Easy insert/delete (O(1) if position known)
- No memory waste
- Flexible

---

## B) Easy English Theory

### What is Linked List?

Linked List is collection of nodes where each node contains data and reference to next node. Nodes stored in non-contiguous memory locations. Types: Singly (one direction), Doubly (both directions), Circular (last points to first). Benefits: Dynamic size, efficient insert/delete, no memory waste. Drawbacks: No random access, extra memory for pointers.

---

## C) Why This Concept Exists

### The Problem

**With Arrays:**
- Fixed size (static)
- Expensive middle insert/delete
- Memory waste
- Contiguous memory required

### The Solution

**Linked List Provides:**
1. **Dynamic Size:** Grow/shrink at runtime
2. **Efficient Insert/Delete:** O(1) if position known
3. **No Memory Waste:** Allocate as needed
4. **Flexibility:** Non-contiguous memory

---

## D) Practical Example (Code)

```javascript
// ============================================
// NODE CLASS
// ============================================

class ListNode {
  constructor(data) {
    this.data = data;
    this.next = null; // Pointer to next node
  }
}

// ============================================
// SINGLY LINKED LIST IMPLEMENTATION
// ============================================

class LinkedList {
  constructor() {
    this.head = null; // First node
    this.size = 0; // Number of nodes
  }
  
  // ============================================
  // INSERT OPERATIONS
  // ============================================
  
  // Insert at beginning (O(1))
  insertAtHead(data) {
    const newNode = new ListNode(data);
    newNode.next = this.head; // New node points to old head
    this.head = newNode; // New node becomes head
    this.size++;
    return this;
  }
  
  // Insert at end (O(n))
  insertAtTail(data) {
    const newNode = new ListNode(data);
    
    // If list is empty
    if (!this.head) {
      this.head = newNode;
      this.size++;
      return this;
    }
    
    // Traverse to last node
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    
    current.next = newNode; // Last node points to new node
    this.size++;
    return this;
  }
  
  // Insert at position (O(n))
  insertAtPosition(data, position) {
    if (position < 0 || position > this.size) {
      throw new Error('Invalid position');
    }
    
    if (position === 0) {
      return this.insertAtHead(data);
    }
    
    const newNode = new ListNode(data);
    let current = this.head;
    
    // Traverse to position - 1
    for (let i = 0; i < position - 1; i++) {
      current = current.next;
    }
    
    newNode.next = current.next; // New node points to next
    current.next = newNode; // Previous node points to new
    this.size++;
    return this;
  }
  
  // ============================================
  // DELETE OPERATIONS
  // ============================================
  
  // Delete from beginning (O(1))
  deleteAtHead() {
    if (!this.head) {
      return null;
    }
    
    const deletedData = this.head.data;
    this.head = this.head.next; // Move head to next node
    this.size--;
    return deletedData;
  }
  
  // Delete from end (O(n))
  deleteAtTail() {
    if (!this.head) {
      return null;
    }
    
    // If only one node
    if (!this.head.next) {
      const data = this.head.data;
      this.head = null;
      this.size--;
      return data;
    }
    
    // Traverse to second last node
    let current = this.head;
    while (current.next.next) {
      current = current.next;
    }
    
    const deletedData = current.next.data;
    current.next = null; // Remove last node
    this.size--;
    return deletedData;
  }
  
  // Delete by value (O(n))
  deleteByValue(value) {
    if (!this.head) {
      return false;
    }
    
    // If head contains value
    if (this.head.data === value) {
      this.head = this.head.next;
      this.size--;
      return true;
    }
    
    // Search for node with value
    let current = this.head;
    while (current.next && current.next.data !== value) {
      current = current.next;
    }
    
    if (current.next) {
      current.next = current.next.next; // Skip the node
      this.size--;
      return true;
    }
    
    return false; // Value not found
  }
  
  // Delete at position (O(n))
  deleteAtPosition(position) {
    if (position < 0 || position >= this.size) {
      throw new Error('Invalid position');
    }
    
    if (position === 0) {
      return this.deleteAtHead();
    }
    
    let current = this.head;
    // Traverse to position - 1
    for (let i = 0; i < position - 1; i++) {
      current = current.next;
    }
    
    const deletedData = current.next.data;
    current.next = current.next.next; // Skip the node
    this.size--;
    return deletedData;
  }
  
  // ============================================
  // SEARCH OPERATIONS
  // ============================================
  
  // Search by value (O(n))
  search(value) {
    let current = this.head;
    let index = 0;
    
    while (current) {
      if (current.data === value) {
        return index;
      }
      current = current.next;
      index++;
    }
    
    return -1; // Not found
  }
  
  // Get value at index (O(n))
  get(index) {
    if (index < 0 || index >= this.size) {
      throw new Error('Index out of bounds');
    }
    
    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }
    
    return current.data;
  }
  
  // ============================================
  // UTILITY OPERATIONS
  // ============================================
  
  // Get size
  getSize() {
    return this.size;
  }
  
  // Check if empty
  isEmpty() {
    return this.size === 0;
  }
  
  // Print list
  print() {
    let current = this.head;
    const result = [];
    
    while (current) {
      result.push(current.data);
      current = current.next;
    }
    
    console.log(result.join(' -> ') + ' -> null');
    return result;
  }
  
  // Convert to array
  toArray() {
    const arr = [];
    let current = this.head;
    
    while (current) {
      arr.push(current.data);
      current = current.next;
    }
    
    return arr;
  }
  
  // Reverse linked list (O(n))
  reverse() {
    let prev = null;
    let current = this.head;
    let next = null;
    
    while (current) {
      next = current.next; // Store next
      current.next = prev; // Reverse link
      prev = current; // Move prev forward
      current = next; // Move current forward
    }
    
    this.head = prev; // prev is new head
    return this;
  }
}

// ============================================
// USAGE EXAMPLE
// ============================================

const list = new LinkedList();

// Insert operations
list.insertAtHead(3);
list.insertAtHead(2);
list.insertAtHead(1);
list.insertAtTail(4);
list.insertAtTail(5);
list.insertAtPosition(99, 2);

list.print(); // 1 -> 2 -> 99 -> 3 -> 4 -> 5 -> null

// Search
console.log(list.search(99)); // 2
console.log(list.get(2)); // 99

// Delete
list.deleteByValue(99);
list.deleteAtHead();
list.deleteAtTail();

list.print(); // 2 -> 3 -> 4 -> null

// Reverse
list.reverse();
list.print(); // 4 -> 3 -> 2 -> null

// ============================================
// COMMON PROBLEMS
// ============================================

// 1. Find middle node
function findMiddle(head) {
  let slow = head;
  let fast = head;
  
  // Fast pointer moves 2 steps, slow moves 1 step
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  
  return slow; // Slow is at middle
}

// 2. Detect cycle (Floyd's Cycle Detection)
function hasCycle(head) {
  let slow = head;
  let fast = head;
  
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    
    if (slow === fast) {
      return true; // Cycle detected
    }
  }
  
  return false; // No cycle
}

// 3. Remove nth node from end
function removeNthFromEnd(head, n) {
  // Create dummy node
  const dummy = new ListNode(0);
  dummy.next = head;
  
  let first = dummy;
  let second = dummy;
  
  // Move first pointer n+1 steps ahead
  for (let i = 0; i <= n; i++) {
    first = first.next;
  }
  
  // Move both pointers until first reaches end
  while (first) {
    first = first.next;
    second = second.next;
  }
  
  // Remove node
  second.next = second.next.next;
  
  return dummy.next;
}

// 4. Merge two sorted lists
function mergeTwoLists(list1, list2) {
  const dummy = new ListNode(0);
  let current = dummy;
  
  while (list1 && list2) {
    if (list1.data <= list2.data) {
      current.next = list1;
      list1 = list1.next;
    } else {
      current.next = list2;
      list2 = list2.next;
    }
    current = current.next;
  }
  
  // Attach remaining nodes
  current.next = list1 || list2;
  
  return dummy.next;
}

// 5. Check if palindrome
function isPalindrome(head) {
  // Find middle
  let slow = head;
  let fast = head;
  
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  
  // Reverse second half
  let prev = null;
  let current = slow;
  
  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  
  // Compare both halves
  let first = head;
  let second = prev;
  
  while (second) {
    if (first.data !== second.data) {
      return false;
    }
    first = first.next;
    second = second.next;
  }
  
  return true;
}
```

---

## E) Internal Working

**Memory Representation:**
- Nodes scattered in memory
- Each node has data + next pointer
- Head pointer points to first node
- Last node's next is null

**Time Complexities:**
- Access: O(n) - no random access
- Search: O(n) - linear search
- Insert: O(1) at head, O(n) at position
- Delete: O(1) at head, O(n) at position

---

## F) Interview Questions & Answers

### Q1: What is Linked List and how does it differ from Array?

**Answer:**
Linked List is collection of nodes where each node contains data and reference to next node. Nodes stored in non-contiguous memory. Differences: Arrays have contiguous memory, random access O(1), fixed size. Linked Lists have non-contiguous memory, sequential access O(n), dynamic size. Linked Lists better for frequent insertions/deletions, arrays better for random access.

### Q2: What are time complexities of Linked List operations?

**Answer:**
Time complexities: Access O(n) - no random access, must traverse, Search O(n) - linear search, Insert O(1) at head or O(n) at position, Delete O(1) at head or O(n) at position. Space: O(n) for n nodes. Linked Lists efficient for insertions/deletions at known positions, inefficient for random access.

### Q3: How do you reverse a Linked List?

**Answer:**
Reverse Linked List: Use three pointers (prev, current, next). Initialize prev = null, current = head. While current exists: Store next = current.next, reverse link current.next = prev, move prev = current, move current = next. After loop, head = prev. Time O(n), Space O(1). Iterative approach most efficient.

---

## G) Common Mistakes

### Mistake 1: Losing Reference

```javascript
// ❌ WRONG - Lose reference
let current = head;
current = current.next; // Lost head reference

// ✅ CORRECT - Keep head separate
let current = head;
head = head.next; // Or use separate pointer
```

**Why it breaks:** Losing head reference makes list inaccessible.

---

## H) When to Use & When NOT to Use

Use Linked Lists for frequent insertions/deletions, dynamic size, when memory scattered. Don't use for random access, when cache performance important (arrays better), or simple collections.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain Linked List."

**You:**
"Linked List is collection of nodes where each node has data and reference to next node. Nodes stored in non-contiguous memory. Types: Singly (one direction), Doubly (both directions), Circular (last points to first).

Time complexities: Access O(n), Search O(n), Insert O(1) head or O(n) position, Delete O(1) head or O(n) position. Benefits: Dynamic size, efficient insertions/deletions. Drawbacks: No random access, extra memory for pointers. Use for frequent insertions/deletions, not for random access."

---

## J) Mini Practice Task

Implement: Insert at head/tail/position, delete operations, search, reverse, find middle, detect cycle, merge sorted lists.

---

**END OF TOPIC: LINKED LIST FUNDAMENTALS**

