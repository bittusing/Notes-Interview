# COMPANY-SPECIFIC SYSTEM DESIGN SCENARIOS

--------------------------------

## 🏢 7 Company System Design Scenarios for Practice

---

## 1. DESIGN AMAZON - E-COMMERCE PLATFORM

### Scenario
Design an e-commerce platform like Amazon that handles:
- Product catalog (billions of products)
- User accounts and authentication
- Shopping cart
- Order processing
- Payment processing
- Product recommendations
- Search functionality
- Reviews and ratings
- 300M+ users, 10M products, 1M orders/day

### Requirements Clarification
**Functional:**
- Browse products by category
- Search products
- Add to cart, checkout
- Order management
- Payment processing
- Product recommendations
- Reviews and ratings
- Wishlist

**Non-Functional:**
- High availability (99.99%)
- Low latency (<200ms for search)
- Handle traffic spikes (Black Friday)
- Global distribution
- Secure payment processing

**Scale:**
- 300M users, 50M DAU
- 10M products
- 1M orders/day
- 100K searches/second (peak)

### High-Level Design

**Components:**
1. **API Gateway** - Single entry point, routing, auth, rate limiting
2. **User Service** - Authentication, profiles, preferences
3. **Product Service** - Product catalog, categories, inventory
4. **Search Service** - Product search (Elasticsearch)
5. **Cart Service** - Shopping cart (Redis)
6. **Order Service** - Order processing, order history
7. **Payment Service** - Payment processing, payment gateway integration
8. **Recommendation Service** - Product recommendations (ML)
9. **Review Service** - Reviews, ratings
10. **Notification Service** - Email, SMS, push notifications

**Data Flow:**
- User → API Gateway → Services → Database/Cache → Response
- Search → Elasticsearch → Results
- Cart → Redis → Session storage
- Orders → Database → Payment Gateway → Confirmation

**Database:**
- Users: MySQL (sharded by user_id)
- Products: MySQL (sharded by category_id)
- Orders: MySQL (sharded by order_id, time-based)
- Search: Elasticsearch (product search)
- Cart: Redis (session-based)
- Cache: Redis (hot products, recommendations)

**Key Decisions:**
- Microservices architecture (independent scaling)
- CQRS for search (separate read/write models)
- Event-driven for order processing
- CDN for product images
- Message queue for async operations (notifications, recommendations)

### Detailed Design

**Product Catalog:**
- Database: MySQL (sharded by category)
- Cache: Redis (hot products, categories)
- Images: S3 + CDN
- Search: Elasticsearch (product name, description, category)

**Shopping Cart:**
- Storage: Redis (session-based, TTL: 30 days)
- Structure: `cart:{user_id}` → {product_id, quantity, price}
- Expiration: 30 days idle
- Checkout: Move to Order Service

**Order Processing:**
1. Validate cart
2. Reserve inventory
3. Create order (pending)
4. Process payment
5. Update inventory
6. Send confirmation
7. Update order status

**Search:**
- Elasticsearch: Product index (name, description, category, price)
- Ranking: Relevance score + popularity + ratings
- Filters: Category, price range, ratings, availability
- Autocomplete: N-gram analysis

**Recommendations:**
- Collaborative filtering (user-item matrix)
- Content-based (similar products)
- ML model (neural networks)
- Cached per user (Redis, TTL: 1 hour)

### Scale & Optimize

**Bottlenecks:**
- Product search (use Elasticsearch, caching)
- Checkout (database locking → optimistic locking)
- Payment (async processing, queue)
- Recommendations (pre-compute, cache)

**Optimizations:**
- CDN for static assets (product images)
- Caching hot products, categories
- Database read replicas
- Sharding by user_id, category_id
- Message queues for async tasks

### Practice Questions
1. How do you handle inventory for popular products during flash sales?
2. How do you ensure payment security?
3. How do you handle product catalog updates across distributed systems?
4. How do you implement real-time product recommendations?
5. How do you handle order cancellation and refunds?

