/**
 * Central source of truth for Keshav's real portfolio content.
 * Placeholders are explicitly marked so no fake metrics or quotes are invented.
 */

export interface NavItem {
  label: string;
  path: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  summary: string;
  details: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  imageAlt: string;
  deliverables: string[];
}

export interface ProjectItem {
  slug: string;
  title: string;
  category: 'CSS/HTML' | 'JavaScript' | 'API';
  tags: string[];
  role: string;
  year: string;
  projectType: string;
  shortDescription: string;
  overview: string;
  whatItDoes: string;
  whatILearned: string;
  challenges: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  imageAlt: string;
  featured?: boolean;
  liveUrl: string;
  githubUrl: string;
  hasLiveDemo: boolean;
  hasExactRepo: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface PlaceholderNoteCard {
  id: string;
  label: string;
  title: string;
  body: string;
  authorNote: string;
}

export interface EducationItem {
  id: string;
  period: string;
  qualification: string;
  institution: string;
  result: string;
  notes: string;
}

export interface AboutTimelineStop {
  id: string;
  marker: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  imageAlt: string;
}

export interface SkillItem {
  name: string;
  icon: string;
  width: number;
  height: number;
  focus: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  subtitle: string;
  items: SkillItem[];
}

export interface ProcessStep {
  step: string;
  title: string;
  summary: string;
  details: string[];
}

export interface ResourceItem {
  id: string;
  category: string;
  title: string;
  description: string;
  url: string;
  external: boolean;
  download?: boolean;
  ctaLabel: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  imageAlt: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Process', path: '/process' },
  { label: 'Work', path: '/work' },
  { label: 'Contact', path: '/contact' },
  { label: 'Resources', path: '/resources' },
];

/**
 * Single source of truth for the canonical production URL.
 * Override via VITE_SITE_URL in Vercel or .env without touching page code.
 */
export const SITE_URL = (
  import.meta.env.VITE_SITE_URL?.trim() || 'https://my-portfolio-keshav529.vercel.app'
).replace(/\/+$/, '');

export const PROFILE = {
  name: 'Keshav',
  fullName: 'Keshav Anand',
  tagline: 'WEB DEVELOPMENT • UI DESIGN • PROBLEM SOLVING',
  role: 'Aspiring Software Developer',
  degree: 'BCA Student (2022–2025)',
  college: 'Sh. L.N. Hindu College, Rohtak (MDU)',
  email: 'keshavanand748@gmail.com',
  phone: '+91-9817357072',
  resumeUrl: '/image/Keshav-Anand-Resume.pdf',
  resumeCover: '/image/resume.webp',
  resumeCoverWidth: 420,
  resumeCoverHeight: 420,
  profilePhoto: '/image/keshavphotos.webp',
  profilePhotoWidth: 720,
  profilePhotoHeight: 960,
  workspacePhoto: '/image/contactphoto.webp',
  workspacePhotoWidth: 720,
  workspacePhotoHeight: 936,
  socials: {
    linkedin: 'https://www.linkedin.com/in/keshav-anand-8ba87a293',
    leetcode: 'https://leetcode.com/u/keshavanand/',
    github: 'https://github.com/keshav529',
  },
};

/**
 * Contact Form (Formspree) Configuration
 * Set VITE_FORMSPREE_ID in .env (local) or Vercel Project Settings -> Environment Variables.
 */
const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID?.trim() || 'YOUR_FORMSPREE_ID';
export const FORMSPREE_ENDPOINT = `https://formspree.io/f/${FORMSPREE_ID}`;

export const SERVICES: ServiceItem[] = [
  {
    id: 'web-dev',
    title: 'Web Development',
    summary: 'Clean, semantic HTML, modern CSS, and maintainable JavaScript.',
    details:
      'I build structured, fast-loading web pages from scratch with readable markup and clean styling, and I am actively expanding into React and Node.js.',
    image: '/image/contactphoto.webp',
    imageWidth: 720,
    imageHeight: 936,
    imageAlt: 'Laptop displaying clean frontend web development code',
    deliverables: ['Semantic HTML5', 'Modular CSS', 'JavaScript DOM logic'],
  },
  {
    id: 'ui-design',
    title: 'UI/UX Design (Figma)',
    summary: 'Wireframes, layout hierarchy, and clean visual prototypes in Figma.',
    details:
      'Before writing code, I sketch user flows and layout grids in Figma so spacing, typography, and button hierarchy feel intentional on every screen.',
    image: '/image/netfliximageportfolio.webp',
    imageWidth: 1200,
    imageHeight: 568,
    imageAlt: 'High-contrast UI layout design showcase',
    deliverables: ['Wireframing', 'Component spacing', 'Visual hierarchy'],
  },
  {
    id: 'responsive',
    title: 'Responsive Websites',
    summary: 'Layouts that adapt smoothly across phones, tablets, and desktops.',
    details:
      'Using CSS Grid, Flexbox, and Bootstrap, I make sure navigation, cards, and media scale cleanly without horizontal overflow or cramped mobile tap targets.',
    image: '/image/bootstapimage.webp',
    imageWidth: 1200,
    imageHeight: 565,
    imageAlt: 'Responsive multi-column website layout preview',
    deliverables: ['Mobile-first CSS', 'Bootstrap grids', 'Cross-browser checks'],
  },
  {
    id: 'js-apps',
    title: 'Interactive JavaScript Apps',
    summary: 'Client-side logic, state handling, and real-time API integrations.',
    details:
      'From game state in Tic-Tac-Toe to timers in Stopwatch and live exchange rates in Currency Converter, I enjoy turning ideas into interactive browser tools.',
    image: '/image/currencyconvertorimage.webp',
    imageWidth: 532,
    imageHeight: 646,
    imageAlt: 'Interactive JavaScript currency converter application',
    deliverables: ['Event handling', 'Fetch API & JSON', 'Interactive UI states'],
  },
];

export const SERVICE_HIGHLIGHTS: string[] = [
  'Semantic HTML5 structure built for accessibility and SEO',
  'Responsive CSS Grid, Flexbox, and Bootstrap 5 layouts',
  'Interactive JavaScript DOM state and Fetch API integration',
  'Figma wireframing, spacing systems, and visual hierarchy',
  'Clean Git commit history and GitHub project hosting',
  'Component-based React & Vite workflow practice',
  'Foundational problem solving with C, Java, and DSA',
  'Mobile-first testing across phone, tablet, and desktop widths',
];

export const PROJECTS: ProjectItem[] = [
  {
    slug: 'currency-converter',
    title: 'Currency Converter',
    category: 'API',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'REST API'],
    role: 'Front-end Developer',
    year: '2024',
    projectType: 'API Web App',
    shortDescription:
      'Real-time currency conversion app using live exchange rate API data and clean selector states.',
    overview:
      'Built a browser-based currency converter that fetches live exchange rates asynchronously and updates converted values cleanly with flag indicators.',
    whatItDoes:
      'Accepts an amount and source/target currencies, queries an exchange rate endpoint via fetch(), validates the numeric entry, and renders instant conversion output alongside country flags.',
    whatILearned:
      'Working with asynchronous fetch() calls, parsing JSON responses, handling loading/error states, and updating the DOM cleanly.',
    challenges:
      'Handling invalid numeric inputs gracefully and keeping the layout balanced across smaller mobile viewports.',
    image: '/image/currencyconvertorimage.webp',
    imageWidth: 532,
    imageHeight: 646,
    imageAlt: 'Screenshot of Keshav Currency Converter project',
    featured: true,
    liveUrl: '', // TODO: Add live demo URL once deployed
    githubUrl: 'https://github.com/keshav529?tab=repositories', // TODO: Replace with exact repo URL
    hasLiveDemo: false,
    hasExactRepo: false,
  },
  {
    slug: 'netflix-clone',
    title: 'Netflix Homepage Clone',
    category: 'CSS/HTML',
    tags: ['HTML5', 'CSS3', 'Responsive Layout'],
    role: 'UI & Front-end Builder',
    year: '2024',
    projectType: 'Responsive Layout Study',
    shortDescription:
      'Responsive streaming homepage recreation focused on visual hierarchy, dark contrast, and mobile adaptation.',
    overview:
      'Recreated the landing layout of Netflix using pure HTML and CSS to practice multi-section alignment, hero overlays, and responsive breakpoints.',
    whatItDoes:
      'Presents a layered full-bleed hero banner with high-contrast call-to-action inputs, feature showcases aligned with Flexbox and Grid, and an expandable FAQ layout.',
    whatILearned:
      'Structuring complex hero overlays, managing Flexbox/Grid alignment across sections, and keeping typography legible over background images.',
    challenges:
      'Matching card spacing and keeping the FAQ and feature sections aligned consistently from mobile to wide desktop monitors.',
    image: '/image/netfliximageportfolio.webp',
    imageWidth: 1200,
    imageHeight: 568,
    imageAlt: 'Screenshot of Netflix Homepage Clone project',
    liveUrl: 'https://netflix-clone-keshav529.vercel.app',
    githubUrl: 'https://github.com/keshav529/Netflix-clone',
    hasLiveDemo: true,
    hasExactRepo: true,
  },
  {
    slug: 'website-clone',
    title: 'Bootstrap Website Clone',
    category: 'CSS/HTML',
    tags: ['HTML5', 'CSS3', 'Bootstrap 5'],
    role: 'Front-end Developer',
    year: '2024',
    projectType: 'Responsive Multi-Section Site',
    shortDescription:
      'Multi-section responsive website clone built with Bootstrap grid components and custom styling.',
    overview:
      'Built a complete responsive website layout using Bootstrap utilities, cards, and navbar components paired with custom CSS refinements.',
    whatItDoes:
      'Organizes navigation, feature cards, multi-column grids, and responsive breakpoints so the layout adapts smoothly from desktop monitors down to small mobile screens.',
    whatILearned:
      'Using Bootstrap’s 12-column responsive grid effectively while overriding default styles cleanly without breaking component spacing.',
    challenges:
      'Balancing Bootstrap utility classes with custom section spacing so the page stays consistent on tablets and small phones.',
    image: '/image/bootstapimage.webp',
    imageWidth: 1200,
    imageHeight: 565,
    imageAlt: 'Screenshot of Bootstrap Website Clone project',
    liveUrl: 'https://bootstrap-projects-mu.vercel.app',
    githubUrl: 'https://github.com/keshav529/Bootstrap-Projects',
    hasLiveDemo: true,
    hasExactRepo: true,
  },
  {
    slug: 'tic-tac-toe',
    title: 'Tic-Tac-Toe Game',
    category: 'JavaScript',
    tags: ['HTML5', 'CSS3', 'JavaScript'],
    role: 'JavaScript Developer',
    year: '2024',
    projectType: 'Browser Game',
    shortDescription:
      'Interactive two-player Tic-Tac-Toe game with win detection, draw state, and instant board reset.',
    overview:
      'Created a classic Tic-Tac-Toe web game with turn tracking, winning pattern checks, and clear visual feedback on game completion.',
    whatItDoes:
      'Tracks alternating X and O player turns across a 3x3 interactive grid, evaluates winning rows/columns/diagonals after every move, detects draws, and resets cleanly.',
    whatILearned:
      'Managing game state arrays in JavaScript, checking win combinations efficiently, and locking board clicks after a win.',
    challenges:
      'Preventing extra moves after a round ends and distinguishing draw outcomes cleanly from win states.',
    image: '/image/tictactoeportfolioimg.webp',
    imageWidth: 650,
    imageHeight: 789,
    imageAlt: 'Screenshot of Tic-Tac-Toe interactive game',
    liveUrl: 'https://tic-tac-toe-project-wheat.vercel.app',
    githubUrl: 'https://github.com/keshav529/Tic-Tac-Toe-project',
    hasLiveDemo: true,
    hasExactRepo: true,
  },
  {
    slug: 'stopwatch',
    title: 'Digital Stopwatch',
    category: 'JavaScript',
    tags: ['HTML5', 'CSS3', 'JavaScript'],
    role: 'JavaScript Developer',
    year: '2024',
    projectType: 'Browser Utility',
    shortDescription:
      'Precision timer web app featuring Start, Stop, and Reset controls with readable tabular digits.',
    overview:
      'Built a clean stopwatch utility with JavaScript interval timing and straightforward controls for starting, pausing, and resetting elapsed time.',
    whatItDoes:
      'Counts elapsed hours, minutes, and seconds reliably in real time while ensuring duplicate timers cannot overlap when Start is triggered repeatedly.',
    whatILearned:
      'Working with setInterval/clearInterval safely, formatting padded time units, and avoiding duplicate timer intervals.',
    challenges:
      'Preventing multiple intervals from running simultaneously if the Start button is clicked more than once.',
    image: '/image/stopwatchimg.webp',
    imageWidth: 1015,
    imageHeight: 439,
    imageAlt: 'Screenshot of Digital Stopwatch project',
    liveUrl: '', // TODO: Add live demo URL once deployed
    githubUrl: 'https://github.com/keshav529?tab=repositories', // TODO: Replace with exact repo URL
    hasLiveDemo: false,
    hasExactRepo: false,
  },
  {
    slug: 'calculator',
    title: 'Web Calculator',
    category: 'JavaScript',
    tags: ['HTML5', 'CSS3', 'JavaScript'],
    role: 'Front-end & Logic Developer',
    year: '2024',
    projectType: 'Interactive Utility',
    shortDescription:
      'Clean arithmetic calculator with responsive button grid and instant calculation feedback.',
    overview:
      'Designed and coded a browser calculator supporting standard arithmetic operations, clear/backspace actions, and responsive button layout.',
    whatItDoes:
      'Renders a tactile CSS Grid keypad that processes addition, subtraction, multiplication, division, decimal entry, backspace, and full reset inside a single responsive display.',
    whatILearned:
      'Handling button event delegation, building balanced CSS Grid button layouts, and validating operator sequences.',
    challenges:
      'Handling consecutive operators and edge cases like division by zero or multiple decimal points.',
    image: '/image/calculatorimg.webp',
    imageWidth: 730,
    imageHeight: 853,
    imageAlt: 'Screenshot of Web Calculator project',
    liveUrl: '', // TODO: Add live demo URL once deployed
    githubUrl: 'https://github.com/keshav529?tab=repositories', // TODO: Replace with exact repo URL
    hasLiveDemo: false,
    hasExactRepo: false,
  },
];

