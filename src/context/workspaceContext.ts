import { createContext } from 'react'
import type { DriverInfo } from '../components/dashboard/RideList'
import type { Loadable } from '../hooks/useLoadable'
import type { House, Organization, Ride } from '../types'

// What every workspace page shares: the signed-in organization, its location, and its requests.
// Loaded once by the workspace shell, so the sidebar, header, and pages don't each ask again.
export interface WorkspaceState {
  org: Organization | undefined
  house: House | undefined
  rides: Loadable<Ride[]> // transportation requests booked from this organization's location
  driverOf: (ride: Ride) => DriverInfo | undefined
}

export const WorkspaceContext = createContext<WorkspaceState | undefined>(undefined)
