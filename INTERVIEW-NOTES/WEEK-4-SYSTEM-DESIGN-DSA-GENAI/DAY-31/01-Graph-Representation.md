# GRAPH REPRESENTATION

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Graph kya hai?**
- Graph vertices (nodes) aur edges (connections) ka collection hai
- Vertices data store karte hain
- Edges relationships represent karte hain
- Network structure
- Real-world problems model karta hai

**Real-life Analogy:**
- Graph = Road network
- Vertices = Cities
- Edges = Roads connecting cities
- Directed = One-way roads
- Undirected = Two-way roads

**Graph Types:**
- **Directed Graph:** Edges have direction
- **Undirected Graph:** Edges bidirectional
- **Weighted Graph:** Edges have weights
- **Unweighted Graph:** All edges equal

**Graph Representation:**
- **Adjacency List:** List of neighbors
- **Adjacency Matrix:** 2D array
- **Edge List:** List of edges

---

## B) Easy English Theory

### What is Graph?

Graph is collection of vertices (nodes) and edges (connections). Types: Directed (edges have direction), Undirected (bidirectional), Weighted (edges have weights), Unweighted (all edges equal). Representations: Adjacency List (list of neighbors - space efficient), Adjacency Matrix (2D array - fast lookup), Edge List (list of edges). Use for: Networks, social graphs, path finding, relationships.

---

## C) Why This Concept Exists

### The Problem

**Without Graphs:**
- Can't model relationships
- No network representation
- Difficult path finding
- Limited data modeling

### The Solution

**Graph Provides:**
1. **Relationships:** Model connections
2. **Networks:** Represent structures
3. **Path Finding:** Algorithms available
4. **Flexibility:** Various problem types

---

## D) Practical Example (Code)

```javascript
// ============================================
// ADJACENCY LIST REPRESENTATION
// ============================================

// Unweighted graph
class Graph {
  constructor() {
    this.adjacencyList = {}; // vertex -> [neighbors]
  }
  
  // Add vertex
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
    return this;
  }
  
  // Add edge (undirected)
  addEdge(vertex1, vertex2) {
    if (!this.adjacencyList[vertex1]) {
      this.addVertex(vertex1);
    }
    if (!this.adjacencyList[vertex2]) {
      this.addVertex(vertex2);
    }
    
    this.adjacencyList[vertex1].push(vertex2);
    this.adjacencyList[vertex2].push(vertex1);
    
    return this;
  }
  
  // Remove edge
  removeEdge(vertex1, vertex2) {
    this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
      v => v !== vertex2
    );
    this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(
      v => v !== vertex1
    );
    return this;
  }
  
  // Remove vertex
  removeVertex(vertex) {
    while (this.adjacencyList[vertex].length) {
      const adjacentVertex = this.adjacencyList[vertex].pop();
      this.removeEdge(vertex, adjacentVertex);
    }
    delete this.adjacencyList[vertex];
    return this;
  }
}

// ============================================
// WEIGHTED GRAPH
// ============================================

class WeightedGraph {
  constructor() {
    this.adjacencyList = {}; // vertex -> [{node, weight}, ...]
  }
  
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
    return this;
  }
  
  addEdge(vertex1, vertex2, weight) {
    this.addVertex(vertex1);
    this.addVertex(vertex2);
    
    this.adjacencyList[vertex1].push({ node: vertex2, weight });
    this.adjacencyList[vertex2].push({ node: vertex1, weight });
    
    return this;
  }
}

// ============================================
// DIRECTED GRAPH
// ============================================

class DirectedGraph {
  constructor() {
    this.adjacencyList = {};
  }
  
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
    return this;
  }
  
  addEdge(from, to) {
    this.addVertex(from);
    this.addVertex(to);
    
    this.adjacencyList[from].push(to);
    // No reverse edge (directed)
    
    return this;
  }
}

// ============================================
// ADJACENCY MATRIX REPRESENTATION
// ============================================

class GraphMatrix {
  constructor(vertices) {
    this.vertices = vertices;
    this.matrix = Array(vertices.length)
      .fill(null)
      .map(() => Array(vertices.length).fill(0));
    this.vertexMap = {};
    
    // Map vertex to index
    vertices.forEach((v, i) => {
      this.vertexMap[v] = i;
    });
  }
  
  addEdge(vertex1, vertex2, weight = 1) {
    const i = this.vertexMap[vertex1];
    const j = this.vertexMap[vertex2];
    
    this.matrix[i][j] = weight;
    // For undirected: this.matrix[j][i] = weight;
  }
  
  hasEdge(vertex1, vertex2) {
    const i = this.vertexMap[vertex1];
    const j = this.vertexMap[vertex2];
    return this.matrix[i][j] !== 0;
  }
  
  getNeighbors(vertex) {
    const i = this.vertexMap[vertex];
    const neighbors = [];
    
    for (let j = 0; j < this.vertices.length; j++) {
      if (this.matrix[i][j] !== 0) {
        neighbors.push({
          vertex: this.vertices[j],
          weight: this.matrix[i][j]
        });
      }
    }
    
    return neighbors;
  }
}

// ============================================
// EDGE LIST REPRESENTATION
// ============================================

class GraphEdgeList {
  constructor() {
    this.edges = []; // [{from, to, weight}, ...]
    this.vertices = new Set();
  }
  
  addEdge(from, to, weight = 1) {
    this.edges.push({ from, to, weight });
    this.vertices.add(from);
    this.vertices.add(to);
  }
  
  getEdges() {
    return this.edges;
  }
  
  getVertices() {
    return Array.from(this.vertices);
  }
}

// ============================================
// COMPARISON
// ============================================

/*
Adjacency List:
- Space: O(V + E)
- Check edge: O(degree)
- Get neighbors: O(degree)
- Good for sparse graphs

Adjacency Matrix:
- Space: O(V²)
- Check edge: O(1)
- Get neighbors: O(V)
- Good for dense graphs

Edge List:
- Space: O(E)
- Check edge: O(E)
- Get neighbors: O(E)
- Good for specific algorithms
*/
```

