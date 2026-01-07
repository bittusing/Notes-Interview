# DENTIRA INTERVIEW PREPARATION - PART 1
## Company Overview & Job Description Analysis

--------------------------------

## A) Company & Role Overview

### Job Description Summary

**Position:** Backend Engineer (1+ years experience)

**Company:** Dentira

**Interview Time:** 2 PM - 3 PM

**Key Requirements:**
- 1+ years building microservices with Node.js (TypeScript preferred)
- Experience with NoSQL and SQL databases (MongoDB, MySQL)
- Database design expertise
- REST APIs using Express.js/Nest.js
- HTTP fundamentals
- Event-driven architectures
- Message brokers (RabbitMQ, Kafka)
- Strong troubleshooting skills
- Data structures and algorithms

**Good to Have:**
- MERN stack experience
- Docker and Kubernetes
- Open-source contributions

### What They're Looking For

**Primary Skills:**
1. **Microservices Architecture** - Building scalable, distributed systems
2. **Node.js + TypeScript** - Modern backend development
3. **Database Expertise** - Both SQL and NoSQL, design patterns
4. **API Development** - REST APIs, best practices
5. **System Design** - Event-driven, message queues
6. **Problem Solving** - Troubleshooting, debugging

**Why This Role Matters:**
- Product company/startup environment
- Fast-paced, changing priorities
- Real-world problem solving
- Distributed systems experience
- Performance and scalability focus

---

## B) Node.js Fundamentals (Quick Recap)

### Zero se Start Karte Hain

**Node.js kya hai?**
- JavaScript runtime environment
- Server-side JavaScript execution
- Chrome V8 engine par built
- Event-driven, non-blocking I/O
- Single-threaded with event loop

**Key Features:**
- **Non-blocking I/O:** Multiple requests handle kar sakta hai
- **Event Loop:** Asynchronous operations manage karta hai
- **NPM Ecosystem:** Largest package registry
- **Cross-platform:** Windows, Linux, macOS

### Node.js Architecture

**1. V8 Engine:**
- JavaScript code execute karta hai
- Fast performance
- Memory management

**2. libuv:**
- Event loop implementation
- Thread pool management
- File system operations
- Network operations

**3. Event Loop:**
- Single-threaded execution
- Non-blocking I/O operations
- Callback queue management
- Microtasks and macrotasks

### Node.js Use Cases

**Perfect For:**
- REST APIs and microservices
- Real-time applications (chat, gaming)
- Data streaming applications
- Serverless functions
- CLI tools

**Not Ideal For:**
- CPU-intensive tasks (image processing)
- Heavy computational work
- Long-running blocking operations

---

## C) TypeScript for Backend Development

### Zero se Start Karte Hain

**TypeScript kya hai?**
- JavaScript with type safety
- Superset of JavaScript
- Compiles to JavaScript
- Static type checking
- Better IDE support

**Why TypeScript for Backend?**
- **Type Safety:** Catch errors at compile time
- **Better Refactoring:** IDE support
- **Documentation:** Types serve as documentation
- **Team Collaboration:** Clearer code contracts
- **Scalability:** Easier to maintain large codebases

### TypeScript Basics

**1. Basic Types:**
```typescript
// Primitives
let name: string = "John";
let age: number = 30;
let isActive: boolean = true;

// Arrays
let numbers: number[] = [1, 2, 3];
let names: Array<string> = ["John", "Jane"];

// Objects
interface User {
  id: number;
  name: string;
  email: string;
  isActive?: boolean; // Optional
}
```

**2. Functions:**
```typescript
// Function with types
function greet(name: string): string {
  return `Hello, ${name}`;
}

// Async function
async function fetchUser(id: number): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}
```

**3. Classes:**
```typescript
class UserService {
  private users: User[] = [];

  async createUser(userData: Omit<User, 'id'>): Promise<User> {
    const newUser: User = {
      id: Date.now(),
      ...userData
    };
    this.users.push(newUser);
    return newUser;
  }

  async getUserById(id: number): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }
}
```

### TypeScript Advanced Features

**1. Generics:**
```typescript
// Generic function
function identity<T>(arg: T): T {
  return arg;
}

// Generic class
class Repository<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  findById(id: number): T | undefined {
    return this.items.find(item => (item as any).id === id);
  }
}
```

