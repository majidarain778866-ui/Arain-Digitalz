import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, X, Compass, Users, Briefcase, Cpu, MessageSquare, Mail, Award, HelpCircle } from "lucide-react";

interface SectionItem {
  id: string;
  name: string;
  category: string;
  keywords: string[];
  icon: React.ElementType;
}

const SECTIONS: SectionItem[] = [
  {
    id: "home",
    name: "Hero & Showreel",
    category: "Navigation",
    keywords: ["hero", "showreel", "video", "introduction", "top", "home", "main"],
    icon: Compass,
  },
  {
    id: "team",
    name: "About M. Majid (Lead Specialist)",
    category: "About",
    keywords: ["team", "profile", "about", "majid", "m. majid", "seo", "wordpress", "specialist", "developer"],
    icon: Users,
  },
  {
    id: "projects",
    name: "Featured Projects",
    category: "Portfolio",
    keywords: ["projects", "work", "portfolio", "featured", "cases", "designs"],
    icon: Briefcase,
  },
  {
    id: "stack",
    name: "Tech Stack & Excellence",
    category: "Skills",
    keywords: ["tech", "stack", "tools", "frameworks", "technologies", "development"],
    icon: Cpu,
  },
  {
    id: "testimonials",
    name: "Client Testimonials",
    category: "Reviews",
    keywords: ["testimonials", "reviews", "clients", "feedback", "quotes", "jenkins"],
    icon: MessageSquare,
  },
  {
    id: "faq",
    name: "Frequently Asked Questions",
    category: "FAQ",
    keywords: ["faq", "questions", "answers", "help", "pricing", "support", "workflow", "process", "intelligence"],
    icon: HelpCircle,
  },
  {
    id: "newsletter",
    name: "Newsletter Subscription",
    category: "Updates",
    keywords: ["newsletter", "subscribe", "email", "updates", "stay in touch"],
    icon: Mail,
  },
  {
    id: "feedback",
    name: "Quick Feedback Drawer",
    category: "Action",
    keywords: ["feedback", "drawer", "rate", "reaction", "quick feedback", "bug", "opinion"],
    icon: MessageSquare,
  },
  {
    id: "contact",
    name: "Get in Touch / Contact",
    category: "Action",
    keywords: ["contact", "form", "reach out", "email", "message", "support", "hire"],
    icon: Mail,
  },
];

interface SearchSectionsProps {
  theme: "dark" | "light";
  onOpenContact: () => void;
  className?: string;
  fullWidth?: boolean;
  onNavigate?: () => void;
}

export function SearchSections({ theme, onOpenContact, className = "", fullWidth = false, onNavigate }: SearchSectionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdown on clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter sections based on query
  const filteredSections = SECTIONS.filter((section) => {
    if (!query) return true;
    const lowerQuery = query.toLowerCase();
    return (
      section.name.toLowerCase().includes(lowerQuery) ||
      section.category.toLowerCase().includes(lowerQuery) ||
      section.keywords.some((keyword) => keyword.toLowerCase().includes(lowerQuery))
    );
  });

  const handleSelect = (section: SectionItem) => {
    setQuery("");
    setIsFocused(false);
    setIsOpen(false);

    if (section.id === "contact") {
      onOpenContact();
      onNavigate?.();
      return;
    }

    if (section.id === "feedback") {
      document.getElementById("feedback-trigger-btn")?.click();
      onNavigate?.();
      return;
    }

    if (section.id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      onNavigate?.();
      return;
    }

    const element = document.getElementById(section.id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });

      // Highlight effect
      element.classList.add("ring-4", "ring-[#ff451d]/30", "transition-all", "duration-500");
      setTimeout(() => {
        element.classList.remove("ring-4", "ring-[#ff451d]/30");
      }, 2000);
    }
    onNavigate?.();
  };

  // Listen for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setIsFocused(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div ref={containerRef} className={`relative z-50 ${fullWidth ? "w-full" : ""} ${className}`}>
      <div
        className={`flex items-center gap-2 rounded-full border px-3 xl:px-3.5 py-1.5 transition-all duration-300 backdrop-blur-md ${
          fullWidth
            ? "w-full"
            : theme === "dark"
            ? isFocused
              ? "bg-[#0d0d0d]/90 border-[#ff451d]/50 shadow-[0_0_15px_rgba(255,69,29,0.15)] w-44 sm:w-48 xl:w-60"
              : "bg-[#0d0d0d]/40 border-neutral-800/60 w-28 sm:w-32 xl:w-40"
            : isFocused
              ? "bg-white/95 border-[#ff451d]/50 shadow-[0_0_15px_rgba(255,69,29,0.1)] w-44 sm:w-48 xl:w-60"
              : "bg-white/40 border-neutral-200/60 w-28 sm:w-32 xl:w-40"
        }`}
      >
        <Search className="w-3.5 h-3.5 text-[#ff451d] shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsFocused(true);
          }}
          onFocus={() => setIsFocused(true)}
          placeholder="Search sections... (⌘K)"
          className={`w-full bg-transparent text-xs focus:outline-none transition-colors border-none p-0 select-text ${
            theme === "dark" ? "text-white placeholder-neutral-500" : "text-neutral-900 placeholder-neutral-400"
          }`}
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className={`p-0.5 rounded-full hover:bg-neutral-500/10 transition-colors ${
              theme === "dark" ? "text-neutral-400" : "text-neutral-600"
            }`}
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Dropdown Results */}
      <AnimatePresence>
        {isFocused && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`absolute top-11 ${
              fullWidth ? "left-0 right-0 w-full" : "right-0 w-64 sm:w-72"
            } rounded-2xl border p-2 shadow-2xl backdrop-blur-xl z-50 max-h-80 overflow-y-auto ${
              theme === "dark"
                ? "bg-[#0d0d0d]/95 border-neutral-800/80 text-white"
                : "bg-white/95 border-neutral-200/80 text-neutral-900"
            }`}
          >
            <div className="px-2 py-1.5 text-[10px] font-bold font-mono tracking-wider text-[#ff451d] uppercase border-b border-neutral-800/10 mb-1">
              {query ? "Matching Sections" : "Quick Navigator"}
            </div>

            {filteredSections.length > 0 ? (
              <div className="space-y-0.5">
                {filteredSections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => handleSelect(section)}
                      className={`w-full text-left flex items-center justify-between p-2 rounded-xl transition-all duration-200 cursor-pointer group ${
                        theme === "dark"
                          ? "hover:bg-white/5 text-neutral-300 hover:text-white"
                          : "hover:bg-neutral-100 text-neutral-600 hover:text-black"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`p-1.5 rounded-lg transition-colors duration-200 ${
                          theme === "dark"
                            ? "bg-neutral-900 group-hover:bg-[#ff451d]/10"
                            : "bg-neutral-100 group-hover:bg-[#ff451d]/5"
                        }`}>
                          <Icon className="w-3.5 h-3.5 text-[#ff451d]" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold">{section.name}</div>
                          <div className="text-[9px] text-neutral-500 font-mono">{section.category}</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity text-neutral-400">
                        Go →
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="p-4 text-center text-xs text-neutral-500">
                No matching sections found.
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
