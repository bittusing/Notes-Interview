# DENTIRA INTERVIEW PREPARATION - PART 4
## Database Design & Optimization

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Database Design kya hai?**
- Database design ek process hai jisme hum decide karte hain:
  - Kaunse tables/collections banane hain
  - Kaunse fields honge
  - Relationships kya hongi
  - Indexes kahan lagane hain
  - Normalization kaise karna hai

**Why Database Design Matters:**
- **Performance:** Proper design = fast queries
- **Scalability:** Good design = easy to scale
- **Data Integrity:** Constraints = consistent data
- **Maintainability:** Clean design = easy to maintain

### Database Design Process

**1. Requirements Analysis:**
- Business requirements samajhna
- Data entities identify karna
- Relationships define karna
- Use cases understand karna

**2. Conceptual Design:**
- ER Diagram banana
- Entities aur relationships
- Attributes define karna

**3. Logical Design:**
- Tables/collections design
- Normalization apply karna
- Constraints define karna

**4. Physical Design:**
- Indexes add karna
- Partitioning strategy
- Optimization techniques

### Normalization

**What is Normalization?**
- Database design technique
- Redundancy reduce karta hai
- Data integrity maintain karta hai
- Multiple normal forms (1NF, 2NF, 3NF, BCNF)

**1NF (First Normal Form):**
- Har column atomic hona chahiye
- No repeating groups
- Unique rows

**Example - Before 1NF:**
```
Users Table:
id | name | skills
1  | John | Java, Node.js, Python
```

**After 1NF:**
```
Users Table:
id | name
1  | John

UserSkills Table:
user_id | skill
1       | Java
1       | Node.js
1       | Python
```

**2NF (Second Normal Form):**
- 1NF + No partial dependencies
- All non-key attributes fully depend on primary key

**3NF (Third Normal Form):**
- 2NF + No transitive dependencies
- Non-key attributes don't depend on other non-key attributes

### Denormalization

**When to Denormalize:**
- Read performance critical
- Write performance less important
- Redundancy acceptable
- Complex joins expensive

**Example:**
```sql
-- Normalized (3NF)
Users: id, name, email
Orders: id, user_id, amount
-- Join needed for user name in orders

-- Denormalized
Orders: id, user_id, user_name, amount
-- User name stored directly (redundant but faster)
```

---

## B) Indexing Strategies

### What are Indexes?

**Index kya hai?**
- Index ek data structure hai
- Fast data retrieval ke liye
- Like book ka index
- Trade-off: Storage space vs Query speed

**How Indexes Work:**
```
Without Index:
- Full table scan
- Check every row
- O(n) complexity

With Index:
- Direct lookup
- B-tree structure
- O(log n) complexity
```

### MySQL Indexing

**1. Primary Key Index:**
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,  -- Automatically indexed
  name VARCHAR(255)
);
```

**2. Unique Index:**
```sql
CREATE UNIQUE INDEX idx_email ON users(email);
```

**3. Composite Index:**
```sql
CREATE INDEX idx_user_status ON orders(user_id, status);
-- Order matters! (user_id, status) != (status, user_id)
```

**4. Covering Index:**
```sql
CREATE INDEX idx_covering ON orders(user_id, status, amount);
-- Query: SELECT user_id, status, amount FROM orders WHERE user_id = 1
-- Index contains all needed data (no table lookup)
```

**Index Best Practices:**
- Index frequently queried columns
- Index foreign keys
- Don't over-index (slows writes)
- Use EXPLAIN to analyze queries

**Example:**
```sql
-- Analyze query
EXPLAIN SELECT * FROM orders 
WHERE user_id = 123 AND status = 'completed';

