import {
  Accessibility,
  Boxes,
  Building2,
  Code2,
  Eye,
  HandHeart,
  HeartHandshake,
  Home,
  Inbox,
  KeyRound,
  MessagesSquare,
  Network,
  Route,
  ShieldCheck,
  Truck,
  Users,
  Workflow,
  type LucideIcon,
} from 'lucide-react'

// Everything the public website says lives here, so copy can change without touching layout.
// Rule for this file: say what exists today as fact, and label everything else as planned.
// No invented numbers, endorsements, or legal status.

export const LINKS = {
  github: 'https://github.com/Relay-Collective',
  repo: 'https://github.com/Relay-Collective/Relay-Collective',
  license: 'https://github.com/Relay-Collective/Relay-Collective/blob/main/LICENSE',
  signIn: '/signin',
  register: '/register',
  registerOrg: '/register?role=partner',
  registerDriver: '/register?role=driver',
  // The pitch walkthrough shows the real transportation screens, step by step
  transportTour: '/demo',
} as const

export const TAGLINE = 'Stronger communities. Built together.'

export const MISSION =
  'Relay Collective is building shared digital infrastructure that connects nonprofit organizations, volunteers, and community resources, making it easier to coordinate services, collaborate across organizations, and reach the people who need support.'

export interface NavItem {
  id: string
  label: string
}

export const NAV: NavItem[] = [
  { id: 'platform', label: 'Platform' },
  { id: 'mission', label: 'Our Mission' },
  { id: 'story', label: 'Our Story' },
  { id: 'get-involved', label: 'Get Involved' },
]

// 'live' is the transportation MVP. Everything else is a direction we are working toward.
export type Availability = 'live' | 'planned'

/* ---------- 01 Hero network ---------- */

export interface NetworkNode {
  id: string
  label: string
  description: string
  icon: LucideIcon
  x: number // position in the 600 × 560 drawing
  y: number
  availability?: Availability
}

export const NETWORK_HUB = { x: 300, y: 280 }

export const NETWORK_NODES: NetworkNode[] = [
  { id: 'nonprofits', label: 'Nonprofits', description: 'Organizations coordinating the services they deliver.', icon: Building2, x: 132, y: 112 },
  { id: 'volunteers', label: 'Volunteers', description: 'People giving their time, skills, and care.', icon: HandHeart, x: 468, y: 98 },
  { id: 'resources', label: 'Resources', description: 'Spaces, vehicles, supplies, and know-how worth sharing.', icon: Boxes, x: 508, y: 306 },
  {
    id: 'transport',
    label: 'Transportation',
    description: 'Rides to essential appointments. Our first application, working today.',
    icon: Route,
    x: 404,
    y: 472,
    availability: 'live',
  },
  { id: 'partners', label: 'Partners', description: 'Community partners working on shared needs.', icon: HeartHandshake, x: 168, y: 458 },
  { id: 'services', label: 'Services', description: 'Housing, health, food, and other essential support.', icon: Home, x: 96, y: 290 },
]

// Peer links: organizations working with each other, not only through the hub
export const NETWORK_PEERS: [string, string][] = [
  ['nonprofits', 'volunteers'],
  ['nonprofits', 'services'],
  ['resources', 'transport'],
  ['partners', 'services'],
  ['volunteers', 'resources'],
]

/* ---------- 02 Problem ---------- */

export const PROBLEMS: { title: string; text: string }[] = [
  {
    title: 'Fragmented tools',
    text: 'Spreadsheets, inboxes, phone trees, and one-off systems. Each organization stitches together its own, and little of it talks to anything else.',
  },
  {
    title: 'Limited visibility',
    text: 'A van sits idle at one organization while another turns someone away. Without a shared view, help that already exists is hard to find.',
  },
  {
    title: 'Coordination that eats the day',
    text: 'Matching staff, volunteers, and service providers often means calls, follow-ups, and guesswork, which is time taken from the people being served.',
  },
]

/* ---------- 03 Solution ---------- */

export interface Capability {
  title: string
  text: string
  icon: LucideIcon
  availability: Availability
  note: string
}

