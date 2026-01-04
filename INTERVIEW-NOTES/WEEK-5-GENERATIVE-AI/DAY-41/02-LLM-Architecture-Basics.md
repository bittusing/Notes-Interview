# LLM ARCHITECTURE BASICS

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**LLM (Large Language Model) kya hai?**
- LLM bahut bada neural network hai
- Text data se train hota hai
- Billions of parameters hoti hain
- Next word prediction karta hai
- GPT, BERT, T5 examples hain

**Real-life Analogy:**
- LLM = Super smart reader
- Training = Crores books padhna
- Parameters = Brain cells (bahut zyada)
- Prediction = Next word guess (context se)
- Context = Previous words

**LLM Architecture:**
- **Transformer:** Base architecture
- **Attention Mechanism:** Important parts focus
- **Encoder-Decoder:** Input process, output generate
- **Embeddings:** Words ko numbers mein convert
- **Layers:** Multiple processing layers

**Key Components:**
- **Tokenization:** Text ko tokens mein break
- **Embeddings:** Tokens ko vectors mein convert
- **Attention:** Relationships capture
- **Feedforward:** Processing
- **Output Layer:** Next token predict

---

## B) Easy English Theory

### What is LLM Architecture?

LLM (Large Language Model) is large neural network trained on text data with billions of parameters. Architecture: Transformer-based (attention mechanism), processes text as tokens, uses embeddings (convert words to vectors), multiple layers (attention + feedforward), predicts next token. Components: Tokenization, Embeddings, Attention, Feedforward, Output layer. Examples: GPT, BERT, T5.

---

## C) Why This Concept Exists

### The Problem

**Without LLMs:**
- Limited language understanding
- Rule-based systems (rigid)
- Poor context understanding
- Manual feature engineering
- Limited generalization

### The Solution

**LLM Architecture Provides:**
1. **Context Understanding:** Long-range dependencies
2. **Generalization:** Works on various tasks
3. **Scalability:** Large models = better performance
4. **Flexibility:** Few-shot learning
5. **Natural Language:** Human-like responses

---

## D) Practical Example (Code)

