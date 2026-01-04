# BFS & DFS

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**BFS (Breadth-First Search) kya hai?**
- BFS level-by-level traverse karta hai
- Queue use karta hai
- Pehle same level ke nodes visit karte hain
- Phir next level
- Shortest path find karne ke liye perfect

**DFS (Depth-First Search) kya hai?**
- DFS depth mein jata hai
- Stack use karta hai (recursion)
- Ek path ko end tak follow karta hai
- Phir backtrack karke next path
- Memory efficient

**Real-life Analogy:**
- BFS = Level-order (sabse pehle same level)
- DFS = Maze solving (ek path ko end tak)
- Queue = BFS ke liye
- Stack = DFS ke liye

**BFS vs DFS:**
- **BFS:** Level-by-level, shortest path
- **DFS:** Deep first, memory efficient
- **BFS:** Queue, O(V + E) time
- **DFS:** Stack/Recursion, O(V + E) time

---

## B) Easy English Theory

### What are BFS and DFS?

BFS (Breadth-First Search) traverses level-by-level using queue. Visits all nodes at same level before next level. Use for: Shortest path (unweighted), level-order traversal, minimum steps. DFS (Depth-First Search) goes deep first using stack/recursion. Follows path to end, then backtracks. Use for: Path finding, cycle detection, topological sort. Both O(V + E) time.

---

## C) Why This Concept Exists

### The Problem

**Without BFS/DFS:**
- Can't traverse graphs
- No path finding
- Difficult graph exploration
- Limited graph algorithms

### The Solution

**BFS/DFS Provide:**
1. **Traversal:** Explore all nodes
2. **Path Finding:** Find paths
3. **Algorithms:** Base for many algorithms
4. **Flexibility:** Different use cases

---

## D) Practical Example (Code)

