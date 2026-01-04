# POLYFILLS

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Polyfill kya hai?**
- Polyfill missing feature ko implement karta hai
- Older browsers ke liye support
- Native implementation nahi hai to polyfill use karo
- JavaScript mein common practice
- Backward compatibility ke liye

**Real-life Analogy:**
- Polyfill = Adapter
- Missing feature = Missing plug
- Polyfill = Adapter plug
- Compatibility = Works everywhere

**Polyfill Examples:**
- **Array methods:** map, filter, reduce
- **Promise:** Async operations
- **Object.assign:** Object copying
- **String methods:** includes, startsWith
- **Fetch API:** HTTP requests

**Polyfill vs Shim:**
- **Polyfill:** Feature add karta hai
- **Shim:** API wrap karta hai
- Both compatibility ke liye

---

## B) Easy English Theory

### What are Polyfills?

Polyfills implement missing features for older browsers. Provide backward compatibility when native implementation not available. Examples: Array methods (map, filter), Promise, Object.assign, String methods, Fetch API. Process: Check if feature exists, if not implement polyfill, use native if available. Use for: Supporting older browsers, ensuring compatibility.

---

## C) Why This Concept Exists

### The Problem

**Without Polyfills:**
- Features not available in older browsers
- Code breaks in older environments
- No backward compatibility
- Limited browser support

### The Solution

**Polyfills Provide:**
1. **Compatibility:** Support older browsers
2. **Consistency:** Same behavior everywhere
3. **Progressive Enhancement:** Use native when available
4. **Flexibility:** Add missing features
5. **Reliability:** Code works across browsers

---

## D) Practical Example (Code)

```javascript
// ============================================
// ARRAY.PROTOTYPE.MAP POLYFILL
// ============================================

if (!Array.prototype.map) {
  Array.prototype.map = function(callback, thisArg) {
    if (this == null) {
      throw new TypeError('this is null or not defined');
    }
    
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }
    
    const O = Object(this);
    const len = O.length >>> 0; // Convert to uint32
    const A = new Array(len);
    let k = 0;
    
    while (k < len) {
      if (k in O) {
        const kValue = O[k];
        const mappedValue = callback.call(thisArg, kValue, k, O);
        A[k] = mappedValue;
      }
      k++;
    }
    
    return A;
  };
}

// ============================================
// ARRAY.PROTOTYPE.FILTER POLYFILL
// ============================================

if (!Array.prototype.filter) {
  Array.prototype.filter = function(callback, thisArg) {
    if (this == null) {
      throw new TypeError('this is null or not defined');
    }
    
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }
    
    const O = Object(this);
    const len = O.length >>> 0;
    const A = [];
    let k = 0;
    
    while (k < len) {
      if (k in O) {
        const kValue = O[k];
        if (callback.call(thisArg, kValue, k, O)) {
          A.push(kValue);
        }
      }
      k++;
    }
    
    return A;
  };
}

// ============================================
// ARRAY.PROTOTYPE.REDUCE POLYFILL
// ============================================

if (!Array.prototype.reduce) {
  Array.prototype.reduce = function(callback, initialValue) {
    if (this == null) {
      throw new TypeError('this is null or not defined');
    }
    
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }
    
    const O = Object(this);
    const len = O.length >>> 0;
    let k = 0;
    let accumulator;
    
    if (arguments.length >= 2) {
      accumulator = initialValue;
    } else {
      if (len === 0) {
        throw new TypeError('Reduce of empty array with no initial value');
      }
      accumulator = O[k++];
    }
    
    while (k < len) {
      if (k in O) {
        accumulator = callback(accumulator, O[k], k, O);
      }
      k++;
    }
    
    return accumulator;
  };
}

// ============================================
// PROMISE POLYFILL (SIMPLIFIED)
// ============================================

if (!window.Promise) {
  window.Promise = function(executor) {
    const self = this;
    self.state = 'pending';
    self.value = undefined;
    self.handlers = [];
    
    function resolve(result) {
      if (self.state === 'pending') {
        self.state = 'fulfilled';
        self.value = result;
        self.handlers.forEach(handle);
        self.handlers = null;
      }
    }
    
    function reject(error) {
      if (self.state === 'pending') {
        self.state = 'rejected';
        self.value = error;
        self.handlers.forEach(handle);
        self.handlers = null;
      }
    }
    
    function handle(handler) {
      if (self.state === 'pending') {
        self.handlers.push(handler);
      } else {
        if (self.state === 'fulfilled' && typeof handler.onFulfilled === 'function') {
          handler.onFulfilled(self.value);
        }
        if (self.state === 'rejected' && typeof handler.onRejected === 'function') {
          handler.onRejected(self.value);
        }
      }
    }
    
    this.then = function(onFulfilled, onRejected) {
      return new Promise(function(resolve, reject) {
        handle({
          onFulfilled: function(result) {
            try {
              resolve(onFulfilled ? onFulfilled(result) : result);
            } catch (ex) {
              reject(ex);
            }
          },
          onRejected: function(error) {
            try {
              resolve(onRejected ? onRejected(error) : error);
            } catch (ex) {
              reject(ex);
            }
          }
        });
      });
    };
    
    executor(resolve, reject);
  };
}

// ============================================
// OBJECT.ASSIGN POLYFILL
// ============================================

if (typeof Object.assign !== 'function') {
  Object.assign = function(target) {
    if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }
    
    const to = Object(target);
    
    for (let index = 1; index < arguments.length; index++) {
      const nextSource = arguments[index];
      
      if (nextSource != null) {
        for (const nextKey in nextSource) {
          if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
    
    return to;
  };
}

// ============================================
// ARRAY.PROTOTYPE.FIND POLYFILL
// ============================================

if (!Array.prototype.find) {
  Array.prototype.find = function(predicate) {
    if (this == null) {
      throw new TypeError('this is null or not defined');
    }
    
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    
    const O = Object(this);
    const len = O.length >>> 0;
    const thisArg = arguments[1];
    let k = 0;
    
    while (k < len) {
      const kValue = O[k];
      if (predicate.call(thisArg, kValue, k, O)) {
        return kValue;
      }
      k++;
    }
    
    return undefined;
  };
}

// ============================================
// ARRAY.PROTOTYPE.INCLUDES POLYFILL
// ============================================

if (!Array.prototype.includes) {
  Array.prototype.includes = function(searchElement, fromIndex) {
    if (this == null) {
      throw new TypeError('this is null or not defined');
    }
    
    const O = Object(this);
    const len = O.length >>> 0;
    
    if (len === 0) {
      return false;
    }
    
    const n = fromIndex | 0;
    let k = n >= 0 ? n : Math.max(len + n, 0);
    
    function sameValueZero(x, y) {
      return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
    }
    
    while (k < len) {
      if (sameValueZero(O[k], searchElement)) {
        return true;
      }
      k++;
    }
    
    return false;
  };
}

// ============================================
// STRING.PROTOTYPE.INCLUDES POLYFILL
// ============================================

if (!String.prototype.includes) {
  String.prototype.includes = function(search, start) {
    if (typeof start !== 'number') {
      start = 0;
    }
    
    if (start + search.length > this.length) {
      return false;
    } else {
      return this.indexOf(search, start) !== -1;
    }
  };
}

// ============================================
// POLYFILL LOADER PATTERN
// ============================================

(function() {
  'use strict';
  
  // Check if feature exists
  function needsPolyfill(feature) {
    // Implementation check
    return typeof feature === 'undefined';
  }
  
  // Load polyfills
  const polyfills = [];
  
  if (needsPolyfill(Array.prototype.map)) {
    polyfills.push(loadMapPolyfill);
  }
  
  if (needsPolyfill(Promise)) {
    polyfills.push(loadPromisePolyfill);
  }
  
  // Load all needed polyfills
  polyfills.forEach(polyfill => polyfill());
})();
```

