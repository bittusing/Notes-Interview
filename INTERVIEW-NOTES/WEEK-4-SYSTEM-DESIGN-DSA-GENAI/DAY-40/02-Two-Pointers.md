# TWO POINTERS

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Two Pointers kya hai?**
- Two Pointers technique do pointers use karta hai
- Array ya string ko traverse karta hai
- Different directions ya same direction
- O(n) time mein solve karta hai
- Space efficient

**Real-life Analogy:**
- Two Pointers = Two people meeting point dhundhna
- Start = Different positions
- Move = Towards each other
- Meet = Solution found
- Efficient = Direct approach

**Two Pointers Types:**
- **Opposite Ends:** Start from both ends
- **Same Direction:** Both move forward
- **Fast and Slow:** Different speeds

**When to Use:**
- Sorted array problems
- Pair sum problems
- Palindrome checking
- Cycle detection
- Partition problems

---

## B) Easy English Theory

### What is Two Pointers?

Two Pointers technique uses two pointers to traverse array/string. Types: Opposite ends (start from both ends, move towards center), Same direction (both move forward), Fast and slow (different speeds). Time O(n) typically, Space O(1). Use for: Sorted array problems, pair sum, palindrome, cycle detection, partition.

---

## C) Why This Concept Exists

### The Problem

**Without Two Pointers:**
- Brute force O(n²)
- Nested loops
- Inefficient
- Time consuming

### The Solution

**Two Pointers Provides:**
1. **Efficiency:** O(n) time
2. **Simplicity:** Two pointers
3. **Space:** O(1) extra space
4. **Performance:** Fast solutions

---

## D) Practical Example (Code)

```javascript
// ============================================
// TWO SUM (SORTED ARRAY)
// ============================================

function twoSumSorted(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  
  while (left < right) {
    const sum = nums[left] + nums[right];
    
    if (sum === target) {
      return [left, right];
    } else if (sum < target) {
      left++; // Need larger sum
    } else {
      right--; // Need smaller sum
    }
  }
  
  return [];
}

// Time: O(n), Space: O(1)

// ============================================
// THREE SUM
// ============================================

function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const result = [];
  
  for (let i = 0; i < nums.length - 2; i++) {
    // Skip duplicates
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    
    let left = i + 1;
    let right = nums.length - 1;
    
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      
      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);
        
        // Skip duplicates
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;
        
        left++;
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }
  
  return result;
}

// ============================================
// CONTAINER WITH MOST WATER
// ============================================

function maxArea(height) {
  let left = 0;
  let right = height.length - 1;
  let maxArea = 0;
  
  while (left < right) {
    const width = right - left;
    const area = Math.min(height[left], height[right]) * width;
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

// ============================================
// TRAPPING RAIN WATER
// ============================================

function trap(height) {
  let left = 0;
  let right = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let water = 0;
  
  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] >= leftMax) {
        leftMax = height[left];
      } else {
        water += leftMax - height[left];
      }
      left++;
    } else {
      if (height[right] >= rightMax) {
        rightMax = height[right];
      } else {
        water += rightMax - height[right];
      }
      right--;
    }
  }
  
  return water;
}

// ============================================
// REMOVE DUPLICATES FROM SORTED ARRAY
// ============================================

function removeDuplicates(nums) {
  if (nums.length === 0) return 0;
  
  let slow = 0;
  
  for (let fast = 1; fast < nums.length; fast++) {
    if (nums[fast] !== nums[slow]) {
      slow++;
      nums[slow] = nums[fast];
    }
  }
  
  return slow + 1;
}

// ============================================
// VALID PALINDROME
// ============================================

function isPalindrome(s) {
  let left = 0;
  let right = s.length - 1;
  
  while (left < right) {
    // Skip non-alphanumeric
    while (left < right && !isAlphanumeric(s[left])) {
      left++;
    }
    while (left < right && !isAlphanumeric(s[right])) {
      right--;
    }
    
    if (s[left].toLowerCase() !== s[right].toLowerCase()) {
      return false;
    }
    
    left++;
    right--;
  }
  
  return true;
}

function isAlphanumeric(char) {
  return /[a-zA-Z0-9]/.test(char);
}

// ============================================
// REVERSE STRING
// ============================================

function reverseString(s) {
  let left = 0;
  let right = s.length - 1;
  
  while (left < right) {
    [s[left], s[right]] = [s[right], s[left]];
    left++;
    right--;
  }
  
  return s;
}

// ============================================
// MOVE ZEROES
// ============================================

function moveZeroes(nums) {
  let slow = 0;
  
  // Move all non-zero elements to front
  for (let fast = 0; fast < nums.length; fast++) {
    if (nums[fast] !== 0) {
      nums[slow] = nums[fast];
      slow++;
    }
  }
  
  // Fill remaining with zeros
  for (let i = slow; i < nums.length; i++) {
    nums[i] = 0;
  }
  
  return nums;
}

// ============================================
// SQUARES OF SORTED ARRAY
// ============================================

function sortedSquares(nums) {
  const result = [];
  let left = 0;
  let right = nums.length - 1;
  let index = nums.length - 1;
  
  while (left <= right) {
    const leftSquare = nums[left] * nums[left];
    const rightSquare = nums[right] * nums[right];
    
    if (leftSquare > rightSquare) {
      result[index] = leftSquare;
      left++;
    } else {
      result[index] = rightSquare;
      right--;
    }
    index--;
  }
  
  return result;
}

// ============================================
// PARTITION ARRAY
// ============================================

function partition(nums, pivot) {
  let left = 0;
  let right = nums.length - 1;
  
  while (left <= right) {
    if (nums[left] <= pivot) {
      left++;
    } else if (nums[right] > pivot) {
      right--;
    } else {
      [nums[left], nums[right]] = [nums[right], nums[left]];
      left++;
      right--;
    }
  }
  
  return left; // Partition index
}

// ============================================
// FAST AND SLOW POINTERS
// ============================================

// Find middle of linked list
function findMiddle(head) {
  let slow = head;
  let fast = head;
  
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  
  return slow;
}

// Detect cycle
function hasCycle(head) {
  let slow = head;
  let fast = head;
  
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    
    if (slow === fast) {
      return true;
    }
  }
  
  return false;
}
```

