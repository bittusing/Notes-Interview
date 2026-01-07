# DENTIRA INTERVIEW PREPARATION - PART 3
## NoSQL & SQL Databases (MongoDB, MySQL)

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Database kya hai?**
- Database ek organized collection hai data ka
- Structured way mein data store karta hai
- Efficiently data retrieve, update, delete kar sakte hain
- Data persistence provide karta hai
- Multiple users concurrently access kar sakte hain

**Database Types:**

**1. SQL (Relational) Databases:**
- Tables, rows, columns
- Structured schema
- ACID properties
- Examples: MySQL, PostgreSQL, SQL Server

**2. NoSQL (Non-Relational) Databases:**
- Flexible schema
- Different data models
- Horizontal scaling
- Examples: MongoDB, Redis, Cassandra

### SQL vs NoSQL - Detailed Comparison

**SQL Databases (MySQL):**

**Structure:**
```
┌─────────────┐
│   Users     │
├─────────────┤
│ id (PK)     │
│ name        │
│ email       │
│ created_at  │
└─────────────┘
      │
      │ (Foreign Key)
      ▼
┌─────────────┐
│   Orders    │
├─────────────┤
│ id (PK)     │
│ user_id (FK)│
│ amount      │
│ status      │
└─────────────┘
```

**Characteristics:**
- **Schema:** Fixed, predefined
- **Relations:** Foreign keys, joins
- **ACID:** Full ACID compliance
- **Scaling:** Vertical (add more resources)
- **Query Language:** SQL
- **Use Cases:** Financial data, e-commerce, user management

**NoSQL Databases (MongoDB):**

**Structure:**
```javascript
// Users Collection
{
  _id: ObjectId("..."),
  name: "John",
  email: "john@example.com",
  orders: [
    {
      orderId: "123",
      amount: 1000,
      status: "completed"
    }
  ],
  createdAt: ISODate("...")
}
```

**Characteristics:**
- **Schema:** Flexible, dynamic
- **Relations:** Embedded documents or references
- **ACID:** Limited (eventual consistency)
- **Scaling:** Horizontal (add more servers)
- **Query Language:** MongoDB Query Language
- **Use Cases:** Content management, real-time analytics, IoT

### When to Use SQL (MySQL)

**Best For:**
- **Structured Data:** Clear relationships
- **ACID Requirements:** Financial transactions
- **Complex Queries:** Joins, aggregations
- **Data Integrity:** Foreign keys, constraints
- **Mature Applications:** Well-defined requirements

**Example Use Cases:**
- E-commerce (orders, payments)
- Banking systems
- User authentication
- Inventory management

### When to Use NoSQL (MongoDB)

**Best For:**
- **Unstructured Data:** Flexible schema
- **Rapid Development:** Schema changes
- **Horizontal Scaling:** Large datasets
- **Document Storage:** JSON-like data
- **Real-time Analytics:** Fast reads

**Example Use Cases:**
- Content management systems
- User profiles
- Logging and analytics
- Social media feeds
- IoT data

---

## B) MySQL Deep Dive

### MySQL Fundamentals

**1. Data Types:**
```sql
-- Numeric
INT, BIGINT, DECIMAL(10,2), FLOAT, DOUBLE

-- String
VARCHAR(255), TEXT, CHAR(10), BLOB

-- Date/Time
DATE, TIME, DATETIME, TIMESTAMP

-- Boolean
BOOLEAN (TINYINT(1))
```

**2. Creating Tables:**
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email)
);
```

**3. Relationships:**
```sql
-- One-to-Many
CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  status ENUM('pending', 'completed', 'cancelled') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id)
);

-- Many-to-Many
CREATE TABLE order_items (
  order_id INT,
  product_id INT,
  quantity INT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (order_id, product_id),
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);
```

### MySQL Queries

**1. Basic CRUD:**
```sql
-- Create
INSERT INTO users (name, email, password_hash)
VALUES ('John Doe', 'john@example.com', 'hashed_password');

-- Read
SELECT * FROM users WHERE email = 'john@example.com';
SELECT id, name FROM users WHERE created_at > '2024-01-01';

-- Update
UPDATE users SET name = 'Jane Doe' WHERE id = 1;

-- Delete
DELETE FROM users WHERE id = 1;
```

**2. Joins:**
```sql
-- Inner Join
SELECT u.name, o.amount, o.status
FROM users u
INNER JOIN orders o ON u.id = o.user_id;

