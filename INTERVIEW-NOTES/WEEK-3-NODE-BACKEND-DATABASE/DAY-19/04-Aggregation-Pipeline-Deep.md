# AGGREGATION PIPELINE (DEEP)

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Aggregation Pipeline kya hai?**
- Aggregation Pipeline data processing framework hai
- Multiple stages mein data process karta hai
- Each stage output next stage ko input deta hai
- Complex data transformations enable karta hai
- SQL GROUP BY, JOIN jaisa, par zyada powerful

**Real-life Analogy:**
- Manufacturing assembly line
- Raw materials (documents) → Stage 1 → Stage 2 → ... → Final product (result)
- Har stage ek operation perform karta hai
- Pipeline = Assembly line

**Pipeline Stages:**
- **$match:** Filter documents (WHERE)
- **$group:** Group and aggregate (GROUP BY)
- **$project:** Select/transform fields (SELECT)
- **$sort:** Sort documents (ORDER BY)
- **$limit:** Limit results
- **$lookup:** Join collections (JOIN)
- **$unwind:** Deconstruct arrays
- **$facet:** Multiple pipelines

### Aggregation Pipeline Flow

**Process:**
```
Input Documents
    ↓
Stage 1 ($match) → Filtered Documents
    ↓
Stage 2 ($group) → Grouped Data
    ↓
Stage 3 ($project) → Transformed Data
    ↓
Stage 4 ($sort) → Sorted Data
    ↓
Final Result
```

**Key Points:**
- Stages sequential execute hote hain
- Har stage output next stage input
- Early stages reduce data (performance)
- Pipeline optimize ho sakta hai

---

## B) Easy English Theory

### What is Aggregation Pipeline?

Aggregation Pipeline processes documents through multiple stages. Each stage transforms data and passes to next stage. Stages like $match (filter), $group (aggregate), $project (transform), $sort (order), $lookup (join) enable complex data processing.

### Pipeline Stages

**$match:** Filter documents (like WHERE)
**$group:** Group and aggregate (like GROUP BY)
**$project:** Select/transform fields (like SELECT)
**$sort:** Sort documents (like ORDER BY)
**$lookup:** Join collections (like JOIN)
**$unwind:** Expand arrays
**$facet:** Multiple pipelines

---

## C) Why This Concept Exists

### The Problem

**Without Aggregation:**
- Complex queries difficult
- Multiple queries needed
- Data processing in application
- Performance issues
- Limited grouping/transformation

### The Solution

**Aggregation Pipeline Provides:**
1. **Complex Processing:** Multi-stage transformations
2. **Performance:** Server-side processing
3. **Flexibility:** Powerful operations
4. **Efficiency:** Single query for complex operations

---

## D) Practical Example (Code)

