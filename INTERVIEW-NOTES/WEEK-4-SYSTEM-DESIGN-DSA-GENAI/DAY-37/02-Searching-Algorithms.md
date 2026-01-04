# SEARCHING ALGORITHMS

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Searching Algorithms kya hain?**
- Searching Algorithms element ko find karte hain
- Sorted ya unsorted data mein
- Different algorithms different scenarios ke liye
- Time complexity important
- Real-world mein bahut use

**Real-life Analogy:**
- Searching = Dictionary mein word dhundhna
- Linear = Page by page (slow)
- Binary = Middle se divide (fast)
- Sorted = Alphabetically organized

**Search Types:**
- **Linear Search:** Sequential search
- **Binary Search:** Divide and conquer
- **Ternary Search:** Three parts
- **Exponential Search:** Unbounded arrays

**When to Use:**
- Unsorted → Linear Search
- Sorted → Binary Search
- Large sorted → Binary Search
- Small → Linear Search

---

## B) Easy English Theory

### What are Searching Algorithms?

Searching Algorithms find element in data structure. Types: Linear Search (sequential, O(n), works on unsorted), Binary Search (divide and conquer, O(log n), requires sorted), Ternary Search (three parts, O(log₃ n)), Exponential Search (unbounded arrays, O(log n)). Use Linear for unsorted, Binary for sorted large arrays.

---

## C) Why This Concept Exists

### The Problem

**Without Efficient Search:**
- Slow lookups
- Linear time always
- Inefficient
- Poor performance

### The Solution

**Searching Algorithms Provide:**
1. **Efficiency:** Fast lookups
2. **Optimization:** O(log n) for sorted
3. **Flexibility:** Different scenarios
4. **Performance:** Better user experience

---

## D) Practical Example (Code)

```javascript
// ============================================
// LINEAR SEARCH
// ============================================

function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i; // Found
    }
  }
  return -1; // Not found
}

// Time: O(n), Space: O(1)

// ============================================
// BINARY SEARCH (ITERATIVE)
// ============================================

function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid; // Found
    } else if (arr[mid] < target) {
      left = mid + 1; // Search right half
    } else {
      right = mid - 1; // Search left half
    }
  }
  
  return -1; // Not found
}

// Time: O(log n), Space: O(1)

// ============================================
// BINARY SEARCH (RECURSIVE)
// ============================================

function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
  if (left > right) {
    return -1; // Not found
  }
  
  const mid = Math.floor((left + right) / 2);
  
  if (arr[mid] === target) {
    return mid;
  } else if (arr[mid] < target) {
    return binarySearchRecursive(arr, target, mid + 1, right);
  } else {
    return binarySearchRecursive(arr, target, left, mid - 1);
  }
}

// Time: O(log n), Space: O(log n) for recursion

// ============================================
// BINARY SEARCH VARIATIONS
// ============================================

// Find first occurrence
function firstOccurrence(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  let result = -1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      result = mid;
      right = mid - 1; // Continue searching left
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return result;
}

// Find last occurrence
function lastOccurrence(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  let result = -1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      result = mid;
      left = mid + 1; // Continue searching right
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return result;
}

// Find insertion position
function searchInsert(nums, target) {
  let left = 0;
  let right = nums.length;
  
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    
    if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  
  return left;
}

// ============================================
// SEARCH IN ROTATED SORTED ARRAY
// ============================================

function searchRotated(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (nums[mid] === target) {
      return mid;
    }
    
    // Left half is sorted
    if (nums[left] <= nums[mid]) {
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      // Right half is sorted
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
  
  return -1;
}

// ============================================
// FIND PEAK ELEMENT
// ============================================

function findPeakElement(nums) {
  let left = 0;
  let right = nums.length - 1;
  
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    
    if (nums[mid] > nums[mid + 1]) {
      right = mid; // Peak in left half
    } else {
      left = mid + 1; // Peak in right half
    }
  }
  
  return left;
}

// ============================================
// EXPONENTIAL SEARCH
// ============================================

// For unbounded arrays
function exponentialSearch(arr, target) {
  if (arr[0] === target) return 0;
  
  let i = 1;
  while (i < arr.length && arr[i] <= target) {
    i *= 2; // Exponential jump
  }
  
  // Binary search in range [i/2, min(i, arr.length - 1)]
  return binarySearch(arr, target, Math.floor(i / 2), Math.min(i, arr.length - 1));
}

// ============================================
// TERNARY SEARCH
// ============================================

function ternarySearch(arr, target, left = 0, right = arr.length - 1) {
  if (left > right) return -1;
  
  const mid1 = left + Math.floor((right - left) / 3);
  const mid2 = right - Math.floor((right - left) / 3);
  
  if (arr[mid1] === target) return mid1;
  if (arr[mid2] === target) return mid2;
  
  if (target < arr[mid1]) {
    return ternarySearch(arr, target, left, mid1 - 1);
  } else if (target > arr[mid2]) {
    return ternarySearch(arr, target, mid2 + 1, right);
  } else {
    return ternarySearch(arr, target, mid1 + 1, mid2 - 1);
  }
}

// Time: O(log₃ n), Space: O(log₃ n)
```

---

## E) Internal Working

**Linear Search:**
- Sequential check
- O(n) time
- Works on unsorted

**Binary Search:**
- Divide and conquer
- O(log n) time
- Requires sorted array

---

## F) Interview Questions & Answers

### Q1: What is Binary Search and how does it work?

**Answer:**
Binary Search finds element in sorted array using divide and conquer. Process: Compare target with middle element, if equal found, if target < middle search left half, if target > middle search right half, repeat until found or search space exhausted. Time O(log n), Space O(1) iterative or O(log n) recursive. Requires sorted array.

### Q2: When would you use Linear Search vs Binary Search?

**Answer:**
Linear Search: Unsorted array, small array, single search, simple implementation. Binary Search: Sorted array, large array, multiple searches, need O(log n) performance. Linear O(n) but works on unsorted, Binary O(log n) but requires sorted. Choose based on array state and size.

### Q3: How do you handle duplicates in Binary Search?

**Answer:**
Handle duplicates: Find first occurrence (when found, continue searching left), find last occurrence (when found, continue searching right), find range (first and last occurrence). Modify binary search to continue searching in direction instead of returning immediately. Time still O(log n).

---

## G) Common Mistakes

### Mistake 1: Integer Overflow

```javascript
// ❌ WRONG - Overflow risk
const mid = (left + right) / 2;

// ✅ CORRECT - Avoid overflow
const mid = left + Math.floor((right - left) / 2);
```

**Why it breaks:** (left + right) can overflow for large numbers.

---

## H) When to Use & When NOT to Use

Use Binary Search for sorted arrays, large data, multiple searches. Use Linear Search for unsorted, small arrays, single search. Don't use Binary Search on unsorted arrays.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain Searching Algorithms."

**You:**
"Searching algorithms: Linear Search (sequential, O(n), works on unsorted), Binary Search (divide and conquer, O(log n), requires sorted). Binary Search: Compare with middle, if equal found, if less search left, if more search right. Time O(log n).

Use Linear for unsorted/small arrays, Binary for sorted/large arrays. Variations: Find first/last occurrence, search in rotated array, find peak. Key: Binary requires sorted array."

---

## J) Mini Practice Task

Implement: Linear search, binary search (iterative and recursive), find first/last occurrence, search in rotated array, find peak element.

---

**END OF TOPIC: SEARCHING ALGORITHMS**

