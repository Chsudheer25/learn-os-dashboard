"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Activity } from "lucide-react";
import { tileVariants } from "./BentoGrid";

// fixed grid — no Math.random() so server and client render identically
const grid: number[][] = [
  [1, 0, 3, 2, 1, 4, 0],
  [2, 3, 1, 0, 4, 2, 1],
  [0, 1, 2, 3, 1, 0, 2],
  [4, 2, 0, 1, 3, 2, 4],
  [1, 3, 2, 4, 0, 1, 2],
  [0, 2, 4, 1, 2, 3, 0],
  [3, 1, 0, 2, 4, 1, 3],
  [2, 4, 1, 3, 0, 2, 1],
  [1, 0, 3, 2, 4, 1, 0],
  [4, 2, 1, 0, 3, 2, 4],
];

const intensityClass = [
  "bg-white/8",
  "bg-accent-purple/30",
  "bg-accent-purple/55",
  "bg-accent-violet/75",
  "bg-accent-violet shadow-[0_0_6px_rgba(139,92,246,0.6)]",
];

export default function ActivityTile({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.article
      ref={ref}
      variants={tileVariants}
      whileHover={{ scale: 1.015 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative rounded-2xl border border-surface-border overflow-hidden bg-[#0d0d1a] grain-overlay shine-card cursor-default ${className}`}
      aria-label="Learning activity heatmap"
    >
      <div className="absolute inset-0 bg-mesh-cyan pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/40 to-transparent" />

      <div className="relative z-10 p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <Activity className="w-4 h-4 text-accent-cyan" />
              <h2 className="text-sm font-semibold text-white">Learning Activity</h2>
            </div>
            <p className="text-xs text-white/40">Last 10 weeks</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-white">47</p>
            <p className="text-xs text-white/40">sessions</p>
          </div>
        </div>

        {/* heatmap */}
        <div className="flex gap-1" role="img" aria-label="Activity contribution graph">
          {grid.map((week, col) => (
            <div key={col} className="flex flex-col gap-1">
              {week.map((level, row) => (
                <motion.div
                  key={row}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={
                    inView
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.5 }
                  }
                  transition={{
                    delay: (col * 7 + row) * 0.008,
                    type: "spring",
                    stiffness: 400,
                    damping: 20,
                  }}
                  className={`w-4 h-4 rounded-[3px] activity-dot ${intensityClass[level]}`}
                />
              ))}
            </div>
          ))}
        </div>

        {/* legend */}
        <div className="flex items-center gap-1.5 mt-3 justify-end">
          <span className="text-[10px] text-white/30">Less</span>
          {intensityClass.map((cls, i) => (
            <div key={i} className={`w-3 h-3 rounded-[2px] ${cls}`} />
          ))}
          <span className="text-[10px] text-white/30">More</span>
        </div>
      </div>
    </motion.article>
  );
}
