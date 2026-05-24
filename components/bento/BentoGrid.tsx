"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

// stagger config — adjust delay if it feels too slow/fast
export const tileVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 280, damping: 24 },
  },
};

export default function BentoGrid({ children }: { children: ReactNode }) {
  return (
    <motion.div
      id="bento-grid"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
      }}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6"
    >
      {children}
    </motion.div>
  );
}
