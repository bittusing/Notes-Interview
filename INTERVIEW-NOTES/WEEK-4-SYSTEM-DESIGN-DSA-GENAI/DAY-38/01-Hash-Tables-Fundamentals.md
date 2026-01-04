# HASH TABLES FUNDAMENTALS

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Hash Table kya hai?**
- Hash Table key-value pairs store karta hai
- Hash function key ko index mein convert karta hai
- O(1) average time for operations
- Collision handling important
- Most used data structure

**Real-life Analogy:**
- Hash Table = Library catalog
- Key = Book title
- Value = Book location
- Hash function = Catalog system
- Collision = Same shelf (multiple books)

**Hash Table Operations:**
- **Insert:** Add key-value pair
- **Get:** Retrieve value by key
- **Delete:** Remove key-value pair
- **Search:** Check if key exists

**Collision Handling:**
- **Chaining:** Linked list at each index
- **Open Addressing:** Find next available slot
- **Linear Probing:** Next slot
- **Quadratic Probing:** Quadratic steps

---

## B) Easy English Theory

### What is Hash Table?

Hash Table stores key-value pairs using hash function to map keys to indices. Operations: Insert O(1) average, Get O(1) average, Delete O(1) average. Collision handling: Chaining (linked list at index), Open Addressing (find next slot - linear/quadratic probing). Load factor important for performance. Most efficient for key-value lookups.

---

## C) Why This Concept Exists

### The Problem

**Without Hash Table:**
- Slow lookups O(n)
- No direct access
- Inefficient search
- Poor performance

### The Solution

**Hash Table Provides:**
1. **Fast Access:** O(1) average
2. **Efficiency:** Direct access
3. **Flexibility:** Key-value storage
4. **Performance:** Best for lookups

---

## D) Practical Example (Code)

```javascript
// ============================================
// HASH TABLE IMPLEMENTATION (CHAINING)
// ============================================

class HashTable {
  constructor(size = 16) {
    this.buckets = Array(size).fill(null).map(() => []);
    this.size = size;
    this.count = 0;
    this.loadFactor = 0.75; // Resize when 75% full
  }
  
  // Hash function
  hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = ((hash << 5) - hash) + key.charCodeAt(i);
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash) % this.size;
  }
  
  // Insert
  set(key, value) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    
    // Check if key exists
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value; // Update
        return this;
      }
    }
    
    // Add new
    bucket.push([key, value]);
    this.count++;
    
    // Resize if needed
    if (this.count / this.size > this.loadFactor) {
      this.resize();
    }
    
    return this;
  }
  
  // Get
  get(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    
    for (let pair of bucket) {
      if (pair[0] === key) {
        return pair[1];
      }
    }
    
    return undefined; // Not found
  }
  
  // Delete
  delete(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        this.count--;
        return true;
      }
    }
    
    return false; // Not found
  }
  
  // Check if exists
  has(key) {
    return this.get(key) !== undefined;
  }
  
  // Resize
  resize() {
    const oldBuckets = this.buckets;
    this.size *= 2;
    this.buckets = Array(this.size).fill(null).map(() => []);
    this.count = 0;
    
    // Rehash all entries
    for (let bucket of oldBuckets) {
      for (let [key, value] of bucket) {
        this.set(key, value);
      }
    }
  }
  
  // Get all keys
  keys() {
    const result = [];
    for (let bucket of this.buckets) {
      for (let [key] of bucket) {
        result.push(key);
      }
    }
    return result;
  }
  
  // Get all values
  values() {
    const result = [];
    for (let bucket of this.buckets) {
      for (let [, value] of bucket) {
        result.push(value);
      }
    }
    return result;
  }
}

// ============================================
// HASH TABLE (OPEN ADDRESSING - LINEAR PROBING)
// ============================================

class HashTableOpenAddressing {
  constructor(size = 16) {
    this.buckets = Array(size).fill(null);
    this.size = size;
    this.count = 0;
  }
  
  hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = ((hash << 5) - hash) + key.charCodeAt(i);
      hash = hash & hash;
    }
    return Math.abs(hash) % this.size;
  }
  
  // Linear probing
  findSlot(key) {
    let index = this.hash(key);
    let startIndex = index;
    
    // Find available slot or existing key
    while (this.buckets[index] !== null && this.buckets[index][0] !== key) {
      index = (index + 1) % this.size;
      
      // Full table
      if (index === startIndex) {
        return -1;
      }
    }
    
    return index;
  }
  
  set(key, value) {
    const index = this.findSlot(key);
    
    if (index === -1) {
      this.resize();
      return this.set(key, value);
    }
    
    if (this.buckets[index] === null) {
      this.count++;
    }
    
    this.buckets[index] = [key, value];
    return this;
  }
  
  get(key) {
    const index = this.findSlot(key);
    
    if (index === -1 || this.buckets[index] === null) {
      return undefined;
    }
    
    return this.buckets[index][1];
  }
  
  delete(key) {
    const index = this.findSlot(key);
    
    if (index === -1 || this.buckets[index] === null) {
      return false;
    }
    
    this.buckets[index] = null;
    this.count--;
    
    // Rehash following entries
    this.rehash();
    return true;
  }
  
  rehash() {
    // Rehash to handle deleted entries
    // Simplified version
  }
  
  resize() {
    const oldBuckets = this.buckets;
    this.size *= 2;
    this.buckets = Array(this.size).fill(null);
    this.count = 0;
    
    for (let entry of oldBuckets) {
      if (entry !== null) {
        this.set(entry[0], entry[1]);
      }
    }
  }
}

// ============================================
// COMMON PROBLEMS
// ============================================

// 1. Two Sum
function twoSum(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    
    map.set(nums[i], i);
  }
  
  return [];
}

// 2. Group Anagrams
function groupAnagrams(strs) {
  const map = new Map();
  
  for (let str of strs) {
    const key = str.split('').sort().join('');
    
    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key).push(str);
  }
  
  return Array.from(map.values());
}

// 3. Longest Consecutive Sequence
function longestConsecutive(nums) {
  const set = new Set(nums);
  let maxLength = 0;
  
  for (let num of set) {
    // Only start from beginning of sequence
    if (!set.has(num - 1)) {
      let current = num;
      let length = 1;
      
      while (set.has(current + 1)) {
        current++;
        length++;
      }
      
      maxLength = Math.max(maxLength, length);
    }
  }
  
  return maxLength;
}

// 4. Contains Duplicate
function containsDuplicate(nums) {
  const set = new Set();
  
  for (let num of nums) {
    if (set.has(num)) {
      return true;
    }
    set.add(num);
  }
  
  return false;
}

// 5. First Unique Character
function firstUniqChar(s) {
  const map = new Map();
  
  // Count frequencies
  for (let char of s) {
    map.set(char, (map.get(char) || 0) + 1);
  }
  
  // Find first unique
  for (let i = 0; i < s.length; i++) {
    if (map.get(s[i]) === 1) {
      return i;
    }
  }
  
  return -1;
}
```

