# REACT ROUTER & NAVIGATION

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**React Router kya hai?**
- React Router navigation library hai
- Single Page Applications (SPA) ke liye
- URL-based routing
- Client-side routing
- No page refresh

**Real-life Analogy:**
- React Router = GPS navigation
- Routes = Different destinations
- Navigation = Travel between destinations
- URL = Address

**React Router Components:**
- **BrowserRouter:** Router wrapper
- **Routes/Route:** Route definitions
- **Link:** Navigation links
- **Navigate:** Programmatic navigation
- **useNavigate:** Navigation hook
- **useParams:** URL parameters

**Routing Concepts:**
- **Nested Routes:** Routes inside routes
- **Route Parameters:** Dynamic segments
- **Query Parameters:** URL query strings
- **Protected Routes:** Authentication required
- **Lazy Loading:** Code splitting

---

## B) Easy English Theory

### What is React Router?

React Router is navigation library for React applications. Enables client-side routing (no page refresh), URL-based navigation, single-page applications. Components: BrowserRouter (router wrapper), Routes/Route (route definitions), Link (navigation links), Navigate (redirect), useNavigate (navigation hook), useParams (URL parameters). Features: Nested routes, route parameters, protected routes, lazy loading.

---

## C) Why This Concept Exists

### The Problem

**Without Router:**
- No URL-based navigation
- Page refresh on navigation
- No browser history
- Difficult deep linking
- Poor UX

### The Solution

**React Router Provides:**
1. **Client-side Routing:** No page refresh
2. **URL Navigation:** Browser URL updates
3. **History:** Browser back/forward
4. **Deep Linking:** Direct URL access
5. **Better UX:** Smooth navigation

---

## D) Practical Example (Code)

```jsx
// ============================================
// BASIC ROUTING SETUP
// ============================================

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/users">Users</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users" element={<Users />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

// ============================================
// ROUTE PARAMETERS
// ============================================

import { useParams } from 'react-router-dom';

function UserProfile() {
  const { userId } = useParams();
  
  return <div>User ID: {userId}</div>;
}

function App() {
  return (
    <Routes>
      <Route path="/users/:userId" element={<UserProfile />} />
    </Routes>
  );
}

// ============================================
// NAVIGATION
// ============================================

import { useNavigate } from 'react-router-dom';

function LoginButton() {
  const navigate = useNavigate();
  
  const handleLogin = () => {
    // Perform login
    navigate('/dashboard');
  };
  
  return <button onClick={handleLogin}>Login</button>;
}

// Navigate with state
function ProductCard({ product }) {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/products/${product.id}`, {
      state: { product }
    });
  };
  
  return <div onClick={handleClick}>{product.name}</div>;
}

// ============================================
// NESTED ROUTES
// ============================================

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <nav>
        <Link to="profile">Profile</Link>
        <Link to="settings">Settings</Link>
      </nav>
      <Routes>
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
    </Routes>
  );
}

// ============================================
// PROTECTED ROUTES
// ============================================

function ProtectedRoute({ children }) {
  const isAuthenticated = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

// ============================================
// LAZY LOADING
// ============================================

import { lazy, Suspense } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/lazy" element={<LazyComponent />} />
      </Routes>
    </Suspense>
  );
}

// ============================================
// QUERY PARAMETERS
// ============================================

import { useSearchParams } from 'react-router-dom';

function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q');
  
  return (
    <div>
      <input
        value={query || ''}
        onChange={(e) => setSearchParams({ q: e.target.value })}
      />
      <p>Searching for: {query}</p>
    </div>
  );
}

// ============================================
// PROGRAMMATIC NAVIGATION
// ============================================

function useNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const goBack = () => navigate(-1);
  const goForward = () => navigate(1);
  const goTo = (path) => navigate(path);
  
  return { goBack, goForward, goTo, location };
}

// ============================================
// ROUTE CONFIGURATION
// ============================================

const routes = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/about',
    element: <About />
  },
  {
    path: '/users',
    element: <Users />,
    children: [
      { path: ':id', element: <UserProfile /> }
    ]
  }
];

function App() {
  return (
    <Routes>
      {routes.map(route => (
        <Route key={route.path} {...route} />
      ))}
    </Routes>
  );
}
```

---

## E) Internal Working

**React Router Flow:**
1. **URL Change:** Browser URL changes
2. **Router Match:** Match route to component
3. **Render:** Render matched component
4. **History:** Update browser history
5. **Navigation:** Smooth transition

**Key Mechanisms:**
- **History API:** Browser history
- **Route Matching:** URL to component
- **Nested Routing:** Route hierarchy

---

## F) Interview Questions & Answers

### Q1: What is React Router and how does it work?

**Answer:**
React Router is navigation library for React. Works by: BrowserRouter wraps app (provides routing context), Routes define route paths, Route maps path to component, Link creates navigation links, useNavigate for programmatic navigation. Process: URL change → Router matches route → Renders component → Updates history. Features: Client-side routing (no refresh), URL-based navigation, nested routes, route parameters.

### Q2: What is the difference between Link and useNavigate?

**Answer:**
Link: Declarative navigation (JSX element), creates anchor tag, good for navigation links, accessible (keyboard navigation), prevents default behavior. useNavigate: Programmatic navigation (function call), use in event handlers, conditional navigation, navigate with state, replace history. Use Link for UI links, useNavigate for programmatic navigation (after actions, conditional).

### Q3: How do you implement protected routes?

**Answer:**
Protected routes: Create ProtectedRoute component, check authentication (useAuth hook), if not authenticated redirect to login (Navigate component), wrap protected routes. Example: `<ProtectedRoute><Dashboard /></ProtectedRoute>`. Can also use route guards, higher-order components, or route configuration. Important: Check auth before rendering, redirect if not authenticated.

---

## G) Common Mistakes

### Mistake 1: Not Using Exact Path

```jsx
// ❌ WRONG - Matches all paths starting with /
<Route path="/" element={<Home />} />
<Route path="/about" element={<About />} />
// "/about" matches both

// ✅ CORRECT - Use exact or order routes
<Route path="/" element={<Home />} />
<Route path="/about" element={<About />} />
// Or use Routes (v6) which matches exactly
```

**Why it breaks:** Routes match partially, wrong components render.

---

## H) When to Use & When NOT to Use

Use React Router for: Single-page applications, client-side routing, URL-based navigation, need browser history. Don't use when: Server-side rendering only, simple static site, no navigation needed.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain React Router."

**You:"
"React Router is navigation library for React. Enables client-side routing (no page refresh), URL-based navigation. Components: BrowserRouter (wrapper), Routes/Route (definitions), Link (navigation), useNavigate (programmatic), useParams (URL params).

Features: Nested routes, route parameters, protected routes, lazy loading. Process: URL change → Match route → Render component. Use for single-page applications, need URL navigation."

---

## J) Mini Practice Task

Practice: Set up React Router, create routes, implement navigation, use route parameters, create protected routes, implement lazy loading, use query parameters.

---

**END OF TOPIC: REACT ROUTER & NAVIGATION**

