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
  number: string;
  title: string;
  summary: string;
  details: string;
  image: string;
  imageAlt: string;
  deliverables: string[];
}

export interface ProjectItem {
  slug: string;
  workNumber: string;
  title: string;
  category: 'CSS/HTML' | 'JavaScript' | 'API';
  tags: string[];
  shortDescription: string;
  overview: string;
  whatILearned: string;
  challenges: string;
  image: string;
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

export interface SkillItem {
  name: string;
  icon: string;
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
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Process', path: '/process' },
  { label: 'Work', path: '/work' },
  { label: 'Contact', path: '/contact' },
  { label: 'Resources', path: '/resources' },
];

export const PROFILE = {
  name: 'Keshav',
  fullName: 'Keshav Anand',
  tagline: 'WEB DEVELOPMENT • UI DESIGN • PROBLEM SOLVING',
  role: 'Aspiring Software Developer',
  degree: 'BCA Student (2022–2025)',
  college: 'Sh. L.N. Hindu College, Rohtak (MDU)',
  email: 'keshavanand748@gmail.com',
  phone: '+91-9817357072',
  resumeUrl: '/image/keshav_CV.pdf.pdf',
  resumeCover: '/image/resume.png',
  profilePhoto: '/image/keshavphotos.jpg',
  socials: {
    linkedin: 'https://www.linkedin.com/in/keshav-anand-8ba87a293',
    leetcode: 'https://leetcode.com/u/keshavanand/',
    github: 'https://github.com/keshav529',
  },
};

/**
 * Contact Form (Formspree) Configuration
 * TODO: Create a free form at https://formspree.io and replace YOUR_FORMSPREE_ID below.
 */
export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORMSPREE_ID';

export const SERVICES: ServiceItem[] = [
  {
    id: 'web-dev',
    number: '01',
    title: 'Web Development',
    summary: 'Clean, semantic HTML, modern CSS, and maintainable JavaScript.',
    details:
      'I build structured, fast-loading web pages from scratch with readable markup and clean styling, and I am actively expanding into React and Node.js.',
    image: '/image/contactphoto.jpg',
    imageAlt: 'Laptop displaying clean frontend web development code',
    deliverables: ['Semantic HTML5', 'Modular CSS', 'JavaScript DOM logic'],
  },
  {
    id: 'ui-design',
    number: '02',
    title: 'UI/UX Design (Figma)',
    summary: 'Wireframes, layout hierarchy, and clean visual prototypes in Figma.',
    details:
      'Before writing code, I sketch user flows and layout grids in Figma so spacing, typography, and button hierarchy feel intentional on every screen.',
    image: '/image/netfliximageportfolio.png',
    imageAlt: 'High-contrast UI layout design showcase',
    deliverables: ['Wireframing', 'Component spacing', 'Visual hierarchy'],
  },
  {
    id: 'responsive',
    number: '03',
    title: 'Responsive Websites',
    summary: 'Layouts that adapt smoothly across phones, tablets, and desktops.',
    details:
      'Using CSS Grid, Flexbox, and Bootstrap, I make sure navigation, cards, and media scale cleanly without horizontal overflow or cramped mobile tap targets.',
    image: '/image/bootstapimage.png',
    imageAlt: 'Responsive multi-column website layout preview',
    deliverables: ['Mobile-first CSS', 'Bootstrap grids', 'Cross-browser checks'],
  },
  {
    id: 'js-apps',
    number: '04',
    title: 'Interactive JavaScript Apps',
    summary: 'Client-side logic, state handling, and real-time API integrations.',
    details:
      'From game state in Tic-Tac-Toe to timers in Stopwatch and live exchange rates in Currency Converter, I enjoy turning ideas into interactive browser tools.',
    image: '/image/currencyconvertorimage.png',
    imageAlt: 'Interactive JavaScript currency converter application',
    deliverables: ['Event handling', 'Fetch API & JSON', 'Interactive UI states'],
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    slug: 'currency-converter',
    workNumber: 'Work #1',
    title: 'Currency Converter',
    category: 'API',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'REST API'],
    shortDescription:
      'Real-time currency conversion app using live exchange rate API data and clean selector states.',
    overview:
      'Built a browser-based currency converter that fetches live exchange rates asynchronously and updates converted values cleanly with flag indicators.',
    whatILearned:
      'Working with asynchronous fetch() calls, parsing JSON responses, handling loading/error states, and updating the DOM cleanly.',
    challenges:
      'Handling invalid numeric inputs gracefully and keeping the layout balanced across smaller mobile viewports.',
    image: '/image/currencyconvertorimage.png',
    imageAlt: 'Screenshot of Keshav Currency Converter project',
    featured: true,
    liveUrl: '', // TODO: Add live demo URL once deployed
    githubUrl: 'https://github.com/keshav529?tab=repositories', // TODO: Replace with exact repo URL
    hasLiveDemo: false,
    hasExactRepo: false,
  },
  {
    slug: 'netflix-clone',
    workNumber: 'Work #2',
    title: 'Netflix Homepage Clone',
    category: 'CSS/HTML',
    tags: ['HTML5', 'CSS3', 'Responsive Layout'],
    shortDescription:
      'Responsive streaming homepage recreation focused on visual hierarchy, dark contrast, and mobile adaptation.',
    overview:
      'Recreated the landing layout of Netflix using pure HTML and CSS to practice multi-section alignment, hero overlays, and responsive breakpoints.',
    whatILearned:
      'Structuring complex hero overlays, managing Flexbox/Grid alignment across sections, and keeping typography legible over background images.',
    challenges:
      'Matching card spacing and keeping the FAQ and feature sections aligned consistently from mobile to wide desktop monitors.',
    image: '/image/netfliximageportfolio.png',
    imageAlt: 'Screenshot of Netflix Homepage Clone project',
    liveUrl: 'https://netflix-clone-keshav529.vercel.app',
    githubUrl: 'https://github.com/keshav529/Netflix-clone',
    hasLiveDemo: true,
    hasExactRepo: true,
  },
  {
    slug: 'website-clone',
    workNumber: 'Work #3',
    title: 'Bootstrap Website Clone',
    category: 'CSS/HTML',
    tags: ['HTML5', 'CSS3', 'Bootstrap 5'],
    shortDescription:
      'Multi-section responsive website clone built with Bootstrap grid components and custom styling.',
    overview:
      'Built a complete responsive website layout using Bootstrap utilities, cards, and navbar components paired with custom CSS refinements.',
    whatILearned:
      'Using Bootstrap’s 12-column responsive grid effectively while overriding default styles cleanly without breaking component spacing.',
    challenges:
      'Balancing Bootstrap utility classes with custom section spacing so the page stays consistent on tablets and small phones.',
    image: '/image/bootstapimage.png',
    imageAlt: 'Screenshot of Bootstrap Website Clone project',
    liveUrl: 'https://bootstrap-projects-mu.vercel.app',
    githubUrl: 'https://github.com/keshav529/Bootstrap-Projects',
    hasLiveDemo: true,
    hasExactRepo: true,
  },
  {
    slug: 'tic-tac-toe',
    workNumber: 'Work #4',
    title: 'Tic-Tac-Toe Game',
    category: 'JavaScript',
    tags: ['HTML5', 'CSS3', 'JavaScript'],
    shortDescription:
      'Interactive two-player Tic-Tac-Toe game with win detection, draw state, and instant board reset.',
    overview:
      'Created a classic Tic-Tac-Toe web game with turn tracking, winning pattern checks, and clear visual feedback on game completion.',
    whatILearned:
      'Managing game state arrays in JavaScript, checking win combinations efficiently, and locking board clicks after a win.',
    challenges:
      'Preventing extra moves after a round ends and distinguishing draw outcomes cleanly from win states.',
    image: '/image/tictactoeportfolioimg.png',
    imageAlt: 'Screenshot of Tic-Tac-Toe interactive game',
    liveUrl: 'https://tic-tac-toe-project-wheat.vercel.app',
    githubUrl: 'https://github.com/keshav529/Tic-Tac-Toe-project',
    hasLiveDemo: true,
    hasExactRepo: true,
  },
  {
    slug: 'stopwatch',
    workNumber: 'Work #5',
    title: 'Digital Stopwatch',
    category: 'JavaScript',
    tags: ['HTML5', 'CSS3', 'JavaScript'],
    shortDescription:
      'Precision timer web app featuring Start, Stop, and Reset controls with clean monospace readability.',
    overview:
      'Built a clean stopwatch utility with JavaScript interval timing and straightforward controls for starting, pausing, and resetting elapsed time.',
    whatILearned:
      'Working with setInterval/clearInterval safely, formatting padded time units, and avoiding duplicate timer intervals.',
    challenges:
      'Preventing multiple intervals from running simultaneously if the Start button is clicked more than once.',
    image: '/image/stopwatchimg.png',
    imageAlt: 'Screenshot of Digital Stopwatch project',
    liveUrl: '', // TODO: Add live demo URL once deployed
    githubUrl: 'https://github.com/keshav529?tab=repositories', // TODO: Replace with exact repo URL
    hasLiveDemo: false,
    hasExactRepo: false,
  },
  {
    slug: 'calculator',
    workNumber: 'Work #6',
    title: 'Web Calculator',
    category: 'JavaScript',
    tags: ['HTML5', 'CSS3', 'JavaScript'],
    shortDescription:
      'Clean arithmetic calculator with responsive button grid and instant calculation feedback.',
    overview:
      'Designed and coded a browser calculator supporting standard arithmetic operations, clear/backspace actions, and responsive button layout.',
    whatILearned:
      'Handling button event delegation, building balanced CSS Grid button layouts, and validating operator sequences.',
    challenges:
      'Handling consecutive operators and edge cases like division by zero or multiple decimal points.',
    image: '/image/calculatorimg.png',
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

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'using-now',
    title: 'Using Now',
    subtitle: 'Core languages, styling frameworks, and tools I build projects with today.',
    items: [
      { name: 'HTML5', icon: '/image/html5.png', focus: 'Semantic markup & accessibility' },
      { name: 'CSS3', icon: '/image/cssimage.png', focus: 'Flexbox, Grid & animations' },
      { name: 'JavaScript', icon: '/image/javascriptimage.png', focus: 'DOM, events & fetch APIs' },
      { name: 'Java', icon: '/image/javaimage.png', focus: 'OOP & problem solving' },
      { name: 'C Programming', icon: '/image/cprogrammingimage.png', focus: 'Core logic & memory basics' },
      { name: 'Bootstrap', icon: '/image/bootsrap.png', focus: 'Responsive UI layouts' },
      { name: 'Figma', icon: '/image/figmaimage.png', focus: 'Wireframes & UI design' },
      { name: 'Git & GitHub', icon: '/image/githubimage.png', focus: 'Version control & collaboration' },
    ],
  },
  {
    id: 'learning',
    title: 'Learning Next',
    subtitle: 'Full-stack technologies and computer science fundamentals I am actively practicing.',
    items: [
      { name: 'React', icon: '/image/REACTIMAGE.png', focus: 'Components, hooks & routing' },
      { name: 'Node.js', icon: '/image/NODEJSIMAGE.png', focus: 'REST APIs & server runtime' },
      { name: 'MongoDB', icon: '/image/MONGODBIMAGE.png', focus: 'Document schemas & queries' },
      { name: 'DSA', icon: '/image/deep-learning.png', focus: 'Arrays, strings & LeetCode practice' },
    ],
  },
  {
    id: 'soft-skills',
    title: 'Soft Skills',
    subtitle: 'Collaboration habits I bring to student teams and engineering workflows.',
    items: [
      { name: 'Communication Skills', icon: '/image/csimage.jpg', focus: 'Clear updates & active listening' },
      { name: 'Problem Solving', icon: '/image/problemsolvingimage.jpg', focus: 'Debugging step by step' },
      { name: 'Presentation Skills', icon: '/image/presentationskillimage.jpg', focus: 'Explaining ideas clearly' },
    ],
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    title: 'Understand',
    summary: 'Define the goal, audience, and core constraints before opening the editor.',
    details: [
      'Clarify what problem the page or tool needs to solve',
      'List essential features vs. nice-to-have ideas',
      'Check content hierarchy so key actions stand out',
    ],
  },
  {
    step: '02',
    title: 'Plan',
    summary: 'Sketch layout structure, spacing, and visual hierarchy in Figma.',
    details: [
      'Map mobile and desktop layouts side by side',
      'Choose clean typography and a restrained color palette',
      'Break the UI into reusable sections or React components',
    ],
  },
  {
    step: '03',
    title: 'Build',
    summary: 'Translate designs into semantic, responsive, and maintainable code.',
    details: [
      'Write accessible HTML landmarks and clean CSS variables',
      'Implement interactive JavaScript states and API handling',
      'Commit progress clearly with Git and GitHub',
    ],
  },
  {
    step: '04',
    title: 'Improve',
    summary: 'Test across screen sizes, refine edge cases, and keep learning.',
    details: [
      'Check keyboard navigation, focus states, and contrast',
      'Test edge cases like empty inputs and mobile wrapping',
      'Review performance and deploy cleanly on Vercel',
    ],
  },
];

export const RESOURCE_ITEMS: ResourceItem[] = [
  {
    id: 'mdn',
    category: 'Reference',
    title: 'MDN Web Docs — HTML, CSS & JavaScript',
    description: 'My go-to documentation for semantic HTML, modern CSS Grid/Flexbox, and Web APIs.',
    url: 'https://developer.mozilla.org/',
    external: true,
  },
  {
    id: 'react-docs',
    category: 'Learning Note',
    title: 'React Official Documentation',
    description: 'Working through component composition, state management, and hooks as I expand beyond vanilla JS.',
    url: 'https://react.dev/',
    external: true,
  },
  {
    id: 'leetcode-profile',
    category: 'Practice',
    title: 'My LeetCode Problem-Solving Log',
    description: 'Tracking daily practice with arrays, strings, hashing, and foundational algorithms.',
    url: 'https://leetcode.com/u/keshavanand/',
    external: true,
  },
  {
    id: 'github-profile',
    category: 'Code',
    title: 'My GitHub Repositories',
    description: 'Browse my portfolio code, web clones, and JavaScript practice repositories.',
    url: 'https://github.com/keshav529',
    external: true,
  },
];
