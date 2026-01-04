# LOAD BALANCER

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Load Balancer kya hai?**
- Load Balancer traffic ko multiple servers par distribute karta hai
- High availability ensure karta hai
- Performance improve karta hai
- Health checks perform karta hai
- Single point of entry

**Real-life Analogy:**
- Load Balancer = Traffic controller
- Servers = Roads
- Traffic = Requests
- Distribution = Equal traffic distribute
- Health Check = Road condition check

**Load Balancer Types:**
- **Application Load Balancer (ALB):** Layer 7 (HTTP/HTTPS)
- **Network Load Balancer (NLB):** Layer 4 (TCP/UDP)
- **Classic Load Balancer (CLB):** Legacy (Layer 4/7)
- **Gateway Load Balancer:** Network appliances

**Load Balancing Algorithms:**
- **Round Robin:** Sequential distribution
- **Least Connections:** Fewest active connections
- **IP Hash:** Based on client IP
- **Weighted:** Based on server capacity

---

## B) Easy English Theory

### What is Load Balancer?

Load Balancer distributes traffic across multiple servers. Types: ALB (Application Load Balancer - Layer 7, HTTP/HTTPS, path-based routing), NLB (Network Load Balancer - Layer 4, TCP/UDP, high performance), CLB (Classic - legacy). Features: Health checks (monitor server health), Auto-scaling integration, SSL termination, Session affinity. Benefits: High availability, improved performance, fault tolerance, scalability.

---

## C) Why This Concept Exists

### The Problem

**Without Load Balancer:**
- Single point of failure
- No traffic distribution
- Poor performance under load
- Difficult scaling
- Manual failover

### The Solution

**Load Balancer Provides:**
1. **High Availability:** Multiple servers
2. **Performance:** Distribute load
3. **Fault Tolerance:** Automatic failover
4. **Scalability:** Add/remove servers
5. **Health Monitoring:** Automatic health checks

---

## D) Practical Example (Code)

