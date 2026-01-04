# NODE.JS BUILT-IN MODULES

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Built-in Modules kya hain?**
- Node.js ke saath aane wale modules
- Install karne ki zarurat nahi
- Core functionality provide karte hain
- require() se directly use
- No npm install needed

**Main Built-in Modules:**
1. **fs (File System)** - File operations
2. **http/https** - HTTP server/client
3. **path** - Path operations
4. **os** - Operating system info
5. **crypto** - Cryptographic functions
6. **events** - Event handling
7. **stream** - Stream operations
8. **util** - Utility functions
9. **url** - URL parsing
10. **querystring** - Query string parsing

**Real-life Analogy:**
- Built-in modules = Factory ke tools
- Pre-installed = Ready to use
- No installation = Direct access
- Core features = Essential tools

---

## B) Easy English Theory

### What are Built-in Modules?

Built-in modules come with Node.js installation. No npm install needed, use with require(), provide core functionality. Main modules: fs (file system), http/https (HTTP operations), path (path handling), os (OS info), crypto (cryptography), events (event handling), stream (streams), util (utilities), url (URL parsing), querystring (query parsing). Use for: Core Node.js functionality, no external dependencies needed.

---

## C) Why This Concept Exists

### The Problem

**Without Built-in Modules:**
- Need external packages for basics
- More dependencies
- Installation overhead
- Version conflicts
- Core features missing

### The Solution

**Built-in Modules Provide:**
1. **Core Functionality:** Essential features
2. **No Installation:** Ready to use
3. **Reliability:** Well-tested
4. **Performance:** Optimized
5. **Standardization:** Consistent API

---

## D) Practical Example (Code)

```javascript
// ============================================
// FS (FILE SYSTEM) MODULE
// ============================================

const fs = require('fs');
const fsPromises = require('fs').promises;

// Read file (async)
fs.readFile('data.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

// Read file (sync)
const data = fs.readFileSync('data.txt', 'utf8');

// Read file (promises)
async function readFile() {
  try {
    const data = await fsPromises.readFile('data.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

// Write file
fs.writeFile('output.txt', 'Hello', (err) => {
  if (err) throw err;
});

// Append file
fs.appendFile('log.txt', 'New line\n', (err) => {
  if (err) throw err;
});

// ============================================
// HTTP MODULE
// ============================================

const http = require('http');

// Create server
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World');
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});

// HTTP request
const https = require('https');

https.get('https://api.example.com/data', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log(JSON.parse(data));
  });
});

// ============================================
// PATH MODULE
// ============================================

const path = require('path');

// Join paths
const filePath = path.join(__dirname, 'data', 'file.txt');

// Get directory name
const dir = path.dirname('/users/john/file.txt');
// '/users/john'

// Get file name
const filename = path.basename('/users/john/file.txt');
// 'file.txt'

// Get extension
const ext = path.extname('file.txt');
// '.txt'

// Parse path
const parsed = path.parse('/users/john/file.txt');
// { root: '/', dir: '/users/john', base: 'file.txt', ext: '.txt', name: 'file' }

// Resolve path
const resolved = path.resolve('data', 'file.txt');

// ============================================
// OS MODULE
// ============================================

const os = require('os');

// Platform
console.log('Platform:', os.platform());
console.log('OS Type:', os.type());

// CPU
console.log('CPU Architecture:', os.arch());
console.log('CPU Cores:', os.cpus().length);

// Memory
console.log('Total Memory:', os.totalmem());
console.log('Free Memory:', os.freemem());

// Home directory
console.log('Home Dir:', os.homedir());

// Temp directory
console.log('Temp Dir:', os.tmpdir());

// ============================================
// CRYPTO MODULE
// ============================================

const crypto = require('crypto');

// Hash
const hash = crypto.createHash('sha256');
hash.update('hello');
console.log(hash.digest('hex'));

// Random bytes
const random = crypto.randomBytes(16);
console.log(random.toString('hex'));

// Encryption
const cipher = crypto.createCipher('aes192', 'password');
let encrypted = cipher.update('secret', 'utf8', 'hex');
encrypted += cipher.final('hex');

// ============================================
// EVENTS MODULE
// ============================================

const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on('event', () => {
  console.log('Event occurred');
});

myEmitter.emit('event');

// ============================================
// STREAM MODULE
// ============================================

const fs = require('fs');
const { Readable, Writable, Transform } = require('stream');

// Read stream
const readStream = fs.createReadStream('input.txt');

// Write stream
const writeStream = fs.createWriteStream('output.txt');

// Pipe
readStream.pipe(writeStream);

// Transform stream
const transform = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  }
});

readStream.pipe(transform).pipe(writeStream);

// ============================================
// UTIL MODULE
// ============================================

const util = require('util');

// Promisify
const readFile = util.promisify(fs.readFile);

readFile('data.txt', 'utf8')
  .then(data => console.log(data))
  .catch(err => console.error(err));

// Inspect
console.log(util.inspect({ a: 1, b: 2 }, { depth: null }));

// Format
const message = util.format('%s is %d years old', 'John', 30);
console.log(message);

// ============================================
// URL MODULE
// ============================================

const url = require('url');

// Parse URL
const parsedUrl = url.parse('https://example.com/path?query=value');
console.log(parsedUrl.hostname); // 'example.com'
console.log(parsedUrl.pathname);  // '/path'
console.log(parsedUrl.query);     // 'query=value'

// URL object (new API)
const myUrl = new URL('https://example.com/path?query=value');
console.log(myUrl.hostname);
console.log(myUrl.searchParams.get('query'));

// ============================================
// QUERYSTRING MODULE
// ============================================

const querystring = require('querystring');

// Parse
const parsed = querystring.parse('name=John&age=30');
console.log(parsed); // { name: 'John', age: '30' }

// Stringify
const stringified = querystring.stringify({ name: 'John', age: 30 });
console.log(stringified); // 'name=John&age=30'

// ============================================
// PROCESS MODULE
// ============================================

// Environment variables
console.log(process.env.NODE_ENV);

// Command line arguments
console.log(process.argv);

// Current working directory
console.log(process.cwd());

// Exit process
process.exit(0);

// Memory usage
console.log(process.memoryUsage());

// ============================================
// BUFFER MODULE
// ============================================

// Create buffer
const buf = Buffer.from('Hello');
console.log(buf.toString());

// Buffer operations
const buf1 = Buffer.from('Hello');
const buf2 = Buffer.from(' World');
const combined = Buffer.concat([buf1, buf2]);
console.log(combined.toString());

// ============================================
// CLUSTER MODULE
// ============================================

const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  // Worker code
  http.createServer((req, res) => {
    res.end('Hello from worker');
  }).listen(3000);
}
```

