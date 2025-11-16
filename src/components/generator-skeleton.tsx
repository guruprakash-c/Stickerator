import { Skeleton } from '@/components/ui/skeleton'

export function GeneratorSkeleton() {
  return (
    <div className="space-y-6">
      {/* Input Skeleton */}
      <div className="space-y-2">
        <div className="h-5 w-20 bg-muted rounded animate-pulse" />
        <div className="h-10 bg-muted rounded animate-pulse" />
      </div>

      {/* Style Selection Skeleton */}
      <div className="space-y-2">
        <div className="h-5 w-16 bg-muted rounded animate-pulse" />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-12 bg-muted rounded animate-pulse" />
          ))}
        </div>
      </div>

      {/* Model Selection Skeleton */}
      <div className="space-y-2">
        <div className="h-5 w-20 bg-muted rounded animate-pulse" />
        <div className="h-10 bg-muted rounded animate-pulse" />
      </div>

      {/* Resolution Selection Skeleton */}
      <div className="space-y-2">
        <div className="h-5 w-20 bg-muted rounded animate-pulse" />
        <div className="h-10 bg-muted rounded animate-pulse" />
      </div>

      {/* Generate Button Skeleton */}
      <div className="h-16 bg-muted rounded-lg animate-pulse" />
    </div>
  )
}