# GITHUB ACTIONS

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**GitHub Actions kya hai?**
- GitHub Actions CI/CD platform hai
- GitHub repository mein integrated
- Workflows define karte hain
- YAML-based configuration
- Free for public repos

**Real-life Analogy:**
- GitHub Actions = Automated assistant
- Workflow = Task list
- Actions = Pre-built tasks
- Runner = Worker (task execute karta hai)
- Event = Trigger (kab run kare)

**GitHub Actions Components:**
- **Workflows:** Automation definitions
- **Events:** Triggers (push, PR, schedule)
- **Jobs:** Work units
- **Steps:** Individual actions
- **Actions:** Reusable components

**GitHub Actions Features:**
- **Integrated:** GitHub mein built-in
- **Free:** Public repos ke liye free
- **Marketplace:** Pre-built actions
- **Matrix:** Multiple versions test
- **Secrets:** Secure credentials

---

## B) Easy English Theory

### What is GitHub Actions?

GitHub Actions is CI/CD platform integrated with GitHub. Define workflows in YAML, triggered by events (push, PR, schedule). Components: Workflows (automation definitions), Events (triggers), Jobs (work units), Steps (actions), Actions (reusable components). Features: Integrated with GitHub, free for public repos, marketplace actions, matrix builds, secrets management. Use for CI/CD directly in GitHub.

---

## C) Why This Concept Exists

### The Problem

**Without GitHub Actions:**
- External CI/CD setup needed
- Separate tool configuration
- No GitHub integration
- Additional costs
- Complex setup

### The Solution

**GitHub Actions Provides:**
1. **Integration:** Built into GitHub
2. **Simplicity:** YAML-based, easy setup
3. **Free:** Public repos free
4. **Marketplace:** Pre-built actions
5. **Visibility:** Workflows visible in repo

---

## D) Practical Example (Code)

```yaml
# ============================================
# GITHUB ACTIONS WORKFLOW
# ============================================

# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]
  schedule:
    - cron: '0 2 * * *'  # Daily at 2 AM

env:
  NODE_VERSION: '18'
  DOCKER_IMAGE: myapp

jobs:
  # ============================================
  # BUILD AND TEST
  # ============================================
  build-and-test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [16, 18, 20]
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linter
      run: npm run lint
    
    - name: Run tests
      run: npm test
      env:
        CI: true
    
    - name: Upload coverage
      uses: codecov/codecov-action@v3
      with:
        file: ./coverage/lcov.info

  # ============================================
  # BUILD DOCKER IMAGE
  # ============================================
  build-docker:
    runs-on: ubuntu-latest
    needs: build-and-test
    if: github.ref == 'refs/heads/main'
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
    
    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v2
    
    - name: Login to Docker Hub
      uses: docker/login-action@v2
      with:
        username: ${{ secrets.DOCKER_USERNAME }}
        password: ${{ secrets.DOCKER_PASSWORD }}
    
    - name: Build and push
      uses: docker/build-push-action@v4
      with:
        context: .
        push: true
        tags: |
          ${{ secrets.DOCKER_USERNAME }}/${{ env.DOCKER_IMAGE }}:latest
          ${{ secrets.DOCKER_USERNAME }}/${{ env.DOCKER_IMAGE }}:${{ github.sha }}

  # ============================================
  # DEPLOY TO KUBERNETES
  # ============================================
  deploy:
    runs-on: ubuntu-latest
    needs: build-docker
    if: github.ref == 'refs/heads/main'
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
    
    - name: Set up kubectl
      uses: azure/setup-kubectl@v3
    
    - name: Configure kubectl
      run: |
        echo "${{ secrets.KUBECONFIG }}" | base64 -d > kubeconfig
        export KUBECONFIG=kubeconfig
    
    - name: Deploy to Kubernetes
      run: |
        kubectl set image deployment/myapp \
          myapp=${{ secrets.DOCKER_USERNAME }}/${{ env.DOCKER_IMAGE }}:${{ github.sha }} \
          -n production

  # ============================================
  # DEPLOY TO STAGING
  # ============================================
  deploy-staging:
    runs-on: ubuntu-latest
    needs: build-and-test
    if: github.ref == 'refs/heads/develop'
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
    
    - name: Deploy to staging
      run: |
        echo "Deploying to staging..."
        # Deployment commands

# ============================================
# MATRIX BUILD
# ============================================

name: Matrix Build

on: [push, pull_request]

jobs:
  test:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
        node-version: [16, 18, 20]
        exclude:
          - os: windows-latest
            node-version: 16
    
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
    - run: npm ci
    - run: npm test

# ============================================
# CACHING
# ============================================

name: Cached Build

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Cache node modules
      uses: actions/cache@v3
      with:
        path: ~/.npm
        key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
        restore-keys: |
          ${{ runner.os }}-node-
    
    - name: Install dependencies
      run: npm ci

# ============================================
# ENVIRONMENT DEPLOYMENTS
# ============================================

name: Deploy

on:
  workflow_dispatch:
    inputs:
      environment:
        description: 'Environment'
        required: true
        type: choice
        options:
          - staging
          - production

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: ${{ github.event.inputs.environment }}
    
    steps:
    - name: Deploy
      run: |
        echo "Deploying to ${{ github.event.inputs.environment }}"
        # Deployment commands

# ============================================
# NOTIFICATIONS
# ============================================

name: CI with Notifications

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    - run: npm test
    
    - name: Notify on failure
      if: failure()
      uses: 8398a7/action-slack@v3
      with:
        status: ${{ job.status }}
        text: 'Build failed!'
        webhook_url: ${{ secrets.SLACK_WEBHOOK }}

# ============================================
# CUSTOM ACTIONS
# ============================================

# action.yml
name: 'My Custom Action'
description: 'Custom action description'
inputs:
  input1:
    description: 'Input 1'
    required: true
  input2:
    description: 'Input 2'
    required: false
    default: 'default-value'

runs:
  using: 'node16'
  main: 'dist/index.js'

# Use in workflow
- name: Use custom action
  uses: ./.github/actions/my-action
  with:
    input1: 'value1'
    input2: 'value2'
```

