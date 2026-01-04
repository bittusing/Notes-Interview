# JWT INTERNALS

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**JWT (JSON Web Token) kya hai?**
- JWT ek compact, URL-safe token format hai
- JSON objects ko encode karta hai
- Stateless authentication ke liye use hota hai
- Three parts: Header.Payload.Signature
- Self-contained token hai

**Real-life Analogy:**
- Airport boarding pass
- JWT = Boarding pass
- Information token mein embed hota hai
- Security check (signature verification) karke verify karte hain
- Stateless - har request mein token check karte hain

**JWT Structure:**
- **Header:** Algorithm aur type
- **Payload:** Claims (data)
- **Signature:** Verification ke liye

### JWT Components

**1. Header:**
```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```
- Algorithm specify karta hai
- Token type (JWT)

**2. Payload:**
```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022
}
```
- Claims (data) store hote hain
- Registered claims (sub, iat, exp)
- Public claims
- Private claims

**3. Signature:**
```
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret
)
```
- Header + Payload + Secret se banata hai
- Tampering detect karne ke liye

### How JWT Works

**Token Creation:**
1. Header create karo
2. Payload create karo (claims)
3. Signature generate karo
4. Base64 encode karo
5. Combine: Header.Payload.Signature

**Token Verification:**
1. Token ko parts mein split karo
2. Signature verify karo
3. Expiry check karo
4. Claims extract karo
5. User authenticate karo

### JWT Advantages

**Stateless:**
- Server side session store nahi chahiye
- Scalable
- Distributed systems ke liye perfect

**Self-Contained:**
- All information token mein
- Database lookup nahi chahiye (usually)
- Fast authentication

**Security:**
- Signed tokens
- Tampering detection
- Expiry support

---

## B) Easy English Theory

### What is JWT?

JWT (JSON Web Token) is a compact, URL-safe token format for securely transmitting information. It consists of three parts: Header (algorithm and type), Payload (claims/data), and Signature (for verification). Tokens are base64-encoded and separated by dots.

### How It Works

Token creation: Encode header and payload, create signature using secret, combine as Header.Payload.Signature. Token verification: Split token, verify signature, check expiry, extract claims. JWT is stateless and self-contained, making it ideal for distributed systems.

---

## C) Why This Concept Exists

### The Problem

**Without JWT:**
- Server-side sessions needed
- Session storage required
- Scalability issues
- Database lookups for each request
- Stateful architecture

### The Solution

**JWT Provides:**
1. **Stateless:** No server-side storage
2. **Scalable:** Works across servers
3. **Self-Contained:** All info in token
4. **Secure:** Signed and verified
5. **Flexible:** Custom claims

---

## D) Practical Example (Code)

```javascript
// ============================================
// JWT CREATION
// ============================================

const jwt = require('jsonwebtoken');

const payload = {
  userId: 123,
  email: 'user@example.com',
  role: 'admin'
};

const secret = 'your-secret-key';

// Create token
const token = jwt.sign(payload, secret, {
  expiresIn: '1h',
  issuer: 'your-app',
  audience: 'your-users'
});

console.log(token);
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywiZW1haWwiOiJ1c2VyQGV4YW1wbGUuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE1MTYyNDI2MjJ9.signature

// ============================================
// JWT VERIFICATION
// ============================================

try {
  const decoded = jwt.verify(token, secret);
  console.log(decoded);
  // { userId: 123, email: 'user@example.com', role: 'admin', iat: 1516239022, exp: 1516242622 }
} catch (error) {
  if (error.name === 'TokenExpiredError') {
    console.error('Token expired');
  } else if (error.name === 'JsonWebTokenError') {
    console.error('Invalid token');
  }
}

// ============================================
// JWT MIDDLEWARE
// ============================================

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  
  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
}

app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Protected route', user: req.user });
});

// ============================================
// REFRESH TOKEN PATTERN
// ============================================

function generateTokens(user) {
  const accessToken = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
  );
  
  const refreshToken = jwt.sign(
    { userId: user.id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  );
  
  return { accessToken, refreshToken };
}

// ============================================
// CUSTOM CLAIMS
// ============================================

const token = jwt.sign({
  userId: 123,
  permissions: ['read', 'write'],
  customData: { department: 'IT' }
}, secret, { expiresIn: '1h' });

// ============================================
// RSA SIGNATURE (ASYMMETRIC)
// ============================================

const fs = require('fs');
const privateKey = fs.readFileSync('private.key');
const publicKey = fs.readFileSync('public.key');

// Sign with private key
const token = jwt.sign(payload, privateKey, { algorithm: 'RS256' });

// Verify with public key
const decoded = jwt.verify(token, publicKey, { algorithm: 'RS256' });
```

