# RELATIONS IN MONGODB

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Relations in MongoDB kya hain?**
- MongoDB mein relations handle karte hain
- SQL JOINs jaisa, par different approach
- Embedded documents ya References use karte hain
- populate() se references join karte hain
- Aggregation $lookup se join karte hain

**Relation Types:**
- **One-to-One:** Ek document ek document se related
- **One-to-Many:** Ek document many documents se related
- **Many-to-Many:** Many documents many documents se related

### One-to-One Relations

**Options:**
1. **Embedded:** Related data same document mein
2. **Reference:** Separate document with reference

**Example:**
- User → Profile (one-to-one)
- Embed: Profile data user document mein
- Reference: Profile separate, userId reference

### One-to-Many Relations

**Options:**
1. **Embedded Array:** Small related data
2. **Reference Array:** Many related items
3. **Separate Collection:** Large related data

**Example:**
- User → Orders (one-to-many)
- Embed: Recent orders in user document
- Reference: Orders collection with userId

### Many-to-Many Relations

**Options:**
1. **Array of IDs:** Small sets
2. **Junction Collection:** Large sets with metadata

**Example:**
- Students ↔ Courses (many-to-many)
- Array: students array in course, courses array in student
- Junction: Enrollments collection

---

## B) Easy English Theory

### Relations in MongoDB

MongoDB handles relations through embedded documents or references. One-to-one: Embed or reference. One-to-many: Embed array, reference array, or separate collection. Many-to-many: Array of IDs or junction collection. Use populate() for references, $lookup for aggregation joins.

---

## C) Why This Concept Exists

### The Problem

**Without Relations:**
- Data isolated
- No connections
- Difficult to query related data
- Data duplication

### The Solution

**Relations Provide:**
1. **Connections:** Link related data
2. **Queries:** Access related data
3. **Organization:** Logical structure
4. **Efficiency:** Right data organization

---

## D) Practical Example (Code)

```javascript
// ============================================
// ONE-TO-ONE (Embedded)
// ============================================

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  profile: { // Embedded one-to-one
    bio: String,
    avatar: String,
    preferences: Object
  }
});

// ============================================
// ONE-TO-ONE (Reference)
// ============================================

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile'
  }
});

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique: true
  },
  bio: String,
  avatar: String
});

// Populate
const user = await User.findById(userId).populate('profileId');

// ============================================
// ONE-TO-MANY (Embedded Array)
// ============================================

const userSchema = new mongoose.Schema({
  name: String,
  addresses: [{ // Embedded array
    street: String,
    city: String,
    isDefault: Boolean
  }]
});

// ============================================
// ONE-TO-MANY (Reference)
// ============================================

const userSchema = new mongoose.Schema({
  name: String,
  email: String
});

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  amount: Number,
  items: [String]
});

// Populate
const orders = await Order.find({ userId })
  .populate('userId', 'name email');

// Get user with orders
const user = await User.findById(userId);
const orders = await Order.find({ userId: user._id });

// ============================================
// MANY-TO-MANY (Array of IDs)
// ============================================

const studentSchema = new mongoose.Schema({
  name: String,
  courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }]
});

const courseSchema = new mongoose.Schema({
  name: String,
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }]
});

// Populate
const student = await Student.findById(studentId)
  .populate('courses');

// ============================================
// MANY-TO-MANY (Junction Collection)
// ============================================

const enrollmentSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  },
  enrolledAt: Date,
  grade: String,
  status: String
});

// Query with populate
const enrollments = await Enrollment.find({ studentId })
  .populate('studentId')
  .populate('courseId');

// ============================================
// AGGREGATION $LOOKUP (JOIN)
// ============================================

// Join orders with users
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
    $unwind: '$user'
  }
]);

// ============================================
// NESTED POPULATE
// ============================================

// Order → User → Profile
const order = await Order.findById(orderId)
  .populate({
    path: 'userId',
    select: 'name email',
    populate: {
      path: 'profileId',
      select: 'bio avatar'
    }
  });
```

---

## E) Internal Working

Relations work through:
- **Embedded:** Data in same document
- **References:** ObjectId references
- **populate():** Mongoose joins references
- **$lookup:** Aggregation joins

---

## F) Interview Questions & Answers

### Q1: How do you handle relations in MongoDB?

**Answer:**
Handle through embedded documents (related data in same document) or references (ObjectId references to other documents). Use populate() in Mongoose to join references, or $lookup in aggregation. Choose based on: One-to-one (embed or reference), one-to-many (embed array or reference), many-to-many (array of IDs or junction collection).

### Q2: What's the difference between populate() and $lookup?

**Answer:**
populate() is Mongoose method that joins references in application layer - fetches referenced documents and replaces ObjectIds. $lookup is MongoDB aggregation stage that performs join at database level. populate() is simpler for Mongoose, $lookup is more powerful for complex aggregations and works with native driver.

---

## G) Common Mistakes

### Mistake 1: Over-Populating

```javascript
// ❌ WRONG - Populating everything
const user = await User.findById(userId)
  .populate('orders')
  .populate('reviews')
  .populate('addresses')
  .populate('friends');
// Too many queries

// ✅ CORRECT - Selective populate
const user = await User.findById(userId)
  .populate('orders', 'amount createdAt'); // Only needed fields
```

**Why it breaks:** Over-populating causes N+1 query problem and performance issues.

---

## H) When to Use & When NOT to Use

Use relations for related data. Choose embedded vs references based on access patterns and data size.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain Relations in MongoDB."

**You:**
"MongoDB handles relations through embedded documents or references. One-to-one: Embed or reference. One-to-many: Embed array or reference. Many-to-many: Array of IDs or junction collection. Use populate() to join references in Mongoose, or $lookup in aggregation. Choose embedded for small, always-accessed-together data. Choose references for large, independently-queried data."

---

## J) Mini Practice Task

Design relations for blog system: Users, Posts, Comments, Tags. Implement with populate() and $lookup.

---

**END OF TOPIC: RELATIONS IN MONGODB**

