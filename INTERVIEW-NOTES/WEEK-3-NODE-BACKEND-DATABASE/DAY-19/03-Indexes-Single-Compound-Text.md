# INDEXES (SINGLE, COMPOUND, TEXT)

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**MongoDB Indexes kya hain?**
- Indexes queries ko fast karte hain
- B-tree data structure use karte hain
- Columns (fields) par banaye jate hain
- Query performance dramatically improve
- Trade-off: Storage space aur write performance

**Index Types:**

**1. Single Field Index:**
- Ek field par index
- Most common
- Fast lookups on that field

**2. Compound Index:**
- Multiple fields par index
- Order matters (left-prefix rule)
- Multiple fields ke queries ke liye

**3. Text Index:**
- Text search ke liye
- Full-text search enable
- Multiple fields par text search

**4. Geospatial Index:**
- Location data ke liye
- 2dsphere index
- Distance queries

**5. TTL Index:**
- Time-based expiration
- Documents auto-delete
- Useful for sessions, logs

### Single Field Index

**Usage:**
- Frequently queried fields
- Equality queries
- Range queries
- Sort operations

**Example:**
```javascript
// Index on email field
db.users.createIndex({ email: 1 });
// 1 = ascending, -1 = descending
```

### Compound Index

**Usage:**
- Multiple fields in query
- Sort operations
- Left-prefix rule important

**Left-Prefix Rule:**
- Index on (A, B, C)
- Can use: (A), (A, B), (A, B, C)
- Cannot efficiently use: (B), (C), (B, C)

**Example:**
```javascript
// Compound index
db.users.createIndex({ email: 1, status: 1, createdAt: -1 });
// Queries can use: email, email+status, email+status+createdAt
```

### Text Index

**Usage:**
- Full-text search
- Multiple fields search
- Relevance scoring

**Example:**
```javascript
// Text index on multiple fields
db.articles.createIndex({ title: 'text', content: 'text' });
// Search across both fields
```

---

## B) Easy English Theory

### MongoDB Index Types

**Single Field:** Index on one field, most common, fast lookups
**Compound:** Index on multiple fields, order matters (left-prefix), efficient for multi-field queries
**Text:** Full-text search index, multiple fields, relevance scoring

### Index Direction

**1 (Ascending):** Values sorted ascending
**-1 (Descending):** Values sorted descending
**Matters for:** Sort operations, range queries

---

## C) Why This Concept Exists

### The Problem

**Without Indexes:**
- Collection scans (slow)
- O(n) complexity
- Poor query performance
- Unacceptable for large collections

### The Solution

**Indexes Provide:**
1. **Speed:** Fast data lookup
2. **Efficiency:** O(log n) instead of O(n)
3. **Performance:** Query optimization
4. **Scalability:** Works with large datasets

---

## D) Practical Example (Code)

