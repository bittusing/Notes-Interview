# REST API DESIGN

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**REST API Design kya hai?**
- REST API Design web services ko design karne ka standard approach hai
- HTTP methods use karta hai (GET, POST, PUT, DELETE)
- Resource-based URLs
- Stateless communication
- Standard conventions follow karta hai

**Real-life Analogy:**
- REST API = Library system
- Resources = Books (things we work with)
- HTTP Methods = Actions (read, add, update, remove)
- URLs = Book locations
- Stateless = No memory of previous requests

**REST Principles:**
- **Stateless:** No server-side session
- **Resource-Based:** URLs represent resources
- **HTTP Methods:** Standard methods for actions
- **Representation:** JSON/XML format
- **Uniform Interface:** Consistent API design

### REST API Best Practices

**1. Resource Naming:**
- Use nouns, not verbs
- Plural for collections
- Hierarchical structure
- Lowercase with hyphens

**2. HTTP Methods:**
- GET: Read data
- POST: Create new resource
- PUT: Update entire resource
- PATCH: Partial update
- DELETE: Remove resource

**3. Status Codes:**
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Server Error

---

## B) Easy English Theory

### What is REST API Design?

REST API Design follows REST (Representational State Transfer) principles. Uses HTTP methods (GET, POST, PUT, DELETE), resource-based URLs, stateless communication, standard status codes. Best practices: Resource naming (nouns, plural, hierarchical), proper HTTP methods, status codes, versioning, pagination, filtering.

---

## C) Why This Concept Exists

### The Problem

**Without Standards:**
- Inconsistent APIs
- Difficult to use
- Poor developer experience
- Integration issues

### The Solution

**REST Provides:**
1. **Standards:** Consistent design
2. **Simplicity:** Easy to understand
3. **Scalability:** Stateless design
4. **Interoperability:** Works everywhere

---

## D) Practical Example (Code)

```javascript
// ============================================
// REST API DESIGN - USERS RESOURCE
// ============================================

const express = require('express');
const app = express();
app.use(express.json());

// ============================================
// RESOURCE NAMING
// ============================================

// ✅ GOOD - Resource-based, plural
// GET /users
// GET /users/:id
// POST /users
// PUT /users/:id
// DELETE /users/:id

// ❌ BAD - Verb-based
// GET /getUsers
// POST /createUser
// POST /updateUser

// ============================================
// GET - READ RESOURCES
// ============================================

// Get all users
app.get('/api/v1/users', async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = 'createdAt', order = 'desc' } = req.query;
    
    const users = await User.find()
      .sort({ [sort]: order === 'desc' ? -1 : 1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    
    const total = await User.countDocuments();
    
    res.json({
      data: users,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single user
app.get('/api/v1/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ data: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// POST - CREATE RESOURCE
// ============================================

app.post('/api/v1/users', async (req, res) => {
  try {
    // Validate input
    const { name, email, age } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email required' });
    }
    
    // Create user
    const user = await User.create({ name, email, age });
    
    // 201 Created
    res.status(201).json({ data: user });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// PUT - UPDATE ENTIRE RESOURCE
// ============================================

app.put('/api/v1/users/:id', async (req, res) => {
  try {
    const { name, email, age } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, age },
      { new: true, runValidators: true }
    );
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ data: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// PATCH - PARTIAL UPDATE
// ============================================

app.patch('/api/v1/users/:id', async (req, res) => {
  try {
    const updates = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ data: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// DELETE - REMOVE RESOURCE
// ============================================

app.delete('/api/v1/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // 204 No Content (or 200 with message)
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// NESTED RESOURCES
// ============================================

// Get user's orders
app.get('/api/v1/users/:userId/orders', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.json({ data: orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create order for user
app.post('/api/v1/users/:userId/orders', async (req, res) => {
  try {
    const order = await Order.create({
      ...req.body,
      userId: req.params.userId
    });
    res.status(201).json({ data: order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// FILTERING, SORTING, PAGINATION
// ============================================

app.get('/api/v1/users', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      sort = 'createdAt',
      order = 'desc',
      age,
      email
    } = req.query;
    
    // Build query
    const query = {};
    if (age) query.age = parseInt(age);
    if (email) query.email = { $regex: email, $options: 'i' };
    
    // Execute query
    const users = await User.find(query)
      .sort({ [sort]: order === 'desc' ? -1 : 1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    
    const total = await User.countDocuments(query);
    
    res.json({
      data: users,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// API VERSIONING
// ============================================

// Version in URL
app.get('/api/v1/users', (req, res) => {
  // v1 implementation
});

app.get('/api/v2/users', (req, res) => {
  // v2 implementation
});

// Version in header
app.get('/api/users', (req, res) => {
  const version = req.headers['api-version'] || 'v1';
  if (version === 'v2') {
    // v2 implementation
  } else {
    // v1 implementation
  }
});

// ============================================
// ERROR HANDLING
// ============================================

class APIError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

// Error middleware
app.use((error, req, res, next) => {
  if (error instanceof APIError) {
    return res.status(error.statusCode).json({ error: error.message });
  }
  
  // Default error
  res.status(500).json({ error: 'Internal server error' });
});

// Usage
app.get('/api/v1/users/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw new APIError(404, 'User not found');
    }
    res.json({ data: user });
  } catch (error) {
    next(error);
  }
});

// ============================================
// RESPONSE FORMAT
// ============================================

// Consistent response format
const sendResponse = (res, statusCode, data, message = null) => {
  res.status(statusCode).json({
    success: statusCode < 400,
    data,
    message,
    timestamp: new Date().toISOString()
  });
};

// Usage
app.get('/api/v1/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return sendResponse(res, 404, null, 'User not found');
    }
    sendResponse(res, 200, user);
  } catch (error) {
    sendResponse(res, 500, null, error.message);
  }
});
```