export const CAPABILITIES: Capability[] = [
  {
    title: 'Connected organizations',
    text: 'A shared space where nonprofits can find each other, see who is working on the same needs, and coordinate directly.',
    icon: Network,
    availability: 'planned',
    note: 'Planned',
  },
  {
    title: 'Shared resources',
    text: 'Vehicles, spaces, supplies, and expertise made visible, so organizations can lend and request what already exists.',
    icon: Boxes,
    availability: 'planned',
    note: 'Planned',
  },
  {
    title: 'Volunteer coordination',
    text: 'One place for volunteers to offer their time, and for organizations to match it to the work that needs doing.',
    icon: Users,
    availability: 'planned',
    note: 'Planned',
  },
  {
    title: 'Coordinated service requests',
    text: 'Staff send one request, it reaches the people who can help, and it stays in view until it is done.',
    icon: Inbox,
    availability: 'live',
    note: 'Working today for ride requests',
  },
]

/* ---------- 04 Platform ---------- */

export interface FoundationService {
  id: string
  label: string
  icon: LucideIcon
}

export const FOUNDATION: FoundationService[] = [
  { id: 'orgs', label: 'Organization management', icon: Building2 },
  { id: 'roles', label: 'Role-based access', icon: KeyRound },
  { id: 'requests', label: 'Requests', icon: Inbox },
  { id: 'workflows', label: 'Coordination workflows', icon: Workflow },
  { id: 'comms', label: 'Communication', icon: MessagesSquare },
  { id: 'visibility', label: 'Visibility', icon: Eye },
]

export interface PlatformModule {
  id: string
  name: string
  short: string
  icon: LucideIcon
  availability: Availability
  description: string
  details: string[]
  uses: string[] // FoundationService ids this module builds on
}

export const MODULES: PlatformModule[] = [
  {
    id: 'transport',
    name: 'Transportation coordination',
    short: 'Transportation',
    icon: Truck,
    availability: 'live',
    description:
      'Our working MVP. Housing and social service staff request a ride for someone they support, verified drivers accept it, and staff follow it through to drop-off.',
    details: [
      'The person riding needs no account, phone, or money',
      'Requests are matched on area, hours, seats, and wheelchair access',
      'Every organization and driver is reviewed before their first ride',
    ],
    uses: ['orgs', 'roles', 'requests', 'workflows', 'comms', 'visibility'],
  },
  {
    id: 'volunteers',
    name: 'Volunteer coordination',
    short: 'Volunteers',
    icon: Users,
    availability: 'planned',
    description:
      'A planned module for organizations to post where help is needed and for volunteers to offer time and skills that match.',
    details: ['Shared volunteer profiles across organizations', 'Matching on skills, availability, and location', 'Shifts and commitments kept in view'],
    uses: ['orgs', 'roles', 'requests', 'comms'],
  },
  {
    id: 'resources',
    name: 'Resource sharing',
    short: 'Resources',
    icon: Boxes,
    availability: 'planned',
    description: 'A planned module for making vehicles, spaces, supplies, and expertise visible and requestable across organizations.',
    details: ['A shared directory of what organizations can offer', 'Requests and lending between organizations', 'A clear record of who has what, and when'],
    uses: ['orgs', 'requests', 'workflows', 'visibility'],
  },
  {
    id: 'collaboration',
    name: 'Cross-organization service collaboration',
    short: 'Collaboration',
    icon: HeartHandshake,
    availability: 'planned',
    description:
      'A planned module for organizations to coordinate a person’s support across services, with referrals and hand-offs that do not get lost in between.',
    details: ['Referrals that stay visible end to end', 'Shared progress across organizations', 'Consent-aware, need-to-know sharing'],
    uses: ['orgs', 'roles', 'workflows', 'comms', 'visibility'],
  },
]

/* ---------- 05 Story ---------- */

export const STORY_STEPS: { label: string; title: string; text: string }[] = [
  {
    label: 'HACKVAN 2026',
    title: 'A hackathon project',
    text: 'Relay Collective began at FaithTech HACKVAN 2026, developed in partnership with The Salvation Army – Belkin Communities of Hope.',
  },
  {
    label: 'The first barrier',
    title: 'Getting there',
    text: 'Front-line staff showed us how often a missed ride means a missed hospital visit, appointment, or housing interview. Transportation became our first focus.',
  },
  {
    label: 'Today',
    title: 'A working transportation MVP',
    text: 'Staff request rides, verified drivers accept them, and every request stays in view until the person arrives.',
  },
  {
    label: 'What’s next',
    title: 'Beyond transportation',
    text: 'The same foundation can help nonprofits share resources, coordinate volunteers, and work together on much more.',
  },
]

