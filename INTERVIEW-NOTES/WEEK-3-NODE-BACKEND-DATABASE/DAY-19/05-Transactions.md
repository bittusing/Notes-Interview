# TRANSACTIONS

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hains

**Transactions kya hain?**
- Transactions multiple operations ko group karte hain
- All or nothing principle
- ACID properties provide karte hain
- Data consistency ensure karta hai
- MongoDB 4.0+ mein support

**Real-life Analogy:**
- Bank money transfer
- Debit + Credit = Transaction
- Agar koi fail ho, dono rollback
- All or nothing

**Transaction Properties:**
- **Atomicity:** All or nothing
- **Consistency:** Valid state
- **Isolation:** Concurrent transactions
- **Durability:** Persistent

### MongoDB Transactions

**Support:**
- MongoDB 4.0+ (replica sets)
- MongoDB 4.2+ (sharded clusters)
- Session-based
- Multi-document ACID

**Use Cases:**
- Multi-document updates
- Financial transactions
- Order processing
- Data consistency critical

---

## B) Easy English Theory

### What are Transactions?

Transactions group multiple operations with ACID properties. All operations succeed or all fail (atomicity). MongoDB supports transactions on replica sets (4.0+) and sharded clusters (4.2+). Use sessions to manage transactions.

---

## C) Why This Concept Exists

### The Problem
imp
**Without Transactions:**
- Partial updates possible
- Data inconsistency
- No rollback mechanism
- Race conditions

### The Solution

**Transactions Provide:**
1. **Atomicity:** All or nothing
2. **Consistency:** Valid state
3. **Isolation:** Concurrent safety
4. **Durability:** Persistent changes

---

## D) Practical Example (Code)

```javascript
// ============================================
// BASIC TRANSACTION
// ============================================

const session = await mongoose.startSession();
session.startTransaction();

try {
  // Operation 1
  await User.updateOne(
    { _id: userId },
    { $inc: { balance: -100 } },
    { session }
  );
  
  // Operation 2
  await Order.create([{
    userId: userId,
    amount: 100
  }], { session });
  
  // Commit transaction
  await session.commitTransaction();
} catch (error) {
  // Rollback on error
  await session.abortTransaction();
  throw error;
} finally {
  session.endSession();
}

// ============================================
// TRANSACTION WITH MULTIPLE COLLECTIONS
// ============================================

const session = await mongoose.startSession();
session.startTransaction();

try {
  // Update user
  await User.updateOne(
    { _id: userId },
    { $inc: { balance: -orderAmount } },
    { session }
  );
  
  // Create order
  const order = await Order.create([{
    userId: userId,
    amount: orderAmount,
    items: orderItems
  }], { session });
  
  // Update inventory
  for (const item of orderItems) {
    await Product.updateOne(
      { _id: item.productId },
      { $inc: { stock: -item.quantity } },
      { session }
    );
  }
  
  await session.commitTransaction();
  return order[0];
} catch (error) {
  await session.abortTransaction();
  throw error;
} finally {
  session.endSession();
}
```

---

## E) Internal Working

**1. Transaction Start:**
- Session created
- Transaction started
- Operations tracked

**2. Operations:**
- All operations use session
- Changes tracked
- Not committed yet

**3. Commit/Rollback:**
- Commit: All changes persist
- Rollback: All changes discarded
- Session ends

---

## F) Interview Questions & Answers

### Q1: What are Transactions in MongoDB?

**Answer:**
Transactions group multiple operations with ACID properties. All operations succeed or all fail (atomicity). MongoDB supports transactions on replica sets (4.0+) and sharded clusters (4.2+). Use sessions to manage transactions. All operations in transaction must use same session.

### Q2: When would you use Transactions?

**Answer:**
Use transactions for: Multi-document updates requiring consistency, financial transactions (money transfer), order processing (inventory + order), data consistency critical operations, operations that must be all-or-nothing. Don't use for single document operations (already atomic) or when eventual consistency is acceptable.

---

## G) Common Mistakes

### Mistake 1: Not Using Session

```javascript
// ❌ WRONG
await User.updateOne({ _id: userId }, { $inc: { balance: -100 } });
await Order.create({ userId, amount: 100 });
// Not in transaction - can fail partially

// ✅ CORRECT
const session = await mongoose.startSession();
session.startTransaction();
try {
  await User.updateOne({ _id: userId }, { $inc: { balance: -100 } }, { session });
  await Order.create([{ userId, amount: 100 }], { session });
  await session.commitTransaction();
} catch (error) {
  await session.abortTransaction();
}
```

**Why it breaks:** Operations not in transaction can fail partially.

---

## H) When to Use & When NOT to Use

Use transactions for multi-document consistency, financial operations, critical updates. Don't use for single document (already atomic) or when eventual consistency OK.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain Transactions in MongoDB."

**You:**
"MongoDB transactions group multiple operations with ACID properties. Use sessions to manage transactions. All operations in transaction must use same session. Operations either all succeed (commit) or all fail (rollback). Support on replica sets (4.0+) and sharded clusters (4.2+). Use for multi-document consistency, financial operations, critical updates. Single document operations are already atomic, so transactions needed for multi-document consistency."

---

## J) Mini Practice Task

Implement order processing with transaction: update user balance, create order, update inventory - all atomic.

---

**END OF TOPIC: TRANSACTIONS**

