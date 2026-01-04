# AI AGENTS FUNDAMENTALS

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**AI Agents kya hain?**
- AI Agents autonomous systems hain jo goals achieve karte hain
- Tools use karke tasks complete karte hain
- Decision making karte hain
- Actions execute karte hain
- LLM + Tools + Planning = Agent

**Real-life Analogy:**
- AI Agent = Smart assistant
- LLM = Brain (thinking)
- Tools = Hands (actions)
- Planning = Strategy
- Execution = Work karna

**Agent Components:**
- **LLM:** Reasoning and planning
- **Tools:** Actions perform karne ke liye
- **Memory:** Past interactions remember
- **Planning:** Step-by-step strategy
- **Execution:** Actions perform

**Agent Types:**
- **ReAct:** Reasoning + Acting
- **AutoGPT:** Autonomous agent
- **LangChain Agents:** Framework-based
- **Tool-using Agents:** Specific tools use

---

## B) Easy English Theory

### What are AI Agents?

AI Agents are autonomous systems that achieve goals using tools and decision-making. Components: LLM (reasoning), Tools (actions), Memory (past interactions), Planning (strategy), Execution (actions). Types: ReAct (reasoning + acting), AutoGPT (autonomous), LangChain agents (framework-based). Process: Plan → Use tools → Execute → Evaluate → Iterate.

---

## C) Why This Concept Exists

### The Problem

**Without Agents:**
- Manual task execution
- No autonomous decision-making
- Limited tool usage
- No planning capability
- Single-step operations

### The Solution

**AI Agents Provide:**
1. **Autonomy:** Independent task completion
2. **Tool Usage:** Interact with systems
3. **Planning:** Multi-step strategies
4. **Adaptability:** Adjust based on results
5. **Efficiency:** Automated workflows

---

## D) Practical Example (Code)

```javascript
// ============================================
// AI AGENT FRAMEWORK
// ============================================

class AIAgent {
  constructor(llm, tools = [], memory = null) {
    this.llm = llm;
    this.tools = new Map();
    this.memory = memory || new AgentMemory();
    this.plan = [];
    this.executionHistory = [];
    
    // Register tools
    tools.forEach(tool => this.registerTool(tool));
  }
  
  // Register tool
  registerTool(tool) {
    this.tools.set(tool.name, tool);
  }
  
  // Main agent loop
  async execute(task) {
    // 1. Plan
    const plan = await this.plan(task);
    this.plan = plan;
    
    // 2. Execute steps
    for (const step of plan.steps) {
      const result = await this.executeStep(step);
      this.executionHistory.push(result);
      
      // 3. Evaluate and adapt
      if (result.success === false) {
        const adaptedPlan = await this.replan(task, result);
        this.plan = adaptedPlan;
      }
    }
    
    // 4. Return final result
    return {
      task,
      plan: this.plan,
      results: this.executionHistory,
      success: this.executionHistory.every(r => r.success)
    };
  }
  
  // Planning
  async plan(task) {
    const prompt = `
Given this task: ${task}

Break it down into steps. For each step, determine:
1. What action to take
2. Which tool to use (if any)
3. Expected outcome

Available tools: ${Array.from(this.tools.keys()).join(', ')}

Provide a step-by-step plan:
`;
    
    const response = await this.llm.generate(prompt);
    return this.parsePlan(response);
  }
  
  // Execute single step
  async executeStep(step) {
    if (step.tool) {
      // Use tool
      const tool = this.tools.get(step.tool);
      if (!tool) {
        return { success: false, error: `Tool ${step.tool} not found` };
      }
      
      try {
        const result = await tool.execute(step.parameters);
        return { success: true, step, result };
      } catch (error) {
        return { success: false, step, error: error.message };
      }
    } else {
      // LLM reasoning step
      const result = await this.llm.generate(step.prompt);
      return { success: true, step, result };
    }
  }
  
  // Replan if step fails
  async replan(originalTask, failedResult) {
    const prompt = `
Original task: ${originalTask}
Failed step: ${JSON.stringify(failedResult.step)}
Error: ${failedResult.error}

