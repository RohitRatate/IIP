export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface ResourceItem {
  id: string;
  name: string;
  type: 'VIDEO' | 'DOC' | 'LAB';
  url: string;
}

export interface TaskConfig {
  taskNumber: number;
  title: string;
  objective: string;
  task: string;
  resources: ResourceItem[];
}

export interface InternshipProgram {
  id: string;
  title: string;
  type: 'SELF_PLACED' | 'MENTOR_GUIDED' | 'COMPANY_REMOTE' | 'COMPANY_ON_PREMISES';
  badgeText: string;
  companyName: string;
  companyLogo: string;
  duration: string; // "2 Months"
  description: string;
  enrollmentMode: string;
  mentorName?: string;
  mentorRole?: string;
  orientationVideoUrl: string;
  orientationVideoTitle: string;
  rules: string[];
  quizQuestions: QuizQuestion[];
  tasks: TaskConfig[];
}

export interface TaskSubmission {
  taskNumber: number;
  submitted: boolean;
  submissionLink?: string;
  notes?: string;
  submittedAt?: string;
  status: 'NOT_SUBMITTED' | 'UNDER_REVIEW' | 'APPROVED';
  feedback?: string;
  reviewedBy?: string;
  reviewedAt?: string;
}

export interface EnrollmentState {
  programId: string;
  studentName: string;
  studentEmail: string;
  enrolledAt: string;
  quizPassed: boolean;
  quizScore: number;
  unlockedTaskCount: number; // 1 to 8
  status: 'NOT_ENROLLED' | 'ENROLLED' | 'IN_PROGRESS' | 'COMPLETED';
  taskSubmissions: Record<number, TaskSubmission>;
  certificateGenerated: boolean;
  certificateId?: string;
}