export interface AdditionalRepoItem {
  name: string;
  description: string;
  githubUrl: string;
  liveUrl: string;
}

/**
 * Additional real public repositories deployed on your GitHub account (keshav529).
 */
export const ADDITIONAL_GITHUB_REPOS: AdditionalRepoItem[] = [
  {
    name: 'Image Search App',
    description: 'Search and browse images dynamically using JavaScript and an external API.',
    githubUrl: 'https://github.com/keshav529/image-search',
    liveUrl: 'https://image-search-keshav529.vercel.app',
  },
  {
    name: 'Password Generator',
    description: 'Interactive random password generator with length and character options.',
    githubUrl: 'https://github.com/keshav529/Password-generator-Project',
    liveUrl: 'https://password-generator-project-jet.vercel.app',
  },
  {
    name: 'Tip Calculator',
    description: 'Clean bill-splitting and tip calculation utility built with HTML, CSS, and JS.',
    githubUrl: 'https://github.com/keshav529/Tip-Calculator',
    liveUrl: 'https://tip-calculator-sand-xi.vercel.app',
  },
];

export const WHY_WORK_WITH_ME: string[] = [
  'Clean, readable HTML, CSS, and JavaScript that is easy to maintain',
  'Mobile-first responsive layouts tested across phone, tablet, and desktop widths',
  'Fast-loading pages with lightweight assets and minimal dependencies',
  'SEO-friendly semantic headings, landmarks, and descriptive metadata',
  'Keyboard-accessible controls and thoughtful color contrast',
  'Version-controlled workflow using Git and GitHub commits',
  'Strong willingness to learn React, Node.js, MongoDB, and DSA daily',
  'Honest communication, curiosity, and readiness for feedback',
];

