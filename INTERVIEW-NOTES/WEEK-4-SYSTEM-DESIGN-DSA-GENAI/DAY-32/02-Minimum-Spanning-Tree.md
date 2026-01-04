# MINIMUM SPANNING TREE (MST)

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Minimum Spanning Tree (MST) kya hai?**
- MST graph ka subset hai jo sab vertices ko connect karta hai
- Minimum total weight ke saath
- No cycles (tree property)
- All vertices connected
- Two main algorithms

**Real-life Analogy:**
- MST = Minimum cost network
- Vertices = Cities
- Edges = Roads
- Weight = Road cost
- Goal = Connect all cities with minimum cost

**MST Algorithms:**
- **Kruskal's:** Sort edges, add if no cycle
- **Prim's:** Start from vertex, add minimum edge
- Both give same result
- Different approaches

**MST Properties:**
- Connects all vertices
- No cycles
- Minimum total weight
- V-1 edges (for V vertices)

---

## B) Easy English Theory

### What is Minimum Spanning Tree?

Minimum Spanning Tree (MST) is subset of graph edges that connects all vertices with minimum total weight, no cycles (tree property). Algorithms: Kruskal's (sort edges, add if no cycle - O(E log E)), Prim's (grow from vertex, add minimum edge - O(E log V)). Both produce same MST. Use for: Network design, clustering, approximation algorithms.

---

## C) Why This Concept Exists

### The Problem

**Without MST:**
- No optimal network design
- Inefficient connections
- High costs
- No systematic approach

### The Solution

**MST Provides:**
1. **Optimal Connection:** Minimum cost
2. **Efficiency:** Systematic algorithm
3. **Applications:** Network design
4. **Guarantee:** Optimal solution

---

## D) Practical Example (Code)

```javascript
// ============================================
// UNION-FIND (FOR KRUSKAL'S)
// ============================================

class UnionFind {
  constructor(size) {
    this.parent = Array(size).fill(null).map((_, i) => i);
    this.rank = Array(size).fill(0);
  }
  
  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]); // Path compression
    }
    return this.parent[x];
  }
  
  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);
    
    if (rootX === rootY) {
      return false; // Already connected
    }
    
    // Union by rank
    if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY;
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
    } else {
      this.parent[rootY] = rootX;
      this.rank[rootX]++;
    }
    
    return true; // Successfully connected
  }
}

// ============================================
// KRUSKAL'S ALGORITHM
// ============================================

function kruskal(vertices, edges) {
  // Sort edges by weight
  edges.sort((a, b) => a.weight - b.weight);
  
  const mst = [];
  const uf = new UnionFind(vertices.length);
  const vertexMap = {};
  
  // Map vertices to indices
  vertices.forEach((v, i) => {
    vertexMap[v] = i;
  });
  
  for (let edge of edges) {
    const from = vertexMap[edge.from];
    const to = vertexMap[edge.to];
    
    // Add edge if it doesn't create cycle
    if (uf.union(from, to)) {
      mst.push(edge);
      
      // MST has V-1 edges
      if (mst.length === vertices.length - 1) {
        break;
      }
    }
  }
  
  return mst;
}

// ============================================
// PRIM'S ALGORITHM
// ============================================

function prim(graph, start) {
  const mst = [];
  const visited = new Set([start]);
  const edges = [];
  
  // Add edges from start
  for (let edge of graph[start] || []) {
    edges.push({ from: start, to: edge.node, weight: edge.weight });
  }
  
  // Sort edges
  edges.sort((a, b) => a.weight - b.weight);
  
  while (visited.size < Object.keys(graph).length && edges.length > 0) {
    // Get minimum weight edge
    let minEdge = null;
    let minIndex = -1;
    
    for (let i = 0; i < edges.length; i++) {
      if (!visited.has(edges[i].to)) {
        minEdge = edges[i];
        minIndex = i;
        break;
      }
    }
    
    if (!minEdge) break;
    
    // Remove from edges
    edges.splice(minIndex, 1);
    
    // Add to MST
    mst.push(minEdge);
    visited.add(minEdge.to);
    
    // Add new edges
    for (let edge of graph[minEdge.to] || []) {
      if (!visited.has(edge.node)) {
        edges.push({ from: minEdge.to, to: edge.node, weight: edge.weight });
      }
    }
    
    // Re-sort
    edges.sort((a, b) => a.weight - b.weight);
  }
  
  return mst;
}

// ============================================
// PRIM'S WITH PRIORITY QUEUE (OPTIMIZED)
// ============================================

function primOptimized(graph, start) {
  const mst = [];
  const visited = new Set();
  const pq = new PriorityQueue();
  const parent = {};
  
  // Initialize
  for (let vertex in graph) {
    parent[vertex] = null;
  }
  
  pq.enqueue({ vertex: start, weight: 0 }, 0);
  
  while (!pq.isEmpty() && visited.size < Object.keys(graph).length) {
    const { vertex, weight } = pq.dequeue().element;
    
    if (visited.has(vertex)) continue;
    visited.add(vertex);
    
    if (parent[vertex] !== null) {
      mst.push({ from: parent[vertex], to: vertex, weight });
    }
    
    // Add neighbors
    for (let edge of graph[vertex] || []) {
      if (!visited.has(edge.node)) {
        parent[edge.node] = vertex;
        pq.enqueue({ vertex: edge.node, weight: edge.weight }, edge.weight);
      }
    }
  }
  
  return mst;
}

// ============================================
// COMPARISON
// ============================================

/*
Kruskal's:
- Sort all edges
- Add edges if no cycle (Union-Find)
- Time: O(E log E)
- Good for sparse graphs

Prim's:
- Start from vertex
- Add minimum edge to unvisited
- Time: O(E log V) with heap
- Good for dense graphs
*/
```

