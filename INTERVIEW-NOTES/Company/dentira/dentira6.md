# DENTIRA INTERVIEW PREPARATION - PART 6
## HTTP Fundamentals

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**HTTP kya hai?**
- HTTP = HyperText Transfer Protocol
- Web ka communication protocol
- Client-server communication
- Request-response model
- Stateless protocol

**HTTP Basics:**
- **Client:** Browser ya application (request bhejta hai)
- **Server:** Web server (response deta hai)
- **Request:** Client se server ko message
- **Response:** Server se client ko message

**Real-life Analogy:**
- HTTP = Restaurant mein order system
- Client = Customer (order deta hai)
- Server = Kitchen (order process karta hai)
- Request = Order slip
- Response = Food delivery

### HTTP Request Structure

**Request Components:**
```
GET /api/users HTTP/1.1
Host: api.example.com
Authorization: Bearer token123
Content-Type: application/json
Accept: application/json

{
  "name": "John"
}
```

**1. Request Line:**
- Method (GET, POST, PUT, DELETE)
- URL path (/api/users)
- HTTP Version (HTTP/1.1)

**2. Headers:**
- Metadata about request
- Authorization, Content-Type, etc.

**3. Body (Optional):**
- Data (POST, PUT requests)

### HTTP Response Structure

**Response Components:**
```
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 123
Date: Mon, 01 Jan 2024 12:00:00 GMT

{
  "id": "123",
  "name": "John"
}
```

**1. Status Line:**
- HTTP Version
- Status Code (200, 404, 500)
- Status Text (OK, Not Found)

**2. Headers:**
- Metadata about response
- Content-Type, Content-Length, etc.

**3. Body:**
- Actual data

---

## B) HTTP Methods

### GET

**Purpose:**
- Retrieve data
- Idempotent (same request = same result)
- Safe (no side effects)

**Example:**
```http
GET /api/users/123 HTTP/1.1
Host: api.example.com
```

**Characteristics:**
- No request body
- Can be cached
- Parameters in URL

### POST

**Purpose:**
- Create resource
- Not idempotent (multiple calls = different results)
- Has side effects

**Example:**
```http
POST /api/users HTTP/1.1
Host: api.example.com
Content-Type: application/json

{
  "name": "John",
  "email": "john@example.com"
}
```

**Characteristics:**
- Has request body
- Not cacheable
- Creates new resource

### PUT

**Purpose:**
- Update/replace resource
- Idempotent
- Full resource update

**Example:**
```http
PUT /api/users/123 HTTP/1.1
Host: api.example.com
Content-Type: application/json

{
  "name": "Jane",
  "email": "jane@example.com"
}
```

**Characteristics:**
- Has request body
- Idempotent
- Replaces entire resource

### PATCH

**Purpose:**
- Partial update
- Idempotent
- Update specific fields

**Example:**
```http
PATCH /api/users/123 HTTP/1.1
Host: api.example.com
Content-Type: application/json

{
  "name": "Jane"
}
```

**Characteristics:**
- Has request body
- Partial update
- More efficient than PUT

### DELETE

**Purpose:**
- Delete resource
- Idempotent
- Remove resource

**Example:**
```http
DELETE /api/users/123 HTTP/1.1
Host: api.example.com
```

**Characteristics:**
- Usually no body
- Idempotent
- Removes resource

---

## C) HTTP Status Codes

### 2xx Success

**200 OK:**
- Request successful
- Response contains data
- Most common success code

**201 Created:**
- Resource created
- Location header with new resource URL
- POST requests

**204 No Content:**
- Request successful
- No response body
- DELETE requests

### 3xx Redirection

**301 Moved Permanently:**
- Resource moved permanently
- New URL in Location header

**302 Found (Temporary Redirect):**
- Resource temporarily moved
- Redirect to new location

**304 Not Modified:**
- Resource not changed
- Use cached version
- Conditional requests

### 4xx Client Error

**400 Bad Request:**
- Invalid request syntax
- Validation errors
- Client mistake

**401 Unauthorized:**
- Authentication required
- Missing or invalid credentials
- Login required

**403 Forbidden:**
- Authenticated but not authorized
- Permission denied
- Access restricted

**404 Not Found:**
- Resource doesn't exist
- Invalid URL
- Most common error

**409 Conflict:**
- Resource conflict
- Duplicate entry
- State conflict

**422 Unprocessable Entity:**
- Validation failed
- Semantic errors
- Business rule violation

### 5xx Server Error

**500 Internal Server Error:**
- Server error
- Unexpected error
- Generic server error

**502 Bad Gateway:**
- Invalid response from upstream
- Gateway issue
- Proxy error

**503 Service Unavailable:**
- Service temporarily unavailable
- Maintenance mode
- Overloaded server

---

## D) HTTP Headers

### Request Headers

**Authorization:**
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Content-Type:**
```http
Content-Type: application/json
Content-Type: application/x-www-form-urlencoded
Content-Type: multipart/form-data
```

**Accept:**
```http
Accept: application/json
Accept: application/json, text/html
```

**User-Agent:**
```http
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)
```

**Cache-Control:**
```http
Cache-Control: no-cache
Cache-Control: max-age=3600
```

### Response Headers

**Content-Type:**
```http
Content-Type: application/json; charset=utf-8
```

**Content-Length:**
```http
Content-Length: 1234
```

