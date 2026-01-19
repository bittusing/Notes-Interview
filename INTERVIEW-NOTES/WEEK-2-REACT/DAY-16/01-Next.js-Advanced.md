# NEXT.JS ADVANCED

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Next.js Advanced Features kya hain?**
- App Router (Next.js 13+)
- Server Components vs Client Components
- Middleware
- Edge Functions
- Streaming SSR
- React Server Components
- Advanced routing patterns
- Performance optimizations

**Key Advanced Features:**
- **App Router:** New routing system (app/ directory)
- **Server Components:** Server-side React components
- **Client Components:** Client-side components (interactive)
- **Middleware:** Request/response interception
- **Edge Functions:** Run at edge locations
- **Streaming:** Progressive HTML streaming
- **Suspense:** Loading states with Suspense
- **Parallel Routes:** Multiple pages simultaneously

---

## B) Easy English Theory

### What are Next.js Advanced Features?

Next.js Advanced Features: App Router (new routing in `app/` directory), Server Components (render on server, no JavaScript sent), Client Components (interactive, JavaScript sent), Middleware (intercept requests), Edge Functions (run at edge), Streaming SSR (progressive HTML), Suspense (loading states), Parallel Routes (multiple pages). Use for: Better performance, modern React features, advanced routing, edge computing.

---

## C) Why This Concept Exists

### The Problem

**With Pages Router:**
- Limited routing flexibility
- All components send JavaScript
- No streaming support
- Limited middleware capabilities

### The Solution

**Advanced Features Provide:**
1. **App Router:** More flexible routing
2. **Server Components:** Less JavaScript, faster
3. **Streaming:** Better perceived performance
4. **Middleware:** Request interception
5. **Edge Functions:** Lower latency

---

## D) Practical Example (Code)

