# ERROR HANDLING

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Error Handling kya hai?**
- Errors ko gracefully handle karna
- Application crash se bachana
- User ko meaningful error messages dena
- Errors ko log karna
- Production mein errors ko properly manage karna

**Real-life Analogy:**
- Imagine ek car drive karte waqt problem aati hai
- Error handling = problem detect karna, safe side par car rokna
- User ko bataana ki kya hua
- Mechanic ko call karna (logging)
- Car ko safely handle karna (graceful shutdown)

**Error Types:**
- **Operational Errors:** Expected errors (invalid input, network failure)
- **Programming Errors:** Bugs in code (null reference, type errors)
- **System Errors:** System-level errors (out of memory, file system errors)

### Error Handling Strategies

**1. Try-Catch Blocks:**
- Synchronous code ke liye
- Errors catch karte hain
- Handle kar sakte hain

**2. Promise Catch:**
- Async code ke liye
- Promise rejections handle karte hain
- `.catch()` method use karte hain

**3. Async/Await:**
- Try-catch with async/await
- Async errors handle karte hain
- Clean error handling

**4. Error Middleware:**
- Express.js mein
- Centralized error handling
- All errors handle karta hai

### Error Handling in Express

**Error Middleware:**
- 4 parameters: (err, req, res, next)
- Last middleware hona chahiye
- All errors catch karta hai
- Error response send karta hai

**Error Propagation:**
- Errors next() se pass hote hain
- `next(error)` call karte hain
- Error middleware tak pahunchte hain

---

## B) Easy English Theory

### What is Error Handling?

Error handling is the process of responding to and managing errors that occur during program execution. It prevents application crashes, provides meaningful error messages to users, logs errors for debugging, and ensures graceful degradation.

### Error Types

**Operational Errors:** Expected errors like invalid input, network failures, database connection issues

**Programming Errors:** Bugs in code like null references, type errors, logic mistakes

**System Errors:** System-level errors like out of memory, file system errors

### Error Handling Methods

**Try-Catch:** For synchronous code, catches and handles errors

**Promise Catch:** For async code, handles promise rejections

**Async/Await:** Try-catch with async/await for clean async error handling

**Error Middleware:** Centralized error handling in Express.js

---

## C) Why This Concept Exists

### The Problem

**Without Error Handling:**
- Application crashes on errors
- Poor user experience
- No error logging
- Difficult debugging
- Security issues

### The Solution

**Error Handling Provides:**
1. **Graceful Degradation:** Application continues running
2. **User Experience:** Meaningful error messages
3. **Debugging:** Error logging and tracking
4. **Security:** Don't expose sensitive information
5. **Monitoring:** Track and analyze errors

### Real-World Need

- **Production Applications:** Must handle errors gracefully
- **User Experience:** Clear error messages
- **Debugging:** Error logging essential
- **Security:** Don't leak sensitive data
- **Monitoring:** Track error rates

---

## D) Practical Example (Code)