---

## E) Internal Working

**REST API Flow:**
1. Client sends HTTP request
2. Server routes to handler
3. Handler processes request
4. Database operations
5. Response formatted
6. HTTP response sent

**Stateless:**
- No server-side session
- Each request independent
- All info in request
- Scalable design

---

## F) Interview Questions & Answers

### Q1: What are REST API design principles?

**Answer:**
REST principles: Stateless (no server-side session, each request independent), Resource-based (URLs represent resources, not actions), HTTP methods (GET read, POST create, PUT update, PATCH partial update, DELETE remove), Standard status codes (200 success, 201 created, 400 bad request, 404 not found, 500 error), Uniform interface (consistent design). Follow these for scalable, maintainable APIs.

### Q2: How do you design RESTful URLs?

**Answer:**
URL design: Use nouns (not verbs), plural for collections (/users not /user), hierarchical for nested resources (/users/:id/orders), lowercase with hyphens, avoid deep nesting (max 2-3 levels). Examples: GET /users, GET /users/:id, POST /users, PUT /users/:id, DELETE /users/:id. Avoid: /getUsers, /createUser (verbs in URL).

### Q3: What HTTP status codes should you use?

**Answer:**
Status codes: 200 OK (successful GET, PUT, PATCH), 201 Created (successful POST), 204 No Content (successful DELETE), 400 Bad Request (invalid input), 401 Unauthorized (not authenticated), 403 Forbidden (not authorized), 404 Not Found (resource doesn't exist), 409 Conflict (duplicate), 500 Internal Server Error (server error). Use appropriate codes for clear API communication.

---

## G) Common Mistakes

### Mistake 1: Verbs in URLs

```javascript
// ❌ WRONG - Verbs in URL
app.get('/api/getUsers', ...);
app.post('/api/createUser', ...);

// ✅ CORRECT - Nouns, HTTP methods
app.get('/api/users', ...);
app.post('/api/users', ...);
```

**Why it breaks:** Not RESTful, inconsistent with REST principles.

---

## H) When to Use & When NOT to Use

Always use REST for web APIs. Don't use for real-time (use WebSocket) or when REST not suitable.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain REST API Design."

**You:**
"REST API Design follows REST principles. Use HTTP methods: GET (read), POST (create), PUT (update), PATCH (partial update), DELETE (remove). Resource-based URLs: nouns, plural, hierarchical (/users/:id/orders). Stateless: no server-side session. Status codes: 200 success, 201 created, 400 bad request, 404 not found, 500 error.

Best practices: Consistent response format, versioning (/api/v1/), pagination, filtering, error handling. REST provides scalable, maintainable API design."

---

## J) Mini Practice Task

Design REST API for e-commerce: Users, Products, Orders resources. Implement CRUD operations, filtering, pagination, proper status codes.

---

**END OF TOPIC: REST API DESIGN**

