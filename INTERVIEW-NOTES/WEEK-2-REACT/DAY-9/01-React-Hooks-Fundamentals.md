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

/**
 * useState HOOK KYA HAI? (HINGLISH)
 *
 * useState React ka most basic hook hai jo functional components mein state add karne ke liye use hota hai.
 * Ye hook ek array return karta hai jisme current state value aur usko update karne wala function hota hai.
 *
 * Simple Definition:
 * - Functional components mein state add karne ka tarika
 * - [value, setter] array return karta hai
 * - Initial value pass kar sakte ho
 * - State update par component re-render hota hai
 *
 * Real-life Analogy:
 * 1. Variable Box:
 *    - Jaise aapke paas ek box hai jisme value store hoti hai
 *    - useState bhi waise hi - ek "box" (state) create karta hai
 *    - Box ki value change karne ke liye setter function use karte ho
 *    - Value change par UI automatically update hota hai
 *
 * 2. Remote Control:
 *    - Jaise TV remote se channel change karte ho
 *    - useState bhi waise hi - state (channel) change karta hai
 *    - setter function (remote button) press karke state update
 *    - State change par screen (UI) update hota hai
 *
 * 3. Bank Account:
 *    - Jaise bank account mein balance store hota hai
 *    - useState bhi waise hi - state (balance) store karta hai
 *    - Transaction (setter) se balance update
 *    - Balance change par statement (UI) update
 *
 * useState Syntax:
 * const [state, setState] = useState(initialValue);
 *
 * Key Features:
 * - **Initial Value:** useState(0) - 0 initial value hai
 * - **Array Destructuring:** [count, setCount] - value aur setter
 * - **State Update:** setCount(5) - direct value
 * - **Functional Update:** setCount(prev => prev + 1) - previous value se
 * - **Re-render:** State change par component automatically re-render
 *
 * When to Use:
 * - Simple state management
 * - Single value ya object
 * - Form inputs
 * - Toggle states (true/false)
 * - Counter, timer values
 *
 * useState - EASY ENGLISH EXPLANATION
 *
 * useState is React's most basic hook used to add state to functional components.
 * It returns an array containing the current state value and a function to update it.
 *
 * Key Concepts:
 * - **Add State:** Adds state to functional components
 * - **Returns Array:** [currentValue, setterFunction]
 * - **Initial Value:** Takes initial value as parameter
 * - **Re-render:** Component re-renders when state changes
 *
 * Syntax:
 * const [state, setState] = useState(initialValue);
 *
 * How It Works:
 * 1. Call useState with initial value
 * 2. Get current value and setter function
 * 3. Use value in component
 * 4. Call setter to update state
 * 5. Component re-renders with new value
 *
 * Update Patterns:
 * - **Direct Update:** setCount(5) - set specific value
 * - **Functional Update:** setCount(prev => prev + 1) - based on previous value
 * - **Object Update:** setUser({...user, name: 'John'}) - merge with spread
 *
 * When to Use:
 * - Simple state management
 * - Single value or object
 * - Form inputs
 * - Toggle states
 * - Counters, timers
 *
 * Best Practices:
 * - Use functional updates when state depends on previous state
 * - Don't mutate state directly (create new objects/arrays)
 * - Keep state minimal (only what affects UI)
 * - Use multiple useState for unrelated state
 */

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