```javascript
// ============================================
// CONCEPTUAL LLM ARCHITECTURE
// ============================================

// Simplified conceptual representation
class SimplifiedLLM {
  constructor(vocabSize, embeddingDim, numLayers) {
    this.vocabSize = vocabSize;
    this.embeddingDim = embeddingDim;
    this.numLayers = numLayers;
    
    // Embedding layer (word -> vector)
    this.embeddings = new Map();
    
    // Attention weights (conceptual)
    this.attentionWeights = [];
    
    // Feedforward layers
    this.layers = [];
  }
  
  // Tokenize text (simplified)
  tokenize(text) {
    // In real LLM: Uses tokenizer (BPE, WordPiece, etc.)
    return text.toLowerCase().split(/\s+/).filter(w => w.length > 0);
  }
  
  // Get or create embedding for token
  getEmbedding(token) {
    if (!this.embeddings.has(token)) {
      // Random initialization (in real: learned during training)
      this.embeddings.set(token, 
        Array(this.embeddingDim).fill(0).map(() => Math.random() - 0.5)
      );
    }
    return this.embeddings.get(token);
  }
  
  // Simplified attention (conceptual)
  attention(query, keys, values) {
    // In real: Scaled dot-product attention
    // Q * K^T / sqrt(d_k) -> softmax -> * V
    const scores = keys.map(key => 
      this.dotProduct(query, key) / Math.sqrt(this.embeddingDim)
    );
    const weights = this.softmax(scores);
    
    // Weighted sum of values
    return values.reduce((sum, val, i) => 
      this.addVectors(sum, this.scaleVector(val, weights[i])), 
      Array(this.embeddingDim).fill(0)
    );
  }
  
  // Feedforward network (conceptual)
  feedforward(input) {
    // In real: Two linear layers with activation
    // FFN(x) = ReLU(W1 * x + b1) * W2 + b2
    return input; // Simplified
  }
  
  // Process through transformer layer
  processLayer(input, layerIndex) {
    // Self-attention
    const attended = this.attention(input, [input], [input]);
    
    // Residual connection + normalization (conceptual)
    const residual = this.addVectors(input, attended);
    
    // Feedforward
    const output = this.feedforward(residual);
    
    return output;
  }
  
  // Generate next token (simplified)
  predictNextToken(context) {
    const tokens = this.tokenize(context);
    const embeddings = tokens.map(token => this.getEmbedding(token));
    
    // Process through layers
    let output = embeddings[embeddings.length - 1]; // Last token
    for (let i = 0; i < this.numLayers; i++) {
      output = this.processLayer(output, i);
    }
    
    // Predict next token (simplified - in real: output layer with vocab size)
    // Returns most likely next token
    return this.sampleFromDistribution(output);
  }
  
  // Helper functions
  dotProduct(a, b) {
    return a.reduce((sum, val, i) => sum + val * b[i], 0);
  }
  
  softmax(scores) {
    const max = Math.max(...scores);
    const exp = scores.map(s => Math.exp(s - max));
    const sum = exp.reduce((a, b) => a + b, 0);
    return exp.map(e => e / sum);
  }
  
  addVectors(a, b) {
    return a.map((val, i) => val + b[i]);
  }
  
  scaleVector(vec, scalar) {
    return vec.map(val => val * scalar);
  }
  
  sampleFromDistribution(output) {
    // Simplified - in real: uses output probabilities over vocabulary
    return "next_token";
  }
}

// ============================================
// ATTENTION MECHANISM CONCEPT
// ============================================

class AttentionMechanism {
  constructor(dim) {
    this.dim = dim;
  }
  
  // Scaled Dot-Product Attention
  scaledDotProductAttention(query, key, value, mask = null) {
    // Q * K^T
    const scores = this.matMul(query, this.transpose(key));
    
    // Scale by sqrt(d_k)
    const scaledScores = scores.map(row => 
      row.map(score => score / Math.sqrt(this.dim))
    );
    
    // Apply mask if provided (for causal attention)
    const maskedScores = mask 
      ? this.applyMask(scaledScores, mask)
      : scaledScores;
    
    // Softmax
    const attentionWeights = maskedScores.map(row => this.softmax(row));
    
    // Weighted sum: attention_weights * V
    const output = this.matMul(attentionWeights, value);
    
    return { output, attentionWeights };
  }
  
  // Multi-Head Attention (conceptual)
  multiHeadAttention(query, key, value, numHeads) {
    const headDim = this.dim / numHeads;
    const heads = [];
    
    // Split into multiple heads
    for (let i = 0; i < numHeads; i++) {
      const q = this.splitHead(query, i, headDim);
      const k = this.splitHead(key, i, headDim);
      const v = this.splitHead(value, i, headDim);
      
      const { output } = this.scaledDotProductAttention(q, k, v);
      heads.push(output);
    }
    
    // Concatenate heads
    return this.concatHeads(heads);
  }
  
  // Helper functions (conceptual)
  matMul(a, b) {
    // Matrix multiplication implementation
    return [];
  }
  
  transpose(matrix) {
    return matrix[0].map((_, i) => matrix.map(row => row[i]));
  }
  
  applyMask(scores, mask) {
    return scores.map((row, i) => 
      row.map((score, j) => mask[i][j] === 0 ? -Infinity : score)
    );
  }
  
  splitHead(tensor, headIndex, headDim) {
    // Split tensor for multi-head attention
    return [];
  }
  
  concatHeads(heads) {
    // Concatenate heads back
    return [];
  }
}

// ============================================
// TOKENIZATION CONCEPTS
// ============================================

class Tokenizer {
  constructor() {
    this.vocab = new Map();
    this.vocabSize = 0;
  }
  
  // Byte Pair Encoding (BPE) - conceptual
  trainBPE(text, numMerges) {
    // 1. Initialize vocabulary with characters
    let vocab = new Set();
    for (let char of text) {
      vocab.add(char);
    }
    
    // 2. Count pairs
    const pairs = this.countPairs(text);
    
    // 3. Merge most frequent pairs
    for (let i = 0; i < numMerges; i++) {
      const mostFrequent = this.getMostFrequentPair(pairs);
      vocab.add(mostFrequent);
      text = this.mergePair(text, mostFrequent);
      pairs = this.countPairs(text);
    }
    
    this.vocab = vocab;
    this.vocabSize = vocab.size;
  }
  
  // Tokenize text
  tokenize(text) {
    // In real: Uses trained BPE or other tokenization
    const tokens = [];
    let current = text;
    
    // Simplified tokenization
    while (current.length > 0) {
      let found = false;
      
      // Try to match longest token from vocabulary
      for (let len = Math.min(current.length, 10); len > 0; len--) {
        const candidate = current.substring(0, len);
        if (this.vocab.has(candidate)) {
          tokens.push(candidate);
          current = current.substring(len);
          found = true;
          break;
        }
      }
      
      if (!found) {
        // Unknown token - use character
        tokens.push(current[0]);
        current = current.substring(1);
      }
    }
    
    return tokens;
  }
  
  countPairs(text) {
    // Count frequency of adjacent pairs
    return {};
  }
  
  getMostFrequentPair(pairs) {
    // Return most frequent pair
    return "";
  }
  
  mergePair(text, pair) {
    // Merge pair in text
    return text;
  }
}

// ============================================
// EMBEDDING CONCEPTS
// ============================================

class EmbeddingLayer {
  constructor(vocabSize, embeddingDim) {
    this.vocabSize = vocabSize;
    this.embeddingDim = embeddingDim;
    this.embeddings = Array(vocabSize).fill(null).map(() => 
      Array(embeddingDim).fill(0).map(() => Math.random() - 0.5)
    );
  }
  
  // Get embedding for token ID
  getEmbedding(tokenId) {
    return this.embeddings[tokenId];
  }
  
  // Positional encoding (for transformer)
  getPositionalEncoding(position, dim) {
    const encoding = [];
    for (let i = 0; i < dim; i += 2) {
      encoding.push(Math.sin(position / Math.pow(10000, i / dim)));
      if (i + 1 < dim) {
        encoding.push(Math.cos(position / Math.pow(10000, i / dim)));
      }
    }
    return encoding;
  }
}
```

