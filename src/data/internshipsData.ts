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
  learn: string[];
  do: string[];
  resources: ResourceItem[];
}

export interface InternshipProgram {
  id: string;
  title: string;
  type: 'SELF_PLACED' | 'MENTOR_GUIDED' | 'COMPANY_REMOTE' | 'COMPANY_ON_PREMISES';
  badgeText: string;
  companyName: string;
  companyLogo: string;
  companyDescription?: string;
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
    id: "iip-tata-genai",
    title: "GenAI Powered Data Analytics",
    type: "SELF_PLACED",
    badgeText: "Self-Paced Internship",
    companyName: "Tata",
    companyLogo: "/src/logos/Tata_logo.svg.webp",
    companyDescription: "Tata Group is a global enterprise, headquartered in India, comprising 30 companies across 10 clusters. We operate in more than 100 countries across six continents, with a mission 'To improve the quality of life of the communities we serve globally, through long-term stakeholder value creation based on Leadership with Trust'. Tata Group has always believed in returning wealth to the society it serves. Tata iQ, our dedicated analytics and data science division, empowers businesses with data-driven decision making and advanced AI capabilities. We built this program to help aspiring data scientists and analysts gain practical experience in the rapidly evolving field of Generative AI. We want to nurture talent that understands how to leverage complex datasets to solve real business challenges, driving innovation and sustainable growth for the future.",
    duration: "2 Month",
    description: "Learn to apply Generative AI to data analytics in a real-world scenario. You are an AI transformation consultant at Tata iQ.",
    enrollmentMode: "Open Access — Direct Student Enrollment",
    orientationVideoUrl: "https://www.youtube.com/embed/LDB4uaJ87e0",
    orientationVideoTitle: "Welcome to Tata GenAI Powered Data Analytics",
    rules: [
      "Complete the tasks sequentially.",
      "Submit the current task to instantly unlock the next one."
    ],
    quizQuestions: [
      {
        id: "q1",
        question: "What is the primary objective of the AI-powered solution being developed for Geldium?",
        options: [
          "To automate the collections process and eliminate manual intervention",
          "To predict which customers are likely to miss payments and recommend interventions",
          "To increase interest rates for high-risk customers",
          "To replace the existing risk management team with AI"
        ],
        correctAnswerIndex: 1
      }
    ],
    tasks: [
      {
        taskNumber: 1,
        title: "Exploratory data analysis and risk profiling",
        learn: [
          "How to conduct exploratory data analysis (EDA) using GenAI.",
          "Techniques to handle missing values and ensure data quality.",
          "Understanding customer risk factors for delinquency.",
          "How to leverage synthetic data generation to enhance datasets when real data is insufficient."
        ],
        do: [
          "Identify key datasets required to predict delinquency.",
          "Perform an exploratory analysis on provided datasets, using GenAI tools to assist with summarization, treatment of missing data, risk profiling, and synthetic data creation.",
          "Document your findings, including data patterns and anomalies that may impact predictions."
        ],
        resources: [
          { id: "r1", name: "EDA with GenAI Guide", type: "DOC", url: "#" }
        ]
      },
      {
        taskNumber: 2,
        title: "Predicting delinquency with AI",
        learn: [
          "Model selection for classification tasks.",
          "Evaluating models for accuracy and fairness."
        ],
        do: [
          "Design a predictive model to identify at-risk customers.",
          "Train models using prepared datasets."
        ],
        resources: [
          { id: "r2", name: "Model Selection", type: "DOC", url: "#" }
        ]
      },
      {
        taskNumber: 3,
        title: "Business report and data storytelling for collections strategy",
        learn: [
          "How to translate technical findings into business insights.",
          "Data storytelling best practices."
        ],
        do: [
          "Turn AI insights into strategy.",
          "Craft a stakeholder-ready business report to guide delinquency reduction efforts."
        ],
        resources: []
      },
      {
        taskNumber: 4,
        title: "Implementing an AI-driven collections strategy",
        learn: [
          "Scalable outreach strategies.",
          "Integrating AI models into business operations."
        ],
        do: [
          "Design an AI-powered collections strategy to help Geldium engage high-risk customers.",
          "Develop a framework for smart, fair, and scalable outreach."
        ],
        resources: []
      }
    ]
  },
  {
    id: "iip-deloitte-ib",
    title: "Investment Banking",
    type: "MENTOR_GUIDED",
    badgeText: "Mentored Internship",
    companyName: "Deloitte",
    companyLogo: "/src/logos/Logo_of_Deloitte.svg.webp",
    companyDescription: "Deloitte is a leading global provider of audit and assurance, consulting, financial advisory, risk advisory, tax, and related services. With more than 150 years of hard work and commitment to making a real difference, our organization has grown in scale and diversity—yet our shared culture remains the same. We believe that we are only as good as the good we do. Our mission is to help our clients and our people excel. We developed this Mergers & Acquisitions (M&A) internship program to provide students with a realistic glimpse into the fast-paced, high-stakes world of investment banking and financial advisory. By participating in this program, you will develop a deep understanding of corporate valuation, financial modeling, and strategic advisory. We want to equip the next generation of financial professionals with the rigorous analytical skills and business acumen required to succeed in a competitive global market.",
    duration: "2 Months",
    description: "Work as an M&A analyst. Build financial models, value companies, and craft pitch books.",
    enrollmentMode: "Restricted — Trainer Selection based on Assessment",
    mentorName: "Sarah Jenkins",
    mentorRole: "VP, Investment Banking",
    orientationVideoUrl: "https://www.youtube.com/embed/aircAruvnKk",
    orientationVideoTitle: "Trainer-Guided IB Internship Overview",
    rules: [
      "Complete tasks sequentially.",
      "Submit the current task to instantly unlock the next one."
    ],
    quizQuestions: [
      {
        id: "q1",
        question: "What is the primary method used to value a company based on its future cash flows?",
        options: ["Discounted Cash Flow (DCF)", "Comparable Company Analysis", "Precedent Transactions", "LBO Analysis"],
        correctAnswerIndex: 0
      }
    ],
    tasks: [
      {
        taskNumber: 1,
        title: "Industry and Company Research",
        learn: ["How to read 10-Ks.", "Market sizing techniques."],
        do: ["Gather research on a target company.", "Write an industry overview report."],
        resources: []
      },
      {
        taskNumber: 2,
        title: "Financial Statement Modeling",
        learn: ["Projecting the 3 statements.", "Working capital scheduling."],
        do: ["Build a 3-statement model for the target."],
        resources: []
      },
      {
        taskNumber: 3,
        title: "Valuation Analysis",
        learn: ["DCF fundamentals.", "Selecting comparables."],
        do: ["Perform DCF and Trading Comps valuation."],
        resources: []
      },
      {
        taskNumber: 4,
        title: "M&A Modeling",
        learn: ["Accretion/Dilution analysis.", "Purchase price allocation."],
        do: ["Build an M&A model assuming a 20% premium."],
        resources: []
      },
      {
        taskNumber: 5,
        title: "Pitch Book Creation",
        learn: ["Structuring a pitch.", "Formatting in PowerPoint."],
        do: ["Create a 10-page pitch book recommending an acquisition."],
        resources: []
      }
    ]
  },
  {
    id: "iip-accenture-dm",
    title: "Digital Marketing",
    type: "COMPANY_REMOTE",
    badgeText: "Company Remote",
    companyName: "Accenture",
    companyLogo: "/src/logos/Accenture_logo.svg.webp",
    companyDescription: "Accenture is a global professional services company with leading capabilities in digital, cloud, and security. Combining unmatched experience and specialized skills across more than 40 industries, we offer Strategy and Consulting, Technology and Operations services, and Accenture Song. Our purpose is to deliver on the promise of technology and human ingenuity. We embrace the power of change to create 360° value for our clients, people, and communities. We designed this Digital Marketing program because the landscape of customer engagement is constantly shifting. Brands need agile, data-savvy marketers who can navigate SEO, content strategy, and dynamic web analytics. This simulation provides a hands-on environment where you can master digital campaigns and performance tracking. We are committed to fostering innovative marketing talent capable of driving digital transformation and creating meaningful connections in an increasingly digital world.",
    duration: "2 Months",
    description: "Develop digital marketing campaigns, manage SEO, and analyze web traffic.",
    enrollmentMode: "Corporate Selection — Remote Technical Screening",
    mentorName: "David Chen",
    mentorRole: "Marketing Director",
    orientationVideoUrl: "https://www.youtube.com/embed/aircAruvnKk",
    orientationVideoTitle: "Digital Marketing Overview",
    rules: ["Complete tasks sequentially."],
    quizQuestions: [
      {
        id: "q1",
        question: "What does SEO stand for?",
        options: ["Search Engine Optimization", "Site Engagement Operation", "Sales Enablement Organigram", "Social Expansion Outreach"],
        correctAnswerIndex: 0
      }
    ],
    tasks: [
      {
        taskNumber: 1,
        title: "SEO Audit and Keyword Research",
        learn: ["Keyword mapping.", "Technical SEO audits."],
        do: ["Perform an SEO audit on a demo site.", "Identify top 10 target keywords."],
        resources: []
      },
      {
        taskNumber: 2,
        title: "Content Strategy Planning",
        learn: ["Content calendars.", "Audience persona building."],
        do: ["Create a 3-month content calendar."],
        resources: []
      },
      {
        taskNumber: 3,
        title: "Paid Campaign Setup (PPC)",
        learn: ["Google Ads campaign structure.", "Bidding strategies."],
        do: ["Draft a Google Ads campaign structure with ad copy."],
        resources: []
      },
      {
        taskNumber: 4,
        title: "Analytics and Reporting",
        learn: ["Google Analytics basics.", "Creating marketing dashboards."],
        do: ["Build a monthly performance report summarizing traffic and conversions."],
        resources: []
      }
    ]
  },
  {
    id: "iip-demo-onprem",
    title: "Enterprise Security",
    type: "COMPANY_ON_PREMISES",
    badgeText: "On-Premises Internship",
    companyName: "Demo Company",
    companyLogo: "/src/logos/IBM_logo.svg.webp",
    companyDescription: "IBM (International Business Machines Corporation) is a multinational technology corporation known for its hardware, software, cloud-based services, and cognitive computing. As one of the world's oldest and largest technology companies, IBM has a long history of innovation, from the invention of the ATM and the floppy disk to the development of Watson, our pioneering AI platform. We are dedicated to creating technologies that drive progress and address some of the world's most complex problems. This on-premises security operations internship was created to immerse students in the critical field of cybersecurity and IT infrastructure management. We believe that hands-on, practical experience in a simulated corporate environment is the best way to prepare future tech leaders. Through this program, we aim to cultivate a resilient and highly skilled workforce capable of protecting enterprise networks and driving technological advancement securely.",
    duration: "2 Months",
    description: "Hands-on corporate campus internship conducted within on-premises security operations centers.",
    enrollmentMode: "Campus In-Person",
    orientationVideoUrl: "https://www.youtube.com/embed/aircAruvnKk",
    orientationVideoTitle: "On-Premises SOC Lab Protocols",
    rules: ["In-person participation at partner campus SOC labs."],
    quizQuestions: [
      {
        id: "q1",
        question: "Where is the Company On-Premises Internship conducted?",
        options: ["Fully asynchronous home study", "Partner corporate campus", "Public coffee shops", "No physical presence needed"],
        correctAnswerIndex: 1
      }
    ],
    tasks: [
      {
        taskNumber: 1,
        title: "Enterprise Network Topology",
        learn: ["Network architecture basics.", "Packet analysis."],
        do: ["Analyze enterprise PCAP traffic.", "Detect unauthorized protocol behavior."],
        resources: []
      },
      {
        taskNumber: 2,
        title: "SIEM Engineering",
        learn: ["Log aggregation.", "Alert triage."],
        do: ["Configure a SIEM dashboard."],
        resources: []
      },
      {
        taskNumber: 3,
        title: "Vulnerability Assessment",
        learn: ["Nessus scanning.", "Remediation planning."],
        do: ["Conduct vulnerability assessment.", "Produce executive report."],
        resources: []
      },
      {
        taskNumber: 4,
        title: "Incident Response",
        learn: ["Memory forensics.", "Containment strategies."],
        do: ["Perform memory forensics to extract malicious processes."],
        resources: []
      }
    ]
  }
];

export function createDefaultEnrollmentState(programId: string): EnrollmentState {
  const selectedProgram = MOCK_INTERNSHIPS.find(p => p.id === programId) || MOCK_INTERNSHIPS[0];
  const totalTasks = selectedProgram?.tasks?.length || 4;
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
    studentName: "Rohan Patil",
    studentEmail: "shirish@example.com",
    enrolledAt: "2026-09-01",
    quizPassed: true,
    quizScore: 100,
    unlockedTaskCount: 1, // Start with task 1 unlocked
    status: "IN_PROGRESS",
    taskSubmissions,
    certificateGenerated: false
  };
}
