# KAFKA FUNDAMENTALS

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Kafka kya hai?**
- Kafka distributed event streaming platform hai
- High-throughput messaging system
- Event-driven architecture ke liye
- Producers events publish karte hain
- Consumers events consume karte hain

**Real-life Analogy:**
- Kafka = News wire service
- Producers = News agencies (publish news)
- Consumers = Newspapers (consume news)
- Topics = News categories
- Partitions = Different editions

**Kafka Components:**
- **Broker:** Kafka server
- **Topic:** Category/channel
- **Partition:** Topic ka shard
- **Producer:** Message sender
- **Consumer:** Message receiver
- **Consumer Group:** Consumers ka group

### Kafka Architecture

**Distributed System:**
- Multiple brokers (servers)
- Topics partitioned across brokers
- Replication for fault tolerance
- High availability

**Topics & Partitions:**
- Topic = Category of messages
- Partition = Topic ka shard
- Parallel processing enable
- Ordering within partition

**Producers & Consumers:**
- Producers write to topics
- Consumers read from topics
- Consumer groups coordinate
- Offset tracking

---

## B) Easy English Theory

### What is Kafka?

Kafka is distributed event streaming platform for high-throughput messaging. Components: Brokers (servers), Topics (categories), Partitions (shards), Producers (publishers), Consumers (readers), Consumer Groups (coordination). Features: High throughput, fault tolerance, scalability, event ordering.

### Key Concepts

**Topics:** Categories of messages (like channels)
**Partitions:** Topic shards for parallel processing
**Producers:** Publish messages to topics
**Consumers:** Read messages from topics
**Consumer Groups:** Coordinate consumers, enable parallel processing
**Offsets:** Track read position in partition

---

## C) Why This Concept Exists

### The Problem

**Without Kafka:**
- Low throughput
- No fault tolerance
- Difficult scaling
- No event ordering
- Tight coupling

### The Solution

**Kafka Provides:**
1. **High Throughput:** Millions of messages/second
2. **Fault Tolerance:** Replication
3. **Scalability:** Distributed architecture
4. **Ordering:** Within partitions
5. **Decoupling:** Event-driven architecture

---

## D) Practical Example (Code)

```javascript
// ============================================
// KAFKA PRODUCER
// ============================================

const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092']
});

const producer = kafka.producer();
await producer.connect();

// Send message to topic
await producer.send({
  topic: 'orders',
  messages: [{
    key: orderId,
    value: JSON.stringify({
      orderId,
      userId,
      amount,
      items
    })
  }]
});

// Send multiple messages
await producer.send({
  topic: 'orders',
  messages: [
    { key: '1', value: JSON.stringify(order1) },
    { key: '2', value: JSON.stringify(order2) }
  ]
});

// ============================================
// KAFKA CONSUMER
// ============================================

const consumer = kafka.consumer({ groupId: 'order-processors' });
await consumer.connect();
await consumer.subscribe({ topic: 'orders', fromBeginning: true });

// Consume messages
await consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    const order = JSON.parse(message.value.toString());
    console.log('Processing order:', order.orderId);
    
    // Process order
    await processOrder(order);
  }
});

// ============================================
// CONSUMER GROUPS
// ============================================

// Multiple consumers in same group
// Messages distributed across consumers
// Parallel processing

const consumer1 = kafka.consumer({ groupId: 'order-processors' });
const consumer2 = kafka.consumer({ groupId: 'order-processors' });

// Both consumers in same group
// Each gets different messages (load balancing)

// ============================================
// MULTIPLE TOPICS
// ============================================

// Producer: Send to multiple topics
await producer.send({
  topic: 'orders',
  messages: [{ value: JSON.stringify(order) }]
});

await producer.send({
  topic: 'notifications',
  messages: [{ value: JSON.stringify(notification) }]
});

// Consumer: Subscribe to multiple topics
await consumer.subscribe({ 
  topics: ['orders', 'notifications'],
  fromBeginning: true 
});

// ============================================
// ERROR HANDLING
// ============================================

await consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    try {
      const data = JSON.parse(message.value.toString());
      await processOrder(data);
    } catch (error) {
      console.error('Error processing message:', error);
      // Send to dead letter queue or retry
    }
  }
});

// ============================================
// OFFSET MANAGEMENT
// ============================================

// Manual offset commit
await consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    await processOrder(JSON.parse(message.value.toString()));
    
    // Commit offset after processing
    // Automatic by default, but can be manual
  },
  autoCommit: false // Manual commit
});

// ============================================
// KAFKA USE CASES
// ============================================

// Use Case 1: Event Streaming
await producer.send({
  topic: 'user-events',
  messages: [{
    key: userId,
    value: JSON.stringify({
      event: 'user_registered',
      userId,
      timestamp: Date.now()
    })
  }]
});

// Use Case 2: Log Aggregation
await producer.send({
  topic: 'application-logs',
  messages: [{
    value: JSON.stringify({
      level: 'error',
      message: 'Database connection failed',
      timestamp: Date.now()
    })
  }]
});

// Use Case 3: Real-time Analytics
await producer.send({
  topic: 'analytics',
  messages: [{
    key: userId,
    value: JSON.stringify({
      event: 'page_view',
      page: '/products',
      userId,
      timestamp: Date.now()
    })
  }]
});
```

