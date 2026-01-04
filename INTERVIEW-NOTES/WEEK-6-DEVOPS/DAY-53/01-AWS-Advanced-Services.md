# AWS ADVANCED SERVICES

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**AWS Advanced Services kya hain?**
- AWS mein bahut saare services hain
- Different use cases ke liye
- Managed services (less management)
- Integration between services
- Production-ready solutions

**Key AWS Services:**
- **RDS:** Managed databases
- **CloudWatch:** Monitoring
- **IAM:** Identity and Access Management
- **VPC:** Virtual Private Cloud
- **Route 53:** DNS service
- **CloudFront:** CDN
- **Lambda:** Serverless functions

**Service Categories:**
- **Compute:** EC2, Lambda, ECS
- **Storage:** S3, EBS, EFS
- **Database:** RDS, DynamoDB
- **Networking:** VPC, CloudFront, Route 53
- **Monitoring:** CloudWatch, CloudTrail
- **Security:** IAM, Secrets Manager

---

## B) Easy English Theory

### What are AWS Advanced Services?

AWS Advanced Services are managed services for various use cases. Categories: Compute (EC2, Lambda, ECS), Storage (S3, EBS, EFS), Database (RDS, DynamoDB), Networking (VPC, CloudFront, Route 53), Monitoring (CloudWatch, CloudTrail), Security (IAM, Secrets Manager). Benefits: Managed services (less operational overhead), integration between services, production-ready, scalable. Use for building complete cloud solutions.

---

## C) Why This Concept Exists

### The Problem

**Without Managed Services:**
- Manual management
- Operational overhead
- Complex setup
- Maintenance burden
- Time-consuming

### The Solution

**AWS Services Provide:**
1. **Managed:** Less operational work
2. **Integration:** Services work together
3. **Scalability:** Auto-scaling built-in
4. **Reliability:** High availability
5. **Cost-effective:** Pay for what you use

---

## D) Practical Example (Code)