```javascript
// ============================================
// AWS SDK - LOAD BALANCER OPERATIONS
// ============================================

const AWS = require('aws-sdk');
const elbv2 = new AWS.ELBv2({ region: 'us-east-1' });

// ============================================
// CREATE APPLICATION LOAD BALANCER
// ============================================

async function createApplicationLoadBalancer(name, subnets, securityGroups) {
  const params = {
    Name: name,
    Subnets: subnets, // ['subnet-123', 'subnet-456']
    SecurityGroups: securityGroups, // ['sg-123']
    Scheme: 'internet-facing', // or 'internal'
    Type: 'application',
    IpAddressType: 'ipv4'
  };
  
  try {
    const result = await elbv2.createLoadBalancer(params).promise();
    const loadBalancerArn = result.LoadBalancers[0].LoadBalancerArn;
    const dnsName = result.LoadBalancers[0].DNSName;
    
    console.log('Load Balancer created:', loadBalancerArn);
    console.log('DNS Name:', dnsName);
    
    return { arn: loadBalancerArn, dnsName };
  } catch (error) {
    console.error('Error creating load balancer:', error);
    throw error;
  }
}

// ============================================
// CREATE TARGET GROUP
// ============================================

async function createTargetGroup(name, vpcId, port = 3000, protocol = 'HTTP') {
  const params = {
    Name: name,
    Protocol: protocol,
    Port: port,
    VpcId: vpcId,
    HealthCheckProtocol: 'HTTP',
    HealthCheckPath: '/health',
    HealthCheckIntervalSeconds: 30,
    HealthCheckTimeoutSeconds: 5,
    HealthyThresholdCount: 2,
    UnhealthyThresholdCount: 3,
    TargetType: 'instance' // or 'ip', 'lambda'
  };
  
  try {
    const result = await elbv2.createTargetGroup(params).promise();
    const targetGroupArn = result.TargetGroups[0].TargetGroupArn;
    
    console.log('Target Group created:', targetGroupArn);
    return targetGroupArn;
  } catch (error) {
    console.error('Error creating target group:', error);
    throw error;
  }
}

// ============================================
// REGISTER TARGETS
// ============================================

async function registerTargets(targetGroupArn, instanceIds) {
  const targets = instanceIds.map(id => ({ Id: id }));
  
  const params = {
    TargetGroupArn: targetGroupArn,
    Targets: targets
  };
  
  try {
    const result = await elbv2.registerTargets(params).promise();
    console.log('Targets registered:', instanceIds);
    return result;
  } catch (error) {
    console.error('Error registering targets:', error);
    throw error;
  }
}

// ============================================
// CREATE LISTENER
// ============================================

async function createListener(loadBalancerArn, targetGroupArn, port = 80, protocol = 'HTTP') {
  const params = {
    LoadBalancerArn: loadBalancerArn,
    Protocol: protocol,
    Port: port,
    DefaultActions: [
      {
        Type: 'forward',
        TargetGroupArn: targetGroupArn
      }
    ]
  };
  
  // Add SSL certificate for HTTPS
  if (protocol === 'HTTPS') {
    params.Certificates = [{
      CertificateArn: 'arn:aws:acm:region:account:certificate/cert-id'
    }];
  }
  
  try {
    const result = await elbv2.createListener(params).promise();
    console.log('Listener created:', result.Listeners[0].ListenerArn);
    return result.Listeners[0].ListenerArn;
  } catch (error) {
    console.error('Error creating listener:', error);
    throw error;
  }
}

// ============================================
// PATH-BASED ROUTING (ALB)
// ============================================

async function createPathBasedRouting(loadBalancerArn, rules) {
  // Rules: [{ path: '/api', targetGroupArn: '...' }, { path: '/app', targetGroupArn: '...' }]
  
  const listenerParams = {
    LoadBalancerArn: loadBalancerArn,
    Protocol: 'HTTP',
    Port: 80,
    DefaultActions: [{
      Type: 'forward',
      TargetGroupArn: rules[0].targetGroupArn // Default
    }]
  };
  
  const listener = await elbv2.createListener(listenerParams).promise();
  const listenerArn = listener.Listeners[0].ListenerArn;
  
  // Add rules for each path
  for (const rule of rules.slice(1)) {
    await elbv2.createRule({
      ListenerArn: listenerArn,
      Priority: rules.indexOf(rule),
      Conditions: [{
        Field: 'path-pattern',
        Values: [rule.path]
      }],
      Actions: [{
        Type: 'forward',
        TargetGroupArn: rule.targetGroupArn
      }]
    }).promise();
  }
  
  return listenerArn;
}

// ============================================
// HEALTH CHECKS
// ============================================

async function configureHealthCheck(targetGroupArn, config) {
  const params = {
    TargetGroupArn: targetGroupArn,
    HealthCheckProtocol: config.protocol || 'HTTP',
    HealthCheckPath: config.path || '/health',
    HealthCheckIntervalSeconds: config.interval || 30,
    HealthCheckTimeoutSeconds: config.timeout || 5,
    HealthyThresholdCount: config.healthyThreshold || 2,
    UnhealthyThresholdCount: config.unhealthyThreshold || 3,
    Matcher: {
      HttpCode: config.successCodes || '200'
    }
  };
  
  try {
    const result = await elbv2.modifyTargetGroupAttributes(params).promise();
    console.log('Health check configured');
    return result;
  } catch (error) {
    console.error('Error configuring health check:', error);
    throw error;
  }
}

// ============================================
// STICKY SESSIONS (SESSION AFFINITY)
// ============================================

async function enableStickySessions(targetGroupArn, duration = 3600) {
  const params = {
    TargetGroupArn: targetGroupArn,
    Attributes: [
      {
        Key: 'stickiness.enabled',
        Value: 'true'
      },
      {
        Key: 'stickiness.type',
        Value: 'lb_cookie'
      },
      {
        Key: 'stickiness.lb_cookie.duration_seconds',
        Value: duration.toString()
      }
    ]
  };
  
  try {
    const result = await elbv2.modifyTargetGroupAttributes(params).promise();
    console.log('Sticky sessions enabled');
    return result;
  } catch (error) {
    console.error('Error enabling sticky sessions:', error);
    throw error;
  }
}

// ============================================
// LOAD BALANCER CONFIGURATION
// ============================================

const loadBalancerConfig = {
  // Application Load Balancer
  ALB: {
    type: 'application',
    layer: 7, // HTTP/HTTPS
    features: [
      'Path-based routing',
      'Host-based routing',
      'Query string routing',
      'HTTP/2 and WebSocket support',
      'SSL termination',
      'Content-based routing'
    ],
    use: 'Web applications, microservices'
  },
  
  // Network Load Balancer
  NLB: {
    type: 'network',
    layer: 4, // TCP/UDP
    features: [
      'Ultra-low latency',
      'Handles millions of requests',
      'Static IP addresses',
      'Preserves source IP',
      'Zonal isolation'
    ],
    use: 'High performance, TCP/UDP traffic'
  },
  
  // Classic Load Balancer
  CLB: {
    type: 'classic',
    layer: '4/7',
    features: [
      'Legacy support',
      'Basic load balancing'
    ],
    use: 'Legacy applications'
  }
};

// ============================================
// COMPLETE SETUP EXAMPLE
// ============================================

async function setupLoadBalancer() {
  // 1. Create Load Balancer
  const { arn: lbArn, dnsName } = await createApplicationLoadBalancer(
    'myapp-alb',
    ['subnet-123', 'subnet-456'],
    ['sg-123']
  );
  
  // 2. Create Target Groups
  const apiTargetGroup = await createTargetGroup('api-targets', 'vpc-123', 3000);
  const appTargetGroup = await createTargetGroup('app-targets', 'vpc-123', 8080);
  
  // 3. Register EC2 instances
  await registerTargets(apiTargetGroup, ['i-123', 'i-456']);
  await registerTargets(appTargetGroup, ['i-789', 'i-012']);
  
  // 4. Create Listener with path-based routing
  await createPathBasedRouting(lbArn, [
    { path: '/api/*', targetGroupArn: apiTargetGroup },
    { path: '/*', targetGroupArn: appTargetGroup }
  ]);
  
  // 5. Configure health checks
  await configureHealthCheck(apiTargetGroup, {
    path: '/api/health',
    interval: 30,
    timeout: 5
  });
  
  return {
    loadBalancerArn: lbArn,
    dnsName: dnsName,
    targetGroups: [apiTargetGroup, appTargetGroup]
  };
}
```

