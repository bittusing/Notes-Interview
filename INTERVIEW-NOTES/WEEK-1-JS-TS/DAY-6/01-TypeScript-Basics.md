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

### Detailed Key Features Explained

#### 1. TYPES (Primitive, Object, Function Types)

**TYPES KYA HAI? (HINGLISH)**

Types TypeScript mein variables, functions, aur objects ko define karte hain ki woh kya store kar sakte hain. Ye compile-time par type checking enable karte hain.

**Simple Definition:**
- Primitive Types: Basic data types (string, number, boolean, etc.)
- Object Types: Complex data structures (objects, arrays, tuples)
- Function Types: Functions ki signature define karta hai (parameters aur return type)

**Real-life Analogy:**
- Jaise aapke ghar mein boxes hote hain, har box par label hota hai (clothes, books, food)
- Types bhi waise hi - variable ke naam par "label" hota hai ki woh kya store kar sakta hai
- Agar wrong type ka data daaloge, compiler error dega (jaise clothes box mein food daalna)

**Types of Types:**

**1. PRIMITIVE TYPES:**
- `string`: Text data store karta hai
- `number`: Numbers (integers, floats) store karta hai
- `boolean`: true/false values
- `null`: Explicitly "nothing" value
- `undefined`: Variable declared but not assigned
- `void`: No return value (functions)
- `never`: Never returns (functions that throw)

**2. OBJECT TYPES:**
- `object`: Any non-primitive value
- `array`: Collection of values (typed arrays)
- `tuple`: Fixed-length array with specific types
- `function`: Function signature

**3. FUNCTION TYPES:**
- Parameter types define karte hain
- Return type define karta hai
- Optional/Default parameters

**TYPES - ENGLISH EXPLANATION**

Types in TypeScript define what values variables, functions, and objects can hold. They enable compile-time type checking.

**Primitive Types:** Basic data types like `string`, `number`, `boolean`, `null`, `undefined`, `void`, `never`.

**Object Types:** Complex types like `object`, `array`, `tuple`, and `function`.

**Function Types:** Define function signatures including parameter types and return types.

**Examples:**

```typescript
// ============================================
// PRIMITIVE TYPES
// ============================================

// String type
let name: string = "John";
let message: string = `Hello, ${name}!`; // Template literals work

// Number type (integers, floats, Infinity, NaN all are number)
let age: number = 30;
let price: number = 99.99;
let infinity: number = Infinity;
let notANumber: number = NaN;

// Boolean type
let isActive: boolean = true;
let isLoggedIn: boolean = false;

// Null and Undefined
let nullValue: null = null;
let undefinedValue: undefined = undefined;

// Void (for functions that don't return)
function logMessage(msg: string): void {
  console.log(msg);
  // No return statement
}

// Never (for functions that never return or always throw)
function throwError(): never {
  throw new Error("Always throws");
}

function infiniteLoop(): never {
  while (true) {
    // Never returns
  }
}

// ============================================
// OBJECT TYPES
// ============================================

// Array types
let numbers: number[] = [1, 2, 3, 4, 5];
let names: Array<string> = ["John", "Jane", "Bob"]; // Generic syntax
let mixed: (string | number)[] = ["hello", 42, "world", 100]; // Union array

// Tuple (fixed-length, specific types)
let person: [string, number] = ["John", 30]; // Exactly 2 elements
let coordinates: [number, number, number] = [10, 20, 30]; // 3D point

// Object type
let user: object = {
  name: "John",
  age: 30
};

// Inline object type
let employee: { name: string; age: number; email?: string } = {
  name: "John",
  age: 30
  // email is optional
};

// ============================================
// FUNCTION TYPES
// ============================================

// Function with typed parameters and return
function add(a: number, b: number): number {
  return a + b;
}

// Arrow function with types
const multiply = (x: number, y: number): number => {
  return x * y;
};

// Function type definition
type MathOperation = (a: number, b: number) => number;

const divide: MathOperation = (a, b) => {
  return a / b;
};

// Optional parameters
function greet(name: string, age?: number): string {
  if (age !== undefined) {
    return `Hello ${name}, you are ${age} years old`;
  }
  return `Hello ${name}`;
}

// Default parameters
function createUser(name: string, role: string = "user"): string {
  return `${name} is a ${role}`;
}

// Rest parameters
function sum(...numbers: number[]): number {
  return numbers.reduce((total, num) => total + num, 0);
}

// Function overloads
function process(value: string): string;
function process(value: number): number;
function process(value: string | number): string | number {
  if (typeof value === "string") {
    return value.toUpperCase();
  }
  return value * 2;
}

// Union types in functions
function format(value: string | number): string {
  if (typeof value === "string") {
    return value.toUpperCase();
  }
  return value.toString();
}
```

