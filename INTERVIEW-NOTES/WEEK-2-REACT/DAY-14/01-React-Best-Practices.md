# REACT BEST PRACTICES

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**React Best Practices kya hain?**
- Best Practices proven approaches hain
- Code quality improve karte hain
- Maintainability badhate hain
- Performance optimize karte hain
- Team collaboration better hota hai

**Key Areas:**
- **Component Design:** Small, focused components
- **State Management:** Right place for state
- **Performance:** Optimization techniques
- **Code Organization:** Folder structure
- **Naming Conventions:** Clear names
- **Accessibility:** a11y best practices

**Best Practices:**
- Keep components small
- Use functional components
- Extract custom hooks
- Proper key usage
- Avoid prop drilling
- Use TypeScript
- Write tests

---

## B) Easy English Theory

### What are React Best Practices?

React Best Practices are proven approaches for building React applications. Areas: Component design (small, focused), State management (right place), Performance (optimization), Code organization (structure), Naming (clear), Accessibility (a11y). Practices: Keep components small, use functional components, extract hooks, proper keys, avoid prop drilling, TypeScript, tests. Follow for: Better code quality, maintainability, performance, team collaboration.

---

## C) Why This Concept Exists

### The Problem

**Without Best Practices:**
- Inconsistent code
- Difficult to maintain
- Poor performance
- Hard to collaborate
- Bugs and issues

### The Solution

**Best Practices Provide:**
1. **Consistency:** Standard approach
2. **Maintainability:** Easy to update
3. **Performance:** Optimized code
4. **Quality:** Better code
5. **Collaboration:** Team alignment

---

## D) Practical Example (Code)

```jsx
// ============================================
// COMPONENT DESIGN
// ============================================

// ✅ GOOD - Small, focused component
function Button({ onClick, children, variant = 'primary' }) {
  return (
    <button
      onClick={onClick}
      className={`btn btn-${variant}`}
    >
      {children}
    </button>
  );
}

// ❌ BAD - Large, doing too much
function ComplexComponent() {
  // 200+ lines of code
  // Multiple responsibilities
}

// ============================================
// STATE MANAGEMENT
// ============================================

// ✅ GOOD - State in right place
function TodoList() {
  const [todos, setTodos] = useState([]);
  
  return (
    <div>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}

// ❌ BAD - State too high
// Lifting state unnecessarily

// ============================================
// CUSTOM HOOKS
// ============================================

// ✅ GOOD - Extract logic to hook
function useTodos() {
  const [todos, setTodos] = useState([]);
  
  const addTodo = (text) => {
    setTodos(prev => [...prev, { id: Date.now(), text }]);
  };
  
  return { todos, addTodo };
}

function TodoApp() {
  const { todos, addTodo } = useTodos();
  // Clean component
}

// ============================================
// PROPER KEYS
// ============================================

// ✅ GOOD - Stable, unique keys
{todos.map(todo => (
  <TodoItem key={todo.id} todo={todo} />
))}

// ❌ BAD - Index as key (unless list is static)
{todos.map((todo, index) => (
  <TodoItem key={index} todo={todo} />
))}

// ============================================
// AVOID PROP DRILLING
// ============================================

// ❌ BAD - Prop drilling
function App() {
  const [user, setUser] = useState(null);
  return <Page1 user={user} />;
}
function Page1({ user }) {
  return <Page2 user={user} />;
}
function Page2({ user }) {
  return <Component user={user} />;
}

// ✅ GOOD - Use Context
const UserContext = createContext();
function App() {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Page1 />
    </UserContext.Provider>
  );
}

// ============================================
// CODE ORGANIZATION
// ============================================

/*
src/
  components/
    Button/
      Button.jsx
      Button.test.js
      Button.module.css
    TodoItem/
      TodoItem.jsx
      TodoItem.test.js
  hooks/
    useTodos.js
    useAuth.js
  utils/
    helpers.js
  App.jsx
*/

// ============================================
// NAMING CONVENTIONS
// ============================================

// ✅ GOOD - Clear, descriptive names
function UserProfileCard() {}
function useFetchUserData() {}
const MAX_RETRY_COUNT = 3;

// ❌ BAD - Unclear names
function Component1() {}
function hook() {}
const x = 3;

// ============================================
// ACCESSIBILITY
// ============================================

// ✅ GOOD - Accessible
<button
  onClick={handleClick}
  aria-label="Close dialog"
  aria-describedby="dialog-description"
>
  ×
</button>

// ❌ BAD - Not accessible
<div onClick={handleClick}>×</div>

// ============================================
// ERROR HANDLING
// ============================================

function DataFetcher({ url }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return <div>{data}</div>;
}

// ============================================
// TYPE SAFETY (TYPESCRIPT)
// ============================================

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

function Button({ onClick, children, variant = 'primary' }: ButtonProps) {
  return (
    <button onClick={onClick} className={`btn-${variant}`}>
      {children}
    </button>
  );
}
```

---

## E) Internal Working

**Best Practices Impact:**
- **Small Components:** Easier to understand, test, maintain
- **Proper State:** Better performance, clearer data flow
- **Custom Hooks:** Reusable logic, cleaner components
- **Organization:** Easy to find, maintain code

---

## F) Interview Questions & Answers

### Q1: What are React Best Practices?

**Answer:**
React Best Practices: Keep components small and focused, use functional components and hooks, extract custom hooks for reusable logic, proper key usage (stable, unique), avoid prop drilling (use Context), organize code well (folder structure), clear naming, accessibility (a11y), error handling, TypeScript for type safety, write tests. Follow for: Better code quality, maintainability, performance, team collaboration.

### Q2: How do you organize a large React application?

**Answer:**
Organize large React app: Feature-based or component-based structure. Feature-based: Group by feature (users/, products/), each feature has components, hooks, utils. Component-based: Group by type (components/, hooks/, utils/). Best: Feature-based for large apps. Structure: src/features/FeatureName/{components, hooks, utils, types}, shared/ (common components), utils/ (helpers), constants/. Use index files for clean imports.

### Q3: What are common React mistakes to avoid?

**Answer:**
Common mistakes: Mutating state directly (use setState), missing keys in lists (use stable keys), prop drilling (use Context), over-optimization (measure first), testing implementation (test behavior), large components (split up), inline functions/objects (use useCallback/useMemo), missing error boundaries (wrap error-prone code), not handling loading/error states, poor accessibility. Avoid these for better code quality.

---

## G) Common Mistakes

### Mistake 1: Large Components

```jsx
// ❌ WRONG - Large component
function App() {
  // 500+ lines
  // Multiple responsibilities
}

// ✅ CORRECT - Split into smaller components
function App() {
  return (
    <div>
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}
```

**Why it breaks:** Hard to understand, test, maintain, reuse.

---

## H) When to Use & When NOT to Use

Always follow best practices: Component design, state management, code organization, naming, accessibility. Don't over-engineer: Simple solutions first, optimize when needed.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain React Best Practices."

**You:"
"React Best Practices: Keep components small and focused, use functional components and hooks, extract custom hooks, proper keys, avoid prop drilling (use Context), organize code well, clear naming, accessibility, error handling, TypeScript, tests.

Key: Small components, right state placement, reusable hooks, good organization, accessibility. Follow for better code quality, maintainability, performance, team collaboration."

---

## J) Mini Practice Task

Practice: Refactor large components, extract custom hooks, organize code, implement accessibility, add error handling, write tests, follow naming conventions.

---

**END OF TOPIC: REACT BEST PRACTICES**

