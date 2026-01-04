# DOCKER FUNDAMENTALS

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Docker kya hai?**
- Docker containerization platform hai
- Applications ko containers mein package karta hai
- "Works on my machine" problem solve karta hai
- Lightweight virtualization
- Consistent environment provide karta hai

**Real-life Analogy:**
- Docker = Shipping container
- Container = Standardized box (sab jagah same)
- Application = Goods (container mein)
- Dockerfile = Blueprint (kaise container banaye)
- Image = Template (container ka template)

**Docker Components:**
- **Dockerfile:** Container build instructions
- **Image:** Read-only template
- **Container:** Running instance of image
- **Docker Hub:** Image repository
- **Docker Engine:** Runtime environment

**Docker Benefits:**
- **Consistency:** Same environment everywhere
- **Isolation:** Applications separate
- **Portability:** Run anywhere
- **Efficiency:** Lightweight, fast
- **Scalability:** Easy to scale

---

## B) Easy English Theory

### What is Docker?

Docker is containerization platform that packages applications into containers. Components: Dockerfile (build instructions), Image (read-only template), Container (running instance), Docker Hub (image repository), Docker Engine (runtime). Benefits: Consistency (same environment), Isolation (separate applications), Portability (run anywhere), Efficiency (lightweight), Scalability (easy scaling). Solves "works on my machine" problem.

---

## C) Why This Concept Exists

### The Problem

**Without Docker:**
- "Works on my machine" problem
- Environment inconsistencies
- Difficult deployment
- Heavy virtual machines
- Dependency conflicts

### The Solution

**Docker Provides:**
1. **Consistency:** Same environment everywhere
2. **Isolation:** No dependency conflicts
3. **Portability:** Run on any platform
4. **Efficiency:** Lightweight containers
5. **Easy Deployment:** Simple container deployment

---

## D) Practical Example (Code)

```dockerfile
# ============================================
# DOCKERFILE EXAMPLE
# ============================================

# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy application code
COPY . .

# Expose port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js

# Run application
CMD ["node", "server.js"]

# ============================================
# MULTI-STAGE BUILD
# ============================================

# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
EXPOSE 3000
CMD ["node", "dist/server.js"]

# ============================================
# DOCKERFILE BEST PRACTICES
# ============================================

# Use specific version tags
FROM node:18.17.0-alpine

# Use .dockerignore
# node_modules
# .git
# .env
# dist

# Order matters - cache layers
COPY package*.json ./  # Dependencies first
RUN npm install
COPY . .               # Code last

# Use non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001
USER nodejs

# Minimize layers
RUN npm install && \
    npm cache clean --force

# Use health checks
HEALTHCHECK --interval=30s CMD curl -f http://localhost:3000/health || exit 1
```

```javascript
// ============================================
// DOCKER COMMANDS
// ============================================

/*
# Build image
docker build -t myapp:latest .

# Build with tag
docker build -t myapp:v1.0.0 .

# Run container
docker run -d -p 3000:3000 --name myapp myapp:latest

# Run with environment variables
docker run -d -p 3000:3000 \
  -e NODE_ENV=production \
  -e DATABASE_URL=postgres://... \
  --name myapp myapp:latest

# Run with volume
docker run -d -p 3000:3000 \
  -v /host/path:/container/path \
  --name myapp myapp:latest

# List containers
docker ps              # Running
docker ps -a           # All

# List images
docker images

# Stop container
docker stop myapp

# Start container
docker start myapp

# Remove container
docker rm myapp

# Remove image
docker rmi myapp:latest

# View logs
docker logs myapp
docker logs -f myapp   # Follow

# Execute command in container
docker exec -it myapp sh
docker exec myapp node --version

# Inspect container
docker inspect myapp

# Copy files
docker cp myapp:/app/file.txt ./file.txt
docker cp ./file.txt myapp:/app/file.txt

# Docker Compose
docker-compose up -d
docker-compose down
docker-compose logs -f
*/

// ============================================
// DOCKER COMPOSE EXAMPLE
// ============================================

// docker-compose.yml
const dockerCompose = `
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgres://postgres:password@db:5432/mydb
    depends_on:
      - db
      - redis
    volumes:
      - ./logs:/app/logs
    networks:
      - app-network

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=mydb
    volumes:
      - postgres-data:/var/lib/postgresql/data
    networks:
      - app-network

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    networks:
      - app-network

volumes:
  postgres-data:

networks:
  app-network:
    driver: bridge
