# SYSTEM DESIGN FUNDAMENTALS

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**System Design kya hai?**
- System Design large-scale systems ko design karna hai
- Requirements se start karte hain
- Components identify karte hain
- Scalability, reliability, performance consider karte hain
- Architecture design karte hain

**Real-life Analogy:**
- System Design = Building ka blueprint
- Requirements = Client ki requirements
- Components = Rooms, floors, systems
- Scalability = Future expansion
- Architecture = Overall structure

**Key Principles:**
- **Scalability:** System ko scale kar sakte hain
- **Reliability:** System reliable hai
- **Availability:** System available hai
- **Performance:** Fast response
- **Maintainability:** Easy to maintain

### System Design Process

**1. Requirements Gathering:**
- Functional requirements
- Non-functional requirements
- Constraints
- Scale estimates

**2. High-Level Design:**
- Major components
- APIs
- Database schema
- Basic architecture

**3. Detailed Design:**
- Component details
- Data flow
- Algorithms
- Trade-offs

**4. Scale & Optimize:**
- Identify bottlenecks
- Optimize
- Scale components
- Handle edge cases

---

## B) Easy English Theory

### What is System Design?

System Design is process of designing large-scale systems. Steps: Requirements gathering (functional, non-functional, constraints), High-level design (components, APIs, database), Detailed design (component details, data flow), Scale & optimize (bottlenecks, optimization). Key principles: Scalability, Reliability, Availability, Performance, Maintainability.

### Design Process

**Requirements:** Functional (what system does), Non-functional (performance, scalability), Constraints (budget, time)
**High-Level:** Major components, APIs, database, basic architecture
**Detailed:** Component details, data flow, algorithms, trade-offs
**Scale:** Identify bottlenecks, optimize, scale components

---

## C) Why This Concept Exists

### The Problem

**Without System Design:**
- Poor architecture
- Scalability issues
- Performance problems
- Difficult maintenance
- High costs

### The Solution

**System Design Provides:**
1. **Scalability:** Handle growth
2. **Reliability:** System works correctly
3. **Performance:** Fast responses
4. **Maintainability:** Easy to maintain
5. **Cost Efficiency:** Optimize resources

---

## D) Practical Example (Code)

```javascript
// ============================================
// SYSTEM DESIGN EXAMPLE: URL SHORTENER
// ============================================

// Requirements:
// - Shorten long URLs
// - Redirect to original URL
// - 100M URLs/day
// - 5 years data retention

// ============================================
// HIGH-LEVEL DESIGN
// ============================================

/*
Components:
1. API Server (Handle requests)
2. URL Shortening Service (Generate short URLs)
3. Database (Store mappings)
4. Cache (Fast lookups)
5. Load Balancer (Distribute traffic)

API Endpoints:
POST /api/v1/shorten
  - Input: { url: "https://example.com/very/long/url" }
  - Output: { shortUrl: "https://short.ly/abc123" }

GET /abc123
  - Redirect to original URL
*/

// ============================================
// URL SHORTENING SERVICE
// ============================================

class URLShortener {
  constructor() {
    this.baseUrl = 'https://short.ly';
    this.cache = new Map(); // In-memory cache
  }
  
  // Generate short URL
  async shorten(longUrl) {
    // Check cache first
    const cached = this.cache.get(longUrl);
    if (cached) {
      return `${this.baseUrl}/${cached}`;
    }
    
    // Generate unique short code
    const shortCode = await this.generateShortCode();
    
    // Store in database
    await this.storeMapping(shortCode, longUrl);
    
    // Cache it
    this.cache.set(longUrl, shortCode);
    
    return `${this.baseUrl}/${shortCode}`;
  }
  
  // Generate unique short code
  async generateShortCode() {
    // Base62 encoding (a-z, A-Z, 0-9)
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    
    // 7 characters = 62^7 = 3.5 trillion possibilities
    for (let i = 0; i < 7; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    
    // Check if exists in database
    const exists = await this.checkExists(code);
    if (exists) {
      // Retry with new code
      return this.generateShortCode();
    }
    
    return code;
  }
  
  // Store mapping
  async storeMapping(shortCode, longUrl) {
    // Store in database
    // { shortCode: "abc123", longUrl: "https://...", createdAt: Date }
    await database.insert({
      shortCode,
      longUrl,
      createdAt: new Date()
    });
  }
  
  // Get original URL
  async getOriginalUrl(shortCode) {
    // Check cache first
    const cached = this.cache.get(shortCode);
    if (cached) {
      return cached;
    }
    
    // Query database
    const mapping = await database.findOne({ shortCode });
    if (!mapping) {
      throw new Error('URL not found');
    }
    
    // Cache it
    this.cache.set(shortCode, mapping.longUrl);
    
    return mapping.longUrl;
  }
  
  // Check if code exists
  async checkExists(shortCode) {
    const count = await database.count({ shortCode });
    return count > 0;
  }
}

// ============================================
// API SERVER
// ============================================

const express = require('express');
const app = express();
const urlShortener = new URLShortener();

// Shorten URL
app.post('/api/v1/shorten', async (req, res) => {
  try {
    const { url } = req.body;
    
    // Validate URL
    if (!isValidUrl(url)) {
      return res.status(400).json({ error: 'Invalid URL' });
    }
    
    const shortUrl = await urlShortener.shorten(url);
    res.json({ shortUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Redirect
app.get('/:shortCode', async (req, res) => {
  try {
    const { shortCode } = req.params;
    const originalUrl = await urlShortener.getOriginalUrl(shortCode);
    res.redirect(originalUrl);
  } catch (error) {
    res.status(404).json({ error: 'URL not found' });
  }
});

// ============================================
// SCALABILITY CONSIDERATIONS
// ============================================

/*
Scale Estimates:
- 100M URLs/day = ~1,160 URLs/second
- 5 years = ~182 billion URLs
- Read:Write ratio = 100:1 (more reads)

Storage:
- 182B URLs * 500 bytes = ~91 TB
- Need sharding

Database:
- Shard by shortCode
- Replication for reads

Cache:
- Redis for hot URLs
- 80-20 rule (20% URLs = 80% traffic)

Load Balancer:
- Distribute traffic
- Health checks
*/
```