export const MOCK_INTERNSHIPS: InternshipProgram[] = [
  {
    id: "iip-self-01",
    title: "Full-Stack Web Development",
    type: "SELF_PLACED",
    badgeText: "Virtual Internship",
    companyName: "Wingz Tech Academy",
    companyLogo: "⚡",
    duration: "2 Months",
    description: "Self-paced industry internship focused on building modern web applications with React, TypeScript, Node.js, and Cloud API integration.",
    enrollmentMode: "Open Access — Direct Student Enrollment",
    orientationVideoUrl: "https://www.youtube.com/embed/LDB4uaJ87e0",
    orientationVideoTitle: "Welcome to IIP Self-Placed Web Development",
    rules: [
      "Complete the 8 tasks sequentially.",
      "Submit the current task to instantly unlock the next one.",
      "Only approved tasks count towards your final certificate score.",
      "You have a flexible 2-month period to complete all tasks."
    ],
    quizQuestions: [
      {
        id: "q1",
        question: "How many tasks are in this case study?",
        options: ["4", "8", "12", "10"],
        correctAnswerIndex: 1
      }
    ],
    tasks: [
      {
        taskNumber: 1,
        title: "Frontend Architecture & Component System",
        objective: "Understand component design patterns, build responsive layouts, and configure clean TypeScript interfaces.",
        task: "Build a responsive dashboard layout using modular React components and CSS custom properties.",
        resources: [
          { id: "r1", name: "React 18 & TS Best Practices Guide", type: "DOC", url: "https://react.dev" },
          { id: "r2", name: "CSS Grid & Flexbox Masterclass", type: "VIDEO", url: "https://youtube.com" },
          { id: "r3", name: "Interactive Component Sandbox Lab", type: "LAB", url: "https://codesandbox.io" }
        ]
      },
      {
        taskNumber: 2,
        title: "State Management & Custom Hooks",
        objective: "Manage complex application state, custom context providers, and async data pipelines.",
        task: "Implement a robust React Context store with persistence and optimistic updates for dynamic lists.",
        resources: [
          { id: "r4", name: "State Machines in Modern Frontend", type: "DOC", url: "#" },
          { id: "r5", name: "Custom Hooks Deep Dive", type: "VIDEO", url: "#" }
        ]
      },
      {
        taskNumber: 3,
        title: "RESTful & GraphQL API Integration",
        objective: "Connect frontend components to REST & GraphQL backend endpoints with error boundaries.",
        task: "Build data fetching layers with caching, loading skeletons, and real-time pagination.",
        resources: [
          { id: "r6", name: "API Integration Standards", type: "DOC", url: "#" }
        ]
      },
      {
        taskNumber: 4,
        title: "Form Validation & Complex UI Modals",
        objective: "Handle accessible user inputs, client-side data validation schemas, and modal dialogs.",
        task: "Construct multi-step interactive wizard forms with complete inline validation and file previews.",
        resources: [
          { id: "r7", name: "Accessible Forms Blueprint", type: "DOC", url: "#" }
        ]
      },
      {
        taskNumber: 5,
        title: "Performance Optimization & Lazy Loading",
        objective: "Optimize render cycles, code splitting, image assets, and lighthouse performance scores.",
        task: "Perform performance audit on web portal and achieve >90 Lighthouse performance index.",
        resources: [
          { id: "r8", name: "Web Vitals Optimization", type: "DOC", url: "#" }
        ]
      },
      {
        taskNumber: 6,
        title: "Automated Testing & End-to-End Flows",
        objective: "Write unit tests for custom hooks, component UI snapshot tests, and flow assertions.",
        task: "Implement Jest & React Testing Library test suites covering 80% code coverage.",
        resources: [
          { id: "r9", name: "Testing Library Guide", type: "DOC", url: "#" }
        ]
      },
      {
        taskNumber: 7,
        title: "Security, Auth Tokens & CI/CD Pipeline",
        objective: "Implement JWT handling, route guards, security headers, and GitHub Actions deployments.",
        task: "Setup automated CI workflow building project bundle and running linter on pull requests.",
        resources: [
          { id: "r10", name: "CI/CD & Security Checklist", type: "DOC", url: "#" }
        ]
      },
      {
        taskNumber: 8,
        title: "Capstone Capstone Delivery & Production Audit",
        objective: "Finalize full IIP Capstone project, conduct peer review, and prepare final presentation.",
        task: "Deploy production build to Vercel/Netlify and present final live project demonstration.",
        resources: [
          { id: "r11", name: "Capstone Guidelines", type: "DOC", url: "#" }
        ]
      }
    ]
  },
  {
    id: "iip-mentor-02",
    title: "AI & Machine Learning Engineering",
    type: "MENTOR_GUIDED",
    badgeText: "Mentored Internship",
    companyName: "DataCraft Labs",
    companyLogo: "🧠",
    duration: "2 Months",
    description: "Selective internship mentored by senior Data Scientists. Focuses on Python ML pipelines, NLP transformers, model deployment.",
    enrollmentMode: "Restricted — Trainer Selection based on Assessment",
    mentorName: "Dr. Sarah Jenkins",
    mentorRole: "Lead AI Researcher @ DataCraft",
    orientationVideoUrl: "https://www.youtube.com/embed/aircAruvnKk",
    orientationVideoTitle: "Trainer-Guided AI Internship Overview & Standards",
    rules: [
      "Complete the 8 tasks sequentially.",
      "Submit the current task to instantly unlock the next one.",
      "Only approved tasks count towards your final certificate score.",
      "You have a flexible 2-month period to complete all tasks."
    ],
    quizQuestions: [
      {
        id: "q1",
        question: "Who approves enrollment for the Mentor-Guided Internship?",
        options: [
          "Automated instant enrollment",
          "Trainer / Mentor based on performance assessment",
          "Third-party company recruiter",
          "No approval required"
        ],
        correctAnswerIndex: 1
      }
    ],
    tasks: [
      {
        taskNumber: 1,
        title: "Data Exploration & Feature Engineering",
        objective: "Clean messy tabular data, compute statistical distributions, and engineer model features.",
        task: "Perform EDA on 100k row dataset using Pandas/NumPy and export clean feature vector pipeline.",
        resources: [{ id: "rm1", name: "Pandas Feature Engineering", type: "DOC", url: "#" }]
      },
      {
        taskNumber: 2,
        title: "Supervised Learning Models & Benchmarks",
        objective: "Implement Regression & Classification algorithms with hyperparameter tuning.",
        task: "Train XGBoost and Random Forest models achieving >92% F1-score.",
        resources: [{ id: "rm2", name: "Scikit-Learn Model Selection", type: "DOC", url: "#" }]
      },
      {
        taskNumber: 3,
        title: "Deep Learning Foundations with PyTorch",
        objective: "Understand neural networks, activation functions, loss curves, and PyTorch tensors.",
        task: "Construct custom PyTorch Multi-Layer Perceptron for classification.",
        resources: [{ id: "rm3", name: "PyTorch Deep Learning Fundamentals", type: "DOC", url: "#" }]
      },
      {
        taskNumber: 4,
        title: "Computer Vision & Convolutional Networks",
        objective: "Build CNN architectures for image recognition and object classification.",
        task: "Train ResNet fine-tuned model for medical image diagnostics dataset.",
        resources: [{ id: "rm4", name: "Vision Transformers & CNNs", type: "DOC", url: "#" }]
      },
      {
        taskNumber: 5,
        title: "Natural Language Processing & Transformers",
        objective: "Fine-tune HuggingFace Transformers for sentiment analysis and text summarization.",
        task: "Deploy BERT tokenization pipeline with custom attention head analysis.",
        resources: [{ id: "rm5", name: "HuggingFace Course", type: "DOC", url: "#" }]
      },
      {
        taskNumber: 6,
        title: "LLM Prompting, RAG & Vector Databases",
        objective: "Build Retrieval-Augmented Generation (RAG) pipelines using ChromaDB and LangChain.",
        task: "Construct domain-specific AI Q&A bot connected to custom PDF knowledge base.",
        resources: [{ id: "rm6", name: "RAG Architecture Blueprint", type: "DOC", url: "#" }]
      },
      {
        taskNumber: 7,
        title: "Model Serving & FastAPI Integration",
        objective: "Wrap ML models in REST APIs with Docker containerization.",
        task: "Package PyTorch model into Dockerized FastAPI container with sub-100ms response time.",
        resources: [{ id: "rm7", name: "FastAPI ML Microservices", type: "DOC", url: "#" }]
      },
      {
        taskNumber: 8,
        title: "Capstone Model Evaluation & Trainer Signoff",
        objective: "Conduct final model drift analysis and present technical evaluation report to Mentor.",
        task: "Deliver end-to-end AI project presentation and submit code repository.",
        resources: [{ id: "rm8", name: "MLOps Production Checklist", type: "DOC", url: "#" }]
      }
    ]
  },
  {
    id: "iip-remote-03",
    title: "Cloud DevOps & Microservices Engineering",
    type: "COMPANY_REMOTE",
    badgeText: "Company Remote Internship",
    companyName: "Nexus Cloud Corp",
    companyLogo: "☁️",
    duration: "2 Months",
    description: "Work directly on live enterprise cloud infrastructure with virtual sprint meetings, real pull requests, and automated Kubernetes CI/CD workflows.",
    enrollmentMode: "Corporate Selection — Remote Technical Screening",
    mentorName: "David Chen",
    mentorRole: "Principal DevOps Lead @ Nexus Cloud",
    orientationVideoUrl: "https://www.youtube.com/embed/aircAruvnKk",
    orientationVideoTitle: "Corporate Remote Internship Protocol & Security Briefing",
    rules: [
      "Complete the sequential case study deliverables.",
      "Submit pull requests and container deployment configurations.",
      "Only company mentor-approved deliverables count towards credentialing.",
      "Follow corporate remote work ethics, branch protection, and daily standup notes."
    ],
    quizQuestions: [
      {
        id: "qr1",
        question: "How are deliverables reviewed in Company Remote Internship?",
        options: [
          "Peer review only",
          "Automated grading without feedback",
          "Corporate mentor code review on pull requests",
          "No evaluation required"
        ],
        correctAnswerIndex: 2
      }
    ],
    tasks: [
      {
        taskNumber: 1,
        title: "Containerization & Docker Multi-Stage Builds",
        objective: "Build secure and optimized Docker containers for microservices architecture.",
        task: "Construct minimal production Dockerfile for Node/Go service with non-root security context.",
        resources: [{ id: "rc1", name: "Docker Production Security Guide", type: "DOC", url: "#" }]
      },
      {
        taskNumber: 2,
        title: "Infrastructure as Code (Terraform) Automation",
        objective: "Provision cloud infrastructure declaratively using Terraform and state locking.",
        task: "Author reusable Terraform modules to launch VPC, subnets, and security groups on AWS.",
        resources: [{ id: "rc2", name: "Terraform Best Practices", type: "DOC", url: "#" }]
      },
      {
        taskNumber: 3,
        title: "Kubernetes Cluster Architecture & Helm Charts",
        objective: "Deploy high-availability application workloads with Kubernetes Deployments & Ingress.",
        task: "Package and deploy microservices using Helm charts with horizontal pod autoscaling (HPA).",
        resources: [{ id: "rc3", name: "Kubernetes in Production", type: "DOC", url: "#" }]
      },
      {
        taskNumber: 4,
        title: "Enterprise CI/CD Pipelines & GitOps",
        objective: "Automate build, vulnerability scanning, and ArgoCD sync for zero-downtime rollouts.",
        task: "Configure GitHub Actions pipeline with Trivy vulnerability scanning and automated staging deploy.",
        resources: [{ id: "rc4", name: "GitOps & ArgoCD Pipeline", type: "DOC", url: "#" }]
      },
      {
        taskNumber: 5,
        title: "Observability, Prometheus Metrics & Grafana Dashboards",
        objective: "Implement cluster-wide monitoring, distributed tracing, and critical alert policies.",
        task: "Deploy Prometheus stack with custom alerts and Grafana dashboards for latency and error rates.",
        resources: [{ id: "rc5", name: "SRE Observability Standards", type: "DOC", url: "#" }]
      },
      {
        taskNumber: 6,
        title: "Production Infrastructure Audit & Enterprise Signoff",
        objective: "Conduct security benchmark audit and present infrastructure reliability capstone to team lead.",
        task: "Deliver production cluster disaster recovery simulation and submit final architecture documentation.",
        resources: [{ id: "rc6", name: "Cloud Architecture Review Framework", type: "DOC", url: "#" }]
      }
    ]
  },
  {
    id: "iip-onprem-04",
    title: "Cybersecurity Operations & Threat Hunting",
    type: "COMPANY_ON_PREMISES",
    badgeText: "Company On premises Internship",
    companyName: "Fortress Cyber Labs",
    companyLogo: "🛡️",
    duration: "2 Months",
    description: "Hands-on corporate campus internship conducted within on-premises security operations centers (SOC). Involves packet analysis, threat defense, and incident response.",
    enrollmentMode: "Campus In-Person — Background Verification & In-Office Placement",
    mentorName: "Marcus Vance",
    mentorRole: "Director of Threat Intelligence @ Fortress Labs",
    orientationVideoUrl: "https://www.youtube.com/embed/aircAruvnKk",
    orientationVideoTitle: "On-Premises SOC Lab Protocols & Clearance",
    rules: [
      "In-person participation at partner campus SOC labs.",
      "Complete hands-on incident response and network threat defense tasks.",
      "Submissions are evaluated by on-premises security directors.",
      "Strict non-disclosure agreement (NDA) and air-gapped lab compliance."
    ],
    quizQuestions: [
      {
        id: "qo1",
        question: "Where is the Company On-Premises Internship conducted?",
        options: [
          "Fully asynchronous home study",
          "Partner corporate campus and on-premises security operations center",
          "Public coffee shops",
          "No physical presence needed"
        ],
        correctAnswerIndex: 1
      }
    ],
    tasks: [
      {
        taskNumber: 1,
        title: "Enterprise Network Topology & Packet Inspection",
        objective: "Analyze real enterprise network PCAP traffic and detect unauthorized protocol behavior.",
        task: "Perform Wireshark packet analysis on enterprise packet captures to isolate beaconing malware.",
        resources: [{ id: "ro1", name: "SOC Network Traffic Analysis", type: "DOC", url: "#" }]
      },
      {
        taskNumber: 2,
        title: "SIEM Engineering with Splunk & Elastic",
        objective: "Aggregate audit logs, write correlation rules, and triage alert queues.",
        task: "Configure Splunk dashboard with Sigma detection rules for brute-force and privilege escalation.",
        resources: [{ id: "ro2", name: "Splunk Query Language Masterclass", type: "DOC", url: "#" }]
      },
      {
        taskNumber: 3,
        title: "Vulnerability Assessment & Penetration Testing",
        objective: "Audit host configurations, identify unpatched vulnerabilities, and draft remediation plans.",
        task: "Conduct vulnerability assessment using Nessus/Nmap and produce executive executive remediation report.",
        resources: [{ id: "ro3", name: "OWASP & CVE Exploitation Manual", type: "DOC", url: "#" }]
      },
      {
        taskNumber: 4,
        title: "Incident Response & Digital Forensics",
        objective: "Acquire memory dumps, reconstruct timeline of attack, and isolate compromised endpoints.",
        task: "Perform memory forensics with Volatility to extract injected DLLs and malicious process trees.",
        resources: [{ id: "ro4", name: "Digital Forensics Incident Handbook", type: "DOC", url: "#" }]
      },
      {
        taskNumber: 5,
        title: "Enterprise SOC Defense Capstone & Director Signoff",
        objective: "Participate in live Blue Team attack-defense drill and present incident response post-mortem.",
        task: "Defend on-premises mock enterprise network against simulated APT attack and deliver final defense dossier.",
        resources: [{ id: "ro5", name: "Blue Team Operational Defense Manual", type: "DOC", url: "#" }]
      }
    ]
  }
];

export function createDefaultEnrollmentState(programId: string): EnrollmentState {
  const selectedProgram = MOCK_INTERNSHIPS.find(p => p.id === programId) || MOCK_INTERNSHIPS[0];
  const totalTasks = selectedProgram?.tasks?.length || 8;
  const taskSubmissions: Record<number, TaskSubmission> = {};

  for (let t = 1; t <= totalTasks; t++) {
    taskSubmissions[t] = {
      taskNumber: t,
      submitted: false,
      status: 'NOT_SUBMITTED'
    };
  }

  return {
    programId,
    studentName: "Alex Morgan",
    studentEmail: "alex.morgan@wingz.edu",
    enrolledAt: "2026-09-01",
    quizPassed: true,
    quizScore: 100,
    unlockedTaskCount: 1, // Start with task 1 unlocked
    status: "IN_PROGRESS",
    taskSubmissions,
    certificateGenerated: false
  };
}
