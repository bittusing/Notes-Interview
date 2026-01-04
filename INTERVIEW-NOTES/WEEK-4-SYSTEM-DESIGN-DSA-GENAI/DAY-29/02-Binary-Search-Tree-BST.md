# BINARY SEARCH TREE (BST)

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Binary Search Tree (BST) kya hai?**
- BST special type ka Binary Tree hai
- Left subtree mein sab values root se chhoti
- Right subtree mein sab values root se badi
- This property har node par maintain hota hai
- Efficient search enable karta hai

**Real-life Analogy:**
- BST = Dictionary (alphabetically organized)
- Root = Middle letter
- Left = Letters before
- Right = Letters after
- Search = Binary search jaisa

**BST Properties:**
- Left child < Parent < Right child
- Har subtree bhi BST hai
- No duplicate values (usually)
- Inorder traversal sorted order deta hai

**BST Benefits:**
- **Fast Search:** O(log n) average
- **Fast Insert:** O(log n) average
- **Fast Delete:** O(log n) average
- **Sorted Order:** Inorder traversal

---

## B) Easy English Theory

### What is Binary Search Tree?

Binary Search Tree (BST) is binary tree where left subtree contains values less than root, right subtree contains values greater than root. This property maintained at every node. Benefits: Fast search O(log n) average, fast insert/delete O(log n) average, inorder traversal gives sorted order. Drawback: Can degrade to O(n) if unbalanced.

---

## C) Why This Concept Exists

### The Problem

**Without BST:**
- Linear search O(n)
- Slow insertions
- No sorted structure
- Inefficient search

### The Solution

**BST Provides:**
1. **Fast Search:** O(log n) average
2. **Sorted Structure:** Maintains order
3. **Efficient Operations:** Insert/delete O(log n)
4. **Flexibility:** Dynamic structure

---

## D) Practical Example (Code)

