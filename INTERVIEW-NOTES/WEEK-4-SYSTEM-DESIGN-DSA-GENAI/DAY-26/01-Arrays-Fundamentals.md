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

/**
 * RECURSION KYA HAI? (RECURSIVE FUNCTION)
 * 
 * Recursion ek programming technique hai jisme function apne aap ko call karta hai.
 * 
 * Simple Definition:
 * - Function jo apne aap ko call karta hai = Recursive function
 * - Jaise matryoshka dolls (ek doll ke andar dusra doll)
 * - Function ke andar same function ko call karna
 * 
 * Real-life Analogy:
 * 1. Matryoshka Dolls (Russian dolls):
 *    - Ek doll ke andar dusra doll
 *    - Har doll apne jaisa hi hota hai, bas size chhota
 *    - Isi tarah recursive function bhi apne jaisa hi function call karta hai
 * 
 * 2. Mirrors facing each other:
 *    - Aap mirror mein apni reflection dekhte ho
 *    - Reflection mein bhi aapki reflection
 *    - Infinite reflections (lekin code mein base case se ruk jata hai)
 * 
 * 3. Factorial example:
 *    - 5! = 5 × 4!
 *    - 4! = 4 × 3!
 *    - 3! = 3 × 2!
 *    - 2! = 2 × 1!
 *    - 1! = 1 (base case - yahan rukna hai)
 * 
 * Key Components of Recursion:
 * 
 * 1. BASE CASE (Stopping Condition):
 *    - Woh condition jahan recursion ruk jata hai
 *    - Bina base case ke infinite loop ho jayega
 *    - Jaise: if (n === 0) return 1;
 * 
 * 2. RECURSIVE CASE:
 *    - Function apne aap ko call karta hai
 *    - Problem ko chhoti problem mein divide karta hai
 *    - Jaise: return n * factorial(n - 1);
 * 
 * 3. PROGRESS TOWARD BASE CASE:
 *    - Har call mein problem chhoti hoti jani chahiye
 *    - Eventually base case tak pahunchna chahiye
 *    - Jaise: factorial(5) → factorial(4) → factorial(3) → ... → factorial(1)
 * 
 * Simple Recursion Example - Factorial:
 * 
 * function factorial(n) {
 *   // BASE CASE: Agar n 0 ya 1 hai to 1 return karo
 *   if (n === 0 || n === 1) {
 *     return 1;
 *   }
 *   
 *   // RECURSIVE CASE: n * factorial(n-1)
 *   return n * factorial(n - 1);
 * }
 * 
 * factorial(5) ka step-by-step:
 * factorial(5)
 *   = 5 * factorial(4)
 *   = 5 * (4 * factorial(3))
 *   = 5 * (4 * (3 * factorial(2)))
 *   = 5 * (4 * (3 * (2 * factorial(1))))
 *   = 5 * (4 * (3 * (2 * 1)))  // Base case reached
 *   = 5 * (4 * (3 * 2))
 *   = 5 * (4 * 6)
 *   = 5 * 24
 *   = 120
 * 
 * Recursion vs Iteration (Loop):
 * 
 * RECURSION:
 * - Function apne aap ko call karta hai
 * - Call stack use hota hai
 * - Code simple aur clean lagta hai
 * - Memory zyada use hoti hai (stack frames)
 * - Example: factorial(n) = n * factorial(n-1)
 * 
 * ITERATION (LOOP):
 * - Loop use hota hai (for, while)
 * - Memory kam use hoti hai
 * - Code thoda complex lag sakta hai
 * - Example: for loop se factorial calculate karna
 * 
 * Advantages of Recursion:
 * - Code simple aur readable hota hai
 * - Complex problems ko easily solve karte hain
 * - Tree/Graph problems mein natural fit hai
 * - Divide and conquer algorithms mein useful
 * 
 * Disadvantages of Recursion:
 * - Memory zyada use hoti hai (stack overflow risk)
 * - Slower ho sakta hai (function call overhead)
 * - Debug karna mushkil ho sakta hai
 * - Infinite recursion se stack overflow ho sakta hai
 * 
 * When to Use Recursion:
 * - Tree/Graph traversal
 * - Divide and conquer algorithms
 * - Problems jo naturally recursive hain (factorial, fibonacci)
 * - Backtracking problems
 * - Dynamic programming
 * 
 * When NOT to Use Recursion:
 * - Simple loops se ho sakta hai
 * - Performance critical code
 * - Deep recursion (stack overflow risk)
 * - Memory constraints
 */

// Simple Recursion Examples:

// Example 1: Factorial (Most common example)
function factorial(n) {
  // Base case: Agar n 0 ya 1 hai to 1 return karo
  if (n === 0 || n === 1) {
    return 1;
  }
  
  // Recursive case: n * factorial(n-1)
  return n * factorial(n - 1);
}

console.log(factorial(5)); // Output: 120 (5! = 5 × 4 × 3 × 2 × 1 = 120)
console.log(factorial(0)); // Output: 1 (0! = 1)

// Example 2: Fibonacci (Another common example)
function fibonacci(n) {
  // Base cases
  if (n === 0) return 0;
  if (n === 1) return 1;
  
  // Recursive case: Sum of previous two numbers
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(6)); // Output: 8 (0, 1, 1, 2, 3, 5, 8)
// fibonacci(6) = fibonacci(5) + fibonacci(4)
// fibonacci(5) = fibonacci(4) + fibonacci(3)
// ... and so on

