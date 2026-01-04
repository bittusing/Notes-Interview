# GENERATIVE AI BEST PRACTICES

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Best Practices kya hain?**
- Best Practices proven approaches hain
- Common mistakes avoid karte hain
- Performance improve karte hain
- Cost optimize karte hain
- Security ensure karte hain

**Real-life Analogy:**
- Best Practices = Recipe tips
- Experience = Past mistakes se learn
- Guidelines = Roadmap
- Standards = Quality assurance

**Key Areas:**
- **Prompt Engineering:** Effective prompts
- **Cost Management:** Optimize expenses
- **Security:** Protect data
- **Performance:** Fast responses
- **Reliability:** Consistent results
- **Monitoring:** Track everything

---

## B) Easy English Theory

### What are Best Practices?

Best Practices are proven approaches for building and deploying Generative AI applications. Areas: Prompt engineering (effective prompts), Cost management (optimize expenses), Security (protect data), Performance (fast responses), Reliability (consistent results), Monitoring (track metrics). Follow best practices to avoid common mistakes, improve performance, reduce costs, ensure security.

---

## C) Why This Concept Exists

### The Problem

**Without Best Practices:**
- Common mistakes repeated
- Poor performance
- High costs
- Security issues
- Inconsistent results
- Wasted resources

### The Solution

**Best Practices Provide:**
1. **Guidance:** Proven approaches
2. **Efficiency:** Avoid mistakes
3. **Quality:** Better results
4. **Cost Savings:** Optimize expenses
5. **Security:** Protect systems

---

## D) Practical Example (Code)

