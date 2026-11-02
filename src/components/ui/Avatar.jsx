import { useState } from 'react'

const SIZES = {
  xs: 'w-6 h-6 text-[10px]',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm font-medium',
  lg: 'w-12 h-12 text-base font-semibold',
  xl: 'w-16 h-16 text-lg font-bold',
}

const STATUS_SIZES = {
  xs: 'w-1.5 h-1.5 bottom-0 right-0 ring-1',
  sm: 'w-2 h-2 bottom-0 right-0 ring-1.5',
  md: 'w-2.5 h-2.5 bottom-0.5 right-0.5 ring-2',
  lg: 'w-3 h-3 bottom-0.5 right-0.5 ring-2',
  xl: 'w-3.5 h-3.5 bottom-1 right-1 ring-2',
}

const STATUS_COLORS = {
  online: 'bg-emerald-500',
  busy: 'bg-rose-500',
  away: 'bg-amber-500',
  offline: 'bg-slate-400',
}

export function Avatar({
  src,
  alt = '',
  name = '',
  size = 'md',
  status,
  className = '',
}) {
  const [hasError, setHasError] = useState(false)

  const getInitials = (str) => {
    if (!str) return 'CF'
    const parts = str.trim().split(/\s+/)
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase()
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }

  const sizeClass = SIZES[size] || SIZES.md
  const statusSize = STATUS_SIZES[size] || STATUS_SIZES.md

  return (
    <div className={`relative inline-flex shrink-0 ${className}`}>
      {src && !hasError ? (
        <img
          src={src}
          alt={alt || name || 'Avatar'}
          onError={() => setHasError(true)}
          className={`${sizeClass} rounded-full object-cover ring-1 ring-edge`}
        />
      ) : (
        <div
          className={`
            ${sizeClass} rounded-full bg-brand/10 text-brand ring-1 ring-brand/20
            flex items-center justify-center select-none uppercase tracking-wider
          `}
        >
          {getInitials(name)}
        </div>
      )}

      {status && STATUS_COLORS[status] && (
        <span
          className={`
            absolute rounded-full ring-surface ${statusSize} ${STATUS_COLORS[status]}
          `}
          aria-label={`Status: ${status}`}
        />
      )}
    </div>
  )
}

