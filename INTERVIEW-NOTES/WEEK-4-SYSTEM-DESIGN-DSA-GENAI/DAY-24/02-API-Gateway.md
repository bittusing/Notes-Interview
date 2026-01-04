# API GATEWAY

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**API Gateway kya hai?**
- API Gateway single entry point hai sabhi client requests ke liye
- Multiple backend services ko front se hide karta hai
- Request routing, authentication, rate limiting handle karta hai
- Cross-cutting concerns centralize karta hai
- Microservices mein essential

**Real-life Analogy:**
- API Gateway = Reception desk (sab requests yahan se jate hain)
- Services = Different departments
- Reception = Routes to correct department
- Security = Reception checks access

**API Gateway Functions:**
- **Routing:** Requests ko services ko route
- **Authentication:** Verify user identity
- **Rate Limiting:** Control request rate
- **Load Balancing:** Distribute load
- **Caching:** Cache responses
- **Monitoring:** Log requests

---

## B) Easy English Theory

### What is API Gateway?

API Gateway is single entry point for all client requests. Routes requests to appropriate backend services, handles cross-cutting concerns (authentication, rate limiting, logging), provides unified API. Benefits: Single entry point, security, load balancing, caching, monitoring. Essential for microservices architecture.

---

## C) Why This Concept Exists

### The Problem

**Without API Gateway:**
- Clients need to know all services
- Duplicate logic (auth, rate limiting)
- Security issues
- Difficult to manage
- No centralized monitoring

### The Solution

**API Gateway Provides:**
1. **Single Entry Point:** Unified API
2. **Security:** Centralized authentication
3. **Routing:** Request routing
4. **Monitoring:** Centralized logging
5. **Caching:** Response caching

---

## D) Practical Example (Code)

```javascript
// ============================================
// BASIC API GATEWAY
// ============================================

const express = require('express');
const app = express();

class APIGateway {
  constructor() {
    this.services = {
      users: 'http://user-service:3001',
      orders: 'http://order-service:3002',
      payments: 'http://payment-service:3003',
      products: 'http://product-service:3004'
    };
    this.middleware = [];
  }
  
  // Route request to service
  async route(req, res) {
    const serviceName = this.getServiceName(req.path);
    const serviceUrl = this.services[serviceName];
    
    if (!serviceUrl) {
      return res.status(404).json({ error: 'Service not found' });
    }
    
    // Forward request
    const targetUrl = `${serviceUrl}${req.path}`;
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: req.headers,
      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined
    });
    
    const data = await response.json();
    res.status(response.status).json(data);
  }
  
  getServiceName(path) {
    if (path.startsWith('/users')) return 'users';
    if (path.startsWith('/orders')) return 'orders';
    if (path.startsWith('/payments')) return 'payments';
    if (path.startsWith('/products')) return 'products';
    return null;
  }
}

// ============================================
// AUTHENTICATION MIDDLEWARE
// ============================================

class AuthMiddleware {
  async authenticate(req, res, next) {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    try {
      const user = await this.verifyToken(token);
      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ error: 'Invalid token' });
    }
  }
  
  async verifyToken(token) {
    // Verify JWT token
    const jwt = require('jsonwebtoken');
    return jwt.verify(token, process.env.JWT_SECRET);
  }
}

// ============================================
// RATE LIMITING MIDDLEWARE
// ============================================

class RateLimiter {
  constructor() {
    this.requests = new Map(); // ip -> requests
    this.maxRequests = 100; // per minute
    this.windowMs = 60000; // 1 minute
  }
  
  async limit(req, res, next) {
    const ip = req.ip;
    const now = Date.now();
    
    if (!this.requests.has(ip)) {
      this.requests.set(ip, []);
    }
    
    const userRequests = this.requests.get(ip);
    
    // Remove old requests
    const recentRequests = userRequests.filter(
      time => now - time < this.windowMs
    );
    
    if (recentRequests.length >= this.maxRequests) {
      return res.status(429).json({ error: 'Too many requests' });
    }
    
    recentRequests.push(now);
    this.requests.set(ip, recentRequests);
    next();
  }
}

// ============================================
// CACHING MIDDLEWARE
// ============================================

class CacheMiddleware {
  constructor() {
    this.cache = new Map();
    this.ttl = 300000; // 5 minutes
  }
  
  async cache(req, res, next) {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next();
    }
    
    const cacheKey = `${req.method}:${req.path}`;
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.ttl) {
      return res.json(cached.data);
    }
    
    // Store original json method
    const originalJson = res.json.bind(res);
    res.json = function(data) {
      // Cache response
      cacheMiddleware.cache.set(cacheKey, {
        data,
        timestamp: Date.now()
      });
      return originalJson(data);
    };
    
    next();
  }
}

// ============================================
// LOAD BALANCING
// ============================================

class LoadBalancer {
  constructor() {
    this.services = {
      users: [
        'http://user-service-1:3001',
        'http://user-service-2:3001',
        'http://user-service-3:3001'
      ]
    };
    this.indexes = new Map();
  }
  
  getServiceInstance(serviceName) {
    const instances = this.services[serviceName];
    if (!instances || instances.length === 0) {
      throw new Error(`Service ${serviceName} not found`);
    }
    
    // Round-robin
    const index = this.indexes.get(serviceName) || 0;
    const instance = instances[index];
    this.indexes.set(serviceName, (index + 1) % instances.length);
    
    return instance;
  }
}

// ============================================
// REQUEST TRANSFORMATION
// ============================================

class RequestTransformer {
  transform(req) {
    // Add common headers
    req.headers['X-Request-ID'] = this.generateRequestId();
    req.headers['X-User-ID'] = req.user?.id;
    
    // Transform path if needed
    if (req.path.startsWith('/api/v1/users')) {
      req.path = req.path.replace('/api/v1/users', '/users');
    }
    
    return req;
  }
  
  generateRequestId() {
    return `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

