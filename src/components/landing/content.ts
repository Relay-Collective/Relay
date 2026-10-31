import { Building2, CarFront, HandHeart, Layers, type LucideIcon } from 'lucide-react'

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

// Each item jumps to a section on this page. Resources is the footer's resources column.
export const NAV: NavItem[] = [
  { id: 'platform', label: 'Platform' },
  { id: 'solutions', label: 'Solutions' },
  { id: 'impact', label: 'Impact' },
  { id: 'resources', label: 'Resources' },
]

export const PARTNER = {
  name: 'The Salvation Army',
  program: 'Belkin Communities of Hope',
  place: 'Vancouver, BC',
}

/* ---------- Trust strip: facts, not figures ---------- */

export const TRUST: { label: string; value: string }[] = [
  { label: 'Pilot partner', value: `${PARTNER.name} – ${PARTNER.program}` },
  { label: 'Where it began', value: 'FaithTech HACKVAN 2026' },
  { label: 'Built in', value: 'Vancouver, British Columbia' },
  { label: 'Open source', value: 'MIT licensed, on GitHub' },
]

/* ---------- Capabilities ---------- */

// 'live' works in the app today. 'partial' has a real first step. 'planned' is direction, not product.
export type Availability = 'live' | 'partial' | 'planned'

export interface Capability {
  id: string
  area: string
  title: string
  text: string
  status: string
  availability: Availability
  icon: LucideIcon
  accent: 'electric' | 'cantaloupe'
}

export const CAPABILITIES: Capability[] = [
  {
    id: 'transport',
    area: 'Transportation',
    title: 'Move people.',
    text: 'Coordinate rides to essential appointments, services, and destinations. Staff request a ride, a verified driver accepts it, and it stays in view until drop-off.',
    status: 'Working today',
    availability: 'live',
    icon: CarFront,
    accent: 'electric',
  },
  {
    id: 'volunteers',
    area: 'Volunteer coordination',
    title: 'Mobilize communities.',
    text: 'Connect volunteers with opportunities to support the organizations that need them. Volunteer drivers can sign up today.',
    status: 'Drivers today, more roles planned',
    availability: 'partial',
    icon: HandHeart,
    accent: 'cantaloupe',
  },
  {
    id: 'organizations',
    area: 'Organization management',
    title: 'Work together.',
    text: 'Bring your teams, members, and coordination workflows into one connected workspace, with invitations and role-based access.',
    status: 'Working today',
    availability: 'live',
    icon: Building2,
    accent: 'electric',
  },
  {
    id: 'grow',
    area: 'Expanding services',
    title: 'Built to grow.',
    text: 'Designed to support resource sharing and cross-organization services next, on the same foundation, as your organization evolves.',
    status: 'Our vision',
    availability: 'planned',
    icon: Layers,
    accent: 'cantaloupe',
  },
]

/* ---------- How it works ---------- */

export const STEPS: { n: string; title: string; text: string }[] = [
  { n: '01', title: 'Join the network', text: 'Organizations create an account and set up their workspace. Every organization and driver is reviewed first.' },
  { n: '02', title: 'Coordinate support', text: 'Teams send requests, connect people, and see every one through, in one shared view.' },
  { n: '03', title: 'Make an impact', text: 'Less time on calls and follow-ups. More time with the people your organization supports.' },
]

/* ---------- Impact: what is true today, in words ---------- */

export const IMPACT_POINTS: { title: string; text: string }[] = [
  {
    title: 'Dignity first',
    text: 'The person riding needs no account, phone, or money. Drivers see only what the ride requires.',
  },
  {
    title: 'Grounded in front-line work',
    text: `Built with ${PARTNER.name} – ${PARTNER.program} staff, who showed us how often a missed ride means a missed appointment.`,
  },
  {
    title: 'Responsible by design',
    text: 'Honest about what works today and what is planned. Open source, accessible, and reviewed before anyone’s first ride.',
  },
]

export const TEAM = [
  { name: 'Noah Hamm', handle: 'maxiomattic' },
  { name: 'Aditya Padmarajan', handle: 'adi-padmarajan' },
  { name: 'Gilbert Fung', handle: 'gilbertfung' },
]
