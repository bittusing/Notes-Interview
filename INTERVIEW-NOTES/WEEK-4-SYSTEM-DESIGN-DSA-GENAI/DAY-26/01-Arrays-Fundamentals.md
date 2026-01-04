# ARRAYS FUNDAMENTALS

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Arrays kya hain?**
- Arrays same type ke elements ka collection hai
- Contiguous memory locations par store hote hain
- Index se access karte hain (0-based indexing)
- Fixed size (static) ya dynamic size
- Most basic data structure

**Real-life Analogy:**
- Array = Apartment building (rooms in sequence)
- Index = Room number (0, 1, 2, ...)
- Elements = People in rooms
- Access = Room number se direct access

**Array Characteristics:**
- **Indexed:** Direct access by index
- **Contiguous:** Memory mein adjacent
- **Homogeneous:** Same type elements (usually)
- **Random Access:** O(1) access time
- **Fixed/Dynamic:** Size can be fixed or dynamic

### Array Operations

**1. Access:**
- Index se element access
- O(1) time complexity
- Direct memory access

**2. Search:**
- Linear search: O(n)
- Binary search: O(log n) if sorted

**3. Insert:**
- End: O(1) amortized
- Middle: O(n) - shift elements

**4. Delete:**
- End: O(1)
- Middle: O(n) - shift elements

---

## B) Easy English Theory

### What are Arrays?

Arrays are collection of elements of same type stored in contiguous memory locations. Accessed by index (0-based). Characteristics: Indexed access (O(1)), contiguous memory, random access, fixed or dynamic size. Operations: Access O(1), Search O(n) linear or O(log n) binary if sorted, Insert O(n) middle or O(1) end, Delete O(n) middle or O(1) end.

---

## C) Why This Concept Exists

### The Problem

**Without Arrays:**
- No way to store multiple values
- Difficult to manage collections
- No indexed access
- Inefficient data organization

### The Solution

**Arrays Provide:**
1. **Organization:** Store multiple values
2. **Access:** Fast indexed access
3. **Efficiency:** Contiguous memory
4. **Foundation:** Base for other structures

---

## D) Practical Example (Code)

