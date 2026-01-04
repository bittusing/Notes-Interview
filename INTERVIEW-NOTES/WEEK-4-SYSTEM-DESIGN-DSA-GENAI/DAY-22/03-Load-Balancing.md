# LOAD BALANCING

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Load Balancing kya hai?**
- Load Balancing traffic ko multiple servers mein distribute karta hai
- Single server par load kam karta hai
- High availability provide karta hai
- Performance improve karta hai
- Failover handle karta hai

**Real-life Analogy:**
- Load Balancer = Traffic police (traffic distribute karta hai)
- Servers = Different roads
- Requests = Vehicles
- Distribution = Even traffic flow

**Load Balancing Types:**

**1. Layer 4 (Transport Layer):**
- IP aur port based
- Fast, simple
- TCP/UDP level

**2. Layer 7 (Application Layer):**
- HTTP/HTTPS level
- Content-based routing
- More intelligent

**Load Balancing Algorithms:**

**1. Round Robin:**
- Sequential distribution
- Equal distribution
- Simple

**2. Least Connections:**
- Server with least connections
- Better for long connections
- Load-aware

**3. IP Hash:**
- Client IP based
- Same client → same server
- Session affinity

---

## B) Easy English Theory

### What is Load Balancing?

Load Balancing distributes incoming traffic across multiple servers. Types: Layer 4 (IP/port based, fast), Layer 7 (HTTP level, content-based). Algorithms: Round Robin (sequential), Least Connections (least loaded), IP Hash (session affinity). Benefits: High availability, performance, scalability, failover.

---

## C) Why This Concept Exists

### The Problem

**Without Load Balancing:**
- Single server overload
- Single point of failure
- Poor performance
- No failover

### The Solution

**Load Balancing Provides:**
1. **Distribution:** Even load across servers
2. **Availability:** Failover to healthy servers
3. **Performance:** Better response times
4. **Scalability:** Add/remove servers easily

---

## D) Practical Example (Code)

```javascript
// ============================================
// BASIC LOAD BALANCER
// ============================================

class LoadBalancer {
  constructor(servers) {
    this.servers = servers;
    this.currentIndex = 0;
    this.healthChecks = new Map();
  }
  
  // Round Robin
  getNextServer() {
    const healthyServers = this.getHealthyServers();
    if (healthyServers.length === 0) {
      throw new Error('No healthy servers available');
    }
    
    const server = healthyServers[this.currentIndex];
    this.currentIndex = (this.currentIndex + 1) % healthyServers.length;
    return server;
  }
  
  // Least Connections
  getLeastLoadedServer() {
    const healthyServers = this.getHealthyServers();
    return healthyServers.reduce((min, server) => {
      return server.connections < min.connections ? server : min;
    });
  }
  
  // IP Hash (Session Affinity)
  getServerByIP(clientIP) {
    const hash = this.hashIP(clientIP);
    const healthyServers = this.getHealthyServers();
    return healthyServers[hash % healthyServers.length];
  }
  
  // Health check
  async checkHealth(server) {
    try {
      const response = await fetch(`http://${server.host}:${server.port}/health`);
      return response.ok;
    } catch (error) {
      return false;
    }
  }
  
  getHealthyServers() {
    return this.servers.filter(server => {
      const health = this.healthChecks.get(server.id);
      return health && health.isHealthy;
    });
  }
  
  hashIP(ip) {
    // Simple hash function
    let hash = 0;
    for (let i = 0; i < ip.length; i++) {
      hash = ((hash << 5) - hash) + ip.charCodeAt(i);
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }
  
  // Route request
  async routeRequest(request) {
    const server = this.getNextServer();
    return await this.forwardRequest(server, request);
  }
  
  async forwardRequest(server, request) {
    try {
      const response = await fetch(`http://${server.host}:${server.port}${request.path}`, {
        method: request.method,
        headers: request.headers,
        body: request.body
      });
      return response;
    } catch (error) {
      // Mark server as unhealthy
      this.markUnhealthy(server);
      // Retry with another server
      return this.routeRequest(request);
    }
  }
  
  markUnhealthy(server) {
    const health = this.healthChecks.get(server.id);
    if (health) {
      health.isHealthy = false;
    }
  }
}

// ============================================
// EXPRESS LOAD BALANCER MIDDLEWARE
// ============================================

const express = require('express');
const app = express();
const loadBalancer = new LoadBalancer([
  { id: 1, host: 'server1', port: 3001, connections: 0 },
  { id: 2, host: 'server2', port: 3002, connections: 0 },
  { id: 3, host: 'server3', port: 3003, connections: 0 }
]);