```javascript
// ============================================
// AWS CLOUDWATCH (MONITORING)
// ============================================

const cloudwatch = new AWS.CloudWatch({ region: 'us-east-1' });

// Put custom metric
async function putMetric(metricName, value, unit = 'Count') {
  const params = {
    Namespace: 'MyApp/Metrics',
    MetricData: [{
      MetricName: metricName,
      Value: value,
      Unit: unit,
      Timestamp: new Date()
    }]
  };
  
  try {
    const result = await cloudwatch.putMetricData(params).promise();
    console.log('Metric published:', metricName);
    return result;
  } catch (error) {
    console.error('Error putting metric:', error);
    throw error;
  }
}

// Get metrics
async function getMetrics(metricName, startTime, endTime) {
  const params = {
    Namespace: 'MyApp/Metrics',
    MetricName: metricName,
    StartTime: startTime,
    EndTime: endTime,
    Period: 300, // 5 minutes
    Statistics: ['Average', 'Sum', 'Maximum', 'Minimum']
  };
  
  try {
    const result = await cloudwatch.getMetricStatistics(params).promise();
    return result.Datapoints;
  } catch (error) {
    console.error('Error getting metrics:', error);
    throw error;
  }
}

// Create alarm
async function createAlarm(alarmName, metricName, threshold) {
  const params = {
    AlarmName: alarmName,
    ComparisonOperator: 'GreaterThanThreshold',
    EvaluationPeriods: 2,
    MetricName: metricName,
    Namespace: 'MyApp/Metrics',
    Period: 300,
    Statistic: 'Average',
    Threshold: threshold,
    ActionsEnabled: true,
    AlarmActions: ['arn:aws:sns:us-east-1:account:alerts']
  };
  
  try {
    const result = await cloudwatch.putMetricAlarm(params).promise();
    console.log('Alarm created:', alarmName);
    return result;
  } catch (error) {
    console.error('Error creating alarm:', error);
    throw error;
  }
}

// ============================================
// AWS IAM (IDENTITY AND ACCESS MANAGEMENT)
// ============================================

const iam = new AWS.IAM();

// Create IAM user
async function createIAMUser(username) {
  const params = {
    UserName: username
  };
  
  try {
    const result = await iam.createUser(params).promise();
    console.log('IAM user created:', username);
    return result.User;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

// Create IAM policy
async function createPolicy(policyName, policyDocument) {
  const params = {
    PolicyName: policyName,
    PolicyDocument: JSON.stringify(policyDocument)
  };
  
  try {
    const result = await iam.createPolicy(params).promise();
    console.log('Policy created:', policyName);
    return result.Policy;
  } catch (error) {
    console.error('Error creating policy:', error);
    throw error;
  }
}

// Attach policy to user
async function attachPolicyToUser(username, policyArn) {
  const params = {
    UserName: username,
    PolicyArn: policyArn
  };
  
  try {
    const result = await iam.attachUserPolicy(params).promise();
    console.log('Policy attached to user');
    return result;
  } catch (error) {
    console.error('Error attaching policy:', error);
    throw error;
  }
}

// Create IAM role
async function createRole(roleName, assumeRolePolicyDocument) {
  const params = {
    RoleName: roleName,
    AssumeRolePolicyDocument: JSON.stringify(assumeRolePolicyDocument)
  };
  
  try {
    const result = await iam.createRole(params).promise();
    console.log('Role created:', roleName);
    return result.Role;
  } catch (error) {
    console.error('Error creating role:', error);
    throw error;
  }
}

// Example: EC2 assume role policy
const ec2AssumeRolePolicy = {
  Version: '2012-10-17',
  Statement: [{
    Effect: 'Allow',
    Principal: {
      Service: 'ec2.amazonaws.com'
    },
    Action: 'sts:AssumeRole'
  }]
};

// ============================================
// AWS VPC (VIRTUAL PRIVATE CLOUD)
// ============================================

const ec2 = new AWS.EC2({ region: 'us-east-1' });

// Create VPC
async function createVPC(cidrBlock) {
  const params = {
    CidrBlock: cidrBlock, // e.g., '10.0.0.0/16'
    TagSpecifications: [{
      ResourceType: 'vpc',
      Tags: [{ Key: 'Name', Value: 'my-vpc' }]
    }]
  };
  
  try {
    const result = await ec2.createVpc(params).promise();
    console.log('VPC created:', result.Vpc.VpcId);
    return result.Vpc;
  } catch (error) {
    console.error('Error creating VPC:', error);
    throw error;
  }
}

// Create Subnet
async function createSubnet(vpcId, cidrBlock, availabilityZone) {
  const params = {
    VpcId: vpcId,
    CidrBlock: cidrBlock, // e.g., '10.0.1.0/24'
    AvailabilityZone: availabilityZone
  };
  
  try {
    const result = await ec2.createSubnet(params).promise();
    console.log('Subnet created:', result.Subnet.SubnetId);
    return result.Subnet;
  } catch (error) {
    console.error('Error creating subnet:', error);
    throw error;
  }
}

// Create Internet Gateway
async function createInternetGateway(vpcId) {
  // Create gateway
  const gateway = await ec2.createInternetGateway().promise();
  const gatewayId = gateway.InternetGateway.InternetGatewayId;
  
  // Attach to VPC
  await ec2.attachInternetGateway({
    InternetGatewayId: gatewayId,
    VpcId: vpcId
  }).promise();
  
  console.log('Internet Gateway created and attached:', gatewayId);
  return gatewayId;
}

// ============================================
// AWS LAMBDA (SERVERLESS)
// ============================================

const lambda = new AWS.Lambda({ region: 'us-east-1' });

// Create Lambda function
async function createLambdaFunction(functionName, codeZip, handler, runtime = 'nodejs18.x') {
  const params = {
    FunctionName: functionName,
    Runtime: runtime,
    Role: 'arn:aws:iam::account:role/lambda-execution-role',
    Handler: handler, // e.g., 'index.handler'
    Code: {
      ZipFile: codeZip
    },
    Timeout: 30,
    MemorySize: 256,
    Environment: {
      Variables: {
        NODE_ENV: 'production'
      }
    }
  };
  
  try {
    const result = await lambda.createFunction(params).promise();
    console.log('Lambda function created:', functionName);
    return result;
  } catch (error) {
    console.error('Error creating Lambda function:', error);
    throw error;
  }
}

// Invoke Lambda function
async function invokeLambda(functionName, payload) {
  const params = {
    FunctionName: functionName,
    Payload: JSON.stringify(payload)
  };
  
  try {
    const result = await lambda.invoke(params).promise();
    return JSON.parse(result.Payload);
  } catch (error) {
    console.error('Error invoking Lambda:', error);
    throw error;
  }
}

// ============================================
// AWS ROUTE 53 (DNS)
// ============================================

const route53 = new AWS.Route53();

// Create hosted zone
async function createHostedZone(domainName) {
  const params = {
    Name: domainName,
    CallerReference: `hosted-zone-${Date.now()}`
  };
  
  try {
    const result = await route53.createHostedZone(params).promise();
    console.log('Hosted zone created:', domainName);
    return result.HostedZone;
  } catch (error) {
    console.error('Error creating hosted zone:', error);
    throw error;
  }
}

// Create DNS record
async function createDNSRecord(hostedZoneId, recordName, recordType, recordValue, ttl = 300) {
  const params = {
    HostedZoneId: hostedZoneId,
    ChangeBatch: {
      Changes: [{
        Action: 'CREATE',
        ResourceRecordSet: {
          Name: recordName,
          Type: recordType, // A, AAAA, CNAME, etc.
          TTL: ttl,
          ResourceRecords: [{
            Value: recordValue
          }]
        }
      }]
    }
  };
  
  try {
    const result = await route53.changeResourceRecordSets(params).promise();
    console.log('DNS record created:', recordName);
    return result;
  } catch (error) {
    console.error('Error creating DNS record:', error);
    throw error;
  }
}

// ============================================
// AWS CLOUDFRONT (CDN)
// ============================================

const cloudfront = new AWS.CloudFront();

// Create CloudFront distribution
async function createCloudFrontDistribution(s3BucketDomain) {
  const params = {
    DistributionConfig: {
      CallerReference: `cf-${Date.now()}`,
      Comment: 'My CloudFront Distribution',
      DefaultCacheBehavior: {
        TargetOriginId: 'S3-origin',
        ViewerProtocolPolicy: 'redirect-to-https',
        AllowedMethods: {
          Quantity: 2,
          Items: ['GET', 'HEAD']
        },
        ForwardedValues: {
          QueryString: false,
          Cookies: {
            Forward: 'none'
          }
        },
        MinTTL: 0,
        DefaultTTL: 86400,
        MaxTTL: 31536000
      },
      Origins: {
        Quantity: 1,
        Items: [{
          Id: 'S3-origin',
          DomainName: s3BucketDomain,
          S3OriginConfig: {
            OriginAccessIdentity: ''
          }
        }]
      },
      Enabled: true,
      PriceClass: 'PriceClass_100' // Use only North America and Europe
    }
  };
  
  try {
    const result = await cloudfront.createDistribution(params).promise();
    console.log('CloudFront distribution created:', result.Distribution.Id);
    return result.Distribution;
  } catch (error) {
    console.error('Error creating CloudFront distribution:', error);
    throw error;
  }
}

// ============================================
// AWS SERVICES INTEGRATION
// ============================================

// Complete setup: VPC -> EC2 -> ALB -> S3 -> CloudFront
async function setupCompleteInfrastructure() {
  // 1. Create VPC
  const vpc = await createVPC('10.0.0.0/16');
  
  // 2. Create Subnets
  const publicSubnet = await createSubnet(vpc.VpcId, '10.0.1.0/24', 'us-east-1a');
  const privateSubnet = await createSubnet(vpc.VpcId, '10.0.2.0/24', 'us-east-1b');
  
  // 3. Create Internet Gateway
  const igw = await createInternetGateway(vpc.VpcId);
  
  // 4. Create Security Group
  const sg = await createSecurityGroup('web-sg', 'Web security group', vpc.VpcId);
  
  // 5. Launch EC2 instances
  const instance1 = await createEC2Instance();
  const instance2 = await createEC2Instance();
  
  // 6. Create Load Balancer
  const { arn: albArn } = await createApplicationLoadBalancer(
    'myapp-alb',
    [publicSubnet.SubnetId],
    [sg]
  );
  
  // 7. Create Target Group and register instances
  const tgArn = await createTargetGroup('app-targets', vpc.VpcId);
  await registerTargets(tgArn, [instance1, instance2]);
  
  // 8. Create S3 bucket for static assets
  await createBucket('myapp-static-assets');
  
  // 9. Create CloudFront distribution
  await createCloudFrontDistribution('myapp-static-assets.s3.amazonaws.com');
  
  // 10. Set up CloudWatch monitoring
  await createAlarm('high-cpu', 'CPUUtilization', 80);
  
  return {
    vpc: vpc.VpcId,
    loadBalancer: albArn,
    s3Bucket: 'myapp-static-assets',
    cloudFront: 'distribution-id'
  };
}
```

