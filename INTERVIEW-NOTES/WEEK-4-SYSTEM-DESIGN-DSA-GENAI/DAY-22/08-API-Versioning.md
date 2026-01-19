# API VERSIONING

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**API Versioning kya hai?**
- API Versioning API changes ko handle karne ka method hai
- Backward compatibility maintain karta hai
- Breaking changes ko manage karta hai
- Multiple versions ko support karta hai
- Smooth migration allow karta hai

**Real-life Analogy:**
- API Versioning = Software ka version (v1, v2)
- Breaking changes = New version incompatible
- Backward compatibility = Old version still works
- Migration = Upgrade from v1 to v2

**Key Concepts:**
- **Version:** API ka identifier (v1, v2)
- **Breaking Changes:** Incompatible changes
- **Backward Compatibility:** Old clients still work
- **Deprecation:** Old version warning
- **Migration:** Move to new version

### Versioning Strategies

**1. URL Path:**
- `/api/v1/users`
- `/api/v2/users`
- Clear, explicit

**2. Query Parameter:**
- `/api/users?version=1`
- `/api/users?version=2`
- Less explicit

**3. Header:**
- `Accept: application/vnd.api.v1+json`
- `/api/users`
- Clean URLs

**4. Subdomain:**
- `v1.api.example.com`
- `v2.api.example.com`
- Separate deployments

---

## B) Easy English Theory

### What is API Versioning?

API Versioning manages API changes while maintaining backward compatibility. Strategies: URL Path (`/api/v1/users`), Query Parameter (`?version=1`), Header (`Accept: vnd.api.v1+json`), Subdomain (`v1.api.com`). Best practice: URL Path (clear, explicit). Deprecation: Warn users, provide timeline for removal.

---

## C) Why This Concept Exists

### The Problem

**Without API Versioning:**
- Breaking changes break existing clients
- Can't update API without breaking
- Forced migration for all users
- Poor developer experience
- No smooth transition

### The Solution

**API Versioning Provides:**
1. **Compatibility:** Old clients still work
2. **Flexibility:** Add new features
3. **Migration:** Smooth transition
4. **Stability:** Predictable API
5. **Developer Experience:** Better DX

---

## D) Practical Example (Code)

