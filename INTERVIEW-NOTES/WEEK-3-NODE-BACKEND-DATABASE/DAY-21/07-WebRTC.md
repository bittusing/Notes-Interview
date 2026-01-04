# WEBRTC

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**WebRTC kya hai?**
- WebRTC peer-to-peer communication protocol hai
- Browser-to-browser direct connection
- Real-time audio/video streaming
- Data transfer bhi possible
- No server in between (direct)

**Real-life Analogy:**
- WebRTC = Direct phone call (peer-to-peer)
- Traditional = Through operator (server)
- Direct connection = Faster, lower latency
- Server = Only for signaling (connection setup)

**WebRTC Components:**
- **Signaling:** Connection setup (via server)
- **STUN/TURN:** NAT traversal
- **Media Streams:** Audio/video
- **Data Channels:** Data transfer
- **Peer Connection:** Direct connection

### WebRTC Architecture

**Connection Flow:**
1. Signaling (server se connection info exchange)
2. ICE candidates exchange
3. Direct peer-to-peer connection
4. Media/data transfer

**Key Concepts:**
- **Offer/Answer:** SDP exchange
- **ICE Candidates:** Network paths
- **STUN Server:** Public IP discovery
- **TURN Server:** Relay if direct connection fails

### WebRTC Use Cases

**Real-time Communication:**
- Video calling
- Voice calling
- Screen sharing
- File sharing
- Gaming
- Remote desktop

---

## B) Easy English Theory

### What is WebRTC?

WebRTC enables peer-to-peer real-time communication (audio, video, data) directly between browsers. No server in media path - only for signaling (connection setup). Components: Signaling (connection setup), STUN/TURN (NAT traversal), Media streams (audio/video), Data channels (data transfer). Use for video calling, voice calling, screen sharing, file transfer.

### Key Concepts

**Signaling:** Exchange connection information via server (offer/answer, ICE candidates)
**STUN:** Discover public IP address for NAT traversal
**TURN:** Relay server if direct connection fails
**Peer Connection:** Direct connection between peers
**Media Streams:** Audio/video streams
**Data Channels:** Bidirectional data transfer

---

## C) Why This Concept Exists

### The Problem

**Without WebRTC:**
- Server in media path (latency)
- Higher bandwidth costs
- Server load
- Slower real-time communication
- Limited scalability

### The Solution

**WebRTC Provides:**
1. **Direct Connection:** Peer-to-peer (low latency)
2. **Efficiency:** No server in media path
3. **Real-time:** Instant communication
4. **Scalability:** Server only for signaling
5. **Quality:** Better audio/video quality

---

## D) Practical Example (Code)

```javascript
// ============================================
// BASIC WEBRTC SETUP (SERVER - SIGNALING)
// ============================================

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Signaling server (only for connection setup)
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  // Join room
  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    socket.to(roomId).emit('user-joined', socket.id);
  });
  
  // Offer exchange
  socket.on('offer', (data) => {
    socket.to(data.target).emit('offer', {
      offer: data.offer,
      sender: socket.id
    });
  });
  
  // Answer exchange
  socket.on('answer', (data) => {
    socket.to(data.target).emit('answer', {
      answer: data.answer,
      sender: socket.id
    });
  });
  
  // ICE candidate exchange
  socket.on('ice-candidate', (data) => {
    socket.to(data.target).emit('ice-candidate', {
      candidate: data.candidate,
      sender: socket.id
    });
  });
});

// ============================================
// CLIENT-SIDE WEBRTC (BROWSER)
// ============================================

/*
// HTML/JavaScript Client Code

const socket = io('http://localhost:3000');
const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');

let localStream;
let peerConnection;
const configuration = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'turn:turnserver.com:3478', username: 'user', credential: 'pass' }
  ]
};

// ============================================
// GET USER MEDIA
// ============================================

async function startLocalStream() {
  try {
    localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    });
    localVideo.srcObject = localStream;
  } catch (error) {
    console.error('Error accessing media:', error);
  }
}

// ============================================
// CREATE PEER CONNECTION
// ============================================

function createPeerConnection() {
  peerConnection = new RTCPeerConnection(configuration);
  
  // Add local stream tracks
  localStream.getTracks().forEach(track => {
    peerConnection.addTrack(track, localStream);
  });
  
  // Receive remote stream
  peerConnection.ontrack = (event) => {
    remoteVideo.srcObject = event.streams[0];
  };
  
  // ICE candidate handling
  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      socket.emit('ice-candidate', {
        target: remoteUserId,
        candidate: event.candidate
      });
    }
  };
}

// ============================================
// OFFER/ANSWER EXCHANGE
// ============================================

// Create offer (caller)
async function createOffer() {
  await createPeerConnection();
  
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  
  socket.emit('offer', {
    target: remoteUserId,
    offer: offer
  });
}

// Handle offer (receiver)
socket.on('offer', async (data) => {
  await createPeerConnection();
  
  await peerConnection.setRemoteDescription(data.offer);
  
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);
  
  socket.emit('answer', {
    target: data.sender,
    answer: answer
  });
});

// Handle answer (caller)
socket.on('answer', async (data) => {
  await peerConnection.setRemoteDescription(data.answer);
});

// ============================================
// ICE CANDIDATE HANDLING
// ============================================

socket.on('ice-candidate', async (data) => {
  await peerConnection.addIceCandidate(data.candidate);
});

// ============================================
// DATA CHANNELS
// ============================================

let dataChannel;

// Create data channel (caller)
function createDataChannel() {
  dataChannel = peerConnection.createDataChannel('messages');
  
  dataChannel.onopen = () => {
    console.log('Data channel open');
  };
  
  dataChannel.onmessage = (event) => {
    console.log('Received:', event.data);
  };
}

// Receive data channel (receiver)
peerConnection.ondatachannel = (event) => {
  dataChannel = event.channel;
  
  dataChannel.onopen = () => {
    console.log('Data channel open');
  };
  
  dataChannel.onmessage = (event) => {
    console.log('Received:', event.data);
  };
};

// Send data
dataChannel.send('Hello from peer!');

// ============================================
// SCREEN SHARING
// ============================================

async function shareScreen() {
  try {
    const screenStream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: true
    });
    
    // Replace video track
    const videoTrack = screenStream.getVideoTracks()[0];
    const sender = peerConnection.getSenders().find(
      s => s.track && s.track.kind === 'video'
    );
    sender.replaceTrack(videoTrack);
  } catch (error) {
    console.error('Error sharing screen:', error);
  }
}

// ============================================
// END CALL
// ============================================

function endCall() {
  peerConnection.close();
  localStream.getTracks().forEach(track => track.stop());
  socket.emit('end-call', { target: remoteUserId });
}
*/

// ============================================
// NODE.JS WEBRTC (WITH WRTC)
// ============================================

// For Node.js server-side WebRTC
const { RTCPeerConnection, RTCSessionDescription } = require('wrtc');

async function createPeerConnectionNode() {
  const pc = new RTCPeerConnection({
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' }
    ]
  });
  
  // Handle ICE candidates
  pc.onicecandidate = (event) => {
    if (event.candidate) {
      // Send to peer via signaling
      sendIceCandidate(event.candidate);
    }
  };
  
  return pc;
}
```

