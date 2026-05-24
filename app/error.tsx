"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-bg-900 p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative max-w-md w-full rounded-2xl border border-red-500/20 bg-bg-800 p-8 text-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-radial from-red-500/10 via-transparent to-transparent pointer-events-none" />

        <motion.div
          animate={{ rotate: [0, -5, 5, -5, 0] }}
          transition={{ repeat: Infinity, repeatDelay: 3, duration: 0.5 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full
                     bg-red-500/10 border border-red-500/30 mb-6"
        >
          <AlertTriangle className="w-7 h-7 text-red-400" />
        </motion.div>

        <h1 className="text-xl font-semibold text-white mb-2">Something went wrong</h1>
        <p className="text-sm text-white/50 mb-1">
          {error.message || "Could not load dashboard data."}
        </p>
        {error.digest && (
          <p className="font-mono text-xs text-white/30 mb-6">ID: {error.digest}</p>
        )}

        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                     bg-accent-purple/20 border border-accent-purple/30 text-accent-violet
                     text-sm font-medium hover:bg-accent-purple/30 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Try again
        </button>
      </motion.div>
    </main>
  );
}
