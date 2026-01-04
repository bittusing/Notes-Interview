# GARBAGE COLLECTION

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Garbage Collection kya hai?**
- Garbage Collection ek automatic memory management system hai
- Ye unused objects ko identify karta hai
- Unused memory ko automatically free karta hai
- Developer ko manually memory manage karne ki zarurat nahi
- JavaScript engine automatically ye kaam karti hai

**Real-life Analogy:**
- Imagine ek room jahan items rakhe hain
- Kuch items use nahi ho rahe (unreachable)
- Safai wala (GC) aata hai
- Unused items ko identify karta hai
- Unhe hata deta hai
- Room clean rehta hai automatically

**Kyu Important?**
- Memory limited hoti hai
- Agar unused objects memory mein rehte rahe, memory full ho jati hai
- Application slow ho jata hai
- Crash bhi ho sakta hai
- GC automatically clean karta hai

### How Garbage Collection Works

**Basic Concept:**
- JavaScript engine track karti hai ki kaunse objects "reachable" hain
- Reachable = kisi variable, function, ya reference se access ho sakta hai
- Unreachable objects = "garbage"
- GC unhe delete kar deta hai

**Reachability:**
- Global variables se accessible = reachable
- Currently executing functions ke variables = reachable
- Reference chain mein ho = reachable
- Kisi se bhi access nahi = unreachable (garbage)

### Mark and Sweep Algorithm

**Step 1: Mark Phase**
- GC sabhi reachable objects ko mark karta hai
- Global variables se start karta hai
- Har reachable object ke references ko follow karta hai
- Chain mein sabhi objects ko mark karta hai

**Step 2: Sweep Phase**
- Unmarked objects ko identify karta hai
- Unhe memory se remove kar deta hai
- Memory free ho jati hai

**Step 3: Compact Phase (Optional)**
- Memory ko defragment karta hai
- Objects ko rearrange karta hai
- Better memory utilization

### Generational Garbage Collection

**Young Generation:**
- Naye objects yahan store hote hain
- Small space (1-8 MB typically)
- Frequent GC (fast)
- Most objects yahan mar jate hain
- Scavenge algorithm use hota hai

**Old Generation:**
- Long-lived objects yahan move hote hain
- Large space
- Less frequent GC (slower)
- Mark-sweep-compact algorithm
- Objects survive multiple young GC cycles

**Why Generational?**
- Most objects jaldi mar jate hain
- Young generation mein fast GC efficient hai
- Old objects ko kam baar check karna padta hai
- Overall performance better

### V8 Garbage Collection

**V8 Engine Structure:**
- New Space (Young Generation)
- Old Space (Old Generation)
- Large Object Space (big objects)
- Code Space (compiled code)

**GC Types:**
1. **Scavenge:** Young generation GC (fast)
2. **Mark-Sweep:** Old generation GC (thorough)
3. **Mark-Compact:** Old generation with compaction
4. **Incremental:** GC work in small chunks

### When GC Runs

**Triggers:**
- Heap size threshold reach
- Memory pressure
- Explicit request (rare)
- Idle time (browsers)

**Timing:**
- Automatic
- Non-deterministic
- Can pause execution briefly
- Usually very fast

### Memory Leaks

**What are Memory Leaks?**
- Objects jo ab use nahi ho rahe
- Par GC unhe identify nahi kar pata
- Memory gradually full hoti jati hai
- Application slow ho jata hai

**Common Causes:**
1. **Global Variables:** Kabhi clean nahi hote
2. **Event Listeners:** Remove nahi kiye
3. **Closures:** Unnecessary data capture
4. **Timers:** clearInterval nahi kiye
5. **DOM References:** Removed elements ka reference
6. **Circular References:** (Modern GC handles this)

---

## B) Easy English Theory

### What is Garbage Collection?

Garbage Collection is automatic memory management where JavaScript engine identifies objects that are no longer reachable or needed, and frees their memory automatically. Developers don't need to manually allocate or free memory.

### How It Works

**Reachability:**
- Objects accessible from global variables, currently executing functions, or reference chains are "reachable"
- Unreachable objects are considered "garbage"
- GC marks all reachable objects, then deletes unmarked ones

### Mark and Sweep Algorithm

**Mark Phase:** GC starts from global variables and marks all reachable objects by following reference chains.

**Sweep Phase:** Unmarked objects are identified and deleted, freeing memory.

**Compact Phase:** Memory is defragmented for better utilization (optional).

### Generational GC

Objects are divided into young generation (new objects, fast GC) and old generation (long-lived objects, slower GC). Most objects die young, so frequent fast GC on young generation is efficient.

