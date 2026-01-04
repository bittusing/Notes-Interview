# REFRESH TOKENS

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Refresh Token kya hai?**
- Refresh Token ek long-lived token hai
- Access token ko refresh karne ke liye use hota hai
- Access token expire hone par refresh token se naya access token milta hai
- Secure storage mein store hota hai
- Access token se alag hota hai

**Real-life Analogy:**
- Bank debit card (Access Token) - daily use, expires soon
- Bank account credentials (Refresh Token) - secure, long-term
- Card expire hone par credentials se naya card milta hai
- Credentials secure location mein store hote hain

**Why Refresh Tokens?**
- Access tokens short-lived (security)
- User ko baar-baar login nahi karna padta
- Better security (access tokens expire quickly)
- Token revocation possible

### Access Token vs Refresh Token

**Access Token:**
- Short-lived (15-60 minutes)
- API requests mein use hota hai
- JWT payload mein bhejte hain
- Expire hone par naya chahiye

**Refresh Token:**
- Long-lived (days/weeks)
- New access token get karne ke liye
- Secure storage (httpOnly cookie/database)
- Rarely use hota hai

### Refresh Token Flow

**Initial Login:**
1. User credentials verify karte hain
2. Access token generate (short-lived)
3. Refresh token generate (long-lived)
4. Access token client ko milta hai
5. Refresh token secure storage mein (cookie/database)

**Token Refresh:**
1. Access token expire ho jata hai
2. Client refresh token bhejta hai
3. Server refresh token verify karta hai
4. New access token generate karta hai
5. Client ko naya access token milta hai

**Security Benefits:**
- Access tokens short-lived = less damage if stolen
- Refresh tokens secure storage = hard to steal
- Token rotation possible
- Revocation possible

---

## B) Easy English Theory

### What are Refresh Tokens?

Refresh Tokens are long-lived tokens used to obtain new access tokens. When access tokens expire, clients use refresh tokens to get new access tokens without re-authenticating. Refresh tokens are stored securely (httpOnly cookies or database) and used infrequently.

### Token Flow

Access tokens are short-lived (15-60 min) for API requests. Refresh tokens are long-lived (days/weeks) stored securely and used to get new access tokens. This balances security (short access token lifetime) with user experience (no frequent re-login).

---

## C) Why This Concept Exists

### The Problem

**Without Refresh Tokens:**
- Access tokens must be long-lived (security risk)
- Or users login frequently (poor UX)
- Stolen access tokens = long-term access
- No way to revoke tokens

### The Solution

**Refresh Tokens Provide:**
1. **Security:** Short access token lifetime
2. **UX:** No frequent re-login
3. **Revocation:** Can revoke refresh tokens
4. **Rotation:** Token rotation possible
5. **Control:** Better token management

---

## D) Practical Example (Code)

