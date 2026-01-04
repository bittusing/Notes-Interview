# BINARY TREES FUNDAMENTALS

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Binary Tree kya hai?**
- Binary Tree hierarchical data structure hai
- Har node maximum 2 children ho sakte hain
- Root node se start hota hai
- Parent-child relationships
- Tree structure (upside down)

**Real-life Analogy:**
- Binary Tree = Family tree (parent, children)
- Root = Grandparent (top)
- Nodes = Family members
- Children = Descendants
- Leaf = No children (bottom)

**Tree Terminology:**
- **Root:** Topmost node
- **Node:** Data + children references
- **Parent:** Node jo children ko point karta hai
- **Child:** Node jo parent ke under hai
- **Leaf:** Node with no children
- **Height:** Root se deepest leaf tak distance
- **Depth:** Root se node tak distance

**Binary Tree Properties:**
- Maximum 2 children per node
- Left child aur right child
- Hierarchical structure
- Recursive nature

---

## B) Easy English Theory

### What is Binary Tree?

Binary Tree is hierarchical data structure where each node has maximum 2 children (left and right). Terminology: Root (topmost node), Node (data + children), Parent (has children), Child (has parent), Leaf (no children), Height (root to deepest leaf), Depth (root to node). Properties: Hierarchical, recursive, maximum 2 children per node.

---

## C) Why This Concept Exists

### The Problem

**Without Trees:**
- No hierarchical organization
- Difficult to represent relationships
- No efficient search structure
- Limited data organization

### The Solution

**Binary Tree Provides:**
1. **Hierarchy:** Natural parent-child relationships
2. **Efficient Search:** BST for O(log n) search
3. **Organization:** Tree structure
4. **Recursion:** Natural recursive operations

---

## D) Practical Example (Code)

```javascript
// ============================================
// BINARY TREE NODE
// ============================================

class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null; // Left child
    this.right = null; // Right child
  }
}

// ============================================
// BINARY TREE IMPLEMENTATION
// ============================================

class BinaryTree {
  constructor() {
    this.root = null;
  }
  
  // Insert (simple - level order)
  insert(val) {
    const newNode = new TreeNode(val);
    
    if (!this.root) {
      this.root = newNode;
      return this;
    }
    
    const queue = [this.root];
    
    while (queue.length > 0) {
      const current = queue.shift();
      
      if (!current.left) {
        current.left = newNode;
        return this;
      } else if (!current.right) {
        current.right = newNode;
        return this;
      } else {
        queue.push(current.left);
        queue.push(current.right);
      }
    }
  }
  
  // ============================================
  // TRAVERSAL METHODS
  // ============================================
  
  // Preorder: Root -> Left -> Right
  preorder(root = this.root, result = []) {
    if (!root) return result;
    
    result.push(root.val); // Visit root
    this.preorder(root.left, result); // Left subtree
    this.preorder(root.right, result); // Right subtree
    
    return result;
  }
  
  // Inorder: Left -> Root -> Right
  inorder(root = this.root, result = []) {
    if (!root) return result;
    
    this.inorder(root.left, result); // Left subtree
    result.push(root.val); // Visit root
    this.inorder(root.right, result); // Right subtree
    
    return result;
  }
  
  // Postorder: Left -> Right -> Root
  postorder(root = this.root, result = []) {
    if (!root) return result;
    
    this.postorder(root.left, result); // Left subtree
    this.postorder(root.right, result); // Right subtree
    result.push(root.val); // Visit root
    
    return result;
  }
  
  // Level Order (BFS)
  levelOrder() {
    if (!this.root) return [];
    
    const result = [];
    const queue = [this.root];
    
    while (queue.length > 0) {
      const levelSize = queue.length;
      const level = [];
      
      for (let i = 0; i < levelSize; i++) {
        const node = queue.shift();
        level.push(node.val);
        
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }
      
      result.push(level);
    }
    
    return result;
  }
  
  // ============================================
  // UTILITY METHODS
  // ============================================
  
  // Height of tree
  height(root = this.root) {
    if (!root) return -1; // or 0 depending on definition
    
    const leftHeight = this.height(root.left);
    const rightHeight = this.height(root.right);
    
    return Math.max(leftHeight, rightHeight) + 1;
  }
  
  // Size (number of nodes)
  size(root = this.root) {
    if (!root) return 0;
    
    return 1 + this.size(root.left) + this.size(root.right);
  }
  
  // Check if empty
  isEmpty() {
    return this.root === null;
  }
}

// ============================================
// ITERATIVE TRAVERSALS
// ============================================

// Preorder iterative
function preorderIterative(root) {
  if (!root) return [];
  
  const result = [];
  const stack = [root];
  
  while (stack.length > 0) {
    const node = stack.pop();
    result.push(node.val);
    
    // Push right first, then left (for correct order)
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }
  
  return result;
}

// Inorder iterative
function inorderIterative(root) {
  const result = [];
  const stack = [];
  let current = root;
  
  while (current || stack.length > 0) {
    // Go to leftmost node
    while (current) {
      stack.push(current);
      current = current.left;
    }
    
    // Process node
    current = stack.pop();
    result.push(current.val);
    
    // Go to right
    current = current.right;
  }
  
  return result;
}

// Postorder iterative
function postorderIterative(root) {
  if (!root) return [];
  
  const result = [];
  const stack1 = [root];
  const stack2 = [];
  
  // Reverse preorder
  while (stack1.length > 0) {
    const node = stack1.pop();
    stack2.push(node);
    
    if (node.left) stack1.push(node.left);
    if (node.right) stack1.push(node.right);
  }
  
  // Pop from stack2
  while (stack2.length > 0) {
    result.push(stack2.pop().val);
  }
  
  return result;
}

// ============================================
// COMMON PROBLEMS
// ============================================

// 1. Maximum depth
function maxDepth(root) {
  if (!root) return 0;
  
  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);
  
  return Math.max(leftDepth, rightDepth) + 1;
}

// 2. Same tree
function isSameTree(p, q) {
  if (!p && !q) return true;
  if (!p || !q) return false;
  if (p.val !== q.val) return false;
  
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}

// 3. Symmetric tree
function isSymmetric(root) {
  if (!root) return true;
  
  function isMirror(left, right) {
    if (!left && !right) return true;
    if (!left || !right) return false;
    if (left.val !== right.val) return false;
    
    return isMirror(left.left, right.right) && 
           isMirror(left.right, right.left);
  }
  
  return isMirror(root.left, root.right);
}

// 4. Invert binary tree
function invertTree(root) {
  if (!root) return null;
  
  // Swap children
  const temp = root.left;
  root.left = root.right;
  root.right = temp;
  
  // Recursively invert subtrees
  invertTree(root.left);
  invertTree(root.right);
  
  return root;
}

// 5. Path sum
function hasPathSum(root, targetSum) {
  if (!root) return false;
  
  // Leaf node
  if (!root.left && !root.right) {
    return root.val === targetSum;
  }
  
  const remaining = targetSum - root.val;
  return hasPathSum(root.left, remaining) || 
         hasPathSum(root.right, remaining);
}

// 6. Count nodes
function countNodes(root) {
  if (!root) return 0;
  
  return 1 + countNodes(root.left) + countNodes(root.right);
}

// 7. Diameter of binary tree
function diameterOfBinaryTree(root) {
  let maxDiameter = 0;
  
  function height(node) {
    if (!node) return 0;
    
    const leftHeight = height(node.left);
    const rightHeight = height(node.right);
    
    // Update diameter
    maxDiameter = Math.max(maxDiameter, leftHeight + rightHeight);
    
    return Math.max(leftHeight, rightHeight) + 1;
  }
  
  height(root);
  return maxDiameter;
}
```