---

## E) Internal Working

**Module Loading:**
1. **Require:** require('module-name')
2. **Resolution:** Node.js finds module
3. **Loading:** Loads module code
4. **Caching:** Caches module
5. **Return:** Returns exports

**Built-in vs External:**
- Built-in: Pre-installed, no npm needed
- External: Need npm install, in node_modules

---

## F) Interview Questions & Answers

### Q1: What are Node.js built-in modules?

**Answer:**
Built-in modules come with Node.js installation. No npm install needed, use with require(). Main modules: fs (file system), http/https (HTTP operations), path (path handling), os (OS info), crypto (cryptography), events (event handling), stream (streams), util (utilities), url (URL parsing), querystring (query parsing). Use for core Node.js functionality. Examples: require('fs'), require('http'), require('path').

### Q2: How do you use the fs module?

**Answer:**
fs module: File system operations. Use: require('fs'). Methods: readFile (async read), readFileSync (sync read), writeFile (write), appendFile (append), mkdir (create directory), unlink (delete file). Async: Callback-based or promises (fs.promises). Sync: Blocking operations. Example: fs.readFile('file.txt', 'utf8', callback). Use async for non-blocking, sync only when necessary.

### Q3: What is the difference between http and https modules?

**Answer:**
http module: HTTP protocol, unencrypted, require('http'), createServer() for HTTP server. https module: HTTPS protocol, encrypted (SSL/TLS), require('https'), createServer() with certificates, get() for HTTPS requests. Use http for: Development, internal networks. Use https for: Production, secure connections, public APIs. Key: https adds encryption layer over http.

---

## G) Common Mistakes

### Mistake 1: Using Sync Methods in Production

```javascript
// ❌ WRONG - Blocks event loop
const data = fs.readFileSync('large-file.txt');

// ✅ CORRECT - Non-blocking
fs.readFile('large-file.txt', 'utf8', (err, data) => {
  // Handle data
});
```

**Why it breaks:** Sync methods block event loop, can't handle other requests.

---

## H) When to Use & When NOT to Use

**Use Built-in Modules for:**
- Core functionality
- File operations
- HTTP servers
- Path operations
- System information
- Cryptography

**Don't use when:**
- Need advanced features
- Better alternatives available
- Need specific functionality

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain Node.js built-in modules."

**You:"
"Built-in modules come with Node.js, no npm install needed. Main modules: fs (file system), http/https (HTTP), path (paths), os (OS info), crypto (cryptography), events (events), stream (streams), util (utilities).

Use with require('module-name'). Provide core functionality. Examples: fs.readFile(), http.createServer(), path.join(). Key: Pre-installed, ready to use, core Node.js features."

---

## J) Mini Practice Task

Practice: Use fs module for file operations, create HTTP server, use path module, get OS information, use crypto for hashing, work with events, use streams, parse URLs.

---

**END OF TOPIC: BUILT-IN MODULES**

