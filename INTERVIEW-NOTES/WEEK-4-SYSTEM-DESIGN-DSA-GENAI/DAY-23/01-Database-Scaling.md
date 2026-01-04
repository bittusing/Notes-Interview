# DATABASE SCALING

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Database Scaling kya hai?**
- Database Scaling database ko handle karne ki capacity increase karna hai
- More data, more queries handle kar sakte hain
- Performance maintain karta hai
- Multiple scaling strategies available

**Real-life Analogy:**
- Database = Library
- Scaling = More shelves, more books, faster access
- Vertical = Bigger library (same location)
- Horizontal = Multiple libraries (different locations)

**Scaling Types:**

**1. Vertical Scaling (Scale Up):**
- Database server ko powerful banate hain
- More CPU, RAM, Storage
- Single server
- Limited by hardware

**2. Horizontal Scaling (Scale Out):**
- Multiple database servers
- Sharding (data split)
- Replication (copies)
- Unlimited scaling

### Database Scaling Strategies

**1. Read Replicas:**
- Master-Slave architecture
- Writes to master
- Reads from replicas
- Load distribution

**2. Sharding:**
- Data ko partitions mein split
- Different shards different servers
- Horizontal scaling
- Query routing needed

**3. Partitioning:**
- Table ko partitions mein divide
- Same database, different partitions
- Better query performance

---

## B) Easy English Theory

### What is Database Scaling?

Database Scaling increases database capacity to handle more data and queries. Types: Vertical (upgrade single server), Horizontal (add more servers - sharding, replication). Strategies: Read Replicas (master-slave, distribute reads), Sharding (partition data across servers), Partitioning (divide tables). Choose based on use case.

---

## C) Why This Concept Exists

### The Problem

**Without Scaling:**
- Database overload
- Slow queries
- Single point of failure
- Limited capacity

### The Solution

**Database Scaling Provides:**
1. **Capacity:** Handle more data
2. **Performance:** Faster queries
3. **Availability:** No single point of failure
4. **Scalability:** Unlimited growth

---

## D) Practical Example (Code)

