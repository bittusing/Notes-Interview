# SHARDING STRATEGIES

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Sharding Strategies kya hain?**
- Sharding Strategies data ko shards mein kaise divide kare
- Different strategies different use cases ke liye
- Key selection important hai
- Query patterns consider karte hain
- Rebalancing handle karna padta hai

**Real-life Analogy:**
- Sharding = Books ko shelves mein organize karna
- Strategy = Kaise organize (alphabetically, by topic, by size)
- Shard Key = Organizing criteria
- Rebalancing = Books ko rearrange karna

**Sharding Strategies:**

**1. Hash-Based Sharding:**
- Shard key ko hash karte hain
- Even distribution
- Random assignment

**2. Range-Based Sharding:**
- Key ranges to shards
- Sequential data
- Range queries efficient

**3. Directory-Based Sharding:**
- Lookup table use
- Flexible assignment
- Easy rebalancing

**4. Geographic Sharding:**
- Location-based
- Data locality
- Compliance

---

## B) Easy English Theory

### What are Sharding Strategies?

Sharding Strategies determine how data is partitioned across shards. Types: Hash-Based (hash shard key for even distribution), Range-Based (key ranges to shards, good for sequential data), Directory-Based (lookup table, flexible), Geographic (location-based, data locality). Choose based on query patterns, data distribution, rebalancing needs.

---

## C) Why This Concept Exists

### The Problem

**Without Strategy:**
- Uneven distribution
- Hot shards
- Poor query performance
- Difficult rebalancing

### The Solution

**Sharding Strategies Provide:**
1. **Distribution:** Even data spread
2. **Performance:** Optimized queries
3. **Flexibility:** Easy rebalancing
4. **Efficiency:** Better resource usage

---

## D) Practical Example (Code)