---

## 2. DESIGN FACEBOOK/META - SOCIAL MEDIA PLATFORM

### Scenario
Design a social media platform like Facebook:
- User profiles and authentication
- Friend connections
- News feed (personalized)
- Posts, photos, videos
- Likes, comments, shares
- Real-time notifications
- 2B+ users, 1.5B DAU, 4.75B posts/day

### Requirements Clarification
**Functional:**
- User registration, profiles
- Friend requests, connections
- Create posts (text, photo, video)
- News feed (chronological + algorithmic)
- Like, comment, share
- Real-time notifications
- Messenger (1-on-1, groups)

**Non-Functional:**
- Low latency feed (<500ms)
- High availability
- Real-time updates
- Global distribution
- Media storage and delivery

**Scale:**
- 2B users, 1.5B DAU
- 4.75B posts/day
- 150B friend connections
- 10B+ photos/videos/day

### High-Level Design

**Components:**
1. **User Service** - Authentication, profiles, friends
2. **Post Service** - Create posts, posts feed
3. **News Feed Service** - Personalized feed generation
4. **Media Service** - Photo/video upload, storage
5. **Interaction Service** - Likes, comments, shares
6. **Notification Service** - Real-time notifications
7. **Graph Service** - Social graph (friends, connections)
8. **Search Service** - Search users, posts

**Data Flow:**
- Post creation → Post Service → Fan-out to followers → News Feed cache
- News feed request → Check cache → Generate if missing → Return
- Like/comment → Interaction Service → Notify author → Update counters

**Database:**
- Users: MySQL (sharded by user_id)
- Posts: MySQL (sharded by user_id, time-based)
- Social Graph: Graph database (Neo4j) or MySQL with adjacency list
- News Feed: Cassandra or custom in-memory store
- Media: Object storage (S3) + CDN
- Cache: Redis (news feed, hot posts, counters)

**Key Decisions:**
- Fan-out on write (pre-compute feed)
- Write-heavy workload (many posts)
- Graph database for social connections
- CDN for media delivery
- Real-time updates (WebSocket/push)

### Detailed Design

**News Feed Generation:**
- **Fan-out on write:** Post created → Fan-out to all followers' feed caches
- **Pull on read:** If cache miss, generate from recent posts
- **Hybrid:** Fan-out for active users, pull for inactive
- Cache structure: `feed:{user_id}` → List of post_ids

**Social Graph:**
- Storage: Graph database (Neo4j) or MySQL adjacency list
- Query: Get friends (1-hop), friends of friends (2-hop)
- Optimization: Pre-compute for active users, cache frequently accessed

**Post Storage:**
- MySQL (sharded by user_id, time)
- Hot posts in cache (Redis)
- Media metadata separate from files
- Media files: S3 + CDN

**Real-time Notifications:**
- WebSocket for online users
- Push notifications for offline
- Notification queue (Kafka)
- Delivery: Prioritize online users

### Scale & Optimize

**Bottlenecks:**
- News feed generation (fan-out is expensive for influencers)
- Social graph queries (pre-compute, cache)
- Media delivery (CDN)
- Real-time notifications (queue, batch)

**Optimizations:**
- Fan-out only for active followers
- Batch fan-out (not real-time)
- Separate feeds for active/inactive users
- CDN for all media
- Graph partitioning

### Practice Questions
1. How do you handle news feed for users with millions of friends (celebrities)?
2. How do you implement real-time notifications efficiently?
3. How do you handle media upload and delivery at scale?
4. How do you ensure news feed freshness vs performance?
5. How do you handle viral posts (sudden traffic spike)?

---

## 3. DESIGN UBER - RIDE-SHARING PLATFORM

### Scenario
Design a ride-sharing platform like Uber:
- Real-time driver matching
- Location tracking (GPS)
- Ride booking and management
- Pricing calculation (surge pricing)
- Payment processing
- Rating system
- ETA calculation
- 100M+ users, 5M drivers, 10M rides/day

