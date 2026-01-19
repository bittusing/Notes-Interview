# RATE LIMITING

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Rate Limiting kya hai?**
- Rate Limiting API calls ko limit karne ka mechanism hai
- Too many requests se protect karta hai
- DDoS attacks prevent karta hai
- Fair resource usage ensure karta hai
- System overload se bachata hai

**Real-life Analogy:**
- Rate Limiting = Restaurant ka reservation system
- Too many requests = Too many customers
- Limit = Maximum tables
- Fair usage = Everyone ko chance

**Key Concepts:**
- **Rate Limit:** Maximum requests per time window
- **Time Window:** Duration (per second, minute, hour)
- **Threshold:** Limit value (100 req/min)
- **Burst:** Temporary spike allowance
- **Throttling:** Slow down instead of reject

### Rate Limiting Algorithms

**1. Fixed Window:**
- Fixed time window (1 minute)
- Simple counter
- Reset after window
- Burst at window boundary

**2. Sliding Window:**
- Rolling time window
- More accurate
- No burst issue
- Complex implementation

**3. Token Bucket:**
- Tokens refill continuously
- Allow burst up to bucket size
- Smooth rate limiting
- Good for variable rates

**4. Leaky Bucket:**
- Requests leak out at fixed rate
- No burst allowed
- Fixed output rate
- Good for smoothing traffic

---

## B) Easy English Theory

### What is Rate Limiting?

Rate Limiting restricts number of requests per time window to prevent abuse, ensure fairness, and protect system from overload. Algorithms: Fixed Window (simple counter), Sliding Window (rolling window), Token Bucket (allow bursts), Leaky Bucket (fixed output rate). Implementation: In-memory (Redis), middleware, API Gateway.

### Algorithms Comparison

**Fixed Window:** Simple, reset after window, can have bursts at boundary.

**Sliding Window:** Accurate, no bursts, complex to implement.

**Token Bucket:** Allows bursts up to capacity, tokens refill continuously.

**Leaky Bucket:** No bursts, fixed output rate, smooths traffic.

---

## C) Why This Concept Exists

### The Problem

**Without Rate Limiting:**
- DDoS attacks possible
- Resource exhaustion
- Unfair usage (one user consumes all)
- System overload
- Poor experience for legitimate users

### The Solution

**Rate Limiting Provides:**
1. **Protection:** Prevent abuse
2. **Fairness:** Equal resource access
3. **Stability:** Prevent overload
4. **Cost Control:** Limit resource usage
5. **Quality:** Better experience for all

---

## D) Practical Example (Code)

