"use client";

import { motion } from "framer-motion";
import { BookOpen, type LucideIcon } from "lucide-react";
import {
  Layers, Network, Code2, Zap, Brain,
  Database, Globe, Terminal, Cpu, FlaskConical, Palette,
} from "lucide-react";
import type { Course } from "@/types/database";
import ProgressBar from "@/components/ui/ProgressBar";
import { tileVariants } from "./BentoGrid";

// keep this in sync with whatever icon_name values you seed into supabase
const iconMap: Record<string, LucideIcon> = {
  Layers, Network, Code2, Zap, Brain,
  Database, Globe, Terminal, Cpu, BookOpen, FlaskConical, Palette,
};

// themes cycle based on the card's index so each card looks distinct
const themes = [
  {
    gradient: "from-violet-500/10 to-purple-500/5",
    border:   "border-violet-500/20",
    iconBg:   "bg-violet-500/15",
    iconText: "text-violet-300",
    badge:    "bg-violet-500/15 text-violet-300",
    via:      "via-violet-500/40",
    progress: "purple" as const,
    glow:     "rgba(139,92,246,0.15)",
  },
  {
    gradient: "from-cyan-500/10 to-sky-500/5",
    border:   "border-cyan-500/20",
    iconBg:   "bg-cyan-500/15",
    iconText: "text-cyan-300",
    badge:    "bg-cyan-500/15 text-cyan-300",
    via:      "via-cyan-500/40",
    progress: "cyan" as const,
    glow:     "rgba(6,182,212,0.15)",
  },
  {
    gradient: "from-emerald-500/10 to-teal-500/5",
    border:   "border-emerald-500/20",
    iconBg:   "bg-emerald-500/15",
    iconText: "text-emerald-300",
    badge:    "bg-emerald-500/15 text-emerald-300",
    via:      "via-emerald-500/40",
    progress: "green" as const,
    glow:     "rgba(16,185,129,0.15)",
  },
  {
    gradient: "from-orange-500/10 to-amber-500/5",
    border:   "border-orange-500/20",
    iconBg:   "bg-orange-500/15",
    iconText: "text-orange-300",
    badge:    "bg-orange-500/15 text-orange-300",
    via:      "via-orange-500/40",
    progress: "orange" as const,
    glow:     "rgba(249,115,22,0.15)",
  },
];

export default function CourseTile({ course, index }: { course: Course; index: number }) {
  const t = themes[index % themes.length];
  const Icon = iconMap[course.icon_name] ?? BookOpen;

  return (
    <motion.article
      variants={tileVariants}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative rounded-2xl border ${t.border} overflow-hidden bg-[#0d0d1a] grain-overlay shine-card cursor-default group`}
      aria-label={`Course: ${course.title}`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${t.gradient} pointer-events-none`} />

      {/* inner glow on hover */}
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ boxShadow: `inset 0 0 30px ${t.glow}` }}
      />

      <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${t.via} to-transparent`} />

      <div className="relative z-10 p-5">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-2.5 rounded-xl ${t.iconBg}`}>
            <Icon className={`w-5 h-5 ${t.iconText}`} />
          </div>
          <span className={`text-[10px] font-semibold px-2 py-1 rounded-full uppercase tracking-wider ${t.badge}`}>
            Active
          </span>
        </div>

        <h3 className="text-sm font-semibold text-white leading-snug mb-4 line-clamp-2">
          {course.title}
        </h3>

        <ProgressBar value={course.progress} color={t.progress} />
      </div>
    </motion.article>
  );
}
