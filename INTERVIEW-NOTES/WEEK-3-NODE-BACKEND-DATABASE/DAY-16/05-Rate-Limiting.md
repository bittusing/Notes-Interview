# RATE LIMITING

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Rate Limiting kya hai?**
- Rate Limiting API requests ko limit karta hai
- Specific time period mein maximum requests restrict karta hai
- DDoS attacks se protect karta hai
- Resource abuse prevent karta hai
- Fair usage ensure karta hai

**Real-life Analogy:**
- Bank ATM daily withdrawal limit
- Rate limiting = daily limit
- Zyada requests = limit exceed
- Fair usage ke liye important
- Abuse prevent karta hai

**Why Rate Limiting?**
- Prevent abuse
- Protect resources
- Ensure fair usage
- Prevent DDoS
- Cost control

### Rate Limiting Strategies

**1. Fixed Window:**
- Fixed time window (e.g., 1 minute)
- Requests count window mein
- Window reset par counter reset
- Simple but can have bursts

**2. Sliding Window:**
- Sliding time window
- More accurate
- Prevents bursts better
- More complex

**3. Token Bucket:**
- Tokens refill over time
- Request consumes token
- No tokens = rate limited
- Smooth rate limiting

**4. Leaky Bucket:**
- Requests leak out at fixed rate
- Bucket full = rate limited
- Smooth output rate
- Good for traffic shaping

### Rate Limit Headers

**Standard Headers:**
- `X-RateLimit-Limit`: Maximum requests
- `X-RateLimit-Remaining`: Remaining requests
- `X-RateLimit-Reset`: Reset timestamp
- `Retry-After`: Seconds to retry

---

## B) Easy English Theory

### What is Rate Limiting?

Rate Limiting restricts the number of requests a client can make within a time period. It prevents abuse, protects resources, ensures fair usage, and prevents DDoS attacks.

### Strategies

**Fixed Window:** Count requests in fixed time windows
**Sliding Window:** Count requests in sliding time windows
**Token Bucket:** Refill tokens over time, consume per request
**Leaky Bucket:** Leak requests at fixed rate

---

## C) Why This Concept Exists

### The Problem

**Without Rate Limiting:**
- Resource abuse
- DDoS attacks
- Unfair usage
- High costs
- Service degradation

### The Solution

**Rate Limiting Provides:**
1. **Abuse Prevention:** Limit malicious requests
2. **Resource Protection:** Prevent overload
3. **Fair Usage:** Equal access for all
4. **DDoS Protection:** Mitigate attacks
5. **Cost Control:** Limit resource usage

---

## D) Practical Example (Code)

