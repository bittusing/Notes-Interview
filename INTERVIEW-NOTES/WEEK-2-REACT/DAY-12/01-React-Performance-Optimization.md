# REACT PERFORMANCE OPTIMIZATION

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Performance Optimization kya hai?**
- Performance optimization app ko fast banana hai
- Unnecessary re-renders avoid karna
- Efficient rendering
- Better user experience
- React mein multiple techniques hain

**Optimization Techniques:**
- **React.memo:** Component memoization
- **useMemo:** Value memoization
- **useCallback:** Function memoization
- **Code Splitting:** Lazy loading
- **Virtualization:** Large lists
- **Debouncing/Throttling:** Event optimization

**Performance Issues:**
- Unnecessary re-renders
- Large component trees
- Expensive calculations
- Large lists
- Frequent updates

---

## B) Easy English Theory

### What is Performance Optimization?

Performance Optimization improves React app speed and efficiency. Techniques: React.memo (prevent unnecessary re-renders), useMemo (memoize values), useCallback (memoize functions), Code Splitting (lazy load components), Virtualization (render large lists efficiently), Debouncing/Throttling (optimize events). Issues: Unnecessary re-renders, expensive calculations, large lists. Goal: Faster rendering, better UX.

---

## C) Why This Concept Exists

### The Problem

**Without Optimization:**
- Slow rendering
- Unnecessary re-renders
- Poor performance
- Bad user experience
- High memory usage

### The Solution

**Optimization Provides:**
1. **Faster Rendering:** Optimized updates
2. **Less Re-renders:** Memoization
3. **Better UX:** Smooth interactions
4. **Efficiency:** Resource optimization
5. **Scalability:** Handle large apps

---

## D) Practical Example (Code)

```jsx
// ============================================
// React.memo
// ============================================

import React, { memo } from 'react';

// Memo prevents re-render if props unchanged
const ExpensiveComponent = memo(({ data }) => {
  console.log('Rendering ExpensiveComponent');
  return <div>{data}</div>;
});

// Custom comparison
const CustomMemo = memo(
  ({ name, age }) => {
    return <div>{name} - {age}</div>;
  },
  (prevProps, nextProps) => {
    // Return true if props are equal (skip re-render)
    return prevProps.name === nextProps.name &&
           prevProps.age === nextProps.age;
  }
);

// ============================================
// useMemo
// ============================================

import React, { useState, useMemo } from 'react';

function ExpensiveCalculation({ items }) {
  // Expensive calculation only runs when items change
  const total = useMemo(() => {
    console.log('Calculating total...');
    return items.reduce((sum, item) => sum + item.value, 0);
  }, [items]);
  
  return <div>Total: {total}</div>;
}

// ============================================
// useCallback
// ============================================

import React, { useState, useCallback, memo } from 'react';

const ChildComponent = memo(({ onClick, name }) => {
  console.log('Child rendered');
  return <button onClick={onClick}>{name}</button>;
});

function ParentComponent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('Child');
  
  // useCallback memoizes function
  // Same function reference unless deps change
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
// CODE SPLITTING
// ============================================

import { lazy, Suspense } from 'react';

// Lazy load component
const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}

// Route-based code splitting
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Suspense>
  );
}

// ============================================
// VIRTUALIZATION (REACT-WINDOW)
// ============================================

import { FixedSizeList } from 'react-window';

function VirtualizedList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      {items[index].name}
    </div>
  );
  
  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={50}
      width="100%"
    >
      {Row}
    </FixedSizeList>
  );
}

// ============================================
// DEBOUNCING
// ============================================

import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  
  return debouncedValue;
}

function SearchInput() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  
  useEffect(() => {
    if (debouncedSearchTerm) {
      // Perform search
      console.log('Searching:', debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);
  
  return (
    <input
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}

// ============================================
// THROTTLING
// ============================================

function useThrottle(value, limit) {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastRan = useRef(Date.now());
  
  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= limit) {
        setThrottledValue(value);
        lastRan.current = Date.now();
      }
    }, limit - (Date.now() - lastRan.current));
    
    return () => {
      clearTimeout(handler);
    };
  }, [value, limit]);
  
  return throttledValue;
}

// ============================================
// OPTIMIZATION PATTERNS
// ============================================

// 1. Split components
function OptimizedList({ items }) {
  // Split into smaller components
  return (
    <div>
      {items.map(item => (
        <ListItem key={item.id} item={item} />
      ))}
    </div>
  );
}

const ListItem = memo(({ item }) => {
  return <div>{item.name}</div>;
});

// 2. Avoid inline functions
function BadComponent() {
  return (
    <Child onClick={() => console.log('click')} />
  );
}

function GoodComponent() {
  const handleClick = useCallback(() => {
    console.log('click');
  }, []);
  
  return <Child onClick={handleClick} />;
}

// 3. Avoid inline objects
function BadComponent() {
  return <Child style={{ color: 'red' }} />;
}

const style = { color: 'red' };
function GoodComponent() {
  return <Child style={style} />;
}
```