// Example 3: Countdown (Visual example)
function countdown(n) {
  // Base case
  if (n <= 0) {
    console.log('Blast off!');
    return;
  }
  
  // Print current number
  console.log(n);
  
  // Recursive call with smaller number
  countdown(n - 1);
}

countdown(5);
// Output:
// 5
// 4
// 3
// 2
// 1
// Blast off!

// Example 4: Sum of array elements
function sumArray(arr, index = 0) {
  // Base case: Agar index array length se zyada hai
  if (index >= arr.length) {
    return 0;
  }
  
  // Recursive case: Current element + sum of rest
  return arr[index] + sumArray(arr, index + 1);
}

console.log(sumArray([1, 2, 3, 4, 5])); // Output: 15
// sumArray([1,2,3,4,5], 0)
//   = 1 + sumArray([1,2,3,4,5], 1)
//   = 1 + (2 + sumArray([1,2,3,4,5], 2))
//   = 1 + (2 + (3 + sumArray([1,2,3,4,5], 3)))
//   = ... = 15

// Now: Binary Search Recursive Version
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
  // BASE CASE: Agar left > right to element nahi mila
  // Yeh woh point hai jahan recursion rukna hai
  if (left > right) {
    return -1; // Element not found
  }
  
  // Middle index find karo
  const mid = Math.floor((left + right) / 2);
  
  // BASE CASE: Agar middle element target hai to return karo
  if (arr[mid] === target) {
    return mid; // Element found at index mid
  }
  
  // RECURSIVE CASES: Problem ko chhoti problem mein divide karo
  if (arr[mid] < target) {
    // Target bada hai to right side mein search karo
    // Left boundary ko mid+1 kar do, right same rahega
    return binarySearchRecursive(arr, target, mid + 1, right);
  } else {
    // Target chhota hai to left side mein search karo
    // Right boundary ko mid-1 kar do, left same rahega
    return binarySearchRecursive(arr, target, left, mid - 1);
  }
}

// Example usage:
const sortedArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const recursiveResult = binarySearchRecursive(sortedArr, 7);
console.log(recursiveResult); // Output: 6

/**
 * Binary Search Recursive ka Step-by-step:
 * 
 * Array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 * Target: 7
 * 
 * Call 1: binarySearchRecursive(arr, 7, left=0, right=9)
 *   mid = (0+9)/2 = 4
 *   arr[4] = 5
 *   5 < 7, so right side: binarySearchRecursive(arr, 7, left=5, right=9)
 * 
 * Call 2: binarySearchRecursive(arr, 7, left=5, right=9)
 *   mid = (5+9)/2 = 7
 *   arr[7] = 8
 *   8 > 7, so left side: binarySearchRecursive(arr, 7, left=5, right=6)
 * 
 * Call 3: binarySearchRecursive(arr, 7, left=5, right=6)
 *   mid = (5+6)/2 = 5
 *   arr[5] = 6
 *   6 < 7, so right side: binarySearchRecursive(arr, 7, left=6, right=6)
 * 
 * Call 4: binarySearchRecursive(arr, 7, left=6, right=6)
 *   mid = (6+6)/2 = 6
 *   arr[6] = 7
 *   7 == 7, BASE CASE REACHED! Return 6
 * 
 * Result: 6 (element 7 is at index 6)
 */

/**
 * Recursive vs Iterative Binary Search:
 * 
 * RECURSIVE VERSION (above):
 * - Function apne aap ko call karta hai
 * - Base cases: left > right OR arr[mid] === target
 * - Recursive calls: left/right boundaries change karte hain
 * - Call stack use hota hai
 * - Code clean aur readable
 * 
 * ITERATIVE VERSION (earlier):
 * - while loop use hota hai
 * - Same logic, bas loop ke through
 * - No function calls (except first one)
 * - Less memory usage
 * - Slightly faster
 * 
 * Both do the same thing, choose based on preference/requirements!
 */

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

/**
 * TWO POINTER TECHNIQUE KYA HAI?
 * 
 * Two Pointer Technique ek powerful algorithm pattern hai jisme do pointers use hote hain
 * array ko efficiently traverse karne ke liye.
 * 
 * Simple Definition:
 * - Do pointers (indices) use karke array process karna
 * - Pointers ko move karna based on condition
 * - O(n) time complexity mein solve karna (instead of O(n²))
 * 
 * Real-life Analogy:
 * 1. Meeting in Middle:
 *    - Jaise aap aur dost opposite ends se start karte ho
 *    - Dono ek-ek step aage badhte ho
 *    - Jab mil jao to stop (target found)
 *    - Isi tarah two pointers start aur end se move karte hain
 * 
 * 2. Scissors Cutting Paper:
 *    - Do blades (pointers) ek saath move karte hain
 *    - Left blade aur right blade dono important hain
 *    - Dono ki position se decision hota hai
 * 
 * Types of Two Pointer Techniques:
 * 
 * 1. OPPOSITE ENDS (Most Common):
 *    - Left pointer = start (0)
 *    - Right pointer = end (arr.length - 1)
 *    - Pointers toward each other move karte hain
 *    - Use case: Sorted array problems (two sum, palindrome)
 * 
 * 2. SAME DIRECTION (Fast & Slow):
 *    - Dono pointers same direction se start
 *    - Fast pointer aage move karta hai
 *    - Slow pointer piche rehta hai
 *    - Use case: Remove duplicates, cycle detection
 * 
 * 3. DIFFERENT SPEEDS:
 *    - Fast pointer 2 steps, slow pointer 1 step
 *    - Use case: Finding middle element, cycle detection
 * 
 * Key Benefits:
 * - Time Complexity: O(n) instead of O(n²)
 * - Space Complexity: O(1) extra space
 * - Efficient: Single pass mein solve
 * - Clean Code: Simple logic
 * 
 * When to Use:
 * - Sorted array problems
 * - Finding pairs/triplets with sum
 * - Palindrome checking
 * - Removing duplicates
 * - Merging sorted arrays
 * - Partitioning problems
 */