export const TEAM = [
  { name: 'Noah Hamm', handle: 'maxiomattic' },
  { name: 'Aditya Padmarajan', handle: 'adi-padmarajan' },
  { name: 'Gilbert Fung', handle: 'gilbertfung' },
]

/* ---------- 06 Partners ---------- */

export const PARTNER = {
  name: 'The Salvation Army',
  program: 'Belkin Communities of Hope',
  place: 'Vancouver, BC',
  role: 'Pilot partner',
}

export const PARTNERSHIP: { title: string; text: string; icon: LucideIcon }[] = [
  {
    title: 'Built together from day one',
    text: 'Relay Collective began at FaithTech HACKVAN 2026, developed in partnership with the Belkin Communities of Hope team.',
    icon: HeartHandshake,
  },
  {
    title: 'Grounded in front-line work',
    text: 'Their staff showed us how often a missed ride means a missed hospital visit, appointment, or housing interview.',
    icon: Route,
  },
  {
    title: 'Our pilot partner',
    text: 'They’re helping shape the shared infrastructure nonprofits can build on together, starting with transportation and growing from there.',
    icon: Network,
  },
]

/* ---------- 07 Audiences ---------- */

export interface Audience {
  title: string
  text: string
  reason: string
  cta: string
  href: string
  external?: boolean
  icon: LucideIcon
  accent: 'blue' | 'teal' | 'cyan' | 'navy'
}

export const AUDIENCES: Audience[] = [
  {
    title: 'Nonprofit organizations',
    text: 'Coordinate resources and services with greater visibility.',
    reason: 'Housing and social service teams can register today and start requesting rides for the people they support.',
    cta: 'Register your organization',
    href: LINKS.registerOrg,
    icon: Building2,
    accent: 'blue',
  },
  {
    title: 'Community partners',
    text: 'Collaborate with organizations addressing shared community needs.',
    reason: 'We are looking for partners to help shape what the platform does next. Start a conversation with the team.',
    cta: 'Meet the team on GitHub',
    href: LINKS.github,
    external: true,
    icon: HeartHandshake,
    accent: 'teal',
  },
  {
    title: 'Volunteers',
    text: 'Contribute time, skills, and resources to meaningful initiatives.',
    reason: 'Driving people to essential appointments is the first way to help. More volunteer roles are planned.',
    cta: 'Volunteer as a driver',
    href: LINKS.registerDriver,
    icon: HandHeart,
    accent: 'cyan',
  },
  {
    title: 'Builders and contributors',
    text: 'Help create technology designed for real social impact.',
    reason: 'Relay Collective is open source. Designers, engineers, and researchers are welcome to dig in.',
    cta: 'Contribute on GitHub',
    href: LINKS.repo,
    external: true,
    icon: Code2,
    accent: 'navy',
  },
]

/* ---------- 08 Principles ---------- */

export const PRINCIPLES: { title: string; text: string; practice: string; icon: LucideIcon }[] = [
  {
    title: 'Dignity first',
    text: 'People receiving support are never asked to prove more, share more, or do more than they need to.',
    practice: 'The person riding needs no account, phone, or money. Drivers see only what the ride requires.',
    icon: HeartHandshake,
  },
  {
    title: 'Built for collaboration',
    text: 'Every feature should make it easier for organizations to work with each other, not only on their own.',
    practice: 'One request reaches every suitable driver and stays visible to staff until it is complete.',
    icon: Network,
  },
  {
    title: 'Accessible by design',
    text: 'Front-line work happens on old phones, shared computers, and busy afternoons. The tools have to keep up.',
    practice: 'Large targets, readable text, and keyboard support, designed to WCAG 2.2 AA, on the web and Android.',
    icon: Accessibility,
  },
  {
    title: 'Responsible and transparent',
    text: 'We are honest about what works today, what is planned, and how information is handled.',
    practice: 'Open source under the MIT license, with every participant reviewed before their first ride.',
    icon: ShieldCheck,
  },
]
