import type { OrgType, UserRole } from '../types'

// How the console names each kind of organization and the service it takes part in
export const ORG_KIND: Record<OrgType, { label: string; service: string }> = {
  PARTNER_ORG: { label: 'Partner organization', service: 'Transportation · requests rides' },
  TRANSPORT_PROVIDER: { label: 'Transport provider', service: 'Transportation · provides rides' },
}

// What each role means on the platform. Platform admins run Relay Collective; everyone else
// belongs to one organization or drives, and none of them can see other organizations' data.
export const USER_KIND: Record<UserRole, string> = {
  PLATFORM_ADMIN: 'Platform admin',
  PARTNER: 'Organization account (shared)',
  ORG_ADMIN: 'Transport provider admin',
  DRIVER: 'Driver',
}

export const USER_KIND_ORDER: UserRole[] = ['PARTNER', 'DRIVER', 'ORG_ADMIN', 'PLATFORM_ADMIN']