---

#### 2. INTERFACES (Object Shapes)

**INTERFACES KYA HAI? (HINGLISH)**

Interfaces TypeScript mein object ke structure ko define karte hain. Ye batate hain ki ek object mein kaunse properties hongi, unka type kya hoga, aur woh required ya optional hain.

**Simple Definition:**
- Object ka blueprint/contract define karta hai
- Properties, types, aur optionality specify karta hai
- Code ko readable aur maintainable banata hai
- Multiple implementations allow karta hai

**Real-life Analogy:**
- Jaise ek form mein fields hote hain (Name: text field, Age: number field, Email: optional)
- Interface bhi waise hi - object ke liye "form" define karta hai
- Agar required field missing ho, TypeScript error dega (jaise form submit karte waqt required field empty)

**Key Features:**
- **Properties:** Define object properties with types
- **Optional Properties:** `property?: type` syntax
- **Readonly Properties:** `readonly property: type`
- **Extending:** One interface can extend another
- **Merging:** Multiple declarations merge automatically

**INTERFACES - ENGLISH EXPLANATION**

Interfaces define the structure/shape of objects in TypeScript. They specify which properties an object should have, their types, and whether they're required or optional. Interfaces act as contracts that objects must follow.

**Key Features:** Property definitions, optional properties, readonly properties, extending interfaces, declaration merging.

**Examples:**

```typescript
// ============================================
// BASIC INTERFACE
// ============================================

interface User {
  name: string;        // Required property
  age: number;         // Required property
  email?: string;      // Optional property (can be undefined)
  readonly id: number; // Readonly - cannot be changed after creation
}

// Valid object
const user1: User = {
  name: "John",
  age: 30,
  id: 1
  // email is optional, so we can omit it
};

const user2: User = {
  name: "Jane",
  age: 25,
  email: "jane@example.com", // Optional, but we can include it
  id: 2
};

// ❌ Error: Missing required property 'age'
// const user3: User = {
//   name: "Bob",
//   id: 3
// };

// ❌ Error: Cannot assign to 'id' because it is readonly
// user1.id = 2;

// ============================================
// INTERFACE WITH METHODS
// ============================================

interface Calculator {
  // Properties
  value: number;
  
  // Methods (different syntaxes)
  add(n: number): void;
  subtract(n: number): void;
  getValue(): number;
  
  // Method shorthand (arrow function style)
  multiply: (n: number) => void;
}

const calc: Calculator = {
  value: 0,
  
  add(n: number): void {
    this.value += n;
  },
  
  subtract(n: number): void {
    this.value -= n;
  },
  
  getValue(): number {
    return this.value;
  },
  
  multiply: (n: number) => {
    // Note: 'this' doesn't work here in arrow function
    // calc.value *= n; // Would work
  }
};

// ============================================
// EXTENDING INTERFACES
// ============================================

interface Person {
  name: string;
  age: number;
}

// Admin extends Person - gets all Person properties + additional
interface Admin extends Person {
  permissions: string[];
  isSuperAdmin: boolean;
}

const admin: Admin = {
  name: "Admin User",
  age: 35,
  permissions: ["read", "write", "delete"],
  isSuperAdmin: true
};

// Multiple inheritance (extending multiple interfaces)
interface Employee extends Person {
  employeeId: number;
}

interface Manager extends Employee {
  teamSize: number;
}

const manager: Manager = {
  name: "Manager",
  age: 40,
  employeeId: 12345,
  teamSize: 10
};

// ============================================
// INTERFACE MERGING (DECLARATION MERGING)
// ============================================

// First declaration
interface Config {
  apiUrl: string;
}

// Second declaration (automatically merged with first)
interface Config {
  timeout: number;
}

// Both properties available
const config: Config = {
  apiUrl: "https://api.example.com",
  timeout: 5000
};

// ============================================
// INTERFACE WITH INDEX SIGNATURES
// ============================================

interface StringDictionary {
  [key: string]: string; // Any string key with string value
}

const dictionary: StringDictionary = {
  hello: "world",
  foo: "bar",
  // Can have any number of string properties
};

interface NumberDictionary {
  [key: string]: number;
}

const scores: NumberDictionary = {
  math: 95,
  science: 87,
  english: 92
};

// ============================================
// INTERFACE VS TYPE ALIAS
// ============================================

// Interface (can be extended, merged)
interface IUser {
  name: string;
}

// Type alias (cannot be merged, more flexible)
type TUser = {
  name: string;
};

// Interface can extend type
type Base = {
  id: number;
};

interface Extended extends Base {
  name: string;
}
```