---

## E) Internal Working

**AWS Services Integration:**
- **VPC:** Network isolation
- **EC2:** Compute instances
- **ALB:** Traffic distribution
- **S3:** Object storage
- **CloudFront:** CDN
- **CloudWatch:** Monitoring
- **IAM:** Access control

**Service Relationships:**
- Services integrate seamlessly
- Use IAM for access control
- CloudWatch for monitoring
- VPC for networking

---

## F) Interview Questions & Answers

### Q1: What is AWS VPC and why is it important?

**Answer:**
AWS VPC (Virtual Private Cloud) is isolated network environment in AWS. Important because: Network isolation (separate networks), Security (control traffic flow), Custom networking (define IP ranges, subnets), Internet connectivity (Internet Gateway), VPN connectivity (connect to on-premise). Components: VPC (network), Subnets (network segments), Internet Gateway (internet access), Route Tables (traffic routing), Security Groups (firewall). Essential for secure, isolated network environments.

### Q2: What is AWS CloudWatch and how do you use it?

**Answer:**
AWS CloudWatch is monitoring and observability service. Features: Metrics (collect and track), Logs (centralized logging), Alarms (notifications on thresholds), Dashboards (visualization), Events (event-driven automation). Use for: Monitor EC2, applications, set alarms, collect logs, track custom metrics, create dashboards. Integrates with most AWS services. Essential for production monitoring and troubleshooting.

