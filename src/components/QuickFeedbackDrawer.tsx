import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, CheckCircle, Sparkles, MessageSquareHeart, Shield, Mail, Heart, AlertCircle, Smile } from "lucide-react";
import { useSound } from "../context/SoundContext";

interface QuickFeedbackDrawerProps {
  theme: "dark" | "light";
}

const REACTION_OPTIONS = [
  { emoji: "😍", label: "Love it", value: "love" },
  { emoji: "😀", label: "Good", value: "good" },
  { emoji: "😐", label: "Okay", value: "okay" },
  { emoji: "🙁", label: "Needs work", value: "poor" },
  { emoji: "🐛", label: "Found a bug", value: "bug" },
];

export function QuickFeedbackDrawer({ theme }: QuickFeedbackDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const { playClick, playHover, playToggle, playSuccess } = useSound();

  // Close drawer when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isOpen &&
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        const target = event.target as HTMLElement;
        // Don't close if clicking the toggle button itself
        if (target.closest("#feedback-trigger-btn")) return;
        setIsOpen(false);
        playToggle();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, playToggle]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message) return;

    setIsSubmitting(true);
    playClick();

    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      playSuccess();
      
      // Save local reference of feedback submission
      localStorage.setItem("user_submitted_feedback", "true");
    }, 1200);
  };

  const handleClose = () => {
    setIsOpen(false);
    playToggle();
    // Reset state slightly after transition completes
    setTimeout(() => {
      setIsSuccess(false);
      setSelectedReaction(null);
      setMessage("");
      setEmail("");
    }, 400);
  };

  const handleOpen = () => {
    setIsOpen(true);
    playToggle();
  };

  return (
    <>
      {/* Floating Action Button (FAB) in bottom-right corner, positioned beautifully to the left of back-to-top */}
      <div className="fixed bottom-8 right-24 sm:right-28 z-[45]">
        <motion.button
          id="feedback-trigger-btn"
          onClick={handleOpen}
          onMouseEnter={() => playHover()}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center gap-2 px-4 py-3 rounded-full border shadow-2xl transition-all duration-300 backdrop-blur-md cursor-pointer text-xs font-semibold uppercase tracking-wider font-mono ${
            theme === "dark"
              ? "bg-neutral-950/80 border-white/10 text-white hover:border-[#ff451d]/40"
              : "bg-white/90 border-neutral-200 text-neutral-900 hover:border-[#ff451d]/40"
          }`}
          title="Share Feedback"
        >
          <MessageSquareHeart className="w-4 h-4 text-[#ff451d]" />
          <span className="hidden sm:inline">Feedback</span>
        </motion.button>
      </div>

      {/* Backdrop overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[100]"
          />
        )}
      </AnimatePresence>

      {/* Slide-out Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={drawerRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className={`fixed top-0 right-0 h-full w-full max-w-md z-[101] shadow-[0_0_50px_rgba(0,0,0,0.3)] flex flex-col border-l transition-all duration-300 ${
              theme === "dark"
                ? "bg-[#0a0a0a]/95 border-white/5 text-white"
                : "bg-white/95 border-neutral-200 text-neutral-900"
            }`}
          >
            {/* Ambient Background blur glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff451d]/5 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/[0.03] rounded-full blur-[80px] pointer-events-none" />

            {/* Header */}
            <div className={`p-6 border-b flex items-center justify-between relative z-10 ${
              theme === "dark" ? "border-white/5" : "border-neutral-100"
            }`}>
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-[#ff451d]/10 rounded-xl border border-[#ff451d]/20">
                  <Heart className="w-4.5 h-4.5 text-[#ff451d]" />
                </div>
                <div>
                  <h3 className="text-base font-bold tracking-tight">Quick Feedback</h3>
                  <p className={`text-[10px] font-mono tracking-wider uppercase mt-0.5 ${
                    theme === "dark" ? "text-[#ff451d]" : "text-neutral-500"
                  }`}>
                    Share your experience
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                onMouseEnter={() => playHover()}
                className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-200 cursor-pointer ${
                  theme === "dark"
                    ? "bg-white/5 border-white/10 text-neutral-400 hover:text-white hover:bg-white/10"
                    : "bg-black/5 border-black/10 text-neutral-500 hover:text-black hover:bg-black/10"
                }`}
                aria-label="Close feedback drawer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-6 relative z-10 space-y-6">
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    key="feedback-form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    {/* Intro text */}
                    <div className={`text-xs leading-relaxed ${
                      theme === "dark" ? "text-neutral-400" : "text-neutral-600"
                    }`}>
                      Have any thoughts, feature requests, or encountered an issue with our experience? We value your input to continuously refine and craft better digital products.
                    </div>

                    {/* Reactions */}
                    <div className="space-y-2.5">
                      <label className={`text-[10px] font-bold tracking-wider uppercase font-mono block ${
                        theme === "dark" ? "text-neutral-400" : "text-neutral-500"
                      }`}>
                        How is your experience?
                      </label>
                      <div className="grid grid-cols-5 gap-1 sm:gap-2">
                        {REACTION_OPTIONS.map((opt) => {
                          const isSelected = selectedReaction === opt.value;
                          return (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => {
                                setSelectedReaction(opt.value);
                                playClick();
                              }}
                              onMouseEnter={() => playHover()}
                              className={`flex flex-col items-center p-1.5 sm:p-2.5 rounded-xl border transition-all duration-300 cursor-pointer ${
                                theme === "dark"
                                  ? isSelected
                                    ? "bg-[#ff451d]/10 border-[#ff451d]/40 shadow-[0_0_15px_rgba(255,69,29,0.1)]"
                                    : "bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.04]"
                                  : isSelected
                                    ? "bg-[#ff451d]/5 border-[#ff451d]/40 shadow-sm"
                                    : "bg-black/[0.01] border-neutral-200 hover:border-neutral-300 hover:bg-black/[0.03]"
                              }`}
                            >
                              <span className="text-xl mb-1 filter drop-shadow-sm">{opt.emoji}</span>
                              <span className={`text-[8px] font-semibold text-center leading-none ${
                                isSelected
                                  ? "text-[#ff451d] font-bold"
                                  : theme === "dark" ? "text-neutral-400" : "text-neutral-500"
                              }`}>
                                {opt.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Message Area */}
                    <div className="space-y-1.5">
                      <label className={`text-[10px] font-bold tracking-wider uppercase font-mono block ${
                        theme === "dark" ? "text-neutral-400" : "text-neutral-500"
                      }`}>
                        Your Message
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us what you liked, what can be improved, or about a bug you noticed..."
                        className={`w-full border rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-[#ff451d]/40 transition-all resize-none ${
                          theme === "dark"
                            ? "bg-white/5 border-white/5 text-white placeholder-neutral-500 focus:bg-white/[0.08]"
                            : "bg-black/5 border-black/5 text-neutral-900 placeholder-neutral-400 focus:bg-black/[0.08]"
                        }`}
                      />
                    </div>

                    {/* Optional Email */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className={`text-[10px] font-bold tracking-wider uppercase font-mono block ${
                          theme === "dark" ? "text-neutral-400" : "text-neutral-500"
                        }`}>
                          Email Address
                        </label>
                        <span className="text-[9px] text-neutral-500 font-mono italic">Optional</span>
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                          <Mail className="w-4 h-4" />
                        </div>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Your email for follow-up"
                          className={`w-full border rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-[#ff451d]/40 transition-all ${
                            theme === "dark"
                              ? "bg-white/5 border-white/5 text-white placeholder-neutral-500 focus:bg-white/[0.08]"
                              : "bg-black/5 border-black/5 text-neutral-900 placeholder-neutral-400 focus:bg-black/[0.08]"
                          }`}
                        />
                      </div>
                    </div>

                    {/* Privacy & Compliance */}
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-neutral-500/[0.03] border border-neutral-500/5">
                      <Shield className="w-4 h-4 text-[#ff451d]/70 shrink-0" />
                      <p className="text-[9px] text-neutral-500 leading-normal">
                        Your feedback is securely transmitted and strictly used to optimize this experience. No unsolicited tracking.
                      </p>
                    </div>

                    {/* Submit action */}
                    <button
                      type="submit"
                      disabled={isSubmitting || !message}
                      onMouseEnter={() => playHover()}
                      className="w-full flex items-center justify-center gap-2 bg-[#ff451d] hover:bg-[#ff451d]/90 text-white py-3 rounded-xl text-xs sm:text-sm font-semibold shadow-lg shadow-[#ff451d]/10 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Securing Connection...
                        </span>
                      ) : (
                        <>
                          <span>Submit Feedback</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-drawer"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center text-center py-16 space-y-6"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }}
                      className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400"
                    >
                      <CheckCircle className="w-8 h-8" />
                    </motion.div>
                    <div className="space-y-2">
                      <h4 className="text-lg font-bold">Feedback Registered!</h4>
                      <p className={`text-xs leading-relaxed max-w-xs ${
                        theme === "dark" ? "text-neutral-400" : "text-neutral-600"
                      }`}>
                        Your response has been parsed and transmitted directly to our experience team. Thank you for your precise collaboration!
                      </p>
                    </div>
                    
                    <button
                      type="button"
                      onClick={handleClose}
                      onMouseEnter={() => playHover()}
                      className={`px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase font-mono transition-all duration-200 cursor-pointer ${
                        theme === "dark"
                          ? "bg-white text-black hover:bg-neutral-100"
                          : "bg-black text-white hover:bg-neutral-800"
                      }`}
                    >
                      Close Drawer
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Drawer Footer with sound toggle */}
            <div className={`p-6 border-t flex items-center justify-between relative z-10 ${
              theme === "dark" ? "border-white/5" : "border-neutral-100"
            }`}>
              <span className="text-[9px] font-mono tracking-wider text-neutral-500 uppercase">
                ARAIN DIGITALZ FEEDBACK PLATFORM
              </span>
              <div className="flex items-center gap-1.5 text-neutral-400">
                <Smile className="w-3.5 h-3.5 text-[#ff451d]" />
                <span className="text-[10px] font-semibold">Crafted for users</span>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
