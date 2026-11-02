import { useState } from 'react'
import { Shield, Bell, Moon, Sun, Lock, Save } from 'lucide-react'
import toast from 'react-hot-toast'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { ThemeToggle } from '../../components/common/ThemeToggle'
import { useTheme } from '../../hooks/useTheme'

export function SettingsPage() {
  const { isDark, toggleTheme } = useTheme()
  const [emailAlerts, setEmailAlerts] = useState(true)
  const [smsAlerts, setSmsAlerts] = useState(false)

  const handlePasswordUpdate = (e) => {
    e.preventDefault()
    toast.success('Security password updated successfully.')
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-txt-main">
          Account & Portal Settings
        </h2>
        <p className="text-xs text-txt-secondary">
          Configure security credentials, theme preferences, and notifications
        </p>
      </div>

      {/* Theme Preference */}
      <Card padding="md" className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-txt-main">
            Interface Theme Preference
          </div>
          <p className="text-xs text-txt-muted">
            Toggle between refined Light (#F8F9FC) and Dark (#10131B) modes
          </p>
        </div>
        <ThemeToggle showLabel />
      </Card>

      {/* Notification Preferences */}
      <Card padding="lg" className="space-y-4">
        <div className="text-sm font-semibold text-txt-main pb-2 border-b border-edge">
          Communication & Alerts
        </div>

        <div className="space-y-3">
          <label className="flex items-center justify-between p-3 rounded-xl bg-surface-secondary/50 border border-edge cursor-pointer">
            <div>
              <div className="text-xs font-semibold text-txt-main">
                Official Notice Email Broadcasts
              </div>
              <div className="text-[11px] text-txt-muted">
                Receive notifications when Controller of Exams or Deans post
              </div>
            </div>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => setEmailAlerts(e.target.checked)}
              className="rounded border-edge h-4 w-4 text-brand"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-surface-secondary/50 border border-edge cursor-pointer">
            <div>
              <div className="text-xs font-semibold text-txt-main">
                SMS Urgent Emergency Alerts
              </div>
              <div className="text-[11px] text-txt-muted">
                Critical university closures and weather emergencies
              </div>
            </div>
            <input
              type="checkbox"
              checked={smsAlerts}
              onChange={(e) => setSmsAlerts(e.target.checked)}
              className="rounded border-edge h-4 w-4 text-brand"
            />
          </label>
        </div>
      </Card>

      {/* Security Credentials */}
      <Card padding="lg" className="space-y-4">
        <div className="text-sm font-semibold text-txt-main pb-2 border-b border-edge">
          Update Portal Password
        </div>

        <form onSubmit={handlePasswordUpdate} className="space-y-4">
          <Input
            label="Current Password"
            type="password"
            placeholder="••••••••••••"
            required
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="New Password"
              type="password"
              placeholder="••••••••••••"
              required
            />
            <Input
              label="Confirm New Password"
              type="password"
              placeholder="••••••••••••"
              required
            />
          </div>

          <div className="pt-2 flex justify-end">
            <Button type="submit" variant="secondary" size="md">
              Update Password
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
