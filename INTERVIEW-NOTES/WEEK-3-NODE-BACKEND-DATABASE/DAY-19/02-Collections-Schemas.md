# COLLECTIONS & SCHEMAS

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Collections kya hain?**
- Collections documents ka group hai
- SQL tables jaisa, par flexible
- Ek collection mein similar documents
- Schema optional hai (flexible)
- Database mein organize karta hai

**Schemas kya hain?**
- Schema data structure define karta hai
- Optional in MongoDB (flexible)
- Mongoose mein schemas use hote hain
- Validation, defaults, methods define karte hain
- Type safety provide karta hai

**Real-life Analogy:**
- Collection = Folder (documents = files)
- Schema = File format template (optional)
- Flexible = Different file types in same folder
- Structured = Template follow karo

### Collections

**Characteristics:**
- Documents ka group
- No fixed schema required
- Dynamic creation
- Indexes on collections
- Capped collections (fixed size)

**Collection Operations:**
- Create collection
- Drop collection
- List collections
- Collection stats

### Schemas (Mongoose)

**Schema Definition:**
- Fields define karte hain
- Types specify karte hain
- Validation rules
- Default values
- Methods and statics

**Schema Types:**
- String, Number, Date, Boolean
- Array, Object, Mixed
- ObjectId (references)
- Buffer, Decimal128

---

## B) Easy English Theory

### What are Collections?

Collections are groups of documents in MongoDB, similar to tables in SQL but with flexible schema. Documents in a collection can have different structures. Collections organize data and support indexes.

### What are Schemas?

Schemas define data structure. In MongoDB, schemas are optional (flexible). Mongoose uses schemas for validation, type safety, defaults, and methods. Schemas provide structure while maintaining flexibility.

---

## C) Why This Concept Exists

### The Problem

**Without Organization:**
- Data unorganized
- No structure
- Difficult to query
- No validation

### The Solution

**Collections & Schemas Provide:**
1. **Organization:** Group related documents
2. **Structure:** Schema defines structure
3. **Validation:** Data validation rules
4. **Flexibility:** Optional schemas
5. **Type Safety:** Mongoose schemas

---

## D) Practical Example (Code)

```javascript
// ============================================
// COLLECTIONS - NATIVE MONGODB
// ============================================

const { MongoClient } = require('mongodb');

const client = new MongoClient('mongodb://localhost:27017');
await client.connect();
const db = client.db('mydb');

// Create collection
await db.createCollection('users');

// Access collection
const usersCollection = db.collection('users');

// Insert document
await usersCollection.insertOne({
  name: 'John',
  email: 'john@example.com'
});

// List collections
const collections = await db.listCollections().toArray();
console.log(collections);

// Drop collection
await db.collection('users').drop();

// ============================================
// MONGOOSE SCHEMAS
// ============================================

const mongoose = require('mongoose');

// Define schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: 'Invalid email'
    }
  },
  age: {
    type: Number,
    min: 0,
    max: 120
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'pending'],
    default: 'active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  tags: [String], // Array of strings
  address: { // Embedded document
    street: String,
    city: String,
    zipCode: String
  }
});

// Create model (collection)
const User = mongoose.model('User', userSchema);

// ============================================
// SCHEMA METHODS
// ============================================

userSchema.methods.getFullName = function() {
  return `${this.name} (${this.email})`;
};

userSchema.methods.isActive = function() {
  return this.status === 'active';
};

// Instance method usage
const user = new User({ name: 'John', email: 'john@example.com' });
console.log(user.getFullName());
console.log(user.isActive());

// ============================================
// SCHEMA STATICS
// ============================================

userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase() });
};

userSchema.statics.findActive = function() {
  return this.find({ status: 'active' });
};

// Static method usage
const user = await User.findByEmail('john@example.com');
const activeUsers = await User.findActive();

// ============================================
// SCHEMA VIRTUALS
// ============================================

userSchema.virtual('fullAddress').get(function() {
  return `${this.address.street}, ${this.address.city} ${this.address.zipCode}`;
});

// Virtual doesn't store in database
// Computed on access
console.log(user.fullAddress);

// ============================================
// SCHEMA MIDDLEWARE (HOOKS)
// ============================================

// Pre-save hook
userSchema.pre('save', async function(next) {
  // Hash password before saving
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Post-save hook
userSchema.post('save', function(doc, next) {
  console.log('User saved:', doc._id);
  next();
});

// Pre-remove hook
userSchema.pre('remove', async function(next) {
  // Delete related data
  await Order.deleteMany({ userId: this._id });
  next();
});

// ============================================
// SCHEMA INDEXES
// ============================================

userSchema.index({ email: 1 }); // Single field
userSchema.index({ email: 1, status: 1 }); // Compound
userSchema.index({ email: 1 }, { unique: true }); // Unique
userSchema.index({ createdAt: -1 }); // Descending

// Text index
userSchema.index({ name: 'text', email: 'text' });

// ============================================
// SCHEMA OPTIONS
// ============================================

const userSchema = new mongoose.Schema({
  name: String,
  email: String
}, {
  timestamps: true, // Adds createdAt, updatedAt
  collection: 'custom_users', // Custom collection name
  strict: false, // Allow fields not in schema
  versionKey: false, // Remove __v field
  toJSON: { virtuals: true }, // Include virtuals in JSON
  toObject: { virtuals: true } // Include virtuals in objects
});

// ============================================
// NESTED SCHEMAS
// ============================================

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
  zipCode: String
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  address: addressSchema // Nested schema
});

// ============================================
// SCHEMA VALIDATION
// ============================================

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    validate: {
      validator: function(v) {
        return v.length >= 2;
      },
      message: 'Name must be at least 2 characters'
    }
  },
  age: {
    type: Number,
    validate: {
      validator: function(v) {
        return v >= 0 && v <= 120;
      },
      message: 'Age must be between 0 and 120'
    }
  }
});

// Validation runs on save
const user = new User({ name: 'J', age: 150 });
await user.save(); // Validation error

// ============================================
// DYNAMIC SCHEMAS
// ============================================

// Schema with mixed type (any data)
const flexibleSchema = new mongoose.Schema({
  name: String,
  data: mongoose.Schema.Types.Mixed // Can store anything
});

// Or use strict: false
const flexibleSchema = new mongoose.Schema({}, { strict: false });
```