// Example 1: Two Sum (Opposite Ends - Most Common)
function twoSum(arr, target) {
  // Step 1: Do pointers initialize karo
  let left = 0;              // Start se
  let right = arr.length - 1; // End se
  
  // Step 2: Jab tak pointers meet nahi karte
  while (left < right) {
    // Step 3: Current sum calculate karo
    const sum = arr[left] + arr[right];
    
    // Step 4: Check karo
    if (sum === target) {
      // Agar sum target ke equal hai to indices return karo
      return [left, right];
    } else if (sum < target) {
      // Agar sum chhota hai to left pointer ko aage badhao
      // (sorted array mein bade number chahiye)
      left++;
    } else {
      // Agar sum bada hai to right pointer ko piche karo
      // (sorted array mein chhota number chahiye)
      right--;
    }
  }
  
  // Step 5: Agar loop complete ho gaya to pair nahi mila
  return [-1, -1]; // Not found
}

// Example with step-by-step:
// Array: [1, 2, 3, 4, 5], Target: 7
// Step 1: left=0, right=4, arr[0]+arr[4]=1+5=6 < 7, left++
// Step 2: left=1, right=4, arr[1]+arr[4]=2+5=7 == 7, Found! Return [1,4]

console.log(twoSum([1, 2, 3, 4, 5], 7)); // Output: [1, 4] (indices 1 and 4)
console.log(twoSum([2, 7, 11, 15], 9)); // Output: [0, 1] (indices 0 and 1)

// Example 2: Three Sum (Extension of two pointer)
function threeSum(arr, target) {
  arr.sort((a, b) => a - b); // Sort karna zaroori hai
  const result = [];
  
  for (let i = 0; i < arr.length - 2; i++) {
    let left = i + 1;
    let right = arr.length - 1;
    
    while (left < right) {
      const sum = arr[i] + arr[left] + arr[right];
      
      if (sum === target) {
        result.push([arr[i], arr[left], arr[right]]);
        left++;
        right--;
      } else if (sum < target) {
        left++;
      } else {
        right--;
      }
    }
  }
  
  return result;
}

// Example 3: Palindrome Check (Opposite Ends)
function isPalindrome(str) {
  let left = 0;
  let right = str.length - 1;
  
  while (left < right) {
    if (str[left] !== str[right]) {
      return false; // Not palindrome
    }
    left++;
    right--;
  }
  
  return true; // Palindrome
}

console.log(isPalindrome('racecar')); // true
console.log(isPalindrome('hello')); // false

// Example 4: Remove Duplicates (Same Direction)
function removeDuplicates(arr) {
  if (arr.length === 0) return 0;
  
  let slow = 0; // Slow pointer (unique elements ke liye)
  
  // Fast pointer har element ko check karta hai
  for (let fast = 1; fast < arr.length; fast++) {
    if (arr[fast] !== arr[slow]) {
      slow++; // Slow pointer aage badhao
      arr[slow] = arr[fast]; // Unique element store karo
    }
  }
  
  return slow + 1; // Unique elements ka count
}

const sortedArr = [1, 1, 2, 2, 2, 3, 4, 4, 5];
const uniqueCount = removeDuplicates(sortedArr);
console.log(uniqueCount); // 5 (5 unique elements)

// Example 5: Reverse Array (Opposite Ends)
function reverseArray(arr) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left < right) {
    // Swap elements
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
  
  return arr;
}

console.log(reverseArray([1, 2, 3, 4, 5])); // [5, 4, 3, 2, 1]

// Example 6: Container With Most Water (Opposite Ends)
function maxArea(height) {
  let left = 0;
  let right = height.length - 1;
  let maxArea = 0;
  
  while (left < right) {
    // Area = width * min height
    const width = right - left;
    const minHeight = Math.min(height[left], height[right]);
    const area = width * minHeight;
    maxArea = Math.max(maxArea, area);
    
    // Move pointer with smaller height
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }
  
  return maxArea;
}

console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])); // 49

// ============================================
// SLIDING WINDOW TECHNIQUE
// ============================================

/**
 * SLIDING WINDOW TECHNIQUE KYA HAI?
 * 
 * Sliding Window Technique ek powerful pattern hai jisme fixed ya variable size ka
 * window array par slide karta hai, har step par window ko update karte hue.
 * 
 * Simple Definition:
 * - Window = Continuous subarray ka portion
 * - Window ko slide karna = Left element remove, right element add
 * - Efficient calculation = Reuse previous calculations
 * 
 * Real-life Analogy:
 * 1. Train Window:
 *    - Train ki window se aap ek particular view dekhte ho
 *    - Train move hone par window ka view change hota hai
 *    - Purana scene hat jata hai, naya scene aa jata hai
 *    - Isi tarah sliding window bhi purane element remove, naya element add karta hai
 * 
 * 2. Camera Frame:
 *    - Camera frame ek fixed area capture karta hai
 *    - Frame ko move karne par view change hota hai
 *    - Continuous frames se video banta hai
 * 
 * Types of Sliding Window:
 * 
 * 1. FIXED SIZE WINDOW:
 *    - Window ka size fixed hota hai (e.g., k elements)
 *    - Window ko step-by-step slide karte hain
 *    - Use case: Maximum sum of subarray of size k
 * 
 * 2. VARIABLE SIZE WINDOW:
 *    - Window ka size change hota hai
 *    - Condition based expand/shrink
 *    - Use case: Longest substring with k unique characters
 * 
 * Key Benefits:
 * - Time Complexity: O(n) instead of O(n²)
 * - Space Complexity: O(1) or O(k)
 * - Efficient: Avoid redundant calculations
 * - Single Pass: Array ko ek baar traverse
 * 
 * Algorithm Steps (Fixed Size):
 * 1. First window ka result calculate karo
 * 2. Window ko slide karo (left remove, right add)
 * 3. Result update karo
 * 4. Repeat step 2-3
 * 
 * When to Use:
 * - Subarray/substring problems
 * - Fixed size window problems
 * - Maximum/minimum in window
 * - String problems (longest substring)
 * - Array problems (maximum sum, average)
 */