---

## E) Internal Working

### Step-by-Step Internal Flow

**1. Token Creation:**
```
Create header (algorithm, type)
    ↓
Create payload (claims)
    ↓
Base64 encode header
    ↓
Base64 encode payload
    ↓
Create signature (header.payload + secret)
    ↓
Combine: header.payload.signature
```

**2. Token Verification:**
```
Split token by '.'
    ↓
Extract header, payload, signature
    ↓
Recreate signature with secret
    ↓
Compare signatures
    ↓
If match → Verify expiry
    ↓
If valid → Extract claims
```

---

## F) Interview Questions & Answers

### Q1: What is JWT and how does it work?

**Answer:**
JWT (JSON Web Token) is a compact token format with three parts: Header (algorithm), Payload (claims), and Signature. Tokens are created by encoding header and payload, creating a signature with a secret, and combining them. Verification involves splitting the token, recreating and comparing the signature, and checking expiry.

### Q2: What are the advantages of JWT?

**Answer:**
JWT is stateless (no server-side storage), scalable (works across servers), self-contained (all info in token), secure (signed), and flexible (custom claims). It's ideal for distributed systems and microservices architectures.

### Q3: What's the difference between access tokens and refresh tokens?

**Answer:**
Access tokens are short-lived (15-60 minutes) and used for API access. Refresh tokens are long-lived (days/weeks) and used to get new access tokens. Access tokens in payload, refresh tokens stored securely. This balances security and user experience.

### Q4: How do you secure JWT tokens?

**Answer:**
Use strong secrets, set appropriate expiry times, use HTTPS only, store tokens securely (httpOnly cookies preferred over localStorage), implement refresh tokens, validate tokens on every request, use appropriate algorithms (HS256 for symmetric, RS256 for asymmetric).

### Q5: What happens if a JWT token is stolen?

**Answer:**
If stolen, attackers can use it until expiry. Mitigations: Short expiry times, refresh token rotation, token revocation lists, detect unusual activity, use httpOnly cookies, implement device fingerprinting, monitor token usage.

---

## G) Common Mistakes

### Mistake 1: Storing Sensitive Data

```javascript
// ❌ WRONG
const token = jwt.sign({
  password: user.password, // Never!
  creditCard: user.cardNumber // Never!
}, secret);

// ✅ CORRECT
const token = jwt.sign({
  userId: user.id,
  email: user.email // Only non-sensitive data
}, secret);
```

**Why it breaks:** JWT is base64 encoded, not encrypted. Anyone can decode and read payload.

### Mistake 2: Weak Secrets

```javascript
// ❌ WRONG
const secret = 'secret'; // Too weak

// ✅ CORRECT
const secret = process.env.JWT_SECRET; // Strong, random, from env
```

**Why it breaks:** Weak secrets can be brute-forced.

### Mistake 3: No Expiry

```javascript
// ❌ WRONG
const token = jwt.sign(payload, secret); // No expiry

// ✅ CORRECT
const token = jwt.sign(payload, secret, { expiresIn: '1h' });
```

**Why it breaks:** Tokens never expire, permanent security risk if stolen.

---

## H) When to Use & When NOT to Use

### When JWT is Ideal

**1. Stateless Authentication**
- Microservices
- Distributed systems
- API authentication
- Mobile apps

**2. Scalability**
- Multiple servers
- Load balancing
- No shared session store

### When NOT to Use

**1. Token Revocation Needed**
- Immediate logout required
- Token blacklisting needed
- Use sessions instead

**2. Large Payloads**
- Don't store too much data
- JWT size increases
- Performance impact

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain JWT."

**You:**
"JWT (JSON Web Token) is a stateless authentication token with three parts: Header (algorithm), Payload (claims), and Signature. Tokens are created by encoding header and payload, signing with a secret, and combining them. Verification involves signature verification and expiry checks.

JWT is stateless, self-contained, and scalable - perfect for distributed systems. Use access tokens (short-lived) for API access and refresh tokens (long-lived) for getting new access tokens. Secure with strong secrets, appropriate expiry, HTTPS, and secure storage. Don't store sensitive data in JWTs as they're encoded, not encrypted."

---

## J) Mini Practice Task

Create a JWT authentication system with access/refresh tokens, middleware, and secure token handling.

---

**END OF TOPIC: JWT INTERNALS**