---

## C) Why This Concept Exists

### The Problem

**Without Garbage Collection:**
- Manual memory management required
- Easy to forget freeing memory (memory leaks)
- Hard to track all references
- Complex pointer management
- Crashes from memory errors

### The Solution

**Garbage Collection Provides:**
1. **Automatic Management:** No manual memory handling
2. **Memory Safety:** Prevents common memory errors
3. **Developer Productivity:** Focus on logic, not memory
4. **Reliability:** Fewer crashes from memory issues

### Real-World Need

- **Large Applications:** Complex memory management
- **Long-Running Apps:** Prevent gradual memory growth
- **Developer Experience:** Easier development
- **Security:** Prevents memory-related vulnerabilities

---

## D) Practical Example (Code)

```javascript
// ============================================
// BASIC GARBAGE COLLECTION DEMONSTRATION
// ============================================

function createObject() {
  return {
    data: new Array(1000).fill(0),
    timestamp: Date.now()
  };
}

function testGC() {
  let obj = createObject();
  console.log('Object created');
  // obj goes out of scope here
  // GC can collect it after function returns
}

testGC();
// Object is now unreachable and can be garbage collected

// ============================================
// REACHABILITY EXAMPLE
// ============================================

// ✅ REACHABLE - Global variable
var globalObj = { name: "Global" };

function testReachability() {
  // ✅ REACHABLE - Local variable in executing function
  var localObj = { name: "Local" };
  
  // ✅ REACHABLE - Referenced by localObj
  localObj.nested = { value: 100 };
  
  // ❌ UNREACHABLE after function returns
  // localObj becomes unreachable (unless returned)
  
  return localObj; // Now it's reachable via return value
}

var returned = testReachability();
// returned is reachable (referenced by global variable)
// returned.nested is also reachable (via returned)

// ============================================
// MEMORY LEAK: GLOBAL VARIABLES
// ============================================

// ❌ LEAK: Global variable never collected
window.hugeData = new Array(1000000).fill(0);
// This will never be garbage collected (always reachable)

// ✅ FIX: Use local scope
function processData() {
  let hugeData = new Array(1000000).fill(0);
  // Process data
  hugeData = null; // Help GC (though not strictly necessary)
}
// hugeData becomes unreachable after function

// ============================================
// MEMORY LEAK: EVENT LISTENERS
// ============================================

// ❌ LEAK: Listener never removed
function setupLeakyListener() {
  const button = document.getElementById('btn');
  button.addEventListener('click', function() {
    console.log('Clicked');
    // Closure keeps button reference
  });
  // If button removed from DOM, listener still holds reference
}

// ✅ FIX: Remove listeners
function setupCleanListener() {
  const button = document.getElementById('btn');
  const handler = function() {
    console.log('Clicked');
  };
  button.addEventListener('click', handler);
  
  return function cleanup() {
    button.removeEventListener('click', handler);
  };
}

// ============================================
// MEMORY LEAK: CLOSURES CAPTURING LARGE DATA
// ============================================

// ❌ LEAK: Closure captures unnecessary large data
function createLeakyHandler() {
  const hugeArray = new Array(1000000).fill(0);
  const unusedObject = { /* large object */ };
  
  return function() {
    console.log('Handler');
    // Doesn't use hugeArray or unusedObject
    // But closure keeps them in memory!
  };
}

// ✅ FIX: Don't capture what you don't need
function createCleanHandler() {
  return function() {
    console.log('Handler');
    // No unnecessary closures
  };
}

// Or pass data as parameter instead of capturing
function createHandler(data) {
  return function() {
    console.log('Handler with', data);
  };
}

// ============================================
// MEMORY LEAK: TIMERS
// ============================================

// ❌ LEAK: Timer never cleared
function startLeakyTimer() {
  setInterval(function() {
    console.log('Tick');
    // Keeps running, never cleaned
  }, 1000);
}

// ✅ FIX: Store and clear
let intervalId = setInterval(function() {
  console.log('Tick');
}, 1000);

// Later, when done:
clearInterval(intervalId);

// ============================================
// MEMORY LEAK: DOM REFERENCES
// ============================================

// ❌ LEAK: Reference to removed element
let elements = [];
function addElement() {
  const div = document.createElement('div');
  document.body.appendChild(div);
  elements.push(div); // Store reference
}

function removeElement() {
  const div = elements.pop();
  document.body.removeChild(div);
  // div still in elements array = memory leak!
}

// ✅ FIX: Clear references
function removeElementClean() {
  const div = elements.pop();
  document.body.removeChild(div);
  elements = []; // Clear array, or remove specific element
}

// ============================================
// CIRCULAR REFERENCES (MODERN GC HANDLES)
// ============================================

// Modern GC (Mark and Sweep) handles circular references
let obj1 = { name: "Object 1" };
let obj2 = { name: "Object 2" };

obj1.ref = obj2;
obj2.ref = obj1;

obj1 = null;
obj2 = null;

// Both objects are unreachable (no global reference)
// Modern GC will collect them despite circular reference

// ============================================
// MONITORING MEMORY USAGE
// ============================================

// Browser Memory API
if (performance.memory) {
  console.log('Used Heap:', performance.memory.usedJSHeapSize / 1024 / 1024, 'MB');
  console.log('Total Heap:', performance.memory.totalJSHeapSize / 1024 / 1024, 'MB');
  console.log('Heap Limit:', performance.memory.jsHeapSizeLimit / 1024 / 1024, 'MB');
}

// Node.js Memory Usage
function logMemory() {
  const usage = process.memoryUsage();
  console.log({
    rss: `${Math.round(usage.rss / 1024 / 1024)} MB`,
    heapTotal: `${Math.round(usage.heapTotal / 1024 / 1024)} MB`,
    heapUsed: `${Math.round(usage.heapUsed / 1024 / 1024)} MB`,
    external: `${Math.round(usage.external / 1024 / 1024)} MB`
  });
}

// Monitor over time
setInterval(logMemory, 5000);

// ============================================
// FORCING GARBAGE COLLECTION (NODE.JS)
// ============================================

// Only works if Node.js started with --expose-gc flag
// node --expose-gc script.js

if (global.gc) {
  console.log('Before GC:');
  logMemory();
  
  global.gc(); // Force garbage collection
  
  console.log('After GC:');
  logMemory();
}

// ============================================
// WEAKMAP AND WEAKSET (HELP GC)
// ============================================

// WeakMap doesn't prevent GC of keys
const weakMap = new WeakMap();
let obj = { data: "test" };
weakMap.set(obj, "value");

obj = null; // obj can be GC'd even though it's a WeakMap key
// WeakMap entry will be automatically removed

// WeakSet similar - doesn't prevent GC
const weakSet = new WeakSet();
let obj2 = { id: 1 };
weakSet.add(obj2);

obj2 = null; // obj2 can be GC'd

// ============================================
// PRACTICAL: MEMORY LEAK DETECTION
// ============================================

class MemoryMonitor {
  constructor() {
    this.snapshots = [];
  }
  
  takeSnapshot() {
    if (performance.memory) {
      this.snapshots.push({
        time: Date.now(),
        used: performance.memory.usedJSHeapSize,
        total: performance.memory.totalJSHeapSize
      });
    }
  }
  
  detectLeak() {
    if (this.snapshots.length < 2) return false;
    
    const recent = this.snapshots.slice(-5);
    const trend = recent.map((s, i) => 
      i > 0 ? s.used - recent[i-1].used : 0
    ).slice(1);
    
    // If memory consistently growing
    return trend.every(change => change > 0) && 
           trend.reduce((a, b) => a + b, 0) > 1000000; // > 1MB growth
  }
}

const monitor = new MemoryMonitor();
setInterval(() => {
  monitor.takeSnapshot();
  if (monitor.detectLeak()) {
    console.warn('Potential memory leak detected!');
  }
}, 1000);
```

