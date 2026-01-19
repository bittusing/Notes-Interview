# NEXT.JS FUNDAMENTALS

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Next.js kya hai?**
- Next.js React ka production-ready framework hai
- Server-side rendering (SSR) provide karta hai
- Static site generation (SSG) support karta hai
- Built-in routing, API routes, optimization features
- Vercel ne banaya hai

**Real-life Analogy:**
- React = Building blocks (components)
- Next.js = Complete house (framework with everything)
- Next.js = React + Routing + SSR + Optimization

**Key Features:**
- **Server-Side Rendering (SSR):** Server pe render, SEO friendly
- **Static Site Generation (SSG):** Build time pe generate
- **Incremental Static Regeneration (ISR):** Static pages ko update karo
- **File-based Routing:** Files se routes automatically
- **API Routes:** Backend API bhi bana sakte hain
- **Image Optimization:** Automatic image optimization
- **Code Splitting:** Automatic code splitting

### Next.js vs React

**React:**
- Client-side rendering
- Manual routing setup
- Manual code splitting
- No built-in SSR

**Next.js:**
- SSR, SSG, ISR
- Automatic routing
- Automatic code splitting
- Built-in optimizations

---

## B) Easy English Theory

### What is Next.js?

Next.js is production-ready React framework. Features: Server-Side Rendering (SSR - render on server, SEO friendly), Static Site Generation (SSG - generate at build time), Incremental Static Regeneration (ISR - update static pages), File-based routing (automatic from files), API Routes (backend APIs), Image optimization (automatic), Code splitting (automatic). Built by Vercel. Use for: Production React apps, SEO needs, performance.

---

## C) Why This Concept Exists

### The Problem

**With Plain React:**
- Client-side only (no SSR)
- Poor SEO
- Manual routing setup
- Manual optimization
- Slower initial load

### The Solution

**Next.js Provides:**
1. **SSR:** Better SEO, faster initial load
2. **Routing:** Automatic file-based routing
3. **Optimization:** Built-in performance optimizations
4. **Developer Experience:** Better DX, less configuration
5. **Production Ready:** Optimized for production

---

## D) Practical Example (Code)

```javascript
// ============================================
// NEXT.JS PROJECT SETUP
// ============================================

// Install Next.js
// npx create-next-app@latest my-app
// cd my-app
// npm run dev

// ============================================
// FILE-BASED ROUTING
// ============================================

// pages/index.js → / (Home page)
export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
}

// pages/about.js → /about
export default function About() {
  return (
    <div>
      <h1>About Page</h1>
    </div>
  );
}

// pages/blog/[id].js → /blog/123 (Dynamic route)
export default function BlogPost({ post }) {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}

// pages/blog/[...slug].js → /blog/a/b/c (Catch-all route)
export default function Blog() {
  return <div>Blog</div>;
}

// ============================================
// SERVER-SIDE RENDERING (SSR)
// ============================================

// pages/posts/[id].js
export async function getServerSideProps(context) {
  const { id } = context.params;
  const res = await fetch(`https://api.example.com/posts/${id}`);
  const post = await res.json();
  
  return {
    props: {
      post
    }
  };
}

export default function Post({ post }) {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}

// ============================================
// STATIC SITE GENERATION (SSG)
// ============================================

// pages/posts/[id].js
export async function getStaticProps(context) {
  const { id } = context.params;
  const res = await fetch(`https://api.example.com/posts/${id}`);
  const post = await res.json();
  
  return {
    props: {
      post
    },
    revalidate: 60 // ISR: Revalidate every 60 seconds
  };
}

// Generate static paths for dynamic routes
export async function getStaticPaths() {
  const res = await fetch('https://api.example.com/posts');
  const posts = await res.json();
  
  const paths = posts.map(post => ({
    params: { id: post.id.toString() }
  }));
  
  return {
    paths,
    fallback: 'blocking' // or 'true' or false
  };
}