```javascript
// ============================================
// HASH-BASED SHARDING
// ============================================

class HashBasedSharding {
  constructor(numShards) {
    this.numShards = numShards;
    this.shards = [];
    for (let i = 0; i < numShards; i++) {
      this.shards.push({ id: i, host: `shard${i}-host` });
    }
  }
  
  // Get shard for key
  getShard(key) {
    const hash = this.hash(key);
    const shardId = hash % this.numShards;
    return this.shards[shardId];
  }
  
  // Hash function
  hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = ((hash << 5) - hash) + key.charCodeAt(i);
      hash = hash & hash;
    }
    return Math.abs(hash);
  }
  
  // Write to shard
  async write(key, data) {
    const shard = this.getShard(key);
    const db = new Database(shard.host);
    return await db.insert('users', { id: key, ...data });
  }
  
  // Read from shard
  async read(key) {
    const shard = this.getShard(key);
    const db = new Database(shard.host);
    return await db.findOne('users', { id: key });
  }
}

// ============================================
// RANGE-BASED SHARDING
// ============================================

class RangeBasedSharding {
  constructor() {
    this.shards = [
      { id: 0, host: 'shard0', range: [0, 1000000] },
      { id: 1, host: 'shard1', range: [1000000, 2000000] },
      { id: 2, host: 'shard2', range: [2000000, 3000000] },
      { id: 3, host: 'shard3', range: [3000000, 4000000] }
    ];
  }
  
  // Get shard for key
  getShard(key) {
    const numericKey = this.toNumeric(key);
    for (const shard of this.shards) {
      if (numericKey >= shard.range[0] && numericKey < shard.range[1]) {
        return shard;
      }
    }
    return this.shards[this.shards.length - 1]; // Default to last
  }
  
  toNumeric(key) {
    // Convert key to number
    if (typeof key === 'number') return key;
    return parseInt(key) || 0;
  }
  
  // Range query (efficient - single or few shards)
  async readRange(startKey, endKey) {
    const startNumeric = this.toNumeric(startKey);
    const endNumeric = this.toNumeric(endKey);
    
    const relevantShards = this.shards.filter(shard => {
      return (shard.range[0] <= endNumeric && shard.range[1] >= startNumeric);
    });
    
    const results = [];
    for (const shard of relevantShards) {
      const db = new Database(shard.host);
      const shardResults = await db.find('users', {
        id: { $gte: startKey, $lte: endKey }
      });
      results.push(...shardResults);
    }
    
    return results.sort((a, b) => a.id - b.id);
  }
}

// ============================================
// DIRECTORY-BASED SHARDING
// ============================================

class DirectoryBasedSharding {
  constructor() {
    this.shardMap = new Map(); // key -> shard mapping
    this.shards = [
      { id: 0, host: 'shard0', size: 0 },
      { id: 1, host: 'shard1', size: 0 },
      { id: 2, host: 'shard2', size: 0 }
    ];
  }
  
  // Lookup shard for key
  getShard(key) {
    if (this.shardMap.has(key)) {
      return this.shardMap.get(key);
    }
    
    // Assign to least loaded shard
    const shard = this.selectShard();
    this.shardMap.set(key, shard);
    shard.size++;
    return shard;
  }
  
  selectShard() {
    // Select shard with least data
    return this.shards.reduce((min, shard) => {
      return shard.size < min.size ? shard : min;
    });
  }
  
  // Rebalance (move data between shards)
  async rebalance() {
    const totalSize = this.shards.reduce((sum, s) => sum + s.size, 0);
    const targetSize = totalSize / this.shards.length;
    
    // Find overloaded and underloaded shards
    const overloaded = this.shards.filter(s => s.size > targetSize * 1.2);
    const underloaded = this.shards.filter(s => s.size < targetSize * 0.8);
    
    // Move data from overloaded to underloaded
    for (const overloadedShard of overloaded) {
      const excess = overloadedShard.size - targetSize;
      const keysToMove = await this.getKeysToMove(overloadedShard, excess);
      
      for (const key of keysToMove) {
        const targetShard = underloaded[0];
        await this.moveKey(key, overloadedShard, targetShard);
      }
    }
  }
  
  async moveKey(key, fromShard, toShard) {
    // Read from source
    const dbFrom = new Database(fromShard.host);
    const data = await dbFrom.findOne('users', { id: key });
    
    // Write to target
    const dbTo = new Database(toShard.host);
    await dbTo.insert('users', data);
    
    // Delete from source
    await dbFrom.delete('users', { id: key });
    
    // Update mapping
    this.shardMap.set(key, toShard);
    fromShard.size--;
    toShard.size++;
  }
}

// ============================================
// GEOGRAPHIC SHARDING
// ============================================

class GeographicSharding {
  constructor() {
    this.shards = {
      'us-east': { host: 'shard-us-east', region: 'US' },
      'us-west': { host: 'shard-us-west', region: 'US' },
      'eu': { host: 'shard-eu', region: 'EU' },
      'asia': { host: 'shard-asia', region: 'ASIA' }
    };
  }
  
  // Get shard by user location
  getShard(userLocation) {
    const region = this.getRegion(userLocation);
    return this.shards[region];
  }
  
  getRegion(location) {
    // Simple region mapping
    if (location.country === 'US') {
      return location.state === 'CA' ? 'us-west' : 'us-east';
    } else if (['UK', 'DE', 'FR'].includes(location.country)) {
      return 'eu';
    } else {
      return 'asia';
    }
  }
  
  // Write to regional shard
  async write(userId, userData) {
    const userLocation = userData.location;
    const shard = this.getShard(userLocation);
    const db = new Database(shard.host);
    return await db.insert('users', { id: userId, ...userData });
  }
}

// ============================================
// COMPOSITE SHARDING (MULTIPLE KEYS)
// ============================================

class CompositeSharding {
  constructor() {
    this.shards = [];
    for (let i = 0; i < 16; i++) {
      this.shards.push({ id: i, host: `shard${i}` });
    }
  }
  
  // Shard by multiple keys
  getShard(userId, tenantId) {
    // Combine keys for sharding
    const combinedKey = `${tenantId}:${userId}`;
    const hash = this.hash(combinedKey);
    return this.shards[hash % this.shards.length];
  }
  
  hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = ((hash << 5) - hash) + key.charCodeAt(i);
      hash = hash & hash;
    }
    return Math.abs(hash);
  }
}

// ============================================
// CONSISTENT HASHING FOR SHARDING
// ============================================

class ConsistentHashSharding {
  constructor() {
    this.ring = new Map();
    this.shards = [];
    this.virtualNodes = 150;
  }
  
  addShard(shard) {
    this.shards.push(shard);
    
    // Add virtual nodes
    for (let i = 0; i < this.virtualNodes; i++) {
      const hash = this.hash(`${shard.id}-vn${i}`);
      this.ring.set(hash, shard);
    }
    
    // Sort ring
    this.ring = new Map([...this.ring.entries()].sort((a, b) => a[0] - b[0]));
  }
  
  getShard(key) {
    const hash = this.hash(key);
    const ringArray = Array.from(this.ring.keys());
    
    // Find first node >= hash
    for (const ringHash of ringArray) {
      if (ringHash >= hash) {
        return this.ring.get(ringHash);
      }
    }
    
    // Wrap around
    return this.ring.get(ringArray[0]);
  }
  
  hash(key) {
    // Use better hash (MD5, SHA1, etc.) in production
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = ((hash << 5) - hash) + key.charCodeAt(i);
      hash = hash & hash;
    }
    return Math.abs(hash) % 360;
  }
}
```