```javascript
// ============================================
// BASIC AGGREGATION PIPELINE
// ============================================

const result = await Order.aggregate([
  // Stage 1: Match (filter)
  {
    $match: {
      status: 'completed',
      createdAt: { $gte: new Date('2023-01-01') }
    }
  },
  // Stage 2: Group (aggregate)
  {
    $group: {
      _id: '$userId',
      totalOrders: { $sum: 1 },
      totalAmount: { $sum: '$amount' },
      avgAmount: { $avg: '$amount' }
    }
  },
  // Stage 3: Sort
  {
    $sort: { totalAmount: -1 }
  },
  // Stage 4: Limit
  {
    $limit: 10
  }
]);

// ============================================
// $MATCH STAGE
// ============================================

await Order.aggregate([
  {
    $match: {
      status: 'completed',
      amount: { $gt: 100 },
      createdAt: { $gte: new Date('2023-01-01') }
    }
  }
]);
// Filters documents (like WHERE clause)

// ============================================
// $GROUP STAGE
// ============================================

await Order.aggregate([
  {
    $group: {
      _id: '$status', // Group by status
      count: { $sum: 1 },
      total: { $sum: '$amount' },
      avg: { $avg: '$amount' },
      min: { $min: '$amount' },
      max: { $max: '$amount' }
    }
  }
]);

// Group by multiple fields
await Order.aggregate([
  {
    $group: {
      _id: {
        status: '$status',
        month: { $month: '$createdAt' }
      },
      count: { $sum: 1 },
      total: { $sum: '$amount' }
    }
  }
]);

// ============================================
// $PROJECT STAGE
// ============================================

await User.aggregate([
  {
    $project: {
      name: 1,
      email: 1,
      fullName: { $concat: ['$firstName', ' ', '$lastName'] },
      year: { $year: '$createdAt' },
      _id: 0 // Exclude _id
    }
  }
]);

// Conditional projection
await User.aggregate([
  {
    $project: {
      name: 1,
      status: {
        $cond: {
          if: { $gte: ['$age', 18] },
          then: 'adult',
          else: 'minor'
        }
      }
    }
  }
]);

// ============================================
// $LOOKUP STAGE (JOIN)
// ============================================

// Join orders with users
await Order.aggregate([
  {
    $lookup: {
      from: 'users', // Collection to join
      localField: 'userId', // Field in orders
      foreignField: '_id', // Field in users
      as: 'user' // Output field name
    }
  },
  {
    $unwind: '$user' // Convert array to object
  }
]);

// Multiple lookups
await Order.aggregate([
  {
    $lookup: {
      from: 'users',
      localField: 'userId',
      foreignField: '_id',
      as: 'user'
    }
  },
  {
    $lookup: {
      from: 'products',
      localField: 'productId',
      foreignField: '_id',
      as: 'product'
    }
  }
]);

// ============================================
// $UNWIND STAGE
// ============================================

// Deconstruct array
await User.aggregate([
  {
    $unwind: '$tags' // Each tag becomes separate document
  }
]);

// With preserveNullAndEmptyArrays
await User.aggregate([
  {
    $unwind: {
      path: '$tags',
      preserveNullAndEmptyArrays: true // Keep documents without tags
    }
  }
]);

// ============================================
// $SORT STAGE
// ============================================

await Order.aggregate([
  {
    $sort: { amount: -1 } // Descending
  }
]);

// Multiple fields
await Order.aggregate([
  {
    $sort: {
      status: 1,
      createdAt: -1
    }
  }
]);

// ============================================
// $FACET STAGE (MULTIPLE PIPELINES)
// ============================================

await Order.aggregate([
  {
    $facet: {
      // Pipeline 1: Total sales
      totalSales: [
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ],
      // Pipeline 2: By status
      byStatus: [
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ],
      // Pipeline 3: Top customers
      topCustomers: [
        { $group: { _id: '$userId', total: { $sum: '$amount' } } },
        { $sort: { total: -1 } },
        { $limit: 5 }
      ]
    }
  }
]);

// ============================================
// COMPLEX AGGREGATION EXAMPLE
// ============================================

// Sales report with user details
await Order.aggregate([
  // Match completed orders
  {
    $match: {
      status: 'completed',
      createdAt: { $gte: new Date('2023-01-01') }
    }
  },
  // Join with users
  {
    $lookup: {
      from: 'users',
      localField: 'userId',
      foreignField: '_id',
      as: 'user'
    }
  },
  {
    $unwind: '$user'
  },
  // Group by user
  {
    $group: {
      _id: '$userId',
      userName: { $first: '$user.name' },
      userEmail: { $first: '$user.email' },
      orderCount: { $sum: 1 },
      totalAmount: { $sum: '$amount' },
      avgAmount: { $avg: '$amount' },
      orders: { $push: '$$ROOT' }
    }
  },
  // Project final structure
  {
    $project: {
      _id: 0,
      userId: '$_id',
      userName: 1,
      userEmail: 1,
      orderCount: 1,
      totalAmount: 1,
      avgAmount: 1
    }
  },
  // Sort by total amount
  {
    $sort: { totalAmount: -1 }
  },
  // Limit top 10
  {
    $limit: 10
  }
]);

// ============================================
// AGGREGATION OPERATORS
// ============================================

// Arithmetic operators
{
  $project: {
    total: { $add: ['$price', '$tax'] },
    discount: { $subtract: ['$price', '$discount'] },
    final: { $multiply: ['$price', 0.9] },
    ratio: { $divide: ['$amount', '$quantity'] }
  }
}

// String operators
{
  $project: {
    fullName: { $concat: ['$firstName', ' ', '$lastName'] },
    upper: { $toUpper: '$name' },
    lower: { $toLower: '$email' },
    substr: { $substr: ['$name', 0, 5] }
  }
}

// Date operators
{
  $project: {
    year: { $year: '$createdAt' },
    month: { $month: '$createdAt' },
    day: { $dayOfMonth: '$createdAt' },
    week: { $week: '$createdAt' }
  }
}

// Conditional operators
{
  $project: {
    status: {
      $cond: {
        if: { $gte: ['$amount', 100] },
        then: 'high',
        else: 'low'
      }
    },
    category: {
      $switch: {
        branches: [
          { case: { $lt: ['$age', 18] }, then: 'minor' },
          { case: { $lt: ['$age', 65] }, then: 'adult' }
        ],
        default: 'senior'
      }
    }
  }
}
```