---

## E) Internal Working

**WebRTC Flow:**
1. Signaling: Exchange connection info (offer/answer)
2. ICE: Exchange network paths (candidates)
3. Connection: Direct peer-to-peer established
4. Media: Audio/video streams transferred
5. Data: Data channels for messages

**STUN/TURN:**
- STUN: Discover public IP (NAT traversal)
- TURN: Relay if direct connection fails
- Both needed for NAT/firewall traversal

---

## F) Interview Questions & Answers

### Q1: What is WebRTC and how does it work?

**Answer:**
WebRTC enables peer-to-peer real-time communication (audio, video, data) directly between browsers. Flow: Signaling (exchange connection info via server), ICE candidates (network paths), direct peer connection established, media/data transfer. Server only for signaling, not in media path. Use STUN for NAT traversal, TURN as relay if needed.

### Q2: What is signaling in WebRTC?

**Answer:**
Signaling is exchange of connection information between peers via server. Includes: Offer/Answer (SDP - Session Description Protocol), ICE candidates (network paths). Server only needed for signaling, not for actual media transfer. Can use WebSocket, Socket.io, or any signaling mechanism.

### Q3: What are STUN and TURN servers?

**Answer:**
STUN (Session Traversal Utilities for NAT) discovers public IP address for NAT traversal - helps establish direct connection. TURN (Traversal Using Relays around NAT) is relay server used when direct connection fails (firewall, symmetric NAT). STUN for most cases, TURN as fallback. Both needed for reliable WebRTC connections.

---

## G) Common Mistakes

### Mistake 1: Not Handling ICE Candidates

```javascript
// ❌ WRONG - Missing ICE candidate handling
peerConnection.onicecandidate = null;
// Connection may fail

// ✅ CORRECT - Handle ICE candidates
peerConnection.onicecandidate = (event) => {
  if (event.candidate) {
    socket.emit('ice-candidate', {
      target: remoteUserId,
      candidate: event.candidate
    });
  }
};
```

**Why it breaks:** Without ICE candidates, connection establishment fails.

---

## H) When to Use & When NOT to Use

Use WebRTC for peer-to-peer video/voice calling, screen sharing, file transfer, real-time collaboration. Don't use for simple messaging (use Socket.io), server-based streaming, or when peer-to-peer not needed.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain WebRTC."

**You:**
"WebRTC enables peer-to-peer real-time communication (audio, video, data) directly between browsers. Flow: Signaling (exchange connection info via server - offer/answer, ICE candidates), direct peer connection established, media/data transfer. Server only for signaling, not in media path. STUN discovers public IP for NAT traversal, TURN is relay if direct connection fails. Use for video calling, voice calling, screen sharing, file transfer. Key advantage: Low latency, no server in media path, efficient."

---

## J) Mini Practice Task

Build WebRTC video calling app: signaling server, offer/answer exchange, ICE candidates, media streams, end call functionality.

---

**END OF TOPIC: WEBRTC**

