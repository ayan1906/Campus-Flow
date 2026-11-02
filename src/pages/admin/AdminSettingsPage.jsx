import { useState } from 'react'
import { Settings, Shield, Database, Save, CheckCircle2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Badge } from '../../components/ui/Badge'
import { ThemeToggle } from '../../components/common/ThemeToggle'

export function AdminSettingsPage() {
  const [campusName, setCampusName] = useState('Central Metropolitan University')
  const [portalDomain, setPortalDomain] = useState('campusflow.edu')

  const handleSave = (e) => {
    e.preventDefault()
    toast.success('Campus administrative configuration saved.')
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-txt-main">
          Platform Governance & System Settings
        </h2>
        <p className="text-xs text-txt-secondary">
          Configure university domain policies, database maintenance, and security tokens
        </p>
      </div>

      <Card padding="md" className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-txt-main">
            Console Theme Mode
          </div>
          <p className="text-xs text-txt-muted">
            Switch between Light and Dark interface
          </p>
        </div>
        <ThemeToggle showLabel />
      </Card>

      <Card padding="lg" className="space-y-4">
        <div className="text-sm font-semibold text-txt-main pb-2 border-b border-edge">
          Institutional Domain Parameters
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <Input
            label="University Name"
            value={campusName}
            onChange={(e) => setCampusName(e.target.value)}
            required
          />

          <Input
            label="Authorized Student Email Domain"
            value={portalDomain}
            onChange={(e) => setPortalDomain(e.target.value)}
            helperText="Only emails ending with this domain are eligible for registration"
            required
          />

          <div className="pt-2 flex justify-end">
            <Button type="submit" variant="primary" size="md" leftIcon={Save}>
              Update Institutional Parameters
            </Button>
          </div>
        </form>
      </Card>

      {/* Database & Security Specs */}
      <Card padding="lg" className="space-y-3">
        <div className="text-sm font-semibold text-txt-main pb-2 border-b border-edge flex items-center gap-2">
          <Shield className="w-4 h-4 text-brand" />
          <span>PostgreSQL Row-Level Security Status</span>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between py-1.5 border-b border-edge">
            <span className="text-txt-secondary">Database Host</span>
            <span className="font-mono text-txt-main">Supabase Postgres</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-edge">
            <span className="text-txt-secondary">Row Level Security (RLS)</span>
            <Badge variant="approved" size="sm" dot>Enforced</Badge>
          </div>
          <div className="flex justify-between py-1.5">
            <span className="text-txt-secondary">Admin Role Escalation Guard</span>
            <Badge variant="approved" size="sm" dot>Active</Badge>
          </div>
        </div>
      </Card>
    </div>
  )
}