export default function Post({ post }) {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}

// ============================================
// API ROUTES
// ============================================

// pages/api/users.js
export default function handler(req, res) {
  if (req.method === 'GET') {
    // Handle GET request
    res.status(200).json({ users: [] });
  } else if (req.method === 'POST') {
    // Handle POST request
    const { name, email } = req.body;
    res.status(201).json({ id: 1, name, email });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// pages/api/users/[id].js
export default function handler(req, res) {
  const { id } = req.query;
  
  if (req.method === 'GET') {
    res.status(200).json({ id, name: 'John' });
  } else if (req.method === 'PUT') {
    res.status(200).json({ id, ...req.body });
  } else if (req.method === 'DELETE') {
    res.status(204).end();
  }
}

// ============================================
// NEXT.JS LINK AND ROUTING
// ============================================

import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navigation() {
  const router = useRouter();
  
  return (
    <nav>
      {/* Client-side navigation (no page reload) */}
      <Link href="/">
        <a>Home</a>
      </Link>
      
      <Link href="/about">
        <a>About</a>
      </Link>
      
      {/* Dynamic route */}
      <Link href="/blog/[id]" as="/blog/123">
        <a>Blog Post</a>
      </Link>
      
      {/* Programmatic navigation */}
      <button onClick={() => router.push('/about')}>
        Go to About
      </button>
      
      {/* With query params */}
      <Link href="/search?q=nextjs">
        <a>Search</a>
      </Link>
    </nav>
  );
}

// ============================================
// IMAGE OPTIMIZATION
// ============================================

import Image from 'next/image';

export default function ProductCard() {
  return (
    <div>
      {/* Automatic image optimization */}
      <Image
        src="/product.jpg"
        alt="Product"
        width={500}
        height={300}
        priority // Load immediately (above fold)
      />
      
      {/* Lazy loading by default */}
      <Image
        src="/product2.jpg"
        alt="Product 2"
        width={500}
        height={300}
        loading="lazy"
      />
      
      {/* External images */}
      <Image
        src="https://example.com/image.jpg"
        alt="External"
        width={500}
        height={300}
      />
    </div>
  );
}

// ============================================
// HEAD COMPONENT (SEO)
// ============================================

import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>My App</title>
        <meta name="description" content="App description" />
        <meta name="keywords" content="nextjs, react" />
        <meta property="og:title" content="My App" />
        <meta property="og:description" content="App description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div>
        <h1>Home Page</h1>
      </div>
    </>
  );
}

// ============================================
// ENVIRONMENT VARIABLES
// ============================================

// .env.local (local development)
// NEXT_PUBLIC_API_URL=http://localhost:3000
// API_SECRET_KEY=secret

// .env.production (production)
// NEXT_PUBLIC_API_URL=https://api.example.com
// API_SECRET_KEY=production-secret

// In code
export default function ApiCall() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL; // Available in browser
  const secretKey = process.env.API_SECRET_KEY; // Server-side only
  
  return <div>API URL: {apiUrl}</div>;
}

// ============================================
// CUSTOM APP COMPONENT
// ============================================

// pages/_app.js
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <Component {...pageProps} />
  );
}

// pages/_app.js (with layout)
import Layout from '../components/Layout';

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

// ============================================
// CUSTOM DOCUMENT
// ============================================

// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

// ============================================
// DATA FETCHING PATTERNS
// ============================================

// Client-side fetching
import { useState, useEffect } from 'react';

export default function ClientFetch() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => setData(data));
  }, []);
  
  if (!data) return <div>Loading...</div>;
  
  return <div>{JSON.stringify(data)}</div>;
}

// Server-side fetching (SSR)
export async function getServerSideProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  
  return {
    props: { data }
  };
}