**Location:**
```http
Location: /api/users/123
```

**Set-Cookie:**
```http
Set-Cookie: sessionId=abc123; Path=/; HttpOnly; Secure
```

**Cache-Control:**
```http
Cache-Control: public, max-age=3600
```

**ETag:**
```http
ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"
```

---

## E) HTTP/1.1 vs HTTP/2

### HTTP/1.1

**Characteristics:**
- Text-based protocol
- One request per connection
- Head-of-line blocking
- Multiple connections needed

**Limitations:**
- Slow for multiple resources
- Connection overhead
- No server push

### HTTP/2

**Characteristics:**
- Binary protocol
- Multiplexing (multiple requests on one connection)
- Header compression
- Server push
- Stream prioritization

**Benefits:**
- Faster page loads
- Reduced latency
- Better resource utilization
- Backward compatible

---

## F) HTTPS (HTTP Secure)

### What is HTTPS?

**HTTPS = HTTP + TLS/SSL:**
- Encrypted communication
- Data security
- Authentication
- Integrity protection

**How it Works:**
1. Client requests HTTPS connection
2. Server sends certificate
3. Client verifies certificate
4. Encrypted connection established
5. Secure data transfer

**Benefits:**
- Data encryption
- Authentication
- Data integrity
- Trust and security

---

## G) Caching

### HTTP Caching

**Cache-Control Header:**
```http
Cache-Control: public, max-age=3600
Cache-Control: private, no-cache
Cache-Control: no-store
```

**ETag:**
```http
ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"

If-None-Match: "33a64df551425fcc55e4d42a148795d9f25f89d4"
```

**Last-Modified:**
```http
Last-Modified: Mon, 01 Jan 2024 12:00:00 GMT

If-Modified-Since: Mon, 01 Jan 2024 12:00:00 GMT
```

### Caching Strategies

**1. Browser Caching:**
- Cache-Control headers
- Expires header
- ETag validation

**2. CDN Caching:**
- Edge servers
- Geographic distribution
- Reduced latency

**3. Application Caching:**
- Redis/Memcached
- In-memory cache
- API response caching

---

## H) Interview Questions - Part 6

**Q1: "Explain HTTP request-response cycle"**

✅ **Answer:**
"HTTP follows a request-response model:

**1. Client sends request:**
- HTTP method (GET, POST, etc.)
- URL path
- Headers (Authorization, Content-Type)
- Optional body (for POST/PUT)

**2. Server processes request:**
- Parses request
- Validates authentication
- Executes business logic
- Queries database

**3. Server sends response:**
- Status code (200, 404, 500)
- Headers (Content-Type, Cache-Control)
- Response body (JSON, HTML, etc.)

**4. Client receives response:**
- Parses response
- Renders data
- Caches if applicable

The protocol is stateless - each request is independent, no server-side session state."

**Q2: "Difference between PUT and PATCH?"**

✅ **Answer:**
"PUT is for full resource replacement:
- Sends entire resource
- Replaces all fields
- Idempotent
- Use when updating entire resource

PATCH is for partial updates:
- Sends only changed fields
- Updates specific fields
- Idempotent
- More efficient for partial updates

**Example:**
```http
PUT /api/users/123
{ "name": "Jane", "email": "jane@example.com", "age": 30 }

PATCH /api/users/123
{ "name": "Jane" }
```

In practice, I use PATCH for most updates as it's more efficient and follows REST best practices."

**Q3: "Explain HTTP status codes"**

✅ **Answer:**
"HTTP status codes indicate request result:

**2xx Success:**
- 200 OK: Request successful
- 201 Created: Resource created
- 204 No Content: Success, no body

**3xx Redirection:**
- 301: Permanent redirect
- 302: Temporary redirect
- 304: Not modified (use cache)

**4xx Client Error:**
- 400: Bad request (validation error)
- 401: Unauthorized (not authenticated)
- 403: Forbidden (not authorized)
- 404: Not found
- 409: Conflict

**5xx Server Error:**
- 500: Internal server error
- 502: Bad gateway
- 503: Service unavailable

Using correct status codes is crucial for API clarity and proper error handling."

**Q4: "What is HTTPS and why is it important?"**

✅ **Answer:**
"HTTPS is HTTP over TLS/SSL encryption:

**Benefits:**
1. **Encryption:** Data encrypted in transit
2. **Authentication:** Verifies server identity
3. **Integrity:** Prevents data tampering
4. **Trust:** Users trust secure connections

**How it works:**
- Client requests HTTPS
- Server sends SSL certificate
- Client verifies certificate
- Encrypted connection established
- All data encrypted

**Why important:**
- Protects sensitive data (passwords, credit cards)
- Required for modern web
- SEO benefits
- User trust
- Prevents man-in-the-middle attacks

All production APIs should use HTTPS."

---

## I) Key Takeaways

### Must Know:
1. ✅ HTTP request-response structure
2. ✅ HTTP methods (GET, POST, PUT, PATCH, DELETE)
3. ✅ Status codes (2xx, 3xx, 4xx, 5xx)
4. ✅ Important headers
5. ✅ HTTPS and security
6. ✅ Caching strategies

### Next Steps:
- Read dentira7.md for Event-Driven Architecture
- Understand HTTP/2 features
- Practice with HTTP tools (Postman, curl)

---

**End of Part 6 - Continue to dentira7.md**

