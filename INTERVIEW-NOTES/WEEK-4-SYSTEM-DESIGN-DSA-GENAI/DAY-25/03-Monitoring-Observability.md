# MONITORING & OBSERVABILITY

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Monitoring & Observability kya hai?**
- Monitoring system health track karta hai
- Observability system behavior understand karta hai
- Metrics, logs, traces collect karte hain
- Issues detect aur debug karte hain
- Production systems ke liye essential

**Real-life Analogy:**
- Monitoring = Health checkup (vital signs)
- Observability = Full medical history (complete picture)
- Metrics = Blood pressure, heart rate
- Logs = Medical records
- Traces = Treatment timeline

**Three Pillars of Observability:**

**1. Metrics:**
- Quantitative measurements
- Performance indicators
- Aggregated data

**2. Logs:**
- Event records
- Text-based
- Detailed information

**3. Traces:**
- Request flow
- Distributed tracing
- End-to-end visibility

---

## B) Easy English Theory

### What is Monitoring & Observability?

Monitoring tracks system health (metrics, alerts). Observability understands system behavior (metrics, logs, traces). Three pillars: Metrics (quantitative measurements), Logs (event records), Traces (request flow across services). Use for: Performance monitoring, error detection, debugging, capacity planning. Essential for production systems.

---

## C) Why This Concept Exists

### The Problem

**Without Monitoring:**
- Issues go undetected
- Difficult debugging
- Poor performance
- No visibility

### The Solution

**Monitoring & Observability Provide:**
1. **Visibility:** System health awareness
2. **Debugging:** Easier problem solving
3. **Performance:** Optimize based on data
4. **Reliability:** Proactive issue detection

---

## D) Practical Example (Code)

```javascript
// ============================================
// METRICS COLLECTION
// ============================================

class MetricsCollector {
  constructor() {
    this.metrics = {
      requests: 0,
      errors: 0,
      latency: [],
      activeConnections: 0
    };
  }
  
  // Increment counter
  incrementCounter(name, value = 1) {
    if (!this.metrics[name]) {
      this.metrics[name] = 0;
    }
    this.metrics[name] += value;
  }
  
  // Record latency
  recordLatency(operation, duration) {
    if (!this.metrics[`${operation}_latency`]) {
      this.metrics[`${operation}_latency`] = [];
    }
    this.metrics[`${operation}_latency`].push(duration);
    
    // Keep only last 1000
    if (this.metrics[`${operation}_latency`].length > 1000) {
      this.metrics[`${operation}_latency`].shift();
    }
  }
  
  // Get metrics
  getMetrics() {
    return {
      requests: this.metrics.requests,
      errors: this.metrics.errors,
      errorRate: this.metrics.requests > 0 
        ? (this.metrics.errors / this.metrics.requests) * 100 
        : 0,
      avgLatency: this.calculateAvgLatency(),
      p95Latency: this.calculatePercentile(95),
      p99Latency: this.calculatePercentile(99)
    };
  }
  
  calculateAvgLatency() {
    const latencies = this.metrics.latency;
    if (latencies.length === 0) return 0;
    const sum = latencies.reduce((a, b) => a + b, 0);
    return sum / latencies.length;
  }
  
  calculatePercentile(percentile) {
    const latencies = [...this.metrics.latency].sort((a, b) => a - b);
    const index = Math.ceil((percentile / 100) * latencies.length) - 1;
    return latencies[index] || 0;
  }
}

// ============================================
// LOGGING
// ============================================

class Logger {
  constructor() {
    this.levels = {
      DEBUG: 0,
      INFO: 1,
      WARN: 2,
      ERROR: 3
    };
    this.currentLevel = this.levels.INFO;
  }
  
  log(level, message, metadata = {}) {
    if (this.levels[level] >= this.currentLevel) {
      const logEntry = {
        timestamp: new Date().toISOString(),
        level,
        message,
        ...metadata
      };
      
      console.log(JSON.stringify(logEntry));
      
      // Send to log aggregation service
      this.sendToLogService(logEntry);
    }
  }
  
  debug(message, metadata) {
    this.log('DEBUG', message, metadata);
  }
  
  info(message, metadata) {
    this.log('INFO', message, metadata);
  }
  
  warn(message, metadata) {
    this.log('WARN', message, metadata);
  }
  
  error(message, error, metadata) {
    this.log('ERROR', message, {
      ...metadata,
      error: {
        message: error.message,
        stack: error.stack
      }
    });
  }
  
  async sendToLogService(logEntry) {
    // Send to ELK, Splunk, CloudWatch, etc.
    try {
      await fetch('http://log-service:3000/logs', {
        method: 'POST',
        body: JSON.stringify(logEntry)
      });
    } catch (error) {
      // Fallback: write to file
      console.error('Failed to send log:', error);
    }
  }
}

// ============================================
// DISTRIBUTED TRACING
// ============================================

class Tracer {
  constructor() {
    this.traces = new Map();
  }
  
  startTrace(traceId, operation, metadata = {}) {
    const span = {
      traceId,
      spanId: this.generateSpanId(),
      operation,
      startTime: Date.now(),
      metadata
    };
    
    this.traces.set(traceId, span);
    return span;
  }
  
  addSpan(traceId, parentSpanId, operation, metadata = {}) {
    const span = {
      traceId,
      spanId: this.generateSpanId(),
      parentSpanId,
      operation,
      startTime: Date.now(),
      metadata
    };
    
    const trace = this.traces.get(traceId);
    if (trace) {
      trace.children = trace.children || [];
      trace.children.push(span);
    }
    
    return span;
  }
  
  finishSpan(spanId, metadata = {}) {
    for (const [traceId, span] of this.traces) {
      if (span.spanId === spanId) {
        span.endTime = Date.now();
        span.duration = span.endTime - span.startTime;
        span.metadata = { ...span.metadata, ...metadata };
        return span;
      }
      
      // Check children
      if (span.children) {
        const childSpan = span.children.find(s => s.spanId === spanId);
        if (childSpan) {
          childSpan.endTime = Date.now();
          childSpan.duration = childSpan.endTime - childSpan.startTime;
          childSpan.metadata = { ...childSpan.metadata, ...metadata };
          return childSpan;
        }
      }
    }
  }
  
  generateSpanId() {
    return `span-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
  
  getTrace(traceId) {
    return this.traces.get(traceId);
  }
}