---

#### 3. CLASSES (OOP with Types)

**CLASSES KYA HAI? (HINGLISH)**

Classes TypeScript mein Object-Oriented Programming ke liye use hoti hain. Ye data (properties) aur behavior (methods) ko ek saath group karti hain. TypeScript classes mein access modifiers (public, private, protected) hote hain jo visibility control karte hain.

**Simple Definition:**
- Objects create karne ka blueprint
- Properties (data) aur methods (functions) define karta hai
- Inheritance support (parent-child relationship)
- Encapsulation (data hiding with access modifiers)
- Polymorphism (method overriding)

**Real-life Analogy:**
- Jaise ek car manufacturing plant mein "Car" ka blueprint hota hai
- Har car blueprint se banegi (same structure)
- Different cars (different instances) same blueprint se ban sakti hain
- Classes bhi waise hi - object ka blueprint

**Access Modifiers:**
- **public:** Sab jagah access (default)
- **private:** Sirf class ke andar access
- **protected:** Class aur child classes mein access
- **readonly:** Set karne ke baad change nahi kar sakte

**CLASSES - ENGLISH EXPLANATION**

Classes in TypeScript enable Object-Oriented Programming. They group data (properties) and behavior (methods) together. TypeScript classes support access modifiers (public, private, protected) for encapsulation, inheritance for code reuse, and method overriding for polymorphism.

**Key Features:** Properties, methods, constructors, inheritance, access modifiers, static members, abstract classes.

**Examples:**

```typescript
// ============================================
// BASIC CLASS
// ============================================

class Person {
  // Properties with access modifiers
  public name: string;      // Accessible everywhere
  private age: number;      // Only accessible within class
  protected email: string;  // Accessible in class and child classes
  readonly id: number;      // Cannot be changed after initialization
  
  // Constructor
  constructor(name: string, age: number, email: string, id: number) {
    this.name = name;
    this.age = age;
    this.email = email;
    this.id = id;
  }
  
  // Method
  public getAge(): number {
    return this.age; // Can access private property
  }
  
  // Private method
  private validateEmail(): boolean {
    return this.email.includes("@");
  }
  
  // Protected method
  protected getEmail(): string {
    return this.email;
  }
}

const person = new Person("John", 30, "john@example.com", 1);
console.log(person.name);     // ✅ Public - accessible
console.log(person.getAge()); // ✅ Can call public method
// console.log(person.age);   // ❌ Error: Property 'age' is private
// console.log(person.email); // ❌ Error: Property 'email' is protected

// ============================================
// CLASS WITH DEFAULT PARAMETERS
// ============================================

class User {
  public name: string;
  public role: string;
  
  // Default parameter
  constructor(name: string, role: string = "user") {
    this.name = name;
    this.role = role;
  }
  
  // Method
  introduce(): string {
    return `I am ${this.name}, a ${this.role}`;
  }
}

const user1 = new User("Alice"); // role defaults to "user"
const user2 = new User("Bob", "admin");

// ============================================
// INHERITANCE
// ============================================

class Animal {
  protected name: string;
  
  constructor(name: string) {
    this.name = name;
  }
  
  public makeSound(): string {
    return "Some sound";
  }
  
  protected getName(): string {
    return this.name;
  }
}

// Dog extends Animal
class Dog extends Animal {
  private breed: string;
  
  constructor(name: string, breed: string) {
    super(name); // Call parent constructor
    this.breed = breed;
  }
  
  // Method overriding
  public makeSound(): string {
    return "Woof! Woof!";
  }
  
  public getInfo(): string {
    return `${this.getName()} is a ${this.breed}`; // Can access protected method
  }
}

const dog = new Dog("Buddy", "Golden Retriever");
console.log(dog.makeSound()); // "Woof! Woof!" (overridden method)
console.log(dog.getInfo());   // "Buddy is a Golden Retriever"

// ============================================
// STATIC MEMBERS
// ============================================

class MathHelper {
  // Static property
  static readonly PI: number = 3.14159;
  
  // Static method
  static add(a: number, b: number): number {
    return a + b;
  }
  
  // Instance method
  multiply(a: number, b: number): number {
    return a * b;
  }
}

// Access static members without instance
console.log(MathHelper.PI);           // 3.14159
console.log(MathHelper.add(5, 3));    // 8

// Instance needed for instance methods
const helper = new MathHelper();
console.log(helper.multiply(5, 3));   // 15

// ============================================
// ABSTRACT CLASSES
// ============================================

// Cannot instantiate abstract class
abstract class Shape {
  protected color: string;
  
  constructor(color: string) {
    this.color = color;
  }
  
  // Abstract method - must be implemented by child class
  abstract calculateArea(): number;
  
  // Concrete method
  public getColor(): string {
    return this.color;
  }
}

// Concrete class implementing abstract class
class Circle extends Shape {
  private radius: number;
  
  constructor(color: string, radius: number) {
    super(color);
    this.radius = radius;
  }
  
  // Must implement abstract method
  calculateArea(): number {
    return Math.PI * this.radius * this.radius;
  }
}

class Rectangle extends Shape {
  private width: number;
  private height: number;
  
  constructor(color: string, width: number, height: number) {
    super(color);
    this.width = width;
    this.height = height;
  }
  
  calculateArea(): number {
    return this.width * this.height;
  }
}

const circle = new Circle("red", 5);
console.log(circle.calculateArea());  // ~78.54
console.log(circle.getColor());       // "red"

// ============================================
// GETTERS AND SETTERS
// ============================================

class Temperature {
  private _celsius: number = 0;
  
  // Getter
  get celsius(): number {
    return this._celsius;
  }
  
  // Setter
  set celsius(value: number) {
    if (value < -273.15) {
      throw new Error("Temperature below absolute zero");
    }
    this._celsius = value;
  }
  
  // Getter for computed property
  get fahrenheit(): number {
    return this._celsius * 9/5 + 32;
  }
  
  set fahrenheit(value: number) {
    this._celsius = (value - 32) * 5/9;
  }
}

const temp = new Temperature();
temp.celsius = 25;        // Uses setter
console.log(temp.celsius);     // 25 (uses getter)
console.log(temp.fahrenheit);  // 77 (computed getter)
temp.fahrenheit = 100;    // Uses fahrenheit setter
console.log(temp.celsius);     // ~37.78
```