```javascript
// ============================================
// SINGLE FIELD INDEX
// ============================================

// Create single field index
await User.createIndex({ email: 1 });

// Ascending index
await User.createIndex({ createdAt: 1 });

// Descending index
await User.createIndex({ createdAt: -1 });

// Unique index
await User.createIndex({ email: 1 }, { unique: true });

// Sparse index (only index documents with field)
await User.createIndex({ phone: 1 }, { sparse: true });

// Query uses index
const user = await User.findOne({ email: 'user@example.com' });
// Uses email index

// ============================================
// COMPOUND INDEX
// ============================================

// Create compound index
await User.createIndex({ email: 1, status: 1 });

// Multi-field compound index
await User.createIndex({ 
  email: 1, 
  status: 1, 
  createdAt: -1 
});

// ✅ Uses index (left-prefix)
await User.find({ email: 'user@example.com' });
await User.find({ email: 'user@example.com', status: 'active' });
await User.find({ 
  email: 'user@example.com', 
  status: 'active',
  createdAt: { $gte: new Date() }
});

// ❌ Doesn't use index efficiently
await User.find({ status: 'active' }); // Can't use (status is second)

// ============================================
// COMPOUND INDEX - SORT OPTIMIZATION
// ============================================

// Index: { status: 1, createdAt: -1 }
await User.find({ status: 'active' })
  .sort({ createdAt: -1 }); // ✅ Uses index for both filter and sort

// Index: { status: 1, createdAt: 1 }
await User.find({ status: 'active' })
  .sort({ createdAt: -1 }); // ❌ Can't use index for sort (wrong direction)

// ============================================
// TEXT INDEX
// ============================================

// Create text index
await Article.createIndex({ 
  title: 'text', 
  content: 'text' 
});

// Text search query
const articles = await Article.find({
  $text: { $search: 'mongodb tutorial' }
}).sort({ score: { $meta: 'textScore' } });

// Multiple text indexes (one per collection)
// Compound text index
await Article.createIndex({
  title: 'text',
  content: 'text',
  tags: 'text'
});

// ============================================
// INDEX OPTIONS
// ============================================

// Unique index
await User.createIndex({ email: 1 }, { unique: true });

// Partial index (only index matching documents)
await User.createIndex(
  { email: 1 },
  { partialFilterExpression: { status: 'active' } }
);

// TTL index (auto-delete after time)
await Session.createIndex(
  { createdAt: 1 },
  { expireAfterSeconds: 3600 } // Delete after 1 hour
);

// Sparse index (skip null/missing values)
await User.createIndex({ phone: 1 }, { sparse: true });

// ============================================
// INDEX MANAGEMENT
// ============================================

// List indexes
const indexes = await User.collection.getIndexes();
console.log(indexes);

// Drop index
await User.collection.dropIndex('email_1');

// Drop all indexes (except _id)
await User.collection.dropIndexes();

// Rebuild index
await User.collection.reIndex();

// ============================================
// EXPLAIN QUERY PLAN
// ============================================

const explain = await User.find({ email: 'user@example.com' })
  .explain('executionStats');

console.log(explain.executionStats.executionStages);
// Check if index used or collection scan

// ============================================
// INDEX SELECTIVITY
// ============================================

// High selectivity (good for index)
await User.createIndex({ email: 1 }); // Unique values

// Low selectivity (less useful)
await User.createIndex({ status: 1 }); // Few values (active/inactive)

// ============================================
// COVERED QUERIES
// ============================================

// Index: { email: 1, name: 1 }
// Query only uses indexed fields
const result = await User.find(
  { email: 'user@example.com' },
  { email: 1, name: 1, _id: 0 }
);
// Can be satisfied entirely from index (covered query)
// Very fast - no document retrieval needed
```

---

## E) Internal Working

### Index Structure

**B-Tree Index:**
- Balanced tree structure
- O(log n) lookup
- Supports range queries
- Efficient for sorting

### Index Usage

**Query Planning:**
1. Query analyzed
2. Available indexes checked
3. Best index selected
4. Index scan performed
5. Documents retrieved

---

## F) Interview Questions & Answers

### Q1: What types of indexes exist in MongoDB?

**Answer:**
Types: Single field (one field), compound (multiple fields, order matters), text (full-text search), geospatial (location data), TTL (time-based expiration), unique (prevent duplicates), sparse (skip null values), partial (index subset). Most common are single field and compound indexes.

### Q2: How does compound index ordering matter?

**Answer:**
Compound index order matters due to left-prefix rule. Index on (A, B, C) efficiently supports queries on (A), (A, B), or (A, B, C), but not efficiently on (B) or (C) alone. Database can only use index from left to right. Also matters for sort operations - index direction should match sort direction.

### Q3: What is a text index and when would you use it?

**Answer:**
Text index enables full-text search across one or more string fields. Use for searching text content (articles, posts, descriptions). Supports relevance scoring, phrase matching, and language-specific features. Only one text index per collection (but can include multiple fields). Use $text operator for queries.

---

## G) Common Mistakes

### Mistake 1: Wrong Compound Index Order

```javascript
// ❌ WRONG
await User.createIndex({ status: 1, email: 1 });
// Query: { email: 'user@example.com' } can't use efficiently

// ✅ CORRECT
await User.createIndex({ email: 1, status: 1 });
// Query: { email: 'user@example.com' } uses index
```

**Why it breaks:** Left-prefix rule - can't efficiently use second field alone.

---

## H) When to Use & When NOT to Use

Index frequently queried fields, fields in WHERE clauses, sort fields. Don't over-index - balance performance with write cost.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain MongoDB Indexes."

**You:**
"MongoDB indexes speed up queries using B-tree structures. Types: Single field (one field), compound (multiple fields, order matters due to left-prefix rule), text (full-text search). Create indexes on frequently queried fields, WHERE clause fields, sort fields. Use explain() to verify index usage. Trade-off: Faster reads but slower writes and more storage. Don't over-index - balance based on query patterns."

---

## J) Mini Practice Task

Analyze query patterns and create appropriate indexes (single, compound, text). Use explain() to verify usage.

---

**END OF TOPIC: INDEXES (SINGLE, COMPOUND, TEXT)**

