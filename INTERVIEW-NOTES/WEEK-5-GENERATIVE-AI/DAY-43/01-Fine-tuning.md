# FINE-TUNING

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Fine-tuning kya hai?**
- Fine-tuning pre-trained model ko specific task ke liye adapt karna hai
- Base model ko additional training dena
- Domain-specific data se train karna
- Better performance specific task mein
- Transfer learning ka example

**Real-life Analogy:**
- Fine-tuning = Specialization
- Base model = General doctor (sab kuch janta hai)
- Fine-tuning = Cardiologist (heart specialist)
- Training data = Specialized knowledge
- Result = Better performance specific area mein

**Fine-tuning Types:**
- **Full Fine-tuning:** All parameters update
- **LoRA (Low-Rank Adaptation):** Few parameters update
- **PEFT (Parameter-Efficient Fine-Tuning):** Efficient methods
- **Instruction Tuning:** Follow instructions better

**When to Use:**
- Domain-specific tasks
- Custom behavior needed
- Better accuracy required
- Limited training data available
- Cost-effective specialization

---

## B) Easy English Theory

### What is Fine-tuning?

Fine-tuning adapts pre-trained model for specific task by training on domain-specific data. Types: Full fine-tuning (update all parameters), LoRA (update few parameters efficiently), PEFT (parameter-efficient methods), Instruction tuning (improve instruction following). Process: Start with pre-trained model, add task-specific data, train on new data, adapt weights. Use when need domain-specific performance or custom behavior.

---

## C) Why This Concept Exists

### The Problem

**Without Fine-tuning:**
- Generic model performance
- Not optimized for specific domain
- Poor accuracy on specialized tasks
- Need to train from scratch (expensive)
- Limited customization

### The Solution

**Fine-tuning Provides:**
1. **Specialization:** Domain-specific performance
2. **Efficiency:** Use pre-trained knowledge
3. **Cost-effective:** Less data and compute needed
4. **Customization:** Adapt to specific needs
5. **Better Results:** Improved accuracy

---

## D) Practical Example (Code)

