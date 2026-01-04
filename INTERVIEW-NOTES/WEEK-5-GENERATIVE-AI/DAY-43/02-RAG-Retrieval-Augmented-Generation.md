# RAG (RETRIEVAL AUGMENTED GENERATION)

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**RAG (Retrieval Augmented Generation) kya hai?**
- RAG external knowledge sources se information retrieve karke generation improve karta hai
- Model ko up-to-date information provide karta hai
- Knowledge base se relevant documents fetch karta hai
- Context mein add karke better answers deta hai
- Hallucination reduce karta hai

**Real-life Analogy:**
- RAG = Research assistant
- Model = Student
- Knowledge Base = Library
- Retrieval = Relevant books dhundhna
- Augmentation = Books se information add karna
- Generation = Better answer dena

**RAG Components:**
- **Knowledge Base:** Documents, data sources
- **Retrieval:** Relevant documents find karna
- **Augmentation:** Context mein add karna
- **Generation:** Enhanced response generate karna

**RAG Benefits:**
- **Up-to-date Information:** Latest data use
- **Reduced Hallucination:** Grounded in facts
- **Domain-specific:** Custom knowledge base
- **Transparency:** Sources visible
- **Cost-effective:** No fine-tuning needed

---

## B) Easy English Theory

### What is RAG?

RAG (Retrieval Augmented Generation) improves generation by retrieving relevant information from external knowledge base and augmenting context. Process: Query knowledge base, retrieve relevant documents, augment prompt with retrieved context, generate response. Benefits: Up-to-date information, reduced hallucination, domain-specific knowledge, source transparency, no fine-tuning needed. Use for: Q&A systems, chatbots with knowledge, document analysis.

---

## C) Why This Concept Exists

### The Problem

**Without RAG:**
- Model limited to training data
- Outdated information
- Hallucination (made-up facts)
- No access to specific documents
- Generic responses

### The Solution

**RAG Provides:**
1. **Fresh Information:** Latest data access
2. **Accuracy:** Grounded in real documents
3. **Specificity:** Domain-specific knowledge
4. **Transparency:** Source citations
5. **Flexibility:** Easy to update knowledge base

---

## D) Practical Example (Code)

```javascript
// ============================================
// RAG SYSTEM IMPLEMENTATION
// ============================================

class RAGSystem {
  constructor(vectorStore, llm) {
    this.vectorStore = vectorStore; // Vector database
    this.llm = llm; // Language model
    this.retriever = new DocumentRetriever(vectorStore);
    this.promptBuilder = new RAGPromptBuilder();
  }
  
  // Main RAG pipeline
  async query(userQuery, options = {}) {
    // 1. Retrieve relevant documents
    const retrievedDocs = await this.retriever.retrieve(
      userQuery, 
      options.topK || 5
    );
    
    // 2. Augment prompt with context
    const augmentedPrompt = this.promptBuilder.build(
      userQuery,
      retrievedDocs,
      options
    );
    
    // 3. Generate response
    const response = await this.llm.generate(augmentedPrompt);
    
    // 4. Return response with sources
    return {
      answer: response,
      sources: retrievedDocs.map(doc => ({
        content: doc.content,
        metadata: doc.metadata,
        score: doc.score
      })),
      query: userQuery
    };
  }
}

// ============================================
// DOCUMENT RETRIEVER
// ============================================

class DocumentRetriever {
  constructor(vectorStore) {
    this.vectorStore = vectorStore;
  }
  
  // Retrieve relevant documents
  async retrieve(query, topK = 5) {
    // 1. Convert query to vector (embedding)
    const queryVector = await this.embedQuery(query);
    
    // 2. Search in vector store
    const results = await this.vectorStore.similaritySearch(
      queryVector,
      topK
    );
    
    // 3. Return relevant documents
    return results.map(result => ({
      content: result.content,
      metadata: result.metadata,
      score: result.score
    }));
  }
  
  // Embed query (simplified)
  async embedQuery(query) {
    // In real: Use embedding model (OpenAI, Cohere, etc.)
    // Returns vector representation
    return this.simpleEmbedding(query);
  }
  
  simpleEmbedding(text) {
    // Simplified embedding (in real: use proper embedding model)
    const words = text.toLowerCase().split(/\s+/);
    const embedding = Array(384).fill(0);
    
    words.forEach((word, i) => {
      const hash = this.hashString(word);
      embedding[hash % 384] += 1;
    });
    
    // Normalize
    const magnitude = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0));
    return embedding.map(val => val / magnitude);
  }
  
  hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash = hash & hash;
    }
    return Math.abs(hash);
  }
}

// ============================================
// VECTOR STORE (SIMPLIFIED)
// ============================================

class VectorStore {
  constructor() {
    this.documents = [];
    this.vectors = [];
  }
  
  // Add document to store
  async addDocument(content, metadata = {}) {
    const vector = await this.embedDocument(content);
    
    this.documents.push({
      content,
      metadata,
      id: this.documents.length
    });
    
    this.vectors.push(vector);
  }
  
  // Embed document
  async embedDocument(content) {
    // In real: Use embedding model
    const retriever = new DocumentRetriever(this);
    return retriever.simpleEmbedding(content);
  }
  
  // Similarity search
  async similaritySearch(queryVector, topK = 5) {
    // Calculate cosine similarity
    const similarities = this.vectors.map((vector, index) => ({
      index,
      score: this.cosineSimilarity(queryVector, vector)
    }));
    
    // Sort by similarity
    similarities.sort((a, b) => b.score - a.score);
    
    // Return top K
    return similarities.slice(0, topK).map(sim => ({
      content: this.documents[sim.index].content,
      metadata: this.documents[sim.index].metadata,
      score: sim.score
    }));
  }
  
  // Cosine similarity
  cosineSimilarity(vecA, vecB) {
    const dotProduct = vecA.reduce((sum, val, i) => sum + val * vecB[i], 0);
    const magnitudeA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));
    
    return dotProduct / (magnitudeA * magnitudeB);
  }
}

// ============================================
// RAG PROMPT BUILDER
// ============================================

class RAGPromptBuilder {
  build(query, retrievedDocs, options = {}) {
    const context = this.formatContext(retrievedDocs);
    
    const prompt = `
