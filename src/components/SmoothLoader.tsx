import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface SmoothLoaderProps {
  isLoading: boolean;
  theme: "dark" | "light";
  onFinished?: () => void;
}

export function SmoothLoader({ isLoading, theme, onFinished }: SmoothLoaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      setProgress(100);
      return;
    }

    // Realistic Facebook-like progress bar simulation:
    // Starts fast to 25%, pauses at 45%, accelerates to 85%, finishes at 100%
    const t1 = setTimeout(() => setProgress(30), 100);
    const t2 = setTimeout(() => setProgress(65), 350);
    const t3 = setTimeout(() => setProgress(88), 700);
    const t4 = setTimeout(() => {
      setProgress(100);
      if (onFinished) {
        setTimeout(onFinished, 300);
      }
    }, 1000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [isLoading, onFinished]);

  return (
    <>
      {/* 1. Facebook-style Top Loading Bar */}
      <div 
        className="fixed top-0 left-0 right-0 z-[100] h-[3px] pointer-events-none overflow-hidden"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-[#ff451d] via-[#ff7844] to-[#ff451d] shadow-[0_0_12px_rgba(255,69,29,0.8)] relative"
          initial={{ width: "0%" }}
          animate={{ 
            width: `${progress}%`,
            opacity: progress === 100 ? 0 : 1
          }}
          transition={{ 
            width: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
            opacity: { duration: 0.4, delay: 0.15 }
          }}
        >
          {/* Glowing head at the tip of the progress bar */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#ff451d] rounded-full blur-[3px] shadow-[0_0_10px_#ff451d]" />
        </motion.div>
      </div>

      {/* 2. Facebook-style Shimmer Skeleton Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="fb-loader"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              scale: 0.99,
              transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] }
            }}
            className={`fixed inset-0 z-[90] flex flex-col justify-start overflow-hidden select-none pointer-events-auto backdrop-blur-2xl transition-colors ${
              theme === "dark" ? "bg-black/95 text-white" : "bg-white/95 text-neutral-900"
            }`}
          >
            {/* Ambient Background Glow */}
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#ff451d]/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-6xl w-full mx-auto px-6 py-6 flex-1 flex flex-col justify-between">
              
              {/* Header Skeleton (Navbar) */}
              <div className="flex items-center justify-between py-4 border-b border-white/5">
                {/* Brand Logo Skeleton */}
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl animate-shimmer ${
                    theme === "dark" ? "bg-neutral-800" : "bg-neutral-200"
                  }`} />
                  <div className={`w-28 h-5 rounded-lg animate-shimmer ${
                    theme === "dark" ? "bg-neutral-800" : "bg-neutral-200"
                  }`} />
                </div>

                {/* Nav Links Skeleton */}
                <div className="hidden md:flex items-center gap-6">
                  <div className={`w-16 h-4 rounded-md animate-shimmer ${
                    theme === "dark" ? "bg-neutral-850 bg-neutral-800/80" : "bg-neutral-200"
                  }`} />
                  <div className={`w-16 h-4 rounded-md animate-shimmer ${
                    theme === "dark" ? "bg-neutral-800/80" : "bg-neutral-200"
                  }`} />
                  <div className={`w-16 h-4 rounded-md animate-shimmer ${
                    theme === "dark" ? "bg-neutral-800/80" : "bg-neutral-200"
                  }`} />
                  <div className={`w-20 h-4 rounded-md animate-shimmer ${
                    theme === "dark" ? "bg-neutral-800/80" : "bg-neutral-200"
                  }`} />
                </div>

                {/* CTA Button Skeleton */}
                <div className={`w-28 h-9 rounded-xl animate-shimmer ${
                  theme === "dark" ? "bg-neutral-800" : "bg-neutral-200"
                }`} />
              </div>

              {/* Main Hero & Content Skeletons */}
              <div className="my-auto py-12 flex flex-col items-center text-center max-w-3xl mx-auto w-full">
                
                {/* Center Badge Pill Skeleton */}
                <div className={`w-40 h-7 rounded-full mb-6 animate-shimmer ${
                  theme === "dark" ? "bg-neutral-800/90" : "bg-neutral-200"
                }`} />

                {/* Headline Skeleton Lines */}
                <div className={`w-full max-w-xl h-10 sm:h-12 rounded-2xl mb-4 animate-shimmer ${
                  theme === "dark" ? "bg-neutral-800" : "bg-neutral-200"
                }`} />
                <div className={`w-3/4 max-w-md h-10 sm:h-12 rounded-2xl mb-6 animate-shimmer ${
                  theme === "dark" ? "bg-neutral-800" : "bg-neutral-200"
                }`} />

                {/* Subtitle Skeleton Lines */}
                <div className={`w-4/5 max-w-lg h-4 rounded-lg mb-2.5 animate-shimmer ${
                  theme === "dark" ? "bg-neutral-850 bg-neutral-800/60" : "bg-neutral-200/80"
                }`} />
                <div className={`w-2/3 max-w-sm h-4 rounded-lg mb-8 animate-shimmer ${
                  theme === "dark" ? "bg-neutral-800/60" : "bg-neutral-200/80"
                }`} />

                {/* Buttons Skeleton */}
                <div className="flex items-center gap-4 mb-12">
                  <div className={`w-36 h-11 rounded-xl animate-shimmer ${
                    theme === "dark" ? "bg-[#ff451d]/40" : "bg-[#ff451d]/30"
                  }`} />
                  <div className={`w-32 h-11 rounded-xl animate-shimmer ${
                    theme === "dark" ? "bg-neutral-800" : "bg-neutral-200"
                  }`} />
                </div>

                {/* Facebook Post / Card Style Skeleton Preview */}
                <div className={`w-full max-w-2xl rounded-2xl p-6 border backdrop-blur-md animate-shimmer ${
                  theme === "dark"
                    ? "bg-neutral-900/40 border-neutral-800/60"
                    : "bg-neutral-50/80 border-neutral-200/80"
                }`}>
                  <div className="flex items-center gap-4 mb-4">
                    {/* Circle Avatar Skeleton */}
                    <div className={`w-12 h-12 rounded-full flex-shrink-0 ${
                      theme === "dark" ? "bg-neutral-800" : "bg-neutral-200"
                    }`} />
                    <div className="flex-1 space-y-2 text-left">
                      <div className={`w-36 h-4 rounded-md ${
                        theme === "dark" ? "bg-neutral-800" : "bg-neutral-200"
                      }`} />
                      <div className={`w-24 h-3 rounded-md ${
                        theme === "dark" ? "bg-neutral-800/60" : "bg-neutral-200/60"
                      }`} />
                    </div>
                  </div>
                  <div className={`w-full h-16 rounded-xl ${
                    theme === "dark" ? "bg-neutral-800/50" : "bg-neutral-200/50"
                  }`} />
                </div>

              </div>

              {/* Bottom Subtle Status & Brand Watermark */}
              <div className="flex items-center justify-between py-4 text-xs font-mono border-t border-white/5">
                <div className="flex items-center gap-2 text-neutral-400">
                  <span className="w-2 h-2 rounded-full bg-[#ff451d] animate-ping" />
                  <span>Loading experience...</span>
                </div>
                <div className="text-neutral-500 font-semibold">
                  {progress}%
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
