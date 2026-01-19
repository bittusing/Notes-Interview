# COMMON SYSTEM DESIGN INTERVIEW QUESTIONS

--------------------------------

## 📋 Top 50 System Design Interview Questions

### Fundamental Questions (10)

**Q1: How do you approach a system design interview?**
- Clarify requirements (functional, non-functional, constraints, scale)
- High-level design (components, APIs, database, architecture)
- Detailed design (component details, data flow, algorithms)
- Scale & optimize (bottlenecks, optimization, trade-offs)

**Q2: What are the key principles of system design?**
- Scalability (horizontal/vertical)
- Reliability (fault tolerance)
- Availability (uptime, redundancy)
- Performance (low latency)
- Maintainability (clear architecture)

**Q3: How do you estimate scale for a system?**
- Users: DAU, MAU
- Requests: QPS (queries per second)
- Data: Storage size, growth rate
- Traffic: Read/write ratio
- Calculate: Peak QPS = Daily requests / (24*3600) * peak factor (2-3x)

**Q4: What is the difference between horizontal and vertical scaling?**
- Horizontal: Add more servers, distribute load, unlimited scaling
- Vertical: Upgrade server hardware, limited by hardware, single point of failure
- Use horizontal for: Cloud-native, high availability
- Use vertical for: Small systems, cost-effective initially

**Q5: What is load balancing and why do we need it?**
- Distribute traffic across multiple servers
- Types: Layer 4 (network), Layer 7 (application)
- Algorithms: Round-robin, Least connections, IP hash
- Benefits: High availability, better performance, scalability

**Q6: What are different caching strategies?**
- Cache-Aside: App checks cache, then database
- Write-Through: Write to cache and database
- Write-Back: Write to cache, async to database
- Read-Through: Cache handles reads, auto-updates from database

**Q7: What is a CDN and when do you use it?**
- Content Delivery Network: Edge servers close to users
- Use for: Static assets, images, videos, global distribution
- Benefits: Reduced latency, reduced origin server load, better performance
- Cache invalidation: TTL, manual purge, versioning

**Q8: What is the difference between SQL and NoSQL?**
- SQL: Relational, ACID, structured data, joins, transactions
- NoSQL: Non-relational, flexible schema, horizontal scaling, eventual consistency
- Use SQL for: Structured data, transactions, complex queries
- Use NoSQL for: Unstructured data, high scale, fast writes

**Q9: What is database replication and why do we need it?**
- Copy data to multiple servers
- Master-Slave: One master (writes), multiple slaves (reads)
- Master-Master: Multiple masters (both read/write)
- Benefits: High availability, read scaling, backup

**Q10: What is database sharding?**
- Split data across multiple servers
- Strategies: Hash-based, Range-based, Directory-based
- Benefits: Horizontal scaling, better performance
- Challenges: Cross-shard queries, rebalancing, complexity

---

### Caching & Performance (5)

**Q11: What is cache invalidation and how do you handle it?**
- Remove stale data from cache
- Strategies: TTL, manual invalidation, event-based invalidation
- Patterns: Write-through invalidates, Write-back doesn't
- Challenges: Cache consistency, race conditions

**Q12: What are the trade-offs of caching?**
- Benefits: Faster reads, reduced database load, better performance
- Costs: Memory usage, cache invalidation complexity, stale data risk
- Use when: Read-heavy workloads, expensive queries, frequently accessed data
- Don't use when: Write-heavy, constantly changing data, small dataset

**Q13: How do you handle cache stampede/thundering herd?**
- Problem: Many requests miss cache simultaneously, all hit database
- Solutions: Locking (only one request fetches), early expiration (refresh before expiry), request coalescing (combine requests)
- Example: Use mutex/lock when cache miss, others wait for result

**Q14: What is multi-level caching?**
- Multiple cache layers (L1: in-memory, L2: Redis, L3: CDN)
- Benefits: Faster access to hot data, reduced network calls
- Trade-offs: Complexity, cache consistency across levels
- Use for: Very hot data, different cache characteristics

