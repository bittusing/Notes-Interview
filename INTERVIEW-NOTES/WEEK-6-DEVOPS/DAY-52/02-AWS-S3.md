# AWS S3 (SIMPLE STORAGE SERVICE)

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**AWS S3 kya hai?**
- S3 object storage service hai
- Unlimited storage capacity
- Highly scalable aur durable
- Pay-as-you-go pricing
- Web interface for storage

**Real-life Analogy:**
- S3 = Digital warehouse
- Bucket = Storage room
- Object = Item (file)
- Key = Item location (path)
- Region = Warehouse location

**S3 Components:**
- **Buckets:** Storage containers
- **Objects:** Files stored
- **Keys:** Object identifiers (paths)
- **Regions:** Geographic locations
- **Storage Classes:** Different tiers

**S3 Features:**
- **Durability:** 99.999999999% (11 9's)
- **Scalability:** Unlimited storage
- **Availability:** 99.99% uptime
- **Security:** Encryption, access control
- **Versioning:** Object versioning

---

## B) Easy English Theory

### What is AWS S3?

AWS S3 (Simple Storage Service) is object storage service. Components: Buckets (storage containers), Objects (files), Keys (object identifiers/paths), Regions (geographic locations), Storage Classes (different tiers). Features: High durability (99.999999999%), unlimited scalability, 99.99% availability, encryption, versioning, lifecycle policies. Use for: File storage, backups, static website hosting, data archiving.

---

## C) Why This Concept Exists

### The Problem

**Without S3:**
- Limited local storage
- Difficult scaling
- No durability guarantee
- Manual backup management
- High costs for large storage

### The Solution

**S3 Provides:**
1. **Unlimited Storage:** Scale as needed
2. **Durability:** 11 9's durability
3. **Availability:** 99.99% uptime
4. **Cost-effective:** Pay for what you use
5. **Security:** Encryption and access control

---

## D) Practical Example (Code)

```javascript
// ============================================
// AWS SDK - S3 OPERATIONS
// ============================================

const AWS = require('aws-sdk');
const s3 = new AWS.S3({ region: 'us-east-1' });

// ============================================
// CREATE BUCKET
// ============================================

async function createBucket(bucketName, region = 'us-east-1') {
  const params = {
    Bucket: bucketName,
    CreateBucketConfiguration: {
      LocationConstraint: region
    }
  };
  
  try {
    const result = await s3.createBucket(params).promise();
    console.log('Bucket created:', bucketName);
    
    // Enable versioning
    await s3.putBucketVersioning({
      Bucket: bucketName,
      VersioningConfiguration: {
        Status: 'Enabled'
      }
    }).promise();
    
    // Enable encryption
    await s3.putBucketEncryption({
      Bucket: bucketName,
      ServerSideEncryptionConfiguration: {
        Rules: [{
          ApplyServerSideEncryptionByDefault: {
            SSEAlgorithm: 'AES256'
          }
        }]
      }
    }).promise();
    
    return result;
  } catch (error) {
    console.error('Error creating bucket:', error);
    throw error;
  }
}

// ============================================
// UPLOAD OBJECT
// ============================================

async function uploadObject(bucketName, key, body, contentType = 'application/octet-stream') {
  const params = {
    Bucket: bucketName,
    Key: key,
    Body: body,
    ContentType: contentType,
    ServerSideEncryption: 'AES256',
    Metadata: {
      'uploaded-by': 'my-app',
      'upload-date': new Date().toISOString()
    }
  };
  
  try {
    const result = await s3.putObject(params).promise();
    console.log('Object uploaded:', key);
    return result;
  } catch (error) {
    console.error('Error uploading object:', error);
    throw error;
  }
}

// Upload file
async function uploadFile(bucketName, key, filePath) {
  const fs = require('fs');
  const fileContent = fs.readFileSync(filePath);
  
  return uploadObject(bucketName, key, fileContent);
}

// ============================================
// DOWNLOAD OBJECT
// ============================================

async function downloadObject(bucketName, key) {
  const params = {
    Bucket: bucketName,
    Key: key
  };
  
  try {
    const result = await s3.getObject(params).promise();
    return result.Body;
  } catch (error) {
    console.error('Error downloading object:', error);
    throw error;
  }
}

// ============================================
// LIST OBJECTS
// ============================================

async function listObjects(bucketName, prefix = '') {
  const params = {
    Bucket: bucketName,
    Prefix: prefix
  };
  
  try {
    const result = await s3.listObjectsV2(params).promise();
    return result.Contents.map(obj => ({
      key: obj.Key,
      size: obj.Size,
      lastModified: obj.LastModified,
      storageClass: obj.StorageClass
    }));
  } catch (error) {
    console.error('Error listing objects:', error);
    throw error;
  }
}

// ============================================
// DELETE OBJECT
// ============================================

async function deleteObject(bucketName, key) {
  const params = {
    Bucket: bucketName,
    Key: key
  };
  
  try {
    const result = await s3.deleteObject(params).promise();
    console.log('Object deleted:', key);
    return result;
  } catch (error) {
    console.error('Error deleting object:', error);
    throw error;
  }
}

// ============================================
// PRESIGNED URL (TEMPORARY ACCESS)
// ============================================

async function generatePresignedURL(bucketName, key, expiresIn = 3600) {
  const params = {
    Bucket: bucketName,
    Key: key,
    Expires: expiresIn // seconds
  };
  
  try {
    const url = s3.getSignedUrl('getObject', params);
    return url;
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    throw error;
  }
}

// Presigned URL for upload
async function generatePresignedUploadURL(bucketName, key, expiresIn = 3600) {
  const params = {
    Bucket: bucketName,
    Key: key,
    Expires: expiresIn,
    ContentType: 'application/octet-stream'
  };
  
  try {
    const url = s3.getSignedUrl('putObject', params);
    return url;
  } catch (error) {
    console.error('Error generating presigned upload URL:', error);
    throw error;
  }
}

// ============================================
// S3 STORAGE CLASSES
// ============================================

const storageClasses = {
  STANDARD: {
    description: 'General purpose storage',
    durability: '99.999999999%',
    availability: '99.99%',
    use: 'Frequently accessed data',
    cost: 'Highest'
  },
  
  STANDARD_IA: {
    description: 'Infrequent Access',
    durability: '99.999999999%',
    availability: '99.9%',
    use: 'Less frequently accessed',
    cost: 'Lower storage, retrieval fee'
  },
  
  ONEZONE_IA: {
    description: 'One Zone Infrequent Access',
    durability: '99.5%',
    availability: '99.5%',
    use: 'Non-critical, infrequent data',
    cost: 'Lowest'
  },
  
  GLACIER: {
    description: 'Archive storage',
    durability: '99.999999999%',
    availability: 'N/A (retrieval time)',
    use: 'Long-term archive',
    retrievalTime: 'Minutes to hours',
    cost: 'Very low'
  },
  
  DEEP_ARCHIVE: {
    description: 'Lowest cost archive',
    durability: '99.999999999%',
    availability: 'N/A (retrieval time)',
    use: 'Rarely accessed archive',
    retrievalTime: '12 hours',
    cost: 'Lowest'
  }
};

// Upload with storage class
async function uploadWithStorageClass(bucketName, key, body, storageClass = 'STANDARD') {
  const params = {
    Bucket: bucketName,
    Key: key,
    Body: body,
    StorageClass: storageClass
  };
  
  return s3.putObject(params).promise();
}

// ============================================
// LIFECYCLE POLICIES
// ============================================

async function setLifecyclePolicy(bucketName) {
  const params = {
    Bucket: bucketName,
    LifecycleConfiguration: {
      Rules: [
        {
          Id: 'Move to IA after 30 days',
          Status: 'Enabled',
          Transitions: [{
            Days: 30,
            StorageClass: 'STANDARD_IA'
          }]
        },
        {
          Id: 'Move to Glacier after 90 days',
          Status: 'Enabled',
          Transitions: [{
            Days: 90,
            StorageClass: 'GLACIER'
          }]
        },
        {
          Id: 'Delete after 365 days',
          Status: 'Enabled',
          Expiration: {
            Days: 365
          }
        }
      ]
    }
  };
  
  try {
    const result = await s3.putBucketLifecycleConfiguration(params).promise();
    console.log('Lifecycle policy configured');
    return result;
  } catch (error) {
    console.error('Error setting lifecycle policy:', error);
    throw error;
  }
}

// ============================================
// CORS CONFIGURATION
// ============================================

async function setCORSConfiguration(bucketName) {
  const params = {
    Bucket: bucketName,
    CORSConfiguration: {
      CORSRules: [
        {
          AllowedHeaders: ['*'],
          AllowedMethods: ['GET', 'PUT', 'POST', 'DELETE'],
          AllowedOrigins: ['https://example.com'],
          ExposeHeaders: ['ETag'],
          MaxAgeSeconds: 3000
        }
      ]
    }
  };
  
  try {
    const result = await s3.putBucketCors(params).promise();
    console.log('CORS configured');
    return result;
  } catch (error) {
    console.error('Error setting CORS:', error);
    throw error;
  }
}

// ============================================
// BUCKET POLICY
// ============================================

async function setBucketPolicy(bucketName, policy) {
  const params = {
    Bucket: bucketName,
    Policy: JSON.stringify(policy)
  };
  
  try {
    const result = await s3.putBucketPolicy(params).promise();
    console.log('Bucket policy set');
    return result;
  } catch (error) {
    console.error('Error setting bucket policy:', error);
    throw error;
  }
}

// Example bucket policy
const bucketPolicy = {
  Version: '2012-10-17',
  Statement: [
    {
      Sid: 'PublicReadGetObject',
      Effect: 'Allow',
      Principal: '*',
      Action: 's3:GetObject',
      Resource: `arn:aws:s3:::${bucketName}/*`
    }
  ]
};

// ============================================
// STATIC WEBSITE HOSTING
// ============================================

async function enableStaticWebsiteHosting(bucketName, indexDocument = 'index.html', errorDocument = 'error.html') {
  const params = {
    Bucket: bucketName,
    WebsiteConfiguration: {
      IndexDocument: { Suffix: indexDocument },
      ErrorDocument: { Key: errorDocument }
    }
  };
  
  try {
    const result = await s3.putBucketWebsite(params).promise();
    console.log('Static website hosting enabled');
    return result;
  } catch (error) {
    console.error('Error enabling website hosting:', error);
    throw error;
  }
}

// ============================================
// MULTIPART UPLOAD (LARGE FILES)
// ============================================

async function uploadLargeFile(bucketName, key, filePath, partSize = 5 * 1024 * 1024) { // 5MB
  const fs = require('fs');
  const fileStream = fs.createReadStream(filePath);
  const fileStats = fs.statSync(filePath);
  
  // Initiate multipart upload
  const multipartParams = {
    Bucket: bucketName,
    Key: key
  };
  
  const multipartUpload = await s3.createMultipartUpload(multipartParams).promise();
  const uploadId = multipartUpload.UploadId;
  
  const parts = [];
  let partNumber = 1;
  let position = 0;
  
  // Upload parts
  while (position < fileStats.size) {
    const chunk = fileStream.read(partSize);
    
    const uploadPartParams = {
      Bucket: bucketName,
      Key: key,
      PartNumber: partNumber,
      UploadId: uploadId,
      Body: chunk
    };
    
    const partResult = await s3.uploadPart(uploadPartParams).promise();
    parts.push({
      ETag: partResult.ETag,
      PartNumber: partNumber
    });
    
    partNumber++;
    position += partSize;
  }
  
  // Complete multipart upload
  const completeParams = {
    Bucket: bucketName,
    Key: key,
    UploadId: uploadId,
    MultipartUpload: {
      Parts: parts
    }
  };
  
  const result = await s3.completeMultipartUpload(completeParams).promise();
  console.log('Large file uploaded:', key);
  return result;
}
```

---

## E) Internal Working

**S3 Architecture:**
- **Buckets:** Top-level containers
- **Objects:** Files stored with metadata
- **Keys:** Unique identifiers
- **Regions:** Geographic locations
- **Storage Classes:** Different tiers

**S3 Operations:**
- **PUT:** Upload object
- **GET:** Download object
- **DELETE:** Remove object
- **LIST:** List objects
- **HEAD:** Get metadata

---

## F) Interview Questions & Answers

### Q1: What is AWS S3 and how does it work?

**Answer:**
AWS S3 is object storage service. Works by: Creating buckets (storage containers), uploading objects (files with keys/paths), accessing via API or console, organizing with keys (paths), storing in regions. Features: High durability (99.999999999%), unlimited scalability, 99.99% availability, encryption, versioning, lifecycle policies. Storage classes: STANDARD (frequent access), STANDARD_IA (infrequent), GLACIER (archive), DEEP_ARCHIVE (rarely accessed).

### Q2: What are S3 storage classes and when to use which?

**Answer:**
S3 storage classes: STANDARD (general purpose, frequent access, highest cost), STANDARD_IA (infrequent access, lower storage cost, retrieval fee), ONEZONE_IA (single zone, non-critical, lowest cost), GLACIER (archive, retrieval minutes-hours, very low cost), DEEP_ARCHIVE (rarely accessed, 12-hour retrieval, lowest cost). Choose based on: Access frequency → STANDARD, Less frequent → STANDARD_IA, Archive → GLACIER/DEEP_ARCHIVE. Use lifecycle policies to automate transitions.

### Q3: How do you secure S3 buckets?

**Answer:**
Secure S3 buckets: Bucket policies (access control), IAM policies (user permissions), Encryption (server-side encryption - SSE-S3, SSE-KMS, SSE-C), Versioning (prevent accidental deletion), MFA Delete (require MFA for deletion), Block Public Access (prevent public access), CORS (control cross-origin access), Access Logging (audit access). Best practice: Encrypt by default, use least privilege, enable versioning, block public access unless needed.

---

## G) Common Mistakes

### Mistake 1: Public Bucket Access

```javascript
// ❌ WRONG - Public access
const policy = {
  Effect: 'Allow',
  Principal: '*',
  Action: 's3:*',
  Resource: '*'
};
// Security risk, data exposure

// ✅ CORRECT - Restrict access
const policy = {
  Effect: 'Allow',
  Principal: {
    AWS: 'arn:aws:iam::account:user/specific-user'
  },
  Action: 's3:GetObject',
  Resource: 'arn:aws:s3:::bucket/specific-path/*'
};
```

**Why it breaks:** Public access exposes data, security risk, potential data breaches.

---

## H) When to Use & When NOT to Use

Use S3 for: File storage, backups, static website hosting, data archiving, content delivery, when need object storage. Don't use when: Need file system (use EFS), need database (use RDS), need block storage (use EBS).

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain AWS S3."

**You:"
"AWS S3 is object storage service. Components: Buckets (containers), Objects (files), Keys (paths), Regions, Storage Classes. Features: High durability (11 9's), unlimited scalability, 99.99% availability, encryption, versioning.

Storage classes: STANDARD (frequent), STANDARD_IA (infrequent), GLACIER (archive), DEEP_ARCHIVE (rarely accessed). Use lifecycle policies to automate transitions. Secure with bucket policies, encryption, IAM. Use for file storage, backups, static websites, archiving."

---

## J) Mini Practice Task

Practice: Create buckets, upload/download objects, use presigned URLs, configure storage classes, set lifecycle policies, enable versioning, configure CORS, set bucket policies, enable static website hosting.

---

**END OF TOPIC: AWS S3**