### Requirements Clarification
**Functional:**
- User/driver registration
- Real-time location tracking
- Ride request and matching
- Driver dispatch
- Ride tracking (live location)
- Pricing calculation (base + surge + distance)
- Payment processing
- Rating system
- Trip history

**Non-Functional:**
- Real-time matching (<30 seconds)
- Low latency location updates (<5 seconds)
- High availability
- Global distribution
- Handle peak hours (rush hours)

**Scale:**
- 100M users, 20M active/month
- 5M drivers, 1M active/day
- 10M rides/day
- 1M location updates/second

### High-Level Design

**Components:**
1. **User Service** - User/driver profiles, authentication
2. **Location Service** - GPS tracking, geospatial queries
3. **Matching Service** - Ride-driver matching algorithm
4. **Pricing Service** - Price calculation (surge pricing)
5. **Ride Service** - Ride booking, ride management
6. **Payment Service** - Payment processing
7. **Notification Service** - Push notifications
8. **Analytics Service** - ETA, traffic data

**Data Flow:**
- Location update → Location Service → Geospatial index → Available for matching
- Ride request → Matching Service → Find nearby drivers → Dispatch → Confirm
- Ride progress → Location Service → Update ride status → Notify user

**Database:**
- Users: MySQL (sharded by user_id)
- Rides: MySQL (sharded by ride_id, time-based)
- Locations: In-memory (Redis GeoHash) + PostgreSQL (PostGIS)
- Pricing: Redis (surge multipliers, cached)
- Cache: Redis (active rides, driver locations)

**Key Decisions:**
- Geospatial indexing for driver location
- Real-time matching algorithm (proximity, availability)
- Surge pricing (dynamic, demand-based)
- WebSocket for real-time updates
- Event-driven for ride lifecycle

### Detailed Design

**Location Tracking:**
- **Driver location:** WebSocket updates (every 5 seconds), store in Redis GeoHash
- **Geospatial queries:** Find drivers within radius (e.g., 5km)
- **Geospatial index:** Redis GeoHash or PostGIS
- **Structure:** `driver:location:{driver_id}` → {lat, lng, timestamp}

**Matching Algorithm:**
1. User requests ride (pickup location)
2. Find available drivers within radius (e.g., 5km)
3. Filter by driver status (available, not in ride)
4. Rank by distance (closest first)
5. Consider driver rating, ETA
6. Dispatch to best driver
7. If no response in 30s, try next driver

**Pricing Calculation:**
- Base price: Distance × base rate
- Surge pricing: multiplier (1x-5x) based on demand/supply ratio
- Time-based: Peak hours multiplier
- Surge calculation: Demand/supply in area, update every 5 minutes
- Cached in Redis per area

**Ride Lifecycle:**
1. Request ride → Matching → Driver accepts
2. Driver arrives → Start ride → Track location
3. Ride in progress → Update location (every 5s)
4. Ride ends → Calculate price → Process payment → Rating

### Scale & Optimize

**Bottlenecks:**
- Location updates (high volume, use Redis)
- Geospatial queries (use proper indexing)
- Matching (optimize algorithm, cache results)
- Surge pricing (real-time calculation → cache)

**Optimizations:**
- GeoHash for location indexing
- Batch location updates (not every driver)
- Pre-filter drivers (availability cache)
- Surge pricing cache (5-minute TTL)
- Partition by geographic regions

### Practice Questions
1. How do you handle matching during peak hours (high demand, low supply)?
2. How do you ensure accurate ETA calculation?
3. How do you handle driver location updates at scale?
4. How do you implement surge pricing fairly?
5. How do you handle concurrent ride requests from same location?

---

## 4. DESIGN NETFLIX - VIDEO STREAMING PLATFORM

### Scenario
Design a video streaming platform like Netflix:
- Video upload and storage
- Video streaming (adaptive bitrate)
- User accounts and profiles
- Content recommendation
- Search functionality
- Multiple devices
- Global distribution
- 200M+ subscribers, 2B+ hours watched/day

