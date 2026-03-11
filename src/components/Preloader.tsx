"use client";

import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  progress: number; // 0-100
  isComplete: boolean;
}

export default function Preloader({ progress, isComplete }: PreloaderProps) {
  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="fixed inset-0 z-[60] bg-stone-950 flex flex-col items-center justify-center"
        >
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col items-center"
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 40 40"
              fill="none"
              className="mb-6"
            >
              <path
                d="M20 2L8 16h6l-5 10h8v12h6V26h8l-5-10h6L20 2z"
                fill="url(#loaderTreeGrad)"
              />
              <defs>
                <linearGradient id="loaderTreeGrad" x1="8" y1="2" x2="32" y2="40">
                  <stop stopColor="#FF8F00" />
                  <stop offset="1" stopColor="#8D6E63" />
                </linearGradient>
              </defs>
            </svg>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mb-1">
              Kaveri Traders
            </h2>
            <p className="text-[11px] uppercase tracking-[0.25em] text-stone-500 font-medium">
              Premium Wood Supply
            </p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="mt-12 w-48 sm:w-56"
          >
            <div className="h-[2px] bg-stone-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #FF8F00, #D84315)" }}
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" as const }}
              />
            </div>
            <div className="flex justify-between mt-3">
              <span className="text-[11px] text-stone-600 tracking-wider uppercase">Loading</span>
              <span className="text-[11px] text-stone-500 tabular-nums font-medium">
                {Math.round(progress)}%
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