/**
 * useEffect HOOK KYA HAI? (HINGLISH)
 *
 * useEffect React ka hook hai jo side effects handle karne ke liye use hota hai.
 * Side effects matlab operations jo component ke render ke baad perform hote hain,
 * jaise API calls, DOM manipulation, subscriptions, timers, etc.
 *
 * Simple Definition:
 * - Side effects handle karne ka tarika
 * - Component render ke baad execute hota hai
 * - Dependency array se control hota hai
 * - Cleanup function return kar sakta hai
 *
 * Real-life Analogy:
 * 1. After-Party Tasks:
 *    - Jaise party ke baad cleanup karte ho (dishes wash, lights off)
 *    - useEffect bhi waise hi - render ke baad tasks perform karta hai
 *    - Cleanup function se resources clean karta hai
 *    - Dependency array se decide karta hai ki kab run karna hai
 *
 * 2. Subscription Service:
 *    - Jaise magazine subscription lete ho (subscribe on mount)
 *    - useEffect bhi waise hi - mount par subscribe karta hai
 *    - Unmount par unsubscribe (cleanup) karta hai
 *    - Dependency change par re-subscribe karta hai
 *
 * 3. Automatic Updates:
 *    - Jaise phone mein auto-sync enable hota hai
 *    - useEffect bhi waise hi - automatic tasks perform karta hai
 *    - Dependencies change par automatically update
 *    - Cleanup se resources free karta hai
 *
 * useEffect Syntax:
 * useEffect(() => {
 *   // Side effect code
 *   return () => {
 *     // Cleanup code (optional)
 *   };
 * }, [dependencies]); // Dependency array
 *
 * Dependency Array Scenarios:
 * 1. **No Array:** useEffect(() => {}) - Har render ke baad run
 * 2. **Empty Array:** useEffect(() => {}, []) - Sirf mount par run (once)
 * 3. **With Dependencies:** useEffect(() => {}, [dep1, dep2]) - Dependencies change par run
 *
 * Common Use Cases:
 * - **API Calls:** Data fetch karna
 * - **Subscriptions:** Event listeners, WebSocket connections
 * - **Timers:** setInterval, setTimeout
 * - **DOM Manipulation:** Focus, scroll, etc.
 * - **Document Title:** Page title update
 *
 * Cleanup Function:
 * - Unsubscribe karna (event listeners, subscriptions)
 * - Timers clear karna (setInterval, setTimeout)
 * - Memory leaks prevent karna
 * - Component unmount par automatically call hota hai
 *
 * useEffect - EASY ENGLISH EXPLANATION
 *
 * useEffect is React's hook for handling side effects. Side effects are operations
 * that happen after component render, like API calls, DOM manipulation, subscriptions, timers, etc.
 *
 * Key Concepts:
 * - **Side Effects:** Operations after render
 * - **Runs After Render:** Executes after component renders
 * - **Dependency Array:** Controls when effect runs
 * - **Cleanup Function:** Optional function to clean up resources
 *
 * Syntax:
 * useEffect(() => {
 *   // Side effect code
 *   return () => {
 *     // Cleanup code (optional)
 *   };
 * }, [dependencies]);
 *
 * Dependency Array:
 * - **No Array:** Runs after every render
 * - **Empty Array []:** Runs once on mount
 * - **With Dependencies [dep1, dep2]:** Runs when dependencies change
 *
 * Common Use Cases:
 * - **API Calls:** Fetching data
 * - **Subscriptions:** Event listeners, WebSocket connections
 * - **Timers:** setInterval, setTimeout
 * - **DOM Manipulation:** Focus, scroll, etc.
 * - **Document Title:** Updating page title
 *
 * Cleanup Function:
 * - Unsubscribe from subscriptions
 * - Clear timers
 * - Prevent memory leaks
 * - Automatically called on unmount
 *
 * Best Practices:
 * - Always include dependencies in dependency array
 * - Return cleanup function for subscriptions/timers
 * - Don't forget dependencies (causes bugs)
 * - Use ESLint plugin to catch missing dependencies
 */

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

/**
 * useContext HOOK KYA HAI? (HINGLISH)
 *
 * useContext React ka hook hai jo Context API se data access karne ke liye use hota hai.
 * Ye prop drilling se bachata hai - parent se child ko directly data pass karne ki zarurat nahi.
 *
 * Simple Definition:
 * - Context se data access karne ka tarika
 * - Prop drilling avoid karta hai
 * - Provider se data consume karta hai
 * - Multiple components mein same data share karta hai
 *
 * Real-life Analogy:
 * 1. Global Settings:
 *    - Jaise phone mein global settings hote hain (language, theme)
 *    - useContext bhi waise hi - global data (context) access karta hai
 *    - Har component directly settings access kar sakta hai
 *    - Prop drilling ki zarurat nahi (settings har component ko pass nahi karna)
 *
 * 2. Company Policy:
 *    - Jaise company mein common policies hote hain
 *    - useContext bhi waise hi - common data (context) share karta hai
 *    - Har employee (component) directly policy access kar sakta hai
 *    - Manager se manager ko pass nahi karna padta
 *
 * 3. Shared Resources:
 *    - Jaise library mein books sabke liye available hote hain
 *    - useContext bhi waise hi - shared data (context) provide karta hai
 *    - Har member (component) directly books access kar sakta hai
 *    - Prop drilling ki zarurat nahi
 *
 * useContext Flow:
 * 1. **Create Context:** createContext() se context create karo
 * 2. **Provider:** Context.Provider se data provide karo
 * 3. **Consumer:** useContext() se data consume karo
 *
 * When to Use:
 * - Global state (theme, language, user)
 * - Prop drilling avoid karna ho
 * - Multiple components ko same data chahiye
 * - Deep component trees mein data pass karna
 *
 * Benefits:
 * - **No Prop Drilling:** Directly context se data access
 * - **Clean Code:** Props se clutter nahi
 * - **Performance:** Only consuming components re-render
 * - **Flexibility:** Easy to update context value
 *
 * useContext - EASY ENGLISH EXPLANATION
 *
 * useContext is React's hook to access data from Context API. It avoids prop drilling -
 * no need to pass data through multiple component layers.
 *
 * Key Concepts:
 * - **Context Access:** Access data from Context API
 * - **Avoid Prop Drilling:** No need to pass props through multiple layers
 * - **Provider/Consumer:** Provider provides, useContext consumes
 * - **Global State:** Share data across component tree
 *
 * Flow:
 * 1. **Create Context:** createContext() creates context
 * 2. **Provider:** Context.Provider provides data
 * 3. **Consumer:** useContext() consumes data
 *
 * When to Use:
 * - Global state (theme, language, user)
 * - Avoid prop drilling
 * - Multiple components need same data
 * - Deep component trees
 *
 * Benefits:
 * - **No Prop Drilling:** Direct context access
 * - **Clean Code:** Less prop clutter
 * - **Performance:** Only consuming components re-render
 * - **Flexibility:** Easy to update context value
 *
 * Best Practices:
 * - Use for truly global data
 * - Don't overuse (can make components less reusable)
 * - Split contexts by concern (ThemeContext, UserContext)
 * - Use with useState/useReducer for state management
 */

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

