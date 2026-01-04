# TRIE (PREFIX TREE)

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Trie kya hai?**
- Trie (Prefix Tree) string storage ke liye tree structure hai
- Har node character represent karta hai
- Root se leaf tak path ek word banata hai
- Prefix sharing se space efficient
- Fast prefix search enable karta hai

**Real-life Analogy:**
- Trie = Dictionary organization
- Root = Starting point
- Path = Word formation
- Shared prefixes = Common beginnings
- Leaf = Word end marker

**Trie Structure:**
- Root node (empty)
- Each node has children (26 for lowercase letters)
- Path from root to node = prefix
- Mark word endings

**Trie Benefits:**
- **Fast Search:** O(m) where m is word length
- **Prefix Search:** Efficient
- **Space Efficient:** Shared prefixes
- **Auto-complete:** Perfect for suggestions

---

## B) Easy English Theory

### What is Trie?

Trie (Prefix Tree) is tree structure for storing strings. Each node represents character, path from root to node forms prefix/word. Benefits: Fast search O(m) where m is word length, efficient prefix search, space efficient (shared prefixes), perfect for auto-complete. Use for: Dictionary, prefix matching, auto-complete, IP routing.

---

## C) Why This Concept Exists

### The Problem

**Without Trie:**
- Slow string search
- Inefficient prefix matching
- No auto-complete support
- Space inefficient

### The Solution

**Trie Provides:**
1. **Fast Search:** O(m) word length
2. **Prefix Matching:** Efficient
3. **Auto-complete:** Natural support
4. **Space Efficiency:** Shared prefixes

---

## D) Practical Example (Code)

```javascript
// ============================================
// TRIE NODE
// ============================================

class TrieNode {
  constructor() {
    this.children = {}; // Character -> TrieNode
    this.isEndOfWord = false; // Marks word end
  }
}

// ============================================
// TRIE IMPLEMENTATION
// ============================================

class Trie {
  constructor() {
    this.root = new TrieNode();
  }
  
  // ============================================
  // INSERT
  // ============================================
  
  insert(word) {
    let current = this.root;
    
    for (let char of word) {
      // Create node if doesn't exist
      if (!current.children[char]) {
        current.children[char] = new TrieNode();
      }
      current = current.children[char];
    }
    
    // Mark end of word
    current.isEndOfWord = true;
    return this;
  }
  
  // ============================================
  // SEARCH
  // ============================================
  
  search(word) {
    let current = this.root;
    
    for (let char of word) {
      if (!current.children[char]) {
        return false; // Word not found
      }
      current = current.children[char];
    }
    
    return current.isEndOfWord; // Check if word ends here
  }
  
  // ============================================
  // STARTS WITH (PREFIX SEARCH)
  // ============================================
  
  startsWith(prefix) {
    let current = this.root;
    
    for (let char of prefix) {
      if (!current.children[char]) {
        return false; // Prefix not found
      }
      current = current.children[char];
    }
    
    return true; // Prefix exists
  }
  
  // ============================================
  // DELETE
  // ============================================
  
  delete(word) {
    return this.deleteNode(this.root, word, 0);
  }
  
  deleteNode(node, word, index) {
    if (!node) return false;
    
    // Base case: reached end of word
    if (index === word.length) {
      // If not end of word, can't delete
      if (!node.isEndOfWord) {
        return false;
      }
      
      // Mark as not end of word
      node.isEndOfWord = false;
      
      // Return true if node has no children
      return Object.keys(node.children).length === 0;
    }
    
    const char = word[index];
    const childNode = node.children[char];
    
    if (!childNode) {
      return false; // Word doesn't exist
    }
    
    // Recursively delete
    const shouldDeleteChild = this.deleteNode(childNode, word, index + 1);
    
    if (shouldDeleteChild) {
      delete node.children[char];
      
      // Return true if current node has no children and not end of word
      return Object.keys(node.children).length === 0 && !node.isEndOfWord;
    }
    
    return false;
  }
  
  // ============================================
  // GET ALL WORDS WITH PREFIX
  // ============================================
  
  getAllWordsWithPrefix(prefix) {
    let current = this.root;
    
    // Navigate to prefix
    for (let char of prefix) {
      if (!current.children[char]) {
        return []; // Prefix doesn't exist
      }
      current = current.children[char];
    }
    
    // Collect all words from this node
    const words = [];
    this.collectWords(current, prefix, words);
    return words;
  }
  
  collectWords(node, prefix, words) {
    if (node.isEndOfWord) {
      words.push(prefix);
    }
    
    for (let char in node.children) {
      this.collectWords(
        node.children[char],
        prefix + char,
        words
      );
    }
  }
  
  // ============================================
  // COUNT WORDS
  // ============================================
  
  countWords(node = this.root) {
    let count = 0;
    
    if (node.isEndOfWord) {
      count++;
    }
    
    for (let char in node.children) {
      count += this.countWords(node.children[char]);
    }
    
    return count;
  }
  
  // ============================================
  // LONGEST COMMON PREFIX
  // ============================================
  
  longestCommonPrefix() {
    let current = this.root;
    let prefix = '';
    
    // Traverse until node has more than one child or is end of word
    while (current && Object.keys(current.children).length === 1 && !current.isEndOfWord) {
      const char = Object.keys(current.children)[0];
      prefix += char;
      current = current.children[char];
    }
    
    return prefix;
  }
}

// ============================================
// USAGE EXAMPLE
// ============================================

const trie = new Trie();

trie.insert('apple');
trie.insert('app');
trie.insert('application');
trie.insert('apply');

console.log(trie.search('apple')); // true
console.log(trie.search('app')); // true
console.log(trie.search('appl')); // false (not a complete word)
console.log(trie.startsWith('app')); // true
console.log(trie.getAllWordsWithPrefix('app')); // ['app', 'apple', 'application', 'apply']

// ============================================
// COMMON PROBLEMS
// ============================================

// 1. Word Search II (Find all words in board)
function findWords(board, words) {
  const trie = new Trie();
  
  // Build trie from words
  for (let word of words) {
    trie.insert(word);
  }
  
  const result = [];
  const rows = board.length;
  const cols = board[0].length;
  
  function dfs(row, col, node, path) {
    const char = board[row][col];
    
    if (!node.children[char]) {
      return;
    }
    
    node = node.children[char];
    path += char;
    
    if (node.isEndOfWord) {
      result.push(path);
      node.isEndOfWord = false; // Avoid duplicates
    }
    
    // Mark as visited
    board[row][col] = '#';
    
    // Explore neighbors
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    for (let [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;
      
      if (newRow >= 0 && newRow < rows && 
          newCol >= 0 && newCol < cols && 
          board[newRow][newCol] !== '#') {
        dfs(newRow, newCol, node, path);
      }
    }
    
    // Backtrack
    board[row][col] = char;
  }
  
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      dfs(i, j, trie.root, '');
    }
  }
  
  return result;
}

// 2. Replace Words
function replaceWords(dictionary, sentence) {
  const trie = new Trie();
  
  // Build trie
  for (let word of dictionary) {
    trie.insert(word);
  }
  
  const words = sentence.split(' ');
  const result = [];
  
  for (let word of words) {
    let prefix = '';
    let current = trie.root;
    let found = false;
    
    for (let char of word) {
      if (!current.children[char]) {
        break;
      }
      current = current.children[char];
      prefix += char;
      
      if (current.isEndOfWord) {
        result.push(prefix);
        found = true;
        break;
      }
    }
    
    if (!found) {
      result.push(word); // Use original word
    }
  }
  
  return result.join(' ');
}
```

