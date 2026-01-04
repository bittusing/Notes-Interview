# SECURITY BEST PRACTICES

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Security Best Practices kya hain?**
- Security ke liye recommended practices
- Common vulnerabilities se protect karna
- Security standards follow karna
- Defense in depth approach
- Continuous security improvement

**Key Areas:**
- Authentication & Authorization
- Input Validation & Sanitization
- Secure Communication (HTTPS)
- Error Handling
- Dependency Management
- Secrets Management

### Common Vulnerabilities

**1. SQL Injection:**
- Malicious SQL code injection
- Parameterized queries use karo
- ORM use karo

**2. XSS (Cross-Site Scripting):**
- Malicious scripts injection
- Input sanitization
- Output encoding

**3. CSRF (Cross-Site Request Forgery):**
- Unauthorized actions
- CSRF tokens
- SameSite cookies

**4. Authentication Issues:**
- Weak passwords
- Session hijacking
- Token security

**5. Sensitive Data Exposure:**
- Plain passwords
- API keys in code
- Proper encryption

---

## B) Easy English Theory

### What are Security Best Practices?

Security Best Practices are recommended approaches to protect applications from common vulnerabilities. Key areas include authentication, input validation, secure communication, error handling, and secrets management.

### Common Vulnerabilities

**SQL Injection:** Inject malicious SQL - use parameterized queries
**XSS:** Inject malicious scripts - sanitize input, encode output
**CSRF:** Unauthorized actions - use CSRF tokens
**Authentication:** Weak passwords, session issues - strong auth
**Data Exposure:** Sensitive data leaked - proper encryption

---

## C) Why This Concept Exists

### The Problem

**Without Security Practices:**
- Vulnerable to attacks
- Data breaches
- User accounts compromised
- Reputation damage
- Legal issues

### The Solution

**Best Practices Provide:**
1. **Protection:** Against common attacks
2. **Compliance:** Security standards
3. **Trust:** User confidence
4. **Prevention:** Proactive security
5. **Defense:** Multiple layers

---

## D) Practical Example (Code)

