# LINKED LIST PROBLEMS

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Linked List Problems kya hain?**
- Linked List Problems common interview questions hain
- Pattern-based problems
- Two-pointer technique important
- Cycle detection, reversal, merging
- Practice se solve ho jate hain

**Common Problem Patterns:**
- **Two Pointers:** Fast and slow pointers
- **Reversal:** Reverse list or part of list
- **Merging:** Merge two sorted lists
- **Cycle Detection:** Detect loops
- **Intersection:** Find common nodes

### Problem Solving Approach

**1. Understand Problem:**
- Clear requirements
- Edge cases identify
- Examples trace

**2. Choose Technique:**
- Two pointers
- Dummy node
- Recursion

**3. Implement:**
- Step by step
- Handle edge cases
- Test

---

## B) Easy English Theory

### What are Linked List Problems?

Linked List Problems are common interview questions involving pattern-based solutions. Common patterns: Two pointers (fast/slow), reversal, merging, cycle detection, intersection. Techniques: Dummy nodes, recursion, iterative approaches. Practice these patterns to solve most problems.

---

## C) Why This Concept Exists

### The Problem

**Without Patterns:**
- Difficult to solve problems
- No systematic approach
- Time consuming
- Inefficient solutions

### The Solution

**Pattern-Based Approach Provides:**
1. **Systematic:** Clear approach
2. **Efficient:** Optimized solutions
3. **Reusable:** Patterns apply to many problems
4. **Confidence:** Know how to solve

---

## D) Practical Example (Code)

```javascript
// ============================================
// PROBLEM 1: REVERSE LINKED LIST
// ============================================

// Iterative approach (O(n) time, O(1) space)
function reverseList(head) {
  let prev = null;
  let current = head;
  
  while (current) {
    const next = current.next; // Store next
    current.next = prev; // Reverse link
    prev = current; // Move prev
    current = next; // Move current
  }
  
  return prev; // New head
}

// Recursive approach (O(n) time, O(n) space)
function reverseListRecursive(head) {
  if (!head || !head.next) {
    return head;
  }
  
  const newHead = reverseListRecursive(head.next);
  head.next.next = head;
  head.next = null;
  
  return newHead;
}

// ============================================
// PROBLEM 2: FIND MIDDLE NODE
// ============================================

function findMiddle(head) {
  let slow = head;
  let fast = head;
  
  // Fast moves 2 steps, slow moves 1 step
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  
  return slow; // Slow is at middle
}

// ============================================
// PROBLEM 3: DETECT CYCLE (FLOYD'S ALGORITHM)
// ============================================

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

// Find cycle start node
function detectCycleStart(head) {
  let slow = head;
  let fast = head;
  
  // Find meeting point
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    
    if (slow === fast) {
      break; // Cycle found
    }
  }
  
  if (!fast || !fast.next) {
    return null; // No cycle
  }
  
  // Move slow to head, both move 1 step
  slow = head;
  while (slow !== fast) {
    slow = slow.next;
    fast = fast.next;
  }
  
  return slow; // Cycle start
}

// ============================================
// PROBLEM 4: REMOVE NTH NODE FROM END
// ============================================

function removeNthFromEnd(head, n) {
  const dummy = new ListNode(0);
  dummy.next = head;
  
  let first = dummy;
  let second = dummy;
  
  // Move first n+1 steps ahead
  for (let i = 0; i <= n; i++) {
    first = first.next;
  }
  
  // Move both until first reaches end
  while (first) {
    first = first.next;
    second = second.next;
  }
  
  // Remove node
  second.next = second.next.next;
  
  return dummy.next;
}

// ============================================
// PROBLEM 5: MERGE TWO SORTED LISTS
// ============================================

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
  
  // Attach remaining
  current.next = list1 || list2;
  
  return dummy.next;
}

// ============================================
// PROBLEM 6: CHECK PALINDROME
// ============================================

function isPalindrome(head) {
  if (!head || !head.next) {
    return true;
  }
  
  // Find middle
  let slow = head;
  let fast = head;
  
  while (fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  
  // Reverse second half
  let secondHalf = reverseList(slow.next);
  let firstHalf = head;
  
  // Compare
  while (secondHalf) {
    if (firstHalf.data !== secondHalf.data) {
      return false;
    }
    firstHalf = firstHalf.next;
    secondHalf = secondHalf.next;
  }
  
  return true;
}

// ============================================
// PROBLEM 7: INTERSECTION OF TWO LISTS
// ============================================

function getIntersectionNode(headA, headB) {
  if (!headA || !headB) {
    return null;
  }
  
  let a = headA;
  let b = headB;
  
  // When one reaches end, switch to other list
  // They will meet at intersection or both null
  while (a !== b) {
    a = a ? a.next : headB;
    b = b ? b.next : headA;
  }
  
  return a; // Intersection node or null
}

// ============================================
// PROBLEM 8: REVERSE NODES IN K-GROUP
// ============================================

function reverseKGroup(head, k) {
  if (!head || k === 1) {
    return head;
  }
  
  // Check if k nodes exist
  let count = 0;
  let current = head;
  
  while (current && count < k) {
    current = current.next;
    count++;
  }
  
  if (count === k) {
    // Reverse k nodes
    current = reverseKGroup(current, k);
    
    // Reverse current group
    while (count > 0) {
      const next = head.next;
      head.next = current;
      current = head;
      head = next;
      count--;
    }
    
    head = current;
  }
  
  return head;
}

// ============================================
// PROBLEM 9: REMOVE DUPLICATES FROM SORTED LIST
// ============================================

function removeDuplicates(head) {
  let current = head;
  
  while (current && current.next) {
    if (current.data === current.next.data) {
      current.next = current.next.next; // Skip duplicate
    } else {
      current = current.next;
    }
  }
  
  return head;
}

// ============================================
// PROBLEM 10: ROTATE LIST
// ============================================

function rotateRight(head, k) {
  if (!head || !head.next || k === 0) {
    return head;
  }
  
  // Find length and tail
  let length = 1;
  let tail = head;
  
  while (tail.next) {
    tail = tail.next;
    length++;
  }
  
  k = k % length;
  if (k === 0) {
    return head;
  }
  
  // Find new tail (length - k - 1 from start)
  let newTail = head;
  for (let i = 0; i < length - k - 1; i++) {
    newTail = newTail.next;
  }
  
  // Rotate
  const newHead = newTail.next;
  newTail.next = null;
  tail.next = head;
  
  return newHead;
}

// ============================================
// PROBLEM 11: SWAP NODES IN PAIRS
// ============================================

function swapPairs(head) {
  const dummy = new ListNode(0);
  dummy.next = head;
  let prev = dummy;
  
  while (prev.next && prev.next.next) {
    const first = prev.next;
    const second = prev.next.next;
    
    // Swap
    prev.next = second;
    first.next = second.next;
    second.next = first;
    
    prev = first;
  }
  
  return dummy.next;
}

// ============================================
// PROBLEM 12: ADD TWO NUMBERS (REPRESENTED AS LISTS)
// ============================================

function addTwoNumbers(l1, l2) {
  const dummy = new ListNode(0);
  let current = dummy;
  let carry = 0;
  
  while (l1 || l2 || carry) {
    const sum = (l1?.data || 0) + (l2?.data || 0) + carry;
    carry = Math.floor(sum / 10);
    
    current.next = new ListNode(sum % 10);
    current = current.next;
    
    l1 = l1?.next;
    l2 = l2?.next;
  }
  
  return dummy.next;
}
```

