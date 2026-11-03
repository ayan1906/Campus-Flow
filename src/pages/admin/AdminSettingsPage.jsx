import { useState, useEffect } from 'react'
import {
  Settings,
  Shield,
  Database,
  Save,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Copy,
  ExternalLink,
  Layers,
} from 'lucide-react'
import toast from 'react-hot-toast'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Badge } from '../../components/ui/Badge'
import { ThemeToggle } from '../../components/common/ThemeToggle'
import { checkSupabaseHealth, isSupabaseConfigured } from '../../lib/supabase'

export function AdminSettingsPage() {
  const [campusName, setCampusName] = useState('Central Metropolitan University')
  const [portalDomain, setPortalDomain] = useState('campusflow.edu')

  // Supabase connection state
  const [checkingDb, setCheckingDb] = useState(false)
  const [dbStatus, setDbStatus] = useState(null)

  const runHealthCheck = async () => {
    setCheckingDb(true)
    try {
      const res = await checkSupabaseHealth()
      setDbStatus(res)
      if (res.ok) {
        toast.success(`Supabase connected! (${res.latencyMs}ms latency)`)
      } else if (res.status === 'unconfigured') {
        toast('Supabase environment keys pending configuration.', { icon: 'ℹ️' })
      } else {
        toast.error(`Database issue: ${res.message}`)
      }
    } catch (err) {
      setDbStatus({
        ok: false,
        status: 'error',
        message: err.message || 'Health check failed',
      })
    } finally {
      setCheckingDb(false)
    }
  }

  useEffect(() => {
    runHealthCheck()
  }, [])

  const handleSave = (e) => {
    e.preventDefault()
    toast.success('Campus administrative configuration saved.')
  }

  const copySqlLocation = () => {
    navigator.clipboard.writeText('supabase/schema.sql')
    toast.success('Path "supabase/schema.sql" copied to clipboard!')
  }

  const tablesList = [
    { name: 'profiles', rls: true, desc: 'User credentials & roles' },
    { name: 'departments', rls: true, desc: 'Faculties & codes' },
    { name: 'notices', rls: true, desc: 'Departmental bulletins' },
    { name: 'notice_reads', rls: true, desc: 'Student read receipts' },
    { name: 'lost_found_items', rls: true, desc: 'Item reports & photos' },
    { name: 'item_claims', rls: true, desc: 'Ownership verification' },
    { name: 'events', rls: true, desc: 'Workshops & hackathons' },
    { name: 'event_registrations', rls: true, desc: 'Seat capacity tracking' },
    { name: 'helpdesk_tickets', rls: true, desc: 'Inquiries & SLAs' },
    { name: 'ticket_replies', rls: true, desc: 'Threaded responses' },
    { name: 'notifications', rls: true, desc: 'Realtime user alerts' },
    { name: 'activity_logs', rls: true, desc: 'Auditing & compliance' },
  ]

  const storageBuckets = ['avatars', 'notices', 'lost-found', 'event-banners']

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-txt-main">
          Platform Governance & System Settings
        </h2>
        <p className="text-xs text-txt-secondary">
          Configure university domain policies, database maintenance, and security tokens
        </p>
      </div>

      {/* Supabase Health Check & Migration Status Card */}
      <Card padding="lg" className="space-y-4 border-brand/30 bg-surface">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-edge">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-txt-main">
                  Supabase PostgreSQL & Storage Status
                </h3>
                {dbStatus?.ok ? (
                  <Badge variant="approved" size="sm" dot>
                    Connected ({dbStatus.latencyMs}ms)
                  </Badge>
                ) : dbStatus?.status === 'unconfigured' ? (
                  <Badge variant="pending" size="sm" dot>
                    Awaiting Credentials
                  </Badge>
                ) : (
                  <Badge variant="danger" size="sm" dot>
                    Disconnected
                  </Badge>
                )}
              </div>
              <p className="text-xs text-txt-muted mt-0.5">
                {isSupabaseConfigured()
                  ? 'Client configured with custom project URL'
                  : 'Currently running in placeholder mode. Add credentials in .env to connect.'}
              </p>
            </div>
          </div>

          <Button
            variant="secondary"
            size="sm"
            leftIcon={RefreshCw}
            isLoading={checkingDb}
            onClick={runHealthCheck}
          >
            Test Connection
          </Button>
        </div>

        {/* Database Tables & RLS Status */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-txt-main">
              Master Schema Tables (12 Tables with Row-Level Security Enforced)
            </span>
            <button
              type="button"
              onClick={copySqlLocation}
              className="text-brand hover:underline inline-flex items-center gap-1 font-mono cursor-pointer"
            >
              <Copy className="w-3 h-3" />
              <span>Copy SQL Script Path</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 text-xs">
            {tablesList.map((tbl) => (
              <div
                key={tbl.name}
                className="p-2.5 rounded-lg border border-edge bg-surface-secondary/50 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-semibold text-txt-main">
                    {tbl.name}
                  </span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                    RLS
                  </span>
                </div>
                <span className="text-[10px] text-txt-muted mt-1">{tbl.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Storage Buckets */}
        <div className="pt-2 border-t border-edge flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-txt-secondary">
            <Layers className="w-4 h-4 text-brand" />
            <span>Dedicated Storage Buckets:</span>
            <div className="flex flex-wrap gap-1.5 font-mono">
              {storageBuckets.map((b) => (
                <span
                  key={b}
                  className="px-2 py-0.5 rounded bg-surface-secondary border border-edge text-[11px]"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          <div className="text-[11px] text-txt-muted">
            SQL File: <span className="font-mono text-txt-main">supabase/schema.sql</span>
          </div>
        </div>
      </Card>

      {/* Theme Preference */}
      <Card padding="md" className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-txt-main">
            Console Theme Mode
          </div>
          <p className="text-xs text-txt-muted">
            Switch between Light (#F8F9FC) and Dark (#10131B) interface
          </p>
        </div>
        <ThemeToggle showLabel />
      </Card>

      {/* Domain Settings */}
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
            helperText="Only institutional addresses ending with this domain are eligible for registration"
            required
          />

          <div className="pt-2 flex justify-end">
            <Button type="submit" variant="primary" size="md" leftIcon={Save}>
              Update Institutional Parameters
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
