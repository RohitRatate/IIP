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

export interface WeekConfig {
  weekNumber: number;
  title: string;
  objective: string;
  task: string;
  deadlineDays: number;
  resources: ResourceItem[];
}

export interface InternshipProgram {
  id: string;
  title: string;
  type: 'SELF_PLACED' | 'MENTOR_GUIDED' | 'COMPANY_ASSISTED';
  badgeText: string;
  companyName: string;
  companyLogo: string;
  duration: string; // "8 Weeks • 5 Working Days / Week"
  description: string;
  enrollmentMode: string;
  mentorName?: string;
  mentorRole?: string;
  orientationVideoUrl: string;
  orientationVideoTitle: string;
  rules: string[];
  quizQuestions: QuizQuestion[];
  weeks: WeekConfig[];
}

export interface DailyLog {
  dayNumber: number; // 1 to 5
  date: string; // e.g. "2026-09-01"
  // Start of Day (SOD)
  sodSubmitted: boolean;
  plannedTasks?: string;
  todayWorkFocus?: string;
  expectedOutcome?: string;
  sodTimestamp?: string;
  // End of Day (EOD)
  eodSubmitted: boolean;
  completedWork?: string;
  progressPercent?: number;
  challengesBlockers?: string;
  keyLearnings?: string;
  attachmentsLink?: string;
  eodTimestamp?: string;
}

export interface WeeklySubmission {
  weekNumber: number;
  submitted: boolean;
  submissionLink?: string;
  notes?: string;
  submittedAt?: string;
  status: 'NOT_SUBMITTED' | 'PENDING_REVIEW' | 'APPROVED' | 'REJECTED';
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
  currentWeek: number; // 1 to 8
  status: 'NOT_ENROLLED' | 'ENROLLED' | 'IN_PROGRESS' | 'PAUSED_INCOMPLETE' | 'COMPLETED';
  // Logs keyed by weekNumber -> array of 5 DailyLogs
  dailyLogs: Record<number, DailyLog[]>;
  // Submissions keyed by weekNumber -> WeeklySubmission
  submissions: Record<number, WeeklySubmission>;
  certificateGenerated: boolean;
  certificateId?: string;
}