---

## E) Internal Working

**Two Pointer Technique:**
- Fast and slow pointers
- Fast moves 2 steps, slow moves 1
- Meet at middle or cycle detection

**Dummy Node Pattern:**
- Simplify edge cases
- Avoid null checks
- Cleaner code

---

## F) Interview Questions & Answers

### Q1: How do you detect a cycle in Linked List?

**Answer:**
Use Floyd's Cycle Detection (tortoise and hare): Two pointers - slow (moves 1 step) and fast (moves 2 steps). If cycle exists, they will meet. If fast reaches null, no cycle. Time O(n), Space O(1). To find cycle start: After meeting, move slow to head, both move 1 step until they meet again - that's cycle start.

### Q2: How do you reverse a Linked List?

**Answer:**
Iterative: Three pointers (prev, current, next). Initialize prev = null, current = head. While current exists: Store next = current.next, reverse link current.next = prev, move prev = current, move current = next. After loop, head = prev. Time O(n), Space O(1). Recursive: Reverse rest, then reverse current link. Time O(n), Space O(n).

### Q3: How do you merge two sorted Linked Lists?

**Answer:**
Use dummy node, compare nodes from both lists, attach smaller node, move pointer, continue until one list ends, attach remaining nodes. Time O(n+m), Space O(1). Pattern: Dummy node simplifies code, avoids null checks, clean implementation.

---

## G) Common Mistakes

### Mistake 1: Not Handling Edge Cases

```javascript
// ❌ WRONG - No edge case handling
function reverseList(head) {
  let prev = null;
  let current = head;
  // What if head is null?
}

// ✅ CORRECT - Handle edge cases
function reverseList(head) {
  if (!head || !head.next) return head;
  // ... rest of code
}
```

**Why it breaks:** Crashes on edge cases (null, single node).

---

## H) When to Use & When NOT to Use

Use two pointers for middle finding, cycle detection. Use dummy nodes for cleaner code. Use recursion for simpler logic (if space allows).

---

## I) 2-Minute Interview Explanation

**Interviewer:** "How do you solve Linked List problems?"

**You:**
"Common patterns: Two pointers (fast/slow for middle, cycle detection), dummy nodes (simplify edge cases), reversal (three pointers), merging (compare and attach). Key techniques: Floyd's cycle detection, reverse with three pointers, merge with dummy node.

Practice these patterns: Reverse list, find middle, detect cycle, merge sorted lists, remove nth from end. Most problems use these patterns."

---

## J) Mini Practice Task

Solve: Reverse list, find middle, detect cycle, merge sorted lists, remove duplicates, check palindrome, rotate list, swap pairs.

---

**END OF TOPIC: LINKED LIST PROBLEMS**