---

## E) Internal Working

### Step-by-Step Internal Flow

**1. GC Trigger**
```
Heap size reaches threshold
    OR
Memory pressure detected
    OR
Idle time available
    ↓
GC process starts
    ↓
JavaScript execution may pause briefly
```

**2. Mark Phase**
```
Start from root objects:
  - Global object
  - Currently executing functions
  - Call stack references
    ↓
Mark all reachable objects
    ↓
Follow references from marked objects
    ↓
Mark all referenced objects
    ↓
Continue until all reachable objects marked
```

**3. Sweep Phase**
```
Scan entire heap
    ↓
Identify unmarked objects
    ↓
Free memory occupied by unmarked objects
    ↓
Update memory allocation structures
```

**4. Compact Phase (Optional)**
```
Defragment memory
    ↓
Move objects to consolidate free space
    ↓
Update all references to moved objects
    ↓
Better memory utilization
```

**5. Resume Execution**
```
GC completes
    ↓
JavaScript execution resumes
    ↓
Memory available for new allocations
```

### Generational GC Flow

**Young Generation (New Space):**
```
New objects allocated in new space
    ↓
Frequent Scavenge GC (fast)
    ↓
Mark reachable objects in new space
    ↓
Copy reachable objects to old space
    ↓
Clear new space
    ↓
Objects that survive multiple cycles → old generation
```