/**
 * useReducer HOOK KYA HAI? (HINGLISH)
 *
 * useReducer React ka hook hai jo complex state management ke liye use hota hai.
 * Ye useState ka alternative hai, lekin complex state logic ke liye better hai.
 * Redux pattern ki tarah kaam karta hai - reducer function aur actions use karta hai.
 *
 * Simple Definition:
 * - Complex state management ka tarika
 * - Reducer function use karta hai
 * - Actions dispatch karta hai
 * - useState se powerful (complex logic ke liye)
 *
 * Real-life Analogy:
 * 1. Bank Transaction System:
 *    - Jaise bank mein transactions actions hote hain (deposit, withdraw, transfer)
 *    - useReducer bhi waise hi - actions dispatch karta hai (increment, decrement, reset)
 *    - Reducer function (bank rules) decide karta hai ki action ke basis par state kaise change hoga
 *    - Complex logic easily handle kar sakta hai
 *
 * 2. Traffic Light Controller:
 *    - Jaise traffic light mein states hote hain (red, yellow, green)
 *    - useReducer bhi waise hi - complex states manage karta hai
 *    - Actions (changeLight) dispatch karke state update
 *    - Reducer function decide karta hai next state
 *
 * 3. Game State Management:
 *    - Jaise game mein multiple states hote hain (score, level, lives)
 *    - useReducer bhi waise hi - multiple related states manage karta hai
 *    - Actions (addScore, levelUp) dispatch karke state update
 *    - Complex game logic easily handle
 *
 * useReducer vs useState:
 * - **useState:** Simple state, direct updates
 * - **useReducer:** Complex state, action-based updates
 * - **useState:** Single value ya simple object
 * - **useReducer:** Multiple related values, complex logic
 *
 * Reducer Function:
 * - (state, action) => newState
 * - Current state aur action receive karta hai
 * - New state return karta hai
 * - Pure function hona chahiye (no side effects)
 *
 * When to Use:
 * - Complex state logic
 * - Multiple related state values
 * - State transitions
 * - When state update logic complex hai
 * - Redux-like pattern chahiye ho
 *
 * useReducer - EASY ENGLISH EXPLANATION
 *
 * useReducer is React's hook for complex state management. It's an alternative to useState,
 * but better for complex state logic. Works like Redux pattern - uses reducer function and actions.
 *
 * Key Concepts:
 * - **Complex State:** Manages complex state logic
 * - **Reducer Function:** (state, action) => newState
 * - **Actions:** Dispatch actions to update state
 * - **More Powerful:** Better than useState for complex logic
 *
 * useReducer vs useState:
 * - **useState:** Simple state, direct updates
 * - **useReducer:** Complex state, action-based updates
 * - **useState:** Single value or simple object
 * - **useReducer:** Multiple related values, complex logic
 *
 * Reducer Function:
 * - Receives (state, action)
 * - Returns new state
 * - Should be pure function (no side effects)
 *
 * When to Use:
 * - Complex state logic
 * - Multiple related state values
 * - State transitions
 * - Complex update logic
 * - Redux-like pattern needed
 *
 * Benefits:
 * - **Predictable:** Actions define state changes
 * - **Testable:** Reducer function easy to test
 * - **Scalable:** Easy to add new actions
 * - **Organized:** State logic centralized
 */

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

