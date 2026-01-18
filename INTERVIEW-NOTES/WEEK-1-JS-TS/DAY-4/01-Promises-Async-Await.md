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
// CALLBACKS
// ============================================

/**
 * CALLBACKS KYA HAI? (HINGLISH)
 *
 * Callbacks JavaScript mein functions hain jo dusre functions ko as arguments
 * pass kiye jate hain aur baad mein (usually async operation complete hone ke baad)
 * execute hote hain. Ye JavaScript mein async programming ka traditional tarika hai.
 *
 * Simple Definition:
 * - Function jo dusre function ko argument ke rup mein pass hota hai
 * - Async operation complete hone ke baad execute hota hai
 * - Traditional async programming approach
 * - "Call me back" concept (operation complete hone par call karo)
 *
 * Real-life Analogy:
 * 1. Restaurant Order:
 *    - Jaise restaurant mein order place karte ho aur waiter ko bolte ho
 *      "Order ready ho to mujhe call karo" (callback)
 *    - Callback bhi waise hi - operation complete hone par function call hota hai
 *    - Async operation (cooking) complete hone ke baad callback execute
 *
 * 2. Phone Callback:
 *    - Jaise aap customer service ko call karte ho aur busy ho to
 *      "Call back karo jab available ho" (callback)
 *    - Callback bhi waise hi - jab operation ready ho tab call
 *
 * 3. Delivery Service:
 *    - Jaise delivery service ko address dete ho aur bolte ho
 *      "Pahunch jao to call karo" (callback)
 *    - Callback bhi waise hi - delivery complete hone par call
 *
 * Callback Syntax:
 * function asyncOperation(callback) {
 *   // Some async work
 *   callback(result); // Callback execute
 * }
 *
 * asyncOperation((result) => {
 *   console.log(result); // Callback function
 * });
 *
 * Callback Types:
 * 1. **Synchronous Callback:** Immediately execute (array.map, forEach)
 * 2. **Asynchronous Callback:** Execute after async operation (setTimeout, API calls)
 *
 * Callback Hell Problem:
 * - Nested callbacks (callback inside callback inside callback...)
 * - Code difficult to read aur maintain
 * - Error handling complex
 * - Pyramid of doom structure
 *
 * CALLBACKS - EASY ENGLISH EXPLANATION
 *
 * Callbacks are functions passed as arguments to other functions and executed
 * later (usually after async operation completes). They are the traditional way
 * of async programming in JavaScript.
 *
 * Key Concepts:
 * - **Function as Argument:** Pass function to another function
 * - **Execute Later:** Called after operation completes
 * - **Async Programming:** Traditional approach for async operations
 * - **"Call Back":** Concept of calling back when ready
 *
 * How Callbacks Work:
 * 1. Function receives callback as parameter
 * 2. Async operation starts
 * 3. Operation completes
 * 4. Callback function executed with result
 *
 * Callback Types:
 * 1. **Synchronous:** Execute immediately (array.map, forEach)
 * 2. **Asynchronous:** Execute after async operation (setTimeout, API)
 *
 * Callback Hell:
 * - Nested callbacks become hard to read
 * - Error handling becomes complex
 * - Code structure becomes pyramid-like
 * - Difficult to maintain
 */

// ============================================
// BASIC CALLBACK EXAMPLE
// ============================================

// Synchronous Callback (immediately executes)
function greet(name, callback) {
  const message = `Hello, ${name}!`;
  callback(message); // Immediately calls callback
}

greet('John', (message) => {
  console.log(message); // "Hello, John!"
});

// Array methods with callbacks
const numbers = [1, 2, 3, 4, 5];
numbers.forEach((num) => {
  console.log(num); // Synchronous callback
});

const doubled = numbers.map((num) => num * 2); // Synchronous callback
console.log(doubled); // [2, 4, 6, 8, 10]

// ============================================
// ASYNCHRONOUS CALLBACK EXAMPLE
// ============================================

// setTimeout with callback
setTimeout(() => {
  console.log('This runs after 1 second');
}, 1000);

// Simulating API call with callback
function fetchUserData(userId, callback) {
  // Simulate async operation
  setTimeout(() => {
    const user = { id: userId, name: 'John Doe', email: 'john@example.com' };
    callback(null, user); // Node.js style: (error, data)
  }, 1000);
}