```javascript
// ============================================
// HELMET.JS - SECURITY HEADERS
// ============================================

const helmet = require('helmet');
app.use(helmet());

// Sets various HTTP headers for security:
// - Content-Security-Policy
// - X-Frame-Options
// - X-Content-Type-Options
// - Strict-Transport-Security
// etc.

// ============================================
// CORS CONFIGURATION
// ============================================

const cors = require('cors');

app.use(cors({
  origin: process.env.ALLOWED_ORIGINS.split(','),
  credentials: true,
  optionsSuccessStatus: 200
}));

// ============================================
// INPUT VALIDATION
// ============================================

const { body, validationResult } = require('express-validator');

app.post('/users', [
  body('email').isEmail().normalizeEmail(),
  body('name').trim().escape(),
  body('age').isInt({ min: 0, max: 120 })
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Process validated data
});

// ============================================
// SQL INJECTION PREVENTION
// ============================================

// ❌ WRONG - SQL Injection vulnerable
// const query = `SELECT * FROM users WHERE email = '${email}'`;

// ✅ CORRECT - Parameterized queries
const query = 'SELECT * FROM users WHERE email = ?';
db.query(query, [email], (err, results) => {
  // Safe
});

// OR use ORM (Mongoose, Sequelize)
User.findOne({ email: email }); // Safe

// ============================================
// XSS PREVENTION
// ============================================

const escapeHtml = require('escape-html');

function sanitizeInput(input) {
  return escapeHtml(input.trim());
}

// OR use DOMPurify for HTML content

// ============================================
// CSRF PROTECTION
// ============================================

const csrf = require('csurf');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(csrf({ cookie: true }));

app.get('/form', (req, res) => {
  res.render('form', { csrfToken: req.csrfToken() });
});

app.post('/submit', (req, res) => {
  // CSRF token automatically validated
});

// ============================================
// RATE LIMITING
// ============================================

const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use('/api/', limiter);

// ============================================
// SECURE COOKIES
// ============================================

app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // HTTPS only
    httpOnly: true, // No JavaScript access
    sameSite: 'strict', // CSRF protection
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// ============================================
// SECRETS MANAGEMENT
// ============================================

// ❌ WRONG
const apiKey = 'sk_live_12345'; // In code

// ✅ CORRECT
const apiKey = process.env.API_KEY; // From environment

// Use .env file (don't commit!)
// Use secret management services in production

// ============================================
// ERROR HANDLING (No Information Leakage)
// ============================================

app.use((err, req, res, next) => {
  // Log full error
  console.error(err);
  
  // Don't expose details to client
  if (process.env.NODE_ENV === 'production') {
    res.status(500).json({
      error: 'Internal server error'
    });
  } else {
    res.status(500).json({
      error: err.message,
      stack: err.stack
    });
  }
});

// ============================================
// DEPENDENCY SECURITY
// ============================================

// Regularly update dependencies
// npm audit
// npm audit fix

// Use Snyk, Dependabot for monitoring

// ============================================
// HTTPS ENFORCEMENT
// ============================================

const express = require('express');
const app = express();

// Redirect HTTP to HTTPS
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.header('host')}${req.url}`);
    } else {
      next();
    }
  });
}
```

---

## E) Internal Working

Security practices work at multiple layers:
- **Input Layer:** Validation, sanitization
- **Application Layer:** Authentication, authorization
- **Data Layer:** Encryption, secure storage
- **Network Layer:** HTTPS, secure headers
- **Infrastructure:** Security monitoring, updates

---

## F) Interview Questions & Answers

### Q1: What are essential security practices for Node.js applications?

**Answer:**
Essential practices: Use Helmet for security headers, validate and sanitize all input, use parameterized queries (prevent SQL injection), implement rate limiting, use HTTPS, secure cookies (httpOnly, secure, sameSite), store secrets in environment variables, keep dependencies updated, implement proper error handling without information leakage, use CSRF protection.

### Q2: How do you prevent SQL Injection?

**Answer:**
Use parameterized queries or prepared statements instead of string concatenation. Use ORMs (Mongoose, Sequelize) which handle this automatically. Never trust user input, always validate and sanitize. Parameterized queries separate SQL code from data, preventing injection.

### Q3: How do you prevent XSS attacks?

**Answer:**
Sanitize all user input, escape output when rendering (use libraries like DOMPurify for HTML), use Content-Security-Policy headers, validate input on server-side, use template engines with auto-escaping. Never render user input directly without sanitization.

---

## G) Common Mistakes

### Mistake 1: Secrets in Code

```javascript
// ❌ WRONG
const apiKey = 'sk_live_12345';

// ✅ CORRECT
const apiKey = process.env.API_KEY;
```

**Why it breaks:** Secrets in code are exposed in version control.

### Mistake 2: No Input Validation

```javascript
// ❌ WRONG
app.post('/users', (req, res) => {
  createUser(req.body); // No validation
});

// ✅ CORRECT
app.post('/users', validateUser, createUser);
```

**Why it breaks:** Malicious input can cause attacks.

---

## H) When to Use & When NOT to Use

All security practices should be used in production applications. Don't skip security even in development - build secure from start.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain Security Best Practices."

**You:**
"Security best practices protect applications from common vulnerabilities. Key practices: Use Helmet for security headers, validate/sanitize all input (prevent XSS, injection), use parameterized queries (prevent SQL injection), implement rate limiting, use HTTPS, secure cookies (httpOnly, secure, sameSite), store secrets in environment variables, keep dependencies updated, proper error handling without information leakage, CSRF protection. Security should be implemented at multiple layers - input, application, data, network."

---

## J) Mini Practice Task

Implement comprehensive security measures: Helmet, input validation, rate limiting, secure cookies, CSRF protection, and proper error handling.

---

**END OF TOPIC: SECURITY BEST PRACTICES**

