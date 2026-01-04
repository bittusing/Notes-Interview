# REACT HOOKS FUNDAMENTALS

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**React Hooks kya hain?**
- Hooks functions hain jo React features use karne dete hain
- Functional components mein state aur lifecycle use karne ke liye
- Class components ki zarurat nahi
- useState, useEffect, useContext popular hain
- React 16.8 mein introduce huye

**Real-life Analogy:**
- Hooks = Tools (screwdriver, hammer)
- Different hooks = Different tools
- useState = State tool
- useEffect = Side effects tool
- useContext = Context tool

**Popular Hooks:**
- **useState:** State manage karta hai
- **useEffect:** Side effects handle karta hai
- **useContext:** Context access karta hai
- **useReducer:** Complex state manage karta hai
- **useMemo:** Memoization karta hai
- **useCallback:** Function memoization

**Hooks Rules:**
- Top-level call karo (loops/conditions mein nahi)
- Functional components mein use karo
- Custom hooks "use" se start karo

---

## B) Easy English Theory

### What are React Hooks?

React Hooks are functions that let you use React features in functional components. Popular hooks: useState (state management), useEffect (side effects), useContext (context access), useReducer (complex state), useMemo (memoization), useCallback (function memoization). Rules: Call at top level (not in loops/conditions), use in functional components, custom hooks start with "use". Introduced in React 16.8 to use state and lifecycle in functional components.

---

## C) Why This Concept Exists

### The Problem

**Without Hooks:**
- Class components needed for state
- Complex class syntax
- Difficult to reuse logic
- Wrapper hell (HOCs)
- Lifecycle methods complex

### The Solution

**Hooks Provide:**
1. **Simplicity:** Functional components with state
2. **Reusability:** Custom hooks for logic
3. **Clean Code:** Less boilerplate
4. **Flexibility:** Compose hooks
5. **Modern:** React's recommended approach

---

## D) Practical Example (Code)

```jsx
// ============================================
// useState HOOK
// ============================================

import React, { useState } from 'react';

function Counter() {
  // useState returns [value, setter]
  const [count, setCount] = useState(0);
  
  // Functional update
  const increment = () => {
    setCount(prevCount => prevCount + 1);
  };
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

// Multiple state variables
function Form() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);
  
  return (
    <form>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input value={age} onChange={(e) => setAge(Number(e.target.value))} />
    </form>
  );
}

// Object state
function UserProfile() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    age: 0
  });
  
  const updateUser = (field, value) => {
    setUser(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  return (
    <div>
      <input
        value={user.name}
        onChange={(e) => updateUser('name', e.target.value)}
      />
    </div>
  );
}

// ============================================
// useEffect HOOK
// ============================================

import React, { useState, useEffect } from 'react';

// Basic useEffect
function Example() {
  const [count, setCount] = useState(0);
  
  // Runs after every render
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });
  
  return <button onClick={() => setCount(count + 1)}>Click me</button>;
}

// useEffect with dependency array
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  
  // Runs only when userId changes
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]); // Dependency array
  
  return user ? <div>{user.name}</div> : <div>Loading...</div>;
}

// Cleanup function
function Timer() {
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    
    // Cleanup function
    return () => {
      clearInterval(interval);
    };
  }, []); // Empty array = run once
  
  return <div>Seconds: {seconds}</div>;
}

// Multiple effects
function Component() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  
  // Effect for count
  useEffect(() => {
    console.log('Count changed:', count);
  }, [count]);
  
  // Effect for name
  useEffect(() => {
    console.log('Name changed:', name);
  }, [name]);
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <input value={name} onChange={(e) => setName(e.target.value)} />
    </div>
  );
}

// ============================================
// useContext HOOK
// ============================================

import React, { createContext, useContext, useState } from 'react';

// Create context
const ThemeContext = createContext();

// Provider component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Consumer component
function ThemedButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  return (
    <button
      onClick={toggleTheme}
      style={{
        background: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#333' : '#fff'
      }}
    >
      Toggle Theme
    </button>
  );
}

// ============================================
// useReducer HOOK
// ============================================

import React, { useReducer } from 'react';

// Reducer function
function counterReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });
  
  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
}

// ============================================
// useMemo HOOK
// ============================================

import React, { useState, useMemo } from 'react';

function ExpensiveComponent({ items }) {
  // Expensive calculation
  const expensiveValue = useMemo(() => {
    console.log('Calculating...');
    return items.reduce((sum, item) => sum + item.value, 0);
  }, [items]); // Only recalculate if items change
  
  return <div>Total: {expensiveValue}</div>;
}

// ============================================
// useCallback HOOK
// ============================================

import React, { useState, useCallback, memo } from 'react';

const ChildComponent = memo(({ onClick, name }) => {
  console.log('Child rendered');
  return <button onClick={onClick}>{name}</button>;
});

function ParentComponent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('Child');
  
  // Without useCallback, new function on every render
  // With useCallback, same function reference
  const handleClick = useCallback(() => {
    console.log('Clicked');
  }, []); // Empty deps = never changes
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <ChildComponent onClick={handleClick} name={name} />
    </div>
  );
}

// ============================================
// useRef HOOK
// ============================================

import React, { useRef, useEffect } from 'react';

function TextInput() {
  const inputRef = useRef(null);
  
  useEffect(() => {
    // Focus input on mount
    inputRef.current.focus();
  }, []);
  
  return <input ref={inputRef} type="text" />;
}

// Store mutable value
function Timer() {
  const [count, setCount] = useState(0);
  const intervalRef = useRef();
  
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(intervalRef.current);
  }, []);
  
  return <div>Count: {count}</div>;
}

// ============================================
// CUSTOM HOOKS
// ============================================

// Custom hook for API calls
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

// Use custom hook
function UserProfile({ userId }) {
  const { data, loading, error } = useFetch(`/api/users/${userId}`);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return <div>{data.name}</div>;
}

// Custom hook for local storage
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
```