// Using callback
fetchUserData(1, (error, user) => {
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('User:', user);
  }
});

// ============================================
// CALLBACK HELL (PYRAMID OF DOOM)
// ============================================

/**
 * CALLBACK HELL KYA HAI? (HINGLISH)
 *
 * Callback Hell ek problem hai jahan multiple nested callbacks code ko
 * unreadable aur unmaintainable banate hain. Code pyramid shape mein ban jata hai
 * jisse padhna aur maintain karna mushkil ho jata hai.
 *
 * Simple Definition:
 * - Multiple nested callbacks
 * - Code pyramid shape mein
 * - Difficult to read aur maintain
 * - Error handling complex
 *
 * Real-life Analogy:
 * 1. Nested Boxes:
 *    - Jaise box ke andar box, uske andar box, uske andar box...
 *    - Callback Hell bhi waise hi - callback ke andar callback, uske andar callback...
 *    - Har level par complexity badhti hai
 *
 * 2. Russian Dolls:
 *    - Jaise Russian dolls ek ke andar ek hote hain
 *    - Callback Hell bhi waise hi - callbacks nested hote hain
 *    - Bahar se andar tak jana mushkil
 *
 * Solution:
 * - Promises use karo (better than callbacks)
 * - Async/await use karo (cleanest)
 * - Named functions use karo (instead of anonymous)
 */

// ❌ CALLBACK HELL EXAMPLE
function getUserData(userId, callback) {
  // Step 1: Get user
  fetchUser(userId, (err, user) => {
    if (err) {
      callback(err, null);
      return;
    }
    
    // Step 2: Get user posts
    fetchPosts(user.id, (err, posts) => {
      if (err) {
        callback(err, null);
        return;
      }
      
      // Step 3: Get comments for each post
      fetchComments(posts[0].id, (err, comments) => {
        if (err) {
          callback(err, null);
          return;
        }
        
        // Step 4: Get likes for comments
        fetchLikes(comments[0].id, (err, likes) => {
          if (err) {
            callback(err, null);
            return;
          }
          
          // Final callback - Deep nesting!
          callback(null, { user, posts, comments, likes });
        });
      });
    });
  });
}

// ✅ BETTER: Using Promises (solves callback hell)
function getUserDataPromise(userId) {
  return fetchUser(userId)
    .then(user => fetchPosts(user.id))
    .then(posts => fetchComments(posts[0].id))
    .then(comments => fetchLikes(comments[0].id))
    .then(likes => ({ user, posts, comments, likes }))
    .catch(error => {
      console.error('Error:', error);
      throw error;
    });
}