export const MOCK_INTERNSHIPS: InternshipProgram[] = [
  {
    id: "iip-self-01",
    title: "Full-Stack Web Development",
    type: "SELF_PLACED",
    badgeText: "Direct Enrollment",
    companyName: "Wingz Tech Academy",
    companyLogo: "⚡",
    duration: "8 Weeks (5 Days/Wk)",
    description: "Self-paced industry internship focused on building modern web applications with React, TypeScript, Node.js, and Cloud API integration.",
    enrollmentMode: "Open Access — Direct Student Enrollment",
    orientationVideoUrl: "https://www.youtube.com/embed/LDB4uaJ87e0",
    orientationVideoTitle: "Welcome to IIP Self-Placed Web Development",
    rules: [
      "Submit Start of Day (SOD) update every morning before starting tasks.",
      "Submit End of Day (EOD) update every evening detailing progress & challenges.",
      "Complete all 5 working day logs for the current week to unblock submission.",
      "Submit weekly project task deliverable before the weekly deadline.",
      "Future weeks unlock sequentially after previous week approval.",
      "Unmet deadlines will pause internship status requiring admin reopening."
    ],
    quizQuestions: [
      {
        id: "q1",
        question: "What is the working structure for the IIP Internship?",
        options: [
          "3 days per week for 4 weeks",
          "5 working days per week for 8 weeks",
          "Weekend only work for 12 weeks",
          "Self-scheduled with no weekly structure"
        ],
        correctAnswerIndex: 1
      },
      {
        id: "q2",
        question: "How many daily updates are required per working day?",
        options: [
          "One update at night only",
          "Two updates: Start of Day (SOD) and End of Day (EOD)",
          "Three updates: Morning, Afternoon, Evening",
          "Only weekly updates are required"
        ],
        correctAnswerIndex: 1
      },
      {
        id: "q3",
        question: "What happens if a student misses required weekly submissions?",
        options: [
          "Auto-generation of certificate",
          "Internship is marked as Paused / Incomplete",
          "The student is permanently banned",
          "Nothing happens, next week unlocks anyway"
        ],
        correctAnswerIndex: 1
      }
    ],
    weeks: [
      {
        weekNumber: 1,
        title: "Frontend Architecture & Component System",
        objective: "Understand component design patterns, build responsive layouts, and configure clean TypeScript interfaces.",
        task: "Build a responsive dashboard layout using modular React components and CSS custom properties.",
        deadlineDays: 7,
        resources: [
          { id: "r1", name: "React 18 & TS Best Practices Guide", type: "DOC", url: "https://react.dev" },
          { id: "r2", name: "CSS Grid & Flexbox Masterclass", type: "VIDEO", url: "https://youtube.com" },
          { id: "r3", name: "Interactive Component Sandbox Lab", type: "LAB", url: "https://codesandbox.io" }
        ]
      },
      {
        weekNumber: 2,
        title: "State Management & Custom Hooks",
        objective: "Manage complex application state, custom context providers, and async data pipelines.",
        task: "Implement a robust React Context store with persistence and optimistic updates for dynamic lists.",
        deadlineDays: 7,
        resources: [
          { id: "r4", name: "State Machines in Modern Frontend", type: "DOC", url: "#" },
          { id: "r5", name: "Custom Hooks Deep Dive", type: "VIDEO", url: "#" }
        ]
      },
      {
        weekNumber: 3,
        title: "RESTful & GraphQL API Integration",
        objective: "Connect frontend components to REST & GraphQL backend endpoints with error boundaries.",
        task: "Build data fetching layers with caching, loading skeletons, and real-time pagination.",
        deadlineDays: 7,
        resources: [
          { id: "r6", name: "API Integration Standards", type: "DOC", url: "#" }
        ]
      },
      {
        weekNumber: 4,
        title: "Form Validation & Complex UI Modals",
        objective: "Handle accessible user inputs, client-side data validation schemas, and modal dialogs.",
        task: "Construct multi-step interactive wizard forms with complete inline validation and file previews.",
        deadlineDays: 7,
        resources: [
          { id: "r7", name: "Accessible Forms Blueprint", type: "DOC", url: "#" }
        ]
      },
      {
        weekNumber: 5,
        title: "Performance Optimization & Lazy Loading",
        objective: "Optimize render cycles, code splitting, image assets, and lighthouse performance scores.",
        task: "Perform performance audit on web portal and achieve >90 Lighthouse performance index.",
        deadlineDays: 7,
        resources: [
          { id: "r8", name: "Web Vitals Optimization", type: "DOC", url: "#" }
        ]
      },
      {
        weekNumber: 6,
        title: "Automated Testing & End-to-End Flows",
        objective: "Write unit tests for custom hooks, component UI snapshot tests, and flow assertions.",
        task: "Implement Jest & React Testing Library test suites covering 80% code coverage.",
        deadlineDays: 7,
        resources: [
          { id: "r9", name: "Testing Library Guide", type: "DOC", url: "#" }
        ]
      },
      {
        weekNumber: 7,
        title: "Security, Auth Tokens & CI/CD Pipeline",
        objective: "Implement JWT handling, route guards, security headers, and GitHub Actions deployments.",
        task: "Setup automated CI workflow building project bundle and running linter on pull requests.",
        deadlineDays: 7,
        resources: [
          { id: "r10", name: "CI/CD & Security Checklist", type: "DOC", url: "#" }
        ]
      },
      {
        weekNumber: 8,
        title: "Capstone Capstone Delivery & Production Audit",
        objective: "Finalize full IIP Capstone project, conduct peer review, and prepare final presentation.",
        task: "Deploy production build to Vercel/Netlify and present final live project demonstration.",
        deadlineDays: 7,
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
    badgeText: "Trainer Selected",
    companyName: "DataCraft Labs",
    companyLogo: "🧠",
    duration: "8 Weeks (5 Days/Wk)",
    description: "Selective internship mentored by senior Data Scientists. Focuses on Python ML pipelines, NLP transformers, model deployment, and weekly 1-on-1 reviews.",
    enrollmentMode: "Restricted — Trainer Selection based on Assessment",
    mentorName: "Dr. Sarah Jenkins",
    mentorRole: "Lead AI Researcher @ DataCraft",
    orientationVideoUrl: "https://www.youtube.com/embed/aircAruvnKk",
    orientationVideoTitle: "Trainer-Guided AI Internship Overview & Standards",
    rules: [
      "Trainer approval required for candidate enrollment.",
      "Attend weekly 1-on-1 code review sessions with assigned Mentor.",
      "Daily SOD and EOD work updates are audited by the Trainer.",
      "Weekly model evaluations must pass 85% accuracy benchmark.",
      "Certificate is granted upon Trainer sign-off at Week 8."
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
      },
      {
        id: "q2",
        question: "What is a unique feature of the Mentor-Guided Internship track?",
        options: [
          "No daily updates required",
          "Weekly 1-on-1 reviews and direct trainer guidance",
          "Self-graded assignments",
          "Unlimited 24-week duration"
        ],
        correctAnswerIndex: 1
      }
    ],
    weeks: [
      {
        weekNumber: 1,
        title: "Data Exploration & Feature Engineering",
        objective: "Clean messy tabular data, compute statistical distributions, and engineer model features.",
        task: "Perform EDA on 100k row dataset using Pandas/NumPy and export clean feature vector pipeline.",
        deadlineDays: 7,
        resources: [{ id: "rm1", name: "Pandas Feature Engineering", type: "DOC", url: "#" }]
      },
      {
        weekNumber: 2,
        title: "Supervised Learning Models & Benchmarks",
        objective: "Implement Regression & Classification algorithms with hyperparameter tuning.",
        task: "Train XGBoost and Random Forest models achieving >92% F1-score.",
        deadlineDays: 7,
        resources: [{ id: "rm2", name: "Scikit-Learn Model Selection", type: "DOC", url: "#" }]
      },
      {
        weekNumber: 3,
        title: "Deep Learning Foundations with PyTorch",
        objective: "Understand neural networks, activation functions, loss curves, and PyTorch tensors.",
        task: "Construct custom PyTorch Multi-Layer Perceptron for classification.",
        deadlineDays: 7,
        resources: [{ id: "rm3", name: "PyTorch Deep Learning Fundamentals", type: "DOC", url: "#" }]
      },
      {
        weekNumber: 4,
        title: "Computer Vision & Convolutional Networks",
        objective: "Build CNN architectures for image recognition and object classification.",
        task: "Train ResNet fine-tuned model for medical image diagnostics dataset.",
        deadlineDays: 7,
        resources: [{ id: "rm4", name: "Vision Transformers & CNNs", type: "DOC", url: "#" }]
      },
      {
        weekNumber: 5,
        title: "Natural Language Processing & Transformers",
        objective: "Fine-tune HuggingFace Transformers for sentiment analysis and text summarization.",
        task: "Deploy BERT tokenization pipeline with custom attention head analysis.",
        deadlineDays: 7,
        resources: [{ id: "rm5", name: "HuggingFace Course", type: "DOC", url: "#" }]
      },
      {
        weekNumber: 6,
        title: "LLM Prompting, RAG & Vector Databases",
        objective: "Build Retrieval-Augmented Generation (RAG) pipelines using ChromaDB and LangChain.",
        task: "Construct domain-specific AI Q&A bot connected to custom PDF knowledge base.",
        deadlineDays: 7,
        resources: [{ id: "rm6", name: "RAG Architecture Blueprint", type: "DOC", url: "#" }]
      },
      {
        weekNumber: 7,
        title: "Model Serving & FastAPI Integration",
        objective: "Wrap ML models in REST APIs with Docker containerization.",
        task: "Package PyTorch model into Dockerized FastAPI container with sub-100ms response time.",
        deadlineDays: 7,
        resources: [{ id: "rm7", name: "FastAPI ML Microservices", type: "DOC", url: "#" }]
      },
      {
        weekNumber: 8,
        title: "Capstone Model Evaluation & Trainer Signoff",
        objective: "Conduct final model drift analysis and present technical evaluation report to Mentor.",
        task: "Deliver end-to-end AI project presentation and submit code repository.",
        deadlineDays: 7,
        resources: [{ id: "rm8", name: "MLOps Production Checklist", type: "DOC", url: "#" }]
      }
    ]
  },
  {
    id: "iip-company-03",
    title: "Cloud Infrastructure & DevOps Engineering",
    type: "COMPANY_ASSISTED",
    badgeText: "Eligibility Test Required",
    companyName: "Nexus Cloud Solutions",
    companyLogo: "☁️",
    duration: "8 Weeks (5 Days/Wk)",
    description: "Industry-sponsored internship with Nexus Cloud. Qualification requires passing a technical screening test. Work directly on AWS/K8s infrastructure.",
    enrollmentMode: "Competitive — Passed Eligibility Test + Company Selection",
    mentorName: "Alex Rivera",
    mentorRole: "Principal DevOps Lead @ Nexus Cloud",
    orientationVideoUrl: "https://www.youtube.com/embed/2M-u6a7YmK4",
    orientationVideoTitle: "Nexus Cloud Company-Assisted Internship Briefing",
    rules: [
      "Pass the 3-question prerequisite technical eligibility quiz (>=80%).",
      "Selected candidates receive direct Slack/Teams channel access with Nexus engineers.",
      "Daily SOD and EOD updates reviewed by Nexus Cloud engineering managers.",
      "Strict security guidelines regarding AWS credentials and secrets management.",
      "Official joint certification issued by Wingz & Nexus Cloud Solutions."
    ],
    quizQuestions: [
      {
        id: "qc1",
        question: "What is required before being selected by the partner company?",
        options: [
          "Passing the technical eligibility test",
          "Paying a high entrance fee",
          "Completing 5 years of work",
          "No screening test required"
        ],
        correctAnswerIndex: 0
      },
      {
        id: "qc2",
        question: "Where does technical guidance primarily take place?",
        options: [
          "External unmonitored forums",
          "Directly between student and partner company team",
          "Offline physical letters",
          "Automated chatbots only"
        ],
        correctAnswerIndex: 1
      }
    ],
    weeks: [
      {
        weekNumber: 1,
        title: "Linux System Administration & Shell Scripting",
        objective: "Master Bash automation, system permissions, user management, and SSH key configs.",
        task: "Create an automated Linux log parsing script with error alert triggers.",
        deadlineDays: 7,
        resources: [{ id: "rc1", name: "Bash Automation Playbook", type: "DOC", url: "#" }]
      },
      {
        weekNumber: 2,
        title: "Docker Containerization & Multi-Stage Builds",
        objective: "Containerize multi-tier web applications with minimal footprint image sizes.",
        task: "Write multi-stage Dockerfiles for Node.js frontend and Python backend services.",
        deadlineDays: 7,
        resources: [{ id: "rc2", name: "Docker Best Practices", type: "DOC", url: "#" }]
      },
      {
        weekNumber: 3,
        title: "Infrastructure as Code with Terraform",
        objective: "Provision cloud infrastructure declaratively using HashiCorp Terraform.",
        task: "Write HCL modules provisioning VPC, subnets, and EC2 instance cluster on AWS sandbox.",
        deadlineDays: 7,
        resources: [{ id: "rc3", name: "Terraform AWS Modules", type: "DOC", url: "#" }]
      },
      {
        weekNumber: 4,
        title: "CI/CD Pipelines with GitHub Actions & GitLab CI",
        objective: "Automate build, linting, container scanning, and deployment pipelines.",
        task: "Configure workflow deploying Docker containers to staging server on push to main.",
        deadlineDays: 7,
        resources: [{ id: "rc4", name: "CI/CD Security Standards", type: "DOC", url: "#" }]
      },
      {
        weekNumber: 5,
        title: "Kubernetes Cluster Management & Helm Charts",
        objective: "Deploy microservices to Kubernetes clusters using deployments, services, and ingress.",
        task: "Deploy 3-tier microservice application to Minikube cluster using custom Helm chart.",
        deadlineDays: 7,
        resources: [{ id: "rc5", name: "K8s Architecture Deep Dive", type: "DOC", url: "#" }]
      },
      {
        weekNumber: 6,
        title: "Cloud Monitoring, Logging & Prometheus/Grafana",
        objective: "Set up cluster observability, metric dashboards, and alert manager routes.",
        task: "Configure Grafana dashboard visualizing HTTP status codes and CPU memory metrics.",
        deadlineDays: 7,
        resources: [{ id: "rc6", name: "Observability Metrics Standard", type: "DOC", url: "#" }]
      },
      {
        weekNumber: 7,
        title: "Cloud Security, IAM Policies & Secrets Manager",
        objective: "Enforce least privilege access control, HashiCorp Vault, and SSL certificate rotation.",
        task: "Audit AWS IAM policy configuration and replace static keys with dynamic secrets.",
        deadlineDays: 7,
        resources: [{ id: "rc7", name: "Cloud Hardening Checklist", type: "DOC", url: "#" }]
      },
      {
        weekNumber: 8,
        title: "Nexus Infrastructure Audit & Company Review",
        objective: "Deliver final production architecture review to Nexus Cloud engineering panel.",
        task: "Present final Terraform & Kubernetes deployment showcase for industry certification.",
        deadlineDays: 7,
        resources: [{ id: "rc8", name: "Production Readiness Handbook", type: "DOC", url: "#" }]
      }
    ]
  }
];

// Helper to generate mock initial daily logs for a given week
export function generateInitialDailyLogs(weekNum: number): DailyLog[] {
  const dates = ["2026-09-01", "2026-09-02", "2026-09-03", "2026-09-04", "2026-09-05"];
  return Array.from({ length: 5 }, (_, i) => ({
    dayNumber: i + 1,
    date: dates[i] || `Day ${i + 1}`,
    sodSubmitted: false,
    eodSubmitted: false
  }));
}

// Generate pre-filled sample enrollment state for instant demo capabilities
export function createDefaultEnrollmentState(programId: string): EnrollmentState {
  const dailyLogs: Record<number, DailyLog[]> = {};
  const submissions: Record<number, WeeklySubmission> = {};

  // Pre-fill Week 1 as completed for demo rich state
  dailyLogs[1] = [
    {
      dayNumber: 1,
      date: "Mon, Day 1",
      sodSubmitted: true,
      plannedTasks: "Set up project repository, installed dependencies, created component scaffold.",
      todayWorkFocus: "Frontend Component Architecture",
      expectedOutcome: "Clean React + TS setup ready for UI implementation.",
      sodTimestamp: "09:15 AM",
      eodSubmitted: true,
      completedWork: "Created baseline dashboard shell with responsive grid layout.",
      progressPercent: 100,
      challengesBlockers: "Initial TS interface typing for multi-nested mock object.",
      keyLearnings: "Utilized Discriminated Unions for state management.",
      attachmentsLink: "https://github.com/wingz-student/iip-week1",
      eodTimestamp: "06:30 PM"
    },
    {
      dayNumber: 2,
      date: "Tue, Day 2",
      sodSubmitted: true,
      plannedTasks: "Build Header & Navigation components with dynamic active tab indicator.",
      todayWorkFocus: "UI Layout & Navigation",
      expectedOutcome: "Header bar styled with modern glassmorphism aesthetic.",
      sodTimestamp: "09:05 AM",
      eodSubmitted: true,
      completedWork: "Header bar complete with role switcher pills and badge icons.",
      progressPercent: 100,
      challengesBlockers: "None",
      keyLearnings: "CSS Custom properties leverage for smooth theme toggles.",
      attachmentsLink: "https://github.com/wingz-student/iip-week1",
      eodTimestamp: "06:10 PM"
    },
    {
      dayNumber: 3,
      date: "Wed, Day 3",
      sodSubmitted: true,
      plannedTasks: "Construct 8-Week timeline stepper visual component.",
      todayWorkFocus: "Timeline Stepper",
      expectedOutcome: "Interactive timeline showing past, active, and locked weeks.",
      sodTimestamp: "09:30 AM",
      eodSubmitted: true,
      completedWork: "Timeline component rendering statuses dynamically.",
      progressPercent: 100,
      challengesBlockers: "Handling responsive mobile layout for 8 timeline nodes.",
      keyLearnings: "Horizontal overflow scrolling with smooth flexbox layout.",
      attachmentsLink: "https://github.com/wingz-student/iip-week1",
      eodTimestamp: "07:00 PM"
    },
    {
      dayNumber: 4,
      date: "Thu, Day 4",
      sodSubmitted: true,
      plannedTasks: "Develop SOD & EOD modal dialogs with validation.",
      todayWorkFocus: "Daily Update Modals",
      expectedOutcome: "Interactive forms for Start & End of Day logs.",
      sodTimestamp: "09:00 AM",
      eodSubmitted: true,
      completedWork: "Forms created with auto-timestamps and link previews.",
      progressPercent: 100,
      challengesBlockers: "None",
      keyLearnings: "Form state handling via custom controlled hooks.",
      attachmentsLink: "https://github.com/wingz-student/iip-week1",
      eodTimestamp: "06:45 PM"
    },
    {
      dayNumber: 5,
      date: "Fri, Day 5",
      sodSubmitted: true,
      plannedTasks: "Finalize Week 1 task deliverable submission and code cleanup.",
      todayWorkFocus: "Weekly Task Delivery",
      expectedOutcome: "Week 1 project pushed to GitHub and submitted for review.",
      sodTimestamp: "09:10 AM",
      eodSubmitted: true,
      completedWork: "Submitted Week 1 project deliverable.",
      progressPercent: 100,
      challengesBlockers: "None",
      keyLearnings: "Production build validation prior to submission.",
      attachmentsLink: "https://github.com/wingz-student/iip-week1",
      eodTimestamp: "05:50 PM"
    }
  ];

  submissions[1] = {
    weekNumber: 1,
    submitted: true,
    submissionLink: "https://github.com/wingz-student/iip-week1-final",
    notes: "Completed all Week 1 frontend component architecture requirements with high test coverage.",
    submittedAt: "2026-09-05 06:00 PM",
    status: "APPROVED",
    feedback: "Excellent work on the component breakdown and clean TypeScript interfaces!",
    reviewedBy: "Dr. Sarah Jenkins (Trainer)",
    reviewedAt: "2026-09-06 10:00 AM"
  };

  // Weeks 2 to 8 initial empty daily logs & submissions
  for (let w = 2; w <= 8; w++) {
    dailyLogs[w] = generateInitialDailyLogs(w);
    submissions[w] = {
      weekNumber: w,
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
    currentWeek: 2, // Active on Week 2 for rich start experience!
    status: "IN_PROGRESS",
    dailyLogs,
    submissions,
    certificateGenerated: false
  };
}