// Example 1: Maximum Sum of Subarray of Size K (Fixed Window)
function maxSumSubarray(arr, k) {
  // Step 1: First window ka sum calculate karo
  let windowSum = 0;
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }
  
  // Step 2: First window ka sum hi max sum assume karo
  let maxSum = windowSum;
  
  // Step 3: Window ko slide karo
  // Start from k (next element after first window)
  for (let i = k; i < arr.length; i++) {
    // Window slide: Left element remove, right element add
    windowSum = windowSum - arr[i - k] + arr[i];
    // Update max sum
    maxSum = Math.max(maxSum, windowSum);
  }
  
  return maxSum;
}

// Example with step-by-step:
// Array: [1, 4, 2, 10, 23, 3, 1, 0, 20], k = 4
// 
// Window 1: [1, 4, 2, 10] → sum = 17
// Window 2: [4, 2, 10, 23] → sum = 17 - 1 + 23 = 39
// Window 3: [2, 10, 23, 3] → sum = 39 - 4 + 3 = 38
// Window 4: [10, 23, 3, 1] → sum = 38 - 2 + 1 = 37
// Window 5: [23, 3, 1, 0] → sum = 37 - 10 + 0 = 27
// Window 6: [3, 1, 0, 20] → sum = 27 - 23 + 20 = 24
// 
// Maximum sum = 39 (Window 2)

console.log(maxSumSubarray([1, 4, 2, 10, 23, 3, 1, 0, 20], 4)); // Output: 39

// Example 2: Average of Subarrays of Size K
function averageSubarray(arr, k) {
  const result = [];
  let windowSum = 0;
  let windowStart = 0;
  
  for (let windowEnd = 0; windowEnd < arr.length; windowEnd++) {
    windowSum += arr[windowEnd]; // Add element to window
    
    // Agar window size k ho gaya to
    if (windowEnd >= k - 1) {
      result.push(windowSum / k); // Average add karo
      windowSum -= arr[windowStart]; // Remove left element
      windowStart++; // Move window start
    }
  }
  
  return result;
}

console.log(averageSubarray([1, 3, 2, 6, -1, 4, 1, 8, 2], 5));
// Output: [2.2, 2.8, 2.4, 3.6, 2.8]

// Example 3: Maximum in Each Window of Size K
function maxInWindow(arr, k) {
  const result = [];
  const window = []; // Store indices
  
  for (let i = 0; i < arr.length; i++) {
    // Remove indices outside current window
    while (window.length > 0 && window[0] <= i - k) {
      window.shift();
    }
    
    // Remove smaller elements from back
    while (window.length > 0 && arr[window[window.length - 1]] <= arr[i]) {
      window.pop();
    }
    
    window.push(i);
    
    // Add maximum to result when window is complete
    if (i >= k - 1) {
      result.push(arr[window[0]]);
    }
  }
  
  return result;
}

console.log(maxInWindow([1, 3, -1, -3, 5, 3, 6, 7], 3));
// Output: [3, 3, 5, 5, 6, 7]

// Example 4: Longest Substring with K Unique Characters (Variable Window)
function longestSubstringKUnique(str, k) {
  let windowStart = 0;
  let maxLength = 0;
  const charFrequency = {};
  
  for (let windowEnd = 0; windowEnd < str.length; windowEnd++) {
    const rightChar = str[windowEnd];
    
    // Add character to frequency map
    if (!(rightChar in charFrequency)) {
      charFrequency[rightChar] = 0;
    }
    charFrequency[rightChar] += 1;
    
    // Shrink window if unique characters exceed k
    while (Object.keys(charFrequency).length > k) {
      const leftChar = str[windowStart];
      charFrequency[leftChar] -= 1;
      if (charFrequency[leftChar] === 0) {
        delete charFrequency[leftChar];
      }
      windowStart++;
    }
    
    maxLength = Math.max(maxLength, windowEnd - windowStart + 1);
  }
  
  return maxLength;
}

console.log(longestSubstringKUnique('araaci', 2)); // Output: 4 ('araa')
console.log(longestSubstringKUnique('araaci', 1)); // Output: 2 ('aa')

// Example 5: Minimum Size Subarray Sum (Variable Window)
function minSubArrayLen(target, nums) {
  let windowSum = 0;
  let minLength = Infinity;
  let windowStart = 0;
  
  for (let windowEnd = 0; windowEnd < nums.length; windowEnd++) {
    windowSum += nums[windowEnd]; // Add element
    
    // Shrink window until sum < target
    while (windowSum >= target) {
      minLength = Math.min(minLength, windowEnd - windowStart + 1);
      windowSum -= nums[windowStart];
      windowStart++;
    }
  }
  
  return minLength === Infinity ? 0 : minLength;
}