```javascript
// ============================================
// REFRESH TOKEN GENERATION
// ============================================

const jwt = require('jsonwebtoken');
const crypto = require('crypto');

function generateTokens(user) {
  // Access token - short-lived
  const accessToken = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
  );
  
  // Refresh token - long-lived, random
  const refreshToken = crypto.randomBytes(40).toString('hex');
  
  // Store refresh token in database
  // await saveRefreshToken(user.id, refreshToken);
  
  return { accessToken, refreshToken };
}

// ============================================
// LOGIN ENDPOINT
// ============================================

app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  
  // Verify credentials
  const user = await authenticateUser(email, password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  // Generate tokens
  const { accessToken, refreshToken } = generateTokens(user);
  
  // Store refresh token in database
  await saveRefreshToken(user.id, refreshToken, '7d');
  
  // Send access token in response
  // Send refresh token in httpOnly cookie
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });
  
  res.json({
    accessToken,
    user: { id: user.id, email: user.email }
  });
});

// ============================================
// REFRESH TOKEN ENDPOINT
// ============================================

app.post('/auth/refresh', async (req, res) => {
  const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
  
  if (!refreshToken) {
    return res.status(401).json({ error: 'Refresh token required' });
  }
  
  // Verify refresh token exists in database
  const tokenData = await findRefreshToken(refreshToken);
  if (!tokenData || tokenData.expiresAt < new Date()) {
    return res.status(403).json({ error: 'Invalid or expired refresh token' });
  }
  
  // Get user
  const user = await getUserById(tokenData.userId);
  if (!user) {
    return res.status(403).json({ error: 'User not found' });
  }
  
  // Generate new access token
  const accessToken = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
  );
  
  // Optional: Rotate refresh token
  await revokeRefreshToken(refreshToken);
  const newRefreshToken = crypto.randomBytes(40).toString('hex');
  await saveRefreshToken(user.id, newRefreshToken, '7d');
  
  res.cookie('refreshToken', newRefreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
  
  res.json({ accessToken });
});

// ============================================
// LOGOUT WITH TOKEN REVOCATION
// ============================================

app.post('/auth/logout', async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  
  if (refreshToken) {
    // Revoke refresh token
    await revokeRefreshToken(refreshToken);
  }
  
  // Clear cookie
  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out successfully' });
});

// ============================================
// DATABASE FUNCTIONS
// ============================================

async function saveRefreshToken(userId, token, expiry) {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + parseInt(expiry));
  
  // MongoDB example
  await RefreshToken.create({
    userId,
    token,
    expiresAt,
    createdAt: new Date()
  });
}

async function findRefreshToken(token) {
  return await RefreshToken.findOne({
    token,
    revoked: false,
    expiresAt: { $gt: new Date() }
  });
}

async function revokeRefreshToken(token) {
  return await RefreshToken.updateOne(
    { token },
    { revoked: true, revokedAt: new Date() }
  );
}

// ============================================
// REFRESH TOKEN MIDDLEWARE
// ============================================

async function authenticateWithRefresh(req, res, next) {
  const authHeader = req.headers['authorization'];
  const accessToken = authHeader && authHeader.split(' ')[1];
  
  if (accessToken) {
    try {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      req.user = decoded;
      return next();
    } catch (error) {
      if (error.name !== 'TokenExpiredError') {
        return res.status(403).json({ error: 'Invalid token' });
      }
      // Token expired, try refresh
    }
  }
  
  // Try to refresh
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  
  // Verify and get new access token
  const tokenData = await findRefreshToken(refreshToken);
  if (!tokenData) {
    return res.status(403).json({ error: 'Invalid refresh token' });
  }
  
  const user = await getUserById(tokenData.userId);
  const newAccessToken = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
  );
  
  req.user = { userId: user.id, email: user.email };
  res.setHeader('X-New-Access-Token', newAccessToken);
  next();
}

// ============================================
// TOKEN ROTATION
// ============================================

app.post('/auth/refresh', async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  
  const tokenData = await findRefreshToken(refreshToken);
  if (!tokenData) {
    return res.status(403).json({ error: 'Invalid refresh token' });
  }
  
  // Revoke old refresh token
  await revokeRefreshToken(refreshToken);
  
  // Generate new tokens
  const user = await getUserById(tokenData.userId);
  const accessToken = jwt.sign(
    { userId: user.id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
  );
  
  const newRefreshToken = crypto.randomBytes(40).toString('hex');
  await saveRefreshToken(user.id, newRefreshToken, '7d');
  
  res.cookie('refreshToken', newRefreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
  
  res.json({ accessToken });
});

// ============================================
// REFRESH TOKEN SCHEMA (MongoDB)
// ============================================

const refreshTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  token: {
    type: String,
    required: true,
    unique: true
  },
  expiresAt: {
    type: Date,
    required: true
  },
  revoked: {
    type: Boolean,
    default: false
  },
  revokedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for cleanup
refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
refreshTokenSchema.index({ userId: 1, revoked: 1 });
```

---

## E) Internal Working

### Step-by-Step Internal Flow

**1. Login Flow:**
```
User authenticates
    ↓
Generate access token (short-lived)
    ↓
Generate refresh token (random, long-lived)
    ↓
Store refresh token in database
    ↓
Send access token + refresh token (cookie)
```

**2. Token Refresh Flow:**
```
Access token expires
    ↓
Client sends refresh token
    ↓
Verify refresh token in database
    ↓
Check if revoked/expired
    ↓
Generate new access token
    ↓
Optional: Rotate refresh token
    ↓
Return new tokens
```

---

## F) Interview Questions & Answers

