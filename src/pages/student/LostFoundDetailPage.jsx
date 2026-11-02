import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, MapPin, Tag, Calendar, User, ShieldCheck } from 'lucide-react'
import toast from 'react-hot-toast'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Modal } from '../../components/ui/Modal'
import { Input } from '../../components/ui/Input'

export function LostFoundDetailPage() {
  const { id } = useParams()
  const [claimModalOpen, setClaimModalOpen] = useState(false)
  const [claimMessage, setClaimMessage] = useState('')

  const handleClaimSubmit = (e) => {
    e.preventDefault()
    setClaimModalOpen(false)
    toast.success('Ownership claim submitted for administrative verification.')
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link
        to="/student/lost-found"
        className="inline-flex items-center gap-1.5 text-xs text-txt-muted hover:text-txt-main transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Lost & Found
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Photo Box */}
        <div className="rounded-2xl border border-edge bg-surface overflow-hidden shadow-xs h-72 sm:h-96">
          <img
            src="https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?w=800&auto=format&fit=crop&q=80"
            alt="TI-84 Plus Graphic Calculator"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details Card */}
        <Card padding="lg" className="flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="approved" size="md">
                Found Item
              </Badge>
              <Badge variant="pending" size="sm" dot>
                Unclaimed
              </Badge>
            </div>

            <h1 className="text-xl font-bold tracking-tight text-txt-main">
              TI-84 Plus Graphic Calculator
            </h1>

            <div className="space-y-2 text-xs text-txt-secondary">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand shrink-0" />
                <span>Central Library, 2nd Floor study desk #14</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-brand shrink-0" />
                <span>Category: Electronics</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand shrink-0" />
                <span>Reported on May 02, 2026 at 2:15 PM</span>
              </div>
            </div>

            <div className="pt-2 border-t border-edge space-y-1">
              <h4 className="text-xs font-semibold text-txt-main">Description:</h4>
              <p className="text-xs text-txt-secondary leading-relaxed">
                Found on a study desk after the afternoon library shift. The back cover has a blue robotic sticker. Fully functional.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-edge flex items-center justify-between">
            <span className="text-xs text-txt-muted">Item ID: #LF-{id || '101'}</span>
            <Button
              variant="primary"
              size="md"
              onClick={() => setClaimModalOpen(true)}
            >
              Submit Ownership Claim
            </Button>
          </div>
        </Card>
      </div>

      {/* Claim Modal */}
      <Modal
        isOpen={claimModalOpen}
        onClose={() => setClaimModalOpen(false)}
        title="Claim Item Ownership"
        description="Provide details proving this item belongs to you."
        footer={
          <>
            <Button variant="secondary" size="md" onClick={() => setClaimModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="md" onClick={handleClaimSubmit}>
              Submit Claim
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input
            label="Serial Number or Identifier (If known)"
            placeholder="e.g. SN-89240"
          />
          <div className="space-y-1.5 text-left">
            <label className="block text-xs font-medium text-txt-secondary">
              Proof of Ownership Details
            </label>
            <textarea
              rows={3}
              required
              value={claimMessage}
              onChange={(e) => setClaimMessage(e.target.value)}
              placeholder="Describe distinguishing marks or contents..."
              className="w-full p-3 rounded-lg text-sm bg-surface text-txt-main border border-edge focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none"
            />
          </div>
        </div>
      </Modal>
    </div>
  )
}