/**
 * useMemo HOOK KYA HAI? (HINGLISH)
 *
 * useMemo React ka hook hai jo expensive calculations ko memoize (cache) karne ke liye use hota hai.
 * Ye unnecessary recalculations prevent karta hai, performance improve karne ke liye.
 *
 * Simple Definition:
 * - Expensive calculations ko cache karna
 * - Unnecessary recalculations prevent karna
 * - Performance optimization
 * - Dependencies change par hi recalculate
 *
 * Real-life Analogy:
 * 1. Calculator Memory:
 *    - Jaise calculator mein memory function hota hai (same calculation dobara nahi)
 *    - useMemo bhi waise hi - expensive calculations cache karta hai
 *    - Same inputs par cached result return karta hai
 *    - Performance improve hota hai
 *
 * 2. Recipe Cache:
 *    - Jaise aap recipe ko remember karte ho (same ingredients = same dish)
 *    - useMemo bhi waise hi - calculation results cache karta hai
 *    - Same inputs par cached result use karta hai
 *    - Time save hota hai
 *
 * 3. Exam Answers:
 *    - Jaise exam mein same question ka answer remember karte ho
 *    - useMemo bhi waise hi - calculation results remember karta hai
 *    - Same inputs par same answer return karta hai
 *    - Recalculation avoid karta hai
 *
 * useMemo Syntax:
 * const memoizedValue = useMemo(() => {
 *   // Expensive calculation
 *   return computeExpensiveValue(a, b);
 * }, [a, b]); // Dependencies
 *
 * How It Works:
 * 1. First render: Calculation perform karta hai, result cache karta hai
 * 2. Next renders: Dependencies check karta hai
 * 3. Dependencies same: Cached result return karta hai (no recalculation)
 * 4. Dependencies changed: Recalculate karta hai, new result cache karta hai
 *
 * When to Use:
 * - Expensive calculations (loops, complex math)
 * - Large arrays/objects processing
 * - Performance optimization needed
 * - When calculation result same ho sakta hai multiple renders mein
 *
 * When NOT to Use:
 * - Simple calculations (overhead zyada hai)
 * - Every render par different result chahiye
 * - Premature optimization (profile first)
 *
 * useMemo - EASY ENGLISH EXPLANATION
 *
 * useMemo is React's hook to memoize (cache) expensive calculations. It prevents
 * unnecessary recalculations to improve performance.
 *
 * Key Concepts:
 * - **Memoization:** Cache expensive calculation results
 * - **Prevent Recalculation:** Avoid recalculating on every render
 * - **Performance:** Optimize expensive operations
 * - **Dependencies:** Only recalculate when dependencies change
 *
 * Syntax:
 * const memoizedValue = useMemo(() => {
 *   // Expensive calculation
 *   return computeExpensiveValue(a, b);
 * }, [a, b]); // Dependencies
 *
 * How It Works:
 * 1. First render: Performs calculation, caches result
 * 2. Next renders: Checks dependencies
 * 3. Dependencies same: Returns cached result
 * 4. Dependencies changed: Recalculates, caches new result
 *
 * When to Use:
 * - Expensive calculations (loops, complex math)
 * - Large arrays/objects processing
 * - Performance optimization needed
 * - When result might be same across renders
 *
 * When NOT to Use:
 * - Simple calculations (overhead too much)
 * - Need different result every render
 * - Premature optimization (profile first)
 *
 * Best Practices:
 * - Only use for expensive calculations
 * - Profile before optimizing
 * - Include all dependencies
 * - Don't use for simple values
 */

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

