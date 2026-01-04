# CLUSTER MODULE

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Cluster Module kya hai?**
- Cluster module Node.js mein multi-processing enable karta hai
- Single Node.js process ko multiple worker processes mein divide karta hai
- Har worker process apna event loop run karta hai
- CPU cores ko utilize karne ke liye use hota hai
- Performance aur scalability improve karta hai

**Real-life Analogy:**
- Imagine ek restaurant
- Ek chef (single process) limited orders handle kar sakta hai
- Multiple chefs (cluster) zyada orders handle kar sakte hain
- Har chef apna kitchen (process) run karta hai
- Manager (master process) orders distribute karta hai

**Key Concepts:**
- **Master Process:** Main process jo workers manage karta hai
- **Worker Processes:** Child processes jo actual work karte hain
- **Process Communication:** IPC (Inter-Process Communication)
- **Load Balancing:** Requests ko workers mein distribute

### Why Cluster Module?

**Problem:**
- Node.js single-threaded hai
- Single CPU core use karta hai
- Multi-core systems ka full use nahi hota
- Limited scalability

**Solution:**
- Multiple processes create karte hain
- Har process different CPU core use karta hai
- Better resource utilization
- Improved performance

### Cluster Architecture

**Master Process:**
- Main process jo cluster create karta hai
- Workers spawn karta hai
- Requests distribute karta hai
- Workers ko manage karta hai

**Worker Processes:**
- Child processes jo actual work karte hain
- Apna event loop run karte hain
- Independent memory space
- Requests handle karte hain

**Communication:**
- IPC (Inter-Process Communication)
- Master aur workers communicate karte hain
- Messages send/receive kar sakte hain

### Load Balancing

**Round-Robin Algorithm:**
- Default load balancing strategy
- Requests sequentially distribute hote hain
- Worker 1, Worker 2, Worker 3, Worker 4, phir se Worker 1
- Fair distribution

**Custom Load Balancing:**
- Custom algorithm implement kar sakte hain
- Worker load ke basis par
- Performance metrics ke basis par

### Process Management

**Worker Lifecycle:**
1. Master process worker spawn karta hai
2. Worker start hota hai
3. Worker ready ho jata hai
4. Worker requests handle karta hai
5. Worker crash ho to restart hota hai (optional)

**Worker Events:**
- `online`: Worker ready
- `message`: Message received
- `disconnect`: Worker disconnected
- `exit`: Worker exited

---

## B) Easy English Theory

### What is Cluster Module?

Cluster module enables Node.js to create multiple worker processes that share server ports. It allows a single Node.js application to utilize multiple CPU cores by running multiple instances. The master process manages workers and distributes incoming connections.

### Key Components

**Master Process:** Main process that creates and manages worker processes

**Worker Processes:** Child processes that handle actual requests and share the server port

**Load Balancing:** Distribution of incoming connections across workers (default: round-robin)

**IPC:** Inter-Process Communication between master and workers

### How It Works

Master process creates worker processes (typically one per CPU core). Workers share the same server port. When a connection arrives, the OS distributes it to an available worker using round-robin. Each worker handles requests independently with its own event loop.

### Benefits

- **Multi-Core Utilization:** Use all CPU cores
- **Improved Performance:** Better throughput
- **Fault Tolerance:** Workers can restart independently
- **Scalability:** Handle more concurrent requests

---

## C) Why This Concept Exists

### The Problem

**Without Cluster:**
- Single process uses one CPU core
- Multi-core systems underutilized
- Limited scalability
- Performance bottleneck

### The Solution

**Cluster Module Provides:**
1. **Multi-Core Usage:** Utilize all CPU cores
2. **Better Performance:** Higher throughput
3. **Fault Tolerance:** Worker isolation
4. **Scalability:** Handle more load

### Real-World Need

- **High-Traffic Applications:** Handle many requests
- **CPU-Intensive Tasks:** Distribute load
- **Production Servers:** Maximize resources
- **Scalability:** Grow with demand

---

## D) Practical Example (Code)

```javascript
// ============================================
// BASIC CLUSTER SETUP
// ============================================

const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master process ${process.pid} is running`);
  
  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    // Restart worker
    cluster.fork();
  });
} else {
  // Workers can share TCP connection
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end(`Hello from worker ${process.pid}`);
  }).listen(3000);
  
  console.log(`Worker ${process.pid} started`);
}

// ============================================
// CLUSTER WITH EXPRESS
// ============================================

const cluster = require('cluster');
const express = require('express');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  
  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    console.log('Starting a new worker');
    cluster.fork();
  });
} else {
  const app = express();
  
  app.get('/', (req, res) => {
    res.json({
      message: 'Hello from cluster',
      worker: process.pid,
      uptime: process.uptime()
    });
  });
  
  app.listen(3000, () => {
    console.log(`Worker ${process.pid} listening on port 3000`);
  });
}

