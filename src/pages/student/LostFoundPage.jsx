import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Search, MapPin, Tag, Filter, CheckCircle2 } from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Badge } from '../../components/ui/Badge'
import { Select } from '../../components/ui/Select'

export function LostFoundPage() {
  const [filterType, setFilterType] = useState('All')
  const [search, setSearch] = useState('')

  const items = [
    {
      id: '1',
      title: 'TI-84 Plus Graphic Calculator',
      type: 'found',
      category: 'Electronics',
      location: 'Central Library, 2nd Floor study desk #14',
      date: 'Reported 2h ago',
      status: 'pending',
      statusText: 'Unclaimed',
      image: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?w=400&auto=format&fit=crop&q=60',
    },
    {
      id: '2',
      title: 'Brown Leather Wallet with Student ID',
      type: 'lost',
      category: 'Accessories',
      location: 'Campus Cafeteria near Counter 2',
      date: 'Reported Yesterday',
      status: 'in_progress',
      statusText: 'Claim Submitted',
      image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&auto=format&fit=crop&q=60',
    },
    {
      id: '3',
      title: 'Calculus Early Transcendentals (9th Edition)',
      type: 'found',
      category: 'Books & Notes',
      location: 'Auditorium Hall, Row G Seat 12',
      date: 'May 01, 2026',
      status: 'resolved',
      statusText: 'Returned',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=60',
    },
  ]

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-txt-main">
            Lost & Found Community
          </h2>
          <p className="text-xs text-txt-secondary">
            Report misplaced belongings or submit verified ownership claims
          </p>
        </div>

        <Link to="/student/lost-found/create">
          <Button variant="primary" size="sm" leftIcon={Plus}>
            Report an Item
          </Button>
        </Link>
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="w-48 sm:w-64">
          <Input
            placeholder="Search item title or location..."
            leftIcon={Search}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 text-xs"
          />
        </div>
        <div className="w-36">
          <Select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            options={['All', 'Lost Only', 'Found Only', 'Returned']}
            className="h-9 text-xs"
          />
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <Card key={item.id} hoverable padding="none" className="overflow-hidden flex flex-col justify-between">
            <div>
              {/* Item Photo */}
              <div className="relative h-44 w-full bg-surface-secondary overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                />
                <div className="absolute top-2.5 left-2.5">
                  <Badge variant={item.type === 'lost' ? 'danger' : 'approved'} size="sm">
                    {item.type === 'lost' ? 'Lost Item' : 'Found Item'}
                  </Badge>
                </div>
                <div className="absolute top-2.5 right-2.5">
                  <Badge variant={item.status} size="sm" dot>
                    {item.statusText}
                  </Badge>
                </div>
              </div>

              {/* Item Meta */}
              <div className="p-4 space-y-2">
                <div className="flex items-center gap-2 text-[11px] text-txt-muted">
                  <Tag className="w-3.5 h-3.5" />
                  <span>{item.category}</span>
                </div>

                <Link
                  to={`/student/lost-found/${item.id}`}
                  className="text-sm font-semibold text-txt-main hover:text-brand transition-colors block line-clamp-1"
                >
                  {item.title}
                </Link>

                <div className="flex items-start gap-1.5 text-xs text-txt-secondary">
                  <MapPin className="w-3.5 h-3.5 text-txt-muted shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{item.location}</span>
                </div>
              </div>
            </div>

            <div className="p-4 pt-3 border-t border-edge flex items-center justify-between text-xs">
              <span className="text-txt-muted font-mono">{item.date}</span>
              <Link to={`/student/lost-found/${item.id}`}>
                <Button variant="ghost" size="sm">
                  View Details →
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
