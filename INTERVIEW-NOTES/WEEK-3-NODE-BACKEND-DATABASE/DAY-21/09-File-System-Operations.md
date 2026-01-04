# FILE SYSTEM OPERATIONS

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**File System Operations kya hain?**
- File System Operations files aur directories ke saath kaam karte hain
- Read, write, create, delete files
- Directory operations
- File metadata access
- Node.js `fs` module use karta hai

**Real-life Analogy:**
- File System = Filing cabinet
- Files = Documents
- Directories = Folders
- Operations = Read, write, organize

**Operation Types:**
- **Synchronous:** Blocking (wait for completion)
- **Asynchronous:** Non-blocking (callback/Promise)
- **Streams:** Large files ke liye

### File Operations

**Read Operations:**
- `readFile()` - Entire file read
- `readFileSync()` - Synchronous read
- `createReadStream()` - Stream read

**Write Operations:**
- `writeFile()` - Write file
- `writeFileSync()` - Synchronous write
- `createWriteStream()` - Stream write

**Directory Operations:**
- `mkdir()` - Create directory
- `readdir()` - List directory
- `rmdir()` - Remove directory

---

## B) Easy English Theory

### What are File System Operations?

File System Operations work with files and directories. Read, write, create, delete files. Access file metadata. Use Node.js `fs` module. Operations: Synchronous (blocking), Asynchronous (non-blocking with callbacks/Promises), Streams (for large files).

### Key Operations

**Read:** `readFile()`, `readFileSync()`, `createReadStream()`
**Write:** `writeFile()`, `writeFileSync()`, `createWriteStream()`
**Directories:** `mkdir()`, `readdir()`, `rmdir()`
**Metadata:** `stat()`, `access()`
**File Info:** `exists()`, `rename()`, `unlink()`

---

## C) Why This Concept Exists

### The Problem

**Without File Operations:**
- Can't read/write files
- No data persistence
- Limited functionality
- Can't manage files

### The Solution

**File System Operations Provide:**
1. **Persistence:** Save/load data
2. **File Management:** Create, delete, organize
3. **Data Access:** Read/write files
4. **Metadata:** File information

---

## D) Practical Example (Code)

```javascript
const fs = require('fs').promises;
const fsSync = require('fs');
const path = require('path');

// ============================================
// ASYNC FILE READ
// ============================================

// Promise-based
async function readFile() {
  try {
    const data = await fs.readFile('file.txt', 'utf8');
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Callback-based
fsSync.readFile('file.txt', 'utf8', (error, data) => {
  if (error) {
    console.error('Error:', error);
    return;
  }
  console.log(data);
});

// ============================================
// SYNC FILE READ
// ============================================

try {
  const data = fsSync.readFileSync('file.txt', 'utf8');
  console.log(data);
} catch (error) {
  console.error('Error:', error);
}

// ============================================
// ASYNC FILE WRITE
// ============================================

async function writeFile() {
  try {
    await fs.writeFile('output.txt', 'Hello World', 'utf8');
    console.log('File written');
  } catch (error) {
    console.error('Error:', error);
  }
}

// Append to file
async function appendFile() {
  try {
    await fs.appendFile('log.txt', 'New log entry\n', 'utf8');
  } catch (error) {
    console.error('Error:', error);
  }
}

// ============================================
// DIRECTORY OPERATIONS
// ============================================

// Create directory
async function createDirectory() {
  try {
    await fs.mkdir('new-folder', { recursive: true });
    console.log('Directory created');
  } catch (error) {
    console.error('Error:', error);
  }
}

// Read directory
async function readDirectory() {
  try {
    const files = await fs.readdir('./');
    console.log('Files:', files);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Remove directory
async function removeDirectory() {
  try {
    await fs.rmdir('folder', { recursive: true });
    console.log('Directory removed');
  } catch (error) {
    console.error('Error:', error);
  }
}

// ============================================
// FILE METADATA
// ============================================

async function getFileStats() {
  try {
    const stats = await fs.stat('file.txt');
    console.log('Size:', stats.size);
    console.log('Created:', stats.birthtime);
    console.log('Modified:', stats.mtime);
    console.log('Is file:', stats.isFile());
    console.log('Is directory:', stats.isDirectory());
  } catch (error) {
    console.error('Error:', error);
  }
}

// ============================================
// FILE EXISTS
// ============================================

async function checkFileExists() {
  try {
    await fs.access('file.txt');
    console.log('File exists');
  } catch (error) {
    console.log('File does not exist');
  }
}

// ============================================
// FILE OPERATIONS
// ============================================

// Rename file
async function renameFile() {
  try {
    await fs.rename('old.txt', 'new.txt');
    console.log('File renamed');
  } catch (error) {
    console.error('Error:', error);
  }
}

// Delete file
async function deleteFile() {
  try {
    await fs.unlink('file.txt');
    console.log('File deleted');
  } catch (error) {
    console.error('Error:', error);
  }
}

// Copy file
async function copyFile() {
  try {
    await fs.copyFile('source.txt', 'destination.txt');
    console.log('File copied');
  } catch (error) {
    console.error('Error:', error);
  }
}

// ============================================
// RECURSIVE DIRECTORY OPERATIONS
// ============================================

async function readDirectoryRecursive(dir) {
  try {
    const files = await fs.readdir(dir, { withFileTypes: true });
    
    for (const file of files) {
      const filePath = path.join(dir, file.name);
      
      if (file.isDirectory()) {
        await readDirectoryRecursive(filePath);
      } else {
        console.log('File:', filePath);
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// ============================================
// WATCH FILE CHANGES
// ============================================

const watcher = fsSync.watch('file.txt', (eventType, filename) => {
  console.log('Event:', eventType);
  console.log('File:', filename);
});

// Stop watching
// watcher.close();

// ============================================
// STREAM OPERATIONS (LARGE FILES)
// ============================================

// Read stream
const readStream = fsSync.createReadStream('large-file.txt', 'utf8');
readStream.on('data', (chunk) => {
  console.log('Chunk:', chunk);
});

// Write stream
const writeStream = fsSync.createWriteStream('output.txt');
writeStream.write('Hello ');
writeStream.write('World');
writeStream.end();

// Pipe
fsSync.createReadStream('input.txt')
  .pipe(fsSync.createWriteStream('output.txt'));

// ============================================
// PATH OPERATIONS
// ============================================

const filePath = path.join(__dirname, 'folder', 'file.txt');
console.log('Full path:', filePath);
console.log('Directory:', path.dirname(filePath));
console.log('Filename:', path.basename(filePath));
console.log('Extension:', path.extname(filePath));
console.log('Normalized:', path.normalize('/folder/../file.txt'));

// ============================================
// FILE PERMISSIONS
// ============================================

// Check permissions
async function checkPermissions() {
  try {
    await fs.access('file.txt', fsSync.constants.R_OK); // Read
    await fs.access('file.txt', fsSync.constants.W_OK); // Write
    await fs.access('file.txt', fsSync.constants.X_OK); // Execute
    console.log('Permissions OK');
  } catch (error) {
    console.log('No permission');
  }
}

// Change permissions
async function changePermissions() {
  try {
    await fs.chmod('file.txt', 0o755); // rwxr-xr-x
    console.log('Permissions changed');
  } catch (error) {
    console.error('Error:', error);
  }
}
```