```javascript
// ============================================
// READ REPLICAS (MASTER-SLAVE)
// ============================================

class DatabaseCluster {
  constructor() {
    this.master = new Database('master-host', 3306);
    this.replicas = [
      new Database('replica1-host', 3306),
      new Database('replica2-host', 3306),
      new Database('replica3-host', 3306)
    ];
    this.replicaIndex = 0;
  }
  
  // Write to master
  async write(query, params) {
    return await this.master.execute(query, params);
  }
  
  // Read from replica (round-robin)
  async read(query, params) {
    const replica = this.getNextReplica();
    return await replica.execute(query, params);
  }
  
  getNextReplica() {
    const replica = this.replicas[this.replicaIndex];
    this.replicaIndex = (this.replicaIndex + 1) % this.replicas.length;
    return replica;
  }
}

// ============================================
// SHARDING
// ============================================

class ShardedDatabase {
  constructor() {
    this.shards = [
      { id: 0, host: 'shard0-host', range: [0, 1000000] },
      { id: 1, host: 'shard1-host', range: [1000000, 2000000] },
      { id: 2, host: 'shard2-host', range: [2000000, 3000000] },
      { id: 3, host: 'shard3-host', range: [3000000, 4000000] }
    ];
  }
  
  // Get shard for key
  getShard(key) {
    const hash = this.hash(key);
    for (const shard of this.shards) {
      if (hash >= shard.range[0] && hash < shard.range[1]) {
        return shard;
      }
    }
    return this.shards[0]; // Default
  }
  
  // Hash function
  hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = ((hash << 5) - hash) + key.charCodeAt(i);
      hash = hash & hash;
    }
    return Math.abs(hash) % 4000000;
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
  
  // Range query (multiple shards)
  async readRange(startKey, endKey) {
    const results = [];
    const shards = this.getShardsInRange(startKey, endKey);
    
    for (const shard of shards) {
      const db = new Database(shard.host);
      const shardResults = await db.find('users', {
        id: { $gte: startKey, $lte: endKey }
      });
      results.push(...shardResults);
    }
    
    return results;
  }
  
  getShardsInRange(startKey, endKey) {
    const startHash = this.hash(startKey);
    const endHash = this.hash(endKey);
    
    return this.shards.filter(shard => {
      return (shard.range[0] <= endHash && shard.range[1] >= startHash);
    });
  }
}

// ============================================
// RANGE-BASED SHARDING
// ============================================

class RangeSharding {
  constructor() {
    this.shards = [
      { id: 0, host: 'shard0', range: ['a', 'f'] },
      { id: 1, host: 'shard1', range: ['g', 'm'] },
      { id: 2, host: 'shard2', range: ['n', 's'] },
      { id: 3, host: 'shard3', range: ['t', 'z'] }
    ];
  }
  
  getShard(key) {
    const firstChar = key.charAt(0).toLowerCase();
    for (const shard of this.shards) {
      if (firstChar >= shard.range[0] && firstChar <= shard.range[1]) {
        return shard;
      }
    }
    return this.shards[0];
  }
}

// ============================================
// DIRECTORY-BASED SHARDING
// ============================================

class DirectorySharding {
  constructor() {
    this.shardMap = new Map(); // key -> shard mapping
    this.shards = [
      { id: 0, host: 'shard0' },
      { id: 1, host: 'shard1' },
      { id: 2, host: 'shard2' }
    ];
  }
  
  // Lookup shard for key
  getShard(key) {
    if (this.shardMap.has(key)) {
      return this.shardMap.get(key);
    }
    
    // Assign to shard (round-robin or based on load)
    const shard = this.selectShard(key);
    this.shardMap.set(key, shard);
    return shard;
  }
  
  selectShard(key) {
    // Simple round-robin
    const index = this.shardMap.size % this.shards.length;
    return this.shards[index];
  }
  
  // Rebalance (move data between shards)
  async rebalance() {
    // Analyze shard sizes
    const shardSizes = await this.getShardSizes();
    const avgSize = shardSizes.reduce((a, b) => a + b, 0) / shardSizes.length;
    
    // Move data from overloaded shards
    for (let i = 0; i < this.shards.length; i++) {
      if (shardSizes[i] > avgSize * 1.2) {
        await this.moveData(this.shards[i], avgSize);
      }
    }
  }
}

// ============================================
// CONSISTENT HASHING (FOR SHARDING)
// ============================================

class ConsistentHashing {
  constructor() {
    this.ring = new Map(); // hash -> shard
    this.shards = [];
    this.virtualNodes = 150; // Virtual nodes per shard
  }
  
  // Add shard
  addShard(shard) {
    this.shards.push(shard);
    
    // Add virtual nodes
    for (let i = 0; i < this.virtualNodes; i++) {
      const hash = this.hash(`${shard.id}-${i}`);
      this.ring.set(hash, shard);
    }
    
    // Sort ring
    this.ring = new Map([...this.ring.entries()].sort((a, b) => a[0] - b[0]));
  }
  
  // Remove shard
  removeShard(shardId) {
    this.shards = this.shards.filter(s => s.id !== shardId);
    
    // Remove virtual nodes
    for (let i = 0; i < this.virtualNodes; i++) {
      const hash = this.hash(`${shardId}-${i}`);
      this.ring.delete(hash);
    }
  }
  
  // Get shard for key
  getShard(key) {
    const hash = this.hash(key);
    const ringArray = Array.from(this.ring.keys());
    
    // Find first node >= hash
    for (const ringHash of ringArray) {
      if (ringHash >= hash) {
        return this.ring.get(ringHash);
      }
    }
    
    // Wrap around (first node)
    return this.ring.get(ringArray[0]);
  }
  
  hash(key) {
    // Simple hash (use better hash in production)
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = ((hash << 5) - hash) + key.charCodeAt(i);
      hash = hash & hash;
    }
    return Math.abs(hash) % 360; // 360 degrees on ring
  }
}

// ============================================
// DATABASE PARTITIONING
// ============================================

class PartitionedDatabase {
  constructor() {
    this.partitions = {
      '2023': new Database('partition-2023'),
      '2024': new Database('partition-2024'),
      '2025': new Database('partition-2025')
    };
  }
  
  // Get partition by date
  getPartition(date) {
    const year = new Date(date).getFullYear();
    return this.partitions[year] || this.partitions['2024'];
  }
  
  // Write to partition
  async write(data) {
    const partition = this.getPartition(data.createdAt);
    return await partition.insert('orders', data);
  }
  
  // Read from partition
  async read(date) {
    const partition = this.getPartition(date);
    return await partition.find('orders', { createdAt: date });
  }
  
  // Query across partitions
  async readRange(startDate, endDate) {
    const results = [];
    const startYear = new Date(startDate).getFullYear();
    const endYear = new Date(endDate).getFullYear();
    
    for (let year = startYear; year <= endYear; year++) {
      const partition = this.partitions[year];
      if (partition) {
        const partitionResults = await partition.find('orders', {
          createdAt: { $gte: startDate, $lte: endDate }
        });
        results.push(...partitionResults);
      }
    }
    
    return results;
  }
}
```

