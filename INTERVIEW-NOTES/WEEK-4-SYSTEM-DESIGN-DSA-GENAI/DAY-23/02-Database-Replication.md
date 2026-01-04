# DATABASE REPLICATION

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Database Replication kya hai?**
- Database Replication data ko multiple servers par copy karta hai
- High availability provide karta hai
- Read performance improve karta hai
- Backup automatically
- Multiple replication strategies

**Real-life Analogy:**
- Replication = Document ki multiple copies
- Master = Original document
- Replicas = Copies (different locations)
- If original lost, copies available

**Replication Types:**

**1. Master-Slave (Primary-Secondary):**
- One master (writes)
- Multiple slaves (reads)
- Master se slaves sync
- Most common

**2. Master-Master (Multi-Master):**
- Multiple masters
- All can write
- Complex conflict resolution
- Less common

**3. Synchronous Replication:**
- Write completes when all replicas updated
- Strong consistency
- Slower writes

**4. Asynchronous Replication:**
- Write completes immediately
- Replicas update later
- Faster writes, eventual consistency

---

## B) Easy English Theory

### What is Database Replication?

Database Replication copies data to multiple servers. Types: Master-Slave (one master for writes, multiple slaves for reads), Master-Master (multiple masters, all can write). Sync modes: Synchronous (write waits for all replicas - strong consistency), Asynchronous (write completes immediately - eventual consistency). Benefits: High availability, read scaling, automatic backup.

---

## C) Why This Concept Exists

### The Problem

**Without Replication:**
- Single point of failure
- No backup
- Limited read capacity
- Poor availability

### The Solution

**Replication Provides:**
1. **Availability:** No single point of failure
2. **Performance:** Read scaling
3. **Backup:** Automatic copies
4. **Disaster Recovery:** Data recovery

---

## D) Practical Example (Code)

```javascript
// ============================================
// MASTER-SLAVE REPLICATION
// ============================================

class MasterSlaveReplication {
  constructor() {
    this.master = new Database('master-host', 3306);
    this.slaves = [
      new Database('slave1-host', 3306),
      new Database('slave2-host', 3306),
      new Database('slave3-host', 3306)
    ];
    this.slaveIndex = 0;
  }
  
  // Write to master
  async write(query, params) {
    // All writes go to master
    const result = await this.master.execute(query, params);
    
    // Master automatically replicates to slaves (async)
    // Or trigger replication manually
    
    return result;
  }
  
  // Read from slave (round-robin)
  async read(query, params) {
    const slave = this.getNextSlave();
    try {
      return await slave.execute(query, params);
    } catch (error) {
      // Slave failed, try master
      console.log('Slave failed, using master');
      return await this.master.execute(query, params);
    }
  }
  
  getNextSlave() {
    const slave = this.slaves[this.slaveIndex];
    this.slaveIndex = (this.slaveIndex + 1) % this.slaves.length;
    return slave;
  }
  
  // Check replication lag
  async checkReplicationLag() {
    const masterPosition = await this.master.getBinlogPosition();
    const lags = [];
    
    for (const slave of this.slaves) {
      const slavePosition = await slave.getBinlogPosition();
      const lag = masterPosition - slavePosition;
      lags.push({ slave: slave.host, lag });
    }
    
    return lags;
  }
}

// ============================================
// SYNCHRONOUS REPLICATION
// ============================================

class SynchronousReplication {
  constructor() {
    this.master = new Database('master');
    this.replicas = [
      new Database('replica1'),
      new Database('replica2')
    ];
  }
  
  // Write waits for all replicas
  async write(query, params) {
    // Write to master
    const masterResult = await this.master.execute(query, params);
    
    // Wait for all replicas to confirm
    await Promise.all(
      this.replicas.map(replica => 
        replica.replicate(query, params)
      )
    );
    
    return masterResult;
  }
}

// ============================================
// ASYNCHRONOUS REPLICATION
// ============================================

class AsynchronousReplication {
  constructor() {
    this.master = new Database('master');
    this.replicas = [
      new Database('replica1'),
      new Database('replica2')
    ];
  }
  
  // Write completes immediately
  async write(query, params) {
    // Write to master (returns immediately)
    const result = await this.master.execute(query, params);
    
    // Replicate asynchronously (don't wait)
    this.replicas.forEach(replica => {
      replica.replicate(query, params).catch(error => {
        console.error('Replication failed:', error);
        // Handle replication failure
      });
    });
    
    return result;
  }
}

// ============================================
// MASTER-MASTER REPLICATION
// ============================================

class MasterMasterReplication {
  constructor() {
    this.masters = [
      { id: 'master1', db: new Database('master1-host') },
      { id: 'master2', db: new Database('master2-host') }
    ];
    this.conflictResolver = new ConflictResolver();
  }
  
  // Write to any master
  async write(masterId, query, params) {
    const master = this.masters.find(m => m.id === masterId);
    const result = await master.db.execute(query, params);
    
    // Replicate to other masters
    const otherMasters = this.masters.filter(m => m.id !== masterId);
    for (const otherMaster of otherMasters) {
      try {
        await otherMaster.db.replicate(query, params);
      } catch (error) {
        // Handle conflict
        await this.conflictResolver.resolve(master, otherMaster, query, params);
      }
    }
    
    return result;
  }
  
  // Read from any master
  async read(masterId, query, params) {
    const master = this.masters.find(m => m.id === masterId);
    return await master.db.execute(query, params);
  }
}

// ============================================
// REPLICATION LAG MONITORING
// ============================================

class ReplicationMonitor {
  constructor(replication) {
    this.replication = replication;
    this.maxLag = 1000; // 1 second max lag
  }
  
  async monitor() {
    setInterval(async () => {
      const lags = await this.replication.checkReplicationLag();
      
      for (const lagInfo of lags) {
        if (lagInfo.lag > this.maxLag) {
          console.warn(`High replication lag on ${lagInfo.slave}: ${lagInfo.lag}ms`);
          // Alert or take action
        }
      }
    }, 5000); // Check every 5 seconds
  }
  
  // Get healthy slaves (low lag)
  async getHealthySlaves() {
    const lags = await this.replication.checkReplicationLag();
    return lags
      .filter(lag => lag.lag <= this.maxLag)
      .map(lag => lag.slave);
  }
}

// ============================================
// FAILOVER HANDLING
// ============================================

class FailoverHandler {
  constructor(replication) {
    this.replication = replication;
    this.healthCheckInterval = 5000;
  }
  
  async startMonitoring() {
    setInterval(async () => {
      const isMasterHealthy = await this.checkMasterHealth();
      
      if (!isMasterHealthy) {
        await this.promoteSlaveToMaster();
      }
    }, this.healthCheckInterval);
  }
  
  async checkMasterHealth() {
    try {
      await this.replication.master.ping();
      return true;
    } catch (error) {
      return false;
    }
  }
  
  async promoteSlaveToMaster() {
    // Select best slave (lowest lag, most up-to-date)
    const bestSlave = await this.selectBestSlave();
    
    // Promote to master
    await bestSlave.promoteToMaster();
    
    // Update replication configuration
    this.replication.master = bestSlave;
    this.replication.slaves = this.replication.slaves.filter(s => s !== bestSlave);
    
    console.log('Failover completed: Slave promoted to master');
  }
  
  async selectBestSlave() {
    const lags = await this.replication.checkReplicationLag();
    const sorted = lags.sort((a, b) => a.lag - b.lag);
    return this.replication.slaves.find(s => s.host === sorted[0].slave);
  }
}

// ============================================
// READ-ONLY REPLICAS
// ============================================

class ReadOnlyReplicas {
  constructor() {
    this.master = new Database('master');
    this.readReplicas = [
      new Database('replica1', { readOnly: true }),
      new Database('replica2', { readOnly: true })
    ];
  }
  
  // Route reads to replicas
  async read(query, params) {
    // Check if query is read-only
    if (this.isReadOnly(query)) {
      const replica = this.selectReplica();
      return await replica.execute(query, params);
    } else {
      // Write queries go to master
      return await this.master.execute(query, params);
    }
  }
  
  isReadOnly(query) {
    const readKeywords = ['SELECT', 'SHOW', 'DESCRIBE'];
    return readKeywords.some(keyword => 
      query.toUpperCase().startsWith(keyword)
    );
  }
  
  selectReplica() {
    // Round-robin or least loaded
    const index = Math.floor(Math.random() * this.readReplicas.length);
    return this.readReplicas[index];
  }
}
```