---

## E) Internal Working

### Pipeline Execution

**Process:**
1. Pipeline stages parsed
2. Query optimizer analyzes
3. Stages execute sequentially
4. Each stage processes input
5. Output passed to next stage
6. Final result returned

**Optimization:**
- Early $match reduces data
- Indexes used when possible
- Pipeline reordering
- Stage combination

---

## F) Interview Questions & Answers

### Q1: What is Aggregation Pipeline?

**Answer:**
Aggregation Pipeline processes documents through multiple stages sequentially. Each stage transforms data and passes to next. Stages like $match (filter), $group (aggregate), $project (transform), $sort, $lookup (join) enable complex data processing. Pipeline executes server-side for performance.

### Q2: What are common aggregation stages?

**Answer:**
Common stages: $match (filter like WHERE), $group (aggregate like GROUP BY), $project (select/transform like SELECT), $sort (order like ORDER BY), $lookup (join collections), $unwind (expand arrays), $limit/$skip (pagination), $facet (multiple pipelines). Stages execute sequentially, each transforming data.

### Q3: How does $lookup work?

**Answer:**
$lookup performs left outer join between collections. Specify: from (collection to join), localField (field in current collection), foreignField (field in joined collection), as (output field name). Returns array of matching documents. Use $unwind to convert array to object if single match expected.

### Q4: What is $facet used for?

**Answer:**
$facet runs multiple aggregation pipelines in parallel on same input. Useful for generating multiple reports in single query - different aggregations (totals, groups, top items) from same data. More efficient than multiple separate queries. Each facet runs independently.

---

## G) Common Mistakes

### Mistake 1: Wrong Stage Order

```javascript
// ❌ WRONG - Sort before filtering
await Order.aggregate([
  { $sort: { amount: -1 } },
  { $match: { status: 'completed' } } // Sorting unnecessary data
]);

// ✅ CORRECT - Filter first
await Order.aggregate([
  { $match: { status: 'completed' } }, // Reduce data first
  { $sort: { amount: -1 } } // Sort less data
]);
```

**Why it breaks:** Early filtering reduces data, improving performance.

---

## H) When to Use & When NOT to Use

Use aggregation for complex transformations, grouping, joins, reporting. Don't use for simple queries - use find() instead.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain Aggregation Pipeline."

**You:**
"Aggregation Pipeline processes documents through multiple stages. Each stage transforms data and passes to next. Common stages: $match (filter), $group (aggregate), $project (transform), $sort, $lookup (join), $unwind (expand arrays).

Pipeline executes server-side for performance. Order matters - filter early with $match to reduce data. Use $lookup for joins, $group for aggregations, $facet for multiple pipelines. Aggregation enables complex data processing that would require multiple queries or application-side processing."

---

## J) Mini Practice Task

Create aggregation pipeline for sales report: filter, join users, group by category, calculate totals, sort, and limit results.

---

**END OF TOPIC: AGGREGATION PIPELINE (DEEP)**

