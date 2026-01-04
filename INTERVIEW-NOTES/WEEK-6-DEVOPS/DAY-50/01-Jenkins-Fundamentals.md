# JENKINS FUNDAMENTALS

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**Jenkins kya hai?**
- Jenkins CI/CD automation tool hai
- Continuous Integration aur Continuous Deployment enable karta hai
- Build, test, deploy automate karta hai
- Pipeline-based workflows
- Open-source, extensible

**Real-life Analogy:**
- Jenkins = Automated factory
- Pipeline = Production line
- Jobs = Tasks
- Builds = Products
- Plugins = Tools (extend functionality)

**Jenkins Components:**
- **Jobs:** Build tasks
- **Pipelines:** Workflow definitions
- **Plugins:** Extensions
- **Nodes:** Build agents
- **Workspace:** Build directory

**Jenkins Features:**
- **CI/CD:** Continuous Integration/Deployment
- **Pipeline as Code:** Version controlled pipelines
- **Distributed Builds:** Multiple agents
- **Plugin Ecosystem:** Extensive plugins
- **Integration:** Git, Docker, Kubernetes

---

## B) Easy English Theory

### What is Jenkins?

Jenkins is open-source CI/CD automation tool. Enables Continuous Integration (automated builds, tests) and Continuous Deployment (automated deployments). Features: Pipeline as Code (version controlled), Distributed builds (multiple agents), Plugin ecosystem (extensible), Integration (Git, Docker, Kubernetes). Components: Jobs (build tasks), Pipelines (workflows), Plugins (extensions), Nodes (agents). Use for automated build, test, deploy workflows.

---

## C) Why This Concept Exists

### The Problem

**Without CI/CD:**
- Manual builds and deployments
- Human errors
- Slow release cycles
- No automated testing
- Difficult rollbacks

### The Solution

**Jenkins Provides:**
1. **Automation:** Automated workflows
2. **Speed:** Fast builds and deployments
3. **Quality:** Automated testing
4. **Reliability:** Consistent processes
5. **Visibility:** Build history and logs

---

## D) Practical Example (Code)

```groovy
// ============================================
// JENKINS PIPELINE (DECLARATIVE)
// ============================================

pipeline {
    agent any
    
    environment {
        NODE_ENV = 'production'
        DOCKER_IMAGE = 'myapp:${env.BUILD_NUMBER}'
        REGISTRY = 'docker.io/myuser'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
        
        stage('Test') {
            steps {
                sh 'npm test'
            }
            post {
                always {
                    junit 'test-results.xml'
                }
            }
        }
        
        stage('Docker Build') {
            steps {
                script {
                    docker.build("${DOCKER_IMAGE}")
                }
            }
        }
        
        stage('Docker Push') {
            steps {
                script {
                    docker.withRegistry('https://registry.example.com', 'docker-credentials') {
                        docker.image("${DOCKER_IMAGE}").push()
                    }
                }
            }
        }
        
        stage('Deploy') {
            steps {
                sh 'kubectl set image deployment/myapp myapp=${DOCKER_IMAGE}'
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline succeeded!'
            mail to: 'team@example.com',
                 subject: "Build ${env.BUILD_NUMBER} succeeded",
                 body: "Build ${env.BUILD_NUMBER} completed successfully."
        }
        failure {
            echo 'Pipeline failed!'
        }
        always {
            cleanWs()
        }
    }
}

// ============================================
// JENKINSFILE (SCRIPTED PIPELINE)
// ============================================

node {
    stage('Checkout') {
        checkout scm
    }
    
    stage('Build') {
        sh 'npm install'
        sh 'npm run build'
    }
    
    stage('Test') {
        try {
            sh 'npm test'
        } catch (Exception e) {
            currentBuild.result = 'FAILURE'
            throw e
        }
    }
    
    stage('Deploy') {
        if (env.BRANCH_NAME == 'main') {
            sh 'kubectl apply -f k8s/'
        }
    }
}

// ============================================
// MULTI-BRANCH PIPELINE
// ============================================

pipeline {
    agent any
    
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
        
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        
        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                sh 'kubectl apply -f k8s/'
            }
        }
        
        stage('Deploy Staging') {
            when {
                branch 'develop'
            }
            steps {
                sh 'kubectl apply -f k8s/staging/'
            }
        }
    }
}

// ============================================
// PARALLEL STAGES
// ============================================

pipeline {
    agent any
    
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Test') {
            parallel {
                stage('Unit Tests') {
                    steps {
                        sh 'npm run test:unit'
                    }
                }
                stage('Integration Tests') {
                    steps {
                        sh 'npm run test:integration'
                    }
                }
                stage('E2E Tests') {
                    steps {
                        sh 'npm run test:e2e'
                    }
                }
            }
        }
        
        stage('Deploy') {
            steps {
                sh 'kubectl apply -f k8s/'
            }
        }
    }
}

// ============================================
// JENKINS WITH DOCKER
// ============================================

pipeline {
    agent {
        docker {
            image 'node:18-alpine'
            args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
    }
    
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
        
        stage('Docker Build') {
            steps {
                script {
                    def customImage = docker.build("myapp:${env.BUILD_NUMBER}")
                    customImage.push()
                }
            }
        }
    }
}

// ============================================
// JENKINS WITH KUBERNETES
// ============================================

pipeline {
    agent {
        kubernetes {
            yaml """
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: node
    image: node:18-alpine
    command: ['cat']
    tty: true
  - name: kubectl
    image: bitnami/kubectl:latest
    command: ['cat']
    tty: true
"""
        }
    }
    
    stages {
        stage('Build') {
            steps {
                container('node') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }
        
        stage('Deploy') {
            steps {
                container('kubectl') {
                    sh 'kubectl apply -f k8s/'
                }
            }
        }
    }
}

// ============================================
// JENKINS PARAMETERS
// ============================================

pipeline {
    agent any
    
    parameters {
        choice(
            name: 'ENVIRONMENT',
            choices: ['staging', 'production'],
            description: 'Deployment environment'
        )
        string(
            name: 'VERSION',
            defaultValue: 'latest',
            description: 'Application version'
        )
        booleanParam(
            name: 'SKIP_TESTS',
            defaultValue: false,
            description: 'Skip tests'
        )
    }
    
    stages {
        stage('Test') {
            when {
                not { params.SKIP_TESTS }
            }
            steps {
                sh 'npm test'
            }
        }
        
        stage('Deploy') {
            steps {
                script {
                    if (params.ENVIRONMENT == 'production') {
                        sh "kubectl set image deployment/myapp myapp=myapp:${params.VERSION} -n production"
                    } else {
                        sh "kubectl set image deployment/myapp myapp=myapp:${params.VERSION} -n staging"
                    }
                }
            }
        }
    }
}

// ============================================
// JENKINS WEBHOOKS (GITHUB)
// ============================================

/*
# GitHub Webhook Configuration
# In GitHub repository settings:
# Webhooks -> Add webhook
# Payload URL: http://jenkins.example.com/github-webhook/
# Content type: application/json
# Events: Just the push event

# Jenkinsfile with webhook trigger
pipeline {
    agent any
    
    triggers {
        githubPush()
    }
    
    stages {
        // ... stages
    }
}
*/

// ============================================
// JENKINS NOTIFICATIONS
// ============================================

pipeline {
    agent any
    
    stages {
        // ... stages
    }
    
    post {
        success {
            slackSend(
                channel: '#deployments',
                color: 'good',
                message: "Build ${env.BUILD_NUMBER} succeeded!"
            )
        }
        failure {
            slackSend(
                channel: '#deployments',
                color: 'danger',
                message: "Build ${env.BUILD_NUMBER} failed!"
            )
        }
    }
}
```

