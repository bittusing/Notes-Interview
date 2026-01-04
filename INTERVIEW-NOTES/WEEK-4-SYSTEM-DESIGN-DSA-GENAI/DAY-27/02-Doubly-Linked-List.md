# DOUBLY LINKED LIST

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Doubly Linked List kya hai?**
- Doubly Linked List mein har node do pointers store karta hai
- Ek pointer next node ko point karta hai (forward)
- Ek pointer previous node ko point karta hai (backward)
- Dono directions mein traverse kar sakte hain
- Singly Linked List se zyada flexible

**Real-life Analogy:**
- Singly = One-way road (forward only)
- Doubly = Two-way road (forward + backward)
- Previous pointer = Backward direction
- Next pointer = Forward direction

**Doubly Linked List Structure:**
```
Node {
  data: value
  next: pointer to next node
  prev: pointer to previous node
}
```

**Benefits:**
- **Bidirectional Traversal:** Dono directions mein move
- **Easier Deletion:** Previous node easily access
- **Better Operations:** Some operations easier

**Drawbacks:**
- **Extra Memory:** Previous pointer ke liye extra space
- **More Complex:** Operations thoda complex

---

## B) Easy English Theory

### What is Doubly Linked List?

Doubly Linked List has nodes with two pointers: next (points to next node) and prev (points to previous node). Allows bidirectional traversal (forward and backward). Benefits: Easier deletion (can access previous node), bidirectional traversal, some operations easier. Drawbacks: Extra memory for prev pointer, more complex operations.

---

## C) Why This Concept Exists

### The Problem

**With Singly Linked List:**
- Only forward traversal
- Deletion requires previous node (hard to get)
- Some operations difficult

### The Solution

**Doubly Linked List Provides:**
1. **Bidirectional Traversal:** Forward and backward
2. **Easier Deletion:** Direct access to previous node
3. **Better Operations:** Some operations simpler
4. **Flexibility:** More versatile

---

## D) Practical Example (Code)

```javascript
// ============================================
// DOUBLY LINKED LIST NODE
// ============================================

class DoublyListNode {
  constructor(data) {
    this.data = data;
    this.next = null; // Pointer to next node
    this.prev = null; // Pointer to previous node
  }
}

// ============================================
// DOUBLY LINKED LIST IMPLEMENTATION
// ============================================

class DoublyLinkedList {
  constructor() {
    this.head = null; // First node
    this.tail = null; // Last node
    this.size = 0;
  }
  
  // ============================================
  // INSERT OPERATIONS
  // ============================================
  
  // Insert at head (O(1))
  insertAtHead(data) {
    const newNode = new DoublyListNode(data);
    
    if (!this.head) {
      // Empty list
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    
    this.size++;
    return this;
  }
  
  // Insert at tail (O(1))
  insertAtTail(data) {
    const newNode = new DoublyListNode(data);
    
    if (!this.tail) {
      // Empty list
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }
    
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
    
    if (position === this.size) {
      return this.insertAtTail(data);
    }
    
    const newNode = new DoublyListNode(data);
    let current = this.head;
    
    // Traverse to position
    for (let i = 0; i < position; i++) {
      current = current.next;
    }
    
    // Insert before current
    newNode.prev = current.prev;
    newNode.next = current;
    current.prev.next = newNode;
    current.prev = newNode;
    
    this.size++;
    return this;
  }
  
  // ============================================
  // DELETE OPERATIONS
  // ============================================
  
  // Delete from head (O(1))
  deleteAtHead() {
    if (!this.head) {
      return null;
    }
    
    const deletedData = this.head.data;
    
    if (this.head === this.tail) {
      // Only one node
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
      this.head.prev = null;
    }
    
    this.size--;
    return deletedData;
  }
  
  // Delete from tail (O(1))
  deleteAtTail() {
    if (!this.tail) {
      return null;
    }
    
    const deletedData = this.tail.data;
    
    if (this.head === this.tail) {
      // Only one node
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.tail.prev;
      this.tail.next = null;
    }
    
    this.size--;
    return deletedData;
  }
  
  // Delete by value (O(n))
  deleteByValue(value) {
    if (!this.head) {
      return false;
    }
    
    let current = this.head;
    
    // Find node with value
    while (current && current.data !== value) {
      current = current.next;
    }
    
    if (!current) {
      return false; // Not found
    }
    
    // Update links
    if (current === this.head) {
      this.deleteAtHead();
    } else if (current === this.tail) {
      this.deleteAtTail();
    } else {
      current.prev.next = current.next;
      current.next.prev = current.prev;
      this.size--;
    }
    
    return true;
  }
  
  // Delete at position (O(n))
  deleteAtPosition(position) {
    if (position < 0 || position >= this.size) {
      throw new Error('Invalid position');
    }
    
    if (position === 0) {
      return this.deleteAtHead();
    }
    
    if (position === this.size - 1) {
      return this.deleteAtTail();
    }
    
    let current = this.head;
    
    // Traverse to position
    for (let i = 0; i < position; i++) {
      current = current.next;
    }
    
    const deletedData = current.data;
    
    // Update links
    current.prev.next = current.next;
    current.next.prev = current.prev;
    
    this.size--;
    return deletedData;
  }
  
  // ============================================
  // TRAVERSAL OPERATIONS
  // ============================================
  
  // Forward traversal
  printForward() {
    let current = this.head;
    const result = [];
    
    while (current) {
      result.push(current.data);
      current = current.next;
    }
    
    console.log(result.join(' <-> '));
    return result;
  }
  
  // Backward traversal
  printBackward() {
    let current = this.tail;
    const result = [];
    
    while (current) {
      result.push(current.data);
      current = current.prev;
    }
    
    console.log(result.join(' <-> '));
    return result;
  }
  
  // ============================================
  // SEARCH OPERATIONS
  // ============================================
  
  // Search from head (O(n))
  searchForward(value) {
    let current = this.head;
    let index = 0;
    
    while (current) {
      if (current.data === value) {
        return index;
      }
      current = current.next;
      index++;
    }
    
    return -1;
  }
  
  // Search from tail (O(n))
  searchBackward(value) {
    let current = this.tail;
    let index = this.size - 1;
    
    while (current) {
      if (current.data === value) {
        return index;
      }
      current = current.prev;
      index--;
    }
    
    return -1;
  }
  
  // ============================================
  // UTILITY OPERATIONS
  // ============================================
  
  getSize() {
    return this.size;
  }
  
  isEmpty() {
    return this.size === 0;
  }
  
  // Reverse (O(n))
  reverse() {
    let current = this.head;
    let temp = null;
    
    // Swap next and prev for all nodes
    while (current) {
      temp = current.prev;
      current.prev = current.next;
      current.next = temp;
      current = current.prev; // Move to next (was prev)
    }
    
    // Swap head and tail
    if (temp) {
      this.tail = this.head;
      this.head = temp.prev;
    }
    
    return this;
  }
}

// ============================================
// USAGE EXAMPLE
// ============================================

const dll = new DoublyLinkedList();

// Insert
dll.insertAtHead(1);
dll.insertAtTail(2);
dll.insertAtTail(3);
dll.insertAtPosition(99, 1);

dll.printForward(); // 1 <-> 99 <-> 2 <-> 3
dll.printBackward(); // 3 <-> 2 <-> 99 <-> 1

// Delete
dll.deleteByValue(99);
dll.deleteAtHead();
dll.deleteAtTail();

dll.printForward(); // 2

// Search
console.log(dll.searchForward(2)); // 0
console.log(dll.searchBackward(2)); // 0

// ============================================
// COMPARISON WITH SINGLY LINKED LIST
// ============================================

/*
Singly Linked List:
- One pointer (next)
- Forward traversal only
- Less memory
- Simpler operations

Doubly Linked List:
- Two pointers (next, prev)
- Bidirectional traversal
- More memory
- Easier deletion (can access previous)
- Better for some operations
*/
```