---

## E) Internal Working

**Adjacency List:**
- Map/object: vertex -> list of neighbors
- Space: O(V + E)
- Efficient for sparse graphs

**Adjacency Matrix:**
- 2D array: matrix[i][j] = edge weight
- Space: O(V²)
- Efficient for dense graphs

---

## F) Interview Questions & Answers

### Q1: What are different ways to represent a graph?

**Answer:**
Representations: Adjacency List (vertex -> list of neighbors - space O(V+E), good for sparse graphs), Adjacency Matrix (2D array - space O(V²), fast edge lookup O(1), good for dense graphs), Edge List (list of edges - space O(E), simple but slow lookups). Choose based on: Sparse graph -> Adjacency List, Dense graph -> Adjacency Matrix, specific algorithms -> Edge List.

### Q2: When would you use Adjacency List vs Adjacency Matrix?

**Answer:**
Adjacency List: Sparse graphs (few edges), space efficient O(V+E), iterate neighbors efficiently, check edge O(degree). Adjacency Matrix: Dense graphs (many edges), fast edge check O(1), space O(V²), get neighbors O(V). Use List for sparse, Matrix for dense or when need fast edge checks.

### Q3: What is the space complexity of graph representations?

**Answer:**
Space complexity: Adjacency List O(V + E) - store each edge once, Adjacency Matrix O(V²) - always V×V matrix, Edge List O(E) - store only edges. List most space efficient for sparse graphs, Matrix fixed O(V²) regardless of edges.

---

## G) Common Mistakes

### Mistake 1: Not Handling Both Directions

```javascript
// ❌ WRONG - Undirected but only one direction
adjacencyList[vertex1].push(vertex2);
// Missing reverse edge

// ✅ CORRECT - Both directions
adjacencyList[vertex1].push(vertex2);
adjacencyList[vertex2].push(vertex1);
```

**Why it breaks:** Undirected graph needs both directions.

---

## H) When to Use & When NOT to Use

Use Adjacency List for sparse graphs, most algorithms. Use Adjacency Matrix for dense graphs, fast edge checks. Use Edge List for specific algorithms (Kruskal's MST).

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain Graph Representation."

**You:**
"Graph representations: Adjacency List (vertex -> neighbors list, space O(V+E), good for sparse), Adjacency Matrix (2D array, space O(V²), fast edge check O(1), good for dense), Edge List (list of edges, space O(E)).

Choose based on graph density: Sparse -> List (space efficient), Dense -> Matrix (fast lookups). List most common for algorithms. Matrix for dense graphs or fast edge checks."

---

## J) Mini Practice Task

Implement: Adjacency List, Adjacency Matrix, Edge List. Compare space and time complexities. Implement add/remove vertex/edge operations.

---

**END OF TOPIC: GRAPH REPRESENTATION**

