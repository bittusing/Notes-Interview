# PROMPT ENGINEERING FUNDAMENTALS

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Prompt Engineering kya hai?**
- Prompt Engineering effective instructions banane ka art hai
- Model ko sahi tarah se guide karna
- Better prompts = Better results
- Different techniques use karte hain
- Critical skill for Generative AI

**Real-life Analogy:**
- Prompt Engineering = Recipe writing
- Good recipe = Clear instructions (kya, kaise, kitna)
- Bad recipe = Vague instructions (confusion)
- Model = Chef (recipe follow karta hai)
- Output = Dish (result)

**Prompt Engineering Principles:**
- **Clarity:** Clear instructions
- **Specificity:** Specific requirements
- **Context:** Provide relevant context
- **Examples:** Show desired format
- **Iteration:** Refine based on results

**Techniques:**
- **Zero-shot:** Direct instruction
- **Few-shot:** Examples provide
- **Chain-of-Thought:** Step-by-step reasoning
- **Role-playing:** Assign role to model
- **Format specification:** Output format define

---

## B) Easy English Theory

### What is Prompt Engineering?

Prompt Engineering is art of crafting effective instructions (prompts) for generative AI models. Better prompts produce better results. Principles: Clarity (clear instructions), Specificity (specific requirements), Context (relevant information), Examples (show format), Iteration (refine). Techniques: Zero-shot (direct), Few-shot (with examples), Chain-of-Thought (step-by-step), Role-playing, Format specification.

---

## C) Why This Concept Exists

### The Problem

**Without Good Prompts:**
- Unclear or incorrect outputs
- Model confusion
- Poor results
- Wasted tokens
- Inefficient usage

### The Solution

**Prompt Engineering Provides:**
1. **Better Results:** Accurate outputs
2. **Control:** Guide model behavior
3. **Efficiency:** Fewer iterations needed
4. **Consistency:** Reliable outputs
5. **Cost Optimization:** Better token usage

---

## D) Practical Example (Code)

```javascript
// ============================================
// PROMPT ENGINEERING TECHNIQUES
// ============================================

class PromptEngineer {
  // ============================================
  // ZERO-SHOT PROMPTING
  // ============================================
  
  zeroShot(task, input) {
    return `
Task: ${task}
Input: ${input}
Output:
`;
  }
  
  // Example
  zeroShotExample() {
    return `
Task: Translate to French
Input: Hello, how are you?
Output:
`;
  }
  
  // ============================================
  // FEW-SHOT PROMPTING
  // ============================================
  
  fewShot(task, examples, input) {
    let prompt = `Task: ${task}\n\nExamples:\n`;
    
    examples.forEach((ex, i) => {
      prompt += `Example ${i + 1}:\n`;
      prompt += `Input: ${ex.input}\n`;
      prompt += `Output: ${ex.output}\n\n`;
    });
    
    prompt += `Input: ${input}\nOutput:`;
    return prompt;
  }
  
  // Example
  fewShotExample() {
    const examples = [
      { input: "happy", output: "😊" },
      { input: "sad", output: "😢" },
      { input: "angry", output: "😠" }
    ];
    
    return this.fewShot(
      "Convert emotion words to emojis",
      examples,
      "excited"
    );
  }
  
  // ============================================
  // CHAIN-OF-THOUGHT PROMPTING
  // ============================================
  
  chainOfThought(problem) {
    return `
Solve this problem step by step:

Problem: ${problem}

Let's think step by step:
1. First, I need to...
2. Then, I should...
3. Finally, I will...

Solution:
`;
  }
  
  // Example
  chainOfThoughtExample() {
    return this.chainOfThought(
      "If a train travels 120 km in 2 hours, what is its average speed?"
    );
  }
  
  // ============================================
  // ROLE-PLAYING PROMPTING
  // ============================================
  
  rolePlay(role, task, context) {
    return `
You are a ${role}.

Context: ${context}

Task: ${task}

Provide your response as a ${role} would:
`;
  }
  
  // Example
  rolePlayExample() {
    return this.rolePlay(
      "senior software engineer",
      "Review this code for potential issues",
      "Working on a production React application"
    );
  }
  
  // ============================================
  // FORMAT SPECIFICATION
  // ============================================
  
  formatSpecification(task, format) {
    return `
Task: ${task}

Provide the output in the following format:
${format}