```javascript
// ============================================
// SIMPLE RATE LIMITER
// ============================================

const rateLimitMap = new Map();

function rateLimiter(maxRequests = 100, windowMs = 60000) {
  return (req, res, next) => {
    const ip = req.ip;
    const now = Date.now();
    
    if (!rateLimitMap.has(ip)) {
      rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
      return next();
    }
    
    const limit = rateLimitMap.get(ip);
    
    if (now > limit.resetTime) {
      limit.count = 1;
      limit.resetTime = now + windowMs;
      return next();
    }
    
    if (limit.count >= maxRequests) {
      return res.status(429).json({
        error: 'Too many requests',
        retryAfter: Math.ceil((limit.resetTime - now) / 1000)
      });
    }
    
    limit.count++;
    next();
  };
}

app.use(rateLimiter(100, 60000)); // 100 requests per minute

// ============================================
// EXPRESS-RATE-LIMIT
// ============================================

const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP',
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false,
});

app.use('/api/', limiter);

// ============================================
// DIFFERENT LIMITS FOR DIFFERENT ROUTES
// ============================================

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // Stricter for auth
  skipSuccessfulRequests: true
});

const strictLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10
});

app.use('/api/', generalLimiter);
app.use('/api/auth/login', authLimiter);
app.use('/api/admin', strictLimiter);

// ============================================
// REDIS-BACKED RATE LIMITER
// ============================================

const Redis = require('ioredis');
const redis = new Redis();

async function redisRateLimiter(maxRequests, windowMs) {
  return async (req, res, next) => {
    const key = `ratelimit:${req.ip}`;
    const current = await redis.incr(key);
    
    if (current === 1) {
      await redis.expire(key, Math.ceil(windowMs / 1000));
    }
    
    if (current > maxRequests) {
      const ttl = await redis.ttl(key);
      return res.status(429).json({
        error: 'Too many requests',
        retryAfter: ttl
      });
    }
    
    res.set({
      'X-RateLimit-Limit': maxRequests,
      'X-RateLimit-Remaining': Math.max(0, maxRequests - current),
      'X-RateLimit-Reset': new Date(Date.now() + windowMs).toISOString()
    });
    
    next();
  };
}

app.use(redisRateLimiter(100, 60000));

// ============================================
// SLIDING WINDOW RATE LIMITER
// ============================================

class SlidingWindowRateLimiter {
  constructor(maxRequests, windowMs) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    this.requests = new Map();
  }
  
  isAllowed(identifier) {
    const now = Date.now();
    const windowStart = now - this.windowMs;
    
    if (!this.requests.has(identifier)) {
      this.requests.set(identifier, []);
    }
    
    const userRequests = this.requests.get(identifier);
    
    // Remove old requests outside window
    while (userRequests.length > 0 && userRequests[0] < windowStart) {
      userRequests.shift();
    }
    
    if (userRequests.length >= this.maxRequests) {
      return false;
    }
    
    userRequests.push(now);
    return true;
  }
}

const limiter = new SlidingWindowRateLimiter(100, 60000);

function slidingWindowMiddleware(req, res, next) {
  if (!limiter.isAllowed(req.ip)) {
    return res.status(429).json({ error: 'Too many requests' });
  }
  next();
}

// ============================================
// TOKEN BUCKET RATE LIMITER
// ============================================

class TokenBucket {
  constructor(capacity, refillRate) {
    this.capacity = capacity;
    this.tokens = capacity;
    this.refillRate = refillRate; // tokens per second
    this.lastRefill = Date.now();
  }
  
  refill() {
    const now = Date.now();
    const elapsed = (now - this.lastRefill) / 1000;
    const tokensToAdd = elapsed * this.refillRate;
    
    this.tokens = Math.min(this.capacity, this.tokens + tokensToAdd);
    this.lastRefill = now;
  }
  
  consume(tokens = 1) {
    this.refill();
    if (this.tokens >= tokens) {
      this.tokens -= tokens;
      return true;
    }
    return false;
  }
}

const buckets = new Map();

function tokenBucketMiddleware(req, res, next) {
  const ip = req.ip;
  
  if (!buckets.has(ip)) {
    buckets.set(ip, new TokenBucket(100, 10)); // 100 capacity, 10 tokens/sec
  }
  
  const bucket = buckets.get(ip);
  
  if (!bucket.consume()) {
    return res.status(429).json({ error: 'Too many requests' });
  }
  
  next();
}

// ============================================
// USER-BASED RATE LIMITING
// ============================================

function userRateLimiter(userLimits) {
  return async (req, res, next) => {
    const userId = req.user?.id || req.ip;
    const limit = userLimits[userId] || userLimits['default'] || { max: 100, window: 60000 };
    
    // Apply limit based on user
    // Implementation similar to above
    next();
  };
}

// ============================================
// RATE LIMIT HEADERS
// ============================================

function rateLimitWithHeaders(maxRequests, windowMs) {
  const limits = new Map();
  
  return (req, res, next) => {
    const key = req.ip;
    const now = Date.now();
    
    if (!limits.has(key)) {
      limits.set(key, { count: 1, resetTime: now + windowMs });
    } else {
      const limit = limits.get(key);
      if (now > limit.resetTime) {
        limit.count = 1;
        limit.resetTime = now + windowMs;
      } else {
        limit.count++;
      }
    }
    
    const limit = limits.get(key);
    const remaining = Math.max(0, maxRequests - limit.count);
    const resetTime = Math.ceil(limit.resetTime / 1000);
    
    res.set({
      'X-RateLimit-Limit': maxRequests.toString(),
      'X-RateLimit-Remaining': remaining.toString(),
      'X-RateLimit-Reset': resetTime.toString()
    });
    
    if (limit.count > maxRequests) {
      return res.status(429).json({
        error: 'Too many requests',
        retryAfter: Math.ceil((limit.resetTime - now) / 1000)
      });
    }
    
    next();
  };
}
```

