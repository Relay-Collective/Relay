import { useCallback, useMemo, type ReactNode } from 'react'
import { useApp } from '../hooks/useApp'
import { useCurrentOrg } from '../hooks/useCurrent'
import { useData } from '../hooks/useData'
import { useLoadable } from '../hooks/useLoadable'
import { dataService } from '../services'
import type { Ride } from '../types'
import { WorkspaceContext } from './workspaceContext'

// The organization comes from the signed-in account, never from the address bar.
// The database decides which rows that account may read; this only picks its own.
export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const { currentUser, users } = useApp()
  const org = useCurrentOrg()
  const orgId = currentUser?.orgId
  const houseId = currentUser?.houseId ?? ''
  const house = useData(() => dataService.listHouses(orgId), orgId)?.find((h) => h.id === houseId)
  const rides = useLoadable(() => (houseId ? dataService.listRidesForHouse(houseId) : Promise.resolve([])), houseId)
  const drivers = useData(() => dataService.listDrivers())

  const driverOf = useCallback(
    (r: Ride) => {
      const d = drivers?.find((x) => x.id === r.driverId)
      return d && { name: users.find((u) => u.id === d.userId)?.name, vehicle: d.vehicle }
    },
    [drivers, users],
  )

  const value = useMemo(() => ({ org, house, rides, driverOf }), [org, house, rides, driverOf])
  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>
}
