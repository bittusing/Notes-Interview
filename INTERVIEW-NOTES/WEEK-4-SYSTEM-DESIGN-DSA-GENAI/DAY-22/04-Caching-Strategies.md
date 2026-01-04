# CACHING STRATEGIES

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Caching kya hai?**
- Caching frequently accessed data ko fast storage mein store karta hai
- Database load reduce karta hai
- Response time improve karta hai
- Memory-based fast access
- Multiple caching strategies available

**Real-life Analogy:**
- Cache = Frequently used items nearby (desk drawer)
- Database = All items in storage room
- Fast access = Items from desk
- Slow access = Items from storage

**Caching Strategies:**

**1. Cache-Aside (Lazy Loading):**
- Application cache manage karta hai
- Check cache, if miss → database
- Store in cache after fetch
- Most common

**2. Write-Through:**
- Write cache + database simultaneously
- Cache always updated
- Slower writes, faster reads

**3. Write-Back (Write-Behind):**
- Write to cache first
- Later sync to database
- Fast writes, risk of data loss

**4. Refresh-Ahead:**
- Proactively refresh cache
- Before expiration
- Always fresh data

---

## B) Easy English Theory

### What is Caching?

Caching stores frequently accessed data in fast storage (memory) for quick access. Strategies: Cache-Aside (check cache, fetch from DB if miss), Write-Through (write to both cache and DB), Write-Back (write to cache, sync later), Refresh-Ahead (proactive refresh). Benefits: Reduced database load, faster responses, better performance.

---

## C) Why This Concept Exists

### The Problem

**Without Caching:**
- Database overload
- Slow responses
- Repeated queries
- Poor performance
- High costs

### The Solution

**Caching Provides:**
1. **Speed:** Fast memory access
2. **Efficiency:** Reduce database load
3. **Performance:** Better response times
4. **Cost:** Reduce database costs

---

## D) Practical Example (Code)

```javascript
// ============================================
// CACHE-ASIDE PATTERN
// ============================================

class CacheAsideService {
  constructor() {
    this.cache = new Map(); // In-memory cache
    this.database = new Database();
    this.ttl = 3600; // 1 hour
  }
  
  async getData(key) {
    // 1. Check cache
    const cached = this.cache.get(key);
    if (cached && !this.isExpired(cached)) {
      return cached.data; // Cache hit
    }
    
    // 2. Cache miss - fetch from database
    const data = await this.database.get(key);
    
    // 3. Store in cache
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
    
    return data;
  }
  
  async updateData(key, value) {
    // 1. Update database
    await this.database.update(key, value);
    
    // 2. Invalidate cache
    this.cache.delete(key);
    
    // Or update cache
    // this.cache.set(key, { data: value, timestamp: Date.now() });
  }
  
  isExpired(cached) {
    return Date.now() - cached.timestamp > this.ttl * 1000;
  }
}

// ============================================
// WRITE-THROUGH PATTERN
// ============================================

class WriteThroughService {
  constructor() {
    this.cache = new Map();
    this.database = new Database();
  }
  
  async writeData(key, value) {
    // Write to both simultaneously
    await Promise.all([
      this.cache.set(key, value),
      this.database.update(key, value)
    ]);
  }
  
  async getData(key) {
    // Check cache (always up-to-date)
    const cached = this.cache.get(key);
    if (cached) {
      return cached;
    }
    
    // Shouldn't happen in write-through
    // But fallback to database
    const data = await this.database.get(key);
    this.cache.set(key, data);
    return data;
  }
}

// ============================================
// WRITE-BACK PATTERN
// ============================================

class WriteBackService {
  constructor() {
    this.cache = new Map();
    this.database = new Database();
    this.pendingWrites = new Map();
    this.syncInterval = 5000; // 5 seconds
    this.startSync();
  }
  
  async writeData(key, value) {
    // Write to cache only (fast)
    this.cache.set(key, value);
    this.pendingWrites.set(key, value);
  }
  
  async getData(key) {
    // Check cache
    const cached = this.cache.get(key);
    if (cached) {
      return cached;
    }
    
    // Fallback to database
    const data = await this.database.get(key);
    this.cache.set(key, data);
    return data;
  }
  
  startSync() {
    setInterval(async () => {
      // Sync pending writes to database
      for (const [key, value] of this.pendingWrites]) {
        await this.database.update(key, value);
        this.pendingWrites.delete(key);
      }
    }, this.syncInterval);
  }
}

// ============================================
// REDIS CACHING
// ============================================

const redis = require('redis');
const client = redis.createClient();

class RedisCacheService {
  constructor() {
    this.redis = client;
    this.database = new Database();
  }
  
  async getData(key) {
    // Check Redis cache
    const cached = await this.redis.get(key);
    if (cached) {
      return JSON.parse(cached); // Cache hit
    }
    
    // Cache miss - fetch from database
    const data = await this.database.get(key);
    
    // Store in cache with TTL
    await this.redis.setEx(key, 3600, JSON.stringify(data));
    
    return data;
  }
  
  async updateData(key, value) {
    // Update database
    await this.database.update(key, value);
    
    // Update cache
    await this.redis.setEx(key, 3600, JSON.stringify(value));
  }
  
  async invalidateCache(key) {
    await this.redis.del(key);
  }
  
  async invalidatePattern(pattern) {
    const keys = await this.redis.keys(pattern);
    if (keys.length > 0) {
      await this.redis.del(...keys);
    }
  }
}

// ============================================
// MULTI-LEVEL CACHING
// ============================================

class MultiLevelCache {
  constructor() {
    this.l1Cache = new Map(); // In-memory (fast, small)
    this.l2Cache = new Redis(); // Redis (fast, larger)
    this.database = new Database();
  }
  
  async getData(key) {
    // Check L1 cache
    const l1 = this.l1Cache.get(key);
    if (l1) {
      return l1; // Fastest
    }
    
    // Check L2 cache
    const l2 = await this.l2Cache.get(key);
    if (l2) {
      // Promote to L1
      this.l1Cache.set(key, l2);
      return l2;
    }
    
    // Fetch from database
    const data = await this.database.get(key);
    
    // Store in both caches
    this.l1Cache.set(key, data);
    await this.l2Cache.set(key, data, 3600);
    
    return data;
  }
}

// ============================================
// CACHE INVALIDATION STRATEGIES
// ============================================

class CacheInvalidation {
  constructor() {
    this.cache = new Map();
    this.invalidationCallbacks = new Map();
  }
  
  // Time-based invalidation
  setWithTTL(key, value, ttl) {
    this.cache.set(key, { value, expiresAt: Date.now() + ttl });
  }
  
  // Event-based invalidation
  onDataChange(key, callback) {
    this.invalidationCallbacks.set(key, callback);
  }
  
  async invalidateOnUpdate(key) {
    this.cache.delete(key);
    const callback = this.invalidationCallbacks.get(key);
    if (callback) {
      await callback();
    }
  }
  
  // Pattern-based invalidation
  invalidatePattern(pattern) {
    for (const key of this.cache.keys()) {
      if (key.match(pattern)) {
        this.cache.delete(key);
      }
    }
  }
}

// ============================================
// CACHE WARMING
// ============================================

class CacheWarmer {
  constructor(cacheService) {
    this.cacheService = cacheService;
  }
  
  async warmCache() {
    // Pre-load frequently accessed data
    const popularKeys = await this.getPopularKeys();
    
    for (const key of popularKeys) {
      await this.cacheService.getData(key); // Loads into cache
    }
  }
  
  async getPopularKeys() {
    // Get top 100 most accessed keys
    return await this.database.getTopKeys(100);
  }
}
```