```javascript
// ============================================
// BST NODE
// ============================================

class BSTNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

// ============================================
// BST IMPLEMENTATION
// ============================================

class BinarySearchTree {
  constructor() {
    this.root = null;
  }
  
  // ============================================
  // INSERT
  // ============================================
  
  insert(val) {
    this.root = this.insertNode(this.root, val);
    return this;
  }
  
  insertNode(root, val) {
    // Base case: create new node
    if (!root) {
      return new BSTNode(val);
    }
    
    // Recursive insertion
    if (val < root.val) {
      root.left = this.insertNode(root.left, val);
    } else if (val > root.val) {
      root.right = this.insertNode(root.right, val);
    }
    // If equal, don't insert (or handle duplicates)
    
    return root;
  }
  
  // Iterative insert
  insertIterative(val) {
    const newNode = new BSTNode(val);
    
    if (!this.root) {
      this.root = newNode;
      return this;
    }
    
    let current = this.root;
    
    while (true) {
      if (val < current.val) {
        if (!current.left) {
          current.left = newNode;
          break;
        }
        current = current.left;
      } else if (val > current.val) {
        if (!current.right) {
          current.right = newNode;
          break;
        }
        current = current.right;
      } else {
        // Duplicate - handle as needed
        break;
      }
    }
    
    return this;
  }
  
  // ============================================
  // SEARCH
  // ============================================
  
  search(val) {
    return this.searchNode(this.root, val);
  }
  
  searchNode(root, val) {
    // Base case: not found
    if (!root) {
      return false;
    }
    
    // Found
    if (val === root.val) {
      return true;
    }
    
    // Recursive search
    if (val < root.val) {
      return this.searchNode(root.left, val);
    } else {
      return this.searchNode(root.right, val);
    }
  }
  
  // Iterative search
  searchIterative(val) {
    let current = this.root;
    
    while (current) {
      if (val === current.val) {
        return true;
      } else if (val < current.val) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    
    return false;
  }
  
  // ============================================
  // DELETE
  // ============================================
  
  delete(val) {
    this.root = this.deleteNode(this.root, val);
    return this;
  }
  
  deleteNode(root, val) {
    if (!root) {
      return null;
    }
    
    if (val < root.val) {
      root.left = this.deleteNode(root.left, val);
    } else if (val > root.val) {
      root.right = this.deleteNode(root.right, val);
    } else {
      // Node to delete found
      
      // Case 1: No children (leaf)
      if (!root.left && !root.right) {
        return null;
      }
      
      // Case 2: One child
      if (!root.left) {
        return root.right;
      }
      if (!root.right) {
        return root.left;
      }
      
      // Case 3: Two children
      // Find inorder successor (smallest in right subtree)
      const successor = this.findMin(root.right);
      root.val = successor.val;
      root.right = this.deleteNode(root.right, successor.val);
    }
    
    return root;
  }
  
  // ============================================
  // UTILITY METHODS
  // ============================================
  
  // Find minimum value
  findMin(root = this.root) {
    if (!root) return null;
    
    while (root.left) {
      root = root.left;
    }
    
    return root;
  }
  
  // Find maximum value
  findMax(root = this.root) {
    if (!root) return null;
    
    while (root.right) {
      root = root.right;
    }
    
    return root;
  }
  
  // Inorder traversal (gives sorted order)
  inorder(root = this.root, result = []) {
    if (!root) return result;
    
    this.inorder(root.left, result);
    result.push(root.val);
    this.inorder(root.right, result);
    
    return result;
  }
  
  // Validate BST
  isValidBST(root = this.root, min = -Infinity, max = Infinity) {
    if (!root) return true;
    
    if (root.val <= min || root.val >= max) {
      return false;
    }
    
    return this.isValidBST(root.left, min, root.val) &&
           this.isValidBST(root.right, root.val, max);
  }
}

// ============================================
// COMMON PROBLEMS
// ============================================

// 1. Validate BST
function isValidBST(root, min = -Infinity, max = Infinity) {
  if (!root) return true;
  
  if (root.val <= min || root.val >= max) {
    return false;
  }
  
  return isValidBST(root.left, min, root.val) &&
         isValidBST(root.right, root.val, max);
}

// 2. Search in BST
function searchBST(root, val) {
  if (!root) return null;
  
  if (root.val === val) {
    return root;
  } else if (val < root.val) {
    return searchBST(root.left, val);
  } else {
    return searchBST(root.right, val);
  }
}

// 3. Insert into BST
function insertIntoBST(root, val) {
  if (!root) {
    return new BSTNode(val);
  }
  
  if (val < root.val) {
    root.left = insertIntoBST(root.left, val);
  } else {
    root.right = insertIntoBST(root.right, val);
  }
  
  return root;
}

// 4. Delete node in BST
function deleteNode(root, key) {
  if (!root) return null;
  
  if (key < root.val) {
    root.left = deleteNode(root.left, key);
  } else if (key > root.val) {
    root.right = deleteNode(root.right, key);
  } else {
    // Node to delete
    
    if (!root.left) return root.right;
    if (!root.right) return root.left;
    
    // Two children: find inorder successor
    const successor = findMin(root.right);
    root.val = successor.val;
    root.right = deleteNode(root.right, successor.val);
  }
  
  return root;
}

function findMin(root) {
  while (root.left) {
    root = root.left;
  }
  return root;
}

// 5. Kth smallest element
function kthSmallest(root, k) {
  const stack = [];
  let current = root;
  let count = 0;
  
  while (current || stack.length > 0) {
    // Go to leftmost
    while (current) {
      stack.push(current);
      current = current.left;
    }
    
    // Process node
    current = stack.pop();
    count++;
    
    if (count === k) {
      return current.val;
    }
    
    // Go to right
    current = current.right;
  }
  
  return -1;
}

// 6. Lowest Common Ancestor (LCA)
function lowestCommonAncestor(root, p, q) {
  if (!root) return null;
  
  // Both in left subtree
  if (p.val < root.val && q.val < root.val) {
    return lowestCommonAncestor(root.left, p, q);
  }
  
  // Both in right subtree
  if (p.val > root.val && q.val > root.val) {
    return lowestCommonAncestor(root.right, p, q);
  }
  
  // LCA found (p and q on different sides)
  return root;
}

// 7. Range sum
function rangeSumBST(root, low, high) {
  if (!root) return 0;
  
  let sum = 0;
  
  if (root.val >= low && root.val <= high) {
    sum += root.val;
  }
  
  // Only traverse relevant subtrees
  if (root.val > low) {
    sum += rangeSumBST(root.left, low, high);
  }
  
  if (root.val < high) {
    sum += rangeSumBST(root.right, low, high);
  }
  
  return sum;
}

// 8. Convert sorted array to BST
function sortedArrayToBST(nums) {
  if (nums.length === 0) return null;
  
  function buildBST(left, right) {
    if (left > right) return null;
    
    const mid = Math.floor((left + right) / 2);
    const root = new BSTNode(nums[mid]);
    
    root.left = buildBST(left, mid - 1);
    root.right = buildBST(mid + 1, right);
    
    return root;
  }
  
  return buildBST(0, nums.length - 1);
}
```

