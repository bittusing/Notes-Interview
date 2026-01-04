# BACKTRACKING FUNDAMENTALS

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Backtracking kya hai?**
- Backtracking trial-and-error approach hai
- Try karo, agar work nahi kare to undo karo
- Systematic exploration
- All possibilities explore karta hai
- Constraint satisfaction problems ke liye perfect

**Real-life Analogy:**
- Backtracking = Maze solving
- Try path, agar dead end to go back
- Try next path
- Systematic exploration
- Solution milne tak try karte raho

**Backtracking Process:**
1. Make choice
2. Explore further
3. If solution found → return
4. If dead end → backtrack (undo)
5. Try next choice

**Backtracking vs Brute Force:**
- **Brute Force:** Try all combinations
- **Backtracking:** Prune invalid paths early
- **Efficiency:** Backtracking faster (pruning)

---

## B) Easy English Theory

### What is Backtracking?

Backtracking is systematic trial-and-error approach. Make choice, explore, if dead end backtrack (undo) and try next. Prunes invalid paths early (more efficient than brute force). Use for: Constraint satisfaction, permutations, combinations, N-Queens, Sudoku. Template: Make choice, recurse, backtrack if needed.

---

## C) Why This Concept Exists

### The Problem

**Without Backtracking:**
- Brute force (try everything)
- Inefficient
- No early pruning
- Time consuming

### The Solution

**Backtracking Provides:**
1. **Efficiency:** Prune early
2. **Systematic:** Explore all possibilities
3. **Flexibility:** Handle constraints
4. **Completeness:** Find all solutions

---

## D) Practical Example (Code)

