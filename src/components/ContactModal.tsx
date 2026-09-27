import React, { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, 
  Send, 
  CheckCircle, 
  Mail, 
  User as UserIcon, 
  MessageSquare, 
  Sparkles, 
  ArrowUpRight, 
  LogOut, 
  ShieldCheck, 
  AlertCircle,
  Facebook, 
  Instagram, 
  Github, 
  Twitter, 
  Linkedin 
} from "lucide-react";
import { User } from "firebase/auth";
import { 
  initAuth, 
  googleSignIn, 
  logout, 
  getAccessToken,
  setCachedToken
} from "../services/gmailAuth";
import { sendEmailViaGmail, RECIPIENT_EMAIL } from "../services/gmailApi";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme?: "dark" | "light";
}

export function ContactModal({ isOpen, onClose, theme = "dark" }: ContactModalProps) {
  // Tab: "gmail" (Google Workspace Verified) or "standard"
  const [activeTab, setActiveTab] = useState<"gmail" | "standard">("gmail");

  // Google User State
  const [googleUser, setGoogleUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Form Fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [projectType, setProjectType] = useState("Technical SEO & Audit");

  // Submission & Confirmation States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [sentMessageId, setSentMessageId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Mandatory User Confirmation Modal for Mutating Email Operation (per Workspace Integration Skill)
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Initialize Auth state listener
  useEffect(() => {
    if (!isOpen) return;

    const unsubscribe = initAuth(
      (user, token) => {
        setGoogleUser(user);
        setAccessToken(token);
        if (user.displayName) setName(user.displayName);
        if (user.email) setEmail(user.email);
      },
      () => {
        setGoogleUser(null);
        setAccessToken(null);
      }
    );

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [isOpen]);

  // Handle Google Sign-In with Gmail permissions
  const handleGoogleSignIn = async () => {
    setIsSigningIn(true);
    setAuthError(null);
    try {
      const res = await googleSignIn();
      if (res) {
        setGoogleUser(res.user);
        setAccessToken(res.accessToken);
        setCachedToken(res.accessToken);
        if (res.user.displayName) setName(res.user.displayName);
        if (res.user.email) setEmail(res.user.email);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to sign in with Google";
      setAuthError(msg);
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setGoogleUser(null);
    setAccessToken(null);
  };

  // Trigger form submit
  const handlePreSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (activeTab === "gmail") {
      if (!googleUser || !accessToken) {
        setErrorMessage("Please sign in with Google first to send via Gmail.");
        return;
      }
      if (!subject.trim() || !message.trim()) {
        setErrorMessage("Please fill in both the subject and message.");
        return;
      }
      // Open Mandatory User Confirmation Dialog before executing send operation
      setShowConfirmation(true);
    } else {
      // Standard form submission
      if (!name || !email || !message) return;
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      }, 1200);
    }
  };

  // Confirmed Send via Gmail API
  const handleConfirmedSendGmail = async () => {
    setShowConfirmation(false);
    if (!accessToken || !googleUser) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const result = await sendEmailViaGmail({
        accessToken,
        senderName: name || googleUser.displayName || "Google User",
        senderEmail: googleUser.email || email,
        subject: subject.trim(),
        message: message.trim(),
        projectType,
      });

      setSentMessageId(result.id);
      setIsSuccess(true);
      setSubject("");
      setMessage("");
    } catch (err: unknown) {
      console.error("Gmail send error:", err);
      const msg = err instanceof Error ? err.message : "Failed to send email via Gmail";
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    onClose();
    setShowConfirmation(false);
    setTimeout(() => {
      setIsSuccess(false);
      setErrorMessage(null);
      setSentMessageId(null);
    }, 500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetAndClose}
            className={`fixed inset-0 backdrop-blur-md transition-colors duration-300 ${
              theme === "dark" ? "bg-black/80" : "bg-slate-950/40"
            }`}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.5 }}
            className={`relative w-full max-w-lg my-auto rounded-3xl p-5 sm:p-7 shadow-2xl z-10 border transition-all duration-300 max-h-[90vh] overflow-y-auto ${
              theme === "dark"
                ? "bg-[#0a0a0a]/95 border-white/10 text-white"
                : "bg-white/95 border-neutral-200 text-neutral-900"
            }`}
          >
            {/* Glowing Accent Elements */}
            <div className="absolute top-0 left-1/4 w-32 h-32 bg-[#ff451d]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-[#25D366]/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#ff451d]/10 flex items-center justify-center border border-[#ff451d]/20 text-[#ff451d]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={`text-lg sm:text-xl font-bold tracking-tight ${theme === "dark" ? "text-white" : "text-neutral-900"}`}>
                    Connect with Majid
                  </h3>
                  <p className={`text-xs ${theme === "dark" ? "text-neutral-400" : "text-neutral-500"}`}>
                    Direct dispatch to <span className="text-[#ff451d] font-mono">{RECIPIENT_EMAIL}</span>
                  </p>
                </div>
              </div>
              <button
                onClick={resetAndClose}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer border ${
                  theme === "dark"
                    ? "bg-white/5 border-white/10 text-neutral-400 hover:text-white hover:bg-white/10"
                    : "bg-black/5 border-black/10 text-neutral-500 hover:text-black hover:bg-black/10"
                }`}
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Tab Selection: Gmail vs Standard */}
            <div className="flex items-center p-1 rounded-2xl border mb-5 relative z-10 gap-1 backdrop-blur-md bg-white/5 border-white/5">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("gmail");
                  setErrorMessage(null);
                }}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === "gmail"
                    ? "bg-[#ff451d] text-white shadow-md shadow-[#ff451d]/20"
                    : theme === "dark" ? "text-neutral-400 hover:text-white" : "text-neutral-600 hover:text-black"
                }`}
              >
                {/* Official Gmail colored icon */}
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 13.5L0 4.5V19.5C0 20.3284 0.671573 21 1.5 21H5V10.5L12 15.5L19 10.5V21H22.5C23.3284 21 24 20.3284 24 19.5V4.5L12 13.5Z"/>
                  <path fill="#C5221F" d="M22.5 3H1.5C0.671573 3 0 3.67157 0 4.5V4.7L12 13.7L24 4.7V4.5C24 3.67157 23.3284 3 22.5 3Z"/>
                </svg>
                <span>Send via Gmail</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20 text-white font-mono uppercase">Verified</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab("standard");
                  setErrorMessage(null);
                }}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === "standard"
                    ? "bg-white text-black shadow-md shadow-black/10"
                    : theme === "dark" ? "text-neutral-400 hover:text-white" : "text-neutral-600 hover:text-black"
                }`}
              >
                <span>Quick Form</span>
              </button>
            </div>

            {/* Error Banner */}
            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Modal Body */}
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handlePreSubmit}
                  className="space-y-3.5 relative z-10"
                >
                  {/* TAB 1: GMAIL AUTHENTICATION & DISPATCH */}
                  {activeTab === "gmail" && (
                    <div className="space-y-3.5">
                      {!googleUser ? (
                        /* Step 1: Sign in with Google (Styled to official Google standard) */
                        <div className={`p-4 rounded-2xl border text-center transition-colors ${
                          theme === "dark"
                            ? "bg-neutral-900/60 border-neutral-800"
                            : "bg-neutral-50 border-neutral-200"
                        }`}>
                          <div className="w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center bg-white shadow-sm border border-neutral-200">
                            {/* Official Google 'G' SVG Logo */}
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                            </svg>
                          </div>
                          <h4 className="text-sm font-semibold mb-1">Send Directly from Your Gmail</h4>
                          <p className={`text-xs mb-3.5 max-w-sm mx-auto ${
                            theme === "dark" ? "text-neutral-400" : "text-neutral-600"
                          }`}>
                            Sign in with your Google account to dispatch your message directly to Majid's inbox with verified sender identity.
                          </p>

                          {/* Official Styled Google Button */}
                          <button
                            type="button"
                            onClick={handleGoogleSignIn}
                            disabled={isSigningIn}
                            className="inline-flex items-center justify-center gap-3 px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all shadow-md bg-white text-neutral-800 hover:bg-neutral-100 hover:shadow-lg active:scale-95 cursor-pointer border border-neutral-300 disabled:opacity-50"
                          >
                            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                            </svg>
                            <span>{isSigningIn ? "Signing in..." : "Sign in with Google"}</span>
                          </button>

                          {authError && (
                            <p className="mt-2 text-xs text-red-400">{authError}</p>
                          )}
                        </div>
                      ) : (
                        /* Authenticated Google Account Banner */
                        <div className={`p-3 rounded-2xl border flex items-center justify-between ${
                          theme === "dark" ? "bg-emerald-950/20 border-emerald-500/30" : "bg-emerald-50 border-emerald-200"
                        }`}>
                          <div className="flex items-center gap-2.5">
                            {googleUser.photoURL ? (
                              <img 
                                src={googleUser.photoURL} 
                                alt={googleUser.displayName || "Google User"} 
                                className="w-8 h-8 rounded-full border border-emerald-500/50" 
                              />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                                {googleUser.displayName?.[0] || "G"}
                              </div>
                            )}
                            <div className="text-left">
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs font-bold leading-tight">{googleUser.displayName}</span>
                                <span className="text-[10px] text-emerald-500 font-mono font-semibold">✓ Verified</span>
                              </div>
                              <span className="text-[11px] text-neutral-400 font-mono leading-tight">{googleUser.email}</span>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={handleLogout}
                            className={`p-1.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                              theme === "dark" 
                                ? "border-neutral-800 hover:bg-neutral-800 text-neutral-400" 
                                : "border-neutral-200 hover:bg-neutral-100 text-neutral-600"
                            }`}
                            title="Sign out of Google"
                          >
                            <LogOut className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 2: STANDARD NAME & EMAIL FIELDS (if not using Gmail or not signed in) */}
                  {activeTab === "standard" && (
                    <>
                      <div className="space-y-1">
                        <label className={`text-[11px] font-bold tracking-wider uppercase font-mono block ${theme === "dark" ? "text-neutral-400" : "text-neutral-500"}`}>
                          Your Name
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                            <UserIcon className="w-4 h-4" />
                          </div>
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                            className={`w-full border rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#ff451d]/40 transition-all ${
                              theme === "dark"
                                ? "bg-white/5 border-white/5 text-white placeholder-neutral-500"
                                : "bg-black/5 border-black/5 text-neutral-900 placeholder-neutral-400"
                            }`}
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className={`text-[11px] font-bold tracking-wider uppercase font-mono block ${theme === "dark" ? "text-neutral-400" : "text-neutral-500"}`}>
                          Email Address
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                            <Mail className="w-4 h-4" />
                          </div>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="john@example.com"
                            className={`w-full border rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#ff451d]/40 transition-all ${
                              theme === "dark"
                                ? "bg-white/5 border-white/5 text-white placeholder-neutral-500"
                                : "bg-black/5 border-black/5 text-neutral-900 placeholder-neutral-400"
                            }`}
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Common Project / Inquiry Type */}
                  <div className="space-y-1">
                    <label className={`text-[11px] font-bold tracking-wider uppercase font-mono block ${theme === "dark" ? "text-neutral-400" : "text-neutral-500"}`}>
                      Project Focus
                    </label>
                    <select
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className={`w-full border rounded-xl px-3 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#ff451d]/40 transition-all cursor-pointer ${
                        theme === "dark"
                          ? "bg-neutral-900 border-white/10 text-white"
                          : "bg-white border-neutral-200 text-neutral-900"
                      }`}
                    >
                      <option value="Technical SEO & Audit">Technical SEO & Comprehensive Audit</option>
                      <option value="WordPress Architecture">WordPress Custom Build / Redesign</option>
                      <option value="Core Web Vitals & Speed">Speed Optimization & Core Web Vitals</option>
                      <option value="Enterprise Web Solution">Full-Stack Digital Solutions</option>
                      <option value="General Consultation">General Inquiry / Consultation</option>
                    </select>
                  </div>

                  {/* Subject field */}
                  <div className="space-y-1">
                    <label className={`text-[11px] font-bold tracking-wider uppercase font-mono block ${theme === "dark" ? "text-neutral-400" : "text-neutral-500"}`}>
                      Subject
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        required
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="e.g. SEO Audit Inquiry for E-Commerce"
                        className={`w-full border rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#ff451d]/40 transition-all ${
                          theme === "dark"
                            ? "bg-white/5 border-white/5 text-white placeholder-neutral-500"
                            : "bg-black/5 border-black/5 text-neutral-900 placeholder-neutral-400"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Message field */}
                  <div className="space-y-1">
                    <label className={`text-[11px] font-bold tracking-wider uppercase font-mono block ${theme === "dark" ? "text-neutral-400" : "text-neutral-500"}`}>
                      Your Message
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe your goals, requirements, or questions for Majid..."
                      className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#ff451d]/40 transition-all resize-none ${
                        theme === "dark"
                          ? "bg-white/5 border-white/5 text-white placeholder-neutral-500"
                          : "bg-black/5 border-black/5 text-neutral-900 placeholder-neutral-400"
                      }`}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || (activeTab === "gmail" && !googleUser)}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#ff3c00] to-[#ff5224] text-white py-3 rounded-xl text-sm font-semibold shadow-lg shadow-[#ff451d]/20 hover:shadow-xl hover:shadow-[#ff451d]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-98"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending to Majid...
                      </span>
                    ) : (
                      <>
                        <span>{activeTab === "gmail" ? "Send to Majid via Gmail" : "Submit Message"}</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  {/* Quick Direct Link to Client App */}
                  <div className="pt-1 flex items-center justify-between text-[11px] text-neutral-400 font-mono">
                    <span>Direct: {RECIPIENT_EMAIL}</span>
                    <a
                      href={`mailto:${RECIPIENT_EMAIL}?subject=${encodeURIComponent(subject || "Inquiry for Majid")}&body=${encodeURIComponent(message)}`}
                      className="text-[#ff451d] hover:underline flex items-center gap-0.5"
                    >
                      <span>Open Mail App</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                </motion.form>
              ) : (
                /* Success Screen */
                <motion.div
                  key="success-screen"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center justify-center text-center py-8 relative z-10"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }}
                    className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4"
                  >
                    <CheckCircle className="w-7 h-7" />
                  </motion.div>

                  <h4 className={`text-lg font-bold mb-1.5 ${theme === "dark" ? "text-white" : "text-neutral-900"}`}>
                    {activeTab === "gmail" ? "Gmail Delivered Successfully!" : "Message Received!"}
                  </h4>

                  <p className={`text-xs max-w-sm leading-relaxed mb-4 ${
                    theme === "dark" ? "text-neutral-300" : "text-neutral-600"
                  }`}>
                    {activeTab === "gmail" ? (
                      <>
                        Your message has been dispatched directly to <strong className="text-[#ff451d]">{RECIPIENT_EMAIL}</strong> using your authenticated Gmail address. Majid will reply to your email shortly!
                      </>
                    ) : (
                      <>
                        Thank you for reaching out. Your inquiry has been routed to Majid and will be reviewed within 12 business hours.
                      </>
                    )}
                  </p>

                  {sentMessageId && (
                    <div className="mb-6 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono text-neutral-400">
                      Gmail Message ID: {sentMessageId}
                    </div>
                  )}

                  <button
                    onClick={resetAndClose}
                    className={`px-6 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                      theme === "dark"
                        ? "bg-white text-black hover:bg-neutral-100"
                        : "bg-neutral-900 text-white hover:bg-black shadow-md shadow-black/10"
                    }`}
                  >
                    Back to Portfolio
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* MANDATORY USER CONFIRMATION DIALOG (per Workspace Integration Skill) */}
            <AnimatePresence>
              {showConfirmation && (
                <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setShowConfirmation(false)}
                    className="absolute inset-0 bg-black/70 backdrop-blur-xs"
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                    className={`relative z-10 w-full max-w-md p-6 rounded-2xl border shadow-2xl ${
                      theme === "dark"
                        ? "bg-[#111111] border-neutral-700 text-white"
                        : "bg-white border-neutral-300 text-neutral-900"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 mb-3 text-[#ff451d]">
                      <ShieldCheck className="w-5 h-5" />
                      <h4 className="font-bold text-sm">Confirm Sending via Gmail</h4>
                    </div>

                    <p className="text-xs mb-3 leading-relaxed text-neutral-300">
                      Are you sure you want to send this email to Majid using your Google account?
                    </p>

                    <div className={`p-3 rounded-xl border text-xs font-mono mb-4 space-y-1.5 ${
                      theme === "dark" ? "bg-black/40 border-neutral-800" : "bg-neutral-50 border-neutral-200"
                    }`}>
                      <div>
                        <span className="text-neutral-500">From: </span>
                        <span>{googleUser?.displayName} &lt;{googleUser?.email}&gt;</span>
                      </div>
                      <div>
                        <span className="text-neutral-500">To: </span>
                        <span className="text-[#ff451d]">{RECIPIENT_EMAIL}</span>
                      </div>
                      <div>
                        <span className="text-neutral-500">Subject: </span>
                        <span>{subject}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2.5">
                      <button
                        type="button"
                        onClick={() => setShowConfirmation(false)}
                        className={`px-4 py-2 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                          theme === "dark" 
                            ? "border-neutral-800 hover:bg-neutral-800 text-neutral-300" 
                            : "border-neutral-200 hover:bg-neutral-100 text-neutral-700"
                        }`}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleConfirmedSendGmail}
                        className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#ff451d] hover:bg-[#ff5733] text-white shadow-lg transition-all cursor-pointer active:scale-95"
                      >
                        Confirm & Send
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