// Static generation (SSG)
export async function getStaticProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  
  return {
    props: { data },
    revalidate: 60 // ISR
  };
}
```

---

## E) Internal Working

**Next.js Flow:**
1. Request arrives
2. Check if page exists (file-based routing)
3. Determine rendering method (SSR, SSG, ISR)
4. Fetch data (if needed)
5. Render page
6. Send HTML to client
7. Hydrate React on client

**Rendering Methods:**
- **SSR:** Render on each request (getServerSideProps)
- **SSG:** Generate at build time (getStaticProps)
- **ISR:** Regenerate periodically (revalidate)
- **CSR:** Client-side rendering (useEffect)

---

## F) Interview Questions & Answers

### Q1: What is Next.js and how is it different from React?

**Answer:**
Next.js is production-ready React framework. Differences: React is library (client-side), Next.js is framework (SSR, SSG, routing, optimizations). Next.js provides: Server-Side Rendering (SSR), Static Site Generation (SSG), File-based routing (automatic), API Routes (backend), Image optimization (automatic), Code splitting (automatic). React: Manual setup, client-side only, manual routing. Next.js: Built-in features, production-ready, better SEO.

### Q2: What is the difference between SSR, SSG, and ISR?

**Answer:**
SSR (Server-Side Rendering): Render on each request, use `getServerSideProps`, always fresh data, slower (render per request), good for dynamic content. SSG (Static Site Generation): Generate at build time, use `getStaticProps`, fastest (pre-rendered), good for static content, better SEO. ISR (Incremental Static Regeneration): Regenerate periodically, use `revalidate` in `getStaticProps`, best of both (fast + fresh), good for frequently changing content. Choose: SSR for real-time, SSG for static, ISR for frequently changing.

### Q3: How does file-based routing work in Next.js?

**Answer:**
File-based Routing: Files in `pages/` directory become routes automatically. `pages/index.js` → `/`, `pages/about.js` → `/about`, `pages/blog/[id].js` → `/blog/123` (dynamic), `pages/blog/[...slug].js` → `/blog/a/b/c` (catch-all), `pages/api/users.js` → `/api/users` (API route). Benefits: No routing config, automatic code splitting, clear structure. Dynamic routes: Use `[param]` for single, `[...param]` for catch-all.

### Q4: What are API Routes in Next.js?

**Answer:**
API Routes: Backend API endpoints in `pages/api/` directory. Each file exports default handler function `(req, res)`. Methods: Check `req.method` (GET, POST, PUT, DELETE). Example: `pages/api/users.js` → `/api/users`. Use for: Backend logic, database operations, external API calls, authentication. Benefits: Same codebase, no separate server, easy deployment. Limitations: Serverless functions, execution time limits.

### Q5: How do you handle data fetching in Next.js?

**Answer:**
Data Fetching Methods: SSR (`getServerSideProps` - each request), SSG (`getStaticProps` - build time), ISR (`getStaticProps` with `revalidate` - periodic), Client-side (`useEffect` - browser). SSR: Use for user-specific, real-time data. SSG: Use for static, public data. ISR: Use for frequently changing, public data. Client-side: Use for user interactions, private data. Choose based on: Data freshness needs, SEO requirements, performance.

### Q6: What is the difference between getStaticProps and getServerSideProps?

**Answer:**
getStaticProps: Runs at build time, generates static HTML, faster (pre-rendered), good for static content, can use `revalidate` for ISR, not for user-specific data. getServerSideProps: Runs on each request, generates HTML per request, slower (render per request), good for dynamic content, always fresh data, can access request context. Use getStaticProps for: Static pages, blog posts, product pages. Use getServerSideProps for: User dashboards, real-time data, authentication required.

### Q7: How does Next.js optimize images?

**Answer:**
Image Optimization: Automatic image optimization, lazy loading by default, responsive images (srcset), modern formats (WebP, AVIF), CDN delivery. Use `<Image>` component from `next/image`. Features: Automatic width/height, lazy loading, priority loading (above fold), placeholder blur, external images support. Benefits: Better performance, reduced bandwidth, better Core Web Vitals. Configuration: `next.config.js` for image domains, formats.

### Q8: What is getStaticPaths and when do you use it?

**Answer:**
getStaticPaths: Generate static paths for dynamic routes, used with `getStaticProps`, returns `paths` (array of params) and `fallback` (blocking, true, false). Use for: Dynamic routes with SSG (`pages/blog/[id].js`). Fallback: `false` (404 if not pre-rendered), `true` (generate on-demand), `blocking` (wait for generation). Example: Pre-render top 100 posts, generate others on-demand. Use when: Dynamic routes with SSG, know some paths at build time.

### Q9: How do you handle authentication in Next.js?

**Answer:**
Authentication: Use API routes for login/logout, store tokens (cookies, localStorage), protect pages (middleware, getServerSideProps), use libraries (NextAuth.js, Auth0). Pattern: Login API route → Set cookie/token → Check in `getServerSideProps` → Redirect if not authenticated. Example: Check `req.cookies.token` in `getServerSideProps`, redirect to login if missing. Libraries: NextAuth.js (popular), Auth0, Clerk. Best Practice: Server-side validation, secure cookies, CSRF protection.

### Q10: How do you deploy Next.js applications?

**Answer:**
Deployment: Vercel (recommended, zero config), Netlify, AWS, Docker. Vercel: Automatic deployments, preview deployments, edge functions, analytics. Process: Push to Git → Automatic build → Deploy. Environment variables: Set in Vercel dashboard. Build: `npm run build` creates `.next` folder. Static export: `next export` for static sites. Docker: Build image, run container. Best: Vercel for Next.js (optimized, easy).

---

## G) Common Mistakes

### Mistake 1: Using useEffect for Initial Data Fetching

```javascript
// ❌ WRONG - Client-side only, poor SEO
export default function Posts() {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);
  
  return <div>{posts.map(...)}</div>;
}

