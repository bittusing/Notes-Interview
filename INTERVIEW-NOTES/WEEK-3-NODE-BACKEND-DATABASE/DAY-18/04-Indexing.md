# INDEXING

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Indexing kya hai?**
- Index ek data structure hai jo queries ko fast karta hai
- Books ke index jaisa - direct page number milta hai
- Database mein indexes columns par banaye jate hain
- Search speed dramatically improve hoti hai
- Trade-off: Storage space aur write performance

**Real-life Analogy:**
- Book ka index
- Index = Book index (page numbers)
- Data = Book pages
- Query = Topic search
- Index se direct page milta hai, pura book scan nahi karna padta

**Why Indexing?**
- Without index: Full table scan (slow)
- With index: Direct lookup (fast)
- Query performance improve
- Essential for large tables

### Types of Indexes

**1. Single Column Index:**
- Ek column par index
- Most common
- Fast lookups on that column

**2. Composite Index:**
- Multiple columns par index
- Order matters
- Left-prefix rule

**3. Unique Index:**
- Unique values only
- Prevents duplicates
- Primary key automatically indexed

**4. Full-Text Index:**
- Text search ke liye
- Keywords search
- Full-text search queries

**5. Partial Index:**
- Subset of rows par index
- Conditional index
- Space efficient

### Index Data Structures

**B-Tree Index:**
- Most common
- Balanced tree
- O(log n) lookup
- Range queries support

**Hash Index:**
- Hash table
- O(1) lookup (average)
- Equality queries only
- No range queries

**Bitmap Index:**
- Bit arrays
- Low cardinality columns
- Space efficient
- Boolean operations

---

## B) Easy English Theory

### What is Indexing?

Indexing creates data structures (indexes) on columns to speed up queries. Without indexes, databases scan entire tables (slow). With indexes, databases can quickly locate data (fast). Trade-off: Faster reads, but slower writes and more storage.

### Index Types

**Single Column:** Index on one column
**Composite:** Index on multiple columns (order matters)
**Unique:** Ensures unique values
**Full-Text:** For text search
**Partial:** Index on subset of rows

### Data Structures

**B-Tree:** Most common, balanced tree, O(log n), supports ranges
**Hash:** Hash table, O(1), equality only
**Bitmap:** Bit arrays, low cardinality

---

## C) Why This Concept Exists

### The Problem

**Without Indexes:**
- Full table scans (slow)
- O(n) complexity
- Poor query performance
- Unacceptable for large tables

### The Solution

**Indexing Provides:**
1. **Speed:** Fast data lookup
2. **Efficiency:** O(log n) instead of O(n)
3. **Performance:** Query optimization
4. **Scalability:** Works with large datasets

---

## D) Practical Example (Code)

```javascript
// ============================================
// MONGODB INDEXING
// ============================================

// Create single column index
await User.createIndex({ email: 1 });

// Create composite index
await User.createIndex({ email: 1, status: 1 });

// Create unique index
await User.createIndex({ email: 1 }, { unique: true });

// Create text index
await Article.createIndex({ title: 'text', content: 'text' });

// Query using index
const user = await User.findOne({ email: 'user@example.com' });
// Uses email index for fast lookup

// ============================================
// POSTGRESQL INDEXING
// ============================================

// Create index
CREATE INDEX idx_user_email ON users(email);

// Composite index
CREATE INDEX idx_user_email_status ON users(email, status);

// Unique index
CREATE UNIQUE INDEX idx_user_email_unique ON users(email);

// Partial index
CREATE INDEX idx_active_users ON users(email) WHERE status = 'active';

// Query uses index automatically
SELECT * FROM users WHERE email = 'user@example.com';
-- Uses idx_user_email

// ============================================
// INDEX IMPACT EXAMPLE
// ============================================

// Without index: Full table scan
// Table with 1 million rows
// Query: SELECT * FROM users WHERE email = 'user@example.com'
// Scans all 1 million rows (slow)

// With index: Index lookup
// Same query with index on email
// Uses B-tree index
// Finds row in ~20 operations (fast)

// ============================================
// COMPOSITE INDEX - ORDER MATTERS
// ============================================

// Index: (email, status)
CREATE INDEX idx_email_status ON users(email, status);

// ✅ Uses index (left-prefix)
SELECT * FROM users WHERE email = 'user@example.com';
SELECT * FROM users WHERE email = 'user@example.com' AND status = 'active';

// ❌ Doesn't use index efficiently
SELECT * FROM users WHERE status = 'active';
-- Can't use index efficiently (status is second column)

// ============================================
// EXPLAIN QUERY PLAN
// ============================================

// MongoDB - Check if index used
const explain = await User.find({ email: 'user@example.com' }).explain();
console.log(explain.executionStats.executionStages);
// Check if index scan or collection scan

// PostgreSQL - EXPLAIN ANALYZE
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'user@example.com';
-- Shows query plan and execution time
-- "Index Scan using idx_user_email" = uses index
-- "Seq Scan" = full table scan

// ============================================
// INDEX MAINTENANCE
// ============================================

// Rebuild index (PostgreSQL)
REINDEX INDEX idx_user_email;

// Drop index
DROP INDEX idx_user_email;

// List indexes
-- PostgreSQL
SELECT * FROM pg_indexes WHERE tablename = 'users';

-- MongoDB
db.users.getIndexes();

// ============================================
// WHEN TO INDEX
// ============================================

// Index these:
// - Primary keys (automatic)
// - Foreign keys (often)
// - Frequently queried columns
// - Columns in WHERE clauses
// - Columns in JOIN conditions
// - Columns in ORDER BY

// Don't over-index:
// - Rarely queried columns
// - Frequently updated columns (trade-off)
// - Small tables (index overhead > benefit)
```