### Q3: What is IAM and how does it work?

**Answer:**
IAM (Identity and Access Management) manages access to AWS resources. Components: Users (individuals), Groups (user collections), Roles (temporary credentials for services), Policies (permissions - JSON documents). Principles: Least privilege (minimum permissions), Separation of duties, Regular audits. Use for: Control who can access what, grant permissions, manage authentication. Critical for security - always use IAM, never share root credentials.

---

## G) Common Mistakes

### Mistake 1: Using Root Credentials

```javascript
// ❌ WRONG - Root credentials
const aws = new AWS.Config({
  accessKeyId: 'ROOT_ACCESS_KEY',
  secretAccessKey: 'ROOT_SECRET_KEY'
});
// Security risk, full access

// ✅ CORRECT - IAM user/role
const aws = new AWS.Config({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1'
});
// Limited permissions via IAM
```

**Why it breaks:** Root credentials have full access, security risk, can't be revoked easily.

---

## H) When to Use & When NOT to Use

Use AWS services for: Cloud deployments, scalable applications, managed services needed, production workloads. Don't use when: On-premise only, cost not justified, simpler solutions available, vendor lock-in concerns.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain AWS Services."

**You:"
"AWS provides many managed services. Categories: Compute (EC2, Lambda), Storage (S3, EBS), Database (RDS, DynamoDB), Networking (VPC, CloudFront, Route 53), Monitoring (CloudWatch), Security (IAM).

Key services: VPC (network isolation), CloudWatch (monitoring), IAM (access control), S3 (object storage), Route 53 (DNS), CloudFront (CDN). Services integrate seamlessly. Use managed services for less operational overhead, focus on application code."

---

## J) Mini Practice Task

Practice: Set up VPC, configure IAM, use CloudWatch, create Lambda functions, set up Route 53, configure CloudFront, integrate services.

---

**END OF TOPIC: AWS ADVANCED SERVICES**

