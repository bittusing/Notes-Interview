# AWS EC2 (ELASTIC COMPUTE CLOUD)

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**AWS EC2 kya hai?**
- EC2 virtual servers provide karta hai cloud mein
- Elastic Compute Cloud
- On-demand compute capacity
- Pay-as-you-go pricing
- Scalable virtual machines

**Real-life Analogy:**
- EC2 = Virtual computer rent karna
- Instance = Computer
- AMI = Pre-configured template
- Instance Types = Different sizes (small, medium, large)
- Security Groups = Firewall rules

**EC2 Components:**
- **Instances:** Virtual servers
- **AMI:** Amazon Machine Image (template)
- **Instance Types:** Different configurations
- **Security Groups:** Firewall rules
- **Key Pairs:** SSH access
- **EBS:** Elastic Block Store (storage)

**EC2 Features:**
- **Scalability:** Auto-scaling
- **Flexibility:** Multiple instance types
- **Pricing:** On-demand, reserved, spot
- **Networking:** VPC, subnets
- **Storage:** EBS, instance store

---

## B) Easy English Theory

### What is AWS EC2?

AWS EC2 (Elastic Compute Cloud) provides virtual servers in cloud. Components: Instances (virtual servers), AMI (Amazon Machine Image - template), Instance Types (different sizes/configurations), Security Groups (firewall), Key Pairs (SSH access), EBS (storage). Features: Scalability (auto-scaling), Flexibility (multiple types), Pricing options (on-demand, reserved, spot), Networking (VPC), Storage (EBS). Pay-as-you-go pricing model.

---

## C) Why This Concept Exists

### The Problem

**Without EC2:**
- Physical servers needed
- High upfront costs
- Difficult scaling
- Maintenance overhead
- Limited flexibility

### The Solution

**EC2 Provides:**
1. **On-Demand:** Pay for what you use
2. **Scalability:** Scale up/down easily
3. **Flexibility:** Multiple instance types
4. **No Maintenance:** Managed infrastructure
5. **Global:** Multiple regions

---

## D) Practical Example (Code)

