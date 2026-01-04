# CDN (CONTENT DELIVERY NETWORK)

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**CDN kya hai?**
- CDN geographically distributed servers ka network hai
- Static content ko users ke paas serve karta hai
- Latency reduce karta hai
- Origin server load kam karta hai
- Global content delivery

**Real-life Analogy:**
- CDN = Multiple warehouses (different cities)
- Origin Server = Main warehouse (one location)
- Users = Customers (different cities)
- Fast delivery = Nearest warehouse se deliver

**CDN Benefits:**
- **Low Latency:** Nearest server se content
- **High Availability:** Multiple servers
- **Reduced Load:** Origin server par kam load
- **Better Performance:** Fast content delivery

### CDN Architecture

**Components:**
- **Origin Server:** Original content source
- **Edge Servers:** Distributed servers (geographically)
- **CDN Network:** Global network of edge servers

**How it Works:**
1. User request CDN URL
2. CDN finds nearest edge server
3. If cached → serve from edge
4. If not cached → fetch from origin, cache, serve
5. Future requests from cache

---

## B) Easy English Theory

### What is CDN?

CDN (Content Delivery Network) is geographically distributed network of servers that cache and serve static content (images, videos, CSS, JS) closer to users. Benefits: Low latency (nearest server), high availability (multiple servers), reduced origin server load, better performance. Use for static assets, media files, global content delivery.

---

## C) Why This Concept Exists

### The Problem

**Without CDN:**
- High latency (distant server)
- Origin server overload
- Poor performance globally
- High bandwidth costs

### The Solution

**CDN Provides:**
1. **Low Latency:** Nearest server
2. **Performance:** Fast content delivery
3. **Scalability:** Handle high traffic
4. **Cost Efficiency:** Reduced origin load

---

## D) Practical Example (Code)

```javascript
// ============================================
// CDN CONFIGURATION
// ============================================

// Express app with CDN
const express = require('express');
const app = express();

// CDN URLs for static assets
const CDN_URL = 'https://cdn.example.com';

// Serve static files through CDN
app.use('/static', (req, res, next) => {
  // Redirect to CDN
  res.redirect(`${CDN_URL}${req.path}`);
});

// Or use CDN in templates
app.get('/', (req, res) => {
  res.render('index', {
    cdnUrl: CDN_URL,
    cssUrl: `${CDN_URL}/css/style.css`,
    jsUrl: `${CDN_URL}/js/app.js`,
    imageUrl: `${CDN_URL}/images/logo.png`
  });
});

// ============================================
// CDN CACHING STRATEGY
// ============================================

class CDNManager {
  constructor() {
    this.originServer = 'https://origin.example.com';
    this.cdnServers = [
      'https://cdn-us.example.com',
      'https://cdn-eu.example.com',
      'https://cdn-asia.example.com'
    ];
  }
  
  // Get nearest CDN server
  getNearestCDN(userLocation) {
    // Simple geographic routing
    if (userLocation.region === 'US') {
      return this.cdnServers[0];
    } else if (userLocation.region === 'EU') {
      return this.cdnServers[1];
    } else {
      return this.cdnServers[2];
    }
  }
  
  // Generate CDN URL
  getCDNUrl(filePath, userLocation) {
    const cdnServer = this.getNearestCDN(userLocation);
    return `${cdnServer}${filePath}`;
  }
}

// ============================================
// CACHE CONTROL HEADERS
// ============================================

app.get('/static/:file', (req, res) => {
  const file = req.params.file;
  
  // Set cache headers
  res.setHeader('Cache-Control', 'public, max-age=31536000'); // 1 year
  res.setHeader('ETag', generateETag(file));
  
  // Check if not modified
  const ifNoneMatch = req.headers['if-none-match'];
  if (ifNoneMatch === generateETag(file)) {
    return res.status(304).end(); // Not Modified
  }
  
  // Serve file
  res.sendFile(path.join(__dirname, 'static', file));
});

// ============================================
// CDN PURGE (INVALIDATION)
// ============================================

class CDNPurge {
  constructor(cdnProvider) {
    this.cdnProvider = cdnProvider; // CloudFlare, AWS CloudFront, etc.
  }
  
  // Purge specific file
  async purgeFile(filePath) {
    await this.cdnProvider.purge([filePath]);
  }
  
  // Purge by pattern
  async purgePattern(pattern) {
    const files = await this.getFilesByPattern(pattern);
    await this.cdnProvider.purge(files);
  }
  
  // Purge all
  async purgeAll() {
    await this.cdnProvider.purge(['/*']);
  }
}

// ============================================
// STATIC ASSET VERSIONING
// ============================================

// Version assets for cache busting
app.get('/assets/:version/:file', (req, res) => {
  const { version, file } = req.params;
  const cdnUrl = `${CDN_URL}/assets/${version}/${file}`;
  
  // Long cache for versioned assets
  res.setHeader('Cache-Control', 'public, max-age=31536000');
  res.redirect(cdnUrl);
});

// Generate versioned URLs
function getAssetUrl(filename) {
  const version = getFileHash(filename); // Content hash
  return `${CDN_URL}/assets/${version}/${filename}`;
}

// ============================================
// CDN FALLBACK
// ============================================

class CDNFallback {
  constructor() {
    this.cdnUrl = CDN_URL;
    this.originUrl = 'https://origin.example.com';
  }
  
  async getAsset(path) {
    try {
      // Try CDN first
      const response = await fetch(`${this.cdnUrl}${path}`);
      if (response.ok) {
        return response;
      }
    } catch (error) {
      // CDN failed, fallback to origin
      console.log('CDN failed, using origin');
    }
    
    // Fallback to origin
    return fetch(`${this.originUrl}${path}`);
  }
}

// ============================================
// IMAGE OPTIMIZATION WITH CDN
// ============================================

app.get('/images/:image', (req, res) => {
  const { image } = req.params;
  const { width, height, quality } = req.query;
  
  // CDN can resize/optimize on-the-fly
  const cdnUrl = `${CDN_URL}/images/${image}?width=${width}&height=${height}&quality=${quality}`;
  res.redirect(cdnUrl);
});

// ============================================
// CDN MONITORING
// ============================================

class CDNMonitor {
  constructor() {
    this.metrics = {
      cacheHits: 0,
      cacheMisses: 0,
      originRequests: 0
    };
  }
  
  recordCacheHit() {
    this.metrics.cacheHits++;
  }
  
  recordCacheMiss() {
    this.metrics.cacheMisses++;
    this.metrics.originRequests++;
  }
  
  getCacheHitRatio() {
    const total = this.metrics.cacheHits + this.metrics.cacheMisses;
    return total > 0 ? (this.metrics.cacheHits / total) * 100 : 0;
  }
}
```

