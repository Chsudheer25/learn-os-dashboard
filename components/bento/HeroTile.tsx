"use client";

import { motion } from "framer-motion";
import { Flame, Star, Calendar } from "lucide-react";
import { tileVariants } from "./BentoGrid";

interface HeroTileProps {
  studentName: string;
  streak: number;
  className?: string;
}

// simple mock for now — could come from an API later
const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const weekActivity = [1, 1, 0, 1, 1, 1, 1];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export default function HeroTile({ studentName, streak, className = "" }: HeroTileProps) {
  return (
    <motion.article
      variants={tileVariants}
      whileHover={{ scale: 1.015 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative rounded-2xl border border-surface-border overflow-hidden bg-bg-700 grain-overlay cursor-default ${className}`}
      aria-label="Welcome hero tile"
    >
      <div className="absolute inset-0 bg-mesh-purple pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-violet/60 to-transparent" />

      <div className="relative z-10 p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">

        {/* greeting + name */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white/40 mb-1">{getGreeting()} 👋</p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            <span className="bg-gradient-to-br from-white to-white/50 bg-clip-text text-transparent">
              Welcome back,{" "}
            </span>
            <span className="bg-gradient-to-r from-accent-violet to-accent-cyan bg-clip-text text-transparent">
              {studentName}
            </span>
          </h1>
          <p className="text-sm text-white/40">
            You have{" "}
            <span className="text-white/70 font-medium">4 active courses</span>{" "}
            in progress today.
          </p>
        </div>

        {/* streak + weekly dots */}
        <div className="flex flex-col items-center gap-4 shrink-0">
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="flex flex-col items-center justify-center w-24 h-24 rounded-2xl
                       bg-gradient-to-br from-orange-500/20 to-red-500/10
                       border border-orange-500/30"
            aria-label={`${streak} day learning streak`}
          >
            <Flame className="w-7 h-7 text-orange-400 mb-0.5" />
            <span className="text-2xl font-bold text-white">{streak}</span>
            <span className="text-[10px] font-medium text-orange-300/70 uppercase tracking-wider">
              Day Streak
            </span>
          </motion.div>

          <div className="flex items-end gap-1.5" role="img" aria-label="Weekly activity">
            {weekDays.map((day, i) => (
              <div key={day} className="flex flex-col items-center gap-1">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.06, type: "spring", stiffness: 400 }}
                  className={`w-6 h-6 rounded-md activity-dot ${
                    weekActivity[i]
                      ? "bg-accent-violet/70 shadow-[0_0_8px_rgba(124,58,237,0.5)]"
                      : "bg-white/10"
                  }`}
                />
                <span className="text-[9px] text-white/30">{day[0]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* bottom meta bar */}
      <div className="relative z-10 border-t border-surface-border px-6 md:px-8 py-3 flex items-center gap-6 text-xs text-white/40">
        <span className="flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5 text-yellow-400" />
          2,840 XP earned
        </span>
        <span className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-accent-cyan" />
          Member since Jan 2025
        </span>
      </div>
    </motion.article>
  );
}
