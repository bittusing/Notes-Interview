# HASHING TECHNIQUES

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Hashing Techniques kya hain?**
- Hashing Techniques keys ko indices mein convert karne ke methods hain
- Good hash function important hai
- Even distribution chahiye
- Collision minimize karna hai
- Different techniques different scenarios ke liye

**Real-life Analogy:**
- Hash Function = Address system
- Good hash = Even distribution (no crowded areas)
- Bad hash = Clustering (all in one place)
- Collision = Same address (multiple items)

**Hash Function Properties:**
- **Deterministic:** Same key → same hash
- **Uniform Distribution:** Even spread
- **Fast Computation:** O(1) or O(k) where k is key length
- **Minimize Collisions:** Few collisions

**Common Techniques:**
- **Division Method:** key % m
- **Multiplication Method:** (key * A) % 2^w >> (w - r)
- **Universal Hashing:** Random hash function
- **Perfect Hashing:** No collisions

---

## B) Easy English Theory

### What are Hashing Techniques?

Hashing Techniques convert keys to indices. Good hash function: Deterministic (same key → same hash), uniform distribution (even spread), fast computation, minimizes collisions. Methods: Division (key % m), Multiplication (mathematical), Universal (random), Perfect (no collisions). Choose based on key type and requirements.

---

## C) Why This Concept Exists

### The Problem

**Without Good Hashing:**
- Many collisions
- Poor distribution
- Degraded performance
- Clustering

### The Solution

**Hashing Techniques Provide:**
1. **Distribution:** Even spread
2. **Performance:** Few collisions
3. **Efficiency:** Fast computation
4. **Reliability:** Consistent hashing

---

## D) Practical Example (Code)

```javascript
// ============================================
// DIVISION METHOD
// ============================================

function hashDivision(key, size) {
  return key % size;
}

// Simple but can cause clustering if size has common factors with keys

// ============================================
// MULTIPLICATION METHOD
// ============================================

function hashMultiplication(key, size) {
  const A = 0.6180339887; // (√5 - 1) / 2 (golden ratio)
  return Math.floor(size * ((key * A) % 1));
}

// Better distribution than division

// ============================================
// STRING HASHING
// ============================================

// Polynomial rolling hash
function hashString(str, size) {
  let hash = 0;
  const p = 31; // Prime number
  const m = size;
  let power = 1;
  
  for (let i = 0; i < str.length; i++) {
    hash = (hash + (str.charCodeAt(i) - 'a'.charCodeAt(0) + 1) * power) % m;
    power = (power * p) % m;
  }
  
  return hash;
}

// ============================================
// DJB2 HASH (POPULAR STRING HASH)
// ============================================

function djb2Hash(str, size) {
  let hash = 5381;
  
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i);
  }
  
  return Math.abs(hash) % size;
}

// ============================================
// FNV-1a HASH
// ============================================

function fnv1aHash(str, size) {
  const FNV_OFFSET_BASIS = 2166136261;
  const FNV_PRIME = 16777619;
  
  let hash = FNV_OFFSET_BASIS;
  
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = (hash * FNV_PRIME) >>> 0; // Unsigned 32-bit
  }
  
  return hash % size;
}

// ============================================
// DOUBLE HASHING (FOR OPEN ADDRESSING)
// ============================================

class DoubleHashTable {
  constructor(size) {
    this.size = size;
    this.buckets = Array(size).fill(null);
  }
  
  hash1(key) {
    return key % this.size;
  }
  
  hash2(key) {
    return 1 + (key % (this.size - 1)); // Must be coprime with size
  }
  
  findSlot(key) {
    let index = this.hash1(key);
    const step = this.hash2(key);
    
    while (this.buckets[index] !== null && this.buckets[index][0] !== key) {
      index = (index + step) % this.size;
    }
    
    return index;
  }
}

// ============================================
// CONSISTENT HASHING
// ============================================

class ConsistentHash {
  constructor() {
    this.ring = new Map(); // hash -> server
    this.servers = [];
    this.virtualNodes = 150; // Virtual nodes per server
  }
  
  hash(key) {
    // Use MD5 or SHA1 in production
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = ((hash << 5) - hash) + key.charCodeAt(i);
      hash = hash & hash;
    }
    return Math.abs(hash) % 360; // 360 degrees
  }
  
  addServer(server) {
    this.servers.push(server);
    
    // Add virtual nodes
    for (let i = 0; i < this.virtualNodes; i++) {
      const hash = this.hash(`${server}-vn${i}`);
      this.ring.set(hash, server);
    }
    
    // Sort ring
    this.ring = new Map([...this.ring.entries()].sort((a, b) => a[0] - b[0]));
  }
  
  getServer(key) {
    const hash = this.hash(key);
    const ringArray = Array.from(this.ring.keys());
    
    // Find first server >= hash
    for (let ringHash of ringArray) {
      if (ringHash >= hash) {
        return this.ring.get(ringHash);
      }
    }
    
    // Wrap around
    return this.ring.get(ringArray[0]);
  }
}

// ============================================
// PERFECT HASHING
// ============================================

// For small static sets, can create perfect hash (no collisions)
// More complex, requires preprocessing

// ============================================
// BLOOM FILTER (PROBABILISTIC HASHING)
// ============================================

class BloomFilter {
  constructor(size, hashFunctions) {
    this.bitArray = Array(size).fill(0);
    this.size = size;
    this.hashFunctions = hashFunctions;
  }
  
  hash(key, seed) {
    let hash = seed;
    for (let char of key) {
      hash = ((hash << 5) - hash) + char.charCodeAt(0);
      hash = hash & hash;
    }
    return Math.abs(hash) % this.size;
  }
  
  add(key) {
    for (let i = 0; i < this.hashFunctions; i++) {
      const index = this.hash(key, i);
      this.bitArray[index] = 1;
    }
  }
  
  mightContain(key) {
    for (let i = 0; i < this.hashFunctions; i++) {
      const index = this.hash(key, i);
      if (this.bitArray[index] === 0) {
        return false; // Definitely not present
      }
    }
    return true; // Might be present (false positives possible)
  }
}
```