// ============================================
// WORKER COMMUNICATION
// ============================================

const cluster = require('cluster');
const http = require('http');

if (cluster.isMaster) {
  const numWorkers = require('os').cpus().length;
  
  console.log(`Master ${process.pid} is running`);
  
  // Fork workers
  for (let i = 0; i < numWorkers; i++) {
    const worker = cluster.fork();
    
    // Listen to worker messages
    worker.on('message', (msg) => {
      console.log(`Master received: ${msg} from worker ${worker.process.pid}`);
    });
    
    // Send message to worker
    worker.send(`Hello from master to worker ${worker.process.pid}`);
  }
  
  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  // Worker process
  console.log(`Worker ${process.pid} started`);
  
  // Listen to master messages
  process.on('message', (msg) => {
    console.log(`Worker ${process.pid} received: ${msg}`);
    // Send response to master
    process.send(`Response from worker ${process.pid}`);
  });
  
  http.createServer((req, res) => {
    res.end(`Worker ${process.pid}`);
  }).listen(3000);
}

// ============================================
// GRACEFUL SHUTDOWN
// ============================================

const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  
  // Graceful shutdown
  process.on('SIGTERM', () => {
    console.log('Master received SIGTERM, shutting down gracefully');
    
    for (const id in cluster.workers) {
      cluster.workers[id].kill();
    }
  });
  
  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} exited`);
  });
} else {
  const server = http.createServer((req, res) => {
    res.end(`Worker ${process.pid}`);
  });
  
  server.listen(3000);
  
  // Graceful shutdown for worker
  process.on('SIGTERM', () => {
    console.log(`Worker ${process.pid} received SIGTERM`);
    server.close(() => {
      console.log(`Worker ${process.pid} closed server`);
      process.exit(0);
    });
  });
}

// ============================================
// CUSTOM LOAD BALANCING
// ============================================

const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  const workers = [];
  
  // Create workers
  for (let i = 0; i < numCPUs; i++) {
    const worker = cluster.fork();
    workers.push({
      worker: worker,
      load: 0
    });
  }
  
  // Custom load balancing
  let currentWorker = 0;
  
  http.createServer((req, res) => {
    // Round-robin with load tracking
    const selected = workers[currentWorker];
    selected.load++;
    currentWorker = (currentWorker + 1) % workers.length;
    
    // Send request to selected worker
    selected.worker.send({ type: 'request', req: req.url });
    
    // In real implementation, you'd proxy the request
    res.end(`Handled by worker ${selected.worker.process.pid}`);
  }).listen(3000);
  
} else {
  // Worker handles requests
  process.on('message', (msg) => {
    if (msg.type === 'request') {
      // Handle request
      console.log(`Worker ${process.pid} handling: ${msg.req}`);
    }
  });
}

// ============================================
// WORKER HEALTH MONITORING
// ============================================

const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  
  for (let i = 0; i < numCPUs; i++) {
    const worker = cluster.fork();
    
    // Monitor worker health
    let lastHeartbeat = Date.now();
    
    // Heartbeat from worker
    worker.on('message', (msg) => {
      if (msg.type === 'heartbeat') {
        lastHeartbeat = Date.now();
      }
    });
    
    // Check health periodically
    setInterval(() => {
      const timeSinceHeartbeat = Date.now() - lastHeartbeat;
      if (timeSinceHeartbeat > 10000) {
        console.log(`Worker ${worker.process.pid} appears dead, restarting`);
        worker.kill();
        cluster.fork();
      }
    }, 5000);
  }
  
  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  // Worker sends heartbeat
  setInterval(() => {
    process.send({ type: 'heartbeat', pid: process.pid });
  }, 3000);
  
  http.createServer((req, res) => {
    res.end(`Worker ${process.pid}`);
  }).listen(3000);
}

// ============================================
// CLUSTER WITH STATEFUL SESSIONS
// ============================================

const cluster = require('cluster');
const express = require('express');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  
  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  const app = express();
  
  // Use external session store (Redis) for shared sessions
  app.use(session({
    store: new RedisStore({
      host: 'localhost',
      port: 6379
    }),
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
  }));
  
  app.get('/', (req, res) => {
    req.session.views = (req.session.views || 0) + 1;
    res.json({
      worker: process.pid,
      views: req.session.views
    });
  });
  
  app.listen(3000, () => {
    console.log(`Worker ${process.pid} listening`);
  });
}

// ============================================
// PERFORMANCE COMPARISON
// ============================================

const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  console.log(`Starting ${numCPUs} workers`);
  
  const startTime = Date.now();
  
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  
  // Track requests
  let totalRequests = 0;
  
  cluster.on('message', (worker, msg) => {
    if (msg.type === 'request') {
      totalRequests++;
    }
  });
  
  // Report after 10 seconds
  setTimeout(() => {
    const elapsed = (Date.now() - startTime) / 1000;
    console.log(`Total requests: ${totalRequests}`);
    console.log(`Requests per second: ${(totalRequests / elapsed).toFixed(2)}`);
    process.exit(0);
  }, 10000);
  
} else {
  http.createServer((req, res) => {
    // Simulate work
    process.send({ type: 'request' });
    res.end(`Worker ${process.pid}`);
  }).listen(3000);
}
```

