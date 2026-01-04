# GRAPHQL

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**GraphQL kya hai?**
- GraphQL query language hai APIs ke liye
- Client exactly specify kar sakta hai ki kya data chahiye
- Single endpoint se multiple resources fetch kar sakte hain
- REST se different approach
- Facebook ne develop kiya

**Real-life Analogy:**
- REST = Restaurant menu (fixed dishes)
- GraphQL = Custom order (exactly jo chahiye wahi)
- Over-fetching = Zyada data milna (jo chahiye nahi)
- Under-fetching = Kam data milna (multiple requests)

**GraphQL Features:**
- **Single Endpoint:** Ek endpoint se sab
- **Flexible Queries:** Client specify karta hai
- **Type System:** Strong typing
- **Introspection:** Schema explore kar sakte hain
- **Real-time:** Subscriptions support

### GraphQL vs REST

**REST:**
- Multiple endpoints
- Fixed response structure
- Over-fetching/under-fetching
- Simple for basic cases

**GraphQL:**
- Single endpoint
- Flexible queries
- No over-fetching
- Complex but powerful

---

## B) Easy English Theory

### What is GraphQL?

GraphQL is query language for APIs. Client specifies exactly what data needed, single endpoint for all operations, flexible queries, strong type system. Benefits: No over-fetching (get only needed data), no under-fetching (single request for multiple resources), type safety, introspection. Use for flexible APIs, mobile apps, complex data requirements.

---

## C) Why This Concept Exists

### The Problem

**With REST:**
- Over-fetching (get more than needed)
- Under-fetching (need multiple requests)
- Fixed response structure
- Versioning complexity

### The Solution

**GraphQL Provides:**
1. **Flexibility:** Client specifies data
2. **Efficiency:** No over-fetching
3. **Single Request:** Multiple resources
4. **Type Safety:** Strong typing
5. **Evolution:** No versioning needed

---

## D) Practical Example (Code)

```javascript
// ============================================
// GRAPHQL SETUP
// ============================================

const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');

// ============================================
// SCHEMA DEFINITION
// ============================================

const typeDefs = gql`
  # Scalar types
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    createdAt: String!
  }
  
  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
    comments: [Comment!]!
    likes: Int!
  }
  
  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
  }
  
  # Query type (read operations)
  type Query {
    # Get single user
    user(id: ID!): User
    
    # Get all users
    users(limit: Int, offset: Int): [User!]!
    
    # Get single post
    post(id: ID!): Post
    
    # Get all posts
    posts(limit: Int, offset: Int): [Post!]!
    
    # Search
    searchUsers(query: String!): [User!]!
  }
  
  # Mutation type (write operations)
  type Mutation {
    # Create user
    createUser(input: CreateUserInput!): User!
    
    # Update user
    updateUser(id: ID!, input: UpdateUserInput!): User!
    
    # Delete user
    deleteUser(id: ID!): Boolean!
    
    # Create post
    createPost(input: CreatePostInput!): Post!
  }
  
  # Input types
  input CreateUserInput {
    name: String!
    email: String!
    age: Int
  }
  
  input UpdateUserInput {
    name: String
    email: String
    age: Int
  }
  
  input CreatePostInput {
    title: String!
    content: String!
    authorId: ID!
  }
  
  # Subscription type (real-time)
  type Subscription {
    postCreated: Post!
    userUpdated: User!
  }