```javascript
// ============================================
// FINE-TUNING CONCEPTS
// ============================================

class FineTuningPipeline {
  constructor(baseModel, taskType) {
    this.baseModel = baseModel;
    this.taskType = taskType;
    this.trainingData = [];
    this.hyperparameters = {
      learningRate: 1e-5,
      batchSize: 8,
      epochs: 3,
      maxLength: 512
    };
  }
  
  // Prepare training data
  prepareData(rawData, format) {
    // Format: { input: string, output: string }
    this.trainingData = rawData.map(item => ({
      prompt: this.formatPrompt(item.input, format),
      completion: item.output,
      tokens: this.tokenize(item.input + item.output)
    }));
    
    return this.trainingData;
  }
  
  // Format prompt based on task
  formatPrompt(input, format) {
    const formats = {
      classification: `Classify the following text: ${input}\n\nCategory:`,
      generation: `Generate text based on: ${input}\n\nOutput:`,
      qa: `Question: ${input}\n\nAnswer:`,
      code: `Write code for: ${input}\n\nCode:`
    };
    
    return formats[format] || input;
  }
  
  // Tokenize text
  tokenize(text) {
    // Simplified - in real: use model's tokenizer
    return text.split(/\s+/).length;
  }
  
  // Fine-tuning configuration
  getFineTuningConfig(method = 'full') {
    const configs = {
      full: {
        method: 'full',
        description: 'Update all model parameters',
        computeRequired: 'high',
        dataRequired: 'medium',
        bestFor: 'Maximum performance, sufficient compute'
      },
      
      lora: {
        method: 'lora',
        description: 'Low-Rank Adaptation - update few parameters',
        computeRequired: 'low',
        dataRequired: 'low',
        bestFor: 'Efficient fine-tuning, limited compute',
        rank: 8,
        alpha: 16
      },
      
      pft: {
        method: 'parameter-efficient',
        description: 'Update only specific layers',
        computeRequired: 'medium',
        dataRequired: 'medium',
        bestFor: 'Balanced approach'
      }
    };
    
    return configs[method] || configs.full;
  }
  
  // Estimate training cost
  estimateCost(dataSize, method = 'full') {
    const tokensPerExample = this.trainingData.reduce(
      (sum, ex) => sum + ex.tokens, 0
    ) / this.trainingData.length;
    
    const totalTokens = dataSize * tokensPerExample * this.hyperparameters.epochs;
    
    const costPer1KTokens = {
      full: 0.008, // $ per 1K tokens
      lora: 0.002,
      pft: 0.004
    };
    
    const cost = (totalTokens / 1000) * costPer1KTokens[method];
    
    return {
      totalTokens,
      estimatedCost: cost,
      method,
      recommendations: this.getRecommendations(cost, method)
    };
  }
  
  getRecommendations(cost, method) {
    const recommendations = [];
    
    if (cost > 100) {
      recommendations.push("Consider using LoRA for cost efficiency");
    }
    
    if (method === 'full' && cost > 50) {
      recommendations.push("Full fine-tuning is expensive - consider LoRA");
    }
    
    return recommendations;
  }
}

// ============================================
// DATA PREPARATION FOR FINE-TUNING
// ============================================

class FineTuningDataPrep {
  // Prepare data in required format
  prepareForFineTuning(rawData, taskType) {
    switch (taskType) {
      case 'classification':
        return this.prepareClassificationData(rawData);
      case 'generation':
        return this.prepareGenerationData(rawData);
      case 'qa':
        return this.prepareQAData(rawData);
      default:
        return rawData;
    }
  }
  
  prepareClassificationData(data) {
    // Format: { prompt, completion }
    return data.map(item => ({
      prompt: `Classify: ${item.text}\n\nCategory:`,
      completion: ` ${item.category}` // Note: space before completion
    }));
  }
  
  prepareGenerationData(data) {
    return data.map(item => ({
      prompt: `Generate: ${item.input}\n\nOutput:`,
      completion: ` ${item.output}`
    }));
  }
  
  prepareQAData(data) {
    return data.map(item => ({
      prompt: `Q: ${item.question}\n\nA:`,
      completion: ` ${item.answer}`
    }));
  }
  
  // Validate data quality
  validateData(data) {
    const issues = [];
    
    // Check minimum examples
    if (data.length < 10) {
      issues.push("Need at least 10 examples for fine-tuning");
    }
    
    // Check prompt length
    const avgPromptLength = data.reduce(
      (sum, ex) => sum + ex.prompt.length, 0
    ) / data.length;
    
    if (avgPromptLength < 10) {
      issues.push("Prompts are too short");
    }
    
    // Check completion length
    const avgCompletionLength = data.reduce(
      (sum, ex) => sum + ex.completion.length, 0
    ) / data.length;
    
    if (avgCompletionLength < 5) {
      issues.push("Completions are too short");
    }
    
    // Check for duplicates
    const uniquePrompts = new Set(data.map(ex => ex.prompt));
    if (uniquePrompts.size < data.length * 0.9) {
      issues.push("Too many duplicate prompts");
    }
    
    return {
      isValid: issues.length === 0,
      issues: issues,
      stats: {
        totalExamples: data.length,
        avgPromptLength: Math.round(avgPromptLength),
        avgCompletionLength: Math.round(avgCompletionLength),
        uniquePrompts: uniquePrompts.size
      }
    };
  }
  
  // Split data for training/validation
  splitData(data, trainRatio = 0.8) {
    const shuffled = [...data].sort(() => Math.random() - 0.5);
    const splitIndex = Math.floor(data.length * trainRatio);
    
    return {
      train: shuffled.slice(0, splitIndex),
      validation: shuffled.slice(splitIndex)
    };
  }
}

// ============================================
// FINE-TUNING WORKFLOW
// ============================================

class FineTuningWorkflow {
  constructor() {
    this.steps = [];
  }
  
  // Complete fine-tuning workflow
  async executeWorkflow(config) {
    this.steps = [
      '1. Prepare training data',
      '2. Validate data quality',
      '3. Choose fine-tuning method',
      '4. Configure hyperparameters',
      '5. Start fine-tuning job',
      '6. Monitor training progress',
      '7. Evaluate model performance',
      '8. Deploy fine-tuned model'
    ];
    
    const results = {
      dataPrep: this.prepareData(config.data),
      validation: this.validateData(config.data),
      method: this.chooseMethod(config),
      hyperparameters: this.configureHyperparameters(config),
      training: await this.startTraining(config),
      evaluation: await this.evaluateModel(config),
      deployment: await this.deployModel(config)
    };
    
    return results;
  }
  
  prepareData(data) {
    const prep = new FineTuningDataPrep();
    return prep.prepareForFineTuning(data, 'generation');
  }
  
  validateData(data) {
    const prep = new FineTuningDataPrep();
    return prep.validateData(data);
  }
  
  chooseMethod(config) {
    const pipeline = new FineTuningPipeline(null, config.taskType);
    
    if (config.budget === 'low' || config.compute === 'limited') {
      return pipeline.getFineTuningConfig('lora');
    }
    
    return pipeline.getFineTuningConfig('full');
  }
  
  configureHyperparameters(config) {
    return {
      learningRate: config.learningRate || 1e-5,
      batchSize: config.batchSize || 8,
      epochs: config.epochs || 3,
      maxLength: config.maxLength || 512
    };
  }
  
  async startTraining(config) {
    // Simulated training
    return {
      jobId: 'ft-job-123',
      status: 'training',
      estimatedTime: '2 hours'
    };
  }
  
  async evaluateModel(config) {
    // Simulated evaluation
    return {
      accuracy: 0.92,
      loss: 0.15,
      metrics: {
        precision: 0.90,
        recall: 0.94,
        f1: 0.92
      }
    };
  }
  
  async deployModel(config) {
    // Simulated deployment
    return {
      modelId: 'ft-model-123',
      endpoint: 'https://api.example.com/v1/models/ft-model-123',
      status: 'deployed'
    };
  }
}

// ============================================
// USAGE EXAMPLE
// ============================================

const workflow = new FineTuningWorkflow();

const config = {
  data: [
    { input: "Create login form", output: "function LoginForm() { ... }" },
    { input: "Validate email", output: "function validateEmail() { ... }" }
    // ... more examples
  ],
  taskType: 'code',
  budget: 'low',
  compute: 'limited'
};

// Execute workflow
workflow.executeWorkflow(config).then(results => {
  console.log('Fine-tuning complete:', results);
});
```