---

## E) Internal Working

**Kafka Architecture:**
- Brokers store topics/partitions
- Producers write to partitions
- Consumers read from partitions
- Consumer groups coordinate
- Offsets track position

**Message Flow:**
1. Producer sends to topic
2. Message stored in partition
3. Consumer reads from partition
4. Offset updated
5. Message processed

---

## F) Interview Questions & Answers

### Q1: What is Kafka and how does it work?

**Answer:**
Kafka is distributed event streaming platform for high-throughput messaging. Components: Brokers (servers), Topics (categories), Partitions (shards), Producers (publishers), Consumers (readers). Producers publish messages to topics, consumers read from topics. Topics partitioned for parallel processing. Consumer groups coordinate consumers. High throughput, fault tolerance, scalability.

### Q2: What are Kafka topics and partitions?

**Answer:**
Topics are categories of messages (like channels). Partitions are topic shards - topic divided into partitions for parallel processing. Messages in partition ordered. Multiple partitions enable parallel processing. Partitions distributed across brokers for scalability.

### Q3: What are consumer groups?

**Answer:**
Consumer groups coordinate multiple consumers. Consumers in same group share work - each message consumed by one consumer in group (load balancing). Enables parallel processing. Different groups can consume same messages independently. Use for scaling consumers.

---

## G) Common Mistakes

### Mistake 1: Not Using Consumer Groups

```javascript
// ❌ WRONG - No consumer group
const consumer = kafka.consumer();
// Can't scale, no coordination

// ✅ CORRECT - Consumer group
const consumer = kafka.consumer({ groupId: 'order-processors' });
// Can scale, coordinated processing
```

**Why it breaks:** Can't scale consumers without groups.

---

## H) When to Use & When NOT to Use

Use Kafka for high-throughput event streaming, real-time analytics, log aggregation, event-driven architecture. Don't use for simple queuing (use RabbitMQ) or when ordering not needed.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain Kafka."

**You:**
"Kafka is distributed event streaming platform for high-throughput messaging. Components: Brokers (servers), Topics (categories), Partitions (shards), Producers (publishers), Consumers (readers), Consumer Groups (coordination). Producers publish to topics, consumers read from topics. Topics partitioned for parallel processing. Consumer groups enable scaling. Features: High throughput, fault tolerance, scalability, event ordering. Use for event streaming, real-time analytics, log aggregation."

---

## J) Mini Practice Task

Set up Kafka producer and consumer. Publish events to topic, consume with consumer group, handle errors.

---

**END OF TOPIC: KAFKA FUNDAMENTALS**

