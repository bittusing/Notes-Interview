# STREAMS & BUFFERS

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Streams kya hain?**
- Streams data ko chunks mein process karte hain
- Large data ko memory-efficient handle karta hai
- Data flow ka abstraction
- Readable, Writable, Duplex, Transform streams
- Node.js mein core concept

**Buffers kya hain?**
- Buffers binary data store karte hain
- Raw memory allocation
- Array-like structure
- Fixed size
- Binary data ke liye perfect

**Real-life Analogy:**
- Streams = Water pipe (continuous flow)
- Buffers = Bucket (temporary storage)
- Chunks = Small amounts at a time
- Memory efficient = Don't load everything

### Stream Types

**1. Readable Stream:**
- Data read karta hai
- Examples: File read, HTTP request
- `data` event se data receive

**2. Writable Stream:**
- Data write karta hai
- Examples: File write, HTTP response
- `write()` method se data send

**3. Duplex Stream:**
- Read + Write dono
- Examples: TCP socket
- Bidirectional

**4. Transform Stream:**
- Read + Write + Transform
- Examples: Compression, encryption
- Data modify karta hai

### Buffer Operations

**Buffer Creation:**
- `Buffer.alloc()` - Fixed size
- `Buffer.from()` - From string/array
- `Buffer.allocUnsafe()` - Fast but unsafe

**Buffer Methods:**
- `toString()` - Convert to string
- `slice()` - Extract portion
- `copy()` - Copy to another buffer

---

## B) Easy English Theory

### What are Streams?

Streams process data in chunks instead of loading everything into memory. Types: Readable (read data), Writable (write data), Duplex (read + write), Transform (read + write + transform). Benefits: Memory efficient, can process large files, backpressure handling. Use for file operations, network I/O, data processing.

### What are Buffers?

Buffers store binary data in raw memory. Fixed-size, array-like structure. Use for binary data, file operations, network protocols. Methods: `toString()`, `slice()`, `copy()`. Created with `Buffer.alloc()`, `Buffer.from()`, `Buffer.allocUnsafe()`.

---

## C) Why This Concept Exists

### The Problem

**Without Streams:**
- Load entire file in memory
- Memory issues with large files
- Blocking operations
- Poor performance

### The Solution

**Streams Provide:**
1. **Memory Efficiency:** Process in chunks
2. **Performance:** Non-blocking
3. **Scalability:** Handle large data
4. **Backpressure:** Flow control

---

## D) Practical Example (Code)

```javascript
const fs = require('fs');
const { Readable, Writable, Transform, pipeline } = require('stream');

// ============================================
// READABLE STREAM
// ============================================

// File read stream
const readStream = fs.createReadStream('large-file.txt', {
  encoding: 'utf8',
  highWaterMark: 64 * 1024 // 64KB chunks
});

readStream.on('data', (chunk) => {
  console.log('Received chunk:', chunk.length);
  // Process chunk
});

readStream.on('end', () => {
  console.log('File read complete');
});

readStream.on('error', (error) => {
  console.error('Error:', error);
});

// ============================================
// WRITABLE STREAM
// ============================================

const writeStream = fs.createWriteStream('output.txt');

writeStream.write('Hello ');
writeStream.write('World');
writeStream.end();

writeStream.on('finish', () => {
  console.log('Write complete');
});

// ============================================
// PIPING STREAMS
// ============================================

// Pipe readable to writable
fs.createReadStream('input.txt')
  .pipe(fs.createWriteStream('output.txt'));

// ============================================
// TRANSFORM STREAM
// ============================================

const upperCaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    // Transform data
    const upperChunk = chunk.toString().toUpperCase();
    callback(null, upperChunk);
  }
});

fs.createReadStream('input.txt')
  .pipe(upperCaseTransform)
  .pipe(fs.createWriteStream('output.txt'));

// ============================================
// CUSTOM READABLE STREAM
// ============================================

class NumberStream extends Readable {
  constructor(max) {
    super();
    this.max = max;
    this.current = 0;
  }
  
  _read() {
    if (this.current < this.max) {
      this.push(String(this.current++));
    } else {
      this.push(null); // End stream
    }
  }
}

const numbers = new NumberStream(10);
numbers.on('data', (chunk) => {
  console.log('Number:', chunk.toString());
});

// ============================================
// CUSTOM WRITABLE STREAM
// ============================================

class LoggerStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log('Log:', chunk.toString());
    callback(); // Signal completion
  }
}

const logger = new LoggerStream();
logger.write('Hello');
logger.write('World');
logger.end();

// ============================================
// DUPLEX STREAM
// ============================================

const { Duplex } = require('stream');

class EchoStream extends Duplex {
  _read() {
    // Read implementation
  }
  
  _write(chunk, encoding, callback) {
    // Echo back
    this.push(chunk);
    callback();
  }
}

// ============================================
// BUFFERS
// ============================================

// Create buffer
const buf1 = Buffer.alloc(10); // 10 bytes, filled with zeros
const buf2 = Buffer.from('Hello'); // From string
const buf3 = Buffer.from([1, 2, 3, 4, 5]); // From array

// Buffer operations
const buf = Buffer.from('Hello World');
console.log(buf.toString()); // 'Hello World'
console.log(buf.toString('base64')); // Base64 encoding
console.log(buf.length); // 11

// Buffer slice
const slice = buf.slice(0, 5); // 'Hello'

// Buffer copy
const buf4 = Buffer.alloc(5);
buf.copy(buf4, 0, 0, 5); // Copy first 5 bytes

// Buffer comparison
const buf5 = Buffer.from('Hello');
const buf6 = Buffer.from('Hello');
console.log(buf5.equals(buf6)); // true

// ============================================
// STREAM WITH BUFFERS
// ============================================

const readStream = fs.createReadStream('file.txt');

readStream.on('data', (chunk) => {
  // chunk is Buffer
  console.log('Chunk size:', chunk.length);
  console.log('Chunk data:', chunk.toString());
});

// ============================================
// BACKPRESSURE HANDLING
// ============================================

const readStream = fs.createReadStream('large-file.txt');
const writeStream = fs.createWriteStream('output.txt');

// Handle backpressure
readStream.on('data', (chunk) => {
  const canContinue = writeStream.write(chunk);
  
  if (!canContinue) {
    // Pause reading if write buffer full
    readStream.pause();
    
    writeStream.once('drain', () => {
      // Resume reading when buffer drained
      readStream.resume();
    });
  }
});

// ============================================
// PIPELINE (ERROR HANDLING)
// ============================================

pipeline(
  fs.createReadStream('input.txt'),
  upperCaseTransform,
  fs.createWriteStream('output.txt'),
  (error) => {
    if (error) {
      console.error('Pipeline error:', error);
    } else {
      console.log('Pipeline complete');
    }
  }
);

// ============================================
// HTTP STREAMING
// ============================================

const http = require('http');

http.createServer((req, res) => {
  // Stream file to response
  const fileStream = fs.createReadStream('large-file.txt');
  fileStream.pipe(res);
}).listen(3000);

// ============================================
// COMPRESSION STREAM
// ============================================

const zlib = require('zlib');

fs.createReadStream('input.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('output.txt.gz'));

// Decompress
fs.createReadStream('output.txt.gz')
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream('decompressed.txt'));
```

