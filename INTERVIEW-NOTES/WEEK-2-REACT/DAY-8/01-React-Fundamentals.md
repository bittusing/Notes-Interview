# REACT FUNDAMENTALS

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**React kya hai?**
- React JavaScript library hai UI build karne ke liye
- Component-based architecture
- Virtual DOM use karta hai
- Declarative approach
- Facebook ne banaya

**Real-life Analogy:**
- React = LEGO blocks
- Components = Individual blocks
- Props = Instructions (kaise block use kare)
- State = Block ki current condition
- Virtual DOM = Blueprint (actual DOM se pehle)

**React Core Concepts:**
- **Components:** Reusable UI pieces
- **JSX:** JavaScript + HTML syntax
- **Props:** Data pass karna
- **State:** Component data
- **Virtual DOM:** Efficient updates

**React Benefits:**
- **Reusability:** Components reuse
- **Performance:** Virtual DOM optimization
- **Ecosystem:** Large community
- **Developer Experience:** Great tooling
- **Flexibility:** Can use with other libraries

---

## B) Easy English Theory

### What is React?

React is JavaScript library for building user interfaces. Component-based architecture (reusable UI pieces), uses Virtual DOM (efficient updates), declarative approach (describe UI, React handles updates). Core concepts: Components (reusable pieces), JSX (JavaScript + HTML), Props (data passing), State (component data), Virtual DOM (optimization). Benefits: Reusability, performance, large ecosystem, great developer experience.

---

## C) Why This Concept Exists

### The Problem

**Without React:**
- Direct DOM manipulation (slow, error-prone)
- No component reusability
- Difficult state management
- Performance issues
- Code duplication

### The Solution

**React Provides:**
1. **Virtual DOM:** Efficient updates
2. **Components:** Reusable code
3. **Declarative:** Easier to understand
4. **Performance:** Optimized rendering
5. **Ecosystem:** Rich tooling

---

## D) Practical Example (Code)