---

## E) Internal Working

**Load Balancer Flow:**
1. **Client Request:** Request to load balancer
2. **Health Check:** Check target health
3. **Algorithm:** Select target (round-robin, least connections)
4. **Forward:** Forward request to target
5. **Response:** Return response to client
6. **Monitor:** Continue health checks

**Key Mechanisms:**
- **Health Checks:** Monitor target health
- **Routing:** Distribute requests
- **SSL Termination:** Handle HTTPS
- **Session Affinity:** Sticky sessions

---

## F) Interview Questions & Answers

### Q1: What is Load Balancer and what are different types?

**Answer:**
Load Balancer distributes traffic across multiple servers. Types: ALB (Application Load Balancer - Layer 7, HTTP/HTTPS, path-based routing, content-based routing), NLB (Network Load Balancer - Layer 4, TCP/UDP, ultra-low latency, high performance), CLB (Classic - legacy, basic load balancing). Choose ALB for web apps/microservices, NLB for high performance/TCP traffic, CLB for legacy apps.

### Q2: How does Load Balancer health checking work?

**Answer:**
Load Balancer health checks: Periodically send requests to targets (HTTP/HTTPS/TCP), check response (status code, response time), mark healthy/unhealthy based on thresholds, remove unhealthy targets from rotation, continue checking and add back when healthy. Configuration: Protocol, path, interval, timeout, healthy/unhealthy thresholds, success codes. Essential for automatic failover and reliability.

### Q3: What is the difference between ALB and NLB?

**Answer:**
ALB (Application Load Balancer): Layer 7 (HTTP/HTTPS), path-based routing, host-based routing, content-based routing, SSL termination, HTTP/2 and WebSocket, use for web apps/microservices. NLB (Network Load Balancer): Layer 4 (TCP/UDP), ultra-low latency, handles millions of requests, static IP addresses, preserves source IP, use for high performance/TCP traffic. Choose ALB for application-level features, NLB for performance.

---

## G) Common Mistakes

### Mistake 1: Not Configuring Health Checks

```javascript
// ❌ WRONG - Default health check
// May not match application health endpoint
// Unhealthy targets still receive traffic

// ✅ CORRECT - Configure health check
HealthCheckPath: '/health',
HealthCheckIntervalSeconds: 30,
HealthyThresholdCount: 2,
UnhealthyThresholdCount: 3
```

**Why it breaks:** Unhealthy targets receive traffic, poor user experience, failures.

---

## H) When to Use & When NOT to Use

Use Load Balancer for: Multiple servers, high availability, traffic distribution, auto-scaling integration, SSL termination. Don't use when: Single server sufficient, no high availability needed, cost not justified.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain Load Balancer."

**You:"
"Load Balancer distributes traffic across multiple servers. Types: ALB (Layer 7, HTTP/HTTPS, path-based routing), NLB (Layer 4, TCP/UDP, high performance), CLB (legacy).

Features: Health checks (monitor server health), Auto-scaling integration, SSL termination, Session affinity. Benefits: High availability, improved performance, fault tolerance, scalability. Use for multiple servers, high availability requirements."

---

## J) Mini Practice Task

Practice: Create load balancers, configure target groups, set up health checks, implement path-based routing, enable SSL termination, integrate with auto-scaling, configure sticky sessions.

---

**END OF TOPIC: LOAD BALANCER**