---

## E) Internal Working

### Step-by-Step Internal Flow

**1. Master Process Starts**
```
Master process starts
    ↓
Detects CPU cores
    ↓
Creates worker processes (fork)
    ↓
Each worker is independent process
    ↓
Workers share server port
```

**2. Worker Process Creation**
```
cluster.fork() called
    ↓
Child process spawned
    ↓
Worker process starts
    ↓
Worker runs application code
    ↓
Worker listens on shared port
```

**3. Request Handling**
```
Incoming connection arrives
    ↓
OS distributes to worker (round-robin)
    ↓
Worker handles request
    ↓
Response sent
    ↓
Worker ready for next request
```

**4. Process Communication**
```
Master sends message to worker
    ↓
IPC channel used
    ↓
Worker receives message
    ↓
Worker can respond
    ↓
Bidirectional communication
```

### Cluster Architecture

```
Master Process (PID: 1000)
├── Worker 1 (PID: 1001) → CPU Core 1
├── Worker 2 (PID: 1002) → CPU Core 2
├── Worker 3 (PID: 1003) → CPU Core 3
└── Worker 4 (PID: 1004) → CPU Core 4

All workers listen on port 3000
OS distributes connections round-robin
```

### Load Balancing Mechanism

**Round-Robin:**
- Connection 1 → Worker 1
- Connection 2 → Worker 2
- Connection 3 → Worker 3
- Connection 4 → Worker 4
- Connection 5 → Worker 1 (cycle repeats)

---

## F) Interview Questions & Answers

### Q1: What is the Cluster module in Node.js?

**Answer:**
Cluster module enables Node.js to create multiple worker processes that share server ports. It allows a single Node.js application to utilize multiple CPU cores by running multiple instances. The master process creates and manages workers, and incoming connections are distributed across workers using round-robin by default.

### Q2: How does Cluster module improve performance?

**Answer:**
Cluster module improves performance by utilizing multiple CPU cores. Instead of a single process using one core, you have multiple worker processes, each potentially using a different core. This increases throughput and allows the application to handle more concurrent requests. Each worker has its own event loop and memory space.

### Q3: What is the difference between master and worker processes?

**Answer:**
Master process is the main process that creates and manages worker processes. It doesn't handle requests directly but coordinates workers. Worker processes are child processes created by the master that actually handle incoming requests. They share the server port and run the application code independently.

### Q4: How does load balancing work in Cluster module?

**Answer:**
By default, Cluster module uses round-robin load balancing. The operating system distributes incoming connections sequentially across workers. Connection 1 goes to Worker 1, Connection 2 to Worker 2, and so on, cycling back to Worker 1. You can implement custom load balancing algorithms if needed.

### Q5: How do master and worker processes communicate?

**Answer:**
Master and workers communicate via IPC (Inter-Process Communication). You can send messages using `worker.send()` from master to worker, and `process.send()` from worker to master. Workers can listen with `process.on('message')` and master with `worker.on('message')`. This enables coordination and data sharing.

### Q6: What happens when a worker process crashes?

**Answer:**
When a worker crashes, the master process receives an 'exit' event. You can handle this event to restart the worker automatically using `cluster.fork()`. This provides fault tolerance - if one worker fails, others continue operating, and the failed worker can be restarted without affecting the entire application.

### Q7: When should you use Cluster module vs Worker Threads?

**Answer:**
Use Cluster module for scaling across CPU cores with separate processes, better isolation, and when you need to share server ports. Use Worker Threads for CPU-intensive tasks within a single process, when you need shared memory, or for tasks that don't need separate processes. Cluster is better for I/O-bound applications, Worker Threads for CPU-bound tasks.

---

## G) Common Mistakes

### Mistake 1: Creating Too Many Workers