```javascript
// ============================================
// API VERSIONING: URL PATH
// ============================================

const express = require('express');
const app = express();

// V1 Routes
const v1Router = express.Router();
v1Router.get('/users', (req, res) => {
  res.json({
    users: [
      { id: 1, name: 'John', email: 'john@example.com' }
    ]
  });
});

v1Router.post('/users', (req, res) => {
  // V1 logic
  res.json({ id: 1, name: req.body.name });
});

// V2 Routes (new format)
const v2Router = express.Router();
v2Router.get('/users', (req, res) => {
  res.json({
    data: {
      users: [
        { 
          id: 1, 
          name: 'John',
          email: 'john@example.com',
          createdAt: '2024-01-01'
        }
      ]
    },
    meta: {
      page: 1,
      total: 1
    }
  });
});

v2Router.post('/users', (req, res) => {
  // V2 logic with validation
  const { name, email } = req.body;
  res.json({ 
    data: { id: 1, name, email },
    meta: { version: '2.0' }
  });
});

// Mount routes
app.use('/api/v1', v1Router);
app.use('/api/v2', v2Router);

// ============================================
// API VERSIONING: HEADER
// ============================================

// Middleware to detect version from header
function versionMiddleware(req, res, next) {
  const acceptHeader = req.headers.accept || '';
  
  // Extract version from Accept header
  // Accept: application/vnd.api.v1+json
  const versionMatch = acceptHeader.match(/vnd\.api\.v(\d+)/);
  const version = versionMatch ? versionMatch[1] : '1'; // Default v1
  
  req.apiVersion = version;
  next();
}

app.use('/api/users', versionMiddleware, (req, res) => {
  if (req.apiVersion === '1') {
    // V1 response
    res.json({ users: [{ id: 1, name: 'John' }] });
  } else if (req.apiVersion === '2') {
    // V2 response
    res.json({ 
      data: { users: [{ id: 1, name: 'John' }] },
      meta: { version: '2.0' }
    });
  }
});

// ============================================
// API VERSIONING: VERSION DETECTION MIDDLEWARE
// ============================================

class APIVersionRouter {
  constructor() {
    this.handlers = new Map();
  }
  
  register(version, handler) {
    this.handlers.set(version, handler);
  }
  
  middleware() {
    return (req, res, next) => {
      // Try to detect version from multiple sources
      let version = null;
      
      // 1. URL path
      const pathMatch = req.path.match(/\/v(\d+)\//);
      if (pathMatch) {
        version = pathMatch[1];
      }
      
      // 2. Query parameter
      if (!version && req.query.version) {
        version = req.query.version.replace('v', '');
      }
      
      // 3. Header
      if (!version) {
        const acceptHeader = req.headers.accept || '';
        const headerMatch = acceptHeader.match(/vnd\.api\.v(\d+)/);
        if (headerMatch) {
          version = headerMatch[1];
        }
      }
      
      // Default to v1
      version = version || '1';
      
      const handler = this.handlers.get(version);
      if (handler) {
        req.apiVersion = version;
        return handler(req, res, next);
      }
      
      // Version not found
      res.status(400).json({
        error: 'Unsupported API version',
        supportedVersions: Array.from(this.handlers.keys()),
        requestedVersion: version
      });
    };
  }
}

// Usage
const versionRouter = new APIVersionRouter();

versionRouter.register('1', (req, res) => {
  res.json({ users: [{ id: 1, name: 'John' }] });
});

versionRouter.register('2', (req, res) => {
  res.json({ 
    data: { users: [{ id: 1, name: 'John' }] },
    meta: { version: '2.0' }
  });
});

app.use('/api/users', versionRouter.middleware());

// ============================================
// API VERSIONING: DEPRECATION
// ============================================

function deprecationMiddleware(req, res, next) {
  if (req.apiVersion === '1') {
    // Add deprecation warning header
    res.set({
      'Deprecation': 'true',
      'Sunset': 'Mon, 31 Dec 2024 23:59:59 GMT',
      'Link': '</api/v2/users>; rel="successor-version"'
    });
  }
  next();
}

app.use('/api/v1/*', deprecationMiddleware);

// ============================================
// API VERSIONING: VERSION SERVICE
// ============================================

class APIVersionService {
  constructor() {
    this.versions = new Map();
    this.defaultVersion = '1';
  }
  
  register(version, config) {
    this.versions.set(version, {
      ...config,
      deprecated: config.deprecated || false,
      sunsetDate: config.sunsetDate || null
    });
  }
  
  getHandler(version) {
    const v = version || this.defaultVersion;
    const config = this.versions.get(v);
    
    if (!config) {
      throw new Error(`Unsupported version: ${v}`);
    }
    
    return {
      handler: config.handler,
      deprecated: config.deprecated,
      sunsetDate: config.sunsetDate
    };
  }
  
  getAllVersions() {
    return Array.from(this.versions.keys());
  }
}

// Usage
const versionService = new APIVersionService();

versionService.register('1', {
  handler: (req, res) => {
    res.json({ users: [{ id: 1, name: 'John' }] });
  },
  deprecated: true,
  sunsetDate: new Date('2024-12-31')
});

versionService.register('2', {
  handler: (req, res) => {
    res.json({ 
      data: { users: [{ id: 1, name: 'John' }] },
      meta: { version: '2.0' }
  });
  }
});

app.use('/api/users', (req, res, next) => {
  try {
    const { handler, deprecated, sunsetDate } = versionService.getHandler(req.apiVersion);
    
    if (deprecated) {
      res.set({
        'Deprecation': 'true',
        'Sunset': sunsetDate?.toUTCString(),
        'Link': '</api/v2/users>; rel="successor-version"'
      });
    }
    
    handler(req, res);
  } catch (error) {
    res.status(400).json({
      error: error.message,
      supportedVersions: versionService.getAllVersions()
    });
  }
});
```

---

## E) Internal Working

**API Versioning Flow:**
1. Request arrives
2. Detect version (URL, header, query)
3. Route to appropriate version handler
4. Process request
5. Return response with version info
6. Add deprecation headers if needed

**Key Considerations:**
- Strategy: URL Path (recommended), Header (clean URLs), Query (flexible)
- Deprecation: Warn users, provide timeline
- Migration: Guide users to new version
- Breaking Changes: Create new version

---

## F) Interview Questions & Answers

### Q1: What are different API versioning strategies and which is best?

**Answer:**
Strategies: URL Path (`/api/v1/users` - clear, explicit), Query Parameter (`?version=1` - flexible but less explicit), Header (`Accept: vnd.api.v1+json` - clean URLs), Subdomain (`v1.api.com` - separate deployments). Best: URL Path (simple, clear, easy to understand, explicit). Use Header for: Clean URLs, content negotiation. Use Query for: Optional versioning.

### Q2: How do you handle breaking changes in APIs?

**Answer:**
Breaking Changes: Create new version (v2), maintain old version (v1), deprecate old version (warnings, timeline), migrate users gradually, remove old version after migration. Process: Plan changes, create new version, communicate to users, deprecate old version, provide migration guide, remove after sunset date. Never: Break existing version without new version.

### Q3: What is the difference between semantic versioning and API versioning?

**Answer:**
Semantic Versioning: MAJOR.MINOR.PATCH (1.2.3), MAJOR = breaking changes, MINOR = new features, PATCH = bug fixes. API Versioning: Version numbers (v1, v2), usually increments on breaking changes, not tied to semantic versioning. Use: Semantic versioning for libraries, API versioning for endpoints. Example: Library version 2.1.3, API version v2.