**Old Generation (Old Space):**
```
Long-lived objects in old space
    ↓
Less frequent Mark-Sweep-Compact GC
    ↓
Thorough marking of all reachable objects
    ↓
Sweep unmarked objects
    ↓
Compact memory
```

### Memory Layout

```
Heap Memory:
┌─────────────────────────┐
│ New Space (Young Gen)   │ ← Fast GC, small
│ - New objects           │
│ - Scavenge algorithm    │
├─────────────────────────┤
│ Old Space (Old Gen)     │ ← Slow GC, large
│ - Survived objects      │
│ - Mark-Sweep-Compact    │
├─────────────────────────┤
│ Large Object Space      │ ← Separate
│ - Objects > 1 MB        │
└─────────────────────────┘
```

---

## F) Interview Questions & Answers

### Q1: What is Garbage Collection in JavaScript?

**Answer:**
Garbage Collection is automatic memory management where JavaScript engine identifies objects that are no longer reachable or needed, and automatically frees their memory. Developers don't need to manually allocate or free memory. The engine uses algorithms like Mark and Sweep to identify unreachable objects and reclaim memory.

### Q2: How does Garbage Collection work?

**Answer:**
Garbage Collection works in phases. In Mark phase, GC starts from root objects like global variables and currently executing functions, marks all reachable objects by following reference chains. In Sweep phase, unmarked objects are identified and deleted, freeing memory. Optional Compact phase defragments memory for better utilization.

### Q3: What is the Mark and Sweep algorithm?

**Answer:**
Mark and Sweep is a garbage collection algorithm with two phases. Mark phase identifies all reachable objects by starting from roots and following references. Sweep phase deletes all unmarked objects. This handles circular references unlike reference counting, and is the primary algorithm used in modern JavaScript engines.

### Q4: What is Generational Garbage Collection?

**Answer:**
Generational GC divides heap into young generation for new objects and old generation for long-lived objects. Young generation uses fast Scavenge GC frequently since most objects die young. Objects surviving multiple cycles move to old generation which uses slower but thorough Mark-Sweep-Compact GC less frequently. This improves overall performance.

### Q5: What causes memory leaks in JavaScript?

**Answer:**
Memory leaks occur when objects remain in memory but are no longer needed. Common causes include: global variables that are never cleared, event listeners not removed, closures capturing large unnecessary data, timers not cleared, and DOM references to removed elements. These prevent GC from identifying objects as unreachable.

### Q6: How do you prevent memory leaks?

**Answer:**
Prevent leaks by: avoiding global variables or clearing them when done, removing event listeners with removeEventListener, avoiding unnecessary closures or only capturing needed data, clearing timers with clearInterval/clearTimeout, nullifying DOM references when elements removed, using WeakMap/WeakSet for references that shouldn't prevent GC, and monitoring memory usage regularly.

### Q7: Can you force Garbage Collection?

**Answer:**
In browsers, you generally cannot force GC - it's automatic and non-deterministic. In Node.js, you can use `global.gc()` but only if started with `--expose-gc` flag. However, forcing GC is rarely needed and not recommended - let the engine manage it automatically for best performance.

---

## G) Common Mistakes

### Mistake 1: Global Variables Never Cleared

```javascript
// ❌ WRONG
function loadData() {
  window.allData = fetchHugeDataset();
  // Never cleared, always in memory
}

// ✅ CORRECT
function loadData() {
  const allData = fetchHugeDataset();
  processData(allData);
  // allData can be GC'd after function
}
```

**Why it breaks:** Global variables are always reachable, so GC never collects them.

### Mistake 2: Event Listeners Not Removed

```javascript
// ❌ WRONG
function setupComponent() {
  const button = document.getElementById('btn');
  button.addEventListener('click', handleClick);
  // Component removed but listener remains
}

// ✅ CORRECT
function setupComponent() {
  const button = document.getElementById('btn');
  const handler = () => handleClick();
  button.addEventListener('click', handler);
  return () => button.removeEventListener('click', handler);
}
```

**Why it breaks:** Event listeners keep references alive, preventing GC.

### Mistake 3: Closures Capturing Large Data

```javascript
// ❌ WRONG
function createHandler() {
  const hugeArray = new Array(1000000).fill(0);
  return function() {
    console.log('Handler');
    // Doesn't use hugeArray but closure keeps it
  };
}

// ✅ CORRECT
function createHandler() {
  return function() {
    console.log('Handler');
    // No unnecessary closure
  };
}
```

