# SHORTEST PATH ALGORITHMS

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Shortest Path Algorithms kya hain?**
- Shortest Path Algorithms graph mein minimum distance find karte hain
- Source se destination tak shortest path
- Different algorithms different use cases ke liye
- Weighted graphs ke liye important
- Real-world applications: GPS, routing

**Real-life Analogy:**
- Shortest Path = Google Maps (shortest route)
- Source = Starting point
- Destination = End point
- Weights = Distance/time
- Algorithm = Route calculation

**Algorithms:**
- **Dijkstra's:** Non-negative weights
- **Bellman-Ford:** Negative weights allowed
- **Floyd-Warshall:** All pairs shortest path
- **BFS:** Unweighted graphs

---

## B) Easy English Theory

### What are Shortest Path Algorithms?

Shortest Path Algorithms find minimum distance path from source to destination in weighted graphs. Algorithms: Dijkstra's (non-negative weights, O(V²) or O(E log V)), Bellman-Ford (negative weights allowed, O(VE)), Floyd-Warshall (all pairs, O(V³)), BFS (unweighted, O(V+E)). Use for: GPS navigation, network routing, path optimization.

---

## C) Why This Concept Exists

### The Problem

**Without Algorithms:**
- Can't find optimal paths
- Inefficient routing
- No path optimization
- Difficult navigation

### The Solution

**Algorithms Provide:**
1. **Optimal Paths:** Minimum distance
2. **Efficiency:** Fast computation
3. **Reliability:** Guaranteed results
4. **Applications:** Real-world use

---

## D) Practical Example (Code)

```javascript
// ============================================
// DIJKSTRA'S ALGORITHM
// ============================================

class PriorityQueue {
  constructor() {
    this.items = [];
  }
  
  enqueue(element, priority) {
    const item = { element, priority };
    let added = false;
    
    for (let i = 0; i < this.items.length; i++) {
      if (item.priority < this.items[i].priority) {
        this.items.splice(i, 0, item);
        added = true;
        break;
      }
    }
    
    if (!added) {
      this.items.push(item);
    }
  }
  
  dequeue() {
    return this.items.shift().element;
  }
  
  isEmpty() {
    return this.items.length === 0;
  }
}

function dijkstra(graph, start) {
  const distances = {};
  const previous = {};
  const pq = new PriorityQueue();
  const visited = new Set();
  
  // Initialize distances
  for (let vertex in graph) {
    distances[vertex] = Infinity;
    previous[vertex] = null;
  }
  distances[start] = 0;
  pq.enqueue(start, 0);
  
  while (!pq.isEmpty()) {
    const current = pq.dequeue();
    
    if (visited.has(current)) continue;
    visited.add(current);
    
    // Visit neighbors
    for (let neighbor of graph[current] || []) {
      const { node, weight } = neighbor;
      const distance = distances[current] + weight;
      
      if (distance < distances[node]) {
        distances[node] = distance;
        previous[node] = current;
        pq.enqueue(node, distance);
      }
    }
  }
  
  return { distances, previous };
}

// Get shortest path
function getShortestPath(previous, start, end) {
  const path = [];
  let current = end;
  
  while (current !== null) {
    path.unshift(current);
    current = previous[current];
  }
  
  return path[0] === start ? path : [];
}

// ============================================
// BELLMAN-FORD ALGORITHM
// ============================================

function bellmanFord(graph, start) {
  const distances = {};
  const previous = {};
  
  // Initialize
  for (let vertex in graph) {
    distances[vertex] = Infinity;
    previous[vertex] = null;
  }
  distances[start] = 0;
  
  // Relax edges V-1 times
  const vertices = Object.keys(graph);
  for (let i = 0; i < vertices.length - 1; i++) {
    for (let vertex in graph) {
      for (let edge of graph[vertex] || []) {
        const { node, weight } = edge;
        if (distances[vertex] !== Infinity && 
            distances[vertex] + weight < distances[node]) {
          distances[node] = distances[vertex] + weight;
          previous[node] = vertex;
        }
      }
    }
  }
  
  // Check for negative cycles
  for (let vertex in graph) {
    for (let edge of graph[vertex] || []) {
      const { node, weight } = edge;
      if (distances[vertex] !== Infinity && 
          distances[vertex] + weight < distances[node]) {
        return { error: 'Negative cycle detected' };
      }
    }
  }
  
  return { distances, previous };
}

// ============================================
// FLOYD-WARSHALL (ALL PAIRS SHORTEST PATH)
// ============================================

function floydWarshall(graph) {
  const vertices = Object.keys(graph);
  const n = vertices.length;
  const dist = Array(n).fill(null).map(() => Array(n).fill(Infinity));
  
  // Initialize distances
  for (let i = 0; i < n; i++) {
    dist[i][i] = 0; // Distance to self is 0
  }
  
  // Add direct edges
  for (let i = 0; i < n; i++) {
    const vertex = vertices[i];
    for (let edge of graph[vertex] || []) {
      const j = vertices.indexOf(edge.node);
      dist[i][j] = edge.weight;
    }
  }
  
  // Floyd-Warshall algorithm
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (dist[i][k] !== Infinity && dist[k][j] !== Infinity) {
          dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
        }
      }
    }
  }
  
  return dist;
}

// ============================================
// BFS FOR UNWEIGHTED GRAPHS
// ============================================

function shortestPathBFS(graph, start, end) {
  const queue = [[start, [start]]];
  const visited = new Set([start]);
  
  while (queue.length > 0) {
    const [vertex, path] = queue.shift();
    
    if (vertex === end) {
      return path;
    }
    
    for (let neighbor of graph[vertex] || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([neighbor, [...path, neighbor]]);
      }
    }
  }
  
  return null; // No path
}
```

