# CONSISTENCY MODELS

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Consistency Models kya hain?**
- Consistency Models define karte hain ki data kab consistent hona chahiye
- Distributed systems mein data multiple places par hota hai
- Different consistency levels available
- Trade-off between consistency aur performance
- CAP theorem se related

**Real-life Analogy:**
- Strong Consistency = Bank balance (always accurate)
- Eventual Consistency = Social media likes (eventually accurate)
- Weak Consistency = Cache (may be stale)

**Consistency Types:**

**1. Strong Consistency:**
- All reads latest write return karte hain
- All nodes same data dikhate hain
- Slower but accurate

**2. Eventual Consistency:**
- Eventually all nodes same data dikhayenge
- Temporary inconsistencies possible
- Faster but may show stale data

**3. Weak Consistency:**
- No guarantee of consistency
- Stale data possible
- Fastest

---

## B) Easy English Theory

### What are Consistency Models?

Consistency Models define when data should be consistent in distributed systems. Types: Strong Consistency (all reads return latest write, all nodes show same data - slower but accurate), Eventual Consistency (eventually all nodes show same data, temporary inconsistencies - faster but may show stale data), Weak Consistency (no guarantee, stale data possible - fastest). Choose based on use case requirements.

---

## C) Why This Concept Exists

### The Problem

**Without Consistency Models:**
- Data inconsistencies
- Confusion about data state
- Poor user experience
- System reliability issues

### The Solution

**Consistency Models Provide:**
1. **Clarity:** Clear expectations
2. **Trade-offs:** Balance consistency and performance
3. **Design:** System design decisions
4. **Reliability:** Predictable behavior

---

## D) Practical Example (Code)