`;

// ============================================
// RESOLVERS
// ============================================

const resolvers = {
  Query: {
    // Get user by ID
    user: async (parent, args, context) => {
      const { id } = args;
      return await User.findById(id);
    },
    
    // Get all users
    users: async (parent, args, context) => {
      const { limit = 10, offset = 0 } = args;
      return await User.find()
        .limit(limit)
        .skip(offset);
    },
    
    // Get post by ID
    post: async (parent, args, context) => {
      const { id } = args;
      return await Post.findById(id);
    },
    
    // Get all posts
    posts: async (parent, args, context) => {
      const { limit = 10, offset = 0 } = args;
      return await Post.find()
        .limit(limit)
        .skip(offset);
    },
    
    // Search users
    searchUsers: async (parent, args, context) => {
      const { query } = args;
      return await User.find({
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { email: { $regex: query, $options: 'i' } }
        ]
      });
    }
  },
  
  Mutation: {
    // Create user
    createUser: async (parent, args, context) => {
      const { input } = args;
      const user = await User.create(input);
      return user;
    },
    
    // Update user
    updateUser: async (parent, args, context) => {
      const { id, input } = args;
      const user = await User.findByIdAndUpdate(
        id,
        input,
        { new: true, runValidators: true }
      );
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    },
    
    // Delete user
    deleteUser: async (parent, args, context) => {
      const { id } = args;
      const result = await User.findByIdAndDelete(id);
      return !!result;
    },
    
    // Create post
    createPost: async (parent, args, context) => {
      const { input } = args;
      const post = await Post.create(input);
      
      // Publish subscription event
      pubsub.publish('POST_CREATED', {
        postCreated: post
      });
      
      return post;
    }
  },
  
  // Field resolvers (for nested fields)
  User: {
    // Resolve posts for user
    posts: async (parent, args, context) => {
      return await Post.find({ authorId: parent.id });
    }
  },
  
  Post: {
    // Resolve author for post
    author: async (parent, args, context) => {
      return await User.findById(parent.authorId);
    },
    
    // Resolve comments for post
    comments: async (parent, args, context) => {
      return await Comment.find({ postId: parent.id });
    }
  },
  
  Subscription: {
    postCreated: {
      subscribe: () => pubsub.asyncIterator('POST_CREATED')
    },
    
    userUpdated: {
      subscribe: () => pubsub.asyncIterator('USER_UPDATED')
    }
  }
};

// ============================================
// APOLLO SERVER SETUP
// ============================================

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // Add user from token
    const token = req.headers.authorization?.replace('Bearer ', '');
    const user = token ? verifyToken(token) : null;
    return { user };
  }
});

const app = express();
server.applyMiddleware({ app });

app.listen(4000, () => {
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
});

// ============================================
// QUERY EXAMPLES
// ============================================

/*
# Get user with posts
query {
  user(id: "123") {
    id
    name
    email
    posts {
      id
      title
      content
    }
  }
}

# Get users with pagination
query {
  users(limit: 10, offset: 0) {
    id
    name
    email
  }
}

# Get post with author and comments
query {
  post(id: "456") {
    id
    title
    content
    author {
      id
      name
    }
    comments {
      id
      text
      author {
        id
        name
      }
    }
  }
}

# Search users
query {
  searchUsers(query: "john") {
    id
    name
    email
  }
}
*/

// ============================================
// MUTATION EXAMPLES
// ============================================

/*
# Create user
mutation {
  createUser(input: {
    name: "John Doe"
    email: "john@example.com"
    age: 30
  }) {
    id
    name
    email
  }
}

# Update user
mutation {
  updateUser(
    id: "123"
    input: {
      name: "Jane Doe"
      age: 31
    }
  ) {
    id
    name
    email
    age
  }
}

# Delete user
mutation {
  deleteUser(id: "123")
}
*/

// ============================================
// VARIABLES
// ============================================

/*
query GetUser($userId: ID!) {
  user(id: $userId) {
    id
    name
    email
  }
}

Variables:
{
  "userId": "123"
}
*/

// ============================================
// FRAGMENTS
// ============================================

/*
fragment UserFields on User {
  id
  name
  email
  age
}

query {
  user(id: "123") {
    ...UserFields
    posts {
      id
      title
    }
  }
}
*/

// ============================================
// ALIASES
// ============================================

/*
query {
  user1: user(id: "123") {
    name
    email
  }
  user2: user(id: "456") {
    name
    email
  }
}
*/

// ============================================
// DIRECTIVES
// ============================================

/*
query ($includeEmail: Boolean!) {
  user(id: "123") {
    id
    name
    email @include(if: $includeEmail)
    age @skip(if: false)
  }
}
*/

// ============================================
// DATA LOADER (N+1 PROBLEM SOLUTION)
// ============================================

const DataLoader = require('dataloader');

// Create data loader for users
const userLoader = new DataLoader(async (userIds) => {
  const users = await User.find({ _id: { $in: userIds } });
  const userMap = {};
  users.forEach(user => {
    userMap[user._id.toString()] = user;
  });
  return userIds.map(id => userMap[id.toString()]);
});

// Use in resolver
const resolvers = {
  Post: {
    author: async (parent, args, context) => {
      return await userLoader.load(parent.authorId);
    }
  }
};

// ============================================
// ERROR HANDLING
// ============================================

class GraphQLError extends Error {
  constructor(message, code, extensions = {}) {
    super(message);
    this.code = code;
    this.extensions = extensions;
  }
}

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (!context.user) {
        throw new GraphQLError('Unauthorized', 'UNAUTHORIZED');
      }
      
      const user = await User.findById(args.id);
      if (!user) {
        throw new GraphQLError('User not found', 'NOT_FOUND', {
          id: args.id
        });
      }
      
      return user;
    }
  }
};

// ============================================
// VALIDATION
// ============================================

const { GraphQLError } = require('graphql');

const resolvers = {
  Mutation: {
    createUser: async (parent, args, context) => {
      const { input } = args;
      
      // Validate email
      if (!isValidEmail(input.email)) {
        throw new GraphQLError('Invalid email format', 'VALIDATION_ERROR', {
          field: 'email'
        });
      }
      
      // Check if email exists
      const existing = await User.findOne({ email: input.email });
      if (existing) {
        throw new GraphQLError('Email already exists', 'DUPLICATE_ENTRY', {
          field: 'email'
        });
      }
      
      return await User.create(input);
    }
  }
};

// ============================================
// SUBSCRIPTIONS (REAL-TIME)
// ============================================

const { PubSub } = require('apollo-server');
const pubsub = new PubSub();

const resolvers = {
  Mutation: {
    createPost: async (parent, args, context) => {
      const post = await Post.create(args.input);
      
      // Publish event
      pubsub.publish('POST_CREATED', {
        postCreated: post
      });
      
      return post;
    }
  },
  
  Subscription: {
    postCreated: {
      subscribe: () => pubsub.asyncIterator('POST_CREATED')
    }
  }
};

// Client subscription
/*
subscription {
  postCreated {
    id
    title
    author {
      name
    }
  }
}
*/
```

