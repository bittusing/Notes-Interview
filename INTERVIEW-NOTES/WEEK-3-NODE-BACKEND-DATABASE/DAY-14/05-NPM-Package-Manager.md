# NPM (NODE PACKAGE MANAGER)

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**NPM kya hai?**
- NPM = Node Package Manager
- JavaScript packages ka manager
- World's largest package registry
- Dependency management
- Script execution tool

**Real-life Analogy:**
- NPM = App Store
- Packages = Apps
- package.json = Shopping list
- node_modules = Installed apps
- npm install = Download apps

**NPM Features:**
- Package installation
- Dependency management
- Script execution
- Version management
- Registry access

**NPM Components:**
- **npm CLI:** Command-line tool
- **npm registry:** Package repository
- **package.json:** Project configuration
- **node_modules:** Installed packages
- **package-lock.json:** Lock file

---

## B) Easy English Theory

### What is NPM?

NPM (Node Package Manager) is package manager for JavaScript. World's largest package registry, manages dependencies, executes scripts, handles versions. Components: npm CLI (command-line tool), npm registry (package repository), package.json (project config), node_modules (installed packages), package-lock.json (version lock). Features: Install packages, manage dependencies, run scripts, publish packages, version control.

---

## C) Why This Concept Exists

### The Problem

**Without NPM:**
- Manual dependency management
- No code reuse
- Difficult package sharing
- Version conflicts
- No centralized registry

### The Solution

**NPM Provides:**
1. **Package Management:** Easy installation
2. **Dependency Resolution:** Automatic handling
3. **Version Control:** Semantic versioning
4. **Registry:** Centralized repository
5. **Scripts:** Automation tools

---

## D) Practical Example (Code)

```javascript
// ============================================
// PACKAGE.JSON
// ============================================

{
  "name": "my-app",
  "version": "1.0.0",
  "description": "My application",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest",
    "build": "webpack"
  },
  "keywords": ["nodejs", "express"],
  "author": "Your Name",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.0",
    "mongoose": "^6.0.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.0",
    "jest": "^28.0.0"
  },
  "engines": {
    "node": ">=14.0.0",
    "npm": ">=6.0.0"
  }
}

// ============================================
// NPM COMMANDS
// ============================================

// Install package
// npm install express
// npm i express

// Install as dev dependency
// npm install --save-dev nodemon
// npm install -D nodemon

// Install globally
// npm install -g nodemon
// npm install -g express-generator

// Install specific version
// npm install express@4.17.1

// Install latest version
// npm install express@latest

// Install from package.json
// npm install

// ============================================
// PACKAGE VERSIONING
// ============================================

// Semantic Versioning: MAJOR.MINOR.PATCH
// 4.18.0

// Version ranges
"express": "^4.18.0"  // Compatible with 4.x.x (caret)
"express": "~4.18.0"  // Compatible with 4.18.x (tilde)
"express": "4.18.0"   // Exact version
"express": "*"        // Any version
"express": ">=4.18.0" // Greater than or equal

// ============================================
// NPM SCRIPTS
// ============================================

// package.json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest",
    "test:watch": "jest --watch",
    "build": "webpack --mode production",
    "lint": "eslint .",
    "prestart": "echo 'Starting...'",
    "poststart": "echo 'Started!'"
  }
}

// Run scripts
// npm start
// npm run dev
// npm test
// npm run build

// ============================================
// NPM INIT
// ============================================

// Create package.json
// npm init

// Quick init (defaults)
// npm init -y

// ============================================
// NPM UPDATE
// ============================================

// Update all packages
// npm update

// Update specific package
// npm update express

// Check outdated packages
// npm outdated

// ============================================
// NPM UNINSTALL
// ============================================

// Uninstall package
// npm uninstall express
// npm remove express
// npm rm express

// Uninstall dev dependency
// npm uninstall -D nodemon

// ============================================
// NPM LIST
// ============================================

// List installed packages
// npm list

// List only top-level
// npm list --depth=0

// List specific package
// npm list express

// ============================================
// NPM SEARCH
// ============================================

// Search packages
// npm search express

// View package info
// npm view express
// npm info express

// View package versions
// npm view express versions

// ============================================
// NPM PUBLISH
// ============================================

// Login to npm
// npm login

// Publish package
// npm publish

// Publish with scope
// npm publish --access public

// Unpublish (within 72 hours)
// npm unpublish package-name

// ============================================
// NPM CONFIG
// ============================================

// View config
// npm config list

// Set config
// npm config set registry https://registry.npmjs.org/

// Get config
// npm config get registry

// Edit config
// npm config edit

// ============================================
// PACKAGE-LOCK.JSON
// ============================================

// Lock file ensures consistent installs
// Generated automatically
// Should be committed to git
// Ensures same versions across environments

// ============================================
// NPM INSTALL OPTIONS
// ============================================

// Install and save to package.json
// npm install express --save
// npm install express -S

// Install dev dependency
// npm install nodemon --save-dev
// npm install nodemon -D

// Install globally
// npm install express -g
// npm install express --global

// Install from git
// npm install git+https://github.com/user/repo.git

// Install from tarball
// npm install ./package.tgz

// ============================================
// NPM AUDIT
// ============================================

// Check for vulnerabilities
// npm audit

// Fix vulnerabilities
// npm audit fix

// Fix automatically
// npm audit fix --force

// ============================================
// NPM CACHE
// ============================================

// Clear cache
// npm cache clean --force

// Verify cache
// npm cache verify

// ============================================
// NPM SCOPED PACKAGES
// ============================================

// Scoped packages
// @scope/package-name

// Install scoped package
// npm install @types/node
// npm install @babel/core

// Publish scoped package
// npm publish --access public
```