---

#### 4. GENERICS (Reusable Types)

**GENERICS KYA HAI? (HINGLISH)**

Generics TypeScript mein reusable types banane ka tarika hai. Ye aapko functions, classes, aur interfaces banane dete hain jo different types ke saath kaam kar sakte hain, bina actual type specify kiye.

**Simple Definition:**
- Type ka placeholder (`T`, `U`, `V`, etc.)
- Code ko type-safe aur reusable banata hai
- Ek hi function/class multiple types ke saath kaam kar sakta hai
- Type safety maintain karte hain

**Real-life Analogy:**
- Jaise ek container box jisme kuch bhi rakha ja sakta hai (books, clothes, tools)
- Box ka size fix hai, lekin contents different ho sakte hain
- Generics bhi waise hi - structure same, type different
- `<T>` means "Type" - jo bhi type pass karo, wahi use hoga

**Key Benefits:**
- **Code Reuse:** Ek function multiple types ke liye
- **Type Safety:** Compile-time type checking
- **Flexibility:** Different types ke saath kaam karna
- **IntelliSense:** Better IDE support

**GENERICS - ENGLISH EXPLANATION**

Generics allow creating reusable components that work with multiple types. They use type parameters (like `<T>`) as placeholders that get replaced with actual types when used. This provides type safety while maintaining flexibility.

**Key Benefits:** Code reuse, type safety, flexibility, better tooling support.

**Examples:**