---

## E) Internal Working

**Caching Flow:**
1. Check cache (fast)
2. Cache hit: Return data
3. Cache miss: Fetch from database
4. Store in cache
5. Return data

**Invalidation:**
- Time-based (TTL)
- Event-based (on update)
- Manual (explicit delete)

---

## F) Interview Questions & Answers

### Q1: What are different caching strategies?

**Answer:**
Strategies: Cache-Aside (lazy loading - check cache, fetch from DB if miss, most common), Write-Through (write to both cache and DB simultaneously, cache always updated), Write-Back (write to cache first, sync to DB later, fast writes but risk), Refresh-Ahead (proactive refresh before expiration). Choose based on use case - Cache-Aside for most cases, Write-Through for consistency, Write-Back for write-heavy.

### Q2: How do you handle cache invalidation?

**Answer:**
Invalidation methods: Time-based (TTL - automatic expiration), Event-based (invalidate on data update), Manual (explicit delete), Pattern-based (invalidate matching keys). Best practice: Invalidate on update, use TTL as backup, use patterns for related data. Challenge: Stale data if not invalidated properly.

### Q3: What are cache hit and cache miss?

**Answer:**
Cache hit: Requested data found in cache (fast, no database query). Cache miss: Data not in cache (fetch from database, store in cache). Hit ratio = hits / (hits + misses). Higher hit ratio = better performance. Target: 80-90% hit ratio for good performance.

---

## G) Common Mistakes

### Mistake 1: No Cache Invalidation

```javascript
// ❌ WRONG - Stale data
await cache.set('user:123', userData);
// Update in database but cache not updated

// ✅ CORRECT - Invalidate on update
await database.update('user:123', newData);
await cache.delete('user:123'); // Invalidate
```

**Why it breaks:** Stale data served from cache, incorrect results.

---

## H) When to Use & When NOT to Use

Use caching for frequently accessed data, read-heavy workloads, expensive queries. Don't use for frequently changing data, write-heavy workloads, or when consistency is critical.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain Caching Strategies."

**You:**
"Caching stores frequently accessed data in fast memory. Strategies: Cache-Aside (check cache, fetch from DB if miss - most common), Write-Through (write to both simultaneously), Write-Back (write to cache, sync later), Refresh-Ahead (proactive refresh).

Handle invalidation: Time-based (TTL), event-based (on update), pattern-based. Cache hit = data in cache (fast), cache miss = fetch from DB. Target 80-90% hit ratio. Use for read-heavy, frequently accessed data."

---

## J) Mini Practice Task

Implement caching with Cache-Aside pattern, Redis, TTL, and proper invalidation on updates.

---

**END OF TOPIC: CACHING STRATEGIES**