---

## E) Internal Working

**Dijkstra's:**
- Greedy algorithm
- Priority queue
- Relax edges
- O(V²) or O(E log V)

**Bellman-Ford:**
- Relax V-1 times
- Detect negative cycles
- O(VE) time

---

## F) Interview Questions & Answers

### Q1: Explain Dijkstra's algorithm.

**Answer:**
Dijkstra's finds shortest path from source to all vertices (non-negative weights). Process: Initialize distances (source = 0, others = Infinity), use priority queue, repeatedly extract minimum distance vertex, relax edges to neighbors, update distances if shorter path found. Time: O(V²) with array, O(E log V) with heap. Greedy algorithm - always picks closest unvisited vertex.

### Q2: When would you use Bellman-Ford vs Dijkstra's?

**Answer:**
Dijkstra's: Non-negative weights only, faster O(E log V) with heap, greedy approach. Bellman-Ford: Negative weights allowed, detects negative cycles, slower O(VE), works for all cases. Use Dijkstra's for non-negative weights (most common), Bellman-Ford when negative weights possible or need cycle detection.

### Q3: What is Floyd-Warshall algorithm?

**Answer:**
Floyd-Warshall finds shortest paths between all pairs of vertices. Dynamic programming: dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]) for all k. Time O(V³), Space O(V²). Use when need all pairs shortest paths. Works with negative weights (no negative cycles).

---

## G) Common Mistakes

### Mistake 1: Using Dijkstra's with Negative Weights

```javascript
// ❌ WRONG - Dijkstra's doesn't work with negative weights
dijkstra(graphWithNegativeWeights, start);
// Incorrect results

// ✅ CORRECT - Use Bellman-Ford
bellmanFord(graphWithNegativeWeights, start);
```

**Why it breaks:** Dijkstra's assumes non-negative weights, fails with negatives.

---

## H) When to Use & When NOT to Use

Use Dijkstra's for non-negative weights. Use Bellman-Ford for negative weights. Use Floyd-Warshall for all pairs. Use BFS for unweighted.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain Shortest Path Algorithms."

**You:**
"Shortest path algorithms: Dijkstra's (non-negative weights, O(E log V), greedy - always picks closest), Bellman-Ford (negative weights allowed, O(VE), detects negative cycles), Floyd-Warshall (all pairs, O(V³)), BFS (unweighted, O(V+E)).

Dijkstra's uses priority queue, relaxes edges. Bellman-Ford relaxes V-1 times, checks for negative cycles. Choose based on weights and requirements."

---

## J) Mini Practice Task

Implement: Dijkstra's, Bellman-Ford, Floyd-Warshall, shortest path reconstruction, negative cycle detection.

---

**END OF TOPIC: SHORTEST PATH ALGORITHMS**

