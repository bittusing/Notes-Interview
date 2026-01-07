# DENTIRA INTERVIEW PREPARATION - PART 7
## Event-Driven Architecture

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Event-Driven Architecture kya hai?**
- Event-Driven Architecture ek design pattern hai
- System events ke basis par react karta hai
- Events trigger hote hain, handlers unhe process karte hain
- Asynchronous aur non-blocking nature
- Loose coupling between components

**Real-life Analogy:**
- Restaurant system:
  - Order aata hai (event)
  - Waiter order leta hai (event listener)
  - Kitchen ko bhejta hai (event handler)
  - Food ready hone par (event)
  - Waiter serve karta hai (event handler)
- Har step ek event hai, system react karta hai

**Key Concepts:**
- **Events:** Actions ya occurrences
- **Event Emitters:** Events generate karte hain
- **Event Listeners:** Events ko sunte hain
- **Event Handlers:** Events ko process karte hain

### Event-Driven vs Request-Response

**Request-Response (Synchronous):**
```
Client → Request → Server → Process → Response → Client
```
- Immediate response
- Tight coupling
- Blocking
- Simple but limited

**Event-Driven (Asynchronous):**
```
Service A → Event → Event Bus → Service B (listens)
                              → Service C (listens)
                              → Service D (listens)
```
- Asynchronous processing
- Loose coupling
- Non-blocking
- Scalable

### Benefits of Event-Driven Architecture

**1. Loose Coupling:**
- Services independent
- No direct dependencies
- Easy to modify

**2. Scalability:**
- Services scale independently
- Horizontal scaling
- Load distribution

**3. Fault Tolerance:**
- Service failure doesn't break system
- Event replay possible
- Resilience

**4. Flexibility:**
- Easy to add new consumers
- Multiple handlers per event
- Dynamic routing

---

## B) Event-Driven Patterns

### 1. Event Sourcing

**Concept:**
- Store events instead of state
- Rebuild state from events
- Complete audit trail
- Time travel debugging

**Example:**
```typescript
// Instead of storing current state
{
  userId: "123",
  balance: 1000
}

// Store events
[
  { type: "AccountCreated", userId: "123", initialBalance: 0 },
  { type: "Deposit", userId: "123", amount: 500 },
  { type: "Deposit", userId: "123", amount: 500 }
]

// Rebuild state
const balance = events
  .filter(e => e.type === "Deposit")
  .reduce((sum, e) => sum + e.amount, 0);
```

### 2. CQRS (Command Query Responsibility Segregation)

**Concept:**
- Separate read and write models
- Commands (writes) vs Queries (reads)
- Optimize independently

**Example:**
```typescript
// Write Model (Commands)
class OrderCommandService {
  async createOrder(orderData: CreateOrderDto): Promise<void> {
    // Validate
    // Create order
    // Publish event
    await eventBus.publish('order.created', orderData);
  }
}

// Read Model (Queries)
class OrderQueryService {
  async getOrderById(id: string): Promise<OrderView> {
    // Read from optimized read database
    return await readDb.orders.findOne({ id });
  }
}
```

### 3. Pub/Sub Pattern

**Concept:**
- Publishers publish events
- Subscribers subscribe to events
- Decoupled communication

**Example:**
```typescript
// Publisher
class OrderService {
  async createOrder(orderData: any): Promise<void> {
    const order = await this.create(orderData);
    
    // Publish event
    await eventBus.publish('order.created', {
      orderId: order.id,
      userId: order.userId,
      amount: order.amount
    });
  }
}

// Subscribers
class EmailService {
  constructor() {
    eventBus.subscribe('order.created', this.sendConfirmationEmail);
  }

  async sendConfirmationEmail(event: OrderCreatedEvent): Promise<void> {
    // Send email
  }
}

class InventoryService {
  constructor() {
    eventBus.subscribe('order.created', this.updateInventory);
  }

  async updateInventory(event: OrderCreatedEvent): Promise<void> {
    // Update inventory
  }
}
```

---

## C) Node.js Event Emitter

### Built-in EventEmitter

```typescript
import { EventEmitter } from 'events';

class OrderService extends EventEmitter {
  async createOrder(orderData: any): Promise<Order> {
    const order = await this.saveOrder(orderData);
    
    // Emit event
    this.emit('order.created', {
      orderId: order.id,
      userId: order.userId,
      amount: order.amount
    });
    
    return order;
  }
}

// Usage
const orderService = new OrderService();

// Listen to event
orderService.on('order.created', (event) => {
  console.log('Order created:', event);
  // Send email, update inventory, etc.
});

// Create order
await orderService.createOrder({ userId: '123', amount: 1000 });
```

### Custom Event Bus

```typescript
class EventBus {
  private handlers: Map<string, Function[]> = new Map();

  subscribe(eventType: string, handler: Function): void {
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, []);
    }
    this.handlers.get(eventType)!.push(handler);
  }

  async publish(eventType: string, data: any): Promise<void> {
    const handlers = this.handlers.get(eventType) || [];
    
    // Execute all handlers
    await Promise.all(
      handlers.map(handler => handler(data))
    );
  }

  unsubscribe(eventType: string, handler: Function): void {
    const handlers = this.handlers.get(eventType) || [];
    const index = handlers.indexOf(handler);
    if (index > -1) {
      handlers.splice(index, 1);
    }
  }
}

// Usage
const eventBus = new EventBus();

eventBus.subscribe('order.created', async (event) => {
  await sendEmail(event);
});

eventBus.subscribe('order.created', async (event) => {
  await updateInventory(event);
});

await eventBus.publish('order.created', { orderId: '123' });
```

