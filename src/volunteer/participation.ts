import type { Driver, User, VerificationStatus } from '../types'

// How someone takes part in Relay Collective, read from what the backend already records.
// Descriptive only: nothing here grants access. The database decides what each account may do.

// Today the only service a person can be approved for is transportation, as a driver.
export type ServiceId = 'TRANSPORTATION'

// The kind of driver, from how they joined. Professional status never stands in for approval.
export type DriverKind = 'VOLUNTEER_DRIVER' | 'PROFESSIONAL_PROVIDER' | 'ORGANIZATION_DRIVER'

export interface ServiceRole {
  service: ServiceId
  kind: DriverKind
  status: VerificationStatus
}

export const DRIVER_KIND_LABELS: Record<DriverKind, string> = {
  VOLUNTEER_DRIVER: 'Volunteer driver',
  PROFESSIONAL_PROVIDER: 'Professional transportation provider',
  ORGANIZATION_DRIVER: 'Organization-affiliated driver',
}

export const VERIFICATION_LABELS: Record<VerificationStatus, string> = {
  PENDING: 'Pending review',
  APPROVED: 'Approved',
  REJECTED: 'Not approved',
}

export function driverKind(driver: Pick<Driver, 'background' | 'orgId'>): DriverKind {
  if (driver.orgId || driver.background === 'ORG_DRIVER') return 'ORGANIZATION_DRIVER'
  if (driver.background === 'TAXI' || driver.background === 'RIDESHARE') return 'PROFESSIONAL_PROVIDER'
  return 'VOLUNTEER_DRIVER'
}

// Every service role this account holds. A driver profile only exists for a DRIVER account,
// so a profile left over on another kind of account never counts.
export function serviceRoles(user: Pick<User, 'role'> | undefined, driver: Driver | undefined): ServiceRole[] {
  if (user?.role !== 'DRIVER' || !driver) return []
  return [{ service: 'TRANSPORTATION', kind: driverKind(driver), status: driver.status }]
}

// Only approved drivers are sent ride requests and can take rides. The backend checks this again on every action.
export function canDrive(driver: Pick<Driver, 'status'> | undefined): boolean {
  return driver?.status === 'APPROVED'
}