export const LEARNING_AND_PEER_CARDS: PlaceholderNoteCard[] = [
  {
    id: 'learning-mern',
    label: 'Currently Learning',
    title: 'Full-Stack MERN & Problem Solving',
    body: 'Building component-driven UIs with React, learning backend APIs with Node.js & MongoDB, and practicing Data Structures & Algorithms on LeetCode.',
    authorNote: 'Active Focus • 2025',
  },
  {
    id: 'mentor-placeholder-1',
    label: 'Mentor Feedback (Placeholder)',
    title: 'Replace with a real mentor or faculty note',
    body: 'Placeholder: Add a short, genuine quote from a BCA professor, project mentor, or senior developer once you receive feedback on your projects or code reviews.',
    authorNote: 'Placeholder — Name, Role / College',
  },
  {
    id: 'peer-placeholder-2',
    label: 'Peer / Teammate Note (Placeholder)',
    title: 'Replace with a real teammate quote',
    body: 'Placeholder: Add a genuine comment from a classmate or hackathon teammate who collaborated with you on UI design, Git workflows, or problem solving.',
    authorNote: 'Placeholder — Name, Collaborator',
  },
];

export const HOME_FAQS: FaqItem[] = [
  {
    id: 'tech-stack',
    question: 'What technologies do you work with?',
    answer:
      'I build projects using HTML5, CSS3, JavaScript, Java, C, Bootstrap, Figma, and Git/GitHub. Alongside that, I am actively learning React, Node.js, MongoDB, and Data Structures & Algorithms.',
  },
  {
    id: 'availability',
    question: 'Are you open to internships or entry-level opportunities?',
    answer:
      'Yes! As a BCA student (2022–2025), I am actively looking for web development internships, trainee roles, and collaborative projects where I can contribute and learn from experienced engineers.',
  },
  {
    id: 'approach',
    question: 'How do you approach a new project?',
    answer:
      'I start by understanding the goal and user flow, sketch wireframes or layout structure in Figma, build semantic and responsive components step by step, and test edge cases across devices before deploying.',
  },
  {
    id: 'contact',
    question: 'How can I contact you?',
    answer:
      'You can reach me directly by email at keshavanand748@gmail.com, by phone at +91-9817357072, via LinkedIn, or through the Contact page on this site.',
  },
];