---

## E) Internal Working

**NPM Process:**
1. **Command:** npm install package
2. **Registry:** Query npm registry
3. **Resolution:** Resolve dependencies
4. **Download:** Download packages
5. **Install:** Extract to node_modules
6. **Update:** Update package.json/lock

**Dependency Resolution:**
- Check package.json
- Resolve dependency tree
- Handle version conflicts
- Install compatible versions
- Update lock file

---

## F) Interview Questions & Answers

### Q1: What is NPM and how does it work?

**Answer:**
NPM (Node Package Manager) is package manager for JavaScript. World's largest package registry. Works by: npm CLI sends commands, queries npm registry for packages, resolves dependencies automatically, downloads and installs packages to node_modules, updates package.json and package-lock.json. Components: npm CLI, npm registry, package.json, node_modules, package-lock.json. Features: Install packages, manage dependencies, run scripts, publish packages.

### Q2: What is the difference between dependencies and devDependencies?

**Answer:**
dependencies: Packages needed in production, installed in production, included in final build. devDependencies: Packages needed only in development, not installed in production, used for testing, building, linting. Examples: dependencies (express, mongoose), devDependencies (jest, nodemon, webpack). Install: npm install --save (dependencies), npm install --save-dev (devDependencies). Key: dependencies for runtime, devDependencies for development tools.

### Q3: What is package-lock.json and why is it important?

**Answer:**
package-lock.json: Lock file that locks exact versions of all dependencies, generated automatically, should be committed to git. Importance: Ensures consistent installs across environments, prevents version conflicts, faster installs (exact versions), reproducible builds, dependency tree information. Difference: package.json has version ranges (^, ~), package-lock.json has exact versions. Key: Lock file ensures everyone gets same versions.

---

## G) Common Mistakes

### Mistake 1: Not Committing package-lock.json

```bash
# ❌ WRONG - Don't ignore lock file
# .gitignore
node_modules/
package-lock.json  # Don't do this!

# ✅ CORRECT - Commit lock file
# .gitignore
node_modules/
# package-lock.json should be committed
```

**Why it breaks:** Without lock file, different versions installed, causes bugs.

---

## H) When to Use & When NOT to Use

**Use NPM for:**
- JavaScript/Node.js projects
- Package management
- Dependency management
- Script execution
- Publishing packages

**Don't use for:**
- Non-JavaScript projects
- When need different package manager
- When prefer yarn/pnpm

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain NPM."

**You:"
"NPM (Node Package Manager) is package manager for JavaScript. World's largest package registry. Components: npm CLI, npm registry, package.json, node_modules, package-lock.json.

Features: Install packages (npm install), manage dependencies, run scripts (npm run), publish packages. Commands: install, update, uninstall, list, search, publish. package-lock.json ensures consistent installs. Key: Manages JavaScript packages and dependencies."

---

## J) Mini Practice Task

Practice: Create package.json, install packages, use npm scripts, understand dependencies vs devDependencies, work with package-lock.json, publish packages, use npm commands.

---

**END OF TOPIC: NPM**