**Q15: How do you measure cache hit ratio?**
- Hit ratio = Cache hits / Total requests
- Target: >80% for effective caching
- Monitor: Per endpoint, per cache layer, per key pattern
- Optimize: Adjust TTL, add more cache, improve cache keys

---

### Database Design (10)

**Q16: What are ACID properties?**
- Atomicity: All or nothing
- Consistency: Valid state transitions
- Isolation: Concurrent transactions don't interfere
- Durability: Committed changes persist
- Use for: Financial transactions, critical data integrity

**Q17: What is the difference between strong and eventual consistency?**
- Strong: All reads see latest write immediately (synchronous)
- Eventual: All reads eventually see latest write (asynchronous)
- Trade-offs: Strong = slower, eventual = faster but stale data possible
- Use strong for: Financial data, critical operations
- Use eventual for: Social feeds, analytics, high scale

**Q18: What is a database index and when do you create one?**
- Data structure for fast lookups (B-Tree)
- Create for: Foreign keys, frequently queried columns, WHERE clauses
- Don't create for: Low selectivity, small tables, frequently updated columns
- Trade-offs: Faster reads, slower writes

**Q19: What is a composite index and how does order matter?**
- Index on multiple columns (e.g., name, email)
- Order matters: Leftmost column must be in query
- Example: Index (name, email) works for `WHERE name = ?` and `WHERE name = ? AND email = ?`, but not efficiently for `WHERE email = ?` alone

**Q20: What is database connection pooling?**
- Reuse database connections instead of creating new ones
- Benefits: Reduced overhead, better performance, connection management
- Configuration: Min/max connections, idle timeout, max lifetime
- Use for: Web applications, high concurrency

**Q21: How do you optimize slow database queries?**
- Add indexes on WHERE/ORDER BY columns
- Use EXPLAIN to analyze query plan
- Avoid N+1 queries (use joins or batch loading)
- Optimize JOINs (proper indexes, limit results)
- Use query caching for repeated queries

**Q22: What is read-write splitting?**
- Separate read and write databases
- Writes to master, reads from replicas
- Benefits: Read scaling, reduced master load
- Challenges: Replication lag, read-after-write consistency

**Q23: What is database partitioning?**
- Split table into smaller partitions
- Types: Horizontal (by rows), Vertical (by columns)
- Benefits: Better performance, easier management
- Strategies: Range, Hash, List, Key

**Q24: What is a covering index?**
- Index contains all columns needed for query
- Query can be satisfied from index alone (no table lookup)
- Benefits: Fastest possible query, no random I/O
- Example: Index (email, name), Query `SELECT email, name WHERE email = ?`

**Q25: How do you handle database migration in production?**
- Versioned migrations, backward compatible changes
- Gradual rollout (feature flags), rollback plan
- Dual-write during transition, read from new after migration
- Monitor closely, test on staging first
- Never: Breaking changes without migration path

---

### Microservices & Architecture (10)

**Q26: What is the difference between microservices and monolith?**
- Monolith: Single application, all features together
- Microservices: Separate services, each handles one domain
- Monolith: Simpler, better for small teams
- Microservices: Better scaling, independent deployment, fault isolation

**Q27: What is an API Gateway and why do you need it?**
- Single entry point for all client requests
- Functions: Routing, authentication, rate limiting, load balancing, caching
- Benefits: Decoupling, security, monitoring, versioning
- Examples: Kong, AWS API Gateway, Zuul

**Q28: How do microservices communicate?**
- Synchronous: REST, gRPC (request-response)
- Asynchronous: Message queues (event-driven)
- Use sync for: Real-time operations, simple calls
- Use async for: Decoupling, background processing, high scale

**Q29: What is service discovery?**
- Services find each other dynamically
- Types: Client-side (client queries registry), Server-side (load balancer queries)
- Tools: Consul, Eureka, Kubernetes DNS
- Benefits: Dynamic scaling, no hardcoded IPs