```javascript
// ============================================
// BACKTRACKING TEMPLATE
// ============================================

function backtrackTemplate(problem) {
  const result = [];
  
  function backtrack(currentSolution, remainingOptions) {
    // Base case: solution found
    if (isSolution(currentSolution)) {
      result.push([...currentSolution]);
      return;
    }
    
    // Try each option
    for (let option of remainingOptions) {
      // Make choice
      if (isValid(currentSolution, option)) {
        currentSolution.push(option);
        
        // Recurse
        backtrack(currentSolution, getNextOptions(option));
        
        // Backtrack (undo)
        currentSolution.pop();
      }
    }
  }
  
  backtrack([], getInitialOptions());
  return result;
}

// ============================================
// PERMUTATIONS
// ============================================

function permutations(nums) {
  const result = [];
  
  function backtrack(current) {
    // Base case: all elements used
    if (current.length === nums.length) {
      result.push([...current]);
      return;
    }
    
    for (let num of nums) {
      // Skip if already used
      if (current.includes(num)) continue;
      
      // Make choice
      current.push(num);
      
      // Recurse
      backtrack(current);
      
      // Backtrack
      current.pop();
    }
  }
  
  backtrack([]);
  return result;
}

// Optimized (using visited array)
function permutationsOptimized(nums) {
  const result = [];
  const visited = Array(nums.length).fill(false);
  
  function backtrack(current) {
    if (current.length === nums.length) {
      result.push([...current]);
      return;
    }
    
    for (let i = 0; i < nums.length; i++) {
      if (visited[i]) continue;
      
      visited[i] = true;
      current.push(nums[i]);
      backtrack(current);
      current.pop();
      visited[i] = false;
    }
  }
  
  backtrack([]);
  return result;
}

// ============================================
// COMBINATIONS
// ============================================

// Generate all combinations of k elements from n
function combinations(n, k) {
  const result = [];
  
  function backtrack(start, current) {
    // Base case: k elements chosen
    if (current.length === k) {
      result.push([...current]);
      return;
    }
    
    // Try each number from start to n
    for (let i = start; i <= n; i++) {
      current.push(i);
      backtrack(i + 1, current); // Next start is i+1
      current.pop();
    }
  }
  
  backtrack(1, []);
  return result;
}

// ============================================
// SUBSETS
// ============================================

function subsets(nums) {
  const result = [];
  
  function backtrack(start, current) {
    // Add current subset
    result.push([...current]);
    
    // Try adding each remaining element
    for (let i = start; i < nums.length; i++) {
      current.push(nums[i]);
      backtrack(i + 1, current);
      current.pop();
    }
  }
  
  backtrack(0, []);
  return result;
}

// ============================================
// N-QUEENS PROBLEM
// ============================================

function solveNQueens(n) {
  const result = [];
  const board = Array(n).fill(null).map(() => Array(n).fill('.'));
  
  function isValid(row, col) {
    // Check column
    for (let i = 0; i < row; i++) {
      if (board[i][col] === 'Q') return false;
    }
    
    // Check diagonal (top-left to bottom-right)
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === 'Q') return false;
    }
    
    // Check diagonal (top-right to bottom-left)
    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
      if (board[i][j] === 'Q') return false;
    }
    
    return true;
  }
  
  function backtrack(row) {
    // Base case: all rows placed
    if (row === n) {
      result.push(board.map(r => r.join('')));
      return;
    }
    
    // Try each column in current row
    for (let col = 0; col < n; col++) {
      if (isValid(row, col)) {
        // Place queen
        board[row][col] = 'Q';
        
        // Recurse
        backtrack(row + 1);
        
        // Backtrack
        board[row][col] = '.';
      }
    }
  }
  
  backtrack(0);
  return result;
}

// ============================================
// SUDOKU SOLVER
// ============================================

function solveSudoku(board) {
  function isValid(row, col, num) {
    // Check row
    for (let j = 0; j < 9; j++) {
      if (board[row][j] === num) return false;
    }
    
    // Check column
    for (let i = 0; i < 9; i++) {
      if (board[i][col] === num) return false;
    }
    
    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = boxRow; i < boxRow + 3; i++) {
      for (let j = boxCol; j < boxCol + 3; j++) {
        if (board[i][j] === num) return false;
      }
    }
    
    return true;
  }
  
  function solve() {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === '.') {
          // Try each number
          for (let num = '1'; num <= '9'; num++) {
            if (isValid(i, j, num)) {
              board[i][j] = num;
              
              if (solve()) {
                return true; // Solution found
              }
              
              // Backtrack
              board[i][j] = '.';
            }
          }
          return false; // No valid number
        }
      }
    }
    return true; // All filled
  }
  
  solve();
  return board;
}

// ============================================
// WORD SEARCH
// ============================================

function exist(board, word) {
  const rows = board.length;
  const cols = board[0].length;
  
  function backtrack(row, col, index) {
    // Base case: word found
    if (index === word.length) {
      return true;
    }
    
    // Out of bounds or doesn't match
    if (row < 0 || row >= rows || col < 0 || col >= cols || 
        board[row][col] !== word[index]) {
      return false;
    }
    
    // Mark as visited
    const temp = board[row][col];
    board[row][col] = '#';
    
    // Explore neighbors
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    for (let [dr, dc] of directions) {
      if (backtrack(row + dr, col + dc, index + 1)) {
        return true;
      }
    }
    
    // Backtrack
    board[row][col] = temp;
    return false;
  }
  
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (backtrack(i, j, 0)) {
        return true;
      }
    }
  }
  
  return false;
}

// ============================================
// GENERATE PARENTHESES
// ============================================

function generateParenthesis(n) {
  const result = [];
  
  function backtrack(current, open, close) {
    // Base case: valid combination
    if (current.length === 2 * n) {
      result.push(current);
      return;
    }
    
    // Add opening parenthesis
    if (open < n) {
      backtrack(current + '(', open + 1, close);
    }
    
    // Add closing parenthesis (only if more open than close)
    if (close < open) {
      backtrack(current + ')', open, close + 1);
    }
  }
  
  backtrack('', 0, 0);
  return result;
}

// ============================================
// COMBINATION SUM
// ============================================

// Find all combinations that sum to target
// Can use same number multiple times

function combinationSum(candidates, target) {
  const result = [];
  
  function backtrack(start, current, sum) {
    // Base case: found target
    if (sum === target) {
      result.push([...current]);
      return;
    }
    
    // Base case: exceeded target
    if (sum > target) {
      return;
    }
    
    // Try each candidate from start
    for (let i = start; i < candidates.length; i++) {
      current.push(candidates[i]);
      backtrack(i, current, sum + candidates[i]); // Can reuse
      current.pop();
    }
  }
  
  backtrack(0, [], 0);
  return result;
}

// ============================================
// PALINDROME PARTITIONING
// ============================================

function partition(s) {
  const result = [];
  
  function isPalindrome(str) {
    let left = 0;
    let right = str.length - 1;
    while (left < right) {
      if (str[left] !== str[right]) return false;
      left++;
      right--;
    }
    return true;
  }
  
  function backtrack(start, current) {
    // Base case: partitioned entire string
    if (start === s.length) {
      result.push([...current]);
      return;
    }
    
    // Try each possible partition
    for (let end = start; end < s.length; end++) {
      const substring = s.substring(start, end + 1);
      if (isPalindrome(substring)) {
        current.push(substring);
        backtrack(end + 1, current);
        current.pop();
      }
    }
  }
  
  backtrack(0, []);
  return result;
}
```