### Requirements Clarification
**Functional:**
- User registration, profiles
- Browse content (categories, genres)
- Search movies/shows
- Video streaming (play, pause, resume)
- Recommendations
- Watch history
- Multiple profiles per account
- Download for offline viewing

**Non-Functional:**
- Low latency streaming (<5 seconds to start)
- High availability (99.99%)
- Global distribution
- Handle concurrent streams
- Multiple quality levels (1080p, 4K)

**Scale:**
- 200M subscribers, 100M DAU
- 2B+ hours watched/day
- 10K+ titles
- 1M+ concurrent streams (peak)

### High-Level Design

**Components:**
1. **User Service** - Authentication, profiles, subscriptions
2. **Content Service** - Catalog, metadata, search
3. **Video Service** - Video processing, encoding
4. **Streaming Service** - Video delivery (CDN)
5. **Recommendation Service** - Content recommendations (ML)
6. **Analytics Service** - Watch history, viewing patterns
7. **Search Service** - Content search (Elasticsearch)

**Data Flow:**
- Video upload → Processing → Encoding (multiple qualities) → CDN
- Play request → CDN → Select quality → Stream
- Watch progress → Analytics → Update history → Improve recommendations

**Database:**
- Users: MySQL (sharded by user_id)
- Content: MySQL (catalog metadata)
- Watch History: Cassandra (time-series, high writes)
- Search: Elasticsearch (content search)
- Cache: Redis (hot content, user preferences)

**Storage:**
- Video files: Object storage (S3) → CDN (CloudFront, Akamai)
- Multiple encodings: 480p, 720p, 1080p, 4K
- Adaptive bitrate: HLS or DASH

**Key Decisions:**
- CDN for all video delivery (edge servers)
- Adaptive bitrate streaming (quality based on bandwidth)
- Pre-encoding all qualities (storage vs processing)
- Recommendation engine (ML, collaborative filtering)
- Regional content libraries

### Detailed Design

**Video Processing:**
1. Upload video → Storage (S3)
2. Processing: Encode to multiple qualities (480p, 720p, 1080p, 4K)
3. Create manifest file (HLS/DASH)
4. Upload to CDN
5. Update catalog with metadata

**Streaming Protocol:**
- **Adaptive Bitrate:** HLS or DASH
- **Manifest file:** Lists available qualities, chunks
- **Player:** Requests chunks based on bandwidth
- **Quality selection:** Auto-adjust based on network

**CDN Strategy:**
- Edge servers globally (close to users)
- Cache popular content at edge
- Origin server only for cache miss
- Regional caching (popular content per region)

**Recommendations:**
- Collaborative filtering (user-item matrix)
- Content-based (similar content)
- Deep learning (neural networks)
- Pre-compute per user (batch, hourly)
- Cache recommendations (Redis)

**Search:**
- Elasticsearch: Content index (title, description, cast, genre)
- Ranking: Relevance + popularity + personalization
- Filters: Genre, year, rating, type (movie/show)

### Scale & Optimize

**Bottlenecks:**
- Video delivery (CDN solves this)
- Recommendation computation (pre-compute, cache)
- Search (Elasticsearch, caching)
- Watch history writes (Cassandra for high writes)

**Optimizations:**
- CDN for all video (reduce origin load)
- Pre-encoding (storage over processing time)
- Caching hot content at edge
- Batch recommendation updates
- Regional content libraries (reduce data transfer)

### Practice Questions
1. How do you handle video streaming for users with poor internet?
2. How do you ensure video quality while optimizing bandwidth?
3. How do you handle content licensing (regional restrictions)?
4. How do you implement personalized recommendations efficiently?
5. How do you handle concurrent streams from same account?

---

## 5. DESIGN SPOTIFY - MUSIC STREAMING PLATFORM

### Scenario
Design a music streaming platform like Spotify:
- Music catalog and search
- Music streaming (audio)
- Playlists (user-created, curated)
- Recommendations
- Social features (follow artists, share playlists)
- Offline playback
- 400M+ users, 180M premium, 70M tracks

