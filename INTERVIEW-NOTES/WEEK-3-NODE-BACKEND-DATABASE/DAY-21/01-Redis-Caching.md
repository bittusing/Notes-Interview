# REDIS CACHING

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Redis Caching kya hai?**
- Redis in-memory data store hai
- Fast key-value storage
- Caching ke liye perfect
- Database load reduce karta hai
- Response time improve karta hai

**Real-life Analogy:**
- Library mein book shelf (cache)
- Frequently used books nearby (cached data)
- Rare books storage room (database)
- Fast access (cache hit)
- Slow access (cache miss)

**Caching Strategy:**
- **Cache-Aside:** Application cache manage karta hai
- **Write-Through:** Write cache + database
- **Write-Back:** Write cache, later database
- **TTL:** Time-based expiration

### Redis Features

**1. In-Memory Storage:**
- RAM mein store
- Very fast access
- Limited by memory

**2. Data Structures:**
- Strings
- Hashes
- Lists
- Sets
- Sorted Sets

**3. Persistence:**
- RDB snapshots
- AOF (Append Only File)
- Both options

---

## B) Easy English Theory

### What is Redis Caching?

Redis is in-memory data store for caching. Stores key-value pairs in RAM for fast access. Reduces database load, improves response times. Supports various data structures (strings, hashes, lists, sets). Use TTL for automatic expiration.

### Caching Patterns

**Cache-Aside:** Application checks cache, fetches from DB if miss, stores in cache.
**Write-Through:** Write to cache and database simultaneously.
**Write-Back:** Write to cache, later sync to database.
**TTL:** Time-based expiration for automatic cache invalidation.

---

## C) Why This Concept Exists

### The Problem

**Without Caching:**
- Database overload
- Slow responses
- Repeated queries
- Poor performance

### The Solution

**Redis Caching Provides:**
1. **Speed:** In-memory access
2. **Efficiency:** Reduce database load
3. **Performance:** Fast responses
4. **Scalability:** Handle more requests

---

## D) Practical Example (Code)

```javascript
// ============================================
// REDIS SETUP
// ============================================

const redis = require('redis');
const client = redis.createClient({
  host: 'localhost',
  port: 6379
});

await client.connect();

// ============================================
// BASIC CACHING (Cache-Aside Pattern)
// ============================================

async function getUser(userId) {
  // 1. Check cache
  const cached = await client.get(`user:${userId}`);
  if (cached) {
    return JSON.parse(cached); // Cache hit
  }
  
  // 2. Fetch from database (cache miss)
  const user = await User.findById(userId);
  
  // 3. Store in cache
  await client.setEx(`user:${userId}`, 3600, JSON.stringify(user)); // TTL: 1 hour
  
  return user;
}

// ============================================
// CACHE WITH TTL
// ============================================

// Set with expiration (seconds)
await client.setEx('key', 3600, 'value'); // Expires in 1 hour

// Set expiration separately
await client.set('key', 'value');
await client.expire('key', 3600);

// ============================================
// CACHE INVALIDATION
// ============================================

async function updateUser(userId, data) {
  // Update database
  const user = await User.findByIdAndUpdate(userId, data);
  
  // Invalidate cache
  await client.del(`user:${userId}`); // Remove from cache
  
  // Or update cache
  await client.setEx(`user:${userId}`, 3600, JSON.stringify(user));
  
  return user;
}

// ============================================
// HASH OPERATIONS
// ============================================

// Store object as hash
await client.hSet('user:123', {
  name: 'John',
  email: 'john@example.com',
  age: '30'
});

// Get hash field
const name = await client.hGet('user:123', 'name');

// Get all hash
const user = await client.hGetAll('user:123');

// ============================================
// LIST OPERATIONS
// ============================================

// Push to list
await client.lPush('recent:users', userId);
await client.rPush('recent:users', userId);

// Get list
const users = await client.lRange('recent:users', 0, -1);

// Limit list size
await client.lTrim('recent:users', 0, 9); // Keep only 10 items

// ============================================
// SET OPERATIONS
// ============================================

// Add to set
await client.sAdd('online:users', userId);

// Check membership
const isOnline = await client.sIsMember('online:users', userId);

// Get all members
const onlineUsers = await client.sMembers('online:users');

// ============================================
// SORTED SET OPERATIONS
// ============================================

// Add with score
await client.zAdd('leaderboard', {
  score: 100,
  value: userId
});

// Get top users
const topUsers = await client.zRange('leaderboard', 0, 9, { REV: true });

// ============================================
// CACHE PATTERNS
// ============================================

// Pattern 1: Cache-Aside
async function getProduct(productId) {
  const cached = await client.get(`product:${productId}`);
  if (cached) return JSON.parse(cached);
  
  const product = await Product.findById(productId);
  await client.setEx(`product:${productId}`, 3600, JSON.stringify(product));
  return product;
}

// Pattern 2: Write-Through
async function createProduct(data) {
  const product = await Product.create(data);
  await client.setEx(`product:${product._id}`, 3600, JSON.stringify(product));
  return product;
}

// Pattern 3: Cache Warming
async function warmCache() {
  const popularProducts = await Product.find({ popular: true });
  for (const product of popularProducts) {
    await client.setEx(
      `product:${product._id}`,
      3600,
      JSON.stringify(product)
    );
  }
}
```

