# REACT TESTING & ADVANCED PATTERNS

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**React Testing kya hai?**
- Testing React components aur functionality verify karna
- Unit tests, integration tests, E2E tests
- Jest aur React Testing Library popular hain
- Confidence deta hai code changes mein
- Bug detection early stage mein

**Advanced Patterns kya hain?**
- Higher-Order Components (HOCs)
- Render Props
- Compound Components
- Controlled/Uncontrolled Components
- Error Boundaries
- Portal
- Refs forwarding

**Testing Tools:**
- **Jest:** Test runner
- **React Testing Library:** Component testing
- **Enzyme:** Alternative testing library
- **Cypress:** E2E testing

---

## B) Easy English Theory

### What is React Testing and Advanced Patterns?

React Testing: Verify components and functionality work correctly. Tools: Jest (test runner), React Testing Library (component testing), Cypress (E2E). Types: Unit tests (individual components), Integration tests (component interactions), E2E tests (full user flows). Advanced Patterns: HOCs, Render Props, Compound Components, Error Boundaries, Portals, Refs. Use for: Confidence in changes, early bug detection, documentation.

---

## C) Why This Concept Exists

### The Problem

**Without Testing:**
- Bugs in production
- Fear of refactoring
- No confidence in changes
- Manual testing time-consuming
- Regression issues

### The Solution

**Testing Provides:**
1. **Confidence:** Safe refactoring
2. **Documentation:** Tests as docs
3. **Early Detection:** Catch bugs early
4. **Quality:** Better code quality
5. **Regression Prevention:** Prevent breaking changes

---

## D) Practical Example (Code)

```jsx
// ============================================
// JEST TESTING
// ============================================

import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';

test('renders counter', () => {
  render(<Counter />);
  const countElement = screen.getByText(/count/i);
  expect(countElement).toBeInTheDocument();
});

test('increments count on button click', () => {
  render(<Counter />);
  const button = screen.getByText('+');
  fireEvent.click(button);
  expect(screen.getByText('Count: 1')).toBeInTheDocument();
});

// ============================================
// COMPONENT TESTING
// ============================================

import { render, screen } from '@testing-library/react';
import UserProfile from './UserProfile';

test('displays user name', () => {
  const user = { name: 'John', email: 'john@example.com' };
  render(<UserProfile user={user} />);
  expect(screen.getByText('John')).toBeInTheDocument();
});

// ============================================
// HIGHER-ORDER COMPONENTS (HOC)
// ============================================

function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const isAuthenticated = useAuth();
    
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    
    return <Component {...props} />;
  };
}

// Usage
const ProtectedDashboard = withAuth(Dashboard);

// ============================================
// RENDER PROPS
// ============================================

function MouseTracker({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };
  
  return (
    <div onMouseMove={handleMouseMove}>
      {render(position)}
    </div>
  );
}

// Usage
<MouseTracker
  render={({ x, y }) => (
    <p>Mouse at {x}, {y}</p>
  )}
/>

// ============================================
// COMPOUND COMPONENTS
// ============================================

function Tabs({ children }) {
  const [activeTab, setActiveTab] = useState(0);
  
  return (
    <div>
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          isActive: index === activeTab,
          onClick: () => setActiveTab(index)
        })
      )}
    </div>
  );
}

function Tab({ isActive, onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{ fontWeight: isActive ? 'bold' : 'normal' }}
    >
      {children}
    </button>
  );
}

// Usage
<Tabs>
  <Tab>Tab 1</Tab>
  <Tab>Tab 2</Tab>
</Tabs>

// ============================================
// ERROR BOUNDARIES
// ============================================

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Error:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    
    return this.props.children;
  }
}

// Usage
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>

// ============================================
// PORTAL
// ============================================

import { createPortal } from 'react-dom';

function Modal({ children, isOpen }) {
  if (!isOpen) return null;
  
  return createPortal(
    <div className="modal">
      {children}
    </div>,
    document.body
  );
}

// ============================================
// REFS FORWARDING
// ============================================

const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="fancy-button">
    {props.children}
  </button>
));

// Usage
const ref = useRef();
<FancyButton ref={ref}>Click me</FancyButton>
```

---

## E) Internal Working

**Testing Process:**
1. **Setup:** Render component
2. **Query:** Find elements
3. **Interact:** Simulate events
4. **Assert:** Verify results

**Pattern Mechanisms:**
- **HOC:** Wraps component
- **Render Props:** Function as prop
- **Compound:** Multiple components together

---

## F) Interview Questions & Answers

### Q1: How do you test React components?

**Answer:**
Test React components: Use React Testing Library (user-centric testing), Jest (test runner), render components, query elements (getByText, getByRole), simulate events (fireEvent, userEvent), assert results (expect). Best practices: Test behavior not implementation, use accessible queries, test user interactions, avoid testing internals. Types: Unit tests (components), Integration tests (interactions), E2E tests (full flows).

### Q2: What are Higher-Order Components and when to use them?

**Answer:**
HOC: Function that takes component, returns new component. Use for: Code reuse, cross-cutting concerns (auth, logging), enhance components. Example: `withAuth(Component)` adds authentication. Alternatives: Hooks (preferred now), Render Props. HOCs can cause wrapper hell, hooks are simpler. Still useful for class components or specific patterns.

### Q3: What is an Error Boundary and how does it work?

**Answer:**
Error Boundary: React component that catches JavaScript errors in child tree. Class component with `getDerivedStateFromError` (update state) and `componentDidCatch` (log error). Catches: Errors in render, lifecycle, constructors. Doesn't catch: Event handlers, async code, SSR errors, errors in boundary itself. Use to: Prevent app crash, show fallback UI, log errors. Wrap components that might error.

---

## G) Common Mistakes

### Mistake 1: Testing Implementation Details

```jsx
// ❌ WRONG - Testing internals
expect(component.state.count).toBe(1);

// ✅ CORRECT - Test behavior
expect(screen.getByText('Count: 1')).toBeInTheDocument();
```

**Why it breaks:** Tests break on refactoring, not testing user experience.

---

## H) When to Use & When NOT to Use

Use Testing for: All components, critical functionality, user flows, regression prevention. Use Advanced Patterns when: Need code reuse, cross-cutting concerns, specific requirements. Don't over-engineer: Simple solutions first.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain React Testing."

**You:"
"React Testing: Verify components work correctly. Tools: Jest (test runner), React Testing Library (component testing). Process: Render component, query elements, simulate events, assert results.

Best practices: Test behavior not implementation, use accessible queries, test user interactions. Advanced Patterns: HOCs (code reuse), Render Props (function as prop), Error Boundaries (catch errors), Portals (render outside tree). Use for confidence, early bug detection."

---

## J) Mini Practice Task

Practice: Write component tests, test user interactions, implement HOCs, use Render Props, create Error Boundaries, use Portals, test error cases.

---

**END OF TOPIC: REACT TESTING & ADVANCED PATTERNS**