---

## E) Internal Working

**GraphQL Flow:**
1. Client sends GraphQL query
2. Server parses query
3. Validates against schema
4. Resolves fields
5. Executes resolvers
6. Returns requested data

**Query Execution:**
- Fields resolved in parallel when possible
- Nested fields resolved recursively
- DataLoader prevents N+1 queries

---

## F) Interview Questions & Answers

### Q1: What is GraphQL and how does it differ from REST?

**Answer:**
GraphQL is query language for APIs. Client specifies exactly what data needed. Differences: REST has multiple endpoints, fixed responses, over-fetching/under-fetching. GraphQL has single endpoint, flexible queries, no over-fetching, client controls response. GraphQL better for flexible APIs, mobile apps, complex data. REST simpler for basic CRUD.

### Q2: What are GraphQL operations (Query, Mutation, Subscription)?

**Answer:**
Operations: Query (read data - GET equivalent), Mutation (write data - POST/PUT/DELETE equivalent), Subscription (real-time updates - WebSocket equivalent). Query for fetching, Mutation for creating/updating/deleting, Subscription for real-time events. All use same endpoint, different operation types.

### Q3: How do you solve N+1 query problem in GraphQL?

**Answer:**
N+1 problem: Resolving nested fields causes multiple queries. Solution: DataLoader - batches requests, caches results, single query for multiple items. Example: Post.author resolver - without DataLoader: N queries for N posts, with DataLoader: 1 query for all authors. DataLoader essential for GraphQL performance.

---

## G) Common Mistakes

### Mistake 1: N+1 Query Problem

```javascript
// ❌ WRONG - N+1 queries
Post: {
  author: async (parent) => {
    return await User.findById(parent.authorId);
    // Called for each post = N queries
  }
}

// ✅ CORRECT - Use DataLoader
const userLoader = new DataLoader(async (ids) => {
  const users = await User.find({ _id: { $in: ids } });
  return ids.map(id => users.find(u => u._id.toString() === id));
});

Post: {
  author: async (parent) => {
    return await userLoader.load(parent.authorId);
    // Batched = 1 query
  }
}
```

**Why it breaks:** N+1 queries cause performance issues, database overload.

---

## H) When to Use & When NOT to Use

Use GraphQL for flexible APIs, mobile apps, complex data requirements, when client controls response. Don't use for simple CRUD, when REST is sufficient, or when caching is critical (REST easier to cache).

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain GraphQL."

**You:**
"GraphQL is query language for APIs. Client specifies exactly what data needed - no over-fetching. Single endpoint for all operations. Operations: Query (read), Mutation (write), Subscription (real-time). Benefits: Flexible queries, no over-fetching, type safety, introspection.

Schema defines types and operations. Resolvers implement logic. Use DataLoader to prevent N+1 queries. Better for flexible APIs, mobile apps. REST simpler for basic CRUD. GraphQL more complex but powerful."

---

## J) Mini Practice Task

Build GraphQL API: Define schema (User, Post), implement queries and mutations, use DataLoader, add subscriptions for real-time updates.

---

**END OF TOPIC: GRAPHQL**