/**
 * useCallback HOOK KYA HAI? (HINGLISH)
 *
 * useCallback React ka hook hai jo function references ko memoize karne ke liye use hota hai.
 * Ye unnecessary function recreations prevent karta hai, especially child components ko
 * props mein functions pass karte waqt.
 *
 * Simple Definition:
 * - Function references ko cache karna
 * - Unnecessary function recreations prevent karna
 * - Child components ko stable function references dena
 * - Performance optimization (memo components ke saath)
 *
 * Real-life Analogy:
 * 1. Function Signature:
 *    - Jaise aap apna signature remember karte ho (same signature use karte ho)
 *    - useCallback bhi waise hi - function reference remember karta hai
 *    - Same dependencies par same function reference return karta hai
 *    - Child components ko stable reference milta hai
 *
 * 2. Phone Number:
 *    - Jaise aap apna phone number remember karte ho (same number use karte ho)
 *    - useCallback bhi waise hi - function reference remember karta hai
 *    - Same dependencies par same reference return karta hai
 *    - Re-renders prevent karta hai
 *
 * 3. Recipe Card:
 *    - Jaise aap recipe card ko reference karte ho (same card use karte ho)
 *    - useCallback bhi waise hi - function reference maintain karta hai
 *    - Same dependencies par same reference
 *    - Child components unnecessary re-render nahi hote
 *
 * useCallback Syntax:
 * const memoizedCallback = useCallback(() => {
 *   // Function logic
 *   doSomething(a, b);
 * }, [a, b]); // Dependencies
 *
 * Problem Without useCallback:
 * - Har render par naya function create hota hai
 * - Child component ko naya function prop milta hai
 * - memo() wrapped child bhi re-render hota hai (kyunki prop change hua)
 * - Performance issue
 *
 * Solution With useCallback:
 * - Function reference cache hota hai
 * - Same dependencies par same reference return
 * - Child component ko stable reference milta hai
 * - memo() wrapped child re-render nahi hota
 *
 * When to Use:
 * - Functions ko child components mein pass karte waqt
 * - memo() wrapped components ke saath
 * - Expensive child components ko optimize karna
 * - Dependencies stable hon
 *
 * useCallback - EASY ENGLISH EXPLANATION
 *
 * useCallback is React's hook to memoize function references. It prevents unnecessary
 * function recreations, especially when passing functions as props to child components.
 *
 * Key Concepts:
 * - **Memoize Functions:** Cache function references
 * - **Prevent Recreation:** Avoid creating new function on every render
 * - **Stable References:** Provide stable function references to children
 * - **Performance:** Optimize with memo components
 *
 * Syntax:
 * const memoizedCallback = useCallback(() => {
 *   // Function logic
 *   doSomething(a, b);
 * }, [a, b]); // Dependencies
 *
 * Problem Without useCallback:
 * - New function created on every render
 * - Child receives new function prop
 * - memo() wrapped child re-renders (prop changed)
 * - Performance issue
 *
 * Solution With useCallback:
 * - Function reference cached
 * - Same reference returned for same dependencies
 * - Child receives stable reference
 * - memo() wrapped child doesn't re-render
 *
 * When to Use:
 * - Passing functions to child components
 * - With memo() wrapped components
 * - Optimizing expensive child components
 * - When dependencies are stable
 *
 * Best Practices:
 * - Use with memo() for optimization
 * - Include all dependencies
 * - Don't overuse (has overhead)
 * - Profile before optimizing
 */

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