```jsx
// ============================================
// BASIC REACT COMPONENT
// ============================================

/**
 * REACT COMPONENT KYA HAI? (HINGLISH)
 *
 * React Component ek reusable UI piece hai jo JavaScript function ya class ki tarah kaam karta hai.
 * Component JSX return karta hai jo UI describe karta hai.
 *
 * Simple Definition:
 * - Reusable UI piece
 * - JavaScript function/class
 * - JSX return karta hai
 * - Props accept karta hai
 * - Independent aur reusable
 *
 * Real-life Analogy:
 * 1. LEGO Block:
 *    - Jaise LEGO block reusable hota hai, har structure mein use kar sakte ho
 *    - Component bhi waise hi - ek baar banaya, multiple places mein use karo
 *    - Har block apna specific shape/function rakhta hai
 *    - Components bhi apna specific UI/function rakhte hain
 *
 * 2. Function in Programming:
 *    - Jaise function reusable code block hai
 *    - Component bhi waise hi - reusable UI block
 *    - Function parameters accept karta hai
 *    - Component props accept karta hai
 *
 * 3. Template:
 *    - Jaise aap template use karke multiple documents banate ho
 *    - Component bhi template ki tarah - ek baar banaya, multiple times use
 *    - Template mein data change karke different outputs
 *    - Component mein props change karke different UI
 *
 * Types of Components:
 * 1. **Functional Component:** JavaScript function (modern, recommended)
 * 2. **Class Component:** ES6 class (older, still used)
 * 3. **Arrow Function Component:** Arrow function syntax
 *
 * Component Characteristics:
 * - **Reusable:** Ek baar banaya, multiple places mein use
 * - **Independent:** Apna logic aur state rakhta hai
 * - **Composable:** Components ko combine karke bade components
 * - **Props:** Data accept karta hai (configuration)
 * - **JSX Return:** UI describe karta hai
 *
 * REACT COMPONENT - EASY ENGLISH EXPLANATION
 *
 * A React Component is a reusable piece of UI that works like a JavaScript function or class.
 * It returns JSX that describes what should be rendered on the screen.
 *
 * Key Characteristics:
 * - **Reusable:** Can be used multiple times
 * - **Independent:** Has its own logic and state
 * - **Composable:** Can be combined to build larger components
 * - **Props:** Accepts data as parameters
 * - **JSX Return:** Returns JSX describing UI
 *
 * Types of Components:
 * - **Functional Component:** JavaScript function (modern, recommended)
 * - **Class Component:** ES6 class (older approach)
 * - **Arrow Function:** Arrow function syntax
 *
 * How Components Work:
 * 1. Define component as function/class
 * 2. Component accepts props (optional)
 * 3. Component returns JSX
 * 4. React renders JSX to DOM
 * 5. Component can be reused with different props
 *
 * Benefits:
 * - **Reusability:** Write once, use many times
 * - **Maintainability:** Easy to update and maintain
 * - **Testability:** Easy to test in isolation
 * - **Organization:** Code organized into logical pieces
 * - **Composition:** Build complex UIs from simple components
 */

import React from 'react';

// Functional Component
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// Arrow Function Component
const Welcome = (props) => {
  return <h1>Hello, {props.name}!</h1>;
};

// Usage
function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

// ============================================
// JSX BASICS
// ============================================

/**
 * JSX KYA HAI? (HINGLISH)
 *
 * JSX (JavaScript XML) ek syntax extension hai JavaScript ka jo React mein use hota hai.
 * Ye aapko HTML-like syntax JavaScript mein likhne deta hai.
 *
 * Simple Definition:
 * - JavaScript mein HTML-like syntax
 * - React.createElement() ka shorthand
 * - Declarative UI describe karne ka tarika
 * - Compile-time par JavaScript mein convert hota hai
 *
 * Real-life Analogy:
 * 1. Template Language:
 *    - Jaise aapko ek letter likhna hai, to aap template use karte ho
 *    - JSX bhi waise hi - UI ka template hai jo JavaScript mein likha jata hai
 *    - Compiler is template ko actual JavaScript code mein convert karta hai
 *
 * 2. HTML in JavaScript:
 *    - Jaise aap HTML file mein JavaScript embed kar sakte ho
 *    - JSX mein aap JavaScript mein HTML embed kar sakte ho
 *    - Best of both worlds - HTML ki readability + JavaScript ki power
 *
 * Key Features:
 * - HTML-like syntax in JavaScript
 * - JavaScript expressions with {}
 * - Self-closing tags
 * - className instead of class (class is reserved keyword)
 * - Must return single parent element (or Fragment)
 *
 * JSX - EASY ENGLISH EXPLANATION
 *
 * JSX (JavaScript XML) is a syntax extension for JavaScript that allows you to write
 * HTML-like code in JavaScript. It's used in React to describe the UI declaratively.
 *
 * Key Points:
 * - Looks like HTML but is JavaScript
 * - Gets transpiled to React.createElement() calls
 * - Allows embedding JavaScript expressions with {}
 * - Must have a single root element (or React Fragment)
 * - Uses camelCase for attributes (className, onClick, etc.)
 * - Self-closing tags must have />
 *
 * Benefits:
 * - More readable than React.createElement()
 * - Familiar HTML-like syntax
 * - Type-safe (with TypeScript)
 * - Compile-time error checking
 */

function JSXExample() {
  const name = 'React';
  const element = <h1>Hello, {name}!</h1>;
  
  // JSX with expressions
  const user = {
    firstName: 'John',
    lastName: 'Doe'
  };
  
  function formatName(user) {
    return user.firstName + ' ' + user.lastName;
  }
  
  return (
    <div>
      <h1>Hello, {formatName(user)}!</h1>
      <p>Current time: {new Date().toLocaleTimeString()}</p>
      {/* This is a comment */}
    </div>
  );
}

// ============================================
// PROPS
// ============================================

/**
 * PROPS KYA HAI? (HINGLISH)
 *
 * Props (Properties) React mein data pass karne ka tarika hai parent component se child component mein.
 * Props read-only hote hain - child component unhe modify nahi kar sakta.
 *
 * Simple Definition:
 * - Parent se child ko data pass karne ka tarika
 * - Read-only (immutable) - child modify nahi kar sakta
 * - Component ko configure karne ke liye use hota hai
 * - Function parameters ki tarah kaam karta hai
 *
 * Real-life Analogy:
 * 1. Function Parameters:
 *    - Jaise aap function ko parameters pass karte ho: add(5, 3)
 *    - Props bhi waise hi - component ko data pass karte ho: <UserCard name="John" />
 *    - Function parameters ko modify nahi kar sakte, props bhi modify nahi kar sakte
 *
 * 2. Configuration Settings:
 *    - Jaise aap TV ko settings dete ho (volume, brightness)
 *    - Props bhi component ko settings dete hain (color, size, text)
 *    - TV settings change kar sakte ho, lekin props change nahi kar sakte (read-only)
 *
 * 3. Instructions to Component:
 *    - Jaise aapko recipe card milta hai jisme ingredients list hoti hai
 *    - Props bhi waise hi - component ko "instructions" dete hain ki kaise render hona hai
 *    - Recipe card ko modify nahi kar sakte, sirf follow kar sakte ho
 *
 * Key Features:
 * - **Read-only:** Child component props ko modify nahi kar sakta
 * - **Unidirectional:** Data sirf parent → child flow hota hai
 * - **Any Type:** Strings, numbers, objects, functions, components sab pass kar sakte ho
 * - **Default Values:** Props ke default values set kar sakte ho
 * - **Destructuring:** Props ko destructure karke use kar sakte ho
 * - **Spread Operator:** Object ko spread karke props pass kar sakte ho
 *
 * When to Use Props:
 * - Component ko configure karna ho
 * - Parent se child ko data pass karna ho
 * - Static data ho (jo change nahi hota)
 * - Reusable component banana ho
 *
 * PROPS - EASY ENGLISH EXPLANATION
 *
 * Props (Properties) are a way to pass data from parent components to child components in React.
 * They are read-only, meaning child components cannot modify them.
 *
 * Key Characteristics:
 * - **Read-only:** Immutable - child cannot change props
 * - **Unidirectional:** Data flows only from parent to child
 * - **Flexible:** Can pass any type (strings, numbers, objects, functions, components)
 * - **Configuration:** Used to configure how a component should render
 * - **Like Function Parameters:** Similar to function parameters, but for components
 *
 * How Props Work:
 * 1. Parent component passes props to child: <ChildComponent name="John" age={30} />
 * 2. Child component receives props as function parameter
 * 3. Child uses props to render UI
 * 4. If props change, child re-renders automatically
 *
 * Benefits:
 * - Makes components reusable
 * - Clear data flow (parent → child)
 * - Easy to test (pass props, check output)
 * - Type-safe with TypeScript
 *
 * Common Patterns:
 * - Default props for optional values
 * - Destructuring for cleaner code
 * - Spread operator for passing multiple props
 * - Children prop for component composition
 */

// Props are read-only
function UserCard(props) {
  return (
    <div className="user-card">
      <img src={props.avatar} alt={props.name} />
      <h2>{props.name}</h2>
      <p>{props.email}</p>
      <p>Age: {props.age}</p>
    </div>
  );
}

// Usage with props
function App() {
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    age: 30,
    avatar: 'https://example.com/avatar.jpg'
  };
  
  return <UserCard {...user} />;
}

// Props with default values
function Button({ text = 'Click me', onClick, disabled = false }) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
}

// ============================================
// STATE (WITH HOOKS)
// ============================================

/**
 * STATE KYA HAI? (HINGLISH)
 *
 * State React component ka internal data hai jo time ke saath change ho sakta hai.
 * Jab state change hota hai, to component automatically re-render hota hai.
 *
 * Simple Definition:
 * - Component ka internal data
 * - Mutable (change kar sakte ho)
 * - State change par component re-render hota hai
 * - useState hook se manage karte hain
 * - Component ke andar private hota hai
 *
 * Real-life Analogy:
 * 1. Component ki Memory:
 *    - Jaise aapke phone mein apps ki memory hoti hai (current song, volume level)
 *    - State bhi waise hi - component ki "memory" hai
 *    - Jab state change hota hai, UI update hota hai (jaise volume change par screen update)
 *
 * 2. Variable jo UI ko Control Karta Hai:
 *    - Jaise aapke paas ek variable hai "isLightOn" jo bulb ko control karta hai
 *    - State bhi waise hi - UI ko control karta hai
 *    - State change = UI change automatically
 *
 * 3. Component ka Current Status:
 *    - Jaise aapki car ka current speed, fuel level, etc.
 *    - State bhi component ka current status hai
 *    - Jab status change hota hai, dashboard update hota hai
 *
 * Key Features:
 * - **Mutable:** State ko update kar sakte ho (setState/useState se)
 * - **Re-render Trigger:** State change par component automatically re-render hota hai
 * - **Private:** State sirf usi component mein accessible hai
 * - **Persistent:** Component re-render hone tak state maintain rehta hai
 * - **Asynchronous:** State updates async hote hain (batched)
 *
 * useState Hook:
 * - Functional components mein state add karne ka tarika
 * - Returns: [currentValue, setterFunction]
 * - Initial value pass kar sakte ho
 * - Setter function se state update karte ho
 *
 * State vs Props:
 * - **Props:** Parent se aata hai, read-only, external
 * - **State:** Component ke andar hai, mutable, internal
 * - **Props:** Configuration data
 * - **State:** Dynamic data jo change hota hai
 *
 * STATE - EASY ENGLISH EXPLANATION
 *
 * State is internal data of a React component that can change over time.
 * When state changes, the component automatically re-renders to reflect the new state.
 *
 * Key Characteristics:
 * - **Mutable:** Can be updated using setState or useState hook
 * - **Reactive:** Component re-renders when state changes
 * - **Private:** Only accessible within the component that owns it
 * - **Persistent:** Maintains value between re-renders
 * - **Asynchronous:** State updates are batched and async
 *
 * useState Hook:
 * - Hook to add state to functional components
 * - Returns array: [currentState, setStateFunction]
 * - Takes initial value as parameter
 * - Call setStateFunction to update state
 *
 * How State Works:
 * 1. Initialize state with useState: const [count, setCount] = useState(0)
 * 2. Use state in render: <p>{count}</p>
 * 3. Update state: setCount(count + 1)
 * 4. Component re-renders with new state value
 *
 * State vs Props:
 * - **Props:** Data from parent, read-only, external configuration
 * - **State:** Internal data, mutable, dynamic values
 * - **Props:** Flow down (parent → child)
 * - **State:** Local to component
 *
 * Best Practices:
 * - Don't mutate state directly
 * - Use functional updates for state based on previous state
 * - Keep state minimal (only what affects UI)
 * - Lift state up when multiple components need it
 */

import React, { useState } from 'react';

function Counter() {
  // useState hook
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
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
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(Number(e.target.value))}
        placeholder="Age"
      />
    </form>
  );
}

// ============================================
// CONDITIONAL RENDERING
// ============================================

/**
 * CONDITIONAL RENDERING KYA HAI? (HINGLISH)
 *
 * Conditional Rendering React mein condition ke basis par different UI render karne ka tarika hai.
 * Jaise JavaScript mein if-else use karte ho, waise hi React mein bhi condition ke basis par UI show/hide kar sakte ho.
 *
 * Simple Definition:
 * - Condition ke basis par UI render karna
 * - If-else, ternary operator, logical && use karna
 * - Different content show karna based on state/props
 * - Dynamic UI create karna
 *
 * Real-life Analogy:
 * 1. Smart Door:
 *    - Agar aap authorized ho, to door open hoti hai
 *    - Agar nahi ho, to "Access Denied" message dikhta hai
 *    - Conditional rendering bhi waise hi - condition ke basis par UI change hota hai
 *
 * 2. Weather App:
 *    - Agar sunny hai, to sun icon dikhao
 *    - Agar rainy hai, to rain icon dikhao
 *    - Condition ke basis par different UI render hota hai
 *
 * 3. Login Status:
 *    - Agar logged in ho, to "Welcome" message
 *    - Agar nahi ho, to "Login" button
 *    - Same component, different UI based on condition
 *
 * Methods of Conditional Rendering:
 * 1. **If-else:** Traditional if-else statements
 * 2. **Ternary Operator:** condition ? true : false
 * 3. **Logical &&:** condition && <Component />
 * 4. **Early Return:** Function se early return
 * 5. **Switch Statement:** Multiple conditions ke liye
 *
 * When to Use:
 * - User authentication status ke basis par
 * - Loading states (spinner vs content)
 * - Error handling (error message vs normal UI)
 * - Feature flags (show/hide features)
 * - Form validation (error messages)
 *
 * CONDITIONAL RENDERING - EASY ENGLISH EXPLANATION
 *
 * Conditional Rendering is a way to render different UI based on conditions in React.
 * Similar to if-else in JavaScript, but for rendering UI elements.
 *
 * Key Methods:
 * - **If-else:** Traditional conditional logic
 * - **Ternary Operator:** condition ? trueValue : falseValue
 * - **Logical &&:** condition && <Component /> (short-circuit evaluation)
 * - **Early Return:** Return different JSX based on condition
 * - **Switch:** For multiple conditions
 *
 * How It Works:
 * 1. Evaluate condition (state, props, or expression)
 * 2. Based on condition, render different JSX
 * 3. React updates DOM only for changed parts
 *
 * Common Use Cases:
 * - Show/hide elements based on user status
 * - Display loading spinners
 * - Show error messages
 * - Feature toggles
 * - Form validation feedback
 *
 * Best Practices:
 * - Keep conditions simple and readable
 * - Use early returns for cleaner code
 * - Avoid deeply nested ternaries
 * - Extract complex conditions to variables
 */

function Greeting({ isLoggedIn }) {
  // If-else
  if (isLoggedIn) {
    return <h1>Welcome back!</h1>;
  }
  return <h1>Please sign in.</h1>;
}

// Ternary operator
function Message({ unreadMessages }) {
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 && (
        <h2>You have {unreadMessages.length} unread messages.</h2>
      )}
    </div>
  );
}

// Logical && operator
function Mailbox({ unreadMessages }) {
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 && (
        <h2>You have {unreadMessages.length} unread messages.</h2>
      )}
    </div>
  );
}

// ============================================
// LISTS AND KEYS
// ============================================

/**
 * LISTS AND KEYS KYA HAI? (HINGLISH)
 *
 * Lists React mein arrays ko render karne ka tarika hai. Keys React ko identify karne mein help karte hain
 * ki kaunse items change, add, ya remove hue hain, efficiently update karne ke liye.
 *
 * Simple Definition:
 * - Arrays ko UI mein render karna
 * - map() function use karna
 * - Har element ko unique key dena
 * - React ko efficiently update karne mein help karna
 *
 * Real-life Analogy:
 * 1. Student Attendance:
 *    - Jaise aapke class mein students ki list hai
 *    - Har student ka unique roll number (key) hota hai
 *    - Roll number se identify karte ho ki kaun present/absent hai
 *    - Keys bhi waise hi - React ko identify karne mein help karte hain
 *
 * 2. Shopping List:
 *    - Aapke paas items ki list hai
 *    - Har item ka unique ID (key) hota hai
 *    - ID se identify karte ho ki kaunse item add/remove kiye
 *    - React bhi keys se efficiently update karta hai
 *
 * 3. Book Library:
 *    - Books ki list mein har book ka unique ISBN number (key) hota hai
 *    - ISBN se identify karte ho ki kaunsi book hai
 *    - Keys bhi waise hi - React ko efficiently track karne mein help karte hain
 *
 * Key Requirements:
 * - **Unique:** Har element ka unique key hona chahiye
 * - **Stable:** Key same rehni chahiye across re-renders
 * - **Not Index:** Index ko key ki tarah use nahi karna chahiye (unless list static hai)
 * - **String/Number:** Key string ya number honi chahiye
 *
 * Why Keys are Important:
 * - React efficiently identify kar sakta hai ki kaunse items change hue
 * - Only changed items ko update karta hai (performance)
 * - Correct order maintain karta hai
 * - Component state correctly preserve karta hai
 *
 * Common Mistakes:
 * - Index ko key ki tarah use karna (dynamic lists mein)
 * - Duplicate keys use karna
 * - Keys ko random generate karna (Math.random())
 * - Keys ko conditionally change karna
 *
 * LISTS AND KEYS - EASY ENGLISH EXPLANATION
 *
 * Lists in React are rendered using arrays. Keys help React identify which items have changed,
 * been added, or removed, enabling efficient updates.
 *
 * Key Concepts:
 * - **Rendering Lists:** Use map() to transform array into JSX elements
 * - **Keys:** Unique identifier for each list item
 * - **Efficiency:** React uses keys to optimize re-renders
 * - **Stability:** Keys should remain consistent across renders
 *
 * How Keys Work:
 * 1. React creates a virtual representation of list
 * 2. Compares new list with previous using keys
 * 3. Identifies which items changed/added/removed
 * 4. Updates only changed items in DOM
 *
 * Key Requirements:
 * - Must be unique among siblings
 * - Should be stable (don't change between renders)
 * - Should be string or number
 * - Avoid using array index (unless list is static)
 *
 * Best Practices:
 * - Use unique IDs from data (id, uuid, etc.)
 * - Don't use index as key for dynamic lists
 * - Don't generate keys randomly
 * - Keep keys consistent across re-renders
 *
 * Why Keys Matter:
 * - Performance: React can efficiently update only changed items
 * - Correctness: Maintains component state correctly
 * - Order: Preserves correct order of items
 */

function NumberList({ numbers }) {
  const listItems = numbers.map((number) => (
    <li key={number.toString()}>{number}</li>
  ));
  
  return <ul>{listItems}</ul>;
}

// Keys should be unique and stable
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          {todo.text}
        </li>
      ))}
    </ul>
  );
}

// ============================================
// EVENT HANDLING
// ============================================

/**
 * EVENT HANDLING KYA HAI? (HINGLISH)
 *
 * Event Handling React mein user interactions (clicks, inputs, etc.) ko handle karne ka tarika hai.
 * React synthetic events use karta hai jo native browser events ko wrap karte hain.
 *
 * Simple Definition:
 * - User actions ko handle karna (click, type, hover, etc.)
 * - Event handlers functions hote hain
 * - Synthetic events use karte hain
 * - State update ya side effects trigger karna
 *
 * Real-life Analogy:
 * 1. Remote Control:
 *    - Jaise aap TV remote se buttons press karte ho
 *    - Har button press ek event hai
 *    - TV event ko handle karta hai (channel change, volume, etc.)
 *    - React bhi waise hi - user actions ko events ki tarah handle karta hai
 *
 * 2. Doorbell:
 *    - Jab koi doorbell press karta hai, to bell ring hoti hai
 *    - Doorbell press = event
 *    - Bell ring = event handler
 *    - React bhi waise hi - event trigger hota hai, handler execute hota hai
 *
 * 3. Form Submission:
 *    - Jab aap form submit karte ho, to data process hota hai
 *    - Submit button click = event
 *    - Data processing = event handler
 *    - React bhi waise hi - events ko handle karke actions perform karta hai
 *
 * Key Features:
 * - **Synthetic Events:** React native events ko wrap karta hai (cross-browser compatibility)
 * - **CamelCase:** Event names camelCase mein hote hain (onClick, onChange, etc.)
 * - **Event Object:** Handler ko event object milta hai
 * - **Prevent Default:** e.preventDefault() se default behavior prevent kar sakte ho
 * - **Stop Propagation:** e.stopPropagation() se event bubbling stop kar sakte ho
 *
 * Common Events:
 * - **onClick:** Button/div click
 * - **onChange:** Input field change
 * - **onSubmit:** Form submission
 * - **onMouseOver/onMouseOut:** Hover effects
 * - **onKeyDown/onKeyUp:** Keyboard events
 * - **onFocus/onBlur:** Focus events
 *
 * Event Handler Patterns:
 * 1. **Inline Arrow Function:** onClick={() => handleClick()}
 * 2. **Function Reference:** onClick={handleClick}
 * 3. **Bind Method:** onClick={this.handleClick.bind(this)} (class components)
 * 4. **Arrow Function in Class:** handleClick = () => {} (class components)
 *
 * EVENT HANDLING - EASY ENGLISH EXPLANATION
 *
 * Event Handling in React is the way to handle user interactions like clicks, inputs, etc.
 * React uses synthetic events that wrap native browser events for cross-browser compatibility.
 *
 * Key Concepts:
 * - **Synthetic Events:** React's wrapper around native browser events
 * - **Event Handlers:** Functions that handle events
 * - **CamelCase Naming:** onClick, onChange (not onclick, onchange)
 * - **Event Object:** Contains event information (target, preventDefault, etc.)
 *
 * How It Works:
 * 1. User performs action (click, type, etc.)
 * 2. React creates synthetic event
 * 3. Calls event handler function
 * 4. Handler can update state, call APIs, etc.
 *
 * Common Events:
 * - onClick: Mouse click
 * - onChange: Input value change
 * - onSubmit: Form submission
 * - onMouseOver/onMouseOut: Mouse hover
 * - onKeyDown/onKeyUp: Keyboard press
 * - onFocus/onBlur: Input focus
 *
 * Event Handler Patterns:
 * - Inline arrow function: onClick={() => doSomething()}
 * - Function reference: onClick={handleClick}
 * - With parameters: onClick={(e) => handleClick(id, e)}
 *
 * Best Practices:
 * - Use descriptive handler names (handleClick, handleSubmit)
 * - Extract complex logic to separate functions
 * - Use preventDefault() to prevent default browser behavior
 * - Use stopPropagation() to prevent event bubbling
 * - Don't create functions in render (use useCallback for optimization)
 */

function Button() {
  const handleClick = (e) => {
    e.preventDefault();
    console.log('Button clicked!');
  };
  
  return <button onClick={handleClick}>Click me</button>;
}

// Event with parameters
function ItemList({ items }) {
  const handleItemClick = (itemId) => {
    console.log('Item clicked:', itemId);
  };
  
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id} onClick={() => handleItemClick(item.id)}>
          {item.name}
        </li>
      ))}
    </ul>
  );
}

// ============================================
// FORMS
// ============================================

/**
 * FORMS KYA HAI? (HINGLISH)
 *
 * Forms React mein user input collect karne ke liye use hote hain. React mein forms ko
 * "Controlled Components" ki tarah handle karte hain, jahan form data React state mein store hota hai.
 *
 * Simple Definition:
 * - User input collect karne ka tarika
 * - Controlled components (React state se control)
 * - Form validation
 * - Form submission handling
 *
 * Real-life Analogy:
 * 1. Application Form:
 *    - Jaise aap job application form fill karte ho
 *    - Har field mein data enter karte ho
 *    - Submit button press karte ho
 *    - Data process hota hai
 *    - React forms bhi waise hi - input collect, validate, submit
 *
 * 2. Survey Form:
 *    - Questions ke answers collect karte ho
 *    - Har answer state mein store hota hai
 *    - Submit par saare answers process hote hain
 *    - React forms bhi waise hi - state mein store, submit par process
 *
 * 3. Registration Form:
 *    - Name, email, password enter karte ho
 *    - Validation check hoti hai (email format, password strength)
 *    - Valid data submit hota hai
 *    - React forms bhi waise hi - controlled inputs, validation, submission
 *
 * Controlled Components:
 * - Form inputs React state se control hote hain
 * - value prop se current value set hoti hai
 * - onChange handler se value update hoti hai
 * - Single source of truth (React state)
 *
 * Uncontrolled Components:
 * - Form inputs directly DOM se control hote hain
 * - useRef hook se access karte hain
 * - Less common, but useful for some cases
 *
 * Form Elements:
 * - **Input:** Text, email, password, number, etc.
 * - **Textarea:** Multi-line text
 * - **Select:** Dropdown options
 * - **Checkbox:** Multiple selections
 * - **Radio:** Single selection from group
 *
 * Form Handling Steps:
 * 1. State initialize karo (form fields ke liye)
 * 2. Input elements ko controlled banao (value + onChange)
 * 3. Validation add karo (optional)
 * 4. onSubmit handler mein form submit handle karo
 * 5. e.preventDefault() se default form submission prevent karo
 * 6. Form data process karo (API call, state update, etc.)
 *
 * FORMS - EASY ENGLISH EXPLANATION
 *
 * Forms in React are used to collect user input. React handles forms as "Controlled Components,"
 * where form data is stored in React state.
 *
 * Key Concepts:
 * - **Controlled Components:** Form inputs controlled by React state
 * - **Single Source of Truth:** React state is the single source of truth
 * - **Two-way Binding:** value prop + onChange handler
 * - **Form Validation:** Validate input before submission
 * - **Form Submission:** Handle form submit with onSubmit
 *
 * Controlled vs Uncontrolled:
 * - **Controlled:** React state controls input value (recommended)
 * - **Uncontrolled:** DOM directly controls input (useRef)
 *
 * How Controlled Components Work:
 * 1. Initialize state for form fields
 * 2. Set input value from state: value={state}
 * 3. Update state on change: onChange={(e) => setState(e.target.value)}
 * 4. Handle form submission: onSubmit={(e) => { e.preventDefault(); processForm(); }}
 *
 * Form Elements:
 * - Input: text, email, password, number, etc.
 * - Textarea: multi-line text
 * - Select: dropdown
 * - Checkbox: multiple selection
 * - Radio: single selection
 *
 * Best Practices:
 * - Use controlled components for most cases
 * - Validate input before submission
 * - Show validation errors to users
 * - Prevent default form submission
 * - Handle form state properly
 * - Use form libraries (Formik, React Hook Form) for complex forms
 */

function NameForm() {
  const [value, setValue] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('A name was submitted: ' + value);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

// Controlled component
function EssayForm() {
  const [value, setValue] = useState('Please write an essay about your favorite DOM element.');
  
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('An essay was submitted: ' + value);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Essay:
        <textarea value={value} onChange={handleChange} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

// ============================================
// COMPONENT COMPOSITION
// ============================================

/**
 * COMPONENT COMPOSITION KYA HAI? (HINGLISH)
 *
 * Component Composition React mein chhote components ko combine karke bade components banane ka tarika hai.
 * Ye code reusability, maintainability, aur flexibility badhata hai.
 *
 * Simple Definition:
 * - Chhote components ko combine karke bade components banana
 * - Components ko nest karna (parent-child relationship)
 * - children prop use karna
 * - Reusable aur flexible components banana
 *
 * Real-life Analogy:
 * 1. LEGO Blocks:
 *    - Jaise aap LEGO blocks ko combine karke complex structures banate ho
 *    - Har block ek component hai
 *    - Blocks ko combine karke bada structure (composed component)
 *    - React bhi waise hi - chhote components ko combine karke bade components
 *
 * 2. Building Construction:
 *    - Foundation, walls, roof - sab alag components hain
 *    - Inhe combine karke complete building (composed component)
 *    - Har component apna specific purpose serve karta hai
 *    - React bhi waise hi - specialized components ko combine karna
 *
 * 3. Recipe:
 *    - Ingredients (small components) ko combine karke dish (composed component)
 *    - Har ingredient apna role play karta hai
 *    - Combine karke final dish banata hai
 *    - React bhi waise hi - components ko compose karke UI banana
 *
 * Key Concepts:
 * - **children Prop:** Special prop jo JSX content ko pass karne ke liye use hota hai
 * - **Nesting:** Components ko ek doosre ke andar nest karna
 * - **Specialization:** Specific purpose ke liye components banana
 * - **Reusability:** Components ko multiple places mein use karna
 * - **Flexibility:** Different combinations mein use karna
 *
 * Composition Patterns:
 * 1. **Containment:** children prop use karke content pass karna
 * 2. **Specialization:** Generic component se specific component banana
 * 3. **Multiple Children:** Multiple props mein different content pass karna
 * 4. **Render Props:** Function as prop pass karna (advanced)
 *
 * Benefits:
 * - **Reusability:** Components ko multiple places mein use kar sakte ho
 * - **Maintainability:** Code organized aur maintainable hota hai
 * - **Flexibility:** Different combinations mein use kar sakte ho
 * - **Separation of Concerns:** Har component apna specific purpose serve karta hai
 * - **Testability:** Chhote components easily test kar sakte ho
 *
 * COMPONENT COMPOSITION - EASY ENGLISH EXPLANATION
 *
 * Component Composition is the practice of combining smaller components to build larger components in React.
 * It improves code reusability, maintainability, and flexibility.
 *
 * Key Concepts:
 * - **children Prop:** Special prop to pass JSX content
 * - **Nesting:** Placing components inside other components
 * - **Specialization:** Creating specific components from generic ones
 * - **Reusability:** Using components in multiple places
 * - **Flexibility:** Using components in different combinations
 *
 * Composition Patterns:
 * 1. **Containment:** Using children prop to pass content
 * 2. **Specialization:** Creating specific components from generic ones
 * 3. **Multiple Children:** Passing different content via multiple props
 * 4. **Render Props:** Passing functions as props (advanced pattern)
 *
 * How It Works:
 * 1. Create small, focused components
 * 2. Combine them to build larger components
 * 3. Use children prop for flexible content
 * 4. Nest components as needed
 *
 * Benefits:
 * - **Reusability:** Use components in multiple places
 * - **Maintainability:** Organized and maintainable code
 * - **Flexibility:** Different combinations possible
 * - **Separation of Concerns:** Each component has specific purpose
 * - **Testability:** Easier to test smaller components
 *
 * Best Practices:
 * - Keep components small and focused
 * - Use composition over inheritance
 * - Prefer children prop for flexible content
 * - Create reusable container components
 * - Avoid prop drilling (use Context if needed)
 *
 * Example Pattern:
 * - Card component (container)
 * - Button, Input, etc. (small components)
 * - Compose them to build forms, dashboards, etc.
 */

// Children prop
function Card({ children, title }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      {children}
    </div>
  );
}

function App() {
  return (
    <Card title="Welcome">
      <p>This is the card content.</p>
    </Card>
  );
}

// Composition with multiple children
function Layout({ header, sidebar, content, footer }) {
  return (
    <div className="layout">
      <header>{header}</header>
      <aside>{sidebar}</aside>
      <main>{content}</main>
      <footer>{footer}</footer>
    </div>
  );
}
```

