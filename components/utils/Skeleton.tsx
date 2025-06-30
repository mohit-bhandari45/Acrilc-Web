import { Skeleton } from "../ui/skeleton";

export function SkeletonPost() {
  return (
    <div className="mt-20 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left - Image Preview Skeleton */}
            <div className="lg:w-1/2 bg-stone-200 h-[600px] relative">
              {/* Simulated image loading */}
              <Skeleton className="absolute top-0 left-0 w-full h-full object-contain" />
            </div>

            {/* Right - Content Skeleton */}
            <div className="lg:w-1/2 p-8 relative space-y-5">
              {/* Dropdown Placeholder */}
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-200" />

              {/* Title */}
              <Skeleton className="w-3/4 h-8 rounded-md" />

              {/* Subtitle and Size */}
              <Skeleton className="w-2/3 h-6 rounded-md" />
              <Skeleton className="w-1/4 h-6 rounded-md" />

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="w-16 h-6 rounded-full" />
                ))}
              </div>

              {/* Story heading */}
              <Skeleton className="w-1/2 h-6 rounded-md" />

              {/* Story content */}
              <Skeleton className="w-full h-20 rounded-md" />

              {/* Action buttons */}
              <div className="flex justify-between pt-4 border-t border-gray-200">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="w-24 h-10 rounded-md" />
                ))}
              </div>

              {/* Marketplace button */}
              <Skeleton className="w-full h-12 rounded-md mt-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
