# DATABASE INDEXING

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Database Index kya hai?**
- Database Index data ko quickly find karne ka mechanism hai
- Query performance improve karta hai
- Like book ka index - direct page find karta hai
- Without index: Full table scan (slow)
- With index: Direct row access (fast)

**Real-life Analogy:**
- Index = Book ka index page
- Table = Book
- Full scan = Page by page search
- Index = Direct page number

**Key Concepts:**
- **Index:** Data structure for fast lookups
- **Primary Key:** Automatic unique index
- **Secondary Index:** Additional indexes
- **Composite Index:** Multiple columns
- **B-Tree:** Common index structure

### Index Types

**1. Primary Index:**
- Primary key ka automatic index
- Unique, not null
- Clustered (data sorted)

**2. Secondary Index:**
- Additional columns ka index
- Non-clustered
- Separate data structure

**3. Composite Index:**
- Multiple columns ka index
- Order matters (left to right)
- Useful for multi-column queries

**4. Unique Index:**
- No duplicate values
- Enforce uniqueness
- Can be NULL (if allowed)

---

## B) Easy English Theory

### What is Database Indexing?

Database Indexing is data structure for fast lookups. Like book index, points to data location. Without index: Full table scan (O(n)), slow for large tables. With index: Direct access (O(log n)), fast lookups. Types: Primary (automatic on PK), Secondary (additional columns), Composite (multiple columns), Unique (no duplicates). Trade-off: Faster reads, slower writes (index maintenance).

---

## C) Why This Concept Exists

### The Problem

**Without Indexing:**
- Slow queries (full table scan)
- Poor performance on large tables
- High CPU usage
- Long response times
- Can't scale

### The Solution

**Indexing Provides:**
1. **Speed:** Fast lookups (O(log n))
2. **Performance:** Better query times
3. **Scalability:** Handle large tables
4. **Efficiency:** Reduced CPU usage
5. **Optimization:** Query optimization

---

## D) Practical Example (Code)

```sql
-- ============================================
// DATABASE INDEXING: CREATION
// ============================================

-- Primary Key Index (automatic)
CREATE TABLE users (
  id INT PRIMARY KEY, -- Automatic index
  email VARCHAR(255) UNIQUE, -- Automatic unique index
  name VARCHAR(255),
  created_at TIMESTAMP
);

-- Secondary Index
CREATE INDEX idx_user_email ON users(email);

-- Composite Index (order matters)
CREATE INDEX idx_user_name_email ON users(name, email);
-- Can use for: WHERE name = ?, WHERE name = ? AND email = ?
-- Can't use efficiently for: WHERE email = ? (must start with name)

-- Unique Index
CREATE UNIQUE INDEX idx_user_email_unique ON users(email);

-- Partial Index (only index specific rows)
CREATE INDEX idx_active_users ON users(email) WHERE active = true;

-- ============================================
// INDEX USAGE EXAMPLES
// ============================================

-- Query 1: Uses primary key index (fast)
SELECT * FROM users WHERE id = 123;
-- Uses: PRIMARY KEY index

-- Query 2: Uses email index (fast)
SELECT * FROM users WHERE email = 'john@example.com';
-- Uses: idx_user_email index

-- Query 3: Uses composite index (fast)
SELECT * FROM users WHERE name = 'John' AND email = 'john@example.com';
-- Uses: idx_user_name_email index (both columns)

-- Query 4: Partial use of composite index (moderate)
SELECT * FROM users WHERE name = 'John';
-- Uses: idx_user_name_email index (leftmost column)

-- Query 5: Can't use composite index efficiently (slow)
SELECT * FROM users WHERE email = 'john@example.com';
-- Full scan or separate email index needed

-- Query 6: Range query (uses index)
SELECT * FROM users WHERE created_at > '2024-01-01';
-- Uses: index on created_at (if exists)

-- ============================================
// INDEX TYPES: BTREE, HASH, FULLTEXT
// ============================================

-- B-Tree Index (default, most common)
CREATE INDEX idx_user_name_btree ON users(name);
-- Good for: Range queries, sorting, equality

-- Hash Index (only equality)
CREATE INDEX idx_user_email_hash ON users USING HASH(email);
-- Good for: Only equality (=), no range or sorting

-- Full-Text Index (text search)
CREATE FULLTEXT INDEX idx_user_description ON users(description);
-- Good for: Text search, LIKE queries

-- ============================================
// INDEX ON EXPRESSIONS
// ============================================

-- Functional Index (computed value)
CREATE INDEX idx_user_lower_email ON users(LOWER(email));
-- Useful for case-insensitive searches
SELECT * FROM users WHERE LOWER(email) = 'john@example.com';

-- ============================================
// MONGODB INDEXING
// ============================================

// Single Field Index
db.users.createIndex({ email: 1 }); // 1 = ascending, -1 = descending

// Compound Index
db.users.createIndex({ name: 1, email: 1 });

// Text Index (full-text search)
db.users.createIndex({ description: "text" });

// Geospatial Index
db.places.createIndex({ location: "2dsphere" });

// TTL Index (auto-delete after time)
db.sessions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 });

// Unique Index
db.users.createIndex({ email: 1 }, { unique: true });

// Sparse Index (only index documents with field)
db.users.createIndex({ phone: 1 }, { sparse: true });

// ============================================
// INDEX STRATEGY: WHEN TO USE
// ============================================

-- Use Index For:
-- 1. Foreign keys (join performance)
CREATE INDEX idx_order_user_id ON orders(user_id);

-- 2. Frequently queried columns
CREATE INDEX idx_user_active ON users(active) WHERE active = true;

-- 3. Sort operations
CREATE INDEX idx_user_created_at ON users(created_at DESC);

-- 4. Range queries
CREATE INDEX idx_user_created_at ON users(created_at);

-- Don't Index:
-- 1. Columns with few unique values (gender: M/F)
-- 2. Small tables (overhead not worth it)
-- 3. Frequently updated columns (index maintenance cost)
-- 4. Columns rarely used in queries

-- ============================================
// INDEX MAINTENANCE
// ============================================

-- Analyze index usage (PostgreSQL)
SELECT * FROM pg_stat_user_indexes;

-- Rebuild index (PostgreSQL)
REINDEX INDEX idx_user_email;

-- Drop unused index
DROP INDEX idx_unused_column;

-- Show index size (MySQL)
SHOW INDEX FROM users;

-- Show query execution plan (uses index?)
EXPLAIN SELECT * FROM users WHERE email = 'john@example.com';
-- Look for: "Using index" in Extra column
```