```javascript
// ============================================
// APP ROUTER (Next.js 13+)
// ============================================

// app/layout.js (Root layout)
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

// app/page.js → / (Home page)
export default function Home() {
  return <h1>Home</h1>;
}

// app/about/page.js → /about
export default function About() {
  return <h1>About</h1>;
}

// app/blog/[id]/page.js → /blog/123 (Dynamic)
export default function BlogPost({ params }) {
  return <h1>Post {params.id}</h1>;
}

// ============================================
// SERVER COMPONENTS
// ============================================

// app/posts/page.js (Server Component by default)
// No 'use client' directive = Server Component

async function getPosts() {
  const res = await fetch('https://api.example.com/posts');
  return res.json();
}

export default async function Posts() {
  const posts = await getPosts(); // Direct async, no useEffect
  
  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}

// ============================================
// CLIENT COMPONENTS
// ============================================

// app/components/Counter.js
'use client'; // Must add for interactivity

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

// Use in Server Component
// app/page.js
import Counter from './components/Counter';

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Counter /> {/* Client Component */}
    </div>
  );
}

// ============================================
// DATA FETCHING IN APP ROUTER
// ============================================

// app/posts/page.js
async function getPosts() {
  const res = await fetch('https://api.example.com/posts', {
    cache: 'no-store' // Always fetch fresh (SSR)
    // cache: 'force-cache' // Static (SSG)
    // next: { revalidate: 60 } // ISR
  });
  return res.json();
}

export default async function Posts() {
  const posts = await getPosts();
  
  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}

// ============================================
// STREAMING WITH SUSPENSE
// ============================================

// app/posts/page.js
import { Suspense } from 'react';

async function getPosts() {
  await new Promise(resolve => setTimeout(resolve, 2000));
  const res = await fetch('https://api.example.com/posts');
  return res.json();
}

function PostsList() {
  const posts = getPosts(); // This will be awaited
  
  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}

export default function Posts() {
  return (
    <div>
      <h1>Posts</h1>
      <Suspense fallback={<div>Loading posts...</div>}>
        <PostsList />
      </Suspense>
    </div>
  );
}

// ============================================
// MIDDLEWARE
// ============================================

// middleware.js (root level)
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Check authentication
  const token = request.cookies.get('token');
  
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // Add custom header
  const response = NextResponse.next();
  response.headers.set('x-custom-header', 'value');
  
  return response;
}

// Config: Which paths to run middleware
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/:path*'
  ]
};

// ============================================
// EDGE FUNCTIONS
// ============================================

// app/api/hello/route.js
export const runtime = 'edge'; // Run at edge

export async function GET(request) {
  return new Response(JSON.stringify({ message: 'Hello from Edge' }), {
    headers: { 'content-type': 'application/json' }
  });
}

// ============================================
// API ROUTES IN APP ROUTER
// ============================================

// app/api/users/route.js
export async function GET(request) {
  const users = await getUsers();
  return Response.json({ users });
}

export async function POST(request) {
  const body = await request.json();
  const user = await createUser(body);
  return Response.json({ user }, { status: 201 });
}

// app/api/users/[id]/route.js
export async function GET(request, { params }) {
  const user = await getUser(params.id);
  return Response.json({ user });
}

export async function PUT(request, { params }) {
  const body = await request.json();
  const user = await updateUser(params.id, body);
  return Response.json({ user });
}

export async function DELETE(request, { params }) {
  await deleteUser(params.id);
  return new Response(null, { status: 204 });
}

// ============================================
// PARALLEL ROUTES
// ============================================

// app/dashboard/@analytics/page.js
export default function Analytics() {
  return <div>Analytics</div>;
}

// app/dashboard/@team/page.js
export default function Team() {
  return <div>Team</div>;
}

// app/dashboard/@activity/page.js
export default function Activity() {
  return <div>Activity</div>;
}

// app/dashboard/layout.js
export default function DashboardLayout({ children, analytics, team, activity }) {
  return (
    <div>
      {children}
      {analytics}
      {team}
      {activity}
    </div>
  );
}

// ============================================
// INTERCEPTING ROUTES
// ============================================

// app/(.)photo/[id]/page.js (Intercept /photo/123)
// Shows modal instead of navigating

'use client';

import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal';

export default function PhotoModal({ params }) {
  const router = useRouter();
  
  return (
    <Modal onClose={() => router.back()}>
      <Photo id={params.id} />
    </Modal>
  );
}

// ============================================
// LOADING STATES
// ============================================

// app/posts/loading.js (Automatic loading UI)
export default function Loading() {
  return <div>Loading posts...</div>;
}

// app/posts/page.js
export default async function Posts() {
  const posts = await getPosts();
  return <div>{/* posts */}</div>;
}

// ============================================
// ERROR BOUNDARIES
// ============================================

// app/posts/error.js (Error UI)
'use client';

export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}

// ============================================
// METADATA API
// ============================================

// app/about/page.js
export const metadata = {
  title: 'About Us',
  description: 'Learn about our company',
  openGraph: {
    title: 'About Us',
    description: 'Learn about our company',
    images: ['/og-image.jpg']
  }
};

export default function About() {
  return <h1>About</h1>;
}

// Dynamic metadata
export async function generateMetadata({ params }) {
  const post = await getPost(params.id);
  return {
    title: post.title,
    description: post.description
  };
}

// ============================================
// ROUTE HANDLERS (Advanced API Routes)
// ============================================

// app/api/upload/route.js
export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get('file');
  
  // Process file
  const buffer = await file.arrayBuffer();
  
  return Response.json({ success: true });
}

// Streaming response
export async function GET() {
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode('Hello'));
      controller.close();
    }
  });
  
  return new Response(stream, {
    headers: { 'content-type': 'text/plain' }
  });
}

// ============================================
// SERVER ACTIONS (Next.js 13.4+)
// ============================================

// app/actions.js
'use server';

export async function createPost(formData) {
  const title = formData.get('title');
  const content = formData.get('content');
  
  // Save to database
  const post = await db.posts.create({ title, content });
  
  return { success: true, post };
}

// app/posts/page.js
import { createPost } from './actions';

export default function PostsPage() {
  return (
    <form action={createPost}>
      <input name="title" />
      <textarea name="content" />
      <button type="submit">Create Post</button>
    </form>
  );
}

// ============================================
// OPTIMISTIC UPDATES
// ============================================

'use client';

import { useOptimistic } from 'react';
import { updatePost } from './actions';

export default function PostList({ posts }) {
  const [optimisticPosts, addOptimisticPost] = useOptimistic(
    posts,
    (state, newPost) => [...state, newPost]
  );
  
  async function handleSubmit(formData) {
    addOptimisticPost({ id: 'temp', title: formData.get('title') });
    await updatePost(formData);
  }
  
  return (
    <div>
      {optimisticPosts.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
```

