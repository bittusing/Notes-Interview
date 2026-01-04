# AVL TREE

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**AVL Tree kya hai?**
- AVL Tree self-balancing Binary Search Tree hai
- Height difference left aur right subtree ka maximum 1 ho sakta hai
- Balance factor = height(left) - height(right)
- Balance factor -1, 0, ya 1 hona chahiye
- Unbalanced ho to rotations se balance karte hain

**Real-life Analogy:**
- AVL Tree = Balanced see-saw
- Balance factor = Weight difference
- Rotation = Adjust karna balance ke liye
- Always balanced = Efficient operations

**AVL Tree Properties:**
- Self-balancing BST
- Balance factor: -1, 0, or 1
- Height: O(log n) guaranteed
- Operations: O(log n) worst case

**Rotations:**
- **Left Rotation:** Right-heavy ko fix
- **Right Rotation:** Left-heavy ko fix
- **Left-Right Rotation:** Double rotation
- **Right-Left Rotation:** Double rotation

---

## B) Easy English Theory

### What is AVL Tree?

AVL Tree is self-balancing Binary Search Tree where height difference between left and right subtrees is at most 1. Balance factor = height(left) - height(right), must be -1, 0, or 1. When unbalanced, use rotations (left, right, left-right, right-left) to balance. Guarantees O(log n) height and operations. More complex than BST but guarantees performance.

---

## C) Why This Concept Exists

### The Problem

**With Regular BST:**
- Can become unbalanced
- Degrades to O(n) worst case
- No performance guarantee
- Skewed trees possible

### The Solution

**AVL Tree Provides:**
1. **Self-Balancing:** Automatically balances
2. **Guaranteed Height:** O(log n) always
3. **Performance:** O(log n) worst case
4. **Reliability:** Consistent performance

---

## D) Practical Example (Code)

```javascript
// ============================================
// AVL TREE NODE
// ============================================

class AVLNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
    this.height = 1; // Height of node
  }
}

// ============================================
// AVL TREE IMPLEMENTATION
// ============================================

class AVLTree {
  constructor() {
    this.root = null;
  }
  
  // Get height
  getHeight(node) {
    return node ? node.height : 0;
  }
  
  // Get balance factor
  getBalanceFactor(node) {
    if (!node) return 0;
    return this.getHeight(node.left) - this.getHeight(node.right);
  }
  
  // Update height
  updateHeight(node) {
    if (!node) return;
    node.height = Math.max(
      this.getHeight(node.left),
      this.getHeight(node.right)
    ) + 1;
  }
  
  // ============================================
  // ROTATIONS
  // ============================================
  
  // Right rotation
  rightRotate(y) {
    const x = y.left;
    const T2 = x.right;
    
    // Perform rotation
    x.right = y;
    y.left = T2;
    
    // Update heights
    this.updateHeight(y);
    this.updateHeight(x);
    
    return x; // New root
  }
  
  // Left rotation
  leftRotate(x) {
    const y = x.right;
    const T2 = y.left;
    
    // Perform rotation
    y.left = x;
    x.right = T2;
    
    // Update heights
    this.updateHeight(x);
    this.updateHeight(y);
    
    return y; // New root
  }
  
  // ============================================
  // INSERT
  // ============================================
  
  insert(val) {
    this.root = this.insertNode(this.root, val);
    return this;
  }
  
  insertNode(node, val) {
    // 1. Perform normal BST insert
    if (!node) {
      return new AVLNode(val);
    }
    
    if (val < node.val) {
      node.left = this.insertNode(node.left, val);
    } else if (val > node.val) {
      node.right = this.insertNode(node.right, val);
    } else {
      return node; // Duplicates not allowed
    }
    
    // 2. Update height
    this.updateHeight(node);
    
    // 3. Get balance factor
    const balance = this.getBalanceFactor(node);
    
    // 4. If unbalanced, perform rotations
    
    // Left Left Case
    if (balance > 1 && val < node.left.val) {
      return this.rightRotate(node);
    }
    
    // Right Right Case
    if (balance < -1 && val > node.right.val) {
      return this.leftRotate(node);
    }
    
    // Left Right Case
    if (balance > 1 && val > node.left.val) {
      node.left = this.leftRotate(node.left);
      return this.rightRotate(node);
    }
    
    // Right Left Case
    if (balance < -1 && val < node.right.val) {
      node.right = this.rightRotate(node.right);
      return this.leftRotate(node);
    }
    
    return node; // Return unchanged node
  }
  
  // ============================================
  // DELETE
  // ============================================
  
  delete(val) {
    this.root = this.deleteNode(this.root, val);
    return this;
  }
  
  deleteNode(node, val) {
    // 1. Perform normal BST delete
    if (!node) {
      return null;
    }
    
    if (val < node.val) {
      node.left = this.deleteNode(node.left, val);
    } else if (val > node.val) {
      node.right = this.deleteNode(node.right, val);
    } else {
      // Node to delete
      if (!node.left) {
        return node.right;
      } else if (!node.right) {
        return node.left;
      }
      
      // Two children: get inorder successor
      const successor = this.findMin(node.right);
      node.val = successor.val;
      node.right = this.deleteNode(node.right, successor.val);
    }
    
    // 2. Update height
    this.updateHeight(node);
    
    // 3. Get balance factor
    const balance = this.getBalanceFactor(node);
    
    // 4. If unbalanced, perform rotations
    
    // Left Left Case
    if (balance > 1 && this.getBalanceFactor(node.left) >= 0) {
      return this.rightRotate(node);
    }
    
    // Left Right Case
    if (balance > 1 && this.getBalanceFactor(node.left) < 0) {
      node.left = this.leftRotate(node.left);
      return this.rightRotate(node);
    }
    
    // Right Right Case
    if (balance < -1 && this.getBalanceFactor(node.right) <= 0) {
      return this.leftRotate(node);
    }
    
    // Right Left Case
    if (balance < -1 && this.getBalanceFactor(node.right) > 0) {
      node.right = this.rightRotate(node.right);
      return this.leftRotate(node);
    }
    
    return node;
  }
  
  findMin(node) {
    while (node.left) {
      node = node.left;
    }
    return node;
  }
  
  // ============================================
  // SEARCH (Same as BST)
  // ============================================
  
  search(val) {
    return this.searchNode(this.root, val);
  }
  
  searchNode(node, val) {
    if (!node) return false;
    
    if (val === node.val) return true;
    if (val < node.val) return this.searchNode(node.left, val);
    return this.searchNode(node.right, val);
  }
}
```

