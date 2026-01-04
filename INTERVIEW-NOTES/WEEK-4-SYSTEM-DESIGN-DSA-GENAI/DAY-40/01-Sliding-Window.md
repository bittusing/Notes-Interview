# SLIDING WINDOW

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Sliding Window kya hai?**
- Sliding Window technique subarray/substring problems ke liye hai
- Window slide karke explore karta hai
- Fixed size ya variable size window
- O(n) time mein solve karta hai
- Two pointers use karta hai

**Real-life Analogy:**
- Sliding Window = Camera viewfinder
- Window = View area
- Slide = Move view
- Fixed = Same size window
- Variable = Size change karta hai

**Sliding Window Types:**
- **Fixed Size:** Window size constant
- **Variable Size:** Window size changes
- **Two Pointers:** Left and right pointers

**When to Use:**
- Subarray/substring problems
- Maximum/minimum in window
- Sum/product in window
- Pattern matching

---

## B) Easy English Theory

### What is Sliding Window?

Sliding Window technique solves subarray/substring problems efficiently. Maintains window (subarray) and slides it through array. Types: Fixed size (constant window), Variable size (size changes based on condition). Uses two pointers (left, right). Time O(n) typically. Use for: Maximum sum subarray, longest substring, pattern matching, window problems.

---

## C) Why This Concept Exists

### The Problem

**Without Sliding Window:**
- Brute force O(n²) or O(n³)
- Repeated calculations
- Inefficient
- Time consuming

### The Solution

**Sliding Window Provides:**
1. **Efficiency:** O(n) time
2. **Optimization:** Avoid repeated work
3. **Simplicity:** Two pointers
4. **Performance:** Fast solutions

---

## D) Practical Example (Code)

```javascript
// ============================================
// FIXED SIZE SLIDING WINDOW
// ============================================

// Maximum sum of subarray of size k
function maxSumSubarray(arr, k) {
  let windowSum = 0;
  let maxSum = 0;
  
  // Calculate sum of first window
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }
  maxSum = windowSum;
  
  // Slide window
  for (let i = k; i < arr.length; i++) {
    windowSum = windowSum - arr[i - k] + arr[i]; // Remove left, add right
    maxSum = Math.max(maxSum, windowSum);
  }
  
  return maxSum;
}

// Time: O(n), Space: O(1)

// ============================================
// VARIABLE SIZE SLIDING WINDOW
// ============================================

// Longest substring with at most k distinct characters
function longestSubstringKDistinct(s, k) {
  const map = new Map();
  let left = 0;
  let maxLength = 0;
  
  for (let right = 0; right < s.length; right++) {
    // Add character to window
    map.set(s[right], (map.get(s[right]) || 0) + 1);
    
    // Shrink window if more than k distinct
    while (map.size > k) {
      map.set(s[left], map.get(s[left]) - 1);
      if (map.get(s[left]) === 0) {
        map.delete(s[left]);
      }
      left++;
    }
    
    maxLength = Math.max(maxLength, right - left + 1);
  }
  
  return maxLength;
}

// ============================================
// MINIMUM WINDOW SUBSTRING
// ============================================

function minWindow(s, t) {
  const need = {};
  let needCount = t.length;
  
  // Count characters needed
  for (let char of t) {
    need[char] = (need[char] || 0) + 1;
  }
  
  let left = 0;
  let right = 0;
  let minLen = Infinity;
  let minStart = 0;
  const window = {};
  let haveCount = 0;
  
  while (right < s.length) {
    const char = s[right];
    window[char] = (window[char] || 0) + 1;
    
    // Check if this character satisfies need
    if (need[char] && window[char] === need[char]) {
      haveCount++;
    }
    
    // Try to shrink window
    while (haveCount === needCount) {
      // Update minimum
      if (right - left + 1 < minLen) {
        minLen = right - left + 1;
        minStart = left;
      }
      
      // Remove left character
      const leftChar = s[left];
      window[leftChar]--;
      
      if (need[leftChar] && window[leftChar] < need[leftChar]) {
        haveCount--;
      }
      
      left++;
    }
    
    right++;
  }
  
  return minLen === Infinity ? '' : s.substring(minStart, minStart + minLen);
}

// ============================================
// LONGEST SUBSTRING WITHOUT REPEATING CHARACTERS
// ============================================

function lengthOfLongestSubstring(s) {
  const map = new Map();
  let left = 0;
  let maxLength = 0;
  
  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    
    // If character already in window, move left
    if (map.has(char) && map.get(char) >= left) {
      left = map.get(char) + 1;
    }
    
    map.set(char, right);
    maxLength = Math.max(maxLength, right - left + 1);
  }
  
  return maxLength;
}

// ============================================
// SUBARRAY WITH GIVEN SUM
// ============================================

function subarraySum(arr, target) {
  let left = 0;
  let currentSum = 0;
  
  for (let right = 0; right < arr.length; right++) {
    currentSum += arr[right];
    
    // Shrink window if sum exceeds target
    while (currentSum > target && left <= right) {
      currentSum -= arr[left];
      left++;
    }
    
    if (currentSum === target) {
      return [left, right];
    }
  }
  
  return [];
}

// ============================================
// MAXIMUM AVERAGE SUBARRAY
// ============================================

function findMaxAverage(nums, k) {
  let windowSum = 0;
  
  // First window
  for (let i = 0; i < k; i++) {
    windowSum += nums[i];
  }
  
  let maxSum = windowSum;
  
  // Slide window
  for (let i = k; i < nums.length; i++) {
    windowSum = windowSum - nums[i - k] + nums[i];
    maxSum = Math.max(maxSum, windowSum);
  }
  
  return maxSum / k;
}

// ============================================
// LONGEST REPEATING CHARACTER REPLACEMENT
// ============================================

function characterReplacement(s, k) {
  const count = {};
  let left = 0;
  let maxCount = 0;
  let maxLength = 0;
  
  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    count[char] = (count[char] || 0) + 1;
    maxCount = Math.max(maxCount, count[char]);
    
    // If window size - maxCount > k, need to shrink
    if (right - left + 1 - maxCount > k) {
      count[s[left]]--;
      left++;
    }
    
    maxLength = Math.max(maxLength, right - left + 1);
  }
  
  return maxLength;
}

// ============================================
// SLIDING WINDOW MAXIMUM
// ============================================

function maxSlidingWindow(nums, k) {
  const result = [];
  const deque = []; // Store indices
  
  for (let i = 0; i < nums.length; i++) {
    // Remove indices outside window
    while (deque.length > 0 && deque[0] <= i - k) {
      deque.shift();
    }
    
    // Remove smaller elements from rear
    while (deque.length > 0 && nums[deque[deque.length - 1]] < nums[i]) {
      deque.pop();
    }
    
    deque.push(i);
    
    // Add to result when window is complete
    if (i >= k - 1) {
      result.push(nums[deque[0]]);
    }
  }
  
  return result;
}

// ============================================
// COUNT SUBARRAYS WITH EXACTLY K DISTINCT
// ============================================

function subarraysWithKDistinct(nums, k) {
  // At most K - At most (K-1) = Exactly K
  return atMostKDistinct(nums, k) - atMostKDistinct(nums, k - 1);
}

function atMostKDistinct(nums, k) {
  const map = new Map();
  let left = 0;
  let count = 0;
  
  for (let right = 0; right < nums.length; right++) {
    map.set(nums[right], (map.get(nums[right]) || 0) + 1);
    
    while (map.size > k) {
      map.set(nums[left], map.get(nums[left]) - 1);
      if (map.get(nums[left]) === 0) {
        map.delete(nums[left]);
      }
      left++;
    }
    
    count += right - left + 1; // All subarrays ending at right
  }
  
  return count;
}
```

