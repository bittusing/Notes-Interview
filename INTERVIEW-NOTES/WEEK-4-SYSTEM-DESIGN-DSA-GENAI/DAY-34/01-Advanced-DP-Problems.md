# ADVANCED DP PROBLEMS

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Advanced DP Problems kya hain?**
- Advanced DP Problems complex scenarios handle karte hain
- Multiple states, constraints
- 3D DP, state machines
- Optimization techniques
- Real-world applications

**Advanced Patterns:**
- **State Machine DP:** Multiple states
- **3D DP:** Three dimensions
- **Bitmask DP:** State compression
- **Digit DP:** Number problems
- **Tree DP:** Tree problems

**Complexity:**
- Multiple states
- Complex transitions
- Optimization needed
- Space optimization

---

## B) Easy English Theory

### What are Advanced DP Problems?

Advanced DP Problems involve complex scenarios: Multiple states, 3D DP, state machines, bitmask DP, digit DP, tree DP. Require careful state definition, complex transitions, optimization techniques. Examples: Stock problems (multiple states), 3D problems, bitmask problems, tree DP problems.

---

## C) Why This Concept Exists

### The Problem

**Without Advanced Techniques:**
- Can't solve complex problems
- State explosion
- Inefficient solutions
- Limited applicability

### The Solution

**Advanced DP Provides:**
1. **Complex Problems:** Handle multiple states
2. **Optimization:** Space/time optimization
3. **Techniques:** State machines, bitmasks
4. **Applications:** Real-world problems

---

## D) Practical Example (Code)

```javascript
// ============================================
// BEST TIME TO BUY AND SELL STOCK (STATE MACHINE)
// ============================================

// Problem: Buy and sell stock, maximize profit
// Can hold at most one stock

function maxProfit(prices) {
  let hold = -prices[0]; // Hold stock
  let sold = 0; // Sold (no stock)
  
  for (let i = 1; i < prices.length; i++) {
    const newHold = Math.max(hold, sold - prices[i]); // Buy or keep
    const newSold = Math.max(sold, hold + prices[i]); // Sell or keep
    
    hold = newHold;
    sold = newSold;
  }
  
  return sold;
}

// With cooldown
function maxProfitWithCooldown(prices) {
  let hold = -prices[0];
  let sold = 0;
  let cooldown = 0;
  
  for (let i = 1; i < prices.length; i++) {
    const newHold = Math.max(hold, cooldown - prices[i]);
    const newSold = Math.max(sold, hold + prices[i]);
    const newCooldown = Math.max(cooldown, sold);
    
    hold = newHold;
    sold = newSold;
    cooldown = newCooldown;
  }
  
  return Math.max(sold, cooldown);
}

// ============================================
// 3D DP EXAMPLE
// ============================================

// Cherry Pickup
function cherryPickup(grid) {
  const n = grid.length;
  const dp = Array(n).fill(null).map(() => 
    Array(n).fill(null).map(() => Array(n).fill(-Infinity))
  );
  
  dp[0][0][0] = grid[0][0];
  
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      for (let k = 0; k < n; k++) {
        const l = i + j - k;
        if (l < 0 || l >= n || grid[i][j] === -1 || grid[k][l] === -1) {
          continue;
        }
        
        let cherries = grid[i][j];
        if (i !== k || j !== l) {
          cherries += grid[k][l];
        }
        
        // From previous positions
        const prev = [
          dp[i - 1]?.[j]?.[k - 1],
          dp[i - 1]?.[j]?.[k],
          dp[i]?.[j - 1]?.[k - 1],
          dp[i]?.[j - 1]?.[k]
        ].filter(v => v !== undefined);
        
        if (prev.length > 0) {
          dp[i][j][k] = Math.max(...prev) + cherries;
        }
      }
    }
  }
  
  return Math.max(0, dp[n - 1][n - 1][n - 1]);
}

// ============================================
// BITMASK DP
// ============================================

// Traveling Salesman Problem (TSP)
function tsp(distances) {
  const n = distances.length;
  const VISITED_ALL = (1 << n) - 1;
  const dp = Array(n).fill(null).map(() => Array(1 << n).fill(-1));
  
  function solve(mask, pos) {
    if (mask === VISITED_ALL) {
      return distances[pos][0]; // Return to start
    }
    
    if (dp[pos][mask] !== -1) {
      return dp[pos][mask];
    }
    
    let ans = Infinity;
    
    for (let city = 0; city < n; city++) {
      if ((mask & (1 << city)) === 0) { // Not visited
        const newAns = distances[pos][city] + solve(mask | (1 << city), city);
        ans = Math.min(ans, newAns);
      }
    }
    
    return dp[pos][mask] = ans;
  }
  
  return solve(1, 0); // Start from city 0, mask = 1 (visited city 0)
}

// ============================================
// TREE DP
// ============================================

// House Robber III (Binary Tree)
function robTree(root) {
  function dfs(node) {
    if (!node) return [0, 0]; // [rob, notRob]
    
    const left = dfs(node.left);
    const right = dfs(node.right);
    
    // Rob current: can't rob children
    const rob = node.val + left[1] + right[1];
    
    // Don't rob current: can rob or not rob children
    const notRob = Math.max(left[0], left[1]) + Math.max(right[0], right[1]);
    
    return [rob, notRob];
  }
  
  const [rob, notRob] = dfs(root);
  return Math.max(rob, notRob);
}

// ============================================
// INTERVAL DP
// ============================================

// Burst Balloons
function maxCoins(nums) {
  const n = nums.length;
  const balloons = [1, ...nums, 1];
  const dp = Array(n + 2).fill(null).map(() => Array(n + 2).fill(0));
  
  // Length of interval
  for (let len = 1; len <= n; len++) {
    for (let left = 1; left <= n - len + 1; left++) {
      const right = left + len - 1;
      
      for (let k = left; k <= right; k++) {
        // Burst k last in interval [left, right]
        const coins = balloons[left - 1] * balloons[k] * balloons[right + 1] +
                     dp[left][k - 1] + dp[k + 1][right];
        dp[left][right] = Math.max(dp[left][right], coins);
      }
    }
  }
  
  return dp[1][n];
}
```

