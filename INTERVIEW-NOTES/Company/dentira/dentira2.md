# DENTIRA INTERVIEW PREPARATION - PART 2
## Microservices Architecture

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Microservices kya hai?**
- Microservices ek architectural pattern hai
- Application ko small, independent services mein break karta hai
- Har service apna database, business logic rakhta hai
- Services communicate karte hain via APIs
- Independent deployment aur scaling possible hai

**Real-life Analogy:**
- Monolith = Ek bada restaurant (sab kuch ek jagah)
- Microservices = Multiple specialized restaurants
  - Pizza service (pizza banata hai)
  - Burger service (burger banata hai)
  - Delivery service (delivery handle karta hai)
  - Payment service (payment process karta hai)
- Har service independently run hota hai
- Services aapas mein communicate karte hain

**Key Characteristics:**
- **Independent Deployment:** Har service alag deploy ho sakta hai
- **Technology Diversity:** Different services different tech use kar sakte hain
- **Fault Isolation:** Ek service fail hone se baaki services affect nahi hote
- **Scalability:** Individual services scale kar sakte hain
- **Team Autonomy:** Different teams different services maintain kar sakte hain

### Monolith vs Microservices

**Monolithic Architecture:**
```
┌─────────────────────────────┐
│     Single Application      │
│  ┌───────────────────────┐  │
│  │   User Management     │  │
│  │   Order Processing    │  │
│  │   Payment Processing  │  │
│  │   Notification Service │  │
│  └───────────────────────┘  │
│         Single DB            │
└─────────────────────────────┘
```

**Problems:**
- Ek bug sabko affect karta hai
- Scaling difficult (sab kuch scale karna padta hai)
- Technology lock-in
- Large codebase maintain karna mushkil
- Deployment risky (sab kuch deploy karna padta hai)

**Microservices Architecture:**
```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│  User    │    │  Order   │    │ Payment  │    │  Notify  │
│ Service  │    │ Service  │    │ Service  │    │ Service  │
│          │    │          │    │          │    │          │
│  User DB │    │ Order DB │    │Payment DB│    │Notify DB  │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
     │              │              │              │
     └──────────────┴──────────────┴──────────────┘
                    API Gateway
```

**Benefits:**
- Independent scaling
- Technology flexibility
- Fault isolation
- Team autonomy
- Faster deployment

### Microservices Communication Patterns

**1. Synchronous Communication (HTTP/REST):**
```typescript
// User Service calling Order Service
async function getUserOrders(userId: string) {
  const response = await fetch(`http://order-service/api/orders/${userId}`);
  return response.json();
}
```

**Pros:**
- Simple to implement
- Request-response pattern
- Easy to debug

**Cons:**
- Tight coupling
- Network latency
- Cascading failures

**2. Asynchronous Communication (Message Queue):**
```typescript
// Order Service publishes event
await messageQueue.publish('order.created', {
  orderId: '123',
  userId: '456',
  amount: 1000
});

// Payment Service subscribes
messageQueue.subscribe('order.created', async (event) => {
  await processPayment(event);
});
```

**Pros:**
- Loose coupling
- Better fault tolerance
- Scalability

**Cons:**
- Eventual consistency
- Complex debugging
- Message ordering challenges

### Service Discovery

**Problem:**
- Services ka address dynamically change hota hai
- Hard-coded URLs maintain karna mushkil

**Solution - Service Discovery:**
```typescript
// Service Registry Pattern
class ServiceRegistry {
  private services: Map<string, string[]> = new Map();

  register(serviceName: string, address: string): void {
    const addresses = this.services.get(serviceName) || [];
    addresses.push(address);
    this.services.set(serviceName, addresses);
  }

  discover(serviceName: string): string {
    const addresses = this.services.get(serviceName);
    return addresses[Math.floor(Math.random() * addresses.length)];
  }
}
```

**Tools:**
- Consul
- Eureka
- Kubernetes Service Discovery
- etcd

### API Gateway Pattern

**Purpose:**
- Single entry point for all clients
- Request routing
- Authentication/Authorization
- Rate limiting
- Load balancing

**Example:**
```typescript
// API Gateway
app.post('/api/orders', authenticate, async (req, res) => {
  // Route to order service
  const response = await fetch('http://order-service/api/orders', {
    method: 'POST',
    body: JSON.stringify(req.body),
    headers: { 'Authorization': req.headers.authorization }
  });
  res.json(await response.json());
});
```

---

## B) Easy English Theory

### What are Microservices?

Microservices is an architectural pattern where an application is built as a collection of small, independent services. Each service:
- Runs in its own process
- Has its own database
- Communicates via well-defined APIs
- Can be developed, deployed, and scaled independently

### Key Principles

**1. Single Responsibility:**
- Each service does one thing well
- Clear boundaries
- Focused functionality

**2. Decentralized:**
- No shared database
- Independent data management
- Service-specific databases

**3. Fault Tolerance:**
- Services fail independently
- Circuit breakers prevent cascading failures
- Graceful degradation

**4. Scalability:**
- Scale services based on demand
- Resource optimization
- Cost-effective scaling

### Communication Patterns

**Synchronous:**
- HTTP/REST APIs
- gRPC
- Request-response pattern
- Immediate consistency

**Asynchronous:**
- Message queues (RabbitMQ, Kafka)
- Event-driven architecture
- Eventual consistency
- Better decoupling

---

## C) Practical Implementation

### Microservice Structure (Node.js + TypeScript)

**Project Structure:**
```
user-service/
  src/
    controllers/
      user.controller.ts
    services/
      user.service.ts
    models/
      user.model.ts
    routes/
      user.routes.ts
    middleware/
      auth.middleware.ts
    config/
      database.ts
      redis.ts
    utils/
      logger.ts
      errors.ts
  package.json
  tsconfig.json
  Dockerfile