---

## E) Internal Working

**Redis Architecture:**
- In-memory storage (RAM)
- Single-threaded event loop
- Data structures optimized
- Persistence options (RDB, AOF)

**Caching Flow:**
1. Check cache (fast)
2. Cache hit: Return data
3. Cache miss: Fetch from DB
4. Store in cache
5. Return data

---

## F) Interview Questions & Answers

### Q1: What is Redis and why use it for caching?

**Answer:**
Redis is in-memory data store (key-value) for caching. Benefits: Very fast (RAM access), reduces database load, improves response times, supports various data structures (strings, hashes, lists, sets, sorted sets), TTL for expiration. Use for frequently accessed data, session storage, real-time features.

### Q2: What are common caching patterns?

**Answer:**
Cache-Aside: App checks cache, fetches from DB if miss, stores in cache. Write-Through: Write to cache and DB simultaneously. Write-Back: Write to cache, later sync to DB. TTL: Time-based expiration. Cache-Aside most common - simple and flexible.

### Q3: How do you handle cache invalidation?

**Answer:**
Invalidation methods: Delete on update (remove from cache when data changes), TTL expiration (automatic expiration), versioning (cache keys with versions), event-based (invalidate on events). Choose based on data characteristics - TTL for time-sensitive, delete for immediate consistency.

---

## G) Common Mistakes

### Mistake 1: No Cache Invalidation

```javascript
// ❌ WRONG - Stale data
await client.set('user:123', JSON.stringify(user));
// Update user in DB but cache not updated

// ✅ CORRECT - Invalidate on update
await User.findByIdAndUpdate(userId, data);
await client.del(`user:${userId}`); // Invalidate cache
```

**Why it breaks:** Stale data served from cache.

---

## H) When to Use & When NOT to Use

Use Redis caching for frequently accessed data, session storage, real-time features. Don't use for persistent primary storage or when data consistency is critical.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain Redis Caching."

**You:**
"Redis is in-memory data store for caching - stores key-value pairs in RAM for fast access. Reduces database load, improves response times. Caching patterns: Cache-Aside (check cache, fetch from DB if miss), Write-Through (write to both), TTL for expiration. Handle invalidation on updates. Use for frequently accessed data, sessions, real-time features. Supports various data structures (strings, hashes, lists, sets)."

---

## J) Mini Practice Task

Implement Redis caching for user data with cache-aside pattern, TTL, and proper invalidation on updates.

---

**END OF TOPIC: REDIS CACHING**