-- Check if index is used
-- Look for 'Using index' in Extra column
```

### MongoDB Indexing

**1. Single Field Index:**
```javascript
db.users.createIndex({ email: 1 }); // 1 = ascending, -1 = descending
```

**2. Compound Index:**
```javascript
db.orders.createIndex({ userId: 1, status: 1 });
// Order matters! Query order should match index order
```

**3. Text Index:**
```javascript
db.products.createIndex({ name: "text", description: "text" });
// Full-text search
db.products.find({ $text: { $search: "laptop" } });
```

**4. Geospatial Index:**
```javascript
db.locations.createIndex({ location: "2dsphere" });
db.locations.find({
  location: {
    $near: {
      $geometry: { type: "Point", coordinates: [longitude, latitude] },
      $maxDistance: 1000
    }
  }
});
```

**Index Types:**
- **Single Field:** One field
- **Compound:** Multiple fields
- **Multikey:** Array fields
- **Text:** Full-text search
- **Geospatial:** Location-based queries
- **TTL:** Time-based expiration

---

## C) Query Optimization

### MySQL Query Optimization

**1. Use EXPLAIN:**
```sql
EXPLAIN SELECT * FROM users WHERE email = 'john@example.com';
```

**Key Columns:**
- **type:** Access method (ALL, index, range, ref, eq_ref)
- **key:** Index used
- **rows:** Rows examined
- **Extra:** Additional information

**2. Avoid SELECT *:**
```sql
-- Bad
SELECT * FROM users;

-- Good
SELECT id, name, email FROM users;
```

**3. Use LIMIT:**
```sql
-- Bad
SELECT * FROM orders WHERE user_id = 1;

-- Good
SELECT * FROM orders WHERE user_id = 1 LIMIT 10;
```

**4. Proper WHERE Clauses:**
```sql
-- Bad (no index usage)
SELECT * FROM users WHERE YEAR(created_at) = 2024;

-- Good (index can be used)
SELECT * FROM users WHERE created_at >= '2024-01-01' 
  AND created_at < '2025-01-01';
```

**5. Join Optimization:**
```sql
-- Ensure foreign keys are indexed
CREATE INDEX idx_user_id ON orders(user_id);

-- Use appropriate join type
-- INNER JOIN: Only matching rows
-- LEFT JOIN: All left table rows
```

### MongoDB Query Optimization

**1. Use Projection:**
```javascript
// Bad
db.users.find({ email: 'john@example.com' });

// Good (only fetch needed fields)
db.users.find(
  { email: 'john@example.com' },
  { name: 1, email: 1, _id: 0 }
);
```

**2. Use Indexes:**
```javascript
// Create index
db.orders.createIndex({ userId: 1, status: 1 });

// Query uses index
db.orders.find({ userId: 123, status: 'completed' });
```

**3. Limit Results:**
```javascript
// Bad
db.orders.find({ userId: 123 });

// Good
db.orders.find({ userId: 123 }).limit(10);
```

**4. Use Aggregation Efficiently:**
```javascript
// Match early in pipeline
db.orders.aggregate([
  { $match: { status: 'completed' } }, // Filter first
  { $group: { _id: '$userId', total: { $sum: '$amount' } } },
  { $sort: { total: -1 } },
  { $limit: 10 }
]);
```

**5. Avoid Large Arrays:**
```javascript
// Bad (large embedded array)
{
  userId: "123",
  orders: [/* 10000 orders */] // Document too large
}

// Good (reference or separate collection)
{
  userId: "123"
}
// Separate orders collection
```

---

## D) Database Design Patterns

### 1. Repository Pattern

**Purpose:**
- Abstract database operations
- Easy to test
- Easy to switch databases

**Implementation:**
```typescript
interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(userData: CreateUserDto): Promise<User>;
  update(id: string, userData: UpdateUserDto): Promise<User>;
  delete(id: string): Promise<void>;
}

class UserRepository implements IUserRepository {
  constructor(private db: Database) {}

  async findById(id: string): Promise<User | null> {
    return await this.db.collection('users').findOne({ _id: id });
  }

  async create(userData: CreateUserDto): Promise<User> {
    const result = await this.db.collection('users').insertOne(userData);
    return this.findById(result.insertedId);
  }
}
```

### 2. Unit of Work Pattern

**Purpose:**
- Manage transactions
- Track changes
- Batch operations

**Implementation:**
```typescript
class UnitOfWork {
  private changes: Map<string, any> = new Map();

  async save(entity: any): Promise<void> {
    this.changes.set(entity.id, entity);
  }

