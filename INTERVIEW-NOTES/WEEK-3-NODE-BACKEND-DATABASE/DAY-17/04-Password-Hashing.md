# PASSWORD HASHING

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Password Hashing kya hai?**
- Password ko one-way function se transform karna
- Original password recover nahi kar sakte
- Hash compare karke verify karte hain
- Security ke liye critical
- bcrypt, argon2, scrypt use hote hain

**Real-life Analogy:**
- Fingerprint scanner
- Password = Fingerprint
- Hashing = Digital fingerprint
- Verify = Fingerprint match
- Original recover nahi kar sakte

**Why Hash?**
- Plain passwords = security risk
- Database leak = passwords exposed
- Hashed passwords = one-way, secure
- Rainbow tables se protect

### Hashing vs Encryption

**Hashing:**
- One-way function
- Cannot reverse
- Same input = same output
- Password verification

**Encryption:**
- Two-way function
- Can decrypt
- Keys required
- Data storage

### Hashing Algorithms

**bcrypt:**
- Widely used
- Adaptive (cost factor)
- Salt included
- Slow by design

**argon2:**
- Modern, secure
- Memory-hard
- Password hashing competition winner
- Best security

**scrypt:**
- Memory-hard
- Good security
- Used by some systems

---

## B) Easy English Theory

### What is Password Hashing?

Password Hashing converts passwords to fixed-length strings using one-way functions. Original passwords cannot be recovered. Verification compares hash of input password with stored hash. Essential for security.

### Algorithms

**bcrypt:** Widely used, adaptive cost, salt included
**argon2:** Modern, memory-hard, best security
**scrypt:** Memory-hard, good security

---

## C) Why This Concept Exists

### The Problem

**Without Hashing:**
- Plain passwords in database
- Database leak = all passwords exposed
- Security breach
- User accounts compromised

### The Solution

**Hashing Provides:**
1. **Security:** One-way transformation
2. **Protection:** Database leak safe
3. **Verification:** Compare hashes
4. **Standards:** Industry-standard algorithms

---

## D) Practical Example (Code)

```javascript
// ============================================
// BCRYPT PASSWORD HASHING
// ============================================

const bcrypt = require('bcrypt');

// Hash password
async function hashPassword(password) {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
}

// Verify password
async function verifyPassword(password, hash) {
  const match = await bcrypt.compare(password, hash);
  return match;
}

// Usage
const password = 'userpassword123';
const hash = await hashPassword(password);
// Store hash in database

// Login
const inputPassword = 'userpassword123';
const isValid = await verifyPassword(inputPassword, hash);
// true if match

// ============================================
// USER REGISTRATION
// ============================================

app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Store user with hashed password
  const user = await User.create({
    email,
    password: hashedPassword // Never store plain password!
  });
  
  res.json({ id: user.id, email: user.email });
});

// ============================================
// USER LOGIN
// ============================================

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  // Find user
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  // Verify password
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  // Generate tokens, etc.
  res.json({ message: 'Login successful' });
});

// ============================================
// ARGON2 PASSWORD HASHING
// ============================================

const argon2 = require('argon2');

async function hashPasswordArgon2(password) {
  const hash = await argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 2 ** 16, // 64 MB
    timeCost: 3,
    parallelism: 1
  });
  return hash;
}

async function verifyPasswordArgon2(password, hash) {
  try {
    if (await argon2.verify(hash, password)) {
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
}
```

---

## E) Internal Working

**1. Hashing:**
- Password + salt input
- Hash function applies
- Fixed-length hash output
- Hash stored

**2. Verification:**
- Input password + stored salt
- Hash function applies
- Compare with stored hash
- Match = valid

---

## F) Interview Questions & Answers

### Q1: Why hash passwords instead of encrypting them?

**Answer:**
Hashing is one-way (cannot reverse), while encryption is two-way (can decrypt). For passwords, we only need verification, not recovery. Hashing ensures even if database is leaked, passwords cannot be recovered. Encryption requires key management and allows decryption.

### Q2: What is a salt and why is it important?

**Answer:**
Salt is random data added to password before hashing. It prevents rainbow table attacks (pre-computed hash tables) and ensures same passwords produce different hashes. Each password should have unique salt. Modern algorithms like bcrypt include salt automatically.

### Q3: What's the difference between bcrypt and argon2?

**Answer:**
bcrypt is widely used, adaptive cost factor, includes salt. argon2 is modern, memory-hard (resistant to GPU/ASIC attacks), winner of password hashing competition, generally more secure. argon2 is recommended for new applications, bcrypt is still secure and widely supported.

---

## G) Common Mistakes

### Mistake 1: Storing Plain Passwords

```javascript
// ❌ WRONG
const user = {
  email: 'user@example.com',
  password: 'plainpassword' // Never!
};

// ✅ CORRECT
const hashedPassword = await bcrypt.hash(password, 10);
const user = {
  email: 'user@example.com',
  password: hashedPassword
};
```

**Why it breaks:** Plain passwords are exposed if database is leaked.

### Mistake 2: Weak Hashing (MD5, SHA1)

```javascript
// ❌ WRONG - Fast, insecure
const hash = crypto.createHash('md5').update(password).digest('hex');

// ✅ CORRECT - Slow, secure
const hash = await bcrypt.hash(password, 10);
```

**Why it breaks:** Fast hashes are vulnerable to brute force attacks.

---

## H) When to Use & When NOT to Use

Always hash passwords before storage. Use bcrypt or argon2. Never store plain passwords or use weak hashes (MD5, SHA1).

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain Password Hashing."

**You:**
"Password Hashing converts passwords to one-way hashes using algorithms like bcrypt or argon2. Original passwords cannot be recovered. Verification compares hash of input with stored hash. Use salts (bcrypt includes automatically) to prevent rainbow tables. Never store plain passwords - always hash before storage. bcrypt and argon2 are slow by design to resist brute force attacks."

---

## J) Mini Practice Task

Implement password hashing and verification with bcrypt for user registration and login.

---

**END OF TOPIC: PASSWORD HASHING**