### Requirements Clarification
**Functional:**
- User registration, authentication
- Browse music (genres, artists, albums)
- Search songs, artists, playlists
- Play music (streaming)
- Create/manage playlists
- Follow artists, users
- Discover Weekly (personalized playlists)
- Offline download

**Non-Functional:**
- Low latency playback (<2 seconds to start)
- High availability
- Global distribution
- Handle concurrent streams
- Audio quality (128kbps, 320kbps)

**Scale:**
- 400M users, 180M premium
- 70M tracks
- 40B+ playlists
- 100M+ concurrent streams (peak)

### High-Level Design

**Components:**
1. **User Service** - Authentication, profiles, preferences
2. **Music Service** - Catalog, metadata, search
3. **Streaming Service** - Audio delivery (CDN)
4. **Playlist Service** - Playlist management
5. **Recommendation Service** - Music recommendations (ML)
6. **Social Service** - Follow artists, share playlists
7. **Search Service** - Music search (Elasticsearch)

**Data Flow:**
- Play request → CDN → Stream audio
- Playlist creation → Playlist Service → Store → Update cache
- Recommendation request → Recommendation Service → Return curated list

**Database:**
- Users: MySQL (sharded by user_id)
- Music Catalog: MySQL (tracks, artists, albums)
- Playlists: MySQL (user playlists, curated playlists)
- Search: Elasticsearch (track, artist, album search)
- Cache: Redis (hot tracks, playlists, recommendations)

**Storage:**
- Audio files: Object storage (S3) → CDN
- Multiple qualities: 128kbps, 320kbps (premium)
- Formats: MP3, OGG Vorbis

**Key Decisions:**
- CDN for audio delivery
- Pre-encoding (storage vs processing)
- Recommendation engine (collaborative filtering, audio features)
- Offline: Encrypted download, DRM

### Detailed Design

**Music Catalog:**
- Tracks: ID, title, artist, album, duration, genre, audio_file_url
- Artists: ID, name, bio, image, followers
- Albums: ID, title, artist, release_date, tracks, cover_image

**Streaming:**
- Audio files stored in S3
- CDN delivery (CloudFront, Akamai)
- Streaming protocol: Progressive download or HTTP Live Streaming
- Quality selection: Based on subscription (free: 128kbps, premium: 320kbps)

**Playlists:**
- User playlists: Stored per user, track list (order matters)
- Curated playlists: Editor-created, globally available
- Structure: Playlist → List of track_ids (ordered)
- Cache hot playlists (Redis)

**Recommendations:**
- **Collaborative filtering:** User-item matrix (user listening history)
- **Audio features:** Analyze audio (tempo, energy, valence)
- **Discover Weekly:** Generate weekly playlist per user (ML model)
- Pre-compute (batch, daily/weekly)
- Cache per user (Redis)

**Search:**
- Elasticsearch: Track, artist, album index
- Ranking: Relevance + popularity + personalization
- Autocomplete: N-gram analysis
- Filters: Genre, year, popularity

### Scale & Optimize

**Bottlenecks:**
- Audio delivery (CDN solves this)
- Recommendation computation (pre-compute, cache)
- Search (Elasticsearch, caching)
- Playlist management (cache hot playlists)

**Optimizations:**
- CDN for all audio (reduce origin load)
- Pre-encoding (storage over processing)
- Caching hot tracks, playlists
- Batch recommendation updates
- Pre-generated playlists (Discover Weekly)

### Practice Questions
1. How do you handle music recommendations for new users (cold start)?
2. How do you implement offline playback with DRM?
3. How do you handle royalty payments to artists?
4. How do you ensure smooth playback despite network fluctuations?
5. How do you handle playlist sharing and collaboration?

---

## 6. DESIGN LINKEDIN - PROFESSIONAL NETWORKING