---

## E) Internal Working

**Balance Factor:**
- height(left) - height(right)
- Must be -1, 0, or 1
- Checked after insert/delete

**Rotations:**
- Left: Fix right-heavy
- Right: Fix left-heavy
- Double: Two rotations needed

---

## F) Interview Questions & Answers

### Q1: What is AVL Tree and why use it?

**Answer:**
AVL Tree is self-balancing BST where height difference between left and right subtrees is at most 1. Balance factor = height(left) - height(right), must be -1, 0, or 1. When unbalanced, use rotations to balance. Benefits: Guaranteed O(log n) height, consistent performance, no worst-case degradation. More complex than BST but guarantees performance.

### Q2: What are rotations in AVL Tree?

**Answer:**
Rotations rebalance tree: Right rotation (fix left-heavy - node's left child becomes root), Left rotation (fix right-heavy - node's right child becomes root), Left-Right (double - left then right), Right-Left (double - right then left). Rotations maintain BST property while balancing. Time O(1) per rotation.

### Q3: How does AVL Tree maintain balance?

**Answer:**
After insert/delete: Update heights, calculate balance factor, if |balance| > 1, perform appropriate rotation. Four cases: Left-Left (right rotate), Right-Right (left rotate), Left-Right (left rotate left child, then right rotate), Right-Left (right rotate right child, then left rotate). Guarantees balance factor always -1, 0, or 1.

---

## G) Common Mistakes

### Mistake 1: Not Updating Heights

```javascript
// ❌ WRONG - No height update
node.left = insert(node.left, val);
return node;

// ✅ CORRECT - Update height
node.left = insert(node.left, val);
updateHeight(node);
```

**Why it breaks:** Incorrect balance factor calculation, wrong rotations.

---

## H) When to Use & When NOT to Use

Use AVL Tree when need guaranteed O(log n) performance, frequent searches, balanced structure needed. Don't use when simple BST sufficient or when insertions/deletions rare.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain AVL Tree."

**You:**
"AVL Tree is self-balancing BST. Balance factor = height(left) - height(right), must be -1, 0, or 1. When unbalanced after insert/delete, use rotations: Right (fix left-heavy), Left (fix right-heavy), double rotations for complex cases.

Guarantees O(log n) height and operations. More complex than BST but ensures consistent performance. Rotations maintain BST property while balancing."

---

## J) Mini Practice Task

Implement: AVL Tree insert, delete, rotations, balance factor calculation, height updates.

---

**END OF TOPIC: AVL TREE**

