// Illustrative data for the product pictures on the public website. Every organization, person, place and number
// here is made up. The labels (navigation, metrics, statuses) are the ones the app really uses.

export const DEMO_ORG = 'Northside Community Services'
export const DEMO_STAFF = { first: 'Alex', last: 'Lee', initials: 'AL', role: 'Organization admin' }

// Ride status words, exactly as StatusBadge shows them
export type DemoStatus = 'Finding a driver' | 'Driver confirmed' | 'Picked up' | 'Completed'

export const DEMO_UPCOMING: { who: string; time: string; to: string; status: DemoStatus }[] = [
  { who: 'JD', time: '2:30 PM', to: 'Medical appointment', status: 'Driver confirmed' },
  { who: 'SK', time: '3:15 PM', to: 'Housing interview', status: 'Picked up' },
  { who: 'RM', time: '4:00 PM', to: 'Social service visit', status: 'Finding a driver' },
]

// The hero workspace's activity feed: one line from each part of the platform that works today
export type DemoArea = 'organizations' | 'volunteers' | 'transport' | 'impact'

export const DEMO_ACTIVITY: { area: DemoArea; text: string; when: string }[] = [
  { area: 'volunteers', text: 'Maya R. joined as a volunteer driver', when: '2h ago' },
  { area: 'transport', text: 'Ride to Downtown Health Clinic confirmed', when: '4h ago' },
  { area: 'organizations', text: 'Eastside Food Bank accepted your invite', when: 'Yesterday' },
]