---

## E) Internal Working

**App Router Flow:**
1. Request arrives
2. Match route in `app/` directory
3. Load layout (nested layouts)
4. Load page component
5. Render Server Components (server)
6. Stream HTML progressively
7. Hydrate Client Components (browser)

**Server Components:**
- Render on server only
- No JavaScript sent to client
- Can access databases, APIs directly
- Faster initial load

**Client Components:**
- Render on client
- JavaScript sent to browser
- Interactive (hooks, events)
- Marked with `'use client'`

---

## F) Interview Questions & Answers

### Q1: What is the difference between App Router and Pages Router?

**Answer:**
App Router: New routing (Next.js 13+), uses `app/` directory, Server Components by default, better performance, nested layouts, streaming support. Pages Router: Original routing, uses `pages/` directory, all components client-side, simpler but less flexible. App Router: Modern, better performance, Server Components. Pages Router: Stable, simpler, all features available. Choose: App Router for new projects, Pages Router for existing projects.

### Q2: What are Server Components and Client Components?

**Answer:**
Server Components: Render on server only, no JavaScript sent to client, can access databases/APIs directly, faster initial load, no interactivity (no hooks, events). Client Components: Render on client, JavaScript sent to browser, interactive (hooks, events, state), marked with `'use client'`. Use Server Components for: Data fetching, static content, SEO. Use Client Components for: Interactivity, browser APIs, state management.

### Q3: How does streaming work in Next.js?

**Answer:**
Streaming: Progressive HTML streaming, send HTML chunks as they're ready, better perceived performance, use Suspense boundaries. Flow: Server renders components, streams HTML chunks, client receives progressively, faster Time to First Byte (TTFB). Benefits: Faster initial load, better user experience, non-blocking. Use with: Suspense boundaries, async Server Components, loading states.

### Q4: What is middleware in Next.js?

**Answer:**
Middleware: Intercept requests before they reach pages, runs on edge, can modify request/response, authentication, redirects, headers. Use for: Authentication checks, redirects, A/B testing, logging, request modification. Location: `middleware.js` at root. Config: `matcher` for which paths. Example: Check auth token, redirect to login if missing. Runs: Before request reaches page, on edge locations.

### Q5: What are Edge Functions and when do you use them?

**Answer:**
Edge Functions: Run at edge locations (close to users), lower latency, faster response, limited runtime (no Node.js APIs), use `runtime = 'edge'`. Use for: API routes needing low latency, simple logic, no heavy dependencies. Don't use for: Complex logic, Node.js APIs needed, heavy dependencies. Benefits: Lower latency, global distribution, faster responses.

### Q6: How do you handle authentication in App Router?

**Answer:**
Authentication: Use middleware for route protection, check tokens/cookies, redirect if not authenticated, use Server Components for user data. Pattern: Middleware checks auth → Allow or redirect, Server Component fetches user data, Client Component for login form. Example: Middleware checks `token` cookie, redirects `/dashboard` to `/login` if missing. Libraries: NextAuth.js, Auth0, Clerk (support App Router).