### Q1: What are Refresh Tokens and why are they used?

**Answer:**
Refresh Tokens are long-lived tokens used to obtain new access tokens. They allow short-lived access tokens (better security) while avoiding frequent user logins (better UX). Refresh tokens are stored securely and used infrequently to get new access tokens when they expire.

### Q2: How do Refresh Tokens improve security?

**Answer:**
Refresh tokens enable short-lived access tokens (15-60 min), reducing damage if access tokens are stolen. Refresh tokens are stored securely (httpOnly cookies or database), making them harder to steal. They can be revoked and rotated, providing better token management and security control.

### Q3: Where should Refresh Tokens be stored?

**Answer:**
Refresh tokens should be stored securely. Best practices: httpOnly cookies (prevents XSS), secure flag in production (HTTPS only), sameSite flag (CSRF protection), or in database with proper indexing. Avoid localStorage due to XSS vulnerabilities.

### Q4: What is Token Rotation?

**Answer:**
Token rotation means issuing a new refresh token when refreshing an access token, and revoking the old refresh token. This limits the damage if a refresh token is stolen, as old tokens become invalid. It's a security best practice for refresh token implementation.

### Q5: How do you handle Refresh Token revocation?

**Answer:**
Store refresh tokens in database with revoked flag. On logout or security event, mark token as revoked. On refresh, check if token is revoked before issuing new access token. Also implement token expiry and cleanup expired/revoked tokens periodically.

---

## G) Common Mistakes

### Mistake 1: Storing Refresh Token in localStorage

```javascript
// ❌ WRONG - XSS vulnerable
localStorage.setItem('refreshToken', refreshToken);

// ✅ CORRECT - httpOnly cookie
res.cookie('refreshToken', refreshToken, {
  httpOnly: true,
  secure: true
});
```

**Why it breaks:** localStorage is accessible via JavaScript, vulnerable to XSS attacks.

### Mistake 2: Same Expiry for Both Tokens

```javascript
// ❌ WRONG
const accessToken = jwt.sign(payload, secret, { expiresIn: '7d' });
const refreshToken = jwt.sign(payload, secret, { expiresIn: '7d' });

// ✅ CORRECT
const accessToken = jwt.sign(payload, secret, { expiresIn: '15m' });
const refreshToken = crypto.randomBytes(40).toString('hex'); // Store with 7d expiry
```

**Why it breaks:** Defeats the purpose - access tokens should be short-lived.

### Mistake 3: Not Revoking Tokens on Logout

```javascript
// ❌ WRONG
app.post('/logout', (req, res) => {
  res.clearCookie('refreshToken'); // Only clears cookie, token still valid in DB
  res.json({ message: 'Logged out' });
});

// ✅ CORRECT
app.post('/logout', async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (refreshToken) {
    await revokeRefreshToken(refreshToken);
  }
  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out' });
});
```

**Why it breaks:** Token remains valid in database, can be used even after logout.

---

## H) When to Use & When NOT to Use

### When Refresh Tokens are Essential

**1. Production Applications**
- User-facing applications
- Security-critical systems
- Long session requirements
- Token revocation needed

**2. Mobile/Web Apps**
- Better UX (no frequent login)
- Secure token management
- Token rotation
- Multi-device support

### When NOT to Use

**1. Simple APIs**
- Internal APIs
- Service-to-service
- Short-lived sessions OK
- No revocation needed

**2. Stateless Systems**
- Pure stateless (only access tokens)
- No database for tokens
- Simpler architecture acceptable

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain Refresh Tokens."

**You:**
"Refresh Tokens are long-lived tokens used to get new access tokens. Access tokens are short-lived (15-60 min) for security, but refresh tokens are long-lived (days/weeks) stored securely. When access tokens expire, clients use refresh tokens to get new ones without re-login.

Store refresh tokens in httpOnly cookies or database. Implement token rotation - issue new refresh token and revoke old one on refresh. Revoke tokens on logout. This balances security (short access token lifetime) with UX (no frequent login). Refresh tokens should be random strings, not JWTs, and stored securely."

---

## J) Mini Practice Task

Create a complete refresh token system with login, refresh endpoint, logout with revocation, and token rotation.

---

**END OF TOPIC: REFRESH TOKENS**

