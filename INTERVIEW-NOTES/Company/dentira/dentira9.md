# DENTIRA INTERVIEW PREPARATION - PART 9
## Troubleshooting & Debugging Skills

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Troubleshooting kya hai?**
- Problems identify karna
- Root cause find karna
- Solutions implement karna
- System restore karna
- Prevention strategies

**Troubleshooting Process:**
1. **Identify Problem:** Symptoms samajhna
2. **Gather Information:** Logs, metrics, errors
3. **Hypothesize:** Possible causes
4. **Test Hypothesis:** Experiments
5. **Implement Fix:** Solution apply
6. **Verify:** Problem solved?
7. **Document:** Learnings record

**Key Skills:**
- **Analytical Thinking:** Problem breakdown
- **System Knowledge:** Architecture understanding
- **Tool Proficiency:** Debugging tools
- **Communication:** Clear explanation
- **Patience:** Systematic approach

---

## B) Common Backend Issues

### 1. Performance Issues

**Symptoms:**
- Slow API responses
- High CPU usage
- Memory leaks
- Database slow queries

**Debugging Steps:**
```typescript
// 1. Add timing logs
console.time('database-query');
const users = await User.find();
console.timeEnd('database-query');

// 2. Check database queries
// Enable query logging
mongoose.set('debug', true);

// 3. Profile code
const profiler = require('v8-profiler');
profiler.startProfiling();
// ... code ...
const profile = profiler.stopProfiling();
```

**Tools:**
- **Node.js:** `node --inspect` (Chrome DevTools)
- **APM:** New Relic, Datadog
- **Profiling:** clinic.js, 0x
- **Database:** EXPLAIN queries

### 2. Memory Leaks

**Symptoms:**
- Memory usage continuously increases
- Application crashes
- Slow performance

**Common Causes:**
```typescript
// 1. Event listeners not removed
const emitter = new EventEmitter();
emitter.on('event', handler); // Never removed

// 2. Closures capturing large objects
function createHandler() {
  const largeData = new Array(1000000).fill(0);
  return () => {
    // Closure captures largeData
    console.log('Handler');
  };
}

// 3. Timers not cleared
const interval = setInterval(() => {}, 1000);
// Never cleared

// 4. Global variables
global.cache = {}; // Grows indefinitely
```

**Solutions:**
```typescript
// 1. Remove event listeners
emitter.removeListener('event', handler);

// 2. Avoid closures with large data
function createHandler(data) {
  return () => {
    // Use data reference, not closure
  };
}

// 3. Clear timers
clearInterval(interval);

// 4. Limit cache size
class LRUCache {
  private cache: Map<string, any> = new Map();
  private maxSize: number = 100;

  set(key: string, value: any): void {
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }
}
```

**Debugging:**
```bash
# Check memory usage
node --expose-gc --max-old-space-size=512 app.js

# Heap snapshot
node --inspect app.js
# Open chrome://inspect
# Take heap snapshot
```

### 3. Database Connection Issues

**Symptoms:**
- Connection timeouts
- Too many connections
- Connection pool exhausted

**Debugging:**
```typescript
// 1. Monitor connections
mongoose.connection.on('connected', () => {
  console.log('Connected:', mongoose.connection.readyState);
});

mongoose.connection.on('error', (err) => {
  console.error('Connection error:', err);
});

// 2. Check connection pool
console.log('Active connections:', mongoose.connection.readyState);

// 3. Connection options
mongoose.connect(uri, {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000
});
```

**Solutions:**
- Increase connection pool size
- Implement connection retry logic
- Use connection pooling properly
- Close unused connections

### 4. API Errors

**Symptoms:**
- 500 errors
- Timeouts
- Invalid responses

**Debugging:**
```typescript
// 1. Error logging
app.use((err, req, res, next) => {
  console.error('Error:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    body: req.body
  });
  res.status(500).json({ error: 'Internal server error' });
});

// 2. Request/Response logging
app.use((req, res, next) => {
  console.log('Request:', {
    method: req.method,
    url: req.url,
    headers: req.headers,
    body: req.body
  });
  
  const originalSend = res.send;
  res.send = function(data) {
    console.log('Response:', {
      status: res.statusCode,
      body: data
    });
    originalSend.call(this, data);
  };
  next();
});

// 3. Try-catch in async handlers
app.get('/api/users', async (req, res, next) => {
  try {
    const users = await userService.findAll();
    res.json({ users });
  } catch (error) {
    next(error); // Pass to error handler
  }
});
```

---

## C) Debugging Tools & Techniques

### 1. Logging

**Structured Logging:**
```typescript
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// Usage
logger.info('User created', { userId: '123', email: 'john@example.com' });
logger.error('Database error', { error: err.message, stack: err.stack });
```

**Log Levels:**
- **error:** Errors that need attention
- **warn:** Warnings
- **info:** Informational messages
- **debug:** Debug information
- **verbose:** Very detailed logs

### 2. Monitoring

