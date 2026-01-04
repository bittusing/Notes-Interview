# ADVANCED HOOKS & STATE MANAGEMENT

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Advanced Hooks kya hain?**
- Advanced hooks complex scenarios handle karte hain
- useLayoutEffect, useImperativeHandle, useDebugValue
- Performance optimization ke liye
- Advanced patterns implement karne ke liye

**State Management kya hai?**
- State management data ko manage karna hai
- Multiple components mein share karna
- Global state vs local state
- Context API, Redux, Zustand options hain

**State Management Solutions:**
- **Context API:** Built-in React solution
- **Redux:** Popular state management library
- **Zustand:** Lightweight solution
- **Recoil:** Facebook's solution
- **Jotai:** Atomic state management

---

## B) Easy English Theory

### What are Advanced Hooks and State Management?

Advanced Hooks handle complex scenarios: useLayoutEffect (synchronous effects), useImperativeHandle (expose methods), useDebugValue (debug custom hooks). State Management: Managing data across components. Solutions: Context API (built-in), Redux (popular library), Zustand (lightweight), Recoil (Facebook), Jotai (atomic). Choose based on: App size, complexity, team preference.

---

## C) Why This Concept Exists

### The Problem

**Without State Management:**
- Props drilling (passing through many components)
- Difficult to share state
- Complex state logic
- No global state

### The Solution

**State Management Provides:**
1. **Global State:** Share across components
2. **Centralized:** Single source of truth
3. **Predictable:** Clear data flow
4. **DevTools:** Debugging tools
5. **Scalability:** Handle complex apps

---

## D) Practical Example (Code)

```jsx
// ============================================
// useLayoutEffect HOOK
// ============================================

import React, { useState, useLayoutEffect, useRef } from 'react';

function Tooltip({ children, text }) {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const tooltipRef = useRef();
  
  // useLayoutEffect runs synchronously before paint
  // Use when you need to measure DOM
  useLayoutEffect(() => {
    const rect = tooltipRef.current.getBoundingClientRect();
    setPosition({
      top: rect.top,
      left: rect.left
    });
  }, [text]);
  
  return (
    <div ref={tooltipRef} style={{ position: 'absolute', ...position }}>
      {text}
    </div>
  );
}

// ============================================
// CONTEXT API FOR STATE MANAGEMENT
// ============================================

import React, { createContext, useContext, useReducer } from 'react';

// Context
const AppContext = createContext();

// Reducer
function appReducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    default:
      return state;
  }
}

// Provider
function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, {
    user: null,
    theme: 'light'
  });
  
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook
function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}

// Usage
function UserProfile() {
  const { state, dispatch } = useApp();
  
  const setUser = (user) => {
    dispatch({ type: 'SET_USER', payload: user });
  };
  
  return <div>{state.user?.name}</div>;
}

// ============================================
// REDUX SETUP
// ============================================

// store.js
import { createStore } from 'redux';

const initialState = {
  count: 0,
  user: null
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    case 'SET_USER':
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

const store = createStore(rootReducer);

// ============================================
// REDUX WITH REACT (useSelector, useDispatch)
// ============================================

import { useSelector, useDispatch } from 'react-redux';

function Counter() {
  const count = useSelector(state => state.count);
  const dispatch = useDispatch();
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
    </div>
  );
}

// ============================================
// ZUSTAND (LIGHTWEIGHT STATE MANAGEMENT)
// ============================================

import create from 'zustand';

const useStore = create((set) => ({
  count: 0,
  user: null,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  setUser: (user) => set({ user })
}));

function Counter() {
  const { count, increment, decrement } = useStore();
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}

// ============================================
// CUSTOM HOOKS FOR STATE MANAGEMENT
// ============================================

// useLocalStorage hook
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });
  
  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };
  
  return [storedValue, setValue];
}

// useFetch hook
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [url]);
  
  return { data, loading, error };
}

// ============================================
// STATE MANAGEMENT PATTERNS
// ============================================

// 1. Lift State Up
function Parent() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <Child1 count={count} />
      <Child2 setCount={setCount} />
    </div>
  );
}

// 2. Composition
function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <Router>
          <Routes />
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
}

// 3. Custom Hooks for Logic
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const reset = () => setCount(initialValue);
  
  return { count, increment, decrement, reset };
}
```

---

## E) Internal Working

**State Management Flow:**
1. **Action:** User interaction
2. **Dispatch:** Send action
3. **Reducer:** Update state
4. **Store:** Updated state
5. **Components:** Re-render

**Context API:**
- Provider wraps components
- Context value shared
- Consumers access value
- Re-renders on value change

---

## F) Interview Questions & Answers

### Q1: What is the difference between Context API and Redux?

**Answer:**
Context API: Built into React, simpler setup, good for small-medium apps, can cause performance issues (all consumers re-render), no middleware. Redux: External library, more setup, better for large apps, optimized (only connected components re-render), middleware support (logging, async), DevTools, time-travel debugging. Choose Context for simple global state, Redux for complex state management.

### Q2: When would you use useLayoutEffect instead of useEffect?

**Answer:**
useLayoutEffect: Runs synchronously before browser paint, use when need to measure DOM, prevent visual flicker, synchronous DOM mutations. useEffect: Runs asynchronously after paint, use for most side effects (API calls, subscriptions). Key difference: useLayoutEffect blocks paint, useEffect doesn't. Use useLayoutEffect when visual updates need to happen before paint.

### Q3: How do you manage state in a large React application?

**Answer:**
Large app state management: Use Redux/Zustand for global state, Context API for theme/auth (small global state), Local state (useState) for component-specific, Custom hooks for reusable logic, Normalize state (flat structure), Selectors for derived state, Middleware for side effects. Strategy: Global state (user, theme), Local state (form inputs), Derived state (computed values).

---

## G) Common Mistakes

### Mistake 1: Overusing Context API

```jsx
// ❌ WRONG - Context for everything
// Causes unnecessary re-renders
const AppContext = createContext();

// ✅ CORRECT - Use Context selectively
// Only for truly global state (theme, auth)
// Use local state or Redux for other state
```

**Why it breaks:** Context causes all consumers to re-render, performance issues.

---

## H) When to Use & When NOT to Use

Use Redux/State Management for: Large apps, complex state, need DevTools, middleware needed. Use Context for: Simple global state (theme, auth), small apps. Use Local State for: Component-specific data.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain State Management in React."

**You:"
"State Management: Managing data across components. Solutions: Context API (built-in, simple), Redux (popular, complex apps), Zustand (lightweight). Choose based on app size and complexity.

Context API: Good for theme/auth. Redux: Good for large apps, complex state, middleware. Local state (useState): Component-specific. Strategy: Global state (Redux/Context), Local state (useState), Custom hooks for reusable logic."

---

## J) Mini Practice Task

Practice: Implement Context API, set up Redux, use Zustand, create custom hooks, implement state management patterns, optimize state updates.

---

**END OF TOPIC: ADVANCED HOOKS & STATE MANAGEMENT**