Output:
`;
  }
  
  // Example
  formatSpecificationExample() {
    return this.formatSpecification(
      "Extract key information from the text",
      `
{
  "summary": "brief summary",
  "keyPoints": ["point1", "point2", "point3"],
  "sentiment": "positive/negative/neutral"
}
`
    );
  }
  
  // ============================================
  // TEMPLATE-BASED PROMPTS
  // ============================================
  
  codeReviewPrompt(code, language, focusAreas) {
    return `
You are an expert ${language} code reviewer.

Review the following code:
\`\`\`${language}
${code}
\`\`\`

Focus on:
${focusAreas.map(area => `- ${area}`).join('\n')}

Provide feedback in this format:
1. **Bugs**: List any bugs found
2. **Performance**: Performance improvements
3. **Best Practices**: Code quality suggestions
4. **Security**: Security concerns
5. **Overall Rating**: 1-10

Review:
`;
  }
  
  codeGenerationPrompt(description, language, requirements) {
    return `
Generate ${language} code with the following specifications:

Description: ${description}

Requirements:
${requirements.map(req => `- ${req}`).join('\n')}

Constraints:
- Follow ${language} best practices
- Include error handling
- Add comments for complex logic
- Use meaningful variable names

Code:
`;
  }
  
  documentationPrompt(code, language) {
    return `
Generate comprehensive documentation for this ${language} code:

\`\`\`${language}
${code}
\`\`\`

Include:
1. **Overview**: What the code does
2. **Functions/Classes**: Description of each
3. **Parameters**: Parameter explanations
4. **Returns**: Return value description
5. **Examples**: Usage examples
6. **Notes**: Important considerations

Documentation:
`;
  }
  
  // ============================================
  // PROMPT OPTIMIZATION
  // ============================================
  
  optimizePrompt(originalPrompt, feedback) {
    // Analyze feedback and suggest improvements
    const improvements = [];
    
    if (feedback.includes("unclear")) {
      improvements.push("Add more specific instructions");
    }
    
    if (feedback.includes("wrong format")) {
      improvements.push("Specify exact output format");
    }
    
    if (feedback.includes("missing context")) {
      improvements.push("Provide more context");
    }
    
    return {
      original: originalPrompt,
      improvements: improvements,
      optimized: this.applyImprovements(originalPrompt, improvements)
    };
  }
  
  applyImprovements(prompt, improvements) {
    // Apply improvements to prompt
    let optimized = prompt;
    
    if (improvements.includes("Add more specific instructions")) {
      optimized += "\n\nBe specific and detailed in your response.";
    }
    
    if (improvements.includes("Specify exact output format")) {
      optimized += "\n\nFormat your response as specified above.";
    }
    
    return optimized;
  }
  
  // ============================================
  // PROMPT TEMPLATES
  // ============================================
  
  getTemplate(templateName, params) {
    const templates = {
      explanation: `
Explain the following concept: ${params.concept}

Provide:
1. Definition
2. How it works
3. Use cases
4. Examples
5. Common mistakes to avoid
`,
      
      comparison: `
Compare ${params.item1} and ${params.item2}:

Compare on:
- ${params.criteria?.join('\n- ') || 'Features, Use cases, Pros and Cons'}

Provide a detailed comparison:
`,
      
      troubleshooting: `
Help troubleshoot this issue:

Problem: ${params.problem}
Error: ${params.error}
Context: ${params.context}

Provide:
1. Root cause analysis
2. Solution steps
3. Prevention tips
`,
      
      learning: `
Create a learning guide for: ${params.topic}

Include:
1. Prerequisites
2. Core concepts
3. Step-by-step learning path
4. Practice exercises
5. Resources
`
    };
    
    return templates[templateName] || "";
  }
}

// ============================================
// PROMPT VALIDATION
// ============================================

class PromptValidator {
  validate(prompt) {
    const issues = [];
    
    // Check length
    if (prompt.length < 10) {
      issues.push("Prompt too short - add more details");
    }
    
    if (prompt.length > 4000) {
      issues.push("Prompt too long - may exceed context window");
    }
    
    // Check clarity
    if (!this.hasClearTask(prompt)) {
      issues.push("No clear task specified");
    }
    
    // Check specificity
    if (this.isTooVague(prompt)) {
      issues.push("Prompt is too vague - be more specific");
    }
    
    // Check format specification
    if (this.needsFormatSpec(prompt)) {
      issues.push("Consider specifying output format");
    }
    
    return {
      isValid: issues.length === 0,
      issues: issues,
      score: this.calculateScore(prompt, issues)
    };
  }
  
  hasClearTask(prompt) {
    const taskKeywords = ['generate', 'explain', 'create', 'write', 'analyze', 'review'];
    return taskKeywords.some(keyword => 
      prompt.toLowerCase().includes(keyword)
    );
  }
  