---

## E) Internal Working

**Trie Structure:**
- Root node (empty)
- Each node: children map + isEndOfWord flag
- Path = prefix/word
- Shared prefixes = common nodes

**Operations:**
- Insert: Traverse/create path, mark end
- Search: Traverse path, check isEndOfWord
- Prefix: Traverse path, return true if exists

---

## F) Interview Questions & Answers

### Q1: What is Trie and when would you use it?

**Answer:**
Trie (Prefix Tree) stores strings in tree structure. Each node represents character, path forms word. Benefits: Fast search O(m) word length, efficient prefix search, space efficient (shared prefixes), perfect for auto-complete. Use for: Dictionary, prefix matching, auto-complete, IP routing, word search problems.

### Q2: What are time complexities of Trie operations?

**Answer:**
Time complexities: Insert O(m) where m is word length - traverse/create path, Search O(m) - traverse path, Prefix search O(m) - traverse path, Delete O(m) - traverse and cleanup. Space: O(ALPHABET_SIZE * N * M) where N is number of words, M is average length. Trie efficient for string operations.

### Q3: How does Trie help with auto-complete?

**Answer:**
Auto-complete: User types prefix, navigate to prefix node in trie, collect all words from that node (DFS traversal), return suggestions. Trie naturally supports prefix search - just traverse to prefix node and collect all words below. Time O(m + k) where m is prefix length, k is number of suggestions.

---

## G) Common Mistakes

### Mistake 1: Not Marking Word End

```javascript
// ❌ WRONG - No end marker
current.children[char] = new TrieNode();
// Can't distinguish between prefix and word

// ✅ CORRECT - Mark end
current.isEndOfWord = true;
```

**Why it breaks:** Can't distinguish between prefix and complete word.

---

## H) When to Use & When NOT to Use

Use Trie for string search, prefix matching, auto-complete, dictionary. Don't use for simple string storage or when hash set sufficient.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain Trie."

**You:**
"Trie (Prefix Tree) stores strings in tree structure. Each node represents character, path from root forms word. Operations: Insert O(m), Search O(m), Prefix search O(m) where m is word length.

Benefits: Fast string search, efficient prefix matching, space efficient (shared prefixes), perfect for auto-complete. Use for dictionary, prefix matching, word search problems. Mark word endings with isEndOfWord flag."

---

## J) Mini Practice Task

Implement: Insert, search, prefix search, delete, get all words with prefix, word search in board, replace words.

---

**END OF TOPIC: TRIE (PREFIX TREE)**