```javascript
// ============================================
// BASIC ERROR HANDLING - TRY-CATCH
// ============================================

function divide(a, b) {
  try {
    if (b === 0) {
      throw new Error('Division by zero');
    }
    return a / b;
  } catch (error) {
    console.error('Error:', error.message);
    throw error; // Re-throw if needed
  }
}

// ============================================
// ASYNC ERROR HANDLING - PROMISES
// ============================================

function fetchData() {
  return new Promise((resolve, reject) => {
    // Simulate error
    reject(new Error('Network error'));
  });
}

fetchData()
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error.message));

// ============================================
// ASYNC/AWAIT ERROR HANDLING
// ============================================

async function processData() {
  try {
    const data = await fetchData();
    return data;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

// ============================================
// EXPRESS ERROR MIDDLEWARE
// ============================================

const express = require('express');
const app = express();

// Error middleware (must be last)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: 'Something went wrong!',
    message: err.message
  });
});

// Route that throws error
app.get('/error', (req, res, next) => {
  const error = new Error('Custom error');
  error.status = 400;
  next(error);
});

// ============================================
// CUSTOM ERROR CLASSES
// ============================================

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    
    Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends AppError {
  constructor(message) {
    super(message, 400);
  }
}

class NotFoundError extends AppError {
  constructor(message) {
    super(message, 404);
  }
}

// Usage
function getUser(id) {
  if (!id) {
    throw new ValidationError('User ID required');
  }
  // ...
}

// ============================================
// ERROR HANDLING IN ROUTES
// ============================================

app.get('/users/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      throw new NotFoundError('User not found');
    }
    
    res.json(user);
  } catch (error) {
    next(error); // Pass to error middleware
  }
});

// ============================================
// GLOBAL ERROR HANDLER
// ============================================

function globalErrorHandler(err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  
  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  } else {
    // Production: Don't leak error details
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      });
    } else {
      // Programming error: Don't leak details
      console.error('ERROR:', err);
      res.status(500).json({
        status: 'error',
        message: 'Something went wrong!'
      });
    }
  }
}

app.use(globalErrorHandler);

// ============================================
// ASYNC ERROR WRAPPER
// ============================================

function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

// Usage - no need for try-catch
app.get('/users/:id', asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new NotFoundError('User not found');
  }
  res.json(user);
}));

// ============================================
// ERROR LOGGING
// ============================================

const winston = require('winston');

const logger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log' })
  ]
});

function errorLogger(err, req, res, next) {
  logger.error({
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip
  });
  next(err);
}

app.use(errorLogger);
app.use(globalErrorHandler);

// ============================================
// VALIDATION ERROR HANDLING
// ============================================

const { validationResult } = require('express-validator');

app.post('/users', [
  body('email').isEmail(),
  body('name').notEmpty()
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }
  next();
}, asyncHandler(async (req, res) => {
  const user = await createUser(req.body);
  res.json(user);
}));

// ============================================
// DATABASE ERROR HANDLING
// ============================================

async function handleDatabaseError(err, req, res, next) {
  if (err.name === 'MongoError' && err.code === 11000) {
    // Duplicate key error
    return res.status(400).json({
      error: 'Duplicate entry',
      message: 'This record already exists'
    });
  }
  
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation error',
      message: err.message
    });
  }
  
  next(err);
}

app.use(handleDatabaseError);

// ============================================
// UNHANDLED REJECTIONS AND EXCEPTIONS
// ============================================

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION:', err);
  // Close server gracefully
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION:', err);
  process.exit(1);
});

// ============================================
// GRACEFUL SHUTDOWN
// ============================================

const server = app.listen(3000);

process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});
```

---

## E) Internal Working

### Step-by-Step Internal Flow

**1. Error Occurs**
```
Error thrown/thrown
    ↓
Error object created
    ↓
Error propagates up call stack
```

**2. Error Catching**
```
Try-catch block catches error
    OR
Promise rejection caught
    OR
Error passed to next()
```

**3. Error Processing**
```
Error logged
    ↓
Error transformed/formatted
    ↓
Error response prepared
```

**4. Error Response**
```
Error response sent
    ↓
Request-response cycle complete
```

---

## F) Interview Questions & Answers

### Q1: How do you handle errors in Express.js?

**Answer:**
Errors in Express are handled using error-handling middleware with 4 parameters: `(err, req, res, next)`. Errors are passed to error middleware using `next(error)`. Error middleware should be defined last, after all routes. It catches errors, logs them, and sends appropriate error responses.

### Q2: What's the difference between operational and programming errors?

**Answer:**
Operational errors are expected errors like invalid input, network failures, or database connection issues that can be handled gracefully. Programming errors are bugs in code like null references or type errors. Operational errors should be handled, programming errors should be fixed.

### Q3: How do you handle async errors in Express?

**Answer:**
Async errors can be handled using try-catch with async/await, or using an async wrapper function that catches promise rejections and passes them to error middleware. The wrapper uses `Promise.resolve().catch(next)` to automatically catch errors from async route handlers.

### Q4: What is error propagation in Express?

**Answer:**
Error propagation is passing errors through the middleware chain using `next(error)`. When `next(error)` is called, Express skips all remaining middleware and goes directly to error-handling middleware. This allows centralized error handling.

### Q5: How do you handle unhandled promise rejections?

