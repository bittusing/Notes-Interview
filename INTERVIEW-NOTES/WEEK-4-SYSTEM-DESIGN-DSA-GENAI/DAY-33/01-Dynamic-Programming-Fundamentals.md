# DYNAMIC PROGRAMMING FUNDAMENTALS

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Dynamic Programming (DP) kya hai?**
- DP optimization technique hai
- Overlapping subproblems solve karta hai
- Optimal substructure use karta hai
- Memoization ya tabulation use karta hai
- Exponential time ko polynomial mein reduce karta hai

**Real-life Analogy:**
- DP = Smart calculation (results remember karke)
- Without DP = Same calculation repeat (waste)
- Memoization = Notes (remember results)
- Tabulation = Table (store results)

**DP Characteristics:**
- **Overlapping Subproblems:** Same problems repeat
- **Optimal Substructure:** Optimal solution = optimal subproblems
- **Memoization:** Top-down (recursive + cache)
- **Tabulation:** Bottom-up (iterative + table)

**DP Approach:**
1. Identify subproblems
2. Define state
3. Find recurrence relation
4. Base cases
5. Memoize or tabulate

---

## B) Easy English Theory

### What is Dynamic Programming?

Dynamic Programming is optimization technique solving problems with overlapping subproblems and optimal substructure. Approaches: Memoization (top-down, recursive with cache), Tabulation (bottom-up, iterative with table). Reduces exponential time to polynomial. Steps: Identify subproblems, define state, find recurrence, base cases, memoize/tabulate.

---

## C) Why This Concept Exists

### The Problem

**Without DP:**
- Repeated calculations
- Exponential time
- Inefficient solutions
- No optimization

### The Solution

**DP Provides:**
1. **Efficiency:** Avoid repeated work
2. **Optimization:** Optimal solutions
3. **Speed:** Polynomial time
4. **Systematic:** Clear approach

---

## D) Practical Example (Code)

```javascript
// ============================================
// FIBONACCI (CLASSIC DP EXAMPLE)
// ============================================

// Naive recursive (O(2^n))
function fibonacciNaive(n) {
  if (n <= 1) return n;
  return fibonacciNaive(n - 1) + fibonacciNaive(n - 2);
}

// Memoization (Top-down) - O(n) time, O(n) space
function fibonacciMemo(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  
  memo[n] = fibonacciMemo(n - 1, memo) + fibonacciMemo(n - 2, memo);
  return memo[n];
}

// Tabulation (Bottom-up) - O(n) time, O(n) space
function fibonacciTab(n) {
  if (n <= 1) return n;
  
  const dp = [0, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  
  return dp[n];
}

// Space optimized - O(n) time, O(1) space
function fibonacciOptimized(n) {
  if (n <= 1) return n;
  
  let prev2 = 0;
  let prev1 = 1;
  
  for (let i = 2; i <= n; i++) {
    const current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }
  
  return prev1;
}

// ============================================
// CLIMBING STAIRS
// ============================================

// Problem: Climb n stairs, can take 1 or 2 steps at a time
// How many ways?

// Memoization
function climbStairsMemo(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n === 0) return 1;
  if (n < 0) return 0;
  
  memo[n] = climbStairsMemo(n - 1, memo) + climbStairsMemo(n - 2, memo);
  return memo[n];
}

// Tabulation
function climbStairsTab(n) {
  if (n <= 2) return n;
  
  const dp = [0, 1, 2];
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  
  return dp[n];
}

// ============================================
// HOUSE ROBBER
// ============================================

// Problem: Rob houses, can't rob adjacent houses
// Maximize money

function houseRobber(nums) {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];
  
  const dp = [nums[0], Math.max(nums[0], nums[1])];
  
  for (let i = 2; i < nums.length; i++) {
    // Either rob current + i-2, or skip (i-1)
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
  }
  
  return dp[nums.length - 1];
}

// Space optimized
function houseRobberOptimized(nums) {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];
  
  let prev2 = nums[0];
  let prev1 = Math.max(nums[0], nums[1]);
  
  for (let i = 2; i < nums.length; i++) {
    const current = Math.max(prev1, prev2 + nums[i]);
    prev2 = prev1;
    prev1 = current;
  }
  
  return prev1;
}

// ============================================
// COIN CHANGE (COUNT WAYS)
// ============================================

// Problem: Count ways to make amount using coins

function coinChangeWays(coins, amount) {
  const dp = Array(amount + 1).fill(0);
  dp[0] = 1; // One way to make 0
  
  for (let coin of coins) {
    for (let i = coin; i <= amount; i++) {
      dp[i] += dp[i - coin];
    }
  }
  
  return dp[amount];
}

// ============================================
// COIN CHANGE (MINIMUM COINS)
// ============================================

// Problem: Minimum coins to make amount

function coinChangeMin(coins, amount) {
  const dp = Array(amount + 1).fill(Infinity);
  dp[0] = 0; // 0 coins for 0 amount
  
  for (let i = 1; i <= amount; i++) {
    for (let coin of coins) {
      if (coin <= i) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  
  return dp[amount] === Infinity ? -1 : dp[amount];
}

// ============================================
// LONGEST INCREASING SUBSEQUENCE (LIS)
// ============================================

function lengthOfLIS(nums) {
  const dp = Array(nums.length).fill(1);
  
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }
  
  return Math.max(...dp);
}

// ============================================
// UNIQUE PATHS
// ============================================

// Problem: Unique paths from top-left to bottom-right
// Can only move right or down

function uniquePaths(m, n) {
  const dp = Array(m).fill(null).map(() => Array(n).fill(1));
  
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }
  
  return dp[m - 1][n - 1];
}

// Space optimized
function uniquePathsOptimized(m, n) {
  const dp = Array(n).fill(1);
  
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[j] += dp[j - 1];
    }
  }
  
  return dp[n - 1];
}

// ============================================
// EDIT DISTANCE
// ============================================

// Problem: Minimum operations to convert word1 to word2
// Operations: insert, delete, replace

function minDistance(word1, word2) {
  const m = word1.length;
  const n = word2.length;
  const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
  
  // Base cases
  for (let i = 0; i <= m; i++) {
    dp[i][0] = i; // Delete all
  }
  for (let j = 0; j <= n; j++) {
    dp[0][j] = j; // Insert all
  }
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1]; // No operation
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,     // Delete
          dp[i][j - 1] + 1,     // Insert
          dp[i - 1][j - 1] + 1  // Replace
        );
      }
    }
  }
  
  return dp[m][n];
}
```

