# TTL, PUB/SUB

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**TTL (Time To Live) kya hai?**
- TTL automatic expiration time hai
- Cache entries automatically expire
- Memory management
- Stale data avoid karta hai
- Seconds mein specify karte hain

**Pub/Sub (Publish/Subscribe) kya hai?**
- Pub/Sub messaging pattern hai
- Publishers messages send karte hain
- Subscribers messages receive karte hain
- Decoupled communication
- Real-time updates

**Real-life Analogy:**
- TTL = Milk expiry date (automatic expiration)
- Pub/Sub = News channel (publisher) aur viewers (subscribers)

### TTL Features

**Automatic Expiration:**
- Set expiration time
- Redis automatically delete
- Memory cleanup
- No manual deletion needed

**TTL Operations:**
- `SETEX`: Set with expiration
- `EXPIRE`: Set expiration on existing key
- `TTL`: Check remaining time
- `PERSIST`: Remove expiration

### Pub/Sub Pattern

**Components:**
- **Publisher:** Messages publish karta hai
- **Subscriber:** Messages receive karta hai
- **Channel:** Topic/category
- **Message:** Data being sent

**Use Cases:**
- Real-time notifications
- Event broadcasting
- System coordination
- Cache invalidation

---

## B) Easy English Theory

### TTL (Time To Live)

TTL sets automatic expiration time for Redis keys. Keys automatically deleted after TTL expires. Use SETEX or EXPIRE to set TTL. Check remaining time with TTL command. Useful for cache expiration, session management.

### Pub/Sub (Publish/Subscribe)

Pub/Sub is messaging pattern where publishers send messages to channels, subscribers receive messages from channels. Decoupled communication - publishers don't know subscribers. Use for real-time updates, notifications, event broadcasting.

---

## C) Why This Concept Exists

### The Problem

**Without TTL:**
- Manual cache cleanup
- Memory leaks
- Stale data
- Memory management issues

**Without Pub/Sub:**
- Tight coupling
- Direct dependencies
- Difficult scaling
- No real-time updates

### The Solution

**TTL Provides:**
1. **Automatic Cleanup:** No manual deletion
2. **Memory Management:** Prevents leaks
3. **Fresh Data:** Automatic expiration

**Pub/Sub Provides:**
1. **Decoupling:** Loose coupling
2. **Scalability:** Easy to scale
3. **Real-time:** Instant updates
4. **Flexibility:** Multiple subscribers

---

## D) Practical Example (Code)

```javascript
// ============================================
// TTL OPERATIONS
// ============================================

// Set with TTL (seconds)
await client.setEx('user:123', 3600, JSON.stringify(user)); // Expires in 1 hour

// Set expiration on existing key
await client.set('key', 'value');
await client.expire('key', 3600); // Expires in 1 hour

// Check remaining TTL
const ttl = await client.ttl('key'); // Returns seconds, -1 if no expiration, -2 if key doesn't exist

// Remove expiration (make persistent)
await client.persist('key');

// ============================================
// TTL USE CASES
// ============================================

// Session management
await client.setEx(`session:${sessionId}`, 1800, JSON.stringify(sessionData)); // 30 min

// Cache with expiration
await client.setEx(`product:${productId}`, 3600, JSON.stringify(product)); // 1 hour

// Rate limiting
await client.setEx(`rate:${userId}`, 60, '1'); // 1 minute

// ============================================
// PUB/SUB - PUBLISHER
// ============================================

// Publish message to channel
await client.publish('notifications', JSON.stringify({
  userId: '123',
  message: 'New order received'
}));

// Publish to multiple channels
await client.publish('user:123:notifications', JSON.stringify(notification));
await client.publish('admin:notifications', JSON.stringify(notification));

// ============================================
// PUB/SUB - SUBSCRIBER
// ============================================

// Create subscriber client
const subscriber = redis.createClient();
await subscriber.connect();

// Subscribe to channel
await subscriber.subscribe('notifications', (message, channel) => {
  console.log(`Received from ${channel}:`, message);
  const data = JSON.parse(message);
  // Handle notification
});

// Subscribe to multiple channels
await subscriber.subscribe(['notifications', 'updates'], (message, channel) => {
  console.log(`Received from ${channel}:`, message);
});

// Pattern subscription (wildcards)
await subscriber.pSubscribe('user:*:notifications', (message, channel) => {
  console.log(`Received from ${channel}:`, message);
});

// ============================================
// PUB/SUB - REAL-TIME NOTIFICATIONS
// ============================================

// Publisher: Send notification
async function sendNotification(userId, message) {
  await client.publish(`user:${userId}:notifications`, JSON.stringify({
    userId,
    message,
    timestamp: Date.now()
  }));
}

// Subscriber: Receive notifications
const subscriber = redis.createClient();
await subscriber.connect();

await subscriber.subscribe('user:123:notifications', (message) => {
  const notification = JSON.parse(message);
  // Send to user via WebSocket, push notification, etc.
  io.to(`user:${notification.userId}`).emit('notification', notification);
});

// ============================================
// PUB/SUB - CACHE INVALIDATION
// ============================================

// Publisher: Invalidate cache on update
async function updateUser(userId, data) {
  const user = await User.findByIdAndUpdate(userId, data);
  
  // Publish invalidation event
  await client.publish('cache:invalidate', JSON.stringify({
    type: 'user',
    id: userId
  }));
  
  return user;
}

// Subscriber: Listen for invalidation
await subscriber.subscribe('cache:invalidate', async (message) => {
  const { type, id } = JSON.parse(message);
  
  // Invalidate cache
  await client.del(`${type}:${id}`);
});

// ============================================
// PUB/SUB - EVENT BROADCASTING
// ============================================

// Publisher: Broadcast event
async function orderCreated(order) {
  await client.publish('events:order:created', JSON.stringify({
    orderId: order._id,
    userId: order.userId,
    amount: order.amount,
    timestamp: Date.now()
  }));
}

// Multiple subscribers for same event
// Subscriber 1: Update analytics
await subscriber.subscribe('events:order:created', async (message) => {
  const event = JSON.parse(message);
  await updateAnalytics(event);
});

// Subscriber 2: Send email
await subscriber.subscribe('events:order:created', async (message) => {
  const event = JSON.parse(message);
  await sendOrderConfirmationEmail(event);
});

// ============================================
// UNSUBSCRIBE
// ============================================

// Unsubscribe from channel
await subscriber.unsubscribe('notifications');

// Unsubscribe from pattern
await subscriber.pUnsubscribe('user:*:notifications');
```

