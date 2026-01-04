# SORTING ALGORITHMS

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Sorting Algorithms kya hain?**
- Sorting Algorithms data ko order mein arrange karte hain
- Ascending ya descending order
- Different algorithms different time complexities
- Some stable, some unstable
- Real-world mein bahut important

**Real-life Analogy:**
- Sorting = Books ko shelf par organize karna
- Ascending = A to Z
- Descending = Z to A
- Algorithm = Organizing method

**Sorting Types:**
- **Comparison-based:** Compare elements
- **Non-comparison:** Use properties (counting, radix)
- **Stable:** Equal elements maintain order
- **In-place:** Constant extra space

**Common Algorithms:**
- Bubble Sort, Selection Sort, Insertion Sort
- Merge Sort, Quick Sort, Heap Sort
- Counting Sort, Radix Sort, Bucket Sort

---

## B) Easy English Theory

### What are Sorting Algorithms?

Sorting Algorithms arrange data in order (ascending/descending). Types: Comparison-based (compare elements - O(n log n) best), Non-comparison (use properties - can be O(n)). Properties: Stable (maintains equal elements order), In-place (constant extra space). Common: Merge Sort, Quick Sort, Heap Sort (O(n log n)), Counting/Radix Sort (O(n) for specific cases).

---

## C) Why This Concept Exists

### The Problem

**Without Sorting:**
- Data unorganized
- Slow search
- Difficult analysis
- Inefficient operations

### The Solution

**Sorting Provides:**
1. **Organization:** Ordered data
2. **Efficiency:** Fast search (binary search)
3. **Analysis:** Easier processing
4. **Foundation:** Base for many algorithms

---

## D) Practical Example (Code)

```javascript
// ============================================
// BUBBLE SORT
// ============================================

function bubbleSort(arr) {
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    
    // Optimization: if no swap, array is sorted
    if (!swapped) break;
  }
  
  return arr;
}

// Time: O(n²), Space: O(1), Stable: Yes

// ============================================
// SELECTION SORT
// ============================================

function selectionSort(arr) {
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    
    // Find minimum in remaining array
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    
    // Swap with current
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  
  return arr;
}

// Time: O(n²), Space: O(1), Stable: No

// ============================================
// INSERTION SORT
// ============================================

function insertionSort(arr) {
  const n = arr.length;
  
  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;
    
    // Shift elements greater than key
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    
    arr[j + 1] = key;
  }
  
  return arr;
}

// Time: O(n²) worst, O(n) best, Space: O(1), Stable: Yes

// ============================================
// MERGE SORT
// ============================================

function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  
  // Add remaining
  return result.concat(left.slice(i)).concat(right.slice(j));
}

// Time: O(n log n), Space: O(n), Stable: Yes

// ============================================
// QUICK SORT
// ============================================

function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pivotIndex = partition(arr, low, high);
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}

// Time: O(n log n) average, O(n²) worst, Space: O(log n), Stable: No

// ============================================
// HEAP SORT
// ============================================

function heapSort(arr) {
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

// Time: O(n log n), Space: O(1), Stable: No

// ============================================
// COUNTING SORT
// ============================================

function countingSort(arr, max) {
  const count = Array(max + 1).fill(0);
  const output = Array(arr.length);
  
  // Count occurrences
  for (let num of arr) {
    count[num]++;
  }
  
  // Cumulative count
  for (let i = 1; i <= max; i++) {
    count[i] += count[i - 1];
  }
  
  // Build output
  for (let i = arr.length - 1; i >= 0; i--) {
    output[count[arr[i]] - 1] = arr[i];
    count[arr[i]]--;
  }
  
  return output;
}

// Time: O(n + k) where k is range, Space: O(k), Stable: Yes

// ============================================
// RADIX SORT
// ============================================

function radixSort(arr) {
  const max = Math.max(...arr);
  
  // Sort by each digit
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    countingSortByDigit(arr, exp);
  }
  
  return arr;
}

function countingSortByDigit(arr, exp) {
  const count = Array(10).fill(0);
  const output = Array(arr.length);
  
  // Count occurrences of digit
  for (let num of arr) {
    count[Math.floor((num / exp) % 10)]++;
  }
  
  // Cumulative count
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }
  
  // Build output
  for (let i = arr.length - 1; i >= 0; i--) {
    const digit = Math.floor((arr[i] / exp) % 10);
    output[count[digit] - 1] = arr[i];
    count[digit]--;
  }
  
  // Copy to original array
  for (let i = 0; i < arr.length; i++) {
    arr[i] = output[i];
  }
}

// Time: O(d * (n + k)) where d is digits, Space: O(n + k), Stable: Yes
```

---

## E) Internal Working

**Comparison-based:**
- Compare elements
- O(n log n) lower bound
- Merge/Quick/Heap: O(n log n)

**Non-comparison:**
- Use element properties
- Can achieve O(n)
- Counting/Radix: O(n) for specific cases

---

## F) Interview Questions & Answers

### Q1: Compare different sorting algorithms.

**Answer:**
Comparison: Bubble/Selection/Insertion O(n²) - simple but slow, good for small arrays. Merge Sort O(n log n) - stable, guaranteed performance, O(n) space. Quick Sort O(n log n) average, O(n²) worst - in-place, fast average, unstable. Heap Sort O(n log n) - in-place, guaranteed, unstable. Counting/Radix O(n) - for specific ranges, stable.

### Q2: When would you use Merge Sort vs Quick Sort?

**Answer:**
Merge Sort: Need stable sort, guaranteed O(n log n), external sorting, when worst-case matters. Quick Sort: Average case important, in-place preferred, when worst-case rare, generally faster in practice. Choose Merge for stability/guaranteed performance, Quick for average performance/in-place.

### Q3: What is stable vs unstable sorting?

**Answer:**
Stable: Equal elements maintain their relative order after sorting. Unstable: Equal elements may change relative order. Stable: Merge, Insertion, Bubble, Counting, Radix. Unstable: Quick, Heap, Selection. Stability matters when sorting by multiple criteria or preserving original order of equals.

---

## G) Common Mistakes

### Mistake 1: Not Handling Edge Cases

```javascript
// ❌ WRONG - No edge case
function sort(arr) {
  for (let i = 0; i < arr.length; i++) {
    // What if arr is empty?
  }
}

// ✅ CORRECT - Handle edge cases
function sort(arr) {
  if (arr.length <= 1) return arr;
  // ... rest of code
}
```

**Why it breaks:** Crashes on edge cases (empty, single element).

---

## H) When to Use & When NOT to Use

Use Merge Sort for stability/guaranteed performance. Use Quick Sort for average performance. Use Counting/Radix for specific ranges. Don't use O(n²) sorts for large arrays.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain Sorting Algorithms."

**You:**
"Sorting algorithms arrange data in order. Comparison-based: Merge/Quick/Heap O(n log n), Bubble/Selection/Insertion O(n²). Non-comparison: Counting/Radix O(n) for specific ranges.

Properties: Stable (maintains equal elements order), In-place (constant space). Merge: stable, guaranteed O(n log n). Quick: in-place, fast average. Choose based on: stability needs, space constraints, worst-case requirements."

---

## J) Mini Practice Task

Implement: Bubble, Selection, Insertion, Merge, Quick, Heap Sort. Compare time/space complexities. Test with different inputs.

---

**END OF TOPIC: SORTING ALGORITHMS**