```javascript
// ============================================
// BEST PRACTICES CHECKLIST
// ============================================

class BestPracticesChecker {
  checkPrompt(prompt) {
    const issues = [];
    const recommendations = [];
    
    // Check length
    if (prompt.length < 10) {
      issues.push('Prompt too short');
      recommendations.push('Add more context and details');
    }
    
    if (prompt.length > 4000) {
      issues.push('Prompt too long - may exceed context');
      recommendations.push('Break into smaller parts or summarize');
    }
    
    // Check clarity
    if (!this.hasClearTask(prompt)) {
      issues.push('No clear task specified');
      recommendations.push('Start with clear instruction: "Generate...", "Explain...", etc.');
    }
    
    // Check specificity
    const vagueWords = ['something', 'anything', 'whatever'];
    const vagueCount = vagueWords.filter(word => 
      prompt.toLowerCase().includes(word)
    ).length;
    
    if (vagueCount > 1) {
      issues.push('Prompt too vague');
      recommendations.push('Be specific about requirements');
    }
    
    // Check format specification
    if (!prompt.includes('format') && !prompt.includes('output')) {
      recommendations.push('Consider specifying output format');
    }
    
    return {
      score: this.calculateScore(issues),
      issues,
      recommendations
    };
  }
  
  hasClearTask(prompt) {
    const taskKeywords = ['generate', 'explain', 'create', 'write', 'analyze', 'review', 'summarize'];
    return taskKeywords.some(keyword => prompt.toLowerCase().includes(keyword));
  }
  
  calculateScore(issues) {
    return Math.max(0, 100 - (issues.length * 20));
  }
  
  // Check security
  checkSecurity(config) {
    const checks = {
      apiKeyExposed: !config.apiKey || config.apiKey.includes('sk-') && config.apiKey.length < 20,
      noRateLimit: !config.rateLimit,
      noInputValidation: !config.inputValidation,
      noErrorHandling: !config.errorHandling
    };
    
    const issues = Object.entries(checks)
      .filter(([_, value]) => value)
      .map(([key, _]) => key);
    
    return {
      secure: issues.length === 0,
      issues,
      recommendations: this.getSecurityRecommendations(issues)
    };
  }
  
  getSecurityRecommendations(issues) {
    const recommendations = {
      apiKeyExposed: 'Store API keys in environment variables, never in code',
      noRateLimit: 'Implement rate limiting to prevent abuse',
      noInputValidation: 'Validate and sanitize all inputs',
      noErrorHandling: 'Implement proper error handling without exposing details'
    };
    
    return issues.map(issue => recommendations[issue]);
  }
  
  // Check cost optimization
  checkCostOptimization(usage) {
    const recommendations = [];
    
    if (usage.avgTokensPerRequest > 2000) {
      recommendations.push('Consider shorter prompts or response limits');
    }
    
    if (usage.cacheHitRate < 0.3) {
      recommendations.push('Implement caching for common requests');
    }
    
    if (usage.expensiveModelUsage > 0.5) {
      recommendations.push('Use cheaper models for simple tasks');
    }
    
    return {
      optimized: recommendations.length === 0,
      recommendations
    };
  }
}

// ============================================
// SECURITY BEST PRACTICES
// ============================================

class SecurityPractices {
  // Sanitize input
  sanitizeInput(input) {
    // Remove potentially harmful content
    let sanitized = input;
    
    // Remove script tags
    sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    
    // Limit length
    if (sanitized.length > 10000) {
      sanitized = sanitized.substring(0, 10000);
    }
    
    // Remove control characters
    sanitized = sanitized.replace(/[\x00-\x1F\x7F]/g, '');
    
    return sanitized;
  }
  
  // Validate API key
  validateAPIKey(apiKey) {
    if (!apiKey) {
      throw new Error('API key required');
    }
    
    if (apiKey.length < 20) {
      throw new Error('Invalid API key format');
    }
    
    // Don't log full key
    return apiKey.substring(0, 7) + '...';
  }
  
  // Rate limiting
  createRateLimiter(windowMs, max) {
    const requests = new Map();
    
    return (req, res, next) => {
      const key = req.ip;
      const now = Date.now();
      
      if (!requests.has(key)) {
        requests.set(key, { count: 1, resetTime: now + windowMs });
        return next();
      }
      
      const record = requests.get(key);
      
      if (now > record.resetTime) {
        record.count = 1;
        record.resetTime = now + windowMs;
        return next();
      }
      
      if (record.count >= max) {
        return res.status(429).json({ error: 'Rate limit exceeded' });
      }
      
      record.count++;
      next();
    };
  }
  
  // Input validation
  validatePrompt(prompt) {
    if (typeof prompt !== 'string') {
      throw new Error('Prompt must be a string');
    }
    
    if (prompt.length === 0) {
      throw new Error('Prompt cannot be empty');
    }
    
    if (prompt.length > 10000) {
      throw new Error('Prompt too long (max 10000 characters)');
    }
    
    return true;
  }
}

// ============================================
// PERFORMANCE BEST PRACTICES
// ============================================

class PerformancePractices {
  // Implement caching
  createCache(ttl = 3600000) {
    const cache = new Map();
    
    return {
      get: (key) => {
        const item = cache.get(key);
        if (!item) return null;
        
        if (Date.now() - item.timestamp > ttl) {
          cache.delete(key);
          return null;
        }
        
        return item.value;
      },
      
      set: (key, value) => {
        cache.set(key, { value, timestamp: Date.now() });
      },
      
      clear: () => cache.clear()
    };
  }
  
  // Batch requests
  async batchProcess(items, batchSize = 10, processor) {
    const results = [];
    
    for (let i = 0; i < items.length; i += batchSize) {
      const batch = items.slice(i, i + batchSize);
      const batchResults = await Promise.all(
        batch.map(item => processor(item))
      );
      results.push(...batchResults);
    }
    
    return results;
  }
  
  // Timeout wrapper
  withTimeout(promise, timeoutMs) {
    return Promise.race([
      promise,
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Operation timeout')), timeoutMs)
      )
    ]);
  }
  
  // Retry with exponential backoff
  async retryWithBackoff(fn, maxRetries = 3) {
    let lastError;
    
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error;
        
        if (attempt < maxRetries - 1) {
          const delay = Math.pow(2, attempt) * 1000;
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }
    
    throw lastError;
  }
}

// ============================================
// PROMPT ENGINEERING BEST PRACTICES
// ============================================

class PromptBestPractices {
  // Structure prompt
  structurePrompt(task, context, examples, format) {
    let prompt = '';
    
    // Role (if needed)
    if (context.role) {
      prompt += `You are a ${context.role}.\n\n`;
    }
    
    // Context
    if (context.info) {
      prompt += `Context: ${context.info}\n\n`;
    }
    
    // Task
    prompt += `Task: ${task}\n\n`;
    
    // Examples (few-shot)
    if (examples && examples.length > 0) {
      prompt += 'Examples:\n';
      examples.forEach((ex, i) => {
        prompt += `${i + 1}. Input: ${ex.input}\n`;
        prompt += `   Output: ${ex.output}\n\n`;
      });
    }
    
    // Format
    if (format) {
      prompt += `Output Format: ${format}\n\n`;
    }
    
    prompt += 'Response:';
    
    return prompt;
  }
  
  // Optimize prompt length
  optimizePrompt(prompt, maxLength = 2000) {
    if (prompt.length <= maxLength) {
      return prompt;
    }
    
    // Strategy: Keep important parts, summarize rest
    const lines = prompt.split('\n');
    const important = lines.filter(line => 
      line.includes('Task:') || 
      line.includes('Format:') ||
      line.startsWith('Examples:')
    );
    
    const summary = `[Context summarized - original length: ${prompt.length} chars]`;
    
    return important.join('\n') + '\n' + summary;
  }
}

// ============================================
// MONITORING BEST PRACTICES
// ============================================

class MonitoringBestPractices {
  // Track key metrics
  trackMetrics() {
    return {
      latency: this.trackLatency(),
      errors: this.trackErrors(),
      costs: this.trackCosts(),
      usage: this.trackUsage()
    };
  }
  
  trackLatency() {
    const latencies = [];
    
    return {
      record: (duration) => latencies.push(duration),
      getP95: () => {
        const sorted = [...latencies].sort((a, b) => a - b);
        const index = Math.floor(sorted.length * 0.95);
        return sorted[index] || 0;
      },
      getAverage: () => {
        return latencies.length > 0
          ? latencies.reduce((a, b) => a + b, 0) / latencies.length
          : 0;
      }
    };
  }
  
  trackErrors() {
    const errors = [];
    
    return {
      record: (error) => errors.push({
        error: error.message,
        timestamp: new Date().toISOString(),
        stack: error.stack
      }),
      getErrorRate: (totalRequests) => {
        return totalRequests > 0 ? errors.length / totalRequests : 0;
      },
      getRecentErrors: (count = 10) => {
        return errors.slice(-count);
      }
    };
  }
  
  trackCosts() {
    let totalCost = 0;
    const costs = [];
    
    return {
      record: (cost) => {
        totalCost += cost;
        costs.push({ cost, timestamp: new Date().toISOString() });
      },
      getTotal: () => totalCost,
      getDailyCost: () => {
        const today = new Date().toDateString();
        return costs
          .filter(c => new Date(c.timestamp).toDateString() === today)
          .reduce((sum, c) => sum + c.cost, 0);
      }
    };
  }
  
  trackUsage() {
    const usage = {
      requests: 0,
      tokens: 0,
      cacheHits: 0,
      cacheMisses: 0
    };
    
    return {
      recordRequest: () => usage.requests++,
      recordTokens: (count) => usage.tokens += count,
      recordCacheHit: () => usage.cacheHits++,
      recordCacheMiss: () => usage.cacheMisses++,
      getCacheHitRate: () => {
        const total = usage.cacheHits + usage.cacheMisses;
        return total > 0 ? usage.cacheHits / total : 0;
      },
      getStats: () => ({ ...usage })
    };
  }
}
```