// ============================================
// REQUEST MIDDLEWARE (METRICS + LOGS + TRACES)
// ============================================

const metricsCollector = new MetricsCollector();
const logger = new Logger();
const tracer = new Tracer();

app.use((req, res, next) => {
  const traceId = req.headers['x-trace-id'] || tracer.generateSpanId();
  const span = tracer.startTrace(traceId, `${req.method} ${req.path}`, {
    method: req.method,
    path: req.path,
    ip: req.ip
  });
  
  req.traceId = traceId;
  req.spanId = span.spanId;
  
  const startTime = Date.now();
  
  // Increment request counter
  metricsCollector.incrementCounter('requests');
  
  // Log request
  logger.info('Request started', {
    traceId,
    method: req.method,
    path: req.path
  });
  
  // Override res.end to capture response
  const originalEnd = res.end;
  res.end = function(...args) {
    const duration = Date.now() - startTime;
    
    // Record latency
    metricsCollector.recordLatency('request', duration);
    
    // Finish span
    tracer.finishSpan(req.spanId, {
      statusCode: res.statusCode,
      duration
    });
    
    // Log response
    if (res.statusCode >= 400) {
      metricsCollector.incrementCounter('errors');
      logger.error('Request failed', null, {
        traceId,
        statusCode: res.statusCode,
        duration
      });
    } else {
      logger.info('Request completed', {
        traceId,
        statusCode: res.statusCode,
        duration
      });
    }
    
    originalEnd.apply(this, args);
  };
  
  next();
});

// ============================================
// HEALTH CHECK ENDPOINT
// ============================================

app.get('/health', (req, res) => {
  const metrics = metricsCollector.getMetrics();
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    metrics: {
      requests: metrics.requests,
      errorRate: metrics.errorRate,
      avgLatency: metrics.avgLatency
    },
    checks: {
      database: checkDatabase(),
      cache: checkCache(),
      externalAPI: checkExternalAPI()
    }
  };
  
  // Determine overall health
  const isHealthy = 
    health.checks.database === 'ok' &&
    health.checks.cache === 'ok' &&
    metrics.errorRate < 5; // Less than 5% error rate
  
  health.status = isHealthy ? 'healthy' : 'unhealthy';
  res.status(isHealthy ? 200 : 503).json(health);
});