---

## E) Internal Working

**Jenkins Pipeline Flow:**
1. **Trigger:** Code push, schedule, manual
2. **Checkout:** Get source code
3. **Build:** Compile/build application
4. **Test:** Run tests
5. **Deploy:** Deploy to environment
6. **Notify:** Send notifications

**Key Concepts:**
- **Pipeline as Code:** Version controlled
- **Stages:** Logical divisions
- **Steps:** Individual actions
- **Agents:** Where builds run
- **Plugins:** Extend functionality

---

## F) Interview Questions & Answers

### Q1: What is Jenkins and how does it work?

**Answer:**
Jenkins is open-source CI/CD automation tool. Works by: Defining pipelines (workflows as code), triggering builds (on code push, schedule, manual), executing stages (checkout, build, test, deploy), running on agents (build machines), storing artifacts (build outputs). Features: Pipeline as Code, distributed builds, plugin ecosystem, integration with Git, Docker, Kubernetes. Use for automated CI/CD workflows.

### Q2: What is the difference between Declarative and Scripted Pipeline?

**Answer:**
Declarative Pipeline: Structured syntax, easier to read/write, validation, recommended for most cases, simpler error handling. Scripted Pipeline: Groovy-based, more flexible, complex logic, full Groovy power, steeper learning curve. Choose Declarative for most cases (simpler), Scripted for complex custom logic. Declarative is newer and recommended.

### Q3: How do you set up Jenkins for CI/CD?

**Answer:**
Set up Jenkins: Install Jenkins (server), Install plugins (Git, Docker, Kubernetes), Create pipeline (Jenkinsfile in repository), Configure webhooks (GitHub/GitLab triggers), Set up agents (build machines), Configure credentials (Docker registry, cloud access), Define pipeline stages (checkout, build, test, deploy), Set up notifications (Slack, email). Pipeline as Code (Jenkinsfile in repo) is best practice.

---

## G) Common Mistakes

### Mistake 1: Not Using Pipeline as Code

```groovy
// ❌ WRONG - Manual job configuration
// Job configured in Jenkins UI
// Not version controlled, hard to reproduce

// ✅ CORRECT - Pipeline as Code
// Jenkinsfile in repository
pipeline {
    agent any
    stages {
        // ... stages
    }
}
```

**Why it breaks:** Manual configuration not version controlled, hard to reproduce, difficult to maintain.

---

## H) When to Use & When NOT to Use

Use Jenkins for: CI/CD automation, complex build workflows, need extensive plugins, on-premise requirements. Don't use when: Simple workflows (GitHub Actions sufficient), cloud-native only (use cloud CI/CD), want managed service (use managed CI/CD).

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain Jenkins."

**You:"
"Jenkins is open-source CI/CD automation tool. Enables automated builds, tests, deployments. Features: Pipeline as Code (Jenkinsfile in repo), distributed builds (multiple agents), plugin ecosystem, integration with Git/Docker/Kubernetes.

Pipeline stages: Checkout, Build, Test, Deploy. Types: Declarative (structured, recommended), Scripted (flexible Groovy). Use for automated CI/CD workflows. Can run on-premise or cloud, highly extensible with plugins."

---

## J) Mini Practice Task

Practice: Set up Jenkins, create pipelines, configure webhooks, use Docker in pipelines, deploy to Kubernetes, set up notifications, implement parallel stages, use parameters.

---

**END OF TOPIC: JENKINS FUNDAMENTALS**

