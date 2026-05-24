"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  BarChart2,
  Trophy,
  Settings,
  ChevronLeft,
  Zap,
} from "lucide-react";

// nav items — add more here if needed
const links = [
  { id: "dashboard",    label: "Dashboard",    icon: LayoutDashboard, href: "/" },
  { id: "courses",      label: "My Courses",   icon: BookOpen,        href: "/courses" },
  { id: "analytics",   label: "Analytics",    icon: BarChart2,       href: "/analytics" },
  { id: "achievements", label: "Achievements", icon: Trophy,          href: "/achievements" },
  { id: "settings",    label: "Settings",     icon: Settings,        href: "/settings" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState("dashboard");

  return (
    <motion.aside
      animate={{ width: collapsed ? 64 : 256 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="hidden md:flex flex-col fixed left-0 top-0 h-full z-30
                 bg-bg-800 border-r border-surface-border overflow-hidden shrink-0"
      aria-label="Primary navigation"
    >
      {/* logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-surface-border shrink-0">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent-purple/20 border border-accent-purple/40 shrink-0">
          <Zap className="w-4 h-4 text-accent-violet" />
        </div>

        <AnimatePresence initial={false}>
          {!collapsed && (
            <motion.span
              key="brand"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.18 }}
              className="font-bold text-lg tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent whitespace-nowrap"
            >
              LearnOS
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* nav links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {links.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;

          return (
            <Link
              key={item.id}
              href={item.href}
              id={`nav-${item.id}`}
              aria-current={isActive ? "page" : undefined}
              onClick={() => setActive(item.id)}
              className="relative flex items-center gap-3 px-3 py-2.5 rounded-xl
                         transition-colors group
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-violet"
            >
              {/* shared-layout pill for the active item */}
              {isActive && (
                <motion.span
                  layoutId="sidebar-active-pill"
                  className="absolute inset-0 rounded-xl bg-accent-purple/20 border border-accent-purple/30"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}

              {!isActive && (
                <span className="absolute inset-0 rounded-xl bg-white/0 group-hover:bg-white/5 transition-colors" />
              )}

              <Icon
                className={`relative w-5 h-5 shrink-0 transition-colors
                  ${isActive ? "text-accent-violet" : "text-white/40 group-hover:text-white/70"}`}
              />

              <AnimatePresence initial={false}>
                {!collapsed && (
                  <motion.span
                    key={`lbl-${item.id}`}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.15 }}
                    className={`relative text-sm font-medium whitespace-nowrap transition-colors
                      ${isActive ? "text-white" : "text-white/50 group-hover:text-white/80"}`}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>

      {/* collapse button */}
      <div className="px-3 py-4 border-t border-surface-border shrink-0">
        <button
          id="sidebar-collapse-btn"
          onClick={() => setCollapsed((v) => !v)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl
                     text-white/40 hover:text-white/70 hover:bg-white/5
                     transition-colors"
        >
          <motion.span
            animate={{ rotate: collapsed ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="shrink-0"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.span>

          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.span
                key="collapse-lbl"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.15 }}
                className="text-sm font-medium whitespace-nowrap"
              >
                Collapse
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  );
}
