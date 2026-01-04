# DYNAMIC PROGRAMMING PATTERNS

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**DP Patterns kya hain?**
- DP Patterns common problem types hain
- Similar structure ke problems
- Pattern identify karke solve kar sakte hain
- Practice se patterns recognize ho jate hain
- Interview mein bahut common

**Common DP Patterns:**
- **1D DP:** Single array
- **2D DP:** Two-dimensional array
- **Knapsack:** 0/1, Unbounded
- **LCS/LIS:** Longest subsequences
- **String DP:** Edit distance, palindrome
- **Matrix DP:** Path problems

**Pattern Recognition:**
- Problem type identify
- State definition
- Transition relation
- Base cases

---

## B) Easy English Theory

### What are DP Patterns?

DP Patterns are common problem structures in dynamic programming. Types: 1D DP (single array - Fibonacci, climbing stairs), 2D DP (matrix - unique paths, LCS), Knapsack (0/1, unbounded), LCS/LIS (longest subsequences), String DP (edit distance), Matrix DP (path problems). Recognizing patterns helps solve similar problems quickly.

---

## C) Why This Concept Exists

### The Problem

**Without Patterns:**
- Each problem seems different
- Difficult to recognize
- Time consuming
- No systematic approach

### The Solution

**Patterns Provide:**
1. **Recognition:** Quick identification
2. **Template:** Similar structure
3. **Efficiency:** Faster solving
4. **Confidence:** Know approach

---

## D) Practical Example (Code)

```javascript
// ============================================
// PATTERN 1: 1D DP
// ============================================

// Examples: Fibonacci, Climbing Stairs, House Robber
function pattern1D(n) {
  const dp = Array(n + 1).fill(0);
  dp[0] = baseCase0;
  dp[1] = baseCase1;
  
  for (let i = 2; i <= n; i++) {
    dp[i] = recurrence(dp[i - 1], dp[i - 2], ...);
  }
  
  return dp[n];
}

// ============================================
// PATTERN 2: 2D DP
// ============================================

// Examples: Unique Paths, LCS, Edit Distance
function pattern2D(m, n) {
  const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
  
  // Base cases
  for (let i = 0; i <= m; i++) {
    dp[i][0] = baseCase;
  }
  for (let j = 0; j <= n; j++) {
    dp[0][j] = baseCase;
  }
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = recurrence(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  
  return dp[m][n];
}

// ============================================
// PATTERN 3: 0/1 KNAPSACK
// ============================================

// Problem: Items with weight and value, maximize value with weight limit
// Each item can be taken at most once

function knapsack01(weights, values, capacity) {
  const n = weights.length;
  const dp = Array(n + 1).fill(null).map(() => Array(capacity + 1).fill(0));
  
  for (let i = 1; i <= n; i++) {
    for (let w = 1; w <= capacity; w++) {
      if (weights[i - 1] <= w) {
        // Either take item or skip
        dp[i][w] = Math.max(
          dp[i - 1][w], // Skip
          dp[i - 1][w - weights[i - 1]] + values[i - 1] // Take
        );
      } else {
        dp[i][w] = dp[i - 1][w]; // Can't take
      }
    }
  }
  
  return dp[n][capacity];
}

// Space optimized (1D array)
function knapsack01Optimized(weights, values, capacity) {
  const dp = Array(capacity + 1).fill(0);
  
  for (let i = 0; i < weights.length; i++) {
    // Iterate backwards to avoid using updated values
    for (let w = capacity; w >= weights[i]; w--) {
      dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
    }
  }
  
  return dp[capacity];
}

// ============================================
// PATTERN 4: UNBOUNDED KNAPSACK
// ============================================

// Items can be taken multiple times

function unboundedKnapsack(weights, values, capacity) {
  const dp = Array(capacity + 1).fill(0);
  
  for (let w = 1; w <= capacity; w++) {
    for (let i = 0; i < weights.length; i++) {
      if (weights[i] <= w) {
        dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
      }
    }
  }
  
  return dp[capacity];
}

// ============================================
// PATTERN 5: LONGEST COMMON SUBSEQUENCE (LCS)
// ============================================

function longestCommonSubsequence(text1, text2) {
  const m = text1.length;
  const n = text2.length;
  const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  
  return dp[m][n];
}

// ============================================
// PATTERN 6: LONGEST COMMON SUBSTRING
// ============================================

function longestCommonSubstring(text1, text2) {
  const m = text1.length;
  const n = text2.length;
  const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
  let maxLength = 0;
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        maxLength = Math.max(maxLength, dp[i][j]);
      } else {
        dp[i][j] = 0; // Reset (substring must be contiguous)
      }
    }
  }
  
  return maxLength;
}

// ============================================
// PATTERN 7: PALINDROME DP
// ============================================

// Longest Palindromic Substring
function longestPalindrome(s) {
  const n = s.length;
  const dp = Array(n).fill(null).map(() => Array(n).fill(false));
  let start = 0;
  let maxLen = 1;
  
  // Single characters are palindromes
  for (let i = 0; i < n; i++) {
    dp[i][i] = true;
  }
  
  // Check for length 2
  for (let i = 0; i < n - 1; i++) {
    if (s[i] === s[i + 1]) {
      dp[i][i + 1] = true;
      start = i;
      maxLen = 2;
    }
  }
  
  // Check for length 3 and more
  for (let len = 3; len <= n; len++) {
    for (let i = 0; i < n - len + 1; i++) {
      const j = i + len - 1;
      
      if (s[i] === s[j] && dp[i + 1][j - 1]) {
        dp[i][j] = true;
        start = i;
        maxLen = len;
      }
    }
  }
  
  return s.substring(start, start + maxLen);
}

// ============================================
// PATTERN 8: MATRIX PATH PROBLEMS
// ============================================

// Minimum Path Sum
function minPathSum(grid) {
  const m = grid.length;
  const n = grid[0].length;
  const dp = Array(m).fill(null).map(() => Array(n).fill(0));
  
  // Base case: first row and column
  dp[0][0] = grid[0][0];
  for (let i = 1; i < m; i++) {
    dp[i][0] = dp[i - 1][0] + grid[i][0];
  }
  for (let j = 1; j < n; j++) {
    dp[0][j] = dp[0][j - 1] + grid[0][j];
  }
  
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
    }
  }
  
  return dp[m - 1][n - 1];
}

// ============================================
// PATTERN 9: INTERVAL DP
// ============================================

// Matrix Chain Multiplication
function matrixChainMultiplication(p) {
  const n = p.length - 1;
  const dp = Array(n).fill(null).map(() => Array(n).fill(0));
  
  // Length of chain
  for (let len = 2; len <= n; len++) {
    for (let i = 0; i < n - len + 1; i++) {
      const j = i + len - 1;
      dp[i][j] = Infinity;
      
      for (let k = i; k < j; k++) {
        const cost = dp[i][k] + dp[k + 1][j] + p[i] * p[k + 1] * p[j + 1];
        dp[i][j] = Math.min(dp[i][j], cost);
      }
    }
  }
  
  return dp[0][n - 1];
}
```

