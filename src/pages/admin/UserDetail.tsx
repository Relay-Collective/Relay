import { Info, KeyRound, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { USER_KIND } from '../../admin/labels'
import { adminPaths } from '../../admin/paths'
import { Breadcrumbs } from '../../components/admin/controls'
import { dangerOutlineButton, secondaryButton } from '../../components/ui'
import { PageHeader } from '../../components/workspace/PageHeader'
import { EmptyState, SectionError, SkeletonRows } from '../../components/workspace/states'
import { compactButton, panel } from '../../components/workspace/styles'
import { useAdmin } from '../../hooks/useAdmin'
import { useApp } from '../../hooks/useApp'
import { DeletePanel, ResetPanel } from './AccountActions'
import { AccountProfile } from './AccountDetails'

// One account, with the help a platform admin can give: a password reset, or removing the account
export function UserDetail() {
  const { id = '' } = useParams()
  const { currentUser, refresh } = useApp()
  const { accounts, orgName } = useAdmin()
  const navigate = useNavigate()
  const [action, setAction] = useState<'reset' | 'delete'>()
  const user = accounts.data?.find((u) => u.id === id)
  const isSelf = user?.id === currentUser?.id

  const crumbs = [{ label: 'Users', to: adminPaths.users }, { label: user?.name ?? 'User' }]

  if (!user) {
    return (
      <div>
        <Breadcrumbs items={crumbs} />
        <div className={panel}>
          {!accounts.data ? (
            accounts.error ? <SectionError message="We couldn't load this account. Please try again." /> : <SkeletonRows rows={4} label="Loading account" />
          ) : (
            <EmptyState icon={<Info className="h-6 w-6" />} title="Account not found" text="It may have been deleted, or the link is wrong." />
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs items={crumbs} />
        <PageHeader
          title={
            <>
              {user.name}
              {isSelf && <span className="ml-2 text-base font-normal text-slate-500">(you)</span>}
            </>
          }
          description={[USER_KIND[user.role], orgName(user.orgId)].filter(Boolean).join(' · ')}
          actions={
            !action && (
              <>
                <button type="button" className={`${secondaryButton} ${compactButton}`} onClick={() => setAction('reset')}>
                  <KeyRound className="h-4 w-4" aria-hidden /> Reset password
                </button>
                {/* You can't delete the account you're signed in with */}
                {!isSelf && (
                  <button type="button" className={`${dangerOutlineButton} ${compactButton}`} onClick={() => setAction('delete')}>
                    <Trash2 className="h-4 w-4" aria-hidden /> Delete account
                  </button>
                )}
              </>
            )
          }
        />
        {action === 'reset' && <ResetPanel user={user} isSelf={isSelf} onClose={() => setAction(undefined)} />}
        {action === 'delete' && (
          <DeletePanel
            user={user}
            onClose={() => setAction(undefined)}
            onDeleted={() => {
              refresh()
              navigate(adminPaths.users, { replace: true, state: { deleted: user.name } })
            }}
          />
        )}
      </div>
      <AccountProfile user={user} />
    </div>
  )
}
