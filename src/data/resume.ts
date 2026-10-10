export const personal = {
  name: 'Jorge Páramo',
  title: 'Senior Fullstack Engineer',
  location: 'Dallas, TX',
  email: 'mail@jorgeparamo.dev',
  github: 'https://github.com/jrgparamo',
  linkedin: 'https://www.linkedin.com/in/jrgparamo',
  trailblazer: 'https://salesforce.com/trailblazer/jparamo',
  bio: 'Senior software engineer with 10+ years designing, building and supporting scalable, secure customer platforms for global brands across digital and retail channels. Experienced in APIs, service and data integrations, event instrumentation, performance and reliability, leading cross-team delivery, and adopting AI-assisted development tools. Passionate about excellent customer experiences, clean architecture, mentoring engineers, and shipping quality code.',
  photo: '/images/profile1851.jpeg',
  resumePdf: '/rs/JorgeParamo-Current-Resume.pdf',
}

export interface SkillGroup {
  label: string
  items: string[]
}

export const skills: SkillGroup[] = [
  {
    label: 'Languages',
    items: [
      'Java',
      'JavaScript (Node.js)',
      'TypeScript',
      'Python',
      'SQL',
    ],
  },
  {
    label: 'APIs & integration',
    items: [
      'REST APIs',
      'third-party and payment integrations',
      'batch jobs and data pipelines',
      'event tracking (Algolia Insights, GA4, Tealium)',
    ],
  },
  {
    label: 'Cloud & platforms',
    items: [
      'Salesforce Commerce Cloud',
      'Composable Storefront (PWA Kit)',
      'Managed Runtime',
      'Cloudflare edge workers',
      'Vercel',
      'MongoDB',
      'Algolia',
    ],
  },
  {
    label: 'Reliability & security',
    items: [
      'caching',
      'performance tuning',
      'high-traffic launch protection',
      'bot mitigation',
      'PII encryption',
      'GDPR/CCPA Practices',
    ],
  },
  {
    label: 'Tools & Frameworks',
    items: [
      'automated unit testing (Mocha, Chai)',
      'code review',
      'Git',
      'Agile/Jira',
      'AI-assisted development (GitHub Copilot)',
      'React',
      'Next.js',
    ],
  },
]

export interface ExperienceItem {
  company: string
  role: string
  team?: string
  location: string
  start: string
  end: string
  bullets: string[]
}