---

## E) Internal Working

**Two Pointers Process:**
1. Initialize pointers
2. Move based on condition
3. Check condition
4. Update result
5. Continue until done

**Time Complexity:**
- O(n) typically
- Each element visited once or twice

---

## F) Interview Questions & Answers

### Q1: What is Two Pointers technique?

**Answer:**
Two Pointers uses two pointers to traverse array/string. Types: Opposite ends (start from both ends, move towards center - for sorted arrays, pair sum), Same direction (both move forward - for removing duplicates, partitioning), Fast and slow (different speeds - for cycle detection, finding middle). Time O(n), Space O(1). Use for sorted arrays, pair problems, palindrome.

### Q2: When would you use Two Pointers?

**Answer:**
Use Two Pointers for: Sorted array problems (two sum, three sum), pair sum problems, palindrome checking, removing duplicates, partitioning, cycle detection (fast/slow), finding middle element. Signs: Sorted array, pair problems, need O(n) solution, can use two indices. If brute force O(n²), two pointers might give O(n).

### Q3: What's the difference between opposite ends and same direction two pointers?

**Answer:**
Opposite ends: Start from both ends (left=0, right=n-1), move towards center, use for sorted arrays, pair sum, palindrome. Same direction: Both start from beginning, move forward together, use for removing duplicates, partitioning, window problems. Choose based on problem: Sorted/pair → opposite ends, duplicates/partition → same direction.

---

## G) Common Mistakes

### Mistake 1: Wrong Pointer Movement

```javascript
// ❌ WRONG - Move wrong pointer
if (sum < target) {
  right--; // Should move left
}

// ✅ CORRECT - Move correct pointer
if (sum < target) {
  left++; // Need larger sum
}
```

**Why it breaks:** Wrong pointer movement, incorrect results.

---

## H) When to Use & When NOT to Use

Use Two Pointers for sorted arrays, pair problems, palindrome, cycle detection. Don't use when need all pairs or when sliding window better.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain Two Pointers."

**You:"
"Two Pointers uses two pointers to traverse array/string. Types: Opposite ends (start from both ends, move towards center - for sorted arrays, pair sum), Same direction (both forward - for duplicates, partitioning), Fast and slow (different speeds - for cycle detection).

Time O(n), Space O(1). Use for sorted arrays, pair problems, palindrome, cycle detection. Key: Move pointers based on condition, efficient O(n) solution."

---

## J) Mini Practice Task

Solve: Two sum sorted, three sum, container with most water, trapping rain water, remove duplicates, valid palindrome, move zeroes, fast/slow pointers.

---

**END OF TOPIC: TWO POINTERS**

