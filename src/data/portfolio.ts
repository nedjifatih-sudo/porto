export type ProjectCategory = 'All' | 'Networking & FTTH' | 'Systems & Automation' | 'Web & Data';

export type DiagramType = 'ftth' | 'genieacs' | 'pcc' | 'automation' | 'inventory';

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  category: Exclude<ProjectCategory, 'All'>;
  description: string;
  scopeNote: string;
  architectureFocus: string[];
  tags: string[];
  diagramType: DiagramType;
  externalUrl?: string;
  linkLabel?: string;
}

export interface ExpertiseGroup {
  index: string;
  title: string;
  items: string[];
}

export interface ExperienceItem {
  year: string;
  title: string;
  role: string;
  description: string;
}

export interface PrincipleItem {
  index: string;
  title: string;
  description: string;
}

export interface ContactLinkItem {
  id: 'email' | 'linkedin' | 'github' | 'instagram';
  label: string;
  value: string;
  href: string;
  isPlaceholder: boolean;
}

export const SITE_CONFIG = {
  shortMark: 'YF.',
  fullName: 'Muhammad Yuhal Fata',
  roleTitle: 'Network Engineer / IT Infrastructure Specialist / Automation Enthusiast / Technology Explorer',
  eyebrow: 'Independent Technology Professional · Indonesia',
  availability: 'Open to interesting projects',
  positioning:
    'I build, connect, and improve digital infrastructure through thoughtful engineering and practical technology.',
  heroSubhead:
    "I'm Muhammad Yuhal Fata, a technology professional interested in network infrastructure, IT systems, automation, and building practical digital solutions.",
  location: 'Based in Indonesia',
  // Replace portraitUrl with a path (e.g., '/portrait.jpg') when a real photograph is ready.
  portraitUrl: '',
  portraitAlt: 'Portrait placeholder for Muhammad Yuhal Fata',
  copyrightYear: 2026,
  footerTagline: 'Designed with intention. Built with curiosity.',
} as const;

