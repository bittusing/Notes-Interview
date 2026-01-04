# PAGINATION STRATEGIES

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Pagination kya hai?**
- Pagination data ko pages mein divide karta hai
- Large datasets ko manageable chunks mein
- Performance improve karta hai
- User experience better
- Multiple strategies available

**Pagination Types:**
- **Offset-based:** skip() aur limit() use
- **Cursor-based:** Last document ID use
- **Keyset Pagination:** Field value use

### Offset Pagination

**How it Works:**
- skip(n) aur limit(m) use
- First n documents skip, next m return
- Simple but slow for large offsets

**Example:**
```javascript
// Page 1: skip(0), limit(10)
// Page 2: skip(10), limit(10)
// Page 3: skip(20), limit(10)
```

**Problems:**
- Slow for large offsets
- Data consistency issues (new data added)
- Inefficient (scans skipped documents)

### Cursor Pagination

**How it Works:**
- Last document ID remember karte hain
- Next page: documents after that ID
- Fast aur consistent
- No offset scanning

**Example:**
```javascript
// First page: limit(10)
// Next page: find({ _id: { $gt: lastId } }).limit(10)
```

**Benefits:**
- Fast (indexed lookup)
- Consistent (no skip issues)
- Efficient (no scanning)

---

## B) Easy English Theory

### Pagination Strategies

**Offset-based:** Use skip() and limit(), simple but slow for large offsets, data consistency issues.

**Cursor-based:** Use last document ID, fast and consistent, no offset scanning, better for large datasets.

**Keyset:** Use field value as cursor, similar to cursor but with any field.

---

## C) Why This Concept Exists

### The Problem

**Without Pagination:**
- Load all data (slow)
- Memory issues
- Poor UX
- Performance problems

### The Solution

**Pagination Provides:**
1. **Performance:** Load only needed data
2. **UX:** Manageable chunks
3. **Efficiency:** Reduced memory
4. **Scalability:** Works with large datasets

---

## D) Practical Example (Code)

```javascript
// ============================================
// OFFSET PAGINATION
// ============================================

async function getUsers(page = 1, limit = 10) {
  const skip = (page - 1) * limit;
  
  const users = await User.find()
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });
  
  const total = await User.countDocuments();
  const totalPages = Math.ceil(total / limit);
  
  return {
    users,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1
    }
  };
}

// ============================================
// CURSOR PAGINATION
// ============================================

async function getUsersCursor(cursor = null, limit = 10) {
  const query = cursor ? { _id: { $gt: cursor } } : {};
  
  const users = await User.find(query)
    .sort({ _id: 1 })
    .limit(limit + 1); // Get one extra to check hasNext
  
  const hasNext = users.length > limit;
  if (hasNext) users.pop();
  
  const nextCursor = users.length > 0 ? users[users.length - 1]._id : null;
  
  return {
    users,
    nextCursor,
    hasNext
  };
}

// ============================================
// KEYSET PAGINATION
// ============================================

async function getUsersKeyset(cursor = null, limit = 10) {
  const query = cursor 
    ? { createdAt: { $lt: cursor.createdAt } }
    : {};
  
  const users = await User.find(query)
    .sort({ createdAt: -1 })
    .limit(limit + 1);
  
  const hasNext = users.length > limit;
  if (hasNext) users.pop();
  
  const nextCursor = users.length > 0 
    ? { createdAt: users[users.length - 1].createdAt }
    : null;
  
  return { users, nextCursor, hasNext };
}

// ============================================
// PAGINATION WITH AGGREGATION
// ============================================

await User.aggregate([
  { $match: { status: 'active' } },
  { $sort: { createdAt: -1 } },
  { $skip: (page - 1) * limit },
  { $limit: limit },
  {
    $lookup: {
      from: 'orders',
      localField: '_id',
      foreignField: 'userId',
      as: 'orders'
    }
  }
]);
```

---

## E) Internal Working

**Offset Pagination:**
- Scans and skips documents
- Slower for large offsets
- Simple implementation

**Cursor Pagination:**
- Uses index on cursor field
- Fast lookup
- No scanning

---

## F) Interview Questions & Answers

### Q1: What are different pagination strategies?

**Answer:**
Offset-based uses skip() and limit() - simple but slow for large offsets, data consistency issues. Cursor-based uses last document ID - fast, consistent, no offset scanning. Keyset uses field value as cursor - similar to cursor but with any sortable field. Cursor/keyset better for large datasets.

### Q2: Why is cursor pagination better than offset?

**Answer:**
Cursor pagination is faster (uses index, no scanning), consistent (no issues with new data), and efficient (no skipped document scanning). Offset pagination scans and skips documents, making it slow for large offsets. Cursor pagination uses indexed lookup, making it O(log n) vs O(n) for offset.

---

## G) Common Mistakes

### Mistake 1: Using Offset for Large Datasets

```javascript
// ❌ WRONG - Slow for page 1000
await User.find().skip(9990).limit(10);

// ✅ CORRECT - Use cursor
await User.find({ _id: { $gt: lastId } }).limit(10);
```

**Why it breaks:** Offset scans 9990 documents, very slow.

---

## H) When to Use & When NOT to Use

Use offset for small datasets, simple cases. Use cursor for large datasets, performance critical.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain Pagination Strategies."

**You:**
"Pagination strategies: Offset-based uses skip() and limit() - simple but slow for large offsets. Cursor-based uses last document ID - fast (indexed lookup), consistent (no skip issues), efficient (no scanning). Keyset uses field value as cursor. Cursor/keyset better for large datasets. Offset scans documents, cursor uses index. Choose cursor for performance-critical, large datasets."

---

## J) Mini Practice Task

Implement both offset and cursor pagination. Compare performance and choose appropriate strategy.

---

**END OF TOPIC: PAGINATION STRATEGIES**