`;

// ============================================
// DOCKER NETWORKING
// ============================================

/*
# Create network
docker network create my-network

# Connect container to network
docker run --network my-network myapp

# Inspect network
docker network inspect my-network

# Bridge network (default)
# Host network (Linux only)
# None network (no networking)
*/

// ============================================
// DOCKER VOLUMES
// ============================================

/*
# Create volume
docker volume create my-volume

# Use volume
docker run -v my-volume:/data myapp

# Bind mount
docker run -v /host/path:/container/path myapp

# Named volume (recommended)
docker run -v my-volume:/app/data myapp

# List volumes
docker volume ls

# Inspect volume
docker volume inspect my-volume

# Remove volume
docker volume rm my-volume
*/

// ============================================
// DOCKER HEALTH CHECKS
// ============================================

// healthcheck.js
const healthCheck = `
const http = require('http');

const options = {
  host: 'localhost',
  port: 3000,
  path: '/health',
  timeout: 2000
};

const request = http.request(options, (res) => {
  console.log(\`Health check status: \${res.statusCode}\`);
  process.exit(res.statusCode === 200 ? 0 : 1);
});

request.on('error', (err) => {
  console.error('Health check failed:', err);
  process.exit(1);
});

request.end();
`;

// ============================================
// DOCKERFILE OPTIMIZATION
// ============================================

// Optimized Dockerfile
const optimizedDockerfile = `
# Use multi-stage build
FROM node:18-alpine AS dependencies
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app

# Copy only production dependencies
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app
USER nodejs

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s CMD node healthcheck.js
CMD ["node", "dist/server.js"]
`;

// ============================================
// .dockerignore FILE
// ============================================

const dockerignore = `
node_modules
npm-debug.log
.git
.gitignore
.env
.env.local
.DS_Store
dist
coverage
.nyc_output
*.log
.vscode
.idea
`;
```

---

## E) Internal Working

**Docker Architecture:**
- **Docker Daemon:** Background service
- **Docker Client:** CLI interface
- **Docker Images:** Read-only templates
- **Docker Containers:** Running instances
- **Docker Registry:** Image storage

**Container Lifecycle:**
1. Build image from Dockerfile
2. Create container from image
3. Start container
4. Run application
5. Stop/Remove container

---

## F) Interview Questions & Answers

### Q1: What is Docker and how does it work?

**Answer:**
Docker is containerization platform that packages applications into containers. Components: Dockerfile (build instructions), Image (read-only template), Container (running instance). Process: Write Dockerfile, build image, run container from image. Benefits: Consistency (same environment), Isolation (separate applications), Portability (run anywhere), Efficiency (lightweight). Uses OS-level virtualization, shares host OS kernel, more efficient than VMs.

### Q2: What is the difference between Docker image and container?

**Answer:**
Docker Image: Read-only template with application code, dependencies, configuration. Created from Dockerfile, stored in registry. Docker Container: Running instance of image, writable layer on top of image, isolated environment. Relationship: Image is blueprint, container is running instance. Multiple containers can run from same image. Containers are ephemeral, images are persistent.

### Q3: What is Docker Compose and when would you use it?

**Answer:**
Docker Compose orchestrates multi-container applications using YAML file. Defines services, networks, volumes. Use when: Multiple containers needed (app + database + cache), need to manage dependencies, want simple orchestration (not Kubernetes). Commands: docker-compose up (start), docker-compose down (stop), docker-compose logs (view logs). Good for development and small deployments.

---

## G) Common Mistakes

### Mistake 1: Not Using .dockerignore

```dockerfile
# ❌ WRONG - Copies everything
COPY . .
# Includes node_modules, .git, etc. (slow, large image)

# ✅ CORRECT - Use .dockerignore
# .dockerignore file:
# node_modules
# .git
# .env
COPY . .
```

**Why it breaks:** Large images, slow builds, security issues (exposes secrets).

---

## H) When to Use & When NOT to Use

Use Docker for: Consistent environments, microservices, CI/CD pipelines, development environments, easy deployment. Don't use when: Simple applications don't need containerization, when overhead not justified, when need full VM isolation.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain Docker."

**You:**
"Docker is containerization platform. Packages applications into containers with all dependencies. Components: Dockerfile (build instructions), Image (template), Container (running instance).

Benefits: Consistency (same environment everywhere), Isolation, Portability, Efficiency (lightweight). Process: Write Dockerfile, build image, run container. Uses OS-level virtualization, shares host kernel. More efficient than VMs. Use for microservices, CI/CD, consistent deployments."

---

## J) Mini Practice Task

Practice: Write Dockerfile, build images, run containers, use Docker Compose, create volumes, set up networking, optimize Dockerfiles, implement health checks.

---

**END OF TOPIC: DOCKER FUNDAMENTALS**