---

## E) Internal Working

**LLM Architecture Flow:**
1. **Input:** Text prompt
2. **Tokenization:** Convert to tokens
3. **Embedding:** Tokens to vectors
4. **Positional Encoding:** Add position info
5. **Transformer Layers:** Attention + Feedforward
6. **Output Layer:** Predict next token
7. **Decoding:** Generate tokens sequentially

**Key Mechanisms:**
- **Attention:** Focus on relevant tokens
- **Self-Attention:** Relationships within input
- **Multi-Head:** Multiple attention perspectives
- **Layer Normalization:** Stabilize training
- **Residual Connections:** Gradient flow

---

## F) Interview Questions & Answers

### Q1: What is the architecture of Large Language Models?

**Answer:**
LLM architecture: Transformer-based (attention mechanism), processes text as tokens (tokenization), converts to embeddings (word vectors), uses positional encoding (position information), multiple transformer layers (self-attention + feedforward), output layer (predicts next token). Key components: Tokenization (BPE, WordPiece), Embeddings (word to vector), Attention (focus on relevant parts), Feedforward (processing), Layer normalization and residual connections.

### Q2: What is the attention mechanism and why is it important?

**Answer:**
Attention mechanism allows model to focus on relevant parts of input when generating output. Types: Self-attention (relationships within input), Cross-attention (between input and output). Process: Query, Key, Value vectors, compute attention scores (Q*K^T), apply softmax, weighted sum of values. Important because: Captures long-range dependencies, understands context, enables parallel processing, improves performance on various tasks.

### Q3: What is tokenization and why is it needed?

**Answer:**
Tokenization breaks text into smaller units (tokens) that model can process. Methods: BPE (Byte Pair Encoding - merges frequent pairs), WordPiece (similar to BPE), SentencePiece (handles multiple languages). Needed because: Models work with discrete tokens, vocabulary size manageable, handles unknown words, enables subword units. Tokens can be words, subwords, or characters depending on method.

---

## G) Common Mistakes

### Mistake 1: Not Understanding Context Window

```javascript
// ❌ WRONG - Assuming unlimited context
const prompt = veryLongText; // May exceed context window

// ✅ CORRECT - Respect context limits
const maxTokens = 4096; // Model limit
const truncatedPrompt = prompt.substring(0, maxTokens);
```

**Why it breaks:** Exceeding context window causes errors or truncation.

---

## H) When to Use & When NOT to Use

Use LLMs for: Text generation, code generation, translation, summarization, Q&A, few-shot learning. Don't use for: Real-time critical systems without validation, sensitive data without proper handling, when deterministic output needed, when model size is constraint.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain LLM Architecture."

**You:**
"LLM architecture: Transformer-based with attention mechanism. Process: Tokenize text (BPE/WordPiece), convert to embeddings (word vectors), add positional encoding, process through transformer layers (self-attention + feedforward), predict next token.

Key: Attention mechanism (focus on relevant parts), multi-head attention (multiple perspectives), layer normalization, residual connections. Large models (billions parameters) trained on massive text data enable powerful language understanding and generation."

---

## J) Mini Practice Task

Understand: Transformer architecture, attention mechanism, tokenization concepts, embedding layers. Study: GPT architecture, BERT architecture, differences between encoder-decoder models.

---

**END OF TOPIC: LLM ARCHITECTURE BASICS**