export const experience: ExperienceItem[] = [
  {
    company: 'Red Van (client: New Balance)',
    role: 'Senior Fullstack Engineer',
    location: 'Remote',
    start: 'Aug 2021',
    end: 'Present',
    bullets: [
      'Product Discovery team, global platform across NA, EMEA and APAC; lead engineer on 222 of 450+ work items.',
      'Led the Algolia search migration across multiple international storefronts, coordinating merchandising, analytics and regional teams, with a hybrid fallback that kept non-migrated regions running.',
      'Re-architected the product data feed and built an automated batch job replicating index settings across environments, resolving payload-limit failures and removing manual promotion steps.',
      'Designed a conditional caching layer that preserved edge caching while serving personalized search sorting, sharply reducing server load.',
      'Launched an in-store associate app on Composable Storefront (PWA Kit), cut its product grid load times by 40%, and optimized APIs for the associate iPad app.',
      'Integrated customer data across services: 3D foot-scan profiles via secure tokens, order-history syndication for personalized recommendations, and PII encryption in review feeds for GDPR/CCPA.',
      'Provided production support for tier-1 sneaker launches, keeping checkout stable under extreme traffic with Queue-it waiting rooms, session tokens and bot throttling.',
      'Restored and expanded event telemetry (click, conversion, null-search, GA4) for accurate revenue attribution; a Japan canonical URL fix protected ~$770K in annual organic revenue.',
      'Led headless and Managed Runtime architecture spikes to guide platform modernization; used GitHub Copilot extensively in development and, as a member of the AI Community of Practice, evaluated AI-assisted developer tools and AI-driven solutions.',
    ],
  },
  {
    company: 'Red Van',
    role: 'Senior Salesforce Commerce Cloud Developer',
    location: 'Remote',
    start: 'Aug 2020',
    end: 'Aug 2021',
    bullets: [
      'Delivered custom, performance-optimized storefronts for Claire\'s, Vermont Teddy Bear, Lush and Warrior, lifting conversion and click-through rates.',
      'Helped brands such as Claires, Vermont Teddy Bear, Lush, and Warrior increase conversion rates and click-through rates through unique page elements and modern backend optimizations',
    ],
  },
  {
    company: 'LiveArea',
    role: 'Technical Lead',
    location: 'Allen, TX',
    start: 'May 2018',
    end: 'Aug 2020',
    bullets: [
      'Initiated and developed SFCC (SFRA) LINK Cartridges — Aurus and Bloomreach',
      'Integrated payment processors and providers including Aurus and PayPal',
      'Mentored and led in-house engineers by identifying key strengths and developing their technical and collaboration skills',
    ],
  },
  {
    company: 'LiveArea',
    role: 'Senior Software Engineer',
    location: 'Allen, TX',
    start: 'Oct 2015',
    end: 'May 2018',
    bullets: [
      'Developed eCommerce solutions for major retailers including Procter & Gamble, Party City, and Movado',
      'Integrated a custom OMS system into P&G\'s Olay storefront — similar to Uber Eats model — reducing shipping time',
      'Worked effectively with both large distributed teams and small in-house teams',
    ],
  },
  {
    company: 'Walmart',
    role: 'Application Development Intern',
    team: 'ISD – Technology Enablement',
    location: 'Bentonville, AR',
    start: 'Jun 2015',
    end: 'Aug 2015',
    bullets: [
      'Developed a mobile task application for Store managers using the Ionic framework',
      'Built a hybrid mobile app with AngularJS, Ionic, and Cue-Me',
      'Innovations Lab: prototyped next-gen shopping cart concept and presented to Senior Executives',
    ],
  },
  {
    company: 'USAA',
    role: 'IT Intern – Java Developer',
    team: 'Multivariate Testing (MVT)',
    location: 'San Antonio, TX',
    start: 'May 2014',
    end: 'Aug 2014',
    bullets: [
      'Made UI enhancements to increase product and service visibility for clients',
      'Worked in Agile sprints with a 2-person team',
      'Used proprietary version control to implement and ship design changes',
    ],
  },
  {
    company: 'University of Texas – Recreational Sports',
    role: 'IT Student – System Administrator',
    location: 'Austin, TX',
    start: 'Sep 2014',
    end: 'Aug 2015',
    bullets: [
      'Provided IT support to Gregory Gym and Recreational Center administrative offices',
      'Tested, upgraded, and maintained hardware and software across facility machines',
    ],
  },
]

export interface EducationItem {
  school: string
  degree: string
  field: string
  graduated: string
}

export const education: EducationItem[] = [
  {
    school: 'The University of Texas at Austin',
    degree: 'B.S.',
    field: 'Computer Science',
    graduated: 'May 2015',
  },
  {
    school: 'The University of Texas at Austin',
    degree: 'B.A.',
    field: 'Economics',
    graduated: 'May 2015',
  },
]

export interface CertificationItem {
  name: string
  status?: string
  issued: string
}

export const certifications: CertificationItem[] = [
  {
    name: 'Salesforce Certified B2C Commerce Cloud Developer',
    status: 'Active',
    issued: 'Sept 2019',
  },
  {
    name: 'Salesforce Composable Storefront (B2C201)',
    issued: 'April 2025',
  },
]

export interface ProjectItem {
  name: string
  description: string
  tech: string[]
  link?: string
}

export const projects: ProjectItem[] = [
  {
    name: 'EPL Prediction App',
    description:
      'A modern Next.js application for predicting English Premier League match results with real-time data integration from Football Data API. Features include user authentication, responsive design, offline support, and a smart prediction scoring system with points calculation.',
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Auth.js v5', 'Prisma ORM', 'PostgreSQL', 'Football Data API'],
    link: 'https://github.com/jrgparamo/epl-app-next',
  },
  {
    name: 'Personal Website on ARMv7',
    description:
      'Portfolio site built with Ruby on Rails, self-hosted on an ODROID-C1 running Lubuntu 14.04. Learned Linux system administration and back-end development in the process.',
    tech: ['Ruby on Rails', 'Node.js', 'Linux', 'Nginx'],
  },
  {
    name: 'Music Streaming Application',
    description:
      'Python desktop app using the cx_Oracle driver to query an Oracle database server, simulating user actions like play, skip, and account management.',
    tech: ['Python', 'Oracle DB', 'SQL'],
  },
]