```javascript
// ============================================
// AWS SDK - EC2 OPERATIONS
// ============================================

const AWS = require('aws-sdk');
const ec2 = new AWS.EC2({ region: 'us-east-1' });

// ============================================
// CREATE EC2 INSTANCE
// ============================================

async function createEC2Instance() {
  const params = {
    ImageId: 'ami-0c55b159cbfafe1f0', // Amazon Linux 2
    InstanceType: 't2.micro',
    MinCount: 1,
    MaxCount: 1,
    KeyName: 'my-key-pair',
    SecurityGroupIds: ['sg-12345678'],
    UserData: Buffer.from(`
      #!/bin/bash
      yum update -y
      yum install -y nodejs npm
      npm install -g pm2
    `).toString('base64'),
    TagSpecifications: [{
      ResourceType: 'instance',
      Tags: [
        { Key: 'Name', Value: 'my-app-server' },
        { Key: 'Environment', Value: 'production' }
      ]
    }]
  };
  
  try {
    const result = await ec2.runInstances(params).promise();
    const instanceId = result.Instances[0].InstanceId;
    console.log('Instance created:', instanceId);
    return instanceId;
  } catch (error) {
    console.error('Error creating instance:', error);
    throw error;
  }
}

// ============================================
// DESCRIBE INSTANCES
// ============================================

async function describeInstances(filters = []) {
  const params = {
    Filters: filters
  };
  
  try {
    const result = await ec2.describeInstances(params).promise();
    const instances = [];
    
    result.Reservations.forEach(reservation => {
      reservation.Instances.forEach(instance => {
        instances.push({
          InstanceId: instance.InstanceId,
          State: instance.State.Name,
          InstanceType: instance.InstanceType,
          PublicIP: instance.PublicIpAddress,
          PrivateIP: instance.PrivateIpAddress,
          LaunchTime: instance.LaunchTime
        });
      });
    });
    
    return instances;
  } catch (error) {
    console.error('Error describing instances:', error);
    throw error;
  }
}

// Get running instances
async function getRunningInstances() {
  return describeInstances([
    { Name: 'instance-state-name', Values: ['running'] }
  ]);
}

// ============================================
// START/STOP INSTANCES
// ============================================

async function startInstance(instanceId) {
  const params = {
    InstanceIds: [instanceId]
  };
  
  try {
    const result = await ec2.startInstances(params).promise();
    console.log('Instance starting:', instanceId);
    return result;
  } catch (error) {
    console.error('Error starting instance:', error);
    throw error;
  }
}

async function stopInstance(instanceId) {
  const params = {
    InstanceIds: [instanceId]
  };
  
  try {
    const result = await ec2.stopInstances(params).promise();
    console.log('Instance stopping:', instanceId);
    return result;
  } catch (error) {
    console.error('Error stopping instance:', error);
    throw error;
  }
}

async function terminateInstance(instanceId) {
  const params = {
    InstanceIds: [instanceId]
  };
  
  try {
    const result = await ec2.terminateInstances(params).promise();
    console.log('Instance terminating:', instanceId);
    return result;
  } catch (error) {
    console.error('Error terminating instance:', error);
    throw error;
  }
}

// ============================================
// SECURITY GROUPS
// ============================================

async function createSecurityGroup(groupName, description, vpcId) {
  const params = {
    GroupName: groupName,
    Description: description,
    VpcId: vpcId
  };
  
  try {
    const result = await ec2.createSecurityGroup(params).promise();
    const groupId = result.GroupId;
    
    // Add inbound rules
    await ec2.authorizeSecurityGroupIngress({
      GroupId: groupId,
      IpPermissions: [
        {
          IpProtocol: 'tcp',
          FromPort: 22,
          ToPort: 22,
          IpRanges: [{ CidrIp: '0.0.0.0/0', Description: 'SSH' }]
        },
        },
        {
          IpProtocol: 'tcp',
          FromPort: 80,
          ToPort: 80,
          IpRanges: [{ CidrIp: '0.0.0.0/0', Description: 'HTTP' }]
        },
        {
          IpProtocol: 'tcp',
          FromPort: 443,
          ToPort: 443,
          IpRanges: [{ CidrIp: '0.0.0.0/0', Description: 'HTTPS' }]
        }
      ]
    }).promise();
    
    console.log('Security group created:', groupId);
    return groupId;
  } catch (error) {
    console.error('Error creating security group:', error);
    throw error;
  }
}

// ============================================
// EBS VOLUMES
// ============================================

async function createVolume(size, availabilityZone, volumeType = 'gp3') {
  const params = {
    Size: size, // GB
    AvailabilityZone: availabilityZone,
    VolumeType: volumeType,
    Encrypted: true
  };
  
  try {
    const result = await ec2.createVolume(params).promise();
    console.log('Volume created:', result.VolumeId);
    return result.VolumeId;
  } catch (error) {
    console.error('Error creating volume:', error);
    throw error;
  }
}

async function attachVolume(volumeId, instanceId, device = '/dev/sdf') {
  const params = {
    VolumeId: volumeId,
    InstanceId: instanceId,
    Device: device
  };
  
  try {
    const result = await ec2.attachVolume(params).promise();
    console.log('Volume attached:', volumeId);
    return result;
  } catch (error) {
    console.error('Error attaching volume:', error);
    throw error;
  }
}

// ============================================
// INSTANCE TYPES
// ============================================

const instanceTypes = {
  // General Purpose
  't2.micro': {
    vCPU: 1,
    memory: '1 GiB',
    network: 'Low to Moderate',
    use: 'Development, testing'
  },
  't3.medium': {
    vCPU: 2,
    memory: '4 GiB',
    network: 'Up to 5 Gbps',
    use: 'Small applications'
  },
  
  // Compute Optimized
  'c5.large': {
    vCPU: 2,
    memory: '4 GiB',
    network: 'Up to 10 Gbps',
    use: 'CPU-intensive workloads'
  },
  
  // Memory Optimized
  'r5.large': {
    vCPU: 2,
    memory: '16 GiB',
    network: 'Up to 10 Gbps',
    use: 'Memory-intensive workloads'
  },
  
  // Storage Optimized
  'i3.large': {
    vCPU: 2,
    memory: '15.25 GiB',
    network: 'Up to 10 Gbps',
    storage: '475 GB NVMe SSD',
    use: 'High I/O workloads'
  }
};

// ============================================
// AUTO SCALING (CONCEPTUAL)
// ============================================

const autoScalingConfig = {
  // Launch Template
  launchTemplate: {
    ImageId: 'ami-0c55b159cbfafe1f0',
    InstanceType: 't3.medium',
    SecurityGroupIds: ['sg-12345678'],
    KeyName: 'my-key-pair'
  },
  
  // Auto Scaling Group
  autoScalingGroup: {
    MinSize: 2,
    MaxSize: 10,
    DesiredCapacity: 3,
    TargetGroupARNs: ['arn:aws:elasticloadbalancing:...'],
    HealthCheckType: 'ELB',
    HealthCheckGracePeriod: 300
  },
  
  // Scaling Policies
  scalingPolicies: [
    {
      PolicyType: 'TargetTrackingScaling',
      TargetValue: 70.0,
      PredefinedMetricSpecification: {
        PredefinedMetricType: 'ASGAverageCPUUtilization'
      }
    }
  ]
};

// ============================================
// EC2 PRICING MODELS
// ============================================

const pricingModels = {
  onDemand: {
    description: 'Pay for compute by the hour/second',
    use: 'Short-term, unpredictable workloads',
    pros: ['No upfront cost', 'Flexible'],
    cons: ['Most expensive']
  },
  
  reserved: {
    description: 'Reserve capacity for 1-3 years',
    use: 'Predictable workloads',
    pros: ['Significant discount (up to 72%)', 'Capacity reservation'],
    cons: ['Upfront payment', 'Commitment']
  },
  
  spot: {
    description: 'Bid for unused EC2 capacity',
    use: 'Fault-tolerant, flexible workloads',
    pros: ['Up to 90% discount', 'Cost-effective'],
    cons: ['Can be terminated', 'Not for critical workloads']
  },
  
  savingsPlans: {
    description: 'Commit to usage amount',
    use: 'Consistent usage',
    pros: ['Flexible', 'Discounts'],
    cons: ['Commitment']
  }
};

// ============================================
// USER DATA SCRIPTS
// ============================================

const userDataScripts = {
  // Node.js application setup
  nodeApp: `