---

## E) Internal Working

**DP Process:**
1. Identify overlapping subproblems
2. Define state (what to store)
3. Find recurrence relation
4. Base cases
5. Memoize or tabulate

**Memoization:**
- Top-down
- Recursive
- Cache results
- Lazy evaluation

**Tabulation:**
- Bottom-up
- Iterative
- Fill table
- All subproblems

---

## F) Interview Questions & Answers

### Q1: What is Dynamic Programming?

**Answer:**
Dynamic Programming is optimization technique for problems with overlapping subproblems and optimal substructure. Approaches: Memoization (top-down, recursive with cache), Tabulation (bottom-up, iterative with table). Reduces exponential time to polynomial. Steps: Identify subproblems, define state, find recurrence relation, base cases, memoize/tabulate.

### Q2: What is the difference between memoization and tabulation?

**Answer:**
Memoization: Top-down approach, recursive function with cache, solves subproblems on-demand (lazy), may not solve all subproblems, easier to think. Tabulation: Bottom-up approach, iterative with table, solves all subproblems, fills table systematically, usually faster (no recursion overhead). Both achieve same result, choose based on preference.

### Q3: How do you identify if a problem can use DP?

**Answer:**
DP applicable when: Overlapping subproblems (same subproblems appear multiple times), optimal substructure (optimal solution contains optimal solutions to subproblems). Signs: Recursive solution with repeated calculations, optimization problem (min/max), counting problem, can break into smaller similar problems. Examples: Fibonacci, longest common subsequence, coin change, knapsack.

---

## G) Common Mistakes

### Mistake 1: Not Memoizing

```javascript
// ❌ WRONG - No memoization
function solve(n) {
  if (n <= 1) return n;
  return solve(n - 1) + solve(n - 2);
  // Repeated calculations
}

// ✅ CORRECT - Memoize
function solve(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  memo[n] = solve(n - 1, memo) + solve(n - 2, memo);
  return memo[n];
}
```

**Why it breaks:** Exponential time, repeated calculations.

---

## H) When to Use & When NOT to Use

Use DP for overlapping subproblems, optimal substructure, optimization problems. Don't use when no overlapping subproblems or when greedy/divide-conquer sufficient.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain Dynamic Programming."

**You:**
"DP is optimization technique for problems with overlapping subproblems and optimal substructure. Approaches: Memoization (top-down, recursive with cache), Tabulation (bottom-up, iterative with table).

Steps: Identify subproblems, define state, find recurrence relation, base cases, memoize/tabulate. Reduces exponential to polynomial time. Use for: Fibonacci, longest subsequence, coin change, knapsack. Key: Store results to avoid recalculation."

---

## J) Mini Practice Task

Solve: Fibonacci, climbing stairs, house robber, coin change, longest increasing subsequence, unique paths, edit distance.

---

**END OF TOPIC: DYNAMIC PROGRAMMING FUNDAMENTALS**

