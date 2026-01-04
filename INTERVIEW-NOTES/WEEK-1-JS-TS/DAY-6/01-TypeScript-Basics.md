# TYPESCRIPT BASICS

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**TypeScript kya hai?**
- TypeScript JavaScript ka superset hai
- Static typing add karta hai
- Compile-time error checking
- Better IDE support
- Microsoft ne banaya

**Real-life Analogy:**
- TypeScript = Safety net
- JavaScript = Free form
- Types = Rules
- Compiler = Checker
- Errors = Early detection

**TypeScript Benefits:**
- **Type Safety:** Catch errors early
- **Better IDE:** Autocomplete, refactoring
- **Documentation:** Types as docs
- **Refactoring:** Safe refactoring
- **Scalability:** Better for large apps

**Key Features:**
- **Types:** Primitive, object, function types
- **Interfaces:** Object shapes
- **Classes:** OOP with types
- **Generics:** Reusable types
- **Enums:** Named constants

---

## B) Easy English Theory

### What is TypeScript?

TypeScript is JavaScript superset that adds static typing. Compiles to JavaScript, provides type checking at compile-time, better IDE support (autocomplete, refactoring), catches errors early. Features: Types (primitive, object, function), Interfaces (object shapes), Classes (OOP), Generics (reusable types), Enums (constants). Benefits: Type safety, better tooling, documentation, safe refactoring, scalability.

---

## C) Why This Concept Exists

### The Problem

**Without TypeScript:**
- Runtime errors
- No type checking
- Difficult refactoring
- Limited IDE support
- No documentation

### The Solution

**TypeScript Provides:**
1. **Type Safety:** Catch errors early
2. **Tooling:** Better IDE support
3. **Documentation:** Types as docs
4. **Refactoring:** Safe changes
5. **Scalability:** Better for large apps

---

## D) Practical Example (Code)

```typescript
// ============================================
// BASIC TYPES
// ============================================

let name: string = 'John';
let age: number = 30;
let isActive: boolean = true;
let data: any = 'anything';
let value: unknown = 'unknown';

// Arrays
let numbers: number[] = [1, 2, 3];
let names: Array<string> = ['John', 'Jane'];

// Tuples
let tuple: [string, number] = ['John', 30];

// Enums
enum Color {
  Red,
  Green,
  Blue
}
let color: Color = Color.Red;

// ============================================
// INTERFACES
// ============================================

interface User {
  name: string;
  age: number;
  email?: string; // Optional
  readonly id: number; // Readonly
}

const user: User = {
  name: 'John',
  age: 30,
  id: 1
};

// user.id = 2; // Error: readonly

// Extending interfaces
interface Admin extends User {
  permissions: string[];
}

// ============================================
// FUNCTIONS
// ============================================

function add(a: number, b: number): number {
  return a + b;
}

// Arrow function
const multiply = (a: number, b: number): number => {
  return a * b;
};

// Optional parameters
function greet(name: string, age?: number): string {
  if (age) {
    return `Hello, ${name}, you are ${age} years old`;
  }
  return `Hello, ${name}`;
}

// Default parameters
function createUser(name: string, role: string = 'user'): User {
  return { name, age: 0, id: Date.now() };
}

// ============================================
// CLASSES
// ============================================

class Person {
  private name: string;
  protected age: number;
  public email: string;
  
  constructor(name: string, age: number, email: string) {
    this.name = name;
    this.age = age;
    this.email = email;
  }
  
  getName(): string {
    return this.name;
  }
}

class Student extends Person {
  private school: string;
  
  constructor(name: string, age: number, email: string, school: string) {
    super(name, age, email);
    this.school = school;
  }
  
  getInfo(): string {
    return `${this.getName()} is ${this.age} years old`;
  }
}

// ============================================
// GENERICS
// ============================================

function identity<T>(arg: T): T {
  return arg;
}

const num = identity<number>(42);
const str = identity<string>('hello');

// Generic interface
interface Box<T> {
  value: T;
}

const numberBox: Box<number> = { value: 42 };
const stringBox: Box<string> = { value: 'hello' };

// Generic class
class Container<T> {
  private items: T[] = [];
  
  add(item: T): void {
    this.items.push(item);
  }
  
  get(index: number): T {
    return this.items[index];
  }
}

// ============================================
// UNION AND INTERSECTION TYPES
// ============================================

// Union type
type StringOrNumber = string | number;
let value: StringOrNumber = 'hello';
value = 42; // OK

// Intersection type
type Person = {
  name: string;
  age: number;
};

type Employee = {
  id: number;
  department: string;
};

type EmployeePerson = Person & Employee;

// ============================================
// TYPE ASSERTIONS
// ============================================

let someValue: unknown = 'this is a string';
let strLength: number = (someValue as string).length;

// Alternative syntax
let strLength2: number = (<string>someValue).length;

// ============================================
// UTILITY TYPES
// ============================================

interface User {
  name: string;
  age: number;
  email: string;
}

// Partial - all properties optional
type PartialUser = Partial<User>;

// Required - all properties required
type RequiredUser = Required<User>;

// Pick - select properties
type UserName = Pick<User, 'name'>;

// Omit - exclude properties
type UserWithoutEmail = Omit<User, 'email'>;

// Readonly - all properties readonly
type ReadonlyUser = Readonly<User>;
```