---

## E) Internal Working

**Read Replicas:**
- Master handles writes
- Replicas sync from master
- Reads distributed to replicas
- Load balancing

**Sharding:**
- Data partitioned by key
- Each shard on different server
- Query router directs requests
- Consistent hashing for distribution

---

## F) Interview Questions & Answers

### Q1: What are different database scaling strategies?

**Answer:**
Strategies: Read Replicas (master-slave, writes to master, reads from replicas, load distribution), Sharding (partition data across servers, horizontal scaling, query routing needed), Partitioning (divide tables, same database, better query performance). Choose based on use case - Replicas for read-heavy, Sharding for write-heavy, Partitioning for time-based data.

### Q2: What is sharding and how does it work?

**Answer:**
Sharding partitions data across multiple database servers. Each shard stores subset of data. Sharding strategies: Hash-based (hash key to determine shard), Range-based (key ranges to shards), Directory-based (lookup table). Query router directs requests to correct shard. Benefits: Horizontal scaling, load distribution. Challenges: Cross-shard queries, rebalancing, complexity.

### Q3: What is consistent hashing?

**Answer:**
Consistent hashing is hashing technique for distributed systems. Maps keys and servers to hash ring. Key maps to first server with hash >= key hash. Benefits: Minimal data movement when servers added/removed (only adjacent data moves), load distribution. Use virtual nodes for better distribution. Used in sharding, caching (Redis cluster), distributed systems.

---

## G) Common Mistakes

### Mistake 1: Hot Shards

```javascript
// ❌ WRONG - All popular data in one shard
// Shard 0: All users from US (hot shard)
// Shard 1-3: Other regions (cold shards)

// ✅ CORRECT - Distribute evenly
// Use consistent hashing or better distribution
const shard = consistentHashing.getShard(userId);
```

**Why it breaks:** One shard overloaded, others underutilized, poor performance.

---

## H) When to Use & When NOT to Use

Use read replicas for read-heavy workloads. Use sharding for write-heavy, large datasets. Use partitioning for time-based data. Don't shard prematurely - start with replicas.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain Database Scaling."

**You:**
"Database scaling strategies: Read Replicas (master-slave, writes to master, reads distributed to replicas - good for read-heavy), Sharding (partition data across servers - horizontal scaling, use hash/range/directory strategies, consistent hashing for minimal data movement), Partitioning (divide tables - good for time-based data).

Choose based on use case. Replicas for read scaling, Sharding for write scaling and large datasets, Partitioning for query performance. Challenges: Cross-shard queries, rebalancing, complexity."

---

## J) Mini Practice Task

Design sharded database: Implement consistent hashing, shard selection, query routing, handle cross-shard queries.

---

**END OF TOPIC: DATABASE SCALING**