```javascript
// ============================================
// RATE LIMITING: FIXED WINDOW
// ============================================

class FixedWindowRateLimiter {
  constructor(maxRequests, windowMs) {
    this.maxRequests = maxRequests; // 100 requests
    this.windowMs = windowMs; // 60000ms (1 minute)
    this.requests = new Map(); // { userId: { count, resetAt } }
  }
  
  isAllowed(userId) {
    const now = Date.now();
    const userData = this.requests.get(userId);
    
    // First request or window expired
    if (!userData || now >= userData.resetAt) {
      this.requests.set(userId, {
        count: 1,
        resetAt: now + this.windowMs
      });
      return true;
    }
    
    // Within window
    if (userData.count < this.maxRequests) {
      userData.count++;
      return true;
    }
    
    // Limit exceeded
    return false;
  }
}

// ============================================
// RATE LIMITING: SLIDING WINDOW
// ============================================

class SlidingWindowRateLimiter {
  constructor(maxRequests, windowMs) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    this.requests = new Map(); // { userId: [timestamps] }
  }
  
  isAllowed(userId) {
    const now = Date.now();
    const userRequests = this.requests.get(userId) || [];
    
    // Remove old requests outside window
    const validRequests = userRequests.filter(
      timestamp => now - timestamp < this.windowMs
    );
    
    if (validRequests.length < this.maxRequests) {
      validRequests.push(now);
      this.requests.set(userId, validRequests);
      return true;
    }
    
    return false;
  }
}

// ============================================
// RATE LIMITING: TOKEN BUCKET
// ============================================

class TokenBucketRateLimiter {
  constructor(capacity, refillRate) {
    this.capacity = capacity; // Max tokens (100)
    this.refillRate = refillRate; // Tokens per second (10)
    this.tokens = new Map(); // { userId: { tokens, lastRefill } }
  }
  
  isAllowed(userId) {
    const now = Date.now() / 1000; // Convert to seconds
    const userBucket = this.tokens.get(userId) || {
      tokens: this.capacity,
      lastRefill: now
    };
    
    // Refill tokens based on elapsed time
    const elapsed = now - userBucket.lastRefill;
    const tokensToAdd = elapsed * this.refillRate;
    userBucket.tokens = Math.min(
      this.capacity,
      userBucket.tokens + tokensToAdd
    );
    userBucket.lastRefill = now;
    
    if (userBucket.tokens >= 1) {
      userBucket.tokens--;
      this.tokens.set(userId, userBucket);
      return true;
    }
    
    this.tokens.set(userId, userBucket);
    return false;
  }
}

// ============================================
// RATE LIMITING WITH REDIS (DISTRIBUTED)
// ============================================

const redis = require('redis');
const client = redis.createClient();

// Fixed Window with Redis
async function isAllowedFixedWindow(userId, maxRequests, windowMs) {
  const key = `ratelimit:${userId}`;
  const now = Date.now();
  
  // Get current count
  const count = await client.incr(key);
  
  // Set expiry if first request
  if (count === 1) {
    await client.pexpire(key, windowMs);
  }
  
  // Check TTL if limit exceeded
  if (count > maxRequests) {
    const ttl = await client.pttl(key);
    return { allowed: false, retryAfter: ttl };
  }
  
  return { allowed: true };
}

// Sliding Window with Redis (Sorted Set)
async function isAllowedSlidingWindow(userId, maxRequests, windowMs) {
  const key = `ratelimit:${userId}`;
  const now = Date.now();
  
  // Remove old entries
  await client.zremrangebyscore(key, 0, now - windowMs);
  
  // Count current requests
  const count = await client.zcard(key);
  
  if (count < maxRequests) {
    // Add current request
    await client.zadd(key, now, `${now}-${Math.random()}`);
    await client.pexpire(key, windowMs);
    return { allowed: true };
  }
  
  // Get oldest request to calculate retry time
  const oldest = await client.zrange(key, 0, 0, 'WITHSCORES');
  const retryAfter = oldest.length > 0 
    ? (parseInt(oldest[1]) + windowMs) - now 
    : windowMs;
  
  return { allowed: false, retryAfter };
}

// ============================================
// EXPRESS MIDDLEWARE
// ============================================

const express = require('express');
const app = express();

const rateLimiter = new SlidingWindowRateLimiter(100, 60000); // 100 req/min

function rateLimitMiddleware(req, res, next) {
  const userId = req.user?.id || req.ip;
  
  if (!rateLimiter.isAllowed(userId)) {
    return res.status(429).json({
      error: 'Too Many Requests',
      message: 'Rate limit exceeded. Please try again later.',
      retryAfter: 60 // seconds
    });
  }
  
  next();
}

// Apply to all routes
app.use('/api', rateLimitMiddleware);

// Or apply to specific route
app.post('/api/orders', rateLimitMiddleware, async (req, res) => {
  // Order creation logic
});

// ============================================
// MULTI-LEVEL RATE LIMITING
// ============================================

class MultiLevelRateLimiter {
  constructor() {
    // Different limits for different endpoints
    this.limits = {
      '/api/login': { max: 5, window: 60000 }, // 5/min
      '/api/orders': { max: 100, window: 60000 }, // 100/min
      '/api/search': { max: 1000, window: 60000 } // 1000/min
    };
    
    this.limiters = new Map();
  }
  
  getLimiter(endpoint) {
    if (!this.limiters.has(endpoint)) {
      const limit = this.limits[endpoint] || { max: 100, window: 60000 };
      this.limiters.set(
        endpoint,
        new SlidingWindowRateLimiter(limit.max, limit.window)
      );
    }
    return this.limiters.get(endpoint);
  }
  
  isAllowed(userId, endpoint) {
    const limiter = this.getLimiter(endpoint);
    return limiter.isAllowed(userId);
  }
}

// ============================================
// RATE LIMITING HEADERS
// ============================================

function rateLimitMiddleware(req, res, next) {
  const userId = req.user?.id || req.ip;
  const endpoint = req.path;
  
  const result = multiLevelLimiter.isAllowed(userId, endpoint);
  
  // Add rate limit headers
  res.set({
    'X-RateLimit-Limit': '100',
    'X-RateLimit-Remaining': result.remaining || 0,
    'X-RateLimit-Reset': result.resetTime || Date.now() + 60000
  });
  
  if (!result.allowed) {
    res.set('Retry-After', Math.ceil(result.retryAfter / 1000));
    return res.status(429).json({
      error: 'Too Many Requests',
      retryAfter: Math.ceil(result.retryAfter / 1000)
    });
  }
  
  next();
}
```