// ============================================
// RESPONSE AGGREGATION
// ============================================

class ResponseAggregator {
  async aggregate(req, res) {
    // Aggregate data from multiple services
    const [user, orders, products] = await Promise.all([
      fetch(`${this.services.users}/users/${req.params.userId}`),
      fetch(`${this.services.orders}/orders?userId=${req.params.userId}`),
      fetch(`${this.services.products}/products`)
    ]);
    
    const userData = await user.json();
    const ordersData = await orders.json();
    const productsData = await products.json();
    
    return {
      user: userData,
      orders: ordersData,
      recommendedProducts: this.getRecommendedProducts(userData, productsData)
    };
  }
  
  getRecommendedProducts(user, products) {
    // Recommendation logic
    return products.slice(0, 5);
  }
}

// ============================================
// ERROR HANDLING
// ============================================

class ErrorHandler {
  handle(error, req, res, next) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    
    if (error.name === 'UnauthorizedError') {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    if (error.name === 'ServiceUnavailableError') {
      return res.status(503).json({ error: 'Service unavailable' });
    }
    
    // Default error
    console.error('API Gateway Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// ============================================
// COMPLETE API GATEWAY
// ============================================

const gateway = new APIGateway();
const authMiddleware = new AuthMiddleware();
const rateLimiter = new RateLimiter();
const cacheMiddleware = new CacheMiddleware();
const loadBalancer = new LoadBalancer();
const errorHandler = new ErrorHandler();

app.use(express.json());

// Apply middleware
app.use(rateLimiter.limit.bind(rateLimiter));
app.use(authMiddleware.authenticate.bind(authMiddleware));
app.use(cacheMiddleware.cache.bind(cacheMiddleware));

// Routes
app.use('/api/*', async (req, res, next) => {
  try {
    await gateway.route(req, res);
  } catch (error) {
    errorHandler.handle(error, req, res, next);
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', services: Object.keys(gateway.services) });
});

app.listen(3000, () => {
  console.log('API Gateway running on port 3000');
});
```

---

## E) Internal Working

**API Gateway Flow:**
1. Client request arrives
2. Authentication/Authorization
3. Rate limiting check
4. Request routing
5. Load balancing (if multiple instances)
6. Forward to service
7. Cache response (if applicable)
8. Return response

---

## F) Interview Questions & Answers

### Q1: What is API Gateway and why use it?

**Answer:**
API Gateway is single entry point for all client requests. Routes requests to backend services, handles cross-cutting concerns (authentication, rate limiting, logging, caching). Benefits: Single entry point (clients don't need to know all services), security (centralized auth), load balancing, caching, monitoring. Essential for microservices architecture.

### Q2: What are key features of API Gateway?

**Answer:**
Features: Request routing (route to appropriate service), Authentication/Authorization (verify identity, check permissions), Rate limiting (control request rate), Load balancing (distribute load across instances), Caching (cache responses), Request/Response transformation, Monitoring (logging, metrics), Error handling. Some gateways: AWS API Gateway, Kong, Zuul, Nginx.

### Q3: How does API Gateway handle service failures?

**Answer:**
Handle failures: Circuit breaker (stop sending to failing services), Retry logic (retry failed requests), Fallback responses (default responses), Timeout handling (set timeouts, return error if exceeded), Health checks (monitor service health, remove unhealthy services), Graceful degradation (reduce functionality, not complete failure).

---

## G) Common Mistakes

### Mistake 1: No Rate Limiting

```javascript
// ❌ WRONG - No rate limiting
app.use('/api/*', gateway.route);
// Vulnerable to DDoS

// ✅ CORRECT - Rate limiting
app.use(rateLimiter.limit);
app.use('/api/*', gateway.route);
```

**Why it breaks:** Vulnerable to abuse, service overload.

---

## H) When to Use & When NOT to Use

Always use API Gateway for microservices. Don't use for simple single-service applications.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain API Gateway."

**You:**
"API Gateway is single entry point for all client requests. Routes requests to backend services, handles cross-cutting concerns: authentication, rate limiting, load balancing, caching, monitoring. Benefits: Single entry point, security, centralized logic, easier management.

Features: Request routing, authentication, rate limiting, load balancing, caching, error handling. Essential for microservices. Handles service failures with circuit breakers, retries, fallbacks. Examples: AWS API Gateway, Kong, Zuul."

---

## J) Mini Practice Task

Implement API Gateway: Request routing, authentication, rate limiting, caching, load balancing, error handling.

---

**END OF TOPIC: API GATEWAY**