console.log(minSubArrayLen(7, [2, 3, 1, 2, 4, 3])); // Output: 2 ([4, 3])

// Example 6: Longest Substring Without Repeating Characters
function lengthOfLongestSubstring(s) {
  const charIndexMap = {};
  let maxLength = 0;
  let windowStart = 0;
  
  for (let windowEnd = 0; windowEnd < s.length; windowEnd++) {
    const rightChar = s[windowEnd];
    
    // If character already in window, move window start
    if (rightChar in charIndexMap) {
      windowStart = Math.max(windowStart, charIndexMap[rightChar] + 1);
    }
    
    charIndexMap[rightChar] = windowEnd;
    maxLength = Math.max(maxLength, windowEnd - windowStart + 1);
  }
  
  return maxLength;
}

console.log(lengthOfLongestSubstring('abcabcbb')); // Output: 3 ('abc')
console.log(lengthOfLongestSubstring('bbbbb')); // Output: 1 ('b')

// ============================================
// ARRAY ROTATION
// ============================================

/**
 * ARRAY ROTATION KYA HAI?
 * 
 * Array Rotation matlab array ke elements ko left ya right direction mein shift karna.
 * Elements rotate hote hain - jo end par tha wo start par aa jata hai (circular rotation).
 * 
 * Simple Definition:
 * - Left Rotation: Elements left direction mein shift (start se end tak)
 * - Right Rotation: Elements right direction mein shift (end se start tak)
 * - Circular: Last element first par aur first element last par
 * 
 * Real-life Analogy:
 * 1. Circular Queue:
 *    - Jaise circular queue mein elements rotate hote hain
 *    - Last element remove hone par first position available hoti hai
 *    - Circular arrangement
 * 
 * 2. Rotating Wheel:
 *    - Wheel rotate hone par har point apni position change karta hai
 *    - 360° rotation par wapas same position
 *    - K positions rotate = K steps shift
 * 
 * Types of Rotation:
 * 
 * 1. LEFT ROTATION:
 *    - Elements left direction mein shift
 *    - First k elements end par move hote hain
 *    - Example: [1,2,3,4,5] left rotate by 2 → [3,4,5,1,2]
 * 
 * 2. RIGHT ROTATION:
 *    - Elements right direction mein shift
 *    - Last k elements start par move hote hain
 *    - Example: [1,2,3,4,5] right rotate by 2 → [4,5,1,2,3]
 * 
 * Rotation Methods:
 * 
 * 1. REVERSAL ALGORITHM (Most Efficient):
 *    - O(n) time, O(1) space
 *    - Three reversals use karte hain
 *    - Best approach for in-place rotation
 * 
 * 2. TEMPORARY ARRAY:
 *    - O(n) time, O(k) space
 *    - K elements ko temporary array mein store
 *    - Shift remaining elements
 * 
 * 3. ONE BY ONE ROTATION:
 *    - O(n*k) time, O(1) space
 *    - K times rotate by 1
 *    - Simple but slow
 * 
 * Key Points:
 * - k % n use karo (k > n handle karne ke liye)
 * - Left rotate by k = Right rotate by (n-k)
 * - In-place rotation preferred (O(1) space)
 */

// Example 1: Left Rotate using Reversal Algorithm (Optimal)
function rotateLeft(arr, k) {
  const n = arr.length;
  k = k % n; // Handle k > n (k=7, n=5 → k=2)
  
  // Step 1: Reverse first k elements
  // [1,2,3,4,5] k=2 → reverse [1,2] → [2,1,3,4,5]
  reverse(arr, 0, k - 1);
  
  // Step 2: Reverse remaining elements
  // [2,1,3,4,5] → reverse [3,4,5] → [2,1,5,4,3]
  reverse(arr, k, n - 1);
  
  // Step 3: Reverse entire array
  // [2,1,5,4,3] → reverse all → [3,4,5,1,2] ✓
  reverse(arr, 0, n - 1);
  
  return arr;
}

// Helper function: Reverse array from start to end
function reverse(arr, start, end) {
  while (start < end) {
    // Swap elements
    [arr[start], arr[end]] = [arr[end], arr[start]];
    start++;
    end--;
  }
}

// Example with step-by-step:
// Array: [1, 2, 3, 4, 5], k = 2 (left rotate by 2)
// 
// Step 1: Reverse first 2 elements [1,2]
//   [1, 2, 3, 4, 5] → [2, 1, 3, 4, 5]
// 
// Step 2: Reverse remaining elements [3,4,5]
//   [2, 1, 3, 4, 5] → [2, 1, 5, 4, 3]
// 
// Step 3: Reverse entire array
//   [2, 1, 5, 4, 3] → [3, 4, 5, 1, 2] ✓
// 
// Result: [3, 4, 5, 1, 2]

console.log(rotateLeft([1, 2, 3, 4, 5], 2)); // Output: [3, 4, 5, 1, 2]
console.log(rotateLeft([1, 2, 3, 4, 5], 7)); // Output: [3, 4, 5, 1, 2] (7 % 5 = 2)

// Example 2: Right Rotate using Reversal Algorithm
function rotateRight(arr, k) {
  const n = arr.length;
  k = k % n;
  
  // Right rotate by k = Left rotate by (n-k)
  // Or use reverse in different order
  
  // Reverse entire array
  reverse(arr, 0, n - 1);
  // Reverse first k elements
  reverse(arr, 0, k - 1);
  // Reverse remaining elements
  reverse(arr, k, n - 1);
  
  return arr;
}

