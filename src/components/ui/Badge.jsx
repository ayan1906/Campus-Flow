const VARIANTS = {
  pending: {
    container: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    dot: 'bg-amber-500',
  },
  approved: {
    container: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    dot: 'bg-emerald-500',
  },
  resolved: {
    container: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    dot: 'bg-emerald-500',
  },
  rejected: {
    container: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
    dot: 'bg-rose-500',
  },
  danger: {
    container: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
    dot: 'bg-rose-500',
  },
  in_progress: {
    container: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20',
    dot: 'bg-sky-500',
  },
  brand: {
    container: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
    dot: 'bg-indigo-500',
  },
  neutral: {
    container: 'bg-surface-secondary text-txt-secondary border-edge',
    dot: 'bg-txt-muted',
  },
}

const SIZES = {
  sm: 'text-[11px] px-2 py-0.5 gap-1.5',
  md: 'text-xs px-2.5 py-1 gap-1.5 font-medium',
}

export function Badge({
  children,
  variant = 'neutral',
  size = 'md',
  dot = false,
  className = '',
  ...props
}) {
  const activeVariant = VARIANTS[variant] || VARIANTS.neutral
  const activeSize = SIZES[size] || SIZES.md

  return (
    <span
      className={`
        inline-flex items-center rounded-md border font-medium select-none
        ${activeVariant.container}
        ${activeSize}
        ${className}
      `}
      {...props}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${activeVariant.dot}`}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  )
}

