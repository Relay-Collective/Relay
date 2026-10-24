import { useNow } from '../../hooks/useNow'
import { useWorkspace } from '../../hooks/useWorkspace'
import { initials } from '../../logic/initials'
import { requestMetrics } from '../../logic/requestSummary'
import { HELP_NAV, WORKSPACE_NAV } from '../../workspace/navigation'
import { paths } from '../../workspace/paths'
import { SidebarNav } from '../shell/SidebarNav'
import type { SidebarSlotProps } from '../shell/SidebarShell'

// The workspace's navigation. One account belongs to one organization, so there is nothing to switch to.
export function WorkspaceSidebar(props: SidebarSlotProps) {
  const { org, rides } = useWorkspace()
  const now = useNow()
  const attention = rides.data ? requestMetrics(rides.data, new Date(now)).attention : 0

  return (
    <SidebarNav
      {...props}
      home={{ to: paths.overview, label: 'Relay Collective workspace home' }}
      context={{
        initials: org ? initials(org.name) : '',
        title: org?.name ?? 'Your organization',
        subtitle: 'Nonprofit workspace',
        className: 'bg-rc-navy text-white',
      }}
      groups={WORKSPACE_NAV}
      footer={[HELP_NAV]}
      badges={{ attention: { count: attention, label: 'need attention' } }}
    />
  )
}