---

## E) Internal Working

**Hooks Mechanism:**
- **Fiber:** React's internal structure
- **Hook List:** Hooks stored in order
- **Call Order:** Must be consistent
- **State:** Stored in fiber node

**Rules Explained:**
- Top-level: Maintain hook order
- No conditions: Preserve hook sequence
- Functional components: Hooks need function context

---

## F) Interview Questions & Answers

### Q1: What are React Hooks and why were they introduced?

**Answer:**
React Hooks are functions that let you use React features (state, lifecycle) in functional components. Introduced in React 16.8. Why: Avoid class components (simpler syntax), Reuse logic (custom hooks), Avoid wrapper hell (HOCs), Better composition (combine hooks). Popular hooks: useState (state), useEffect (side effects), useContext (context), useReducer (complex state), useMemo/useCallback (optimization). Rules: Call at top level, use in functional components.

### Q2: What is the difference between useState and useReducer?

**Answer:**
useState: Simple state management, single value or object, direct updates, good for simple state. useReducer: Complex state management, reducer function (state, action), dispatch actions, good for complex state logic, multiple sub-values, state transitions. Choose useState for simple state, useReducer for complex state with multiple actions/transitions. useReducer is like Redux pattern in component.

### Q3: How does useEffect work and when to use it?

**Answer:**
useEffect handles side effects (API calls, subscriptions, DOM manipulation). Runs after render. Dependencies: No array (runs every render), Empty array (runs once on mount), With deps (runs when deps change). Cleanup: Return function for cleanup (unsubscribe, clear timers). Use for: Data fetching, subscriptions, DOM updates, timers. Don't use for: Event handlers (use callbacks), synchronous updates (use state directly).

---

## G) Common Mistakes

### Mistake 1: Missing Dependencies in useEffect

```jsx
// ❌ WRONG - Missing dependency
useEffect(() => {
  fetchData(userId);
}, []); // userId not in deps

// ✅ CORRECT - Include dependencies
useEffect(() => {
  fetchData(userId);
}, [userId]); // userId in deps
```

**Why it breaks:** Missing dependencies cause stale closures, bugs, incorrect behavior.

---

## H) When to Use & When NOT to Use

Use Hooks for: Functional components, state management, side effects, context access, logic reuse. Don't use in: Class components (use lifecycle methods), loops/conditions (violates rules), regular functions (only in React components).

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain React Hooks."

**You:"
"React Hooks are functions to use React features in functional components. Popular: useState (state), useEffect (side effects), useContext (context), useReducer (complex state), useMemo/useCallback (optimization).

Rules: Call at top level (not in loops/conditions), use in functional components. Benefits: Simpler than classes, reusable logic (custom hooks), better composition. Introduced in React 16.8 to use state/lifecycle in functional components."

---

## J) Mini Practice Task

Practice: Use useState for state, useEffect for side effects, useContext for context, useReducer for complex state, create custom hooks, use useMemo/useCallback for optimization.

---

**END OF TOPIC: REACT HOOKS FUNDAMENTALS**