---

## E) Internal Working

**GitHub Actions Flow:**
1. **Event:** Trigger (push, PR, schedule)
2. **Workflow:** YAML file parsed
3. **Jobs:** Jobs created
4. **Runner:** Virtual machine allocated
5. **Steps:** Steps executed
6. **Artifacts:** Results stored
7. **Notifications:** Status sent

**Key Concepts:**
- **Workflows:** YAML definitions
- **Events:** Triggers
- **Jobs:** Parallel execution
- **Steps:** Sequential actions
- **Secrets:** Secure storage

---

## F) Interview Questions & Answers

### Q1: What is GitHub Actions and how does it work?

**Answer:**
GitHub Actions is CI/CD platform integrated with GitHub. Works by: Defining workflows in YAML (`.github/workflows/`), triggered by events (push, PR, schedule), runs on GitHub-hosted runners (virtual machines), executes jobs (can run in parallel), runs steps (individual actions). Features: Built into GitHub, free for public repos, marketplace actions, matrix builds, secrets management. Use for CI/CD directly in GitHub repositories.

### Q2: What are the advantages of GitHub Actions over Jenkins?

**Answer:**
GitHub Actions advantages: Integrated with GitHub (no separate setup), free for public repos, YAML-based (simple), marketplace actions (pre-built), GitHub-hosted runners (no infrastructure), visible in repository. Jenkins advantages: More plugins, on-premise option, more flexible, better for complex workflows. Choose GitHub Actions for GitHub repos, simplicity, cloud-native. Choose Jenkins for on-premise, complex requirements, extensive customization.

### Q3: How do you use secrets in GitHub Actions?

**Answer:**
Secrets in GitHub Actions: Store in repository settings (Settings → Secrets), access with `${{ secrets.SECRET_NAME }}`, encrypted at rest, not visible in logs (masked), can be scoped to environments. Use for: API keys, passwords, certificates, tokens. Best practice: Never commit secrets, use repository secrets, use environment secrets for production. Secrets are encrypted and only accessible in workflows.

---

## G) Common Mistakes

### Mistake 1: Exposing Secrets in Logs

```yaml
# ❌ WRONG - Secret in echo
- name: Debug
  run: echo "API Key: ${{ secrets.API_KEY }}"
# Secret visible in logs

# ✅ CORRECT - Use environment variable
- name: Use secret
  env:
    API_KEY: ${{ secrets.API_KEY }}
  run: node script.js
# Secret masked in logs
```

**Why it breaks:** Secrets exposed in logs, security risk.

---

## H) When to Use & When NOT to Use

Use GitHub Actions for: GitHub repositories, simple CI/CD, cloud-native workflows, public repos (free). Don't use when: Need on-premise, complex custom requirements, not using GitHub, need extensive customization.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain GitHub Actions."

**You:"
"GitHub Actions is CI/CD platform integrated with GitHub. Define workflows in YAML, triggered by events (push, PR, schedule). Runs on GitHub-hosted runners, executes jobs (can be parallel), runs steps (individual actions).

Features: Built into GitHub, free for public repos, marketplace actions, matrix builds, secrets management. Use for CI/CD directly in GitHub. Advantages: Integrated, simple YAML, no infrastructure setup, visible in repository."

---

## J) Mini Practice Task

Practice: Create workflows, use matrix builds, implement caching, set up deployments, use secrets, create custom actions, configure notifications, use environments.

---

**END OF TOPIC: GITHUB ACTIONS**