```javascript
// ============================================
// ARRAY CREATION
// ============================================

// Static array (fixed size)
const arr1 = new Array(5); // [undefined, undefined, undefined, undefined, undefined]
const arr2 = [1, 2, 3, 4, 5]; // [1, 2, 3, 4, 5]

// Dynamic array
const arr3 = [];
arr3.push(1); // [1]
arr3.push(2); // [1, 2]

// ============================================
// ARRAY ACCESS
// ============================================

const arr = [10, 20, 30, 40, 50];

// Access by index (O(1))
console.log(arr[0]); // 10
console.log(arr[2]); // 30
console.log(arr[arr.length - 1]); // 50 (last element)

// ============================================
// ARRAY TRAVERSAL
// ============================================

// For loop
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}

// For...of loop
for (const element of arr) {
  console.log(element);
}

// forEach
arr.forEach((element, index) => {
  console.log(`Index ${index}: ${element}`);
});

// ============================================
// LINEAR SEARCH
// ============================================

/**
 * LINEAR SEARCH KYA HAI?
 * 
 * Linear Search ek simple searching algorithm hai jo array mein element find karta hai.
 * 
 * How it works:
 * 1. Pehle element se start karo
 * 2. Har element ko check karo
 * 3. Agar element match ho to index return karo
 * 4. Agar end tak nahi mila to -1 return karo
 * 
 * Real-life Analogy:
 * - Jaise aap dictionary mein word dhundhte ho (page by page)
 * - Ya book mein chapter dhundhte ho (line by line)
 * - Linear search bhi waise hi kaam karta hai - ek ek karke check karta hai
 * 
 * Time Complexity: O(n) - Worst case mein n elements check karne padte hain
 * Space Complexity: O(1) - Extra memory nahi lagti
 * 
 * Advantages:
 * - Simple samajh mein aata hai
 * - Sorted ya unsorted array dono mein kaam karta hai
 * - Implementation easy hai
 * 
 * Disadvantages:
 * - Slow hai (sab elements check karna padta hai)
 * - Large arrays ke liye efficient nahi hai
 */

function linearSearch(arr, target) {
  // Step 1: Array ko start se end tak traverse karo
  for (let i = 0; i < arr.length; i++) {
    // Step 2: Check karo ki current element target ke equal hai ya nahi
    if (arr[i] === target) {
      return i; // Step 3: Agar mil gaya to index return karo
    }
  }
  // Step 4: Agar loop complete ho gaya aur element nahi mila to -1 return karo
  return -1; // Not found
}

// Example 1: Basic usage
const index = linearSearch([1, 2, 3, 4, 5], 3); 
console.log(index); // Output: 2 (element 3, index 2 par hai)

// Example 2: Element nahi mila
const notFound = linearSearch([1, 2, 3, 4, 5], 10);
console.log(notFound); // Output: -1 (element nahi mila)

// Example 3: First element
const first = linearSearch([10, 20, 30], 10);
console.log(first); // Output: 0 (first element)

// Example 4: Last element
const last = linearSearch([10, 20, 30], 30);
console.log(last); // Output: 2 (last element)

// Example 5: With strings
function linearSearchString(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }
  return -1;
}

const names = ['John', 'Jane', 'Bob', 'Alice'];
const nameIndex = linearSearchString(names, 'Bob');
console.log(nameIndex); // Output: 2

// ============================================
// BINARY SEARCH (SORTED ARRAY)
// ============================================

/**
 * BINARY SEARCH KYA HAI?
 * 
 * Binary Search ek fast searching algorithm hai jo SORTED array mein element find karta hai.
 * 
 * How it works:
 * 1. Array ko beech se divide karo (middle element find karo)
 * 2. Middle element ko target se compare karo
 * 3. Agar match ho to return karo
 * 4. Agar target bada hai to right side mein dhoondo
 * 5. Agar target chhota hai to left side mein dhoondo
 * 6. Repeat karo jab tak element na mile ya array khatam na ho
 * 
 * Real-life Analogy:
 * - Jaise aap phone book mein name dhundhte ho
 * - Pehle beech mein kholte ho
 * - Agar naam current page se pehle hai to left side, warna right side
 * - Isi tarah se divide karte karte target tak pahunchte ho
 * 
 * Time Complexity: O(log n) - Har step par array half ho jata hai
 * Space Complexity: O(1) - Iterative, O(log n) - Recursive
 * 
 * Important: Array SORTED honi chahiye (ascending ya descending order mein)
 * 
 * Advantages:
 * - Bahut fast hai (O(log n))
 * - Large arrays ke liye perfect hai
 * - Efficient hai
 * 
 * Disadvantages:
 * - Array sorted honi chahiye
 * - Implementation thodi complex hai
 * - Unsorted array mein use nahi kar sakte
 * 
 * Example with step-by-step:
 * Array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 * Target: 7
 * 
 * Step 1: left=0, right=9, mid=4, arr[4]=5
 *         5 < 7, to right side (left = 5)
 * 
 * Step 2: left=5, right=9, mid=7, arr[7]=8
 *         8 > 7, to left side (right = 6)
 * 
 * Step 3: left=5, right=6, mid=5, arr[5]=6
 *         6 < 7, to right side (left = 6)
 * 
 * Step 4: left=6, right=6, mid=6, arr[6]=7
 *         7 == 7, FOUND! Return 6
 */

function binarySearch(arr, target) {
  // Step 1: Left aur right boundaries set karo
  let left = 0;                    // Start index
  let right = arr.length - 1;      // End index
  
  // Step 2: Jab tak left <= right, search karte raho
  while (left <= right) {
    // Step 3: Middle index find karo
    const mid = Math.floor((left + right) / 2);
    
    // Step 4: Middle element ko target se compare karo
    if (arr[mid] === target) {
      // Agar match ho gaya to index return karo
      return mid;
    } else if (arr[mid] < target) {
      // Agar middle element chhota hai target se
      // To target right side mein hoga
      left = mid + 1;  // Left boundary ko mid+1 kar do
    } else {
      // Agar middle element bada hai target se
      // To target left side mein hoga
      right = mid - 1; // Right boundary ko mid-1 kar do
    }
  }
  
  // Step 5: Agar loop khatam ho gaya to element nahi mila
  return -1; // Not found
}

// Example 1: Basic usage (ascending order)
const sortedArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const index2 = binarySearch(sortedArr, 7);
console.log(index2); // Output: 6 (element 7, index 6 par hai)

// Example 2: First element
const firstElem = binarySearch(sortedArr, 1);
console.log(firstElem); // Output: 0

// Example 3: Last element
const lastElem = binarySearch(sortedArr, 10);
console.log(lastElem); // Output: 9

// Example 4: Element nahi mila
const notFound2 = binarySearch(sortedArr, 15);
console.log(notFound2); // Output: -1

// Example 5: Recursive version (alternative approach)
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
  // Base case: Agar left > right to element nahi mila
  if (left > right) {
    return -1;
  }
  
  const mid = Math.floor((left + right) / 2);
  
  if (arr[mid] === target) {
    return mid;
  } else if (arr[mid] < target) {
    // Right side mein search karo
    return binarySearchRecursive(arr, target, mid + 1, right);
  } else {
    // Left side mein search karo
    return binarySearchRecursive(arr, target, left, mid - 1);
  }
}

const recursiveResult = binarySearchRecursive(sortedArr, 7);
console.log(recursiveResult); // Output: 6

// Example 6: Descending order array
function binarySearchDescending(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] > target) {
      // Descending order mein agar mid bada hai to right side
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return -1;
}

const descendingArr = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
const descResult = binarySearchDescending(descendingArr, 7);
console.log(descResult); // Output: 3

// ============================================
// INSERT OPERATIONS
// ============================================

// Insert at end (O(1) amortized)
arr.push(60); // [10, 20, 30, 40, 50, 60]

// Insert at beginning (O(n))
arr.unshift(0); // [0, 10, 20, 30, 40, 50, 60]

// Insert at middle (O(n))
function insertAt(arr, index, value) {
  // Shift elements to right
  for (let i = arr.length; i > index; i--) {
    arr[i] = arr[i - 1];
  }
  arr[index] = value;
  return arr;
}

insertAt([1, 2, 3, 4, 5], 2, 99); // [1, 2, 99, 3, 4, 5]

// ============================================
// DELETE OPERATIONS
// ============================================

// Delete from end (O(1))
arr.pop(); // Removes last element

// Delete from beginning (O(n))
arr.shift(); // Removes first element

// Delete from middle (O(n))
function deleteAt(arr, index) {
  // Shift elements to left
  for (let i = index; i < arr.length - 1; i++) {
    arr[i] = arr[i + 1];
  }
  arr.length--; // Reduce length
  return arr;
}

deleteAt([1, 2, 3, 4, 5], 2); // [1, 2, 4, 5]

// ============================================
// TWO POINTER TECHNIQUE
// ============================================

// Find pair with sum
function twoSum(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left < right) {
    const sum = arr[left] + arr[right];
    
    if (sum === target) {
      return [left, right];
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }
  
  return [-1, -1]; // Not found
}

// Time: O(n), Space: O(1)
twoSum([1, 2, 3, 4, 5], 7); // [2, 3]

// ============================================
// SLIDING WINDOW
// ============================================

// Maximum sum of subarray of size k
function maxSumSubarray(arr, k) {
  let maxSum = 0;
  let windowSum = 0;
  
  // Calculate sum of first window
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

// Time: O(n), Space: O(1)
maxSumSubarray([1, 4, 2, 10, 23, 3, 1, 0, 20], 4); // 39

// ============================================
// ARRAY ROTATION
// ============================================

// Rotate array left by k positions
function rotateLeft(arr, k) {
  const n = arr.length;
  k = k % n; // Handle k > n
  
  // Reverse first k elements
  reverse(arr, 0, k - 1);
  // Reverse remaining elements
  reverse(arr, k, n - 1);
  // Reverse entire array
  reverse(arr, 0, n - 1);
  
  return arr;
}

function reverse(arr, start, end) {
  while (start < end) {
    [arr[start], arr[end]] = [arr[end], arr[start]];
    start++;
    end--;
  }
}

// Time: O(n), Space: O(1)
rotateLeft([1, 2, 3, 4, 5], 2); // [3, 4, 5, 1, 2]

// ============================================
// KADANE'S ALGORITHM (MAXIMUM SUBARRAY SUM)
// ============================================

function maxSubarraySum(arr) {
  let maxSum = arr[0];
  let currentSum = arr[0];
  
  for (let i = 1; i < arr.length; i++) {
    // Either extend previous subarray or start new
    currentSum = Math.max(arr[i], currentSum + arr[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  
  return maxSum;
}

// Time: O(n), Space: O(1)
maxSubarraySum([-2, 1, -3, 4, -1, 2, 1, -5, 4]); // 6

// ============================================
// DUTCH NATIONAL FLAG (3-WAY PARTITIONING)
// ============================================

// Sort array with 0s, 1s, 2s
function dutchNationalFlag(arr) {
  let low = 0;
  let mid = 0;
  let high = arr.length - 1;
  
  while (mid <= high) {
    if (arr[mid] === 0) {
      [arr[low], arr[mid]] = [arr[mid], arr[low]];
      low++;
      mid++;
    } else if (arr[mid] === 1) {
      mid++;
    } else { // arr[mid] === 2
      [arr[mid], arr[high]] = [arr[high], arr[mid]];
      high--;
    }
  }
  
  return arr;
}

// Time: O(n), Space: O(1)
dutchNationalFlag([2, 0, 2, 1, 1, 0]); // [0, 0, 1, 1, 2, 2]
```

