# KUBERNETES DEEP DIVE

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Kubernetes Architecture kya hai?**
- Kubernetes cluster-based system hai
- Master nodes (control plane) aur Worker nodes
- API Server, etcd, Scheduler, Controller Manager
- Kubelet, kube-proxy worker nodes par
- Distributed system design

**Real-life Analogy:**
- Kubernetes = Smart office management
- Master = Manager (decisions leta hai)
- Worker = Employees (work karte hain)
- API Server = Communication hub
- etcd = Database (state store)
- Scheduler = Task assigner

**Kubernetes Components:**
- **Control Plane:** Master components
- **Nodes:** Worker machines
- **Pods:** Smallest unit
- **Services:** Networking
- **Volumes:** Storage
- **Namespaces:** Isolation

**Advanced Features:**
- **HPA:** Horizontal Pod Autoscaler
- **VPA:** Vertical Pod Autoscaler
- **StatefulSets:** Stateful applications
- **DaemonSets:** Node-level pods
- **Jobs/CronJobs:** Batch processing

---

## B) Easy English Theory

### What is Kubernetes Architecture?

Kubernetes is cluster-based system with master nodes (control plane) and worker nodes. Control plane: API Server (main interface), etcd (state store), Scheduler (pod placement), Controller Manager (maintains state). Worker nodes: Kubelet (node agent), kube-proxy (networking). Components: Pods (smallest unit), Services (networking), Volumes (storage), Namespaces (isolation). Advanced: HPA (auto-scaling), StatefulSets, DaemonSets, Jobs.

---

## C) Why This Concept Exists

### The Problem

**Without Kubernetes:**
- Manual container management
- No auto-scaling
- Difficult service discovery
- No self-healing
- Complex networking

### The Solution

**Kubernetes Provides:**
1. **Automation:** Automatic management
2. **Scaling:** Auto-scale pods
3. **Service Discovery:** Automatic
4. **Self-healing:** Restart failed pods
5. **Networking:** Advanced networking

---

## D) Practical Example (Code)

```yaml
# ============================================
# STATEFULSET (FOR STATEFUL APPS)
# ============================================

apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: database
spec:
  serviceName: "database"
  replicas: 3
  selector:
    matchLabels:
      app: database
  template:
    metadata:
      labels:
        app: database
    spec:
      containers:
      - name: postgres
        image: postgres:15
        ports:
        - containerPort: 5432
        volumeMounts:
        - name: data
          mountPath: /var/lib/postgresql/data
  volumeClaimTemplates:
  - metadata:
      name: data
    spec:
      accessModes: ["ReadWriteOnce"]
      resources:
        requests:
          storage: 10Gi

---
# ============================================
# DAEMONSET (NODE-LEVEL PODS)
# ============================================

apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: log-collector
spec:
  selector:
    matchLabels:
      app: log-collector
  template:
    metadata:
      labels:
        app: log-collector
    spec:
      containers:
      - name: fluentd
        image: fluent/fluentd:latest
        volumeMounts:
        - name: varlog
          mountPath: /var/log
        - name: varlibdockercontainers
          mountPath: /var/lib/docker/containers
      volumes:
      - name: varlog
        hostPath:
          path: /var/log
      - name: varlibdockercontainers
        hostPath:
          path: /var/lib/docker/containers

---
# ============================================
# JOB AND CRONJOB
# ============================================

# Job
apiVersion: batch/v1
kind: Job
metadata:
  name: data-processor
spec:
  completions: 3
  parallelism: 2
  template:
    spec:
      containers:
      - name: processor
        image: processor:latest
        command: ["node", "process.js"]
      restartPolicy: Never

---
# CronJob
apiVersion: batch/v1
kind: CronJob
metadata:
  name: backup-job
spec:
  schedule: "0 2 * * *"  # Daily at 2 AM
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: backup
            image: backup:latest
            command: ["backup.sh"]
          restartPolicy: OnFailure

---
# ============================================
# INGRESS (EXTERNAL ACCESS)
# ============================================

apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: myapp-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
  - host: myapp.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: myapp-service
            port:
              number: 80
  - host: api.example.com
    http:
      paths:
      - path: /api
        pathType: Prefix
        backend:
          service:
            name: api-service
            port:
              number: 80

---
# ============================================
# PERSISTENT VOLUME
# ============================================

apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv-data
spec:
  capacity:
    storage: 10Gi
  accessModes:
    - ReadWriteOnce
  persistentVolumeReclaimPolicy: Retain
  storageClassName: slow
  hostPath:
    path: /data

---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: pvc-data
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 10Gi
  storageClassName: slow

---
# ============================================
# NETWORK POLICY
# ============================================

apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: app-network-policy
spec:
  podSelector:
    matchLabels:
      app: myapp
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: frontend
    ports:
    - protocol: TCP
      port: 3000
  egress:
  - to:
    - podSelector:
        matchLabels:
          app: database
    ports:
    - protocol: TCP
      port: 5432
```

```javascript
// ============================================
// KUBERNETES RESOURCE MANAGEMENT
// ============================================

const resourceManagement = {
  // Resource Requests (guaranteed)
  requests: {
    memory: "256Mi",
    cpu: "250m"  // 0.25 CPU
  },
  
  // Resource Limits (maximum)
  limits: {
    memory: "512Mi",
    cpu: "500m"  // 0.5 CPU
  },
  
  // Quality of Service classes
  qos: {
    Guaranteed: "Requests = Limits",
    Burstable: "Requests < Limits",
    BestEffort: "No requests/limits"
  }
};

// ============================================
// HORIZONTAL POD AUTOSCALER
// ============================================

const hpaConfig = `
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: myapp-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: myapp-deployment
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
      - type: Percent
        value: 50
        periodSeconds: 60
    scaleUp:
      stabilizationWindowSeconds: 0
      policies:
      - type: Percent
        value: 100
        periodSeconds: 15
