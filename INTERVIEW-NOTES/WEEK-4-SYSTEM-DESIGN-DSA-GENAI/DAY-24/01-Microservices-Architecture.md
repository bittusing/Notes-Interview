# MICROSERVICES ARCHITECTURE

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Microservices Architecture kya hai?**
- Microservices Architecture system ko small, independent services mein divide karta hai
- Har service apna responsibility handle karta hai
- Services independently deploy kar sakte hain
- Different technologies use kar sakte hain
- Scalability aur maintainability improve karta hai

**Real-life Analogy:**
- Monolith = Ek bada building (sab kuch ek jagah)
- Microservices = Multiple small buildings (har building ka apna purpose)
- Services = Different buildings (apartments, shops, offices)
- Communication = Roads connecting buildings

**Microservices Characteristics:**
- **Independent:** Services independently deploy
- **Decoupled:** Services loosely coupled
- **Technology Diversity:** Different tech stacks
- **Scalability:** Scale services independently
- **Fault Isolation:** One service failure doesn't break all

### Microservices vs Monolith

**Monolith:**
- Single codebase
- Single deployment
- Tightly coupled
- Easier to develop initially
- Harder to scale

**Microservices:**
- Multiple services
- Independent deployment
- Loosely coupled
- Complex initially
- Easier to scale

---

## B) Easy English Theory

### What is Microservices Architecture?

Microservices Architecture divides system into small, independent services. Each service handles specific business capability, deployed independently, can use different technologies. Benefits: Independent scaling, technology diversity, fault isolation, team autonomy. Challenges: Complexity, distributed systems issues, service communication, data consistency.

---

## C) Why This Concept Exists

### The Problem

**With Monolith:**
- Hard to scale
- Technology lock-in
- Single point of failure
- Difficult maintenance
- Team coordination issues

### The Solution

**Microservices Provide:**
1. **Scalability:** Scale services independently
2. **Flexibility:** Different technologies
3. **Resilience:** Fault isolation
4. **Team Autonomy:** Independent development
5. **Maintainability:** Smaller codebases

---

## D) Practical Example (Code)

