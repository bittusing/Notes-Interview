# API VERSIONING

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**API Versioning kya hai?**
- API Versioning ek practice hai jo APIs ko versions mein organize karta hai
- Different versions ko maintain kar sakte hain simultaneously
- Backward compatibility maintain kar sakte hain
- Breaking changes ko handle kar sakte hain
- Clients ko specific version use karne deta hai

**Real-life Analogy:**
- Imagine mobile apps ke versions
- Old version (v1) aur new version (v2) dono exist karte hain
- Users apne choice ka version use kar sakte hain
- Gradual migration possible hai
- Breaking changes ko safely introduce kar sakte hain

**Why Versioning?**
- APIs evolve hote hain
- Breaking changes aane par old clients break ho sakte hain
- Different clients different versions use kar sakte hain
- Gradual migration enable karta hai

### Versioning Strategies

**1. URL Path Versioning:**
- Version URL mein include hota hai
- `/api/v1/users`, `/api/v2/users`
- Simple aur clear
- Most common approach

**2. Query Parameter Versioning:**
- Version query parameter mein
- `/api/users?version=1`
- Less common
- URLs cleaner rehte hain

**3. Header Versioning:**
- Version HTTP header mein
- `Accept: application/vnd.api+json;version=1`
- URLs clean rehte hain
- More complex

**4. Custom Header:**
- Custom header use karte hain
- `API-Version: 1`
- Flexible approach

### Version Numbering

**Semantic Versioning:**
- Major.Minor.Patch (1.2.3)
- Major: Breaking changes
- Minor: New features (backward compatible)
- Patch: Bug fixes

**API Versioning:**
- Usually major version use karte hain
- v1, v2, v3
- Minor versions ko major version mein handle karte hain

---

## B) Easy English Theory

### What is API Versioning?

API Versioning is the practice of managing different versions of an API simultaneously. It allows maintaining multiple versions, handling breaking changes, and enabling gradual migration for clients.

### Versioning Strategies

**URL Path:** Version in URL (`/api/v1/users`)
**Query Parameter:** Version in query string (`?version=1`)
**Header:** Version in HTTP header (`Accept: version=1`)
**Custom Header:** Custom header (`API-Version: 1`)

### Benefits

- **Backward Compatibility:** Support multiple versions
- **Gradual Migration:** Clients migrate at their pace
- **Breaking Changes:** Safely introduce changes
- **Stability:** Old clients keep working

---

## C) Why This Concept Exists

### The Problem

**Without Versioning:**
- Breaking changes break all clients
- Can't evolve API safely
- Force all clients to update
- No backward compatibility
- Difficult to maintain

### The Solution

**Versioning Provides:**
1. **Backward Compatibility:** Support old versions
2. **Gradual Migration:** Clients migrate gradually
3. **Breaking Changes:** Safe introduction of changes
4. **Stability:** Old clients continue working
5. **Flexibility:** Multiple versions simultaneously

---

## D) Practical Example (Code)