**Why it breaks:** Closures capture entire scope, keeping unused large objects in memory.

### Mistake 4: Timers Never Cleared

```javascript
// ❌ WRONG
function startTimer() {
  setInterval(() => {
    console.log('Tick');
  }, 1000);
  // Never cleared
}

// ✅ CORRECT
let intervalId = setInterval(() => {
  console.log('Tick');
}, 1000);
// Later...
clearInterval(intervalId);
```

**Why it breaks:** Timers keep callbacks and closures in memory.

### Mistake 5: DOM References to Removed Elements

```javascript
// ❌ WRONG
let elements = [];
const div = document.createElement('div');
elements.push(div);
document.body.removeChild(div);
// div still referenced in array = leak

// ✅ CORRECT
let elements = [];
const div = document.createElement('div');
elements.push(div);
document.body.removeChild(div);
elements = []; // Clear reference
```

**Why it breaks:** Removed DOM elements still referenced prevent GC.

---

## H) When to Use & When NOT to Use

### When GC Knowledge is Critical

**1. Memory Optimization**
- Reducing memory usage
- Identifying memory leaks
- Optimizing object creation
- Managing large datasets

**2. Performance Debugging**
- Slow application investigation
- Memory-related crashes
- Heap snapshot analysis
- GC performance tuning

**3. Long-Running Applications**
- Server applications
- Real-time systems
- Background processes
- Memory-intensive operations

**4. Advanced Patterns**
- Implementing object pools
- Managing caches
- Streaming large data
- Memory-efficient algorithms

### When NOT to Worry About It

**1. Simple Applications**
- Small objects
- No memory issues
- Standard patterns
- Basic CRUD operations

**2. Short-Lived Scripts**
- One-time scripts
- Quick utilities
- No persistent state
- Immediate cleanup

**3. Framework Usage**
- React, Vue manage it
- Express handles requests
- Following best practices
- No custom memory management

### Backend Perspective

**Node.js GC:**
- Each process has heap
- Shared across requests
- Memory leaks affect all users
- Need careful management

**When it matters:**
- Caching strategies
- Session management
- Large file processing
- Database connection pools
- Long-running services

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain Garbage Collection in JavaScript."

**You:**
"Garbage Collection is automatic memory management in JavaScript. The engine automatically identifies objects that are no longer reachable and frees their memory, so developers don't need to manually manage memory.

It works using Mark and Sweep algorithm. In Mark phase, GC starts from root objects like global variables and currently executing functions, and marks all reachable objects by following reference chains. In Sweep phase, unmarked objects are deleted, freeing memory.

Modern engines use Generational GC - dividing heap into young generation for new objects with fast frequent GC, and old generation for long-lived objects with slower thorough GC. This is efficient because most objects die young.

Memory leaks occur when objects remain in memory but are unreachable by code but still referenced - like global variables, uncleared event listeners, or closures capturing large unnecessary data. To prevent leaks, avoid globals, remove listeners, minimize closure captures, clear timers, and nullify DOM references.

GC runs automatically and non-deterministically. You generally can't force it, and shouldn't need to - the engine manages it efficiently."

---

## J) Mini Practice Task

### Task: Memory Leak Detector

Create a tool to detect potential memory leaks:

**Requirements:**
1. Create `MemoryLeakDetector` class with:
   - `startMonitoring()`: Begin tracking memory
   - `takeSnapshot()`: Record current memory state
   - `detectLeak()`: Analyze for potential leaks
   - `getReport()`: Return detailed analysis

2. Detection features:
   - Track memory growth over time
   - Identify consistent growth patterns
   - Alert when threshold exceeded
   - Compare snapshots

3. Test scenarios:
   - Normal operation (should be stable)
   - Memory leak scenario (should detect)
   - Large data processing (temporary spike OK)

**Expected Output:**
```
Memory Leak Detector Started
Snapshot 1: 2.5 MB
Snapshot 2: 2.6 MB (+0.1 MB)
Snapshot 3: 2.7 MB (+0.1 MB)
⚠️ Potential leak detected: Consistent growth of 0.1 MB per snapshot
```

**Solution Template:**
```javascript
class MemoryLeakDetector {
  constructor() {
    this.snapshots = [];
  }
  
  startMonitoring() {
    // Start tracking
  }
  
  takeSnapshot() {
    // Record memory state
  }
  
  detectLeak() {
    // Analyze patterns
  }
}
```

---

**END OF TOPIC: GARBAGE COLLECTION**


