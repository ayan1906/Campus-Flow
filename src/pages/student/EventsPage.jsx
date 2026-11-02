import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, MapPin, Users, Clock, Search, ArrowRight, CheckCircle2 } from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Select } from '../../components/ui/Select'

export function EventsPage() {
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')

  const events = [
    {
      id: '1',
      title: 'Annual University Hackathon 2026',
      category: 'Tech & Coding',
      date: 'May 15, 2026',
      time: '09:00 AM – 06:00 PM',
      venue: 'Main Auditorium Hall',
      capacity: 120,
      registeredCount: 108,
      isRegistered: true,
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: '2',
      title: 'AI in Healthcare & Biotechnology Workshop',
      category: 'Academic',
      date: 'May 18, 2026',
      time: '02:00 PM – 05:00 PM',
      venue: 'Room 402, CS Complex',
      capacity: 60,
      registeredCount: 42,
      isRegistered: false,
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: '3',
      title: 'Inter-Department Debate Championship',
      category: 'Cultural',
      date: 'May 20, 2026',
      time: '03:30 PM – 07:00 PM',
      venue: 'Open Amphitheatre',
      capacity: 200,
      registeredCount: 140,
      isRegistered: false,
      image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&auto=format&fit=crop&q=80',
    },
  ]

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-txt-main">
            Campus Events & Workshops
          </h2>
          <p className="text-xs text-txt-secondary">
            Participate in university competitions, guest seminars, and club activities
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="w-48 sm:w-64">
            <Input
              placeholder="Search event title..."
              leftIcon={Search}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 text-xs"
            />
          </div>
          <div className="w-36">
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              options={['All', 'Tech & Coding', 'Academic', 'Cultural', 'Sports']}
              className="h-9 text-xs"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((evt) => {
          const seatsLeft = evt.capacity - evt.registeredCount
          return (
            <Card key={evt.id} hoverable padding="none" className="overflow-hidden flex flex-col justify-between">
              <div>
                <div className="relative h-44 w-full bg-surface-secondary overflow-hidden">
                  <img
                    src={evt.image}
                    alt={evt.title}
                    className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <Badge variant="brand" size="sm">
                      {evt.category}
                    </Badge>
                  </div>
                  {evt.isRegistered && (
                    <div className="absolute top-2.5 right-2.5">
                      <Badge variant="approved" size="sm" dot>
                        Registered
                      </Badge>
                    </div>
                  )}
                </div>

                <div className="p-4 space-y-2.5">
                  <Link
                    to={`/student/events/${evt.id}`}
                    className="text-base font-semibold text-txt-main hover:text-brand transition-colors block line-clamp-1"
                  >
                    {evt.title}
                  </Link>

                  <div className="space-y-1.5 text-xs text-txt-secondary">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-txt-muted" />
                      <span>{evt.date} • {evt.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-txt-muted" />
                      <span className="line-clamp-1">{evt.venue}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-3 border-t border-edge flex items-center justify-between text-xs">
                <span className="text-txt-muted font-mono">
                  {seatsLeft > 0 ? `${seatsLeft} seats left` : 'Fully Booked'}
                </span>
                <Link to={`/student/events/${evt.id}`}>
                  <Button variant={evt.isRegistered ? 'outline' : 'primary'} size="sm">
                    {evt.isRegistered ? 'View Pass' : 'Register Now'}
                  </Button>
                </Link>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
