import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Calendar, MapPin, Users, Clock, CheckCircle2, Share2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'

export function EventDetailPage() {
  const { id } = useParams()
  const [isRegistered, setIsRegistered] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleRegister = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setIsRegistered(true)
      toast.success('Event registration confirmed! Digital pass issued.')
    }, 800)
  }

  const handleCancel = () => {
    setIsRegistered(false)
    toast.error('Registration cancelled.')
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link
        to="/student/events"
        className="inline-flex items-center gap-1.5 text-xs text-txt-muted hover:text-txt-main transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Events
      </Link>

      <Card padding="lg" className="space-y-6">
        <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1000&auto=format&fit=crop&q=80"
            alt="Event Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <Badge variant="brand" size="md">
              Tech & Coding
            </Badge>
          </div>
          {isRegistered && (
            <div className="absolute top-4 right-4">
              <Badge variant="approved" size="md" dot>
                Confirmed Attendee
              </Badge>
            </div>
          )}
        </div>

        <div className="space-y-3 pb-4 border-b border-edge">
          <h1 className="text-2xl font-bold tracking-tight text-txt-main">
            Annual University Hackathon 2026
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-txt-secondary">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-brand" />
              <span>Friday, May 15, 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand" />
              <span>09:00 AM – 06:00 PM</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-brand" />
              <span>Main Auditorium Hall</span>
            </div>
          </div>
        </div>

        <div className="space-y-4 text-sm text-txt-secondary leading-relaxed">
          <h4 className="text-base font-semibold text-txt-main">Event Overview</h4>
          <p>
            Welcome to the flagship annual software engineering and design hackathon. Open to all faculties, teams of 2 to 4 members will compete across 4 thematic tracks: Smart Campus Systems, Healthcare AI, FinTech, and Renewable Energy.
          </p>
          <div className="p-4 rounded-xl bg-surface-secondary border border-edge space-y-2">
            <h5 className="text-xs font-semibold text-txt-main">Eligibility & Requirements:</h5>
            <ul className="text-xs space-y-1 list-disc list-inside">
              <li>Enrolled undergraduate student of the university.</li>
              <li>Bring personal laptops and chargers. Free campus Wi-Fi and power hubs provided.</li>
              <li>Lunch and refreshments are complimentary for all registered attendees.</li>
            </ul>
          </div>
        </div>

        <div className="pt-4 border-t border-edge flex items-center justify-between">
          <div className="text-xs text-txt-muted">
            <span className="font-semibold text-txt-main font-mono">108</span> / 120 seats registered
          </div>

          <div className="flex items-center gap-3">
            {isRegistered ? (
              <Button variant="danger-outline" size="md" onClick={handleCancel}>
                Cancel Registration
              </Button>
            ) : (
              <Button
                variant="primary"
                size="md"
                isLoading={loading}
                onClick={handleRegister}
              >
                Register for Free Pass
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
