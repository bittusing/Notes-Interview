# OAUTH BASICS

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**OAuth kya hai?**
- OAuth ek authorization framework hai
- Third-party services ko limited access deta hai
- User ko password share kiye bina access deta hai
- "Login with Google/Facebook" jaisa pattern
- Access tokens use karta hai

**Real-life Analogy:**
- Hotel room key
- OAuth = Room key (limited access)
- Master key (password) nahi dete
- Sirf specific room (resources) ka access
- Key expire ho sakti hai (token expiry)

**OAuth Flow:**
1. User app ko authorize karta hai
2. Authorization code milta hai
3. Code exchange karke access token milta hai
4. Access token se resources access karte hain

### OAuth 2.0 Components

**1. Resource Owner (User):**
- User jo data ka owner hai
- Authorization deta hai

**2. Client (Your App):**
- Application jo access chahiye
- User ke behalf par kaam karta hai

**3. Authorization Server:**
- Authorization code generate karta hai
- Access tokens issue karta hai
- Google, Facebook, etc.

**4. Resource Server:**
- Protected resources host karta hai
- Access tokens verify karta hai

### OAuth Flow Types

**Authorization Code Flow:**
- Most secure
- Server-side applications
- Authorization code → Access token

**Implicit Flow:**
- Client-side applications
- Access token directly milta hai
- Less secure (deprecated)

**Client Credentials:**
- Server-to-server
- No user involved
- Service accounts

---

## B) Easy English Theory

### What is OAuth?

OAuth is an authorization framework allowing third-party services limited access without sharing passwords. Users authorize applications to access resources, and applications receive access tokens for API calls.

### Components

**Resource Owner:** User who owns data
**Client:** Application requesting access
**Authorization Server:** Issues authorization codes and tokens
**Resource Server:** Hosts protected resources

### Flow Types

**Authorization Code:** Most secure, server-side apps
**Implicit:** Client-side (deprecated)
**Client Credentials:** Server-to-server

---

## C) Why This Concept Exists

### The Problem

**Without OAuth:**
- Users must share passwords
- Security risk
- No granular permissions
- Hard to revoke access

### The Solution

**OAuth Provides:**
1. **Security:** No password sharing
2. **Granular Access:** Specific permissions
3. **Revocation:** Easy to revoke
4. **User Control:** Users control access
5. **Standard:** Industry standard

---

## D) Practical Example (Code)

```javascript
// ============================================
// OAUTH 2.0 AUTHORIZATION CODE FLOW
// ============================================

const express = require('express');
const axios = require('axios');
const app = express();

// OAuth configuration
const oauthConfig = {
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: 'http://localhost:3000/auth/callback',
  authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenUrl: 'https://oauth2.googleapis.com/token'
};

// Step 1: Redirect to authorization server
app.get('/auth/login', (req, res) => {
  const authUrl = `${oauthConfig.authorizationUrl}?` +
    `client_id=${oauthConfig.clientId}&` +
    `redirect_uri=${encodeURIComponent(oauthConfig.redirectUri)}&` +
    `response_type=code&` +
    `scope=email profile&` +
    `state=random_state_string`;
  
  res.redirect(authUrl);
});

// Step 2: Handle callback
app.get('/auth/callback', async (req, res) => {
  const { code, state } = req.query;
  
  if (!code) {
    return res.status(400).send('Authorization failed');
  }
  
  try {
    // Step 3: Exchange code for access token
    const tokenResponse = await axios.post(oauthConfig.tokenUrl, {
      code,
      client_id: oauthConfig.clientId,
      client_secret: oauthConfig.clientSecret,
      redirect_uri: oauthConfig.redirectUri,
      grant_type: 'authorization_code'
    });
    
    const { access_token, refresh_token } = tokenResponse.data;
    
    // Step 4: Use access token to get user info
    const userResponse = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` }
    });
    
    const user = userResponse.data;
    
    // Store tokens and user info
    // Create session, etc.
    
    res.json({ user, access_token });
  } catch (error) {
    res.status(500).send('Authentication failed');
  }
});

// ============================================
// PASSPORT.JS OAUTH STRATEGY
// ============================================

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  // User found or created
  const user = await findOrCreateUser(profile);
  return done(null, user);
}));

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/dashboard');
  }
);
```

---

## E) Internal Working

**1. User Authorization:**
- User clicks "Login with Google"
- Redirected to Google
- User authorizes
- Authorization code returned

**2. Token Exchange:**
- App sends code + credentials
- Server verifies
- Access token issued
- Token used for API calls

---

## F) Interview Questions & Answers

### Q1: What is OAuth and how does it work?

**Answer:**
OAuth is an authorization framework allowing third-party apps limited access without passwords. Flow: User authorizes app → Authorization code → Exchange for access token → Use token for API calls. OAuth provides secure, granular access with user control.

### Q2: What's the difference between OAuth and OAuth 2.0?

**Answer:**
OAuth 2.0 is the current version, simpler and more flexible than OAuth 1.0. OAuth 1.0 used signatures, OAuth 2.0 uses tokens. OAuth 2.0 is industry standard with better security and easier implementation.

### Q3: What are OAuth scopes?

**Answer:**
Scopes define what permissions the app requests (e.g., 'email', 'profile', 'read'). Users see requested permissions and can approve/deny. Apps should request minimum necessary scopes.

---

## G) Common Mistakes

### Mistake 1: Storing Client Secret in Client

```javascript
// ❌ WRONG - Client secret exposed
const clientSecret = 'secret123'; // In frontend!

// ✅ CORRECT - Server-side only
const clientSecret = process.env.CLIENT_SECRET; // Backend only
```

**Why it breaks:** Client secrets must stay server-side, never in client code.

---

## H) When to Use & When NOT to Use

Use OAuth for third-party login, API access, and granular permissions. Don't use for internal authentication - use JWT/sessions instead.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain OAuth."

**You:**
"OAuth is an authorization framework for third-party access without password sharing. Flow: User authorizes → Authorization code → Exchange for access token → API calls. OAuth 2.0 is current standard. Components: Resource Owner (user), Client (app), Authorization Server (Google/Facebook), Resource Server (APIs). Use for 'Login with Google/Facebook' patterns. Keep client secrets server-side only."

---

## J) Mini Practice Task

Implement OAuth 2.0 authorization code flow with Google OAuth.

---

**END OF TOPIC: OAUTH BASICS**