---

## E) Internal Working

**Best Practices Implementation:**
1. **Checklist:** Validate implementation
2. **Security:** Protect systems
3. **Performance:** Optimize operations
4. **Cost:** Monitor and optimize
5. **Monitoring:** Track metrics

**Key Principles:**
- Security first
- Monitor everything
- Optimize costs
- Handle errors
- Validate inputs

---

## F) Interview Questions & Answers

### Q1: What are best practices for Generative AI applications?

**Answer:**
Best practices: Prompt engineering (clear, specific prompts with examples and format), Security (API key protection, input validation, rate limiting, error handling), Cost optimization (model selection, caching, batching, usage monitoring), Performance (caching, timeouts, retry logic, batching), Monitoring (latency, errors, costs, usage tracking), Reliability (error handling, retries, fallbacks). Follow these to build robust, cost-effective, secure applications.

### Q2: How do you ensure security in Generative AI applications?

**Answer:**
Security: Protect API keys (environment variables, never in code), validate inputs (sanitize, length limits, type checks), implement rate limiting (prevent abuse), handle errors securely (don't expose sensitive info), use HTTPS (encrypt traffic), implement authentication (API keys, OAuth), monitor for anomalies (unusual patterns), regular audits (review access, usage). Security is critical - compromised API keys can lead to high costs.

### Q3: How do you monitor Generative AI applications in production?

**Answer:**
Monitor: Latency (response time, p95/p99 percentiles), error rates (API failures, timeouts), token usage (per request, total), costs (per request, daily/monthly), request volume (RPS, peak traffic), cache performance (hit rate), model performance (accuracy, relevance). Set up alerts for anomalies, track trends, create dashboards, log everything, review regularly. Monitoring helps optimize and catch issues early.

---

## G) Common Mistakes

### Mistake 1: Exposing API Keys

```javascript
// ❌ WRONG - API key in code
const apiKey = "sk-1234567890abcdef";
// Exposed in version control

// ✅ CORRECT - Environment variable
const apiKey = process.env.OPENAI_API_KEY;
// Never commit to version control
```

**Why it breaks:** Exposed API keys lead to unauthorized access, high costs, security breaches.

---

## H) When to Use & When NOT to Use

Always follow best practices: Security, monitoring, error handling, cost optimization. Don't skip: Input validation, rate limiting, error handling, cost monitoring. Best practices are essential, not optional.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain Generative AI Best Practices."

**You:**
"Best practices: Prompt engineering (clear, specific prompts), Security (protect API keys, validate inputs, rate limiting), Cost optimization (model selection, caching, monitoring), Performance (caching, timeouts, retries), Monitoring (latency, errors, costs).

Key: Security first (protect API keys, validate inputs), monitor everything (track metrics), optimize costs (caching, model selection), handle errors (retries, fallbacks). Follow these to build robust, secure, cost-effective applications."

---

## J) Mini Practice Task

Practice: Implement security measures, set up monitoring, optimize costs, follow prompt engineering best practices, handle errors properly, validate all inputs.

---

**END OF TOPIC: GENERATIVE AI BEST PRACTICES**