---

## E) Internal Working

**Array Memory:**
- Contiguous memory allocation
- Base address + index * element size
- Direct memory access
- Cache-friendly (spatial locality)

**Dynamic Arrays:**
- Resize when full
- Copy to new larger array
- Amortized O(1) for append

---

## F) Interview Questions & Answers

### Q1: What is an array and what are its time complexities?

**Answer:**
Array is collection of elements in contiguous memory, accessed by index. Time complexities: Access O(1), Search O(n) linear or O(log n) binary if sorted, Insert O(n) middle or O(1) end amortized, Delete O(n) middle or O(1) end. Space: O(n). Arrays provide fast random access but slow insertion/deletion in middle.

### Q2: What is the difference between static and dynamic arrays?

**Answer:**
Static arrays have fixed size (declared at compile time), cannot resize, memory allocated at declaration. Dynamic arrays can resize (grow/shrink), memory allocated at runtime, resize by creating new larger array and copying elements (amortized O(1) for append). JavaScript arrays are dynamic.

### Q3: Explain two-pointer technique.

**Answer:**
Two-pointer technique uses two pointers moving through array, often from both ends or same direction. Use for: Sorted array problems (two sum, three sum), palindromes, removing duplicates, partitioning. Benefits: O(n) time instead of O(n²), O(1) extra space. Example: Finding pair with sum in sorted array.

---

## G) Common Mistakes

### Mistake 1: Off-by-One Errors

```javascript
// ❌ WRONG - Off by one
for (let i = 0; i <= arr.length; i++) {
  // Accesses arr[arr.length] which is undefined
}

// ✅ CORRECT
for (let i = 0; i < arr.length; i++) {
  // Correct bounds
}
```

**Why it breaks:** Accesses invalid index, causes errors.

---

## H) When to Use & When NOT to Use

Use arrays for random access, sequential data, simple collections. Don't use for frequent insertions/deletions in middle (use linked list), or when size unknown and frequent resizing (consider other structures).

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain Arrays."

**You:**
"Arrays are collection of elements in contiguous memory, accessed by index. Time complexities: Access O(1), Search O(n) linear or O(log n) binary if sorted, Insert O(n) middle or O(1) end, Delete O(n) middle or O(1) end.

Static arrays have fixed size, dynamic arrays can resize. Two-pointer technique useful for sorted array problems. Sliding window for subarray problems. Arrays provide fast random access but slow middle insertions/deletions."

---

## J) Mini Practice Task

Implement: Linear search, binary search, array rotation, two sum, maximum subarray sum, sliding window maximum.

---

**END OF TOPIC: ARRAYS FUNDAMENTALS**