---

## E) Internal Working

**TTL:**
- Redis tracks expiration time
- Background process checks
- Keys automatically deleted
- Memory freed

**Pub/Sub:**
- Publishers send to channels
- Redis routes to subscribers
- Subscribers receive messages
- Decoupled communication

---

## F) Interview Questions & Answers

### Q1: What is TTL in Redis?

**Answer:**
TTL (Time To Live) sets automatic expiration time for Redis keys. Keys automatically deleted after TTL expires. Use SETEX or EXPIRE to set TTL. Check remaining time with TTL. Use for cache expiration, session management, rate limiting. Prevents memory leaks and stale data.

### Q2: How does Redis Pub/Sub work?

**Answer:**
Pub/Sub is messaging pattern. Publishers send messages to channels using PUBLISH. Subscribers subscribe to channels using SUBSCRIBE and receive messages. Decoupled - publishers don't know subscribers. Use for real-time notifications, event broadcasting, cache invalidation. Supports pattern subscriptions with wildcards.

### Q3: What are use cases for Pub/Sub?

**Answer:**
Use cases: Real-time notifications (send to users), event broadcasting (order created, user registered), cache invalidation (notify all instances), system coordination (distributed systems), live updates (chat, feeds). Pub/Sub enables decoupled, scalable communication.

---

## G) Common Mistakes

### Mistake 1: Not Setting TTL

```javascript
// ❌ WRONG - No expiration
await client.set('key', 'value');
// Memory leak if never deleted

// ✅ CORRECT - Set TTL
await client.setEx('key', 3600, 'value'); // Expires in 1 hour
```

**Why it breaks:** Memory leaks if keys never expire.

---

## H) When to Use & When NOT to Use

Use TTL for cache, sessions, temporary data. Use Pub/Sub for real-time updates, events, notifications. Don't use Pub/Sub for guaranteed delivery (use message queues).

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain TTL and Pub/Sub in Redis."

**You:**
"TTL sets automatic expiration for Redis keys - keys deleted after TTL expires. Use SETEX or EXPIRE. Prevents memory leaks, stale data. Pub/Sub is messaging pattern - publishers send to channels, subscribers receive. Decoupled communication. Use for real-time notifications, event broadcasting, cache invalidation. Supports pattern subscriptions. TTL for automatic cleanup, Pub/Sub for real-time updates."

---

## J) Mini Practice Task

Implement TTL for cache expiration and Pub/Sub for real-time notifications. Handle cache invalidation via Pub/Sub.

---

**END OF TOPIC: TTL, PUB/SUB**