---

## E) Internal Working

**Hash-Based:**
- Hash shard key
- Modulo to get shard
- Even distribution
- Random assignment

**Range-Based:**
- Key ranges mapped to shards
- Sequential queries efficient
- May cause hot shards

**Directory-Based:**
- Lookup table
- Flexible assignment
- Easy rebalancing

---

## F) Interview Questions & Answers

### Q1: What are different sharding strategies?

**Answer:**
Strategies: Hash-Based (hash shard key, even distribution, random assignment), Range-Based (key ranges to shards, good for sequential data, range queries efficient), Directory-Based (lookup table, flexible assignment, easy rebalancing), Geographic (location-based, data locality, compliance). Choose based on query patterns, data distribution, rebalancing needs.

### Q2: When would you use hash-based vs range-based sharding?

**Answer:**
Hash-Based: Even distribution, random assignment, good for uniform access patterns, simple implementation. Range-Based: Sequential data, range queries efficient, may cause hot shards if data not evenly distributed. Use hash for even distribution, range for sequential queries and time-series data.

### Q3: How do you handle rebalancing in sharding?

**Answer:**
Rebalancing: Monitor shard sizes, identify overloaded/underloaded shards, move data from overloaded to underloaded, update shard mappings, handle during move (read from both, write to new, delete from old), minimize downtime. Directory-based sharding makes rebalancing easier. Use consistent hashing to minimize data movement.

---

## G) Common Mistakes

### Mistake 1: Poor Shard Key Selection

```javascript
// ❌ WRONG - All data in one shard
// Shard key: status (all 'active' users in one shard)

// ✅ CORRECT - Better distribution
// Shard key: userId (hash distributes evenly)
const shard = hashBasedSharding.getShard(userId);
```

**Why it breaks:** Poor shard key causes hot shards, uneven distribution.

---

## H) When to Use & When NOT to Use

Use hash-based for even distribution. Use range-based for sequential data. Use directory-based for flexible rebalancing. Use geographic for data locality.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain Sharding Strategies."

**You:**
"Sharding strategies: Hash-Based (hash shard key for even distribution, random assignment), Range-Based (key ranges to shards, good for sequential data, range queries efficient), Directory-Based (lookup table, flexible, easy rebalancing), Geographic (location-based, data locality).

Choose based on query patterns and data distribution. Hash for even distribution, range for sequential queries, directory for flexibility. Handle rebalancing when shards become unbalanced."

---

## J) Mini Practice Task

Implement multiple sharding strategies: Hash-based, range-based, directory-based. Compare distribution and query performance.

---

**END OF TOPIC: SHARDING STRATEGIES**