---

## E) Internal Working

**Pattern Recognition:**
- Identify problem type
- Match to pattern
- Apply template
- Customize for problem

**State Definition:**
- What to store
- Dimensions
- Meaning

---

## F) Interview Questions & Answers

### Q1: What are common DP patterns?

**Answer:**
Common patterns: 1D DP (single array - Fibonacci, climbing stairs), 2D DP (matrix - unique paths, LCS), Knapsack (0/1 - items once, Unbounded - items multiple times), LCS/LIS (longest subsequences), String DP (edit distance, palindrome), Matrix DP (path problems), Interval DP (matrix chain). Recognizing patterns helps solve quickly.

### Q2: How do you solve 0/1 Knapsack?

**Answer:**
0/1 Knapsack: DP[i][w] = maximum value with first i items and weight w. Recurrence: Either skip item (dp[i-1][w]) or take item (dp[i-1][w-weight] + value) if weight allows. Base: dp[0][w] = 0. Time O(n*capacity), Space O(n*capacity) or O(capacity) optimized. Each item taken at most once.

### Q3: What's the difference between LCS and LIS?

**Answer:**
LCS (Longest Common Subsequence): Common subsequence between two strings, order matters, can skip characters, 2D DP. LIS (Longest Increasing Subsequence): Increasing subsequence in array, order matters, can skip elements, 1D DP. Both find longest subsequence but LCS compares two sequences, LIS finds in one sequence.

---

## G) Common Mistakes

### Mistake 1: Wrong State Definition

```javascript
// ❌ WRONG - Unclear state
const dp = Array(n).fill(0);
// What does dp[i] represent?

// ✅ CORRECT - Clear state
// dp[i] = maximum value with first i items
const dp = Array(n + 1).fill(0);
```

**Why it breaks:** Unclear state leads to wrong recurrence.

---

## H) When to Use & When NOT to Use

Use DP patterns when recognize problem type. Don't force DP when simpler solution exists.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain DP Patterns."

**You:**
"Common DP patterns: 1D DP (single array - Fibonacci), 2D DP (matrix - LCS, unique paths), Knapsack (0/1 - items once, Unbounded - multiple times), LCS/LIS (longest subsequences), String DP (edit distance), Matrix DP (path problems).

Recognize pattern, define state, find recurrence, base cases, memoize/tabulate. Patterns help solve similar problems quickly. Practice recognizing patterns."

---

## J) Mini Practice Task

Solve problems from each pattern: 1D DP, 2D DP, Knapsack, LCS, String DP, Matrix DP.

---

**END OF TOPIC: DP PATTERNS**