```javascript
// ============================================
// BFS IMPLEMENTATION
// ============================================

class Graph {
  constructor() {
    this.adjacencyList = {};
  }
  
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }
  }
  
  addEdge(vertex1, vertex2) {
    this.addVertex(vertex1);
    this.addVertex(vertex2);
    this.adjacencyList[vertex1].push(vertex2);
    this.adjacencyList[vertex2].push(vertex1);
  }
  
  // BFS - Iterative
  bfs(start) {
    const queue = [start];
    const visited = new Set([start]);
    const result = [];
    
    while (queue.length > 0) {
      const vertex = queue.shift(); // Dequeue
      result.push(vertex);
      
      // Visit neighbors
      for (let neighbor of this.adjacencyList[vertex] || []) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor); // Enqueue
        }
      }
    }
    
    return result;
  }
  
  // BFS with levels
  bfsWithLevels(start) {
    const queue = [start];
    const visited = new Set([start]);
    const levels = [];
    
    while (queue.length > 0) {
      const levelSize = queue.length;
      const level = [];
      
      for (let i = 0; i < levelSize; i++) {
        const vertex = queue.shift();
        level.push(vertex);
        
        for (let neighbor of this.adjacencyList[vertex] || []) {
          if (!visited.has(neighbor)) {
            visited.add(neighbor);
            queue.push(neighbor);
          }
        }
      }
      
      levels.push(level);
    }
    
    return levels;
  }
  
  // Shortest path (BFS)
  shortestPath(start, end) {
    const queue = [[start, [start]]]; // [vertex, path]
    const visited = new Set([start]);
    
    while (queue.length > 0) {
      const [vertex, path] = queue.shift();
      
      if (vertex === end) {
        return path; // Found shortest path
      }
      
      for (let neighbor of this.adjacencyList[vertex] || []) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push([neighbor, [...path, neighbor]]);
        }
      }
    }
    
    return null; // No path found
  }
  
  // ============================================
  // DFS IMPLEMENTATION
  // ============================================
  
  // DFS - Recursive
  dfsRecursive(start) {
    const result = [];
    const visited = new Set();
    
    const dfs = (vertex) => {
      if (!vertex) return;
      
      visited.add(vertex);
      result.push(vertex);
      
      for (let neighbor of this.adjacencyList[vertex] || []) {
        if (!visited.has(neighbor)) {
          dfs(neighbor);
        }
      }
    };
    
    dfs(start);
    return result;
  }
  
  // DFS - Iterative
  dfsIterative(start) {
    const stack = [start];
    const visited = new Set();
    const result = [];
    
    while (stack.length > 0) {
      const vertex = stack.pop();
      
      if (!visited.has(vertex)) {
        visited.add(vertex);
        result.push(vertex);
        
        // Push neighbors (reverse order for same result as recursive)
        for (let i = this.adjacencyList[vertex].length - 1; i >= 0; i--) {
          const neighbor = this.adjacencyList[vertex][i];
          if (!visited.has(neighbor)) {
            stack.push(neighbor);
          }
        }
      }
    }
    
    return result;
  }
  
  // DFS - All paths
  findAllPaths(start, end) {
    const paths = [];
    const visited = new Set();
    
    const dfs = (vertex, path) => {
      if (vertex === end) {
        paths.push([...path]);
        return;
      }
      
      visited.add(vertex);
      
      for (let neighbor of this.adjacencyList[vertex] || []) {
        if (!visited.has(neighbor)) {
          dfs(neighbor, [...path, neighbor]);
        }
      }
      
      visited.delete(vertex); // Backtrack
    };
    
    dfs(start, [start]);
    return paths;
  }
  
  // ============================================
  // CYCLE DETECTION
  // ============================================
  
  // Detect cycle (DFS)
  hasCycle() {
    const visited = new Set();
    const recStack = new Set(); // Recursion stack
    
    const hasCycleDFS = (vertex, parent) => {
      visited.add(vertex);
      recStack.add(vertex);
      
      for (let neighbor of this.adjacencyList[vertex] || []) {
        if (!visited.has(neighbor)) {
          if (hasCycleDFS(neighbor, vertex)) {
            return true;
          }
        } else if (neighbor !== parent) {
          // Back edge found (cycle)
          return true;
        }
      }
      
      recStack.delete(vertex);
      return false;
    };
    
    for (let vertex in this.adjacencyList) {
      if (!visited.has(vertex)) {
        if (hasCycleDFS(vertex, null)) {
          return true;
        }
      }
    }
    
    return false;
  }
  
  // ============================================
  // CONNECTED COMPONENTS
  // ============================================
  
  // Count connected components (DFS)
  countConnectedComponents() {
    const visited = new Set();
    let count = 0;
    
    const dfs = (vertex) => {
      visited.add(vertex);
      
      for (let neighbor of this.adjacencyList[vertex] || []) {
        if (!visited.has(neighbor)) {
          dfs(neighbor);
        }
      }
    };
    
    for (let vertex in this.adjacencyList) {
      if (!visited.has(vertex)) {
        dfs(vertex);
        count++;
      }
    }
    
    return count;
  }
  
  // ============================================
  // TOPOLOGICAL SORT (DFS)
  // ============================================
  
  topologicalSort() {
    const visited = new Set();
    const stack = [];
    
    const dfs = (vertex) => {
      visited.add(vertex);
      
      for (let neighbor of this.adjacencyList[vertex] || []) {
        if (!visited.has(neighbor)) {
          dfs(neighbor);
        }
      }
      
      stack.push(vertex); // Push after processing all neighbors
    };
    
    for (let vertex in this.adjacencyList) {
      if (!visited.has(vertex)) {
        dfs(vertex);
      }
    }
    
    return stack.reverse(); // Reverse to get correct order
  }
}

// ============================================
// COMMON PROBLEMS
// ============================================

// 1. Number of islands (DFS)
function numIslands(grid) {
  if (!grid || grid.length === 0) return 0;
  
  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;
  
  function dfs(row, col) {
    if (row < 0 || row >= rows || col < 0 || col >= cols || grid[row][col] === '0') {
      return;
    }
    
    grid[row][col] = '0'; // Mark as visited
    
    // Explore neighbors
    dfs(row - 1, col);
    dfs(row + 1, col);
    dfs(row, col - 1);
    dfs(row, col + 1);
  }
  
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === '1') {
        count++;
        dfs(i, j);
      }
    }
  }
  
  return count;
}

// 2. Clone graph (BFS)
function cloneGraph(node) {
  if (!node) return null;
  
  const map = new Map();
  const queue = [node];
  map.set(node, new Node(node.val));
  
  while (queue.length > 0) {
    const current = queue.shift();
    
    for (let neighbor of current.neighbors) {
      if (!map.has(neighbor)) {
        map.set(neighbor, new Node(neighbor.val));
        queue.push(neighbor);
      }
      map.get(current).neighbors.push(map.get(neighbor));
    }
  }
  
  return map.get(node);
}

// 3. Word ladder (BFS)
function ladderLength(beginWord, endWord, wordList) {
  const wordSet = new Set(wordList);
  if (!wordSet.has(endWord)) return 0;
  
  const queue = [[beginWord, 1]];
  const visited = new Set([beginWord]);
  
  while (queue.length > 0) {
    const [word, length] = queue.shift();
    
    if (word === endWord) {
      return length;
    }
    
    // Generate all possible transformations
    for (let i = 0; i < word.length; i++) {
      for (let c = 'a'.charCodeAt(0); c <= 'z'.charCodeAt(0); c++) {
        const newWord = word.slice(0, i) + String.fromCharCode(c) + word.slice(i + 1);
        
        if (wordSet.has(newWord) && !visited.has(newWord)) {
          visited.add(newWord);
          queue.push([newWord, length + 1]);
        }
      }
    }
  }
  
  return 0;
}
```

