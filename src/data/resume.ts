export const personal = {
  name: 'Jorge Páramo',
  title: 'Senior Fullstack Engineer',
  location: 'Dallas, TX',
  email: 'mail@jorgeparamo.dev',
  github: 'https://github.com/jrgparamo',
  linkedin: 'https://www.linkedin.com/in/jrgparamo',
  trailblazer: 'https://salesforce.com/trailblazer/jparamo',
  bio: 'Fullstack engineer with 10+ years of experience building high-performance eCommerce storefronts and web applications. Expert in Salesforce Commerce Cloud, specializing in custom SFRA solutions, composable storefronts, and integrations for major retail brands. Passionate about clean architecture, mentoring engineers, and shipping quality code.',
  photo: '/images/profile1851.jpeg',
  resumePdf: '/rs/JorgeParamo-2026-Resume.pdf',
}

export interface SkillGroup {
  label: string
  items: string[]
}

export const skills: SkillGroup[] = [
  {
    label: 'Proficient',
    items: [
      'JavaScript',
      'TypeScript',
      'React',
      'Next.js',
      'Astro',
      'Node.js',
      'Python',
      'Java',
      'HTML5',
      'CSS',
      'SQL',
      'MongoDB',
      'Git',
    ],
  },
  {
    label: 'Expert',
    items: [
      'Salesforce Commerce Cloud (SFCC)',
      'SFRA',
      'PWAKit',
      'Composable Storefront',
      'REST APIs',
      'Agile / Scrum',
    ],
  },
  {
    label: 'Exploring',
    items: ['AI Tooling / LLM Integration', 'DevOps', 'CI/CD'],
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
    company: 'Red Van – New Balance',
    role: 'Senior Fullstack Engineer',
    location: 'Remote',
    start: 'Aug 2021',
    end: 'Present',
    bullets: [
      'Developed and launched an in-house tool for NB store associates leveraging Salesforce\'s Composable product (PWAKit)',
      'Member of the internal AI-Cop team — audited developer tooling and contributed AI-driven solutions to the storefront and internal systems',
    ],
  },
  {
    company: 'Red Van',
    role: 'Senior Salesforce Commerce Cloud Developer',
    location: 'Remote',
    start: 'Aug 2020',
    end: 'Aug 2021',
    bullets: [
      'Full stack engineer delivering highly custom and optimized SFCC storefronts for major retail brands',
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
    name: 'Composable Storefront – B2C201',
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