---

## E) Internal Working

**Index Structure (B-Tree):**
1. Root node (top)
2. Internal nodes (middle)
3. Leaf nodes (bottom, point to data)
4. Balanced tree (log n access)

**Query Flow:**
1. Query arrives (`WHERE email = 'x'`)
2. Check if index exists
3. Traverse B-Tree (root → leaf)
4. Find matching leaf node
5. Get row pointers
6. Fetch actual data
7. Return results

**Write Flow (Index Maintenance):**
1. Insert/Update/Delete data
2. Update table
3. Update all indexes (maintenance cost)
4. Rebalance tree if needed

---

## F) Interview Questions & Answers

### Q1: What is database indexing and how does it work?

**Answer:**
Indexing: Data structure for fast lookups, like book index points to pages. Structure: B-Tree (balanced tree), root → internal → leaf nodes, leaf nodes point to data rows. Performance: Without index = O(n) full scan, With index = O(log n) tree traversal. Types: Primary (PK), Secondary (other columns), Composite (multiple columns), Unique (no duplicates).

### Q2: What is the difference between clustered and non-clustered index?

**Answer:**
Clustered Index: Data physically sorted by index, one per table (usually PK), faster reads (data co-located), slower inserts (must maintain order). Non-Clustered Index: Separate data structure, multiple per table, contains pointers to data, slower reads (extra lookup), faster inserts (no reordering). MySQL InnoDB: PK = clustered, others = non-clustered.

### Q3: What is a composite index and how does column order matter?

**Answer:**
Composite Index: Index on multiple columns (e.g., `(name, email)`). Order Matters: Leftmost column must be in query, can't use efficiently without left column. Example: Index `(name, email)` can use for `WHERE name = ?`, `WHERE name = ? AND email = ?`, but not efficiently for `WHERE email = ?` alone. Rule: Most selective column first, frequently queried columns in order.

### Q4: What are the trade-offs of indexing?

**Answer:**
Benefits: Faster queries (O(log n) vs O(n)), better performance, enables sorting/grouping. Costs: Slower writes (index maintenance), more storage space (index files), memory usage (index loaded in RAM). Balance: Index frequently queried columns, don't index frequently updated columns, avoid over-indexing. Rule: More reads = more indexes, more writes = fewer indexes.

### Q5: When should you create an index and when should you not?

**Answer:**
Create Index For: Foreign keys (join performance), frequently queried columns, columns in WHERE clauses, sort operations (ORDER BY), range queries, unique constraints. Don't Create Index For: Columns with few unique values (low cardinality like gender), small tables (overhead not worth it), frequently updated columns (maintenance cost), columns rarely used in queries. Rule: Index when read benefit > write cost.

### Q6: What is index selectivity and why does it matter?

**Answer:**
Selectivity: Ratio of distinct values to total rows (higher = more selective). High Selectivity: Many unique values (email, username), better index performance, more efficient. Low Selectivity: Few unique values (gender: M/F, active: true/false), less effective index, may not use index. Rule: Create indexes on high selectivity columns first. Example: Email (high) vs Gender (low).

### Q7: How do you optimize queries using indexes?

