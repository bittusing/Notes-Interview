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

/**
 * REACT ROUTER KYA HAI? (HINGLISH)
 *
 * React Router ek navigation library hai jo React applications mein client-side
 * routing enable karti hai. Ye Single Page Applications (SPA) ke liye use hoti hai,
 * jahan page refresh ke bina navigation ho sakti hai.
 *
 * Simple Definition:
 * - Navigation library for React
 * - Client-side routing (no page refresh)
 * - URL-based navigation
 * - Single Page Applications (SPA) ke liye
 *
 * Real-life Analogy:
 * 1. GPS Navigation:
 *    - Jaise GPS mein destinations (routes) hote hain
 *    - React Router bhi waise hi - different routes (pages) define karte hain
 *    - Navigation smooth hota hai (page refresh nahi)
 *    - URL se directly kisi page par ja sakte ho
 *
 * 2. Building Floor Plan:
 *    - Jaise building mein different floors (routes) hote hain
 *    - React Router bhi waise hi - different routes (pages) hote hain
 *    - Elevator (Router) se direct kisi floor (route) par ja sakte ho
 *    - URL address ki tarah kaam karta hai
 *
 * React Router Components:
 * - **BrowserRouter:** Router wrapper (provides routing context)
 * - **Routes:** Container for route definitions
 * - **Route:** Maps path to component
 * - **Link:** Navigation link (replaces anchor tag)
 * - **Navigate:** Programmatic redirect
 * - **useNavigate:** Navigation hook
 * - **useParams:** URL parameters access
 *
 * How React Router Works:
 * 1. BrowserRouter app ko wrap karta hai
 * 2. URL change detect hota hai
 * 3. Router matches URL to route
 * 4. Matched component render hota hai
 * 5. Page refresh nahi hota (client-side routing)
 *
 * Benefits:
 * - **SPA:** Single Page Application support
 * - **No Refresh:** Smooth navigation without page reload
 * - **URL History:** Browser back/forward buttons work
 * - **Deep Linking:** Direct URL access to any page
 * - **Better UX:** Fast navigation, smooth transitions
 *
 * REACT ROUTER - EASY ENGLISH EXPLANATION
 *
 * React Router is a navigation library that enables client-side routing in React
 * applications. It's used for Single Page Applications (SPA) where navigation
 * happens without page refresh.
 *
 * Key Concepts:
 * - **Client-side Routing:** Navigation without page refresh
 * - **URL-based:** Routes defined by URL paths
 * - **SPA Support:** Single Page Application architecture
 * - **History API:** Uses browser History API
 *
 * React Router Components:
 * - **BrowserRouter:** Router wrapper (provides context)
 * - **Routes:** Container for route definitions
 * - **Route:** Maps path to component
 * - **Link:** Navigation link component
 * - **Navigate:** Programmatic redirect
 * - **useNavigate:** Hook for navigation
 * - **useParams:** Access URL parameters
 *
 * How It Works:
 * 1. BrowserRouter wraps application
 * 2. URL changes detected
 * 3. Router matches URL to route
 * 4. Matched component renders
 * 5. No page refresh (client-side)
 *
 * Benefits:
 * - **SPA:** Single Page Application support
 * - **No Refresh:** Smooth navigation
 * - **History:** Browser back/forward works
 * - **Deep Linking:** Direct URL access
 * - **Better UX:** Fast, smooth navigation
 */

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