---

## E) Internal Working

**Optimization Mechanisms:**
- **Memoization:** Cache results
- **Shallow Comparison:** Compare props/state
- **Batching:** Group updates
- **Lazy Loading:** Load on demand
- **Virtualization:** Render visible items

---

## F) Interview Questions & Answers

### Q1: How do you optimize React performance?

**Answer:**
Optimize React: React.memo (prevent unnecessary re-renders), useMemo (memoize expensive calculations), useCallback (memoize functions), Code Splitting (lazy load components), Virtualization (large lists), Debouncing/Throttling (events), Avoid inline functions/objects, Split large components, Use keys properly. Tools: React DevTools Profiler, identify bottlenecks, measure before/after. Goal: Reduce re-renders, optimize calculations, efficient rendering.

### Q2: What is the difference between useMemo and useCallback?

**Answer:**
useMemo: Memoizes computed values, returns memoized value, use for expensive calculations, dependencies array controls recalculation. useCallback: Memoizes functions, returns memoized function reference, use to prevent child re-renders, dependencies array controls new function creation. Example: useMemo for `const total = useMemo(() => sum(items), [items])`, useCallback for `const handler = useCallback(() => {}, [deps])`. Both optimize performance, different use cases.

### Q3: When should you use React.memo?

**Answer:**
Use React.memo when: Component receives same props frequently, expensive to render, parent re-renders often, props are primitive or stable references. Don't use when: Props change frequently, component is simple, memoization overhead > benefit. React.memo does shallow comparison, can provide custom comparison function. Use with useCallback/useMemo for props to maximize benefit.

---

## G) Common Mistakes

### Mistake 1: Overusing Memoization

```jsx
// ❌ WRONG - Memoizing everything
const SimpleComponent = memo(({ text }) => {
  return <div>{text}</div>;
});
// Overhead > benefit

// ✅ CORRECT - Memoize only expensive components
const ExpensiveComponent = memo(({ data }) => {
  // Expensive rendering
  return <ComplexVisualization data={data} />;
});
```

**Why it breaks:** Memoization has overhead, use only when benefit > cost.

---

## H) When to Use & When NOT to Use

Use optimization for: Expensive components, frequent re-renders, large lists, performance issues. Don't optimize prematurely: Measure first, optimize bottlenecks, avoid over-optimization.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "How do you optimize React performance?"

**You:"
"React optimization: React.memo (prevent re-renders), useMemo (memoize values), useCallback (memoize functions), Code Splitting (lazy load), Virtualization (large lists), Debouncing/Throttling (events).

Key: Identify bottlenecks with Profiler, optimize expensive operations, reduce unnecessary re-renders. Don't over-optimize - measure first, optimize where needed. Tools: React DevTools, performance monitoring."

---

## J) Mini Practice Task

Practice: Use React.memo, implement useMemo/useCallback, code split components, virtualize large lists, debounce/throttle events, profile performance, optimize bottlenecks.

---

**END OF TOPIC: REACT PERFORMANCE OPTIMIZATION**