---

## E) Internal Working

**System Design Flow:**
1. Requirements gathered
2. Components identified
3. Architecture designed
4. APIs defined
5. Database schema created
6. Scalability considered
7. Trade-offs analyzed

**Key Considerations:**
- Scale estimates
- Read/write ratio
- Data size
- Latency requirements
- Consistency needs

---

## F) Interview Questions & Answers

### Q1: How do you approach a system design question?

**Answer:**
Approach: 1) Clarify requirements (functional, non-functional, constraints, scale), 2) High-level design (major components, APIs, database, basic architecture), 3) Detailed design (component details, data flow, algorithms), 4) Scale & optimize (bottlenecks, optimization, trade-offs). Ask questions, make assumptions, discuss trade-offs.

### Q2: What are key principles of system design?

**Answer:**
Key principles: Scalability (handle growth - horizontal/vertical), Reliability (system works correctly, fault tolerance), Availability (uptime, redundancy), Performance (fast responses, low latency), Maintainability (easy to maintain, clear architecture). Also consider: Security, Cost efficiency, Simplicity.

### Q3: How do you estimate scale for a system?

**Answer:**
Estimate scale: Users (DAU, MAU), Requests (QPS - queries per second), Data (storage size, growth rate), Traffic (read/write ratio). Calculate: Daily requests = Users * requests per user, Peak QPS = Daily requests / (24 * 3600) * peak factor (2-3x), Storage = Data per record * records * retention period. Use these for capacity planning.

---

## G) Common Mistakes

### Mistake 1: Not Clarifying Requirements

```javascript
// ❌ WRONG - Jump to solution
// "I'll use microservices and Kubernetes"

// ✅ CORRECT - Clarify first
// "What's the expected scale? 1M users or 1B?"
// "What's the read/write ratio?"
// "What are latency requirements?"
```

**Why it breaks:** Wrong assumptions lead to over/under-engineering.

---

## H) When to Use & When NOT to Use

Always use system design principles for large-scale systems. Don't over-engineer simple systems.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "How do you approach system design?"

**You:**
"System Design process: 1) Clarify requirements - functional, non-functional, constraints, scale estimates. 2) High-level design - major components, APIs, database, basic architecture. 3) Detailed design - component details, data flow, algorithms, trade-offs. 4) Scale & optimize - identify bottlenecks, optimize, scale components.

Key principles: Scalability (horizontal/vertical), Reliability (fault tolerance), Availability (uptime), Performance (low latency), Maintainability. Always ask questions, make assumptions explicit, discuss trade-offs."

---

## J) Mini Practice Task

Design a URL shortener: Requirements gathering, high-level design, APIs, database schema, scalability considerations.

---

**END OF TOPIC: SYSTEM DESIGN FUNDAMENTALS**