**Answer:**
Unhandled promise rejections are caught using `process.on('unhandledRejection', handler)`. This global handler catches any promise rejection that wasn't handled. It should log the error and gracefully shutdown the application to prevent undefined behavior.

### Q6: What should error responses include?

**Answer:**
Error responses should include appropriate HTTP status codes, user-friendly error messages, and in development, error stacks for debugging. In production, don't expose sensitive information or stack traces. Use error codes for client-side error handling.

### Q7: How do you create custom error classes?

**Answer:**
Create custom error classes by extending the Error class. Add properties like statusCode, status, and isOperational. Use `Error.captureStackTrace()` to capture stack trace. This allows consistent error handling and better error categorization.

---

## G) Common Mistakes

### Mistake 1: Error Handler Not Last

```javascript
// ❌ WRONG
app.use(errorHandler);
app.get('/route', handler);

// ✅ CORRECT
app.get('/route', handler);
app.use(errorHandler);
```

**Why it breaks:** Error handlers must be last to catch errors from all routes.

### Mistake 2: Not Catching Async Errors

```javascript
// ❌ WRONG
app.get('/users', async (req, res) => {
  const user = await User.findById(id);
  res.json(user); // Error not caught
});

// ✅ CORRECT
app.get('/users', asyncHandler(async (req, res) => {
  const user = await User.findById(id);
  res.json(user);
}));
```

**Why it breaks:** Unhandled async errors crash the application.

### Mistake 3: Exposing Sensitive Information

```javascript
// ❌ WRONG - Production
res.status(500).json({
  error: err.stack, // Don't expose in production
  database: err.databasePassword // Sensitive!
});

// ✅ CORRECT
res.status(500).json({
  error: 'Internal server error'
});
```

**Why it breaks:** Exposes sensitive information to users.

### Mistake 4: Not Logging Errors

```javascript
// ❌ WRONG
app.use((err, req, res, next) => {
  res.status(500).json({ error: 'Error' });
  // Not logged!
});

// ✅ CORRECT
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Error' });
});
```

**Why it breaks:** Can't debug issues without logs.

### Mistake 5: Swallowing Errors

```javascript
// ❌ WRONG
try {
  await riskyOperation();
} catch (error) {
  // Error swallowed, no handling
}

// ✅ CORRECT
try {
  await riskyOperation();
} catch (error) {
  logger.error(error);
  // Handle or re-throw
}
```

**Why it breaks:** Errors are lost, hard to debug.

---

## H) When to Use & When NOT to Use

### When Error Handling is Essential

**1. Production Applications**
- All production code needs error handling
- User experience
- Application stability
- Monitoring and debugging

**2. Async Operations**
- Database operations
- API calls
- File operations
- Network requests

**3. User Input**
- Validation errors
- Format errors
- Business logic errors

### When NOT to Over-Engineer

**1. Simple Scripts**
- One-off scripts
- Development testing
- Quick prototypes

**2. Internal Tools**
- Admin tools
- Development utilities
- Less critical applications

### Backend Perspective

**Express Applications:**
- All routes need error handling
- Database operations
- External API calls
- File operations
- Authentication/authorization

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain Error Handling in Express.js."

**You:**
"Error handling in Express uses error-handling middleware with 4 parameters: `(err, req, res, next)`. Errors are passed using `next(error)`, which skips remaining middleware and goes to error handlers.

Error handlers should be defined last, after all routes. They catch errors, log them, and send appropriate responses. For async code, use try-catch with async/await or an async wrapper function.

Operational errors are expected and should be handled gracefully. Programming errors are bugs that should be fixed. In production, don't expose stack traces or sensitive information. Always log errors for debugging.

Handle unhandled rejections and exceptions globally. Use custom error classes for consistent error handling. Error handling is essential for production applications to provide good user experience and application stability."

---

## J) Mini Practice Task

### Task: Build Comprehensive Error Handling System

Create a complete error handling system:

**Requirements:**
1. Create custom error classes
2. Global error handler
3. Async error wrapper
4. Error logging
5. Different error types handling

**Expected Output:**
```
Custom errors created
Global handler working
Async errors handled
Errors logged properly
Production-safe responses
```

**Solution Template:**
```javascript
// Your error handling implementation
```

---

**END OF TOPIC: ERROR HANDLING**

