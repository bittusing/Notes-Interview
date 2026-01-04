# DEBOUNCE & THROTTLE

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Debounce kya hai?**
- Debounce function ko delay karta hai
- Last call ke baad wait karta hai
- Multiple calls ko single call mein convert karta hai
- Search input, resize events mein use hota hai
- User typing complete hone ke baad action

**Real-life Analogy:**
- Debounce = Elevator button
- Multiple clicks = Single action
- Wait karo = Last click ke baad
- Action = Elevator move

**Throttle kya hai?**
- Throttle function ko limit karta hai
- Fixed interval mein execute karta hai
- Maximum frequency control karta hai
- Scroll, mousemove events mein use hota hai
- Regular intervals par action

**Real-life Analogy:**
- Throttle = Speed limit
- Maximum speed = Fixed interval
- Control = Frequency limit
- Regular = Consistent intervals

**Difference:**
- **Debounce:** Last call ke baad wait, then execute
- **Throttle:** Fixed interval mein execute, ignore in-between

---

## B) Easy English Theory

### What are Debounce and Throttle?

Debounce delays function execution until after wait period since last call. Multiple calls become single call. Use for: Search input (wait for typing to stop), resize events, button clicks. Throttle limits function execution to fixed interval. Maximum frequency control. Use for: Scroll events, mousemove, window resize. Difference: Debounce waits after last call, Throttle executes at fixed intervals.

---

## C) Why This Concept Exists

### The Problem

**Without Debounce/Throttle:**
- Too many function calls
- Performance issues
- Unnecessary API calls
- Poor user experience
- Resource waste

### The Solution

**Debounce/Throttle Provide:**
1. **Performance:** Reduce function calls
2. **Efficiency:** Optimize resource usage
3. **UX:** Better user experience
4. **Control:** Limit execution frequency
5. **Cost:** Reduce API calls

---

## D) Practical Example (Code)

```javascript
// ============================================
// DEBOUNCE IMPLEMENTATION
// ============================================

function debounce(func, delay) {
  let timeoutId;
  
  return function(...args) {
    // Clear previous timeout
    clearTimeout(timeoutId);
    
    // Set new timeout
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Usage
const debouncedSearch = debounce((query) => {
  console.log('Searching for:', query);
  // API call
}, 500);

// Input event
input.addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});

// ============================================
// THROTTLE IMPLEMENTATION
// ============================================

function throttle(func, limit) {
  let inThrottle;
  
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

// Usage
const throttledScroll = throttle(() => {
  console.log('Scroll event');
  // Handle scroll
}, 100);

window.addEventListener('scroll', throttledScroll);

// ============================================
// ADVANCED DEBOUNCE (IMMEDIATE OPTION)
// ============================================

function debounceAdvanced(func, delay, immediate = false) {
  let timeoutId;
  
  return function(...args) {
    const callNow = immediate && !timeoutId;
    
    clearTimeout(timeoutId);
    
    timeoutId = setTimeout(() => {
      timeoutId = null;
      if (!immediate) {
        func.apply(this, args);
      }
    }, delay);
    
    if (callNow) {
      func.apply(this, args);
    }
  };
}

// ============================================
// ADVANCED THROTTLE (LEADING/TRAILING)
// ============================================

function throttleAdvanced(func, limit, options = {}) {
  let timeoutId;
  let lastRan;
  const { leading = true, trailing = true } = options;
  
  return function(...args) {
    if (!lastRan && leading) {
      func.apply(this, args);
      lastRan = Date.now();
    } else {
      clearTimeout(timeoutId);
      
      timeoutId = setTimeout(() => {
        if (trailing && Date.now() - lastRan >= limit) {
          func.apply(this, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

// ============================================
// REAL-WORLD EXAMPLES
// ============================================

// 1. Search Input
const searchInput = document.getElementById('search');
const debouncedSearch = debounce(async (query) => {
  if (query.length < 3) return;
  
  const results = await fetch(`/api/search?q=${query}`);
  const data = await results.json();
  displayResults(data);
}, 300);

searchInput.addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});

// 2. Window Resize
const debouncedResize = debounce(() => {
  console.log('Window resized');
  // Recalculate layout
}, 250);

window.addEventListener('resize', debouncedResize);

// 3. Scroll Events
const throttledScroll = throttle(() => {
  const scrollTop = window.pageYOffset;
  
  if (scrollTop > 100) {
    showBackToTop();
  } else {
    hideBackToTop();
  }
}, 100);

window.addEventListener('scroll', throttledScroll);

// 4. Button Clicks (Prevent Double Click)
const debouncedClick = debounce(() => {
  submitForm();
}, 1000);

button.addEventListener('click', debouncedClick);

// ============================================
// REACT HOOKS VERSION
// ============================================

import { useState, useEffect, useRef } from 'react';

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

// Usage in React
function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  
  useEffect(() => {
    if (debouncedSearchTerm) {
      // Perform search
      fetchResults(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);
  
  return (
    <input
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}
```