---

## E) Internal Working

**Streams:**
- Data processed in chunks
- Event-driven (data, end, error)
- Backpressure handling
- Memory efficient

**Buffers:**
- Raw memory allocation
- Fixed size
- Binary data storage
- Array-like operations

---

## F) Interview Questions & Answers

### Q1: What are Streams in Node.js?

**Answer:**
Streams process data in chunks instead of loading everything into memory. Types: Readable (read data - file read, HTTP request), Writable (write data - file write, HTTP response), Duplex (read + write - TCP socket), Transform (read + write + transform - compression). Benefits: Memory efficient, handle large files, backpressure handling. Use `pipe()` to connect streams.

### Q2: What are Buffers and when would you use them?

**Answer:**
Buffers store binary data in raw memory. Fixed-size, array-like structure. Created with `Buffer.alloc()`, `Buffer.from()`, `Buffer.allocUnsafe()`. Use for binary data, file operations, network protocols, image processing. Methods: `toString()`, `slice()`, `copy()`, `equals()`. Streams work with buffers - chunks are buffers.

### Q3: How does backpressure work in streams?

**Answer:**
Backpressure is flow control when writable stream can't keep up. When `write()` returns false, readable stream should pause. When writable stream's buffer drains (drain event), readable stream resumes. Prevents memory issues. `pipe()` handles backpressure automatically. Manual handling: check `write()` return value, pause/resume accordingly.

---

## G) Common Mistakes

### Mistake 1: Loading Entire File

```javascript
// ❌ WRONG - Load entire file
const data = fs.readFileSync('large-file.txt');
// Memory issue with large files

// ✅ CORRECT - Use streams
fs.createReadStream('large-file.txt')
  .pipe(process.stdout);
```

**Why it breaks:** Large files cause memory issues.

---

## H) When to Use & When NOT to Use

Use streams for large files, network I/O, data processing, memory efficiency. Use buffers for binary data, file operations. Don't use streams for small data that fits in memory.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain Streams and Buffers."

**You:**
"Streams process data in chunks - memory efficient for large data. Types: Readable (read), Writable (write), Duplex (read + write), Transform (read + write + transform). Use `pipe()` to connect streams. Backpressure handles flow control. Buffers store binary data in raw memory - fixed size, array-like. Use for binary data, file operations. Streams work with buffers - chunks are buffers. Benefits: Memory efficiency, handle large files, non-blocking."

---

## J) Mini Practice Task

Create file processing pipeline: read file, transform data, compress, write to output. Handle errors and backpressure.

---

**END OF TOPIC: STREAMS & BUFFERS**