---

## E) Internal Working

**Hash Function Design:**
- Key analysis
- Distribution testing
- Collision minimization
- Fast computation

**Consistent Hashing:**
- Hash ring
- Virtual nodes
- Minimal rehashing
- Load distribution

---

## F) Interview Questions & Answers

### Q1: What makes a good hash function?

**Answer:**
Good hash function: Deterministic (same key → same hash always), uniform distribution (keys spread evenly across buckets), fast computation (O(1) or O(k) where k is key length), minimizes collisions. Avoid: Patterns in keys causing clustering, slow computation, non-uniform distribution. Test distribution and collision rate.

### Q2: What is consistent hashing?

**Answer:**
Consistent hashing maps keys and servers to hash ring. Key maps to first server with hash >= key hash. Benefits: Minimal rehashing when servers added/removed (only adjacent data moves), load distribution. Use virtual nodes for better distribution. Used in distributed systems, caching (Redis cluster), load balancing.

### Q3: What is a Bloom Filter?

**Answer:**
Bloom Filter is probabilistic data structure using multiple hash functions and bit array. Operations: Add (set bits for all hash functions), Check (if all bits set, might be present - false positives possible, if any bit 0, definitely not present - no false negatives). Space efficient, fast, but false positives possible. Use for: Quick existence check, reduce expensive lookups.

---

## G) Common Mistakes

### Mistake 1: Poor Hash Function

```javascript
// ❌ WRONG - Poor distribution
function hash(key, size) {
  return key.length % size;
  // All same-length keys collide
}

// ✅ CORRECT - Better distribution
function hash(key, size) {
  let hash = 0;
  for (let char of key) {
    hash = ((hash << 5) - hash) + char.charCodeAt(0);
  }
  return Math.abs(hash) % size;
}
```

**Why it breaks:** Poor distribution causes many collisions.

---

## H) When to Use & When NOT to Use

Use good hash functions for even distribution. Use consistent hashing for distributed systems. Use Bloom Filter for quick existence checks. Don't use poor hash functions.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain Hashing Techniques."

**You:"
"Good hash function: Deterministic, uniform distribution, fast computation, minimizes collisions. Methods: Division (key % m), Multiplication (better distribution), String hashing (polynomial rolling, DJB2).

Consistent hashing: Maps to hash ring, minimal rehashing on server changes, use virtual nodes. Bloom Filter: Probabilistic, multiple hash functions, space efficient, false positives possible but no false negatives."

---

## J) Mini Practice Task

Implement: Different hash functions, test distribution, consistent hashing, Bloom Filter, compare collision rates.

---

**END OF TOPIC: HASHING TECHNIQUES**

