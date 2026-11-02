import { FolderSearch } from 'lucide-react'
import { Button } from './Button'

export function EmptyState({
  icon: Icon = FolderSearch,
  title = 'No records found',
  description = 'There is currently no data matching your criteria or query.',
  actionText,
  onAction,
  className = '',
}) {
  return (
    <div
      className={`
        flex flex-col items-center justify-center text-center p-8 sm:p-12
        rounded-xl border border-dashed border-edge bg-surface/50 ${className}
      `}
    >
      <div className="w-12 h-12 rounded-xl bg-surface-secondary flex items-center justify-center text-txt-muted mb-3.5 ring-1 ring-edge">
        <Icon className="w-6 h-6 stroke-[1.75]" />
      </div>
      <h4 className="text-sm font-semibold text-txt-main tracking-tight">
        {title}
      </h4>
      <p className="text-xs text-txt-muted max-w-sm mt-1 mb-5 leading-relaxed">
        {description}
      </p>
      {actionText && onAction && (
        <Button variant="secondary" size="sm" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  )
}