/**
 * useRef HOOK KYA HAI? (HINGLISH)
 *
 * useRef React ka hook hai jo mutable values store karne ke liye use hota hai jo
 * re-renders ke beech persist rehte hain. Ye DOM elements ko directly access karne
 * ke liye bhi use hota hai.
 *
 * Simple Definition:
 * - Mutable values store karna (re-renders ke beech persist)
 * - DOM elements ko directly access karna
 * - Previous values track karna
 * - Re-render trigger nahi karta
 *
 * Real-life Analogy:
 * 1. Storage Box:
 *    - Jaise aapke paas ek box hai jisme aap values store karte ho
 *    - useRef bhi waise hi - mutable values store karta hai
 *    - Box ki value change kar sakte ho bina re-render ke
 *    - Re-renders ke beech value persist rehti hai
 *
 * 2. Direct Access:
 *    - Jaise aap directly door handle ko access kar sakte ho
 *    - useRef bhi waise hi - DOM elements ko directly access karta hai
 *    - .current property se element access karta hai
 *    - Focus, scroll, etc. operations kar sakte ho
 *
 * 3. Previous Value Tracker:
 *    - Jaise aap previous score remember karte ho
 *    - useRef bhi waise hi - previous values track karta hai
 *    - useEffect mein previous value store kar sakte ho
 *    - Comparison ke liye use kar sakte ho
 *
 * useRef Use Cases:
 * 1. **DOM Access:** Input focus, scroll position, etc.
 * 2. **Mutable Values:** Timer IDs, interval references
 * 3. **Previous Values:** Track previous props/state
 * 4. **Imperative Operations:** Direct DOM manipulation
 *
 * useRef vs useState:
 * - **useRef:** Mutable, re-render trigger nahi karta
 * - **useState:** Immutable, re-render trigger karta hai
 * - **useRef:** .current property se access
 * - **useState:** Direct value access
 *
 * Key Features:
 * - **Persistent:** Re-renders ke beech value persist rehti hai
 * - **Mutable:** .current property directly modify kar sakte ho
 * - **No Re-render:** Value change par component re-render nahi hota
 * - **DOM Access:** ref attribute se DOM element access
 *
 * useRef - EASY ENGLISH EXPLANATION
 *
 * useRef is React's hook to store mutable values that persist across re-renders.
 * It's also used to directly access DOM elements.
 *
 * Key Concepts:
 * - **Mutable Values:** Store values that persist across re-renders
 * - **DOM Access:** Directly access DOM elements
 * - **No Re-render:** Changing ref doesn't trigger re-render
 * - **Persistent:** Value persists between renders
 *
 * Use Cases:
 * 1. **DOM Access:** Input focus, scroll position, etc.
 * 2. **Mutable Values:** Timer IDs, interval references
 * 3. **Previous Values:** Track previous props/state
 * 4. **Imperative Operations:** Direct DOM manipulation
 *
 * useRef vs useState:
 * - **useRef:** Mutable, doesn't trigger re-render
 * - **useState:** Immutable, triggers re-render
 * - **useRef:** Access via .current property
 * - **useState:** Direct value access
 *
 * Key Features:
 * - **Persistent:** Value persists across re-renders
 * - **Mutable:** Can directly modify .current property
 * - **No Re-render:** Changing ref doesn't trigger re-render
 * - **DOM Access:** Access DOM element via ref attribute
 *
 * Best Practices:
 * - Use for DOM access when needed
 * - Store mutable values that don't need re-render
 * - Don't use for values that should trigger re-render (use useState)
 * - Initialize with useRef(initialValue)
 */

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

/**
 * CUSTOM HOOKS KYA HAI? (HINGLISH)
 *
 * Custom Hooks React mein reusable logic extract karne ka tarika hai. Ye regular
 * functions hote hain jo "use" se start hote hain aur other hooks use kar sakte hain.
 * Logic ko component se separate karke reuse kar sakte ho.
 *
 * Simple Definition:
 * - Reusable logic extract karne ka tarika
 * - "use" se start hona chahiye
 * - Other hooks use kar sakte hain
 * - Logic ko component se separate karna
 *
 * Real-life Analogy:
 * 1. Reusable Tool:
 *    - Jaise aap ek tool kit mein reusable tools hote hain
 *    - Custom Hooks bhi waise hi - reusable logic tools
 *    - Ek baar banaya, multiple components mein use
 *    - Logic centralized aur reusable
 *
 * 2. Function Library:
 *    - Jaise aap utility functions library banate ho
 *    - Custom Hooks bhi waise hi - logic library
 *    - Common logic ek jagah, multiple places mein use
 *    - Code duplication avoid karta hai
 *
 * 3. Recipe Template:
 *    - Jaise aap recipe template use karte ho (same recipe, different ingredients)
 *    - Custom Hooks bhi waise hi - same logic, different components
 *    - Template ek baar, multiple dishes (components)
 *    - Consistency maintain karta hai
 *
 * Custom Hook Rules:
 * 1. **Name:** "use" se start hona chahiye (useFetch, useLocalStorage)
 * 2. **Hooks:** Other hooks use kar sakte hain (useState, useEffect, etc.)
 * 3. **Return:** Values, functions, objects return kar sakte hain
 * 4. **Reusable:** Multiple components mein use kar sakte hain
 *
 * Benefits:
 * - **Reusability:** Logic ek baar, multiple places mein use
 * - **Separation:** Logic component se separate
 * - **Testability:** Hooks easily test kar sakte ho
 * - **Organization:** Code better organized
 * - **DRY Principle:** Don't Repeat Yourself
 *
 * Common Custom Hooks:
 * - **useFetch:** API calls handle karna
 * - **useLocalStorage:** Local storage sync karna
 * - **useDebounce:** Debounce functionality
 * - **useToggle:** Toggle state management
 * - **useWindowSize:** Window size track karna
 *
 * CUSTOM HOOKS - EASY ENGLISH EXPLANATION
 *
 * Custom Hooks are a way to extract reusable logic in React. They are regular functions
 * that start with "use" and can use other hooks. Extract logic from components for reuse.
 *
 * Key Concepts:
 * - **Reusable Logic:** Extract logic for reuse
 * - **Naming:** Must start with "use"
 * - **Hooks:** Can use other hooks inside
 * - **Separation:** Separate logic from components
 *
 * Custom Hook Rules:
 * 1. **Name:** Must start with "use" (useFetch, useLocalStorage)
 * 2. **Hooks:** Can use other hooks (useState, useEffect, etc.)
 * 3. **Return:** Can return values, functions, objects
 * 4. **Reusable:** Can be used in multiple components
 *
 * Benefits:
 * - **Reusability:** Write logic once, use in multiple places
 * - **Separation:** Logic separated from components
 * - **Testability:** Hooks easy to test
 * - **Organization:** Better code organization
 * - **DRY Principle:** Don't Repeat Yourself
 *
 * Common Custom Hooks:
 * - **useFetch:** Handle API calls
 * - **useLocalStorage:** Sync with local storage
 * - **useDebounce:** Debounce functionality
 * - **useToggle:** Toggle state management
 * - **useWindowSize:** Track window size
 *
 * Best Practices:
 * - Start name with "use"
 * - Extract reusable logic
 * - Keep hooks focused (single responsibility)
 * - Return consistent interface
 * - Document hook purpose and usage
 */

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