---

## E) Internal Working

**Memory Representation:**
- Each node has data, next, prev pointers
- Head points to first node (prev = null)
- Tail points to last node (next = null)
- Bidirectional links between nodes

**Operations:**
- Insert: Update both next and prev pointers
- Delete: Update both adjacent nodes
- Traverse: Can go forward or backward

---

## F) Interview Questions & Answers

### Q1: What is Doubly Linked List and how does it differ from Singly Linked List?

**Answer:**
Doubly Linked List has nodes with two pointers: next (forward) and prev (backward). Differences: Singly has one pointer (next only), forward traversal only. Doubly has two pointers, bidirectional traversal. Doubly uses more memory (prev pointer), but easier deletion (can access previous node directly). Use doubly when need backward traversal or easier deletion.

### Q2: What are advantages and disadvantages of Doubly Linked List?

**Answer:**
Advantages: Bidirectional traversal (forward and backward), easier deletion (direct access to previous node), some operations simpler, can traverse from tail. Disadvantages: Extra memory for prev pointer (doubles pointer memory), more complex operations (update both next and prev), slightly slower operations due to extra updates.

### Q3: When would you use Doubly Linked List over Singly Linked List?

**Answer:**
Use Doubly when: Need backward traversal, frequent deletions (easier with prev pointer), operations requiring previous node access, implementing data structures like Deque. Use Singly when: Memory is concern, only forward traversal needed, simpler implementation preferred, less pointer updates needed.

---

## G) Common Mistakes

### Mistake 1: Not Updating Both Pointers

```javascript
// ❌ WRONG - Only update next
newNode.next = current;
current = newNode;
// Missing prev pointer update

// ✅ CORRECT - Update both
newNode.next = current;
newNode.prev = current.prev;
current.prev.next = newNode;
current.prev = newNode;
```

**Why it breaks:** Links broken, list structure corrupted.

---

## H) When to Use & When NOT to Use

Use Doubly Linked List for bidirectional traversal, easier deletions, Deque implementation. Don't use when memory is critical or only forward traversal needed.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain Doubly Linked List."

**You:**
"Doubly Linked List has nodes with two pointers: next (forward) and prev (backward). Allows bidirectional traversal. Benefits: Easier deletion (direct access to previous node), can traverse backward, some operations simpler.

Drawbacks: Extra memory for prev pointer, more complex operations. Use when need backward traversal or easier deletion. Time complexities similar to singly: Access O(n), Insert O(1) at ends or O(n) at position, Delete O(1) at ends or O(n) at position."

---

## J) Mini Practice Task

Implement: Insert at head/tail/position, delete operations, forward/backward traversal, reverse, search from both ends.

---

**END OF TOPIC: DOUBLY LINKED LIST**