---

## E) Internal Working

**Rate Limiting Flow:**
1. Request arrives
2. Extract identifier (userId, IP)
3. Check current count/state
4. Compare with limit
5. If allowed: increment counter, proceed
6. If denied: return 429, include retry-after header
7. Update state (in-memory or Redis)

**Key Considerations:**
- Identifier: User ID (logged in), IP address (anonymous)
- Storage: In-memory (single server), Redis (distributed)
- Window: Fixed (simple), Sliding (accurate)
- Headers: Inform client about limits

---

## F) Interview Questions & Answers

### Q1: What is the difference between Fixed Window and Sliding Window rate limiting?

**Answer:**
Fixed Window: Simple counter per time window (e.g., 100 req/min), resets at window boundary, can allow bursts at boundary (user can make 200 requests in 1 second at window reset). Sliding Window: Rolling time window, tracks timestamps of last N requests, more accurate, no burst issue, complex implementation. Fixed = simpler but inaccurate, Sliding = accurate but complex.

### Q2: When would you use Token Bucket vs Leaky Bucket?

**Answer:**
Token Bucket: Tokens refill continuously, allows bursts up to capacity, good for variable rates, user can make many requests if tokens available. Leaky Bucket: Fixed output rate, no bursts, smooths traffic, good for constant rate. Use Token Bucket for: APIs with burst needs (spike traffic), variable rates. Use Leaky Bucket for: Constant rate needed (video streaming), no bursts allowed.

### Q3: How do you implement distributed rate limiting?

**Answer:**
Distributed Rate Limiting: Use Redis (shared state), store counters/timestamps in Redis, use atomic operations (INCR), use sorted sets for sliding window, handle race conditions with Lua scripts. Architecture: All servers connect to same Redis, check limit before processing, update Redis atomically. Alternative: Centralized rate limiter service, all requests go through it.

### Q4: What are the trade-offs of different rate limiting algorithms?

**Answer:**
Fixed Window: Simple, fast, inaccurate (bursts at boundary), memory efficient. Sliding Window: Accurate, no bursts, complex, more memory (storing timestamps). Token Bucket: Allows bursts, smooth refill, complex, variable rate. Leaky Bucket: Fixed rate, no bursts, complex, constant output. Choose based on: accuracy needs, burst tolerance, complexity budget.

### Q5: How do you handle rate limiting for different user tiers?

**Answer:**
User Tier Rate Limiting: Store limits per tier (free: 100/min, premium: 1000/min), check user tier, apply appropriate limit, use Redis hash (userId → tier, limit). Implementation: Multi-level limiter, different limits per endpoint and tier, priority queue (premium first). Example: Free users limited, premium unlimited, enterprise custom limits.

### Q6: What happens when rate limit is exceeded?

**Answer:**
Rate Limit Exceeded: Return 429 (Too Many Requests), include Retry-After header (seconds until reset), log for monitoring, optionally: slow down (throttle), queue request, priority queue (premium users first). Best Practice: Clear error message, helpful retry time, don't block forever, allow some burst.