### Q7: What are Server Actions and how do you use them?

**Answer:**
Server Actions: Server-side functions called from Client Components, marked with `'use server'`, can be used in forms, no API routes needed. Use for: Form submissions, mutations, server-side logic. Benefits: Type-safe, no API routes, simpler code. Example: `'use server'` function, use in form `action={serverAction}`. Pattern: Server Action → Database operation → Return result.

### Q8: What is the difference between loading.js and Suspense?

**Answer:**
loading.js: Automatic loading UI for route, shows while page loads, file-based (`app/posts/loading.js`), simple use case. Suspense: Manual loading boundaries, wrap specific components, more control, can have multiple boundaries. Use loading.js for: Route-level loading. Use Suspense for: Component-level loading, streaming, nested loading states. Both: Show loading state, improve UX.

### Q9: How do you handle errors in App Router?

**Answer:**
Error Handling: `error.js` file for error UI, catches errors in route, shows error message, `reset()` to retry. Pattern: `app/posts/error.js` catches errors in posts route, shows error UI, user can retry. Also: Error boundaries in Client Components, try-catch in Server Components. Best Practice: Error boundaries at route level, specific error messages, retry functionality.

### Q10: How do you optimize performance in Next.js App Router?

**Answer:**
Performance Optimization: Server Components (less JavaScript), Streaming (progressive HTML), Image optimization (automatic), Code splitting (automatic), Caching (fetch options), Dynamic imports (lazy loading). Techniques: Use Server Components, streaming with Suspense, optimize images, cache data fetching, lazy load Client Components. Monitor: Core Web Vitals, Lighthouse, Next.js Analytics. Tools: `next/image`, dynamic imports, fetch caching.

---

## G) Common Mistakes

### Mistake 1: Using Client Components Unnecessarily

```javascript
// ❌ WRONG - Client Component when not needed
'use client';

export default function Post({ post }) {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}

// ✅ CORRECT - Server Component (default)
export default async function Post({ params }) {
  const post = await getPost(params.id);
  
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}
```

**Why it breaks:** Sends unnecessary JavaScript, slower load, worse performance.

### Mistake 2: Not Using Streaming

```javascript
// ❌ WRONG - Wait for all data
export default async function Page() {
  const posts = await getPosts(); // Blocks
  const users = await getUsers(); // Blocks
  
  return (
    <div>
      <Posts posts={posts} />
      <Users users={users} />
    </div>
  );
}

// ✅ CORRECT - Stream with Suspense
export default function Page() {
  return (
    <div>
      <Suspense fallback={<div>Loading posts...</div>}>
        <Posts />
      </Suspense>
      <Suspense fallback={<div>Loading users...</div>}>
        <Users />
      </Suspense>
    </div>
  );
}
```

**Why it breaks:** Slower initial load, blocks rendering, worse UX.

---

## H) When to Use & When NOT to Use

**Use App Router When:**
- New Next.js project
- Need Server Components
- Want streaming
- Need advanced routing

**Use Pages Router When:**
- Existing project
- Simpler requirements
- All features available
- Team familiar with Pages Router

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain Next.js App Router and Server Components."

**You:**
"App Router is new routing system in Next.js 13+ using `app/` directory. Server Components render on server only, no JavaScript sent, faster load, can access databases directly. Client Components marked with `'use client'`, interactive, use hooks/events.

Benefits: Less JavaScript, better performance, streaming support, nested layouts. Use Server Components for data fetching, Client Components for interactivity.

Also: Middleware for request interception, Edge Functions for low latency, Streaming with Suspense for progressive HTML, Server Actions for form handling."

---

## J) Mini Practice Task

Create Next.js app with App Router: Server Components for data fetching, Client Components for interactivity, middleware for auth, streaming with Suspense, API routes, error handling.

---

**END OF TOPIC: NEXT.JS ADVANCED**