---

## E) Internal Working

**BST Operations:**
- Insert: Compare and go left/right
- Search: Compare and traverse
- Delete: Handle 3 cases (no children, one child, two children)

**Time Complexity:**
- Balanced: O(log n)
- Unbalanced: O(n) worst case

---

## F) Interview Questions & Answers

### Q1: What is Binary Search Tree and how does it work?

**Answer:**
BST is binary tree where left subtree has values less than root, right subtree has values greater than root. Property maintained at every node. Operations: Search O(log n) - compare and go left/right, Insert O(log n) - find position and insert, Delete O(log n) - handle 3 cases. Inorder traversal gives sorted order. Can degrade to O(n) if unbalanced.

### Q2: How do you delete a node from BST?

**Answer:**
Delete has 3 cases: No children (leaf) - simply remove, One child - replace with child, Two children - find inorder successor (smallest in right subtree), replace node value with successor, delete successor. Inorder successor is leftmost node in right subtree. Time O(log n) for balanced, O(n) worst case.

### Q3: How do you validate if a tree is BST?

**Answer:**
Validate BST: For each node, value must be > min (from ancestors) and < max (from ancestors). Recursively check: root.val > min && root.val < max, then check left subtree with max = root.val, right subtree with min = root.val. Alternative: Inorder traversal should be sorted. Time O(n), Space O(h) for recursion.

---

## G) Common Mistakes

### Mistake 1: Not Handling Duplicates

```javascript
// ❌ WRONG - No duplicate handling
if (val < root.val) {
  root.left = insert(root.left, val);
} else {
  root.right = insert(root.right, val);
}

// ✅ CORRECT - Handle duplicates
if (val < root.val) {
  root.left = insert(root.left, val);
} else if (val > root.val) {
  root.right = insert(root.right, val);
} else {
  // Handle duplicate (don't insert or allow)
}
```

**Why it breaks:** Duplicates can break BST property if not handled.

---

## H) When to Use & When NOT to Use

Use BST for sorted data, fast search/insert/delete, dynamic sorted structure. Don't use when data already sorted (use array) or when tree becomes unbalanced (use balanced BST).

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain Binary Search Tree."

**You:**
"BST is binary tree where left subtree has values < root, right subtree has values > root. Property maintained at every node. Operations: Search O(log n) - compare and traverse, Insert O(log n) - find position, Delete O(log n) - handle 3 cases (no children, one child, two children).

Inorder traversal gives sorted order. Can degrade to O(n) if unbalanced. Use for sorted data, fast search. Validate by checking min/max constraints at each node."

---

## J) Mini Practice Task

Implement: Insert, search, delete, validate BST, find min/max, kth smallest, LCA, range sum, convert sorted array to BST.

---

**END OF TOPIC: BINARY SEARCH TREE (BST)**