---

## E) Internal Working

**Polyfill Process:**
1. **Feature Detection:** Check if feature exists
2. **Conditional Load:** Load only if missing
3. **Implementation:** Provide implementation
4. **Compatibility:** Match native behavior
5. **Progressive:** Use native when available

---

## F) Interview Questions & Answers

### Q1: What is a Polyfill and why is it needed?

**Answer:**
Polyfill implements missing features for older browsers. Needed for: Backward compatibility, supporting older browsers, ensuring code works everywhere. Process: Check if feature exists, if not implement polyfill, use native if available. Examples: Array methods (map, filter), Promise, Object.assign. Use when: Need to support older browsers, feature not available.

### Q2: How do you write a Polyfill?

**Answer:**
Write polyfill: Check if feature exists (if (!Array.prototype.map)), implement feature matching native behavior, handle edge cases (null, undefined, type checks), maintain compatibility with native API, test across browsers. Key: Match native behavior exactly, handle all edge cases, use feature detection before adding. Example: Array.prototype.map polyfill checks this, callback type, handles sparse arrays.

### Q3: What is the difference between Polyfill and Shim?

**Answer:**
Polyfill: Implements missing feature, adds functionality, provides same API as native, use when feature missing. Shim: Wraps existing API, modifies behavior, provides different interface, use for API compatibility. Both: Provide compatibility, support older browsers. Polyfill = "Add missing", Shim = "Wrap existing".

---

## G) Common Mistakes

### Mistake 1: Not Checking if Feature Exists

```javascript
// ❌ WRONG - Overwrites native implementation
Array.prototype.map = function(callback) {
  // Implementation
};
// May break native optimizations

// ✅ CORRECT - Check first
if (!Array.prototype.map) {
  Array.prototype.map = function(callback) {
    // Implementation
  };
}
```

**Why it breaks:** Overwriting native can break optimizations, cause conflicts.

---

## H) When to Use & When NOT to Use

Use Polyfills for: Supporting older browsers, missing features, backward compatibility. Don't use when: Modern browsers only, feature available, performance critical (native faster).

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain Polyfills."

**You:"
"Polyfills implement missing features for older browsers. Provide backward compatibility when native implementation not available. Process: Check if feature exists, if not implement polyfill, use native if available.

Examples: Array methods (map, filter), Promise, Object.assign. Write polyfill: Feature detection, implement matching native behavior, handle edge cases. Use for supporting older browsers, ensuring compatibility."

---

## J) Mini Practice Task

Practice: Write polyfills for map, filter, reduce, find, includes, understand feature detection, test polyfills, use polyfill libraries.

---

**END OF TOPIC: POLYFILLS**