Create a new plan that addresses the failure:
`;
    
    const response = await this.llm.generate(prompt);
    return this.parsePlan(response);
  }
  
  // Parse plan from LLM response
  parsePlan(response) {
    // Simplified parsing - in real: more robust
    const steps = [];
    const lines = response.split('\n');
    
    let currentStep = null;
    for (const line of lines) {
      if (line.match(/^\d+\./)) {
        if (currentStep) steps.push(currentStep);
        currentStep = { description: line };
      } else if (line.includes('Tool:')) {
        currentStep.tool = line.split('Tool:')[1].trim();
      } else if (line.includes('Parameters:')) {
        currentStep.parameters = JSON.parse(line.split('Parameters:')[1].trim());
      }
    }
    if (currentStep) steps.push(currentStep);
    
    return { steps };
  }
}

// ============================================
// TOOLS FOR AGENTS
// ============================================

class Tool {
  constructor(name, description, executeFn) {
    this.name = name;
    this.description = description;
    this.execute = executeFn;
  }
}

// Web search tool
class WebSearchTool extends Tool {
  constructor(apiKey) {
    super(
      'web_search',
      'Search the web for information',
      async (query) => {
        // In real: Call search API
        return {
          results: [
            { title: 'Result 1', snippet: '...', url: '...' }
          ]
        };
      }
    );
  }
}

// Code execution tool
class CodeExecutionTool extends Tool {
  constructor() {
    super(
      'execute_code',
      'Execute code and return results',
      async (code) => {
        // In real: Execute in sandbox
        try {
          // Sandboxed execution
          const result = eval(code); // Simplified - use proper sandbox
          return { success: true, result };
        } catch (error) {
          return { success: false, error: error.message };
        }
      }
    );
  }
}

// File operations tool
class FileOperationsTool extends Tool {
  constructor() {
    super(
      'file_operations',
      'Read, write, or list files',
      async ({ operation, path, content }) => {
        // In real: File system operations
        switch (operation) {
          case 'read':
            return { content: 'File content...' };
          case 'write':
            return { success: true, message: 'File written' };
          case 'list':
            return { files: ['file1.txt', 'file2.txt'] };
          default:
            return { error: 'Unknown operation' };
        }
      }
    );
  }
}

// Database query tool
class DatabaseTool extends Tool {
  constructor(dbConnection) {
    super(
      'database_query',
      'Query database',
      async (query) => {
        // In real: Execute database query
        return { rows: [], columns: [] };
      }
    );
    this.db = dbConnection;
  }
}

// ============================================
// REACT AGENT (REASONING + ACTING)
// ============================================

class ReActAgent extends AIAgent {
  async react(task) {
    let thought = `Task: ${task}\n`;
    let maxIterations = 10;
    let iteration = 0;
    
    while (iteration < maxIterations) {
      // Think
      const thinkPrompt = `
${thought}

What should I do next? Think step by step.
Available tools: ${Array.from(this.tools.keys()).join(', ')}

Thought:
`;
      
      const thinking = await this.llm.generate(thinkPrompt);
      thought += `Thought: ${thinking}\n`;
      
      // Decide action
      const actionPrompt = `
${thought}

Based on my thinking, what action should I take?
Format: Action: [tool_name or "answer"]
Parameters: [JSON if tool needed]

Action:
`;
      
      const actionResponse = await this.llm.generate(actionPrompt);
      const action = this.parseAction(actionResponse);
      
      if (action.type === 'answer') {
        // Final answer
        return {
          answer: action.content,
          thoughtProcess: thought
        };
      }
      
      // Execute action
      const tool = this.tools.get(action.tool);
      if (!tool) {
        thought += `Observation: Tool ${action.tool} not found\n`;
        iteration++;
        continue;
      }
      
      const observation = await tool.execute(action.parameters);
      thought += `Action: ${action.tool}\n`;
      thought += `Observation: ${JSON.stringify(observation)}\n`;
      
      // Check if task complete
      if (this.isTaskComplete(observation, task)) {
        return {
          answer: observation,
          thoughtProcess: thought
        };
      }
      
      iteration++;
    }
    
    return {
      answer: "Task incomplete after max iterations",
      thoughtProcess: thought
    };
  }
  
  parseAction(response) {
    // Parse action from LLM response
    if (response.includes('Action: answer')) {
      return { type: 'answer', content: response };
    }
    
    const toolMatch = response.match(/Action: (\w+)/);
    const paramsMatch = response.match(/Parameters: ({.*})/);
    
    return {
      type: 'tool',
      tool: toolMatch ? toolMatch[1] : null,
      parameters: paramsMatch ? JSON.parse(paramsMatch[1]) : {}
    };
  }
  
  isTaskComplete(observation, task) {
    // Check if observation indicates task completion
    // Simplified - in real: more sophisticated
    return observation.success === true;
  }
}

// ============================================
// AGENT MEMORY
// ============================================

class AgentMemory {
  constructor() {
    this.shortTerm = []; // Recent interactions
    this.longTerm = new Map(); // Important facts
    this.maxShortTerm = 10;
  }
  
  // Add to memory
  add(interaction) {
    this.shortTerm.push(interaction);
    
    // Keep only recent
    if (this.shortTerm.length > this.maxShortTerm) {
      this.shortTerm.shift();
    }
    
    // Store important facts in long-term
    if (interaction.important) {
      this.longTerm.set(interaction.key, interaction.value);
    }
  }
  
  // Get relevant context
  getContext(query) {
    const relevant = this.shortTerm.filter(item => 
      item.content.toLowerCase().includes(query.toLowerCase())
    );
    
    return {
      shortTerm: relevant,
      longTerm: Array.from(this.longTerm.entries())
    };
  }
  
  // Clear memory
  clear() {
    this.shortTerm = [];
    this.longTerm.clear();
  }
}

// ============================================
// USAGE EXAMPLE
// ============================================

async function example() {
  // Initialize agent with tools
  const agent = new ReActAgent(
    { generate: async (prompt) => "Generated response..." }, // LLM
    [
      new WebSearchTool('api-key'),
      new FileOperationsTool(),
      new CodeExecutionTool()
    ]
  );
  
  // Execute task
  const result = await agent.react(
    "Find information about React hooks and create a summary file"
  );
  
  console.log("Result:", result);
}
```