// Example: [1, 2, 3, 4, 5] right rotate by 2
// Step 1: Reverse all → [5, 4, 3, 2, 1]
// Step 2: Reverse first 2 → [4, 5, 3, 2, 1]
// Step 3: Reverse remaining → [4, 5, 1, 2, 3] ✓

console.log(rotateRight([1, 2, 3, 4, 5], 2)); // Output: [4, 5, 1, 2, 3]

// Example 3: Left Rotate using Temporary Array
function rotateLeftTemp(arr, k) {
  const n = arr.length;
  k = k % n;
  
  // Store first k elements
  const temp = arr.slice(0, k);
  
  // Shift remaining elements left
  for (let i = 0; i < n - k; i++) {
    arr[i] = arr[i + k];
  }
  
  // Place temp elements at end
  for (let i = 0; i < k; i++) {
    arr[n - k + i] = temp[i];
  }
  
  return arr;
}

console.log(rotateLeftTemp([1, 2, 3, 4, 5], 2)); // Output: [3, 4, 5, 1, 2]

// Example 4: Right Rotate using Temporary Array
function rotateRightTemp(arr, k) {
  const n = arr.length;
  k = k % n;
  
  // Store last k elements
  const temp = arr.slice(n - k);
  
  // Shift elements right
  for (let i = n - 1; i >= k; i--) {
    arr[i] = arr[i - k];
  }
  
  // Place temp elements at start
  for (let i = 0; i < k; i++) {
    arr[i] = temp[i];
  }
  
  return arr;
}

console.log(rotateRightTemp([1, 2, 3, 4, 5], 2)); // Output: [4, 5, 1, 2, 3]

// Example 5: Rotate One by One (Simple but Slow - O(n*k))
function rotateLeftOneByOne(arr, k) {
  const n = arr.length;
  k = k % n;
  
  for (let i = 0; i < k; i++) {
    // Rotate by 1, k times
    const first = arr[0];
    for (let j = 0; j < n - 1; j++) {
      arr[j] = arr[j + 1];
    }
    arr[n - 1] = first;
  }
  
  return arr;
}

console.log(rotateLeftOneByOne([1, 2, 3, 4, 5], 2)); // Output: [3, 4, 5, 1, 2]