```javascript
// ❌ WRONG - More workers than CPU cores
const numWorkers = 100;
for (let i = 0; i < numWorkers; i++) {
  cluster.fork();
}

// ✅ CORRECT - One per CPU core (or slightly more)
const numCPUs = require('os').cpus().length;
for (let i = 0; i < numCPUs; i++) {
  cluster.fork();
}
```

**Why it breaks:** More workers than cores cause context switching overhead and don't improve performance.

### Mistake 2: Not Handling Worker Crashes

```javascript
// ❌ WRONG - No crash handling
if (cluster.isMaster) {
  cluster.fork();
  // Worker dies, no restart
}

// ✅ CORRECT - Restart workers
cluster.on('exit', (worker) => {
  console.log(`Worker ${worker.process.pid} died`);
  cluster.fork(); // Restart
});
```

**Why it breaks:** Dead workers aren't replaced, reducing capacity.

### Mistake 3: Sharing State Between Workers

```javascript
// ❌ WRONG - State not shared between workers
let requestCount = 0;

if (cluster.isWorker) {
  app.get('/', (req, res) => {
    requestCount++; // Each worker has its own count
    res.json({ count: requestCount });
  });
}

// ✅ CORRECT - Use external store (Redis, database)
// Or aggregate from master via IPC
```

**Why it breaks:** Each worker has separate memory, state isn't shared.

### Mistake 4: Not Implementing Graceful Shutdown

```javascript
// ❌ WRONG - Abrupt shutdown
process.on('SIGTERM', () => {
  process.exit(); // Kills immediately
});

// ✅ CORRECT - Graceful shutdown
process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
```

**Why it breaks:** Abrupt shutdown can lose in-flight requests.

### Mistake 5: Using Cluster in Development

```javascript
// ❌ WRONG - Unnecessary in dev
if (cluster.isMaster && process.env.NODE_ENV !== 'production') {
  cluster.fork();
}

// ✅ CORRECT - Only in production
if (cluster.isMaster && process.env.NODE_ENV === 'production') {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
}
```

**Why it breaks:** Adds complexity without benefit in development.

---

## H) When to Use & When NOT to Use

### When Cluster Module is Essential

**1. Production Servers**
- High-traffic applications
- Multi-core servers
- Performance optimization
- Scalability requirements

**2. I/O-Intensive Applications**
- Web servers
- API servers
- Real-time applications
- High concurrency needs

**3. Resource Utilization**
- Multi-core systems
- Maximize CPU usage
- Better throughput
- Load distribution

### When NOT to Use

**1. Development Environment**
- Unnecessary complexity
- Debugging difficulties
- Single core sufficient
- Development tools

**2. CPU-Intensive Tasks**
- Use Worker Threads instead
- Cluster adds process overhead
- Worker Threads more efficient
- Shared memory benefits

**3. Single-Core Systems**
- No benefit
- Overhead without gain
- Unnecessary complexity
- Use single process

### Backend Perspective

**Node.js Servers:**
- Express applications
- API servers
- WebSocket servers
- High-traffic services

**When it matters:**
- Production deployment
- Multi-core servers
- High concurrency
- Performance optimization

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain Cluster module in Node.js."

**You:**
"Cluster module enables Node.js to create multiple worker processes that share server ports, allowing a single application to utilize multiple CPU cores. The master process creates worker processes, typically one per CPU core.

When a connection arrives, the operating system distributes it to a worker using round-robin by default. Each worker handles requests independently with its own event loop and memory space. This improves performance and allows the application to handle more concurrent requests.

Workers can communicate with the master via IPC. If a worker crashes, the master can restart it automatically, providing fault tolerance. However, each worker has separate memory, so state isn't shared - you need external stores like Redis for shared state.

Cluster is ideal for I/O-intensive applications in production. For CPU-intensive tasks, Worker Threads are more efficient. You typically create one worker per CPU core for optimal performance."

---

## J) Mini Practice Task

### Task: Build Production-Ready Cluster Setup

Create a complete cluster setup with all production features:

**Requirements:**
1. Create cluster setup with:
   - Automatic worker creation (one per CPU core)
   - Worker crash recovery
   - Graceful shutdown
   - Health monitoring
   - Load balancing

2. Features:
   - Worker heartbeat
   - Request tracking
   - Performance metrics
   - Logging per worker

3. Test scenarios:
   - Worker crash recovery
   - Graceful shutdown
   - Load distribution
   - Performance under load

**Expected Output:**
```
Master started with 4 workers
Worker 1001 started
Worker 1002 started
Worker 1003 started
Worker 1004 started
All workers healthy
Graceful shutdown initiated
```

**Solution Template:**
```javascript
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  // Master setup
  // Worker management
  // Health monitoring
} else {
  // Worker setup
  // Application code
}
```

---

**END OF TOPIC: CLUSTER MODULE**

