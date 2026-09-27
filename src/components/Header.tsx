import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronDown,
  Sparkles,
  Layers,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  Menu,
  X,
  Compass,
  Briefcase,
  Cpu,
  Users,
  MessageSquare,
  HelpCircle,
  Mail,
  ArrowUpRight,
  ShieldCheck,
  Facebook,
  Instagram,
  Github,
  Twitter,
  Linkedin,
  RotateCw
} from "lucide-react";
import { SearchSections } from "./SearchSections";

export interface HeaderProps {
  theme: "dark" | "light";
  onToggleTheme: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenContact: () => void;
  playClick: () => void;
  playHover: () => void;
  playToggle: () => void;
  playSuccess: () => void;
  onRefreshLoading?: () => void;
}

export function Header({
  theme,
  onToggleTheme,
  soundEnabled,
  onToggleSound,
  onOpenContact,
  playClick,
  playHover,
  playToggle,
  playSuccess,
  onRefreshLoading
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitor scroll for responsive glassmorphism header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close desktop dropdowns on click outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("#desktop-nav-capsule")) {
        setFeaturesOpen(false);
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
        setMoreOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://www.facebook.com/people/All-In-One-Digital-Solutions/61576383253081/",
      color: "hover:text-[#1877F2]"
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://www.instagram.com/majidarain778866/",
      color: "hover:text-[#E4405F]"
    },
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/majidarain778866-ui",
      color: "hover:text-white"
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: "https://x.com/ArainD41848",
      color: "hover:text-[#1DA1F2]"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/majid-arain-bb6a03393/",
      color: "hover:text-[#0A66C2]"
    }
  ];

  const handleLinkClick = (href: string) => {
    playClick();
    setMobileMenuOpen(false);
    setFeaturesOpen(false);
    if (href.startsWith("#")) {
      const id = href.replace("#", "");
      if (id === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? theme === "dark"
              ? "bg-black/80 backdrop-blur-xl border-b border-neutral-800/60 shadow-lg shadow-black/20 py-2.5 sm:py-3"
              : "bg-white/85 backdrop-blur-xl border-b border-neutral-200/80 shadow-md shadow-neutral-900/5 py-2.5 sm:py-3"
            : "bg-transparent py-3.5 sm:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 xl:gap-6 w-full">
          
          {/* LEFT: BRAND LOGO (flex-1 basis-0 for perfect center alignment) */}
          <div className="flex items-center justify-start flex-1 basis-0 min-w-0">
            <div
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                playClick();
              }}
              className="flex items-center gap-2.5 group cursor-pointer select-none shrink-0"
            >
              {/* Custom SVG geometric logo */}
              <div className="relative w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-[0_0_12px_rgba(255,69,29,0.35)]">
                  <rect x="11" y="0" width="10" height="10" rx="2.5" fill="#ff451d" className="transition-transform duration-300 group-hover:translate-y-[1px]" />
                  <rect x="0" y="11" width="10" height="10" rx="2.5" fill="#ff451d" className="transition-transform duration-300 group-hover:translate-x-[1px]" />
                  <rect x="11" y="11" width="10" height="10" rx="2.5" fill="#ff451d" className="transition-transform duration-300 group-hover:scale-95" />
                  <rect x="11" y="22" width="10" height="10" rx="2.5" fill="#e63e1a" className="transition-transform duration-300 group-hover:-translate-y-[1px]" />
                </svg>
              </div>
              
              <div className="flex items-center gap-1.5">
                <span
                  className={`text-base sm:text-lg xl:text-xl font-bold tracking-tight font-sans transition-colors duration-300 leading-tight whitespace-nowrap ${
                    theme === "dark" ? "text-white" : "text-neutral-900"
                  }`}
                >
                  Arain Digitalz
                </span>
                <span className="hidden 2xl:inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" title="Available for projects" />
              </div>
            </div>
          </div>

          {/* CENTER: DESKTOP NAVIGATION CAPSULE (perfect mathematical center of header) */}
          <nav
            id="desktop-nav-capsule"
            className={`hidden lg:flex items-center backdrop-blur-md border rounded-full px-3 xl:px-5 py-1.5 xl:py-2 relative transition-all duration-300 shadow-sm shrink-0 ${
              theme === "dark"
                ? "bg-[#0d0d0d]/75 border-neutral-800/80 text-neutral-300"
                : "bg-white/75 border-neutral-200/80 text-neutral-700"
            }`}
          >
            <div className="flex items-center gap-2.5 lg:gap-3 xl:gap-4 2xl:gap-5 text-xs xl:text-sm font-medium">
              
              {/* Features Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setFeaturesOpen(!featuresOpen);
                    setMoreOpen(false);
                    playToggle();
                  }}
                  onMouseEnter={() => {
                    setFeaturesOpen(true);
                    setMoreOpen(false);
                    playHover();
                  }}
                  className={`flex items-center gap-1 py-1 transition-colors group cursor-pointer whitespace-nowrap ${
                    theme === "dark" ? "hover:text-white" : "hover:text-black"
                  }`}
                >
                  <span>Features</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${
                      featuresOpen ? "rotate-180 text-[#ff451d]" : "text-neutral-500"
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {featuresOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.18 }}
                      onMouseLeave={() => setFeaturesOpen(false)}
                      className={`absolute top-9 left-1/2 -translate-x-1/2 w-72 border rounded-2xl p-3.5 shadow-2xl z-50 backdrop-blur-xl ${
                        theme === "dark"
                          ? "bg-[#0c0c0c]/95 border-neutral-800/90 shadow-black/80"
                          : "bg-white/95 border-neutral-200/90 shadow-neutral-900/10"
                      }`}
                    >
                      <div className="space-y-2">
                        <div
                          onClick={() => handleLinkClick("#product")}
                          onMouseEnter={() => playHover()}
                          className={`p-2.5 rounded-xl transition-all cursor-pointer group/item ${
                            theme === "dark" ? "hover:bg-neutral-900/80" : "hover:bg-neutral-100/80"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="p-1.5 rounded-lg bg-[#ff451d]/10 text-[#ff451d]">
                              <Sparkles className="w-4 h-4" />
                            </div>
                            <div>
                              <div className={`text-xs font-semibold ${theme === "dark" ? "text-white" : "text-neutral-900"}`}>
                                Experience Crafted
                              </div>
                              <p className={`text-[11px] mt-0.5 leading-snug ${theme === "dark" ? "text-neutral-400" : "text-neutral-500"}`}>
                                High-end digital experiences built for impact.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div
                          onClick={() => handleLinkClick("#stack")}
                          onMouseEnter={() => playHover()}
                          className={`p-2.5 rounded-xl transition-all cursor-pointer group/item ${
                            theme === "dark" ? "hover:bg-neutral-900/80" : "hover:bg-neutral-100/80"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="p-1.5 rounded-lg bg-[#ff451d]/10 text-[#ff451d]">
                              <Layers className="w-4 h-4" />
                            </div>
                            <div>
                              <div className={`text-xs font-semibold ${theme === "dark" ? "text-white" : "text-neutral-900"}`}>
                                Interactive Architecture
                              </div>
                              <p className={`text-[11px] mt-0.5 leading-snug ${theme === "dark" ? "text-neutral-400" : "text-neutral-500"}`}>
                                Fast, responsive, full-stack systems & UI.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Core Links visible on all desktop viewports */}
              <a
                href="#projects"
                onClick={() => handleLinkClick("#projects")}
                onMouseEnter={() => playHover()}
                className={`transition-colors py-1 whitespace-nowrap ${theme === "dark" ? "hover:text-white" : "hover:text-black"}`}
              >
                Projects
              </a>

              <a
                href="#team"
                onClick={() => handleLinkClick("#team")}
                onMouseEnter={() => playHover()}
                className={`transition-colors py-1 whitespace-nowrap ${theme === "dark" ? "hover:text-white" : "hover:text-black"}`}
              >
                Team
              </a>

              <a
                href="#stack"
                onClick={() => handleLinkClick("#stack")}
                onMouseEnter={() => playHover()}
                className={`transition-colors py-1 whitespace-nowrap ${theme === "dark" ? "hover:text-white" : "hover:text-black"}`}
              >
                Stack
              </a>

              {/* Extended links visible on wide desktop (xl: 1280px+) */}
              <a
                href="#how-it-works"
                onClick={() => handleLinkClick("#how-it-works")}
                onMouseEnter={() => playHover()}
                className={`hidden xl:inline-block transition-colors py-1 whitespace-nowrap ${theme === "dark" ? "hover:text-white" : "hover:text-black"}`}
              >
                How It Works
              </a>

              <a
                href="#testimonials"
                onClick={() => handleLinkClick("#testimonials")}
                onMouseEnter={() => playHover()}
                className={`hidden xl:inline-block transition-colors py-1 whitespace-nowrap ${theme === "dark" ? "hover:text-white" : "hover:text-black"}`}
              >
                Testimonials
              </a>

              <a
                href="#faq"
                onClick={() => handleLinkClick("#faq")}
                onMouseEnter={() => playHover()}
                className={`hidden xl:inline-block transition-colors py-1 whitespace-nowrap ${theme === "dark" ? "hover:text-white" : "hover:text-black"}`}
              >
                FAQ
              </a>

              {/* Compact Desktop "More" Dropdown (visible on lg: 1024px - 1279px) */}
              <div className="relative xl:hidden">
                <button
                  onClick={() => {
                    setMoreOpen(!moreOpen);
                    setFeaturesOpen(false);
                    playToggle();
                  }}
                  onMouseEnter={() => {
                    setMoreOpen(true);
                    setFeaturesOpen(false);
                    playHover();
                  }}
                  className={`flex items-center gap-1 py-1 transition-colors group cursor-pointer whitespace-nowrap ${
                    theme === "dark" ? "hover:text-white" : "hover:text-black"
                  }`}
                >
                  <span>More</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${
                      moreOpen ? "rotate-180 text-[#ff451d]" : "text-neutral-500"
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {moreOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.18 }}
                      onMouseLeave={() => setMoreOpen(false)}
                      className={`absolute top-9 left-1/2 -translate-x-1/2 w-48 border rounded-2xl p-2 shadow-2xl z-50 backdrop-blur-xl ${
                        theme === "dark"
                          ? "bg-[#0c0c0c]/95 border-neutral-800/90 shadow-black/80"
                          : "bg-white/95 border-neutral-200/90 shadow-neutral-900/10"
                      }`}
                    >
                      <div className="space-y-1 text-xs">
                        <button
                          onClick={() => {
                            setMoreOpen(false);
                            handleLinkClick("#how-it-works");
                          }}
                          className={`w-full text-left px-3 py-2 rounded-xl transition-colors cursor-pointer ${
                            theme === "dark" ? "hover:bg-neutral-900 text-neutral-200" : "hover:bg-neutral-100 text-neutral-800"
                          }`}
                        >
                          How It Works
                        </button>
                        <button
                          onClick={() => {
                            setMoreOpen(false);
                            handleLinkClick("#testimonials");
                          }}
                          className={`w-full text-left px-3 py-2 rounded-xl transition-colors cursor-pointer ${
                            theme === "dark" ? "hover:bg-neutral-900 text-neutral-200" : "hover:bg-neutral-100 text-neutral-800"
                          }`}
                        >
                          Testimonials
                        </button>
                        <button
                          onClick={() => {
                            setMoreOpen(false);
                            handleLinkClick("#faq");
                          }}
                          className={`w-full text-left px-3 py-2 rounded-xl transition-colors cursor-pointer ${
                            theme === "dark" ? "hover:bg-neutral-900 text-neutral-200" : "hover:bg-neutral-100 text-neutral-800"
                          }`}
                        >
                          FAQ
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Direct Contact Modal Trigger Link */}
              <button
                onClick={() => {
                  onOpenContact();
                  playClick();
                }}
                onMouseEnter={() => playHover()}
                className={`transition-colors py-1 cursor-pointer font-medium whitespace-nowrap ${
                  theme === "dark" ? "hover:text-white text-neutral-300" : "hover:text-black text-neutral-600"
                }`}
              >
                Contact
              </button>
            </div>
          </nav>

          {/* RIGHT: DESKTOP CONTROLS & CTA (flex-1 basis-0 for perfect symmetry) */}
          <div className="hidden lg:flex items-center justify-end flex-1 basis-0 min-w-0 gap-1.5 xl:gap-2.5">
            {/* Search Bar Component */}
            <SearchSections theme={theme} onOpenContact={onOpenContact} />

            {/* Sound Toggle */}
            <button
              onClick={() => onToggleSound()}
              onMouseEnter={() => playHover()}
              className={`p-2 xl:p-2.5 rounded-full border transition-all duration-300 flex items-center justify-center cursor-pointer shrink-0 ${
                theme === "dark"
                  ? soundEnabled
                    ? "bg-[#ff451d]/10 hover:bg-[#ff451d]/20 border-[#ff451d]/30 text-[#ff451d]"
                    : "bg-white/5 hover:bg-white/10 border-white/10 text-neutral-400"
                  : soundEnabled
                  ? "bg-[#ff451d]/10 hover:bg-[#ff451d]/20 border-[#ff451d]/30 text-[#ff451d]"
                  : "bg-black/5 hover:bg-black/10 border-black/10 text-neutral-500"
              }`}
              aria-label="Toggle Sound Feedback"
              title={soundEnabled ? "Mute audio cues" : "Unmute audio cues"}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 animate-pulse text-[#ff451d]" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => {
                onToggleTheme();
                playToggle();
              }}
              onMouseEnter={() => playHover()}
              className={`p-2 xl:p-2.5 rounded-full border transition-all duration-300 flex items-center justify-center cursor-pointer shrink-0 ${
                theme === "dark"
                  ? "bg-white/5 hover:bg-white/10 border-white/10 text-yellow-400"
                  : "bg-black/5 hover:bg-black/10 border-black/10 text-amber-500"
              }`}
              aria-label="Toggle Theme"
              title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Smooth Loading Simulator */}
            {onRefreshLoading && (
              <button
                onClick={() => {
                  onRefreshLoading();
                  playClick();
                }}
                onMouseEnter={() => playHover()}
                className={`p-2 xl:p-2.5 rounded-full border transition-all duration-300 flex items-center justify-center cursor-pointer group shrink-0 ${
                  theme === "dark"
                    ? "bg-white/5 hover:bg-white/10 border-white/10 text-neutral-400 hover:text-[#ff451d] hover:border-[#ff451d]/40"
                    : "bg-black/5 hover:bg-black/10 border-black/10 text-neutral-500 hover:text-[#ff451d] hover:border-[#ff451d]/40"
                }`}
                aria-label="Re-simulate Facebook-Style Smooth Loading"
                title="Re-simulate Facebook-Style Smooth Loading"
              >
                <RotateCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
              </button>
            )}

            {/* Primary Action Button: "Start Project" */}
            <button
              onClick={() => {
                onOpenContact();
                playSuccess();
              }}
              onMouseEnter={() => playHover()}
              className={`px-3.5 xl:px-5 py-2 xl:py-2.5 rounded-full text-xs xl:text-sm font-semibold transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg flex items-center gap-1.5 shrink-0 whitespace-nowrap ${
                theme === "dark"
                  ? "bg-gradient-to-r from-white to-neutral-200 text-black hover:from-neutral-100 hover:to-white shadow-[0_0_20px_rgba(255,255,255,0.12)]"
                  : "bg-neutral-900 text-white hover:bg-black shadow-[0_4px_16px_rgba(0,0,0,0.18)]"
              }`}
            >
              <span>Start Project</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
            </button>
          </div>

          {/* TABLET & MOBILE CONTROLS BAR (visible below lg: < 1024px) */}
          <div className="lg:hidden flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Tablet-only "Get Started" quick button (visible on md to lg: 640px - 1023px) */}
            <button
              onClick={() => {
                onOpenContact();
                playSuccess();
              }}
              className={`hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95 cursor-pointer ${
                theme === "dark"
                  ? "bg-white text-black hover:bg-neutral-100"
                  : "bg-neutral-900 text-white hover:bg-black"
              }`}
            >
              <span>Get Started</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>

            {/* Sound Toggle (compact) */}
            <button
              onClick={() => {
                onToggleSound();
              }}
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border transition-all duration-300 flex items-center justify-center cursor-pointer ${
                theme === "dark"
                  ? soundEnabled
                    ? "bg-[#ff451d]/15 border-[#ff451d]/40 text-[#ff451d]"
                    : "bg-white/5 border-white/10 text-neutral-400"
                  : soundEnabled
                  ? "bg-[#ff451d]/15 border-[#ff451d]/40 text-[#ff451d]"
                  : "bg-black/5 border-black/10 text-neutral-500"
              }`}
              aria-label="Toggle Sound"
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ff451d] animate-pulse" /> : <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            </button>

            {/* Theme Toggle (compact) */}
            <button
              onClick={() => {
                onToggleTheme();
                playToggle();
              }}
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border transition-all duration-300 flex items-center justify-center cursor-pointer ${
                theme === "dark"
                  ? "bg-white/5 border-white/10 text-yellow-400"
                  : "bg-black/5 border-black/10 text-amber-500"
              }`}
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            </button>

            {/* Mobile Menu Hamburger Button */}
            <button
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                playToggle();
              }}
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                mobileMenuOpen
                  ? "bg-[#ff451d]/15 border-[#ff451d]/40 text-[#ff451d]"
                  : theme === "dark"
                  ? "bg-white/5 border-white/10 text-neutral-300 hover:text-white"
                  : "bg-black/5 border-black/10 text-neutral-700 hover:text-black"
              }`}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* FULL RESPONSIVE MOBILE & TABLET DRAWER OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />

            {/* Mobile Menu Drawer Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className={`lg:hidden fixed top-[60px] sm:top-[68px] inset-x-3 sm:inset-x-6 max-h-[calc(100vh-80px)] rounded-3xl border shadow-2xl z-50 overflow-y-auto flex flex-col p-5 sm:p-6 backdrop-blur-2xl transition-colors duration-300 ${
                theme === "dark"
                  ? "bg-[#0b0b0b]/95 border-neutral-800/80 text-white shadow-black/80"
                  : "bg-white/95 border-neutral-200/90 text-neutral-900 shadow-neutral-900/15"
              }`}
            >
              {/* Top Search bar inside mobile drawer */}
              <div className="pb-4 border-b border-neutral-500/10">
                <SearchSections
                  theme={theme}
                  fullWidth={true}
                  onOpenContact={() => {
                    setMobileMenuOpen(false);
                    onOpenContact();
                  }}
                  onNavigate={() => setMobileMenuOpen(false)}
                />
              </div>

              {/* Navigation Links Grid */}
              <div className="py-4 space-y-1">
                <div className="px-2 pb-1 text-[10px] font-mono uppercase tracking-wider text-[#ff451d] font-bold">
                  Explore Sections
                </div>

                <button
                  onClick={() => handleLinkClick("#product")}
                  className={`w-full flex items-center justify-between p-2.5 rounded-2xl transition-colors text-left font-medium text-sm ${
                    theme === "dark" ? "hover:bg-neutral-900 text-neutral-200" : "hover:bg-neutral-100 text-neutral-800"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-xl bg-[#ff451d]/10 text-[#ff451d]">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <span>Features & Services</span>
                  </div>
                  <span className="text-xs text-neutral-500">Overview</span>
                </button>

                <button
                  onClick={() => handleLinkClick("#how-it-works")}
                  className={`w-full flex items-center justify-between p-2.5 rounded-2xl transition-colors text-left font-medium text-sm ${
                    theme === "dark" ? "hover:bg-neutral-900 text-neutral-200" : "hover:bg-neutral-100 text-neutral-800"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-xl bg-[#ff451d]/10 text-[#ff451d]">
                      <Compass className="w-4 h-4" />
                    </div>
                    <span>How It Works</span>
                  </div>
                  <span className="text-xs text-neutral-500">4-Step</span>
                </button>

                <button
                  onClick={() => handleLinkClick("#projects")}
                  className={`w-full flex items-center justify-between p-2.5 rounded-2xl transition-colors text-left font-medium text-sm ${
                    theme === "dark" ? "hover:bg-neutral-900 text-neutral-200" : "hover:bg-neutral-100 text-neutral-800"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-xl bg-[#ff451d]/10 text-[#ff451d]">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <span>Featured Projects</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    150+ Done
                  </span>
                </button>

                <button
                  onClick={() => handleLinkClick("#stack")}
                  className={`w-full flex items-center justify-between p-2.5 rounded-2xl transition-colors text-left font-medium text-sm ${
                    theme === "dark" ? "hover:bg-neutral-900 text-neutral-200" : "hover:bg-neutral-100 text-neutral-800"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-xl bg-[#ff451d]/10 text-[#ff451d]">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <span>Tech Stack & Tools</span>
                  </div>
                  <span className="text-xs text-neutral-500">Capabilities</span>
                </button>

                <button
                  onClick={() => handleLinkClick("#team")}
                  className={`w-full flex items-center justify-between p-2.5 rounded-2xl transition-colors text-left font-medium text-sm ${
                    theme === "dark" ? "hover:bg-neutral-900 text-neutral-200" : "hover:bg-neutral-100 text-neutral-800"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-xl bg-[#ff451d]/10 text-[#ff451d]">
                      <Users className="w-4 h-4" />
                    </div>
                    <span>Lead Specialist</span>
                  </div>
                  <span className="text-xs text-neutral-500">M. Majid</span>
                </button>

                <button
                  onClick={() => handleLinkClick("#testimonials")}
                  className={`w-full flex items-center justify-between p-2.5 rounded-2xl transition-colors text-left font-medium text-sm ${
                    theme === "dark" ? "hover:bg-neutral-900 text-neutral-200" : "hover:bg-neutral-100 text-neutral-800"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-xl bg-[#ff451d]/10 text-[#ff451d]">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <span>Client Testimonials</span>
                  </div>
                  <span className="text-xs text-neutral-500">98% Rating</span>
                </button>

                <button
                  onClick={() => handleLinkClick("#faq")}
                  className={`w-full flex items-center justify-between p-2.5 rounded-2xl transition-colors text-left font-medium text-sm ${
                    theme === "dark" ? "hover:bg-neutral-900 text-neutral-200" : "hover:bg-neutral-100 text-neutral-800"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-xl bg-[#ff451d]/10 text-[#ff451d]">
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <span>FAQ & Support</span>
                  </div>
                  <span className="text-xs text-neutral-500">Answers</span>
                </button>

                {onRefreshLoading && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onRefreshLoading();
                      playClick();
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-2xl transition-colors text-left font-medium text-sm ${
                      theme === "dark" ? "hover:bg-neutral-900 text-neutral-200" : "hover:bg-neutral-100 text-neutral-800"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-xl bg-[#ff451d]/10 text-[#ff451d]">
                        <RotateCw className="w-4 h-4" />
                      </div>
                      <span>Smooth Loading Demo</span>
                    </div>
                    <span className="text-xs text-[#ff451d]">Facebook Shimmer</span>
                  </button>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 pb-4 space-y-2 border-t border-neutral-500/10">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenContact();
                    playSuccess();
                  }}
                  className={`w-full py-3 px-4 rounded-2xl text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
                    theme === "dark"
                      ? "bg-white text-black hover:bg-neutral-100 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                      : "bg-neutral-900 text-white hover:bg-black shadow-[0_4px_16px_rgba(0,0,0,0.18)]"
                  }`}
                >
                  <span>Start Your Project</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenContact();
                    playClick();
                  }}
                  className={`w-full py-2.5 px-4 rounded-2xl text-sm font-medium transition-all flex items-center justify-center gap-2 cursor-pointer border ${
                    theme === "dark"
                      ? "bg-white/5 hover:bg-white/10 border-white/10 text-white"
                      : "bg-black/5 hover:bg-black/10 border-black/10 text-black"
                  }`}
                >
                  <Mail className="w-4 h-4 text-[#ff451d]" />
                  <span>Contact Sales & Support</span>
                </button>
              </div>

              {/* Social Media Links Bar */}
              <div className="pt-3 border-t border-neutral-500/10 flex flex-col gap-2">
                <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 text-center font-semibold">
                  Official Social Channels
                </div>
                <div className="flex items-center justify-center gap-2 sm:gap-3 py-1">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2.5 rounded-xl border transition-all hover:scale-110 active:scale-95 flex items-center justify-center ${
                          theme === "dark"
                            ? "bg-neutral-900/80 border-neutral-800 text-neutral-300 hover:border-[#ff451d]/40"
                            : "bg-neutral-100 border-neutral-200 text-neutral-700 hover:border-[#ff451d]/40"
                        } ${social.color}`}
                        aria-label={social.name}
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Status footer inside mobile menu */}
              <div className="mt-4 pt-3 border-t border-neutral-500/10 flex items-center justify-between text-[11px] text-neutral-500">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Available for Q3/Q4 Projects</span>
                </div>
                <span className="font-mono text-[10px]">Arain Digitalz</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
