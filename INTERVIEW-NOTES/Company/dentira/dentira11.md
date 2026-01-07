# DENTIRA INTERVIEW PREPARATION - PART 11
## MERN Stack, Docker & Kubernetes

--------------------------------

## A) MERN Stack Overview

### Zero se Start Karte Hain

**MERN Stack kya hai?**
- **M**ongoDB - NoSQL database
- **E**xpress.js - Node.js web framework
- **R**eact - Frontend library
- **N**ode.js - JavaScript runtime

**Full-Stack JavaScript:**
- Same language (JavaScript/TypeScript)
- Code reuse
- Faster development
- Popular stack

**Architecture:**
```
React (Frontend)
    ↓ HTTP/REST
Express.js (Backend API)
    ↓
MongoDB (Database)
```

### MERN Stack Benefits

**1. Single Language:**
- JavaScript/TypeScript everywhere
- Code sharing
- Team efficiency

**2. Rapid Development:**
- Fast prototyping
- Large ecosystem
- Good documentation

**3. Scalability:**
- Microservices ready
- Horizontal scaling
- Cloud deployment

---

## B) Docker Fundamentals

### Zero se Start Karte Hain

**Docker kya hai?**
- Containerization platform
- Package application with dependencies
- Consistent environments
- Isolation from host

**Real-life Analogy:**
- Docker = Shipping container
- Application = Goods
- Container = Standardized container
- Ship = Server
- Same container works everywhere

**Key Concepts:**
- **Image:** Template for containers
- **Container:** Running instance of image
- **Dockerfile:** Instructions to build image
- **Docker Compose:** Multi-container applications

### Dockerfile

**Basic Dockerfile:**
```dockerfile
# Base image
FROM node:18-alpine

# Working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Expose port
EXPOSE 3000

# Start application
CMD ["node", "server.js"]
```

**Optimized Dockerfile:**
```dockerfile
# Multi-stage build
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production image
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/server.js"]
```

### Docker Commands

**Basic Commands:**
```bash
# Build image
docker build -t my-app:latest .

# Run container
docker run -p 3000:3000 my-app:latest

# List containers
docker ps

# Stop container
docker stop <container-id>

# View logs
docker logs <container-id>

# Execute command in container
docker exec -it <container-id> sh
```

**Docker Compose:**
```yaml
version: '3.8'

services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DB_HOST=mongodb
    depends_on:
      - mongodb

  mongodb:
    image: mongo:6
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
```

---

## C) Kubernetes Fundamentals

### Zero se Start Karte Hain

**Kubernetes kya hai?**
- Container orchestration platform
- Manage containers at scale
- Auto-scaling
- Load balancing
- Self-healing

**Real-life Analogy:**
- Kubernetes = Orchestra conductor
- Containers = Musicians
- Pods = Groups of musicians
- Services = Performance coordination
- Auto-scaling = Adding musicians as needed

**Key Concepts:**
- **Pod:** Smallest deployable unit (one or more containers)
- **Service:** Network access to pods
- **Deployment:** Manages pod replicas
- **Namespace:** Virtual cluster
- **ConfigMap:** Configuration data
- **Secret:** Sensitive data

### Kubernetes Objects

**1. Pod:**
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-app
spec:
  containers:
  - name: app
    image: my-app:latest
    ports:
    - containerPort: 3000
```

**2. Deployment:**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: app
        image: my-app:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
```

**3. Service:**
```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-app-service
spec:
  selector:
    app: my-app
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3000
  type: LoadBalancer
```

**4. ConfigMap:**
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  NODE_ENV: "production"
  DB_HOST: "mongodb-service"
```

**5. Secret:**
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: app-secret
type: Opaque
data:
  DB_PASSWORD: <base64-encoded-password>
```

### Kubernetes Commands

```bash
# Apply configuration
kubectl apply -f deployment.yaml

# Get pods
kubectl get pods

# Get services
kubectl get services

# Describe pod
kubectl describe pod <pod-name>

# View logs
kubectl logs <pod-name>

# Scale deployment
kubectl scale deployment my-app --replicas=5

# Port forward
kubectl port-forward <pod-name> 3000:3000
```

---

## D) Docker & Kubernetes Best Practices

### Docker Best Practices

**1. Use .dockerignore:**
```
node_modules
npm-debug.log
.git
.env
dist
```

**2. Multi-stage Builds:**
- Smaller final image
- Separate build and runtime
- Security benefits