---

## E) Internal Working

**TypeScript Process:**
1. **Type Checking:** Analyze types
2. **Compilation:** Convert to JavaScript
3. **Error Reporting:** Show type errors
4. **Emit:** Generate JavaScript
5. **Runtime:** Run as JavaScript

---

## F) Interview Questions & Answers

### Q1: What is TypeScript and why use it?

**Answer:**
TypeScript is JavaScript superset with static typing. Benefits: Type safety (catch errors early), Better IDE support (autocomplete, refactoring), Documentation (types as docs), Safe refactoring, Scalability (better for large apps). Compiles to JavaScript, optional typing, gradual adoption. Use for: Large applications, team projects, when need type safety, better tooling.

### Q2: What is the difference between interface and type in TypeScript?

**Answer:**
Interface: Can be extended, merged (declaration merging), better for object shapes, can be implemented by classes. Type: Can represent unions/intersections, can use computed properties, more flexible, cannot be merged. Use interface for: Object shapes, public APIs, when need merging. Use type for: Unions, intersections, computed types, more complex types.

### Q3: What are Generics in TypeScript?

**Answer:**
Generics: Reusable types, parameterized types, create flexible components. Syntax: `<T>`, can have constraints, multiple parameters. Use for: Functions, classes, interfaces that work with multiple types. Example: `function identity<T>(arg: T): T`. Benefits: Type safety, code reuse, flexibility. Constraints: `function process<T extends string>(arg: T)`.

---

## G) Common Mistakes

### Mistake 1: Using `any` Too Much

```typescript
// ❌ WRONG - Loses type safety
function process(data: any) {
  return data.value;
}

// ✅ CORRECT - Use proper types
function process<T extends { value: string }>(data: T): string {
  return data.value;
}
```

**Why it breaks:** `any` disables type checking, defeats TypeScript purpose.

---

## H) When to Use & When NOT to Use

Use TypeScript for: Large applications, team projects, need type safety, better tooling. Don't use when: Small projects, prototyping, team not familiar, overhead not justified.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain TypeScript."

**You:"
"TypeScript is JavaScript superset with static typing. Adds type checking at compile-time, better IDE support, catches errors early. Features: Types, Interfaces, Classes, Generics, Enums.

Benefits: Type safety, better tooling, documentation, safe refactoring, scalability. Compiles to JavaScript, optional typing, gradual adoption. Use for large applications, team projects, when need type safety."

---

## J) Mini Practice Task

Practice: Write TypeScript code, use types and interfaces, create classes, use generics, understand type system, compile TypeScript, use utility types.

---

**END OF TOPIC: TYPESCRIPT BASICS**