// ✅ CORRECT - Server-side rendering, better SEO
export async function getServerSideProps() {
  const res = await fetch('https://api.example.com/posts');
  const posts = await res.json();
  
  return {
    props: { posts }
  };
}

export default function Posts({ posts }) {
  return <div>{posts.map(...)}</div>;
}
```

**Why it breaks:** Poor SEO, slower initial load, no server-side rendering.

### Mistake 2: Not Using Next.js Image Component

```javascript
// ❌ WRONG - No optimization
<img src="/image.jpg" alt="Image" />

// ✅ CORRECT - Automatic optimization
import Image from 'next/image';

<Image src="/image.jpg" alt="Image" width={500} height={300} />
```

**Why it breaks:** Larger images, slower load, poor performance.

---

## H) When to Use & When NOT to Use

**Use Next.js When:**
- Need SSR/SSG for SEO
- Production React app
- Need built-in optimizations
- File-based routing preferred
- API routes needed

**Don't Use When:**
- Simple static site (use plain HTML)
- Learning React (use plain React first)
- Very specific requirements (custom setup)

---

## I) 2-Minute Interview Explanation

**Interviewer:** "What is Next.js and how does it work?"

**You:**
"Next.js is production-ready React framework. Key features: Server-Side Rendering (SSR - render on server, better SEO), Static Site Generation (SSG - generate at build time, fastest), Incremental Static Regeneration (ISR - regenerate periodically).

File-based routing: Files in `pages/` become routes automatically. Data fetching: `getServerSideProps` (SSR), `getStaticProps` (SSG), `getStaticPaths` (dynamic routes). API Routes: Backend in `pages/api/`. Image optimization: Automatic via `<Image>` component.

Benefits: Better SEO, faster performance, production-ready, less configuration. Use for production React apps needing SSR/SSG."

---

## J) Mini Practice Task

Create Next.js app: File-based routing (home, about, blog with dynamic routes), SSR for blog posts, API route for users, Image optimization, SEO with Head component.

---

**END OF TOPIC: NEXT.JS FUNDAMENTALS**
