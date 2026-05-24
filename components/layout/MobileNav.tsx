"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { LayoutDashboard, BookOpen, BarChart2, Trophy } from "lucide-react";

const tabs = [
  { id: "dashboard",    label: "Home",    icon: LayoutDashboard, href: "/" },
  { id: "courses",      label: "Courses", icon: BookOpen,        href: "/courses" },
  { id: "analytics",   label: "Stats",   icon: BarChart2,       href: "/analytics" },
  { id: "achievements", label: "Awards",  icon: Trophy,          href: "/achievements" },
];

// shown only on mobile — the sidebar handles larger screens
export default function MobileNav() {
  const [active, setActive] = useState("dashboard");

  return (
    <nav
      aria-label="Mobile navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40
                 bg-bg-800/90 backdrop-blur-xl border-t border-surface-border
                 flex items-center justify-around px-2 py-2"
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = active === tab.id;

        return (
          <Link
            key={tab.id}
            href={tab.href}
            id={`mobile-nav-${tab.id}`}
            aria-current={isActive ? "page" : undefined}
            onClick={() => setActive(tab.id)}
            className="relative flex flex-col items-center gap-1 px-4 py-2 rounded-xl
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-violet"
          >
            {isActive && (
              <motion.span
                layoutId="mobile-active-pill"
                className="absolute inset-0 rounded-xl bg-accent-purple/20"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}

            <Icon className={`relative w-5 h-5 ${isActive ? "text-accent-violet" : "text-white/40"}`} />
            <span className={`relative text-[10px] font-medium ${isActive ? "text-accent-violet" : "text-white/40"}`}>
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