export const EDUCATION_TIMELINE: EducationItem[] = [
  {
    id: 'bca',
    period: '2022 – 2025',
    qualification: 'Bachelor of Computer Applications (BCA)',
    institution: 'Sh. L.N. Hindu College, Rohtak (MDU)',
    result: 'Current Percentage: 72%',
    notes:
      'Studying core computer science subjects, programming in C and Java, web technologies, and building practical front-end projects.',
  },
  {
    id: 'class-12',
    period: '2022',
    qualification: 'Class 12th (HBSE)',
    institution: 'Government School, Kalanaur',
    result: 'Percentage: 82.2%',
    notes: 'Completed senior secondary education with strong analytical fundamentals.',
  },
  {
    id: 'class-10',
    period: '2020',
    qualification: 'Class 10th (CBSE)',
    institution: 'Sati Bhai Sai Dass Public School, Kalanaur',
    result: 'Percentage: 69.6%',
    notes: 'Built my early foundation in mathematics, science, and computer basics.',
  },
];

/**
 * 6 real journey stops for the horizontal timeline on /about (600vw track inside 1000vh).
 */
export const ABOUT_TIMELINE: AboutTimelineStop[] = [
  {
    id: 'stop-class-10',
    marker: '2020',
    title: 'Class 10 (CBSE)',
    subtitle: '69.6% • Sati Bhai Sai Dass Public School, Kalanaur',
    description:
      'Completed secondary schooling with my first curiosity in computers, mathematics, and structured problem solving.',
    image: '/image/keshavphotos.webp',
    imageWidth: 720,
    imageHeight: 960,
    imageAlt: 'Portrait of Keshav Anand',
  },
  {
    id: 'stop-class-12',
    marker: '2022',
    title: 'Class 12 (HBSE)',
    subtitle: '82.2% • Government School, Kalanaur',
    description:
      'Graduated senior secondary school with 82.2%, strengthening my analytical mindset ahead of studying software development.',
    image: '/image/contactphoto.webp',
    imageWidth: 720,
    imageHeight: 936,
    imageAlt: 'Development laptop and study workspace',
  },
  {
    id: 'stop-bca',
    marker: '2022–25',
    title: 'Starting BCA',
    subtitle: '72% • Sh. L.N. Hindu College, Rohtak (MDU)',
    description:
      'Entered the Bachelor of Computer Applications program, learning core programming in C and Java alongside web fundamentals.',
    image: '/image/figmaimage.webp',
    imageWidth: 160,
    imageHeight: 160,
    imageAlt: 'UI design and foundational software engineering tools',
  },
  {
    id: 'stop-projects',
    marker: 'Builds',
    title: 'Web Projects',
    subtitle: 'HTML5, CSS3, Bootstrap & JavaScript',
    description:
      'Turned theory into real browser projects: Netflix Homepage Clone, Bootstrap Website Clone, Currency Converter, Tic-Tac-Toe, Stopwatch, and Calculator.',
    image: '/image/netfliximageportfolio.webp',
    imageWidth: 1200,
    imageHeight: 568,
    imageAlt: 'Screenshot of responsive Netflix homepage clone',
  },
  {
    id: 'stop-stack',
    marker: 'Learning',
    title: 'MERN & DSA',
    subtitle: 'React, Node.js, MongoDB & LeetCode',
    description:
      'Actively practicing Data Structures & Algorithms in Java/C on LeetCode while building component UIs in React and backend APIs with Node.js and MongoDB.',
    image: '/image/currencyconvertorimage.webp',
    imageWidth: 532,
    imageHeight: 646,
    imageAlt: 'Screenshot of interactive JavaScript currency converter app',
  },
  {
    id: 'stop-next',
    marker: '2025',
    title: 'Next Chapter',
    subtitle: 'Open to Internships & Junior Web Roles',
    description:
      'Ready to join a collaborative product team where I can ship reliable front-end code, learn from code reviews, and grow into a full-stack engineer.',
    image: '/image/bootstapimage.webp',
    imageWidth: 1200,
    imageHeight: 565,
    imageAlt: 'Responsive multi-column web layout preview',
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'using-now',
    title: 'Using Now',
    subtitle: 'Core languages, styling frameworks, and tools I build projects with today.',
    items: [
      { name: 'HTML5', icon: '/image/html5.webp', width: 160, height: 160, focus: 'Semantic markup & accessibility' },
      { name: 'CSS3', icon: '/image/cssimage.webp', width: 160, height: 160, focus: 'Flexbox, Grid & animations' },
      { name: 'JavaScript', icon: '/image/javascriptimage.webp', width: 96, height: 96, focus: 'DOM, events & fetch APIs' },
      { name: 'Java', icon: '/image/javaimage.webp', width: 160, height: 160, focus: 'OOP & problem solving' },
      { name: 'C Programming', icon: '/image/cprogrammingimage.webp', width: 96, height: 96, focus: 'Core logic & memory basics' },
      { name: 'Bootstrap', icon: '/image/bootsrap.webp', width: 160, height: 160, focus: 'Responsive UI layouts' },
      { name: 'Figma', icon: '/image/figmaimage.webp', width: 160, height: 160, focus: 'Wireframes & UI design' },
      { name: 'Git & GitHub', icon: '/image/githubimage.webp', width: 100, height: 100, focus: 'Version control & collaboration' },
    ],
  },
  {
    id: 'learning',
    title: 'Learning Next',
    subtitle: 'Full-stack technologies and computer science fundamentals I am actively practicing.',
    items: [
      { name: 'React', icon: '/image/REACTIMAGE.webp', width: 160, height: 160, focus: 'Components, hooks & routing' },
      { name: 'Node.js', icon: '/image/NODEJSIMAGE.webp', width: 96, height: 96, focus: 'REST APIs & server runtime' },
      { name: 'MongoDB', icon: '/image/MONGODBIMAGE.webp', width: 160, height: 160, focus: 'Document schemas & queries' },
      { name: 'DSA', icon: '/image/deep-learning.webp', width: 160, height: 160, focus: 'Arrays, strings & LeetCode practice' },
    ],
  },
  {
    id: 'soft-skills',
    title: 'Soft Skills',
    subtitle: 'Collaboration habits I bring to student teams and engineering workflows.',
    items: [
      { name: 'Communication Skills', icon: '/image/csimage.webp', width: 160, height: 160, focus: 'Clear updates & active listening' },
      { name: 'Problem Solving', icon: '/image/problemsolvingimage.webp', width: 160, height: 160, focus: 'Debugging step by step' },
      { name: 'Presentation Skills', icon: '/image/presentationskillimage.webp', width: 160, height: 160, focus: 'Explaining ideas clearly' },
    ],
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    title: 'Understand',
    summary: 'Define the goal, user needs, and core constraints before writing a line of code.',
    details: [
      'Clarify what problem the page or browser tool solves',
      'Separate essential features from distractions',
      'Plan content hierarchy so key actions stand out cleanly',
    ],
  },
  {
    step: '02',
    title: 'Plan',
    summary: 'Sketch layout structure, spacing, and visual hierarchy in Figma.',
    details: [
      'Map mobile and desktop layouts side by side',
      'Set clean typography and a restrained colour system',
      'Break the UI into reusable sections or React components',
    ],
  },
  {
    step: '03',
    title: 'Build',
    summary: 'Translate designs into semantic, responsive, and maintainable code.',
    details: [
      'Write accessible HTML landmarks and design token CSS',
      'Implement interactive JavaScript states and Fetch API logic',
      'Commit progress cleanly with Git and GitHub',
    ],
  },
  {
    step: '04',
    title: 'Improve',
    summary: 'Test across screen sizes, refine edge cases, and keep learning.',
    details: [
      'Verify keyboard navigation, focus states, and contrast',
      'Test edge cases such as empty inputs and narrow mobile viewports',
      'Review performance and deploy cleanly on Vercel',
    ],
  },
];