  async commit(): Promise<void> {
    // Execute all changes in transaction
    await this.db.transaction(async (session) => {
      for (const [id, entity] of this.changes) {
        await this.db.collection('users').updateOne(
          { _id: id },
          { $set: entity },
          { session }
        );
      }
    });
    this.changes.clear();
  }
}
```

### 3. Soft Delete Pattern

**Purpose:**
- Keep deleted records
- Audit trail
- Recovery option

**Implementation:**
```typescript
// Schema
{
  _id: ObjectId("..."),
  name: "John",
  deletedAt: null, // null = not deleted
  deletedBy: null
}

// Delete
async softDelete(id: string, userId: string): Promise<void> {
  await this.db.collection('users').updateOne(
    { _id: id },
    { 
      $set: { 
        deletedAt: new Date(),
        deletedBy: userId
      }
    }
  );
}

// Query (exclude deleted)
async findAll(): Promise<User[]> {
  return await this.db.collection('users')
    .find({ deletedAt: null })
    .toArray();
}
```

---

## E) Interview Questions - Part 4

**Q1: "How do you design a database schema?"**

✅ **Answer:**
"I follow a systematic approach:

**1. Requirements Analysis:**
- Understand business requirements
- Identify entities and relationships
- Define use cases

**2. Conceptual Design:**
- Create ER diagram
- Identify entities, attributes, relationships
- Define cardinality (one-to-one, one-to-many, many-to-many)

**3. Normalization:**
- Apply 1NF, 2NF, 3NF
- Eliminate redundancy
- Ensure data integrity

**4. Physical Design:**
- Create tables/collections
- Add indexes on frequently queried fields
- Define constraints
- Consider partitioning if needed

**5. Optimization:**
- Analyze query patterns
- Add appropriate indexes
- Consider denormalization for read-heavy scenarios
- Test and iterate"

**Q2: "Explain normalization with example"**

✅ **Answer:**
"Normalization eliminates redundancy and ensures data integrity.

**Example - E-commerce Orders:**

**Before Normalization:**
```
Orders Table:
order_id | user_name | user_email | product_name | quantity | price
1        | John      | john@...   | Laptop       | 2        | 50000
1        | John      | john@...   | Mouse        | 1        | 500
```

**Problems:**
- User data repeated
- Update anomaly (change email = update multiple rows)
- Insert anomaly (can't add user without order)

**After Normalization (3NF):**
```
Users: user_id, name, email
Products: product_id, name, price
Orders: order_id, user_id, total
OrderItems: order_id, product_id, quantity
```

**Benefits:**
- No redundancy
- Easy updates
- Data integrity
- Flexible queries"

**Q3: "How do you optimize slow queries?"**

✅ **Answer:**
"My optimization process:

**1. Identify Problem:**
- Use EXPLAIN (MySQL) or explain() (MongoDB)
- Check execution time
- Identify full table scans

**2. Add Indexes:**
- Index WHERE clause columns
- Index JOIN columns
- Composite indexes for multiple conditions
- Covering indexes for SELECT-only queries

**3. Query Refactoring:**
- Avoid SELECT *
- Use LIMIT for pagination
- Optimize JOINs
- Use appropriate WHERE clauses

**4. Schema Optimization:**
- Denormalize if reads are heavy
- Partition large tables
- Archive old data

**5. Monitor:**
- Track query performance
- Use slow query logs
- Set up alerts

**Example:**
```sql
-- Slow query
SELECT * FROM orders WHERE user_id = 123 AND status = 'pending';

-- Add index
CREATE INDEX idx_user_status ON orders(user_id, status);

-- Optimized query
SELECT id, amount FROM orders 
WHERE user_id = 123 AND status = 'pending';
```"

---

## F) Key Takeaways

### Must Know:
1. ✅ Normalization (1NF, 2NF, 3NF)
2. ✅ When to denormalize
3. ✅ Indexing strategies
4. ✅ Query optimization techniques
5. ✅ Database design patterns
6. ✅ EXPLAIN and query analysis

### Next Steps:
- Read dentira5.md for REST APIs
- Practice database design exercises
- Understand indexing in depth

---

**End of Part 4 - Continue to dentira5.md**