// ============================================
// LIFECYCLE METHODS (CLASS COMPONENTS) vs HOOKS (FUNCTIONAL COMPONENTS)
// ============================================

/**
 * LIFECYCLE METHODS KYA HAI? (HINGLISH)
 *
 * Lifecycle Methods React class components mein component ke different stages
 * (mount, update, unmount) par code execute karne ke liye use hote hain.
 * Functional components mein hooks (useEffect) se same functionality achieve hoti hai.
 *
 * Simple Definition:
 * - Component ke different stages par code execute karna
 * - Mount (component create), Update (re-render), Unmount (remove)
 * - Class components mein lifecycle methods
 * - Functional components mein hooks (useEffect) se achieve
 *
 * Real-life Analogy:
 * 1. Human Lifecycle:
 *    - Jaise human life mein stages hote hain (birth, growth, death)
 *    - Lifecycle Methods bhi waise hi - component ke stages
 *    - Birth = componentDidMount (component create)
 *    - Growth = componentDidUpdate (component update)
 *    - Death = componentWillUnmount (component remove)
 *
 * 2. Building Construction:
 *    - Jaise building construction mein stages hote hain (foundation, construction, demolition)
 *    - Lifecycle Methods bhi waise hi - component stages
 *    - Foundation = Mount (component setup)
 *    - Construction = Update (component changes)
 *    - Demolition = Unmount (component cleanup)
 *
 * 3. Movie Production:
 *    - Jaise movie mein stages hote hain (pre-production, production, post-production)
 *    - Lifecycle Methods bhi waise hi - component stages
 *    - Pre-production = componentWillMount (before render)
 *    - Production = componentDidMount (after render)
 *    - Post-production = componentDidUpdate (after update)
 *
 * Class Component Lifecycle Methods:
 *
 * 1. **Mounting Phase (Component Create):**
 *    - constructor() - Component initialize
 *    - componentWillMount() - Before render (deprecated)
 *    - render() - JSX return
 *    - componentDidMount() - After render (API calls, subscriptions)
 *
 * 2. **Updating Phase (Component Update):**
 *    - componentWillReceiveProps() - Props change (deprecated)
 *    - shouldComponentUpdate() - Re-render control
 *    - componentWillUpdate() - Before update (deprecated)
 *    - render() - JSX return
 *    - componentDidUpdate() - After update (DOM operations)
 *
 * 3. **Unmounting Phase (Component Remove):**
 *    - componentWillUnmount() - Before remove (cleanup)
 *
 * Functional Components with Hooks (Equivalent):
 *
 * 1. **Mounting (componentDidMount):**
 *    useEffect(() => {
 *      // Code runs after mount
 *    }, []); // Empty dependency array
 *
 * 2. **Updating (componentDidUpdate):**
 *    useEffect(() => {
 *      // Code runs after update
 *    }, [dependency]); // Dependency array
 *
 * 3. **Unmounting (componentWillUnmount):**
 *    useEffect(() => {
 *      return () => {
 *        // Cleanup code
 *      };
 *    }, []);
 *
 * 4. **All Updates (componentDidMount + componentDidUpdate):**
 *    useEffect(() => {
 *      // Code runs after every render
 *    }); // No dependency array
 *
 * Comparison Table:
 *
 * Class Component              | Functional Component (Hooks)
 * ----------------------------|------------------------------
 * componentDidMount           | useEffect(() => {}, [])
 * componentDidUpdate          | useEffect(() => {}, [dep])
 * componentWillUnmount        | useEffect(() => { return () => {} }, [])
 * componentDidMount + Update  | useEffect(() => {})
 * shouldComponentUpdate       | React.memo()
 * componentWillReceiveProps   | useEffect(() => {}, [props])
 *
 * LIFECYCLE METHODS - EASY ENGLISH EXPLANATION
 *
 * Lifecycle Methods in React class components allow code execution at different stages
 * of a component's life (mount, update, unmount). In functional components, hooks (useEffect)
 * achieve the same functionality.
 *
 * Key Concepts:
 * - **Component Stages:** Mount (create), Update (re-render), Unmount (remove)
 * - **Class Components:** Lifecycle methods for each stage
 * - **Functional Components:** useEffect hook for lifecycle functionality
 * - **Equivalent:** Hooks provide same functionality as lifecycle methods
 *
 * Class Component Lifecycle Phases:
 *
 * 1. **Mounting Phase:**
 *    - constructor() - Initialize component
 *    - componentWillMount() - Before render (deprecated)
 *    - render() - Return JSX
 *    - componentDidMount() - After render (API calls, subscriptions)
 *
 * 2. **Updating Phase:**
 *    - componentWillReceiveProps() - Props change (deprecated)
 *    - shouldComponentUpdate() - Control re-render
 *    - componentWillUpdate() - Before update (deprecated)
 *    - render() - Return JSX
 *    - componentDidUpdate() - After update (DOM operations)
 *
 * 3. **Unmounting Phase:**
 *    - componentWillUnmount() - Before removal (cleanup)
 *
 * Functional Components with Hooks:
 *
 * 1. **Mounting (componentDidMount):**
 *    useEffect(() => {
 *      // Runs after mount
 *    }, []); // Empty array = run once
 *
 * 2. **Updating (componentDidUpdate):**
 *    useEffect(() => {
 *      // Runs after update
 *    }, [dependency]); // Run when dependency changes
 *
 * 3. **Unmounting (componentWillUnmount):**
 *    useEffect(() => {
 *      return () => {
 *        // Cleanup
 *      };
 *    }, []);
 *
 * 4. **All Updates:**
 *    useEffect(() => {
 *      // Runs after every render
 *    }); // No array = run every render
 *
 * Key Differences:
 * - **Class Components:** Separate methods for each lifecycle
 * - **Functional Components:** Single useEffect for all lifecycle needs
 * - **Modern Approach:** Functional components + hooks (recommended)
 * - **Flexibility:** useEffect more flexible than lifecycle methods
 *
 * Best Practices:
 * - Use functional components + hooks (modern approach)
 * - Use useEffect for all lifecycle needs
 * - Always include dependencies in useEffect
 * - Return cleanup function for subscriptions/timers
 */