### Scenario
Design a professional networking platform like LinkedIn:
- User profiles (resume-like)
- Connections (professional network)
- Feed (professional updates)
- Job postings and applications
- Messaging (InMail)
- Company pages
- 800M+ users, 200M DAU

### Requirements Clarification
**Functional:**
- User profiles (experience, education, skills)
- Connections (send/accept requests)
- Feed (updates from connections, companies)
- Job postings (search, apply)
- Messaging (1-on-1, group)
- Company pages
- Recommendations (people, jobs)
- Endorsements and skills

**Non-Functional:**
- Low latency feed (<500ms)
- High availability
- Search functionality
- Real-time messaging

**Scale:**
- 800M users, 200M DAU
- 10M+ companies
- 30M+ jobs
- 100B+ connections

### High-Level Design

**Components:**
1. **User Service** - Profiles, authentication
2. **Connection Service** - Friend requests, connections (social graph)
3. **Feed Service** - Feed generation (professional updates)
4. **Job Service** - Job postings, applications
5. **Company Service** - Company pages, employees
6. **Messaging Service** - 1-on-1, InMail
7. **Search Service** - Search users, jobs, companies
8. **Recommendation Service** - People you may know, job recommendations

**Data Flow:**
- Profile update → User Service → Notify connections → Update feed cache
- Job application → Job Service → Notify employer → Update application status
- Feed request → Feed Service → Check cache → Generate if missing → Return

**Database:**
- Users: MySQL (sharded by user_id)
- Connections: Graph database (Neo4j) or MySQL adjacency list
- Feed: Cassandra or in-memory (Redis)
- Jobs: MySQL (sharded by job_id, company_id)
- Messages: MySQL (conversations, messages)
- Search: Elasticsearch (users, jobs, companies)

**Key Decisions:**
- Graph database for professional network
- Fan-out feed (pre-compute for active users)
- Search (Elasticsearch for users, jobs)
- Recommendations (ML for people, jobs)

### Detailed Design

**Social Graph:**
- Storage: Graph database (Neo4j) for connections
- Queries: 1st connections, 2nd connections, mutual connections
- Optimization: Cache connections for active users

**Feed Generation:**
- Fan-out on write: Update → Fan-out to connections' feed cache
- Content: Posts, job updates, profile updates, company updates
- Ranking: Relevance (connection strength, engagement, recency)
- Cache: `feed:{user_id}` → List of update_ids

**Job Matching:**
- Job postings: Title, description, requirements, location, salary
- User profile: Skills, experience, education, location
- Matching: Skills match, experience match, location match
- Recommendations: ML model (collaborative filtering + content-based)

**Search:**
- Elasticsearch: Users (name, title, company, skills), Jobs (title, company, location), Companies (name, industry)
- Ranking: Relevance + popularity + personalization
- Filters: Location, industry, experience level, job type

### Scale & Optimize

**Bottlenecks:**
- Social graph queries (graph database, caching)
- Feed generation (fan-out expensive, optimize)
- Search (Elasticsearch, caching)
- Job matching (pre-compute, cache)

**Optimizations:**
- Graph partitioning
- Fan-out only for active users
- Cache hot feeds, connections
- Pre-compute job matches
- CDN for profile images

### Practice Questions
1. How do you handle feed generation for users with thousands of connections?
2. How do you implement job matching efficiently?
3. How do you handle privacy settings (who can see what)?
4. How do you implement "People you may know" recommendations?
5. How do you handle search across users, jobs, and companies?

---

## 7. DESIGN WHATSAPP - MESSAGING PLATFORM

### Scenario
Design a messaging platform like WhatsApp:
- Real-time messaging (1-on-1, groups)
- Media sharing (photos, videos, documents)
- Voice/video calls
- Status updates (stories, 24 hours)
- End-to-end encryption
- 2B+ users, 100B+ messages/day

### Requirements Clarification
**Functional:**
- User registration (phone number)
- 1-on-1 messaging
- Group messaging (up to 256 members)
- Media sharing (photos, videos, files)
- Voice/video calls
- Status updates (stories, 24 hours)
- Read receipts, delivery receipts
- Message search