---

## E) Internal Working

**Hash Function:**
- Maps key to index
- Should distribute evenly
- Fast computation
- Minimize collisions

**Collision Handling:**
- Chaining: Linked list
- Open Addressing: Next slot
- Load factor: n/m (n=entries, m=buckets)

---

## F) Interview Questions & Answers

### Q1: What is Hash Table and how does it work?

**Answer:**
Hash Table stores key-value pairs. Hash function maps key to index. Operations: Insert O(1) average (hash + insert), Get O(1) average (hash + search bucket), Delete O(1) average. Collision handling: Chaining (linked list at index), Open Addressing (find next slot). Load factor (n/m) affects performance - keep < 0.75 for good performance.

### Q2: How do you handle collisions in Hash Table?

**Answer:**
Collision handling: Chaining (linked list at each index - simple, handles many collisions, extra memory), Open Addressing (find next available slot - Linear Probing (next slot), Quadratic Probing (quadratic steps), Double Hashing (second hash function)). Chaining simpler, Open Addressing better cache performance. Choose based on use case.

### Q3: What is load factor and why is it important?

**Answer:**
Load factor = n/m (number of entries / number of buckets). Important because: High load factor (> 0.75) causes more collisions, performance degrades, need to resize. Low load factor (< 0.25) wastes memory. Optimal around 0.5-0.75. Resize when load factor exceeds threshold (typically double size, rehash all entries).

---

## G) Common Mistakes

### Mistake 1: Not Handling Collisions

```javascript
// ❌ WRONG - No collision handling
buckets[index] = value;
// Overwrites if collision

// ✅ CORRECT - Handle collisions
buckets[index].push([key, value]); // Chaining
// Or find next slot (Open Addressing)
```

**Why it breaks:** Data loss on collisions.

---

## H) When to Use & When NOT to Use

Use Hash Table for key-value lookups, fast access, frequency counting, duplicate detection. Don't use when need ordered data (use tree) or when memory is critical.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain Hash Table."

**You:**
"Hash Table stores key-value pairs. Hash function maps key to index. Operations: Insert/Get/Delete O(1) average. Collision handling: Chaining (linked list) or Open Addressing (next slot).

Load factor = n/m, keep < 0.75 for performance. Resize when threshold exceeded. Use for fast lookups, frequency counting. Most efficient for key-value operations."

---

## J) Mini Practice Task

Implement: Hash Table with chaining, collision handling, resize, two sum, group anagrams, longest consecutive sequence.

---

**END OF TOPIC: HASH TABLES FUNDAMENTALS**