---

## E) Internal Working

**CDN Flow:**
1. User requests content
2. DNS routes to nearest edge server
3. Edge server checks cache
4. Cache hit: Serve from edge
5. Cache miss: Fetch from origin, cache, serve
6. Future requests from cache

**Caching:**
- Static assets cached at edge
- TTL-based expiration
- Invalidation on update
- Geographic distribution

---

## F) Interview Questions & Answers

### Q1: What is CDN and why use it?

**Answer:**
CDN (Content Delivery Network) is geographically distributed network of servers that cache and serve static content closer to users. Benefits: Low latency (nearest server), high availability (multiple servers), reduced origin server load, better performance globally, cost efficiency. Use for static assets (images, CSS, JS, videos), media files, global content delivery.

### Q2: How does CDN caching work?

**Answer:**
CDN caching: User requests content, DNS routes to nearest edge server, edge checks cache. Cache hit: Serve from edge (fast). Cache miss: Fetch from origin server, cache at edge, serve to user. Future requests served from cache. Cache headers (Cache-Control, ETag) control caching. Invalidation: Purge cache when content updates.

### Q3: What content should be served through CDN?

**Answer:**
Serve through CDN: Static assets (images, CSS, JS, fonts), media files (videos, audio), large files, frequently accessed content, global content. Don't serve: Dynamic content (user-specific, real-time), sensitive data, frequently changing content (unless with short TTL). CDN best for cacheable, static, globally accessed content.

---

## G) Common Mistakes

### Mistake 1: No Cache Headers

```javascript
// ❌ WRONG - No cache headers
app.get('/static/:file', (req, res) => {
  res.sendFile(file);
});
// CDN can't cache properly

// ✅ CORRECT - Cache headers
app.get('/static/:file', (req, res) => {
  res.setHeader('Cache-Control', 'public, max-age=31536000');
  res.sendFile(file);
});
```

**Why it breaks:** CDN can't cache without proper headers, poor performance.

---

## H) When to Use & When NOT to Use

Use CDN for static assets, media files, global content, high traffic. Don't use for dynamic content, sensitive data, or local-only content.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain CDN."

**You:**
"CDN is geographically distributed network of servers that cache static content closer to users. Flow: User requests, DNS routes to nearest edge server, edge checks cache. Cache hit: Serve from edge. Cache miss: Fetch from origin, cache, serve. Benefits: Low latency, high availability, reduced origin load, better performance.

Use for static assets (images, CSS, JS), media files, global content. Set cache headers (Cache-Control, ETag) for proper caching. Invalidate cache on updates. Essential for global applications."

---

## J) Mini Practice Task

Configure CDN for static assets: Set cache headers, implement versioning, handle cache invalidation, monitor cache hit ratio.

---

**END OF TOPIC: CDN**

