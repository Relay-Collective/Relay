// Illustrative data for the product pictures on the public website. Every organization, person, place and number
// here is made up. The labels (navigation, metrics, statuses) are the ones the app really uses.

export const DEMO_ORG = 'Northside Community Services'
export const DEMO_STAFF = { first: 'Alex', last: 'Lee', initials: 'AL', role: 'Organization admin' }
export const DEMO_DRIVER = { name: 'Maya R.', initials: 'MR' }

// The one ride the hero follows, from request to drop-off
export const DEMO_RIDE = {
  title: 'Ride to a medical appointment',
  rider: 'Sam',
  pickup: '2:30 PM',
  from: 'Front lobby, Northside',
  to: 'Downtown Health Clinic',
  needs: 'Wheelchair accessible',
  droppedOff: '2:58 PM',
}

// Ride status words, exactly as StatusBadge shows them
export type DemoStatus = 'Finding a driver' | 'Driver confirmed' | 'Picked up' | 'Completed'

export const DEMO_UPCOMING: { who: string; time: string; to: string; status: DemoStatus }[] = [
  { who: 'JD', time: '2:30 PM', to: 'Medical appointment', status: 'Driver confirmed' },
  { who: 'SK', time: '3:15 PM', to: 'Housing interview', status: 'Picked up' },
  { who: 'RM', time: '4:00 PM', to: 'Social service visit', status: 'Finding a driver' },
]