// ✅ BEST: Using Async/Await (cleanest)
async function getUserDataAsync(userId) {
  try {
    const user = await fetchUser(userId);
    const posts = await fetchPosts(user.id);
    const comments = await fetchComments(posts[0].id);
    const likes = await fetchLikes(comments[0].id);
    return { user, posts, comments, likes };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// ============================================
// CALLBACK PATTERNS
// ============================================

// Node.js Style Callback (Error First)
function readFile(path, callback) {
  // Simulate file read
  setTimeout(() => {
    const error = null; // or new Error('File not found')
    const data = 'File content';
    callback(error, data); // Error first, data second
  }, 1000);
}

readFile('/path/to/file', (err, data) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  console.log('Data:', data);
});

// Success/Error Callback Pattern
function apiCall(url, onSuccess, onError) {
  fetch(url)
    .then(response => {
      if (response.ok) {
        onSuccess(response);
      } else {
        onError(new Error('Request failed'));
      }
    })
    .catch(onError);
}

apiCall(
  '/api/data',
  (data) => console.log('Success:', data),
  (error) => console.error('Error:', error)
);

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

/**
 * ASYNC/AWAIT KYA HAI? (HINGLISH)
 *
 * Async/Await Promises ka syntactic sugar hai jo async code ko synchronous
 * code jaisa likhne deta hai. Ye ES8 (ES2017) mein introduce hua aur ab
 * modern JavaScript mein async programming ka preferred tarika hai.
 *
 * Simple Definition:
 * - Promises ka syntactic sugar
 * - Async code ko synchronous jaisa likhna
 * - async keyword: Function ko async banata hai
 * - await keyword: Promise settle hone tak wait karta hai
 * - try-catch se error handling
 *
 * Real-life Analogy:
 * 1. Waiting for Order:
 *    - Jaise restaurant mein order place karte ho aur table par wait karte ho
 *      (await) - order ready hone tak wait, phir khana (result) milta hai
 *    - Async/Await bhi waise hi - await se wait karte ho, result milta hai
 *    - Synchronous jaisa feel hota hai, par async hai
 *
 * 2. Queue System:
 *    - Jaise queue mein khade hoke wait karte ho (await)
 *    - Jab aapki baari aati hai tab aage badhte ho (result)
 *    - Async/Await bhi waise hi - wait karke result milta hai
 *
 * 3. Exam Result:
 *    - Jaise exam dene ke baad result ka wait karte ho (await)
 *    - Result aane par check karte ho (result)
 *    - Async/Await bhi waise hi - wait karke result process karte ho
 *
 * async Keyword:
 * - Function ko async banata hai
 * - Function hamesha Promise return karta hai
 * - Function ke andar await use kar sakte ho
 * - Error automatically Promise rejection ban jata hai
 *
 * await Keyword:
 * - Promise settle hone tak execution pause karta hai
 * - Sirf async function ke andar use kar sakte ho
 * - Resolved value return karta hai
 * - Rejected case mein error throw karta hai (catch block mein catch hota hai)
 *
 * Async/Await Benefits:
 * - **Readable:** Code synchronous jaisa lagta hai
 * - **Error Handling:** try-catch use kar sakte ho
 * - **Debugging:** Easier to debug
 * - **Less Nesting:** Callback hell se bachata hai
 * - **Modern:** Preferred approach in modern JavaScript
 *
 * Async/Await vs Promises:
 * - **Async/Await:** Synchronous-like syntax, try-catch, cleaner
 * - **Promises:** .then() chains, .catch(), more verbose
 * - **Both:** Same functionality, different syntax
 * - **Preference:** Async/await for sequential, Promises for parallel
 *
 * ASYNC/AWAIT - EASY ENGLISH EXPLANATION
 *
 * Async/Await is syntactic sugar for Promises that allows writing async code
 * like synchronous code. Introduced in ES8 (ES2017), it's now the preferred
 * way for async programming in modern JavaScript.
 *
 * Key Concepts:
 * - **Syntactic Sugar:** Makes Promises easier to use
 * - **Synchronous-like:** Write async code like synchronous
 * - **async Keyword:** Makes function async (always returns Promise)
 * - **await Keyword:** Waits for Promise to settle
 * - **Error Handling:** Use try-catch for errors
 *
 * How It Works:
 * 1. **async function:** Always returns Promise
 * 2. **await:** Pauses execution until Promise settles
 * 3. **Resolved:** Returns resolved value
 * 4. **Rejected:** Throws error (caught in catch block)
 *
 * Benefits:
 * - **Readable:** Code looks synchronous
 * - **Error Handling:** try-catch syntax
 * - **Debugging:** Easier to debug
 * - **Less Nesting:** Avoids callback hell
 * - **Modern:** Preferred approach
 *
 * async Keyword:
 * - Makes function async
 * - Function always returns Promise
 * - Can use await inside
 * - Errors become Promise rejections
 *
 * await Keyword:
 * - Pauses execution until Promise settles
 * - Only works inside async functions
 * - Returns resolved value
 * - Throws error if rejected
 *
 * Best Practices:
 * - Use async/await for sequential operations
 * - Use Promise.all() for parallel operations
 * - Always use try-catch for error handling
 * - Don't forget await (common mistake)
 */

// ============================================
// BASIC ASYNC/AWAIT
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

// async function always returns Promise
async function getData() {
  return 'Hello'; // Automatically wrapped in Promise
}

getData().then(data => console.log(data)); // "Hello"

// Without async, explicit Promise
function getDataPromise() {
  return Promise.resolve('Hello');
}

// ============================================
// AWAIT DETAILED EXAMPLES
// ============================================

// await pauses execution
async function example() {
  console.log('1. Start');
  
  const result = await new Promise(resolve => {
    setTimeout(() => resolve('Done'), 1000);
  });
  
  console.log('2. After await:', result); // Runs after 1 second
  console.log('3. End');
}

// await with error handling
async function fetchWithErrorHandling() {
  try {
    const response = await fetch('/api/data');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    // Handle error or rethrow
    throw error;
  }
}

// Multiple awaits (sequential)
async function sequentialOperations() {
  console.log('Step 1: Starting...');
  const step1 = await operation1();
  console.log('Step 2: Step 1 completed');
  
  const step2 = await operation2(step1);
  console.log('Step 3: Step 2 completed');
  
  const step3 = await operation3(step2);
  console.log('All steps completed');
  
  return step3;
}

// ============================================
// ASYNC/AWAIT vs PROMISES COMPARISON
// ============================================

// Using Promises (.then() chains)
function fetchUserDataPromise(userId) {
  return fetch(`/api/users/${userId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(user => {
      return fetch(`/api/posts?userId=${user.id}`);
    })
    .then(response => response.json())
    .then(posts => {
      return { user: null, posts }; // user not available here
    })
    .catch(error => {
      console.error('Error:', error);
      throw error;
    });
}

// Using Async/Await (cleaner)
async function fetchUserDataAsync(userId) {
  try {
    const userResponse = await fetch(`/api/users/${userId}`);
    if (!userResponse.ok) {
      throw new Error('Network response was not ok');
    }
    const user = await userResponse.json();
    
    const postsResponse = await fetch(`/api/posts?userId=${user.id}`);
    const posts = await postsResponse.json();
    
    return { user, posts }; // Both available
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// ============================================
// PARALLEL vs SEQUENTIAL EXECUTION
// ============================================

// Sequential (one after another) - Slow
async function sequentialFetch() {
  const user = await fetch('/api/user').then(r => r.json());
  const posts = await fetch('/api/posts').then(r => r.json());
  const comments = await fetch('/api/comments').then(r => r.json());
  
  return { user, posts, comments }; // Takes sum of all times
}

// Parallel (all at once) - Fast
async function parallelFetch() {
  const [user, posts, comments] = await Promise.all([
    fetch('/api/user').then(r => r.json()),
    fetch('/api/posts').then(r => r.json()),
    fetch('/api/comments').then(r => r.json())
  ]);
  
  return { user, posts, comments }; // Takes max time
}

// ============================================
// ASYNC/AWAIT ERROR HANDLING PATTERNS
// ============================================

// Pattern 1: try-catch (recommended)
async function withTryCatch() {
  try {
    const data = await fetchData();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null; // or throw error
  }
}

// Pattern 2: .catch() on async function call
async function fetchData() {
  const response = await fetch('/api/data');
  return response.json();
}

fetchData()
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// Pattern 3: Wrapper function
async function safeAsync(fn) {
  try {
    return await fn();
  } catch (error) {
    console.error('Error in safeAsync:', error);
    return null;
  }
}

// Usage
const result = await safeAsync(() => fetchData());

// ============================================
// ASYNC/AWAIT IN LOOPS
// ============================================

// Sequential loop (one by one)
async function processSequential(items) {
  const results = [];
  for (const item of items) {
    const result = await processItem(item); // Wait for each
    results.push(result);
  }
  return results;
}

// Parallel loop (all at once)
async function processParallel(items) {
  const promises = items.map(item => processItem(item));
  const results = await Promise.all(promises); // All at once
  return results;
}

// ============================================
// ASYNC/AWAIT COMMON PATTERNS
// ============================================

// Pattern: Conditional async
async function conditionalAsync(condition) {
  if (condition) {
    return await operation1();
  } else {
    return await operation2();
  }
}

// Pattern: Early return
async function earlyReturn(userId) {
  if (!userId) {
    return null; // Early return
  }
  
  const user = await fetchUser(userId);
  return user;
}

// Pattern: Multiple try-catch
async function multipleTryCatch() {
  try {
    const user = await fetchUser();
    try {
      const posts = await fetchPosts(user.id);
      return { user, posts };
    } catch (error) {
      console.error('Error fetching posts:', error);
      return { user, posts: [] };
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}

// Multiple awaits (already covered in detailed section above)

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