---

## E) Internal Working

**Fine-tuning Process:**
1. **Start with Pre-trained Model:** Base model weights
2. **Prepare Data:** Format for task
3. **Choose Method:** Full/LoRA/PEFT
4. **Train:** Update parameters on new data
5. **Evaluate:** Test performance
6. **Deploy:** Use fine-tuned model

**Key Considerations:**
- **Data Quality:** High-quality data essential
- **Data Size:** Minimum examples needed
- **Method Choice:** Balance cost and performance
- **Hyperparameters:** Learning rate, batch size
- **Overfitting:** Monitor validation loss

---

## F) Interview Questions & Answers

### Q1: What is Fine-tuning and when would you use it?

**Answer:**
Fine-tuning adapts pre-trained model for specific task by training on domain-specific data. Use when: Need domain-specific performance, custom behavior required, better accuracy on specialized tasks, have limited training data (transfer learning), cost-effective specialization needed. Process: Start with pre-trained model, add task-specific data, train to adapt weights. More efficient than training from scratch.

### Q2: What's the difference between Full Fine-tuning and LoRA?

**Answer:**
Full Fine-tuning: Updates all model parameters, requires more compute and data, maximum performance, expensive. LoRA (Low-Rank Adaptation): Updates few parameters using low-rank matrices, requires less compute and data, efficient, good performance, cost-effective. Choose Full for maximum performance with sufficient resources, LoRA for efficiency and limited resources.

### Q3: How do you prepare data for fine-tuning?

**Answer:**
Data preparation: Format as prompt-completion pairs, ensure high quality (accurate, relevant), sufficient quantity (minimum 10-100 examples depending on task), diverse examples (cover use cases), validate data (check for duplicates, length, quality), split into train/validation. Format: { prompt: "instruction", completion: " expected output" }. Quality matters more than quantity.

---

## G) Common Mistakes

### Mistake 1: Insufficient or Poor Quality Data

```javascript
// ❌ WRONG - Too few examples, poor quality
const data = [
  { input: "code", output: "function() {}" },
  { input: "code", output: "function() {}" } // Duplicate
];
// Too few examples, duplicates, vague

// ✅ CORRECT - Sufficient, diverse, high quality
const data = [
  { input: "Create login form with email and password", 
    output: "function LoginForm() { ... }" },
  { input: "Validate email format", 
    output: "function validateEmail() { ... }" },
  // ... 50+ diverse examples
];
```

**Why it breaks:** Poor data leads to poor model performance, overfitting.

---

## H) When to Use & When NOT to Use

Use Fine-tuning for: Domain-specific tasks, custom behavior, better accuracy, when have task-specific data. Don't use when: Generic model sufficient, no domain-specific data, budget very limited, task changes frequently.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain Fine-tuning."

**You:"
"Fine-tuning adapts pre-trained model for specific task by training on domain-specific data. Types: Full (update all parameters, maximum performance), LoRA (update few parameters, efficient), PEFT (parameter-efficient methods).

Process: Start with pre-trained model, prepare task-specific data, choose method, train to adapt weights, evaluate, deploy. Use when need domain-specific performance or custom behavior. More efficient than training from scratch - leverages pre-trained knowledge."

---

## J) Mini Practice Task

Practice: Prepare fine-tuning data, choose fine-tuning method, estimate costs, validate data quality, understand full vs LoRA trade-offs.

---

**END OF TOPIC: FINE-TUNING**

