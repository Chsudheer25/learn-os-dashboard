import SkeletonTile from "@/components/bento/SkeletonTile";

/**
 * Global loading state shown by Next.js while the page Server Component
 * is streaming. Mirrors the bento grid layout so there's no layout shift.
 */
export default function Loading() {
  return (
    <div className="flex min-h-screen bg-bg-900">
      {/* Sidebar skeleton */}
      <aside className="hidden md:flex flex-col w-16 lg:w-64 min-h-screen bg-bg-800 border-r border-surface-border p-4 gap-4 shrink-0">
        <div className="skeleton-shimmer rounded-xl h-8 w-full mb-4" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="skeleton-shimmer rounded-lg h-10 w-full" />
        ))}
      </aside>

      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
          {/* Hero skeleton */}
          <div className="md:col-span-2 skeleton-shimmer rounded-2xl h-48" />
          {/* Activity skeleton */}
          <div className="skeleton-shimmer rounded-2xl h-48" />
          {/* Course skeletons */}
          {[...Array(4)].map((_, i) => (
            <SkeletonTile key={i} />
          ))}
        </div>
      </main>
    </div>
  );
}
