import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, ArrowRight, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

interface NewsletterProps {
  theme: "dark" | "light";
}

export function Newsletter({ theme }: NewsletterProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Minimalist email check
    if (!email) {
      setStatus("error");
      setErrorMessage("Please enter an email address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");

    // Simulating API dispatch
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1500);
  };

  return (
    <section
      id="newsletter"
      className={`relative py-16 border-t transition-colors duration-500 overflow-hidden ${
        theme === "dark"
          ? "bg-[#050505] border-white/5 text-white"
          : "bg-slate-100/50 border-neutral-200 text-neutral-900"
      }`}
    >
      {/* Decorative Light Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-[#ff451d]/20 to-transparent pointer-events-none" />
      <div className="absolute -bottom-10 left-1/3 w-72 h-72 bg-[#ff451d]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className={`rounded-3xl p-8 md:p-12 border relative transition-all duration-300 overflow-hidden ${
          theme === "dark"
            ? "bg-[#0a0a0a]/60 border-white/5 backdrop-blur-md"
            : "bg-white/80 border-neutral-200 backdrop-blur-md shadow-sm"
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Call to Action Text */}
            <div className="lg:col-span-6 space-y-3 text-left">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-[#ff451d]/15 bg-[#ff451d]/5 text-[#ff451d] text-[10px] font-bold uppercase tracking-wider font-mono">
                <span>OUR DISPATCH</span>
              </div>
              
              <h3 className={`text-2xl sm:text-3xl font-semibold tracking-tight transition-colors duration-300 ${
                theme === "dark" ? "text-white" : "text-neutral-900"
              }`}>
                Subscribe to our <span className="font-serif italic text-[#ff451d] font-normal">humancentric</span> updates.
              </h3>
              
              <p className={`text-sm max-w-lg leading-relaxed transition-colors duration-300 ${
                theme === "dark" ? "text-neutral-400" : "text-neutral-600"
              }`}>
                No corporate jargon. Strictly design insights, layout philosophy, and optimized tech components sent once a month.
              </p>
            </div>

            {/* Newsletter Input Form */}
            <div className="lg:col-span-6 w-full">
              <AnimatePresence mode="wait">
                {status !== "success" ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="w-full space-y-3"
                  >
                    <div className="relative flex flex-col sm:flex-row items-stretch gap-3">
                      <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                          <Mail className={`w-4 h-4 transition-colors ${
                            theme === "dark" ? "text-neutral-500" : "text-neutral-400"
                          }`} />
                        </div>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (status === "error") setStatus("idle");
                          }}
                          placeholder="Enter your email address"
                          disabled={status === "loading"}
                          className={`w-full py-3.5 pl-11 pr-4 rounded-xl text-sm transition-all focus:outline-none focus:border-[#ff451d]/40 border ${
                            theme === "dark"
                              ? "bg-white/5 border-white/5 text-white placeholder-neutral-500 focus:bg-white/[0.08]"
                              : "bg-black/5 border-black/5 text-neutral-900 placeholder-neutral-400 focus:bg-black/[0.08]"
                          }`}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="bg-[#ff451d] hover:bg-[#ff451d]/90 text-white rounded-xl px-6 py-3.5 text-sm font-semibold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer disabled:opacity-50"
                      >
                        {status === "loading" ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Joining...</span>
                          </>
                        ) : (
                          <>
                            <span>Subscribe</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>

                    {/* Error status indicator */}
                    <AnimatePresence>
                      {status === "error" && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="flex items-center gap-2 text-rose-500 text-xs font-medium pl-1 mt-1.5"
                        >
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errorMessage}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className={`flex flex-col sm:flex-row items-center gap-4 p-5 rounded-2xl border ${
                      theme === "dark"
                        ? "bg-[#ff451d]/5 border-[#ff451d]/15"
                        : "bg-emerald-500/5 border-emerald-500/10"
                    }`}
                  >
                    <div className="p-3 bg-[#ff451d]/10 text-[#ff451d] rounded-xl shrink-0">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div className="text-center sm:text-left space-y-0.5">
                      <h4 className={`text-base font-semibold ${
                        theme === "dark" ? "text-white" : "text-neutral-900"
                      }`}>
                        You're on the list!
                      </h4>
                      <p className={`text-xs ${
                        theme === "dark" ? "text-neutral-400" : "text-neutral-600"
                      }`}>
                        We've registered your subscription. Prepare yourself for absolute digital clarity.
                      </p>
                    </div>
                    <button
                      onClick={() => setStatus("idle")}
                      className={`text-xs font-mono font-bold tracking-wider uppercase ml-auto px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                        theme === "dark"
                          ? "bg-white/5 border-white/5 text-neutral-400 hover:text-white"
                          : "bg-black/5 border-black/5 text-neutral-600 hover:text-black"
                      }`}
                    >
                      Reset
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