---

## E) Internal Working

### Collection Creation

**Process:**
1. Collection name specified
2. Collection created (lazy - on first insert)
3. Indexes created if specified
4. Collection metadata stored

### Schema Processing

**Process:**
1. Schema definition parsed
2. Validation rules compiled
3. Indexes created
4. Model created
5. Hooks registered

---

## F) Interview Questions & Answers

### Q1: What are Collections in MongoDB?

**Answer:**
Collections are groups of documents in MongoDB, similar to tables in SQL. Collections organize related documents. Unlike SQL tables, collections don't require fixed schema - documents can have different structures. Collections support indexes, queries, and operations. Collections are created lazily (on first document insert).

### Q2: What is the difference between MongoDB collections and SQL tables?

**Answer:**
Collections are flexible - documents can have different structures, no fixed schema required. SQL tables have fixed schema - all rows must have same columns. Collections are schema-less by default, tables require schema definition. Collections support dynamic fields, tables have predefined columns.

### Q3: What are Mongoose Schemas and why use them?

**Answer:**
Mongoose Schemas define data structure with types, validation, defaults, and methods. Benefits: Type safety, data validation, default values, instance/static methods, middleware hooks, virtuals. Schemas provide structure while maintaining MongoDB's flexibility. They're optional - MongoDB works without schemas, but schemas add safety and features.

### Q4: What are Schema methods, statics, and virtuals?

**Answer:**
Instance methods are called on document instances (user.getFullName()). Statics are called on model (User.findByEmail()). Virtuals are computed properties not stored in database (user.fullAddress). Methods add functionality, statics add model-level functions, virtuals add computed fields.

---

## G) Common Mistakes

### Mistake 1: Over-Schematizing

```javascript
// ❌ WRONG - Too strict schema when flexibility needed
const schema = new mongoose.Schema({
  name: String,
  // Every possible field defined
}, { strict: true });

// ✅ CORRECT - Balance structure and flexibility
const schema = new mongoose.Schema({
  name: String,
  email: String
}, { strict: false }); // Allow additional fields
```

**Why it breaks:** Over-schematizing removes MongoDB's flexibility advantage.

---

## H) When to Use & When NOT to Use

Use schemas for validation, type safety, and structure. Don't over-schematize when flexibility is needed.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain Collections and Schemas in MongoDB."

**You:**
"Collections are groups of documents, like tables in SQL but flexible - documents can have different structures. Collections organize data and support indexes.

Schemas in Mongoose define data structure with types, validation, defaults, and methods. They're optional - MongoDB works without schemas, but schemas add type safety, validation, and features like methods and hooks. Use schemas for structure and validation, but maintain flexibility when needed."

---

## J) Mini Practice Task

Create Mongoose schemas for e-commerce system with validation, methods, statics, and virtuals.

---

**END OF TOPIC: COLLECTIONS & SCHEMAS**

