export function Skeleton({ className = '', ...props }) {
  return (
    <div
      className={`bg-surface-secondary/80 animate-pulse rounded-md ${className}`}
      {...props}
    />
  )
}

export function SkeletonCard() {
  return (
    <div className="p-5 rounded-xl border border-edge bg-surface space-y-3">
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="space-y-1.5 flex-1">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-3 w-1/4" />
        </div>
      </div>
      <Skeleton className="h-4 w-full mt-4" />
      <Skeleton className="h-4 w-5/6" />
      <div className="pt-3 flex gap-2">
        <Skeleton className="h-7 w-16 rounded-md" />
        <Skeleton className="h-7 w-20 rounded-md" />
      </div>
    </div>
  )
}