```typescript
// ============================================
// GENERIC FUNCTIONS
// ============================================

// Basic generic function
function identity<T>(arg: T): T {
  return arg;
}

// Usage with different types
const num = identity<number>(42);        // T = number
const str = identity<string>("hello");   // T = string
const bool = identity<boolean>(true);    // T = boolean

// Type inference (TypeScript automatically infers type)
const num2 = identity(42);    // TypeScript knows it's number
const str2 = identity("hi");  // TypeScript knows it's string

// ============================================
// GENERIC FUNCTION WITH ARRAYS
// ============================================

function getFirstElement<T>(arr: T[]): T | undefined {
  return arr.length > 0 ? arr[0] : undefined;
}

const numbers = [1, 2, 3, 4];
const firstNum = getFirstElement<number>(numbers);  // number | undefined

const strings = ["a", "b", "c"];
const firstStr = getFirstElement<string>(strings);  // string | undefined

// ============================================
// MULTIPLE TYPE PARAMETERS
// ============================================

function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

const pair1 = pair<string, number>("age", 30);      // [string, number]
const pair2 = pair<number, boolean>(42, true);      // [number, boolean]

// ============================================
// GENERIC CONSTRAINTS
// ============================================

// Constraint: T must have 'length' property
function getLength<T extends { length: number }>(item: T): number {
  return item.length;
}

console.log(getLength("hello"));     // 5 (string has length)
console.log(getLength([1, 2, 3]));   // 3 (array has length)
// console.log(getLength(42));       // ❌ Error: number doesn't have length

// Constraint with keyof
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = { name: "John", age: 30 };
const name = getProperty(person, "name");  // string
const age = getProperty(person, "age");    // number
// const invalid = getProperty(person, "email"); // ❌ Error: key doesn't exist

// ============================================
// GENERIC INTERFACES
// ============================================

interface Box<T> {
  value: T;
  getValue(): T;
  setValue(value: T): void;
}

const numberBox: Box<number> = {
  value: 42,
  getValue(): number {
    return this.value;
  },
  setValue(value: number): void {
    this.value = value;
  }
};

const stringBox: Box<string> = {
  value: "hello",
  getValue(): string {
    return this.value;
  },
  setValue(value: string): void {
    this.value = value;
  }
};

// ============================================
// GENERIC CLASSES
// ============================================

class Container<T> {
  private items: T[] = [];
  
  add(item: T): void {
    this.items.push(item);
  }
  
  get(index: number): T | undefined {
    return this.items[index];
  }
  
  getAll(): T[] {
    return [...this.items]; // Return copy
  }
  
  remove(index: number): void {
    this.items.splice(index, 1);
  }
}

// Usage with different types
const numberContainer = new Container<number>();
numberContainer.add(1);
numberContainer.add(2);
console.log(numberContainer.getAll()); // [1, 2]

const stringContainer = new Container<string>();
stringContainer.add("a");
stringContainer.add("b");
console.log(stringContainer.getAll()); // ["a", "b"]

// ============================================
// GENERIC WITH DEFAULT TYPE
// ============================================

interface Repository<T = any> {
  findById(id: number): T | undefined;
  findAll(): T[];
  save(entity: T): void;
}

// Uses default type (any)
const anyRepo: Repository = {
  findById: (id) => undefined,
  findAll: () => [],
  save: () => {}
};

// Specific type
interface User {
  id: number;
  name: string;
}

const userRepo: Repository<User> = {
  findById: (id) => ({ id, name: "John" }),
  findAll: () => [],
  save: (user) => {}
};

// ============================================
// UTILITY TYPE WITH GENERICS
// ============================================

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Partial makes all properties optional
type PartialUser = Partial<User>;
// { id?: number; name?: string; email?: string; age?: number; }

// Pick selects specific properties
type UserName = Pick<User, 'name'>;
// { name: string; }

// Omit removes specific properties
type UserWithoutEmail = Omit<User, 'email'>;
// { id: number; name: string; age: number; }

// Record creates object type
type UserMap = Record<string, User>;
// { [key: string]: User; }
```

---

#### 5. ENUMS (Named Constants)

**ENUMS KYA HAI? (HINGLISH)**

Enums TypeScript mein named constants ka collection hai. Ye aapko related constants ko ek naam se group karne dete hain, making code more readable and maintainable.

**Simple Definition:**
- Related constants ka group
- Numbers ya strings ko meaningful names dete hain
- Type safety provide karte hain
- Auto-incrementing numbers (optional)

**Real-life Analogy:**
- Jaise traffic lights: Red = Stop, Green = Go, Yellow = Wait
- In sab ko ek group mein rakhte hain (TrafficLight enum)
- Enums bhi waise hi - related constants ko ek saath group karna

**Types of Enums:**
- **Numeric Enums:** Auto-incrementing numbers (default)
- **String Enums:** String values
- **Heterogeneous Enums:** Mix of numbers and strings (not recommended)

**ENUMS - ENGLISH EXPLANATION**

Enums in TypeScript are collections of named constants. They group related constants together, providing meaningful names and type safety. Enums can be numeric (auto-incrementing) or string-based.

**Types:** Numeric enums (default, auto-incrementing), String enums (explicit string values), Heterogeneous enums (mixed, not recommended).

**Examples:**