```javascript
// ============================================
// MONOLITHIC ARCHITECTURE (FOR COMPARISON)
// ============================================

class MonolithicApp {
  constructor() {
    this.userService = new UserService();
    this.orderService = new OrderService();
    this.paymentService = new PaymentService();
    this.notificationService = new NotificationService();
  }
  
  // All in one application
  async processOrder(userId, orderData) {
    const user = await this.userService.getUser(userId);
    const order = await this.orderService.createOrder(orderData);
    await this.paymentService.processPayment(order.id, order.amount);
    await this.notificationService.sendConfirmation(user.email);
    return order;
  }
}

// ============================================
// MICROSERVICES ARCHITECTURE
// ============================================

// Service 1: User Service
class UserService {
  constructor() {
    this.baseUrl = 'http://user-service:3001';
  }
  
  async getUser(userId) {
    const response = await fetch(`${this.baseUrl}/users/${userId}`);
    return response.json();
  }
  
  async createUser(userData) {
    const response = await fetch(`${this.baseUrl}/users`, {
      method: 'POST',
      body: JSON.stringify(userData)
    });
    return response.json();
  }
}

// Service 2: Order Service
class OrderService {
  constructor() {
    this.baseUrl = 'http://order-service:3002';
  }
  
  async createOrder(orderData) {
    const response = await fetch(`${this.baseUrl}/orders`, {
      method: 'POST',
      body: JSON.stringify(orderData)
    });
    return response.json();
  }
  
  async getOrder(orderId) {
    const response = await fetch(`${this.baseUrl}/orders/${orderId}`);
    return response.json();
  }
}

// Service 3: Payment Service
class PaymentService {
  constructor() {
    this.baseUrl = 'http://payment-service:3003';
  }
  
  async processPayment(orderId, amount) {
    const response = await fetch(`${this.baseUrl}/payments`, {
      method: 'POST',
      body: JSON.stringify({ orderId, amount })
    });
    return response.json();
  }
}

// Service 4: Notification Service
class NotificationService {
  constructor() {
    this.baseUrl = 'http://notification-service:3004';
  }
  
  async sendEmail(to, subject, body) {
    const response = await fetch(`${this.baseUrl}/notifications/email`, {
      method: 'POST',
      body: JSON.stringify({ to, subject, body })
    });
    return response.json();
  }
}

// ============================================
// API GATEWAY (SINGLE ENTRY POINT)
// ============================================

class APIGateway {
  constructor() {
    this.userService = new UserService();
    this.orderService = new OrderService();
    this.paymentService = new PaymentService();
    this.notificationService = new NotificationService();
  }
  
  // Route requests to appropriate service
  async handleRequest(method, path, body) {
    if (path.startsWith('/users')) {
      return await this.userService.handleRequest(method, path, body);
    } else if (path.startsWith('/orders')) {
      return await this.orderService.handleRequest(method, path, body);
    } else if (path.startsWith('/payments')) {
      return await this.paymentService.handleRequest(method, path, body);
    } else if (path.startsWith('/notifications')) {
      return await this.notificationService.handleRequest(method, path, body);
    }
  }
  
  // Orchestrate multiple services
  async processOrder(userId, orderData) {
    // 1. Get user
    const user = await this.userService.getUser(userId);
    
    // 2. Create order
    const order = await this.orderService.createOrder({
      ...orderData,
      userId: user.id
    });
    
    // 3. Process payment
    const payment = await this.paymentService.processPayment(
      order.id,
      order.amount
    );
    
    // 4. Send notification
    await this.notificationService.sendEmail(
      user.email,
      'Order Confirmed',
      `Your order ${order.id} has been confirmed`
    );
    
    return { order, payment };
  }
}

// ============================================
// SERVICE DISCOVERY
// ============================================

class ServiceDiscovery {
  constructor() {
    this.services = new Map();
    this.healthChecks = new Map();
  }
  
  // Register service
  registerService(serviceName, instances) {
    this.services.set(serviceName, instances);
  }
  
  // Get service instance (load balancing)
  getServiceInstance(serviceName) {
    const instances = this.services.get(serviceName);
    if (!instances || instances.length === 0) {
      throw new Error(`Service ${serviceName} not found`);
    }
    
    // Simple round-robin
    const healthyInstances = instances.filter(instance => 
      this.isHealthy(instance)
    );
    
    if (healthyInstances.length === 0) {
      throw new Error(`No healthy instances for ${serviceName}`);
    }
    
    return healthyInstances[0]; // Or use load balancing
  }
  
  isHealthy(instance) {
    const health = this.healthChecks.get(instance.id);
    return health && health.isHealthy;
  }
  
  // Health check
  async checkHealth(instance) {
    try {
      const response = await fetch(`${instance.url}/health`);
      return response.ok;
    } catch (error) {
      return false;
    }
  }
}

// ============================================
// CIRCUIT BREAKER PATTERN
// ============================================

class CircuitBreaker {
  constructor(service, options = {}) {
    this.service = service;
    this.failureThreshold = options.failureThreshold || 5;
    this.timeout = options.timeout || 60000; // 1 minute
    this.failures = 0;
    this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
    this.nextAttempt = Date.now();
  }
  
  async call(method, ...args) {
    if (this.state === 'OPEN') {
      if (Date.now() < this.nextAttempt) {
        throw new Error('Circuit breaker is OPEN');
      }
      // Try again (HALF_OPEN)
      this.state = 'HALF_OPEN';
    }
    
    try {
      const result = await this.service[method](...args);
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }
  
  onSuccess() {
    this.failures = 0;
    this.state = 'CLOSED';
  }
  
  onFailure() {
    this.failures++;
    if (this.failures >= this.failureThreshold) {
      this.state = 'OPEN';
      this.nextAttempt = Date.now() + this.timeout;
    }
  }
}

// ============================================
// SERVICE COMMUNICATION
// ============================================

// Synchronous (HTTP/REST)
class RESTClient {
  constructor(serviceUrl) {
    this.serviceUrl = serviceUrl;
  }
  
  async get(path) {
    const response = await fetch(`${this.serviceUrl}${path}`);
    return response.json();
  }
  
  async post(path, data) {
    const response = await fetch(`${this.serviceUrl}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  }
}

// Asynchronous (Message Queue)
class MessageQueueClient {
  constructor(queue) {
    this.queue = queue;
  }
  
  async publish(topic, message) {
    await this.queue.publish(topic, message);
  }
  