**2. Utility Types:**
```typescript
// Partial - makes all properties optional
type PartialUser = Partial<User>;

// Pick - select specific properties
type UserPreview = Pick<User, 'id' | 'name'>;

// Omit - exclude specific properties
type CreateUserDto = Omit<User, 'id'>;

// Record - create object type
type UserRoles = Record<string, boolean>;
```

**3. Enums:**
```typescript
enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  MODERATOR = 'moderator'
}

enum HttpStatus {
  OK = 200,
  NOT_FOUND = 404,
  SERVER_ERROR = 500
}
```

### TypeScript in Node.js Projects

**Project Structure:**
```
src/
  controllers/
    user.controller.ts
  services/
    user.service.ts
  models/
    user.model.ts
  routes/
    user.routes.ts
  middleware/
    auth.middleware.ts
  utils/
    logger.ts
  config/
    database.ts
```

**tsconfig.json:**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "node"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

---

## D) Interview Questions - Part 1

### General Questions

**Q1: "Tell me about your Node.js experience"**

✅ **Answer:**
"I have X years of hands-on experience working with Node.js, primarily building REST APIs and microservices using Express.js and Nest.js. I've worked extensively with TypeScript for type safety and better code maintainability. I've handled MongoDB using Mongoose, MySQL using Sequelize/TypeORM, implemented authentication using JWT, integrated third-party APIs, and optimized performance using caching (Redis) and background job queues. I've worked on real products where scalability and reliability were critical, not just demos. I understand event-driven architecture, async/await patterns, and how to handle high-concurrency scenarios."

**Q2: "Why TypeScript over JavaScript for backend?"**

✅ **Answer:**
"TypeScript provides several advantages for backend development:
1. **Type Safety:** Catches errors at compile time, reducing runtime bugs
2. **Better IDE Support:** Autocomplete, refactoring, and navigation
3. **Documentation:** Types serve as inline documentation
4. **Team Collaboration:** Clearer contracts between functions and modules
5. **Refactoring Confidence:** Easier to refactor large codebases
6. **Scalability:** Better for maintaining enterprise-level applications

In production, I've seen TypeScript catch many potential bugs before deployment, especially around API contracts and database models."

**Q3: "Explain Node.js event loop"**

✅ **Answer:**
"Node.js event loop is the core mechanism that enables non-blocking I/O operations. It's a single-threaded loop that continuously checks for events and executes callbacks.

**Phases:**
1. **Timers:** Executes setTimeout and setInterval callbacks
2. **Pending Callbacks:** Executes I/O callbacks deferred to next loop
3. **Idle/Prepare:** Internal use
4. **Poll:** Fetches new I/O events, executes I/O callbacks
5. **Check:** setImmediate callbacks execute here
6. **Close Callbacks:** Close event callbacks (socket.on('close'))

**Key Points:**
- Single-threaded for JavaScript execution
- Uses thread pool for heavy operations (file I/O, DNS)
- Non-blocking I/O operations
- Microtasks (Promises) have higher priority than macrotasks

This architecture allows Node.js to handle thousands of concurrent connections efficiently."

**Q4: "What are the limitations of Node.js?"**

✅ **Answer:**
"Node.js has some limitations:
1. **CPU-intensive tasks:** Single-threaded nature makes it unsuitable for heavy computations
2. **Memory:** Large objects can cause memory issues
3. **Callback hell:** Without proper patterns, can lead to nested callbacks
4. **Error handling:** Async errors can be harder to track
5. **Not ideal for:** Image processing, video encoding, machine learning

**Solutions:**
- Use worker threads for CPU-intensive tasks
- Implement proper error handling patterns
- Use async/await instead of callbacks
- Monitor memory usage
- Use child processes for heavy computations"

---

## E) Key Takeaways

### Must Know for Interview:
1. ✅ Node.js architecture (event loop, libuv, V8)
2. ✅ TypeScript basics and advanced features
3. ✅ Async/await patterns
4. ✅ Error handling in Node.js
5. ✅ Project structure best practices

### Next Steps:
- Read dentira2.md for Microservices Architecture
- Practice TypeScript examples
- Review Node.js event loop in detail

---

**End of Part 1 - Continue to dentira2.md**