export const EXPERTISE_GROUPS: ExpertiseGroup[] = [
  {
    index: '01',
    title: 'Network Infrastructure',
    items: [
      'LAN / WAN',
      'TCP/IP',
      'Routing & Switching',
      'Network Troubleshooting',
      'MikroTik RouterOS',
    ],
  },
  {
    index: '02',
    title: 'ISP & FTTH',
    items: [
      'GPON Architecture',
      'OLT / ONT Configuration',
      'Fiber Optic Infrastructure',
      'PPPoE',
      'VLAN',
      'GenieACS / TR-069',
    ],
  },
  {
    index: '03',
    title: 'Systems & Automation',
    items: [
      'Linux Administration',
      'Docker',
      'n8n Workflow Automation',
      'API Integration',
      'AI Agent Exploration',
    ],
  },
  {
    index: '04',
    title: 'Digital Development',
    items: [
      'Web Application Concepts',
      'Database Design',
      'Supabase',
      'Technical Documentation',
    ],
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'ftth-network-infrastructure',
    index: '01',
    title: 'FTTH Network Infrastructure',
    category: 'Networking & FTTH',
    description:
      'Exploration and implementation of fiber-optic access networks, involving OLT, ONT, ODP distribution, PPPoE, VLAN, and customer connectivity.',
    scopeNote:
      'Structured around end-to-end passive optical distribution from core routing and OLT uplink segmentation down to ODP splitting and subscriber ONT termination.',
    architectureFocus: [
      'VLAN isolation between management, PPPoE access, and service transport',
      'OLT port allocation and optical distribution planning through ODP nodes',
      'MikroTik PPPoE concentrator configuration and subscriber link verification',
    ],
    tags: ['FTTH', 'GPON', 'MikroTik', 'Networking'],
    diagramType: 'ftth',
    // Add a live documentation or repository URL here when published
    externalUrl: '',
    linkLabel: 'Architecture Specification',
  },
  {
    id: 'genieacs-ont-management',
    index: '02',
    title: 'GenieACS & ONT Management',
    category: 'Networking & FTTH',
    description:
      'Working with TR-069 provisioning and centralized ONT management using GenieACS in a Linux environment.',
    scopeNote:
      'Focused on automated device onboarding, CWMP parameter inspection, and repeatable provisioning workflows without manual per-unit console intervention.',
    architectureFocus: [
      'Linux-hosted GenieACS stack with CWMP, NBI, and UI service coordination',
      'TR-069 inform intervals, preset rules, and remote parameter provisioning',
      'Centralized visibility into subscriber ONT optical and connection state',
    ],
    tags: ['GenieACS', 'TR-069', 'Linux', 'GPON'],
    diagramType: 'genieacs',
    externalUrl: '',
    linkLabel: 'Architecture Specification',
  },
  {
    id: 'network-load-balancing-pcc',
    index: '03',
    title: 'Network Load Balancing with PCC',
    category: 'Networking & FTTH',
    description:
      'An academic project involving MikroTik Per Connection Classifier load balancing, simulated and evaluated using network performance metrics.',
    scopeNote:
      'Evaluated multi-uplink packet classification and connection marking behavior under controlled traffic simulation and packet inspection.',
    architectureFocus: [
      'Mangle rule classification with Per Connection Classifier across dual gateways',
      'Routing mark separation and failover route distance handling',
      'Packet-level inspection and performance observation with Wireshark and QoS queues',
    ],
    tags: ['MikroTik', 'PCC', 'QoS', 'Wireshark'],
    diagramType: 'pcc',
    externalUrl: '',
    linkLabel: 'Architecture Specification',
  },
  {
    id: 'workflow-automation-ai-agents',
    index: '04',
    title: 'Workflow Automation & AI Agents',
    category: 'Systems & Automation',
    description:
      'Exploring automation systems with n8n, Telegram integrations, Google Sheets, and AI agents to streamline practical workflows.',
    scopeNote:
      'Connecting webhook triggers, structured spreadsheets, messaging bots, and model-assisted parsing into reliable operational pipelines.',
    architectureFocus: [
      'Event-driven webhook orchestration and conditional branching in n8n',
      'Telegram bot command handling paired with structured Google Sheets logging',
      'Integrating AI agent steps for message normalization and task routing',
    ],
    tags: ['n8n', 'API', 'Telegram', 'AI'],
    diagramType: 'automation',
    externalUrl: '',
    linkLabel: 'Architecture Specification',
  },
  {
    id: 'digital-inventory-management',
    index: '05',
    title: 'Digital Inventory Management',
    category: 'Web & Data',
    description:
      'Designing a modern inventory management application using Supabase, database architecture, authentication, and role-based access control.',
    scopeNote:
      'Designed with relational integrity at the database layer, enforcing user permissions directly through PostgreSQL Row Level Security policies.',
    architectureFocus: [
      'Normalized PostgreSQL schema for stock items, movements, and audit logs',
      'Supabase authentication integrated with role-based access boundaries',
      'Row Level Security policies governing read and mutation privileges',
    ],
    tags: ['Supabase', 'PostgreSQL', 'RLS', 'Web Development'],
    diagramType: 'inventory',
    externalUrl: '',
    linkLabel: 'Architecture Specification',
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    year: '2024',
    title: 'Network Administration / Network Infrastructure',
    role: 'Infrastructure Operations',
    description:
      'Practical experience in network operations, configuration, troubleshooting, and infrastructure management.',
  },
  {
    year: '2022',
    title: 'BTN Syariah Banda Aceh',
    role: 'IT Support / Network Internship',
    description:
      'Computer maintenance and network support in a banking IT environment.',
  },
  {
    year: '2022',
    title: 'KOMINFOSAN Aceh Tamiang',
    role: 'IT / Network Internship',
    description:
      'Exposure to government IT systems and network infrastructure.',
  },
];

export const EDUCATION = {
  institution: 'Politeknik Negeri Lhokseumawe',
  degree: 'D4 — Computer Network Engineering / Information and Computer Technology',
};

export const PRINCIPLES: PrincipleItem[] = [
  {
    index: '01',
    title: 'Understand the System',
    description: 'Look beyond symptoms. Understand the architecture and the actual problem.',
  },
  {
    index: '02',
    title: 'Build with Purpose',
    description: 'Choose practical solutions over unnecessary complexity.',
  },
  {
    index: '03',
    title: 'Keep Exploring',
    description: 'Technology evolves. Learning should never stop.',
  },
];

// Update these placeholder contact details with your live handles before publishing.
export const CONTACT_LINKS: ContactLinkItem[] = [
  {
    id: 'email',
    label: 'Email',
    value: 'hello@yuhalfata.example',
    href: 'mailto:hello@yuhalfata.example',
    isPlaceholder: true,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: 'linkedin.com/in/muhammad-yuhal-fata',
    href: 'https://linkedin.com',
    isPlaceholder: true,
  },
  {
    id: 'github',
    label: 'GitHub',
    value: 'github.com/yuhalfata',
    href: 'https://github.com',
    isPlaceholder: true,
  },
  {
    id: 'instagram',
    label: 'Instagram',
    value: '@yuhalfata',
    href: 'https://instagram.com',
    isPlaceholder: true,
  },
];