---

## D) Event-Driven in Microservices

### Service Communication

**Synchronous (Request-Response):**
```typescript
// Order Service calls Payment Service
const payment = await paymentService.processPayment(orderData);
```

**Problems:**
- Tight coupling
- Cascading failures
- Performance issues

**Asynchronous (Event-Driven):**
```typescript
// Order Service publishes event
await eventBus.publish('order.created', orderData);

// Payment Service subscribes
eventBus.subscribe('order.created', async (event) => {
  await processPayment(event);
});
```

**Benefits:**
- Loose coupling
- Better fault tolerance
- Scalability

### Saga Pattern

**Problem:**
- Distributed transactions
- Multiple services involved
- Need for consistency

**Solution - Saga:**
```typescript
// Order Saga
class OrderSaga {
  async execute(orderData: any): Promise<void> {
    try {
      // Step 1: Create order
      const order = await orderService.create(orderData);
      
      // Step 2: Reserve inventory
      await inventoryService.reserve(order.items);
      
      // Step 3: Process payment
      await paymentService.process(order.payment);
      
      // Step 4: Confirm order
      await orderService.confirm(order.id);
      
    } catch (error) {
      // Compensate (rollback)
      await this.compensate(orderData);
      throw error;
    }
  }

  async compensate(orderData: any): Promise<void> {
    // Rollback steps
    await orderService.cancel(orderData.id);
    await inventoryService.release(orderData.items);
    await paymentService.refund(orderData.payment);
  }
}
```

---

## E) Event Store

### What is Event Store?

**Concept:**
- Database for events
- Append-only log
- Event history
- Replay capability

**Benefits:**
- Complete audit trail
- Time travel
- Event replay
- Debugging

**Implementation:**
```typescript
class EventStore {
  async append(streamId: string, event: Event): Promise<void> {
    await db.events.insertOne({
      streamId,
      eventType: event.type,
      eventData: event.data,
      timestamp: new Date(),
      version: await this.getNextVersion(streamId)
    });
  }

  async getEvents(streamId: string): Promise<Event[]> {
    return await db.events
      .find({ streamId })
      .sort({ version: 1 })
      .toArray();
  }

  async replay(streamId: string, handler: Function): Promise<void> {
    const events = await this.getEvents(streamId);
    for (const event of events) {
      await handler(event);
    }
  }
}
```

---

## F) Interview Questions - Part 7

**Q1: "What is Event-Driven Architecture?"**

✅ **Answer:**
"Event-Driven Architecture is a design pattern where system components communicate through events. Instead of direct service calls, services publish events and other services subscribe to them.

**Key Components:**
- **Events:** Occurrences or state changes
- **Event Producers:** Services that publish events
- **Event Consumers:** Services that subscribe to events
- **Event Bus/Broker:** Message routing system

**Benefits:**
- Loose coupling between services
- Scalability (services scale independently)
- Fault tolerance (service failure doesn't break system)
- Flexibility (easy to add new consumers)

**Example:**
When an order is created, the order service publishes an 'order.created' event. Multiple services (email, inventory, analytics) subscribe to this event and process it independently."

**Q2: "Event-Driven vs Request-Response?"**

✅ **Answer:**
"Request-Response is synchronous:
- Client waits for response
- Tight coupling
- Immediate consistency
- Simple but limited

Event-Driven is asynchronous:
- Fire and forget
- Loose coupling
- Eventual consistency
- More complex but scalable

**When to use Request-Response:**
- Need immediate response
- Simple operations
- Synchronous workflows

**When to use Event-Driven:**
- Long-running processes
- Multiple consumers
- Decoupled services
- High throughput

I use event-driven for notifications, analytics, and background processing, while request-response for user-facing operations."

**Q3: "Explain Saga Pattern"**

✅ **Answer:**
"Saga pattern manages distributed transactions across multiple services:

**Problem:**
- No distributed transactions in microservices
- Need to maintain consistency
- Services can fail independently

**Solution:**
- Break transaction into steps
- Each step has compensating action
- If step fails, execute compensations

**Example - Order Processing:**
1. Create order
2. Reserve inventory
3. Process payment
4. Confirm order

If payment fails:
- Cancel order
- Release inventory
- Refund (if any)

**Types:**
- **Choreography:** Services coordinate via events
- **Orchestration:** Central coordinator manages flow

I prefer orchestration for complex workflows as it's easier to manage and debug."

**Q4: "What is Event Sourcing?"**

✅ **Answer:**
"Event Sourcing stores events instead of current state:

**Traditional:**
- Store current state
- Update state directly
- Lose history

**Event Sourcing:**
- Store all events
- Rebuild state from events
- Complete audit trail

**Benefits:**
- Complete history
- Time travel debugging
- Audit trail
- Event replay

**Example:**
Instead of storing `{ balance: 1000 }`, store:
- AccountCreated event
- Deposit 500 event
- Deposit 500 event

Rebuild balance by summing deposit events.

**Use Cases:**
- Financial systems
- Audit requirements
- Complex state machines
- Debugging production issues"

---

## G) Key Takeaways

### Must Know:
1. ✅ Event-Driven Architecture concepts
2. ✅ Event Emitter pattern
3. ✅ Pub/Sub pattern
4. ✅ Saga pattern for distributed transactions
5. ✅ Event Sourcing
6. ✅ When to use event-driven vs request-response

### Next Steps:
- Read dentira8.md for Message Brokers
- Understand RabbitMQ and Kafka
- Practice event-driven patterns

---

**End of Part 7 - Continue to dentira8.md**