---

## E) Internal Working

**React Rendering Process:**
1. **Component Definition:** Component function/class
2. **JSX:** JSX converted to React elements
3. **Virtual DOM:** React creates virtual representation
4. **Reconciliation:** Compare with previous virtual DOM
5. **DOM Update:** Update only changed parts
6. **Re-render:** Component re-renders on state/prop changes

**Key Mechanisms:**
- **Virtual DOM:** JavaScript representation
- **Diffing Algorithm:** Find differences
- **Batching:** Group updates
- **Keys:** Track elements

---

## F) Interview Questions & Answers

### Q1: What is React and how does it work?

**Answer:**
React is JavaScript library for building user interfaces. Works by: Component-based architecture (reusable UI pieces), Virtual DOM (JavaScript representation of DOM, efficient updates), JSX (JavaScript + HTML syntax), Props (data passing to components), State (component data). Process: Define components, React creates Virtual DOM, compares with previous, updates only changed parts in real DOM. Benefits: Performance (Virtual DOM optimization), Reusability (components), Declarative (easier to understand).

### Q2: What is the difference between Props and State?

**Answer:**
Props: Data passed from parent to child, read-only (immutable), external (controlled by parent), used for configuration. State: Internal component data, mutable (can be updated with setState/useState), private to component, used for dynamic data. Key difference: Props flow down (parent → child), State is internal. Props change triggers re-render, State change triggers re-render. Use Props for configuration, State for dynamic data.