// ============================================
// ALERTING
// ============================================

class AlertManager {
  constructor() {
    this.alerts = [];
    this.thresholds = {
      errorRate: 5, // 5%
      latency: 1000, // 1 second
      cpuUsage: 80, // 80%
      memoryUsage: 90 // 90%
    };
  }
  
  checkMetrics(metrics) {
    if (metrics.errorRate > this.thresholds.errorRate) {
      this.triggerAlert('HIGH_ERROR_RATE', {
        errorRate: metrics.errorRate,
        threshold: this.thresholds.errorRate
      });
    }
    
    if (metrics.avgLatency > this.thresholds.latency) {
      this.triggerAlert('HIGH_LATENCY', {
        latency: metrics.avgLatency,
        threshold: this.thresholds.latency
      });
    }
  }
  
  triggerAlert(type, data) {
    const alert = {
      type,
      data,
      timestamp: Date.now(),
      severity: this.getSeverity(type)
    };
    
    this.alerts.push(alert);
    
    // Send notification
    this.sendNotification(alert);
  }
  
  getSeverity(type) {
    if (type.includes('ERROR') || type.includes('DOWN')) {
      return 'CRITICAL';
    }
    return 'WARNING';
  }
  
  async sendNotification(alert) {
    // Send to PagerDuty, Slack, email, etc.
    console.log('ALERT:', alert);
  }
}
```

---

## E) Internal Working

**Monitoring Flow:**
1. Collect metrics (requests, latency, errors)
2. Aggregate data
3. Store metrics
4. Analyze patterns
5. Trigger alerts

**Observability:**
- Metrics: Quantitative data
- Logs: Event records
- Traces: Request flow

---

## F) Interview Questions & Answers

### Q1: What is the difference between monitoring and observability?

**Answer:**
Monitoring tracks known metrics (CPU, memory, request rate) - reactive, predefined metrics. Observability understands system behavior through metrics, logs, traces - proactive, can answer unknown questions. Three pillars: Metrics (quantitative measurements), Logs (event records), Traces (request flow). Observability = Metrics + Logs + Traces for complete visibility.

### Q2: What metrics should you monitor?

**Answer:**
Key metrics: Request rate (QPS), Error rate (percentage of failed requests), Latency (response time - p50, p95, p99), Throughput (requests per second), Resource usage (CPU, memory, disk), Business metrics (conversions, revenue). Use SLIs (Service Level Indicators) and SLOs (Service Level Objectives) to define targets. Monitor what matters for your service.

### Q3: How does distributed tracing work?

**Answer:**
Distributed tracing tracks request flow across services. Each request gets trace ID, each service operation creates span, spans linked by parent-child relationships, spans include timing and metadata. Benefits: End-to-end visibility, identify bottlenecks, debug distributed issues, understand service dependencies. Tools: Jaeger, Zipkin, AWS X-Ray.

---

## G) Common Mistakes

### Mistake 1: Too Many Metrics

```javascript
// ❌ WRONG - Monitor everything
collectMetric('cpu');
collectMetric('memory');
collectMetric('disk');
collectMetric('network');
collectMetric('every-single-thing');
// Noise, hard to find issues

// ✅ CORRECT - Monitor what matters
collectMetric('errorRate');
collectMetric('latency');
collectMetric('throughput');
// Focus on important metrics
```

**Why it breaks:** Too many metrics create noise, hard to identify issues.

---

## H) When to Use & When NOT to Use

Always use monitoring in production. Use observability for complex distributed systems. Don't over-monitor - focus on what matters.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain Monitoring & Observability."

**You:**
"Monitoring tracks system health through metrics (CPU, memory, request rate). Observability understands system behavior through three pillars: Metrics (quantitative measurements), Logs (event records), Traces (request flow across services).

Key metrics: Request rate, error rate, latency (p50, p95, p99), throughput. Distributed tracing tracks requests with trace ID, spans for each operation, linked by parent-child. Use for performance monitoring, error detection, debugging. Essential for production systems."

---

## J) Mini Practice Task

Implement monitoring: Collect metrics (requests, errors, latency), logging, distributed tracing, health checks, alerting.

---

**END OF TOPIC: MONITORING & OBSERVABILITY**