**Non-Functional:**
- Real-time delivery (<1 second)
- High availability (99.99%)
- End-to-end encryption
- Offline message delivery
- Low bandwidth usage

**Scale:**
- 2B+ users, 1.5B DAU
- 100B+ messages/day
- 1B+ groups
- 2B+ voice/video calls/day

### High-Level Design

**Components:**
1. **User Service** - Authentication (phone number), profiles
2. **Message Service** - Message storage, delivery
3. **Real-time Service** - WebSocket connections, message routing
4. **Media Service** - Media upload, storage, delivery
5. **Call Service** - Voice/video calls (WebRTC)
6. **Status Service** - Status updates (stories)
7. **Notification Service** - Push notifications (offline users)

**Data Flow:**
- Send message → Message Service → Store → Real-time Service → Deliver (WebSocket/push)
- Media upload → Media Service → Storage (S3) → Return URL → Message Service
- Call request → Call Service → WebRTC signaling → Establish connection

**Database:**
- Users: MySQL (sharded by phone number)
- Messages: MySQL (sharded by conversation_id, time-based)
- Conversations: MySQL (1-on-1, groups)
- Media: Object storage (S3) + CDN
- Cache: Redis (online users, message cache)

**Key Decisions:**
- WebSocket for real-time delivery
- Message queue for offline delivery
- End-to-end encryption (client-side)
- Media compression and optimization
- Group messaging (fan-out to all members)

### Detailed Design

**Messaging:**
- **1-on-1:** Store messages in conversation table
- **Group:** Fan-out to all members, store once
- **Structure:** Message (id, conversation_id, sender_id, content, timestamp, media_url)
- **Delivery:** WebSocket if online, push notification if offline
- **Storage:** Sharded by conversation_id, time-based partitioning

**Real-time Delivery:**
- WebSocket connections per user
- Message arrives → Check online status → Deliver via WebSocket
- If offline → Queue in message queue → Push notification
- Connection management: User ID → WebSocket connection mapping (Redis)

**Media Handling:**
- Upload: Client → Media Service → S3 → Return URL
- Delivery: CDN for photos/videos, direct download for documents
- Compression: Photos (reduce size), Videos (multiple qualities)
- Structure: Media (id, url, type, size, thumbnail_url)

**Group Messaging:**
- Group: ID, name, members, created_by, created_at
- Message delivery: Fan-out to all members (parallel)
- Online members: WebSocket delivery
- Offline members: Push notification
- Optimization: Batch delivery, compression

**End-to-end Encryption:**
- Client-side encryption (Signal Protocol)
- Server never sees plaintext
- Key exchange: Out-of-band (QR code, in-person)
- Encryption: AES-256

### Scale & Optimize

**Bottlenecks:**
- WebSocket connections (horizontal scaling, load balancer)
- Message delivery (parallel fan-out)
- Media delivery (CDN)
- Group messaging (fan-out expensive for large groups)

**Optimizations:**
- WebSocket connection pooling
- Message batching (group messages)
- CDN for all media
- Compression (message, media)
- Sharding by conversation_id

### Practice Questions
1. How do you handle message delivery when recipient is offline?
2. How do you implement end-to-end encryption at scale?
3. How do you handle group messaging with 256 members efficiently?
4. How do you ensure message ordering in group chats?
5. How do you handle media delivery and optimization?

---

## 📝 GENERAL PRACTICE SCENARIOS

### Scenario 8: Design a URL Shortener (TinyURL, bit.ly)
### Scenario 9: Design a Web Crawler
### Scenario 10: Design a Distributed Cache
### Scenario 11: Design a Notification System
### Scenario 12: Design a File Storage System (Dropbox)
### Scenario 13: Design a Chat System
### Scenario 14: Design a Rate Limiter
### Scenario 15: Design a Distributed Lock Service

---

**END OF COMPANY SYSTEM DESIGN SCENARIOS**
