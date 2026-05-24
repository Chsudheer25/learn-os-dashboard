"use client";

import { motion } from "framer-motion";
import { tileVariants } from "./BentoGrid";

/**
 * Skeleton placeholder shown while course data is loading.
 * Uses a shimmer animation — no layout shift compared to the real card.
 */
export default function SkeletonTile() {
  return (
    <motion.div
      variants={tileVariants}
      className="rounded-2xl border border-surface-border bg-bg-700 p-5 space-y-4"
      aria-label="Loading course card"
      role="status"
    >
      {/* Icon + badge row */}
      <div className="flex items-start justify-between">
        <div className="skeleton-shimmer w-10 h-10 rounded-xl" />
        <div className="skeleton-shimmer w-14 h-5 rounded-full" />
      </div>

      {/* Title lines */}
      <div className="space-y-2">
        <div className="skeleton-shimmer h-3.5 w-full rounded-md" />
        <div className="skeleton-shimmer h-3.5 w-3/4 rounded-md" />
      </div>

      {/* Progress area */}
      <div className="space-y-1.5">
        <div className="flex justify-between">
          <div className="skeleton-shimmer h-2.5 w-12 rounded" />
          <div className="skeleton-shimmer h-2.5 w-8 rounded" />
        </div>
        <div className="skeleton-shimmer h-1.5 w-full rounded-full" />
      </div>
    </motion.div>
  );
}