---

## E) Internal Working

**Master-Slave Replication:**
- Master handles writes
- Changes logged (binlog)
- Slaves read binlog
- Apply changes to slaves
- Async or sync

**Replication Lag:**
- Time between master write and slave apply
- Monitor lag
- High lag = stale reads
- Failover considerations

---

## F) Interview Questions & Answers

### Q1: What is database replication and why use it?

**Answer:**
Database replication copies data to multiple servers. Types: Master-Slave (one master for writes, multiple slaves for reads), Master-Master (multiple masters, all can write). Benefits: High availability (no single point of failure), read scaling (distribute reads), automatic backup, disaster recovery. Use for production systems requiring availability and performance.

### Q2: What's the difference between synchronous and asynchronous replication?

**Answer:**
Synchronous replication: Write completes only when all replicas updated - strong consistency, slower writes, higher latency. Asynchronous replication: Write completes immediately, replicas update later - faster writes, eventual consistency, replication lag possible. Choose based on consistency needs - sync for strong consistency, async for performance.

### Q3: How do you handle replication lag?

**Answer:**
Handle lag: Monitor lag (check binlog positions), set max acceptable lag, route critical reads to master if lag too high, use read replicas for non-critical reads, implement failover if lag too high. Replication lag causes stale reads - acceptable for some use cases, not for others. Monitor and alert on high lag.

---

## G) Common Mistakes

### Mistake 1: Reading from Stale Replicas

```javascript
// ❌ WRONG - Read from replica immediately after write
await master.write(data);
const result = await replica.read(data.id); // May be stale

// ✅ CORRECT - Read from master for consistency
await master.write(data);
const result = await master.read(data.id); // Always fresh
```

**Why it breaks:** Replication lag causes stale reads, incorrect data.

---

## H) When to Use & When NOT to Use

Use replication for high availability, read scaling, backup. Use async for performance, sync for consistency. Don't use for single-server systems or when complexity not needed.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain Database Replication."

**You:**
"Database replication copies data to multiple servers. Types: Master-Slave (one master for writes, slaves for reads - most common), Master-Master (multiple masters, all can write - complex). Sync modes: Synchronous (write waits for replicas - strong consistency, slower), Asynchronous (write completes immediately - faster, eventual consistency, replication lag).

Benefits: High availability, read scaling, automatic backup. Monitor replication lag, handle failover. Use for production systems requiring availability and performance."

---

## J) Mini Practice Task

Implement master-slave replication: Write to master, read from slaves, monitor replication lag, handle failover.

---

**END OF TOPIC: DATABASE REPLICATION**