---

## E) Internal Working

### Step-by-Step Internal Flow

**1. Request Arrives**
```
Request received
    ↓
Extract identifier (IP/user)
    ↓
Check rate limit
```

**2. Rate Limit Check**
```
Get current count for identifier
    ↓
Check if within limit
    ↓
If within limit → Allow, increment count
    ↓
If exceeded → Deny, return 429
```

**3. Response**
```
Add rate limit headers
    ↓
Send response (200 or 429)
```

---

## F) Interview Questions & Answers

### Q1: What is Rate Limiting and why is it important?

**Answer:**
Rate Limiting restricts the number of requests a client can make within a time period. It's important to prevent abuse, protect resources from overload, ensure fair usage among clients, mitigate DDoS attacks, and control costs. It's essential for production APIs.

### Q2: What are different Rate Limiting strategies?

**Answer:**
Fixed window counts requests in fixed time windows (simple but can burst). Sliding window uses sliding time windows (more accurate). Token bucket refills tokens over time (smooth). Leaky bucket leaks requests at fixed rate (traffic shaping). Choose based on requirements.

### Q3: How do you implement distributed Rate Limiting?

**Answer:**
Use a shared store like Redis to track rate limits across multiple servers. Each server checks and updates the count in Redis. This ensures consistent limits across all servers in a distributed system. Redis counters with expiration work well for this.

### Q4: What HTTP status code for rate limiting?

**Answer:**
429 Too Many Requests is the standard status code for rate limiting. Include `Retry-After` header indicating when to retry. Also include rate limit headers like `X-RateLimit-Limit`, `X-RateLimit-Remaining`, and `X-RateLimit-Reset`.

### Q5: How do you handle rate limiting for authenticated users vs anonymous?

**Answer:**
Use user ID for authenticated users (more accurate, can have higher limits), IP address for anonymous users (less accurate but works). Can implement tiered limits - authenticated users get higher limits. Track both separately.

---

## G) Common Mistakes

### Mistake 1: No Rate Limiting

```javascript
// ❌ WRONG - Vulnerable to abuse
app.get('/api/data', (req, res) => {
  // No rate limiting - can be abused
  res.json(data);
});

// ✅ CORRECT
app.use(rateLimit({ windowMs: 60000, max: 100 }));
```

**Why it breaks:** API can be abused, causing resource exhaustion.

### Mistake 2: Too Strict Limits

```javascript
// ❌ WRONG - Blocks legitimate users
app.use(rateLimit({ max: 1, windowMs: 60000 }));

// ✅ CORRECT - Reasonable limits
app.use(rateLimit({ max: 100, windowMs: 60000 }));
```

**Why it breaks:** Legitimate users get blocked.

---

## H) When to Use & When NOT to Use

### When Rate Limiting is Essential

**1. Public APIs**
- External APIs
- Unknown clients
- Abuse prevention
- Resource protection

**2. Authentication Endpoints**
- Login endpoints
- Registration
- Password reset
- Brute force prevention

### When NOT to Use

**1. Internal APIs**
- Trusted clients
- Internal services
- Development
- Testing

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain Rate Limiting."

**You:**
"Rate Limiting restricts requests per client within a time period. Common strategies include fixed window (simple), sliding window (accurate), token bucket (smooth), and leaky bucket (traffic shaping).

Use Redis for distributed rate limiting. Return 429 status with Retry-After header when exceeded. Include rate limit headers (X-RateLimit-Limit, Remaining, Reset). Different limits for different endpoints - stricter for auth, more lenient for general APIs. Rate limiting prevents abuse, protects resources, and ensures fair usage."

---

## J) Mini Practice Task

Create a rate limiting system with multiple strategies, Redis support, and different limits per route.

---

**END OF TOPIC: RATE LIMITING**

