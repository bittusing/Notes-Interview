# PROMISES & ASYNC/AWAIT

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Promises kya hain?**
- Promises async operations handle karte hain
- Future value ka representation
- Three states: pending, fulfilled, rejected
- Callback hell solve karta hai
- Better error handling

**Real-life Analogy:**
- Promise = Restaurant order
- Pending = Order placed
- Fulfilled = Order ready
- Rejected = Order cancelled
- .then() = Order receive karna

**Async/Await kya hai?**
- Async/await Promises ka syntactic sugar
- Synchronous jaisa code
- Try-catch error handling
- Cleaner than .then() chains
- ES8 feature

**Promise States:**
- **Pending:** Initial state
- **Fulfilled:** Success
- **Rejected:** Failure
- **Settled:** Fulfilled or rejected

---

## B) Easy English Theory

### What are Promises and Async/Await?

Promises represent async operation result. States: Pending (initial), Fulfilled (success), Rejected (failure). Methods: .then() (handle success), .catch() (handle error), .finally() (always runs). Async/await: Syntactic sugar for promises, write async code like synchronous, use try-catch for errors. Benefits: Better than callbacks, cleaner code, better error handling.

---

## C) Why This Concept Exists

### The Problem

**Without Promises:**
- Callback hell
- Difficult error handling
- No composition
- Hard to read
- Nested callbacks

### The Solution

**Promises Provide:**
1. **Composition:** Chain operations
2. **Error Handling:** .catch() method
3. **Readability:** Cleaner code
4. **Async/Await:** Synchronous-like syntax
5. **Better UX:** Handle async properly

---

## D) Practical Example (Code)

```javascript
// ============================================
// PROMISE BASICS
// ============================================

// Creating Promise
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = true;
    if (success) {
      resolve('Data fetched successfully');
    } else {
      reject('Error fetching data');
    }
  }, 1000);
});

// Consuming Promise
promise
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.error(error);
  })
  .finally(() => {
    console.log('Promise settled');
  });

// ============================================
// PROMISE CHAINING
// ============================================

fetch('/api/user')
  .then(response => response.json())
  .then(user => {
    return fetch(`/api/posts/${user.id}`);
  })
  .then(response => response.json())
  .then(posts => {
    console.log(posts);
  })
  .catch(error => {
    console.error('Error:', error);
  });

// ============================================
// PROMISE METHODS
// ============================================

// Promise.all - All must succeed
Promise.all([
  fetch('/api/users'),
  fetch('/api/posts'),
  fetch('/api/comments')
])
  .then(responses => {
    return Promise.all(responses.map(r => r.json()));
  })
  .then(([users, posts, comments]) => {
    console.log(users, posts, comments);
  })
  .catch(error => {
    console.error('One failed:', error);
  });

// Promise.allSettled - All complete (success or failure)
Promise.allSettled([
  fetch('/api/users'),
  fetch('/api/posts')
])
  .then(results => {
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        console.log(`Request ${index} succeeded`);
      } else {
        console.log(`Request ${index} failed`);
      }
    });
  });

// Promise.race - First to complete
Promise.race([
  fetch('/api/fast'),
  fetch('/api/slow')
])
  .then(response => {
    console.log('First response:', response);
  });

// Promise.any - First to succeed
Promise.any([
  fetch('/api/primary'),
  fetch('/api/fallback')
])
  .then(response => {
    console.log('First success:', response);
  })
  .catch(errors => {
    console.error('All failed:', errors);
  });

// ============================================
// ASYNC/AWAIT
// ============================================

// Basic async function
async function fetchUser() {
  try {
    const response = await fetch('/api/user');
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Multiple awaits
async function fetchUserData(userId) {
  try {
    const user = await fetch(`/api/users/${userId}`).then(r => r.json());
    const posts = await fetch(`/api/posts?userId=${userId}`).then(r => r.json());
    const comments = await fetch(`/api/comments?userId=${userId}`).then(r => r.json());
    
    return {
      user,
      posts,
      comments
    };
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}

// Parallel execution
async function fetchUserDataParallel(userId) {
  try {
    const [user, posts, comments] = await Promise.all([
      fetch(`/api/users/${userId}`).then(r => r.json()),
      fetch(`/api/posts?userId=${userId}`).then(r => r.json()),
      fetch(`/api/comments?userId=${userId}`).then(r => r.json())
    ]);
    
    return { user, posts, comments };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// ============================================
// ERROR HANDLING
// ============================================

// Promise error handling
function fetchData() {
  return fetch('/api/data')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Fetch error:', error);
      throw error;
    });
}

// Async/await error handling
async function fetchDataAsync() {
  try {
    const response = await fetch('/api/data');
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

// ============================================
// PROMISE UTILITIES
// ============================================

// Delay function
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Usage
async function example() {
  console.log('Start');
  await delay(1000);
  console.log('After 1 second');
}

// Timeout wrapper
function timeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), ms)
    )
  ]);
}

// Retry function
async function retry(fn, retries = 3, delay = 1000) {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, delay));
      return retry(fn, retries - 1, delay);
    }
    throw error;
  }
}

// ============================================
// CONVERTING CALLBACKS TO PROMISES
// ============================================

// Callback to Promise
function readFilePromise(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

// Using util.promisify (Node.js)
const { promisify } = require('util');
const readFile = promisify(fs.readFile);

// ============================================
// ADVANCED PATTERNS
// ============================================

// Sequential execution
async function sequential() {
  const result1 = await operation1();
  const result2 = await operation2(result1);
  const result3 = await operation3(result2);
  return result3;
}

// Parallel execution
async function parallel() {
  const [result1, result2, result3] = await Promise.all([
    operation1(),
    operation2(),
    operation3()
  ]);
  return { result1, result2, result3 };
}

// Conditional async
async function conditional() {
  if (condition) {
    return await operation1();
  } else {
    return await operation2();
  }
}
```