### Q7: How do you prevent rate limit bypass?

**Answer:**
Prevent Bypass: Use multiple identifiers (IP + User-Agent + cookie), fingerprint users, use CAPTCHA after suspicious activity, IP-based + account-based limits, monitor patterns, block suspicious IPs, rate limit at multiple layers (API Gateway + application). Challenge: Users can change IP (VPN), create multiple accounts, use bots.

### Q8: What is the difference between rate limiting and throttling?

**Answer:**
Rate Limiting: Reject requests after limit, returns 429, clear error, user must retry later. Throttling: Slow down requests, queue and process slowly, user waits longer, no rejection. Use Rate Limiting for: Hard limits (prevent abuse), API quotas. Use Throttling for: Smooth traffic, gradual degradation, background processing.

### Q9: How do you implement rate limiting for different API endpoints?

**Answer:**
Endpoint-Specific Limits: Configure limits per endpoint (login: 5/min, search: 1000/min, orders: 100/min), use multi-level limiter, check endpoint in middleware, apply appropriate limit, store in config/DB. Reason: Critical endpoints (login) need stricter limits, public endpoints (search) can be higher. Implementation: Map endpoint → limit config, check in middleware.

### Q10: How do you monitor and alert on rate limiting?

**Answer:**
Monitoring: Track rate limit hits (429 responses), metrics per endpoint/user, alert on high rate limit violations, track patterns (DDoS attempts), dashboard showing limits and usage. Alerts: Spike in rate limit violations, specific user hitting limits repeatedly, overall system hitting limits (capacity issue). Tools: Prometheus metrics, Grafana dashboards, alerting rules.

---

## G) Common Mistakes

### Mistake 1: Not Using Distributed State

```javascript
// ❌ WRONG - In-memory only (doesn't work with multiple servers)
const rateLimiter = new FixedWindowRateLimiter(100, 60000);

// ✅ CORRECT - Use Redis for distributed state
async function isAllowed(userId) {
  const count = await redis.incr(`ratelimit:${userId}`);
  if (count === 1) await redis.expire(`ratelimit:${userId}`, 60);
  return count <= 100;
}
```

**Why it breaks:** Each server has separate counter, user can bypass by hitting different servers.

### Mistake 2: Race Conditions in Distributed System

```javascript
// ❌ WRONG - Race condition
const count = await redis.get(key);
if (count < limit) {
  await redis.incr(key); // Another request can increment between get and incr
}

// ✅ CORRECT - Atomic operation
const count = await redis.incr(key);
if (count === 1) await redis.expire(key, windowMs);
return count <= limit;
```

**Why it breaks:** Multiple requests can pass check simultaneously, exceeding limit.

---

## H) When to Use & When NOT to Use

**Use Rate Limiting When:**
- Public APIs exposed
- Prevent abuse needed
- Fair resource usage required
- Cost control needed
- DDoS protection needed

**Don't Use When:**
- Internal trusted services only
- Very low traffic
- Not enough to justify overhead
- Use quota system instead

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain rate limiting and common algorithms."

**You:**
"Rate Limiting restricts requests per time window to prevent abuse. Algorithms: Fixed Window (simple counter, resets at boundary, can burst), Sliding Window (rolling window, accurate, no bursts), Token Bucket (allows bursts, tokens refill), Leaky Bucket (fixed rate, no bursts).

Implementation: In-memory (single server) or Redis (distributed). Check limit before processing, return 429 with Retry-After if exceeded. Use per endpoint, user tier, or globally.

Trade-offs: Fixed Window simple but inaccurate, Sliding Window accurate but complex. Choose based on accuracy needs and burst tolerance."

---

## J) Mini Practice Task

Implement rate limiting middleware: Support multiple algorithms (Fixed Window, Sliding Window), use Redis for distributed state, different limits per endpoint, return proper headers (429, Retry-After).

---

**END OF TOPIC: RATE LIMITING**