#!/bin/bash
yum update -y
yum install -y nodejs npm

# Install PM2
npm install -g pm2

# Clone repository
git clone https://github.com/user/repo.git /opt/app
cd /opt/app

# Install dependencies
npm install

# Start application
pm2 start server.js
pm2 save
pm2 startup
`,

  // Docker setup
  dockerApp: `
#!/bin/bash
yum update -y
yum install -y docker
systemctl start docker
systemctl enable docker
usermod -a -G docker ec2-user

# Run container
docker run -d -p 80:3000 myapp:latest
`,

  // Web server setup
  webServer: `
#!/bin/bash
yum update -y
yum install -y httpd
systemctl start httpd
systemctl enable httpd

# Add content
echo "<h1>Hello from EC2</h1>" > /var/www/html/index.html
`
};
```

---

## E) Internal Working

**EC2 Instance Lifecycle:**
1. **Launch:** Create instance from AMI
2. **Pending:** Instance starting
3. **Running:** Instance active
4. **Stopping:** Instance shutting down
5. **Stopped:** Instance stopped (can restart)
6. **Terminated:** Instance deleted

**Key Concepts:**
- **AMI:** Template for instances
- **Instance Types:** Different configurations
- **Security Groups:** Firewall rules
- **EBS:** Persistent storage
- **VPC:** Network isolation

---

## F) Interview Questions & Answers

### Q1: What is AWS EC2 and how does it work?

**Answer:**
AWS EC2 (Elastic Compute Cloud) provides virtual servers in cloud. Works by: Selecting AMI (Amazon Machine Image - template), choosing instance type (size/configuration), configuring security groups (firewall), launching instance, accessing via SSH. Components: Instances (virtual servers), AMI (template), Security Groups (firewall), Key Pairs (SSH access), EBS (storage). Pricing: On-demand (pay by hour), Reserved (1-3 year commitment, discount), Spot (bid for unused capacity, up to 90% discount).

### Q2: What are different EC2 instance types?

**Answer:**
EC2 instance types: General Purpose (t2, t3, m5 - balanced CPU/memory, web servers), Compute Optimized (c5, c6 - high CPU, batch processing), Memory Optimized (r5, r6 - high memory, databases), Storage Optimized (i3, d2 - high I/O, data warehousing), GPU (p3, g4 - machine learning, graphics). Choose based on workload: Web apps → General Purpose, Databases → Memory Optimized, ML → GPU.

### Q3: What is the difference between On-Demand, Reserved, and Spot instances?

**Answer:**
On-Demand: Pay by hour/second, no commitment, most expensive, use for short-term/unpredictable. Reserved: 1-3 year commitment, significant discount (up to 72%), capacity reservation, use for predictable workloads. Spot: Bid for unused capacity, up to 90% discount, can be terminated, use for fault-tolerant/flexible workloads. Choose based on: Predictability → Reserved, Cost-sensitive → Spot, Flexibility → On-Demand.

---

## G) Common Mistakes

### Mistake 1: Not Using Security Groups Properly

```javascript
// ❌ WRONG - Open to all
SecurityGroupIngress: [{
  IpProtocol: 'tcp',
  FromPort: 22,
  ToPort: 22,
  IpRanges: [{ CidrIp: '0.0.0.0/0' }] // Open SSH to all
}]
// Security risk

// ✅ CORRECT - Restrict access
SecurityGroupIngress: [{
  IpProtocol: 'tcp',
  FromPort: 22,
  ToPort: 22,
  IpRanges: [{ CidrIp: '203.0.113.0/24' }] // Specific IP range
}]
```

**Why it breaks:** Open security groups expose instances to attacks.

---

## H) When to Use & When NOT to Use

Use EC2 for: Custom applications, full control needed, specific requirements, when need virtual servers. Don't use when: Serverless sufficient (Lambda), managed service better (RDS, Elastic Beanstalk), when don't need server management.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain AWS EC2."

**You:"
"AWS EC2 provides virtual servers in cloud. Components: Instances (virtual servers), AMI (template), Security Groups (firewall), Key Pairs (SSH), EBS (storage). Instance types: General Purpose, Compute Optimized, Memory Optimized, Storage Optimized, GPU.

Pricing: On-demand (pay by hour), Reserved (commitment, discount), Spot (bid, up to 90% discount). Features: Auto-scaling, multiple regions, pay-as-you-go. Use for custom applications, full control needed."

---

## J) Mini Practice Task

Practice: Launch EC2 instances, configure security groups, attach EBS volumes, use user data scripts, understand instance types, set up auto-scaling, choose pricing models.

---

**END OF TOPIC: AWS EC2**

