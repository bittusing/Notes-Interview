# SOFT DELETE & TIMESTAMPS

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Soft Delete kya hai?**
- Soft Delete data ko actually delete nahi karta
- Deleted flag set karta hai
- Data recover kar sakte hain
- Audit trail maintain hota hai
- Hard delete se different

**Timestamps kya hain?**
- Timestamps creation aur update time track karte hain
- createdAt aur updatedAt fields
- Automatic management
- Mongoose mein built-in support

**Real-life Analogy:**
- Soft Delete = Trash folder (recover possible)
- Hard Delete = Permanent delete
- Timestamps = File creation/modification dates

### Soft Delete Implementation

**Approach:**
- `deleted` field (Boolean)
- `deletedAt` field (Date)
- `isDeleted` field
- Queries mein filter add karo

**Benefits:**
- Data recovery
- Audit trail
- History maintenance
- Undo functionality

### Timestamps

**Automatic Timestamps:**
- `createdAt`: Creation time
- `updatedAt`: Update time
- Mongoose automatically manage karta hai
- `timestamps: true` option

---

## B) Easy English Theory

### Soft Delete

Soft Delete marks data as deleted without actually removing it. Use `deleted` or `deletedAt` field. Filter deleted documents in queries. Benefits: Data recovery, audit trail, history.

### Timestamps

Timestamps track creation and update times. Mongoose provides automatic timestamps with `timestamps: true`. Fields: `createdAt` (creation), `updatedAt` (updates).

---

## C) Why This Concept Exists

### The Problem

**Hard Delete Issues:**
- Data permanently lost
- No recovery
- No audit trail
- History lost

### The Solution

**Soft Delete & Timestamps Provide:**
1. **Recovery:** Data can be restored
2. **Audit:** Track deletions
3. **History:** Maintain records
4. **Timestamps:** Track changes

---

## D) Practical Example (Code)

```javascript
// ============================================
// SOFT DELETE SCHEMA
// ============================================

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  deleted: {
    type: Boolean,
    default: false
  },
  deletedAt: Date
}, {
  timestamps: true // Automatic createdAt, updatedAt
});

// ============================================
// SOFT DELETE METHODS
// ============================================

userSchema.methods.softDelete = function() {
  this.deleted = true;
  this.deletedAt = new Date();
  return this.save();
};

userSchema.methods.restore = function() {
  this.deleted = false;
  this.deletedAt = null;
  return this.save();
};

// Static method to find non-deleted
userSchema.statics.findActive = function() {
  return this.find({ deleted: false });
};

// Override find to exclude deleted by default
userSchema.statics.find = function(conditions = {}) {
  return mongoose.Model.find.call(this, {
    ...conditions,
    deleted: { $ne: true }
  });
};

// ============================================
// QUERIES WITH SOFT DELETE
// ============================================

// Find active users (not deleted)
const users = await User.find({ deleted: false });

// Find deleted users
const deletedUsers = await User.find({ deleted: true });

// Find all (including deleted)
const allUsers = await User.findWithDeleted({});

// ============================================
// TIMESTAMPS
// ============================================

const userSchema = new mongoose.Schema({
  name: String,
  email: String
}, {
  timestamps: true // Adds createdAt, updatedAt
});

// Automatic:
// createdAt: Date (set on creation)
// updatedAt: Date (updated on save)

// Custom timestamp names
const userSchema = new mongoose.Schema({
  name: String
}, {
  timestamps: {
    createdAt: 'created',
    updatedAt: 'modified'
  }
});

// ============================================
// SOFT DELETE MIDDLEWARE
// ============================================

userSchema.pre('find', function() {
  this.where({ deleted: false });
});

userSchema.pre('findOne', function() {
  this.where({ deleted: false });
});

// ============================================
// PERMANENT DELETE
// ============================================

userSchema.methods.hardDelete = async function() {
  return await User.deleteOne({ _id: this._id });
};
```

---

## E) Internal Working

**Soft Delete:**
- Field set to true/date
- Queries filter deleted
- Data remains in database
- Can be restored

**Timestamps:**
- Mongoose automatically sets
- createdAt on creation
- updatedAt on save
- No manual management needed

---

## F) Interview Questions & Answers

### Q1: What is Soft Delete and why use it?

**Answer:**
Soft Delete marks data as deleted without actually removing it (using `deleted` or `deletedAt` field). Benefits: Data recovery, audit trail, history maintenance, undo functionality. Queries filter deleted documents. Use when data recovery or audit trail is important.

### Q2: How do Mongoose timestamps work?

**Answer:**
Mongoose timestamps automatically manage `createdAt` and `updatedAt` fields when `timestamps: true` in schema options. `createdAt` set on document creation, `updatedAt` updated on every save. Can customize field names. No manual management needed.

---

## G) Common Mistakes

### Mistake 1: Forgetting to Filter Deleted

```javascript
// ❌ WRONG - Includes deleted
const users = await User.find();

// ✅ CORRECT - Filter deleted
const users = await User.find({ deleted: false });
```

**Why it breaks:** Deleted documents appear in results.

---

## H) When to Use & When NOT to Use

Use soft delete when recovery/audit needed. Use timestamps for tracking changes. Don't use soft delete for temporary data or when storage is concern.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain Soft Delete and Timestamps."

**You:**
"Soft Delete marks data as deleted without removing it - use `deleted` or `deletedAt` field. Benefits: Recovery, audit trail, history. Filter deleted in queries. Timestamps automatically track creation and update times with `timestamps: true` - Mongoose manages `createdAt` and `updatedAt`. Use soft delete when recovery/audit important."

---

## J) Mini Practice Task

Implement soft delete with restore functionality and automatic timestamps. Filter deleted in all queries.

---

**END OF TOPIC: SOFT DELETE & TIMESTAMPS**