---

## E) Internal Working

**BFS:**
- Queue-based
- Level-by-level
- Visited set
- Shortest path guarantee

**DFS:**
- Stack-based (recursive/iterative)
- Deep first
- Backtracking
- Memory efficient

---

## F) Interview Questions & Answers

### Q1: What is the difference between BFS and DFS?

**Answer:**
BFS (Breadth-First Search): Level-by-level using queue, visits all nodes at same level before next, finds shortest path (unweighted), uses more memory (queue stores all nodes at level). DFS (Depth-First Search): Deep first using stack/recursion, follows path to end then backtracks, memory efficient, good for path finding. Both O(V + E) time. Choose BFS for shortest path, DFS for memory efficiency or path exploration.

### Q2: When would you use BFS vs DFS?

**Answer:**
Use BFS for: Shortest path (unweighted), level-order traversal, minimum steps problems, when need level information. Use DFS for: Path finding (all paths), cycle detection, topological sort, connected components, when memory is concern, maze solving. BFS guarantees shortest path, DFS more memory efficient.

### Q3: How do you detect cycles in a graph?

**Answer:**
Cycle detection: For undirected graph - use DFS, track parent, if visited neighbor found (not parent) = cycle. For directed graph - use DFS with recursion stack, if node in recursion stack = back edge = cycle. Union-Find also works for undirected. Time O(V + E) for DFS approach.

---

## G) Common Mistakes

### Mistake 1: Not Marking Visited

```javascript
// ❌ WRONG - Infinite loop
while (queue.length > 0) {
  const vertex = queue.shift();
  queue.push(...neighbors); // Never marks visited
}

// ✅ CORRECT - Mark visited
visited.add(vertex);
if (!visited.has(neighbor)) {
  visited.add(neighbor);
  queue.push(neighbor);
}
```

**Why it breaks:** Infinite loop, revisits nodes.

---

## H) When to Use & When NOT to Use

Use BFS for shortest path, level-order. Use DFS for path exploration, cycle detection, memory efficiency. Don't use BFS when memory is critical, don't use DFS when need shortest path.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain BFS and DFS."

**You:**
"BFS traverses level-by-level using queue - visits all nodes at same level before next, finds shortest path (unweighted), uses more memory. DFS goes deep first using stack/recursion - follows path to end then backtracks, memory efficient, good for path exploration.

Both O(V + E) time. Use BFS for shortest path, level-order. Use DFS for path finding, cycle detection, memory efficiency. BFS guarantees shortest path, DFS more memory efficient."

---

## J) Mini Practice Task

Implement: BFS, DFS (recursive and iterative), shortest path, cycle detection, connected components, number of islands, clone graph.

---

**END OF TOPIC: BFS & DFS**

