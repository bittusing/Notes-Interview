# GREEDY ALGORITHMS FUNDAMENTALS

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Greedy Algorithm kya hai?**
- Greedy Algorithm har step par locally optimal choice karta hai
- Global optimum ki guarantee nahi hoti
- "Best at the moment" approach
- Simple aur fast
- Some problems mein optimal solution deta hai

**Real-life Analogy:**
- Greedy = Short-term thinking
- Har step par best choice
- Future consequences nahi dekhte
- Sometimes works, sometimes doesn't

**Greedy Properties:**
- **Greedy Choice Property:** Locally optimal choice leads to global optimum
- **Optimal Substructure:** Optimal solution contains optimal subproblems
- **No Backtracking:** Once choice made, don't reconsider

**When Greedy Works:**
- Activity Selection
- Fractional Knapsack
- Minimum Spanning Tree
- Shortest Path (Dijkstra's)
- Huffman Coding

---

## B) Easy English Theory

### What is Greedy Algorithm?

Greedy Algorithm makes locally optimal choice at each step, hoping it leads to global optimum. Properties: Greedy choice property (locally optimal leads to global), optimal substructure. No guarantee of global optimum, but works for specific problems. Simple and fast. Use when greedy choice property holds.

---

## C) Why This Concept Exists

### The Problem

**Without Greedy:**
- Complex solutions
- Slow algorithms
- Over-engineering
- Unnecessary complexity

### The Solution

**Greedy Provides:**
1. **Simplicity:** Simple approach
2. **Speed:** Fast algorithms
3. **Efficiency:** Often optimal
4. **Practical:** Real-world use

---

## D) Practical Example (Code)

```javascript
// ============================================
// ACTIVITY SELECTION PROBLEM
// ============================================

// Problem: Select maximum activities that don't overlap
// Greedy: Always pick activity with earliest finish time

function activitySelection(activities) {
  // Sort by finish time
  activities.sort((a, b) => a.finish - b.finish);
  
  const selected = [activities[0]];
  let lastFinish = activities[0].finish;
  
  for (let i = 1; i < activities.length; i++) {
    if (activities[i].start >= lastFinish) {
      selected.push(activities[i]);
      lastFinish = activities[i].finish;
    }
  }
  
  return selected;
}

// Time: O(n log n), Space: O(1)

// ============================================
// FRACTIONAL KNAPSACK
// ============================================

// Problem: Items with weight and value, can take fractions
// Maximize value

function fractionalKnapsack(weights, values, capacity) {
  const items = weights.map((w, i) => ({
    weight: w,
    value: values[i],
    ratio: values[i] / w
  }));
  
  // Sort by value/weight ratio (descending)
  items.sort((a, b) => b.ratio - a.ratio);
  
  let totalValue = 0;
  let remaining = capacity;
  
  for (let item of items) {
    if (remaining >= item.weight) {
      // Take whole item
      totalValue += item.value;
      remaining -= item.weight;
    } else {
      // Take fraction
      totalValue += item.ratio * remaining;
      break;
    }
  }
  
  return totalValue;
}

// Time: O(n log n), Space: O(1)

// ============================================
// MINIMUM COINS (GREEDY - WHEN WORKS)
// ============================================

// Works when coin system is "canonical"
// Example: [1, 5, 10, 25] - US coins

function minCoinsGreedy(coins, amount) {
  coins.sort((a, b) => b - a); // Descending
  
  let count = 0;
  let remaining = amount;
  
  for (let coin of coins) {
    if (remaining >= coin) {
      const numCoins = Math.floor(remaining / coin);
      count += numCoins;
      remaining -= numCoins * coin;
    }
  }
  
  return remaining === 0 ? count : -1;
}

// Note: Doesn't work for all coin systems!
// Example: coins = [1, 3, 4], amount = 6
// Greedy: 4 + 1 + 1 = 3 coins
// Optimal: 3 + 3 = 2 coins

// ============================================
// INTERVAL SCHEDULING
// ============================================

// Maximum non-overlapping intervals
function maxIntervals(intervals) {
  intervals.sort((a, b) => a[1] - b[1]); // Sort by end time
  
  let count = 1;
  let lastEnd = intervals[0][1];
  
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] >= lastEnd) {
      count++;
      lastEnd = intervals[i][1];
    }
  }
  
  return count;
}

// ============================================
// HUFFMAN CODING
// ============================================

class HuffmanNode {
  constructor(char, freq, left = null, right = null) {
    this.char = char;
    this.freq = freq;
    this.left = left;
    this.right = right;
  }
}

function buildHuffmanTree(characters, frequencies) {
  const nodes = characters.map((char, i) => 
    new HuffmanNode(char, frequencies[i])
  );
  
  // Build tree using priority queue (min heap)
  while (nodes.length > 1) {
    // Sort by frequency
    nodes.sort((a, b) => a.freq - b.freq);
    
    const left = nodes.shift();
    const right = nodes.shift();
    
    const merged = new HuffmanNode(null, left.freq + right.freq, left, right);
    nodes.push(merged);
  }
  
  return nodes[0];
}

// ============================================
// JOB SEQUENCING WITH DEADLINES
// ============================================

// Problem: Jobs with profit and deadline
// Maximize profit, each job takes 1 unit time

function jobSequencing(jobs) {
  // Sort by profit (descending)
  jobs.sort((a, b) => b.profit - a.profit);
  
  const maxDeadline = Math.max(...jobs.map(j => j.deadline));
  const schedule = Array(maxDeadline + 1).fill(null);
  let totalProfit = 0;
  
  for (let job of jobs) {
    // Find latest available slot before deadline
    for (let i = job.deadline; i > 0; i--) {
      if (!schedule[i]) {
        schedule[i] = job;
        totalProfit += job.profit;
        break;
      }
    }
  }
  
  return { schedule: schedule.filter(j => j !== null), totalProfit };
}

// ============================================
// MINIMUM PLATFORMS
// ============================================

// Problem: Trains with arrival and departure times
// Minimum platforms needed

function minPlatforms(arrivals, departures) {
  arrivals.sort((a, b) => a - b);
  departures.sort((a, b) => a - b);
  
  let platforms = 0;
  let maxPlatforms = 0;
  let i = 0, j = 0;
  
  while (i < arrivals.length && j < departures.length) {
    if (arrivals[i] <= departures[j]) {
      platforms++;
      i++;
      maxPlatforms = Math.max(maxPlatforms, platforms);
    } else {
      platforms--;
      j++;
    }
  }
  
  return maxPlatforms;
}

// ============================================
// GAS STATION
// ============================================

// Problem: Can complete circular route?
// Greedy: Start from station where we can accumulate most gas

function canCompleteCircuit(gas, cost) {
  let totalGas = 0;
  let totalCost = 0;
  let currentGas = 0;
  let start = 0;
  
  for (let i = 0; i < gas.length; i++) {
    totalGas += gas[i];
    totalCost += cost[i];
    currentGas += gas[i] - cost[i];
    
    // If can't reach next station, start from next
    if (currentGas < 0) {
      start = i + 1;
      currentGas = 0;
    }
  }
  
  return totalGas >= totalCost ? start : -1;
}

// ============================================
// PARTITION LABELS
// ============================================

// Problem: Partition string so each letter appears in at most one part

function partitionLabels(s) {
  const lastIndex = {};
  
  // Store last occurrence of each character
  for (let i = 0; i < s.length; i++) {
    lastIndex[s[i]] = i;
  }
  
  const partitions = [];
  let start = 0;
  let end = 0;
  
  for (let i = 0; i < s.length; i++) {
    end = Math.max(end, lastIndex[s[i]]);
    
    if (i === end) {
      partitions.push(end - start + 1);
      start = end + 1;
    }
  }
  
  return partitions;
}
```

---

## E) Internal Working

**Greedy Process:**
1. Make greedy choice
2. Reduce problem size
3. Repeat until solved
4. No backtracking

**Key:**
- Prove greedy choice property
- Verify optimal substructure
- Sometimes need proof

---

## F) Interview Questions & Answers

### Q1: What is Greedy Algorithm and when does it work?

**Answer:**
Greedy makes locally optimal choice at each step. Works when: Greedy choice property (locally optimal leads to global), optimal substructure (optimal solution contains optimal subproblems). Examples: Activity selection (earliest finish), fractional knapsack (highest ratio), MST (minimum edge). Doesn't always work - need to verify properties.

### Q2: How do you prove a greedy algorithm is correct?

**Answer:**
Prove correctness: Show greedy choice property (locally optimal choice is part of optimal solution - exchange argument), show optimal substructure (optimal solution contains optimal solutions to subproblems), use mathematical induction or contradiction. Exchange argument: Show can replace any choice in optimal solution with greedy choice without worsening.

### Q3: What's the difference between Greedy and Dynamic Programming?

**Answer:**
Greedy: Makes choice and never reconsider, no overlapping subproblems, faster O(n log n) often, may not be optimal. DP: Considers all possibilities, overlapping subproblems, memoization/tabulation, guarantees optimal if properties hold, slower. Greedy for optimization when properties hold, DP when need to consider all possibilities.

---

## G) Common Mistakes

### Mistake 1: Assuming Greedy Always Works

```javascript
// ❌ WRONG - Greedy doesn't work for 0/1 knapsack
// Always pick highest value/weight ratio
// Doesn't guarantee optimal

// ✅ CORRECT - Use DP for 0/1 knapsack
// Consider all possibilities
```

**Why it breaks:** Greedy doesn't work for all problems, need to verify.

---

## H) When to Use & When NOT to Use

Use Greedy when greedy choice property holds, need fast solution, problem has optimal substructure. Don't use when need guaranteed optimal (use DP) or when greedy doesn't work.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain Greedy Algorithms."

**You:**
"Greedy makes locally optimal choice at each step. Works when: Greedy choice property (local optimal leads to global), optimal substructure. Examples: Activity selection (earliest finish), fractional knapsack (highest ratio), MST.

No guarantee of global optimum, but works for specific problems. Simple and fast. Difference from DP: Greedy makes choice and never reconsider, DP considers all possibilities. Verify properties before using greedy."

---

## J) Mini Practice Task

Solve: Activity selection, fractional knapsack, interval scheduling, job sequencing, minimum platforms, gas station, partition labels.

---

**END OF TOPIC: GREEDY ALGORITHMS FUNDAMENTALS**