// Example 6: Find Element in Rotated Sorted Array
function searchRotated(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) return mid;
    
    // Left half is sorted
    if (arr[left] <= arr[mid]) {
      if (target >= arr[left] && target < arr[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      // Right half is sorted
      if (target > arr[mid] && target <= arr[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
  
  return -1;
}

console.log(searchRotated([4, 5, 6, 7, 0, 1, 2], 0)); // Output: 4
console.log(searchRotated([4, 5, 6, 7, 0, 1, 2], 3)); // Output: -1

// ============================================
// KADANE'S ALGORITHM (MAXIMUM SUBARRAY SUM)
// ============================================

/**
 * KADANE'S ALGORITHM KYA HAI?
 * 
 * Kadane's Algorithm ek dynamic programming algorithm hai jo maximum sum find karta hai
 * contiguous subarray ka (array ke continuous portion ka).
 * 
 * Simple Definition:
 * - Maximum sum find karo continuous subarray ka
 * - Dynamic programming approach use karta hai
 * - O(n) time complexity (single pass)
 * - O(1) space complexity
 * 
 * Real-life Analogy:
 * 1. Stock Market:
 *    - Aap ko maximum profit find karna hai (continuous days ka)
 *    - Negative profit (loss) ko ignore karo
 *    - Agar loss ho raha hai to naya start karo
 *    - Maximum profit track karte raho
 * 
 * 2. Running Sum:
 *    - Jaise aap running score track karte ho
 *    - Agar score negative ho to naya start
 *    - Maximum score yaad rakho
 * 
 * Key Insight:
 * - Har index par decision: Previous subarray continue karo ya naya start karo?
 * - Agar previous sum negative hai to naya start better hai
 * - Agar previous sum positive hai to continue karo
 * 
 * Algorithm Steps:
 * 1. currentSum = arr[0] (first element se start)
 * 2. maxSum = arr[0] (first element hi max abhi)
 * 3. Har element ke liye:
 *    - currentSum = max(arr[i], currentSum + arr[i])
 *      (ya to naya start, ya previous continue)
 *    - maxSum = max(maxSum, currentSum)
 *      (maximum track karo)
 * 4. Return maxSum
 * 
 * Time Complexity: O(n) - Single pass
 * Space Complexity: O(1) - Constant space
 * 
 * When to Use:
 * - Maximum subarray sum
 * - Maximum product subarray
 * - Stock buy/sell problems
 * - Maximum sum problems
 */

function maxSubarraySum(arr) {
  // Step 1: Initialize with first element
  let maxSum = arr[0];      // Maximum sum found so far
  let currentSum = arr[0];  // Current subarray sum
  
  // Step 2: Process each element
  for (let i = 1; i < arr.length; i++) {
    // Step 3: Decision point
    // Option 1: Start new subarray from current element
    // Option 2: Extend previous subarray (add current element)
    // Choose the maximum
    currentSum = Math.max(arr[i], currentSum + arr[i]);
    
    // Step 4: Update maximum sum if needed
    maxSum = Math.max(maxSum, currentSum);
  }
  
  return maxSum;
}

// Example with step-by-step:
// Array: [-2, 1, -3, 4, -1, 2, 1, -5, 4]
// 
// i=0: currentSum=-2, maxSum=-2
// i=1: currentSum=max(1, -2+1)=max(1,-1)=1, maxSum=max(-2,1)=1
// i=2: currentSum=max(-3, 1-3)=max(-3,-2)=-2, maxSum=max(1,-2)=1
// i=3: currentSum=max(4, -2+4)=max(4,2)=4, maxSum=max(1,4)=4
// i=4: currentSum=max(-1, 4-1)=max(-1,3)=3, maxSum=max(4,3)=4
// i=5: currentSum=max(2, 3+2)=max(2,5)=5, maxSum=max(4,5)=5
// i=6: currentSum=max(1, 5+1)=max(1,6)=6, maxSum=max(5,6)=6
// i=7: currentSum=max(-5, 6-5)=max(-5,1)=1, maxSum=max(6,1)=6
// i=8: currentSum=max(4, 1+4)=max(4,5)=5, maxSum=max(6,5)=6
// 
// Result: 6 (subarray: [4, -1, 2, 1])

console.log(maxSubarraySum([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // Output: 6
console.log(maxSubarraySum([1, -3, 2, 1, -1])); // Output: 3
console.log(maxSubarraySum([-1, -2, -3])); // Output: -1 (all negative)

// Example 2: Maximum Subarray Sum with Indices (Track start/end)
function maxSubarraySumWithIndices(arr) {
  let maxSum = arr[0];
  let currentSum = arr[0];
  let start = 0;
  let end = 0;
  let tempStart = 0;
  
  for (let i = 1; i < arr.length; i++) {
    if (currentSum < 0) {
      // Start new subarray
      currentSum = arr[i];
      tempStart = i;
    } else {
      // Extend previous subarray
      currentSum += arr[i];
    }
    
    if (currentSum > maxSum) {
      maxSum = currentSum;
      start = tempStart;
      end = i;
    }
  }
  
  return { sum: maxSum, start, end, subarray: arr.slice(start, end + 1) };
}

const result = maxSubarraySumWithIndices([-2, 1, -3, 4, -1, 2, 1, -5, 4]);
console.log(result);
// Output: { sum: 6, start: 3, end: 6, subarray: [4, -1, 2, 1] }

// Example 3: Maximum Product Subarray (Kadane's variant)
function maxProductSubarray(arr) {
  let maxProduct = arr[0];
  let minProduct = arr[0]; // Track minimum for negative numbers
  let result = arr[0];
  
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < 0) {
      // Swap max and min when negative number
      [maxProduct, minProduct] = [minProduct, maxProduct];
    }
    
    maxProduct = Math.max(arr[i], maxProduct * arr[i]);
    minProduct = Math.min(arr[i], minProduct * arr[i]);
    result = Math.max(result, maxProduct);
  }
  
  return result;
}

console.log(maxProductSubarray([2, 3, -2, 4])); // Output: 6 (2*3)
console.log(maxProductSubarray([-2, 0, -1])); // Output: 0

// Example 4: Maximum Sum Circular Subarray
function maxCircularSubarraySum(arr) {
  // Case 1: Maximum sum in normal array (Kadane's)
  const maxNormal = maxSubarraySum(arr);
  
  // Case 2: Maximum sum in circular array
  // Total sum - minimum subarray sum
  let totalSum = 0;
  for (let i = 0; i < arr.length; i++) {
    totalSum += arr[i];
  }
  
  // Invert array to find minimum sum
  const inverted = arr.map(x => -x);
  const minSum = -maxSubarraySum(inverted);
  
  const maxCircular = totalSum - minSum;
  
  // Return maximum of both cases
  return Math.max(maxNormal, maxCircular);
}

console.log(maxCircularSubarraySum([5, -3, 5])); // Output: 10 (circular)
console.log(maxCircularSubarraySum([1, -2, 3, -2])); // Output: 3

// ============================================
// DUTCH NATIONAL FLAG ALGORITHM (3-WAY PARTITIONING)
// ============================================

/**
 * DUTCH NATIONAL FLAG ALGORITHM KYA HAI?
 * 
 * Dutch National Flag Algorithm ek 3-way partitioning algorithm hai jo array ko
 * three parts mein divide karta hai based on three values (typically 0, 1, 2).
 * 
 * Simple Definition:
 * - Array ko three regions mein divide karna
 * - Three pointers use karte hain (low, mid, high)
 * - Single pass mein sort karna
 * - O(n) time, O(1) space
 * 
 * Why "Dutch National Flag"?
 * - Dutch flag has three colors: Red, White, Blue (horizontally arranged)
 * - Algorithm bhi three colors (0, 1, 2) ko arrange karta hai
 * - Similar visual arrangement
 * 
 * Real-life Analogy:
 * 1. Color Sorting:
 *    - Jaise aap three colors ko sort karte ho
 *    - Red (0) left side
 *    - White (1) middle
 *    - Blue (2) right side
 * 
 * 2. Ball Sorting:
 *    - Three types of balls (small, medium, large)
 *    - Small balls left, medium middle, large right
 *    - Single pass mein sort
 * 
 * Algorithm Concept:
 * 
 * Three Pointers:
 * - low: 0s ka end (0s left side ke end ko point karta hai)
 * - mid: Current element (1s ke region ko point karta hai)
 * - high: 2s ka start (2s right side ke start ko point karta hai)
 * 
 * Three Regions:
 * [0...0, 1...1, 2...2]
 *  ^      ^      ^
 * low    mid    high
 * 
 * Invariant:
 * - Elements before low: All 0s
 * - Elements from low to mid-1: All 1s
 * - Elements from mid to high: Unknown (processing)
 * - Elements after high: All 2s
 * 
 * Algorithm Steps:
 * 1. Initialize: low=0, mid=0, high=n-1
 * 2. While mid <= high:
 *    a. If arr[mid] == 0: Swap with arr[low], low++, mid++
 *    b. If arr[mid] == 1: mid++ (already in correct region)
 *    c. If arr[mid] == 2: Swap with arr[high], high-- (mid++ nahi!)
 * 3. Return sorted array
 * 
 * Why mid++ not for case 3?
 * - High se swap karne par naya element aata hai (0, 1, ya 2)
 * - Us element ko bhi check karna padega
 * - Isliye mid++ nahi karte (next iteration mein check hoga)
 * 
 * Time Complexity: O(n) - Single pass
 * Space Complexity: O(1) - In-place sorting
 * 
 * When to Use:
 * - Sort array with 0s, 1s, 2s
 * - 3-way partitioning
 * - Quick sort optimization
 * - Problems with three categories
 */

function dutchNationalFlag(arr) {
  // Step 1: Three pointers initialize karo
  let low = 0;              // 0s ka region end
  let mid = 0;              // Current processing element (1s ka region)
  let high = arr.length - 1; // 2s ka region start
  
  // Step 2: Jab tak mid high se zyada nahi ho jata
  while (mid <= high) {
    if (arr[mid] === 0) {
      // Case 1: Element is 0
      // 0 ko left side (low region) mein move karo
      [arr[low], arr[mid]] = [arr[mid], arr[low]];
      low++;  // Low region expand
      mid++;  // Process next element
    } else if (arr[mid] === 1) {
      // Case 2: Element is 1
      // 1 already correct region mein hai (middle)
      mid++;  // Just move to next (no swap needed)
    } else {
      // Case 3: Element is 2
      // 2 ko right side (high region) mein move karo
      [arr[mid], arr[high]] = [arr[high], arr[mid]];
      high--; // High region expand
      // mid++ NAHI! (kyunki swap se naya element aaya hai, check karna padega)
    }
  }
  
  return arr;
}

// Example with step-by-step:
// Array: [2, 0, 2, 1, 1, 0]
// 
// Initial: low=0, mid=0, high=5
// [2, 0, 2, 1, 1, 0]
//  ^
// mid
// 
// Iteration 1: arr[mid]=2 → Swap with arr[high], high--
// [0, 0, 2, 1, 1, 2]
//  ^        ^
// mid      high
// 
// Iteration 2: arr[mid]=0 → Swap with arr[low], low++, mid++
// [0, 0, 2, 1, 1, 2]
//     ^     ^
//    low   mid, high
// 
// Iteration 3: arr[mid]=2 → Swap with arr[high], high--
// [0, 0, 1, 1, 2, 2]
//     ^  ^  ^
//    low mid high
// 
// Iteration 4: arr[mid]=1 → mid++ (already correct)
// [0, 0, 1, 1, 2, 2]
//     ^     ^  ^
//    low   mid high
// 
// Iteration 5: arr[mid]=1 → mid++ (already correct)
// [0, 0, 1, 1, 2, 2]
//     ^        ^
//    low      mid,high
// 
// mid > high, STOP
// Result: [0, 0, 1, 1, 2, 2] ✓

console.log(dutchNationalFlag([2, 0, 2, 1, 1, 0])); 
// Output: [0, 0, 1, 1, 2, 2]

console.log(dutchNationalFlag([2, 0, 1])); 
// Output: [0, 1, 2]

console.log(dutchNationalFlag([0])); 
// Output: [0]

console.log(dutchNationalFlag([1, 1, 1])); 
// Output: [1, 1, 1]

// Example 2: Generic 3-way Partitioning
function threeWayPartition(arr, lowVal, highVal) {
  // Partition: [<lowVal, >=lowVal && <=highVal, >highVal]
  let low = 0;
  let mid = 0;
  let high = arr.length - 1;
  
  while (mid <= high) {
    if (arr[mid] < lowVal) {
      [arr[low], arr[mid]] = [arr[mid], arr[low]];
      low++;
      mid++;
    } else if (arr[mid] > highVal) {
      [arr[mid], arr[high]] = [arr[high], arr[mid]];
      high--;
    } else {
      mid++;
    }
  }
  
  return arr;
}

console.log(threeWayPartition([1, 14, 5, 20, 4, 2, 54, 20, 87, 98, 3, 1, 32], 10, 20));
// Output: [1, 5, 4, 2, 3, 1, 14, 20, 20, 98, 87, 32, 54]
//         [<10, 10-20, >20]

// Example 3: Sort Colors (Leetcode problem name)
function sortColors(nums) {
  return dutchNationalFlag(nums);
}

// Example 4: With Count (Alternative approach - but uses extra space)
function dutchNationalFlagCount(arr) {
  let count0 = 0, count1 = 0, count2 = 0;
  
  // Count occurrences
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 0) count0++;
    else if (arr[i] === 1) count1++;
    else count2++;
  }
  
  // Fill array
  let i = 0;
  while (count0 > 0) {
    arr[i++] = 0;
    count0--;
  }
  while (count1 > 0) {
    arr[i++] = 1;
    count1--;
  }
  while (count2 > 0) {
    arr[i++] = 2;
    count2--;
  }
  
  return arr;
}

console.log(dutchNationalFlagCount([2, 0, 2, 1, 1, 0]));
// Output: [0, 0, 1, 1, 2, 2]
// Note: This uses O(n) space for counting, but easier to understand
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