---

## E) Internal Working

**Kruskal's:**
- Sort edges by weight
- Add edges if no cycle
- Union-Find for cycle detection
- O(E log E) time

**Prim's:**
- Start from vertex
- Add minimum edge to unvisited
- Priority queue for edges
- O(E log V) time

---

## F) Interview Questions & Answers

### Q1: What is Minimum Spanning Tree?

**Answer:**
MST is subset of graph edges connecting all vertices with minimum total weight, no cycles (tree property). Has V-1 edges for V vertices. Algorithms: Kruskal's (sort edges, add if no cycle - O(E log E)), Prim's (grow from vertex - O(E log V)). Both produce same MST. Use for network design, clustering.

### Q2: Explain Kruskal's algorithm.

**Answer:**
Kruskal's: Sort all edges by weight, iterate through sorted edges, add edge to MST if it doesn't create cycle (use Union-Find to check), stop when V-1 edges added. Time O(E log E) for sorting, O(E α(V)) for Union-Find operations. Greedy algorithm - always picks minimum weight edge that doesn't create cycle.

### Q3: Explain Prim's algorithm.

**Answer:**
Prim's: Start from any vertex, maintain set of visited vertices, repeatedly add minimum weight edge connecting visited to unvisited vertex, use priority queue for efficiency. Time O(E log V) with heap. Greedy algorithm - always picks minimum edge from visited to unvisited. Good for dense graphs.

---

## G) Common Mistakes

### Mistake 1: Not Checking for Cycles

```javascript
// ❌ WRONG - No cycle check
mst.push(edge);
// May create cycle

// ✅ CORRECT - Check cycle
if (unionFind.union(from, to)) {
  mst.push(edge);
}
```

**Why it breaks:** Creates cycles, not a tree.

---

## H) When to Use & When NOT to Use

Use MST for network design, clustering, approximation. Use Kruskal's for sparse graphs, Prim's for dense graphs. Don't use when need shortest path (use shortest path algorithms).

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain Minimum Spanning Tree."

**You:**
"MST connects all vertices with minimum total weight, no cycles (tree property). Algorithms: Kruskal's (sort edges, add if no cycle using Union-Find - O(E log E)), Prim's (grow from vertex, add minimum edge - O(E log V)).

Both greedy, produce same MST. Kruskal's good for sparse graphs, Prim's for dense. Use for network design, clustering. MST has V-1 edges for V vertices."

---

## J) Mini Practice Task

Implement: Kruskal's with Union-Find, Prim's with priority queue, compare results, calculate MST weight.

---

**END OF TOPIC: MINIMUM SPANNING TREE (MST)**