export const RESOURCE_ITEMS: ResourceItem[] = [
  {
    id: 'resume-pdf',
    category: 'Curriculum Vitae',
    title: 'Keshav Anand — Resume (PDF)',
    description:
      'Complete summary of my BCA coursework (2022–2025), technical skills in HTML, CSS, JS, Java, C, Bootstrap, Figma, and GitHub, plus contact details.',
    url: '/image/Keshav-Anand-Resume.pdf',
    external: false,
    download: true,
    ctaLabel: 'Download PDF',
    image: '/image/resume.webp',
    imageWidth: 420,
    imageHeight: 420,
    imageAlt: 'Preview of Keshav Anand CV document',
  },
  {
    id: 'github-profile',
    category: 'Repositories',
    title: 'GitHub — @keshav529',
    description:
      'Browse source code for my portfolio, Netflix clone, Bootstrap websites, Tic-Tac-Toe, Image Search, and JavaScript practice repositories.',
    url: 'https://github.com/keshav529',
    external: true,
    ctaLabel: 'Open GitHub',
    image: '/image/githubimage.webp',
    imageWidth: 100,
    imageHeight: 100,
    imageAlt: 'GitHub icon',
  },
  {
    id: 'leetcode-profile',
    category: 'Problem Solving',
    title: 'LeetCode — @keshavanand',
    description:
      'Daily Data Structures & Algorithms practice focused on arrays, strings, hashing, and problem decomposition in Java and C.',
    url: 'https://leetcode.com/u/keshavanand/',
    external: true,
    ctaLabel: 'Open LeetCode',
    image: '/image/leetcodeimage.webp',
    imageWidth: 160,
    imageHeight: 160,
    imageAlt: 'LeetCode icon',
  },
  {
    id: 'linkedin-profile',
    category: 'Network',
    title: 'LinkedIn — Keshav Anand',
    description:
      'Connect with me for web development internships, trainee roles, academic updates, and project discussions.',
    url: 'https://www.linkedin.com/in/keshav-anand-8ba87a293',
    external: true,
    ctaLabel: 'Connect on LinkedIn',
    image: '/image/linkedinimage.webp',
    imageWidth: 96,
    imageHeight: 96,
    imageAlt: 'LinkedIn icon',
  },
  {
    id: 'mdn',
    category: 'Reference',
    title: 'MDN Web Docs — HTML, CSS & JavaScript',
    description:
      'My go-to documentation for semantic HTML5 landmarks, modern CSS Grid/Flexbox, and browser Web APIs.',
    url: 'https://developer.mozilla.org/',
    external: true,
    ctaLabel: 'Visit MDN',
    image: '/image/html5.webp',
    imageWidth: 160,
    imageHeight: 160,
    imageAlt: 'HTML5 documentation reference badge',
  },
  {
    id: 'react-docs',
    category: 'Learning Note',
    title: 'React Official Documentation',
    description:
      'Working through component composition, hooks, and predictable UI state as I expand beyond vanilla JavaScript.',
    url: 'https://react.dev/',
    external: true,
    ctaLabel: 'Visit React Docs',
    image: '/image/REACTIMAGE.webp',
    imageWidth: 160,
    imageHeight: 160,
    imageAlt: 'React logo badge',
  },
];