You are a helpful assistant. Use the following context to answer the question.
If the context doesn't contain the answer, say so.

Context:
${context}

Question: ${query}

Answer based on the context above:
`;
    
    return prompt;
  }
  
  formatContext(docs) {
    return docs.map((doc, i) => 
      `[${i + 1}] ${doc.content}\nSource: ${doc.metadata.source || 'Unknown'}`
    ).join('\n\n');
  }
  
  // Advanced: Include relevance scores
  buildWithScores(query, retrievedDocs) {
    const context = retrievedDocs
      .filter(doc => doc.score > 0.7) // Filter low relevance
      .map((doc, i) => 
        `[${i + 1}] (Relevance: ${doc.score.toFixed(2)})\n${doc.content}`
      )
      .join('\n\n');
    
    return `
Context (most relevant information):
${context}

Question: ${query}

Provide a comprehensive answer using the context above. Cite sources when possible.
`;
  }
}

// ============================================
// DOCUMENT PROCESSING
// ============================================

class DocumentProcessor {
  // Split document into chunks
  chunkDocument(text, chunkSize = 500, overlap = 50) {
    const chunks = [];
    let start = 0;
    
    while (start < text.length) {
      const end = Math.min(start + chunkSize, text.length);
      const chunk = text.substring(start, end);
      
      chunks.push({
        content: chunk,
        start,
        end
      });
      
      start = end - overlap; // Overlap for context
    }
    
    return chunks;
  }
  
  // Process and index documents
  async processDocuments(documents) {
    const processed = [];
    
    for (const doc of documents) {
      const chunks = this.chunkDocument(doc.content);
      
      for (const chunk of chunks) {
        processed.push({
          content: chunk.content,
          metadata: {
            ...doc.metadata,
            chunkIndex: chunk.start,
            source: doc.metadata.source || 'unknown'
          }
        });
      }
    }
    
    return processed;
  }
}

// ============================================
// COMPLETE RAG WORKFLOW
// ============================================

class RAGWorkflow {
  constructor() {
    this.vectorStore = new VectorStore();
    this.processor = new DocumentProcessor();
  }
  
  // Setup knowledge base
  async setupKnowledgeBase(documents) {
    // 1. Process documents (chunk)
    const processed = await this.processor.processDocuments(documents);
    
    // 2. Add to vector store
    for (const doc of processed) {
      await this.vectorStore.addDocument(doc.content, doc.metadata);
    }
    
    return {
      totalDocuments: documents.length,
      totalChunks: processed.length,
      status: 'ready'
    };
  }
  
  // Query knowledge base
  async query(userQuery, topK = 5) {
    const ragSystem = new RAGSystem(this.vectorStore, {
      generate: async (prompt) => {
        // In real: Call LLM API
        return "Generated response based on context...";
      }
    });
    
    return await ragSystem.query(userQuery, { topK });
  }
}

// ============================================
// USAGE EXAMPLE
// ============================================

async function example() {
  const workflow = new RAGWorkflow();
  
  // Setup knowledge base
  const documents = [
    {
      content: "JavaScript is a programming language...",
      metadata: { source: "docs/javascript.md", title: "JavaScript Guide" }
    },
    {
      content: "React is a UI library...",
      metadata: { source: "docs/react.md", title: "React Guide" }
    }
  ];
  
  await workflow.setupKnowledgeBase(documents);
  
  // Query
  const result = await workflow.query("What is JavaScript?", 3);
  
  console.log("Answer:", result.answer);
  console.log("Sources:", result.sources);
}
```

