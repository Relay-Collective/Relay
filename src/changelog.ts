// What's new in Relay Collective, newest first. The first entry is the version the badge shows,
// so add a new entry at the top whenever a release goes out.

export interface Release {
  version: string
  date: string // YYYY-MM-DD
  changes: string[]
}

export const RELEASES: Release[] = [
  {
    version: '1.3.0',
    date: '2026-10-25',
    changes: [
      'A new Relay Collective look: a new logo, and a public site that shows transportation as the first of several services, with the others marked as planned.',
      'Signing up now creates a personal account first. From there you can register an organization, join one by invitation, or sign up as a volunteer driver.',
      'Organizations apply in five steps, and your progress is saved on this device until you submit. You can check where your application stands at any time.',
      'Organization staff can invite teammates from Organization > Team. Each invitation works once, for one email address, for 7 days.',
      'Partner organizations have a new workspace with an overview, every request in one searchable list, and an organization profile. Transportation lives inside it.',
      'Drivers have a new volunteer workspace with their trips, rides, availability, profile and verification status. On phones it has a tab bar along the bottom.',
      'Driver impact now counts completed rides and passengers carried, in place of the bus-fare estimate.',
      'Changing your password now asks for your current one first.',
      'When a staff member closes their account, their organization’s rides are only cancelled if they were its last active member.',
      'Admins have a new console covering organizations, users, approvals, transportation, issues and activity, with search. Approval decisions are confirmed first and can’t overwrite another admin’s decision.',
    ],
  },
  {
    version: '1.2.0',
    date: '2026-10-21',
    changes: [
      'CareRide is now Relay Collective. Same free rides, same drivers, and your account and rides carry over unchanged.',
      'A new name for what the platform has become: staff, community organizations and volunteer drivers getting people there together.',
    ],
  },
  {
    version: '1.1.0',
    date: '2026-10-18',
    changes: [
      'Staff can give a finished ride a thumbs up or down, with an optional note. Only Relay Collective sees it, not the driver.',
      'Drivers can flag an issue on a past ride. Only Relay Collective sees it, not the front desk.',
      'Each ride has a change history showing who booked, changed, accepted, picked up, dropped off or cancelled it, and when.',
      'Admins see each account’s feedback and its recent rides’ history in the account details.',
    ],
  },
  {
    version: '1.0.1',
    date: '2026-10-04',
    changes: [
      'Drivers add a mobile number with their account, and no longer pick taxi, rideshare or volunteer.',
      'Professional drivers can finish sign-up without uploading identity papers.',
      'Bookings need a real, picked address, and bus slips can list transfers.',
      'Scheduled rides say whether the driver is early or late.',
      'Live hospital wait times show while booking a ride.',
      'Requests show the route before a driver accepts.',
      'Rides with no driver get a printable transit slip.',
      'Completed trips count the $2.58 Vancouver bus fare saved.',
    ],
  },
]

export const CURRENT_VERSION = RELEASES[0].version