---

## E) Internal Working

**Sliding Window Process:**
1. Initialize window
2. Expand right pointer
3. Check condition
4. Shrink left if needed
5. Update result

**Time Complexity:**
- O(n) typically
- Each element visited at most twice

---

## F) Interview Questions & Answers

### Q1: What is Sliding Window technique?

**Answer:**
Sliding Window maintains subarray/substring and slides through array. Types: Fixed size (constant window - calculate first window, slide by removing left and adding right), Variable size (expand right, shrink left based on condition). Uses two pointers. Time O(n) typically. Use for subarray/substring problems, maximum/minimum in window.

### Q2: When would you use Sliding Window?

**Answer:**
Use Sliding Window for: Subarray/substring problems, maximum/minimum sum/product in window, longest/shortest substring with condition, pattern matching, window-based problems. Signs: Array/string problem, subarray/substring, contiguous elements, optimization problem. If brute force O(n²) or O(n³), sliding window might give O(n).

### Q3: What's the difference between fixed and variable size sliding window?

**Answer:**
Fixed size: Window size constant (k), calculate first window, slide by removing left and adding right, simpler. Variable size: Window size changes, expand right pointer, shrink left based on condition, more complex. Fixed for problems with specific window size, variable for longest/shortest with condition.

---

## G) Common Mistakes

### Mistake 1: Not Updating Window Correctly

```javascript
// ❌ WRONG - Not removing left element
windowSum += arr[right];
// Missing: windowSum -= arr[left]

// ✅ CORRECT - Update both ends
windowSum = windowSum - arr[left] + arr[right];
```

**Why it breaks:** Window sum incorrect, wrong results.

---

## H) When to Use & When NOT to Use

Use Sliding Window for subarray/substring problems, contiguous elements, window-based optimization. Don't use when elements not contiguous or when two pointers sufficient.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain Sliding Window."

**You:**
"Sliding Window maintains subarray/substring and slides through array. Types: Fixed size (constant window, slide by remove left/add right), Variable size (expand right, shrink left based on condition). Uses two pointers.

Time O(n) typically. Use for subarray/substring problems, maximum/minimum in window, longest substring. Key: Maintain window state, update efficiently when sliding."

---

## J) Mini Practice Task

Solve: Maximum sum subarray, longest substring, minimum window substring, sliding window maximum, subarray with given sum, character replacement.

---

**END OF TOPIC: SLIDING WINDOW**