```javascript
// ============================================
// STRONG CONSISTENCY
// ============================================

class StrongConsistentDatabase {
  constructor() {
    this.nodes = [
      { id: 1, data: new Map() },
      { id: 2, data: new Map() },
      { id: 3, data: new Map() }
  ];
  this.quorum = Math.floor(this.nodes.length / 2) + 1; // Majority
  }
  
  // Write to all nodes (synchronous)
  async write(key, value) {
    // Write to all nodes, wait for all
    const promises = this.nodes.map(node => 
      this.writeToNode(node, key, value)
    );
    
    // Wait for majority (quorum)
    const results = await Promise.all(promises);
    const successCount = results.filter(r => r.success).length;
    
    if (successCount < this.quorum) {
      throw new Error('Write failed - not enough nodes');
    }
    
    return { success: true };
  }
  
  // Read from all nodes, return latest
  async read(key) {
    // Read from all nodes
    const promises = this.nodes.map(node => 
      this.readFromNode(node, key)
    );
    
    const results = await Promise.all(promises);
    
    // Return value with highest version/timestamp
    const latest = results.reduce((latest, result) => {
      return result.timestamp > latest.timestamp ? result : latest;
    });
    
    return latest.value;
  }
  
  async writeToNode(node, key, value) {
    node.data.set(key, {
      value,
      timestamp: Date.now(),
      version: (node.data.get(key)?.version || 0) + 1
    });
    return { success: true };
  }
  
  async readFromNode(node, key) {
    const data = node.data.get(key);
    return {
      value: data?.value,
      timestamp: data?.timestamp || 0,
      version: data?.version || 0
    };
  }
}

// ============================================
// EVENTUAL CONSISTENCY
// ============================================

class EventuallyConsistentDatabase {
  constructor() {
    this.nodes = [
      { id: 1, data: new Map() },
      { id: 2, data: new Map() },
      { id: 3, data: new Map() }
    ];
  }
  
  // Write to one node (fast)
  async write(key, value) {
    // Write to primary node
    const primary = this.nodes[0];
    primary.data.set(key, {
      value,
      timestamp: Date.now(),
      version: (primary.data.get(key)?.version || 0) + 1
    });
    
    // Replicate asynchronously (don't wait)
    this.replicate(key, value).catch(error => {
      console.error('Replication failed:', error);
    });
    
    return { success: true };
  }
  
  // Read from any node (may be stale)
  async read(key) {
    // Read from nearest node (fast)
    const node = this.getNearestNode();
    const data = node.data.get(key);
    return data?.value;
  }
  
  // Asynchronous replication
  async replicate(key, value) {
    const primary = this.nodes[0];
    const primaryData = primary.data.get(key);
    
    // Replicate to other nodes
    for (let i = 1; i < this.nodes.length; i++) {
      try {
        this.nodes[i].data.set(key, primaryData);
      } catch (error) {
        // Continue with other nodes
      }
    }
  }
  
  getNearestNode() {
    // Simple: return first node
    // In production: return node with lowest latency
    return this.nodes[0];
  }
}

// ============================================
// READ-REPAIR (EVENTUAL CONSISTENCY)
// ============================================

class ReadRepairDatabase extends EventuallyConsistentDatabase {
  async read(key) {
    // Read from multiple nodes
    const promises = this.nodes.map(node => 
      this.readFromNode(node, key)
    );
    
    const results = await Promise.all(promises);
    
    // Find latest version
    const latest = results.reduce((latest, result) => {
      return result.version > latest.version ? result : latest;
    });
    
    // Repair nodes with stale data
    for (let i = 0; i < results.length; i++) {
      if (results[i].version < latest.version) {
        // Update stale node
        this.nodes[i].data.set(key, {
          value: latest.value,
          timestamp: latest.timestamp,
          version: latest.version
        });
      }
    }
    
    return latest.value;
  }
}

// ============================================
// CONSISTENCY LEVELS (CASSANDRA-STYLE)
// ============================================

class ConsistencyLevels {
  constructor() {
    this.nodes = [
      { id: 1, data: new Map() },
      { id: 2, data: new Map() },
      { id: 3, data: new Map() }
    ];
    this.replicationFactor = 3; // All nodes
  }
  
  // Write with consistency level
  async write(key, value, consistencyLevel) {
    if (consistencyLevel === 'ALL') {
      // Write to all replicas, wait for all
      return await this.writeAll(key, value);
    } else if (consistencyLevel === 'QUORUM') {
      // Write to majority
      return await this.writeQuorum(key, value);
    } else if (consistencyLevel === 'ONE') {
      // Write to one replica
      return await this.writeOne(key, value);
    }
  }
  
  async writeAll(key, value) {
    const promises = this.nodes.map(node => 
      this.writeToNode(node, key, value)
    );
    await Promise.all(promises);
    return { success: true };
  }
  
  async writeQuorum(key, value) {
    const quorum = Math.floor(this.nodes.length / 2) + 1;
    const promises = this.nodes.map(node => 
      this.writeToNode(node, key, value)
    );
    const results = await Promise.all(promises);
    const successCount = results.filter(r => r.success).length;
    
    if (successCount < quorum) {
      throw new Error('Quorum not reached');
    }
    return { success: true };
  }
  
  async writeOne(key, value) {
    await this.writeToNode(this.nodes[0], key, value);
    // Replicate asynchronously
    this.replicateAsync(key, value);
    return { success: true };
  }
  
  // Read with consistency level
  async read(key, consistencyLevel) {
    if (consistencyLevel === 'ALL') {
      // Read from all, return if all match
      return await this.readAll(key);
    } else if (consistencyLevel === 'QUORUM') {
      // Read from majority
      return await this.readQuorum(key);
    } else if (consistencyLevel === 'ONE') {
      // Read from one
      return await this.readOne(key);
    }
  }
  
  async readAll(key) {
    const promises = this.nodes.map(node => 
      this.readFromNode(node, key)
    );
    const results = await Promise.all(promises);
    
    // Check if all values match
    const firstValue = results[0].value;
    const allMatch = results.every(r => r.value === firstValue);
    
    if (!allMatch) {
      // Repair
      const latest = results.reduce((latest, r) => 
        r.version > latest.version ? r : latest
      );
      await this.repair(key, latest.value);
      return latest.value;
    }
    
    return firstValue;
  }
  
  async readQuorum(key) {
    const quorum = Math.floor(this.nodes.length / 2) + 1;
    const promises = this.nodes.map(node => 
      this.readFromNode(node, key)
    );
    const results = await Promise.all(promises);
    
    // Get majority value
    const valueCounts = new Map();
    results.forEach(r => {
      valueCounts.set(r.value, (valueCounts.get(r.value) || 0) + 1);
    });
    
    let maxCount = 0;
    let majorityValue = null;
    for (const [value, count] of valueCounts) {
      if (count >= quorum && count > maxCount) {
        maxCount = count;
        majorityValue = value;
      }
    }
    
    return majorityValue || results[0].value;
  }
  
  async readOne(key) {
    return await this.readFromNode(this.nodes[0], key);
  }
}
```