---

## E) Internal Working

**State Machine:**
- Multiple states
- Transitions between states
- Track current state
- Optimize transitions

**3D DP:**
- Three dimensions
- Complex state
- Higher space complexity
- Careful indexing

---

## F) Interview Questions & Answers

### Q1: How do you solve stock problems with DP?

**Answer:**
Stock problems use state machine DP. States: Hold (have stock), Sold (no stock), sometimes Cooldown. Transitions: Hold -> Sold (sell), Sold -> Hold (buy), Hold -> Hold (keep), Sold -> Sold (wait). Track profit in each state. Recurrence: newHold = max(hold, sold - price), newSold = max(sold, hold + price). Time O(n), Space O(1) optimized.

### Q2: What is bitmask DP?

**Answer:**
Bitmask DP uses bits to represent state (visited/unvisited, selected/not selected). Each bit represents one element. Benefits: Compact state representation, fast operations (bitwise). Use for: TSP (visited cities), subset problems, state compression. Example: mask = 1011 means elements 0, 1, 3 selected. Time often exponential but practical for small sets.

### Q3: How does tree DP work?

**Answer:**
Tree DP: For each node, compute values for different choices (rob/not rob, include/exclude). Return multiple values from each subtree. Combine child results to get parent result. Often return [value1, value2] for two choices. Process bottom-up (postorder). Use for: Tree problems, decisions at each node.

---

## G) Common Mistakes

### Mistake 1: Wrong State Transitions

```javascript
// ❌ WRONG - Incorrect transition
newHold = Math.max(hold, sold); // Missing price

// ✅ CORRECT - Proper transition
newHold = Math.max(hold, sold - prices[i]); // Buy
```

**Why it breaks:** Incorrect state transitions give wrong results.

---

## H) When to Use & When NOT to Use

Use advanced DP for complex state problems, multiple constraints, optimization. Don't use when simpler DP or greedy sufficient.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain Advanced DP."

**You:**
"Advanced DP handles complex scenarios: State machine DP (multiple states - stock problems), 3D DP (three dimensions), Bitmask DP (bits represent state - TSP), Tree DP (decisions at nodes), Interval DP (ranges).

Key: Define states carefully, find correct transitions, optimize space when possible. State machines for problems with multiple states, bitmasks for subset/visited problems, tree DP for tree decisions."

---

## J) Mini Practice Task

Solve: Stock problems (state machine), TSP (bitmask), tree DP problems, interval DP problems.

---

**END OF TOPIC: ADVANCED DP PROBLEMS**