-- Left Join
SELECT u.name, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id;

-- Right Join
SELECT o.id, p.name, oi.quantity
FROM orders o
RIGHT JOIN order_items oi ON o.id = oi.order_id
LEFT JOIN products p ON oi.product_id = p.id;
```

**3. Aggregations:**
```sql
-- Group By
SELECT user_id, SUM(amount) as total_spent, COUNT(*) as order_count
FROM orders
WHERE status = 'completed'
GROUP BY user_id
HAVING total_spent > 1000;

-- Subqueries
SELECT name FROM users
WHERE id IN (
  SELECT user_id FROM orders
  WHERE amount > 1000
);
```

### MySQL in Node.js

**Using mysql2:**
```typescript
import mysql from 'mysql2/promise';

class MySQLService {
  private pool: mysql.Pool;

  constructor() {
    this.pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }

  async query<T>(sql: string, params?: any[]): Promise<T[]> {
    const [rows] = await this.pool.execute(sql, params);
    return rows as T[];
  }

  async getUserById(id: number): Promise<User | null> {
    const [rows] = await this.pool.execute(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );
    return (rows as User[])[0] || null;
  }

  async createUser(userData: CreateUserDto): Promise<User> {
    const [result] = await this.pool.execute(
      'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
      [userData.name, userData.email, userData.passwordHash]
    );
    const insertId = (result as mysql.ResultSetHeader).insertId;
    return this.getUserById(insertId);
  }
}
```

**Using TypeORM:**
```typescript
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @OneToMany(() => Order, order => order.user)
  orders: Order[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}

// Usage
const userRepository = dataSource.getRepository(User);
const user = await userRepository.findOne({ where: { id: 1 } });
```

---

## C) MongoDB Deep Dive

### MongoDB Fundamentals

**1. Document Structure:**
```javascript
// User Document
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  name: "John Doe",
  email: "john@example.com",
  passwordHash: "hashed_password",
  profile: {
    age: 30,
    city: "Mumbai",
    interests: ["coding", "reading"]
  },
  orders: [
    {
      orderId: "123",
      amount: 1000,
      status: "completed",
      items: [
        { productId: "p1", quantity: 2, price: 500 }
      ]
    }
  ],
  createdAt: ISODate("2024-01-01T00:00:00Z"),
  updatedAt: ISODate("2024-01-01T00:00:00Z")
}
```

**2. Collections and Documents:**
- **Collection:** Table equivalent (users, orders)
- **Document:** Row equivalent (single user object)
- **Field:** Column equivalent (name, email)

**3. Data Types:**
```javascript
{
  string: "text",
  number: 42,
  boolean: true,
  date: ISODate("2024-01-01"),
  array: [1, 2, 3],
  object: { key: "value" },
  null: null,
  ObjectId: ObjectId("..."),
  Binary: BinData(0, "...")
}
```

### MongoDB Queries

**1. Basic CRUD:**
```javascript
// Create
await db.collection('users').insertOne({
  name: 'John Doe',
  email: 'john@example.com',
  passwordHash: 'hashed_password'
});

// Read
const user = await db.collection('users').findOne({ email: 'john@example.com' });
const users = await db.collection('users').find({ age: { $gte: 18 } }).toArray();

// Update
await db.collection('users').updateOne(
  { email: 'john@example.com' },
  { $set: { name: 'Jane Doe' } }
);

// Delete
await db.collection('users').deleteOne({ email: 'john@example.com' });
```

**2. Query Operators:**
```javascript
// Comparison
{ age: { $gt: 18 } }        // Greater than
{ age: { $gte: 18 } }       // Greater than or equal
{ age: { $lt: 65 } }        // Less than
{ age: { $lte: 65 } }       // Less than or equal
{ age: { $ne: 30 } }        // Not equal
{ age: { $in: [18, 25, 30] } } // In array

// Logical
{ $and: [{ age: { $gte: 18 } }, { age: { $lte: 65 } }] }
{ $or: [{ status: 'active' }, { status: 'pending' }] }
{ $not: { age: { $lt: 18 } } }

// Element
{ email: { $exists: true } }
{ tags: { $type: 'array' } }