---

## E) Internal Working

**Tree Structure:**
- Root at top
- Nodes connected by edges
- Each node has data + children
- Recursive structure

**Traversal:**
- DFS: Preorder, Inorder, Postorder
- BFS: Level order
- Stack for iterative DFS
- Queue for BFS

---

## F) Interview Questions & Answers

### Q1: What is Binary Tree and what are its traversals?

**Answer:**
Binary Tree is hierarchical structure where each node has max 2 children. Traversals: Preorder (Root-Left-Right), Inorder (Left-Root-Right), Postorder (Left-Right-Root), Level Order (BFS - level by level). Preorder: Process root before children. Inorder: Process root between children. Postorder: Process root after children. Level Order: Process level by level using queue.

### Q2: What is the difference between height and depth?

**Answer:**
Height: Distance from node to deepest leaf in its subtree (bottom-up). Depth: Distance from root to node (top-down). Root has depth 0, height = max depth of leaves. Leaf has height 0. Height calculated bottom-up recursively, depth calculated top-down.

### Q3: How do you traverse Binary Tree iteratively?

**Answer:**
Iterative traversals: Preorder (use stack, push right then left), Inorder (use stack, go leftmost, process, go right), Postorder (two stacks - reverse preorder, or one stack with state tracking), Level Order (use queue, process level by level). Stack for DFS, queue for BFS. Iterative avoids recursion stack overflow.

---

## G) Common Mistakes

### Mistake 1: Not Handling Null Nodes

```javascript
// ❌ WRONG - No null check
function traverse(root) {
  result.push(root.val);
  traverse(root.left);
  traverse(root.right);
}

// ✅ CORRECT - Check null
function traverse(root) {
  if (!root) return;
  result.push(root.val);
  traverse(root.left);
  traverse(root.right);
}
```

**Why it breaks:** Crashes on null nodes.

---

## H) When to Use & When NOT to Use

Use Binary Tree for hierarchical data, BST for search, expression trees. Don't use for simple linear data or when array/linked list sufficient.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain Binary Tree."

**You:**
"Binary Tree is hierarchical structure where each node has max 2 children. Terminology: Root (top), Node (data + children), Leaf (no children), Height (node to deepest leaf), Depth (root to node).

Traversals: Preorder (Root-Left-Right), Inorder (Left-Root-Right), Postorder (Left-Right-Root), Level Order (BFS). Can implement recursively or iteratively (stack for DFS, queue for BFS). Use for hierarchical data, BST, expression trees."

---

## J) Mini Practice Task

Implement: All traversals (recursive and iterative), height, size, same tree, symmetric tree, invert tree, path sum, diameter.

---

**END OF TOPIC: BINARY TREES FUNDAMENTALS**