**Q30: What is circuit breaker pattern?**
- Prevents cascade failures
- States: Closed (normal), Open (failing, fast fail), Half-Open (testing)
- Use when: Calling external services, prevent overload
- Example: Hystrix, Resilience4j

**Q31: What is event-driven architecture?**
- Services communicate via events (asynchronous)
- Pattern: Producer publishes event, Consumers subscribe
- Benefits: Decoupling, scalability, resilience
- Tools: Kafka, RabbitMQ, AWS EventBridge

**Q32: What is CQRS (Command Query Responsibility Segregation)?**
- Separate read and write models
- Write model: Optimized for writes, normalized
- Read model: Optimized for reads, denormalized
- Benefits: Better performance, independent scaling
- Use for: High read/write ratio differences

**Q33: What is event sourcing?**
- Store all events (changes) as event log
- Rebuild state by replaying events
- Benefits: Complete audit trail, time travel, scalability
- Challenges: Complexity, storage, eventual consistency
- Use for: Financial systems, audit requirements

**Q34: What is API versioning and how do you implement it?**
- Manage API changes while maintaining compatibility
- Strategies: URL Path (`/api/v1/users`), Header (`Accept: vnd.api.v1+json`), Query (`?version=1`)
- Best: URL Path (clear, explicit)
- Process: Create new version, deprecate old, migrate users

**Q35: What is rate limiting and how do you implement it?**
- Restrict requests per time window
- Algorithms: Fixed Window, Sliding Window, Token Bucket, Leaky Bucket
- Implementation: In-memory or Redis (distributed)
- Use for: Prevent abuse, ensure fairness, cost control

---

### Distributed Systems (10)

**Q36: What is CAP Theorem?**
- Can choose only 2 of 3: Consistency, Availability, Partition tolerance
- CP: Strong consistency, partition tolerance (e.g., HBase)
- AP: Availability, partition tolerance (e.g., DynamoDB)
- CA: Consistency, Availability (not distributed, e.g., single database)
- Most systems: Choose AP or CP based on requirements

**Q37: What is BASE (Basically Available, Soft state, Eventual consistency)?**
- Alternative to ACID for distributed systems
- Basically Available: System remains operational
- Soft state: State may change without input
- Eventual consistency: Eventually consistent
- Use for: High scale, distributed systems

**Q38: What is distributed locking?**
- Coordinate access to shared resource across multiple servers
- Implementations: Redis (SET NX), ZooKeeper, database locks
- Use for: Preventing duplicate processing, leader election
- Challenges: Deadlock, livelock, network partitions

**Q39: What is leader election?**
- Select one leader from multiple candidates
- Algorithms: Paxos, Raft
- Use for: Distributed systems, master selection
- Tools: ZooKeeper, etcd, Consul

**Q40: What is a distributed transaction?**
- Transaction spanning multiple databases/services
- Patterns: Two-Phase Commit (2PC), Saga pattern
- 2PC: Coordinated commit (blocking, complex)
- Saga: Sequence of local transactions with compensation (non-blocking)
- Use Saga for: Microservices, high scale

**Q41: What is eventual consistency and how do you handle it?**
- All reads eventually see latest write (not immediately)
- Strategies: Read-your-writes (session affinity), Monotonic reads, Consistent prefix
- Handle: Version vectors, conflict resolution, idempotency
- Use for: High scale, distributed systems, social feeds

**Q42: What is idempotency and why is it important?**
- Operation produces same result regardless of how many times executed
- Use for: Retry safety, distributed systems, API design
- Implement: Unique request IDs, check before processing, idempotency keys
- Example: Payment with payment_id, check if already processed

**Q43: What is a message queue and when do you use it?**
- Asynchronous communication between services
- Types: Point-to-Point (one-to-one), Pub/Sub (one-to-many)
- Tools: RabbitMQ (routing), Kafka (streaming), SQS (managed)
- Use for: Decoupling, reliability, scalability, async processing