// Array
{ tags: { $all: ['nodejs', 'mongodb'] } }
{ tags: { $size: 3 } }
{ 'orders.amount': { $gt: 1000 } } // Nested field
```

**3. Aggregation Pipeline:**
```javascript
const result = await db.collection('orders').aggregate([
  // Match stage
  { $match: { status: 'completed' } },
  
  // Group stage
  {
    $group: {
      _id: '$userId',
      totalAmount: { $sum: '$amount' },
      orderCount: { $sum: 1 },
      avgAmount: { $avg: '$amount' }
    }
  },
  
  // Sort stage
  { $sort: { totalAmount: -1 } },
  
  // Limit stage
  { $limit: 10 }
]).toArray();
```

### MongoDB in Node.js

**Using Mongoose:**
```typescript
import mongoose from 'mongoose';

// Schema Definition
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  profile: {
    age: Number,
    city: String,
    interests: [String]
  },
  orders: [{
    orderId: String,
    amount: Number,
    status: String,
    items: [{
      productId: String,
      quantity: Number,
      price: Number
    }]
  }]
}, {
  timestamps: true
});

// Model
const User = mongoose.model('User', userSchema);

// Usage
const user = await User.findOne({ email: 'john@example.com' });
const newUser = await User.create({
  name: 'John Doe',
  email: 'john@example.com',
  passwordHash: 'hashed_password'
});
```

**Using Native Driver:**
```typescript
import { MongoClient } from 'mongodb';

class MongoDBService {
  private client: MongoClient;
  private db: any;

  async connect(): Promise<void> {
    this.client = new MongoClient(process.env.MONGODB_URI!);
    await this.client.connect();
    this.db = this.client.db(process.env.DB_NAME);
  }

  async getUserById(id: string) {
    return await this.db.collection('users').findOne({ _id: new ObjectId(id) });
  }

  async createUser(userData: any) {
    const result = await this.db.collection('users').insertOne(userData);
    return result.insertedId;
  }
}
```

---

## D) Interview Questions - Part 3

**Q1: "SQL vs NoSQL - When to use which?"**

✅ **Answer:**
"SQL databases are best for:
- Structured data with clear relationships
- ACID compliance requirements (financial transactions)
- Complex queries with joins
- Data integrity and consistency
- Mature applications with stable schema

NoSQL databases are best for:
- Unstructured or semi-structured data
- Rapid development with changing requirements
- Horizontal scaling needs
- High read/write throughput
- Document or key-value storage

In practice, I often use both - MySQL for transactional data (orders, payments) and MongoDB for flexible data (user profiles, content, logs)."

**Q2: "Explain MongoDB aggregation pipeline"**

✅ **Answer:**
"MongoDB aggregation pipeline processes documents through multiple stages:

**Common Stages:**
1. **$match:** Filter documents (like WHERE)
2. **$group:** Group and aggregate (like GROUP BY)
3. **$sort:** Sort results (like ORDER BY)
4. **$project:** Select fields (like SELECT)
5. **$lookup:** Join collections (like JOIN)
6. **$limit/$skip:** Pagination

**Example:**
```javascript
db.orders.aggregate([
  { $match: { status: 'completed' } },
  { $group: { _id: '$userId', total: { $sum: '$amount' } } },
  { $sort: { total: -1 } },
  { $limit: 10 }
])
```

This is powerful for complex data transformations and analytics."

**Q3: "How do you handle relationships in MongoDB?"**

✅ **Answer:**
"Two approaches:

**1. Embedded Documents:**
- Store related data in same document
- Fast reads, single query
- Good for one-to-few relationships
- Document size limit (16MB)

**2. References:**
- Store ObjectId references
- Use populate() or $lookup
- Good for one-to-many, many-to-many
- Multiple queries needed

**Example:**
```javascript
// Embedded (good for user profile)
{
  userId: "123",
  orders: [{ orderId: "1", amount: 100 }]
}

// Reference (good for large datasets)
{
  userId: "123",
  orderIds: [ObjectId("..."), ObjectId("...")]
}
```

I choose based on query patterns and data size."

---

## E) Key Takeaways

### Must Know:
1. ✅ SQL vs NoSQL trade-offs
2. ✅ MySQL queries and relationships
3. ✅ MongoDB document model
4. ✅ Aggregation pipeline
5. ✅ When to use embedded vs references
6. ✅ Database connection pooling

### Next Steps:
- Read dentira4.md for Database Design
- Practice complex queries
- Understand indexing strategies

---

**End of Part 3 - Continue to dentira4.md**