---

## E) Internal Working

**Promise Mechanism:**
1. **Creation:** Promise constructor
2. **Execution:** Executor runs
3. **State:** Pending → Fulfilled/Rejected
4. **Handlers:** .then()/.catch() registered
5. **Microtask Queue:** Handlers queued
6. **Execution:** Handlers run after current code

**Async/Await:**
- **Async:** Returns Promise
- **Await:** Pauses execution
- **Resume:** Continues after Promise settles
- **Error:** Throws to catch block

---

## F) Interview Questions & Answers

### Q1: What are Promises and how do they work?

**Answer:**
Promises represent async operation result. States: Pending (initial), Fulfilled (success with value), Rejected (failure with reason). Methods: .then() (handle success), .catch() (handle error), .finally() (always runs). Work by: Executor runs immediately, state changes on resolve/reject, handlers registered with .then(), handlers execute when Promise settles. Benefits: Better than callbacks, composable, better error handling.

### Q2: What is the difference between Promise.all and Promise.allSettled?

**Answer:**
Promise.all: Waits for all Promises, rejects if any reject, returns array of results, use when all must succeed. Promise.allSettled: Waits for all Promises, never rejects, returns array of {status, value/reason}, use when need all results regardless of success/failure. Key difference: all fails fast, allSettled waits for all. Use all for dependent operations, allSettled for independent operations.

### Q3: What is async/await and how does it work?

**Answer:**
async/await: Syntactic sugar for Promises, write async code like synchronous. async function: Always returns Promise, can use await inside. await: Pauses execution until Promise settles, returns resolved value, throws error if rejected. Benefits: Cleaner than .then() chains, try-catch error handling, easier to read. Works by: async function returns Promise, await pauses and waits, resumes after Promise settles.

---

## G) Common Mistakes

### Mistake 1: Forgetting await

```javascript
// ❌ WRONG - Missing await
async function fetchData() {
  const data = fetch('/api/data'); // Returns Promise, not data
  return data.json(); // Error
}

// ✅ CORRECT - Use await
async function fetchData() {
  const response = await fetch('/api/data');
  const data = await response.json();
  return data;
}
```

**Why it breaks:** Without await, get Promise not value, operations fail.

---

## H) When to Use & When NOT to Use

Use Promises/async-await for: Async operations, API calls, file operations, timers. Don't use when: Synchronous operations, simple callbacks sufficient, performance critical (overhead).

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain Promises and async/await."

**You:"
"Promises represent async operation result. States: Pending, Fulfilled, Rejected. Methods: .then() (success), .catch() (error), .finally() (always). async/await: Syntactic sugar, write async like synchronous. async function returns Promise, await pauses until Promise settles.

Benefits: Better than callbacks, cleaner code, better error handling. Use Promise.all for parallel, async/await for sequential. Key: Promises handle async, async/await makes it readable."

---

## J) Mini Practice Task

Practice: Create Promises, chain Promises, use Promise.all/allSettled/race, convert callbacks to Promises, use async/await, handle errors, implement retry logic.

---

**END OF TOPIC: PROMISES & ASYNC/AWAIT**