app.use(async (req, res, next) => {
  try {
    const server = loadBalancer.getNextServer();
    server.connections++;
    
    // Forward request
    const response = await loadBalancer.forwardRequest(server, {
      method: req.method,
      path: req.path,
      headers: req.headers,
      body: req.body
    });
    
    server.connections--;
    
    // Forward response
    res.status(response.status).json(await response.json());
  } catch (error) {
    res.status(500).json({ error: 'Service unavailable' });
  }
});

// ============================================
// HEALTH CHECKING
// ============================================

class HealthChecker {
  constructor(loadBalancer) {
    this.loadBalancer = loadBalancer;
    this.interval = 5000; // 5 seconds
  }
  
  start() {
    setInterval(async () => {
      for (const server of this.loadBalancer.servers) {
        const isHealthy = await this.loadBalancer.checkHealth(server);
        this.loadBalancer.healthChecks.set(server.id, {
          isHealthy,
          lastChecked: Date.now()
        });
      }
    }, this.interval);
  }
}

// ============================================
// STICKY SESSIONS (SESSION AFFINITY)
// ============================================

class StickyLoadBalancer extends LoadBalancer {
  constructor(servers) {
    super(servers);
    this.sessionMap = new Map(); // sessionId -> serverId
  }
  
  getServerForSession(sessionId) {
    // Check if session already assigned
    const serverId = this.sessionMap.get(sessionId);
    if (serverId) {
      const server = this.servers.find(s => s.id === serverId);
      if (server && this.isHealthy(server)) {
        return server;
      }
    }
    
    // Assign new server
    const server = this.getNextServer();
    this.sessionMap.set(sessionId, server.id);
    return server;
  }
}

// ============================================
// WEIGHTED ROUND ROBIN
// ============================================

class WeightedLoadBalancer extends LoadBalancer {
  constructor(servers) {
    super(servers);
    this.weights = new Map();
    servers.forEach(server => {
      this.weights.set(server.id, server.weight || 1);
    });
  }
  
  getNextServer() {
    const healthyServers = this.getHealthyServers();
    const totalWeight = healthyServers.reduce((sum, server) => {
      return sum + (this.weights.get(server.id) || 1);
    }, 0);
    
    let random = Math.random() * totalWeight;
    
    for (const server of healthyServers) {
      random -= (this.weights.get(server.id) || 1);
      if (random <= 0) {
        return server;
      }
    }
    
    return healthyServers[0];
  }
}
```

---

## E) Internal Working

**Load Balancing Flow:**
1. Request arrives at load balancer
2. Algorithm selects server
3. Request forwarded to server
4. Response returned to client
5. Health checks monitor servers

**Health Checks:**
- Periodic health checks
- Mark unhealthy servers
- Remove from pool
- Add back when healthy

---

## F) Interview Questions & Answers

### Q1: What is load balancing and why is it important?

**Answer:**
Load balancing distributes incoming traffic across multiple servers. Benefits: High availability (failover to healthy servers), performance (even load distribution), scalability (add/remove servers), reliability (no single point of failure). Types: Layer 4 (IP/port based), Layer 7 (HTTP level, content-based). Essential for production systems.

### Q2: What are different load balancing algorithms?

**Answer:**
Algorithms: Round Robin (sequential, equal distribution), Least Connections (server with least connections, good for long connections), IP Hash (session affinity, same client to same server), Weighted Round Robin (servers with different capacities). Choose based on use case - Round Robin for simple cases, Least Connections for varying connection times, IP Hash for session affinity.

### Q3: How do you handle server failures in load balancing?

**Answer:**
Handle failures with health checks - periodic checks (every 5-10 seconds), mark unhealthy servers, remove from pool, retry failed requests on other servers, add back when healthy. Also use circuit breakers (stop sending to failing servers), graceful degradation (reduce functionality), monitoring and alerts.

---

## G) Common Mistakes

### Mistake 1: No Health Checks

```javascript
// ❌ WRONG - No health checks
getNextServer() {
  return this.servers[this.currentIndex];
}
// Sends to dead servers

// ✅ CORRECT - Health checks
getNextServer() {
  const healthy = this.getHealthyServers();
  return healthy[this.currentIndex];
}
```

**Why it breaks:** Requests sent to dead servers, poor user experience.

---

## H) When to Use & When NOT to Use

Always use load balancing for production systems with multiple servers. Don't use for single server or development.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain Load Balancing."

**You:**
"Load balancing distributes traffic across multiple servers. Types: Layer 4 (IP/port), Layer 7 (HTTP level). Algorithms: Round Robin (sequential), Least Connections (least loaded), IP Hash (session affinity). Benefits: High availability, performance, scalability. Health checks monitor servers, remove unhealthy ones. Essential for production systems with multiple servers."

---

## J) Mini Practice Task

Implement load balancer with Round Robin, health checks, failover, and session affinity.

---

**END OF TOPIC: LOAD BALANCING**