`;

// ============================================
// KUBERNETES SERVICE TYPES
// ============================================

const serviceTypes = {
  ClusterIP: {
    description: "Internal service (default)",
    use: "Internal communication",
    example: "Database service"
  },
  
  NodePort: {
    description: "Expose on node IP",
    use: "External access via node IP",
    portRange: "30000-32767"
  },
  
  LoadBalancer: {
    description: "Cloud load balancer",
    use: "External access with load balancer",
    providers: ["AWS ELB", "GCP LB", "Azure LB"]
  },
  
  ExternalName: {
    description: "External service alias",
    use: "Map to external service",
    example: "External database"
  }
};

// ============================================
// KUBERNETES COMMANDS REFERENCE
// ============================================

const kubectlCommands = {
  // Basic operations
  apply: "kubectl apply -f file.yaml",
  get: "kubectl get pods/deployments/services",
  describe: "kubectl describe pod <name>",
  delete: "kubectl delete pod <name>",
  
  // Scaling
  scale: "kubectl scale deployment <name> --replicas=5",
  
  // Updates
  setImage: "kubectl set image deployment/<name> <container>=<image>",
  rollout: {
    status: "kubectl rollout status deployment/<name>",
    history: "kubectl rollout history deployment/<name>",
    undo: "kubectl rollout undo deployment/<name>",
    pause: "kubectl rollout pause deployment/<name>",
    resume: "kubectl rollout resume deployment/<name>"
  },
  
  // Debugging
  logs: "kubectl logs <pod> -f",
  exec: "kubectl exec -it <pod> -- sh",
  portForward: "kubectl port-forward pod/<name> 3000:3000",
  
  // Configuration
  createSecret: "kubectl create secret generic <name> --from-literal=key=value",
  createConfigMap: "kubectl create configmap <name> --from-file=config.properties"
};
```

---

## E) Internal Working

**Kubernetes Control Flow:**
1. **User Request:** kubectl apply
2. **API Server:** Validates and stores
3. **etcd:** Persists state
4. **Controller:** Watches for changes
5. **Scheduler:** Assigns pods to nodes
6. **Kubelet:** Creates pods on nodes
7. **kube-proxy:** Sets up networking

**Key Mechanisms:**
- **Reconciliation:** Match desired to actual
- **Watch Loops:** Continuous monitoring
- **Labels/Selectors:** Resource matching
- **Service Discovery:** DNS-based

---

## F) Interview Questions & Answers

### Q1: Explain Kubernetes architecture and components.

**Answer:**
Kubernetes architecture: Control plane (master) and worker nodes. Control plane: API Server (main interface, validates requests), etcd (distributed key-value store for state), Scheduler (assigns pods to nodes), Controller Manager (maintains desired state). Worker nodes: Kubelet (node agent, manages pods), kube-proxy (networking, service discovery). Components: Pods (smallest unit), Services (networking), Deployments (manage pods), Namespaces (isolation).

### Q2: What is the difference between Deployment, StatefulSet, and DaemonSet?

**Answer:**
Deployment: Stateless applications, random pod names, no stable identity, rolling updates, good for web apps. StatefulSet: Stateful applications, ordered pod names (pod-0, pod-1), stable network identity, ordered deployment/scaling, persistent storage, good for databases. DaemonSet: One pod per node, node-level services, good for logging, monitoring, networking agents.

### Q3: How does Kubernetes handle auto-scaling?

**Answer:**
Kubernetes auto-scaling: HPA (Horizontal Pod Autoscaler - scales pods based on CPU/memory/custom metrics), VPA (Vertical Pod Autoscaler - adjusts resource requests/limits), Cluster Autoscaler (scales nodes). HPA: Monitors metrics, scales pods up/down based on thresholds, configurable min/max replicas, supports custom metrics. Process: Metrics collected, compared to targets, pods scaled accordingly.

---

## G) Common Mistakes

### Mistake 1: Not Setting Resource Limits

```yaml
# ❌ WRONG - No resource limits
containers:
- name: myapp
  image: myapp:latest
# Can cause node issues

# ✅ CORRECT - Set requests and limits
containers:
- name: myapp
  image: myapp:latest
  resources:
    requests:
      memory: "256Mi"
      cpu: "250m"
    limits:
      memory: "512Mi"
      cpu: "500m"
```

**Why it breaks:** No limits can cause resource exhaustion, affect other pods, node instability.

---

## H) When to Use & When NOT to Use

Use Kubernetes for: Microservices, production deployments, auto-scaling needed, complex applications, multi-cloud. Don't use when: Simple applications, single container, learning overhead too high, overkill for use case.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain Kubernetes."

**You:**
"Kubernetes is container orchestration platform. Architecture: Control plane (API Server, etcd, Scheduler, Controller Manager) and worker nodes (Kubelet, kube-proxy). Components: Pods (smallest unit), Deployments (manage pods), Services (networking), StatefulSets (stateful apps), DaemonSets (node-level).

Features: Auto-scaling (HPA), self-healing, rolling updates, service discovery. Use for microservices, production deployments, auto-scaling. Industry standard for container orchestration."

---

## J) Mini Practice Task

Practice: Set up Kubernetes cluster, create Deployments/StatefulSets/DaemonSets, implement HPA, configure Ingress, use PersistentVolumes, set up NetworkPolicies, perform rolling updates.

---

**END OF TOPIC: KUBERNETES DEEP DIVE**