---

## E) Internal Working

**Strong Consistency:**
- Write to all nodes
- Wait for acknowledgment
- Read from all nodes
- Return latest value

**Eventual Consistency:**
- Write to primary
- Replicate asynchronously
- Read from any node
- May return stale data

---

## F) Interview Questions & Answers

### Q1: What are different consistency models?

**Answer:**
Models: Strong Consistency (all reads return latest write, all nodes show same data - slower but accurate, use for financial data), Eventual Consistency (eventually all nodes show same data, temporary inconsistencies - faster, use for social media, likes), Weak Consistency (no guarantee, stale data possible - fastest, use for caching). Choose based on use case requirements.

### Q2: What's the trade-off between consistency and performance?

**Answer:**
Trade-off: Strong consistency requires coordination (write to all nodes, wait for acknowledgment) - slower but accurate. Eventual consistency allows asynchronous replication - faster but may show stale data. Strong consistency: Better for financial, critical data. Eventual consistency: Better for social media, non-critical data. CAP theorem: Can't have all three (Consistency, Availability, Partition tolerance).

### Q3: How do you achieve eventual consistency?

**Answer:**
Achieve eventual consistency: Write to primary node (fast), replicate asynchronously to other nodes (don't wait), read from any node (may be stale), use read-repair (detect and fix inconsistencies on read), use version vectors (track versions, resolve conflicts), use conflict resolution (last-write-wins, merge strategies). Systems like DynamoDB, Cassandra use eventual consistency.

---

## G) Common Mistakes

### Mistake 1: Using Strong Consistency Everywhere

```javascript
// ❌ WRONG - Strong consistency for non-critical data
await strongConsistentDB.write('user:123:likes', count);
// Slow, unnecessary

// ✅ CORRECT - Eventual consistency for non-critical
await eventualConsistentDB.write('user:123:likes', count);
// Fast, acceptable for likes
```

**Why it breaks:** Unnecessary performance cost for non-critical data.

---

## H) When to Use & When NOT to Use

Use strong consistency for financial data, critical operations. Use eventual consistency for social media, non-critical data. Don't use strong consistency when performance is priority and eventual consistency is acceptable.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain Consistency Models."

**You:**
"Consistency models: Strong Consistency (all reads return latest write, all nodes show same data - slower but accurate, use for financial data), Eventual Consistency (eventually all nodes show same data, temporary inconsistencies - faster, use for social media), Weak Consistency (no guarantee - fastest, use for caching).

Trade-off: Strong consistency = slower but accurate, eventual consistency = faster but may show stale data. Choose based on use case. CAP theorem: Can't have all three (Consistency, Availability, Partition tolerance)."

---

## J) Mini Practice Task

Implement both strong and eventual consistency models. Compare performance and consistency guarantees.

---

**END OF TOPIC: CONSISTENCY MODELS**