---

## E) Internal Working

**File Operations:**
- System calls to OS
- Async: Non-blocking I/O
- Sync: Blocking I/O
- Streams: Chunk-based processing

**Error Handling:**
- Try-catch for async/await
- Callback error parameter
- Error codes and messages

---

## F) Interview Questions & Answers

### Q1: What are the differences between sync and async file operations?

**Answer:**
Sync operations (readFileSync, writeFileSync) are blocking - execution waits until operation completes. Async operations (readFile, writeFile) are non-blocking - execution continues, callback/Promise handles result. Use async for better performance and non-blocking behavior. Use sync only when blocking is acceptable or necessary.

### Q2: When would you use streams vs readFile?

**Answer:**
Use streams (createReadStream) for large files - memory efficient, process in chunks, handle backpressure. Use readFile for small files that fit in memory - simpler API, load entire file at once. Streams better for files > few MB, readFile for small files.

### Q3: How do you handle file operations errors?

**Answer:**
Handle errors with try-catch for async/await, error parameter in callbacks, check error codes. Common errors: File not found (ENOENT), permission denied (EACCES), directory not empty (ENOTEMPTY). Always handle errors - don't assume file exists or operations succeed.

---

## G) Common Mistakes

### Mistake 1: Using Sync Operations

```javascript
// ❌ WRONG - Blocking
const data = fs.readFileSync('file.txt');
// Blocks entire process

// ✅ CORRECT - Non-blocking
const data = await fs.readFile('file.txt');
```

**Why it breaks:** Sync operations block event loop, poor performance.

---

## H) When to Use & When NOT to Use

Use async operations for better performance. Use streams for large files. Use sync only when necessary. Always handle errors.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain File System Operations."

**You:**
"File System Operations work with files and directories using Node.js `fs` module. Operations: Read (readFile, createReadStream), Write (writeFile, createWriteStream), Directories (mkdir, readdir, rmdir), Metadata (stat, access). Sync operations block, async operations non-blocking. Use streams for large files (memory efficient), readFile for small files. Always handle errors. Use path module for path operations."

---

## J) Mini Practice Task

Build file manager: create directories, read/write files, list directory contents, handle errors, use streams for large files.

---

**END OF TOPIC: FILE SYSTEM OPERATIONS**