---

## E) Internal Working

**Backtracking Flow:**
1. Make choice
2. Check if valid
3. Recurse
4. If solution → return
5. If dead end → backtrack
6. Try next choice

**Pruning:**
- Early termination
- Invalid path detection
- Constraint checking

---

## F) Interview Questions & Answers

### Q1: What is Backtracking and how does it work?

**Answer:**
Backtracking is systematic trial-and-error: Make choice, explore, if dead end backtrack (undo) and try next. Process: Make choice, recurse, if solution found return, if invalid backtrack, try next. More efficient than brute force (prunes invalid paths early). Use for: Permutations, combinations, constraint satisfaction (N-Queens, Sudoku).

### Q2: What's the difference between Backtracking and DFS?

**Answer:**
DFS: Traverses graph/tree, visits all nodes, no constraint checking, simpler. Backtracking: Systematic exploration with constraints, prunes invalid paths, undoes choices, more complex. Backtracking is DFS with constraint checking and undo mechanism. Backtracking used for constraint satisfaction, DFS for traversal.

### Q3: How do you optimize Backtracking?

**Answer:**
Optimize: Prune early (check constraints before recursing), use memoization (cache results), order choices (try most constrained first), use heuristics (good ordering), detect symmetries (avoid duplicate work). Early pruning most important - check validity before recursing, not after.

---

## G) Common Mistakes

### Mistake 1: Not Backtracking

```javascript
// ❌ WRONG - No undo
function backtrack(current) {
  current.push(option);
  backtrack(current);
  // Missing: current.pop()
}

// ✅ CORRECT - Undo choice
function backtrack(current) {
  current.push(option);
  backtrack(current);
  current.pop(); // Backtrack
}
```

**Why it breaks:** Choices accumulate, wrong results.

---

## H) When to Use & When NOT to Use

Use Backtracking for permutations, combinations, constraint satisfaction, when need all solutions. Don't use when greedy/DP works or when only need one solution (use DFS).

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain Backtracking."

**You:**
"Backtracking is systematic trial-and-error: Make choice, explore, if dead end backtrack (undo) and try next. More efficient than brute force (prunes invalid paths early).

Template: Make choice, recurse, if solution return, if invalid backtrack, try next. Use for: Permutations, combinations, N-Queens, Sudoku, constraint satisfaction. Key: Always undo choice after recursion (backtrack)."

---

## J) Mini Practice Task

Solve: Permutations, combinations, subsets, N-Queens, Sudoku, word search, generate parentheses, combination sum, palindrome partitioning.

---

**END OF TOPIC: BACKTRACKING FUNDAMENTALS**