// ============================================
// CLASS COMPONENT LIFECYCLE EXAMPLE
// ============================================

class LifecycleExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    console.log('1. Constructor - Component initializing');
  }

  componentDidMount() {
    console.log('3. componentDidMount - Component mounted');
    // API calls, subscriptions here
    this.timer = setInterval(() => {
      this.setState({ count: this.state.count + 1 });
    }, 1000);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('5. componentDidUpdate - Component updated');
    if (prevState.count !== this.state.count) {
      console.log('Count changed from', prevState.count, 'to', this.state.count);
    }
  }

  componentWillUnmount() {
    console.log('6. componentWillUnmount - Component unmounting');
    // Cleanup: clear timers, unsubscribe
    clearInterval(this.timer);
  }

  render() {
    console.log('2/4. Render - Component rendering');
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Increment
        </button>
      </div>
    );
  }
}

// ============================================
// FUNCTIONAL COMPONENT WITH HOOKS (EQUIVALENT)
// ============================================

function LifecycleExampleHook() {
  const [count, setCount] = useState(0);

  // componentDidMount equivalent
  useEffect(() => {
    console.log('Component mounted');
    const timer = setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000);

    // componentWillUnmount equivalent (cleanup)
    return () => {
      console.log('Component unmounting');
      clearInterval(timer);
    };
  }, []); // Empty array = run once on mount

  // componentDidUpdate equivalent
  useEffect(() => {
    console.log('Component updated, count:', count);
  }, [count]); // Run when count changes

  console.log('Component rendering');
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
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