---

## E) Internal Working

**Debounce Flow:**
1. Function call
2. Clear previous timeout
3. Set new timeout
4. Wait for delay
5. Execute function

**Throttle Flow:**
1. Function call
2. Check if in throttle
3. If not, execute and set throttle
4. Ignore calls during throttle
5. Reset after interval

---

## F) Interview Questions & Answers

### Q1: What is the difference between Debounce and Throttle?

**Answer:**
Debounce: Delays execution until after wait period since last call. Multiple calls become single call. Use for search input (wait for typing to stop), resize events. Throttle: Limits execution to fixed interval. Maximum frequency control. Use for scroll events, mousemove. Difference: Debounce waits after last call, Throttle executes at fixed intervals. Debounce = "Wait for silence", Throttle = "Execute at intervals".

### Q2: When would you use Debounce vs Throttle?

**Answer:**
Use Debounce for: Search input (wait for typing to stop), resize events (wait for resizing to stop), button clicks (prevent double click), form validation (wait for input to stop). Use Throttle for: Scroll events (regular updates), mousemove (tracking), window resize (layout updates), API polling (regular calls). Rule: Debounce when you want "after user stops", Throttle when you want "at regular intervals".

### Q3: How do you implement Debounce and Throttle?

**Answer:**
Debounce: Store timeout ID, clear previous timeout on each call, set new timeout, execute function after delay. Throttle: Track if in throttle period, execute if not throttled, set throttle flag, reset after interval. Key: Debounce uses setTimeout, Throttle uses flag + setTimeout. Both return new function that wraps original.

---

## G) Common Mistakes

### Mistake 1: Not Clearing Timeout

```javascript
// ❌ WRONG - Doesn't clear previous timeout
function debounce(func, delay) {
  setTimeout(() => {
    func();
  }, delay);
}
// Multiple calls execute

// ✅ CORRECT - Clear previous timeout
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}
```

**Why it breaks:** Without clearing, all calls execute, defeats purpose.

---

## H) When to Use & When NOT to Use

Use Debounce for: Search input, resize events, button clicks, form validation. Use Throttle for: Scroll events, mousemove, window resize, API polling. Don't use when: Need immediate execution, simple event handlers sufficient.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain Debounce and Throttle."

**You:"
"Debounce delays function execution until after wait period since last call. Multiple calls become single call. Use for search input, resize events. Throttle limits execution to fixed interval. Use for scroll events, mousemove.

Difference: Debounce waits after last call, Throttle executes at fixed intervals. Implementation: Debounce uses setTimeout with clearTimeout, Throttle uses flag + setTimeout. Both optimize performance by reducing function calls."

---

## J) Mini Practice Task

Practice: Implement debounce and throttle, use in search input, scroll events, resize events, create React hooks versions, understand when to use which.

---

**END OF TOPIC: DEBOUNCE & THROTTLE**