---

## E) Internal Working

### B-Tree Index Structure

```
Root Node
├── [10, 20, 30]
│
├── Leaf: [1-9] → Data pointers
├── Leaf: [10-19] → Data pointers
├── Leaf: [20-29] → Data pointers
└── Leaf: [30+] → Data pointers
```

**Lookup Process:**
1. Start at root
2. Compare value
3. Navigate to child
4. Repeat until leaf
5. Retrieve data

### Index Maintenance

**On Insert:**
- Find position in index
- Insert entry
- Balance tree if needed

**On Update:**
- Update index entry
- Rebalance if needed

**On Delete:**
- Remove index entry
- Balance tree

---

## F) Interview Questions & Answers

### Q1: What is database indexing and why is it important?

**Answer:**
Indexing creates data structures on columns to speed up queries. Without indexes, databases perform full table scans (O(n) - slow). With indexes, databases can quickly locate data (O(log n) - fast). Indexes are essential for query performance, especially on large tables. Trade-off: Faster reads but slower writes and more storage.

### Q2: What types of indexes exist?

**Answer:**
Types: Single column index (one column), composite index (multiple columns, order matters), unique index (prevents duplicates), full-text index (text search), partial index (subset of rows). Common data structures: B-tree (most common, balanced, O(log n), supports ranges), Hash (O(1), equality only), Bitmap (low cardinality).

### Q3: How does composite index ordering matter?

**Answer:**
Composite index order matters due to left-prefix rule. Index on (A, B, C) can efficiently support queries on (A), (A, B), or (A, B, C), but not efficiently on (B) or (C) alone. Database can only use index from left to right. Design composite indexes based on query patterns.

### Q4: What are the trade-offs of indexing?

**Answer:**
Benefits: Faster queries (O(log n) vs O(n)), better performance on large tables, supports sorting and joins. Costs: Additional storage space, slower writes (must update index), maintenance overhead, memory usage. Don't over-index - balance based on query patterns.

### Q5: When should you create indexes and when should you avoid them?

**Answer:**
Create indexes on: Frequently queried columns, columns in WHERE clauses, foreign keys, columns in JOINs, columns in ORDER BY. Avoid indexes on: Rarely queried columns, frequently updated columns (unless queries benefit), small tables (overhead > benefit), columns with low selectivity (many duplicates).

---

## G) Common Mistakes

### Mistake 1: Over-Indexing

```javascript
// ❌ WRONG - Too many indexes
await User.createIndex({ email: 1 });
await User.createIndex({ name: 1 });
await User.createIndex({ age: 1 });
await User.createIndex({ status: 1 });
await User.createIndex({ createdAt: 1 });
// Every write must update 5 indexes!

// ✅ CORRECT - Index only what's needed
await User.createIndex({ email: 1 }); // Frequently queried
await User.createIndex({ status: 1, createdAt: -1 }); // Common query pattern
```

**Why it breaks:** Too many indexes slow down writes and waste storage.

### Mistake 2: Wrong Composite Index Order

```javascript
// ❌ WRONG - Wrong order
await User.createIndex({ status: 1, email: 1 });
// Query: { email: 'user@example.com' } can't use index efficiently

// ✅ CORRECT - Most selective first
await User.createIndex({ email: 1, status: 1 });
// Query: { email: 'user@example.com' } uses index
// Query: { email: 'user@example.com', status: 'active' } uses index
```

**Why it breaks:** Wrong order prevents efficient index usage.

---

## H) When to Use & When NOT to Use

### Use Indexing When

**1. Frequent Queries**
- Columns queried often
- Performance critical
- Large tables
- WHERE clause columns

**2. Join Operations**
- Foreign keys
- JOIN columns
- Performance optimization

### Avoid Indexing When

**1. Small Tables**
- Overhead > benefit
- Full scan is fast
- Not worth maintenance

**2. Frequently Updated Columns**
- Unless queries benefit significantly
- Write performance impact
- Balance needed

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain Database Indexing."

**You:**
"Indexing creates data structures on columns to speed up queries. Without indexes, databases scan entire tables (O(n) - slow). With indexes, databases quickly locate data (O(log n) - fast).

Common types: Single column, composite (multiple columns, order matters due to left-prefix rule), unique, full-text. B-tree is most common (balanced tree, O(log n), supports ranges).

Create indexes on frequently queried columns, WHERE clause columns, foreign keys. Don't over-index - trade-off between faster reads and slower writes. Use EXPLAIN to verify index usage."

---

## J) Mini Practice Task

Analyze query patterns for a table and design appropriate indexes. Use EXPLAIN to verify index usage and measure performance impact.

---

**END OF TOPIC: INDEXING**