**Application Metrics:**
```typescript
import prometheus from 'prom-client';

// Counter
const httpRequestsTotal = new prometheus.Counter({
  name: 'http_requests_total',
  help: 'Total HTTP requests',
  labelNames: ['method', 'route', 'status']
});

// Histogram
const httpRequestDuration = new prometheus.Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request duration',
  labelNames: ['method', 'route']
});

// Usage
app.use((req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    httpRequestsTotal.inc({ method: req.method, route: req.route.path, status: res.statusCode });
    httpRequestDuration.observe({ method: req.method, route: req.route.path }, duration);
  });
  
  next();
});
```

### 3. Debugging in Production

**Remote Debugging:**
```bash
# Start with inspector
node --inspect=0.0.0.0:9229 app.js

# Connect from local machine
# chrome://inspect
# Configure: localhost:9229
```

**Error Tracking:**
```typescript
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV
});

// Capture errors
try {
  await riskyOperation();
} catch (error) {
  Sentry.captureException(error);
  throw error;
}
```

---

## D) Systematic Troubleshooting Approach

### 1. Problem Identification

**Questions to Ask:**
- What is the exact error?
- When did it start?
- What changed recently?
- Who is affected?
- What's the impact?

**Information Gathering:**
- Error logs
- Application logs
- System metrics
- User reports
- Recent deployments

### 2. Hypothesis Formation

**Common Patterns:**
- Recent code changes
- Increased load
- Resource exhaustion
- External service issues
- Configuration changes

**Prioritize:**
- High impact issues first
- Quick wins
- Most likely causes

### 3. Testing & Validation

**Reproduce:**
- Local environment
- Staging environment
- Isolated test cases

**Monitor:**
- Before fix metrics
- After fix metrics
- Compare results

### 4. Solution Implementation

**Fix Types:**
- **Quick Fix:** Temporary solution
- **Proper Fix:** Long-term solution
- **Prevention:** Avoid recurrence

**Documentation:**
- What was the problem?
- What was the cause?
- What was the solution?
- How to prevent?

---

## E) Interview Questions - Part 9

**Q1: "How do you debug a production issue?"**

✅ **Answer:**
"I follow a systematic approach:

**1. Gather Information:**
- Check error logs and application logs
- Review recent deployments
- Check system metrics (CPU, memory, disk)
- Identify affected users/features

**2. Reproduce:**
- Try to reproduce in staging
- Check if it's environment-specific
- Identify patterns (specific users, times, etc.)

**3. Isolate:**
- Check if it's code issue or infrastructure
- Verify external dependencies
- Check database queries
- Review recent changes

**4. Fix:**
- Implement fix (quick fix if urgent)
- Test thoroughly
- Deploy to staging first
- Monitor after deployment

**5. Document:**
- Root cause analysis
- Solution implemented
- Prevention measures
- Learnings

**Tools I use:**
- Logging (Winston, Pino)
- APM tools (New Relic, Datadog)
- Error tracking (Sentry)
- Database query analysis"

**Q2: "How do you handle memory leaks?"**

✅ **Answer:**
"Memory leaks are critical issues. My approach:

**1. Identify:**
- Monitor memory usage over time
- Use heap snapshots
- Check for continuous growth

**2. Common Causes:**
- Event listeners not removed
- Closures capturing large objects
- Timers not cleared
- Global variables growing
- Database connections not closed

**3. Debugging:**
```bash
# Use Node.js inspector
node --inspect app.js
# Take heap snapshots before/after operations
# Compare to find leaks
```

**4. Solutions:**
- Remove event listeners
- Clear timers
- Limit cache sizes (LRU cache)
- Close database connections
- Avoid global variables

**5. Prevention:**
- Code reviews
- Automated memory tests
- Regular monitoring
- Memory limits in production"

**Q3: "How do you troubleshoot slow API responses?"**

✅ **Answer:**
"Systematic approach:

**1. Measure:**
- Add timing logs
- Use APM tools
- Check response times per endpoint

**2. Identify Bottleneck:**
- Database queries (most common)
- External API calls
- Heavy computations
- Network latency

**3. Database Optimization:**
- Use EXPLAIN on slow queries
- Add missing indexes
- Optimize queries
- Use connection pooling

**4. Code Optimization:**
- Avoid N+1 queries
- Use pagination
- Implement caching
- Parallelize operations

**5. Monitoring:**
- Set up alerts for slow endpoints
- Track p95, p99 response times
- Monitor database query times

**Example:**
```typescript
// Before (slow)
const users = await User.find();
for (const user of users) {
  user.orders = await Order.find({ userId: user.id }); // N+1 query
}

// After (fast)
const users = await User.find();
const userIds = users.map(u => u.id);
const orders = await Order.find({ userId: { $in: userIds } });
// Map orders to users
```
"

---

## F) Key Takeaways

### Must Know:
1. ✅ Systematic troubleshooting approach
2. ✅ Common backend issues and solutions
3. ✅ Debugging tools and techniques
4. ✅ Logging and monitoring
5. ✅ Memory leak detection
6. ✅ Performance optimization

### Next Steps:
- Read dentira10.md for Data Structures & Algorithms
- Practice debugging scenarios
- Understand monitoring tools

---

**End of Part 9 - Continue to dentira10.md**

