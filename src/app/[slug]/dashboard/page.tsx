import Dashboard from '@/components/ui/Dashboard/Dashboard'
import { RequireAuth } from '@/redux/auth/RequireAuth'

export default function DashboardPage() {
  return (
    <RequireAuth>
      <Dashboard />
    </RequireAuth>
  )
}