```

### User Service Example

```typescript
// src/services/user.service.ts
import { User } from '../models/user.model';
import { AppError } from '../utils/errors';

export class UserService {
  async createUser(userData: {
    name: string;
    email: string;
    password: string;
  }): Promise<User> {
    // Validate input
    if (!userData.email || !userData.password) {
      throw new AppError('Email and password required', 400);
    }

    // Check if user exists
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new AppError('User already exists', 409);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Create user
    const user = await User.create({
      name: userData.name,
      email: userData.email,
      password: hashedPassword
    });

    // Publish event (async communication)
    await eventBus.publish('user.created', {
      userId: user.id,
      email: user.email
    });

    return user;
  }

  async getUserById(id: string): Promise<User> {
    const user = await User.findById(id);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    return user;
  }
}
```

### Service Communication

```typescript
// src/utils/service-client.ts
import axios from 'axios';

class ServiceClient {
  private baseURL: string;
  private timeout: number = 5000;

  constructor(serviceName: string) {
    this.baseURL = process.env[`${serviceName.toUpperCase()}_SERVICE_URL`] || '';
  }

  async get<T>(endpoint: string): Promise<T> {
    try {
      const response = await axios.get(`${this.baseURL}${endpoint}`, {
        timeout: this.timeout
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(`Service error: ${error.response.status}`);
      }
      throw new Error('Service unavailable');
    }
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    try {
      const response = await axios.post(`${this.baseURL}${endpoint}`, data, {
        timeout: this.timeout
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(`Service error: ${error.response.status}`);
      }
      throw new Error('Service unavailable');
    }
  }
}

// Usage
const orderService = new ServiceClient('order');
const orders = await orderService.get(`/orders/user/${userId}`);
```

### Circuit Breaker Pattern

```typescript
// src/utils/circuit-breaker.ts
class CircuitBreaker {
  private failures: number = 0;
  private lastFailureTime: number = 0;
  private state: 'CLOSED' | 'OPEN' | 'HALF_OPEN' = 'CLOSED';
  private readonly threshold: number = 5;
  private readonly timeout: number = 60000; // 1 minute

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailureTime > this.timeout) {
        this.state = 'HALF_OPEN';
      } else {
        throw new Error('Circuit breaker is OPEN');
      }
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private onSuccess(): void {
    this.failures = 0;
    this.state = 'CLOSED';
  }

  private onFailure(): void {
    this.failures++;
    this.lastFailureTime = Date.now();
    if (this.failures >= this.threshold) {
      this.state = 'OPEN';
    }
  }
}
```

---

## D) Interview Questions - Part 2

**Q1: "What are microservices? When would you use them?"**

✅ **Answer:**
"Microservices is an architectural pattern where an application is built as a collection of small, independent services. Each service:
- Runs independently
- Has its own database
- Communicates via APIs
- Can be deployed and scaled separately

**When to use:**
- Large, complex applications
- Need for independent scaling
- Multiple teams working on different features
- Technology diversity requirements
- High availability needs

**When NOT to use:**
- Small applications (overhead not worth it)
- Simple CRUD applications
- Tight coupling requirements
- Limited team/resources"

**Q2: "How do microservices communicate?"**

✅ **Answer:**
"Two main patterns:

**1. Synchronous (HTTP/REST, gRPC):**
- Request-response pattern
- Immediate consistency
- Simple to implement
- Risk of cascading failures

**2. Asynchronous (Message Queues):**
- Event-driven architecture
- Loose coupling
- Better fault tolerance
- Eventual consistency

I prefer async for non-critical operations and sync for operations requiring immediate response. For example, order creation can be async, but payment verification should be sync."

**Q3: "How do you handle data consistency in microservices?"**

✅ **Answer:**
"Several approaches:

**1. Saga Pattern:**
- Distributed transactions
- Each service has compensating actions
- Eventual consistency

**2. Event Sourcing:**
- Store events instead of state
- Rebuild state from events
- Audit trail

**3. Two-Phase Commit (2PC):**
- Synchronous coordination
- Strong consistency
- Performance overhead

**4. Database per Service:**
- Each service owns its data
- No shared database
- API-based communication

In practice, I use Saga pattern for complex workflows and accept eventual consistency where appropriate."

**Q4: "What challenges have you faced with microservices?"**

✅ **Answer:**
"Key challenges:

**1. Distributed System Complexity:**
- Network latency
- Partial failures
- Service discovery

**2. Data Management:**
- Eventual consistency
- Distributed transactions
- Data duplication

**3. Testing:**
- Integration testing complexity
- Service dependencies
- Mock services

**4. Monitoring:**
- Distributed tracing
- Log aggregation
- Performance monitoring

**Solutions:**
- Use circuit breakers for fault tolerance
- Implement distributed tracing (Jaeger, Zipkin)
- Centralized logging (ELK stack)
- Comprehensive monitoring (Prometheus, Grafana)"

---

## E) Key Takeaways

### Must Know:
1. ✅ Microservices vs Monolith trade-offs
2. ✅ Communication patterns (sync vs async)
3. ✅ Service discovery
4. ✅ API Gateway pattern
5. ✅ Circuit breaker pattern
6. ✅ Data consistency strategies

### Next Steps:
- Read dentira3.md for Database topics
- Practice microservices communication patterns
- Understand distributed system challenges

---

**End of Part 2 - Continue to dentira3.md**