---

## E) Internal Working

**Agent Loop:**
1. **Receive Task:** User request
2. **Plan:** Break into steps
3. **Think:** Reason about next action
4. **Act:** Use tool or generate
5. **Observe:** Get result
6. **Evaluate:** Check progress
7. **Iterate:** Continue or finish

**Key Mechanisms:**
- **Planning:** Multi-step strategy
- **Tool Selection:** Choose right tool
- **Execution:** Perform actions
- **Adaptation:** Adjust based on results

---

## F) Interview Questions & Answers

### Q1: What are AI Agents and how do they work?

**Answer:**
AI Agents are autonomous systems that achieve goals using tools and decision-making. Components: LLM (reasoning), Tools (actions - web search, code execution, file ops), Memory (past interactions), Planning (strategy), Execution (actions). Process: Plan task, think about next action, use tools, observe results, evaluate progress, iterate until complete. Types: ReAct (reasoning + acting), AutoGPT (autonomous), LangChain agents.

### Q2: What is the ReAct pattern?

**Answer:**
ReAct (Reasoning + Acting) pattern: Agent alternates between reasoning (think about what to do) and acting (use tools). Loop: Think → Act → Observe → Think → Act. Benefits: Transparent reasoning, can use tools, adapts based on observations, handles complex tasks. Thought process visible, can debug and improve. Better than pure generation for tool-using tasks.

### Q3: How do you design tools for AI Agents?

**Answer:**
Design tools: Clear name and description (so LLM understands when to use), Simple interface (execute function with parameters), Return structured results (success/error, data), Handle errors gracefully, Document usage examples. Good tools: Web search, code execution, file operations, database queries, API calls. Tools should be deterministic when possible, have clear inputs/outputs.

---

## G) Common Mistakes

### Mistake 1: No Error Handling

```javascript
// ❌ WRONG - No error handling
const result = await tool.execute(params);
return result;
// Crashes if tool fails

// ✅ CORRECT - Handle errors
try {
  const result = await tool.execute(params);
  return { success: true, result };
} catch (error) {
  return { success: false, error: error.message };
}
```

**Why it breaks:** Agent crashes on tool failures, can't recover.

---

## H) When to Use & When NOT to Use

Use AI Agents for: Multi-step tasks, tool usage needed, autonomous workflows, complex decision-making, when need planning and adaptation. Don't use when: Simple single-step tasks, no tools needed, deterministic workflows sufficient, when cost/iteration concerns.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain AI Agents."

**You:**
"AI Agents are autonomous systems that achieve goals using tools. Components: LLM (reasoning), Tools (actions), Memory, Planning, Execution. Process: Plan → Think → Act → Observe → Iterate.

ReAct pattern: Alternates reasoning and acting. Agent thinks about next action, uses tools, observes results, adapts. Use for multi-step tasks requiring tools, autonomous workflows, complex decision-making. Examples: AutoGPT, LangChain agents, tool-using assistants."

---

## J) Mini Practice Task

Practice: Build simple agent, implement tools, create ReAct agent, add memory, handle errors, test multi-step tasks.

---

**END OF TOPIC: AI AGENTS FUNDAMENTALS**