**Q44: What is dead letter queue (DLQ)?**
- Storage for messages that failed processing after retries
- Configure: Max retry attempts, move to DLQ after limit
- Use for: Debugging failed messages, monitoring, reprocessing
- Monitor: DLQ size, failure patterns, alert on high rate

**Q45: How do you handle message ordering in distributed systems?**
- Use single partition/queue per entity (partition by key)
- Single consumer per partition
- Sequence numbers, FIFO queues
- Trade-offs: Strict ordering reduces parallelism
- Example: User orders by userId, single consumer per user

---

### Design Questions - Popular Systems (5)

**Q46: Design a URL shortener (like bit.ly)**
- Requirements: Shorten URLs, redirect, 100M URLs/day, 5 years retention
- Components: API server, URL service, database (sharded), cache (Redis), load balancer
- Algorithm: Base62 encoding, hash-based sharding
- Scale: 100M/day = 1,160 QPS, 182B URLs in 5 years

**Q47: Design a web crawler**
- Requirements: Crawl web pages, respect robots.txt, handle billions of pages
- Components: URL frontier, downloader, parser, deduplicator, storage
- Challenges: Politeness (rate limiting), duplicate detection (bloom filter), distributed crawling
- Scale: Billions of URLs, distributed architecture

**Q48: Design a chat application (like WhatsApp)**
- Requirements: Real-time messaging, group chats, 1B users, offline delivery
- Components: Chat service, message queue, presence service, push notifications, storage
- Challenges: Real-time delivery (WebSocket), message ordering, offline storage, scale
- Architecture: Microservices, message queues, distributed storage

**Q49: Design a notification system**
- Requirements: Email, SMS, push notifications, 1B users, different channels
- Components: Notification service, queue (per channel), delivery service, template service
- Challenges: Different channels, retry logic, rate limiting, personalization
- Architecture: Event-driven, separate queues per channel

**Q50: Design a distributed cache**
- Requirements: In-memory cache, distributed across servers, high availability
- Components: Cache nodes, consistent hashing, replication, eviction policies
- Challenges: Cache invalidation, consistency, partitioning
- Architecture: Consistent hashing, replication, gossip protocol

---

## 📝 Practice Scenarios

### Scenario 1: Design Twitter/X
**Requirements:**
- Post tweets (280 characters)
- Follow/unfollow users
- Timeline feed (home timeline, user timeline)
- Like, retweet, reply
- 500M users, 200M DAU, 500M tweets/day

**Key Points:**
- Fan-out pattern for timeline
- Caching strategy (home timeline in cache)
- Sharding by user_id
- Real-time updates (push notifications)

### Scenario 2: Design Instagram
**Requirements:**
- Upload/view photos
- Follow users, news feed
- Like, comment
- Stories (24 hours)
- 1B users, 500M DAU

**Key Points:**
- Photo storage (object storage like S3)
- CDN for photo delivery
- News feed generation (fan-out or pull model)
- Stories expiration (TTL)

### Scenario 3: Design Uber/Lyft
**Requirements:**
- Real-time ride matching
- Track driver location
- Price calculation
- Payment processing
- 100M users, real-time matching

**Key Points:**
- Real-time location tracking (WebSocket)
- Geospatial indexing (find nearby drivers)
- Matching algorithm (proximity, availability)
- Event-driven architecture

### Scenario 4: Design Netflix
**Requirements:**
- Video streaming
- Recommendations
- Multiple devices
- Global distribution
- 200M subscribers

**Key Points:**
- CDN for video delivery (edge servers)
- Adaptive bitrate streaming
- Recommendation algorithm (ML)
- Multiple quality levels

### Scenario 5: Design Dropbox/Google Drive
**Requirements:**
- File upload/download
- File synchronization
- Version history
- Sharing and permissions
- 500M users

**Key Points:**
- Object storage (S3)
- Conflict resolution (last-write-wins or merge)
- Delta sync (only changed parts)
- Access control (permissions)

---

**END OF TOPIC: COMMON SYSTEM DESIGN QUESTIONS**
