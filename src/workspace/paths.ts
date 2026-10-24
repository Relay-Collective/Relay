// Every address in a partner organization's workspace, in one place.
// Transportation is the first service module, so its pages live under its own prefix.
const ROOT = '/workspace'
const TRANSPORT = `${ROOT}/transportation`

export const paths = {
  overview: ROOT,
  requests: `${ROOT}/requests`,
  services: `${ROOT}/services`,
  organization: `${ROOT}/organization`,
  help: `${ROOT}/help`,
  transport: TRANSPORT,
  newRide: `${TRANSPORT}/new`,
  destinations: `${TRANSPORT}/destinations`,
  ride: (rideId: string) => `${TRANSPORT}/rides/${rideId}`,
  // The booking form also edits a ride, books its return, or starts again from an old one
  editRide: (rideId: string) => `${TRANSPORT}/new?edit=${rideId}`,
  returnRide: (rideId: string) => `${TRANSPORT}/new?returnOf=${rideId}`,
  rideAgain: (rideId: string) => `${TRANSPORT}/new?again=${rideId}`,
} as const

// The ride id on a ride's page, if that's where we are
export function rideIdFromPath(pathname: string): string | undefined {
  const prefix = `${TRANSPORT}/rides/`
  return pathname.startsWith(prefix) ? pathname.slice(prefix.length).split('/')[0] || undefined : undefined
}