  async subscribe(topic, handler) {
    await this.queue.subscribe(topic, handler);
  }
}

// ============================================
// EVENT-DRIVEN COMMUNICATION
// ============================================

class EventBus {
  constructor() {
    this.subscribers = new Map();
  }
  
  // Publish event
  async publish(eventType, eventData) {
    const subscribers = this.subscribers.get(eventType) || [];
    for (const subscriber of subscribers) {
      try {
        await subscriber.handle(eventData);
      } catch (error) {
        console.error('Event handling failed:', error);
      }
    }
  }
  
  // Subscribe to event
  subscribe(eventType, handler) {
    if (!this.subscribers.has(eventType)) {
      this.subscribers.set(eventType, []);
    }
    this.subscribers.get(eventType).push(handler);
  }
}

// Order service publishes event
class OrderService {
  constructor(eventBus) {
    this.eventBus = eventBus;
  }
  
  async createOrder(orderData) {
    const order = await this.saveOrder(orderData);
    
    // Publish event
    await this.eventBus.publish('order.created', {
      orderId: order.id,
      userId: order.userId,
      amount: order.amount
    });
    
    return order;
  }
}

// Notification service subscribes
class NotificationService {
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.eventBus.subscribe('order.created', this.handleOrderCreated.bind(this));
  }
  
  async handleOrderCreated(event) {
    // Send notification
    await this.sendEmail(event.userId, 'Order Created', event.orderId);
  }
}
```

---

## E) Internal Working

**Microservices Flow:**
1. Client request to API Gateway
2. Gateway routes to service
3. Service processes request
4. Service may call other services
5. Response returned to client

**Service Communication:**
- Synchronous: HTTP/REST, gRPC
- Asynchronous: Message queues, events
- Service discovery: Find services
- Circuit breaker: Handle failures

---

## F) Interview Questions & Answers

### Q1: What is Microservices Architecture?

**Answer:**
Microservices Architecture divides system into small, independent services. Each service handles specific business capability, deployed independently, can use different technologies. Benefits: Independent scaling, technology diversity, fault isolation, team autonomy. Challenges: Complexity, distributed systems issues, service communication, data consistency. Use when system is large, teams are independent, different scaling needs.

### Q2: How do microservices communicate?

**Answer:**
Communication: Synchronous (HTTP/REST, gRPC - request-response, immediate), Asynchronous (Message queues, events - decoupled, eventual consistency). Use REST for simple requests, gRPC for performance, message queues for decoupling, events for loose coupling. API Gateway provides single entry point, routes requests, handles cross-cutting concerns.

### Q3: What are challenges of microservices?

**Answer:**
Challenges: Complexity (more services, distributed systems), Service communication (network latency, failures), Data consistency (distributed transactions, eventual consistency), Testing (integration testing, service dependencies), Deployment (coordinate deployments), Monitoring (distributed tracing, logs). Solutions: API Gateway, Service discovery, Circuit breakers, Event-driven architecture, Distributed tracing, Container orchestration.

---

## G) Common Mistakes

### Mistake 1: Too Many Small Services

```javascript
// ❌ WRONG - Over-microservicing
// UserService, UserProfileService, UserSettingsService, UserPreferencesService
// Too granular, unnecessary complexity

// ✅ CORRECT - Right granularity
// UserService (handles all user-related operations)
```

**Why it breaks:** Too many services increase complexity, network calls, latency.

---

## H) When to Use & When NOT to Use

Use microservices for large systems, independent teams, different scaling needs, technology diversity. Don't use for small systems, tight coupling needed, or when complexity not justified.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain Microservices Architecture."

**You:**
"Microservices Architecture divides system into small, independent services. Each service handles specific capability, deployed independently, can use different technologies. Benefits: Independent scaling, fault isolation, team autonomy, technology diversity.

Communication: Synchronous (HTTP/REST, gRPC) or Asynchronous (message queues, events). Use API Gateway for routing, service discovery for finding services, circuit breakers for fault tolerance. Challenges: Complexity, service communication, data consistency. Use for large systems with independent teams and scaling needs."

---

## J) Mini Practice Task

Design microservices system: Identify services, design APIs, implement API Gateway, handle service communication, implement circuit breaker.

---

**END OF TOPIC: MICROSERVICES ARCHITECTURE**

