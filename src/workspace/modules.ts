import { Boxes, HeartHandshake, Truck, Users, type LucideIcon } from 'lucide-react'
import { paths } from './paths'

// The service modules a workspace can hold. A module only gets a route (and a place in the
// navigation) once it is built; until then it is listed as planned and never looks usable.
// The public site describes the same modules in components/landing/content.ts.
export type ModuleId = 'transportation' | 'resources' | 'volunteers' | 'collaboration'

interface ModuleBase {
  id: ModuleId
  name: string
  description: string
  icon: LucideIcon
}

export interface LiveModule extends ModuleBase {
  availability: 'live'
  to: string // the module's home in the workspace
  actionLabel: string
}

export interface PlannedModule extends ModuleBase {
  availability: 'planned'
}

export type ServiceModule = LiveModule | PlannedModule

export const SERVICE_MODULES: ServiceModule[] = [
  {
    id: 'transportation',
    name: 'Transportation',
    description: 'Coordinate essential transportation, manage ride requests, and track trip progress.',
    icon: Truck,
    availability: 'live',
    to: paths.transport,
    actionLabel: 'Open transportation',
  },
  {
    id: 'resources',
    name: 'Resource coordination',
    description: 'Share and request vehicles, spaces, supplies, and expertise across organizations.',
    icon: Boxes,
    availability: 'planned',
  },
  {
    id: 'volunteers',
    name: 'Volunteer coordination',
    description: 'Post volunteer opportunities and match them with people’s time, skills, and availability.',
    icon: Users,
    availability: 'planned',
  },
  {
    id: 'collaboration',
    name: 'Cross-organization collaboration',
    description: 'Coordinate services and share capacity with other nonprofits, with hand-offs that stay visible.',
    icon: HeartHandshake,
    availability: 'planned',
  },
]

export const LIVE_MODULES = SERVICE_MODULES.filter((m): m is LiveModule => m.availability === 'live')
export const PLANNED_MODULES = SERVICE_MODULES.filter((m): m is PlannedModule => m.availability === 'planned')