### Q3: What is JSX and why is it used?

**Answer:**
JSX is JavaScript syntax extension that looks like HTML. Why used: Declarative (describe UI easily), Familiar (HTML-like syntax), Type-safe (compile-time checks), Expressive (combine JavaScript and HTML). JSX is transpiled to React.createElement() calls. Example: `<div>Hello</div>` becomes `React.createElement('div', null, 'Hello')`. JSX makes React code more readable and maintainable.

---

## G) Common Mistakes

### Mistake 1: Mutating State Directly

```jsx
// ❌ WRONG - Direct mutation
const [items, setItems] = useState([]);
items.push(newItem); // Mutating state directly
// Component won't re-render

// ✅ CORRECT - Create new array
const [items, setItems] = useState([]);
setItems([...items, newItem]); // New array
```

**Why it breaks:** Direct mutation doesn't trigger re-render, React uses reference equality.

---

## H) When to Use & When NOT to Use

Use React for: Interactive UIs, component-based architecture, single-page applications, when need Virtual DOM optimization, large applications. Don't use when: Simple static websites, when don't need interactivity, when prefer server-side rendering only.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain React."

**You:"
"React is JavaScript library for building user interfaces. Component-based architecture (reusable UI pieces), uses Virtual DOM (efficient updates), JSX syntax (JavaScript + HTML).

Core concepts: Components (reusable pieces), Props (data passing), State (component data), Virtual DOM (optimization). Process: Define components, React creates Virtual DOM, compares with previous, updates only changed parts. Benefits: Performance, reusability, declarative approach, large ecosystem."

---

## J) Mini Practice Task

Practice: Create functional components, use Props, implement State with hooks, handle events, render lists, create forms, implement conditional rendering, compose components.

---

**END OF TOPIC: REACT FUNDAMENTALS**

