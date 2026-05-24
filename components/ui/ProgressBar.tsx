"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

type Color = "purple" | "cyan" | "green" | "orange";

const colors: Record<Color, { bar: string; tip: string; text: string }> = {
  purple: { bar: "from-accent-purple to-accent-violet", tip: "rgba(124,58,237,0.5)",  text: "text-accent-violet" },
  cyan:   { bar: "from-accent-cyan to-sky-400",         tip: "rgba(6,182,212,0.5)",   text: "text-accent-cyan" },
  green:  { bar: "from-emerald-500 to-teal-400",        tip: "rgba(16,185,129,0.4)",  text: "text-emerald-400" },
  orange: { bar: "from-orange-500 to-amber-400",        tip: "rgba(249,115,22,0.4)",  text: "text-orange-400" },
};

interface Props {
  value: number;
  color?: Color;
}

export default function ProgressBar({ value, color = "purple" }: Props) {
  const raw = useMotionValue(0);
  const spring = useSpring(raw, { stiffness: 80, damping: 18 });
  const width = useTransform(spring, (v) => `${v}%`);
  const c = colors[color];

  useEffect(() => {
    // small delay lets the card entrance animation finish first
    const t = setTimeout(() => raw.set(value), 300);
    return () => clearTimeout(t);
  }, [value, raw]);

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-xs text-white/40 font-medium">Progress</span>
        <span className={`text-xs font-bold font-mono ${c.text}`}>{value}%</span>
      </div>

      <div
        className="relative h-1.5 rounded-full bg-white/8 overflow-hidden"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <motion.div
          style={{ width }}
          className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${c.bar}`}
        />
        {/* glowing tip that pulses */}
        <motion.div
          style={{ width }}
          className="absolute inset-y-0 left-0 rounded-full"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full blur-sm"
            style={{ background: c.tip }}
          />
        </motion.div>
      </div>
    </div>
  );
}
