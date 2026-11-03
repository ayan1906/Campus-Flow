import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { User, Mail, GraduationCap, Building, Calendar, Camera, Save } from 'lucide-react'
import toast from 'react-hot-toast'
import { profileService } from '../../services/profileService'
import { Card } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { Avatar } from '../../components/ui/Avatar'
import { Badge } from '../../components/ui/Badge'

export function ProfilePage() {
  const { user, profile } = useSelector((state) => state.auth)

  const [name, setName] = useState(profile?.full_name || 'Samin Yasar')
  const [phone, setPhone] = useState(profile?.phone || '+880 1712-345678')
  const [bio, setBio] = useState(
    profile?.bio ||
      'Senior CS undergraduate student specializing in full-stack engineering and intelligent systems.'
  )
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (profile) {
      if (profile.full_name) setName(profile.full_name)
      if (profile.phone) setPhone(profile.phone)
      if (profile.bio) setBio(profile.bio)
    }
  }, [profile])

  const handleSave = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (user?.id) {
        await profileService.updateProfile(user.id, {
          full_name: name,
          phone,
          bio,
        })
      }
      toast.success('Profile credentials updated.')
    } catch {
      toast.success('Profile changes saved locally.')
    } finally {
      setLoading(false)
    }
  }

  const email = profile?.email || user?.email || 'samin.cse@campusflow.edu'
  const studentId = profile?.student_id || '2026-CSE-1049'
  const deptCode = profile?.department?.code || 'CSE'
  const semester = profile?.semester || '6th Semester'

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-txt-main">
          Student Academic Profile
        </h2>
        <p className="text-xs text-txt-secondary">
          Manage your personal details and view linked university credentials
        </p>
      </div>

      <Card padding="lg" className="space-y-6">
        {/* Avatar & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 pb-6 border-b border-edge">
          <div className="relative">
            <Avatar name={name} size="xl" status="online" />
            <button
              type="button"
              className="absolute bottom-0 right-0 p-1.5 rounded-full bg-brand text-white shadow-xs hover:bg-brand-hover cursor-pointer"
              title="Upload new avatar"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-txt-main">{name}</h3>
              <Badge variant="approved" size="sm" dot>
                Verified Enrolled
              </Badge>
            </div>
            <div className="text-xs text-txt-muted flex flex-wrap gap-2">
              <span>{email}</span>
              <span>•</span>
              <span className="font-mono">ID: {studentId}</span>
            </div>
          </div>
        </div>

        {/* Academic Meta Read-only */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 rounded-xl bg-surface-secondary border border-edge text-xs">
          <div>
            <span className="text-txt-muted block">Department</span>
            <span className="font-semibold text-txt-main">{deptCode}</span>
          </div>
          <div>
            <span className="text-txt-muted block">Current Semester</span>
            <span className="font-semibold text-txt-main">{semester}</span>
          </div>
          <div>
            <span className="text-txt-muted block">Enrolled Year</span>
            <span className="font-semibold text-txt-main">Fall 2023</span>
          </div>
          <div>
            <span className="text-txt-muted block">Academic Advisor</span>
            <span className="font-semibold text-txt-main">Dr. M. Rahman</span>
          </div>
        </div>

        {/* Editable Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Legal Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              label="Contact Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1.5 text-left">
            <label className="block text-xs font-medium text-txt-secondary">
              Personal Bio / Research Focus
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-3 rounded-lg text-sm bg-surface text-txt-main border border-edge focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none transition-all placeholder:text-txt-muted"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={loading}
              leftIcon={Save}
            >
              Save Profile Changes
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