**Answer:**
Query Optimization: Use EXPLAIN to see index usage, ensure WHERE columns are indexed, use composite indexes properly (leftmost column), avoid functions on indexed columns (`LOWER(email)` breaks index), avoid LIKE patterns starting with `%` (can't use index), use covering index (index contains all needed columns, no table lookup needed). Example: `EXPLAIN SELECT * FROM users WHERE email = ?` → check "Using index".

### Q8: What is a covering index?

**Answer:**
Covering Index: Index that contains all columns needed for query, query can be satisfied from index alone, no table lookup needed, fastest possible query. Example: Index `(email, name)`, Query `SELECT email, name FROM users WHERE email = ?` → index only, no table access. Benefit: Single index lookup, no random disk I/O, very fast. Create covering indexes for frequently accessed columns together.

### Q9: How do indexes affect INSERT, UPDATE, DELETE operations?

**Answer:**
Index Impact on Writes: Slower INSERTs (must update all indexes), slower UPDATEs (index updates if indexed column changed), slower DELETEs (must remove from all indexes). Cost: Each index adds write overhead, more indexes = slower writes. Balance: More indexes help reads but hurt writes. Rule: Don't over-index, remove unused indexes, index only frequently queried columns.

### Q10: What is index fragmentation and how do you handle it?

**Answer:**
Index Fragmentation: Index pages become disorganized over time, gaps from deletes, inefficient disk usage, slower performance. Causes: Many INSERTs/DELETEs, random inserts, updates. Solution: Rebuild index periodically (`REINDEX INDEX name` in PostgreSQL, `ALTER TABLE ... REBUILD INDEX` in MySQL), analyze tables regularly, monitor fragmentation. Performance: Fragmented index slower than fresh index.

---

## G) Common Mistakes

### Mistake 1: Over-Indexing

```sql
-- ❌ WRONG - Too many indexes
CREATE INDEX idx_user_id ON users(id); -- Already PK index
CREATE INDEX idx_user_name ON users(name);
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_user_name_email ON users(name, email); -- Redundant with idx_user_name
CREATE INDEX idx_user_active ON users(active); -- Low selectivity

-- ✅ CORRECT - Strategic indexes
CREATE INDEX idx_user_email ON users(email); -- High selectivity, frequently queried
CREATE INDEX idx_user_name_email ON users(name, email); -- Composite for common query pattern
-- Skip: active (low selectivity), id (already PK)
```

**Why it breaks:** Slower writes, wasted storage, maintenance overhead.

### Mistake 2: Wrong Composite Index Order

```sql
-- ❌ WRONG - Wrong column order
CREATE INDEX idx_user_email_name ON users(email, name);
-- Query: WHERE name = ? AND email = ? → Can't use efficiently

-- ✅ CORRECT - Most selective first
CREATE INDEX idx_user_name_email ON users(name, email);
-- Query: WHERE name = ? AND email = ? → Uses index
-- Query: WHERE name = ? → Uses index
```

**Why it breaks:** Can't use index efficiently, full table scan instead.

### Mistake 3: Functions on Indexed Columns

```sql
-- ❌ WRONG - Function breaks index usage
SELECT * FROM users WHERE LOWER(email) = 'john@example.com';
-- Index on email can't be used

-- ✅ CORRECT - Functional index or no function
-- Option 1: Functional index
CREATE INDEX idx_user_lower_email ON users(LOWER(email));
SELECT * FROM users WHERE LOWER(email) = 'john@example.com';

-- Option 2: No function (store lowercase)
CREATE INDEX idx_user_email ON users(email);
SELECT * FROM users WHERE email = 'john@example.com';
```

**Why it breaks:** Database can't use index with function, full scan required.

---

## H) When to Use & When NOT to Use

**Use Indexing When:**
- Frequently queried columns
- Foreign keys (joins)
- Sort/group operations
- Range queries
- Large tables

**Don't Use When:**
- Small tables (overhead not worth it)
- Low selectivity columns
- Frequently updated columns (balance read/write)
- Columns rarely queried

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain database indexing and best practices."

**You:**
"Database Indexing is data structure for fast lookups (B-Tree). Without index = O(n) full scan, With index = O(log n) tree traversal. Types: Primary (PK, clustered), Secondary (other columns, non-clustered), Composite (multiple columns, order matters).

Trade-offs: Faster reads but slower writes (index maintenance). Create indexes on: Foreign keys, frequently queried columns, high selectivity columns. Don't index: Low selectivity, small tables, frequently updated columns.

Best Practices: Use EXPLAIN to verify index usage, composite index order matters (leftmost column), avoid functions on indexed columns, create covering indexes when possible."

---

## J) Mini Practice Task

Design indexes for e-commerce database: Users table (query by email, name), Orders table (query by user_id, date range), Products table (query by category, price range). Analyze query patterns, create appropriate indexes, verify with EXPLAIN.

---

**END OF TOPIC: DATABASE INDEXING**