  isTooVague(prompt) {
    const vagueWords = ['something', 'anything', 'whatever', 'some'];
    const vagueCount = vagueWords.filter(word => 
      prompt.toLowerCase().includes(word)
    ).length;
    return vagueCount > 2;
  }
  
  needsFormatSpec(prompt) {
    return !prompt.toLowerCase().includes('format') && 
           !prompt.toLowerCase().includes('output');
  }
  
  calculateScore(prompt, issues) {
    let score = 100;
    score -= issues.length * 20;
    score = Math.max(0, score);
    return score;
  }
}

// ============================================
// USAGE EXAMPLES
// ============================================

const engineer = new PromptEngineer();
const validator = new PromptValidator();

// Example 1: Code Review
const codeReviewPrompt = engineer.codeReviewPrompt(
  `function add(a, b) { return a + b; }`,
  "JavaScript",
  ["Error handling", "Type safety", "Edge cases"]
);

// Example 2: Code Generation
const codeGenPrompt = engineer.codeGenerationPrompt(
  "Create a function to validate email addresses",
  "JavaScript",
  [
    "Check email format",
    "Return boolean",
    "Handle edge cases"
  ]
);

// Example 3: Validation
const validation = validator.validate(codeReviewPrompt);
console.log("Prompt Score:", validation.score);
console.log("Issues:", validation.issues);
```

---

## E) Internal Working

**Prompt Engineering Process:**
1. **Define Task:** Clear objective
2. **Add Context:** Relevant information
3. **Specify Format:** Output structure
4. **Provide Examples:** Few-shot learning
5. **Iterate:** Refine based on results

**Best Practices:**
- Start specific
- Use examples
- Specify format
- Add constraints
- Test and iterate

---

## F) Interview Questions & Answers

### Q1: What is Prompt Engineering and why is it important?

**Answer:**
Prompt Engineering is crafting effective instructions for generative AI models. Important because: Better prompts = better results, can control model behavior, improves accuracy and relevance, reduces iterations, optimizes token usage. Key principles: Clarity, Specificity, Context, Examples, Iteration. Critical skill for using generative AI effectively.

### Q2: What are different Prompt Engineering techniques?

**Answer:**
Techniques: Zero-shot (direct instruction without examples), Few-shot (provide examples of desired output), Chain-of-Thought (step-by-step reasoning), Role-playing (assign role to model), Format specification (define exact output format), Template-based (reusable prompt templates). Choose based on task: Simple tasks → zero-shot, Complex tasks → few-shot or chain-of-thought, Structured output → format specification.

### Q3: How do you improve a prompt that's not giving good results?

**Answer:**
Improve prompts by: Adding more context (relevant information), Being more specific (clear requirements), Providing examples (few-shot learning), Specifying format (exact output structure), Breaking into steps (chain-of-thought), Adding constraints (limitations), Iterating based on results (test and refine). Analyze what's wrong: Unclear? Add specificity. Wrong format? Specify format. Missing context? Add context.

---

## G) Common Mistakes

### Mistake 1: Vague Prompts

```javascript
// ❌ WRONG - Too vague
const prompt = "Write code";
// Unclear what code, what language, what purpose

// ✅ CORRECT - Specific
const prompt = `
Write a JavaScript function that:
1. Takes an array of numbers
2. Returns the sum of all even numbers
3. Handles empty arrays
4. Includes error handling
5. Has JSDoc comments
`;
```

**Why it breaks:** Vague prompts produce unclear or incorrect results.

---

## H) When to Use & When NOT to Use

Use Prompt Engineering for: All generative AI interactions, code generation, documentation, explanations, translations. Always use good prompts - it's essential for good results. Don't skip prompt engineering - poor prompts waste tokens and produce bad results.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain Prompt Engineering."

**You:**
"Prompt Engineering is crafting effective instructions for generative AI. Better prompts produce better results. Techniques: Zero-shot (direct), Few-shot (with examples), Chain-of-Thought (step-by-step), Role-playing, Format specification.

Principles: Clarity, Specificity, Context, Examples, Iteration. Process: Define task, add context, specify format, provide examples, iterate. Critical skill - poor prompts waste tokens and produce bad results, good prompts get accurate outputs efficiently."

---

## J) Mini Practice Task

Practice: Write prompts for code generation, code review, documentation, explanations. Experiment with different techniques. Validate prompts. Iterate and improve based on results.

---

**END OF TOPIC: PROMPT ENGINEERING FUNDAMENTALS**