```typescript
// ============================================
// NUMERIC ENUMS (Default)
// ============================================

enum Direction {
  North,    // 0 (auto-assigned)
  East,     // 1
  South,    // 2
  West      // 3
}

// Usage
let currentDirection: Direction = Direction.North;
console.log(currentDirection);        // 0
console.log(Direction.North);         // 0
console.log(Direction[0]);            // "North" (reverse mapping)

// With custom starting value
enum Status {
  Pending = 1,   // Start from 1
  Active,        // 2 (auto-incremented)
  Inactive,      // 3
  Deleted        // 4
}

console.log(Status.Pending);    // 1
console.log(Status.Active);     // 2

// With custom values
enum Priority {
  Low = 10,
  Medium = 20,
  High = 30,
  Critical = 40
}

console.log(Priority.Low);      // 10
console.log(Priority.Medium);   // 20

// ============================================
// STRING ENUMS
// ============================================

enum Color {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE"
}

// Must initialize all values
let selectedColor: Color = Color.Red;
console.log(selectedColor);     // "RED"
console.log(Color.Green);       // "GREEN"

// String enums don't have reverse mapping
// console.log(Color["RED"]);   // ❌ Error

// ============================================
// CONST ENUMS (More Efficient)
// ============================================

// Const enum - values inlined at compile time
const enum Size {
  Small = "S",
  Medium = "M",
  Large = "L",
  XLarge = "XL"
}

let shirtSize: Size = Size.Medium;
// Compiles to: let shirtSize = "M" (inlined, no enum object created)

// ============================================
// ENUM WITH COMPUTED VALUES
// ============================================

enum FileAccess {
  None = 0,
  Read = 1 << 1,      // Bitwise: 2
  Write = 1 << 2,     // Bitwise: 4
  ReadWrite = Read | Write  // Computed: 6
}

console.log(FileAccess.Read);       // 2
console.log(FileAccess.Write);      // 4
console.log(FileAccess.ReadWrite);  // 6

// ============================================
// ENUM AS FUNCTION PARAMETERS
// ============================================

enum UserRole {
  Admin = "admin",
  User = "user",
  Guest = "guest"
}

function getUserPermissions(role: UserRole): string[] {
  switch (role) {
    case UserRole.Admin:
      return ["read", "write", "delete", "admin"];
    case UserRole.User:
      return ["read", "write"];
    case UserRole.Guest:
      return ["read"];
    default:
      return [];
  }
}

const permissions = getUserPermissions(UserRole.Admin);
console.log(permissions); // ["read", "write", "delete", "admin"]

// ============================================
// ENUM IN INTERFACE
// ============================================

enum OrderStatus {
  Pending = "pending",
  Processing = "processing",
  Shipped = "shipped",
  Delivered = "delivered",
  Cancelled = "cancelled"
}

interface Order {
  id: number;
  status: OrderStatus;
  total: number;
}

const order: Order = {
  id: 1,
  status: OrderStatus.Pending,
  total: 99.99
};

// Type-safe status assignment
order.status = OrderStatus.Shipped;
// order.status = "invalid"; // ❌ Error: not assignable

// ============================================
// ENUM WITH OBJECT VALUES
// ============================================

// Alternative: const object with 'as const'
const HTTP_STATUS = {
  OK: 200,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
} as const;

type HttpStatus = typeof HTTP_STATUS[keyof typeof HTTP_STATUS];
// type HttpStatus = 200 | 404 | 500

function handleResponse(status: HttpStatus): void {
  console.log(`Status: ${status}`);
}

handleResponse(HTTP_STATUS.OK);        // Status: 200
// handleResponse(999);                // ❌ Error: not assignable
```

---

## Summary of Key Features

### Types
- **Purpose:** Define what values variables, functions can hold
- **Types:** Primitive (string, number, boolean), Object (arrays, tuples), Function
- **Benefit:** Type safety, catch errors early

### Interfaces
- **Purpose:** Define object structure/shape
- **Features:** Properties, optional properties, readonly, extending
- **Benefit:** Code contracts, better documentation, maintainability

### Classes
- **Purpose:** Object-Oriented Programming with types
- **Features:** Inheritance, access modifiers, static members, abstract classes
- **Benefit:** Code organization, encapsulation, polymorphism

### Generics
- **Purpose:** Create reusable type-safe components
- **Features:** Type parameters, constraints, multiple parameters
- **Benefit:** Code reuse, type safety, flexibility

### Enums
- **Purpose:** Group related named constants
- **Types:** Numeric (auto-increment), String (explicit values)
- **Benefit:** Readability, type safety, maintainability

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