---

## E) Internal Working

**RAG Pipeline:**
1. **Query:** User question
2. **Embedding:** Convert query to vector
3. **Retrieval:** Find similar documents (vector search)
4. **Augmentation:** Add context to prompt
5. **Generation:** LLM generates response
6. **Response:** Answer + sources

**Key Components:**
- **Vector Store:** Document embeddings
- **Retriever:** Similarity search
- **Embedding Model:** Text to vectors
- **LLM:** Response generation

---

## F) Interview Questions & Answers

### Q1: What is RAG and how does it work?

**Answer:**
RAG (Retrieval Augmented Generation) improves generation by retrieving relevant information from knowledge base and augmenting context. Process: Query knowledge base (vector search), retrieve relevant documents, augment prompt with retrieved context, generate response using context. Benefits: Up-to-date information, reduced hallucination, domain-specific knowledge, source transparency. Use for Q&A systems, chatbots with knowledge.

### Q2: What are the components of a RAG system?

**Answer:**
RAG components: Knowledge base (documents/data sources), Vector store (document embeddings for similarity search), Retriever (finds relevant documents using vector similarity), Embedding model (converts text to vectors), Prompt builder (augments prompt with retrieved context), LLM (generates response). Flow: Query → Embed → Retrieve → Augment → Generate.

### Q3: How do you improve RAG system performance?

**Answer:**
Improve RAG: Better chunking (optimal chunk size, overlap), Better retrieval (hybrid search - semantic + keyword, reranking), Better embeddings (domain-specific models), Filtering (relevance threshold), Prompt engineering (clear instructions, source citation), Multiple retrievals (different strategies). Monitor: Retrieval accuracy, answer quality, source relevance.

---

## G) Common Mistakes

### Mistake 1: Poor Chunking Strategy

```javascript
// ❌ WRONG - Too large chunks, no overlap
chunkDocument(text, 2000, 0);
// Large chunks = less precise retrieval
// No overlap = context loss

// ✅ CORRECT - Optimal chunk size, overlap
chunkDocument(text, 500, 50);
// Smaller chunks = more precise
// Overlap = context preservation
```

**Why it breaks:** Poor chunking leads to irrelevant retrieval, context loss.

---

## H) When to Use & When NOT to Use

Use RAG for: Q&A systems, chatbots with knowledge, document analysis, when need up-to-date information, when need source citations. Don't use when: Simple tasks don't need external knowledge, real-time performance critical without caching, knowledge base frequently changes without update mechanism.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain RAG."

**You:**
"RAG (Retrieval Augmented Generation) improves generation by retrieving relevant information from knowledge base. Process: Query knowledge base (vector search), retrieve relevant documents, augment prompt with context, generate response.

Components: Vector store (document embeddings), Retriever (similarity search), Embedding model, LLM. Benefits: Up-to-date information, reduced hallucination, domain-specific knowledge, source transparency. Use for Q&A systems, chatbots with knowledge base."

---

## J) Mini Practice Task

Practice: Build RAG system, implement vector store, document retrieval, prompt augmentation, understand chunking strategies, improve retrieval accuracy.

---

**END OF TOPIC: RAG (RETRIEVAL AUGMENTED GENERATION)**