### Q4: How do you deprecate an API version?

**Answer:**
Deprecation Process: Announce deprecation (blog, docs), add deprecation headers (`Deprecation: true`, `Sunset: date`), provide timeline (6 months), guide to new version (`Link` header), monitor usage, remove after sunset date. Headers: `Deprecation: true`, `Sunset: 2024-12-31`, `Link: </api/v2/users>; rel="successor-version"`. Best Practice: Long timeline, clear communication, migration guide.

### Q5: When should you create a new API version?

**Answer:**
New Version When: Breaking changes (removing fields, changing structure), major functionality changes, security requirements change, performance optimizations that change behavior. Don't Version For: Bug fixes (patch), adding optional fields (backward compatible), internal improvements (transparent). Rule: Version on breaking changes, not on non-breaking changes.

### Q6: How do you support multiple versions simultaneously?

**Answer:**
Multiple Versions: Separate route handlers per version, shared business logic (service layer), version-specific serializers (format responses), middleware for version detection, config-driven routing. Architecture: Version routers → version handlers → shared services → database. Best Practice: Minimize code duplication, extract common logic, version-specific adapters.

### Q7: What are the trade-offs of different versioning strategies?

**Answer:**
URL Path: Explicit but verbose URLs, easy to understand, clear routing. Header: Clean URLs but implicit versioning, content negotiation, client must set headers. Query: Flexible but less explicit, optional versioning, URL pollution. Subdomain: Separate deployments but DNS management, CORS complexity. Choose based on: Team preference, client capabilities, deployment needs.

### Q8: How do you version database schema changes?

**Answer:**
Schema Versioning: Migration scripts (versioned), backward compatible changes (add columns, not remove), feature flags (enable new version gradually), dual-write (write to both schemas during transition), read from new schema after migration, remove old schema. Strategy: Gradual migration, not breaking changes, version tables if needed. Never: Break existing schema without migration.

### Q9: How do you handle API versioning in microservices?

**Answer:**
Microservices Versioning: Version per service (independent), API Gateway routes by version, service discovery with versions, client specifies version, backward compatibility per service, deprecation per service. Architecture: Gateway → version detection → service routing → versioned services. Challenge: Multiple services, different versions, coordination.

### Q10: What is the best practice for API versioning?

**Answer:**
Best Practices: Use URL Path versioning (clear, explicit), increment on breaking changes, maintain backward compatibility, deprecate old versions properly, provide migration guides, use semantic versioning for libraries, document all versions, monitor usage, remove old versions after migration. Don't: Version for every change, break existing versions, forget deprecation, remove too quickly.

---

## G) Common Mistakes

### Mistake 1: Breaking Existing Version

```javascript
// ❌ WRONG - Break existing version
app.get('/api/v1/users', (req, res) => {
  // Changed response format - breaks existing clients
  res.json({ data: { users: [...] } }); // Was: { users: [...] }
});

// ✅ CORRECT - Create new version
app.get('/api/v1/users', (req, res) => {
  res.json({ users: [...] }); // Keep old format
});

app.get('/api/v2/users', (req, res) => {
  res.json({ data: { users: [...] } }); // New format
});
```

**Why it breaks:** Existing clients break, no backward compatibility.

### Mistake 2: Too Many Versions

```javascript
// ❌ WRONG - Version for every change
app.use('/api/v1/users', ...);
app.use('/api/v2/users', ...); // Minor change
app.use('/api/v3/users', ...); // Another minor change
app.use('/api/v4/users', ...); // Yet another minor change

// ✅ CORRECT - Version only for breaking changes
app.use('/api/v1/users', ...);
app.use('/api/v2/users', ...); // Breaking change only
```

**Why it breaks:** Too complex, maintenance burden, confusing for users.

---

## H) When to Use & When NOT to Use

**Use API Versioning When:**
- Breaking changes needed
- Backward compatibility required
- Multiple clients with different needs
- Long-term API maintenance
- Public APIs

**Don't Use When:**
- Internal APIs (can coordinate migration)
- Very early stage (pre-v1)
- All changes backward compatible
- Can coordinate all clients

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain API versioning strategies and best practices."

**You:**
"API Versioning manages API changes while maintaining backward compatibility. Strategies: URL Path (`/api/v1/users` - clear, explicit), Header (`Accept: vnd.api.v1+json` - clean URLs), Query Parameter (`?version=1` - flexible).

Best: URL Path (simple, clear). Process: Create new version on breaking changes, maintain old version, deprecate with headers (`Deprecation: true`, `Sunset: date`), provide migration guide, remove after sunset date.

Best Practices: Version on breaking changes only, maintain backward compatibility, deprecate properly, provide clear timeline, document all versions."

---

## J) Mini Practice Task

Implement API versioning: Support URL path versioning, detect version from multiple sources, handle deprecation headers, provide version info in responses, support multiple versions simultaneously.

---

**END OF TOPIC: API VERSIONING**