/**
 * ROUTE PARAMETERS KYA HAI? (HINGLISH)
 *
 * Route Parameters URL mein dynamic segments hote hain jo route path mein
 * colon (:) se define kiye jate hain. Ye different values ke liye same route
 * component use karne dete hain.
 *
 * Simple Definition:
 * - URL mein dynamic values
 * - Colon (:) se define hote hain
 * - useParams hook se access karte hain
 * - Same component different data ke saath
 *
 * Real-life Analogy:
 * 1. Variable in Address:
 *    - Jaise "/users/:id" mein :id variable hai
 *    - /users/1, /users/2, /users/3 sab same route par
 *    - Id different hai, par same component use hota hai
 *    - Route Parameters bhi waise hi - dynamic values
 *
 * 2. Template with Variables:
 *    - Jaise email template mein {{name}} variable hota hai
 *    - Route Parameters bhi waise hi - :userId, :productId, etc.
 *    - Values dynamic hote hain, structure same
 *
 * Route Parameters Usage:
 * - Dynamic routes: /users/:userId, /products/:productId
 * - useParams hook se access: const { userId } = useParams()
 * - Same component, different data
 * - Flexible routing
 *
 * ROUTE PARAMETERS - EASY ENGLISH EXPLANATION
 *
 * Route Parameters are dynamic segments in URLs defined with colon (:). They allow
 * using the same route component with different values.
 *
 * Key Concepts:
 * - **Dynamic Segments:** Values that change in URL
 * - **Colon Syntax:** Defined with : (e.g., :userId)
 * - **useParams Hook:** Access parameter values
 * - **Same Component:** Different data, same component
 */

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

/**
 * NAVIGATION KYA HAI? (HINGLISH)
 *
 * Navigation React Router mein pages/ routes ke beech move karne ka tarika hai.
 * Do tarike se navigation kar sakte ho - Link component (declarative) ya
 * useNavigate hook (programmatic).
 *
 * Simple Definition:
 * - Pages/ routes ke beech move karna
 * - Link: Declarative navigation (JSX)
 * - useNavigate: Programmatic navigation (function)
 * - Smooth navigation without page refresh
 *
 * Real-life Analogy:
 * 1. Navigation Buttons:
 *    - Jaise GPS mein "Turn Left", "Go Straight" buttons hote hain
 *    - Link component bhi waise hi - declarative navigation button
 *    - useNavigate bhi waise hi - programmatic navigation command
 *
 * 2. Door Access:
 *    - Jaise aap door handle se directly room mein jate ho (Link)
 *    - Ya command se door open hota hai (useNavigate)
 *    - Dono tarike se navigation, different methods
 *
 * Link vs useNavigate:
 * - **Link:** Declarative, JSX element, for navigation links
 * - **useNavigate:** Programmatic, function call, for conditional navigation
 * - **Link:** User clicks button/link
 * - **useNavigate:** After action/condition
 *
 * NAVIGATION - EASY ENGLISH EXPLANATION
 *
 * Navigation in React Router is the way to move between pages/routes. Two methods:
 * Link component (declarative) or useNavigate hook (programmatic).
 *
 * Key Concepts:
 * - **Link:** Declarative navigation (JSX element)
 * - **useNavigate:** Programmatic navigation (function)
 * - **Smooth:** No page refresh
 * - **History:** Browser history maintained
 */

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

/**
 * PROTECTED ROUTES KYA HAI? (HINGLISH)
 *
 * Protected Routes wo routes hain jo authentication check karte hain before
 * allowing access. Agar user authenticated nahi hai, to login page par redirect
 * kar dete hain.
 *
 * Simple Definition:
 * - Authentication required routes
 * - Login check karta hai
 * - Unauthenticated users ko redirect karta hai
 * - Security feature
 *
 * Real-life Analogy:
 * 1. VIP Area:
 *    - Jaise club mein VIP area hota hai jahan entry ke liye pass chahiye
 *    - Protected Routes bhi waise hi - authentication pass chahiye
 *    - Bina pass ke redirect (login page)
 *
 * 2. Secure Building:
 *    - Jaise secure building mein entry ke liye ID card chahiye
 *    - Protected Routes bhi waise hi - authentication ID chahiye
 *    - Bina ID ke access nahi
 *
 * Protected Route Implementation:
 * - Check authentication status
 * - If authenticated: Render component
 * - If not: Redirect to login (Navigate component)
 * - Wrap protected routes with ProtectedRoute component
 *
 * PROTECTED ROUTES - EASY ENGLISH EXPLANATION
 *
 * Protected Routes are routes that check authentication before allowing access.
 * If user is not authenticated, they redirect to login page.
 *
 * Key Concepts:
 * - **Authentication Check:** Verify user is logged in
 * - **Conditional Rendering:** Render component if authenticated
 * - **Redirect:** Navigate to login if not authenticated
 * - **Security:** Protect sensitive routes
 */

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

