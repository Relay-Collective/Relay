import { driverRideStatusLabel, rideBadgeLabel } from '../../logic/rideText'
import type { Ride } from '../../types'
import { StatusBadge } from '../StatusBadge'

// A ride's status in the driver's words: "On your way", "At pickup", "Driving to drop-off"
export function RideStatusBadge({ ride }: { ride: Ride }) {
  const label = ride.status === 'NO_SHOW' ? 'Passenger didn’t show' : (driverRideStatusLabel(ride) ?? rideBadgeLabel(ride))
  return <StatusBadge status={ride.status} label={label} />
}