```javascript
// ============================================
// URL PATH VERSIONING
// ============================================

const express = require('express');
const app = express();

// V1 Routes
app.get('/api/v1/users', (req, res) => {
  res.json({
    version: 'v1',
    users: [
      { id: 1, name: 'John' } // Old format
    ]
  });
});

// V2 Routes
app.get('/api/v2/users', (req, res) => {
  res.json({
    version: 'v2',
    data: {
      users: [
        { id: 1, name: 'John', email: 'john@example.com' } // New format
      ]
    }
  });
});

// ============================================
// VERSIONING WITH ROUTERS
// ============================================

const v1Router = express.Router();
const v2Router = express.Router();

// V1 routes
v1Router.get('/users', (req, res) => {
  res.json({ version: 'v1', users: [] });
});

v1Router.get('/posts', (req, res) => {
  res.json({ version: 'v1', posts: [] });
});

// V2 routes
v2Router.get('/users', (req, res) => {
  res.json({ version: 'v2', data: { users: [] } });
});

v2Router.get('/posts', (req, res) => {
  res.json({ version: 'v2', data: { posts: [] } });
});

app.use('/api/v1', v1Router);
app.use('/api/v2', v2Router);

// ============================================
// HEADER VERSIONING
// ============================================

function versionMiddleware(req, res, next) {
  const version = req.headers['api-version'] || '1';
  req.apiVersion = version;
  next();
}

app.use(versionMiddleware);

app.get('/api/users', (req, res) => {
  if (req.apiVersion === '1') {
    return res.json({ version: 'v1', users: [] });
  }
  if (req.apiVersion === '2') {
    return res.json({ version: 'v2', data: { users: [] } });
  }
  res.status(400).json({ error: 'Unsupported version' });
});

// ============================================
// VERSIONING MIDDLEWARE
// ============================================

function apiVersioning(versions) {
  return (req, res, next) => {
    // Extract version from URL
    const versionMatch = req.path.match(/\/v(\d+)/);
    const version = versionMatch ? versionMatch[1] : null;
    
    if (!version || !versions.includes(version)) {
      return res.status(400).json({
        error: 'Invalid API version',
        supportedVersions: versions
      });
    }
    
    req.apiVersion = version;
    next();
  };
}

app.use('/api', apiVersioning(['1', '2']));

// ============================================
// VERSION-SPECIFIC CONTROLLERS
// ============================================

class UserControllerV1 {
  getUsers(req, res) {
    res.json({
      version: 'v1',
      users: [
        { id: 1, name: 'John' }
      ]
    });
  }
}

class UserControllerV2 {
  getUsers(req, res) {
    res.json({
      version: 'v2',
      data: {
        users: [
          { id: 1, name: 'John', email: 'john@example.com' }
        ]
      }
    });
  }
}

const controllers = {
  '1': new UserControllerV1(),
  '2': new UserControllerV2()
};

app.get('/api/v:version/users', (req, res) => {
  const version = req.params.version;
  const controller = controllers[version];
  
  if (!controller) {
    return res.status(400).json({ error: 'Invalid version' });
  }
  
  controller.getUsers(req, res);
});

// ============================================
// DEPRECATION HEADERS
// ============================================

app.get('/api/v1/users', (req, res) => {
  res.set({
    'X-API-Version': '1',
    'X-API-Deprecated': 'true',
    'X-API-Sunset': '2024-12-31',
    'Link': '</api/v2/users>; rel="successor-version"'
  });
  res.json({ version: 'v1', users: [] });
});

// ============================================
// VERSION NEGOTIATION
// ============================================

function versionNegotiation(req, res, next) {
  // Check Accept header
  const acceptHeader = req.headers.accept || '';
  const versionMatch = acceptHeader.match(/version=(\d+)/);
  const headerVersion = versionMatch ? versionMatch[1] : null;
  
  // Check URL version
  const urlVersion = req.path.match(/\/v(\d+)/)?.[1];
  
  // Check custom header
  const customVersion = req.headers['api-version'];
  
  // Priority: URL > Custom Header > Accept Header
  req.apiVersion = urlVersion || customVersion || headerVersion || '1';
  next();
}

app.use(versionNegotiation);

// ============================================
// VERSION MIGRATION HELPER
// ============================================

function migrateData(data, fromVersion, toVersion) {
  if (fromVersion === '1' && toVersion === '2') {
    // Migrate from v1 to v2 format
    return {
      data: {
        users: data.users.map(user => ({
          ...user,
          email: user.email || 'unknown@example.com'
        }))
      }
    };
  }
  return data;
}

app.get('/api/v:version/users', (req, res) => {
  const version = req.params.version;
  let users = getUsersFromDatabase(); // v1 format
  
  if (version === '2') {
    users = migrateData({ users }, '1', '2');
  }
  
  res.json(users);
});
```

---

## E) Internal Working

### Step-by-Step Internal Flow

**1. Request Arrives**
```
Request with version identifier
    ↓
Extract version (URL/Header/Query)
    ↓
Validate version
```