**3. Layer Caching:**
```dockerfile
# Copy package files first (changes less frequently)
COPY package*.json ./
RUN npm ci

# Copy code last (changes frequently)
COPY . .
```

**4. Non-root User:**
```dockerfile
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001
USER nodejs
```

**5. Health Checks:**
```dockerfile
HEALTHCHECK --interval=30s --timeout=3s \
  CMD node healthcheck.js
```

### Kubernetes Best Practices

**1. Resource Limits:**
```yaml
resources:
  requests:
    memory: "256Mi"
    cpu: "250m"
  limits:
    memory: "512Mi"
    cpu: "500m"
```

**2. Liveness & Readiness Probes:**
```yaml
livenessProbe:
  httpGet:
    path: /health
    port: 3000
  initialDelaySeconds: 30
  periodSeconds: 10

readinessProbe:
  httpGet:
    path: /ready
    port: 3000
  initialDelaySeconds: 5
  periodSeconds: 5
```

**3. Rolling Updates:**
```yaml
strategy:
  type: RollingUpdate
  rollingUpdate:
    maxSurge: 1
    maxUnavailable: 0
```

**4. Horizontal Pod Autoscaler:**
```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: my-app-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: my-app
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
```

---

## E) Interview Questions - Part 11

**Q1: "What is Docker and why use it?"**

✅ **Answer:**
"Docker is a containerization platform that packages applications with all dependencies into containers.

**Benefits:**
- **Consistency:** Same environment dev, staging, production
- **Isolation:** Applications don't interfere
- **Portability:** Run anywhere Docker runs
- **Efficiency:** Lightweight compared to VMs
- **Scalability:** Easy to scale containers

**Use Cases:**
- Development environments
- CI/CD pipelines
- Microservices deployment
- Cloud deployments

**Example:**
Instead of 'works on my machine', Docker ensures it works everywhere by packaging the application with its exact dependencies."

**Q2: "Explain Kubernetes architecture"**

✅ **Answer:**
"Kubernetes is a container orchestration platform:

**Key Components:**
- **Master Node:** Controls cluster
  - API Server
  - etcd (state storage)
  - Scheduler
  - Controller Manager

- **Worker Nodes:** Run containers
  - Kubelet (container runtime)
  - Kube-proxy (networking)
  - Container runtime (Docker, containerd)

**Key Objects:**
- **Pods:** Smallest unit (one or more containers)
- **Deployments:** Manage pod replicas
- **Services:** Network access to pods
- **ConfigMaps/Secrets:** Configuration

**Benefits:**
- Auto-scaling
- Self-healing
- Load balancing
- Rolling updates
- Resource management"

**Q3: "Docker vs Kubernetes?"**

✅ **Answer:**
"Docker and Kubernetes serve different purposes:

**Docker:**
- Containerization platform
- Build and run containers
- Single host
- Development and small deployments

**Kubernetes:**
- Container orchestration
- Manage containers at scale
- Multiple hosts (cluster)
- Production deployments

**Relationship:**
- Docker creates containers
- Kubernetes manages Docker containers
- Kubernetes can use other runtimes too

**When to use:**
- Use Docker for: Development, simple deployments, single applications
- Use Kubernetes for: Production, microservices, large-scale deployments, auto-scaling needs"

**Q4: "How do you deploy a Node.js app with Docker?"**

✅ **Answer:**
"Step-by-step process:

**1. Create Dockerfile:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

**2. Build image:**
```bash
docker build -t my-app:latest .
```

**3. Run container:**
```bash
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  -e DB_HOST=mongodb \
  my-app:latest
```

**4. Docker Compose (for multi-container):**
```yaml
services:
  api:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - mongodb
  mongodb:
    image: mongo:6
```

**Best Practices:**
- Multi-stage builds
- .dockerignore file
- Non-root user
- Health checks
- Layer caching optimization"

---

## F) Key Takeaways

### Must Know:
1. ✅ MERN stack architecture
2. ✅ Docker containerization
3. ✅ Dockerfile best practices
4. ✅ Kubernetes basics
5. ✅ Pods, Deployments, Services
6. ✅ Container orchestration concepts

### Next Steps:
- Read dentira12.md for Final Interview Q&A
- Practice Docker and Kubernetes
- Understand deployment strategies

---

**End of Part 11 - Continue to dentira12.md**