**2. Version Resolution**
```
Determine API version
    ↓
Route to version-specific handler
    ↓
Execute version-specific logic
```

**3. Response**
```
Version-specific response format
    ↓
Include version headers
    ↓
Send response
```

---

## F) Interview Questions & Answers

### Q1: Why is API Versioning important?

**Answer:**
API Versioning allows maintaining multiple API versions simultaneously, enabling backward compatibility and gradual client migration. It lets you introduce breaking changes safely without breaking existing clients, and supports different clients using different versions at their own pace.

### Q2: What are different API Versioning strategies?

**Answer:**
URL path versioning puts version in the URL (`/api/v1/users`). Query parameter versioning uses query string (`?version=1`). Header versioning uses HTTP headers like `Accept` or custom headers. URL path is most common and clear, while headers keep URLs clean.

### Q3: How do you handle deprecated API versions?

**Answer:**
Use deprecation headers like `X-API-Deprecated: true`, `X-API-Sunset` for sunset date, and `Link` header pointing to newer version. Provide migration guides. Monitor usage and communicate deprecation timeline. Eventually remove deprecated versions after sufficient notice period.

### Q4: What's the difference between major and minor versions?

**Answer:**
Major versions include breaking changes that require client updates. Minor versions add features while maintaining backward compatibility. For APIs, usually only major versions are exposed (v1, v2), with minor changes handled within the major version.

### Q5: How do you migrate clients to new versions?

**Answer:**
Provide clear migration guides, maintain both versions during transition period, use deprecation headers to notify clients, offer migration tools or scripts if possible, communicate timeline clearly, and provide support during migration. Gradual migration reduces risk.

---

## G) Common Mistakes

### Mistake 1: No Versioning Strategy

```javascript
// ❌ WRONG - Breaking changes break all clients
app.get('/api/users', (req, res) => {
  // Changed response format - breaks existing clients
  res.json({ data: { users: [] } });
});

// ✅ CORRECT - Versioned API
app.get('/api/v1/users', (req, res) => {
  res.json({ users: [] }); // Old format
});
app.get('/api/v2/users', (req, res) => {
  res.json({ data: { users: [] } }); // New format
});
```

**Why it breaks:** Breaking changes break all clients simultaneously.

### Mistake 2: Removing Old Versions Too Quickly

```javascript
// ❌ WRONG - Remove v1 immediately
// app.use('/api/v1', v1Router); // Removed

// ✅ CORRECT - Maintain both versions
app.use('/api/v1', v1Router); // Keep for transition
app.use('/api/v2', v2Router);
```

**Why it breaks:** Clients don't have time to migrate.

---

## H) When to Use & When NOT to Use

### When Versioning is Essential

**1. Production APIs**
- Public APIs
- Breaking changes needed
- Multiple clients
- Long-term maintenance

**2. Evolving APIs**
- Regular updates
- Feature additions
- Breaking changes
- Client diversity

### When NOT to Use

**1. Internal APIs**
- Small team
- Can update all clients
- Frequent breaking changes acceptable
- Development phase

**2. Simple APIs**
- No breaking changes planned
- Single client
- Prototype/MVP
- Internal tools

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain API Versioning."

**You:**
"API Versioning allows maintaining multiple API versions simultaneously. Common strategies include URL path versioning (`/api/v1/users`), query parameters, or headers. It enables backward compatibility, gradual client migration, and safe introduction of breaking changes.

When you need to change the API, create a new version instead of breaking the existing one. Old clients continue using v1, new clients use v2. Use deprecation headers to notify about deprecated versions. Eventually remove old versions after sufficient notice. Versioning is essential for production APIs with multiple clients."

---

## J) Mini Practice Task

### Task: Build Versioned API System

Create a versioned API with v1 and v2, migration support, and deprecation headers.

**Requirements:**
1. Multiple versions
2. Version routing
3. Deprecation handling
4. Migration helpers

---

**END OF TOPIC: API VERSIONING**

